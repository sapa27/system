# Phase K — Write schema unification

Release: `commission-v1.1-phaseN-remove-legacy-transport-2026-07-02-r1`

Phase K keeps the Phase G security hardening and Phase I router-only API contract. It unifies save/write preflight validation under one schema owner.

## Canonical write schema

- Backend owner: `Code_20_Router.WRITE_SCHEMA_BY_METHOD` via `_routerPhaseKWriteSchemaByMethod_()`
- Client runtime mirror: `AppRuntime.WRITE_SCHEMA_BY_METHOD` via `phaseKWriteSchemaByMethod()`
- Critical login runtime mirror: `CriticalRuntime.WRITE_SCHEMA_BY_METHOD` via `phaseKWriteSchemaByMethodCrit()`

The schema does not add API methods. It only validates existing write routes from `_apiRouteRegistry_()`.

## Required release checks

```bash
python tools/sync_frontend_partials.py --check
python tools/phaseG_security_gate.py
python tools/phaseK_write_schema_gate.py
```
