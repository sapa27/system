# Phase N Stability Patch — Write Visibility and Client Cache Safety

This patch keeps the Phase N single-transport architecture unchanged: browser calls go through the same-origin Vercel proxy and GAS remains the application API owner.

## Root cause addressed

Save/add/delete routes could complete on GAS while the Vercel frontend still displayed stale read data from the client cache or an in-flight read dedupe promise. This made users see the old list immediately after a write and perceive that the button did not work.

Auth/bootstrap reads could also be cached like ordinary reads. Session resume/bootstrap responses may contain tokens or route contract state, so caching them risks stale token reuse and confusing follow-up writes.

## Changes

- Added `runWriteWithPolicy` in `github-pages/github-gas-transport.js`.
- Invalidates client read cache and in-flight dedupe before and after every write route.
- Uses a cache epoch so an old in-flight read cannot write stale data back into cache after a write starts.
- Excludes login/logout/session/bootstrap/route-contract/action-token methods from client read cache.
- Propagates runtime transport options/timeouts through `AppTransport.run` and critical login runtime.
- Strengthened `tools/phaseN_legacy_transport_gate.py` to enforce these invariants.

## Constraints retained

- No new API method added.
- Route registry owner remains `Code_20_Router.gs::_apiRouteRegistry_`.
- Write schema owner remains `Code_20_Router.WRITE_SCHEMA_BY_METHOD`.
- Generated mirrors must remain in sync through `tools/sync_frontend_partials.py`.
