# Phase N Runtime Write Cache Patch

## Scope

This patch keeps the Phase N Vercel-proxy-only architecture and does not add new API methods. It hardens the existing single-owner runtime around save/add/delete operations.

## Root cause fixed

The previous stability patch cleared the Vercel transport read cache before and after writes. However, the core runtime also owns `AppClientCacheOwner`, which stores read responses in `sessionStorage`. After a successful write, that runtime cache could still return stale dashboard, petitioner, people, meeting, or budget data, making a successful save/delete appear to fail.

A second issue was that the canonical runtime transport still delegated through an older `previousRuntimeCall` path before reaching `AppTransport.run`. That older path could drop per-call `options` such as longer timeouts for heavy writes/reads.

## Changes

- `Scripts_Core_Runtime.html` now calls `AppTransport.run(method, payload, options)` directly from the single-owner runtime transport when available.
- Every write action clears `AppClientCacheOwner` before the write.
- Every write response clears `AppClientCacheOwner` again after success or rejected envelope.
- Runtime also calls `AppTransport.invalidateClientApiCache(...)` so both cache layers are invalidated together.
- Runtime emits `app:write-cache-invalidated` and `app:data-mutated` events for page-level refresh hooks without adding APIs.
- Phase N gate now checks direct runtime option propagation, runtime cache invalidation, and mutation event hooks.

## Guardrails retained

- No new API route.
- No second API owner.
- `Code_20_Router.gs::_apiRouteRegistry_` remains the route owner.
- `Code_20_Router.WRITE_SCHEMA_BY_METHOD` remains the write schema owner.
- Generated Vercel partials must still be synced from `gas-backend` by `tools/sync_frontend_partials.py`.
