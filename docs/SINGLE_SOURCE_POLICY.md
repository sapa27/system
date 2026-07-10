# Production Current Single Source Policy

## Current Single Owner Hard Lock

This package is locked to one active production owner per responsibility. This is the current production cleanup state, not a new release phase.

| Responsibility | Active owner |
|---|---|
| Browser transport | `gas-backend/Scripts_Critical_Login_Runtime.html::AppTransport.run` |
| Critical login transport | GAS HtmlService `google.script.run.apiRouter` |
| Page API facade | `gas-backend/Scripts_Core_Runtime.html::AppPageKit.apiRunner` |
| Index bootstrap API | `gas-backend/Index.html::IndexKit.api -> AppPageKit.apiRunner` |
| Router/API contract | `gas-backend/Code_20_Router.gs::apiRouter / _apiRouteRegistry_` |
| Write schema | `gas-backend/Code_20_Router.gs::_routerPhaseKWriteSchemaByMethod_` |
| Client in-flight | `Scripts_Critical_Login_Runtime.html::AppTransport.run` |
| Client read cache | backend/router cache only |
| Dirty refresh | `gas-backend/Scripts_Core_Runtime.html::AppDirtyRefreshOwner` |
| Write freshness | `gas-backend/Scripts_Core_Runtime.html::invalidateAfterWrite` |
| Legacy GAS bridge/jsonp/fast-login | disabled-stub-only, returns `LEGACY_TRANSPORT_DISABLED` |
| Canonical browser runtime | `gas-backend/Scripts_*.html` — the only editable runtime source |
| Generated Vercel runtime | `tools/generate_vercel_env.py` creates `github-pages/partials/Scripts_*.html` during build |

## Hard rules

- Do not add source files. Build-generated Vercel artifacts are recreated from canonical GAS sources and are not edited or stored as independent source.
- Do not add API routes.
- Do not add a new Phase.
- Do not change route names or write schema.
- Do not change DOM ids, UI/UX, or business rules.
- Page modules must not call `google.script.run` directly; only the canonical `AppTransport.run` owner may call `google.script.run.apiRouter`.
- Do not call internal API compatibility facades directly from page/bootstrap code; use `AppPageKit.apiRunner`.
- Do not create browser read-response cache; frontend may only dedupe in-flight requests.
- Page scripts may coalesce one UI render/load promise only; do not add page response caches, adjacent-page prefetch caches, sessionStorage response caches, or independent request-deduplication maps.
- Search/Report, Budget, Dashboard, and AI page runtimes must use the backend/router cache plus `AppTransport.inFlightOnly`.
- Do not recreate legacy browser cache owner aliases or stale cache-named helper functions.
- Do not reactivate `__githubBridgeClient`, `__githubBridgeNamedRequest`, `__githubJsonpApi`, `__githubFastLogin`, or `apiGithubBridgeCall` as working transports.

## Current owner cleanup note

legacy owner aliases removed. Historical compatibility ledgers may remain in `TECH_DEBT_MANIFEST.json` only for strict-gate compatibility and audit traceability; they are not active owners. Active ownership is the table above.


## Single-source generated mirror consolidation — r26

Stamp: `production-current-single-source-generated-mirror-r26`

- `gas-backend/Scripts_*.html` is the only editable frontend runtime source.
- The source ZIP excludes all nine `github-pages/partials/Scripts_*.html` generated mirrors and `github-pages/vercel-env.generated.js`.
- `npm run build` runs `tools/generate_vercel_env.py` first and recreates the ten Vercel build artifacts deterministically.
- `npm run check:single-source` verifies byte-equivalence and rejects missing, drifted, or orphan generated mirrors.
- This removes 1,761,276 duplicated runtime bytes from the source package without changing API routes, DOM IDs, Spreadsheet schema, UI/UX, or business behavior.
- Vercel deployments must run the configured build command; opening the unbuilt static source directory directly is not a supported deployment path.

## Build and release gates

- Production source/build verification: `npm run build`
- Blocking release gate: `npm run audit:strict`
- Gate owner: `tools/phaseN_legacy_transport_gate.py` as Production Current Gate

## Release discipline

`npm run build` verifies source syntax and architecture but is **not** the final production release gate. Use `npm run audit:strict`, `npm run release:check`, `npm run deploy:check`, or `npm run predeploy:production` before promotion. Do not promote a ZIP that has only passed `npm run build`.

## GAS-hosted production runtime

The system supports two explicit production hosts from one canonical frontend source. GAS `/exec` renders `gas-backend/Index.html` and invokes `google.script.run.apiRouter`. Vercel serves generated frontend artifacts and invokes `/api/login` or `/api/gas`, which forward only frozen-contract methods to GAS `apiRouter`. Host-aware transport guards prevent either owner from replacing the other.

## Historical gate compatibility labels retained for audit only

These labels are not active owners; they are retained so the Production Current Gate can verify old fixes were not removed accidentally.

- Phase 2 — Transport Single Path Lock
- Browser -> /api/login or /api/gas -> GAS apiRouter -> Domain
- STATIC_GAS_DIRECT_DISABLED
- production-current-phase3-cache-data-freshness-2026-07-08-r1 — Cache/Data Freshness — npm run audit:strict
- production-current-phase4-write-delete-reliability-2026-07-08-r1 — Write/Delete Reliability — 27 write APIs — npm run audit:strict
- production-current-phase5-uiux-modernization-2026-07-08-r1 — UI/UX Modernization — AppPhase5UiUx — npm run audit:strict
- production-current-phase6-static-qa-readiness-2026-07-08-r1 — Static QA Readiness — inline HTML JavaScript syntax
- production-current-static-config-assignment-guard-2026-07-08-r1 — Static Config Assignment Guard
- production-current-deploy-release-single-publish-2026-07-08-r1 — Deploy Release Single-Publish Guard
- production-current-phase4-generated-mirror-slimming-2026-07-09-r1 — Generated Mirror Slimming
- phase6-manifest-gate-cleanup-2026-07-09-r1 — Manifest/Gate Cleanup — current contract plus compact ledger
- production-current-final-consistency-lock-2026-07-10-r1 — Current Final Consistency Lock — 39 source files / 53 build files — 108 methods — 27 write APIs
- production-current-deep-source-syntax-guard-2026-07-08-r1 — Deep Source Syntax Guard — GAS .gs — github-pages/*.js
- AI / Meeting / Budget Stability Guard — HierarchyRequestError — applyPending()
- production-current-gate-consolidation-2026-07-10-r1 — Current Gate Consolidation — audit:strict — build:strict was removed as duplicate alias
- production-current-semantic-owner-wording-cleanup-2026-07-10-r1 — Semantic Owner Wording Cleanup — no runtime/API/UI change

## Single Owner Hard Lock Audit

Current production API ownership is `AppPageKit.apiRunner -> AppRuntime.call -> AppTransport.run -> google.script.run.apiRouter`. Internal compatibility bridge names may remain inside core/critical runtime only and must not be used by page/bootstrap code as an owner. PlatformCore metadata must identify `AppPageKit.apiRunner` as the production API owner.
## Readable Source / No Minify Policy

Stamp: `production-current-readable-source-no-minify-2026-07-10-r1`

- Do not minify canonical production source.
- Maintain JavaScript, GAS, HTML embedded scripts, JSON, and Python as readable multi-line source.
- Formatting may change whitespace only for runtime source; function names, API routes, DOM ids, write schema, Unicode/Thai identifiers, GAS template tokens, UI/UX, and business rules must remain unchanged.
- `gas-backend/Scripts_*.html` remains canonical; generated mirrors must remain byte-equivalent after the generated mirror header is removed.
- `tools/generate_vercel_env.py` must generate a readable multi-line `github-pages/vercel-env.generated.js`.
- The readable-source gate uses line-count thresholds instead of requiring minified byte sizes.

## Current Structure Remediation Lock

Stamp: `production-current-structure-remediation-2026-07-10-r1`

- Page partial scripts are loaded once and activated many times; route changes must not force-execute a partial.
- `__APP_PAGE_SCRIPT_PROMISES__` and `__APP_PAGE_LOAD_PROMISES__` are the only page-script coalescing owners.
- Budget and People helper identifiers must remain page-scoped (`$budget*`, `$people*`) and must not reintroduce generic `$fn`/`$ob` globals.
- Router dispatch resolves frozen API facade functions from `_routerCanonicalHandlerMap_`; production dispatch must not scan `globalThis` or `this`.
- GAS and static `text/x-template` blocks must remain semantic mirrors; only the Parliament-logo hosting adapter may differ.
- Vercel proxy transport failures preserve non-2xx HTTP status and no unused login-state cookie may be emitted.
- CSP, HSTS, frame protection, and opener isolation headers are required.

## Current Deep Stability Hardening Lock

Stamp: `production-current-deep-stability-hardening-2026-07-10-r18`

- Vercel Function request/response payloads must remain below the platform 4.5 MB boundary.
- PDF uploads through `/api/gas` use a 3 MB raw-file limit because base64 expansion and the JSON envelope increase request size.
- Non-PDF API payloads remain limited to 1 MB.
- A page-script timeout must preserve the original in-flight owner; it must not permit a second owner while the first load is still running.
- Route activation must not report success when its page template or runtime failed to load.
- User-controlled external links must validate the URL scheme and use `rel="noopener noreferrer"` with `_blank`.
- `/api/public-config` and `/api/gas` preserve upstream HTTP transport failures.
- GAS public-config objects must not contain duplicate property keys.


## Current Accessibility and Dynamic DOM Performance Lock — 2026-07-10

- `AppAccessibility` must batch the actual added DOM scopes; a single mutation must not trigger an unconditional full-document scan.
- Critical login controls must receive accessible names before the deferred core runtime is available.
- Forms must not use `javascript:` action URLs.
- Links opened with `target="_blank"` must carry `noopener noreferrer`.
- Images without alternative text must be repaired by the canonical accessibility owner without changing existing DOM IDs or business behavior.
- These rules are enforced by `npm run check:architecture`.

## Characterization Test and Contract Freeze

Stamp: `production-current-characterization-contract-freeze-2026-07-10-r1`

This is Step 1 of the consolidation refactor and is not a new Phase. It records the current semantic behavior boundary before any owner, alias, fallback, or runtime cleanup.

- Run `npm run test:characterization` before and after every consolidation change.
- The baseline locks 108 ordered route records including role, domain, flags, cache entity, and limit metadata.
- The baseline locks all 27 write-validation schemas including validation codes, Thai messages, accepted fields, and nested payload paths.
- The Vercel proxy allowlist must remain identical to the router contract and in the same order.
- Each canonical page script has a frozen API-method footprint; a page may not silently gain or lose an API dependency.
- The full application UI markup, including the initial shell and all eleven `text/x-template` templates, is locked by a whitespace-insensitive semantic hash, so DOM structure, IDs, controls, labels, and UI/UX cannot drift during Clean Code work.
- Single-owner anchors are locked for `AppTransport.run`, `AppPageKit.apiRunner`, `apiRouter`, the write-schema owner, `AppDirtyRefreshOwner`, and `invalidateAfterWrite`.
- The gate adds no source file, API route, Spreadsheet schema, UI/UX behavior, or business-rule change.
- A baseline update is permitted only after an intentional contract change is separately approved and documented; it must never be changed merely to make a failing refactor pass.

## Step 2 — Runtime Metadata Slimming

`Scripts_Core_Runtime.html` remains the canonical runtime source. Step 2 removes only duplicate or write-only diagnostic metadata that had no internal caller, while retaining executable owner locks, runtime facades, API paths, UI templates, and business behavior. The generated partial must remain byte-identical to the canonical file.

Run the blocking verification with:

```bash
npm run test:runtime-slimming
```

The gate rejects reintroduction of the removed metadata markers, runtime growth above 484,000 bytes, canonical/mirror drift, or loss of the retained owner and API anchors. The Step 1 characterization baseline continues to lock routes, write schema, page API footprints, owner paths, and UI markup.

## Step 3 — API Facade Consolidation

Stamp: `production-current-step3-api-facade-consolidation-2026-07-10-r1`

Page and bootstrap code use one public API entry only: `AppPageKit.apiRunner`. `AppApi.call` remains an internal runtime and critical-login entry, and `AppRuntime.call` remains the internal transport pipeline before `AppTransport.run`.

This step removes unused callback/module factories and short compatibility names (`getApiCaller`, `getApiTransport`, `requireApiTransport`, `getModuleApi`, `_q16`, `moduleApi`, `_q36`, `_q28`, `AppApi.module`, `AppUtil.apiRunner`, and global `apiCall`). Admin and People callers were rewritten to the canonical page facade, and the unused Budget module-API binding was deleted. No API method, route, write schema, DOM ID, UI/UX, Spreadsheet schema, or business rule changed.

Run the blocking verification with:

```bash
npm run test:api-facade
```

The gate rejects reintroduction of removed API aliases, direct page calls through alternate facades, loss of `AppPageKit.apiRunner -> AppApi.call -> AppRuntime.call -> AppTransport.run`, canonical/generated mirror drift, or any Step 1 characterization-contract drift.

## Step 4 — Router Canonical Resolver Consolidation

Stamp: `production-current-step4-router-canonical-resolver-consolidation-2026-07-10-r1`

The backend router now has one explicit handler map (`_routerCanonicalHandlerMap_`) and one production resolver (`_routerResolveCanonicalHandler_`). Contract checks, PlatformCore security diagnostics, `RouterPipeline.resolveHandler`, and `apiRouter` dispatch use this resolver/map directly. The compatibility functions `_ct`, `_cz`, `_routerBuildFacadeHandlerMap_`, `_explicitRouteHandlerMap_`, `_resolveGlobalFunction_`, `_buildApiRouteHandlers_`, `_apiRouteHandlers_`, and `_routerResolveRouteHandler_`, together with the duplicate `__API_ROUTE_HANDLERS_CACHE__`, are removed. Route names, route metadata, write schema, UI/UX, Spreadsheet schema, and business behavior remain frozen.

Blocking command:

```bash
npm run test:router-consolidation
```

The gate rejects reintroduction of any removed router alias/cache, alternate dispatch resolution, mutable-global handler discovery, loss of the 108-route canonical map, or any Step 1 characterization-contract drift.

## Step 5 — Proxy Origin and Google HTML Response Guard (historical; superseded by GAS-hosted production)

Stamp: `production-current-step5-proxy-origin-html-guard-2026-07-10-r1`

The Production frontend is hosted by Vercel and the Apps Script Web App is backend-only. The previous backend `doGet()` still rendered the application shell, while the critical runtime used relative `/api/login` and `/api/gas` endpoints. Opening the GAS `/exec` URL therefore resolved those paths on a Google-hosted origin and returned a Google Workspace HTML page instead of JSON.

The fix is fail-closed:

- Normal GAS `doGet()` no longer renders the proxy-only frontend. It redirects to the HTTPS URL stored in the GAS Script Property `VERCEL_FRONTEND_URL`, or shows a configuration message when the property is absent.
- Critical login and the canonical browser transport reject Google-hosted page origins before calling `/api/*`, returning `VERCEL_FRONTEND_REQUIRED` instead of attempting an invalid request.
- The Vercel proxy classifies Google Sign-in/Workspace HTML as `GAS_DEPLOYMENT_ACCESS_OR_URL_INVALID` and records the final response URL/status without exposing credentials.
- Vercel Environment Variable `GAS_WEB_APP_URL` must be the latest Apps Script Web App deployment URL ending in `/exec`; `/dev`, editor, spreadsheet, Drive, and deployment-management URLs are invalid.
- Deploy the GAS Web App with an access policy that allows the Vercel server-side proxy to call it, then redeploy Vercel after changing environment variables.

Blocking command:

```bash
npm run test:proxy-origin
```

The gate rejects restoration of GAS-hosted Production UI, removal of the Google-origin guard, reintroduction of the raw `invalid proxy response:<html>` error, or loss of Step 1 contract baselines.

## Step 6 — Runtime Bootstrap and Meeting Summary Rewrite (retained; hosting owner superseded by GAS)

Stamp: `production-current-step6-runtime-bootstrap-meeting-summary-rewrite-2026-07-10-r1`

This step rewrites the existing bootstrap/runtime owners rather than adding compatibility patches. The GAS backend entry also validates the configured frontend host and renders a manual link instead of performing an automatic redirect, preventing invalid-property navigation and redirect loops. `app-config.js` publishes the deploy release through a lexical function declaration; the critical proxy-origin guard uses the same safe declaration model; and Dashboard AI diagnostics no longer refer to the removed client cache owner. Canonical GAS scripts, generated partial mirrors, and the static critical runtime must remain deterministic copies.

The committee-meeting summary uses one fresh-data path for initial list, refresh, search, and detail. The client sends `forceFresh`, `noCache`, and `bypassCache`; `_z52` converts those flags into a zero-TTL canonical repository read and forwards `forceFresh`/`bypassRequestCache` to the shared data service. This changes data freshness only; API names, route metadata, write schema, Spreadsheet schema, DOM structure, UI/UX, and business rules remain frozen.

CSP explicitly allows the data manifest and pinned CDN source-map diagnostics. Both entry documents use an inline SVG favicon, so no new project file is created.

Blocking command:

```bash
npm run test:runtime-bootstrap-meeting
```

The gate rejects named function expressions used as out-of-scope bootstrap owners, stale Dashboard cache aliases, cached meeting-summary reads, canonical/generated drift, missing CSP directives, release-stamp drift, or any Step 1 characterization-contract change.



## P2 — Long-term Runtime Stability

Stamp: `production-stability-hardening-r25`

P2 adds fail-closed runtime ownership and release-coherence checks without adding files or API routes. GAS must retain the `google.script.run.apiRouter` owner, while Vercel must retain the same-origin `/api/login` and `/api/gas` proxy owner. Login is blocked with `APP_RUNTIME_OWNER_MISMATCH` when a host loads the wrong transport or a mixed release.

Committee meeting reads reject `degraded`, `apiDegraded`, or `loadOk:false` payloads and display the actual read failure instead of rendering an empty summary. Boot-critical JavaScript uses cache revalidation (`no-cache, max-age=0, must-revalidate`) to prevent an old transport/bootstrap from being combined with a new HTML release. The existing diagnostic page verifies runtime owner, release stamps, boot asset cache policy, public config, route contract, login, and dashboard.

Blocking command:

```bash
npm run test:p2-stability
```

The gate rejects transport-owner drift, missing runtime health guards, hidden meeting read failures, stale boot JavaScript cache policy, release-stamp mismatch, generated-mirror drift, or frozen-contract changes.


## Current Stability Hardening r25

Stamp: `production-stability-hardening-r25`

This release keeps the existing API, Spreadsheet schema, DOM IDs, labels, and business rules while hardening the current owners in place:

- The entry documents no longer synchronously load the unused Vue CDN before the login shell.
- `AppDirtyRefreshOwner.Current` is the only listener that refreshes a page after a successful write; the historical broker is compatibility metadata only and registers no listener.
- Save, delete, update, import, upload, submit, approve, reject, send, process, generate, extract, cleanup, migrate, and revoke actions share an in-flight guard to prevent duplicate requests from rapid clicks.
- Every button has an explicit `type`, preventing future form refactors from turning navigation or accordion controls into accidental submits.
- Entry pages provide focus-visible treatment, coarse-pointer touch targets, and reduced-motion behavior without changing labels, routes, or business workflow.
- CSP now explicitly restricts form submissions, inline event attributes, and workers.

Blocking command:

```bash
npm run check:stability
```

The characterization hash was intentionally refreshed only for explicit button `type` attributes. No DOM IDs, user-facing labels, routes, API methods, write schemas, Spreadsheet schemas, or business rules changed.
## Index and Critical Runtime Single Source — r27

Stamp: `production-current-index-runtime-single-source-r27`

- `gas-backend/Index.html` is the canonical owner for foundation, Thai-date adapter, bootstrap, and async-runtime-loader logic.
- `gas-backend/Scripts_Critical_Login_Runtime.html` is the canonical critical login/runtime owner.
- Build generates `app-index-foundation-pre-vue.js`, `app-index-foundation-after-vue.js`, `app-index-bootstrap.js`, and `critical-login-runtime.js`; these files must not be edited directly or stored in the source ZIP.
- The obsolete external Vue loader was removed because routing uses the local reactive shim inside `startVueBootstrap`; no API, route, DOM structure, or business rule changed.
- Vercel static pages identify `production-vercel-proxy-only`; GAS remains `production-gas-hosted-google-script-run-api-router`.
- PWA icon MIME is resolved from the actual icon URL so SVG fallback icons are not declared as PNG.
- `npm run check:consolidation` blocks generated drift, unresolved GAS template tokens, external Vue reintroduction, host-label drift, and PWA MIME regression.
