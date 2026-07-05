# Phase N single-source, proxy-only, and size-gate policy

Editable canonical source is `gas-backend/`.

Current release: `commission-v1.1-phaseN-remove-legacy-transport-2026-07-02-r1`.

## Canonical source rules

1. Edit backend `.gs` files and canonical `gas-backend/Scripts_*.html` files only.
2. Treat `github-pages/partials/Scripts_*.html` as generated mirrors.
3. Do not hand-edit generated mirrors. Run `python3 tools/sync_frontend_partials.py` after changing canonical scripts, then verify with `python3 tools/sync_frontend_partials.py --check`.
4. Keep one API owner: `gas-backend/Code_20_Router.gs::_apiRouteRegistry_()` derives backend/client contract checks.
5. Keep one write-schema owner: `Code_20_Router.WRITE_SCHEMA_BY_METHOD` / `_routerPhaseKWriteSchemaByMethod_()`.
6. Keep one dashboard budget owner: `BudgetDomain` hydrates budget after dashboard first paint.
7. Do not add APIs to work around slow pages. Optimize the existing route owner, cache, projection, and page hydration path instead.

## Phase N transport policy

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

Backend compatibility endpoint `apiGithubBridgeCall` may remain temporarily for old deployments, but Phase N frontend code must not call it.

## Release gate commands

Before packaging or deployment, run:

```bash
python3 tools/generate_vercel_env.py
python3 tools/sync_frontend_partials.py --check
npm run check:api
python3 tools/phaseG_security_gate.py
python3 tools/phaseN_legacy_transport_gate.py
```

or simply:

```bash
npm run build
```

## Production-current hardening policy

The current production hardening policy is a no-business-logic-change cleanup step. It does not add files, routes, APIs, or UI behavior. It only:

1. aligns this policy document with the actual Phase N proxy-only runtime,
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
