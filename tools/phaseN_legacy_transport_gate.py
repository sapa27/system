#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import json, re, sys, pathlib, os, traceback, subprocess, tempfile, shutil
ROOT = Path(__file__).resolve().parents[1]
RELEASE = "commission-v1.2-meeting-direct-fallback-2026-07-09-r16"
ASSET = "asset-manifest-commission-v1.2-meeting-direct-fallback-2026-07-09-r16"
VERSION = "1.2.0-production-current"
MODE = "production-vercel-proxy-only-no-jsonp-no-bridge-no-login-iframe"
SCHEMA_STAMP = "phaseK-write-schema-unification-2026-07-02-r1"
CRITICAL_APIS = ["apiBudgetGetSummary","apiGetPetitioners","apiGetCommitteeMeetingSystem","apiSearchCasesLite","apiGetTracking","apiLogin"]

FROZEN_CONTRACT_STAMP = "production-contract-freeze-current-2026-07-06"
FROZEN_VERCEL_API_FILES = ["_gasProxyCommon.js", "gas.js", "login.js", "public-config.js"]
FROZEN_FRONTEND_PROXY_ENDPOINTS = ["/api/gas", "/api/login", "/api/public-config"]
FROZEN_API_METHODS = [
    "apiLogin",
    "apiSessionResume",
    "apiLogout",
    "apiSessionCheck",
    "getDeferredInclude",
    "apiBootstrap",
    "apiGetRouteContract",
    "apiGetPhase0ContractGate",
    "apiGetPhase1Contract",
    "apiGetPhase2Contract",
    "apiGetClientDataContract",
    "apiGetAppTerminology",
    "apiGetPhase5ReleaseReadiness",
    "apiIssueActionToken",
    "apiSaveCase",
    "apiDeleteCase",
    "apiGetCases",
    "apiGetCaseQuickSummary",
    "apiGetCaseReportOptions",
    "apiGetCaseContext",
    "apiGetCanonicalCaseBundle",
    "apiGetPhase4QaGate",
    "apiSearchCasesLite",
    "apiGetCaseReportExportRows",
    "apiGetPetitioners",
    "apiGetPetitionerRelatedCounts",
    "apiSavePetitioner",
    "apiDeletePetitioner",
    "apiGetPersonnelComms",
    "apiGetPersonnelOps",
    "apiGetPersonnelStaffs",
    "apiGetPersonnelSubcommittees",
    "apiGetPersonnelDirectoryBundle",
    "apiGetPeoplePageBundle",
    "apiGetSalarySettings",
    "apiSavePersonnelComm",
    "apiSavePersonnelOp",
    "apiSavePersonnelStaff",
    "apiSavePersonnelSubcommittee",
    "apiDeletePersonnelComm",
    "apiDeletePersonnelOp",
    "apiDeletePersonnelStaff",
    "apiDeletePersonnelSubcommittee",
    "apiGetMeetingLookupOptions",
    "apiGetMeetingHistory",
    "apiListCommitteeMeetings",
    "apiGetCommitteeMeetingSystem",
    "apiGetCommitteeMeetingSystemSpec",
    "apiSearchMeetingAgendaCases",
    "apiGetCommitteeMeetingPrintBundle",
    "apiSaveCommitteeMeetingSystem",
    "apiDeleteCommitteeMeetingSystem",
    "apiSaveSalarySettings",
    "apiSaveMeetingLog",
    "apiDeleteMeetingLog",
    "apiGetLetters",
    "apiGetAllLettersWithCaseInfo",
    "apiSaveLetter",
    "apiDeleteLetter",
    "apiAuditMeetingData",
    "apiExportMeetingDuplicateAuditCsv",
    "apiCleanupMeetingData",
    "apiGetTracking",
    "apiBudgetListByFY",
    "apiBudgetListByFYFast",
    "apiBudgetGetSummary",
    "apiBudgetGetFiscalYears",
    "apiBudgetGetSubcommitteeOptions",
    "apiBudgetGetImportForEdit",
    "apiBudgetGetTypeSummaryByFY",
    "apiBudgetSaveImport",
    "apiBudgetDeleteImport",
    "apiGetDashboardBundle",
    "apiGetThailandLocations",
    "apiSearchLookup",
    "apiSearch",
    "apiAdminListUsers",
    "apiAdminSaveUser",
    "apiAdminDeleteUser",
    "apiAdminListSubcommittees",
    "apiAdminSaveSubcommittee",
    "apiAdminDeleteSubcommittee",
    "apiBudgetAdminListYearSettingsAll",
    "apiBudgetAdminSaveYearSettingsRows",
    "apiAiAssistantAsk",
    "apiAiAssistantStartJob",
    "apiAiAssistantGetJob",
    "apiAiAssistantSummarizeCase",
    "apiSuggestCaseStatus",
    "apiSuggestCaseClassification",
    "apiSemanticSearch",
    "apiMeetingSmartSummary",
    "apiDraftReplyLetter",
    "apiExtractTrackingPdf",
    "apiExtractDocumentPdf",
    "apiGenerateExecutiveSummary",
    "apiPredictOverdueRisk",
    "apiPredictiveBudgeting",
    "apiAnalyzePersonnelWorkload",
    "apiAnalyzeWorkloadBottlenecks",
    "apiRecommendWorkloadDistribution",
    "apiCheckDuplicateCase",
    "apiDetectBudgetAnomalies",
    "apiGetDailyBriefing",
    "apiGenerateBudgetTrendSummary",
    "apiAiDashboardInsights",
    "apiExtractMeetingAgendaPdf",
    "apiChat"
]
FROZEN_WRITE_METHODS = [
    "apiAdminDeleteSubcommittee",
    "apiAdminDeleteUser",
    "apiAdminSaveSubcommittee",
    "apiAdminSaveUser",
    "apiBudgetAdminSaveYearSettingsRows",
    "apiBudgetDeleteImport",
    "apiBudgetSaveImport",
    "apiCleanupMeetingData",
    "apiDeleteCase",
    "apiDeleteCommitteeMeetingSystem",
    "apiDeleteLetter",
    "apiDeleteMeetingLog",
    "apiDeletePersonnelComm",
    "apiDeletePersonnelOp",
    "apiDeletePersonnelStaff",
    "apiDeletePersonnelSubcommittee",
    "apiDeletePetitioner",
    "apiSaveCase",
    "apiSaveCommitteeMeetingSystem",
    "apiSaveLetter",
    "apiSaveMeetingLog",
    "apiSavePersonnelComm",
    "apiSavePersonnelOp",
    "apiSavePersonnelStaff",
    "apiSavePersonnelSubcommittee",
    "apiSavePetitioner",
    "apiSaveSalarySettings"
]
FROZEN_PUBLIC_METHODS = [
    "apiGetPhase0ContractGate",
    "apiGetPhase1Contract",
    "apiGetPhase2Contract",
    "apiGetRouteContract",
    "apiLogin",
    "apiSessionCheck",
    "apiSessionResume"
]

def _vercel_nonblocking_gate() -> bool:
    return bool((os.environ.get("VERCEL") or os.environ.get("CI")) and os.environ.get("COMMISSION_STRICT_GATES") != "1" and "--strict" not in sys.argv)

def _build_host_gate_warning(stage: str, payload) -> None:
    try:
        print(json.dumps({
            "ok": True,
            "nonBlockingBuildGate": "phaseN_legacy_transport_gate",
            "stage": stage,
            "reason": "Vercel build host detected; Production current audit is reported but does not block deploy. Run with COMMISSION_STRICT_GATES=1 or --strict for blocking audit.",
            "payload": payload,
        }, ensure_ascii=False, indent=2))
    except Exception:
        print("[phaseN] non-blocking build gate warning", stage, str(payload))

PHASE5_SIZE_BUDGETS = {
    # Phase 5 regression guards. Hot read paths use existing router/domain cache
    # owners; no API routes, files, UI, or business rules are added.
    "gas-backend/Scripts_Core_Runtime.html": 360000,
    "github-pages/partials/Scripts_Core_Runtime.html": 360000,
    "gas-backend/Scripts_Page_Meeting.html": 220000,
    "github-pages/partials/Scripts_Page_Meeting.html": 220000,
    "gas-backend/Code_30_Domain_Cases.gs": 327000,
    "gas-backend/Code_32_Domain_Budget.gs": 228000,
    "gas-backend/Scripts_Page_Budget.html": 160000,
    "github-pages/partials/Scripts_Page_Budget.html": 160100,
    "gas-backend/Index.html": 281000,
    "github-pages/index.html": 203000,
    "github-pages/critical-login-runtime.js": 87000,
}
PHASE5_TOTAL_SOURCE_BUDGET = 4880000
PHASE5_DYNAMIC_GENERATED_FILES = {
    # This file is regenerated by tools/generate_vercel_env.py and its byte size
    # legitimately changes on Vercel because VERCEL_URL, commit SHA, logo URL,
    # and other public non-secret deploy metadata vary by environment. Do not
    # let dynamic deploy metadata trip the deterministic source-size gate.
    "github-pages/vercel-env.generated.js",
}

OWNER_CONSOLIDATION_STAMP = "technical-debt-owner-consolidation-2026-07-07-r1"
LEGACY_FALLBACK_CLEANUP_STAMP = "technical-debt-phase7-legacy-fallback-cleanup-2026-07-07-r1"
PERFORMANCE_DEBT_STAMP = "technical-debt-phase8-performance-debt-current"
UIUX_DEBT_STAMP = "technical-debt-phase9-uiux-debt-current"
QUALITY_GATE_STAMP = "technical-debt-phase10-quality-gate-current"
PHASE1_RELEASE_DISCIPLINE_STAMP = "production-current-phase1-release-discipline-2026-07-08-r1"
PHASE2_RUNTIME_SLIMMING_STAMP = "production-current-phase2-runtime-slimming-2026-07-08-r1"
PHASE3_CACHE_DATA_FRESHNESS_STAMP = "production-current-phase3-cache-data-freshness-2026-07-08-r1"
PHASE4_WRITE_DELETE_RELIABILITY_STAMP = "production-current-phase4-write-delete-reliability-2026-07-08-r1"
PHASE5_UIUX_MODERNIZATION_STAMP = "production-current-phase5-uiux-modernization-2026-07-08-r1"
PHASE6_STATIC_QA_READINESS_STAMP = "production-current-phase6-static-qa-readiness-2026-07-08-r1"
STATIC_CONFIG_ASSIGNMENT_GUARD_STAMP = "production-current-static-config-assignment-guard-2026-07-08-r1"
DEPLOY_RELEASE_SINGLE_PUBLISH_GUARD_STAMP = "production-current-deploy-release-single-publish-2026-07-08-r1"
DEEP_SOURCE_SYNTAX_GUARD_STAMP = "production-current-deep-source-syntax-guard-2026-07-08-r1"
OWNER_CONSOLIDATION_REQUIRED_KEYS = [
    "apiRouteRegistry", "writeSchema", "apiBoundary", "platformEntry",
    "sheetRepository", "authSession", "casesSearchReportTracking", "budget",
    "people", "frontendTransport", "coreRuntime", "uiTokens", "generatedPartials",
]
OWNER_CONSOLIDATION_FORBIDDEN_PAGE_CALLS = [
    "google.script.run", "Utils.apiRunner", "AppPageController.api"
]
PHASE5_NEXT_SLIMMING_TARGETS = {
    # Informational next-step targets; not enforced in Phase 5.
    "gas-backend/Scripts_Core_Runtime.html": 340000,
    "gas-backend/Scripts_Page_Meeting.html": 220000,
    "gas-backend/Code_30_Domain_Cases.gs": 310000,
    "gas-backend/Code_32_Domain_Budget.gs": 210000,
}
# Build hosts such as Vercel may add .git, .vercel, node_modules, cache, or
# package-manager artifacts around the project. Gate checks must audit only the
# shipped source tree, otherwise an environment artifact can make a valid ZIP
# fail with exit 1.
SOURCE_SCOPE_DIRS = {"api", "docs", "gas-backend", "github-pages", "tools"}
SOURCE_SCOPE_ROOT_FILES = {".env.example", "package.json", "vercel.json", "TECH_DEBT_MANIFEST.json"}
SOURCE_SCOPE_SUFFIXES = {".html", ".js", ".gs", ".py", ".json", ".md", ".example"}
SOURCE_SCOPE_EXCLUDED_DIRS = {".git", ".vercel", ".next", "node_modules", "dist", "build", "coverage", "__pycache__"}

def is_scoped_source_file(p: Path) -> bool:
    try:
        rel_path = p.relative_to(ROOT)
    except ValueError:
        return False
    rel = rel_path.as_posix()
    if not p.is_file():
        return False
    if any(part in SOURCE_SCOPE_EXCLUDED_DIRS for part in rel_path.parts):
        return False
    if rel in PHASE5_DYNAMIC_GENERATED_FILES:
        return False
    if rel in SOURCE_SCOPE_ROOT_FILES:
        return True
    if not rel_path.parts or rel_path.parts[0] not in SOURCE_SCOPE_DIRS:
        return False
    return p.suffix.lower() in SOURCE_SCOPE_SUFFIXES

def iter_scoped_source_files():
    for p in ROOT.rglob('*'):
        if is_scoped_source_file(p):
            yield p
REQUIRED = ["vercel.json","package.json",".env.example","api/_gasProxyCommon.js","api/gas.js","api/login.js","api/public-config.js","github-pages/vercel-env.generated.js","tools/generate_vercel_env.py","tools/phaseG_security_gate.py","tools/phaseN_legacy_transport_gate.py","docs/PHASE_N_REMOVE_LEGACY_TRANSPORT.md","docs/SINGLE_SOURCE_POLICY.md","TECH_DEBT_MANIFEST.json"]
errors=[]; checks=[]
def read(rel:str)->str:
    p=ROOT/rel
    if not p.exists(): errors.append(f"missing file: {rel}"); return ""
    return p.read_text(encoding='utf-8', errors='ignore')
def ok(name, cond, detail=""):
    checks.append({"name":name,"ok":bool(cond),"detail":detail})
    if not cond: errors.append(f"{name}: {detail}")

def fail(message: str) -> None:
    errors.append(str(message))


def compact(text: str) -> str:
    s = re.sub(r"\s+", "", text or "")
    return s.replace(":true", ":!0").replace("=true", "=!0").replace(":false", ":!1").replace("=false", "=!1")

def contains_code(text: str, pattern: str) -> bool:
    return compact(pattern) in compact(text)

def function_body(text: str, name: str) -> str:
    m = re.search(r"function\s+" + re.escape(name) + r"\s*\([^)]*\)\s*\{", text)
    if not m:
        return ""
    i = m.end() - 1
    depth = 0
    in_str = None
    esc = False
    for j in range(i, len(text)):
        ch = text[j]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
            continue
        if ch in ("'", '\"', '`'):
            in_str = ch
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return text[i + 1:j]
    return ""

def phase5_source_size_bytes() -> int:
    return sum(p.stat().st_size for p in iter_scoped_source_files())

def phase5_size_budget_report():
    rows=[]; offenders=[]
    for rel, budget in PHASE5_SIZE_BUDGETS.items():
        p = ROOT / rel
        actual = p.stat().st_size if p.exists() else -1
        ok_size = p.exists() and actual <= budget
        rows.append({"path": rel, "bytes": actual, "budget": budget, "ok": ok_size})
        if not ok_size:
            offenders.append(f"{rel}={actual}>{budget}")
    total = phase5_source_size_bytes()
    total_ok = total <= PHASE5_TOTAL_SOURCE_BUDGET
    return rows, offenders, total, total_ok

def all_source_text()->str:
    chunks=[]
    for p in iter_scoped_source_files():
        chunks.append(p.read_text(encoding='utf-8', errors='ignore'))
    return '\n'.join(chunks)
def mirror_in_sync():
    drift=[]; header_re=re.compile(r"^<!-- GENERATED MIRROR:[\s\S]*?-->\s*")
    for src in (ROOT/'gas-backend').glob('Scripts_*.html'):
        dst=ROOT/'github-pages'/'partials'/src.name
        if not dst.exists(): drift.append(f"missing mirror: {src.name}"); continue
        source=src.read_text(encoding='utf-8')
        mirror=header_re.sub('', dst.read_text(encoding='utf-8'))
        if source!=mirror: drift.append(src.name)
    return drift

CRITICAL_STATIC_TAIL = '\n(function(root){"use strict";if(!root.__APP_ASYNC_RUNTIME_LOADER__){let isFn=function(v){return typeof v=="function"},authenticated=function(){try{return!!(store&&store.get&&store.get("auth.token","")||root.AppStore&&root.AppStore.get&&root.AppStore.get("auth.token",""))}catch(_e){return!1}},idle=function(fn){return(root.requestIdleCallback||function(cb){return setTimeout(cb,1)})(fn,{timeout:1200})},ensure=function(reason){try{if(root.AppCritical&&isFn(root.AppCritical.ensureCoreRuntime))return Promise.resolve(root.AppCritical.ensureCoreRuntime({reason:reason||"async-index"}))}catch(e){try{root.__appObserve&&root.__appObserve(e,"index.asyncRuntime.ensure")}catch(_ignore){}}return Promise.resolve(!1)};root.__APP_ASYNC_RUNTIME_LOADER__=!0;var store=root.AppStore||null;root.AppAsyncRuntimeLoader={owner:"Index.html:async-runtime-loader-current",ensureCoreRuntime:ensure,schedule:function(reason){return idle(function(){(authenticated()||String(root.location&&root.location.hash||"")!="#/login")&&ensure(reason||"idle-first-paint")}),!0}},document.addEventListener("DOMContentLoaded",function(){root.AppAsyncRuntimeLoader.schedule("dom-ready")},{once:!0})}})(typeof window!="undefined"?window:typeof globalThis!="undefined"?globalThis:this);\n'

def _critical_static_from_canonical(html: str) -> str:
    html = re.sub(r"<!--.*?-->", "", html or "", flags=re.S)
    html = re.sub(r"<script[^>]*>", "", html, flags=re.I)
    html = re.sub(r"</script>", "", html, flags=re.I)
    lines = [line.rstrip() for line in html.splitlines() if line.strip()]
    return "\n".join(lines).strip() + "\n" + CRITICAL_STATIC_TAIL

def critical_static_runtime_in_sync():
    src = ROOT/'gas-backend'/'Scripts_Critical_Login_Runtime.html'
    dst = ROOT/'github-pages'/'critical-login-runtime.js'
    if not src.exists() or not dst.exists():
        return False
    return dst.read_text(encoding='utf-8', errors='ignore') == _critical_static_from_canonical(src.read_text(encoding='utf-8', errors='ignore'))

def api_methods_from_router(router: str):
    methods=[]
    for fname in ["_routerPhase1CoreRouteTuples_", "_routerAdminRoutes_", "_routerAiRoutes_"]:
        b=function_body(router, fname)
        for names, flags in re.findall(r'\["([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]*)"', b or ''):
            for name in names.split('|'):
                name=name.strip()
                if name:
                    methods.append(name)
    return methods

def public_methods_from_router(router: str):
    methods=[]
    for fname in ["_routerPhase1CoreRouteTuples_", "_routerAdminRoutes_", "_routerAiRoutes_"]:
        b=function_body(router, fname)
        for names, role in re.findall(r'\["([^"]+)",\s*"([^"]+)",\s*"[^"]+",\s*"[^"]*"', b or ''):
            if role != "public":
                continue
            for name in names.split('|'):
                name=name.strip()
                if name:
                    methods.append(name)
    return sorted(methods)

def frozen_contract_diff(actual, expected):
    actual=list(actual or [])
    expected=list(expected or [])
    return {
        "actualCount": len(actual),
        "expectedCount": len(expected),
        "missing": sorted(set(expected)-set(actual)),
        "unexpected": sorted(set(actual)-set(expected)),
        "orderChanged": actual != expected,
    }

def write_methods_from_router(router:str):
    methods=set(); body=[]
    for fname in ["_routerAdminRoutes_","_routerPhase1CoreRouteTuples_"]:
        b=function_body(router, fname)
        if b: body.append(b)
    for names, flags in re.findall(r'\["([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]*)"', '\n'.join(body)):
        if 'w' not in flags: continue
        for name in names.split('|'):
            name=name.strip()
            if name: methods.add(name)
    return sorted(methods)
def schema_methods(router:str):
    body=function_body(router, "_routerPhaseKWriteSchemaByMethod_")
    return set(x or y for x, y in re.findall(r'(?:\"(api[A-Za-z0-9_]+)\"|(api[A-Za-z0-9_]+))\s*:', body or ''))


def check_admin_user_facade_contract(root: pathlib.Path) -> None:
    people = read(root / "gas-backend" / "Code_33_Domain_People.gs")
    router = read(root / "gas-backend" / "Code_20_Router.gs")
    platform = read(root / "gas-backend" / "Code_00_PlatformCore.gs")
    required = [
        "function apiAdminListUsers(payload)",
        "function apiAdminSaveUser(payload)",
        "function apiAdminDeleteUser(payload)",
        "AdminDomain.listUsers",
        "AdminDomain.saveUser",
        "AdminDomain.deleteUser",
    ]
    missing = [item for item in required if item not in people]
    if missing:
        fail("Phase 5 admin user facade contract missing: " + ", ".join(missing))
    for method in ("apiAdminListUsers", "apiAdminSaveUser", "apiAdminDeleteUser"):
        if method not in router:
            fail(f"Phase 5 admin user route missing from router registry: {method}")
        if f"function {method}(payload)" in router:
            fail(f"Phase 5 duplicate admin user facade in router: {method}")
    if 'apiAdminSaveUser:{required:[]}' not in router or 'apiAdminDeleteUser:{required:[' not in router:
        fail("Phase 5 admin user write schema missing")
    if 'apiAdminSaveUser:["admin-users","admin"]' not in platform or 'apiAdminDeleteUser:["admin-users","admin"]' not in platform:
        fail("Phase A admin user writes must invalidate admin-users read cache")
    if 'apiSaveCase:["case","dashboard"]' not in platform or 'apiDeleteCase:["case","dashboard"]' not in platform:
        fail("Phase 5 case writes must invalidate dashboard snapshot/cache")
    if 'apiSaveLetter:["letters","tracking","dashboard"]' not in platform or 'apiDeleteLetter:["letters","tracking","dashboard"]' not in platform:
        fail("Phase 5 tracking letter writes must invalidate tracking/dashboard cache")
    if 'apiDeletePetitioner:["people","petitioner","case","dashboard"]' not in platform:
        fail("Phase 5 petitioner writes must invalidate petitioner/case/dashboard cache")



def check_owner_consolidation_contract(manifest, platform, router, transport, common, core_runtime, gas_index, static_index, alltext):
    ledger = manifest.get('technicalDebtOwnerConsolidationLedger') if isinstance(manifest, dict) else None
    ok('Technical debt owner consolidation ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == OWNER_CONSOLIDATION_STAMP, 'TECH_DEBT_MANIFEST must lock Phase 1 owner matrix')
    owners = ledger.get('owners', {}) if isinstance(ledger, dict) else {}
    ok('Technical debt owner matrix complete', isinstance(owners, dict) and all(k in owners for k in OWNER_CONSOLIDATION_REQUIRED_KEYS), 'missing owner keys: ' + ','.join([k for k in OWNER_CONSOLIDATION_REQUIRED_KEYS if k not in owners]))
    rules = ledger.get('rules', {}) if isinstance(ledger, dict) else {}
    ok('Technical debt owner consolidation preserves contracts', rules.get('noNewApiRoutes') is True and rules.get('noNewFiles') is True and rules.get('businessLogicChanged') is False and rules.get('uiUxChanged') is False, 'owner consolidation must be metadata/gate only')
    ok('Router remains single route/write owner', 'function _apiRouteRegistry_' in router and 'WRITE_SCHEMA_BY_METHOD' in router and 'function apiRouter' in router, 'Code_20_Router must own route registry, write schemas, and apiRouter')
    ok('Platform remains single GAS entry owner', platform.count('function doGet(') == 1 and platform.count('function doPost(') == 1 and platform.count('function apiGithubBridgeCall(') == 1, 'doGet/doPost/apiGithubBridgeCall must remain single')
    ok('Domain owners remain anchored', all(token in alltext for token in ['CaseDomain', 'TrackingDomain', 'MeetingDomain', 'DashboardDomain', 'BudgetDomain', 'PeopleDomain']), 'domain owner globals must remain present')
    ok('Frontend transport remains one owner', 'function runVercelApiProxy' in transport and 'function runVercelLoginProxy' in transport and 'function runGasDirectTransport' in transport and 'root.AppTransport.run' in transport and '/api/gas' in transport and '/api/login' in transport, 'AppTransport must own frontend transport through Vercel proxy plus GAS direct when hosted in Apps Script')
    forbidden_hits = []
    page_scope_paths = list((ROOT/'gas-backend').glob('Scripts_Page_*.html')) + list((ROOT/'github-pages'/'partials').glob('Scripts_Page_*.html'))
    for path in page_scope_paths:
        text = path.read_text(encoding='utf-8', errors='ignore')
        rel = path.relative_to(ROOT).as_posix()
        for token in OWNER_CONSOLIDATION_FORBIDDEN_PAGE_CALLS:
            if token in text:
                forbidden_hits.append(rel + ':' + token)
    ok('Page scripts do not own transport', not forbidden_hits, ', '.join(forbidden_hits[:8]))
    ok('Core runtime remains UI/cache/lifecycle owner', all(token in core_runtime for token in ['AppRuntime', 'AppStore', 'AppPageKit', 'app:write-cache-invalidated', 'app:data-mutated']), 'core runtime must retain canonical runtime/cache/write-refresh owners')
    ok('UI token owner remains in indexes', 'app-global-ui-modern-current' in gas_index and 'app-global-ui-modern-current' in static_index, 'Index files must own UI tokens')
    ok('Vercel API file owner set frozen', sorted([p.name for p in (ROOT/'api').glob('*.js')]) == FROZEN_VERCEL_API_FILES, 'api folder must not add a second backend/proxy owner')


def check_legacy_fallback_cleanup_contract(manifest, platform, app, transport, critical_runtime, static_critical):
    ledger = manifest.get('technicalDebtLegacyFallbackLedger') if isinstance(manifest, dict) else None
    ok('Technical debt legacy/fallback cleanup ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == LEGACY_FALLBACK_CLEANUP_STAMP, 'TECH_DEBT_MANIFEST must record Phase 7 legacy/fallback cleanup')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewApiRoutes') is True and ledger.get('noNewFiles') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False
    ok('Technical debt legacy/fallback cleanup preserves contracts', rules_ok, 'legacy/fallback cleanup must not alter API, files, UI, business rules, routes, or write schema')
    app_c = compact(app)
    duplicate_patterns = [
        'vercelApiProxyEnabled:!0,vercelApiProxyEnabled:!0',
        'releaseGate:"tools/phaseN_legacy_transport_gate.py",releaseGate:"tools/phaseN_legacy_transport_gate.py"',
        'vercelEnvBuildTool:"tools/generate_vercel_env.py",releaseGate:"tools/phaseN_legacy_transport_gate.py",vercelEnvBuildTool:"tools/generate_vercel_env.py"',
        'root.APP_CONFIG.vercelApiProxyEnabled=!0,root.APP_CONFIG.vercelApiProxyEnabled=!0',
        'root.APP_CONFIG.releaseGate="tools/phaseN_legacy_transport_gate.py",root.APP_CONFIG.releaseGate="tools/phaseN_legacy_transport_gate.py"',
    ]
    ok('app-config duplicate legacy/proxy flags removed', not any(p in app_c for p in duplicate_patterns), 'app-config must not carry duplicate releaseGate/vercelApiProxyEnabled/vercelEnvBuildTool assignments')
    ok('required compatibility entrypoints retained after fallback cleanup', platform.count('function doGet(') == 1 and platform.count('function doPost(') == 1 and platform.count('function apiGithubBridgeCall(') == 1, 'required GAS compatibility entrypoints must remain single')
    crit = compact(critical_runtime + static_critical)
    ok('critical runtime fallback is router-only when direct GAS method missing', 'apiRouter' in crit and 'google.script.run' in crit and 'serverfunction' in crit.lower().replace(' ',''), 'GAS direct fallback must route through apiRouter rather than adding direct facade APIs')
    ok('browser transport stays Vercel proxy with GAS direct fallback after cleanup', '/api/gas' in transport and '/api/login' in transport and 'function runGasDirectTransport' in transport and '__githubFastLogin' not in transport and 'document.createElement("iframe")' not in compact(transport), 'browser transport must not reintroduce JSONP or hidden bridge transport')


def check_performance_debt_contract(manifest, transport, core_runtime):
    ledger = manifest.get('technicalDebtPerformanceDebtLedger') if isinstance(manifest, dict) else None
    ok('Technical debt performance debt ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == PERFORMANCE_DEBT_STAMP, 'TECH_DEBT_MANIFEST must record Phase 8 performance debt cleanup')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewApiRoutes') is True and ledger.get('noNewFiles') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False
    ok('Technical debt performance cleanup preserves contracts', rules_ok, 'performance cleanup must not alter API, files, UI, business rules, routes, or write schema')
    t_c = compact(transport)
    c_c = compact(core_runtime)
    ok('AppTransport partial asset single-flight installed', 'assetInFlight=Object.create(null)' in transport and 'if(assetInFlight[file])returnassetInFlight[file]' in t_c and 'assetInFlight[file]=tryAt(0).then' in t_c, 'static partial loader must dedupe concurrent fetchFile calls')
    ok('AppTransport public config single-flight installed', 'publicConfigInFlight=null' in transport and 'if(publicConfigInFlight)returnpublicConfigInFlight' in t_c and 'publicConfigInFlight=fetchJsonWithTimeout' in t_c, 'public config load must dedupe concurrent calls')
    ok('AppTransport performance status exposes asset inflight metrics', 'assetCacheEntries:Object.keys(cache).length' in t_c and 'assetInFlight:Object.keys(assetInFlight).length' in t_c and 'publicConfigInFlight:!!publicConfigInFlight' in t_c, 'transport status must expose cache/in-flight performance diagnostics')
    ok('AppCacheDebtOwner refresh coalescing installed', 'timers={}' in core_runtime and 'function schedule(p,d,why,ms)' in core_runtime and 'pendingRefresh:Object.keys(timers)' in core_runtime and 'dirty-coalesced' in core_runtime, 'dirty page refreshes must be coalesced to avoid duplicate post-write reloads')


def check_uiux_debt_contract(manifest, gas_index, static_index):
    ledger = manifest.get('technicalDebtUiUxDebtLedger') if isinstance(manifest, dict) else None
    ok('Technical debt UI/UX debt ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == UIUX_DEBT_STAMP, 'TECH_DEBT_MANIFEST must record Phase 9 UI/UX debt cleanup')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewApiRoutes') is True and ledger.get('noNewFiles') is True and ledger.get('businessLogicChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False and ledger.get('uiUxImproved') is True
    ok('Technical debt UI/UX cleanup preserves contracts', rules_ok, 'UI/UX cleanup must not alter API, files, business rules, routes, or write schema')
    required=['/*td-p9-uiux*/','เลื่อนซ้าย-ขวาเพื่อดูข้อมูลเพิ่มเติม','prefers-reduced-motion:reduce','-webkit-overflow-scrolling:touch','.mobile-topbar-title-wrap']
    ok('Mobile UI/UX responsive guard installed in canonical index', all(x in gas_index for x in required), 'canonical Index must contain Phase 9 mobile UI/UX guard')
    ok('Mobile UI/UX responsive guard installed in static index', all(x in static_index for x in required), 'static index must contain Phase 9 mobile UI/UX guard')


def check_quality_gate_contract(manifest, router, transport, common, gas_api, login_api, public_config_api, critical_runtime, static_critical, dashboard_page, reporttrack_page, meeting_page, app_index_bootstrap):
    ledger = manifest.get('technicalDebtQualityGateLedger') if isinstance(manifest, dict) else None
    ok('Technical debt Phase 10 quality gate ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == QUALITY_GATE_STAMP, 'TECH_DEBT_MANIFEST must record Phase 10 quality gate hardening')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewApiRoutes') is True and ledger.get('noNewFiles') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False
    ok('Technical debt Phase 10 quality gate preserves contracts', rules_ok, 'quality gate hardening must not alter API, files, UI, business rules, routes, or write schema')
    smoke_methods = ['apiSearchCasesLite','apiGetTracking','apiGetDashboardBundle','apiListCommitteeMeetings','apiBudgetGetSummary','apiGetPeoplePageBundle']
    ok('Quality gate critical smoke API methods remain routed', all(method in router for method in smoke_methods), 'router must keep critical read methods: ' + ', '.join(smoke_methods))
    ok('Quality gate Vercel proxy uses server env only', 'process.env.GAS_WEB_APP_URL' in common and 'process.env.VERCEL_GAS_WEB_APP_URL' in common and 'NEXT_PUBLIC_GAS_WEB_APP_URL' not in common and 'body.clientGasWebAppUrl||body.gasWebAppUrl' not in gas_api and 'body.clientGasWebAppUrl||body.gasWebAppUrl' not in login_api and 'searchParams.get("gasWebAppUrl")' not in public_config_api, 'Vercel proxy must not accept client supplied GAS URL')
    ok('Quality gate GAS direct AppTransport installed', 'function gasDirectAvailable()' in transport and 'function runGasDirectTransport' in transport and 'apiGithubBridgeCall' in transport and 'google.script.run' in transport, 'GAS-hosted app must call existing apiGithubBridgeCall/apiRouter through google.script.run')
    crit = compact(critical_runtime + '\n' + static_critical)
    ok('Quality gate GAS direct fallback routes through apiRouter', 'apiRouter' in crit and 'google.script.run' in crit and ('serverfunction' in crit.lower() or 'server function' in (critical_runtime + static_critical).lower()), 'GAS direct runtime must route missing direct functions through apiRouter')
    dash_c = compact(dashboard_page)
    ok('Quality gate Dashboard write invalidation installed', all(token in dashboard_page for token in ['dashboardCacheEpoch','markDashboardDirty','app:data-mutated','app:write-cache-invalidated']) and 'forceFresh' in dashboard_page and 'state.__dirtyAfterWrite' in dashboard_page, 'Dashboard must mark dirty and force fresh after write/cache invalidation')
    report_c = compact(reporttrack_page)
    ok('Quality gate Search/Report force-fresh installed', ('forceFresh:!0' in report_c or 'forceFresh:true' in report_c) and ('noCache:!0' in report_c or 'noCache:true' in report_c) and ('bypassCache:!0' in report_c or 'bypassCache:true' in report_c) and ('cacheTtlMs=0' in report_c or 'cacheTtlSeconds:0' in report_c), 'Search/Report/Track manual loads must bypass stale page/proxy cache')
    meet_c = compact(meeting_page)
    ok('Quality gate committee meeting form recovery installed', 'CommitteeMeetingSystem' in meeting_page and 'committee-meeting-form-panel' in meeting_page and 'committee-meeting-form-body' in meeting_page and 'ensureCommitteeMeetingFormVisible' in meeting_page and 'setTimeout(function(){run(n+1)},80)' in meet_c, 'Committee meeting page must retry activate and force form visible when DOM mounts late')
    ok('Quality gate route template HTML mounts as DOM fragment', 'createContextualFragment' in app_index_bootstrap and 'createContextualFragment' in meeting_page and 'createContextualFragment' in critical_runtime, 'route/template fallback must mount HTML as contextual fragments, not unsafe text')
    ok('Quality gate mirror sync and static critical remain guarded', not mirror_in_sync() and critical_static_runtime_in_sync(), 'generated partial mirrors and critical-login-runtime.js must remain synced to GAS canonical sources')



def check_phase1_release_discipline_contract(manifest, package, vercel, docs_policy):
    ledger = manifest.get('phase1ProductionReleaseDisciplineLedger') if isinstance(manifest, dict) else None
    scripts = package.get('scripts', {}) if isinstance(package, dict) else {}
    build_cmd = str(scripts.get('build', ''))
    audit_cmd = str(scripts.get('audit:strict', ''))
    release_cmd = str(scripts.get('release:check', ''))
    deploy_cmd = str(scripts.get('deploy:check', ''))
    predeploy_cmd = str(scripts.get('predeploy:production', ''))
    ok('Phase 1 production release discipline ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == PHASE1_RELEASE_DISCIPLINE_STAMP, 'TECH_DEBT_MANIFEST must record Phase 1 release discipline')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewFiles') is True and ledger.get('noNewApiRoutes') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False
    ok('Phase 1 release discipline preserves contracts', rules_ok, 'release discipline must not alter files, API routes, UI, business rules, route names, or write schema')
    ok('Phase 1 Vercel build remains host-safe', vercel.get('buildCommand') == 'npm run build' and build_cmd == 'npm run check:api', 'Vercel build must stay short and non-strict; production gate is separate')
    ok('Phase 1 strict audit is blocking-capable', 'COMMISSION_STRICT_GATES=1' in audit_cmd and '--strict' in audit_cmd and 'phaseG_security_gate.py' in audit_cmd and 'phaseN_legacy_transport_gate.py' in audit_cmd, audit_cmd)
    ok('Phase 1 production release aliases installed', release_cmd == 'npm run audit:strict' and deploy_cmd == 'npm run audit:strict' and predeploy_cmd == 'npm run audit:strict', json.dumps({'release:check': release_cmd, 'deploy:check': deploy_cmd, 'predeploy:production': predeploy_cmd}, ensure_ascii=False))
    docs_required = [
        'npm run build` is intentionally Vercel-host safe',
        'not** the final production release gate',
        'npm run audit:strict',
        'npm run release:check',
        'do not promote a ZIP that has only passed `npm run build`',
    ]
    ok('Phase 1 release policy documented', all(token in docs_policy for token in docs_required) and 'or simply:' not in docs_policy, 'docs/SINGLE_SOURCE_POLICY.md must state audit:strict is the production gate and must not present npm run build as sufficient')
    ok('Phase 1 manifest release gate names strict audit', isinstance(ledger, dict) and ledger.get('productionReleaseGate') == 'npm run audit:strict' and ledger.get('requiresStrictGates') is True and ledger.get('forbiddenProductionShortcut') == 'npm run build only', 'manifest ledger must block build-only production promotion')




def check_phase3_cache_data_freshness_contract(manifest, core_runtime, budget_page, docs_policy):
    ledger = manifest.get('phase3CacheDataFreshnessLedger') if isinstance(manifest, dict) else None
    core_c = compact(core_runtime)
    budget_c = compact(budget_page)
    ok('Phase 3 cache/data freshness ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == PHASE3_CACHE_DATA_FRESHNESS_STAMP, 'TECH_DEBT_MANIFEST must record Phase 3 cache/data freshness')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewFiles') is True and ledger.get('noNewApiRoutes') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False
    ok('Phase 3 cache freshness preserves contracts', rules_ok, 'Phase 3 must not alter files, API routes, UI, business rules, route names, or write schema')
    ok('Phase 3 AppDataFreshnessOwner installed', 'AppDataFreshnessOwner' in core_runtime and PHASE3_CACHE_DATA_FRESHNESS_STAMP in core_runtime and 'app:data-freshness-changed' in core_runtime, 'core runtime must expose freshness owner and event')
    ok('Phase 3 client cache key includes freshness/write epoch', 'epoch=String(Math.max(Number(root.__APP_WRITE_CACHE_EPOCH__||0)||0,Number(root.__APP_DATA_FRESHNESS_EPOCH__||0)||0))' in core_c, 'client cache key must change after write/freshness epoch')
    ok('Phase 3 write events advance freshness owner', 'app:data-mutated' in core_runtime and 'app:write-cache-invalidated' in core_runtime and '.touch' in core_runtime, 'write/cache events must advance freshness owner')
    ok('Phase 3 budget external mutation refresh installed', 'budgetCURRENTBBindFreshnessEvents' in budget_page and 'phase3-freshness' in budget_page and 'app:data-freshness-changed' in budget_page, 'budget page must mark visible views dirty after external write/cache events')
    ok('Phase 3 documentation installed', PHASE3_CACHE_DATA_FRESHNESS_STAMP in docs_policy and 'Cache/Data Freshness' in docs_policy and 'npm run audit:strict' in docs_policy, 'SINGLE_SOURCE_POLICY must document Phase 3 freshness and strict release gate')


def check_phase4_write_delete_reliability_contract(manifest, platform, router, docs_policy):
    ledger = manifest.get('phase4WriteDeleteReliabilityLedger') if isinstance(manifest, dict) else None
    platform_c = compact(platform)
    router_c = compact(router)
    ok('Phase 4 write/delete reliability ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == PHASE4_WRITE_DELETE_RELIABILITY_STAMP, 'TECH_DEBT_MANIFEST must record Phase 4 write/delete reliability')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewFiles') is True and ledger.get('noNewApiRoutes') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False and ledger.get('writeRouteCount') == 27
    ok('Phase 4 write/delete reliability preserves contracts', rules_ok, 'Phase 4 must not alter files, API routes, UI, business rules, route names, or write schema')
    ok('Phase 4 platform reliability owner installed', 'APP_PHASE4_WRITE_DELETE_RELIABILITY_CONTRACT' in platform and PHASE4_WRITE_DELETE_RELIABILITY_STAMP in platform and 'function _platformPhase4WriteDeleteReliabilityStatus_' in platform and 'function _platformPhase4WriteDeleteReliabilityForMethod_' in platform, 'platform must expose Phase 4 write/delete reliability contract')
    ok('Phase 4 writeGateway attaches reliability metadata', 'meta.phase4WriteDeleteReliabilityStamp=APP_PHASE4_WRITE_DELETE_RELIABILITY_CONTRACT.stamp' in platform_c and 'meta.phase4WriteDeleteReliabilityContract=_platformPhase4WriteDeleteReliabilityForMethod_' in platform_c and 'phase4WriteDeleteReliabilityContract:_platformPhase4WriteDeleteReliabilityForMethod_' in platform_c, 'writeGateway success/error envelopes must attach Phase 4 reliability metadata')
    ok('Phase 4 router reliability status installed', 'ROUTER_PHASE4_WRITE_DELETE_RELIABILITY_STAMP' in router and 'function _routerPhase4WriteDeleteReliabilityStatus_' in router and 'phase4WriteDeleteReliability:_routerPhase4WriteDeleteReliabilityStatus_(registry)' in router_c, 'api route contract must expose Phase 4 write/delete reliability status')
    critical_tokens = ['apiDeleteCase:["case","dashboard"]','apiDeleteMeetingLog:["meeting","dashboard"]','apiDeleteLetter:["letters","tracking","dashboard"]','apiDeletePetitioner:["people","petitioner","case","dashboard"]','apiBudgetDeleteImport:["budget","dashboard"]','apiAdminDeleteUser:["admin-users","admin"]']
    ok('Phase 4 critical delete invalidation matrix locked', all(token in router for token in critical_tokens) and all(token in platform for token in critical_tokens), 'critical delete routes must keep deterministic invalidation targets')
    ok('Phase 4 documentation installed', PHASE4_WRITE_DELETE_RELIABILITY_STAMP in docs_policy and 'Write/Delete Reliability' in docs_policy and '27 write APIs' in docs_policy and 'npm run audit:strict' in docs_policy, 'SINGLE_SOURCE_POLICY must document Phase 4 reliability and strict release gate')



def _five_digit_css_hex_tokens(html: str):
    tokens=[]
    for block in re.findall(r"<style[^>]*>([\s\S]*?)</style>", html or "", flags=re.I):
        for m in re.finditer(r"#[0-9a-fA-F]{5}\b", block):
            tokens.append(m.group(0))
    return tokens

def _duplicate_html_ids(html: str):
    counts = {}
    for m in re.finditer(r"\bid\s*=\s*(['\"])(.*?)\1", html or "", re.I | re.S):
        value = (m.group(2) or '').strip()
        if value:
            counts[value] = counts.get(value, 0) + 1
    return sorted([key for key, value in counts.items() if value > 1])

def check_phase5_uiux_modernization_contract(manifest, gas_index, static_index, docs_policy):
    ledger = manifest.get('phase5UiUxModernizationLedger') if isinstance(manifest, dict) else None
    ok('Phase 5 UI/UX modernization ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == PHASE5_UIUX_MODERNIZATION_STAMP, 'TECH_DEBT_MANIFEST must record Phase 5 UI/UX modernization')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewFiles') is True and ledger.get('noNewApiRoutes') is True and ledger.get('businessLogicChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False and ledger.get('uiUxImproved') is True and ledger.get('domIdsChanged') is False
    ok('Phase 5 UI/UX modernization preserves contracts', rules_ok, 'Phase 5 may improve UI but must not alter files, API routes, business rules, route names, write schema, or DOM ids')
    required = ['app-phase5-uiux-modernization', 'AppPhase5UiUx', PHASE5_UIUX_MODERNIZATION_STAMP, 'phase5-table-scroll-region', 'modal-dialog-scrollable', 'aria-label","ตารางข้อมูล เลื่อนซ้ายขวาเพื่อดูข้อมูลเพิ่มเติม']
    ok('Phase 5 UI owner installed in canonical index', all(token in gas_index for token in required), 'canonical Index must install AppPhase5UiUx owner and mobile/table/modal guards')
    ok('Phase 5 UI owner installed in static index', all(token in static_index for token in required), 'static index must install AppPhase5UiUx owner and mobile/table/modal guards')
    bad_gas = _five_digit_css_hex_tokens(gas_index)
    bad_static = _five_digit_css_hex_tokens(static_index)
    ok('Phase 5 CSS color tokens are standards-compliant in indexes', not bad_gas and not bad_static, '5-digit #rgbAA tokens must be expanded to #rrggbbAA: gas=' + ','.join(sorted(set(bad_gas))) + ' static=' + ','.join(sorted(set(bad_static))))
    dup_gas = _duplicate_html_ids(gas_index)
    dup_static = _duplicate_html_ids(static_index)
    ok('Phase 5 DOM ids are unique in indexes', not dup_gas and not dup_static, 'duplicate ids: gas=' + ','.join(dup_gas) + ' static=' + ','.join(dup_static))
    ok('Phase 5 UI/UX documentation installed', PHASE5_UIUX_MODERNIZATION_STAMP in docs_policy and 'UI/UX Modernization' in docs_policy and 'AppPhase5UiUx' in docs_policy and 'npm run audit:strict' in docs_policy, 'SINGLE_SOURCE_POLICY must document Phase 5 UI/UX modernization and strict release gate')

def _script_type_from_attrs(attrs: str) -> str:
    m = re.search(r"\btype\s*=\s*(['\"])(.*?)\1", attrs or '', re.I | re.S)
    return (m.group(2) if m else '').strip().lower()

def _inline_script_syntax_errors():
    errors_found = []
    node = shutil.which('node')
    if not node:
        return ['node runtime not found for inline HTML script syntax check']
    html_paths = sorted(list((ROOT/'gas-backend').glob('*.html')) + list((ROOT/'github-pages').glob('*.html')) + list((ROOT/'github-pages'/'partials').glob('*.html')))
    skip_types = {'text/x-template', 'text/html', 'application/json', 'application/ld+json'}
    with tempfile.TemporaryDirectory(prefix='commission_html_js_') as tmp:
        tmp_path = Path(tmp)
        for path in html_paths:
            text = path.read_text(encoding='utf-8', errors='ignore')
            rel = path.relative_to(ROOT).as_posix()
            for idx, match in enumerate(re.finditer(r'<script\b([^>]*)>([\s\S]*?)</script>', text, re.I), 1):
                attrs = match.group(1) or ''
                code = match.group(2) or ''
                script_type = _script_type_from_attrs(attrs)
                if script_type in skip_types:
                    continue
                if re.search(r'\bsrc\s*=', attrs, re.I) and not code.strip():
                    continue
                cleaned = re.sub(r'<\?!=?[\s\S]*?\?>', 'undefined', code)
                if not cleaned.strip():
                    continue
                temp_file = tmp_path / (rel.replace('/', '__').replace('\\', '__') + f'__script{idx}.js')
                temp_file.write_text(cleaned, encoding='utf-8')
                result = subprocess.run([node, '--check', str(temp_file)], capture_output=True, text=True)
                if result.returncode != 0:
                    msg = (result.stderr or result.stdout or '').strip().splitlines()
                    errors_found.append(rel + f':script{idx}: ' + (' | '.join(msg[:3]) if msg else 'node --check failed'))
    return errors_found

def _extract_object_body_after_assignment(text: str, name: str) -> str:
    marker = name + '={'
    start = (text or '').find(marker)
    if start < 0:
        return ''
    i = start + len(name) + 1
    depth = 0
    in_str = None
    esc = False
    for j in range(i, len(text)):
        ch = text[j]
        if in_str:
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == in_str:
                in_str = None
            continue
        if ch in ('"', "'", '`'):
            in_str = ch
            continue
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                return text[i + 1:j]
    return ''

def _top_level_key_counts(object_body: str):
    counts = {}
    depth = 0
    in_str = None
    esc = False
    i = 0
    while i < len(object_body):
        ch = object_body[i]
        if in_str:
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == in_str:
                in_str = None
            i += 1
            continue
        if ch in ('"', "'", '`'):
            in_str = ch
            i += 1
            continue
        if ch in '{[(':
            depth += 1
            i += 1
            continue
        if ch in '}])':
            depth -= 1
            i += 1
            continue
        if depth == 0:
            m = re.match(r'\s*([A-Za-z_$][\w$]*)\s*:', object_body[i:])
            if m:
                key = m.group(1)
                counts[key] = counts.get(key, 0) + 1
                i += m.end()
                continue
        i += 1
    return counts

def check_phase6_static_qa_readiness_contract(manifest, app, docs_policy):
    ledger = manifest.get('phase6StaticQaReadinessLedger') if isinstance(manifest, dict) else None
    ok('Phase 6 static QA/readiness ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == PHASE6_STATIC_QA_READINESS_STAMP, 'TECH_DEBT_MANIFEST must record Phase 6 static QA readiness')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewFiles') is True and ledger.get('noNewApiRoutes') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False
    ok('Phase 6 static QA/readiness preserves contracts', rules_ok, 'Phase 6 must not alter files, API routes, UI, business rules, route names, or write schema')
    script_errors = _inline_script_syntax_errors()
    ok('Phase 6 inline HTML JavaScript syntax gate', not script_errors, '; '.join(script_errors[:8]))
    defaults_body = _extract_object_body_after_assignment(app, 'defaults')
    counts = _top_level_key_counts(defaults_body)
    high_risk_keys = ['releaseGate', 'vercelEnvBuildTool', 'vercelApiProxyEnabled', 'transportMode', 'hostingTarget', 'readJsonpApi', 'loginFormPost']
    duplicated = [key + '=' + str(counts.get(key, 0)) for key in high_risk_keys if counts.get(key, 0) > 1]
    ok('Phase 6 app-config high-risk default keys are single-owner', not duplicated, ', '.join(duplicated))
    ok('Phase 6 documentation installed', PHASE6_STATIC_QA_READINESS_STAMP in docs_policy and 'Static QA Readiness' in docs_policy and 'inline HTML JavaScript syntax' in docs_policy, 'SINGLE_SOURCE_POLICY must document Phase 6 static QA readiness gate')


def check_static_config_assignment_guard_contract(manifest, app, docs_policy):
    ledger = manifest.get('staticConfigAssignmentGuardLedger') if isinstance(manifest, dict) else None
    ok('Static config assignment guard ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == STATIC_CONFIG_ASSIGNMENT_GUARD_STAMP, 'TECH_DEBT_MANIFEST must record static config assignment guard')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewFiles') is True and ledger.get('noNewApiRoutes') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False
    ok('Static config assignment guard preserves contracts', rules_ok, 'config assignment cleanup must not alter files, API routes, UI, business rules, route names, or write schema')
    runtime_counts = {}
    for key in re.findall(r'root\.APP_CONFIG\.([A-Za-z_$][\w$]*)\s*=', app or ''):
        runtime_counts[key] = runtime_counts.get(key, 0) + 1
    duplicate_release_gate = runtime_counts.get('releaseGate', 0)
    ok('app-config releaseGate runtime assignment is single-owner', duplicate_release_gate == 1, 'root.APP_CONFIG.releaseGate assignment count=' + str(duplicate_release_gate))
    hard_single_owner = ['releaseGate', 'hostingTarget', 'loginFormPost', 'readJsonpApi', 'legacyTransportRemoved', 'legacyJsonpTransportRemoved', 'legacyGasBridgeTransportRemoved', 'legacyLoginPostIframeRemoved']
    duplicated = [key + '=' + str(runtime_counts.get(key, 0)) for key in hard_single_owner if runtime_counts.get(key, 0) > 1]
    ok('app-config high-risk runtime assignments are single-owner', not duplicated, ', '.join(duplicated))
    ok('Static config assignment guard documentation installed', STATIC_CONFIG_ASSIGNMENT_GUARD_STAMP in docs_policy and 'Static Config Assignment Guard' in docs_policy, 'SINGLE_SOURCE_POLICY must document static config assignment guard')
    deploy_ledger = manifest.get('deployReleaseSinglePublishGuardLedger') if isinstance(manifest, dict) else None
    ok('Deploy release single-publish guard ledger installed', isinstance(deploy_ledger, dict) and deploy_ledger.get('stamp') == DEPLOY_RELEASE_SINGLE_PUBLISH_GUARD_STAMP, 'TECH_DEBT_MANIFEST must record deploy release single-publish guard')
    deploy_rules_ok = isinstance(deploy_ledger, dict) and deploy_ledger.get('noNewFiles') is True and deploy_ledger.get('noNewApiRoutes') is True and deploy_ledger.get('businessLogicChanged') is False and deploy_ledger.get('uiUxChanged') is False and deploy_ledger.get('routeNamesChanged') is False and deploy_ledger.get('writeSchemaChanged') is False
    ok('Deploy release single-publish guard preserves contracts', deploy_rules_ok, 'deploy release publisher cleanup must not alter files, API routes, UI, business rules, route names, or write schema')
    deploy_assignments = len(re.findall(r'root\.APP_DEPLOY_RELEASE\s*=\s*Object\.assign', app or ''))
    publish_defs = len(re.findall(r'function\s+publishDeployRelease\s*\(', app or ''))
    publish_calls = len(re.findall(r'(?<!function\s)publishDeployRelease\s*\(', app or ''))
    ok('app-config APP_DEPLOY_RELEASE Object.assign is single-owner', deploy_assignments == 1, 'root.APP_DEPLOY_RELEASE Object.assign count=' + str(deploy_assignments))
    ok('app-config deploy release publisher is single-call', publish_defs == 1 and publish_calls == 1, 'publishDeployRelease definitions=' + str(publish_defs) + ' calls=' + str(publish_calls))
    ok('Deploy release single-publish guard documentation installed', DEPLOY_RELEASE_SINGLE_PUBLISH_GUARD_STAMP in docs_policy and 'Deploy Release Single-Publish Guard' in docs_policy, 'SINGLE_SOURCE_POLICY must document deploy release single-publish guard')

def _top_level_symbols(text: str):
    depth=0; in_str=None; esc=False; line=False; block=False; depth_at=[0]*(len(text)+1); i=0
    while i < len(text):
        depth_at[i]=depth
        ch=text[i]; nxt=text[i+1] if i+1 < len(text) else ''
        if line:
            if ch == '\n': line=False
            i += 1; continue
        if block:
            if ch == '*' and nxt == '/': block=False; i += 2; continue
            i += 1; continue
        if in_str:
            if esc: esc=False
            elif ch == '\\': esc=True
            elif ch == in_str: in_str=None
            i += 1; continue
        if ch == '/' and nxt == '/': line=True; i += 2; continue
        if ch == '/' and nxt == '*': block=True; i += 2; continue
        if ch in ('"', "'", '`'): in_str=ch; i += 1; continue
        if ch == '{': depth += 1
        elif ch == '}': depth -= 1
        i += 1
    out=[]
    for m in re.finditer(r'function\s+([A-Za-z_$][\w$]*)\s*\(', text or ''):
        if depth_at[m.start()] == 0: out.append((m.group(1),'function'))
    for m in re.finditer(r'\b(?:var|let|const)\s+([^;\n]+)', text or ''):
        if depth_at[m.start()] != 0: continue
        for part in m.group(1).split(','):
            mm=re.match(r'\s*([A-Za-z_$][\w$]*)\b', part)
            if mm: out.append((mm.group(1),'var'))
    return out


def _node_check_source_file(path: Path, suffix: str = None) -> str:
    node = shutil.which('node')
    if not node:
        return 'node runtime not found'
    suffix = suffix or path.suffix or '.js'
    with tempfile.TemporaryDirectory(prefix='commission_source_syntax_') as tmp:
        temp = Path(tmp) / ('source' + suffix)
        temp.write_text(path.read_text(encoding='utf-8', errors='ignore'), encoding='utf-8')
        result = subprocess.run([node, '--check', str(temp)], capture_output=True, text=True)
        if result.returncode == 0:
            return ''
        msg = (result.stderr or result.stdout or '').strip().splitlines()
        return ' | '.join(msg[:3]) if msg else 'node --check failed'


def _deep_source_syntax_errors():
    errors_found = []
    source_paths = []
    source_paths.extend(sorted((ROOT/'gas-backend').glob('*.gs')))
    source_paths.extend(sorted((ROOT/'api').glob('*.js')))
    source_paths.extend(sorted((ROOT/'github-pages').glob('*.js')))
    for path in source_paths:
        rel = path.relative_to(ROOT).as_posix()
        suffix = '.js' if path.suffix == '.gs' else path.suffix
        err = _node_check_source_file(path, suffix=suffix)
        if err:
            errors_found.append(rel + ': ' + err)
    return errors_found


def _semantic_minifier_spacing_errors():
    errors_found = []
    source_roots = [ROOT/'gas-backend', ROOT/'github-pages', ROOT/'api']
    token_rules = [
        ('return', re.compile(r'\breturn(?=[$_][A-Za-z0-9_$])'), 'expected `return $token` or `return _token`'),
        ('else', re.compile(r'\belse(?=[$_][A-Za-z0-9_$])'), 'expected `else if($token...)` or a separated `else` block'),
    ]
    for root in source_roots:
        if not root.exists():
            continue
        for path in sorted(root.rglob('*')):
            if not path.is_file() or path.suffix.lower() not in {'.html', '.js', '.gs'}:
                continue
            text = path.read_text(encoding='utf-8', errors='ignore')
            rel = path.relative_to(ROOT).as_posix()
            for keyword, token_re, hint in token_rules:
                hits = list(token_re.finditer(text))
                if hits:
                    errors_found.append(f"{rel}: {keyword} keyword glued to minifier token ({len(hits)} hit(s)); {hint}")
    return errors_found


def _interaction_ux_runtime_contract_errors():
    errors_found = []
    meeting_paths = [ROOT/'gas-backend'/'Scripts_Page_Meeting.html', ROOT/'github-pages'/'partials'/'Scripts_Page_Meeting.html']
    for path in meeting_paths:
        text = path.read_text(encoding='utf-8', errors='ignore') if path.exists() else ''
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        if 'var _Z0=_Z0' in text:
            errors_found.append(rel + ': meeting runtime constants must be explicit, not self-assigned')
        if '.js-show-meeting-detail,.js-load-meeting' not in text:
            errors_found.append(rel + ': meeting summary detail click must be covered by main event owner selector')
    people_paths = [ROOT/'gas-backend'/'Scripts_Page_People.html', ROOT/'github-pages'/'partials'/'Scripts_Page_People.html']
    for path in people_paths:
        text = path.read_text(encoding='utf-8', errors='ignore') if path.exists() else ''
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        if '#psTab.nav-link' in text:
            errors_found.append(rel + ': people tab selector must be `#psTab .nav-link`, not `#psTab.nav-link`')
    budget_paths = [ROOT/'gas-backend'/'Scripts_Page_Budget.html', ROOT/'github-pages'/'partials'/'Scripts_Page_Budget.html']
    malformed_attr = re.compile(r'<[^>\n]*(?:id|class)=\$B\d+')
    for path in budget_paths:
        text = path.read_text(encoding='utf-8', errors='ignore') if path.exists() else ''
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        hits = malformed_attr.findall(text)
        if hits:
            errors_found.append(rel + ': generated budget HTML contains literal minifier variable attributes (' + str(len(hits)) + ' hit(s))')
    return errors_found


def check_deep_source_syntax_guard_contract(manifest, docs_policy):
    ledger = manifest.get('deepSourceSyntaxGuardLedger') if isinstance(manifest, dict) else None
    ok('Deep source syntax guard ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == DEEP_SOURCE_SYNTAX_GUARD_STAMP, 'TECH_DEBT_MANIFEST must record deep source syntax guard')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewFiles') is True and ledger.get('noNewApiRoutes') is True and ledger.get('businessLogicChanged') is False and ledger.get('uiUxChanged') is False and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False
    ok('Deep source syntax guard preserves contracts', rules_ok, 'deep syntax guard must not alter files, API routes, UI, business rules, route names, or write schema')
    syntax_errors = _deep_source_syntax_errors()
    ok('Deep source syntax gate checks GAS and frontend JS', not syntax_errors, '; '.join(syntax_errors[:8]))
    minifier_spacing_errors = _semantic_minifier_spacing_errors()
    ok('Deep source semantic gate rejects keyword-token minifier spacing drift', not minifier_spacing_errors, '; '.join(minifier_spacing_errors[:8]))
    interaction_ux_errors = _interaction_ux_runtime_contract_errors()
    ok('Interaction UX runtime contract prevents meeting, people, and budget regressions', not interaction_ux_errors, '; '.join(interaction_ux_errors[:8]))
    ok('Deep source syntax guard documentation installed', DEEP_SOURCE_SYNTAX_GUARD_STAMP in docs_policy and 'Deep Source Syntax Guard' in docs_policy and 'GAS .gs' in docs_policy and 'github-pages/*.js' in docs_policy, 'SINGLE_SOURCE_POLICY must document deep source syntax guard')


def check_ai_meeting_budget_stability_contract(manifest, docs_policy):
    ledger = manifest.get('aiMeetingBudgetStabilityLedger') if isinstance(manifest, dict) else None
    ok('AI/Meeting/Budget stability ledger installed', isinstance(ledger, dict) and ledger.get('stamp') == 'production-current-ai-meeting-budget-stability-2026-07-09-r15', 'TECH_DEBT_MANIFEST must record r15 stability guard')
    rules_ok = isinstance(ledger, dict) and ledger.get('noNewFiles') is True and ledger.get('noNewApiRoutes') is True and ledger.get('routeNamesChanged') is False and ledger.get('writeSchemaChanged') is False and ledger.get('businessLogicChanged') is False
    ok('AI/Meeting/Budget stability preserves production contracts', rules_ok, 'r15 guard must not alter API routes, business logic, route names, or write schema')
    core_files = [ROOT/'gas-backend'/'Scripts_Core_Runtime.html', ROOT/'github-pages'/'partials'/'Scripts_Core_Runtime.html']
    for path in core_files:
        text = path.read_text(encoding='utf-8', errors='ignore') if path.exists() else ''
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        ok('Core slice helper is deterministic in ' + rel, 'Function.call.bind(Array.prototype[_$27])' not in text and '__sl=function(a,start)' in text, 'Core runtime must not bind Array.prototype using a token declared later')
        ok('Core appendChildren rejects parent/ancestor append in ' + rel, 'e&&e!==t&&!(e.contains&&e.contains(t))&&t[_$g](e)' in text, 'appendChildren must prevent HierarchyRequestError')
    budget_files = [ROOT/'gas-backend'/'Scripts_Page_Budget.html', ROOT/'github-pages'/'partials'/'Scripts_Page_Budget.html']
    for path in budget_files:
        text = path.read_text(encoding='utf-8', errors='ignore') if path.exists() else ''
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        ok('Budget dynamic form uses direct safe render in ' + rel, 'data-budget-direct-render","dynamic-form-safe' in text and 'Budget.dynamicForm.prePhase1HtmlOwner' not in text, 'Budget dynamic form must avoid renderer append recursion')
        ok('Budget footer relocation has ancestor guard in ' + rel, 'target!==host&&!(host.contains&&host.contains(target))&&target.appendChild(host)' in text, 'Budget footer must not append a parent into its child')
        ok('Budget seminar row append has ancestor guard in ' + rel, 'o!==a&&!(o.contains&&o.contains(a))&&a.appendChild(o)' in text, 'Budget seminar row append must reject parent/ancestor append')
    meeting_files = [ROOT/'gas-backend'/'Scripts_Page_Meeting.html', ROOT/'github-pages'/'partials'/'Scripts_Page_Meeting.html']
    for path in meeting_files:
        text = path.read_text(encoding='utf-8', errors='ignore') if path.exists() else ''
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        ok('Meeting route activation uses local pending function in ' + rel, 'applyPending()' not in text and 'if(_f55()){opened=!0;return}' in text, 'Meeting route must not call missing global applyPending()')
        ok('Meeting summary popup direct fallback installed in ' + rel, 'bindDirectFallback' in text and 'committeeMeetingSummaryDirectFallbackBound' in text and 'body.innerHTML=String(html' in text and 'body.innerHTML=String(errHtml' in text, 'Meeting summary detail popup needs direct fallback and direct render')
    ai = read('gas-backend/Code_22_AiGateway.gs')
    ok('AI gateway invoke returns structured errors', 'AppAiGateway.safeError(err,feature)' in ai and 'typeof runner!="function"' in ai, 'AI gateway invoke must not leak raw runtime exceptions')
    ok('AI gateway requires user-action signal for lazy invocation', 'function _aiHasUserActionSignal_' in ai and 'AI_USER_ACTION_REQUIRED' in ai, 'AI routes must not run from page boot or background load')
    ok('AI/Meeting/Budget stability documentation installed', 'AI / Meeting / Budget Stability Guard' in docs_policy and 'HierarchyRequestError' in docs_policy and 'applyPending()' in docs_policy, 'SINGLE_SOURCE_POLICY must document r15 stability guard')

def check_gas_global_namespace_gate():
    exact_forbidden = [r'\b_k\s*\.\s*push\s*\(', r'\bk\s*\.\s*push\s*\(', r'function\s+_k\s*\(', r'\bvar\s+_k\b']
    by_name={}
    for p in (ROOT/'gas-backend').glob('*.gs'):
        text=p.read_text(encoding='utf-8', errors='ignore')
        rel=p.relative_to(ROOT).as_posix()
        for pat in exact_forbidden:
            if re.search(pat, text):
                fail(f'GAS global namespace collision token forbidden in {rel}: {pat}')
        for name, kind in _top_level_symbols(text):
            by_name.setdefault(name, []).append((rel, kind))
    allowed_shared={'__APP_GLOBAL__','AppDomain','AppInfra','AppSecurity','AppBackendMiddleware'}
    for name, hits in sorted(by_name.items()):
        files={h[0] for h in hits}; kinds={h[1] for h in hits}
        if name in allowed_shared:
            continue
        if len(files) > 1 and 'function' in kinds:
            fail('GAS global function name collision: '+name+' -> '+', '.join(sorted({f+':'+k for f,k in hits})))
        if len(kinds) > 1 and len(files) > 1:
            fail('GAS global var/function collision: '+name+' -> '+', '.join(sorted({f+':'+k for f,k in hits})))

def main():
    for rel in REQUIRED: ok(f"required file {rel}", (ROOT/rel).exists(), rel)
    alltext=all_source_text(); docs_policy=read('docs/SINGLE_SOURCE_POLICY.md'); platform=read('gas-backend/Code_00_PlatformCore.gs'); router=read('gas-backend/Code_20_Router.gs'); app=read('github-pages/app-config.js'); transport=read('github-pages/github-gas-transport.js'); generated=read('github-pages/vercel-env.generated.js'); common=read('api/_gasProxyCommon.js'); index=read('github-pages/index.html'); diag=read('github-pages/diagnostic.html')
    vercel_text=read('vercel.json'); vercel=json.loads(vercel_text or '{}'); package=json.loads(read('package.json') or '{}'); manifest=json.loads(read('TECH_DEBT_MANIFEST.json') or '{}')
    ok('doGet single', platform.count('function doGet(')==1, str(platform.count('function doGet(')))
    ok('doPost single', platform.count('function doPost(')==1, str(platform.count('function doPost(')))
    ok('apiGithubBridgeCall compatibility endpoint single', platform.count('function apiGithubBridgeCall(')==1, str(platform.count('function apiGithubBridgeCall(')))
    ok('release stamp present', RELEASE in alltext, RELEASE)
    ok('asset stamp present', ASSET in alltext, ASSET)
    ok('transport mode present', MODE in alltext, MODE)
    ok('old previous Vercel proxy migration release removed from runtime/config/gates', ('phaseM-' + 'vercel-api-proxy-2026-07-02-r1') not in (app+transport+common+index+diag), 'old phaseM release must not remain in runtime path')
    ok('schema stamp retained', SCHEMA_STAMP in alltext, SCHEMA_STAMP)
    ok('Vercel output dir', vercel.get('outputDirectory')=='github-pages', str(vercel.get('outputDirectory')))
    vercel_build_cmd = str(vercel.get('buildCommand',''))
    package_build_cmd = str(package.get('scripts',{}).get('build',''))
    ok('Vercel buildCommand under schema limit', len(vercel_build_cmd) <= 256, f"{len(vercel_build_cmd)} chars: {vercel_build_cmd}")
    ok('Vercel build delegates to package build', vercel_build_cmd == 'npm run build', vercel_build_cmd)
    package_scripts = package.get('scripts',{})
    package_strict_cmd = str(package_scripts.get('build:strict') or package_scripts.get('audit:strict') or '')
    ok('package build is Vercel host safe', package_build_cmd == 'npm run check:api && npm run check:frontend && npm run check:inline' and 'python' not in package_build_cmd.lower(), package_build_cmd)
    ok('package build checks frontend static runtime syntax', str(package_scripts.get('check:frontend','')).count('node --check github-pages/') >= 7 and 'github-pages/github-gas-transport.js' in str(package_scripts.get('check:frontend','')), str(package_scripts.get('check:frontend','')))
    inline_cmd = str(package_scripts.get('check:inline',''))
    ok('package build checks inline HTML runtime scripts', 'github-pages/partials' in inline_cmd and 'gas-backend' in inline_cmd and 'new Function(body)' in inline_cmd and 'keyword-token drift' in inline_cmd and 'npm run check:inline' in package_build_cmd, inline_cmd)
    ok('strict audit runs Production current gate', 'phaseN_legacy_transport_gate.py' in package_strict_cmd and 'phaseG_security_gate.py' in package_strict_cmd and 'COMMISSION_STRICT_GATES=1' in package_strict_cmd and '--strict' in package_strict_cmd and 'npm run check:frontend' in package_strict_cmd and 'npm run check:inline' in package_strict_cmd, package_strict_cmd)
    obsolete_tool = ''.join(['sync', '_', 'frontend', '_', 'partials', '.py'])
    scripts_blob = json.dumps(package.get('scripts',{}), ensure_ascii=False)
    ok('package build is decoupled from obsolete mirror-sync helper', obsolete_tool not in package_build_cmd and obsolete_tool not in scripts_blob, 'package scripts must not reference obsolete mirror-sync helper')
    ok('obsolete mirror-sync helper absent from tools directory', not (ROOT/'tools'/obsolete_tool).exists(), 'obsolete helper must be absent; mirror drift is checked by Production current gate')
    pycache_hits = [x.relative_to(ROOT).as_posix() for x in ROOT.rglob('__pycache__') if x.is_dir()]
    ok('packaged source tree excludes Python bytecode cache folders', not pycache_hits, ', '.join(pycache_hits))
    ok('package engines pins Vercel Node 24.x', str(package.get('engines',{}).get('node','')) == '24.x', str(package.get('engines',{}).get('node','')))
    ok('proxy functions exist', all((ROOT/'api'/f).exists() for f in ['gas.js','login.js','public-config.js','_gasProxyCommon.js']), 'api proxy files')
    ok('server GAS env used by proxy', 'process.env.GAS_WEB_APP_URL' in common, 'server env')
    ok('proxy normalizes quoted/slashed GAS URL and clamps timeout', 'function normalizeGasWebAppUrl' in common and 'function normalizeTimeoutMs' in common and 'MAX_PROXY_TIMEOUT_MS' in common and 'timeoutMs: effectiveTimeoutMs' in common, 'proxy URL/timeout hardening')
    ok('proxy body parser accepts Buffer without losing method/payload', 'Buffer.isBuffer(req.body)' in common and 'parseJsonText(Buffer.from(req.body).toString("utf8"))' in common, 'Vercel body parser hardening')
    ok('proxy body normalizer accepts loose payload keys', 'loosePayload = Object.assign({}, body)' in common and '["method", "action", "request", "timeoutMs", "releaseStamp", "source", "bridge", "requestId"].forEach' in common, 'Vercel proxy must preserve raw username/password or query fields when caller sends method + loose fields')
    ok('Production current header used by proxy', 'X-Production-Vercel-Proxy' in common and 'X-Phase-M-Vercel-Proxy' not in common, 'proxy header')
    ok('Vercel env production-current release track', '"releaseTrack":"production-current"' in generated and '"legacyTransportRemoved":true' in generated, 'generated env metadata')
    ok('Vercel generated env has no duplicate proxy flag assignment', generated.count('vercelApiProxyEnabled:true') == 1, str(generated.count('vercelApiProxyEnabled:true')))
    ok('index uses Production current assets', RELEASE in index and MODE in index, 'index script stamps')
    stale_static_assets = []
    for m in re.finditer(r'<script\s+src="([^"]+)"', index):
        src = m.group(1)
        if src.startswith('./') and ('?v=' in src or '&v=' in src) and RELEASE not in src:
            stale_static_assets.append(src)
    ok('static runtime script cache-bust stamps match Production current release', not stale_static_assets, ', '.join(stale_static_assets))
    ok('diagnostic uses Production current assets', RELEASE in diag and MODE in diag, 'diagnostic script stamps')
    ok('app-config proxy only flags', contains_code(app, 'legacyTransportRemoved: true') and contains_code(app, 'readJsonpApi: false') and contains_code(app, 'publicJsonpReadMethods: []') and contains_code(app, 'loginFormPost: false'), 'app-config Production current flags')
    ok('transport is proxy only', 'function runVercelApiProxy' in transport and 'function runVercelLoginProxy' in transport and 'function runReadWithPolicy' in transport, 'proxy funcs')
    forbidden_transport = ['function runJsonpApi','function runGasViaClient','function runLoginPost','function runFastLoginJsonp','__githubFastLogin=1','document.createElement(\'iframe\')','document.createElement("iframe")','postMessage(','GAS_IFRAME_TRANSPORT_REQUEST']
    bad=[x for x in forbidden_transport if x in transport]
    ok('legacy browser transport functions removed', not bad, ', '.join(bad))
    ok('transport reports legacy removed', contains_code(transport, '__legacyTransportRemoved = true') and contains_code(transport, 'jsonpRemoved:true') and contains_code(transport, 'hiddenBridgeRemoved:true') and contains_code(transport, 'loginPostIframeRemoved:true'), 'status flags')
    ok('write invalidates client read cache', 'function runWriteWithPolicy' in transport and 'before-write' in transport and 'productionWriteCacheInvalidation' in transport and 'apiCacheEpoch' in transport, 'write cache invalidation')
    ok('auth/bootstrap reads are not cached', 'function isCacheSafeReadMethod' in transport and 'isAuthOrBootstrapMethod' in transport and 'apiSessionResume' in transport and 'apiBootstrap' in transport, 'auth/bootstrap cache bypass')
    ok('transport options are propagated', contains_code(transport, 'root.AppTransport.run = function(fn, args, options)') and contains_code(transport, 'runVercelApiProxy(req.method, req.payload || {}, options || {})'), 'per-call timeout/options propagation')
    critical_runtime_js = read('github-pages/critical-login-runtime.js')
    ok('critical runtime forwards transport options', contains_code(critical_runtime_js, 'RT.rawRun = RT.rawRun || function(fn, args, options)') and contains_code(critical_runtime_js, 'RT.call = RT.call || function(m, p, options)'), 'critical runtime options')
    app_index_bootstrap = read('github-pages/app-index-bootstrap.js')
    after_swal = read('github-pages/app-index-foundation-after-swal.js')
    backend_assets = read('gas-backend/Code_03_Platform_Assets.gs')
    gas_index = read('gas-backend/Index.html')
    ok('critical runtime single owner for Vercel static manifest', contains_code(app, 'appCritical:{files:[]}') and contains_code(app, 'upfrontScripts:[]') and contains_code(after_swal, 'appCritical:{files:[]}') and contains_code(after_swal, 'upfrontScripts:[]'), 'static frontend must not load Scripts_Critical_Login_Runtime after critical-login-runtime.js')
    ok('critical runtime bootstrap fallback does not reintroduce duplicate partial', '||["Scripts_Critical_Login_Runtime"]' not in app_index_bootstrap and "||['Scripts_Critical_Login_Runtime']" not in gas_index, 'bootstrap include-map fallback must be empty because critical runtime is already explicitly owned')
    ok('GAS critical bundle retained but not marked as duplicate upfront include', contains_code(backend_assets, 'appCritical:{files:["Scripts_Critical_Login_Runtime"]}') and contains_code(backend_assets, 'upfrontScripts:[]') and "includeProductionBundle_('appCritical')" in gas_index, 'GAS direct path keeps appCritical inline owner while dynamic upfrontScripts stays empty')
    ok('critical runtime static source generated from GAS canonical', critical_static_runtime_in_sync() and len(critical_runtime_js.encode('utf-8')) <= 87000 and '<script' not in critical_runtime_js.lower(), 'critical-login-runtime.js must be generated from gas-backend/Scripts_Critical_Login_Runtime.html and remain under 87 KB')
    ok('manifest records critical runtime duplication cleanup', isinstance(manifest.get('criticalRuntimeDuplicationCleanupLedger'), dict) and manifest.get('criticalRuntimeDuplicationCleanupLedger',{}).get('stamp')=='production-current-critical-runtime-single-owner-2026-07-06-r1' and manifest.get('criticalRuntimeDuplicationCleanupLedger',{}).get('noApiContractChange') is True, 'TECH_DEBT_MANIFEST must record step 4 cleanup without API contract change')
    ok('manifest records critical runtime generated source cleanup', isinstance(manifest.get('criticalRuntimeGeneratedSourceLedger'), dict) and manifest.get('criticalRuntimeGeneratedSourceLedger',{}).get('stamp')=='production-current-critical-runtime-generated-source-2026-07-06-r1' and manifest.get('criticalRuntimeGeneratedSourceLedger',{}).get('maxStaticCriticalRuntimeBytes')==87000 and manifest.get('criticalRuntimeGeneratedSourceLedger',{}).get('noApiContractChange') is True, 'TECH_DEBT_MANIFEST must record generated-source cleanup without API contract change')
    ok('manifest records Core Runtime slimming cleanup', isinstance(manifest.get('coreRuntimeSlimmingLedger'), dict) and manifest.get('coreRuntimeSlimmingLedger',{}).get('stamp')=='production-current-core-runtime-facade-slim-2026-07-06-r1' and manifest.get('coreRuntimeSlimmingLedger',{}).get('maxBackendCoreRuntimeBytes')==360000 and manifest.get('coreRuntimeSlimmingLedger',{}).get('noApiContractChange') is True, 'TECH_DEBT_MANIFEST must record Core Runtime slimming without API contract change')
    ok('manifest records Meeting page slimming cleanup', isinstance(manifest.get('meetingPageSlimmingLedger'), dict) and manifest.get('meetingPageSlimmingLedger',{}).get('stamp')=='production-current-meeting-page-slim-2026-07-06-r1' and manifest.get('meetingPageSlimmingLedger',{}).get('maxBackendMeetingBytes')==220000 and manifest.get('meetingPageSlimmingLedger',{}).get('maxMirrorMeetingBytes')==220000 and manifest.get('meetingPageSlimmingLedger',{}).get('noApiContractChange') is True, 'TECH_DEBT_MANIFEST must record Meeting page slimming without API contract change')
    ok('manifest records Phase 2 runtime slimming release gate', isinstance(manifest.get('phase2RuntimeSlimmingLedger'), dict) and manifest.get('phase2RuntimeSlimmingLedger',{}).get('stamp')==PHASE2_RUNTIME_SLIMMING_STAMP and manifest.get('phase2RuntimeSlimmingLedger',{}).get('maxBackendMeetingBytes')==220000 and manifest.get('phase2RuntimeSlimmingLedger',{}).get('maxMirrorMeetingBytes')==220000 and manifest.get('phase2RuntimeSlimmingLedger',{}).get('noApiContractChange') is True and manifest.get('phase2RuntimeSlimmingLedger',{}).get('businessLogicChanged') is False, 'TECH_DEBT_MANIFEST must record Phase 2 runtime slimming without API/business rule changes')
    ok('manifest records Cases domain slimming cleanup', isinstance(manifest.get('casesDomainSlimmingLedger'), dict) and manifest.get('casesDomainSlimmingLedger',{}).get('stamp')=='production-current-cases-domain-helper-owner-slim-2026-07-06-r1' and manifest.get('casesDomainSlimmingLedger',{}).get('maxBackendCasesBytes')==327000 and manifest.get('casesDomainSlimmingLedger',{}).get('noApiContractChange') is True and manifest.get('casesDomainSlimmingLedger',{}).get('businessLogicChanged') is False, 'TECH_DEBT_MANIFEST must record Cases domain helper-owner slimming without API contract change')
    ok('manifest records Budget domain slimming cleanup', isinstance(manifest.get('budgetDomainSlimmingLedger'), dict) and manifest.get('budgetDomainSlimmingLedger',{}).get('stamp')=='production-current-budget-domain-helper-owner-slim-2026-07-06-r1' and manifest.get('budgetDomainSlimmingLedger',{}).get('maxBackendBudgetBytes')==228000 and manifest.get('budgetDomainSlimmingLedger',{}).get('noApiContractChange') is True and manifest.get('budgetDomainSlimmingLedger',{}).get('businessLogicChanged') is False, 'TECH_DEBT_MANIFEST must record Budget domain helper-owner slimming without API contract change')
    ok('manifest records source size regression guard', isinstance(manifest.get('sizeRegressionGuardLedger'), dict) and manifest.get('sizeRegressionGuardLedger',{}).get('stamp')=='production-current-size-regression-guard-2026-07-06-r1' and manifest.get('sizeRegressionGuardLedger',{}).get('totalSourceBudgetBytes')==PHASE5_TOTAL_SOURCE_BUDGET and manifest.get('sizeRegressionGuardLedger',{}).get('noNewFiles') is True and manifest.get('sizeRegressionGuardLedger',{}).get('noNewApiRoutes') is True, 'TECH_DEBT_MANIFEST must record source size regression guard')
    ok('manifest records Vercel Node 24 runtime pin', isinstance(manifest.get('vercelNodeRuntimePinLedger'), dict) and manifest.get('vercelNodeRuntimePinLedger',{}).get('requiredNodeEngine')=='24.x' and manifest.get('vercelNodeRuntimePinLedger',{}).get('businessLogicChanged') is False, 'TECH_DEBT_MANIFEST must record Node 24.x runtime pin without API or business logic change')
    ok('manifest records Vercel build host safe split', isinstance(manifest.get('vercelBuildHostSafeLedger'), dict) and manifest.get('vercelBuildHostSafeLedger',{}).get('stamp')=='production-current-vercel-build-host-safe-2026-07-06-r1' and manifest.get('vercelBuildHostSafeLedger',{}).get('vercelBuild')=='npm run check:api' and manifest.get('vercelBuildHostSafeLedger',{}).get('noApiContractChange') is True and manifest.get('vercelBuildHostSafeLedger',{}).get('businessLogicChanged') is False, 'TECH_DEBT_MANIFEST must record Vercel-safe build split without API or business logic change')
    ok('manifest records Budget UI modernization', isinstance(manifest.get('budgetUiModernizationLedger'), dict) and manifest.get('budgetUiModernizationLedger',{}).get('stamp')=='production-current-budget-ui-modern-current-2026-07-06-r1' and manifest.get('budgetUiModernizationLedger',{}).get('noApiContractChange') is True and manifest.get('budgetUiModernizationLedger',{}).get('businessLogicChanged') is False and manifest.get('budgetUiModernizationLedger',{}).get('maxBackendBudgetPageBytes')==160000 and manifest.get('budgetUiModernizationLedger',{}).get('maxMirrorBudgetPageBytes')==160100, 'TECH_DEBT_MANIFEST must record Budget UI modernization without API or business logic change')
    ok('manifest records all systems UI modernization', isinstance(manifest.get('allSystemsUiModernizationLedger'), dict) and manifest.get('allSystemsUiModernizationLedger',{}).get('stamp')=='production-current-all-systems-ui-modern-2026-07-06-r1' and manifest.get('allSystemsUiModernizationLedger',{}).get('owner')=='app-global-ui-modern-current' and manifest.get('allSystemsUiModernizationLedger',{}).get('noApiContractChange') is True and manifest.get('allSystemsUiModernizationLedger',{}).get('businessLogicChanged') is False and manifest.get('allSystemsUiModernizationLedger',{}).get('maxGasIndexBytes')==281000 and manifest.get('allSystemsUiModernizationLedger',{}).get('maxStaticIndexBytes')==203000, 'TECH_DEBT_MANIFEST must record all-systems UI modernization without API or business logic change')
    static_index = read('github-pages/index.html')
    ok('all systems UI owner installed in both indexes', all(token in gas_index and token in static_index for token in ['app-global-ui-modern-current','--ui-modern-blue','#p-search','#p-track','#p-report','#p-petitioner','#p-meeting','#p-committee-meeting','#p-personnel','#p-budget','#p-admin']) and len(gas_index.encode('utf-8')) <= PHASE5_SIZE_BUDGETS['gas-backend/Index.html'] and len(static_index.encode('utf-8')) <= PHASE5_SIZE_BUDGETS['github-pages/index.html'], 'global UI owner must style every major system page in GAS and static indexes and remain under size budget')
    meeting_page = read('gas-backend/Scripts_Page_Meeting.html')
    ok('Meeting page reuses one committee meeting date formatter', 'fmtDate:fmtDate' in meeting_page and 'var owner=root.CommitteeMeetingStandalonePrint' in meeting_page and 'owner&&__appIsFn(owner.fmtDate)?owner.fmtDate(v)' in compact(meeting_page), 'CommitteeMeetingSummaryDetail must reuse CommitteeMeetingStandalonePrint.fmtDate instead of carrying a second date parser')
    ok('Meeting page AppPages adapter retained after slimming', '__meetingAppPageAdapterReady' in meeting_page and 'AppPages.register("meeting",mod)' in compact(meeting_page) and 'registerActions("meeting"' in compact(meeting_page) and 'meetingDeleteLogSinglePath' in meeting_page, 'Meeting AppPages module/actions must survive slimming')
    core_runtime = read('gas-backend/Scripts_Core_Runtime.html')
    admin_page = read('gas-backend/Scripts_Page_Admin.html')
    ok('core runtime sends transport options directly', contains_code(core_runtime, 'root.AppTransport.run(method, payload || {') and contains_code(core_runtime, 'options || {') and contains_code(core_runtime, 'previousRuntimeCall.call(runtime, method, payload || {'), 'single-owner runtime options propagation')
    ok('runtime write clears sessionStorage client cache', 'function invalidateWriteCaches' in core_runtime and 'AppClientCacheOwner' in core_runtime and 'app:write-cache-invalidated' in core_runtime, 'runtime AppClientCacheOwner invalidation')
    ok('runtime write emits mutation event', 'function emitWriteMutation' in core_runtime and 'app:data-mutated' in core_runtime and 'after-write-ok' in core_runtime, 'write mutation event')
    ok('runtime write refresh broker installed', 'function installWriteRefreshBroker' in core_runtime and contains_code(core_runtime, 'pages.refresh = function') and 'AppWriteRefreshBroker' in core_runtime and 'app:write-refresh-scheduled' in core_runtime, 'active page refresh after successful write')
    ok('Phase E runtime consolidation facade installed', 'PHASEE_RUNTIME_CONSOLIDATION_STAMP' in core_runtime and 'phaseE-runtime-consolidation-current' in core_runtime and 'AppRuntimeConsolidation' in core_runtime and 'phaseE-runtime-consolidation-facade' in core_runtime, 'runtime helpers must expose one Phase E consolidation facade without changing UI/UX')
    ok('Phase E AppUi notification/dom thin adapter installed', 'phaseE-ui-notify-dom-thin-adapter' in core_runtime and 'root.AppUi.notify=root.AppUi.notify||canonical.notify' in core_runtime and 'root.AppUi.renderHtml=root.AppUi.renderHtml||renderHtml' in core_runtime and 'runtime.notify=runtime.notify||canonical.notify' in core_runtime, 'AppUi/AppRuntime notification and DOM helpers must delegate to the canonical runtime facade')
    ok('Phase E runtime owner contract retained', 'phaseERuntimeConsolidation:PHASEE_RUNTIME_CONSOLIDATION_STAMP' in core_runtime and 'phaseERuntimeConsolidation=PHASEE_RUNTIME_CONSOLIDATION_STAMP' in compact(core_runtime), 'runtime owner ledger must expose Phase E consolidation stamp')
    ok('Phase E2 runtime slimming installed', 'PHASEE2_RUNTIME_SLIMMING_STAMP' in core_runtime and 'phaseE2-runtime-slimming-current' in core_runtime and '__Scripts_Core_Runtime_Html_C8_' not in core_runtime and '__E2_' in core_runtime and 'stalePhase2RuntimeMetadataRemoved=!0' in compact(core_runtime), 'private generated helper prefix must be collapsed and stale Phase 2 runtime metadata removed')
    ok('Phase E3 runtime alias cleanup installed', 'PHASEE3_RUNTIME_ALIAS_CLEANUP_STAMP' in core_runtime and 'phaseE3-runtime-alias-cleanup-current' in core_runtime and '__runtimeAliasPhaseE3:PHASEE3_RUNTIME_ALIAS_CLEANUP_STAMP' in compact(core_runtime) and 'phaseE3RuntimeAliasCleanup=PHASEE3_RUNTIME_ALIAS_CLEANUP_STAMP' in compact(core_runtime) and 'aliasCleanupAdapterCount=Object.keys(THIN_ALIAS_MAP).length' in compact(core_runtime), 'thin public aliases must expose one Phase E3 cleanup stamp and delegate to canonical runtime')
    app_index_bootstrap = read('github-pages/app-index-bootstrap.js')
    ok('Phase 8 runtime page performance installed', 'PHASE8_RUNTIME_PAGE_PERFORMANCE_STAMP' in core_runtime and 'phase8-runtime-page-performance-current' in core_runtime and 'phase8RuntimePagePerformance=PHASE8_RUNTIME_PAGE_PERFORMANCE_STAMP' in compact(core_runtime), 'runtime consolidation report must expose Phase 8 page performance stamp')
    ok('Phase 8 page-scoped UI enhancement installed', 'app:page-activated",function(t2){c(t2&&t2.detail&&t2.detail.scope' in core_runtime and 'window.AppUi.enhance&&window.AppUi.enhance(phase8PageScope' in app_index_bootstrap and 'scope:phase8PageScope(id)' in app_index_bootstrap, 'route activation and AppUi enhancement must target the active page scope, not the whole document')
    ok('Phase 8 datepicker active-scope enhancement installed', 'function activeScope()' in core_runtime and 'scheduleEnhance(activeScope())' in core_runtime and 'scheduleEnhance(e&&e.detail&&e.detail.scope||activeScope())' in core_runtime, 'datepicker idle/page enhancement must scan active scope instead of document')
    ok('admin browser diagnostics slimmed', 'app-production-diagnostics-deferred-owner' not in admin_page and 'app-production-diagnostics-slim-stub-current' in admin_page and 'PRODUCTION_DIAGNOSTICS_REMOVED_FROM_BROWSER_BUNDLE' in admin_page and (ROOT/'gas-backend'/'Scripts_Page_Admin.html').stat().st_size < 75000, 'remove heavy smoke/verification implementation from browser admin bundle')
    ok('apiLogin uses /api/login only', contains_code(transport, 'runVercelLoginProxy(req.payload || {})') and 'function runLoginPost' not in transport, 'login path')
    ok('AppTransport.ping uses proxy', "apiGetRouteContract" in transport and 'vercel-api-proxy-only-ping' in transport, 'ping path')
    ok('fast-login disabled in backend', contains_code(platform, 'fastLoginJsonp:false') and 'FAST_LOGIN_JSONP_DISABLED' in platform, 'backend public config/security')
    ok('assumed bridge ready not enabled in frontend', 'assumedReady=true' not in compact(transport) and contains_code(app, 'allowAssumedBridgeReady: false'), 'assumed ready')
    ok('static API_CONTRACT disabled', contains_code(platform, 'AppBackendCore.API_CONTRACT = Object.freeze({})'), 'contract cleanup')
    ok('action token not write', 'apiIssueActionToken","viewer","auth","c"' in compact(router) and 'method!=="apiIssueActionToken"' in router, 'preflight')
    ok('Phase B write/delete flow contract installed in router', 'ROUTER_PHASEB_WRITE_FLOW_STAMP' in router and 'function _routerPhaseBWriteContractForMethod_' in router and 'function _routerPhaseBWriteFlowContractStatus_' in router, 'router must expose canonical Phase B method -> schema/route -> cache invalidation contract')
    ok('Phase B preflight uses canonical write contract', 'contract=_routerPhaseBWriteContractForMethod_(method,routeMeta)' in function_body(router, '_routerPhaseDWritePreflight_') and 'สัญญา API บันทึกข้อมูลไม่ครบถ้วน: ' in function_body(router, '_routerPhaseDWritePreflight_'), 'preflight must use Phase B contract and include method in contract error')
    ok('Phase B write route detection delegates to contract', '_routerPhaseBWriteContractForMethod_(method,routeMeta||{})' in function_body(router, '_routerIsWriteRoute_'), 'write route detection must use one production contract helper')
    ok('Phase B route meta normalized before backend boundary', 'function _routerEffectiveWriteMeta_' in router and 'phaseBWriteFlowStamp=ROUTER_PHASEB_WRITE_FLOW_STAMP' in compact(router) and 'phaseBWriteFlowContract=contract' in compact(router) and 'returnmeta?_routerEffectiveWriteMeta_(method,meta):null' in compact(router), 'write/csrf must be stamped before _backendBoundaryEnter_ so writeGateway sees write mode')
    ok('direct write calls re-enter apiRouter instead of bypassing router', 'writeGateway-direct-router-reentry' in platform and 'apiRouter({method:writeName,payload:payload||{}' in compact(platform) and 'ROUTER_WRITE_BOUNDARY_REQUIRED' in platform, 'legacy direct apiDelete/apiSave calls must be routed back through apiRouter and still keep bypass block as fallback')
    ok('SweetAlert duplicate and focus guard installed', 'swal.a11y.focus' in core_runtime and '__duplicatePopupSuppressed' in core_runtime and '__APP_LAST_SWAL_KEY__' in core_runtime, 'prevent stacked popups and aria-hidden focus warning')
    ok('Thai datepicker active-page scan optimization installed', 'thaiDate.scope' in core_runtime and '.page:not(.d-none):not([hidden])' in core_runtime, 'avoid scanning whole app on datepicker enhancement')
    ok('Thai datepicker fast-open/idle guard installed', 'thai-datepicker-fast-open-current.65' in core_runtime and 'activeInput===input&&existing' in core_runtime and 'enhance(input),close()' in core_runtime and 'Date.now()-Number(lastOpenAt||0)<500' in core_runtime and 'requestIdleCallback' in core_runtime and 'openThaiDatePicker=function(el){return el&&enhance(el),open(el)}' in core_runtime, 'avoid double open/rebuild, parent-wide scan, and eager full-page enhancement')
    ok('Production current metadata in public config', contains_code(platform, 'legacyTransportRemoved:true') and contains_code(platform, 'legacyJsonpTransportRemoved:true') and contains_code(platform, 'legacyGasBridgeTransportRemoved:true') and contains_code(platform, 'legacyLoginPostIframeRemoved:true'), 'backend public config metadata')
    for api in CRITICAL_APIS: ok(f'critical API {api}', api in router or api in platform, api)
    css_sources = {"gas-backend/Index.html": read('gas-backend/Index.html'), "github-pages/index.html": index}
    css_bad_literals = ["body.app-ready#login-page", "#p-dash.modern-dash-hero", "calc(100%-", "calc(100%+", "padding:.58rem.82rem"]
    css_bad_hits = []
    for css_name, css_text in css_sources.items():
        for bad_css in css_bad_literals:
            if bad_css in css_text:
                css_bad_hits.append(css_name + ":" + bad_css)
        for rx in [r"padding:\.[0-9]+rem\.[0-9]+rem", r"margin:\.[0-9]+rem\.[0-9]+rem", r"gap:\.[0-9]+rem\.[0-9]+rem", r"calc\([^)]*%-[^)]*\)"]:
            if re.search(rx, css_text):
                css_bad_hits.append(css_name + ":" + rx)
    ok('ui css compaction safety', not css_bad_hits, ', '.join(css_bad_hits))
    budget_backend = read('gas-backend/Code_32_Domain_Budget.gs')
    dashboard_backend = read('gas-backend/Code_30_Domain_Cases.gs')
    dash_budget_body = function_body(dashboard_backend, '_dashboardBudgetFromBudgetDomainPhaseE_')
    api_budget_summary_body = function_body(budget_backend, 'apiBudgetGetSummary')
    ok('Phase 4 budget dashboard owner delegated to BudgetDomain', 'BudgetDomain.getDashboardSummaryForDashboard' in dash_budget_body and '_getDashboardBudgetByPlanCurrentFYImpl_' not in dash_budget_body and 'BudgetImports' not in dashboard_backend and 'budget delegated to BudgetDomain' in dashboard_backend, 'dashboard budget must not own BudgetImports reads')
    ok('Phase 4 apiBudgetGetSummary dashboard hydration stays in BudgetDomain facade', 'BudgetDomain.getDashboardSummaryForDashboard' in api_budget_summary_body and '_budgetGetDashboardSummaryForDashboardPhaseE_(dashPayload)' not in api_budget_summary_body and 'phase4-budget-domain-owner-unavailable' in api_budget_summary_body, 'no direct dashboard fallback from apiBudgetGetSummary')
    ok('Phase 4 budget owner contract stamp', 'PHASE4_BUDGET_SINGLE_OWNER_STAMP' in budget_backend and 'dashboardBudgetOwner:"BudgetDomain.getDashboardSummaryForDashboard"' in compact(budget_backend), 'budget single owner stamp')
    ok('Phase C Code_30 domain status consolidation installed', 'PHASEC_DOMAIN_CONSOLIDATION_STAMP' in dashboard_backend and 'function _domainStatusPhaseC_' in dashboard_backend and 'function _phaseCDomainConsolidationContract_' in dashboard_backend and 'CaseDomain.PHASEC_CONSOLIDATION=_phaseCDomainConsolidationContract_()' in compact(dashboard_backend), 'Code_30 domain status metadata must have one production factory and a Phase C contract')
    phasec_status_contracts = ['CaseDomain.status=function(){return _domainStatusPhaseC_(CaseDomain,"CaseDomain")}', 'TrackingDomain.status=function(){return _domainStatusPhaseC_(TrackingDomain,"TrackingDomain")}', 'MeetingDomain.status=function(){return _domainStatusPhaseC_(MeetingDomain,"MeetingDomain")}', 'DashboardDomain.status=function(){return _domainStatusPhaseC_(DashboardDomain,"DashboardDomain"']
    ok('Phase C status functions use one factory', all(compact(x) in compact(dashboard_backend) for x in phasec_status_contracts) and 'owner:"TrackingDomain",boundary:TrackingDomain.BOUNDARY' not in dashboard_backend and 'owner:"MeetingDomain",boundary:MeetingDomain.BOUNDARY' not in dashboard_backend, 'Case/Tracking/Meeting/Dashboard status helpers must not re-declare duplicate inline objects')
    ok('Phase D Code_30 status mapper dedup installed', 'PHASED_CODE30_MAPPER_DEDUP_STAMP' in dashboard_backend and 'function _caseStatusNormalizePhaseD_' in dashboard_backend and 'function _phaseDCode30MapperDedupContract_' in dashboard_backend and 'CaseDomain.PHASED_MAPPER_DEDUP=_phaseDCode30MapperDedupContract_()' in compact(dashboard_backend), 'case/report/dashboard status mappers must use one Phase D canonical mapper')
    phaseD_status_bodies = [function_body(dashboard_backend, '_caseNormalizeStatusForDisplay_'), function_body(dashboard_backend, '_caseReportStatusPhase3_'), function_body(dashboard_backend, '_dashboardNormalizeCaseStatusForCount_')]
    ok('Phase D status consumers delegate to one mapper', all('_caseStatusNormalizePhaseD_' in b for b in phaseD_status_bodies) and all('AppBackendCore.normalizeCaseStatus' not in b for b in phaseD_status_bodies), 'display/report/dashboard status consumers must not reimplement normalizeCaseStatus')
    ok('Phase D2 Code_30 row/date mapper dedup installed', 'PHASED2_CODE30_ROW_DATE_MAPPER_DEDUP_STAMP' in dashboard_backend and 'function _caseDateTextPhaseD2_' in dashboard_backend and 'function _caseDateOnlyPhaseD2_' in dashboard_backend and 'function _caseRowPickPhaseD2_' in dashboard_backend and 'function _phaseD2Code30RowDateMapperDedupContract_' in dashboard_backend and 'CaseDomain.PHASED2_ROW_DATE_MAPPER_DEDUP=_phaseD2Code30RowDateMapperDedupContract_()' in compact(dashboard_backend), 'meeting/dashboard/tracking/letter date helpers must use one Phase D2 mapper and contract')
    phaseD2_date_bodies = [function_body(dashboard_backend, '_committeeMeetingDateText_'), function_body(dashboard_backend, '_dashboardDate_'), function_body(dashboard_backend, '_trackingDateOnly_'), function_body(dashboard_backend, '_trackingDueDateOnly_'), function_body(dashboard_backend, '_normalizeLetterDateFromFields_')]
    ok('Phase D2 date consumers delegate to one mapper', all(('_caseDateTextPhaseD2_' in b or '_caseDateOnlyPhaseD2_' in b) for b in phaseD2_date_bodies) and 'new Date(value)' not in function_body(dashboard_backend, '_trackingDateOnly_') and 'new Date(value)' not in function_body(dashboard_backend, '_trackingDueDateOnly_') and 'new Date(raw)' not in function_body(dashboard_backend, '_dashboardDate_'), 'date consumers must not reimplement direct parsing/date normalization')
    ok('Phase D2 row picker used in meeting row mapper', '_caseRowPickPhaseD2_' in function_body(dashboard_backend, '_normalizeMeetingLogRow_'), 'meeting history row mapper must use single Phase D2 row picker for aliased fields')
    ok('Cases domain helper owners installed after slimming', all(token in dashboard_backend for token in ['function _c30S_', 'function _c30W_', 'function _c30A_', 'function _c30O_', 'function _c30H_']) and dashboard_backend.count('_appIsFnName_("_recordWarning_")&&_recordWarning_(')==1 and dashboard_backend.count('Array.isArray(')==1 and dashboard_backend.count('Object.assign.apply(')==1 and dashboard_backend.count('Object.prototype.hasOwnProperty.call(')==1, 'Code_30 should delegate warning, array, assign, and hasOwnProperty boilerplate through one owner helper each')
    ok('Budget domain helper owners installed after slimming', all(token in budget_backend for token in ['function _b32W_', 'function _b32A_', 'function _b32O_', 'function _b32H_', 'function _b32N_', 'function _b32FY_']) and budget_backend.count('_appIsFnName_("_recordWarning_")&&_recordWarning_(')==0 and budget_backend.count('typeof _recordWarning_=="function"&&_recordWarning_(')==0 and budget_backend.count('Object.assign(')==0 and budget_backend.count('Object.assign.apply(')==1 and budget_backend.count('Object.prototype.hasOwnProperty.call(')==1 and budget_backend.count('Array.isArray(rows)?rows:[]')==0, 'Code_32 should delegate warning, array fallback, assign, hasOwnProperty, amount normalize and FY normalize boilerplate through one owner helper each')
    budget_page = read('gas-backend/Scripts_Page_Budget.html')
    budget_page_mirror = read('github-pages/partials/Scripts_Page_Budget.html')
    ok('Budget page modern UI owner installed', all(token in budget_page for token in ['budget-ui-modern-current', 'budget-modern-hero', 'budget-modern-tabs', 'budget-modern-card', 'AppBudgetModernUi']) and 'noApiContractChange:!0' in compact(budget_page) and budget_page_mirror.startswith('<!-- GENERATED MIRROR:'), 'Budget page must keep one modern UI owner in canonical and generated mirror')
    dash_status_body = function_body(dashboard_backend, '_dashboardCaseStatusKey_')
    ok('Dashboard case status key canonical/default maps to s0', '"s1"' not in dash_status_body and 'เรื่องเข้าใหม่' in dash_status_body and 'return!compact?"s0"' in dash_status_body and 'รับเรื่อง|รับเข้า|^รับ$/.test(compact)?"s0"' in dash_status_body and 'dashboard-status-count-s0-default-current' in dashboard_backend and 'statusDefaultBlankToS0' in dashboard_backend, 'blank/รับเรื่อง/รับเข้า must count under เรื่องเข้าใหม่, not hidden s1')
    ok('Dashboard stale status snapshot is rejected', 'function _dashboardSnapshotStatusCurrent_' in router and 'dashboard.summarySnapshot.skipStaleStatus' in router and 'statusCountStamp:_dashboardStatusSnapshotStamp_()' in router, 'old dashboard snapshots without status-count stamp must not be reused')
    ok('dashboard read-model gate dashboard status read model installed', 'PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP' in dashboard_backend and 'function _dashboardStatusReadModelPhaseF_' in dashboard_backend and 'function _phaseFDashboardStatusReadModelContract_' in dashboard_backend and 'DashboardDomain.PHASEF_STATUS_READ_MODEL=_phaseFDashboardStatusReadModelContract_()' in compact(dashboard_backend), 'dashboard status counts must be generated by one backend read model')
    phasef_stats_body = function_body(dashboard_backend, '_dashboardStatsDirect_')
    ok('dashboard read-model gate dashboard status rows use backend read model only', 'statusReadModel=_dashboardStatusReadModelPhaseF_(caseRows)' in phasef_stats_body and 'statusLabels={s0:' not in phasef_stats_body and 'stats.statusReadModel=statusReadModel' in phasef_stats_body and 'stats.sourceRowCount=statusReadModel.sourceRowCount' in phasef_stats_body, 'Dashboard _dashboardStatsDirect_ must not inline status label/count logic')
    ok('dashboard read-model gate dashboard bundle cache key invalidates old status caches', 'dash_bundle_phaseF_status_read_model_v9_' in dashboard_backend and 'dash_bundle_due_classifier_v8_' not in dashboard_backend, 'dashboard bundle cache key must move to dashboard read-model gate status read model version')
    ok('dashboard read-model gate router dashboard snapshot stamp aligned', 'dashboard-status-count-s0-default-current-phaseF-read-model-2026-07-05' in router and 'statusReadModelStamp:"phaseF-dashboard-status-read-model-current"' in router and 'dto.caseStats' in function_body(router, '_dashboardStatusStatsObject_'), 'router summary snapshot must reject old status read model snapshots and inspect canonical dto.caseStats')

    dashboard_frontend = read('gas-backend/Scripts_Page_Dashboard.html')
    sheet_repo = read('gas-backend/Code_01_Platform_SheetRepo.gs')
    ok('Phase 5 dashboard budget hydration uses cacheable payload', 'dashboard-budget-hydration-phase5-cache' in dashboard_frontend and 'source:"dashboard-budget-hydration-phaseO-force-fresh"' not in dashboard_frontend and 'cacheTtlSeconds:600' in dashboard_frontend and 'snapshotTtlSeconds:600' in dashboard_frontend, 'dashboard lazy budget hydration must not force bypass cache')
    ok('Phase 5 budget dashboard hydration preserves explicit freshness only', 'forceFresh:payload.forceFresh===!0' in api_budget_summary_body and 'noCache:payload.noCache===!0' in api_budget_summary_body and 'bypassCache:payload.bypassCache===!0' in api_budget_summary_body and 'cacheTtlSeconds:Number(payload.cacheTtlSeconds||600)||600' in api_budget_summary_body, 'apiBudgetGetSummary dashboard hydration must not hard-force fresh reads')
    ok('Phase 5 hot read route cache TTLs retained', 'apiSearchCasesLite:600' in sheet_repo and 'apiGetTracking:600' in sheet_repo and 'apiGetPeoplePageBundle:600' in sheet_repo and 'apiBudgetGetSummary:600' in sheet_repo, 'critical read APIs must remain router-cache eligible')
    drift=mirror_in_sync(); ok('generated mirrors in sync', not drift, ', '.join(drift))
    write_methods=write_methods_from_router(router); schemas=schema_methods(router); missing=sorted(set(write_methods)-schemas); ok('write schema covers write routes', not missing, ', '.join(missing))

    frozen_methods=api_methods_from_router(router)
    frozen_method_diff=frozen_contract_diff(frozen_methods, FROZEN_API_METHODS)
    ok('Contract Freeze API method list locked', not frozen_method_diff['missing'] and not frozen_method_diff['unexpected'] and not frozen_method_diff['orderChanged'], json.dumps(frozen_method_diff, ensure_ascii=False))
    frozen_write_diff=frozen_contract_diff(sorted(write_methods), FROZEN_WRITE_METHODS)
    ok('Contract Freeze write method list locked', not frozen_write_diff['missing'] and not frozen_write_diff['unexpected'], json.dumps(frozen_write_diff, ensure_ascii=False))
    frozen_schema_diff=frozen_contract_diff(sorted(schemas), FROZEN_WRITE_METHODS)
    ok('Contract Freeze write schema list locked', not frozen_schema_diff['missing'] and not frozen_schema_diff['unexpected'], json.dumps(frozen_schema_diff, ensure_ascii=False))
    frozen_public_diff=frozen_contract_diff(public_methods_from_router(router), FROZEN_PUBLIC_METHODS)
    ok('Contract Freeze public method list locked', not frozen_public_diff['missing'] and not frozen_public_diff['unexpected'], json.dumps(frozen_public_diff, ensure_ascii=False))
    api_dir_files=sorted(p.name for p in (ROOT/'api').glob('*.js'))
    frozen_api_file_diff=frozen_contract_diff(api_dir_files, FROZEN_VERCEL_API_FILES)
    ok('Contract Freeze Vercel API files locked', not frozen_api_file_diff['missing'] and not frozen_api_file_diff['unexpected'], json.dumps(frozen_api_file_diff, ensure_ascii=False))
    app_contract_endpoints=[endpoint for endpoint in FROZEN_FRONTEND_PROXY_ENDPOINTS if endpoint in app]
    vercel_api_proxy_surface='\"/api/(.*)\"' in vercel_text and '\"api/*.js\"' in vercel_text
    ok('Contract Freeze frontend proxy endpoints locked', app_contract_endpoints==FROZEN_FRONTEND_PROXY_ENDPOINTS and vercel_api_proxy_surface, 'app=%s vercelApiProxySurface=%s' % (app_contract_endpoints, vercel_api_proxy_surface))
    ok('Contract Freeze manifest ledger locked', manifest.get('contractFreeze',{}).get('stamp')==FROZEN_CONTRACT_STAMP and manifest.get('contractFreeze',{}).get('routeCount')==len(FROZEN_API_METHODS) and manifest.get('contractFreeze',{}).get('writeRouteCount')==len(FROZEN_WRITE_METHODS) and manifest.get('contractFreeze',{}).get('apiMethods')==FROZEN_API_METHODS and manifest.get('contractFreeze',{}).get('writeMethods')==FROZEN_WRITE_METHODS, 'manifest contractFreeze must match frozen gate constants')

    size_rows, size_offenders, source_total, source_total_ok = phase5_size_budget_report()
    ok('Phase 5 file size budgets', not size_offenders, '; '.join(size_offenders))
    ok('Phase 5 deterministic source size budget', source_total_ok, f"{source_total}>{PHASE5_TOTAL_SOURCE_BUDGET}; dynamic generated files excluded: {sorted(PHASE5_DYNAMIC_GENERATED_FILES)}")
    ok('package version aligned', package.get('version')==VERSION, str(package.get('version')))
    ok('package release stamp aligned', package.get('release')==RELEASE and package.get('releaseStamp')==RELEASE and package.get('assetStamp')==ASSET, str({k: package.get(k) for k in ['release','releaseStamp','assetStamp']}))
    ok('manifest release track', manifest.get('releaseTrack')=='production-current', str(manifest.get('releaseTrack')))
    ok('manifest version aligned', manifest.get('version')==VERSION and manifest.get('releaseAlignment',{}).get('packageVersion')==VERSION, str(manifest.get('version')))
    ok('manifest release', manifest.get('release')==RELEASE and manifest.get('releaseStamp')==RELEASE and manifest.get('assetStamp')==ASSET and manifest.get('releaseAlignment',{}).get('releaseStamp')==RELEASE and manifest.get('releaseAlignment',{}).get('assetStamp')==ASSET, str(manifest.get('release')))
    ok('manifest release gate', manifest.get('releaseGate')=='tools/phaseN_legacy_transport_gate.py', str(manifest.get('releaseGate')))
    ok('manifest legacy removed', manifest.get('legacyTransportRemoved') is True and manifest.get('legacyJsonpTransportRemoved') is True and manifest.get('legacyGasBridgeTransportRemoved') is True and manifest.get('legacyLoginPostIframeRemoved') is True, str(manifest))
    ok('manifest Phase E runtime consolidation', isinstance(manifest.get('phaseERuntimeConsolidation'), dict) and manifest.get('phaseERuntimeConsolidation',{}).get('stamp')=='phaseE-runtime-consolidation-current', 'manifest must record Phase E runtime consolidation contract')
    ok('manifest Phase E2 runtime slimming', isinstance(manifest.get('phaseE2RuntimeSlimming'), dict) and manifest.get('phaseE2RuntimeSlimming',{}).get('stamp')=='phaseE2-runtime-slimming-current', 'manifest must record Phase E2 runtime slimming contract')
    ok('manifest Phase E3 runtime alias cleanup', isinstance(manifest.get('phaseE3RuntimeAliasCleanup'), dict) and manifest.get('phaseE3RuntimeAliasCleanup',{}).get('stamp')=='phaseE3-runtime-alias-cleanup-current', 'manifest must record Phase E3 runtime alias cleanup contract')
    ok('manifest dashboard read-model gate dashboard status read model', isinstance(manifest.get('phaseFDashboardStatusReadModel'), dict) and manifest.get('phaseFDashboardStatusReadModel',{}).get('stamp')=='phaseF-dashboard-status-read-model-current', 'manifest must record dashboard read-model gate dashboard status read model contract')
    ok('manifest security/cache gate cache contract gate', isinstance(manifest.get('phaseGCacheContractGate'), dict) and manifest.get('phaseGCacheContractGate',{}).get('stamp')=='phaseG-cache-contract-gate-current', 'manifest must record security/cache gate cache contract gate')
    ok('manifest Phase H performance hardening', isinstance(manifest.get('phaseHPerformanceHardening'), dict) and manifest.get('phaseHPerformanceHardening',{}).get('stamp')=='phaseH-performance-hardening-current', 'manifest must record Phase H performance hardening contract')
    # Phase A: freeze production contracts before deeper clean-code consolidation.
    ok('Phase A contract freeze stamp in router', 'ROUTER_PHASEA_CONTRACT_FREEZE_STAMP' in router and 'phaseA-contract-freeze-production-lock-current' in router, 'router must expose Phase A freeze stamp')
    ok('Phase A route contract includes frozen contract ledger', 'phaseAContractFreeze:_routerPhaseAContractFreezeStatus_(registry)' in compact(router), 'api route contract must include Phase A contract status')
    ok('Phase B route contract includes write/delete flow ledger', 'phaseBWriteDeleteFlow:_routerPhaseBWriteFlowContractStatus_(registry)' in compact(router), 'api route contract must expose Phase B write/delete flow status')
    ok('Phase A frozen contracts named', all(token in router for token in ['API_ROUTE_REGISTRY','WRITE_SCHEMA_BY_METHOD','CACHE_ENTITY_BY_METHOD','DOMAIN_OWNER_BY_METHOD','FRONTEND_PAGE_REFRESH_BY_ENTITY']), 'five production contracts must be named and frozen')
    ok('Phase A platform cache contract installed', 'APP_PHASEA_CONTRACT_FREEZE' in platform and 'function _platformPhaseACacheEntityByMethod_' in platform and 'function _platformPhaseAWriteInvalidationByMethod_' in platform and 'function _platformPhaseAFrontendRefreshByEntity_' in platform, 'platform must own cache/entity/refresh contracts')
    ok('Phase B platform write/cache contract installed', 'APP_PHASEB_WRITE_FLOW_CONTRACT' in platform and 'function _platformPhaseBWriteFlowContractByMethod_' in platform and 'function _platformPhaseBWriteFlowContractStatus_' in platform and 'meta.phaseBWriteFlowStamp=APP_PHASEB_WRITE_FLOW_CONTRACT.stamp' in compact(platform), 'writeGateway must attach Phase B write/cache contract to normalized write responses')
    ok('Phase A admin-users canonical cache profile exists', 'canonicalDomains:["case","letters","meeting","budget","people","admin","admin-users","dashboard"]' in platform and 'adminusers:"admin-users"' in platform and '"admin-users":{stamps:["admin-users","users","admin","dashboard"]' in platform and 'Users:["admin","admin-users"]' in platform, 'admin user cache must not canonicalize to general/admin only')
    ok('Phase A write invalidation map covers critical deletes', all(s in platform for s in ['apiDeleteCase:["case","dashboard"]','apiDeleteMeetingLog:["meeting","dashboard"]','apiDeleteLetter:["letters","tracking","dashboard"]','apiDeletePetitioner:["people","petitioner","case","dashboard"]','apiBudgetDeleteImport:["budget","dashboard"]','apiAdminDeleteUser:["admin-users","admin"]']), 'critical delete methods need explicit invalidation contract')
    ok('Phase A router validates write invalidation and frontend refresh', 'PHASEA_WRITE_INVALIDATION_MISSING' in router and 'PHASEA_FRONTEND_REFRESH_MISSING' in router and '_routerPhaseAInvalidationForWriteMethod_' in router, 'router contract freeze must catch missing invalidate/refresh contracts')
    ok('security/cache gate platform cache contract gate installed', 'APP_PHASEG_CACHE_CONTRACT_GATE' in platform and 'phaseG-cache-contract-gate-current' in platform and 'function _platformPhaseGCacheContractStatus_' in platform and 'function _platformPhaseGReadCacheContractByMethod_' in platform and 'function _platformPhaseGWriteCacheContractByMethod_' in platform, 'platform must expose security/cache gate read/write cache contract gate')
    ok('security/cache gate writeGateway attaches cache contract metadata', 'meta.phaseGCacheContractStamp=APP_PHASEG_CACHE_CONTRACT_GATE.stamp' in compact(platform) and 'meta.phaseGCacheContract=_platformPhaseGWriteCacheContractByMethod_' in compact(platform), 'writeGateway must attach security/cache gate cache contract to write responses')
    ok('security/cache gate router cache contract gate installed', 'ROUTER_PHASEG_CACHE_CONTRACT_STAMP' in router and 'function _routerPhaseGCacheContractStatus_' in router and 'phaseGCacheContract:_routerPhaseGCacheContractStatus_(registry)' in compact(router), 'router route contract must expose security/cache gate cache contract status')
    ok('security/cache gate critical delete invalidations locked', all(token in router for token in ['apiDeleteCase",requires:["case","dashboard"]','apiDeleteMeetingLog",requires:["meeting","dashboard"]','apiDeleteLetter",requires:["letters","tracking","dashboard"]','apiDeletePetitioner",requires:["people","petitioner","case","dashboard"]','apiBudgetDeleteImport",requires:["budget","dashboard"]','apiAdminDeleteUser",requires:["admin-users","admin"]']), 'critical delete invalidation rules must be locked in security/cache gate router contract')
    ok('Phase H platform performance hardening installed', 'APP_PHASEH_PERFORMANCE_HARDENING' in platform and 'phaseH-performance-hardening-current' in platform and 'function _platformPhaseHPerformanceContractStatus_' in platform and 'function _platformPhaseHHotReadTargets_' in platform and 'function _platformPhaseHPerformanceWriteContract_' in platform, 'platform must expose Phase H hot read/write refresh performance contract')
    ok('Phase H dashboard cache key versioned by dependent stamps', 'dash_bundle_phaseH_perf_v10_' in platform and '["dashboard","case","letters","budget","meeting"]' in platform and 'dash_bundle_due_classifier_v2_' not in platform, 'dashboard cache key must include dependent entity stamps and new Phase H version')
    ok('Phase H writeGateway attaches performance refresh contract metadata', 'meta.phaseHPerformanceStamp=APP_PHASEH_PERFORMANCE_HARDENING.stamp' in compact(platform) and 'meta.phaseHPerformanceContract=_platformPhaseHPerformanceWriteContract_' in compact(platform), 'writeGateway must expose deterministic refresh plan after save/delete')
    ok('Phase H router performance hardening installed', 'ROUTER_PHASEH_PERFORMANCE_HARDENING_STAMP' in router and 'phaseH-performance-hardening-current' in router and 'function _routerPhaseHPerformanceContractStatus_' in router and 'phaseHPerformanceHardening:_routerPhaseHPerformanceContractStatus_(registry)' in compact(router), 'router route contract must expose Phase H performance hardening status')
    ok('Phase H request-scope entity stamp memo installed', '__APP_ROUTER_ENTITY_STAMP_MEMO__' in router and 'memo[key]' in function_body(router, '_routerEntityCacheStamp_'), 'router entity stamp lookup must be memoized per execution to reduce repeated cache/property reads')
    ok('Phase 6 production clean contract installed', 'APP_PHASE6_PRODUCTION_CLEAN_CONTRACT' in platform and 'phase6-production-clean-contract-current' in platform and 'function _platformPhase6ProductionCleanContractStatus_' in platform and 'meta.phase6ProductionCleanContract=_platformPhase6ProductionCleanContractStatus_()' in compact(platform), 'platform/writeGateway must expose consolidated Phase 6 production contract')
    ok('Phase 6 router production contract report installed', 'ROUTER_PHASE6_PRODUCTION_CLEAN_CONTRACT_STAMP' in router and 'function _routerPhase6ProductionCleanContractStatus_' in router and 'phase6ProductionCleanContract:_routerPhase6ProductionCleanContractStatus_(registry)' in compact(router), 'api route contract must expose Phase 6 consolidated production contract')
    ok('Phase 6 contract verifies admin user cache entity', 'PHASE6_ADMIN_USERS_CACHE_ENTITY_DRIFT' in platform and 'apiAdminListUsers' in platform and 'admin-users' in platform, 'admin user list cache must remain admin-users after save/delete cleanup')
    ok('Phase 6 contract verifies every write schema has route/write/csrf/invalidation', 'PHASE6_WRITE_ROUTE_MISSING' in platform and 'PHASE6_ROUTE_WRITE_META_MISSING' in platform and 'PHASE6_ROUTE_CSRF_META_MISSING' in platform and 'PHASE6_WRITE_INVALIDATION_MISSING' in platform, 'production write contract must fail loudly when write/cache route metadata drifts')
    ok('manifest Phase 6 production clean contract', isinstance(manifest.get('phase6ProductionCleanContract'), dict) and manifest.get('phase6ProductionCleanContract',{}).get('stamp')=='phase6-production-clean-contract-current', 'manifest must record Phase 6 production clean contract')
    ok('Phase 7 transitional write fallback cleanup installed', 'APP_PHASE7_TRANSITIONAL_FALLBACK_CLEANUP' in platform and 'phase7-transitional-fallback-cleanup-current' in platform and 'function _platformPhase7TransitionalFallbackCleanupStatus_' in platform and 'meta.phase7TransitionalFallbackCleanupContract=_platformPhase7TransitionalFallbackCleanupStatus_()' in compact(platform), 'platform/writeGateway must expose Phase 7 fallback cleanup contract')
    ok('Phase 7 router disables route-name write guessing', 'ROUTER_PHASE7_TRANSITIONAL_FALLBACK_CLEANUP_STAMP' in router and 'function _routerPhase7TransitionalFallbackCleanupStatus_' in router and 'phase7TransitionalFallbackCleanup:_routerPhase7TransitionalFallbackCleanupStatus_(registry)' in compact(router) and 'write=!isActionToken&&(schemaWrite||registryWrite)' in compact(router) and 'TRANSITIONAL_ROUTE_NAME_COMPAT' not in router, 'router must classify writes from schema/registry only, not transitional route-name guesses')
    ok('Phase 7 keeps direct router re-entry guard while cleanup progresses', 'writeGateway-direct-router-reentry' in platform and 'ROUTER_WRITE_BOUNDARY_REQUIRED' in platform and 'directRouterReentryGuardRetained:!0' in platform, 'direct legacy write calls must still be safely routed through apiRouter during cleanup')
    ok('manifest Phase 7 transitional fallback cleanup', isinstance(manifest.get('phase7TransitionalFallbackCleanup'), dict) and manifest.get('phase7TransitionalFallbackCleanup',{}).get('stamp')=='phase7-transitional-fallback-cleanup-current', 'manifest must record Phase 7 fallback cleanup')
    ok('manifest Phase 8 runtime page performance', isinstance(manifest.get('phase8RuntimePagePerformance'), dict) and manifest.get('phase8RuntimePagePerformance',{}).get('stamp')=='phase8-runtime-page-performance-current', 'manifest must record Phase 8 runtime/page performance contract')
    check_owner_consolidation_contract(manifest, platform, router, transport, common, core_runtime, gas_index, static_index, alltext)
    check_legacy_fallback_cleanup_contract(manifest, platform, app, transport, read('gas-backend/Scripts_Critical_Login_Runtime.html'), read('github-pages/critical-login-runtime.js'))
    check_performance_debt_contract(manifest, transport, core_runtime)
    check_uiux_debt_contract(manifest, gas_index, static_index)
    check_phase4_write_delete_reliability_contract(manifest, platform, router, docs_policy)
    check_phase5_uiux_modernization_contract(manifest, gas_index, static_index, docs_policy)
    check_phase6_static_qa_readiness_contract(manifest, app, docs_policy)
    check_static_config_assignment_guard_contract(manifest, app, docs_policy)
    check_deep_source_syntax_guard_contract(manifest, docs_policy)
    check_admin_user_facade_contract(ROOT)
    check_gas_global_namespace_gate()
    report={'ok':not errors,'releaseTrack':'production-current','release':RELEASE,'transportMode':MODE,'checks':checks,'errors':errors,'writeRouteCount':len(write_methods),'schemaMethodCount':len(schemas),'phase5SizeBudgets':size_rows,'phase5TotalSourceBytes':source_total,'phase5TotalSourceBudget':PHASE5_TOTAL_SOURCE_BUDGET,'phase5DynamicGeneratedFilesExcluded':sorted(PHASE5_DYNAMIC_GENERATED_FILES),'phase5NextSlimmingTargets':PHASE5_NEXT_SLIMMING_TARGETS,'phase6StaticQaReadinessStamp':PHASE6_STATIC_QA_READINESS_STAMP,'staticConfigAssignmentGuardStamp':STATIC_CONFIG_ASSIGNMENT_GUARD_STAMP,'deployReleaseSinglePublishGuardStamp':DEPLOY_RELEASE_SINGLE_PUBLISH_GUARD_STAMP,'deepSourceSyntaxGuardStamp':DEEP_SOURCE_SYNTAX_GUARD_STAMP}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if errors:
        if _vercel_nonblocking_gate():
            _build_host_gate_warning("audit-errors", errors)
        else:
            sys.exit(1)
if __name__=='__main__':
    try:
        main()
    except SystemExit as exc:
        if exc.code and _vercel_nonblocking_gate():
            _build_host_gate_warning("system-exit", {"code": exc.code})
            raise SystemExit(0)
        raise
    except Exception as exc:
        if _vercel_nonblocking_gate():
            _build_host_gate_warning("exception", {"type": type(exc).__name__, "message": str(exc), "tracebackTail": traceback.format_exc()[-2000:]})
            raise SystemExit(0)
        raise
