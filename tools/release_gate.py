#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import json, re, sys

ROOT = Path(__file__).resolve().parents[1]
RELEASE = "commission-v1.1-phaseQ-runtime-slim-size-gate-2026-07-03-r1"
ASSET = "asset-manifest-commission-v1.1-phaseQ-runtime-slim-size-gate-2026-07-03-r1"
MODE = "phaseQ-vercel-proxy-only-runtime-slim-single-gate"
SCHEMA_STAMP = "phaseK-write-schema-unification-2026-07-02-r1"
CRITICAL_APIS = ["apiBudgetGetSummary","apiGetPetitioners","apiGetCommitteeMeetingSystem","apiSearchCasesLite","apiGetTracking","apiLogin"]
REQUIRED = [
    "vercel.json","package.json",".env.example","api/_gasProxyCommon.js","api/gas.js","api/login.js","api/public-config.js",
    "github-pages/vercel-env.generated.js","tools/generate_vercel_env.py","tools/sync_frontend_partials.py",
    "tools/release_gate.py","docs/PHASE_Q_RUNTIME_SLIM_SIZE_GATE.md","docs/SINGLE_SOURCE_POLICY.md",
    "OWNER_REGISTRY.json","TECH_DEBT_MANIFEST.json"
]
FORBIDDEN_SOURCE_TOKENS = [
    "function apiGithubBridgeCall(",
    "function apiGithubBridgePing(",
    "function _githubBridgeHtml_(",
    "function _githubRenderJsonpApi_(",
    "function _githubRenderFastLogin_(",
    "function _githubLoginPostHtml_(",
    "GAS_IFRAME_TRANSPORT_REQUEST",
    "GAS_IFRAME_TRANSPORT_RESPONSE",
    "GAS_LOGIN_POST_RESPONSE",
    "__githubFastLogin=1",
]
errors=[]; checks=[]

def read(rel:str)->str:
    p=ROOT/rel
    if not p.exists(): errors.append(f"missing file: {rel}"); return ""
    return p.read_text(encoding='utf-8', errors='ignore')

def ok(name, cond, detail=""):
    checks.append({"name":name,"ok":bool(cond),"detail":detail})
    if not cond: errors.append(f"{name}: {detail}")

def all_source_text()->str:
    chunks=[]
    for p in ROOT.rglob('*'):
        if p.is_file() and p.suffix.lower() in {'.html','.js','.gs','.py','.json','.md','.example'} and '__pycache__' not in p.parts:
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

def write_methods_from_router(router:str):
    methods=set(); body=[]
    for fname in ["_routerAdminRoutes_","_routerPhase1CoreRouteTuples_"]:
        m=re.search(r"function "+re.escape(fname)+r"\(\) \{(?P<body>[\s\S]*?)\n\}", router)
        if m: body.append(m.group('body'))
    for names, flags in re.findall(r'\["([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]*)"', '\n'.join(body)):
        if 'w' not in flags: continue
        for name in names.split('|'):
            name=name.strip()
            if name: methods.add(name)
    return sorted(methods)

def schema_methods(router:str):
    m=re.search(r"function _routerPhaseKWriteSchemaByMethod_\(\) \{(?P<body>[\s\S]*?)\n\}\nfunction _routerPhaseKSchemaForMethod_", router)
    return set(re.findall(r'"(api[A-Za-z0-9_]+)"\s*:', m.group('body') if m else ''))

def size_gate(owners:dict):
    limits = ((owners.get('sizeGate') or {}).get('maxBytes') or {})
    if not limits:
        ok('size gate configured', False, 'OWNER_REGISTRY.json.sizeGate.maxBytes missing')
        return {}
    actual={}
    for rel, limit in limits.items():
        p=ROOT/rel
        actual[rel]=p.stat().st_size if p.exists() else -1
        ok(f'size gate {rel}', p.exists() and actual[rel] <= int(limit), f"{actual[rel]} <= {limit}")
    return actual

def main():
    for rel in REQUIRED: ok(f"required file {rel}", (ROOT/rel).exists(), rel)
    alltext=all_source_text()
    platform=read('gas-backend/Code_00_PlatformCore.gs')
    router=read('gas-backend/Code_20_Router.gs')
    app=read('github-pages/app-config.js')
    transport=read('github-pages/github-gas-transport.js')
    generated=read('github-pages/vercel-env.generated.js')
    common=read('api/_gasProxyCommon.js')
    index=read('github-pages/index.html')
    diag=read('github-pages/diagnostic.html')
    vercel=json.loads(read('vercel.json') or '{}')
    package=json.loads(read('package.json') or '{}')
    manifest=json.loads(read('TECH_DEBT_MANIFEST.json') or '{}')
    owners=json.loads(read('OWNER_REGISTRY.json') or '{}')

    ok('doGet single owner', platform.count('function doGet(')==1, str(platform.count('function doGet(')))
    ok('doPost single owner', platform.count('function doPost(')==1, str(platform.count('function doPost(')))
    ok('backend browser fallback endpoints removed', all(t not in platform for t in FORBIDDEN_SOURCE_TOKENS), ', '.join(t for t in FORBIDDEN_SOURCE_TOKENS if t in platform))
    ok('release stamp present', RELEASE in alltext, RELEASE)
    ok('asset stamp present', ASSET in alltext, ASSET)
    ok('transport mode present', MODE in alltext, MODE)
    ok('schema stamp retained', SCHEMA_STAMP in alltext, SCHEMA_STAMP)
    ok('Vercel output dir', vercel.get('outputDirectory')=='github-pages', str(vercel.get('outputDirectory')))
    ok('Vercel build runs single release gate', 'tools/release_gate.py' in str(vercel.get('buildCommand','')), str(vercel.get('buildCommand','')))
    ok('package build runs single release gate', 'tools/release_gate.py' in str(package.get('scripts',{}).get('build','')), str(package.get('scripts',{}).get('build','')))
    ok('proxy functions exist', all((ROOT/'api'/f).exists() for f in ['gas.js','login.js','public-config.js','_gasProxyCommon.js']), 'api proxy files')
    ok('server GAS env used by proxy', 'process.env.GAS_WEB_APP_URL' in common, 'server env')
    ok('proxy emits single gate header', 'X-Single-Release-Gate' in common, 'proxy header')
    ok('Vercel env phase Q', '"phase":"Q"' in generated and '"sizeGateEnabled":true' in generated, 'generated env metadata')
    ok('index uses Phase Q assets', RELEASE in index and MODE in index, 'index script stamps')
    ok('diagnostic uses Phase Q assets', RELEASE in diag and MODE in diag, 'diagnostic script stamps')
    ok('app-config owner flags', 'phaseOOwnerConsolidation: true' in app and 'runtimeOwnerConsolidated: true' in app and 'apiOwnerConsolidated: true' in app and 'sizeGateEnabled: true' in app, 'app-config single owner + size gate flags')
    def literal_false(src, key): return re.search(r'\b' + re.escape(key) + r'\s*[:=]\s*false\b', src) is not None
    def literal_true(src, key): return re.search(r'\b' + re.escape(key) + r'\s*[:=]\s*true\b', src) is not None
    ok('security fastLoginJsonp default false', literal_false(app, 'fastLoginJsonp'), 'app-config must set fastLoginJsonp:false')
    ok('security fastLoginJsonp enforced false', 'root.APP_CONFIG.fastLoginJsonp = false' in app, 'inline config must not re-enable fast-login')
    ok('security allowAssumedBridgeReady false', literal_false(app, 'allowAssumedBridgeReady'), 'assumed readiness must be disabled')
    ok('security bridgeLoadGraceMs zero', re.search(r'\bbridgeLoadGraceMs\s*[:=]\s*0\b', app) is not None, 'load grace must not mark fallback ready')
    ok('transport is proxy only', 'function runVercelApiProxy' in transport and 'function runVercelLoginProxy' in transport and 'function runReadWithPolicy' in transport, 'proxy funcs')
    forbidden_transport = ['function runJsonpApi','function runGasViaClient','function runLoginPost','function runFastLoginJsonp','__githubFastLogin=1','document.createElement(\'iframe\')','document.createElement("iframe")','postMessage(','GAS_IFRAME_TRANSPORT_REQUEST']
    bad=[x for x in forbidden_transport if x in transport]
    ok('browser fallback transport functions absent', not bad, ', '.join(bad))
    ok('static API_CONTRACT disabled', 'AppBackendCore.API_CONTRACT = Object.freeze({});' in platform, 'contract cleanup')
    for api in CRITICAL_APIS: ok(f'critical API {api}', api in router or api in platform, api)
    drift=mirror_in_sync(); ok('generated mirrors in sync', not drift, ', '.join(drift))
    write_methods=write_methods_from_router(router); schemas=schema_methods(router); missing=sorted(set(write_methods)-schemas); ok('write schema covers write routes', not missing, ', '.join(missing))
    ok('owner registry phase Q', owners.get('phase')=='Q' and owners.get('release')==RELEASE, str(owners.get('phase')))
    editable=owners.get('editableOwners') or {}
    for key in ['backendEntrypoint','apiRouter','apiDtoContract','writeSchema','transport','vercelProxy','runtimeFacade','criticalLogin']:
        ok(f'owner registry has {key}', bool(editable.get(key)), str(editable.get(key,'')))
    gen=owners.get('generatedMirrors') or {}
    ok('generated mirrors marked non-owner', gen.get('editable') is False and gen.get('root')=='github-pages/partials', str(gen))
    ok('manifest phase Q', manifest.get('phase')=='Q', str(manifest.get('phase')))
    ok('manifest release gate', manifest.get('releaseGate')=='tools/release_gate.py', str(manifest.get('releaseGate')))
    ok('manifest Phase Q flags', manifest.get('phaseQRuntimeSlimming') is True and manifest.get('sizeGateEnabled') is True and manifest.get('removedBrowserTransports') is True, str(manifest))
    sizes=size_gate(owners)
    gate_files=sorted(str(p.relative_to(ROOT)) for p in (ROOT/'tools').glob('*gate*.py'))
    ok('single gate file only', gate_files == ['tools/release_gate.py'], ', '.join(gate_files))
    report={'ok':not errors,'phase':'Q','release':RELEASE,'transportMode':MODE,'checks':checks,'errors':errors,'writeRouteCount':len(write_methods),'schemaMethodCount':len(schemas),'ownerCount':len(editable),'sizeBytes':sizes}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if errors: sys.exit(1)
if __name__=='__main__': main()
