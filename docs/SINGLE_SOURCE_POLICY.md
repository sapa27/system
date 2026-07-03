# Phase I single-source and release-gate policy

Editable canonical source is `gas-backend/`.

Rules:

1. Edit backend `.gs` files and canonical `gas-backend/Scripts_*.html` files only.
2. Treat `github-pages/partials/Scripts_*.html` as generated mirrors.
3. Do not hand-edit generated mirrors. Run `python tools/sync_frontend_partials.py` instead.
4. Before packaging or deployment, run:

   ```bash
   python tools/sync_frontend_partials.py --check
   python tools/release_gate.py
   python tools/release_gate.py
   ```

5. Keep one API owner: `Code_20_Router.gs::_apiRouteRegistry_()` derives backend/client contract checks.
6. Keep one transport policy: browser uses same-origin Vercel API proxy only.
7. Keep security hardening active: no browser fallback transport and no direct GAS client calls.
8. Keep one dashboard budget owner: `BudgetDomain` hydrates budget after dashboard first paint.

Phase I does not add APIs or change business logic. It restores enforceable release gates and prevents drift.

Current release: `commission-v1.1-phaseQ-runtime-slim-size-gate-2026-07-03-r1`.
