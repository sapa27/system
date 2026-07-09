# Production current single-source, proxy-only, and size-gate policy

Editable canonical source is `gas-backend/`.

Current release: `commission-v1.2-ai-meeting-budget-stability-2026-07-09-r15`.

## Canonical source rules

1. Edit backend `.gs` files and canonical `gas-backend/Scripts_*.html` files only.
2. Treat `github-pages/partials/Scripts_*.html` as generated mirrors.
3. Do not hand-edit generated mirrors. Run `python3 tools/phaseN_legacy_transport_gate.py` after changing canonical scripts, then verify with `python3 tools/phaseN_legacy_transport_gate.py --check`.
4. Keep one API owner: `gas-backend/Code_20_Router.gs::_apiRouteRegistry_()` derives backend/client contract checks.
5. Keep one write-schema owner: `Code_20_Router.WRITE_SCHEMA_BY_METHOD` / `_routerPhaseKWriteSchemaByMethod_()`.
6. Keep one dashboard budget owner: `BudgetDomain` hydrates budget after dashboard first paint.
7. Do not add APIs to work around slow pages. Optimize the existing route owner, cache, projection, and page hydration path instead.

## Production current transport policy

The browser transport is **Vercel proxy-only**.

Allowed public frontend paths:

- `/api/public-config`
- `/api/login`
- `/api/gas`

Forbidden legacy browser transports:

- JSONP read transport
- hidden GAS bridge iframe transport
- login form POST iframe transport
- fast-login JSONP session issuance
- assumed bridge-ready fallback
- direct `google.script.run` from GitHub Pages

Backend compatibility endpoint `apiGithubBridgeCall` may remain temporarily for old deployments, but Production current frontend code must not call it.

## Phase 1 production release discipline

`npm run build` is intentionally Vercel-host safe and only runs the Node syntax/API proxy check. It is **not** the final production release gate.

Before packaging, promoting, or deploying a production ZIP, run the blocking strict audit:

```bash
npm run audit:strict
```

Equivalent release aliases are also available:

```bash
npm run release:check
npm run deploy:check
npm run predeploy:production
```

The strict audit regenerates deterministic public env metadata, checks all Vercel API files, runs the security gate in strict mode, and runs the Production current contract/transport/size/mirror/write-schema gate in strict mode.

Production rule: do not promote a ZIP that has only passed `npm run build`. The ZIP must pass `npm run audit:strict` or one of the release aliases above.

## Production-current hardening policy

The current production hardening policy is a no-business-logic-change cleanup step. It does not add files, routes, APIs, or UI behavior. It only:

1. aligns this policy document with the actual Production current proxy-only runtime,
2. prevents legacy transport drift,
3. prevents generated mirror drift,
4. prevents write-schema drift, and
5. adds source-size budgets to stop runtime and domain files from growing again.

Hard size budgets are regression guards, not the final slimming target. Phase 2 should reduce the largest files further while preserving the current UI/UX and business rules.

## Current debt targets

- Slim `gas-backend/Scripts_Core_Runtime.html` without adding files.
- Slim `gas-backend/Scripts_Page_Meeting.html` without changing meeting UI/UX.
- Deduplicate helper logic inside `gas-backend/Code_30_Domain_Cases.gs` without adding APIs.
- Keep budget hydration owned by `BudgetDomain` only.
- Keep generated mirrors synchronized from canonical source only.
## Phase 2 Runtime Slimming Addendum (2026-07-08)

Phase 2 tightens the runtime size budget without changing API names, write schema, UI labels, DOM IDs, or business rules. The canonical meeting page partial remains `gas-backend/Scripts_Page_Meeting.html`; the static mirror remains `github-pages/partials/Scripts_Page_Meeting.html`.

Production release must continue to use `npm run audit:strict`. The strict gate now enforces the meeting page canonical and mirror at **220,000 bytes** each, replacing the older ~242 KB guard.

Do not re-expand repeated meeting literals or edit the mirror directly. Any future meeting-page change must keep the canonical and mirror under the Phase 2 budget and preserve the existing public owners such as `initMeetingPage`, `meetingEditLog`, `CommitteeMeetingSystem`, and `AppPages` meeting actions.



## Phase 3 — Cache/Data Freshness (production-current-phase3-cache-data-freshness-2026-07-08-r1)

- Read caches remain allowed only when they are keyed by the current freshness/write epoch.
- Any successful write/delete must invalidate client read caches and advance `AppDataFreshnessOwner`.
- Search, report, tracking, dashboard, and budget visible refreshes must bypass stale cache after user refresh or mutation.
- Production release must continue to pass `npm run audit:strict`; `npm run build` is not the final production gate.
- This phase does not add API routes, files, write schema entries, or business-rule changes.


## Phase 4 — Write/Delete Reliability (`production-current-phase4-write-delete-reliability-2026-07-08-r1`)

Production write/delete reliability is locked by `Code_00_PlatformCore.Phase4WriteDeleteReliability` and `Code_20_Router.Phase4WriteDeleteReliability`. The 27 write APIs must remain in the frozen write schema, must be router-owned, must require CSRF metadata, must pass through `writeGateway_`, and must return a standard `ok/data/msg/error/meta` envelope with deterministic cache invalidation metadata. Critical delete routes must keep their dashboard/search/tracking refresh targets. Run `npm run audit:strict` before promoting production; `npm run build` alone is not a production release gate.

## Phase 5 — UI/UX Modernization (`production-current-phase5-uiux-modernization-2026-07-08-r1`)

Phase 5 modernizes the visible runtime shell without changing API routes, write schema, sheet business rules, DOM IDs, or data ownership. The canonical and static indexes install a small `AppPhase5UiUx` owner that standardizes touch targets, focus-visible rings, mobile modal scrolling, table scroll regions, and loading/empty/error surfaces. This phase also fixes legacy compressed 5-digit CSS color tokens in the index files so modern card, sidebar, login, and mobile styles render consistently across browsers.

Production release remains blocked by `npm run audit:strict`; `npm run build` alone is not a production release gate.


## Phase 6 — Static QA Readiness

Production release must continue to pass `npm run audit:strict`. Phase 6 adds a blocking static QA readiness layer inside `tools/phaseN_legacy_transport_gate.py` to catch hidden regressions that `node --check api/*.js` cannot see.

Required checks:
- inline HTML JavaScript syntax in `gas-backend`, `github-pages`, and `github-pages/partials`
- high-risk `APP_CONFIG` default keys such as `releaseGate`, `transportMode`, `hostingTarget`, `readJsonpApi`, and `loginFormPost` must remain single-owner
- no new files, no new API routes, no route-name changes, no write-schema changes, no business-rule changes, and no UI/UX changes in this phase

Stamp: `production-current-phase6-static-qa-readiness-2026-07-08-r1`.

## Static Config Assignment Guard (`production-current-static-config-assignment-guard-2026-07-08-r1`)

This follow-up stability pass closes a hidden app-config drift gap that Phase 6 did not fully cover. Phase 6 checks duplicate keys inside the `defaults` object; the strict gate now also checks high-risk `root.APP_CONFIG.*` runtime assignments after `Object.assign`.

Production rules:
- `root.APP_CONFIG.releaseGate` must have exactly one runtime owner assignment.
- high-risk runtime assignments such as `hostingTarget`, `loginFormPost`, `readJsonpApi`, and legacy transport flags must remain single-owner.
- this guard changes no API routes, files, write schema, DOM IDs, UI behavior, or business rules.
- production promotion remains blocked by `npm run audit:strict`.

## Deploy Release Single-Publish Guard

Stamp: `production-current-deploy-release-single-publish-2026-07-08-r1`

`github-pages/app-config.js` must publish `root.APP_DEPLOY_RELEASE` from one owner only. The release metadata publisher runs after APP_CONFIG normalization so transport mode, hosting target, and legacy-removal flags cannot be stale during frontend bootstrap. Production release remains blocked unless `npm run audit:strict` verifies one `root.APP_DEPLOY_RELEASE = Object.assign(...)` owner and one `publishDeployRelease()` runtime call.

This guard does not add files, API routes, write schema, UI labels, DOM ids, or business-rule changes.

## Deep Source Syntax Guard — production-current-deep-source-syntax-guard-2026-07-08-r1

Production release must not rely only on `npm run build` or the inline HTML JavaScript syntax gate. The strict release gate now also syntax-checks standalone source assets line-by-line at source-file level:

- `gas-backend/*.gs` is copied to temporary `.js` files and checked with `node --check` so Apps Script domain/router/platform syntax errors cannot pass unnoticed.
- `api/*.js` remains checked by the API syntax gate.
- `github-pages/*.js` is checked, including `app-config.js`, `github-gas-transport.js`, bootstrap assets, critical runtime, and `vercel-env.generated.js`.
- Existing Phase 6 inline HTML JavaScript syntax checks remain required for `Index.html` and all `Scripts_*.html` partials.

This guard does not add files, API routes, write schema, UI behavior, or business rules. It only blocks production release when source syntax is invalid. Production deployment still requires:

```bash
npm run audit:strict
```

Deep Source Syntax Guard coverage keywords: GAS .gs, github-pages/*.js.

### Inline Runtime Build Gate Addendum (2026-07-09)

`npm run build` now executes `npm run check:inline` in addition to `check:api` and `check:frontend`. The inline check extracts executable `<script>` blocks from `github-pages/index.html`, `github-pages/diagnostic.html`, every `github-pages/partials/*.html` file, and every `gas-backend/Scripts_*.html` canonical partial, validates them with Node, and blocks keyword-token minifier drift such as `return$token` or `else$token` before Vercel deployment.

This addendum adds no files, no API routes, no write-schema changes, no DOM-id changes, no UI labels, and no business-rule changes. It closes the deployment gap where inline partial scripts could parse incorrectly or contain semantic minifier drift while the standalone `.js` build checks still passed.


## AI / Meeting / Budget Stability Guard — 2026-07-09 r15

Production runtime must block semantic drift that syntax-only checks can miss. The release gate must verify that AI routes stay lazy/user-action/advisory-only, Meeting route activation does not call a missing global `applyPending()`, Meeting summary popup has a direct fallback click handler, Core `appendChildren` rejects parent/ancestor append, and Budget dynamic seminar forms render without reusing DOM nodes that can trigger `HierarchyRequestError`. This guard preserves the API contract, route names, write schema, and file count.
