#!/usr/bin/env python3
"""Phase G security gate for GitHub Pages ↔ GAS transport.
Fails if fast-login JSONP can still issue sessions or authenticated bridge reads can proceed from assumed iframe readiness.
"""
from pathlib import Path
import re, sys, json
ROOT = Path(__file__).resolve().parents[1]
errors = []
checks = []

def read(rel):
    p = ROOT / rel
    if not p.exists():
        errors.append(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def ok(name, passed, detail=""):
    checks.append({"name": name, "ok": bool(passed), "detail": detail})
    if not passed:
        errors.append(f"{name}: {detail}")

def compact(src):
    s = re.sub(r"\s+", "", src or "")
    return s.replace(":true", ":!0").replace("=true", "=!0").replace(":false", ":!1").replace("=false", "=!1")

app = read("github-pages/app-config.js")
tr = read("github-pages/github-gas-transport.js")
be = read("gas-backend/Code_00_PlatformCore.gs")

def literal_false(src, key):
    return re.search(r"\b" + re.escape(key) + r"\s*[:=]\s*(?:false|!1)\b", src) is not None

def literal_true(src, key):
    return re.search(r"\b" + re.escape(key) + r"\s*[:=]\s*(?:true|!0)\b", src) is not None

ok("fastLoginJsonp default false", literal_false(app, "fastLoginJsonp"), "app-config must set fastLoginJsonp:false")
ok("fastLoginJsonp enforced false", "root.APP_CONFIG.fastLoginJsonp=!1" in compact(app), "stale inline APP_CONFIG overrides must not re-enable fast-login")
ok("requireBridgeReadyMessage true", literal_true(app, "requireBridgeReadyMessage"), "bridge ready message must be required")
ok("allowAssumedBridgeReady false", literal_false(app, "allowAssumedBridgeReady"), "assumed bridge readiness must be disabled")
ok("bridgeLoadGraceMs zero", re.search(r"\bbridgeLoadGraceMs\s*[:=]\s*0\b", app) is not None, "iframe load grace must not mark bridge ready")
ok("transport has no fast-login JSONP path", "__githubFastLogin=1" not in tr and "function runFastLoginJsonp" not in tr, "fast-login JSONP path must be removed in Phase N")
ok("transport never calls __githubFastLogin", "__githubFastLogin=1" not in tr, "frontend must not create fast-login JSONP script URL")
ok("transport never assumes ready", "assumedReady=!0" not in compact(tr), "transport must not set bridgeClient.assumedReady=true")
ok("legacy hidden bridge removed from Vercel transport", "GAS_IFRAME_TRANSPORT_READY" not in tr and "GAS_IFRAME_TRANSPORT_REQUEST" not in tr, "Phase N transport should not use browser bridge messages")
fast_region = ""
start = be.find("function _githubFastLoginIssueSession_")
end = be.find("function doGet", start)
if start >= 0 and end > start:
    fast_region = be[start:end]
ok("backend fast-login endpoint disabled", "FAST_LOGIN_JSONP_DISABLED" in fast_region and "_issueLoginSession_" not in fast_region, "fast-login endpoint must not issue session")
ok("public config exposes Phase G", "phaseGSecurityHardening:!0" in compact(be) and "fastLoginJsonp:!1" in compact(be), "GAS public config should show security state")
ok("old Phase F stamp removed", "phaseF-techdebt-single-source-gate-2026-07-02-r1" not in (app + tr + be), "old release stamp must not remain in changed files")

report = {"ok": not errors, "checks": checks, "errors": errors}
print(json.dumps(report, ensure_ascii=False, indent=2))
if errors:
    sys.exit(1)
