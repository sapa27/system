# Phase M — Vercel API proxy

Phase M keeps Google Apps Script as the backend/domain owner and adds same-origin Vercel serverless proxy endpoints in front of GAS.

## Runtime paths

- Frontend static assets: `github-pages/`
- Login: `POST /api/login` → GAS `doPost` → `apiRouter({ method: "apiLogin" })`
- Read/write: `POST /api/gas` → GAS `doPost` → `apiRouter({ method, payload })`
- Public config: `GET /api/public-config` → GAS `?__githubPublicConfig=1`

## Environment variables

Set this in Vercel Project Settings:

```bash
GAS_WEB_APP_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

Do not publish `GAS_WEB_APP_URL` as `NEXT_PUBLIC_*` unless you intentionally need legacy fallback. The browser should use same-origin `/api/*` endpoints in Phase M.

## What remains disabled

- Fast-login JSONP remains disabled.
- Assumed bridge ready remains disabled.
- Static API allowlist remains disabled; route registry remains source of truth.
- Phase K write schema remains the write validation owner.

## Deployment gate

Run:

```bash
python3 tools/generate_vercel_env.py
python3 tools/sync_frontend_partials.py --check
python3 tools/phaseG_security_gate.py
python3 tools/phaseN_legacy_transport_gate.py
```

Vercel build runs the generator, mirror check, and Phase M gate automatically.
