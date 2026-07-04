# Phase I single-source and release-gate policy

Editable canonical source is `gas-backend/`.

Rules:

1. Edit backend `.gs` files and canonical `gas-backend/Scripts_*.html` files only.
2. Treat `github-pages/partials/Scripts_*.html` as generated mirrors.
3. Do not hand-edit generated mirrors. Run `python tools/sync_frontend_partials.py` instead.
4. Before packaging or deployment, run:

   ```bash
   python tools/sync_frontend_partials.py --check
   python tools/phaseG_security_gate.py
   python tools/phaseK_write_schema_gate.py
   ```

5. Keep one API owner: `Code_20_Router.gs::_apiRouteRegistry_()` derives backend/client contract checks.
6. Keep one transport policy: public contract reads by JSONP, authenticated reads and writes by bridge.
7. Keep Phase G security hardening active: no fast-login JSONP session issuance and no assumed bridge readiness.
8. Keep one dashboard budget owner: `BudgetDomain` hydrates budget after dashboard first paint.

Phase I does not add APIs or change business logic. It restores enforceable release gates and prevents drift.

Current release: `commission-v1.1-phaseN-remove-legacy-transport-2026-07-02-r1`.
