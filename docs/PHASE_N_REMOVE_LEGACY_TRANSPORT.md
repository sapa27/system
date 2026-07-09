# Production current — Remove legacy transport

Production current makes the Vercel browser runtime proxy-only. The frontend no longer contains the legacy browser transports that previously caused timeout and callback issues.

## Browser transport after Production current

- Login: `POST /api/login` → GAS `doPost` → `apiLogin`
- Read/write: `POST /api/gas` → GAS `doPost` → `apiRouter(method, payload)`
- Public config: `GET /api/public-config` → GAS public config endpoint
- Static partials: loaded from Vercel `github-pages/partials`

## Removed from frontend runtime

- JSONP read API
- hidden GAS bridge iframe for authenticated read/write
- login POST iframe callback flow
- fast-login JSONP fallback

GAS backend compatibility endpoints remain in the backend file for old deployments and diagnostics, but Vercel frontend no longer calls them.

## Deploy gate

Run:

```bash
python3 tools/phaseN_legacy_transport_gate.py --check
python3 tools/phaseN_legacy_transport_gate.py
```

The gate fails if legacy browser transport functions return to `github-pages/github-gas-transport.js`, if release stamps drift, if generated mirrors drift, or if the security/cache gate/single-source contract cleanup/write-schema unification safeguards are rolled back.

## Phase 1 production release discipline addendum

For Production current, `npm run build` remains lightweight for Vercel hosting limits. Final packaging or promotion must pass `npm run audit:strict` or `npm run release:check`. This prevents contract drift, mirror drift, legacy transport drift, source-size regression, and write-schema drift from entering production.
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


## Phase 6 Addendum — Static QA Readiness

The Production current gate now validates inline HTML JavaScript syntax and high-risk `APP_CONFIG` duplicate-key drift. This prevents embedded page/partial scripts from passing deployment audit when only Vercel API syntax was checked.

No transport path, API route, write schema, UI, or business rule is changed by this addendum.

## Static Config Assignment Guard Addendum

The Production current gate now checks app-config runtime assignment drift in addition to duplicate keys inside default config objects. This prevents duplicated `root.APP_CONFIG.releaseGate` or other high-risk runtime assignments from silently returning.

No transport path, API route, write schema, UI behavior, DOM ID, or business rule is changed by this addendum.
Stamp: `production-current-static-config-assignment-guard-2026-07-08-r1`.

### Deploy Release Single-Publish Guard Addendum

Stamp: `production-current-deploy-release-single-publish-2026-07-08-r1`

The static config runtime now publishes `APP_DEPLOY_RELEASE` once after config normalization. This removes the stale duplicate publication surface that could report release metadata before query/localStorage transport normalization completed. The strict release gate now blocks future duplicate `APP_DEPLOY_RELEASE` publishers.

## Addendum — Deep Source Syntax Guard

Stamp: `production-current-deep-source-syntax-guard-2026-07-08-r1`

A remaining release-risk gap was that strict QA checked Vercel API files and inline HTML script blocks, but not every standalone GAS `.gs` file and every standalone `github-pages/*.js` asset. The release gate now performs a source syntax pass over GAS `.gs`, Vercel API JavaScript, and static frontend JavaScript assets before production release.

No transport path, API route, write schema, UI label, DOM id, or business rule is changed by this guard.
