# Phase J — Runtime Slimming

Release: `commission-v1.1-phaseN-remove-legacy-transport-2026-07-02-r1`

Scope:
- No new API methods.
- No business logic changes.
- Preserve Phase G security hardening and Phase I router-only contract ownership.
- Reduce GitHub index inline runtime by extracting heavy inline scripts into cacheable JavaScript assets.
- Apply conservative whitespace slimming to runtime HTML/JS files.

Externalized GitHub assets:
- `github-pages/app-index-bootstrap.js`
- `github-pages/app-index-foundation-after-swal.js`
- `github-pages/app-index-foundation-after-vue.js`
- `github-pages/app-index-foundation-pre-vue.js`
- `github-pages/critical-login-runtime.js`

Required gates before deploy:
```bash
python tools/sync_frontend_partials.py --check
python tools/phaseG_security_gate.py
python tools/phaseK_write_schema_gate.py
```
