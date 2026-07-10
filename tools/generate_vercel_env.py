#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import argparse
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
CANONICAL_RUNTIME_DIR = ROOT / "gas-backend"
STATIC_RUNTIME_DIR = ROOT / "github-pages" / "partials"
ENV_OUT = ROOT / "github-pages" / "vercel-env.generated.js"
GAS_INDEX = ROOT / "gas-backend" / "Index.html"
CRITICAL_RUNTIME = ROOT / "gas-backend" / "Scripts_Critical_Login_Runtime.html"
GENERATED_FRONTEND_FILES = {
    "app-index-foundation-pre-vue.js",
    "app-index-foundation-after-vue.js",
    "app-index-bootstrap.js",
    "critical-login-runtime.js",
}
RELEASE = "commission-v1.2-gas-hosted-production-2026-07-10-r27"
ASSET = "asset-manifest-commission-v1.2-gas-hosted-production-2026-07-10-r27"
VERSION = "1.2.0-production-current"
MIRROR_HEADER = "<!-- GENERATED MIRROR: gas-backend/{name} -->\n"


def _runtime_sources() -> list[Path]:
    return sorted(CANONICAL_RUNTIME_DIR.glob("Scripts_*.html"), key=lambda path: path.name)


def _expected_mirror(source: Path) -> str:
    text = source.read_text(encoding="utf-8")
    # Keep the historical byte-equivalent Core mirror contract. All other mirrors
    # carry an explicit generated marker and are never edited directly.
    if source.name == "Scripts_Core_Runtime.html":
        return text
    return MIRROR_HEADER.format(name=source.name) + text



def _script_blocks(path: Path) -> list[dict[str, str]]:
    text = path.read_text(encoding="utf-8")
    blocks: list[dict[str, str]] = []
    pattern = re.compile(r"<script\b([^>]*)>([\s\S]*?)</script>", re.IGNORECASE)
    for match in pattern.finditer(text):
        attrs = match.group(1) or ""
        body = match.group(2) or ""
        id_match = re.search(r"\bid=[\"']([^\"']+)", attrs, re.IGNORECASE)
        type_match = re.search(r"\btype=[\"']([^\"']+)", attrs, re.IGNORECASE)
        blocks.append({
            "id": id_match.group(1) if id_match else "",
            "type": type_match.group(1).lower() if type_match else "",
            "attrs": attrs,
            "body": body.strip(),
        })
    return blocks


def _join_javascript(blocks: list[dict[str, str]], source_label: str) -> str:
    bodies = [block["body"] for block in blocks if block["body"] and "text/x-template" not in block["type"]]
    if not bodies:
        raise RuntimeError(f"NO_GENERATABLE_JAVASCRIPT:{source_label}")
    return "// GENERATED from " + source_label + ". Do not edit directly.\n" + ";\n".join(bodies) + "\n"


def _vercelize_index_javascript(text: str) -> str:
    deferred_scripts = {
        "dashboard": ["Scripts_Page_Dashboard"],
        "search": ["Scripts_Page_ReportTrack"],
        "petitioner": ["Scripts_Page_Petitioner"],
        "meeting": ["Scripts_Page_Meeting"],
        "committee-meeting": ["Scripts_Page_Meeting"],
        "track": ["Scripts_Page_ReportTrack"],
        "report": ["Scripts_Page_ReportTrack"],
        "people": ["Scripts_Page_People"],
        "personnel": ["Scripts_Page_People"],
        "budget": ["Scripts_Page_Budget"],
        "admin": ["Scripts_Page_Admin"],
        "ai": ["Scripts_Core_Runtime"],
        "print": ["Scripts_Core_Runtime"],
    }
    replacements = [
        (r"<\?!=\(typeof coreRuntimeFilesJson[\s\S]*?\?>", json.dumps(["Scripts_Core_Runtime"], ensure_ascii=False)),
        (r"<\?!=\(typeof deferredScriptMapJson[\s\S]*?\?>", json.dumps(deferred_scripts, ensure_ascii=False)),
        (r"<\?!=\(typeof deferredTemplateMapJson[\s\S]*?\?>", "{}"),
    ]
    for pattern, value in replacements:
        text, count = re.subn(pattern, value, text, count=1)
        if count != 1:
            raise RuntimeError(f"INDEX_TEMPLATE_REPLACEMENT_FAILED:{pattern}")
    if "<?" in text:
        raise RuntimeError("UNRESOLVED_GAS_TEMPLATE_IN_GENERATED_JAVASCRIPT")
    return text


def _generated_frontend_assets() -> dict[Path, str]:
    index_blocks = _script_blocks(GAS_INDEX)
    critical_blocks = _script_blocks(CRITICAL_RUNTIME)

    dom_contract_index = next((i for i, block in enumerate(index_blocks) if block["id"] == "app-index-dom-contract-owner"), -1)
    if dom_contract_index < 0:
        raise RuntimeError("INDEX_DOM_CONTRACT_MARKER_MISSING")
    pre_blocks = index_blocks[: dom_contract_index + 1]

    thai_date_blocks = [block for block in index_blocks if "Index.thai-date-early-adapter" in block["body"]]
    if len(thai_date_blocks) != 1:
        raise RuntimeError(f"THAI_DATE_ADAPTER_COUNT:{len(thai_date_blocks)}")

    async_index = next((i for i, block in enumerate(index_blocks) if block["id"] == "app-async-runtime-loader"), -1)
    if async_index < 0:
        raise RuntimeError("ASYNC_RUNTIME_LOADER_MARKER_MISSING")
    async_block = index_blocks[async_index]
    bootstrap_blocks = [
        block for block in index_blocks[async_index + 1 :]
        if block["body"] and "text/x-template" not in block["type"]
    ]
    if len(bootstrap_blocks) < 4:
        raise RuntimeError(f"INDEX_BOOTSTRAP_BLOCK_COUNT:{len(bootstrap_blocks)}")

    return {
        ROOT / "github-pages" / "app-index-foundation-pre-vue.js": _join_javascript(pre_blocks, "gas-backend/Index.html foundation-pre"),
        ROOT / "github-pages" / "app-index-foundation-after-vue.js": _join_javascript(thai_date_blocks, "gas-backend/Index.html thai-date-adapter"),
        ROOT / "github-pages" / "app-index-bootstrap.js": _vercelize_index_javascript(_join_javascript(bootstrap_blocks, "gas-backend/Index.html bootstrap")),
        ROOT / "github-pages" / "critical-login-runtime.js": _join_javascript(critical_blocks + [async_block], "gas-backend/Scripts_Critical_Login_Runtime.html + Index async loader"),
    }


def _public_config_js() -> str:
    cfg = {
        "releaseTrack": "production-current",
        "version": VERSION,
        "releaseStamp": RELEASE,
        "assetStamp": ASSET,
        "hostingTarget": "vercel-api-proxy",
        "vercelStaticFrontendReady": True,
        "vercelApiProxyEnabled": True,
        "legacyTransportRemoved": True,
        "legacyJsonpTransportRemoved": True,
        "legacyGasBridgeTransportRemoved": True,
        "legacyLoginPostIframeRemoved": True,
        "vercelApiProxyUrl": "/api/gas",
        "vercelLoginProxyUrl": "/api/login",
        "vercelPublicConfigProxyUrl": "/api/public-config",
        "proxyRejectGoogleHostedFrontend": True,
        "gasBackendUiDisabled": True,
        "gasBackendFrontendEntryProperty": "VERCEL_FRONTEND_URL",
        "gasWebAppUrl": "",
        "gasWebAppUrlPublicFallbackOnly": False,
        "gasWebAppUrlServerEnvRequired": True,
        "logoUrl": "",
        "vercelEnv": "",
        "vercelUrl": "",
        "vercelProductionUrl": "",
        "gitCommitSha": "",
        "generatedAt": "build-time",
        "source": "tools/generate_vercel_env.py",
        "publicOnly": True,
        "deterministicPublicEnv": True,
    }
    cfg_json = json.dumps(cfg, ensure_ascii=False, indent=2).replace("\n", "\n  ")
    return f"""// GENERATED by tools/generate_vercel_env.py. Public, non-secret deterministic values only.
(function (root) {{
  'use strict';

  var cfg = {cfg_json};

  root.__VERCEL_MIGRATION_CONFIG__ = Object.freeze(cfg);
  root.APP_DEPLOY_RELEASE = Object.assign(
    {{}},
    root.APP_DEPLOY_RELEASE || {{}},
    {{
      stamp: cfg.releaseStamp,
      assetStamp: cfg.assetStamp,
      version: cfg.version,
      hostingTarget: cfg.hostingTarget,
      vercelStaticFrontendReady: true,
      vercelApiProxyEnabled: true,
      legacyTransportRemoved: true
    }}
  );
}})(window);
"""


def _expected_outputs() -> dict[Path, str]:
    outputs = {ENV_OUT: _public_config_js()}
    outputs.update(_generated_frontend_assets())
    for source in _runtime_sources():
        outputs[STATIC_RUNTIME_DIR / source.name] = _expected_mirror(source)
    return outputs


def _sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def generate() -> dict:
    outputs = _expected_outputs()
    STATIC_RUNTIME_DIR.mkdir(parents=True, exist_ok=True)

    expected_names = {path.name for path in outputs if path.parent == STATIC_RUNTIME_DIR}
    removed = []
    for stale in sorted(STATIC_RUNTIME_DIR.glob("Scripts_*.html")):
        if stale.name not in expected_names:
            stale.unlink()
            removed.append(str(stale.relative_to(ROOT)))

    written = []
    unchanged = []
    hashes = {}
    for path, text in outputs.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        current = path.read_text(encoding="utf-8") if path.exists() else None
        if current == text:
            unchanged.append(str(path.relative_to(ROOT)))
        else:
            path.write_text(text, encoding="utf-8")
            written.append(str(path.relative_to(ROOT)))
        hashes[str(path.relative_to(ROOT))] = _sha256(text)

    return {
        "ok": True,
        "mode": "generate",
        "singleSourceOwner": "gas-backend/Index.html + gas-backend/Scripts_*.html",
        "generatedRuntimeCount": len(_runtime_sources()),
        "generatedFrontendCount": len(GENERATED_FRONTEND_FILES),
        "written": written,
        "unchanged": unchanged,
        "removedStale": removed,
        "hashes": hashes,
        "release": RELEASE,
        "serverGasEnvRequired": True,
        "vercelApiProxyEnabled": True,
        "deterministicPublicEnv": True,
    }


def check() -> dict:
    errors = []
    hashes = {}
    outputs = _expected_outputs()
    for path, expected in outputs.items():
        rel = str(path.relative_to(ROOT))
        if not path.exists():
            errors.append(f"MISSING_GENERATED_ARTIFACT:{rel}")
            continue
        actual = path.read_text(encoding="utf-8")
        hashes[rel] = _sha256(actual)
        if actual != expected:
            errors.append(f"GENERATED_ARTIFACT_DRIFT:{rel}")

    expected_names = {path.name for path in outputs if path.parent == STATIC_RUNTIME_DIR}
    for stale in sorted(STATIC_RUNTIME_DIR.glob("Scripts_*.html")) if STATIC_RUNTIME_DIR.exists() else []:
        if stale.name not in expected_names:
            errors.append(f"ORPHAN_GENERATED_MIRROR:{stale.relative_to(ROOT)}")

    result = {
        "ok": not errors,
        "mode": "check",
        "singleSourceOwner": "gas-backend/Index.html + gas-backend/Scripts_*.html",
        "generatedRuntimeCount": len(_runtime_sources()),
        "generatedFrontendCount": len(GENERATED_FRONTEND_FILES),
        "errors": errors,
        "hashes": hashes,
        "release": RELEASE,
    }
    if errors:
        raise RuntimeError(json.dumps(result, ensure_ascii=False))
    return result


def clean_generated() -> dict:
    removed = []
    generated_paths = [ENV_OUT]
    generated_paths.extend(ROOT / "github-pages" / name for name in sorted(GENERATED_FRONTEND_FILES))
    if STATIC_RUNTIME_DIR.exists():
        generated_paths.extend(sorted(STATIC_RUNTIME_DIR.glob("Scripts_*.html")))
    for path in generated_paths:
        if path.exists() and path.is_file():
            path.unlink()
            removed.append(str(path.relative_to(ROOT)))
    try:
        if STATIC_RUNTIME_DIR.exists() and not any(STATIC_RUNTIME_DIR.iterdir()):
            STATIC_RUNTIME_DIR.rmdir()
    except OSError:
        pass
    return {
        "ok": True,
        "mode": "clean-generated",
        "singleSourceOwner": "gas-backend/Index.html + gas-backend/Scripts_*.html",
        "removed": removed,
        "release": RELEASE,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate deterministic Vercel artifacts from canonical GAS sources.")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--check", action="store_true", help="Verify generated artifacts without modifying them.")
    group.add_argument("--clean-generated", action="store_true", help="Remove build-generated Vercel artifacts from the source package.")
    args = parser.parse_args()

    try:
        if args.check:
            result = check()
        elif args.clean_generated:
            result = clean_generated()
        else:
            result = generate()
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        raise


if __name__ == "__main__":
    main()
