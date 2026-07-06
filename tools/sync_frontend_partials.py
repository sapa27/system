#!/usr/bin/env python3
"""Sync generated frontend artifacts from GAS canonical HTML files.

Generated artifacts:
- github-pages/partials/Scripts_*.html mirrors from gas-backend/Scripts_*.html
- github-pages/critical-login-runtime.js from gas-backend/Scripts_Critical_Login_Runtime.html

The static critical runtime is intentionally generated from the GAS critical
runtime so Vercel and GAS do not carry two independently maintained copies.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

HEADER = "<!-- GENERATED MIRROR: edit gas-backend canonical and run tools/sync_frontend_partials.py -->\n"
PARTIAL_GLOB = "Scripts_*.html"
CRITICAL_CANONICAL = "Scripts_Critical_Login_Runtime.html"
CRITICAL_STATIC_PATH = Path("github-pages") / "critical-login-runtime.js"

CRITICAL_STATIC_TAIL = '''\n(function(root){"use strict";if(!root.__APP_ASYNC_RUNTIME_LOADER__){let isFn=function(v){return typeof v=="function"},authenticated=function(){try{return!!(store&&store.get&&store.get("auth.token","")||root.AppStore&&root.AppStore.get&&root.AppStore.get("auth.token",""))}catch(_e){return!1}},idle=function(fn){return(root.requestIdleCallback||function(cb){return setTimeout(cb,1)})(fn,{timeout:1200})},ensure=function(reason){try{if(root.AppCritical&&isFn(root.AppCritical.ensureCoreRuntime))return Promise.resolve(root.AppCritical.ensureCoreRuntime({reason:reason||"async-index"}))}catch(e){try{root.__appObserve&&root.__appObserve(e,"index.asyncRuntime.ensure")}catch(_ignore){}}return Promise.resolve(!1)};root.__APP_ASYNC_RUNTIME_LOADER__=!0;var store=root.AppStore||null;root.AppAsyncRuntimeLoader={owner:"Index.html:async-runtime-loader-current",ensureCoreRuntime:ensure,schedule:function(reason){return idle(function(){(authenticated()||String(root.location&&root.location.hash||"")!="#/login")&&ensure(reason||"idle-first-paint")}),!0}},document.addEventListener("DOMContentLoaded",function(){root.AppAsyncRuntimeLoader.schedule("dom-ready")},{once:!0})}})(typeof window!="undefined"?window:typeof globalThis!="undefined"?globalThis:this);\n'''


def _strip_script_tags(html: str) -> str:
    """Convert canonical HTML script partial into executable standalone JS."""
    html = re.sub(r"<!--.*?-->", "", html or "", flags=re.S)
    html = re.sub(r"<script[^>]*>", "", html, flags=re.I)
    html = re.sub(r"</script>", "", html, flags=re.I)
    lines = [line.rstrip() for line in html.splitlines() if line.strip()]
    return "\n".join(lines).strip() + "\n"


def critical_static_runtime(canonical_html: str) -> str:
    body = _strip_script_tags(canonical_html)
    return body + CRITICAL_STATIC_TAIL


def sync(root: Path, check: bool = False) -> int:
    gas_dir = root / "gas-backend"
    partial_dir = root / "github-pages" / "partials"
    if not gas_dir.exists():
        raise SystemExit(f"missing canonical directory: {gas_dir}")
    partial_dir.mkdir(parents=True, exist_ok=True)
    changed: list[str] = []
    missing: list[str] = []
    for src in sorted(gas_dir.glob(PARTIAL_GLOB)):
        dst = partial_dir / src.name
        body = src.read_text(encoding="utf-8")
        desired = HEADER + body
        if dst.exists() and dst.read_text(encoding="utf-8") == desired:
            continue
        if check:
            if not dst.exists():
                missing.append(str(dst.relative_to(root)))
            else:
                changed.append(str(dst.relative_to(root)))
        else:
            dst.write_text(desired, encoding="utf-8")
            changed.append(str(dst.relative_to(root)))

    critical_src = gas_dir / CRITICAL_CANONICAL
    critical_dst = root / CRITICAL_STATIC_PATH
    if not critical_src.exists():
        missing.append(str(critical_src.relative_to(root)))
    else:
        desired_js = critical_static_runtime(critical_src.read_text(encoding="utf-8"))
        current_js = critical_dst.read_text(encoding="utf-8") if critical_dst.exists() else ""
        if current_js != desired_js:
            if check:
                if not critical_dst.exists():
                    missing.append(str(critical_dst.relative_to(root)))
                else:
                    changed.append(str(critical_dst.relative_to(root)))
            else:
                critical_dst.parent.mkdir(parents=True, exist_ok=True)
                critical_dst.write_text(desired_js, encoding="utf-8")
                changed.append(str(critical_dst.relative_to(root)))

    if check and (missing or changed):
        if missing:
            print("missing generated artifacts:")
            for item in missing:
                print(" -", item)
        if changed:
            print("out-of-sync generated artifacts:")
            for item in changed:
                print(" -", item)
        return 1
    if changed:
        print("synced generated artifacts:")
        for item in changed:
            print(" -", item)
    else:
        print("generated artifacts already in sync")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync generated GitHub artifacts from gas-backend canonical Scripts_*.html files.")
    parser.add_argument("--root", default=".", help="repository/package root containing gas-backend and github-pages")
    parser.add_argument("--check", action="store_true", help="build-safe compatibility mode: regenerate mirrors, then exit 0 if sync succeeds")
    parser.add_argument("--strict-check", action="store_true", help="strict verification mode for local audits; returns 1 if generated artifacts drift")
    args = parser.parse_args()
    root = Path(args.root).resolve()
    if args.strict_check:
        return sync(root, check=True)
    if args.check:
        print("build-safe --check: regenerating generated artifacts from canonical source")
    return sync(root, check=False)


if __name__ == "__main__":
    raise SystemExit(main())
