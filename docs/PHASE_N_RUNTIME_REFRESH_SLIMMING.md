# Phase N Runtime Refresh & Admin Bundle Slimming

## Problem found

Successful write operations already clear the transport cache and the runtime sessionStorage cache, but each page still decides independently whether to reload visible data. This creates inconsistent behaviour after save/delete: the backend can return `ok:true`, while the active page remains stale until the user navigates or manually reloads.

The admin page also contained a full browser-side Phase 6/Phase 7 smoke and production verification implementation. That code is useful for development gates, but it is not part of normal production data entry. Shipping it inside the admin page increased runtime payload size and added another set of diagnostic owners inside the browser bundle.

## Change

- Added `AppPages.refresh(pageId, context)` as the single lifecycle refresh entry point.
- Added `AppWriteRefreshBroker`, which listens to `app:data-mutated` from the canonical `AppApi` pipeline.
- The broker refreshes only the active affected page after successful writes.
- It schedules a fast refresh and, for budget/case/meeting/letter writes, a delayed reconciliation refresh to avoid stale materialized/read-model data.
- Replaced the heavy admin browser diagnostics implementation with a small stub that points production verification back to repository/live UAT gates.

## API ownership

No API was added. The owner remains:

- Route owner: `gas-backend/Code_20_Router.gs::_apiRouteRegistry_`
- Write schema owner: `Code_20_Router.WRITE_SCHEMA_BY_METHOD`
- Browser transport owner: `github-pages/github-gas-transport.js` through `/api/gas` and `/api/login`

## Regression protection

`tools/phaseN_legacy_transport_gate.py` now checks:

- `AppPages.refresh` exists.
- `AppWriteRefreshBroker` is installed.
- `app:write-refresh-scheduled` is emitted.
- Heavy admin diagnostics owner is removed from the browser bundle.
- Admin page browser payload remains below the configured slimming threshold.
