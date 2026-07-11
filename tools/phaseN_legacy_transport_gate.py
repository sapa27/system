#!/usr/bin/env python3
"""Current Production contract, ownership, security, and browser gate.

This file intentionally replaces accumulated historical phase gates with one
current-state verifier. It does not define application behavior or API routes.
"""
from __future__ import annotations

from pathlib import Path
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
PACKAGE = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
RELEASE = str(PACKAGE.get("release") or PACKAGE.get("releaseStamp") or "")
ASSET = str(PACKAGE.get("assetStamp") or "")
CURRENT_STAMP = "production-consolidated-single-owner-r36"
CANONICAL_API_OWNER = "gas-backend/Code_20_Router.gs::_routerCanonicalHandlerMap_"
CANONICAL_RUNTIME_OWNER = "gas-backend/Index.html + gas-backend/Scripts_*.html"

FROZEN_API_METHODS = "apiLogin apiSessionResume apiLogout apiSessionCheck getDeferredInclude apiBootstrap apiGetRouteContract apiGetPhase0ContractGate apiGetPhase1Contract apiGetPhase2Contract apiGetClientDataContract apiGetAppTerminology apiGetPhase5ReleaseReadiness apiIssueActionToken apiSaveCase apiDeleteCase apiGetCases apiGetCaseQuickSummary apiGetCaseReportOptions apiGetCaseContext apiGetCanonicalCaseBundle apiGetPhase4QaGate apiSearchCasesLite apiGetCaseReportExportRows apiGetPetitioners apiGetPetitionerRelatedCounts apiSavePetitioner apiDeletePetitioner apiGetPersonnelComms apiGetPersonnelOps apiGetPersonnelStaffs apiGetPersonnelSubcommittees apiGetPersonnelDirectoryBundle apiGetPeoplePageBundle apiGetSalarySettings apiSavePersonnelComm apiSavePersonnelOp apiSavePersonnelStaff apiSavePersonnelSubcommittee apiDeletePersonnelComm apiDeletePersonnelOp apiDeletePersonnelStaff apiDeletePersonnelSubcommittee apiGetMeetingLookupOptions apiGetMeetingHistory apiListCommitteeMeetings apiGetCommitteeMeetingSystem apiGetCommitteeMeetingSystemSpec apiSearchMeetingAgendaCases apiGetCommitteeMeetingPrintBundle apiSaveCommitteeMeetingSystem apiDeleteCommitteeMeetingSystem apiSaveSalarySettings apiSaveMeetingLog apiDeleteMeetingLog apiGetLetters apiGetAllLettersWithCaseInfo apiSaveLetter apiDeleteLetter apiAuditMeetingData apiExportMeetingDuplicateAuditCsv apiCleanupMeetingData apiGetTracking apiBudgetListByFY apiBudgetListByFYFast apiBudgetGetSummary apiBudgetGetFiscalYears apiBudgetGetSubcommitteeOptions apiBudgetGetImportForEdit apiBudgetGetTypeSummaryByFY apiBudgetSaveImport apiBudgetDeleteImport apiGetDashboardBundle apiGetThailandLocations apiSearchLookup apiSearch apiAdminListUsers apiAdminSaveUser apiAdminDeleteUser apiAdminListSubcommittees apiAdminSaveSubcommittee apiAdminDeleteSubcommittee apiBudgetAdminListYearSettingsAll apiBudgetAdminSaveYearSettingsRows apiAiAssistantAsk apiAiAssistantStartJob apiAiAssistantGetJob apiAiAssistantSummarizeCase apiSuggestCaseStatus apiSuggestCaseClassification apiSemanticSearch apiMeetingSmartSummary apiDraftReplyLetter apiExtractTrackingPdf apiExtractDocumentPdf apiGenerateExecutiveSummary apiPredictOverdueRisk apiPredictiveBudgeting apiAnalyzePersonnelWorkload apiAnalyzeWorkloadBottlenecks apiRecommendWorkloadDistribution apiCheckDuplicateCase apiDetectBudgetAnomalies apiGetDailyBriefing apiGenerateBudgetTrendSummary apiAiDashboardInsights apiExtractMeetingAgendaPdf apiChat".split()
FROZEN_WRITE_METHODS = "apiAdminDeleteSubcommittee apiAdminDeleteUser apiAdminSaveSubcommittee apiAdminSaveUser apiBudgetAdminSaveYearSettingsRows apiBudgetDeleteImport apiBudgetSaveImport apiCleanupMeetingData apiDeleteCase apiDeleteCommitteeMeetingSystem apiDeleteLetter apiDeleteMeetingLog apiDeletePersonnelComm apiDeletePersonnelOp apiDeletePersonnelStaff apiDeletePersonnelSubcommittee apiDeletePetitioner apiSaveCase apiSaveCommitteeMeetingSystem apiSaveLetter apiSaveMeetingLog apiSavePersonnelComm apiSavePersonnelOp apiSavePersonnelStaff apiSavePersonnelSubcommittee apiSavePetitioner apiSaveSalarySettings".split()
FROZEN_PUBLIC_METHODS = "apiGetPhase0ContractGate apiGetPhase1Contract apiGetPhase2Contract apiGetRouteContract apiLogin apiSessionCheck apiSessionResume".split()
ROUTE_SHA256 = "de5c16d36b912ec4267787e225ec029b77c5fb0bd0052781e6f9d51e4afc9f89"
WRITE_SCHEMA_SHA256 = "a62622facc8e9c97ebfca4bd3bf081597a2bd3fcdbaef1fffefa5ef8f9ed475b"
PROXY_SHA256 = "3ae9aa68719b1ea7925c7b1013b4e4396e9683e7476fa2cf625af1a7627227c4"
UI_TEMPLATE_SHA256 = "76dcadd48639fd1f7876a90ea9cf51d07cf5a8eb2709bbee34ab6a6b1773d518"
UI_TEMPLATE_COUNT = 11
PAGE_API_AGGREGATE_SHA256 = "85a63ccebf265999a76a3e48554c2ed870b0f659f2d28a356d2af6272a80d254"
EXPECTED_SOURCE_FILES = 38
EXPECTED_BUILD_FILES = 53
GENERATED_FRONTEND = [
    "github-pages/vercel-env.generated.js",
    "github-pages/app-index-foundation-pre-vue.js",
    "github-pages/app-index-foundation-after-vue.js",
    "github-pages/app-index-foundation-after-swal.js",
    "github-pages/app-index-bootstrap.js",
    "github-pages/critical-login-runtime.js",
]
SIZE_BUDGETS = {
    "gas-backend/Scripts_Core_Runtime.html": 560000,
    "gas-backend/Scripts_Page_Meeting.html": 320000,
    "gas-backend/Code_30_Domain_Cases.gs": 420000,
    "gas-backend/Code_32_Domain_Budget.gs": 300000,
    "gas-backend/Scripts_Page_Budget.html": 230000,
    "gas-backend/Index.html": 370000,
    "github-pages/index.html": 250000,
    "github-pages/critical-login-runtime.js": 150000,
}


def read(rel: str) -> str:
    path = ROOT / rel
    return path.read_text(encoding="utf-8", errors="ignore") if path.exists() else ""


def compact(value: str) -> str:
    return re.sub(r"\s+", "", str(value or "")).replace(":true", ":!0").replace("=true", "=!0").replace(":false", ":!1").replace("=false", "=!1")


def contains_code(source: str, token: str) -> bool:
    return compact(token) in compact(source)


def sha256_text(value: str) -> str:
    return hashlib.sha256(str(value or "").encode("utf-8")).hexdigest()


def function_body(text: str, name: str) -> str:
    match = re.search(r"function\s+" + re.escape(name) + r"\s*\([^)]*\)\s*\{", text or "")
    if not match:
        return ""
    start = match.end() - 1
    depth = 0
    quote = None
    escaped = False
    line_comment = False
    block_comment = False
    i = start
    while i < len(text):
        char = text[i]
        nxt = text[i + 1] if i + 1 < len(text) else ""
        if line_comment:
            if char == "\n": line_comment = False
            i += 1; continue
        if block_comment:
            if char == "*" and nxt == "/": block_comment = False; i += 2; continue
            i += 1; continue
        if quote:
            if escaped: escaped = False
            elif char == "\\": escaped = True
            elif char == quote: quote = None
            i += 1; continue
        if char == "/" and nxt == "/": line_comment = True; i += 2; continue
        if char == "/" and nxt == "*": block_comment = True; i += 2; continue
        if char in ("'", '"', "`"): quote = char; i += 1; continue
        if char == "{": depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0: return text[start + 1:i]
        i += 1
    return ""


def route_rows(router: str):
    rows = []
    pattern = re.compile(r'\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]*)"(?:,\s*"([^"]*)")?(?:,\s*([^\]\s,]+))?\]')
    for owner in ("_routerPhase1CoreRouteTuples_", "_routerAdminRoutes_", "_routerAiRoutes_"):
        for match in pattern.finditer(function_body(router, owner)):
            names, role, domain, flags, entity, limit = match.groups()
            for method in names.split("|"):
                rows.append({"method": method.strip(), "role": role, "domain": domain, "flags": flags, "entity": entity or "", "limit": limit or ""})
    return rows


def api_methods(router: str):
    return [row["method"] for row in route_rows(router)]


def write_methods(router: str):
    return sorted({row["method"] for row in route_rows(router) if "w" in row["flags"]})


def public_methods(router: str):
    return sorted({row["method"] for row in route_rows(router) if row["role"] == "public"})


def schema_methods(router: str):
    body = function_body(router, "_routerPhaseKWriteSchemaByMethod_")
    return sorted(set(x or y for x, y in re.findall(r'(?:"(api[A-Za-z0-9_]+)"|(api[A-Za-z0-9_]+))\s*:', body)))


def proxy_methods(common: str):
    match = re.search(r"const\s+PROXY_ALLOWED_METHODS\s*=\s*Object\.freeze\(\s*\[([\s\S]*?)\]\s*\)", common or "")
    return re.findall(r'"([^"]+)"', match.group(1) if match else "")


def scan_balanced(text: str, start: int, opening: str, closing: str):
    depth = 0; quote = None; escaped = False
    for index in range(start, len(text or "")):
        char = text[index]
        if quote:
            if escaped: escaped = False
            elif char == "\\": escaped = True
            elif char == quote: quote = None
            continue
        if char in ("'", '"', "`"): quote = char; continue
        if char == opening: depth += 1
        elif char == closing:
            depth -= 1
            if depth == 0: return text[start + 1:index]
    return ""


def named_block(text: str, name: str, opening: str, closing: str):
    match = re.search(r"(?<![A-Za-z0-9_$])" + re.escape(name) + r"\s*:\s*" + re.escape(opening), text or "")
    if not match: return ""
    start = (text or "").find(opening, match.start())
    return scan_balanced(text or "", start, opening, closing)


def js_strings(text: str):
    return [bytes(value, "utf-8").decode("unicode_escape") if "\\" in value else value for _, value in re.findall(r"(['\"])((?:\\.|(?!\1).)*)\1", text or "", re.S)]


def top_object_blocks(text: str):
    rows=[]; depth=0; quote=None; escaped=False; start=None
    for index,char in enumerate(text or ""):
        if quote:
            if escaped: escaped=False
            elif char=="\\": escaped=True
            elif char==quote: quote=None
            continue
        if char in ("'",'"',"`"): quote=char; continue
        if char=="{":
            if depth==0: start=index
            depth+=1
        elif char=="}":
            depth-=1
            if depth==0 and start is not None: rows.append(text[start+1:index]); start=None
    return rows


def route_hash(router: str):
    signature = "\n".join("|".join(row[key] for key in ("method","role","domain","flags","entity","limit")) for row in route_rows(router))
    return sha256_text(signature)


def write_schema_hash(router: str):
    body = function_body(router, "_routerPhaseKWriteSchemaByMethod_")
    schemas = {}
    for method in FROZEN_WRITE_METHODS:
        method_body = named_block(body, method, "{", "}")
        required = named_block(method_body, "required", "[", "]")
        rows=[]
        for item in top_object_blocks(required):
            def sval(key):
                m=re.search(r"(?<![A-Za-z0-9_$])"+re.escape(key)+r"\s*:\s*(['\"])(.*?)\1", item, re.S)
                return m.group(2) if m else ""
            rows.append({"code":sval("code"),"message":sval("message"),"fields":js_strings(named_block(item,"fields","[","]")),"paths":js_strings(named_block(item,"paths","[","]"))})
        schemas[method]=rows
    return sha256_text(json.dumps(schemas,ensure_ascii=False,sort_keys=True,separators=(",",":")))


def extract_templates(source: str):
    return {m.group(1):m.group(2) for m in re.finditer(r'<script\b[^>]*\btype=["\']text/x-template["\'][^>]*\bid=["\']([^"\']+)["\'][^>]*>([\s\S]*?)</script>', source or "", re.I)}


def normalize_template(value: str):
    value=re.sub(r"<\?!=\s*getActiveLogoUrl_\(\)\s*\?>","__PARLIAMENT_LOGO__",value or "")
    value=re.sub(r"<\?=\s*getActiveLogoUrl_\(\)\s*\?>","__PARLIAMENT_LOGO__",value)
    def logo(match):
        tag=re.sub(r'src=(["\'])[^"\']*\1','src="__PARLIAMENT_LOGO__"',match.group(0),flags=re.I)
        return re.sub(r'(?:loading|decoding|fetchpriority)=(["\'])[^"\']*\1','',tag,flags=re.I)
    value=re.sub(r'<img\b[^>]*data-logo=(["\'])parliament\1[^>]*>',logo,value,flags=re.I)
    return re.sub(r"\s+","",value)


def ui_template_contract():
    source=read("gas-backend/Index.html")
    templates=extract_templates(source)
    live=source.find('id="app-live-region"'); start=source.rfind("<div",0,live) if live>=0 else -1; end=source.find('<script id="app-async-runtime-loader"')
    if start>=0 and end>start: signature=normalize_template(source[start:end])
    else: signature="\n".join(k+"="+normalize_template(v) for k,v in sorted(templates.items()))
    return len(templates),sha256_text(signature)


def page_api_hash():
    frozen=set(FROZEN_API_METHODS); rows={}
    for path in sorted((ROOT/"gas-backend").glob("Scripts_*.html")):
        methods=sorted(set(re.findall(r"\b(?:api[A-Z][A-Za-z0-9_]*|getDeferredInclude)\b",path.read_text(encoding="utf-8",errors="ignore"))) & frozen)
        rows[path.name]={"count":len(methods),"sha256":sha256_text("\n".join(methods))}
    return sha256_text(json.dumps(rows,sort_keys=True,separators=(",",":")))


def top_level_symbols(text: str):
    depth=0; quote=None; escaped=False; line=False; block=False; depth_at=[0]*(len(text)+1); i=0
    while i<len(text):
        depth_at[i]=depth; char=text[i]; nxt=text[i+1] if i+1<len(text) else ""
        if line:
            if char=="\n": line=False
            i+=1; continue
        if block:
            if char=="*" and nxt=="/": block=False; i+=2; continue
            i+=1; continue
        if quote:
            if escaped: escaped=False
            elif char=="\\": escaped=True
            elif char==quote: quote=None
            i+=1; continue
        if char=="/" and nxt=="/": line=True; i+=2; continue
        if char=="/" and nxt=="*": block=True; i+=2; continue
        if char in ('"',"'","`"): quote=char; i+=1; continue
        if char=="{": depth+=1
        elif char=="}": depth-=1
        i+=1
    out=[]
    for match in re.finditer(r"function\s+([A-Za-z_$][\w$]*)\s*\(",text or ""):
        if depth_at[match.start()]==0: out.append((match.group(1),"function"))
    return out


def gas_collision_errors():
    by_name={}; findings=[]
    for path in sorted((ROOT/"gas-backend").glob("*.gs")):
        text=path.read_text(encoding="utf-8",errors="ignore"); rel=path.relative_to(ROOT).as_posix(); same={}
        for match in re.finditer(r"(?m)^function\s+([A-Za-z_$][\w$]*)\s*\(",text): same.setdefault(match.group(1),[]).append(text.count("\n",0,match.start())+1)
        for name,lines in same.items():
            if len(lines)>1: findings.append(f"same-file function collision {name} {rel}:{','.join(map(str,lines))}")
        for name,kind in top_level_symbols(text): by_name.setdefault(name,[]).append((rel,kind))
    allowed={"__APP_GLOBAL__","AppDomain","AppInfra","AppSecurity","AppBackendMiddleware"}
    for name,hits in by_name.items():
        if name not in allowed and len({x[0] for x in hits})>1: findings.append(f"cross-file function collision {name}: {hits}")
    return findings


def generated_check():
    result=subprocess.run([sys.executable,str(ROOT/"tools/generate_vercel_env.py"),"--check"],cwd=ROOT,capture_output=True,text=True)
    return result.returncode==0,(result.stderr or result.stdout)[-1200:]


def active_release_drift():
    pattern=re.compile(r"commission-v1\.2-gas-hosted-production-\d{4}-\d{2}-\d{2}-r\d+")
    paths=list((ROOT/"gas-backend").glob("*"))+list((ROOT/"github-pages").glob("*"))+list((ROOT/"api").glob("*.js"))+[ROOT/"vercel.json",ROOT/"package.json"]
    drift=[]
    for path in paths:
        if not path.is_file(): continue
        found=set(pattern.findall(path.read_text(encoding="utf-8",errors="ignore")))
        if found and found!={RELEASE}: drift.append(f"{path.relative_to(ROOT)}={sorted(found)}")
    return drift


def packaged_files():
    return [p for p in ROOT.rglob("*") if p.is_file() and "__pycache__" not in p.parts and not p.name.endswith(".pyc")]


def current_checks(strict: bool = False):
    checks=[]; errors=[]
    def require(name,condition,detail=""):
        row={"name":name,"ok":bool(condition),"detail":detail}; checks.append(row)
        if not condition: errors.append(f"{name}: {detail}")

    package=PACKAGE; scripts=package.get("scripts") or {}; manifest=json.loads(read("TECH_DEBT_MANIFEST.json") or "{}")
    router=read("gas-backend/Code_20_Router.gs"); common=read("api/_gasProxyCommon.js"); app=read("github-pages/app-config.js")
    transport=read("github-pages/github-gas-transport.js"); core=read("gas-backend/Scripts_Core_Runtime.html"); critical=read("gas-backend/Scripts_Critical_Login_Runtime.html")
    index=read("gas-backend/Index.html"); static_index=read("github-pages/index.html"); meeting=read("gas-backend/Scripts_Page_Meeting.html")
    budget=read("gas-backend/Scripts_Page_Budget.html"); dashboard=read("gas-backend/Scripts_Page_Dashboard.html"); report=read("gas-backend/Scripts_Page_ReportTrack.html")
    cases=read("gas-backend/Code_30_Domain_Cases.gs"); budget_backend=read("gas-backend/Code_32_Domain_Budget.gs"); people=read("gas-backend/Code_33_Domain_People.gs")
    routes=api_methods(router); writes=write_methods(router); publics=public_methods(router); schemas=schema_methods(router); proxies=proxy_methods(common)

    require("release owner", package.get("commissionReleaseOwner")=="package.json::release" and package.get("releaseStamp")==RELEASE and package.get("assetStamp")==ASSET, RELEASE)
    require("single canonical API owner", manifest.get("apiContractOwner")==CANONICAL_API_OWNER and manifest.get("apiContract",{}).get("owner")==CANONICAL_API_OWNER, str(manifest.get("apiContractOwner")))
    require("API contract 108/108", routes==FROZEN_API_METHODS, json.dumps({"actual":len(routes),"expected":len(FROZEN_API_METHODS),"missing":sorted(set(FROZEN_API_METHODS)-set(routes)),"unexpected":sorted(set(routes)-set(FROZEN_API_METHODS))}))
    require("write routes 27/27", writes==sorted(FROZEN_WRITE_METHODS), json.dumps({"actual":len(writes),"expected":len(FROZEN_WRITE_METHODS)}))
    require("write schemas 27/27", schemas==sorted(FROZEN_WRITE_METHODS), json.dumps({"actual":len(schemas),"expected":len(FROZEN_WRITE_METHODS)}))
    require("public routes 7/7", publics==sorted(FROZEN_PUBLIC_METHODS), json.dumps(publics))
    require("proxy allowlist equals router", proxies==FROZEN_API_METHODS, json.dumps({"actual":len(proxies),"expected":len(FROZEN_API_METHODS)}))
    require("manifest API list generated", manifest.get("contractFreeze",{}).get("apiMethods")==routes, "manifest contractFreeze.apiMethods")
    require("route characterization frozen", route_hash(router)==ROUTE_SHA256, route_hash(router))
    require("write schema characterization frozen", write_schema_hash(router)==WRITE_SCHEMA_SHA256, write_schema_hash(router))
    require("proxy characterization frozen", sha256_text("\n".join(proxies))==PROXY_SHA256, sha256_text("\n".join(proxies)))
    ui_count,ui_hash=ui_template_contract(); require("UI template contract frozen", ui_count==UI_TEMPLATE_COUNT and ui_hash==UI_TEMPLATE_SHA256, json.dumps({"count":ui_count,"hash":ui_hash}))
    require("page API footprints frozen", page_api_hash()==PAGE_API_AGGREGATE_SHA256, page_api_hash())

    gen_ok,gen_detail=generated_check(); require("generated artifacts match canonical source",gen_ok,gen_detail)
    for source in sorted((ROOT/"gas-backend").glob("Scripts_*.html")):
        mirror=ROOT/"github-pages/partials"/source.name
        mirror_text=re.sub(r"^<!-- GENERATED MIRROR:[\s\S]*?-->\s*","",mirror.read_text(encoding="utf-8",errors="ignore")) if mirror.exists() else ""
        require("runtime mirror "+source.name,mirror.exists() and mirror_text==source.read_text(encoding="utf-8"),str(mirror.relative_to(ROOT)))
    require("post-Swal bootstrap is generated",(ROOT/"github-pages/app-index-foundation-after-swal.js").exists() and manifest.get("singleSourceGeneration",{}).get("postSwalFoundationGenerated") is True,"generated from Index.html")
    require("critical runtime has one static owner",static_index.count("critical-login-runtime.js")==1 and "Scripts_Critical_Login_Runtime" not in static_index and contains_code(app,"appCritical:{files:[]}"),"critical-login-runtime.js")

    build=scripts.get("build",""); require("one build contract owner",build.count("npm run check:contracts")==1 and "npm run check:architecture" not in build and "npm run check:stability" not in build,build)
    aliases=["check:p0-correctness","check:p1-performance","check:p2-lifecycle","check:architecture","check:stability","check:consolidation","check:workflow","test:api-facade","test:router-consolidation","test:runtime-bootstrap-meeting"]
    require("compatibility commands delegate to one owner",all(scripts.get(name)=="npm run check:contracts" for name in aliases),json.dumps({name:scripts.get(name) for name in aliases}))
    require("strict audit has one current chain",scripts.get("audit:strict","").startswith("npm run build &&") and "phaseG_security_gate.py --strict" in scripts.get("audit:strict","") and "phaseN_legacy_transport_gate.py --strict" in scripts.get("audit:strict",""),scripts.get("audit:strict",""))

    require("GAS direct transport owner",".apiRouter({" in critical and "criticalGasHostAvailable_" in critical and "production-gas-hosted-google-script-run-api-router" in critical,"Scripts_Critical_Login_Runtime")
    require("Vercel proxy transport owner","runVercelApiProxy" in transport and "/api/gas" in transport and contains_code(transport,"__vercelApiProxyOnly=true"),"github-gas-transport")
    forbidden=["function runJsonpApi","function runGasViaClient","function runLoginPost","document.createElement('iframe')","GAS_IFRAME_TRANSPORT_REQUEST"]
    require("legacy browser transports removed",not [x for x in forbidden if x in transport],str([x for x in forbidden if x in transport]))
    require("frontend response cache disabled",contains_code(app,"clientApiCacheEnabled:false") and contains_code(app,'clientApiCacheOwner:"backend-router-cache"') and "clientApiCacheTtlSecMap" not in app,"router-owned cache")
    require("single write refresh owner","root.AppDirtyRefreshOwner =" in core and contains_code(core,'pages.__writeRefreshBrokerOwner="AppDirtyRefreshOwner.Current"') and "root.AppWriteRefreshBroker =" not in core,"AppDirtyRefreshOwner")
    require("protected actions use one in-flight guard","var actionInFlight = pages.__actionInFlight" in core and "actionInFlight[busyKey]" in core and "aria-busy" in core,"global action guard")
    require("page lifecycle state machine","window.AppPageHealth" in index and "routing" in index and "runtime-loading" in index and "ready" in index and "error" in index,"AppPageHealth")
    require("navigation uses one route resolver","APP_ROUTE_MAP" in index and "appRouteTargetFromNav" in index and "schedulePageActivation" in index and "routeTarget = routeMap" not in index,"Index navigation owner")
    require("blocking Vue CDN removed","cdn.jsdelivr.net/npm/vue" not in index and "unpkg.com/vue" not in index,"no external Vue runtime")

    require("case semantic owners separated","function _caseSchemaFromRow_(row)" in cases and "function _caseFindIndexedExisting_(input)" in cases and not re.search(r"(?m)^function\s+_r28\s*\(",cases),"Cases domain")
    require("read failures are explicit",all(token in cases+budget_backend+people for token in ["CASE_REPORT_READ_FAILED","BUDGET_READ_FAILED","PEOPLE_PETITIONER_READ_FAILED"]),"Cases/Budget/People")
    projection=cases[cases.find("function _caseReportProjectedMatrix_(sh)"):cases.find("function _z37",cases.find("function _caseReportProjectedMatrix_(sh)"))]
    require("projected report cache owner","case_report_projection_r33_" in cases and "getDataRange().getValues()" not in projection and "allowFullMatrix: !0" not in projection,"projected MainData read")
    require("shared upload policy","window.AppUploadPolicy = window.AppUploadPolicy ||" in core and "root.AppUploadPolicy.pdfLimitBytes()" in dashboard and "root.AppUploadPolicy.pdfLimitBytes()" in meeting,"AppUploadPolicy")
    require("meeting/search/budget workflow guards","__APP_COMMITTEE_MEETING_BIND_READY__" in meeting and "meeting.editSeed" in report and 'showBudgetTab: "budget"' in critical,"workflow readiness")

    collisions=gas_collision_errors(); require("GAS global namespace collision-free",not collisions," | ".join(collisions[:10]))
    drift=active_release_drift(); require("active runtime release coherent",not drift," | ".join(drift))
    require("no Python bytecode in package",not list((ROOT/"tools").glob("__pycache__")) and not list((ROOT/"tools").glob("*.pyc")),"tools/__pycache__")

    vercel=json.loads(read("vercel.json") or "{}")
    all_headers={item.get("source"): {h.get("key","").lower():h.get("value","") for h in item.get("headers",[])} for item in vercel.get("headers",[])}
    global_headers=all_headers.get("/(.*)",{}); diag_headers=all_headers.get("/diagnostic.html",{})
    diagnostic=read("github-pages/diagnostic.html")
    require("diagnostic is read-only",'type="password"' not in diagnostic and "apiLogin" not in diagnostic and "diagUser" not in diagnostic,"no credentials")
    require("diagnostic is not indexable or frameable","noindex" in diagnostic.lower() and diag_headers.get("x-frame-options","").upper()=="DENY" and "noindex" in diag_headers.get("x-robots-tag","").lower(),json.dumps(diag_headers))
    csp=global_headers.get("content-security-policy",""); require("proxy-only CSP","frame-src 'none'" in csp and "connect-src 'self'" in csp and "object-src 'none'" in csp,csp)
    require("cross-origin resource policy",global_headers.get("cross-origin-resource-policy")=="same-origin",str(global_headers.get("cross-origin-resource-policy")))

    for rel,budget_bytes in SIZE_BUDGETS.items():
        path=ROOT/rel; require("size budget "+rel,path.exists() and path.stat().st_size<=budget_bytes,f"{path.stat().st_size if path.exists() else -1}/{budget_bytes}")
    files=packaged_files(); require("build output file count",len(files)==EXPECTED_BUILD_FILES,f"{len(files)}/{EXPECTED_BUILD_FILES}")
    require("total source/build budget",sum(path.stat().st_size for path in files)<=7_000_000,str(sum(path.stat().st_size for path in files)))

    result={"ok":not errors,"stamp":CURRENT_STAMP,"release":RELEASE,"canonicalRuntimeOwner":CANONICAL_RUNTIME_OWNER,"routeCount":len(routes),"writeRouteCount":len(writes),"writeSchemaCount":len(schemas),"sourceFileCount":EXPECTED_SOURCE_FILES,"buildOutputFileCount":len(files),"checks":checks,"errors":errors}
    return result


def p3_security_checks():
    full=current_checks(False)
    names=("release owner","single canonical API owner","API contract 108/108","proxy allowlist equals router","manifest API list generated","Vercel proxy transport owner","legacy browser transports removed","diagnostic is read-only","diagnostic is not indexable or frameable","proxy-only CSP","cross-origin resource policy","active runtime release coherent")
    selected=[row for row in full["checks"] if row["name"] in names]
    errors=[f'{row["name"]}: {row["detail"]}' for row in selected if not row["ok"]]
    return {"ok":not errors,"stamp":CURRENT_STAMP,"release":RELEASE,"routeCount":full["routeCount"],"proxyMethodCount":len(proxy_methods(read("api/_gasProxyCommon.js"))),"diagnosticReadOnly":not any("diagnostic" in error for error in errors),"checks":selected,"errors":errors}


def run_p0_browser_smoke():
    try:
        from playwright.sync_api import sync_playwright
    except Exception as exc:
        raise RuntimeError("P0_BROWSER_SMOKE_PLAYWRIGHT_REQUIRED:" + str(exc))
    chromium = shutil.which("chromium") or shutil.which("chromium-browser") or shutil.which("google-chrome")
    if not chromium:
        raise RuntimeError("P0_BROWSER_SMOKE_CHROMIUM_NOT_FOUND")
    site = ROOT / "github-pages"
    html = (site / "index.html").read_text(encoding="utf-8", errors="ignore")
    execution_scripts = []

    def collect_script(match):
        attrs = match.group(1) or ""
        body = match.group(2) or ""
        if re.search(r'type\s*=\s*["\']text/x-template["\']', attrs, re.I):
            return match.group(0)
        src_match = re.search(r'src\s*=\s*["\']([^"\']+)["\']', attrs, re.I)
        if src_match:
            src = src_match.group(1)
            if re.match(r"https?://", src, re.I):
                return ""
            rel = src.split("?", 1)[0].lstrip("./")
            path = site / rel
            if path.exists():
                execution_scripts.append(path.read_text(encoding="utf-8", errors="ignore"))
            return ""
        if body.strip():
            execution_scripts.append(body)
        return ""

    clean_html = re.sub(r"<script\b([^>]*)>([\s\S]*?)</script>", collect_script, html, flags=re.I)
    clean_html = re.sub(r'<link[^>]+href=["\']https://[^"\']+["\'][^>]*>', '', clean_html, flags=re.I)
    partials = {}
    partial_dir = site / "partials"
    if partial_dir.exists():
        for path in partial_dir.glob("*.html"):
            partials[path.name] = path.read_text(encoding="utf-8", errors="ignore")
    mock_js = f'''
(function(){{
  var release={json.dumps(RELEASE)},asset={json.dumps(ASSET)},partials={json.dumps(partials, ensure_ascii=False)};
  window.APP_CONFIG=Object.assign({{}},window.APP_CONFIG||{{}},{{
    vercelApiProxyUrl:"https://commission-smoke.test/api/gas",
    vercelLoginProxyUrl:"https://commission-smoke.test/api/login",
    vercelPublicConfigProxyUrl:"https://commission-smoke.test/api/public-config",
    hostingTarget:"vercel-api-proxy",
    transportMode:"production-vercel-proxy-only-no-jsonp-no-bridge-no-login-iframe"
  }});
  function jsonResponse(obj){{return Promise.resolve(new Response(JSON.stringify(obj),{{status:200,headers:{{"Content-Type":"application/json"}}}}));}}
  function textResponse(txt){{return Promise.resolve(new Response(String(txt||""),{{status:200,headers:{{"Content-Type":"text/html; charset=utf-8"}}}}));}}
  function rowsData(extra){{return Object.assign({{rows:[],items:[],records:[],data:[],meetings:[],letters:[],cases:[],total:0,totalRecords:0,loadOk:true,degraded:false}},extra||{{}});}}
  window.fetch=function(input,init){{
    var url=String(input&&input.url||input||"");
    var clean=url.split('?')[0],file=clean.substring(clean.lastIndexOf('/')+1);
    if(partials[file])return textResponse(partials[file]);
    if(url.indexOf('/api/public-config')>=0)return jsonResponse({{ok:true,releaseStamp:release,assetStamp:asset,logoUrl:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"}});
    if(url.indexOf('/api/login')>=0){{
      var login={{user:{{id:"P0",username:"p0",name:"P0 Smoke",role:"admin"}},token:"p0-token",csrfToken:"p0-csrf",routeContractDeferred:true,dataContractDeferred:true}};
      return jsonResponse(Object.assign({{ok:true,data:login}},login));
    }}
    if(url.indexOf('/api/gas')>=0){{
      var body={{}};try{{body=JSON.parse(init&&init.body||"{{}}");}}catch(_e){{}}
      var method=String(body.method||"");
      if(method==='apiSessionResume'||method==='apiSessionCheck')return jsonResponse({{ok:false,error:"NO_SESSION",errorCode:"NO_SESSION",method:method}});
      var payload=rowsData({{source:"p0-browser-smoke",summary:{{}},statusCounts:{{}},cards:[],byPlan:[],plans:[],fiscalYears:[2569],years:[2569],currentFy:"2569",defaultFy:"2569",user:{{id:"P0",role:"admin"}},routeContractDeferred:true,dataContractDeferred:true}});
      if(method==='apiGetRouteContract')payload={{methods:[],routes:[],writeMethods:[],publicMethods:[]}};
      if(method==='apiBootstrap')payload={{user:{{id:"P0",role:"admin"}},routeContractDeferred:true,dataContractDeferred:true}};
      return jsonResponse(Object.assign({{ok:true,method:method,data:payload}},payload));
    }}
    return Promise.resolve(new Response("",{{status:404}}));
  }};
}})();
'''
    errors = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True,
            executable_path=chromium,
            args=["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
        )
        page = browser.new_page()
        page.on("pageerror", lambda exc: errors.append(str(exc)))
        try:
            page.set_content(clean_html, wait_until="domcontentloaded", timeout=15000)
            page.evaluate(mock_js)
            console_messages = []
            page.on("console", lambda msg: console_messages.append(f"{msg.type}: {msg.text}"))
            for code in execution_scripts:
                page.add_script_tag(content=code)
            page.evaluate("""() => {
              document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
              window.dispatchEvent(new Event('load'));
            }""")
            page.wait_for_selector("#u_name", state="attached", timeout=10000)
            page.fill("#u_name", "p0")
            page.fill("#u_pass", "p0")
            page.click("#btn-login-action", force=True)
            try:
                page.wait_for_function("window.__APP_CORE_RUNTIME_LOADED__ === true", timeout=15000)
            except Exception as exc:
                diag = page.evaluate("""() => ({
                  coreLoaded: window.__APP_CORE_RUNTIME_LOADED__,
                  appCritical: !!window.AppCritical,
                  appTransport: window.AppTransport ? { owner: window.AppTransport.__owner, mode: window.AppTransport.transportMode, vercel: window.AppTransport.__vercelApiProxyOnly, gas: window.AppTransport.__gasHostedDirect } : null,
                  appApi: !!window.AppApi,
                  loginError: (document.querySelector('#login-error') || document.querySelector('[data-login-error]') || {}).textContent || '',
                  bodyText: (document.body && document.body.innerText || '').slice(0,1200),
                  bootHealth: window.__APP_P2_BOOT_HEALTH__ || null
                })""")
                raise RuntimeError("P0_BROWSER_CORE_TIMEOUT:" + json.dumps(diag, ensure_ascii=False) + " | PAGE_ERRORS=" + " | ".join(errors[:8]) + " | CONSOLE=" + " | ".join(console_messages[-12:])) from exc
            page.wait_for_selector("#side", state="attached", timeout=5000)

            def route(nav_id, selector):
                page_id = {
                    "dash": "dashboard",
                    "committee-meeting": "committee-meeting",
                    "petitioner": "petitioner",
                    "search": "search",
                    "meeting": "meeting",
                    "budget": "budget",
                }.get(nav_id, nav_id)
                page.locator(f'[data-nav="{nav_id}"]').first.click(force=True)
                page.wait_for_selector(selector, state="attached", timeout=8000)
                page.wait_for_function(
                    """pageId => {
                      const health = window.AppPageHealth;
                      const record = health && typeof health.get === 'function' ? health.get(pageId) : null;
                      return !!record && /^(ready|degraded)$/.test(String(record.state || ''));
                    }""",
                    arg=page_id,
                    timeout=8000,
                )
                page.wait_for_timeout(150)

            route("dash", "#p-dash")
            parent = page.locator('[data-bs-target="#caseMenu"]').first
            if parent.count():
                initial_open = page.locator("#caseMenu").evaluate("el => el.classList.contains('show')")
                parent.click(force=True)
                page.wait_for_function("expected => document.querySelector('#caseMenu') && document.querySelector('#caseMenu').classList.contains('show') === expected", arg=not initial_open, timeout=1500)
                parent.click(force=True)
                page.wait_for_function("expected => document.querySelector('#caseMenu') && document.querySelector('#caseMenu').classList.contains('show') === expected", arg=initial_open, timeout=1500)
            route("search", "#p-search")
            route("meeting", "#p-meeting")
            route("committee-meeting", "#p-committee-meeting")
            route("budget", "#p-budget")
            budget_tab = page.locator('#p-budget [data-action="showBudgetTab"]').first
            if budget_tab.count():
                budget_tab.click(force=True)
                page.wait_for_timeout(150)
            route("petitioner", "#p-petitioner")
            fatal = [err for err in errors if re.search(r"ReferenceError|TypeError|is not defined|Unhandled", err, re.I)]
            if fatal:
                raise RuntimeError("P0_BROWSER_RUNTIME_ERRORS:" + " | ".join(fatal[:8]))
            lifecycle = page.evaluate("""() => window.AppPageHealth && typeof window.AppPageHealth.snapshot === 'function' ? window.AppPageHealth.snapshot() : null""")
            if not isinstance(lifecycle, dict) or not isinstance(lifecycle.get("pages"), dict):
                raise RuntimeError("P2_BROWSER_LIFECYCLE_SNAPSHOT_MISSING")
            bad_states = {
                key: value.get("state")
                for key, value in lifecycle.get("pages", {}).items()
                if isinstance(value, dict) and value.get("state") == "error"
            }
            if bad_states:
                raise RuntimeError("P2_BROWSER_LIFECYCLE_ERRORS:" + json.dumps(bad_states, ensure_ascii=False))
            return {
                "ok": True,
                "workflows": ["login", "dashboard", "submenu", "search", "meeting", "committee", "budget", "petitioner"],
                "engine": Path(chromium).name,
                "pageErrors": errors,
                "lifecycleSequence": lifecycle.get("sequence", 0),
                "lifecyclePages": sorted(lifecycle.get("pages", {}).keys()),
            }
        finally:
            browser.close()


def emit(result):
    print(json.dumps(result,ensure_ascii=False,indent=2))
    if not result.get("ok"): raise SystemExit(1)


def main():
    if "--p0-browser-smoke" in sys.argv:
        emit(run_p0_browser_smoke()); return
    if "--p3-release-security" in sys.argv:
        emit(p3_security_checks()); return
    emit(current_checks(strict="--strict" in sys.argv))


if __name__ == "__main__":
    main()
