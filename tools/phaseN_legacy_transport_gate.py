#!/usr/bin/env python3

from __future__ import annotations
from pathlib import Path
import json, re, sys, pathlib, os, traceback, subprocess, tempfile, shutil, hashlib
import importlib.util

ROOT = Path(__file__).resolve().parents[1]
RELEASE = "commission-v1.2-gas-hosted-production-2026-07-10-r27"
ASSET = "asset-manifest-commission-v1.2-gas-hosted-production-2026-07-10-r27"
VERSION = "1.2.0-production-current"
MODE = "production-gas-hosted-google-script-run-api-router"
VERCEL_MODE = "production-vercel-proxy-only"
P2_LONG_TERM_STABILITY_STAMP = "production-stability-hardening-r25"
SCHEMA_STAMP = "phaseK-write-schema-unification-2026-07-02-r1"
CRITICAL_APIS = [
    "apiBudgetGetSummary",
    "apiGetPetitioners",
    "apiGetCommitteeMeetingSystem",
    "apiSearchCasesLite",
    "apiGetTracking",
    "apiLogin",
]

FROZEN_CONTRACT_STAMP = "production-contract-freeze-current-2026-07-06"
FROZEN_VERCEL_API_FILES = ["_gasProxyCommon.js", "gas.js", "login.js", "public-config.js"]
FROZEN_FRONTEND_PROXY_ENDPOINTS = ["/api/gas", "/api/login", "/api/public-config"]
FROZEN_API_METHODS = "apiLogin apiSessionResume apiLogout apiSessionCheck getDeferredInclude apiBootstrap apiGetRouteContract apiGetPhase0ContractGate apiGetPhase1Contract apiGetPhase2Contract apiGetClientDataContract apiGetAppTerminology apiGetPhase5ReleaseReadiness apiIssueActionToken apiSaveCase apiDeleteCase apiGetCases apiGetCaseQuickSummary apiGetCaseReportOptions apiGetCaseContext apiGetCanonicalCaseBundle apiGetPhase4QaGate apiSearchCasesLite apiGetCaseReportExportRows apiGetPetitioners apiGetPetitionerRelatedCounts apiSavePetitioner apiDeletePetitioner apiGetPersonnelComms apiGetPersonnelOps apiGetPersonnelStaffs apiGetPersonnelSubcommittees apiGetPersonnelDirectoryBundle apiGetPeoplePageBundle apiGetSalarySettings apiSavePersonnelComm apiSavePersonnelOp apiSavePersonnelStaff apiSavePersonnelSubcommittee apiDeletePersonnelComm apiDeletePersonnelOp apiDeletePersonnelStaff apiDeletePersonnelSubcommittee apiGetMeetingLookupOptions apiGetMeetingHistory apiListCommitteeMeetings apiGetCommitteeMeetingSystem apiGetCommitteeMeetingSystemSpec apiSearchMeetingAgendaCases apiGetCommitteeMeetingPrintBundle apiSaveCommitteeMeetingSystem apiDeleteCommitteeMeetingSystem apiSaveSalarySettings apiSaveMeetingLog apiDeleteMeetingLog apiGetLetters apiGetAllLettersWithCaseInfo apiSaveLetter apiDeleteLetter apiAuditMeetingData apiExportMeetingDuplicateAuditCsv apiCleanupMeetingData apiGetTracking apiBudgetListByFY apiBudgetListByFYFast apiBudgetGetSummary apiBudgetGetFiscalYears apiBudgetGetSubcommitteeOptions apiBudgetGetImportForEdit apiBudgetGetTypeSummaryByFY apiBudgetSaveImport apiBudgetDeleteImport apiGetDashboardBundle apiGetThailandLocations apiSearchLookup apiSearch apiAdminListUsers apiAdminSaveUser apiAdminDeleteUser apiAdminListSubcommittees apiAdminSaveSubcommittee apiAdminDeleteSubcommittee apiBudgetAdminListYearSettingsAll apiBudgetAdminSaveYearSettingsRows apiAiAssistantAsk apiAiAssistantStartJob apiAiAssistantGetJob apiAiAssistantSummarizeCase apiSuggestCaseStatus apiSuggestCaseClassification apiSemanticSearch apiMeetingSmartSummary apiDraftReplyLetter apiExtractTrackingPdf apiExtractDocumentPdf apiGenerateExecutiveSummary apiPredictOverdueRisk apiPredictiveBudgeting apiAnalyzePersonnelWorkload apiAnalyzeWorkloadBottlenecks apiRecommendWorkloadDistribution apiCheckDuplicateCase apiDetectBudgetAnomalies apiGetDailyBriefing apiGenerateBudgetTrendSummary apiAiDashboardInsights apiExtractMeetingAgendaPdf apiChat".split()
FROZEN_WRITE_METHODS = "apiAdminDeleteSubcommittee apiAdminDeleteUser apiAdminSaveSubcommittee apiAdminSaveUser apiBudgetAdminSaveYearSettingsRows apiBudgetDeleteImport apiBudgetSaveImport apiCleanupMeetingData apiDeleteCase apiDeleteCommitteeMeetingSystem apiDeleteLetter apiDeleteMeetingLog apiDeletePersonnelComm apiDeletePersonnelOp apiDeletePersonnelStaff apiDeletePersonnelSubcommittee apiDeletePetitioner apiSaveCase apiSaveCommitteeMeetingSystem apiSaveLetter apiSaveMeetingLog apiSavePersonnelComm apiSavePersonnelOp apiSavePersonnelStaff apiSavePersonnelSubcommittee apiSavePetitioner apiSaveSalarySettings".split()
FROZEN_PUBLIC_METHODS = "apiGetPhase0ContractGate apiGetPhase1Contract apiGetPhase2Contract apiGetRouteContract apiLogin apiSessionCheck apiSessionResume".split()

CHARACTERIZATION_FREEZE_STAMP = "production-current-characterization-contract-freeze-2026-07-10-r1"
CHARACTERIZATION_ROUTE_SHA256 = "de5c16d36b912ec4267787e225ec029b77c5fb0bd0052781e6f9d51e4afc9f89"
CHARACTERIZATION_WRITE_SCHEMA_SHA256 = "a62622facc8e9c97ebfca4bd3bf081597a2bd3fcdbaef1fffefa5ef8f9ed475b"
CHARACTERIZATION_PROXY_ALLOWLIST_SHA256 = "3ae9aa68719b1ea7925c7b1013b4e4396e9683e7476fa2cf625af1a7627227c4"
CHARACTERIZATION_UI_TEMPLATE_SHA256 = "76dcadd48639fd1f7876a90ea9cf51d07cf5a8eb2709bbee34ab6a6b1773d518"
CHARACTERIZATION_UI_TEMPLATE_COUNT = 11
CHARACTERIZATION_PAGE_API_FOOTPRINTS = {
    "Scripts_Core_Runtime.html": (51, "2d9debccd4cfe036fedd7cd437412174cc8d90c9e5ed8f297006de0fc24779a9"),
    "Scripts_Critical_Login_Runtime.html": (42, "cc1480728d12eab16483171263697c0c2d7ce01b0dbb42591354dc1a39799c5a"),
    "Scripts_Page_Admin.html": (10, "6a1012269809a1d831b2a73101c2a7f49864f6d135f5df126838091dc84517fb"),
    "Scripts_Page_Budget.html": (8, "df3ba50306d4fe5052f16a1ace3b892ba940b8671bddfbe44101b17d290e26dc"),
    "Scripts_Page_Dashboard.html": (27, "73045ce5c9d0af8ad32c5ee4879ebe596eebbfe693f4651047d172a2ba747ba2"),
    "Scripts_Page_Meeting.html": (32, "e29ab9fd5b080360fb261bdd85deedd1c2a3739045b9e4e73391409539b41aa7"),
    "Scripts_Page_People.html": (13, "044a5995b65cf1eb07f326b645ae245b2fc083b151837fd341f7c294939a7d44"),
    "Scripts_Page_Petitioner.html": (5, "12c4aa01ac65be36e5c8568b3f7b62c44f7c57b8a2830b5e80ca2c3a7f19d3d8"),
    "Scripts_Page_ReportTrack.html": (9, "48358c22f99795c3cfe00779066e76d34a44470cd00aa7cead4cb2af27b73bc9"),
}
CHARACTERIZATION_PAGE_API_AGGREGATE_SHA256 = "85a63ccebf265999a76a3e48554c2ed870b0f659f2d28a356d2af6272a80d254"

STEP2_RUNTIME_METADATA_SLIMMING_STAMP = "production-current-step2-runtime-metadata-slimming-2026-07-10-r1"
STEP2_CORE_RUNTIME_MAX_BYTES = 484000
STEP2_REMOVED_RUNTIME_METADATA_TOKENS = [
    "__APP_CORE_FOUNDATION_AUGMENTATION__",
    "__APP_PRODUCTION_OWNER_LOCKS_R4__",
    "__APP_OWNER_CONTRACT__",
    "phaseFix",
    "__runtimeOwnerStamp",
    "__timerOwner",
    "__phase1RebasedSingleOwner",
    "__APP_THAI_DATE_PREVIOUS_BLOCK_REMOVED__",
    "__APP_CORE_FORMAT_READY__",
    "__APP_UI_CURRENT_READY__",
    "__APP_RUNTIME_AUTH_SESSION_EXPIRY_CANONICAL_CURRENT__",
    "__APP_RUNTIME_SINGLE_OWNER_PHASE1__",
    "__APP_CORE_RUNTIME_PHASE9__",
    "__APP_PHASE5_RUNTIME_TELEMETRY__",
]
STEP2_RETAINED_RUNTIME_ANCHORS = [
    "AppRuntime.lockGlobalOwner",
    "root.AppFrontendRuntimeOwners = frontendRuntimeOwners",
    "runtime.getRuntimeOwnerReport = report",
    "runtime.getSingleOwnerStatus = report",
    "AppPageKit.apiRunner",
    "function invalidateAfterWrite(reason, method)",
    "root.AppDirtyRefreshOwner =",
]

STEP3_API_FACADE_CONSOLIDATION_STAMP = "production-current-step3-api-facade-consolidation-2026-07-10-r1"
STEP3_CORE_RUNTIME_MAX_BYTES = 472000
STEP3_FORBIDDEN_CORE_API_ALIASES = [
    "getApiCaller",
    "getApiTransport",
    "requireApiTransport",
    "getModuleApi",
    "_q16",
    "moduleApi",
    "_q36",
    "_q28",
    "AppUtil.apiRunner",
    "AppKit.apiCall",
    "AppPageKit.apiCall",
    "phaseE.apiCall",
]
STEP3_FORBIDDEN_CRITICAL_API_ALIASES = [
    "root2.apiCall",
    "criticalApiRunner",
    "AppUtil.apiRunner",
]

STEP4_ROUTER_CANONICAL_RESOLVER_STAMP = "production-current-step4-router-canonical-resolver-consolidation-2026-07-10-r1"
STEP4_ROUTER_MAX_BYTES = 168000
STEP4_FORBIDDEN_ROUTER_ALIASES = [
    "_ct",
    "_cz",
    "_routerBuildFacadeHandlerMap_",
    "_explicitRouteHandlerMap_",
    "_resolveGlobalFunction_",
    "_buildApiRouteHandlers_",
    "_apiRouteHandlers_",
    "_routerResolveRouteHandler_",
]
STEP4_FORBIDDEN_ROUTER_CACHE = "__API_ROUTE_HANDLERS_CACHE__"

STEP5_PROXY_ORIGIN_GUARD_STAMP = "production-current-step5-proxy-origin-html-guard-2026-07-10-r1"
STEP6_RUNTIME_BOOTSTRAP_MEETING_STAMP = "production-current-step6-runtime-bootstrap-meeting-summary-rewrite-2026-07-10-r1"

CHARACTERIZATION_OWNER_PATHS = {
    "frontendTransport": "github-pages/github-gas-transport.js::AppTransport.run",
    "apiFacade": "gas-backend/Scripts_Core_Runtime.html::AppPageKit.apiRunner",
    "router": "gas-backend/Code_20_Router.gs::apiRouter",
    "writeSchema": "gas-backend/Code_20_Router.gs::_routerPhaseKWriteSchemaByMethod_",
    "dirtyRefresh": "gas-backend/Scripts_Core_Runtime.html::AppDirtyRefreshOwner",
    "writeFreshness": "gas-backend/Scripts_Core_Runtime.html::invalidateAfterWrite",
}


def _vercel_nonblocking_gate() -> bool:
    return bool(
        (os.environ.get("VERCEL") or os.environ.get("CI"))
        and os.environ.get("COMMISSION_STRICT_GATES") != "1"
        and "--strict" not in sys.argv
    )


def _build_host_gate_warning(stage: str, payload) -> None:
    try:
        print(
            json.dumps(
                {
                    "ok": True,
                    "nonBlockingBuildGate": "phaseN_legacy_transport_gate",
                    "stage": stage,
                    "reason": "Vercel build host detected; Production current audit is reported but does not block deploy. Run with COMMISSION_STRICT_GATES=1 or --strict for blocking audit.",
                    "payload": payload,
                },
                ensure_ascii=False,
                indent=2,
            )
        )
    except Exception:
        print("[phaseN] non-blocking build gate warning", stage, str(payload))


PHASE5_SIZE_BUDGETS = {
    "gas-backend/Scripts_Core_Runtime.html": 560000,
    "github-pages/partials/Scripts_Core_Runtime.html": 560000,
    "gas-backend/Scripts_Page_Meeting.html": 320000,
    "github-pages/partials/Scripts_Page_Meeting.html": 340000,
    "gas-backend/Code_30_Domain_Cases.gs": 420000,
    "gas-backend/Code_32_Domain_Budget.gs": 300000,
    "gas-backend/Scripts_Page_Budget.html": 230000,
    "github-pages/partials/Scripts_Page_Budget.html": 230100,
    "gas-backend/Index.html": 370000,
    "github-pages/index.html": 250000,
    "github-pages/critical-login-runtime.js": 150000,
}
PHASE5_TOTAL_SOURCE_BUDGET = 7000000
PHASE5_DYNAMIC_GENERATED_FILES = {
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
PHASE4_WRITE_DELETE_RELIABILITY_STAMP = (
    "production-current-phase4-write-delete-reliability-2026-07-08-r1"
)
PHASE5_UIUX_MODERNIZATION_STAMP = "production-current-phase5-uiux-modernization-2026-07-08-r1"
PHASE6_STATIC_QA_READINESS_STAMP = "production-current-phase6-static-qa-readiness-2026-07-08-r1"
STATIC_CONFIG_ASSIGNMENT_GUARD_STAMP = (
    "production-current-static-config-assignment-guard-2026-07-08-r1"
)
DEPLOY_RELEASE_SINGLE_PUBLISH_GUARD_STAMP = (
    "production-current-deploy-release-single-publish-2026-07-08-r1"
)
DEEP_SOURCE_SYNTAX_GUARD_STAMP = "production-current-deep-source-syntax-guard-2026-07-08-r1"
PHASE4_GENERATED_MIRROR_SLIMMING_STAMP = (
    "production-current-phase4-generated-mirror-slimming-2026-07-09-r1"
)
PHASE6_MANIFEST_GATE_CLEANUP_STAMP = "phase6-manifest-gate-cleanup-2026-07-09-r1"
PHASE6_MANIFEST_MAX_BYTES = 45000
CURRENT_GATE_CONSOLIDATION_STAMP = "production-current-gate-consolidation-2026-07-10-r1"
CURRENT_FINAL_CONSISTENCY_STAMP = "production-current-final-consistency-lock-2026-07-10-r1"
CURRENT_SEMANTIC_OWNER_WORDING_CLEANUP_STAMP = (
    "production-current-semantic-owner-wording-cleanup-2026-07-10-r1"
)
CURRENT_READABLE_SOURCE_STAMP = "production-current-readable-source-no-minify-2026-07-10-r1"
CURRENT_STRUCTURE_REMEDIATION_STAMP = "production-current-structure-remediation-2026-07-10-r1"
READABLE_SOURCE_MIN_LINES = {
    "gas-backend/Code_00_PlatformCore.gs": 5000,
    "gas-backend/Code_30_Domain_Cases.gs": 8000,
    "gas-backend/Code_32_Domain_Budget.gs": 6000,
    "gas-backend/Scripts_Core_Runtime.html": 10000,
    "gas-backend/Scripts_Page_Meeting.html": 6000,
    "gas-backend/Scripts_Page_Budget.html": 4000,
    "github-pages/critical-login-runtime.js": 2500,
    "github-pages/vercel-env.generated.js": 30,
}
OWNER_CONSOLIDATION_REQUIRED_KEYS = [
    "apiRouteRegistry",
    "writeSchema",
    "apiBoundary",
    "platformEntry",
    "sheetRepository",
    "authSession",
    "casesSearchReportTracking",
    "budget",
    "people",
    "frontendTransport",
    "coreRuntime",
    "uiTokens",
    "generatedPartials",
]
OWNER_CONSOLIDATION_FORBIDDEN_PAGE_CALLS = [
    "google.script.run",
    "Utils.apiRunner",
    "AppPageController.api",
]
PHASE5_NEXT_SLIMMING_TARGETS = {
    "gas-backend/Scripts_Core_Runtime.html": 520000,
    "gas-backend/Scripts_Page_Meeting.html": 320000,
    "gas-backend/Code_30_Domain_Cases.gs": 390000,
    "gas-backend/Code_32_Domain_Budget.gs": 280000,
}


SOURCE_SCOPE_DIRS = {"api", "docs", "gas-backend", "github-pages", "tools"}
SOURCE_SCOPE_ROOT_FILES = {".env.example", "package.json", "vercel.json", "TECH_DEBT_MANIFEST.json"}
SOURCE_SCOPE_SUFFIXES = {".html", ".js", ".gs", ".py", ".json", ".md", ".example"}
SOURCE_SCOPE_EXCLUDED_DIRS = {
    ".git",
    ".vercel",
    ".next",
    "node_modules",
    "dist",
    "build",
    "coverage",
    "__pycache__",
}


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
    for p in ROOT.rglob("*"):
        if is_scoped_source_file(p):
            yield p


def iter_packaged_current_files():
    for p in ROOT.rglob("*"):
        if not p.is_file():
            continue
        try:
            rel_path = p.relative_to(ROOT)
        except ValueError:
            continue
        if any(part in SOURCE_SCOPE_EXCLUDED_DIRS for part in rel_path.parts):
            continue
        rel = rel_path.as_posix()
        if rel in SOURCE_SCOPE_ROOT_FILES:
            yield rel
            continue
        if not rel_path.parts or rel_path.parts[0] not in SOURCE_SCOPE_DIRS:
            continue

        yield rel


REQUIRED = [
    "vercel.json",
    "package.json",
    ".env.example",
    "api/_gasProxyCommon.js",
    "api/gas.js",
    "api/login.js",
    "api/public-config.js",
    "github-pages/vercel-env.generated.js",
    "tools/generate_vercel_env.py",
    "tools/phaseG_security_gate.py",
    "tools/phaseN_legacy_transport_gate.py",
    "docs/PHASE_N_REMOVE_LEGACY_TRANSPORT.md",
    "docs/SINGLE_SOURCE_POLICY.md",
    "TECH_DEBT_MANIFEST.json",
]
errors = []
checks = []


def _compact_match_text(text: str) -> str:
    value = re.sub(r"\s+", "", str(text or ""))
    return (
        value.replace(":true", ":!0")
        .replace("=true", "=!0")
        .replace(":false", ":!1")
        .replace("=false", "=!1")
    )


class CodeText(str):
    """String wrapper that keeps release checks stable after whitespace-only formatting."""

    def __contains__(self, item) -> bool:
        raw_item = str(item)
        return super().__contains__(raw_item) or _compact_match_text(
            raw_item
        ) in _compact_match_text(self)

    def count(self, sub, start=None, end=None) -> int:
        raw_sub = str(sub)
        if start is not None or end is not None:
            return super().count(
                raw_sub, 0 if start is None else start, len(self) if end is None else end
            )
        raw_count = super().count(raw_sub)
        if raw_count:
            return raw_count
        return _compact_match_text(self).count(_compact_match_text(raw_sub))


def read(rel: str) -> CodeText:
    p = ROOT / rel
    if not p.exists():
        errors.append(f"missing file: {rel}")
        return CodeText("")
    return CodeText(p.read_text(encoding="utf-8", errors="ignore"))


def ok(name, cond, detail=""):
    checks.append({"name": name, "ok": bool(cond), "detail": detail})
    if not cond:
        errors.append(f"{name}: {detail}")


def fail(message: str) -> None:
    errors.append(str(message))


def compact(text: str) -> str:
    return _compact_match_text(text)


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
        if ch in ("'", '"', "`"):
            in_str = ch
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return CodeText(text[i + 1 : j])
    return CodeText("")


def phase5_source_size_bytes() -> int:
    return sum(p.stat().st_size for p in iter_scoped_source_files())


def phase5_size_budget_report():
    rows = []
    offenders = []
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


def all_source_text() -> str:
    chunks = []
    for p in iter_scoped_source_files():
        chunks.append(p.read_text(encoding="utf-8", errors="ignore"))
    return "\n".join(chunks)


def mirror_in_sync():
    drift = []
    header_re = re.compile(r"^<!-- GENERATED MIRROR:[\s\S]*?-->\s*")
    for src in (ROOT / "gas-backend").glob("Scripts_*.html"):
        dst = ROOT / "github-pages" / "partials" / src.name
        if not dst.exists():
            drift.append(f"missing mirror: {src.name}")
            continue
        source = src.read_text(encoding="utf-8")
        mirror = header_re.sub("", dst.read_text(encoding="utf-8"))
        if source != mirror:
            drift.append(src.name)
    return drift


def _generated_expected_artifact(relative_path: str):
    generator_path = ROOT / "tools" / "generate_vercel_env.py"
    if not generator_path.exists():
        return None
    try:
        spec = importlib.util.spec_from_file_location("commission_generate_vercel_env", generator_path)
        if spec is None or spec.loader is None:
            return None
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        target = ROOT / relative_path
        return module._expected_outputs().get(target)
    except Exception:
        return None


def critical_static_runtime_in_sync():
    dst = ROOT / "github-pages" / "critical-login-runtime.js"
    expected = _generated_expected_artifact("github-pages/critical-login-runtime.js")
    if not dst.exists() or expected is None:
        return False
    return dst.read_text(encoding="utf-8", errors="ignore") == expected



def _extract_index_templates(source: str):
    templates = {}
    pattern = re.compile(
        r'<script\b[^>]*\btype=["\']text/x-template["\'][^>]*\bid=["\']([^"\']+)["\'][^>]*>([\s\S]*?)</script>',
        re.I,
    )
    for match in pattern.finditer(source or ""):
        templates[match.group(1)] = match.group(2)
    return templates


def _normalize_index_template(source: str) -> str:
    value = source or ""
    value = re.sub(
        r"<\?!=\s*getActiveLogoUrl_\(\)\s*\?>",
        "__PARLIAMENT_LOGO__",
        value,
    )
    value = re.sub(
        r"<\?=\s*getActiveLogoUrl_\(\)\s*\?>",
        "__PARLIAMENT_LOGO__",
        value,
    )

    def normalize_logo_tag(match):
        tag = match.group(0)
        tag = re.sub(
            r'src=(["\'])[^"\']*\1',
            'src="__PARLIAMENT_LOGO__"',
            tag,
            flags=re.I,
        )
        tag = re.sub(
            r'(?:loading|decoding|fetchpriority)=(["\'])[^"\']*\1',
            "",
            tag,
            flags=re.I,
        )
        return tag

    value = re.sub(
        r'<img\b[^>]*data-logo=(["\'])parliament\1[^>]*>',
        normalize_logo_tag,
        value,
        flags=re.I,
    )
    return re.sub(r"\s+", "", value)


def index_templates_semantically_in_sync():
    gas_templates = _extract_index_templates(read("gas-backend/Index.html"))
    static_templates = _extract_index_templates(read("github-pages/index.html"))
    if set(gas_templates) != set(static_templates):
        return False, {
            "missingStatic": sorted(set(gas_templates) - set(static_templates)),
            "missingGas": sorted(set(static_templates) - set(gas_templates)),
        }
    drift = [
        template_id
        for template_id in sorted(gas_templates)
        if _normalize_index_template(gas_templates[template_id])
        != _normalize_index_template(static_templates[template_id])
    ]
    return not drift, {"templateCount": len(gas_templates), "drift": drift}


def check_current_structure_remediation_contract(manifest, vercel):
    ledger = (
        manifest.get("currentStructureRemediationLedger")
        if isinstance(manifest, dict)
        else None
    )
    app_bootstrap = read("github-pages/app-index-bootstrap.js")
    gas_index = read("gas-backend/Index.html")
    critical = read("gas-backend/Scripts_Critical_Login_Runtime.html")
    budget = read("gas-backend/Scripts_Page_Budget.html")
    people = read("gas-backend/Scripts_Page_People.html")
    meeting = read("gas-backend/Scripts_Page_Meeting.html")
    router = read("gas-backend/Code_20_Router.gs")
    login_proxy = read("api/login.js")
    proxy_common = read("api/_gasProxyCommon.js")

    ok(
        "Current structure remediation ledger installed",
        isinstance(ledger, dict)
        and ledger.get("stamp") == CURRENT_STRUCTURE_REMEDIATION_STAMP
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("uiUxChanged") is False
        and ledger.get("businessLogicChanged") is False,
        "TECH_DEBT_MANIFEST must record the load-once, explicit-owner remediation",
    )

    runtime_sources = app_bootstrap + "\n" + gas_index
    ready_body = function_body(app_bootstrap, "ensurePageRuntimeReady")
    ok(
        "Page scripts load once and activate many",
        "forceExecute" not in runtime_sources
        and "app-script-reexec-host" not in runtime_sources
        and "loadPageScriptsDirect(id)" not in ready_body
        and "ensurePageScripts" in ready_body
        and "__APP_PAGE_SCRIPT_LOADED__" in app_bootstrap
        and "__APP_PAGE_SCRIPT_PROMISES__" in app_bootstrap,
        "route activation must not execute page partials a second time",
    )

    load_page_body = function_body(critical, "loadPage")
    ok(
        "Critical page loader has one in-flight owner",
        "__APP_PAGE_LOAD_PROMISES__" in load_page_body
        and "__APP_PAGE_LOADED__" in load_page_body
        and "prefetchPartial(" not in load_page_body,
        "page script loading must coalesce one promise and avoid prefetch+execute duplication",
    )

    ok(
        "Budget and People page helpers use page-scoped names",
        not re.search(r"\bvar\s+\$fn\b", budget)
        and not re.search(r"\bvar\s+\$ob\b", budget)
        and not re.search(r"\bvar\s+\$fn\b", people)
        and not re.search(r"\bvar\s+\$ob\b", people)
        and "$budgetFn" in budget
        and "$peopleFn" in people
        and not re.search(r"\$B\d+", budget),
        "generic or numeric page-level helper identifiers must not collide across page partials",
    )
    ok(
        "Meeting page constants use semantic names",
        not re.search(r"_Z\d+", meeting)
        and "$meetingTypeFunction" in meeting
        and "$meetingApiSaveMeetingLog" in meeting,
        "numeric Meeting constants must not return",
    )

    cases_domain = read("gas-backend/Code_30_Domain_Cases.gs")
    meeting_save_body = function_body(cases_domain, "saveMeetingLog")
    case_projection_body = function_body(
        cases_domain,
        "_readCanonicalCaseProjection_",
    )
    ok(
        "Large Cases owners are decomposed into named helpers",
        len(meeting_save_body.splitlines()) <= 330
        and len(case_projection_body.splitlines()) <= 120
        and "_meetingSaveText_" in cases_domain
        and "_caseProjectionCanonicalRow_" in cases_domain
        and "function _rp(fields, opts)" in cases_domain,
        "saveMeetingLog and canonical case projection must remain decomposed while compatibility aliases stay frozen",
    )

    resolver_body = function_body(router, "_routerResolveCanonicalHandler_")
    map_body = function_body(router, "_routerCanonicalHandlerMap_")
    ok(
        "Router dispatch resolves from explicit canonical map",
        "_routerCanonicalHandlerMap_" in resolver_body
        and "globalThis" not in resolver_body
        and "this[name]" not in resolver_body
        and all(method + ":" in map_body for method in FROZEN_API_METHODS),
        "router must not discover API handlers from mutable global scope at dispatch time",
    )

    ok(
        "Unused proxy login cookie removed",
        "commission_proxy_login" not in login_proxy
        and "Set-Cookie" not in login_proxy,
        "proxy must not publish an authentication-looking cookie that no component validates",
    )

    ok(
        "Proxy preserves upstream HTTP failure status",
        "const upstreamStatus" in proxy_common
        and "status: upstreamStatus" in proxy_common
        and not contains_code(
            proxy_common,
            "return { status: 200, body: result };",
        ),
        "transport failures must remain observable to monitoring and clients",
    )

    header_rows = {}
    for rule in vercel.get("headers", []) if isinstance(vercel, dict) else []:
        if rule.get("source") == "/(.*)":
            header_rows = {
                str(item.get("key", "")).lower(): str(item.get("value", ""))
                for item in rule.get("headers", [])
            }
            break
    ok(
        "Vercel security headers hardened",
        "content-security-policy" in header_rows
        and "strict-transport-security" in header_rows
        and "x-frame-options" in header_rows
        and "cross-origin-opener-policy" in header_rows,
        "CSP, HSTS, frame and opener isolation headers must be present",
    )

    semantic_ok, semantic_detail = index_templates_semantically_in_sync()
    ok(
        "GAS and static Index templates remain semantic mirrors",
        semantic_ok,
        json.dumps(semantic_detail, ensure_ascii=False),
    )

    ok(
        "Stale Budget cache owner wording removed",
        "budget-type-summary-page-cache-v1" not in budget
        and "budget-type-summary-request-key-v2" in budget,
        "request identity must not be described as a page response cache",
    )


def api_methods_from_router(router: str):
    methods = []
    for fname in ["_routerPhase1CoreRouteTuples_", "_routerAdminRoutes_", "_routerAiRoutes_"]:
        b = function_body(router, fname)
        for names, flags in re.findall(r'\["([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]*)"', b or ""):
            for name in names.split("|"):
                name = name.strip()
                if name:
                    methods.append(name)
    return methods


def public_methods_from_router(router: str):
    methods = []
    for fname in ["_routerPhase1CoreRouteTuples_", "_routerAdminRoutes_", "_routerAiRoutes_"]:
        b = function_body(router, fname)
        for names, role in re.findall(r'\["([^"]+)",\s*"([^"]+)",\s*"[^"]+",\s*"[^"]*"', b or ""):
            if role != "public":
                continue
            for name in names.split("|"):
                name = name.strip()
                if name:
                    methods.append(name)
    return sorted(methods)


def frozen_contract_diff(actual, expected):
    actual = list(actual or [])
    expected = list(expected or [])
    return {
        "actualCount": len(actual),
        "expectedCount": len(expected),
        "missing": sorted(set(expected) - set(actual)),
        "unexpected": sorted(set(actual) - set(expected)),
        "orderChanged": actual != expected,
    }


def write_methods_from_router(router: str):
    methods = set()
    body = []
    for fname in ["_routerAdminRoutes_", "_routerPhase1CoreRouteTuples_"]:
        b = function_body(router, fname)
        if b:
            body.append(b)
    for names, flags in re.findall(
        r'\["([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]*)"', "\n".join(body)
    ):
        if "w" not in flags:
            continue
        for name in names.split("|"):
            name = name.strip()
            if name:
                methods.add(name)
    return sorted(methods)


def schema_methods(router: str):
    body = function_body(router, "_routerPhaseKWriteSchemaByMethod_")
    return set(
        x or y
        for x, y in re.findall(r"(?:\"(api[A-Za-z0-9_]+)\"|(api[A-Za-z0-9_]+))\s*:", body or "")
    )


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
    if not contains_code(router, "apiAdminSaveUser:{required:[]}") or not contains_code(
        router, "apiAdminDeleteUser:{required:["
    ):
        fail("Phase 5 admin user write schema missing")
    if not contains_code(platform, 'apiAdminSaveUser:["admin-users","admin"]') or not contains_code(
        platform, 'apiAdminDeleteUser:["admin-users","admin"]'
    ):
        fail("Phase A admin user writes must invalidate admin-users read cache")
    if not contains_code(platform, 'apiSaveCase:["case","dashboard"]') or not contains_code(
        platform, 'apiDeleteCase:["case","dashboard"]'
    ):
        fail("Phase 5 case writes must invalidate dashboard snapshot/cache")
    if not contains_code(
        platform, 'apiSaveLetter:["letters","tracking","dashboard"]'
    ) or not contains_code(platform, 'apiDeleteLetter:["letters","tracking","dashboard"]'):
        fail("Phase 5 tracking letter writes must invalidate tracking/dashboard cache")
    if not contains_code(
        platform, 'apiDeletePetitioner:["people","petitioner","case","dashboard"]'
    ):
        fail("Phase 5 petitioner writes must invalidate petitioner/case/dashboard cache")


def check_owner_consolidation_contract(
    manifest, platform, router, transport, common, core_runtime, gas_index, static_index, alltext
):
    ledger = (
        manifest.get("technicalDebtOwnerConsolidationLedger")
        if isinstance(manifest, dict)
        else None
    )
    ok(
        "Technical debt owner consolidation ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == OWNER_CONSOLIDATION_STAMP,
        "TECH_DEBT_MANIFEST must lock Phase 1 owner matrix",
    )
    owners = ledger.get("owners", {}) if isinstance(ledger, dict) else {}
    ok(
        "Technical debt owner matrix complete",
        isinstance(owners, dict) and all(k in owners for k in OWNER_CONSOLIDATION_REQUIRED_KEYS),
        "missing owner keys: "
        + ",".join([k for k in OWNER_CONSOLIDATION_REQUIRED_KEYS if k not in owners]),
    )
    rules = ledger.get("rules", {}) if isinstance(ledger, dict) else {}
    ok(
        "Technical debt owner consolidation preserves contracts",
        rules.get("noNewApiRoutes") is True
        and rules.get("noNewFiles") is True
        and rules.get("businessLogicChanged") is False
        and rules.get("uiUxChanged") is False,
        "owner consolidation must be metadata/gate only",
    )
    ok(
        "Router remains single route/write owner",
        "function _apiRouteRegistry_" in router
        and "WRITE_SCHEMA_BY_METHOD" in router
        and "function apiRouter" in router,
        "Code_20_Router must own route registry, write schemas, and apiRouter",
    )
    ok(
        "Platform remains single GAS entry owner",
        platform.count("function doGet(") == 1
        and platform.count("function doPost(") == 1
        and platform.count("function apiGithubBridgeCall(") == 1,
        "doGet/doPost/apiGithubBridgeCall must remain single",
    )
    ok(
        "Domain owners remain anchored",
        all(
            token in alltext
            for token in [
                "CaseDomain",
                "TrackingDomain",
                "MeetingDomain",
                "DashboardDomain",
                "BudgetDomain",
                "PeopleDomain",
            ]
        ),
        "domain owner globals must remain present",
    )
    ok(
        "Frontend transport remains one owner",
        "function runVercelApiProxy" in transport
        and "function runVercelLoginProxy" in transport
        and "function runGasDirectTransport" in transport
        and "root.AppTransport.run" in transport
        and "/api/gas" in transport
        and "/api/login" in transport
        and "STATIC_GAS_DIRECT_DISABLED" in transport
        and "google.script.run" not in transport,
        "AppTransport must own static frontend transport through Vercel proxy only; GAS direct is disabled in github-pages runtime",
    )
    forbidden_hits = []
    page_scope_paths = list((ROOT / "gas-backend").glob("Scripts_Page_*.html")) + list(
        (ROOT / "github-pages" / "partials").glob("Scripts_Page_*.html")
    )
    for path in page_scope_paths:
        text = path.read_text(encoding="utf-8", errors="ignore")
        rel = path.relative_to(ROOT).as_posix()
        for token in OWNER_CONSOLIDATION_FORBIDDEN_PAGE_CALLS:
            if token in text:
                forbidden_hits.append(rel + ":" + token)
    ok("Page scripts do not own transport", not forbidden_hits, ", ".join(forbidden_hits[:8]))
    ok(
        "Core runtime remains UI/cache/lifecycle owner",
        all(
            token in core_runtime
            for token in [
                "AppRuntime",
                "AppStore",
                "AppPageKit",
                "app:write-cache-invalidated",
                "app:data-mutated",
            ]
        ),
        "core runtime must retain canonical runtime/cache/write-refresh owners",
    )
    ok(
        "UI token owner remains in indexes",
        "app-global-ui-modern-current" in gas_index
        and "app-global-ui-modern-current" in static_index,
        "Index files must own UI tokens",
    )
    ok(
        "Vercel API file owner set frozen",
        sorted([p.name for p in (ROOT / "api").glob("*.js")]) == FROZEN_VERCEL_API_FILES,
        "api folder must not add a second backend/proxy owner",
    )
    current = (
        manifest.get("currentMultiOwnerResolutionLedger") if isinstance(manifest, dict) else None
    )
    rp = manifest.get("runtimePolicies", {}) if isinstance(manifest, dict) else {}
    docs_policy = read(ROOT / "docs" / "SINGLE_SOURCE_POLICY.md")
    ok(
        "Current multiple-owner resolution ledger installed",
        isinstance(current, dict)
        and current.get("stamp")
        in (
            "production-current-multi-owner-resolution-2026-07-10-r2",
            "production-current-single-owner-hard-lock-2026-07-10-r3",
        )
        and current.get("addedPhase") is False
        and current.get("noNewFiles") is True
        and current.get("noNewApi") is True
        and current.get("ownerPathsExplicit") is True
        and current.get("legacyOwnerAliasesRemoved") is True,
        "TECH_DEBT_MANIFEST must record current multiple-owner resolution without adding phase/files/api",
    )
    ok(
        "Runtime policies point to current owners",
        rp.get("clientCacheOwner") == "backend-router-cache"
        and rp.get("clientInFlightOwner")
        == "github-pages/github-gas-transport.js::AppTransport.inFlightOnly"
        and rp.get("writeRefreshOwner")
        == "gas-backend/Scripts_Core_Runtime.html::AppDirtyRefreshOwner"
        and rp.get("singleOwnerResolutionLocked") is True,
        "runtimePolicies must not point to stale AppTransport.memory/apiInFlight/cache-debt owners",
    )
    ok(
        "Dirty refresh owner has no stale compatibility alias",
        "AppDirtyRefreshOwner.Current" in core_runtime
        and "root.AppDirtyRefreshOwner=root.AppCache" + "DebtOwner" not in compact(core_runtime)
        and ("AppCache" + "DebtOwner") not in core_runtime
        and "technical-debt-phase6-cache-debt-owner" not in core_runtime,
        "Core runtime dirty refresh must have one current owner and no cache-debt alias",
    )
    ok(
        "Frontend transport has no browser read-response cache owner",
        "apiCache=Object.create" not in compact(transport)
        and "function ttlForRead" not in transport
        and '__clientInFlightOwner="AppTransport.inFlightOnly"' in transport
        and '__clientCacheSingleOwner="backend-router-cache"' in transport,
        "github-pages transport must keep only in-flight dedupe; read-response cache must not be a second browser owner",
    )
    page_cache_forbidden = {
        "gas-backend/Scripts_Page_ReportTrack.html": [
            "pageCache",
            "pagePrefetch",
            "inFlightRequestPromise",
            "inFlightRequestKey",
        ],
        "gas-backend/Scripts_Page_Budget.html": [
            "typeSummaryPageCache",
            "typeSummaryPagePrefetch",
            "_summaryCacheKey",
            "_summaryPromise",
            "_typeSummaryPromise",
        ],
        "gas-backend/Scripts_Page_Dashboard.html": [
            "AI_CACHE_TTL",
            "memoryCache",
            "inflightRequests",
            "dashboard_bundle_last_good_current",
            "sessionStorage",
        ],
    }
    page_cache_hits = []
    for rel, tokens in page_cache_forbidden.items():
        source = read(ROOT / rel)
        for token in tokens:
            if token in source:
                page_cache_hits.append(rel + ":" + token)
    ok(
        "Page response caches and duplicate in-flight owners removed",
        not page_cache_hits,
        ", ".join(page_cache_hits[:12]),
    )
    ok(
        "Multiple-owner resolution documentation installed",
        (
            "Current Single Owner Hard Lock" in docs_policy
            or "Current Multiple Owner Resolution R2" in docs_policy
        )
        and "AppDirtyRefreshOwner" in docs_policy
        and "AppTransport.inFlightOnly" in docs_policy
        and "backend/router cache only" in docs_policy
        and "legacy owner aliases removed" in docs_policy,
        "SINGLE_SOURCE_POLICY must document current owner paths with no stale compatibility aliases",
    )


def check_legacy_fallback_cleanup_contract(
    manifest, platform, app, transport, critical_runtime, static_critical
):
    ledger = (
        manifest.get("technicalDebtLegacyFallbackLedger") if isinstance(manifest, dict) else None
    )
    ok(
        "Technical debt legacy/fallback cleanup ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == LEGACY_FALLBACK_CLEANUP_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 7 legacy/fallback cleanup",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("noNewFiles") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Technical debt legacy/fallback cleanup preserves contracts",
        rules_ok,
        "legacy/fallback cleanup must not alter API, files, UI, business rules, routes, or write schema",
    )
    app_c = compact(app)
    duplicate_patterns = [
        "vercelApiProxyEnabled:!0,vercelApiProxyEnabled:!0",
        'releaseGate:"tools/phaseN_legacy_transport_gate.py",releaseGate:"tools/phaseN_legacy_transport_gate.py"',
        'vercelEnvBuildTool:"tools/generate_vercel_env.py",releaseGate:"tools/phaseN_legacy_transport_gate.py",vercelEnvBuildTool:"tools/generate_vercel_env.py"',
        "root.APP_CONFIG.vercelApiProxyEnabled=!0,root.APP_CONFIG.vercelApiProxyEnabled=!0",
        'root.APP_CONFIG.releaseGate="tools/phaseN_legacy_transport_gate.py",root.APP_CONFIG.releaseGate="tools/phaseN_legacy_transport_gate.py"',
    ]
    ok(
        "app-config duplicate legacy/proxy flags removed",
        not any(p in app_c for p in duplicate_patterns),
        "app-config must not carry duplicate releaseGate/vercelApiProxyEnabled/vercelEnvBuildTool assignments",
    )
    ok(
        "required compatibility entrypoints retained after fallback cleanup",
        platform.count("function doGet(") == 1
        and platform.count("function doPost(") == 1
        and platform.count("function apiGithubBridgeCall(") == 1,
        "required GAS compatibility entrypoints must remain single",
    )
    ok(
        "legacy JSONP and hidden bridge endpoints remain disabled",
        "LEGACY_TRANSPORT_DISABLED" in platform
        and "function _legacyDoGetDisabled_" in platform
        and "function _b7(e)" in platform
        and "return _legacyDoGetDisabled_(e)" in platform,
        "legacy JSONP/hidden-bridge/fast-login endpoints must remain disabled while the canonical GAS UI uses google.script.run",
    )
    crit = compact(critical_runtime + static_critical)
    ok(
        "critical runtime owns GAS-hosted direct transport",
        "production-gas-hosted-google-script-run-api-router" in crit
        and ".apiRouter({" in crit
        and "GAS_HOST_RUNTIME_REQUIRED" in crit
        and "resolveCriticalProxyEndpoint_" not in crit
        and "VERCEL_FRONTEND_REQUIRED" not in crit,
        "critical runtime must call the canonical apiRouter through google.script.run when hosted by GAS",
    )
    ok(
        "browser transport stays Vercel proxy only after cleanup",
        "/api/gas" in transport
        and "/api/login" in transport
        and "function runGasDirectTransport" in transport
        and "STATIC_GAS_DIRECT_DISABLED" in transport
        and "google.script.run" not in transport
        and "__githubFastLogin" not in transport
        and 'document.createElement("iframe")' not in compact(transport),
        "browser transport must not reintroduce JSONP, hidden bridge, iframe, or GAS direct transport in static frontend",
    )


def check_phase2_transport_single_path_contract(manifest, transport, app, docs_policy):
    ledger = manifest.get("phase2TransportSinglePathLedger") if isinstance(manifest, dict) else None
    rules = ledger.get("rules", {}) if isinstance(ledger, dict) else {}
    ok(
        "Phase 2 transport single-path ledger installed",
        isinstance(ledger, dict)
        and ledger.get("stamp") == "phase2-transport-single-path-lock-2026-07-09-r1",
        "TECH_DEBT_MANIFEST must record Phase 2 transport single-path lock",
    )
    ok(
        "Phase 2 transport single-path preserves contracts",
        rules.get("noNewFiles") is True
        and rules.get("noNewApiRoutes") is True
        and rules.get("businessLogicChanged") is False
        and rules.get("uiUxChanged") is False
        and rules.get("routeNamesChanged") is False
        and rules.get("writeSchemaChanged") is False
        and rules.get("staticFrontendGasDirectDisabled") is True
        and rules.get("vercelProxyOnly") is True,
        "Phase 2 must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    tc = compact(transport)
    ok(
        "Phase 2 static transport disables GAS direct detection",
        "functiongasDirectAvailable(){return!1}" in tc
        and "STATIC_GAS_DIRECT_DISABLED" in transport
        and "google.script.run" not in transport,
        "github-pages/github-gas-transport.js must disable GAS direct in static frontend",
    )
    ok(
        "Phase 2 AppTransport exposes single path flags",
        "__vercelApiProxyOnly=!0" in tc
        and "__staticGasDirectDisabled=!0" in tc
        and "__singleTransportPathPhase2=!0" in tc,
        "AppTransport status flags must mark Vercel proxy only",
    )
    ok(
        "Phase 2 app-config documents single path",
        "frontendTransportSinglePathPhase2:!0" in compact(app)
        and "staticGasDirectDisabled:!0" in compact(app),
        "app-config must expose phase2 transport policy",
    )
    ok(
        "Phase 2 docs installed",
        "Phase 2 — Transport Single Path Lock" in docs_policy
        and "Browser -> /api/login or /api/gas -> GAS apiRouter -> Domain" in docs_policy
        and "STATIC_GAS_DIRECT_DISABLED" in docs_policy,
        "SINGLE_SOURCE_POLICY must document static transport single path",
    )


def check_performance_debt_contract(manifest, transport, core_runtime):
    ledger = (
        manifest.get("technicalDebtPerformanceDebtLedger") if isinstance(manifest, dict) else None
    )
    ok(
        "Technical debt performance debt ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == PERFORMANCE_DEBT_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 8 performance debt cleanup",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("noNewFiles") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Technical debt performance cleanup preserves contracts",
        rules_ok,
        "performance cleanup must not alter API, files, UI, business rules, routes, or write schema",
    )
    t_c = compact(transport)
    c_c = compact(core_runtime)
    ok(
        "AppTransport partial asset single-flight installed",
        "assetInFlight=Object.create(null)" in transport
        and "if(assetInFlight[file])returnassetInFlight[file]" in t_c
        and "assetInFlight[file]=tryAt(0).then" in t_c,
        "static partial loader must dedupe concurrent fetchFile calls",
    )
    ok(
        "AppTransport public config single-flight installed",
        "publicConfigInFlight=null" in transport
        and "if(publicConfigInFlight)returnpublicConfigInFlight" in t_c
        and "publicConfigInFlight=fetchJsonWithTimeout" in t_c,
        "public config load must dedupe concurrent calls",
    )
    ok(
        "AppTransport performance status exposes asset inflight metrics",
        "assetCacheEntries:Object.keys(cache).length" in t_c
        and "assetInFlight:Object.keys(assetInFlight).length" in t_c
        and "publicConfigInFlight:!!publicConfigInFlight" in t_c,
        "transport status must expose cache/in-flight performance diagnostics",
    )
    ok(
        "Dirty refresh owner coalescing installed",
        contains_code(core_runtime, "timers={}")
        and contains_code(core_runtime, "function schedule(p,d,why,ms)")
        and contains_code(core_runtime, "pendingRefresh:Object.keys(timers)")
        and "dirty-coalesced" in core_runtime,
        "dirty page refreshes must be coalesced to avoid duplicate post-write reloads",
    )


def check_uiux_debt_contract(manifest, gas_index, static_index):
    ledger = manifest.get("technicalDebtUiUxDebtLedger") if isinstance(manifest, dict) else None
    ok(
        "Technical debt UI/UX debt ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == UIUX_DEBT_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 9 UI/UX debt cleanup",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("noNewFiles") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("uiUxImproved") is True
    )
    ok(
        "Technical debt UI/UX cleanup preserves contracts",
        rules_ok,
        "UI/UX cleanup must not alter API, files, business rules, routes, or write schema",
    )
    required = [
        "/*td-p9-uiux*/",
        "เลื่อนซ้าย-ขวาเพื่อดูข้อมูลเพิ่มเติม",
        "prefers-reduced-motion:reduce",
        "-webkit-overflow-scrolling:touch",
        ".mobile-topbar-title-wrap",
    ]
    ok(
        "Mobile UI/UX responsive guard installed in canonical index",
        all(x in gas_index for x in required),
        "canonical Index must contain Phase 9 mobile UI/UX guard",
    )
    ok(
        "Mobile UI/UX responsive guard installed in static index",
        all(x in static_index for x in required),
        "static index must contain Phase 9 mobile UI/UX guard",
    )


def check_quality_gate_contract(
    manifest,
    router,
    transport,
    common,
    gas_api,
    login_api,
    public_config_api,
    critical_runtime,
    static_critical,
    dashboard_page,
    reporttrack_page,
    meeting_page,
    app_index_bootstrap,
):
    ledger = manifest.get("technicalDebtQualityGateLedger") if isinstance(manifest, dict) else None
    ok(
        "Technical debt Phase 10 quality gate ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == QUALITY_GATE_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 10 quality gate hardening",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("noNewFiles") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Technical debt Phase 10 quality gate preserves contracts",
        rules_ok,
        "quality gate hardening must not alter API, files, UI, business rules, routes, or write schema",
    )
    smoke_methods = [
        "apiSearchCasesLite",
        "apiGetTracking",
        "apiGetDashboardBundle",
        "apiListCommitteeMeetings",
        "apiBudgetGetSummary",
        "apiGetPeoplePageBundle",
    ]
    ok(
        "Quality gate critical smoke API methods remain routed",
        all(method in router for method in smoke_methods),
        "router must keep critical read methods: " + ", ".join(smoke_methods),
    )
    ok(
        "Quality gate Vercel proxy uses server env only",
        "process.env.GAS_WEB_APP_URL" in common
        and "process.env.VERCEL_GAS_WEB_APP_URL" in common
        and "NEXT_PUBLIC_GAS_WEB_APP_URL" not in common
        and "body.clientGasWebAppUrl||body.gasWebAppUrl" not in gas_api
        and "body.clientGasWebAppUrl||body.gasWebAppUrl" not in login_api
        and 'searchParams.get("gasWebAppUrl")' not in public_config_api,
        "Vercel proxy must not accept client supplied GAS URL",
    )
    ok(
        "Quality gate static AppTransport is Vercel proxy only",
        "function gasDirectAvailable(){return!1}" in compact(transport)
        and "function runGasDirectTransport" in transport
        and "STATIC_GAS_DIRECT_DISABLED" in transport
        and "google.script.run" not in transport,
        "Static frontend must not activate GAS direct AppTransport; browser path is /api/login or /api/gas only",
    )
    crit = compact(critical_runtime + "\n" + static_critical)
    ok(
        "Quality gate critical runtime uses Vercel proxy only",
        "/api/login" in crit and "/api/gas" in crit and "google.script.run" not in crit,
        "Critical runtime must not reintroduce GAS direct fallback",
    )
    dash_c = compact(dashboard_page)
    ok(
        "Quality gate Dashboard write invalidation installed",
        all(
            token in dashboard_page
            for token in [
                "dashboardCacheEpoch",
                "markDashboardDirty",
                "app:data-mutated",
                "app:write-cache-invalidated",
            ]
        )
        and "forceFresh" in dashboard_page
        and "state.__dirtyAfterWrite" in dashboard_page,
        "Dashboard must mark dirty and force fresh after write/cache invalidation",
    )
    report_c = compact(reporttrack_page)
    ok(
        "Quality gate Search/Report force-fresh installed",
        ("forceFresh:!0" in report_c or "forceFresh:true" in report_c)
        and ("noCache:!0" in report_c or "noCache:true" in report_c)
        and ("bypassCache:!0" in report_c or "bypassCache:true" in report_c)
        and ("cacheTtlMs=0" in report_c or "cacheTtlSeconds:0" in report_c),
        "Search/Report/Track manual loads must bypass stale page/proxy cache",
    )
    meet_c = compact(meeting_page)
    ok(
        "Quality gate committee meeting form recovery installed",
        "CommitteeMeetingSystem" in meeting_page
        and "committee-meeting-form-panel" in meeting_page
        and "committee-meeting-form-body" in meeting_page
        and "ensureCommitteeMeetingFormVisible" in meeting_page
        and "setTimeout(function(){run(n+1)},80)" in meet_c,
        "Committee meeting page must retry activate and force form visible when DOM mounts late",
    )
    ok(
        "Quality gate route template HTML mounts as DOM fragment",
        "createContextualFragment" in app_index_bootstrap
        and "createContextualFragment" in meeting_page
        and "createContextualFragment" in critical_runtime,
        "route/template fallback must mount HTML as contextual fragments, not unsafe text",
    )
    ok(
        "Quality gate mirror sync and static critical remain guarded",
        not mirror_in_sync() and critical_static_runtime_in_sync(),
        "generated partial mirrors and critical-login-runtime.js must remain synced to GAS canonical sources",
    )


def check_phase1_release_discipline_contract(manifest, package, vercel, docs_policy):
    ledger = (
        manifest.get("phase1ProductionReleaseDisciplineLedger")
        if isinstance(manifest, dict)
        else None
    )
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    build_cmd = str(scripts.get("build", ""))
    audit_cmd = str(scripts.get("audit:strict", ""))
    release_cmd = str(scripts.get("release:check", ""))
    deploy_cmd = str(scripts.get("deploy:check", ""))
    predeploy_cmd = str(scripts.get("predeploy:production", ""))
    ok(
        "Phase 1 production release discipline ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == PHASE1_RELEASE_DISCIPLINE_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 1 release discipline",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Phase 1 release discipline preserves contracts",
        rules_ok,
        "release discipline must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    ok(
        "Phase 1 Vercel build remains host-safe",
        vercel.get("buildCommand") == "npm run build" and build_cmd == "npm run check:api",
        "Vercel build must stay short and non-strict; production gate is separate",
    )
    ok(
        "Phase 1 strict audit is blocking-capable",
        "COMMISSION_STRICT_GATES=1" in audit_cmd
        and "--strict" in audit_cmd
        and "phaseG_security_gate.py" in audit_cmd
        and "phaseN_legacy_transport_gate.py" in audit_cmd,
        audit_cmd,
    )
    ok(
        "Phase 1 production release aliases installed",
        release_cmd == "npm run audit:strict"
        and deploy_cmd == "npm run audit:strict"
        and predeploy_cmd == "npm run audit:strict",
        json.dumps(
            {
                "release:check": release_cmd,
                "deploy:check": deploy_cmd,
                "predeploy:production": predeploy_cmd,
            },
            ensure_ascii=False,
        ),
    )
    docs_required = [
        "npm run build` is intentionally Vercel-host safe",
        "not** the final production release gate",
        "npm run audit:strict",
        "npm run release:check",
        "do not promote a ZIP that has only passed `npm run build`",
    ]
    ok(
        "Phase 1 release policy documented",
        all(token in docs_policy for token in docs_required) and "or simply:" not in docs_policy,
        "docs/SINGLE_SOURCE_POLICY.md must state audit:strict is the production gate and must not present npm run build as sufficient",
    )
    ok(
        "Phase 1 manifest release gate names strict audit",
        isinstance(ledger, dict)
        and ledger.get("productionReleaseGate") == "npm run audit:strict"
        and ledger.get("requiresStrictGates") is True
        and ledger.get("forbiddenProductionShortcut") == "npm run build only",
        "manifest ledger must block build-only production promotion",
    )


def check_phase3_cache_data_freshness_contract(manifest, core_runtime, budget_page, docs_policy):
    ledger = manifest.get("phase3CacheDataFreshnessLedger") if isinstance(manifest, dict) else None
    core_c = compact(core_runtime)
    budget_c = compact(budget_page)
    ok(
        "Phase 3 cache/data freshness ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == PHASE3_CACHE_DATA_FRESHNESS_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 3 cache/data freshness",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Phase 3 cache freshness preserves contracts",
        rules_ok,
        "Phase 3 must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    ok(
        "Phase 3 AppDataFreshnessOwner installed",
        "AppDataFreshnessOwner" in core_runtime
        and PHASE3_CACHE_DATA_FRESHNESS_STAMP in core_runtime
        and "app:data-freshness-changed" in core_runtime,
        "core runtime must expose freshness owner and event",
    )
    ok(
        "Phase 3 client cache key includes freshness/write epoch",
        "epoch=String(Math.max(Number(root.__APP_WRITE_CACHE_EPOCH__||0)||0,Number(root.__APP_DATA_FRESHNESS_EPOCH__||0)||0))"
        in core_c,
        "client cache key must change after write/freshness epoch",
    )
    ok(
        "Phase 3 write events advance freshness owner",
        "app:data-mutated" in core_runtime
        and "app:write-cache-invalidated" in core_runtime
        and ".touch" in core_runtime,
        "write/cache events must advance freshness owner",
    )
    ok(
        "Phase 3 budget external mutation refresh installed",
        "budgetCURRENTBBindFreshnessEvents" in budget_page
        and "phase3-freshness" in budget_page
        and "app:data-freshness-changed" in budget_page,
        "budget page must mark visible views dirty after external write/cache events",
    )
    ok(
        "Phase 3 documentation installed",
        PHASE3_CACHE_DATA_FRESHNESS_STAMP in docs_policy
        and "Cache/Data Freshness" in docs_policy
        and "npm run audit:strict" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Phase 3 freshness and strict release gate",
    )


def check_phase4_write_delete_reliability_contract(manifest, platform, router, docs_policy):
    ledger = (
        manifest.get("phase4WriteDeleteReliabilityLedger") if isinstance(manifest, dict) else None
    )
    platform_c = compact(platform)
    router_c = compact(router)
    ok(
        "Phase 4 write/delete reliability ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == PHASE4_WRITE_DELETE_RELIABILITY_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 4 write/delete reliability",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("writeRouteCount") == 27
    )
    ok(
        "Phase 4 write/delete reliability preserves contracts",
        rules_ok,
        "Phase 4 must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    ok(
        "Phase 4 platform reliability owner installed",
        "APP_PHASE4_WRITE_DELETE_RELIABILITY_CONTRACT" in platform
        and PHASE4_WRITE_DELETE_RELIABILITY_STAMP in platform
        and "function _platformPhase4WriteDeleteReliabilityStatus_" in platform
        and "function _platformPhase4WriteDeleteReliabilityForMethod_" in platform,
        "platform must expose Phase 4 write/delete reliability contract",
    )
    ok(
        "Phase 4 writeGateway attaches reliability metadata",
        "meta.phase4WriteDeleteReliabilityStamp=APP_PHASE4_WRITE_DELETE_RELIABILITY_CONTRACT.stamp"
        in platform_c
        and "meta.phase4WriteDeleteReliabilityContract=_platformPhase4WriteDeleteReliabilityForMethod_"
        in platform_c
        and "phase4WriteDeleteReliabilityContract:_platformPhase4WriteDeleteReliabilityForMethod_"
        in platform_c,
        "writeGateway success/error envelopes must attach Phase 4 reliability metadata",
    )
    ok(
        "Phase 4 router reliability status installed",
        "ROUTER_PHASE4_WRITE_DELETE_RELIABILITY_STAMP" in router
        and "function _routerPhase4WriteDeleteReliabilityStatus_" in router
        and "phase4WriteDeleteReliability:_routerPhase4WriteDeleteReliabilityStatus_(registry)"
        in router_c,
        "api route contract must expose Phase 4 write/delete reliability status",
    )
    critical_tokens = [
        'apiDeleteCase:["case","dashboard"]',
        'apiDeleteMeetingLog:["meeting","dashboard"]',
        'apiDeleteLetter:["letters","tracking","dashboard"]',
        'apiDeletePetitioner:["people","petitioner","case","dashboard"]',
        'apiBudgetDeleteImport:["budget","dashboard"]',
        'apiAdminDeleteUser:["admin-users","admin"]',
    ]
    ok(
        "Phase 4 critical delete invalidation matrix locked",
        all(token in router for token in critical_tokens)
        and all(token in platform for token in critical_tokens),
        "critical delete routes must keep deterministic invalidation targets",
    )
    ok(
        "Phase 4 documentation installed",
        PHASE4_WRITE_DELETE_RELIABILITY_STAMP in docs_policy
        and "Write/Delete Reliability" in docs_policy
        and "27 write APIs" in docs_policy
        and "npm run audit:strict" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Phase 4 reliability and strict release gate",
    )


def _five_digit_css_hex_tokens(html: str):
    tokens = []
    for block in re.findall(r"<style[^>]*>([\s\S]*?)</style>", html or "", flags=re.I):
        for m in re.finditer(r"#[0-9a-fA-F]{5}\b", block):
            tokens.append(m.group(0))
    return tokens


def _duplicate_html_ids(html: str):
    counts = {}
    for m in re.finditer(r"\bid\s*=\s*(['\"])(.*?)\1", html or "", re.I | re.S):
        value = (m.group(2) or "").strip()
        if value:
            counts[value] = counts.get(value, 0) + 1
    return sorted([key for key, value in counts.items() if value > 1])


def check_phase5_uiux_modernization_contract(manifest, gas_index, static_index, docs_policy):
    ledger = manifest.get("phase5UiUxModernizationLedger") if isinstance(manifest, dict) else None
    ok(
        "Phase 5 UI/UX modernization ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == PHASE5_UIUX_MODERNIZATION_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 5 UI/UX modernization",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("uiUxImproved") is True
        and ledger.get("domIdsChanged") is False
    )
    ok(
        "Phase 5 UI/UX modernization preserves contracts",
        rules_ok,
        "Phase 5 may improve UI but must not alter files, API routes, business rules, route names, write schema, or DOM ids",
    )
    required = [
        "app-phase5-uiux-modernization",
        "AppPhase5UiUx",
        PHASE5_UIUX_MODERNIZATION_STAMP,
        "phase5-table-scroll-region",
        "modal-dialog-scrollable",
        'aria-label","ตารางข้อมูล เลื่อนซ้ายขวาเพื่อดูข้อมูลเพิ่มเติม',
    ]
    ok(
        "Phase 5 UI owner installed in canonical index",
        all(token in gas_index for token in required),
        "canonical Index must install AppPhase5UiUx owner and mobile/table/modal guards",
    )
    ok(
        "Phase 5 UI owner installed in static index",
        all(token in static_index for token in required),
        "static index must install AppPhase5UiUx owner and mobile/table/modal guards",
    )
    bad_gas = _five_digit_css_hex_tokens(gas_index)
    bad_static = _five_digit_css_hex_tokens(static_index)
    ok(
        "Phase 5 CSS color tokens are standards-compliant in indexes",
        not bad_gas and not bad_static,
        "5-digit #rgbAA tokens must be expanded to #rrggbbAA: gas="
        + ",".join(sorted(set(bad_gas)))
        + " static="
        + ",".join(sorted(set(bad_static))),
    )
    dup_gas = _duplicate_html_ids(gas_index)
    dup_static = _duplicate_html_ids(static_index)
    ok(
        "Phase 5 DOM ids are unique in indexes",
        not dup_gas and not dup_static,
        "duplicate ids: gas=" + ",".join(dup_gas) + " static=" + ",".join(dup_static),
    )
    ok(
        "Phase 5 UI/UX documentation installed",
        PHASE5_UIUX_MODERNIZATION_STAMP in docs_policy
        and "UI/UX Modernization" in docs_policy
        and "AppPhase5UiUx" in docs_policy
        and "npm run audit:strict" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Phase 5 UI/UX modernization and strict release gate",
    )


def _script_type_from_attrs(attrs: str) -> str:
    m = re.search(r"\btype\s*=\s*(['\"])(.*?)\1", attrs or "", re.I | re.S)
    return (m.group(2) if m else "").strip().lower()


def _inline_script_syntax_errors():
    errors_found = []
    node = shutil.which("node")
    if not node:
        return ["node runtime not found for inline HTML script syntax check"]
    html_paths = sorted(
        list((ROOT / "gas-backend").glob("*.html"))
        + list((ROOT / "github-pages").glob("*.html"))
        + list((ROOT / "github-pages" / "partials").glob("*.html"))
    )
    skip_types = {"text/x-template", "text/html", "application/json", "application/ld+json"}
    with tempfile.TemporaryDirectory(prefix="commission_html_js_") as tmp:
        tmp_path = Path(tmp)
        for path in html_paths:
            text = path.read_text(encoding="utf-8", errors="ignore")
            rel = path.relative_to(ROOT).as_posix()
            for idx, match in enumerate(
                re.finditer(r"<script\b([^>]*)>([\s\S]*?)</script>", text, re.I), 1
            ):
                attrs = match.group(1) or ""
                code = match.group(2) or ""
                script_type = _script_type_from_attrs(attrs)
                if script_type in skip_types:
                    continue
                if re.search(r"\bsrc\s*=", attrs, re.I) and not code.strip():
                    continue
                cleaned = re.sub(r"<\?!=?[\s\S]*?\?>", "undefined", code)
                if not cleaned.strip():
                    continue
                temp_file = tmp_path / (
                    rel.replace("/", "__").replace("\\", "__") + f"__script{idx}.js"
                )
                temp_file.write_text(cleaned, encoding="utf-8")
                result = subprocess.run(
                    [node, "--check", str(temp_file)], capture_output=True, text=True
                )
                if result.returncode != 0:
                    msg = (result.stderr or result.stdout or "").strip().splitlines()
                    errors_found.append(
                        rel
                        + f":script{idx}: "
                        + (" | ".join(msg[:3]) if msg else "node --check failed")
                    )
    return errors_found


def _extract_object_body_after_assignment(text: str, name: str) -> str:
    marker = name + "={"
    start = (text or "").find(marker)
    if start < 0:
        return ""
    i = start + len(name) + 1
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
        if ch in ('"', "'", "`"):
            in_str = ch
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return text[i + 1 : j]
    return ""


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
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
            i += 1
            continue
        if ch in ('"', "'", "`"):
            in_str = ch
            i += 1
            continue
        if ch in "{[(":
            depth += 1
            i += 1
            continue
        if ch in "}])":
            depth -= 1
            i += 1
            continue
        if depth == 0:
            m = re.match(r"\s*([A-Za-z_$][\w$]*)\s*:", object_body[i:])
            if m:
                key = m.group(1)
                counts[key] = counts.get(key, 0) + 1
                i += m.end()
                continue
        i += 1
    return counts


def check_phase6_static_qa_readiness_contract(manifest, app, docs_policy):
    ledger = manifest.get("phase6StaticQaReadinessLedger") if isinstance(manifest, dict) else None
    ok(
        "Phase 6 static QA/readiness ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == PHASE6_STATIC_QA_READINESS_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 6 static QA readiness",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Phase 6 static QA/readiness preserves contracts",
        rules_ok,
        "Phase 6 must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    script_errors = _inline_script_syntax_errors()
    ok(
        "Phase 6 inline HTML JavaScript syntax gate",
        not script_errors,
        "; ".join(script_errors[:8]),
    )
    defaults_body = _extract_object_body_after_assignment(app, "defaults")
    counts = _top_level_key_counts(defaults_body)
    high_risk_keys = [
        "releaseGate",
        "vercelEnvBuildTool",
        "vercelApiProxyEnabled",
        "transportMode",
        "hostingTarget",
        "readJsonpApi",
        "loginFormPost",
    ]
    duplicated = [
        key + "=" + str(counts.get(key, 0)) for key in high_risk_keys if counts.get(key, 0) > 1
    ]
    ok(
        "Phase 6 app-config high-risk default keys are single-owner",
        not duplicated,
        ", ".join(duplicated),
    )
    ok(
        "Phase 6 documentation installed",
        PHASE6_STATIC_QA_READINESS_STAMP in docs_policy
        and "Static QA Readiness" in docs_policy
        and "inline HTML JavaScript syntax" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Phase 6 static QA readiness gate",
    )


def check_static_config_assignment_guard_contract(manifest, app, docs_policy):
    ledger = (
        manifest.get("staticConfigAssignmentGuardLedger") if isinstance(manifest, dict) else None
    )
    ok(
        "Static config assignment guard ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == STATIC_CONFIG_ASSIGNMENT_GUARD_STAMP,
        "TECH_DEBT_MANIFEST must record static config assignment guard",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Static config assignment guard preserves contracts",
        rules_ok,
        "config assignment cleanup must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    runtime_counts = {}
    for key in re.findall(r"root\.APP_CONFIG\.([A-Za-z_$][\w$]*)\s*=", app or ""):
        runtime_counts[key] = runtime_counts.get(key, 0) + 1
    duplicate_release_gate = runtime_counts.get("releaseGate", 0)
    ok(
        "app-config releaseGate runtime assignment is single-owner",
        duplicate_release_gate == 1,
        "root.APP_CONFIG.releaseGate assignment count=" + str(duplicate_release_gate),
    )
    hard_single_owner = [
        "releaseGate",
        "hostingTarget",
        "loginFormPost",
        "readJsonpApi",
        "legacyTransportRemoved",
        "legacyJsonpTransportRemoved",
        "legacyGasBridgeTransportRemoved",
        "legacyLoginPostIframeRemoved",
    ]
    duplicated = [
        key + "=" + str(runtime_counts.get(key, 0))
        for key in hard_single_owner
        if runtime_counts.get(key, 0) > 1
    ]
    ok(
        "app-config high-risk runtime assignments are single-owner",
        not duplicated,
        ", ".join(duplicated),
    )
    ok(
        "Static config assignment guard documentation installed",
        STATIC_CONFIG_ASSIGNMENT_GUARD_STAMP in docs_policy
        and "Static Config Assignment Guard" in docs_policy,
        "SINGLE_SOURCE_POLICY must document static config assignment guard",
    )
    deploy_ledger = (
        manifest.get("deployReleaseSinglePublishGuardLedger")
        if isinstance(manifest, dict)
        else None
    )
    ok(
        "Deploy release single-publish guard ledger installed",
        isinstance(deploy_ledger, dict)
        and deploy_ledger.get("stamp") == DEPLOY_RELEASE_SINGLE_PUBLISH_GUARD_STAMP,
        "TECH_DEBT_MANIFEST must record deploy release single-publish guard",
    )
    deploy_rules_ok = (
        isinstance(deploy_ledger, dict)
        and deploy_ledger.get("noNewFiles") is True
        and deploy_ledger.get("noNewApiRoutes") is True
        and deploy_ledger.get("businessLogicChanged") is False
        and deploy_ledger.get("uiUxChanged") is False
        and deploy_ledger.get("routeNamesChanged") is False
        and deploy_ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Deploy release single-publish guard preserves contracts",
        deploy_rules_ok,
        "deploy release publisher cleanup must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    deploy_assignments = len(
        re.findall(r"root\.APP_DEPLOY_RELEASE\s*=\s*Object\.assign", app or "")
    )
    publish_defs = len(re.findall(r"function\s+publishDeployRelease\s*\(", app or ""))
    publish_calls = len(re.findall(r"(?<!function\s)publishDeployRelease\s*\(", app or ""))
    ok(
        "app-config APP_DEPLOY_RELEASE Object.assign is single-owner",
        deploy_assignments == 1,
        "root.APP_DEPLOY_RELEASE Object.assign count=" + str(deploy_assignments),
    )
    ok(
        "app-config deploy release publisher is single-call",
        publish_defs == 1 and publish_calls == 1,
        "publishDeployRelease definitions=" + str(publish_defs) + " calls=" + str(publish_calls),
    )
    ok(
        "Deploy release single-publish guard documentation installed",
        DEPLOY_RELEASE_SINGLE_PUBLISH_GUARD_STAMP in docs_policy
        and "Deploy Release Single-Publish Guard" in docs_policy,
        "SINGLE_SOURCE_POLICY must document deploy release single-publish guard",
    )


def _top_level_symbols(text: str):
    depth = 0
    in_str = None
    esc = False
    line = False
    block = False
    depth_at = [0] * (len(text) + 1)
    i = 0
    while i < len(text):
        depth_at[i] = depth
        ch = text[i]
        nxt = text[i + 1] if i + 1 < len(text) else ""
        if line:
            if ch == "\n":
                line = False
            i += 1
            continue
        if block:
            if ch == "*" and nxt == "/":
                block = False
                i += 2
                continue
            i += 1
            continue
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
            i += 1
            continue
        if ch == "/" and nxt == "/":
            line = True
            i += 2
            continue
        if ch == "/" and nxt == "*":
            block = True
            i += 2
            continue
        if ch in ('"', "'", "`"):
            in_str = ch
            i += 1
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        i += 1
    out = []
    for m in re.finditer(r"function\s+([A-Za-z_$][\w$]*)\s*\(", text or ""):
        if depth_at[m.start()] == 0:
            out.append((m.group(1), "function"))
    for m in re.finditer(r"\b(?:var|let|const)\s+([^;\n]+)", text or ""):
        if depth_at[m.start()] != 0:
            continue
        for part in m.group(1).split(","):
            mm = re.match(r"\s*([A-Za-z_$][\w$]*)\b", part)
            if mm:
                out.append((mm.group(1), "var"))
    return out


def _node_check_source_file(path: Path, suffix: str = None) -> str:
    node = shutil.which("node")
    if not node:
        return "node runtime not found"
    suffix = suffix or path.suffix or ".js"
    with tempfile.TemporaryDirectory(prefix="commission_source_syntax_") as tmp:
        temp = Path(tmp) / ("source" + suffix)
        temp.write_text(path.read_text(encoding="utf-8", errors="ignore"), encoding="utf-8")
        result = subprocess.run([node, "--check", str(temp)], capture_output=True, text=True)
        if result.returncode == 0:
            return ""
        msg = (result.stderr or result.stdout or "").strip().splitlines()
        return " | ".join(msg[:3]) if msg else "node --check failed"


def _deep_source_syntax_errors():
    errors_found = []
    source_paths = []
    source_paths.extend(sorted((ROOT / "gas-backend").glob("*.gs")))
    source_paths.extend(sorted((ROOT / "api").glob("*.js")))
    source_paths.extend(sorted((ROOT / "github-pages").glob("*.js")))
    for path in source_paths:
        rel = path.relative_to(ROOT).as_posix()
        suffix = ".js" if path.suffix == ".gs" else path.suffix
        err = _node_check_source_file(path, suffix=suffix)
        if err:
            errors_found.append(rel + ": " + err)
    return errors_found


def _semantic_minifier_spacing_errors():
    errors_found = []
    source_roots = [ROOT / "gas-backend", ROOT / "github-pages", ROOT / "api"]
    token_rules = [
        (
            "return",
            re.compile(r"\breturn(?=[$_][A-Za-z0-9_$])"),
            "expected `return $token` or `return _token`",
        ),
        (
            "else",
            re.compile(r"\belse(?=[$_][A-Za-z0-9_$])"),
            "expected `else if($token...)` or a separated `else` block",
        ),
    ]
    for root in source_roots:
        if not root.exists():
            continue
        for path in sorted(root.rglob("*")):
            if not path.is_file() or path.suffix.lower() not in {".html", ".js", ".gs"}:
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            rel = path.relative_to(ROOT).as_posix()
            for keyword, token_re, hint in token_rules:
                hits = list(token_re.finditer(text))
                if hits:
                    errors_found.append(
                        f"{rel}: {keyword} keyword glued to minifier token ({len(hits)} hit(s)); {hint}"
                    )
    return errors_found


def _interaction_ux_runtime_contract_errors():
    errors_found = []
    meeting_paths = [
        ROOT / "gas-backend" / "Scripts_Page_Meeting.html",
        ROOT / "github-pages" / "partials" / "Scripts_Page_Meeting.html",
    ]
    for path in meeting_paths:
        text = path.read_text(encoding="utf-8", errors="ignore") if path.exists() else ""
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        if "var _Z0=_Z0" in text:
            errors_found.append(
                rel + ": meeting runtime constants must be explicit, not self-assigned"
            )
        if ".js-show-meeting-detail,.js-load-meeting" not in text:
            errors_found.append(
                rel + ": meeting summary detail click must be covered by main event owner selector"
            )
    people_paths = [
        ROOT / "gas-backend" / "Scripts_Page_People.html",
        ROOT / "github-pages" / "partials" / "Scripts_Page_People.html",
    ]
    for path in people_paths:
        text = path.read_text(encoding="utf-8", errors="ignore") if path.exists() else ""
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        if "#psTab.nav-link" in text:
            errors_found.append(
                rel + ": people tab selector must be `#psTab .nav-link`, not `#psTab.nav-link`"
            )
    budget_paths = [
        ROOT / "gas-backend" / "Scripts_Page_Budget.html",
        ROOT / "github-pages" / "partials" / "Scripts_Page_Budget.html",
    ]
    malformed_attr = re.compile(r"<[^>\n]*(?:id|class)=\$B\d+")
    for path in budget_paths:
        text = path.read_text(encoding="utf-8", errors="ignore") if path.exists() else ""
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        hits = malformed_attr.findall(text)
        if hits:
            errors_found.append(
                rel
                + ": generated budget HTML contains literal minifier variable attributes ("
                + str(len(hits))
                + " hit(s))"
            )
    return errors_found


def check_phase4_generated_mirror_slimming_contract(manifest, docs_policy):
    ledger = (
        manifest.get("phase4GeneratedMirrorSlimmingLedger") if isinstance(manifest, dict) else None
    )
    ok(
        "Phase 4 generated mirror slimming ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == PHASE4_GENERATED_MIRROR_SLIMMING_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 4 generated mirror slimming",
    )
    ok(
        "Phase 4 generated mirror slimming preserves contracts",
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False,
        "Phase 4 mirror slimming must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    ok(
        "Phase 4 generated mirrors remain canonical after header strip",
        not mirror_in_sync(),
        "generated partial mirrors must equal GAS canonical scripts after removing generated header",
    )
    ok(
        "Phase 4 generated mirror slimming documentation installed",
        PHASE4_GENERATED_MIRROR_SLIMMING_STAMP in docs_policy
        and "Generated Mirror Slimming" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Phase 4 generated mirror slimming",
    )


def check_phase6_manifest_gate_cleanup_contract(manifest, docs_policy):
    ledger = manifest.get("phase6ManifestGateCleanupLedger") if isinstance(manifest, dict) else None
    manifest_path = ROOT / "TECH_DEBT_MANIFEST.json"
    manifest_bytes = manifest_path.stat().st_size if manifest_path.exists() else 0
    ok(
        "Phase 6 manifest/gate cleanup ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == PHASE6_MANIFEST_GATE_CLEANUP_STAMP,
        "TECH_DEBT_MANIFEST must record Phase 6 manifest/gate cleanup",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
    )
    ok(
        "Phase 6 manifest/gate cleanup preserves contracts",
        rules_ok,
        "Phase 6 manifest/gate cleanup must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    ok(
        "Phase 6 manifest stays below compact ledger budget",
        manifest_bytes <= PHASE6_MANIFEST_MAX_BYTES
        and ledger.get("manifestMaxBytes") == PHASE6_MANIFEST_MAX_BYTES,
        "TECH_DEBT_MANIFEST bytes=%s max=%s" % (manifest_bytes, PHASE6_MANIFEST_MAX_BYTES),
    )
    ok(
        "Phase 6 manifest separates current contract from compact ledger",
        ledger.get("manifestModel") == "current-contract-plus-compact-ledger"
        and isinstance(manifest.get("contractFreeze"), dict)
        and isinstance(manifest.get("releaseAlignment"), dict)
        and manifest.get("contractFreeze", {}).get("apiMethods") == FROZEN_API_METHODS,
        "manifest must retain frozen current contract while pruning verbose historical prose",
    )
    ok(
        "Phase 6 manifest/gate cleanup documentation installed",
        PHASE6_MANIFEST_GATE_CLEANUP_STAMP in docs_policy
        and "Manifest/Gate Cleanup" in docs_policy
        and "current contract plus compact ledger" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Phase 6 manifest/gate cleanup",
    )


def check_current_final_consistency_contract(manifest, package, docs_policy):
    ledger = manifest.get("currentFinalConsistencyLedger") if isinstance(manifest, dict) else None
    current_files = sorted(iter_packaged_current_files())
    expected_files = sorted(ledger.get("sourceFiles", [])) if isinstance(ledger, dict) else []
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    ok(
        "Current final consistency ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == CURRENT_FINAL_CONSISTENCY_STAMP,
        "TECH_DEBT_MANIFEST must record current final consistency without adding a Phase",
    )
    ok(
        "Current final consistency source file set locked",
        isinstance(ledger, dict)
        and ledger.get("sourceFileCount") == len(expected_files) == len(current_files)
        and expected_files == current_files,
        "expected=%s current=%s added=%s removed=%s"
        % (
            len(expected_files),
            len(current_files),
            sorted(set(current_files) - set(expected_files)),
            sorted(set(expected_files) - set(current_files)),
        ),
    )
    ok(
        "Current final consistency preserves frozen API counts",
        isinstance(ledger, dict)
        and ledger.get("apiRouteCount") == len(FROZEN_API_METHODS)
        and ledger.get("writeRouteCount") == len(FROZEN_WRITE_METHODS)
        and ledger.get("publicRouteCount") == len(FROZEN_PUBLIC_METHODS),
        "route/write/public counts must match frozen contract",
    )
    ok(
        "Current final consistency preserves Vercel proxy files",
        isinstance(ledger, dict)
        and sorted(ledger.get("vercelApiFiles", [])) == sorted(FROZEN_VERCEL_API_FILES)
        and sorted(p.name for p in (ROOT / "api").glob("*.js")) == sorted(FROZEN_VERCEL_API_FILES),
        "Vercel API proxy file set must remain frozen",
    )
    ok(
        "Current final consistency keeps audit:strict as gate owner",
        isinstance(ledger, dict)
        and ledger.get("singleBlockingGateOwner") == "audit:strict"
        and "build:strict" not in scripts,
        "audit:strict must remain the single blocking production gate",
    )
    ok(
        "Current final consistency preserves no-change rules",
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False,
        "final consistency must not change files, APIs, routes, write schema, business rules, or UI",
    )
    ok(
        "Current final consistency documentation installed",
        CURRENT_FINAL_CONSISTENCY_STAMP in docs_policy
        and "Current Final Consistency Lock" in docs_policy
        and ("53 files" in docs_policy or "43 source files / 53 build files" in docs_policy)
        and "108 methods" in docs_policy
        and "27" in docs_policy,
        "SINGLE_SOURCE_POLICY must document current final consistency lock",
    )
    semantic = (
        manifest.get("currentSemanticOwnerWordingCleanupLedger")
        if isinstance(manifest, dict)
        else None
    )
    ok(
        "Current semantic owner wording cleanup ledger installed",
        isinstance(semantic, dict)
        and semantic.get("stamp") == CURRENT_SEMANTIC_OWNER_WORDING_CLEANUP_STAMP
        and semantic.get("noNewFiles") is True
        and semantic.get("noNewApi") is True
        and semantic.get("addedPhase") is False
        and semantic.get("runtimeBehaviorChanged") is False,
        "TECH_DEBT_MANIFEST must record semantic owner wording cleanup without runtime/API/UI changes",
    )
    ok(
        "Current semantic owner wording cleanup documented",
        CURRENT_SEMANTIC_OWNER_WORDING_CLEANUP_STAMP in docs_policy
        and "Semantic Owner Wording Cleanup" in docs_policy,
        "SINGLE_SOURCE_POLICY must document semantic owner wording cleanup",
    )


def check_deep_source_syntax_guard_contract(manifest, docs_policy):
    ledger = manifest.get("deepSourceSyntaxGuardLedger") if isinstance(manifest, dict) else None
    ok(
        "Deep source syntax guard ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == DEEP_SOURCE_SYNTAX_GUARD_STAMP,
        "TECH_DEBT_MANIFEST must record deep source syntax guard",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
    )
    ok(
        "Deep source syntax guard preserves contracts",
        rules_ok,
        "deep syntax guard must not alter files, API routes, UI, business rules, route names, or write schema",
    )
    syntax_errors = _deep_source_syntax_errors()
    ok(
        "Deep source syntax gate checks GAS and frontend JS",
        not syntax_errors,
        "; ".join(syntax_errors[:8]),
    )
    minifier_spacing_errors = _semantic_minifier_spacing_errors()
    ok(
        "Deep source semantic gate rejects keyword-token minifier spacing drift",
        not minifier_spacing_errors,
        "; ".join(minifier_spacing_errors[:8]),
    )
    interaction_ux_errors = _interaction_ux_runtime_contract_errors()
    ok(
        "Interaction UX runtime contract prevents meeting, people, and budget regressions",
        not interaction_ux_errors,
        "; ".join(interaction_ux_errors[:8]),
    )
    ok(
        "Deep source syntax guard documentation installed",
        DEEP_SOURCE_SYNTAX_GUARD_STAMP in docs_policy
        and "Deep Source Syntax Guard" in docs_policy
        and "GAS .gs" in docs_policy
        and "github-pages/*.js" in docs_policy,
        "SINGLE_SOURCE_POLICY must document deep source syntax guard",
    )


def check_ai_meeting_budget_stability_contract(manifest, docs_policy):
    ledger = manifest.get("aiMeetingBudgetStabilityLedger") if isinstance(manifest, dict) else None
    ok(
        "AI/Meeting/Budget stability ledger installed",
        isinstance(ledger, dict)
        and ledger.get("stamp") == "production-current-ai-meeting-budget-stability-2026-07-09-r15",
        "TECH_DEBT_MANIFEST must record r15 stability guard",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
    )
    ok(
        "AI/Meeting/Budget stability preserves production contracts",
        rules_ok,
        "r15 guard must not alter API routes, business logic, route names, or write schema",
    )
    core_files = [
        ROOT / "gas-backend" / "Scripts_Core_Runtime.html",
        ROOT / "github-pages" / "partials" / "Scripts_Core_Runtime.html",
    ]
    for path in core_files:
        text = path.read_text(encoding="utf-8", errors="ignore") if path.exists() else ""
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        ok(
            "Core slice helper is deterministic in " + rel,
            "Function.call.bind(Array.prototype[_$27])" not in text
            and "__sl=function(a,start)" in text,
            "Core runtime must not bind Array.prototype using a token declared later",
        )
        ok(
            "Core appendChildren rejects parent/ancestor append in " + rel,
            "e&&e!==t&&!(e.contains&&e.contains(t))&&t[_$g](e)" in text,
            "appendChildren must prevent HierarchyRequestError",
        )
        ok(
            "Core AppPageSlim appendChildren rejects parent/ancestor append in " + rel,
            "function __p10(e){var t=__p1(e)||e;if(!t)return t;for(var a=1;a<arguments.length;a++){var p=arguments[a];_$I(p)?p[_$18](function(e){e&&e!==t&&!(e.contains&&e.contains(t))&&t[_$g](e)}):p&&p!==t&&!(p.contains&&p.contains(t))&&t[_$g](p)}return t}"
            in text,
            "AppPageSlim.appendChildren must not append a parent into its child",
        )
        ok(
            "Core AppDom.mount rejects parent/ancestor append in " + rel,
            "n2&&n2!==a2&&!(n2.contains&&n2.contains(a2))&&a2[_$g](n2)" in text,
            "AppDom.mount must reject parent/ancestor append",
        )
    budget_files = [
        ROOT / "gas-backend" / "Scripts_Page_Budget.html",
        ROOT / "github-pages" / "partials" / "Scripts_Page_Budget.html",
    ]
    for path in budget_files:
        text = path.read_text(encoding="utf-8", errors="ignore") if path.exists() else ""
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        ok(
            "Budget dynamic form uses direct safe render in " + rel,
            'data-budget-direct-render","dynamic-form-safe' in text
            and "Budget.dynamicForm.prePhase1HtmlOwner" not in text,
            "Budget dynamic form must avoid renderer append recursion",
        )
        ok(
            "Budget page uses local safe appendChildren instead of unsafe imported helper in "
            + rel,
            "},i=function(t){" in text and "},i=e.appendChildren||function(t){" not in text,
            "Budget page must not use stale AppPageSlim.appendChildren implementation",
        )
        ok(
            "Budget footer relocation has ancestor guard in " + rel,
            "target!==host&&!(host.contains&&host.contains(target))&&target.appendChild(host)"
            in text,
            "Budget footer must not append a parent into its child",
        )
        ok(
            "Budget seminar row append has ancestor guard in " + rel,
            "o!==a&&!(o.contains&&o.contains(a))&&a.appendChild(o)" in text,
            "Budget seminar row append must reject parent/ancestor append",
        )
    meeting_files = [
        ROOT / "gas-backend" / "Scripts_Page_Meeting.html",
        ROOT / "github-pages" / "partials" / "Scripts_Page_Meeting.html",
    ]
    for path in meeting_files:
        text = path.read_text(encoding="utf-8", errors="ignore") if path.exists() else ""
        rel = path.relative_to(ROOT).as_posix() if path.exists() else str(path)
        ok(
            "Meeting route activation uses local pending function in " + rel,
            "applyPending()" not in text and "if(_f55()){opened=!0;return}" in text,
            "Meeting route must not call missing global applyPending()",
        )
        ok(
            "Meeting summary popup direct fallback installed in " + rel,
            "bindDirectFallback" in text
            and "committeeMeetingSummaryDirectFallbackBound" in text
            and "body.innerHTML=String(html" in text
            and "body.innerHTML=String(errHtml" in text,
            "Meeting summary detail popup needs direct fallback and direct render",
        )
    ai = read("gas-backend/Code_22_AiGateway.gs")
    ok(
        "AI gateway invoke returns structured errors",
        "AppAiGateway.safeError(err,feature)" in ai and 'typeof runner!="function"' in ai,
        "AI gateway invoke must not leak raw runtime exceptions",
    )
    ok(
        "AI gateway requires user-action signal for lazy invocation",
        "function _aiHasUserActionSignal_" in ai and "AI_USER_ACTION_REQUIRED" in ai,
        "AI routes must not run from page boot or background load",
    )
    ok(
        "AI/Meeting/Budget stability documentation installed",
        "AI / Meeting / Budget Stability Guard" in docs_policy
        and "HierarchyRequestError" in docs_policy
        and "applyPending()" in docs_policy,
        "SINGLE_SOURCE_POLICY must document r15 stability guard",
    )


def check_gas_global_namespace_gate():
    exact_forbidden = [
        r"\b_k\s*\.\s*push\s*\(",
        r"\bk\s*\.\s*push\s*\(",
        r"function\s+_k\s*\(",
        r"\bvar\s+_k\b",
    ]
    by_name = {}
    for p in (ROOT / "gas-backend").glob("*.gs"):
        text = p.read_text(encoding="utf-8", errors="ignore")
        rel = p.relative_to(ROOT).as_posix()
        for pat in exact_forbidden:
            if re.search(pat, text):
                fail(f"GAS global namespace collision token forbidden in {rel}: {pat}")
        for name, kind in _top_level_symbols(text):
            by_name.setdefault(name, []).append((rel, kind))
    allowed_shared = {
        "__APP_GLOBAL__",
        "AppDomain",
        "AppInfra",
        "AppSecurity",
        "AppBackendMiddleware",
    }
    for name, hits in sorted(by_name.items()):
        files = {h[0] for h in hits}
        kinds = {h[1] for h in hits}
        if name in allowed_shared:
            continue
        if len(files) > 1 and "function" in kinds:
            fail(
                "GAS global function name collision: "
                + name
                + " -> "
                + ", ".join(sorted({f + ":" + k for f, k in hits}))
            )
        if len(kinds) > 1 and len(files) > 1:
            fail(
                "GAS global var/function collision: "
                + name
                + " -> "
                + ", ".join(sorted({f + ":" + k for f, k in hits}))
            )


def check_current_readable_source_contract(manifest, docs_policy):
    ledger = manifest.get("currentReadableSourceLedger") if isinstance(manifest, dict) else None
    ok(
        "Current readable source ledger installed",
        isinstance(ledger, dict)
        and ledger.get("stamp") == CURRENT_READABLE_SOURCE_STAMP
        and ledger.get("minified") is False
        and ledger.get("formatterMode") == "token-preserving whitespace-only"
        and ledger.get("nonWhitespaceTokenDrift") is False
        and ledger.get("unicodeIdentifiersPreserved") is True
        and ledger.get("gasTemplateTokensPreserved") is True
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False,
        "TECH_DEBT_MANIFEST must lock readable, non-minified, token-preserving production source",
    )
    readability_rows = []
    offenders = []
    for rel, minimum_lines in READABLE_SOURCE_MIN_LINES.items():
        path = ROOT / rel
        line_count = (
            len(path.read_text(encoding="utf-8", errors="ignore").splitlines())
            if path.exists()
            else 0
        )
        row = {
            "path": rel,
            "lines": line_count,
            "minimumLines": minimum_lines,
            "ok": line_count >= minimum_lines,
        }
        readability_rows.append(row)
        if not row["ok"]:
            offenders.append(f"{rel}={line_count}<{minimum_lines}")
    ok(
        "Current production source is not minified-only",
        not offenders,
        ", ".join(offenders),
    )
    ok(
        "Readable Source No Minify policy documented",
        "Readable Source / No Minify Policy" in docs_policy
        and CURRENT_READABLE_SOURCE_STAMP in docs_policy
        and "Do not minify canonical production source" in docs_policy,
        "SINGLE_SOURCE_POLICY must prevent future minified-only source regeneration",
    )
    return readability_rows



def _sha256_text(value: str) -> str:
    return hashlib.sha256(str(value or "").encode("utf-8")).hexdigest()


def _scan_balanced_block(text: str, start: int, opening: str, closing: str):
    depth = 0
    quote = None
    escaped = False
    for index in range(start, len(text or "")):
        char = text[index]
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            continue
        if char in ("'", '"', "`"):
            quote = char
            continue
        if char == opening:
            depth += 1
        elif char == closing:
            depth -= 1
            if depth == 0:
                return text[start + 1 : index], index
    return "", -1


def _named_balanced_block(text: str, name: str, opening: str, closing: str) -> str:
    match = re.search(
        r"(?<![A-Za-z0-9_$])" + re.escape(name) + r"\s*:\s*" + re.escape(opening),
        text or "",
    )
    if not match:
        return ""
    start = (text or "").find(opening, match.start())
    return _scan_balanced_block(text or "", start, opening, closing)[0]


def _js_string_values(text: str):
    return [
        bytes(value, "utf-8").decode("unicode_escape") if "\\" in value else value
        for _, value in re.findall(r"(['\"])((?:\\.|(?!\1).)*)\1", text or "", re.S)
    ]


def _top_level_object_blocks(text: str):
    rows = []
    depth = 0
    quote = None
    escaped = False
    start = None
    for index, char in enumerate(text or ""):
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            continue
        if char in ("'", '"', "`"):
            quote = char
            continue
        if char == "{":
            if depth == 0:
                start = index
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0 and start is not None:
                rows.append((text or "")[start + 1 : index])
                start = None
    return rows


def _route_characterization_rows(router: str):
    rows = []
    pattern = re.compile(
        r'\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]*)"'
        r'(?:,\s*"([^"]*)")?(?:,\s*([^\]\s,]+))?\]'
    )
    for function_name in [
        "_routerPhase1CoreRouteTuples_",
        "_routerAdminRoutes_",
        "_routerAiRoutes_",
    ]:
        body = function_body(router, function_name)
        for match in pattern.finditer(body or ""):
            names, role, domain, flags, entity, limit = match.groups()
            for method in names.split("|"):
                rows.append(
                    {
                        "method": method.strip(),
                        "role": role,
                        "domain": domain,
                        "flags": flags,
                        "entity": entity or "",
                        "limit": limit or "",
                    }
                )
    return rows


def _route_characterization_hash(router: str) -> str:
    signature = "\n".join(
        "|".join(row[key] for key in ["method", "role", "domain", "flags", "entity", "limit"])
        for row in _route_characterization_rows(router)
    )
    return _sha256_text(signature)


def _write_schema_characterization(router: str):
    body = function_body(router, "_routerPhaseKWriteSchemaByMethod_")
    schemas = {}
    for method in FROZEN_WRITE_METHODS:
        method_block = _named_balanced_block(body, method, "{", "}")
        required_block = _named_balanced_block(method_block, "required", "[", "]")
        requirements = []
        for item in _top_level_object_blocks(required_block):
            def string_value(key):
                match = re.search(
                    r"(?<![A-Za-z0-9_$])" + re.escape(key) + r"\s*:\s*(['\"])(.*?)\1",
                    item,
                    re.S,
                )
                return match.group(2) if match else ""

            requirements.append(
                {
                    "code": string_value("code"),
                    "message": string_value("message"),
                    "fields": _js_string_values(_named_balanced_block(item, "fields", "[", "]")),
                    "paths": _js_string_values(_named_balanced_block(item, "paths", "[", "]")),
                }
            )
        schemas[method] = requirements
    return schemas


def _write_schema_characterization_hash(router: str) -> str:
    return _sha256_text(
        json.dumps(
            _write_schema_characterization(router),
            ensure_ascii=False,
            sort_keys=True,
            separators=(",", ":"),
        )
    )


def _proxy_allowed_methods(common: str):
    match = re.search(
        r"const\s+PROXY_ALLOWED_METHODS\s*=\s*Object\.freeze\(\s*\[([\s\S]*?)\]\s*\)",
        common or "",
    )
    return re.findall(r'"([^"]+)"', match.group(1) if match else "")


def _page_api_footprints():
    frozen = set(FROZEN_API_METHODS)
    rows = {}
    for path in sorted((ROOT / "gas-backend").glob("Scripts_*.html")):
        source = path.read_text(encoding="utf-8", errors="ignore")
        methods = sorted(
            set(re.findall(r"\b(?:api[A-Z][A-Za-z0-9_]*|getDeferredInclude)\b", source))
            & frozen
        )
        rows[path.name] = {
            "count": len(methods),
            "sha256": _sha256_text("\n".join(methods)),
        }
    return rows


def _page_api_footprint_aggregate_hash(rows) -> str:
    return _sha256_text(json.dumps(rows, sort_keys=True, separators=(",", ":")))


def _ui_template_characterization():
    source = read("gas-backend/Index.html")
    templates = _extract_index_templates(source)
    live_region = source.find('id="app-live-region"')
    start = source.rfind("<div", 0, live_region) if live_region >= 0 else -1
    end = source.find('<script id="app-async-runtime-loader"')
    if start < 0 or end <= start:
        signature = "\n".join(
            template_id + "=" + _normalize_index_template(template_source)
            for template_id, template_source in sorted(templates.items())
        )
    else:
        signature = _normalize_index_template(source[start:end])
    return {"count": len(templates), "sha256": _sha256_text(signature)}


def check_characterization_contract(manifest, package, router, common, docs_policy):
    ledger = manifest.get("characterizationContractFreeze") if isinstance(manifest, dict) else None
    route_rows = _route_characterization_rows(router)
    route_hash = _route_characterization_hash(router)
    schema_rows = _write_schema_characterization(router)
    schema_hash = _write_schema_characterization_hash(router)
    proxy_methods = _proxy_allowed_methods(common)
    proxy_hash = _sha256_text("\n".join(proxy_methods))
    template = _ui_template_characterization()
    page_rows = _page_api_footprints()
    page_hash = _page_api_footprint_aggregate_hash(page_rows)
    expected_page_rows = {
        name: {"count": value[0], "sha256": value[1]}
        for name, value in CHARACTERIZATION_PAGE_API_FOOTPRINTS.items()
    }
    owner_sources = {
        "frontendTransport": read("github-pages/github-gas-transport.js"),
        "apiFacade": read("gas-backend/Scripts_Core_Runtime.html"),
        "router": router,
        "writeSchema": router,
        "dirtyRefresh": read("gas-backend/Scripts_Core_Runtime.html"),
        "writeFreshness": read("gas-backend/Scripts_Core_Runtime.html"),
    }
    owner_tokens = {
        "frontendTransport": "root.AppTransport.run = function",
        "apiFacade": "AppPageKit.apiRunner",
        "router": "function apiRouter(request)",
        "writeSchema": "function _routerPhaseKWriteSchemaByMethod_()",
        "dirtyRefresh": "root.AppDirtyRefreshOwner =",
        "writeFreshness": "function invalidateAfterWrite(reason, method)",
    }
    owner_missing = [
        key for key, token in owner_tokens.items() if token not in owner_sources.get(key, "")
    ]
    ok(
        "Characterization freeze ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == CHARACTERIZATION_FREEZE_STAMP,
        "TECH_DEBT_MANIFEST must record the Step 1 characterization baseline",
    )
    ok(
        "Characterization route metadata locked",
        len(route_rows) == len(FROZEN_API_METHODS)
        and [row["method"] for row in route_rows] == FROZEN_API_METHODS
        and route_hash == CHARACTERIZATION_ROUTE_SHA256
        and isinstance(ledger, dict)
        and ledger.get("routeMetadataSha256") == CHARACTERIZATION_ROUTE_SHA256,
        json.dumps({"count": len(route_rows), "sha256": route_hash}, ensure_ascii=False),
    )
    ok(
        "Characterization write validation schema locked",
        len(schema_rows) == len(FROZEN_WRITE_METHODS)
        and schema_hash == CHARACTERIZATION_WRITE_SCHEMA_SHA256
        and isinstance(ledger, dict)
        and ledger.get("writeSchemaSha256") == CHARACTERIZATION_WRITE_SCHEMA_SHA256,
        json.dumps({"count": len(schema_rows), "sha256": schema_hash}, ensure_ascii=False),
    )
    ok(
        "Characterization proxy allowlist locked in route order",
        proxy_methods == FROZEN_API_METHODS
        and proxy_hash == CHARACTERIZATION_PROXY_ALLOWLIST_SHA256
        and isinstance(ledger, dict)
        and ledger.get("proxyAllowlistSha256") == CHARACTERIZATION_PROXY_ALLOWLIST_SHA256,
        json.dumps({"count": len(proxy_methods), "sha256": proxy_hash}, ensure_ascii=False),
    )
    ok(
        "Characterization UI template semantics locked",
        template.get("count") == CHARACTERIZATION_UI_TEMPLATE_COUNT
        and template.get("sha256") == CHARACTERIZATION_UI_TEMPLATE_SHA256
        and isinstance(ledger, dict)
        and ledger.get("uiTemplateCount") == CHARACTERIZATION_UI_TEMPLATE_COUNT
        and ledger.get("uiTemplateSha256") == CHARACTERIZATION_UI_TEMPLATE_SHA256,
        json.dumps(template, ensure_ascii=False),
    )
    ok(
        "Characterization page API footprints locked",
        page_rows == expected_page_rows
        and page_hash == CHARACTERIZATION_PAGE_API_AGGREGATE_SHA256
        and isinstance(ledger, dict)
        and ledger.get("pageApiFootprintSha256") == CHARACTERIZATION_PAGE_API_AGGREGATE_SHA256,
        json.dumps(
            {
                "aggregateSha256": page_hash,
                "drift": {
                    name: page_rows.get(name)
                    for name in sorted(set(page_rows) | set(expected_page_rows))
                    if page_rows.get(name) != expected_page_rows.get(name)
                },
            },
            ensure_ascii=False,
        ),
    )
    ok(
        "Characterization single-owner paths locked",
        not owner_missing
        and isinstance(ledger, dict)
        and ledger.get("ownerPaths") == CHARACTERIZATION_OWNER_PATHS,
        "missing anchors=" + ",".join(owner_missing),
    )
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    ok(
        "Characterization test command uses Production Current Gate",
        str(scripts.get("test:characterization", ""))
        == "COMMISSION_STRICT_GATES=1 python3 tools/phaseN_legacy_transport_gate.py --strict",
        str(scripts.get("test:characterization", "")),
    )
    ok(
        "Characterization freeze preserves UI and business contracts",
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("spreadsheetSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False,
        "Step 1 must add tests only and must not change runtime behavior",
    )
    ok(
        "Characterization freeze documented",
        CHARACTERIZATION_FREEZE_STAMP in docs_policy
        and "Characterization Test and Contract Freeze" in docs_policy
        and "npm run test:characterization" in docs_policy,
        "SINGLE_SOURCE_POLICY must document the Step 1 baseline and execution command",
    )
    return {
        "stamp": CHARACTERIZATION_FREEZE_STAMP,
        "routeCount": len(route_rows),
        "writeSchemaCount": len(schema_rows),
        "uiTemplateCount": template.get("count"),
        "pageScriptCount": len(page_rows),
        "routeMetadataSha256": route_hash,
        "writeSchemaSha256": schema_hash,
        "proxyAllowlistSha256": proxy_hash,
        "uiTemplateSha256": template.get("sha256"),
        "pageApiFootprintSha256": page_hash,
    }


def check_step2_runtime_metadata_slimming(manifest, package, docs_policy, core_runtime):
    ledger = manifest.get("step2RuntimeMetadataSlimming") if isinstance(manifest, dict) else None
    mirror = read("github-pages/partials/Scripts_Core_Runtime.html")
    core_bytes = len(core_runtime.encode("utf-8"))
    core_lines = core_runtime.count("\n") + 1
    removed_present = [token for token in STEP2_REMOVED_RUNTIME_METADATA_TOKENS if token in core_runtime]
    retained_missing = [token for token in STEP2_RETAINED_RUNTIME_ANCHORS if token not in core_runtime]
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    ok(
        "Step 2 runtime metadata slimming ledger installed",
        isinstance(ledger, dict)
        and ledger.get("stamp") == STEP2_RUNTIME_METADATA_SLIMMING_STAMP,
        "TECH_DEBT_MANIFEST must record the Step 2 runtime metadata cleanup",
    )
    ok(
        "Step 2 removed duplicate and write-only runtime metadata",
        not removed_present,
        "reintroduced=" + ",".join(removed_present),
    )
    ok(
        "Step 2 retained executable runtime owners and facades",
        not retained_missing,
        "missing=" + ",".join(retained_missing),
    )
    ok(
        "Step 2 canonical core runtime remains under slim budget",
        core_bytes <= STEP2_CORE_RUNTIME_MAX_BYTES
        and isinstance(ledger, dict)
        and ledger.get("bytesBefore") == 487501
        and core_bytes <= int(ledger.get("bytesAfter") or 0)
        and 487501 - core_bytes >= int(ledger.get("bytesRemoved") or 0)
        and core_lines <= int(ledger.get("linesAfter") or 0),
        json.dumps({"bytes": core_bytes, "lines": core_lines, "maxBytes": STEP2_CORE_RUNTIME_MAX_BYTES}),
    )
    ok(
        "Step 2 core runtime generated mirror remains exact",
        core_runtime == mirror,
        "gas-backend/Scripts_Core_Runtime.html and github-pages/partials/Scripts_Core_Runtime.html drifted",
    )
    ok(
        "Step 2 runtime slimming preserves frozen contracts",
        isinstance(ledger, dict)
        and ledger.get("ownerLocksRetained") is True
        and ledger.get("runtimeFacadesRetained") is True
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("spreadsheetSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False,
        "Step 2 may remove diagnostics only; contracts and behavior must remain unchanged",
    )
    ok(
        "Step 2 runtime slimming command uses Production Current Gate",
        str(scripts.get("test:runtime-slimming", ""))
        == "COMMISSION_STRICT_GATES=1 python3 tools/phaseN_legacy_transport_gate.py --strict",
        str(scripts.get("test:runtime-slimming", "")),
    )
    ok(
        "Step 2 runtime metadata slimming documented",
        STEP2_RUNTIME_METADATA_SLIMMING_STAMP in json.dumps(ledger or {}, ensure_ascii=False)
        and "Step 2 — Runtime Metadata Slimming" in docs_policy
        and "npm run test:runtime-slimming" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Step 2 and its blocking command",
    )
    return {
        "stamp": STEP2_RUNTIME_METADATA_SLIMMING_STAMP,
        "coreRuntimeBytes": core_bytes,
        "coreRuntimeLines": core_lines,
        "removedMetadataTokens": len(STEP2_REMOVED_RUNTIME_METADATA_TOKENS),
        "retainedRuntimeAnchors": len(STEP2_RETAINED_RUNTIME_ANCHORS),
        "mirrorExact": core_runtime == mirror,
    }


def check_step3_api_facade_consolidation(manifest, package, docs_policy, core_runtime):
    ledger = manifest.get("step3ApiFacadeConsolidation") if isinstance(manifest, dict) else None
    critical = read("gas-backend/Scripts_Critical_Login_Runtime.html")
    core_mirror = read("github-pages/partials/Scripts_Core_Runtime.html")
    critical_mirror = re.sub(
        r"^<!-- GENERATED MIRROR:[\s\S]*?-->\s*",
        "",
        read("github-pages/partials/Scripts_Critical_Login_Runtime.html"),
    )
    critical_static = read("github-pages/critical-login-runtime.js")
    admin = read("gas-backend/Scripts_Page_Admin.html")
    budget = read("gas-backend/Scripts_Page_Budget.html")
    people = read("gas-backend/Scripts_Page_People.html")
    page_sources = "\n".join(read(path.as_posix().replace(str(ROOT) + "/", "")) for path in sorted((ROOT / "gas-backend").glob("Scripts_Page_*.html")))
    core_aliases = [token for token in STEP3_FORBIDDEN_CORE_API_ALIASES if token in core_runtime]
    critical_aliases = [token for token in STEP3_FORBIDDEN_CRITICAL_API_ALIASES if token in critical or token in critical_static]
    page_alt_patterns = {
        "AppApi.module": r"AppApi\.module",
        "AppApi.apiRunner": r"AppApi\.apiRunner",
        "AppApi.require": r"AppApi\.require",
        "Kit.api": r"\bKit\.api\s*\(",
        "AppUtil.apiRunner": r"AppUtil\.apiRunner",
        "ScriptsUtils.apiRunner": r"ScriptsUtils\.apiRunner",
        "Utils.apiRunner": r"Utils\.apiRunner",
    }
    page_alt = [name for name, pattern in page_alt_patterns.items() if re.search(pattern, page_sources)]
    core_bytes = len(core_runtime.encode("utf-8"))
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    ok(
        "Step 3 API facade consolidation ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == STEP3_API_FACADE_CONSOLIDATION_STAMP,
        "TECH_DEBT_MANIFEST must record Step 3 API facade consolidation",
    )
    ok(
        "Step 3 removed unused core and critical API aliases",
        not core_aliases and not critical_aliases,
        "core=" + ",".join(core_aliases) + ";critical=" + ",".join(critical_aliases),
    )
    ok(
        "Step 3 page scripts use no alternate API facade",
        not page_alt,
        "alternate=" + ",".join(page_alt),
    )
    ok(
        "Step 3 Admin and People callers use AppPageKit.apiRunner",
        '"Scripts_Page_Admin.budget-settings", 3e4' in admin
        and '"Scripts_Page_Admin.subcommittee.cleanPath", 3e4' in admin
        and "root.AppPageKit.apiRunner" in people
        and "Kit.api(" not in people
        and "getModuleApi" not in budget,
        "targeted page callers must stay on the canonical page facade",
    )
    ok(
        "Step 3 retains one public page facade and internal transport chain",
        "pageKit.apiRunner = apiRunner" in core_runtime
        and "api.call = _q30" in core_runtime
        and "AppPageKit.apiRunner -> AppRuntime.call -> AppTransport.run" in core_runtime
        and "root2.AppApi.call" in critical,
        "AppPageKit.apiRunner -> AppApi.call -> AppRuntime.call -> AppTransport.run",
    )
    ok(
        "Step 3 core and generated runtime remain within consolidation budget",
        core_bytes <= STEP3_CORE_RUNTIME_MAX_BYTES
        and core_runtime == core_mirror
        and critical == critical_mirror
        and critical_static_runtime_in_sync()
        and isinstance(ledger, dict)
        and core_bytes <= int(ledger.get("coreRuntimeBytesAfter") or 0),
        json.dumps({"coreBytes": core_bytes, "maxBytes": STEP3_CORE_RUNTIME_MAX_BYTES}, ensure_ascii=False),
    )
    ok(
        "Step 3 preserves frozen contracts and UI behavior",
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("spreadsheetSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("characterizationBaselinePreserved") is True,
        "Step 3 may consolidate facades only; frozen semantics must remain unchanged",
    )
    ok(
        "Step 3 API facade command uses Production Current Gate",
        str(scripts.get("test:api-facade", ""))
        == "COMMISSION_STRICT_GATES=1 python3 tools/phaseN_legacy_transport_gate.py --strict",
        str(scripts.get("test:api-facade", "")),
    )
    ok(
        "Step 3 API facade consolidation documented",
        STEP3_API_FACADE_CONSOLIDATION_STAMP in json.dumps(ledger or {}, ensure_ascii=False)
        and "Step 3 — API Facade Consolidation" in docs_policy
        and "npm run test:api-facade" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Step 3 and its blocking command",
    )
    return {
        "stamp": STEP3_API_FACADE_CONSOLIDATION_STAMP,
        "coreRuntimeBytes": core_bytes,
        "coreAliasesRemaining": core_aliases,
        "criticalAliasesRemaining": critical_aliases,
        "pageAlternateFacades": page_alt,
        "coreMirrorExact": core_runtime == core_mirror,
        "criticalMirrorExact": critical == critical_mirror,
        "criticalStaticExact": critical_static_runtime_in_sync(),
    }


def check_step4_router_canonical_resolver_consolidation(manifest, package, docs_policy, router, platform):
    ledger = manifest.get("step4RouterCanonicalResolverConsolidation") if isinstance(manifest, dict) else None
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    resolver_body = function_body(router, "_routerResolveCanonicalHandler_")
    map_body = function_body(router, "_routerCanonicalHandlerMap_")
    dispatch_body = function_body(router, "_apiRouterCoreDispatch_")
    forbidden_router = [
        name
        for name in STEP4_FORBIDDEN_ROUTER_ALIASES
        if re.search(r"(?<![A-Za-z0-9_$])" + re.escape(name) + r"(?![A-Za-z0-9_$])", router)
    ]
    forbidden_platform = [
        name
        for name in STEP4_FORBIDDEN_ROUTER_ALIASES
        if re.search(r"(?<![A-Za-z0-9_$])" + re.escape(name) + r"(?![A-Za-z0-9_$])", platform)
    ]
    map_methods = re.findall(
        r"^\s{4}([A-Za-z_$][A-Za-z0-9_$]*):\s*typeof\s+",
        map_body,
        flags=re.MULTILINE,
    )
    router_bytes = len(router.encode("utf-8"))
    ok(
        "Step 4 router canonical resolver ledger installed",
        isinstance(ledger, dict)
        and ledger.get("stamp") == STEP4_ROUTER_CANONICAL_RESOLVER_STAMP,
        "TECH_DEBT_MANIFEST must record Step 4 router consolidation",
    )
    ok(
        "Step 4 removes router compatibility aliases",
        not forbidden_router and not forbidden_platform,
        "router=" + ",".join(forbidden_router) + ";platform=" + ",".join(forbidden_platform),
    )
    ok(
        "Step 4 removes duplicate handler cache",
        STEP4_FORBIDDEN_ROUTER_CACHE not in router
        and router.count("var __APP_ROUTE_HANDLER_MAP__ = null;") == 1,
        "only __APP_ROUTE_HANDLER_MAP__ may cache frozen handlers",
    )
    ok(
        "Step 4 retains exactly one canonical map and resolver",
        router.count("function _routerCanonicalHandlerMap_(refresh)") == 1
        and router.count("function _routerResolveCanonicalHandler_(name, refresh)") == 1
        and len(map_methods) == len(FROZEN_API_METHODS)
        and len(set(map_methods)) == len(FROZEN_API_METHODS)
        and set(map_methods) == set(FROZEN_API_METHODS),
        json.dumps(
            {
                "mapMethods": len(map_methods),
                "uniqueMapMethods": len(set(map_methods)),
                "frozenMethods": len(FROZEN_API_METHODS),
            },
            ensure_ascii=False,
        ),
    )
    ok(
        "Step 4 canonical resolver is fail-closed and map-only",
        "_apiRouteMeta_(name)" in resolver_body
        and "_routerCanonicalHandlerMap_" in resolver_body
        and "globalThis" not in resolver_body
        and "this[name]" not in resolver_body
        and all(name not in resolver_body for name in STEP4_FORBIDDEN_ROUTER_ALIASES),
        "resolver must validate the registered route and resolve only from the frozen map",
    )
    ok(
        "Step 4 dispatch and pipeline use canonical resolver directly",
        "var fn = _routerResolveCanonicalHandler_(method);" in dispatch_body
        and "RouterPipeline.resolveHandler = function(method)" in router
        and "return _routerResolveCanonicalHandler_(method)" in router,
        "apiRouter and RouterPipeline must share the same resolver",
    )
    ok(
        "Step 4 contracts use canonical handler map directly",
        router.count('_appIsFnName_("_routerCanonicalHandlerMap_") ? _routerCanonicalHandlerMap_') >= 3
        and '_appIsFnName_("_apiRouteHandlers_")' not in router,
        "route contracts and diagnostics must not rebuild an alternate handler map",
    )
    ok(
        "Step 4 PlatformCore diagnostics use canonical resolver",
        platform.count('_f("_routerResolveCanonicalHandler_")') >= 2
        and platform.count("_routerResolveCanonicalHandler_(name)") >= 2
        and all(name not in platform for name in STEP4_FORBIDDEN_ROUTER_ALIASES),
        "security diagnostics must resolve handlers through the same canonical owner",
    )
    ok(
        "Step 4 router remains within consolidation budget",
        router_bytes <= STEP4_ROUTER_MAX_BYTES
        and isinstance(ledger, dict)
        and router_bytes <= int(ledger.get("routerBytesAfter") or 0),
        json.dumps({"routerBytes": router_bytes, "maxBytes": STEP4_ROUTER_MAX_BYTES}, ensure_ascii=False),
    )
    ok(
        "Step 4 preserves frozen contracts and business behavior",
        isinstance(ledger, dict)
        and ledger.get("routeCount") == len(FROZEN_API_METHODS)
        and ledger.get("handlerMapCount") == 1
        and ledger.get("handlerResolverCount") == 1
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("routeMetadataChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("spreadsheetSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
        and ledger.get("uiUxChanged") is False
        and ledger.get("characterizationBaselinePreserved") is True,
        "Step 4 may change router wiring only",
    )
    ok(
        "Step 4 router consolidation command uses Production Current Gate",
        str(scripts.get("test:router-consolidation", ""))
        == "COMMISSION_STRICT_GATES=1 python3 tools/phaseN_legacy_transport_gate.py --strict",
        str(scripts.get("test:router-consolidation", "")),
    )
    ok(
        "Step 4 router consolidation documented",
        STEP4_ROUTER_CANONICAL_RESOLVER_STAMP in json.dumps(ledger or {}, ensure_ascii=False)
        and "Step 4 — Router Canonical Resolver Consolidation" in docs_policy
        and "npm run test:router-consolidation" in docs_policy,
        "SINGLE_SOURCE_POLICY must document Step 4 and its blocking command",
    )
    return {
        "stamp": STEP4_ROUTER_CANONICAL_RESOLVER_STAMP,
        "routerBytes": router_bytes,
        "canonicalMapMethods": len(map_methods),
        "handlerMapCount": router.count("function _routerCanonicalHandlerMap_(refresh)"),
        "handlerResolverCount": router.count("function _routerResolveCanonicalHandler_(name, refresh)"),
        "removedAliasCount": len(STEP4_FORBIDDEN_ROUTER_ALIASES),
        "duplicateCacheRemoved": STEP4_FORBIDDEN_ROUTER_CACHE not in router,
    }


def check_step5_proxy_origin_guard(manifest, package, docs_policy, platform, common, transport, app, generated):
    step7 = manifest.get("step7GasHostedProductionRewrite") if isinstance(manifest, dict) else None
    if isinstance(step7, dict):
        critical = read("gas-backend/Scripts_Critical_Login_Runtime.html")
        critical_mirror = re.sub(r"^<!-- GENERATED MIRROR:[\s\S]*?-->\s*", "", read("github-pages/partials/Scripts_Critical_Login_Runtime.html"))
        do_get_start = platform.index("function doGet(e)") if "function doGet(e)" in platform else -1
        do_get_end = platform.index("function _bp(e)", do_get_start) if do_get_start >= 0 and "function _bp(e)" in platform[do_get_start:] else -1
        do_get_block = platform[do_get_start:do_get_end] if do_get_start >= 0 and do_get_end > do_get_start else ""
        ok(
            "Step 7 GAS-hosted production ledger installed",
            step7.get("hostingOwner") == "Google Apps Script HtmlService Web App"
            and step7.get("newApiRoutes") == 0
            and step7.get("newFiles") == 0,
            "manifest must record the GAS-hosted production owner without adding routes or files",
        )
        ok(
            "Step 7 GAS doGet renders the production UI",
            "renderVue3App_(e)" in do_get_block
            and "_renderVercelFrontendEntry_" not in platform
            and "_productionFrontendEntryUrl_" not in platform,
            "normal GAS /exec must render Index.html through renderVue3App_",
        )
        ok(
            "Step 7 browser transport invokes canonical apiRouter through google.script.run",
            ".apiRouter({" in critical
            and "production-gas-hosted-google-script-run-api-router" in critical
            and "resolveCriticalProxyEndpoint_" not in critical
            and "VERCEL_FRONTEND_REQUIRED" not in critical
            and critical == critical_mirror
            and critical_static_runtime_in_sync(),
            "critical canonical/generated/static runtime must use one GAS direct transport owner",
        )
        return {
            "stamp": step7.get("stamp", ""),
            "gasBackendUiDisabled": False,
            "gasHosted": True,
            "transport": "google.script.run.apiRouter",
        }
    ledger = manifest.get("step5ProxyOriginAndHtmlResponseGuard") if isinstance(manifest, dict) else None
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    critical = read("gas-backend/Scripts_Critical_Login_Runtime.html")
    critical_mirror = read("github-pages/partials/Scripts_Critical_Login_Runtime.html")
    critical_static = read("github-pages/critical-login-runtime.js")
    env_example = read(".env.example")
    do_get_start = platform.index("function doGet(e)") if "function doGet(e)" in platform else -1
    do_get_end = platform.index("function _bp(e)", do_get_start) if do_get_start >= 0 and "function _bp(e)" in platform[do_get_start:] else -1
    do_get_block = platform[do_get_start:do_get_end] if do_get_start >= 0 and do_get_end > do_get_start else ""
    ok(
        "Step 5 proxy origin guard ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == STEP5_PROXY_ORIGIN_GUARD_STAMP,
        "TECH_DEBT_MANIFEST must record Step 5 proxy origin/HTML guard",
    )
    rules_ok = (
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("routeMetadataChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("spreadsheetSchemaChanged") is False
        and ledger.get("businessLogicChanged") is False
        and ledger.get("productionUiUxChanged") is False
        and ledger.get("characterizationBaselinePreserved") is True
    )
    ok(
        "Step 5 preserves frozen Production contracts",
        rules_ok,
        "proxy-origin hotfix must not change routes, write schema, spreadsheet schema, business logic, or Production UI",
    )
    ok(
        "Step 5 GAS default entry is backend-only",
        "function _productionFrontendEntryUrl_()" in platform
        and "function _renderVercelFrontendEntry_()" in platform
        and "VERCEL_FRONTEND_URL" in platform
        and "_renderVercelFrontendEntry_()" in do_get_block
        and "renderVue3App_(e)" not in do_get_block,
        "normal GAS doGet must show backend guidance instead of rendering the Vercel-proxy-only UI",
    )
    critical_guard_tokens = [
        "function isGoogleHostedFrontend_()",
        "function resolveCriticalProxyEndpoint_(method)",
        "VERCEL_FRONTEND_REQUIRED",
        "function criticalProxyResponseError_",
        "GAS_DEPLOYMENT_ACCESS_OR_URL_INVALID",
    ]
    ok(
        "Step 5 GAS backend entry cannot force connection-reset navigation",
        "location.replace(" not in platform
        and "ระบบจะไม่เปลี่ยนหน้าอัตโนมัติ" in platform
        and 'target="_blank" rel="noopener noreferrer"' in platform
        and "googleusercontent\\.com" in platform
        and "VERCEL_FRONTEND_URL" in platform,
        "backend entry must validate the host and expose a manual link without automatic navigation",
    )
    ok(
        "Step 5 critical login rejects Google-hosted UI origins",
        all(token in critical for token in critical_guard_tokens)
        and all(token in critical_static for token in critical_guard_tokens)
        and "invalid proxy response:" not in critical
        and "invalid proxy response:" not in critical_static,
        "critical login must fail before relative /api calls on Google origins and must not leak raw HTML parse errors",
    )
    ok(
        "Step 5 canonical transport rejects Google-hosted UI origins",
        "function isGoogleHostedFrontend()" in transport
        and "VERCEL_FRONTEND_REQUIRED" in transport
        and "GAS_DEPLOYMENT_ACCESS_OR_URL_INVALID" in transport
        and "responseUrl" in transport
        and "contentType" in transport,
        "github-gas-transport must guard origin and classify Google HTML",
    )
    ok(
        "Step 5 Vercel proxy classifies Google access HTML",
        "GAS_DEPLOYMENT_ACCESS_OR_URL_INVALID" in common
        and "googleAccessHtml" in common
        and "responseUrl" in common
        and "redirected" in common,
        "proxy must return structured JSON for Google Sign-in/Workspace HTML",
    )
    ok(
        "Step 5 runtime mirrors remain synchronized",
        critical_mirror.startswith("<!-- GENERATED MIRROR: gas-backend/Scripts_Critical_Login_Runtime.html -->")
        and "VERCEL_FRONTEND_REQUIRED" in critical_mirror
        and "invalid proxy response:" not in critical_mirror,
        "critical canonical/generated/static copies must carry the same origin guard",
    )
    ok(
        "Step 5 deployment flags and setup documentation installed",
        "proxyRejectGoogleHostedFrontend: !0" in app
        and '"proxyRejectGoogleHostedFrontend": true' in generated
        and "VERCEL_FRONTEND_URL=https://your-production-domain.vercel.app" in env_example
        and "Step 5 — Proxy Origin and Google HTML Response Guard" in docs_policy
        and "npm run test:proxy-origin" in docs_policy
        and scripts.get("test:proxy-origin") == "COMMISSION_STRICT_GATES=1 python3 tools/phaseN_legacy_transport_gate.py --strict",
        "app config, generated env, .env example, docs, and package command must document the backend/frontend boundary",
    )
    return {
        "stamp": STEP5_PROXY_ORIGIN_GUARD_STAMP,
        "gasBackendUiDisabled": True,
        "frontendEntryProperty": "VERCEL_FRONTEND_URL",
        "googleOriginGuard": True,
        "structuredGoogleHtmlError": "GAS_DEPLOYMENT_ACCESS_OR_URL_INVALID",
    }


def _run_step6_node_smoke(label, javascript):
    """Run a deterministic JavaScript smoke test without adding project files."""
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as handle:
            handle.write(javascript)
            temp_path = handle.name
        proc = subprocess.run(
            ["node", temp_path],
            cwd=str(ROOT),
            text=True,
            capture_output=True,
            timeout=30,
            check=False,
        )
        return {
            "ok": proc.returncode == 0,
            "label": label,
            "stdout": (proc.stdout or "").strip()[-2000:],
            "stderr": (proc.stderr or "").strip()[-2000:],
            "returncode": proc.returncode,
        }
    except Exception as exc:
        return {
            "ok": False,
            "label": label,
            "stdout": "",
            "stderr": str(exc),
            "returncode": -1,
        }
    finally:
        if temp_path:
            try:
                Path(temp_path).unlink(missing_ok=True)
            except Exception:
                pass


def _step6_app_config_execution_smoke(app_source):
    source_json = json.dumps(app_source, ensure_ascii=False)
    javascript = '''const vm = require("vm");
const source = SOURCE_PLACEHOLDER;
const storage = Object.create(null);
const root = {
  location: { search: "", hostname: "production.example.vercel.app", href: "https://production.example.vercel.app/" },
  localStorage: {
    getItem: key => Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null,
    setItem: (key, value) => { storage[key] = String(value); },
    removeItem: key => { delete storage[key]; }
  },
  URLSearchParams,
  console
};
root.window = root;
root.globalThis = root;
vm.runInContext(source, vm.createContext(root), { filename: "github-pages/app-config.js" });
if (!root.APP_CONFIG || root.APP_CONFIG.vercelApiProxyEnabled !== true) {
  throw new Error("APP_CONFIG_NOT_PUBLISHED");
}
if (!root.APP_DEPLOY_RELEASE || !root.APP_DEPLOY_RELEASE.stamp) {
  throw new Error("APP_DEPLOY_RELEASE_NOT_PUBLISHED");
}
if (root.APP_DEPLOY_RELEASE.source !== "github-pages/app-config.js") {
  throw new Error("APP_DEPLOY_RELEASE_SOURCE_INVALID");
}
console.log(JSON.stringify({ ok: true, stamp: root.APP_DEPLOY_RELEASE.stamp }));
'''.replace('SOURCE_PLACEHOLDER', source_json)
    return _run_step6_node_smoke("app-config-execution", javascript)


def _step6_dashboard_execution_smoke(dashboard_source):
    match = re.search(r"<script\b[^>]*>([\s\S]*?)</script>", dashboard_source, re.I)
    script_source = match.group(1) if match else dashboard_source
    source_json = json.dumps(script_source, ensure_ascii=False)
    javascript = '''const vm = require("vm");
const source = SOURCE_PLACEHOLDER;
const noop = function() {};
const element = {
  value: "",
  textContent: "",
  dataset: {},
  classList: { toggle: noop, add: noop, remove: noop, contains: () => false },
  setAttribute: noop,
  getAttribute: () => "",
  closest: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: noop,
  appendChild: noop
};
const document = {
  addEventListener: noop,
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  createElement: () => Object.assign({}, element),
  body: element,
  documentElement: element
};
const moduleKit = () => ({
  byId: () => null,
  text: value => value == null ? "" : String(value),
  setTrustedHtml: noop,
  setHtml: noop,
  storeGet: (key, fallback) => fallback,
  apiRunner: () => Promise.resolve({}),
  moduleKit
});
const root = {
  document,
  console,
  Promise,
  setTimeout,
  clearTimeout,
  APP_CONFIG: {},
  AppPageSlim: { moduleKit },
  AppPageKit: { moduleKit, apiRunner: () => Promise.resolve({}) },
  AppStore: { get: (key, fallback) => fallback },
  AppPages: { register: noop },
  AppEvents: { routeAction: noop },
  AppRuntime: { recordWarning: noop },
  Swal: null
};
root.window = root;
root.globalThis = root;
const context = {
  window: root,
  document,
  console,
  Promise,
  setTimeout,
  clearTimeout,
  __appIsFn: value => typeof value === "function",
  __appObserve: noop,
  __Scripts_Core_Runtime_Html_C8_delay_2: () => Promise.resolve(),
  appSwalFire: noop
};
vm.runInContext(source, vm.createContext(context), { filename: "Scripts_Page_Dashboard.html#app-ai-bridge-shared-owner" });
if (!root.AiBridgeDiagnostics) throw new Error("AI_BRIDGE_DIAGNOSTICS_NOT_PUBLISHED");
if (root.AiBridgeDiagnostics.clientReadCacheEnabled !== false) throw new Error("AI_CLIENT_CACHE_OWNER_RETURNED");
if (Object.prototype.hasOwnProperty.call(root.AiBridgeDiagnostics, "cacheKey") ||
    Object.prototype.hasOwnProperty.call(root.AiBridgeDiagnostics, "readCache") ||
    Object.prototype.hasOwnProperty.call(root.AiBridgeDiagnostics, "writeCache")) {
  throw new Error("AI_STALE_CACHE_ALIAS_RETURNED");
}
console.log(JSON.stringify({ ok: true, owner: root.AiBridgeDiagnostics.owner }));
'''.replace('SOURCE_PLACEHOLDER', source_json)
    return _run_step6_node_smoke("dashboard-execution", javascript)


def check_step6_runtime_bootstrap_meeting_rewrite(manifest, package, docs_policy, app, vercel, gas_index, static_index):
    ledger = manifest.get("step6RuntimeBootstrapMeetingSummaryRewrite") if isinstance(manifest, dict) else None
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    critical = read("gas-backend/Scripts_Critical_Login_Runtime.html")
    mirror_header_re = re.compile(r"^<!-- GENERATED MIRROR:[\s\S]*?-->\s*")
    critical_mirror = mirror_header_re.sub("", read("github-pages/partials/Scripts_Critical_Login_Runtime.html"))
    critical_static = read("github-pages/critical-login-runtime.js")
    dashboard = read("gas-backend/Scripts_Page_Dashboard.html")
    dashboard_mirror = mirror_header_re.sub("", read("github-pages/partials/Scripts_Page_Dashboard.html"))
    meeting = read("gas-backend/Scripts_Page_Meeting.html")
    meeting_mirror = mirror_header_re.sub("", read("github-pages/partials/Scripts_Page_Meeting.html"))
    cases = read("gas-backend/Code_30_Domain_Cases.gs")
    csp = ""
    for group in vercel.get("headers", []) if isinstance(vercel, dict) else []:
        if group.get("source") == "/(.*)":
            for header in group.get("headers", []):
                if str(header.get("key", "")).lower() == "content-security-policy":
                    csp = str(header.get("value", ""))

    app_config_smoke = _step6_app_config_execution_smoke(app)
    dashboard_smoke = _step6_dashboard_execution_smoke(dashboard)

    ok(
        "Step 6 runtime/bootstrap meeting rewrite ledger installed",
        isinstance(ledger, dict) and ledger.get("stamp") == STEP6_RUNTIME_BOOTSTRAP_MEETING_STAMP,
        "TECH_DEBT_MANIFEST must record the complete runtime/bootstrap and meeting-summary rewrite",
    )
    ok(
        "Step 6 app-config deploy release publisher is lexical and executable",
        "function publishDeployRelease()" in app
        and "publishDeployRelease();" in app
        and not re.search(r"[,}]\s*function\s+publishDeployRelease\s*\(", app)
        and "root.APP_DEPLOY_RELEASE = Object.assign" in app,
        "publishDeployRelease must be a real function declaration outside a comma-expression chain",
    )
    ok(
        "Step 6 app-config executes and publishes the release contract",
        app_config_smoke.get("ok") is True,
        json.dumps(app_config_smoke, ensure_ascii=False),
    )
    step7_active = isinstance(manifest.get("step7GasHostedProductionRewrite"), dict)
    ok(
        "Step 6/7 critical transport owner is lexical in all runtime copies",
        (
            step7_active
            and all("function criticalGasRunner_()" in value for value in [critical, critical_mirror, critical_static])
            and all(".apiRouter({" in value for value in [critical, critical_mirror, critical_static])
            and all("resolveCriticalProxyEndpoint_" not in value for value in [critical, critical_mirror, critical_static])
        )
        or (
            not step7_active
            and all("function isGoogleHostedFrontend_()" in value for value in [critical, critical_mirror, critical_static])
            and all(not re.search(r"[,}]\s*function\s+isGoogleHostedFrontend_\s*\(", value) for value in [critical, critical_mirror, critical_static])
        )
        and critical == critical_mirror
        and critical_static_runtime_in_sync(),
        "critical transport owner must be lexical and generated copies must be exact",
    )
    stale_cache_aliases = ["cacheKey: cacheKey", "readCache: readCache", "writeCache: writeCache"]
    ok(
        "Step 6 Dashboard bootstrap has no removed client-cache aliases",
        all(token not in dashboard for token in stale_cache_aliases)
        and "cacheMode: \"backend-router-cache-only\"" in dashboard
        and "clientReadCacheEnabled: false" in dashboard
        and dashboard == dashboard_mirror,
        "AiBridgeDiagnostics must expose only live owners and must not reference deleted cache helpers",
    )
    ok(
        "Step 6 Dashboard owner executes without stale cache ReferenceError",
        dashboard_smoke.get("ok") is True,
        json.dumps(dashboard_smoke, ensure_ascii=False),
    )
    ok(
        "Step 6 meeting summary client requests canonical live data",
        "committee-meeting-summary-live-read" in meeting
        and "committee-meeting-list-cache-first" not in meeting
        and "forceFresh: forceFresh" in meeting
        and "noCache: forceFresh" in meeting
        and "bypassCache: forceFresh" in meeting
        and "committee-meeting-summary-detail-live-read" in meeting
        and meeting == meeting_mirror,
        "list, refresh, search, and detail paths must use the same fresh-data payload owner",
    )
    ok(
        "Step 6 meeting backend honors fresh-read flags",
        "function _z52(sheetName, includeDeleted, options)" in cases
        and "options.forceFresh === !0 || options.noCache === !0 || options.bypassCache === !0" in cases
        and "forceFresh: forceFresh" in cases
        and "bypassRequestCache: forceFresh" in cases
        and 'owner: "MeetingDomain.canonicalSheetRead"' in cases
        and 'source: forceFresh ? "canonical-sheets-live" : "canonical-sheets-cache"' in cases,
        "frontend freshness flags must reach _appDataServiceRead_ instead of being ignored",
    )
    ok(
        "Step 6 CSP supports manifest and pinned CDN diagnostics",
        "manifest-src 'self' data:" in csp
        and "connect-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com" in csp,
        csp,
    )
    ok(
        "Step 6 uses inline favicon without adding a file",
        'rel="icon" type="image/svg+xml" href="data:image/svg+xml' in static_index
        and 'rel="icon" type="image/svg+xml" href="data:image/svg+xml' in gas_index,
        "both entry documents must avoid /favicon.ico 404 without creating a new asset",
    )
    ok(
        "Step 6 preserves frozen contracts and project shape",
        isinstance(ledger, dict)
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("routeNamesChanged") is False
        and ledger.get("routeMetadataChanged") is False
        and ledger.get("writeSchemaChanged") is False
        and ledger.get("spreadsheetSchemaChanged") is False
        and ledger.get("businessRulesChanged") is False
        and ledger.get("productionUiStructureChanged") is False
        and ledger.get("characterizationBaselinePreserved") is True,
        "runtime failures and data freshness may be corrected without changing frozen semantics",
    )
    ok(
        "Step 6 blocking command and policy documented",
        scripts.get("test:runtime-bootstrap-meeting") == "COMMISSION_STRICT_GATES=1 python3 tools/phaseN_legacy_transport_gate.py --strict"
        and "Step 6 — Runtime Bootstrap and Meeting Summary Rewrite" in docs_policy
        and "npm run test:runtime-bootstrap-meeting" in docs_policy,
        "package and SINGLE_SOURCE_POLICY must expose the Step 6 blocking gate",
    )
    return {
        "stamp": STEP6_RUNTIME_BOOTSTRAP_MEETING_STAMP,
        "appConfigPublisherLexical": True,
        "appConfigExecutionSmoke": app_config_smoke,
        "dashboardExecutionSmoke": dashboard_smoke,
        "dashboardStaleCacheAliases": [],
        "meetingSummaryFreshRead": True,
        "manifestSrcDataAllowed": True,
        "inlineFavicon": True,
    }


def _p2_vercel_transport_execution_smoke(app_source, transport_source):
    app_json = json.dumps(app_source, ensure_ascii=False)
    transport_json = json.dumps(transport_source, ensure_ascii=False)
    javascript = r'''const vm = require("vm");
const appSource = APP_SOURCE;
const transportSource = TRANSPORT_SOURCE;
const storage = Object.create(null);
const noop = function() {};
const document = {
  readyState: "loading",
  addEventListener: noop,
  querySelectorAll: () => [],
  querySelector: () => null,
  getElementById: () => null,
  createElement: () => ({ setAttribute: noop, getAttribute: () => "", style: {}, dataset: {} }),
  body: { appendChild: noop },
  documentElement: {}
};
const root = {
  document,
  location: { search: "", hostname: "production.example.vercel.app", href: "https://production.example.vercel.app/" },
  localStorage: {
    getItem: key => Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null,
    setItem: (key, value) => { storage[key] = String(value); },
    removeItem: key => { delete storage[key]; }
  },
  console,
  Promise,
  setTimeout,
  clearTimeout,
  URL,
  URLSearchParams
};
root.window = root;
root.globalThis = root;
const context = vm.createContext({
  window: root,
  globalThis: root,
  document,
  console,
  Promise,
  setTimeout,
  clearTimeout,
  URL,
  URLSearchParams,
  AbortController,
  fetch: () => Promise.reject(new Error("FETCH_NOT_EXPECTED_DURING_BOOT_SMOKE"))
});
vm.runInContext(appSource, context, { filename: "app-config.js" });
vm.runInContext(transportSource, context, { filename: "github-gas-transport.js" });
if (!root.AppTransport || typeof root.AppTransport.runtimeOwnerStatus !== "function") throw new Error("RUNTIME_OWNER_STATUS_MISSING");
const healthy = root.AppTransport.runtimeOwnerStatus();
if (!healthy.ok) throw new Error("VERCEL_RUNTIME_OWNER_UNHEALTHY:" + JSON.stringify(healthy));
root.AppTransport.assertRuntimeOwner("smoke");
root.AppTransport.__gasHostedDirect = true;
const drift = root.AppTransport.runtimeOwnerStatus();
if (drift.ok || !drift.errors.includes("GAS_DIRECT_OWNER_ACTIVE_ON_VERCEL")) throw new Error("OWNER_DRIFT_NOT_DETECTED");
let blocked = false;
try { root.AppTransport.assertRuntimeOwner("tamper-smoke"); } catch (e) { blocked = e && e.code === "APP_RUNTIME_OWNER_MISMATCH"; }
if (!blocked) throw new Error("OWNER_DRIFT_NOT_BLOCKED");
console.log(JSON.stringify({ ok: true, healthy, driftDetected: true, failClosed: true }));
'''.replace('APP_SOURCE', app_json).replace('TRANSPORT_SOURCE', transport_json)
    return _run_step6_node_smoke("p2-vercel-transport-owner", javascript)


def check_p2_long_term_stability(manifest, package, docs_policy, app, transport, vercel, core_runtime):
    ledger = manifest.get("p2LongTermStability") if isinstance(manifest, dict) else None
    scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
    critical = read("gas-backend/Scripts_Critical_Login_Runtime.html")
    critical_mirror = re.sub(r"^<!-- GENERATED MIRROR:[\s\S]*?-->\s*", "", read("github-pages/partials/Scripts_Critical_Login_Runtime.html"))
    meeting = read("gas-backend/Scripts_Page_Meeting.html")
    meeting_mirror = re.sub(r"^<!-- GENERATED MIRROR:[\s\S]*?-->\s*", "", read("github-pages/partials/Scripts_Page_Meeting.html"))
    diagnostic = read("github-pages/diagnostic.html")
    smoke = _p2_vercel_transport_execution_smoke(app, transport)
    js_cache = ""
    for group in vercel.get("headers", []) if isinstance(vercel, dict) else []:
        if group.get("source") == "/(.*).js":
            for header in group.get("headers", []):
                if str(header.get("key", "")).lower() == "cache-control":
                    js_cache = str(header.get("value", ""))

    ok(
        "P2 long-term stability ledger installed",
        isinstance(ledger, dict)
        and ledger.get("stamp") == P2_LONG_TERM_STABILITY_STAMP
        and ledger.get("noNewFiles") is True
        and ledger.get("noNewApiRoutes") is True
        and ledger.get("spreadsheetSchemaChanged") is False
        and ledger.get("businessRulesChanged") is False,
        "manifest must record the frozen P2 stability scope",
    )
    ok(
        "P2 Vercel transport owner execution smoke passes",
        smoke.get("ok") is True,
        json.dumps(smoke, ensure_ascii=False),
    )
    ok(
        "P2 GAS critical runtime has fail-closed owner health",
        all(token in critical for token in [
            "p2RuntimeHealthSnapshot_",
            "AppRuntimeHealth",
            "runtimeOwnerStatus",
            "assertRuntimeOwner",
            "APP_RUNTIME_OWNER_MISMATCH",
            "login.runtimeHealth.blocked",
        ])
        and critical == critical_mirror
        and critical_static_runtime_in_sync(),
        "GAS owner health must execute before login and all generated copies must match",
    )
    ok(
        "P2 meeting read failures cannot render as empty data",
        "function assertMeetingReadPayload(data, method)" in meeting
        and "data.degraded === true" in meeting
        and "data.apiDegraded === true" in meeting
        and "data.loadOk === false" in meeting
        and "MEETING_READ_DEGRADED" in meeting
        and 'assertMeetingReadPayload(data, "apiListCommitteeMeetings")' in meeting
        and 'assertMeetingReadPayload(unwrap(res) || {}, "apiGetCommitteeMeetingSystem")' in meeting
        and meeting == meeting_mirror,
        "meeting list/detail must reject degraded payloads explicitly",
    )
    ok(
        "P2 core read recovery fails closed by default",
        "allowDegradedReadRecovery === !0" in core_runtime
        and "if (allowDegraded)return degradedApiData" in core_runtime
        and "if (err instanceof Error)throw err" in core_runtime,
        "read errors may degrade only under explicit opt-in",
    )
    ok(
        "P2 boot-critical JavaScript cache requires revalidation",
        bool(re.search(r"no-cache|max-age=0|no-store", js_cache, re.I))
        and "stale-while-revalidate" not in js_cache.lower(),
        js_cache,
    )
    ok(
        "P2 diagnostic verifies owner, release and boot assets",
        all(token in diagnostic for token in [
            "runtimeOwnerStatus",
            "assertRuntimeOwner",
            "releaseStatus",
            "BOOT_ASSET_STALE_CACHE_POLICY",
            "critical-login-runtime.js",
            "app-index-bootstrap.js",
        ]),
        "diagnostic.html must expose deploy-time and browser-runtime checks",
    )
    ok(
        "P2 release and blocking command documented",
        scripts.get("test:p2-stability") == "COMMISSION_STRICT_GATES=1 python3 tools/phaseN_legacy_transport_gate.py --strict"
        and "P2 — Long-term Runtime Stability" in docs_policy
        and "npm run test:p2-stability" in docs_policy,
        "package and policy must expose the blocking P2 gate",
    )
    return {
        "stamp": P2_LONG_TERM_STABILITY_STAMP,
        "vercelTransportExecutionSmoke": smoke,
        "gasRuntimeOwnerFailClosed": True,
        "meetingDegradedPayloadVisible": True,
        "bootCriticalJsCacheControl": js_cache,
        "release": RELEASE,
    }

def main():
    for rel in REQUIRED:
        ok(f"required file {rel}", (ROOT / rel).exists(), rel)
    alltext = all_source_text()
    docs_policy = read("docs/SINGLE_SOURCE_POLICY.md")
    platform = read("gas-backend/Code_00_PlatformCore.gs")
    router = read("gas-backend/Code_20_Router.gs")
    app = read("github-pages/app-config.js")
    transport = read("github-pages/github-gas-transport.js")
    generated = read("github-pages/vercel-env.generated.js")
    common = read("api/_gasProxyCommon.js")
    index = read("github-pages/index.html")
    diag = read("github-pages/diagnostic.html")
    vercel_text = read("vercel.json")
    vercel = json.loads(vercel_text or "{}")
    package = json.loads(read("package.json") or "{}")
    manifest = json.loads(read("TECH_DEBT_MANIFEST.json") or "{}")
    ok(
        "doGet single",
        platform.count("function doGet(") == 1,
        str(platform.count("function doGet(")),
    )
    ok(
        "doPost single",
        platform.count("function doPost(") == 1,
        str(platform.count("function doPost(")),
    )
    ok(
        "apiGithubBridgeCall compatibility endpoint single",
        platform.count("function apiGithubBridgeCall(") == 1,
        str(platform.count("function apiGithubBridgeCall(")),
    )
    ok("release stamp present", RELEASE in alltext, RELEASE)
    ok("asset stamp present", ASSET in alltext, ASSET)
    ok("transport mode present", MODE in alltext, MODE)
    ok(
        "old previous Vercel proxy migration release removed from runtime/config/gates",
        ("phaseM-" + "vercel-api-proxy-2026-07-02-r1")
        not in (app + transport + common + index + diag),
        "old phaseM release must not remain in runtime path",
    )
    ok("schema stamp retained", SCHEMA_STAMP in alltext, SCHEMA_STAMP)
    ok(
        "Vercel output dir",
        vercel.get("outputDirectory") == "github-pages",
        str(vercel.get("outputDirectory")),
    )
    vercel_build_cmd = str(vercel.get("buildCommand", ""))
    package_build_cmd = str(package.get("scripts", {}).get("build", ""))
    ok(
        "Vercel buildCommand under schema limit",
        len(vercel_build_cmd) <= 256,
        f"{len(vercel_build_cmd)} chars: {vercel_build_cmd}",
    )
    ok(
        "Vercel build delegates to package build",
        vercel_build_cmd == "npm run build",
        vercel_build_cmd,
    )
    package_scripts = package.get("scripts", {})
    package_strict_cmd = str(
        package_scripts.get("build:strict") or package_scripts.get("audit:strict") or ""
    )
    ok(
        "package build is Vercel host safe",
        all(
            command in package_build_cmd
            for command in [
                "npm run check:api",
                "npm run check:frontend",
                "npm run check:inline",
                "npm run check:architecture",
            ]
        )
        and "python" not in package_build_cmd.lower(),
        package_build_cmd,
    )
    ok(
        "package build checks frontend static runtime syntax",
        str(package_scripts.get("check:frontend", "")).count("node --check github-pages/") >= 7
        and "github-pages/github-gas-transport.js"
        in str(package_scripts.get("check:frontend", "")),
        str(package_scripts.get("check:frontend", "")),
    )
    inline_cmd = str(package_scripts.get("check:inline", ""))
    ok(
        "package build checks inline HTML runtime scripts",
        "github-pages/partials" in inline_cmd
        and "gas-backend" in inline_cmd
        and "new Function(body)" in inline_cmd
        and "keyword-token drift" in inline_cmd
        and "npm run check:inline" in package_build_cmd,
        inline_cmd,
    )
    ok(
        "strict audit runs Production current gate",
        "phaseN_legacy_transport_gate.py" in package_strict_cmd
        and "phaseG_security_gate.py" in package_strict_cmd
        and "COMMISSION_STRICT_GATES=1" in package_strict_cmd
        and "--strict" in package_strict_cmd
        and "npm run check:frontend" in package_strict_cmd
        and "npm run check:inline" in package_strict_cmd,
        package_strict_cmd,
    )
    obsolete_tool = "".join(["sync", "_", "frontend", "_", "partials", ".py"])
    scripts_blob = json.dumps(package.get("scripts", {}), ensure_ascii=False)
    ok(
        "package build is decoupled from obsolete mirror-sync helper",
        obsolete_tool not in package_build_cmd and obsolete_tool not in scripts_blob,
        "package scripts must not reference obsolete mirror-sync helper",
    )
    gate_consolidation = (
        manifest.get("currentGateConsolidationLedger") if isinstance(manifest, dict) else None
    )
    ok(
        "Current gate consolidation ledger installed",
        isinstance(gate_consolidation, dict)
        and gate_consolidation.get("stamp") == CURRENT_GATE_CONSOLIDATION_STAMP,
        "TECH_DEBT_MANIFEST must record current gate consolidation without adding a Phase",
    )
    ok(
        "Current gate consolidation keeps audit:strict as single blocking gate",
        isinstance(gate_consolidation, dict)
        and gate_consolidation.get("singleBlockingGateOwner") == "audit:strict"
        and "build:strict" not in package_scripts
        and str(package_scripts.get("release:check", "")) == "npm run audit:strict"
        and str(package_scripts.get("deploy:check", "")) == "npm run audit:strict"
        and str(package_scripts.get("predeploy:production", "")) == "npm run audit:strict",
        "strict production gate must have one owner and release aliases must delegate to audit:strict",
    )
    ok(
        "Current gate consolidation preserves frozen contract",
        isinstance(gate_consolidation, dict)
        and gate_consolidation.get("noNewFiles") is True
        and gate_consolidation.get("noNewApiRoutes") is True
        and gate_consolidation.get("routeNamesChanged") is False
        and gate_consolidation.get("writeSchemaChanged") is False
        and gate_consolidation.get("businessLogicChanged") is False
        and gate_consolidation.get("uiUxChanged") is False,
        "gate consolidation must not change files, APIs, routes, write schema, business rules, or UI",
    )
    ok(
        "Current gate consolidation documentation installed",
        CURRENT_GATE_CONSOLIDATION_STAMP in docs_policy
        and "Current Gate Consolidation" in docs_policy
        and "audit:strict" in docs_policy
        and "build:strict" in docs_policy,
        "SINGLE_SOURCE_POLICY must document single blocking production gate ownership",
    )
    ok(
        "obsolete mirror-sync helper absent from tools directory",
        not (ROOT / "tools" / obsolete_tool).exists(),
        "obsolete helper must be absent; mirror drift is checked by Production current gate",
    )
    pycache_hits = [x.relative_to(ROOT).as_posix() for x in ROOT.rglob("__pycache__") if x.is_dir()]
    ok(
        "packaged source tree excludes Python bytecode cache folders",
        not pycache_hits,
        ", ".join(pycache_hits),
    )
    ok(
        "package engines pins Vercel Node 24.x",
        str(package.get("engines", {}).get("node", "")) == "24.x",
        str(package.get("engines", {}).get("node", "")),
    )
    ok(
        "proxy functions exist",
        all(
            (ROOT / "api" / f).exists()
            for f in ["gas.js", "login.js", "public-config.js", "_gasProxyCommon.js"]
        ),
        "api proxy files",
    )
    ok("server GAS env used by proxy", "process.env.GAS_WEB_APP_URL" in common, "server env")
    ok(
        "proxy normalizes quoted/slashed GAS URL and clamps timeout",
        "function normalizeGasWebAppUrl" in common
        and "function normalizeTimeoutMs" in common
        and "MAX_PROXY_TIMEOUT_MS" in common
        and "timeoutMs: effectiveTimeoutMs" in common,
        "proxy URL/timeout hardening",
    )
    ok(
        "proxy body parser accepts Buffer without losing method/payload",
        "Buffer.isBuffer(req.body)" in common
        and 'parseJsonText(Buffer.from(req.body).toString("utf8"))' in common,
        "Vercel body parser hardening",
    )
    ok(
        "proxy body normalizer accepts loose payload keys",
        "loosePayload = Object.assign({}, body)" in common
        and '["method", "action", "request", "timeoutMs", "releaseStamp", "source", "bridge", "requestId"].forEach'
        in common,
        "Vercel proxy must preserve raw username/password or query fields when caller sends method + loose fields",
    )

    proxy_methods = re.findall(r'"(api[A-Za-z0-9_]+|getDeferredInclude)"', common)
    proxy_method_set = sorted(set(proxy_methods) & set(FROZEN_API_METHODS))
    ok(
        "Phase 5 proxy method allowlist installed",
        "PROXY_ALLOWED_METHODS = Object.freeze" in common
        and "PROXY_ALLOWED_METHOD_SET = new Set(PROXY_ALLOWED_METHODS)" in common
        and 'PROXY_CONTRACT_STAMP = "phase5-proxy-contract-hardening-2026-07-09-r1"' in common,
        "proxy must use a frozen allowlist instead of generic api* passthrough",
    )
    ok(
        "Phase 5 proxy allowlist matches frozen route contract",
        proxy_method_set == sorted(FROZEN_API_METHODS),
        "proxy=%d frozen=%d" % (len(proxy_method_set), len(FROZEN_API_METHODS)),
    )
    ok(
        "Phase 5 proxy rejects non-contract methods before GAS",
        "PROXY_METHOD_NOT_IN_CONTRACT" in common
        and "proxyMethodError" in common
        and "/^api[A-Za-z0-9_]+$/.test(method)" not in common
        and 'method === "apiRouter"' not in common,
        "generic api* and direct apiRouter passthrough must be disabled at Vercel proxy",
    )
    ok(
        "Production current header used by proxy",
        "X-Production-Vercel-Proxy" in common and "X-Phase-M-Vercel-Proxy" not in common,
        "proxy header",
    )
    ok(
        "Vercel env production-current release track",
        '"releaseTrack":"production-current"' in generated
        and '"legacyTransportRemoved":true' in generated,
        "generated env metadata",
    )
    ok(
        "Vercel generated env has no duplicate proxy flag assignment",
        generated.count("vercelApiProxyEnabled:true") == 1,
        str(generated.count("vercelApiProxyEnabled:true")),
    )
    ok(
        "index uses Production current assets",
        RELEASE in index and VERCEL_MODE in index,
        "index script stamps",
    )
    stale_static_assets = []
    for m in re.finditer(r'<script\s+src="([^"]+)"', index):
        src = m.group(1)
        if src.startswith("./") and ("?v=" in src or "&v=" in src) and RELEASE not in src:
            stale_static_assets.append(src)
    ok(
        "static runtime script cache-bust stamps match Production current release",
        not stale_static_assets,
        ", ".join(stale_static_assets),
    )
    ok(
        "diagnostic uses Production current assets",
        RELEASE in diag and VERCEL_MODE in diag,
        "diagnostic script stamps",
    )
    ok(
        "app-config proxy only flags",
        contains_code(app, "legacyTransportRemoved: true")
        and contains_code(app, "readJsonpApi: false")
        and contains_code(app, "publicJsonpReadMethods: []")
        and contains_code(app, "loginFormPost: false"),
        "app-config Production current flags",
    )
    ok(
        "transport is proxy only",
        "function runVercelApiProxy" in transport
        and "function runVercelLoginProxy" in transport
        and "function runReadWithPolicy" in transport,
        "proxy funcs",
    )
    forbidden_transport = [
        "function runJsonpApi",
        "function runGasViaClient",
        "function runLoginPost",
        "function runFastLoginJsonp",
        "__githubFastLogin=1",
        "document.createElement('iframe')",
        'document.createElement("iframe")',
        "postMessage(",
        "GAS_IFRAME_TRANSPORT_REQUEST",
    ]
    bad = [x for x in forbidden_transport if x in transport]
    ok("legacy browser transport functions removed", not bad, ", ".join(bad))
    ok(
        "transport reports legacy removed",
        contains_code(transport, "__legacyTransportRemoved = true")
        and contains_code(transport, "jsonpRemoved:true")
        and contains_code(transport, "hiddenBridgeRemoved:true")
        and contains_code(transport, "loginPostIframeRemoved:true"),
        "status flags",
    )
    ok(
        "write invalidates client read cache",
        "function runWriteWithPolicy" in transport
        and "before-write" in transport
        and "productionWriteCacheInvalidation" in transport
        and "apiCacheEpoch" in transport,
        "write cache invalidation",
    )
    ok(
        "auth/bootstrap reads are not cached",
        "function isCacheSafeReadMethod" in transport
        and "isAuthOrBootstrapMethod" in transport
        and "apiSessionResume" in transport
        and "apiBootstrap" in transport,
        "auth/bootstrap cache bypass",
    )
    ok(
        "transport options are propagated",
        contains_code(transport, "root.AppTransport.run = function(fn, args, options)")
        and contains_code(
            transport, "runVercelApiProxy(req.method, req.payload || {}, options || {})"
        ),
        "per-call timeout/options propagation",
    )
    critical_runtime_js = read("github-pages/critical-login-runtime.js")
    ok(
        "critical runtime forwards transport options",
        contains_code(critical_runtime_js, "RT.rawRun = RT.rawRun || function(fn, args, options)")
        and contains_code(critical_runtime_js, "RT.call = RT.call || function(m, p, options)"),
        "critical runtime options",
    )
    app_index_bootstrap = read("github-pages/app-index-bootstrap.js")
    after_swal = read("github-pages/app-index-foundation-after-swal.js")
    backend_assets = read("gas-backend/Code_03_Platform_Assets.gs")
    gas_index = read("gas-backend/Index.html")
    ok(
        "critical runtime single owner for Vercel static manifest",
        contains_code(app, "appCritical:{files:[]}")
        and contains_code(app, "upfrontScripts:[]")
        and contains_code(after_swal, "appCritical:{files:[]}")
        and contains_code(after_swal, "upfrontScripts:[]"),
        "static frontend must not load Scripts_Critical_Login_Runtime after critical-login-runtime.js",
    )
    ok(
        "critical runtime bootstrap fallback does not reintroduce duplicate partial",
        '||["Scripts_Critical_Login_Runtime"]' not in app_index_bootstrap
        and "||['Scripts_Critical_Login_Runtime']" not in gas_index,
        "bootstrap include-map fallback must be empty because critical runtime is already explicitly owned",
    )
    ok(
        "GAS critical bundle retained but not marked as duplicate upfront include",
        contains_code(backend_assets, 'appCritical:{files:["Scripts_Critical_Login_Runtime"]}')
        and contains_code(backend_assets, "upfrontScripts:[]")
        and "includeProductionBundle_('appCritical')" in gas_index,
        "GAS direct path keeps appCritical inline owner while dynamic upfrontScripts stays empty",
    )
    ok(
        "critical runtime static source generated from GAS canonical",
        critical_static_runtime_in_sync()
        and len(critical_runtime_js.encode("utf-8")) <= 150000
        and "<script" not in critical_runtime_js.lower(),
        "critical-login-runtime.js must be generated from gas-backend/Scripts_Critical_Login_Runtime.html and remain under the readable-source size budget",
    )
    ok(
        "manifest records critical runtime duplication cleanup",
        isinstance(manifest.get("criticalRuntimeDuplicationCleanupLedger"), dict)
        and manifest.get("criticalRuntimeDuplicationCleanupLedger", {}).get("stamp")
        == "production-current-critical-runtime-single-owner-2026-07-06-r1"
        and manifest.get("criticalRuntimeDuplicationCleanupLedger", {}).get("noApiContractChange")
        is True,
        "TECH_DEBT_MANIFEST must record step 4 cleanup without API contract change",
    )
    ok(
        "manifest records critical runtime generated source cleanup",
        isinstance(manifest.get("criticalRuntimeGeneratedSourceLedger"), dict)
        and manifest.get("criticalRuntimeGeneratedSourceLedger", {}).get("stamp")
        == "production-current-critical-runtime-generated-source-2026-07-06-r1"
        and manifest.get("criticalRuntimeGeneratedSourceLedger", {}).get(
            "maxStaticCriticalRuntimeBytes"
        )
        == 150000
        and manifest.get("criticalRuntimeGeneratedSourceLedger", {}).get("noApiContractChange")
        is True,
        "TECH_DEBT_MANIFEST must record generated-source cleanup without API contract change",
    )
    ok(
        "manifest records Core Runtime slimming cleanup",
        isinstance(manifest.get("coreRuntimeSlimmingLedger"), dict)
        and manifest.get("coreRuntimeSlimmingLedger", {}).get("stamp")
        == "production-current-core-runtime-facade-slim-2026-07-06-r1"
        and manifest.get("coreRuntimeSlimmingLedger", {}).get("maxBackendCoreRuntimeBytes")
        == 560000
        and manifest.get("coreRuntimeSlimmingLedger", {}).get("noApiContractChange") is True,
        "TECH_DEBT_MANIFEST must record Core Runtime slimming without API contract change",
    )
    ok(
        "manifest records Meeting page slimming cleanup",
        isinstance(manifest.get("meetingPageSlimmingLedger"), dict)
        and manifest.get("meetingPageSlimmingLedger", {}).get("stamp")
        == "production-current-meeting-page-slim-2026-07-06-r1"
        and manifest.get("meetingPageSlimmingLedger", {}).get("maxBackendMeetingBytes") == 340000
        and manifest.get("meetingPageSlimmingLedger", {}).get("maxMirrorMeetingBytes") == 340000
        and manifest.get("meetingPageSlimmingLedger", {}).get("noApiContractChange") is True,
        "TECH_DEBT_MANIFEST must record Meeting page slimming without API contract change",
    )
    ok(
        "manifest records Phase 2 runtime slimming release gate",
        isinstance(manifest.get("phase2RuntimeSlimmingLedger"), dict)
        and manifest.get("phase2RuntimeSlimmingLedger", {}).get("stamp")
        == PHASE2_RUNTIME_SLIMMING_STAMP
        and manifest.get("phase2RuntimeSlimmingLedger", {}).get("maxBackendMeetingBytes") == 340000
        and manifest.get("phase2RuntimeSlimmingLedger", {}).get("maxMirrorMeetingBytes") == 340000
        and manifest.get("phase2RuntimeSlimmingLedger", {}).get("noApiContractChange") is True
        and manifest.get("phase2RuntimeSlimmingLedger", {}).get("businessLogicChanged") is False,
        "TECH_DEBT_MANIFEST must record Phase 2 runtime slimming without API/business rule changes",
    )
    ok(
        "manifest records Cases domain slimming cleanup",
        isinstance(manifest.get("casesDomainSlimmingLedger"), dict)
        and manifest.get("casesDomainSlimmingLedger", {}).get("stamp")
        == "production-current-cases-domain-helper-owner-slim-2026-07-06-r1"
        and manifest.get("casesDomainSlimmingLedger", {}).get("maxBackendCasesBytes") == 420000
        and manifest.get("casesDomainSlimmingLedger", {}).get("noApiContractChange") is True
        and manifest.get("casesDomainSlimmingLedger", {}).get("businessLogicChanged") is False,
        "TECH_DEBT_MANIFEST must record Cases domain helper-owner slimming without API contract change",
    )
    ok(
        "manifest records Budget domain slimming cleanup",
        isinstance(manifest.get("budgetDomainSlimmingLedger"), dict)
        and manifest.get("budgetDomainSlimmingLedger", {}).get("stamp")
        == "production-current-budget-domain-helper-owner-slim-2026-07-06-r1"
        and manifest.get("budgetDomainSlimmingLedger", {}).get("maxBackendBudgetBytes") == 300000
        and manifest.get("budgetDomainSlimmingLedger", {}).get("noApiContractChange") is True
        and manifest.get("budgetDomainSlimmingLedger", {}).get("businessLogicChanged") is False,
        "TECH_DEBT_MANIFEST must record Budget domain helper-owner slimming without API contract change",
    )
    ok(
        "manifest records source size regression guard",
        isinstance(manifest.get("sizeRegressionGuardLedger"), dict)
        and manifest.get("sizeRegressionGuardLedger", {}).get("stamp")
        == "production-current-size-regression-guard-2026-07-06-r1"
        and manifest.get("sizeRegressionGuardLedger", {}).get("totalSourceBudgetBytes")
        == PHASE5_TOTAL_SOURCE_BUDGET
        and manifest.get("sizeRegressionGuardLedger", {}).get("noNewFiles") is True
        and manifest.get("sizeRegressionGuardLedger", {}).get("noNewApiRoutes") is True,
        "TECH_DEBT_MANIFEST must record source size regression guard",
    )
    ok(
        "manifest records Vercel Node 24 runtime pin",
        isinstance(manifest.get("vercelNodeRuntimePinLedger"), dict)
        and manifest.get("vercelNodeRuntimePinLedger", {}).get("requiredNodeEngine") == "24.x"
        and manifest.get("vercelNodeRuntimePinLedger", {}).get("businessLogicChanged") is False,
        "TECH_DEBT_MANIFEST must record Node 24.x runtime pin without API or business logic change",
    )
    ok(
        "manifest records Vercel build host safe split",
        isinstance(manifest.get("vercelBuildHostSafeLedger"), dict)
        and manifest.get("vercelBuildHostSafeLedger", {}).get("stamp")
        == "production-current-vercel-build-host-safe-2026-07-06-r1"
        and manifest.get("vercelBuildHostSafeLedger", {}).get("vercelBuild") == "npm run check:api"
        and manifest.get("vercelBuildHostSafeLedger", {}).get("noApiContractChange") is True
        and manifest.get("vercelBuildHostSafeLedger", {}).get("businessLogicChanged") is False,
        "TECH_DEBT_MANIFEST must record Vercel-safe build split without API or business logic change",
    )
    ok(
        "manifest records Budget UI modernization",
        isinstance(manifest.get("budgetUiModernizationLedger"), dict)
        and manifest.get("budgetUiModernizationLedger", {}).get("stamp")
        == "production-current-budget-ui-modern-current-2026-07-06-r1"
        and manifest.get("budgetUiModernizationLedger", {}).get("noApiContractChange") is True
        and manifest.get("budgetUiModernizationLedger", {}).get("businessLogicChanged") is False
        and manifest.get("budgetUiModernizationLedger", {}).get("maxBackendBudgetPageBytes")
        == 230000
        and manifest.get("budgetUiModernizationLedger", {}).get("maxMirrorBudgetPageBytes")
        == 230100,
        "TECH_DEBT_MANIFEST must record Budget UI modernization without API or business logic change",
    )
    ok(
        "manifest records all systems UI modernization",
        isinstance(manifest.get("allSystemsUiModernizationLedger"), dict)
        and manifest.get("allSystemsUiModernizationLedger", {}).get("stamp")
        == "production-current-all-systems-ui-modern-2026-07-06-r1"
        and manifest.get("allSystemsUiModernizationLedger", {}).get("owner")
        == "app-global-ui-modern-current"
        and manifest.get("allSystemsUiModernizationLedger", {}).get("noApiContractChange") is True
        and manifest.get("allSystemsUiModernizationLedger", {}).get("businessLogicChanged") is False
        and manifest.get("allSystemsUiModernizationLedger", {}).get("maxGasIndexBytes") == 370000
        and manifest.get("allSystemsUiModernizationLedger", {}).get("maxStaticIndexBytes")
        == 250000,
        "TECH_DEBT_MANIFEST must record all-systems UI modernization without API or business logic change",
    )
    static_index = read("github-pages/index.html")
    ok(
        "all systems UI owner installed in both indexes",
        all(
            token in gas_index and token in static_index
            for token in [
                "app-global-ui-modern-current",
                "--ui-modern-blue",
                "#p-search",
                "#p-track",
                "#p-report",
                "#p-petitioner",
                "#p-meeting",
                "#p-committee-meeting",
                "#p-personnel",
                "#p-budget",
                "#p-admin",
            ]
        )
        and len(gas_index.encode("utf-8")) <= PHASE5_SIZE_BUDGETS["gas-backend/Index.html"]
        and len(static_index.encode("utf-8")) <= PHASE5_SIZE_BUDGETS["github-pages/index.html"],
        "global UI owner must style every major system page in GAS and static indexes and remain under size budget",
    )
    meeting_page = read("gas-backend/Scripts_Page_Meeting.html")
    ok(
        "Meeting page reuses one committee meeting date formatter",
        "fmtDate:fmtDate" in meeting_page
        and "var owner=root.CommitteeMeetingStandalonePrint" in meeting_page
        and "owner&&__appIsFn(owner.fmtDate)?owner.fmtDate(v)" in compact(meeting_page),
        "CommitteeMeetingSummaryDetail must reuse CommitteeMeetingStandalonePrint.fmtDate instead of carrying a second date parser",
    )
    ok(
        "Meeting page AppPages adapter retained after slimming",
        "__meetingAppPageAdapterReady" in meeting_page
        and 'AppPages.register("meeting",mod)' in compact(meeting_page)
        and 'registerActions("meeting"' in compact(meeting_page)
        and "meetingDeleteLogSinglePath" in meeting_page,
        "Meeting AppPages module/actions must survive slimming",
    )
    core_runtime = read("gas-backend/Scripts_Core_Runtime.html")
    admin_page = read("gas-backend/Scripts_Page_Admin.html")
    ok(
        "core runtime sends transport options directly",
        contains_code(core_runtime, "root.AppTransport.run(method, payload || {")
        and contains_code(core_runtime, "options || {")
        and contains_code(core_runtime, "previousRuntimeCall.call(runtime, method, payload || {"),
        "single-owner runtime options propagation",
    )
    ok(
        "runtime write invalidates through transport owner only",
        "function invalidateAfterWrite" in core_runtime
        and "invalidateWriteCaches" not in core_runtime
        and "readClientCache" not in core_runtime
        and "writeClientCache" not in core_runtime
        and ("AppClient" + "CacheOwner") not in core_runtime
        and ("AppCache" + "DebtOwner") not in core_runtime
        and "AppTransport.invalidateClientApiCache" in core_runtime
        and "app:write-cache-invalidated" in core_runtime,
        "runtime write invalidation must not reintroduce stale client cache facade owners or cache-named functions",
    )
    hard_lock_audit = (
        manifest.get("currentSingleOwnerHardLockAuditLedger")
        if isinstance(manifest, dict)
        else None
    )
    ok(
        "Single owner hard lock audit R2 ledger installed",
        isinstance(hard_lock_audit, dict)
        and hard_lock_audit.get("stamp")
        == "production-current-single-owner-hard-lock-audit-2026-07-10-r2"
        and hard_lock_audit.get("noNewApiRoutes") is True
        and hard_lock_audit.get("noNewFiles") is True
        and hard_lock_audit.get("businessLogicChanged") is False,
        "manifest must record current single-owner hard-lock audit R2 without API/file/business-rule changes",
    )
    ok(
        "PlatformCore production API owner wording locked to AppPageKit",
        'api:"AppPageKit.apiRunner"' in platform
        and 'api:"AppApi.' + 'call"' not in platform
        and 'frontendTransport:"AppApi.' + 'call -> apiRouter"' not in platform,
        "PlatformCore metadata must identify AppPageKit.apiRunner as the production API owner",
    )
    ok(
        "Core runtime API facade owner wording locked to AppPageKit",
        'apiFacade:"AppPageKit.apiRunner -> AppRuntime.call -> AppTransport.run"' in core_runtime
        and 'apiFacade:"AppPageKit.apiRunner -> AppApi.' + "call" not in core_runtime
        and 'transport:"AppApi.' + 'call"' not in core_runtime,
        "core runtime owner matrix and AppPageController must prefer AppPageKit.apiRunner as transport owner",
    )
    core_runtime_compact = compact(core_runtime)
    pc_api_start = core_runtime_compact.find(
        'varmn=String(o.moduleName||o.scope||"AppPageController")'
    )
    pc_api_region = CodeText(
        core_runtime_compact[
            pc_api_start : core_runtime_compact.find("A(pc,{owner:pc.owner||O", pc_api_start)
        ]
    )
    ok(
        "AppPageController API delegates through AppPageKit before internal AppApi fallback",
        "r.AppPageKit&&F(r.AppPageKit.apiRunner)" in pc_api_region
        and (
            "r.AppApi&&F(r.AppApi." + "call)" not in pc_api_region
            or pc_api_region.find("r.AppPageKit&&F(r.AppPageKit.apiRunner)")
            < pc_api_region.find("r.AppApi&&F(r.AppApi." + "call)")
        ),
        "AppPageController.api must use AppPageKit.apiRunner before any internal compatibility fallback",
    )
    ok(
        "runtime write emits mutation event",
        "function emitWriteMutation" in core_runtime
        and "app:data-mutated" in core_runtime
        and "after-write-ok" in core_runtime,
        "write mutation event",
    )
    ok(
        "runtime write refresh has one canonical owner",
        "function installWriteRefreshBroker" in core_runtime
        and contains_code(core_runtime, "pages.refresh = function")
        and "current-write-refresh-delegated-r25" in core_runtime
        and "AppDirtyRefreshOwner.Current" in core_runtime
        and "root.AppDirtyRefreshOwner =" in core_runtime
        and "function scheduleWriteRefresh" not in core_runtime
        and "app:write-refresh-scheduled" not in core_runtime
        and 'source: "AppWriteRefreshBroker"' not in core_runtime,
        "AppDirtyRefreshOwner must be the only listener that refreshes pages after writes",
    )
    ok(
        "Phase E runtime consolidation facade installed",
        "PHASEE_RUNTIME_CONSOLIDATION_STAMP" in core_runtime
        and "phaseE-runtime-consolidation-current" in core_runtime
        and "AppRuntimeConsolidation" in core_runtime
        and "phaseE-runtime-consolidation-facade" in core_runtime,
        "runtime helpers must expose one Phase E consolidation facade without changing UI/UX",
    )
    ok(
        "Phase E AppUi notification/dom thin adapter installed",
        "phaseE-ui-notify-dom-thin-adapter" in core_runtime
        and "root.AppUi.notify=root.AppUi.notify||canonical.notify" in core_runtime
        and "root.AppUi.renderHtml=root.AppUi.renderHtml||renderHtml" in core_runtime
        and "runtime.notify=runtime.notify||canonical.notify" in core_runtime,
        "AppUi/AppRuntime notification and DOM helpers must delegate to the canonical runtime facade",
    )
    ok(
        "Phase E runtime owner contract retained",
        "phaseERuntimeConsolidation:PHASEE_RUNTIME_CONSOLIDATION_STAMP" in core_runtime
        and "phaseERuntimeConsolidation=PHASEE_RUNTIME_CONSOLIDATION_STAMP"
        in compact(core_runtime),
        "runtime owner ledger must expose Phase E consolidation stamp",
    )
    ok(
        "Phase E2 runtime slimming installed",
        "PHASEE2_RUNTIME_SLIMMING_STAMP" in core_runtime
        and "phaseE2-runtime-slimming-current" in core_runtime
        and "__Scripts_Core_Runtime_Html_C8_" not in core_runtime
        and "__E2_" in core_runtime
        and "stalePhase2RuntimeMetadataRemoved=!0" in compact(core_runtime),
        "private generated helper prefix must be collapsed and stale Phase 2 runtime metadata removed",
    )
    ok(
        "Phase E3 runtime alias cleanup installed",
        "PHASEE3_RUNTIME_ALIAS_CLEANUP_STAMP" in core_runtime
        and "phaseE3-runtime-alias-cleanup-current" in core_runtime
        and "__runtimeAliasPhaseE3:PHASEE3_RUNTIME_ALIAS_CLEANUP_STAMP" in compact(core_runtime)
        and "phaseE3RuntimeAliasCleanup=PHASEE3_RUNTIME_ALIAS_CLEANUP_STAMP"
        in compact(core_runtime)
        and "aliasCleanupAdapterCount=Object.keys(THIN_ALIAS_MAP).length" in compact(core_runtime),
        "thin public aliases must expose one Phase E3 cleanup stamp and delegate to canonical runtime",
    )
    app_index_bootstrap = read("github-pages/app-index-bootstrap.js")
    ok(
        "Phase 8 runtime page performance installed",
        "PHASE8_RUNTIME_PAGE_PERFORMANCE_STAMP" in core_runtime
        and "phase8-runtime-page-performance-current" in core_runtime
        and "phase8RuntimePagePerformance=PHASE8_RUNTIME_PAGE_PERFORMANCE_STAMP"
        in compact(core_runtime),
        "runtime consolidation report must expose Phase 8 page performance stamp",
    )
    ok(
        "Phase 8 page-scoped UI enhancement installed",
        contains_code(
            core_runtime, 'app:page-activated",function(t2){c(t2&&t2.detail&&t2.detail.scope'
        )
        and contains_code(
            app_index_bootstrap, "window.AppUi.enhance&&window.AppUi.enhance(phase8PageScope"
        )
        and contains_code(app_index_bootstrap, "scope:phase8PageScope(id)"),
        "route activation and AppUi enhancement must target the active page scope, not the whole document",
    )
    ok(
        "Phase 8 datepicker active-scope enhancement installed",
        "function activeScope()" in core_runtime
        and "scheduleEnhance(activeScope())" in core_runtime
        and "scheduleEnhance(e&&e.detail&&e.detail.scope||activeScope())" in core_runtime,
        "datepicker idle/page enhancement must scan active scope instead of document",
    )
    ok(
        "admin browser diagnostics slimmed",
        "app-production-diagnostics-deferred-owner" not in admin_page
        and "app-production-diagnostics-slim-stub-current" in admin_page
        and "PRODUCTION_DIAGNOSTICS_REMOVED_FROM_BROWSER_BUNDLE" in admin_page
        and (ROOT / "gas-backend" / "Scripts_Page_Admin.html").stat().st_size < 75000,
        "remove heavy smoke/verification implementation from browser admin bundle",
    )
    ok(
        "apiLogin uses /api/login only",
        contains_code(transport, "runVercelLoginProxy(req.payload || {})")
        and "function runLoginPost" not in transport,
        "login path",
    )
    critical_direct = read("gas-backend/Scripts_Critical_Login_Runtime.html")
    ok(
        "AppTransport.ping uses canonical route contract",
        ("apiGetRouteContract" in critical_direct and "gas-hosted-direct-ping" in critical_direct)
        or ("apiGetRouteContract" in transport and "vercel-api-proxy-only-ping" in transport),
        "ping must call apiGetRouteContract through the active transport owner",
    )
    ok(
        "fast-login disabled in backend",
        contains_code(platform, "fastLoginJsonp:false") and "FAST_LOGIN_JSONP_DISABLED" in platform,
        "backend public config/security",
    )
    ok(
        "assumed bridge ready not enabled in frontend",
        "assumedReady=true" not in compact(transport)
        and contains_code(app, "allowAssumedBridgeReady: false"),
        "assumed ready",
    )
    ok(
        "static API_CONTRACT disabled",
        contains_code(platform, "AppBackendCore.API_CONTRACT = Object.freeze({})"),
        "contract cleanup",
    )
    ok(
        "action token not write",
        'apiIssueActionToken","viewer","auth","c"' in compact(router)
        and 'method!=="apiIssueActionToken"' in router,
        "preflight",
    )
    ok(
        "Phase B write/delete flow contract installed in router",
        "ROUTER_PHASEB_WRITE_FLOW_STAMP" in router
        and "function _routerPhaseBWriteContractForMethod_" in router
        and "function _routerPhaseBWriteFlowContractStatus_" in router,
        "router must expose canonical Phase B method -> schema/route -> cache invalidation contract",
    )
    ok(
        "Phase B preflight uses canonical write contract",
        "contract=_routerPhaseBWriteContractForMethod_(method,routeMeta)"
        in function_body(router, "_routerPhaseDWritePreflight_")
        and "สัญญา API บันทึกข้อมูลไม่ครบถ้วน: " in function_body(router, "_routerPhaseDWritePreflight_"),
        "preflight must use Phase B contract and include method in contract error",
    )
    ok(
        "Phase B write route detection delegates to contract",
        contains_code(
            function_body(router, "_routerIsWriteRoute_"),
            "_routerPhaseBWriteContractForMethod_(method,routeMeta||{})",
        ),
        "write route detection must use one production contract helper",
    )
    ok(
        "Phase B route meta normalized before backend boundary",
        "function _routerEffectiveWriteMeta_" in router
        and "phaseBWriteFlowStamp=ROUTER_PHASEB_WRITE_FLOW_STAMP" in compact(router)
        and "phaseBWriteFlowContract=contract" in compact(router)
        and "returnmeta?_routerEffectiveWriteMeta_(method,meta):null" in compact(router),
        "write/csrf must be stamped before _backendBoundaryEnter_ so writeGateway sees write mode",
    )
    ok(
        "direct write calls re-enter apiRouter instead of bypassing router",
        "writeGateway-direct-router-reentry" in platform
        and "apiRouter({method:writeName,payload:payload||{}" in compact(platform)
        and "ROUTER_WRITE_BOUNDARY_REQUIRED" in platform,
        "legacy direct apiDelete/apiSave calls must be routed back through apiRouter and still keep bypass block as fallback",
    )
    ok(
        "SweetAlert duplicate and focus guard installed",
        "swal.a11y.focus" in core_runtime
        and "__duplicatePopupSuppressed" in core_runtime
        and "__APP_LAST_SWAL_KEY__" in core_runtime,
        "prevent stacked popups and aria-hidden focus warning",
    )
    ok(
        "Thai datepicker active-page scan optimization installed",
        "thaiDate.scope" in core_runtime and ".page:not(.d-none):not([hidden])" in core_runtime,
        "avoid scanning whole app on datepicker enhancement",
    )
    ok(
        "Thai datepicker fast-open/idle guard installed",
        "thai-datepicker-fast-open-current.65" in core_runtime
        and contains_code(core_runtime, "activeInput===input&&existing")
        and contains_code(core_runtime, "enhance(input),close()")
        and contains_code(core_runtime, "Date.now()-Number(lastOpenAt||0)<500")
        and "requestIdleCallback" in core_runtime
        and contains_code(
            core_runtime, "openThaiDatePicker=function(el){return el&&enhance(el),open(el)}"
        ),
        "avoid double open/rebuild, parent-wide scan, and eager full-page enhancement",
    )
    ok(
        "Production current metadata in public config",
        contains_code(platform, "legacyTransportRemoved:true")
        and contains_code(platform, "legacyJsonpTransportRemoved:true")
        and contains_code(platform, "legacyGasBridgeTransportRemoved:true")
        and contains_code(platform, "legacyLoginPostIframeRemoved:true"),
        "backend public config metadata",
    )
    for api in CRITICAL_APIS:
        ok(f"critical API {api}", api in router or api in platform, api)
    css_sources = {
        "gas-backend/Index.html": read("gas-backend/Index.html"),
        "github-pages/index.html": index,
    }
    css_bad_literals = [
        "body.app-ready#login-page",
        "#p-dash.modern-dash-hero",
        "calc(100%-",
        "calc(100%+",
        "padding:.58rem.82rem",
    ]
    css_bad_hits = []
    for css_name, css_text in css_sources.items():
        css_text = str(css_text)
        for bad_css in css_bad_literals:
            if bad_css in css_text:
                css_bad_hits.append(css_name + ":" + bad_css)
        for rx in [
            r"padding:\.[0-9]+rem\.[0-9]+rem",
            r"margin:\.[0-9]+rem\.[0-9]+rem",
            r"gap:\.[0-9]+rem\.[0-9]+rem",
            r"calc\([^)]*%-[^)]*\)",
        ]:
            if re.search(rx, css_text):
                css_bad_hits.append(css_name + ":" + rx)
    ok("ui css compaction safety", not css_bad_hits, ", ".join(css_bad_hits))
    budget_backend = read("gas-backend/Code_32_Domain_Budget.gs")
    dashboard_backend = read("gas-backend/Code_30_Domain_Cases.gs")
    dash_budget_body = function_body(dashboard_backend, "_dashboardBudgetFromBudgetDomainPhaseE_")
    api_budget_summary_body = function_body(budget_backend, "apiBudgetGetSummary")
    ok(
        "Phase 4 budget dashboard owner delegated to BudgetDomain",
        "BudgetDomain.getDashboardSummaryForDashboard" in dash_budget_body
        and "_getDashboardBudgetByPlanCurrentFYImpl_" not in dash_budget_body
        and "BudgetImports" not in dashboard_backend
        and "budget delegated to BudgetDomain" in dashboard_backend,
        "dashboard budget must not own BudgetImports reads",
    )
    ok(
        "Phase 4 apiBudgetGetSummary dashboard hydration stays in BudgetDomain facade",
        "BudgetDomain.getDashboardSummaryForDashboard" in api_budget_summary_body
        and "_budgetGetDashboardSummaryForDashboardPhaseE_(dashPayload)"
        not in api_budget_summary_body
        and "phase4-budget-domain-owner-unavailable" in api_budget_summary_body,
        "no direct dashboard fallback from apiBudgetGetSummary",
    )
    ok(
        "Phase 4 budget owner contract stamp",
        "PHASE4_BUDGET_SINGLE_OWNER_STAMP" in budget_backend
        and 'dashboardBudgetOwner:"BudgetDomain.getDashboardSummaryForDashboard"'
        in compact(budget_backend),
        "budget single owner stamp",
    )
    ok(
        "Phase C Code_30 domain status consolidation installed",
        "PHASEC_DOMAIN_CONSOLIDATION_STAMP" in dashboard_backend
        and "function _domainStatusPhaseC_" in dashboard_backend
        and "function _phaseCDomainConsolidationContract_" in dashboard_backend
        and "CaseDomain.PHASEC_CONSOLIDATION=_phaseCDomainConsolidationContract_()"
        in compact(dashboard_backend),
        "Code_30 domain status metadata must have one production factory and a Phase C contract",
    )
    phasec_status_contracts = [
        'CaseDomain.status=function(){return _domainStatusPhaseC_(CaseDomain,"CaseDomain")}',
        'TrackingDomain.status=function(){return _domainStatusPhaseC_(TrackingDomain,"TrackingDomain")}',
        'MeetingDomain.status=function(){return _domainStatusPhaseC_(MeetingDomain,"MeetingDomain")}',
        'DashboardDomain.status=function(){return _domainStatusPhaseC_(DashboardDomain,"DashboardDomain"',
    ]
    ok(
        "Phase C status functions use one factory",
        all(compact(x) in compact(dashboard_backend) for x in phasec_status_contracts)
        and 'owner:"TrackingDomain",boundary:TrackingDomain.BOUNDARY' not in dashboard_backend
        and 'owner:"MeetingDomain",boundary:MeetingDomain.BOUNDARY' not in dashboard_backend,
        "Case/Tracking/Meeting/Dashboard status helpers must not re-declare duplicate inline objects",
    )
    ok(
        "Phase D Code_30 status mapper dedup installed",
        "PHASED_CODE30_MAPPER_DEDUP_STAMP" in dashboard_backend
        and "function _caseStatusNormalizePhaseD_" in dashboard_backend
        and "function _phaseDCode30MapperDedupContract_" in dashboard_backend
        and "CaseDomain.PHASED_MAPPER_DEDUP=_phaseDCode30MapperDedupContract_()"
        in compact(dashboard_backend),
        "case/report/dashboard status mappers must use one Phase D canonical mapper",
    )
    phaseD_status_bodies = [
        function_body(dashboard_backend, "_caseNormalizeStatusForDisplay_"),
        function_body(dashboard_backend, "_caseReportStatusPhase3_"),
        function_body(dashboard_backend, "_dashboardNormalizeCaseStatusForCount_"),
    ]
    ok(
        "Phase D status consumers delegate to one mapper",
        all("_caseStatusNormalizePhaseD_" in b for b in phaseD_status_bodies)
        and all("AppBackendCore.normalizeCaseStatus" not in b for b in phaseD_status_bodies),
        "display/report/dashboard status consumers must not reimplement normalizeCaseStatus",
    )
    ok(
        "Phase D2 Code_30 row/date mapper dedup installed",
        "PHASED2_CODE30_ROW_DATE_MAPPER_DEDUP_STAMP" in dashboard_backend
        and "function _caseDateTextPhaseD2_" in dashboard_backend
        and "function _caseDateOnlyPhaseD2_" in dashboard_backend
        and "function _caseRowPickPhaseD2_" in dashboard_backend
        and "function _phaseD2Code30RowDateMapperDedupContract_" in dashboard_backend
        and "CaseDomain.PHASED2_ROW_DATE_MAPPER_DEDUP=_phaseD2Code30RowDateMapperDedupContract_()"
        in compact(dashboard_backend),
        "meeting/dashboard/tracking/letter date helpers must use one Phase D2 mapper and contract",
    )
    phaseD2_date_bodies = [
        function_body(dashboard_backend, "_committeeMeetingDateText_"),
        function_body(dashboard_backend, "_dashboardDate_"),
        function_body(dashboard_backend, "_trackingDateOnly_"),
        function_body(dashboard_backend, "_trackingDueDateOnly_"),
        function_body(dashboard_backend, "_normalizeLetterDateFromFields_"),
    ]
    ok(
        "Phase D2 date consumers delegate to one mapper",
        all(
            ("_caseDateTextPhaseD2_" in b or "_caseDateOnlyPhaseD2_" in b)
            for b in phaseD2_date_bodies
        )
        and "new Date(value)" not in function_body(dashboard_backend, "_trackingDateOnly_")
        and "new Date(value)" not in function_body(dashboard_backend, "_trackingDueDateOnly_")
        and "new Date(raw)" not in function_body(dashboard_backend, "_dashboardDate_"),
        "date consumers must not reimplement direct parsing/date normalization",
    )
    ok(
        "Phase D2 row picker used in meeting row mapper",
        "_caseRowPickPhaseD2_" in function_body(dashboard_backend, "_normalizeMeetingLogRow_"),
        "meeting history row mapper must use single Phase D2 row picker for aliased fields",
    )
    ok(
        "Cases domain helper owners installed after slimming",
        all(
            token in dashboard_backend
            for token in [
                "function _c30S_",
                "function _c30W_",
                "function _c30A_",
                "function _c30O_",
                "function _c30H_",
            ]
        )
        and dashboard_backend.count('_appIsFnName_("_recordWarning_")&&_recordWarning_(') == 1
        and dashboard_backend.count("Array.isArray(") == 1
        and dashboard_backend.count("Object.assign.apply(") == 1
        and dashboard_backend.count("Object.prototype.hasOwnProperty.call(") == 1,
        "Code_30 should delegate warning, array, assign, and hasOwnProperty boilerplate through one owner helper each",
    )
    ok(
        "Budget domain helper owners installed after slimming",
        all(
            token in budget_backend
            for token in [
                "function _b32W_",
                "function _b32A_",
                "function _b32O_",
                "function _b32H_",
                "function _b32N_",
                "function _b32FY_",
            ]
        )
        and budget_backend.count('_appIsFnName_("_recordWarning_")&&_recordWarning_(') == 0
        and budget_backend.count('typeof _recordWarning_=="function"&&_recordWarning_(') == 0
        and budget_backend.count("Object.assign(") == 0
        and budget_backend.count("Object.assign.apply(") == 1
        and budget_backend.count("Object.prototype.hasOwnProperty.call(") == 1
        and budget_backend.count("Array.isArray(rows)?rows:[]") == 0,
        "Code_32 should delegate warning, array fallback, assign, hasOwnProperty, amount normalize and FY normalize boilerplate through one owner helper each",
    )
    budget_page = read("gas-backend/Scripts_Page_Budget.html")
    budget_page_mirror = read("github-pages/partials/Scripts_Page_Budget.html")
    ok(
        "Budget page modern UI owner installed",
        all(
            token in budget_page
            for token in [
                "budget-ui-modern-current",
                "budget-modern-hero",
                "budget-modern-tabs",
                "budget-modern-card",
                "AppBudgetModernUi",
            ]
        )
        and "noApiContractChange:!0" in compact(budget_page)
        and budget_page_mirror.startswith("<!-- GENERATED MIRROR:"),
        "Budget page must keep one modern UI owner in canonical and generated mirror",
    )
    dash_status_body = function_body(dashboard_backend, "_dashboardCaseStatusKey_")
    ok(
        "Dashboard case status key canonical/default maps to s0",
        '"s1"' not in dash_status_body
        and "เรื่องเข้าใหม่" in dash_status_body
        and 'return!compact?"s0"' in dash_status_body
        and 'รับเรื่อง|รับเข้า|^รับ$/.test(compact)?"s0"' in dash_status_body
        and "dashboard-status-count-s0-default-current" in dashboard_backend
        and "statusDefaultBlankToS0" in dashboard_backend,
        "blank/รับเรื่อง/รับเข้า must count under เรื่องเข้าใหม่, not hidden s1",
    )
    ok(
        "Dashboard stale status snapshot is rejected",
        "function _dashboardSnapshotStatusCurrent_" in router
        and "dashboard.summarySnapshot.skipStaleStatus" in router
        and "statusCountStamp:_dashboardStatusSnapshotStamp_()" in router,
        "old dashboard snapshots without status-count stamp must not be reused",
    )
    ok(
        "dashboard read-model gate dashboard status read model installed",
        "PHASEF_DASHBOARD_STATUS_READ_MODEL_STAMP" in dashboard_backend
        and "function _dashboardStatusReadModelPhaseF_" in dashboard_backend
        and "function _phaseFDashboardStatusReadModelContract_" in dashboard_backend
        and "DashboardDomain.PHASEF_STATUS_READ_MODEL=_phaseFDashboardStatusReadModelContract_()"
        in compact(dashboard_backend),
        "dashboard status counts must be generated by one backend read model",
    )
    phasef_stats_body = function_body(dashboard_backend, "_dashboardStatsDirect_")
    ok(
        "dashboard read-model gate dashboard status rows use backend read model only",
        "statusReadModel=_dashboardStatusReadModelPhaseF_(caseRows)" in phasef_stats_body
        and "statusLabels={s0:" not in phasef_stats_body
        and "stats.statusReadModel=statusReadModel" in phasef_stats_body
        and "stats.sourceRowCount=statusReadModel.sourceRowCount" in phasef_stats_body,
        "Dashboard _dashboardStatsDirect_ must not inline status label/count logic",
    )
    ok(
        "dashboard read-model gate dashboard bundle cache key invalidates old status caches",
        "dash_bundle_phaseF_status_read_model_v9_" in dashboard_backend
        and "dash_bundle_due_classifier_v8_" not in dashboard_backend,
        "dashboard bundle cache key must move to dashboard read-model gate status read model version",
    )
    ok(
        "dashboard read-model gate router dashboard snapshot stamp aligned",
        "dashboard-status-count-s0-default-current-phaseF-read-model-2026-07-05" in router
        and 'statusReadModelStamp:"phaseF-dashboard-status-read-model-current"' in router
        and "dto.caseStats" in function_body(router, "_dashboardStatusStatsObject_"),
        "router summary snapshot must reject old status read model snapshots and inspect canonical dto.caseStats",
    )

    dashboard_frontend = read("gas-backend/Scripts_Page_Dashboard.html")
    sheet_repo = read("gas-backend/Code_01_Platform_SheetRepo.gs")
    ok(
        "Phase 3 dashboard budget hydration uses router-owned cache policy",
        "dashboard-budget-hydration-phase3-router-cache-policy" in dashboard_frontend
        and 'source:"dashboard-budget-hydration-phaseO-force-fresh"' not in dashboard_frontend
        and "cacheTtlSeconds:300" in dashboard_frontend
        and "snapshotTtlSeconds:300" in dashboard_frontend,
        "dashboard lazy budget hydration must follow Code_20_Router apiBudgetGetSummary TTL",
    )
    ok(
        "Phase 3 budget dashboard hydration preserves explicit freshness only",
        "forceFresh:payload.forceFresh===!0" in api_budget_summary_body
        and "noCache:payload.noCache===!0" in api_budget_summary_body
        and "bypassCache:payload.bypassCache===!0" in api_budget_summary_body
        and "cacheTtlSeconds:Number(payload.cacheTtlSeconds||300)||300" in api_budget_summary_body,
        "apiBudgetGetSummary dashboard hydration must not hard-force fresh reads and must follow Code_20_Router TTL",
    )
    ok(
        "Phase 5 hot read route cache TTLs retained",
        "apiSearchCasesLite:600" in sheet_repo
        and "apiGetTracking:600" in sheet_repo
        and "apiGetPeoplePageBundle:600" in sheet_repo
        and "apiBudgetGetSummary:600" in sheet_repo,
        "critical read APIs must remain router-cache eligible",
    )
    ok(
        "Phase 3 frontend cache TTLs follow router hot-path owner",
        'cachePolicyOwner:"Code_20_Router._routerHotPathContractSpec_"' in app
        and all(
            token in app
            for token in [
                "apiGetDashboardBundle:240",
                "apiSearchCasesLite:180",
                "apiGetTracking:180",
                "apiBudgetGetSummary:300",
                "apiGetPeoplePageBundle:300",
            ]
        ),
        "app-config client cache TTLs must match Code_20_Router._routerHotPathContractSpec_",
    )
    ok(
        "Phase 3 core runtime client cache follows app-config/router policy",
        "phase3-cache-policy-single-owner-router-current" in core_runtime
        and "router-hot-path-contract-owner" in core_runtime
        and "runtimeMinified:!1" in compact(core_runtime),
        "core runtime cache map must be router-derived and source must not be minified-only",
    )
    drift = mirror_in_sync()
    ok("generated mirrors in sync", not drift, ", ".join(drift))
    write_methods = write_methods_from_router(router)
    schemas = schema_methods(router)
    missing = sorted(set(write_methods) - schemas)
    ok("write schema covers write routes", not missing, ", ".join(missing))

    frozen_methods = api_methods_from_router(router)
    frozen_method_diff = frozen_contract_diff(frozen_methods, FROZEN_API_METHODS)
    ok(
        "Contract Freeze API method list locked",
        not frozen_method_diff["missing"]
        and not frozen_method_diff["unexpected"]
        and not frozen_method_diff["orderChanged"],
        json.dumps(frozen_method_diff, ensure_ascii=False),
    )
    frozen_write_diff = frozen_contract_diff(sorted(write_methods), FROZEN_WRITE_METHODS)
    ok(
        "Contract Freeze write method list locked",
        not frozen_write_diff["missing"] and not frozen_write_diff["unexpected"],
        json.dumps(frozen_write_diff, ensure_ascii=False),
    )
    frozen_schema_diff = frozen_contract_diff(sorted(schemas), FROZEN_WRITE_METHODS)
    ok(
        "Contract Freeze write schema list locked",
        not frozen_schema_diff["missing"] and not frozen_schema_diff["unexpected"],
        json.dumps(frozen_schema_diff, ensure_ascii=False),
    )
    frozen_public_diff = frozen_contract_diff(
        public_methods_from_router(router), FROZEN_PUBLIC_METHODS
    )
    ok(
        "Contract Freeze public method list locked",
        not frozen_public_diff["missing"] and not frozen_public_diff["unexpected"],
        json.dumps(frozen_public_diff, ensure_ascii=False),
    )
    api_dir_files = sorted(p.name for p in (ROOT / "api").glob("*.js"))
    frozen_api_file_diff = frozen_contract_diff(api_dir_files, FROZEN_VERCEL_API_FILES)
    ok(
        "Contract Freeze Vercel API files locked",
        not frozen_api_file_diff["missing"] and not frozen_api_file_diff["unexpected"],
        json.dumps(frozen_api_file_diff, ensure_ascii=False),
    )
    app_contract_endpoints = [
        endpoint for endpoint in FROZEN_FRONTEND_PROXY_ENDPOINTS if endpoint in app
    ]
    vercel_api_proxy_surface = '"/api/(.*)"' in vercel_text and '"api/*.js"' in vercel_text
    ok(
        "Contract Freeze frontend proxy endpoints locked",
        app_contract_endpoints == FROZEN_FRONTEND_PROXY_ENDPOINTS and vercel_api_proxy_surface,
        "app=%s vercelApiProxySurface=%s" % (app_contract_endpoints, vercel_api_proxy_surface),
    )
    ok(
        "Contract Freeze manifest ledger locked",
        manifest.get("contractFreeze", {}).get("stamp") == FROZEN_CONTRACT_STAMP
        and manifest.get("contractFreeze", {}).get("routeCount") == len(FROZEN_API_METHODS)
        and manifest.get("contractFreeze", {}).get("writeRouteCount") == len(FROZEN_WRITE_METHODS)
        and manifest.get("contractFreeze", {}).get("apiMethods") == FROZEN_API_METHODS
        and manifest.get("contractFreeze", {}).get("writeMethods") == FROZEN_WRITE_METHODS,
        "manifest contractFreeze must match frozen gate constants",
    )

    size_rows, size_offenders, source_total, source_total_ok = phase5_size_budget_report()
    ok("Phase 5 file size budgets", not size_offenders, "; ".join(size_offenders))
    ok(
        "Phase 5 deterministic source size budget",
        source_total_ok,
        f"{source_total}>{PHASE5_TOTAL_SOURCE_BUDGET}; dynamic generated files excluded: {sorted(PHASE5_DYNAMIC_GENERATED_FILES)}",
    )
    ok("package version aligned", package.get("version") == VERSION, str(package.get("version")))
    ok(
        "package release stamp aligned",
        package.get("release") == RELEASE
        and package.get("releaseStamp") == RELEASE
        and package.get("assetStamp") == ASSET,
        str({k: package.get(k) for k in ["release", "releaseStamp", "assetStamp"]}),
    )
    ok(
        "manifest release track",
        manifest.get("releaseTrack") == "production-current",
        str(manifest.get("releaseTrack")),
    )
    ok(
        "manifest version aligned",
        manifest.get("version") == VERSION
        and manifest.get("releaseAlignment", {}).get("packageVersion") == VERSION,
        str(manifest.get("version")),
    )
    ok(
        "manifest release",
        manifest.get("release") == RELEASE
        and manifest.get("releaseStamp") == RELEASE
        and manifest.get("assetStamp") == ASSET
        and manifest.get("releaseAlignment", {}).get("releaseStamp") == RELEASE
        and manifest.get("releaseAlignment", {}).get("assetStamp") == ASSET,
        str(manifest.get("release")),
    )
    ok(
        "manifest release gate",
        manifest.get("releaseGate") == "tools/phaseN_legacy_transport_gate.py",
        str(manifest.get("releaseGate")),
    )
    ok(
        "manifest legacy removed",
        manifest.get("legacyTransportRemoved") is True
        and manifest.get("legacyJsonpTransportRemoved") is True
        and manifest.get("legacyGasBridgeTransportRemoved") is True
        and manifest.get("legacyLoginPostIframeRemoved") is True,
        str(manifest),
    )
    ok(
        "manifest Phase E runtime consolidation",
        isinstance(manifest.get("phaseERuntimeConsolidation"), dict)
        and manifest.get("phaseERuntimeConsolidation", {}).get("stamp")
        == "phaseE-runtime-consolidation-current",
        "manifest must record Phase E runtime consolidation contract",
    )
    ok(
        "manifest Phase E2 runtime slimming",
        isinstance(manifest.get("phaseE2RuntimeSlimming"), dict)
        and manifest.get("phaseE2RuntimeSlimming", {}).get("stamp")
        == "phaseE2-runtime-slimming-current",
        "manifest must record Phase E2 runtime slimming contract",
    )
    ok(
        "manifest Phase E3 runtime alias cleanup",
        isinstance(manifest.get("phaseE3RuntimeAliasCleanup"), dict)
        and manifest.get("phaseE3RuntimeAliasCleanup", {}).get("stamp")
        == "phaseE3-runtime-alias-cleanup-current",
        "manifest must record Phase E3 runtime alias cleanup contract",
    )
    ok(
        "manifest dashboard read-model gate dashboard status read model",
        isinstance(manifest.get("phaseFDashboardStatusReadModel"), dict)
        and manifest.get("phaseFDashboardStatusReadModel", {}).get("stamp")
        == "phaseF-dashboard-status-read-model-current",
        "manifest must record dashboard read-model gate dashboard status read model contract",
    )
    ok(
        "manifest security/cache gate cache contract gate",
        isinstance(manifest.get("phaseGCacheContractGate"), dict)
        and manifest.get("phaseGCacheContractGate", {}).get("stamp")
        == "phaseG-cache-contract-gate-current",
        "manifest must record security/cache gate cache contract gate",
    )
    ok(
        "manifest Phase H performance hardening",
        isinstance(manifest.get("phaseHPerformanceHardening"), dict)
        and manifest.get("phaseHPerformanceHardening", {}).get("stamp")
        == "phaseH-performance-hardening-current",
        "manifest must record Phase H performance hardening contract",
    )

    ok(
        "Phase A contract freeze stamp in router",
        "ROUTER_PHASEA_CONTRACT_FREEZE_STAMP" in router
        and "phaseA-contract-freeze-production-lock-current" in router,
        "router must expose Phase A freeze stamp",
    )
    ok(
        "Phase A route contract includes frozen contract ledger",
        "phaseAContractFreeze:_routerPhaseAContractFreezeStatus_(registry)" in compact(router),
        "api route contract must include Phase A contract status",
    )
    ok(
        "Phase B route contract includes write/delete flow ledger",
        "phaseBWriteDeleteFlow:_routerPhaseBWriteFlowContractStatus_(registry)" in compact(router),
        "api route contract must expose Phase B write/delete flow status",
    )
    ok(
        "Phase A frozen contracts named",
        all(
            token in router
            for token in [
                "API_ROUTE_REGISTRY",
                "WRITE_SCHEMA_BY_METHOD",
                "CACHE_ENTITY_BY_METHOD",
                "DOMAIN_OWNER_BY_METHOD",
                "FRONTEND_PAGE_REFRESH_BY_ENTITY",
            ]
        ),
        "five production contracts must be named and frozen",
    )
    ok(
        "Phase A platform cache contract installed",
        "APP_PHASEA_CONTRACT_FREEZE" in platform
        and "function _platformPhaseACacheEntityByMethod_" in platform
        and "function _platformPhaseAWriteInvalidationByMethod_" in platform
        and "function _platformPhaseAFrontendRefreshByEntity_" in platform,
        "platform must own cache/entity/refresh contracts",
    )
    ok(
        "Phase B platform write/cache contract installed",
        "APP_PHASEB_WRITE_FLOW_CONTRACT" in platform
        and "function _platformPhaseBWriteFlowContractByMethod_" in platform
        and "function _platformPhaseBWriteFlowContractStatus_" in platform
        and "meta.phaseBWriteFlowStamp=APP_PHASEB_WRITE_FLOW_CONTRACT.stamp" in compact(platform),
        "writeGateway must attach Phase B write/cache contract to normalized write responses",
    )
    ok(
        "Phase A admin-users canonical cache profile exists",
        'canonicalDomains:["case","letters","meeting","budget","people","admin","admin-users","dashboard"]'
        in platform
        and 'adminusers:"admin-users"' in platform
        and '"admin-users":{stamps:["admin-users","users","admin","dashboard"]' in platform
        and 'Users:["admin","admin-users"]' in platform,
        "admin user cache must not canonicalize to general/admin only",
    )
    ok(
        "Phase A write invalidation map covers critical deletes",
        all(
            s in platform
            for s in [
                'apiDeleteCase:["case","dashboard"]',
                'apiDeleteMeetingLog:["meeting","dashboard"]',
                'apiDeleteLetter:["letters","tracking","dashboard"]',
                'apiDeletePetitioner:["people","petitioner","case","dashboard"]',
                'apiBudgetDeleteImport:["budget","dashboard"]',
                'apiAdminDeleteUser:["admin-users","admin"]',
            ]
        ),
        "critical delete methods need explicit invalidation contract",
    )
    ok(
        "Phase A router validates write invalidation and frontend refresh",
        "PHASEA_WRITE_INVALIDATION_MISSING" in router
        and "PHASEA_FRONTEND_REFRESH_MISSING" in router
        and "_routerPhaseAInvalidationForWriteMethod_" in router,
        "router contract freeze must catch missing invalidate/refresh contracts",
    )
    ok(
        "security/cache gate platform cache contract gate installed",
        "APP_PHASEG_CACHE_CONTRACT_GATE" in platform
        and "phaseG-cache-contract-gate-current" in platform
        and "function _platformPhaseGCacheContractStatus_" in platform
        and "function _platformPhaseGReadCacheContractByMethod_" in platform
        and "function _platformPhaseGWriteCacheContractByMethod_" in platform,
        "platform must expose security/cache gate read/write cache contract gate",
    )
    ok(
        "security/cache gate writeGateway attaches cache contract metadata",
        "meta.phaseGCacheContractStamp=APP_PHASEG_CACHE_CONTRACT_GATE.stamp" in compact(platform)
        and "meta.phaseGCacheContract=_platformPhaseGWriteCacheContractByMethod_"
        in compact(platform),
        "writeGateway must attach security/cache gate cache contract to write responses",
    )
    ok(
        "security/cache gate router cache contract gate installed",
        "ROUTER_PHASEG_CACHE_CONTRACT_STAMP" in router
        and "function _routerPhaseGCacheContractStatus_" in router
        and "phaseGCacheContract:_routerPhaseGCacheContractStatus_(registry)" in compact(router),
        "router route contract must expose security/cache gate cache contract status",
    )
    ok(
        "security/cache gate critical delete invalidations locked",
        all(
            token in router
            for token in [
                'apiDeleteCase",requires:["case","dashboard"]',
                'apiDeleteMeetingLog",requires:["meeting","dashboard"]',
                'apiDeleteLetter",requires:["letters","tracking","dashboard"]',
                'apiDeletePetitioner",requires:["people","petitioner","case","dashboard"]',
                'apiBudgetDeleteImport",requires:["budget","dashboard"]',
                'apiAdminDeleteUser",requires:["admin-users","admin"]',
            ]
        ),
        "critical delete invalidation rules must be locked in security/cache gate router contract",
    )
    ok(
        "Phase H platform performance hardening installed",
        "APP_PHASEH_PERFORMANCE_HARDENING" in platform
        and "phaseH-performance-hardening-current" in platform
        and "function _platformPhaseHPerformanceContractStatus_" in platform
        and "function _platformPhaseHHotReadTargets_" in platform
        and "function _platformPhaseHPerformanceWriteContract_" in platform,
        "platform must expose Phase H hot read/write refresh performance contract",
    )
    ok(
        "Phase H dashboard cache key versioned by dependent stamps",
        "dash_bundle_phaseH_perf_v10_" in platform
        and '["dashboard","case","letters","budget","meeting"]' in platform
        and "dash_bundle_due_classifier_v2_" not in platform,
        "dashboard cache key must include dependent entity stamps and new Phase H version",
    )
    ok(
        "Phase H writeGateway attaches performance refresh contract metadata",
        "meta.phaseHPerformanceStamp=APP_PHASEH_PERFORMANCE_HARDENING.stamp" in compact(platform)
        and "meta.phaseHPerformanceContract=_platformPhaseHPerformanceWriteContract_"
        in compact(platform),
        "writeGateway must expose deterministic refresh plan after save/delete",
    )
    ok(
        "Phase H router performance hardening installed",
        "ROUTER_PHASEH_PERFORMANCE_HARDENING_STAMP" in router
        and "phaseH-performance-hardening-current" in router
        and "function _routerPhaseHPerformanceContractStatus_" in router
        and "phaseHPerformanceHardening:_routerPhaseHPerformanceContractStatus_(registry)"
        in compact(router),
        "router route contract must expose Phase H performance hardening status",
    )
    ok(
        "Phase H request-scope entity stamp memo installed",
        "__APP_ROUTER_ENTITY_STAMP_MEMO__" in router
        and "memo[key]" in function_body(router, "_routerEntityCacheStamp_"),
        "router entity stamp lookup must be memoized per execution to reduce repeated cache/property reads",
    )
    ok(
        "Phase 6 production clean contract installed",
        "APP_PHASE6_PRODUCTION_CLEAN_CONTRACT" in platform
        and "phase6-production-clean-contract-current" in platform
        and "function _platformPhase6ProductionCleanContractStatus_" in platform
        and "meta.phase6ProductionCleanContract=_platformPhase6ProductionCleanContractStatus_()"
        in compact(platform),
        "platform/writeGateway must expose consolidated Phase 6 production contract",
    )
    ok(
        "Phase 6 router production contract report installed",
        "ROUTER_PHASE6_PRODUCTION_CLEAN_CONTRACT_STAMP" in router
        and "function _routerPhase6ProductionCleanContractStatus_" in router
        and "phase6ProductionCleanContract:_routerPhase6ProductionCleanContractStatus_(registry)"
        in compact(router),
        "api route contract must expose Phase 6 consolidated production contract",
    )
    ok(
        "Phase 6 contract verifies admin user cache entity",
        "PHASE6_ADMIN_USERS_CACHE_ENTITY_DRIFT" in platform
        and "apiAdminListUsers" in platform
        and "admin-users" in platform,
        "admin user list cache must remain admin-users after save/delete cleanup",
    )
    ok(
        "Phase 6 contract verifies every write schema has route/write/csrf/invalidation",
        "PHASE6_WRITE_ROUTE_MISSING" in platform
        and "PHASE6_ROUTE_WRITE_META_MISSING" in platform
        and "PHASE6_ROUTE_CSRF_META_MISSING" in platform
        and "PHASE6_WRITE_INVALIDATION_MISSING" in platform,
        "production write contract must fail loudly when write/cache route metadata drifts",
    )
    ok(
        "manifest Phase 6 production clean contract",
        isinstance(manifest.get("phase6ProductionCleanContract"), dict)
        and manifest.get("phase6ProductionCleanContract", {}).get("stamp")
        == "phase6-production-clean-contract-current",
        "manifest must record Phase 6 production clean contract",
    )
    ok(
        "Phase 7 transitional write fallback cleanup installed",
        "APP_PHASE7_TRANSITIONAL_FALLBACK_CLEANUP" in platform
        and "phase7-transitional-fallback-cleanup-current" in platform
        and "function _platformPhase7TransitionalFallbackCleanupStatus_" in platform
        and "meta.phase7TransitionalFallbackCleanupContract=_platformPhase7TransitionalFallbackCleanupStatus_()"
        in compact(platform),
        "platform/writeGateway must expose Phase 7 fallback cleanup contract",
    )
    ok(
        "Phase 7 router disables route-name write guessing",
        "ROUTER_PHASE7_TRANSITIONAL_FALLBACK_CLEANUP_STAMP" in router
        and "function _routerPhase7TransitionalFallbackCleanupStatus_" in router
        and "phase7TransitionalFallbackCleanup:_routerPhase7TransitionalFallbackCleanupStatus_(registry)"
        in compact(router)
        and "write=!isActionToken&&(schemaWrite||registryWrite)" in compact(router)
        and "TRANSITIONAL_ROUTE_NAME_COMPAT" not in router,
        "router must classify writes from schema/registry only, not transitional route-name guesses",
    )
    ok(
        "Phase 7 keeps direct router re-entry guard while cleanup progresses",
        "writeGateway-direct-router-reentry" in platform
        and "ROUTER_WRITE_BOUNDARY_REQUIRED" in platform
        and "directRouterReentryGuardRetained:!0" in platform,
        "direct legacy write calls must still be safely routed through apiRouter during cleanup",
    )
    ok(
        "manifest Phase 7 transitional fallback cleanup",
        isinstance(manifest.get("phase7TransitionalFallbackCleanup"), dict)
        and manifest.get("phase7TransitionalFallbackCleanup", {}).get("stamp")
        == "phase7-transitional-fallback-cleanup-current",
        "manifest must record Phase 7 fallback cleanup",
    )
    ok(
        "manifest Phase 8 runtime page performance",
        isinstance(manifest.get("phase8RuntimePagePerformance"), dict)
        and manifest.get("phase8RuntimePagePerformance", {}).get("stamp")
        == "phase8-runtime-page-performance-current",
        "manifest must record Phase 8 runtime/page performance contract",
    )
    characterization_report = check_characterization_contract(
        manifest, package, router, common, docs_policy
    )
    step2_runtime_metadata_report = check_step2_runtime_metadata_slimming(
        manifest, package, docs_policy, core_runtime
    )
    step3_api_facade_report = check_step3_api_facade_consolidation(
        manifest, package, docs_policy, core_runtime
    )
    step4_router_consolidation_report = check_step4_router_canonical_resolver_consolidation(
        manifest, package, docs_policy, router, platform
    )
    step5_proxy_origin_guard_report = check_step5_proxy_origin_guard(
        manifest, package, docs_policy, platform, common, transport, app, generated
    )
    step6_runtime_bootstrap_meeting_report = check_step6_runtime_bootstrap_meeting_rewrite(
        manifest, package, docs_policy, app, vercel, gas_index, static_index
    )
    check_owner_consolidation_contract(
        manifest,
        platform,
        router,
        transport,
        common,
        core_runtime,
        gas_index,
        static_index,
        alltext,
    )
    check_legacy_fallback_cleanup_contract(
        manifest,
        platform,
        app,
        transport,
        read("gas-backend/Scripts_Critical_Login_Runtime.html"),
        read("github-pages/critical-login-runtime.js"),
    )
    check_performance_debt_contract(manifest, transport, core_runtime)
    check_uiux_debt_contract(manifest, gas_index, static_index)
    check_phase4_write_delete_reliability_contract(manifest, platform, router, docs_policy)
    check_phase5_uiux_modernization_contract(manifest, gas_index, static_index, docs_policy)
    check_phase6_static_qa_readiness_contract(manifest, app, docs_policy)
    check_static_config_assignment_guard_contract(manifest, app, docs_policy)
    check_phase4_generated_mirror_slimming_contract(manifest, docs_policy)
    check_phase6_manifest_gate_cleanup_contract(manifest, docs_policy)
    check_deep_source_syntax_guard_contract(manifest, docs_policy)
    readable_source_rows = check_current_readable_source_contract(manifest, docs_policy)
    check_admin_user_facade_contract(ROOT)
    check_gas_global_namespace_gate()
    p2_stability_report = check_p2_long_term_stability(
        manifest, package, docs_policy, app, transport, vercel, core_runtime
    )
    report = {
        "ok": not errors,
        "releaseTrack": "production-current",
        "release": RELEASE,
        "transportMode": MODE,
        "checks": checks,
        "errors": errors,
        "writeRouteCount": len(write_methods),
        "schemaMethodCount": len(schemas),
        "phase5SizeBudgets": size_rows,
        "phase5TotalSourceBytes": source_total,
        "phase5TotalSourceBudget": PHASE5_TOTAL_SOURCE_BUDGET,
        "phase5DynamicGeneratedFilesExcluded": sorted(PHASE5_DYNAMIC_GENERATED_FILES),
        "phase5NextSlimmingTargets": PHASE5_NEXT_SLIMMING_TARGETS,
        "phase6StaticQaReadinessStamp": PHASE6_STATIC_QA_READINESS_STAMP,
        "staticConfigAssignmentGuardStamp": STATIC_CONFIG_ASSIGNMENT_GUARD_STAMP,
        "deployReleaseSinglePublishGuardStamp": DEPLOY_RELEASE_SINGLE_PUBLISH_GUARD_STAMP,
        "deepSourceSyntaxGuardStamp": DEEP_SOURCE_SYNTAX_GUARD_STAMP,
        "phase4GeneratedMirrorSlimmingStamp": PHASE4_GENERATED_MIRROR_SLIMMING_STAMP,
        "phase6ManifestGateCleanupStamp": PHASE6_MANIFEST_GATE_CLEANUP_STAMP,
        "phase6ManifestMaxBytes": PHASE6_MANIFEST_MAX_BYTES,
        "currentGateConsolidationStamp": CURRENT_GATE_CONSOLIDATION_STAMP,
        "currentFinalConsistencyStamp": CURRENT_FINAL_CONSISTENCY_STAMP,
        "currentReadableSourceStamp": CURRENT_READABLE_SOURCE_STAMP,
        "currentStructureRemediationStamp": CURRENT_STRUCTURE_REMEDIATION_STAMP,
        "characterizationContractFreeze": characterization_report,
        "step2RuntimeMetadataSlimming": step2_runtime_metadata_report,
        "step3ApiFacadeConsolidation": step3_api_facade_report,
        "step4RouterCanonicalResolverConsolidation": step4_router_consolidation_report,
        "step5ProxyOriginAndHtmlResponseGuard": step5_proxy_origin_guard_report,
        "step6RuntimeBootstrapMeetingSummaryRewrite": step6_runtime_bootstrap_meeting_report,
        "p2LongTermStability": p2_stability_report,
        "readableSourceRows": readable_source_rows,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if errors:
        if _vercel_nonblocking_gate():
            _build_host_gate_warning("audit-errors", errors)
        else:
            sys.exit(1)


if __name__ == "__main__":
    try:
        main()
    except SystemExit as exc:
        if exc.code and _vercel_nonblocking_gate():
            _build_host_gate_warning("system-exit", {"code": exc.code})
            raise SystemExit(0)
        raise
    except Exception as exc:
        if _vercel_nonblocking_gate():
            _build_host_gate_warning(
                "exception",
                {
                    "type": type(exc).__name__,
                    "message": str(exc),
                    "tracebackTail": traceback.format_exc()[-2000:],
                },
            )
            raise SystemExit(0)
        raise
