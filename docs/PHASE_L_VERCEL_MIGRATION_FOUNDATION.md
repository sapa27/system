# Phase L — Vercel migration foundation

Phase L prepares the frontend for Vercel static hosting while keeping the existing Google Apps Script backend and the existing Phase G/K transport policies intact.

## Scope

In scope:

- Add `vercel.json` for static deployment from `github-pages/`.
- Add `package.json` scripts for build/gate checks.
- Add `.env.example` for public Vercel environment variables.
- Add `tools/generate_vercel_env.py` to generate `github-pages/vercel-env.generated.js` at build time.
- Add `tools/phaseN_legacy_transport_gate.py` to verify Vercel foundation readiness.
- Load `vercel-env.generated.js` before `app-config.js`.
- Expose Phase L metadata in frontend and GAS public config.

Out of scope:

- No Vercel API proxy yet.
- No new application API methods.
- No change to GAS domain logic.
- No re-enable of JSONP fast-login.
- No change to write schema/business validation.

## Vercel setup

Set the project root to this package root, then set environment variables:

```bash
NEXT_PUBLIC_GAS_WEB_APP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
NEXT_PUBLIC_APP_LOGO_URL=
```

The build command is defined in `vercel.json`:

```bash
python3 tools/generate_vercel_env.py && python3 tools/sync_frontend_partials.py --check && python3 tools/phaseN_legacy_transport_gate.py
```

The output directory is:

```text
github-pages
```

## Runtime architecture after Phase L

```text
Vercel static frontend
  ↓ existing browser transport
GAS Web App doGet/doPost
  ↓
Google Sheets / Apps Script services
```

Authenticated read/write still uses the explicit-ready GAS iframe bridge. Login still uses login POST iframe. Public contract reads still use JSONP allow-list only.

## Next phase

Phase M can add a Vercel server-side API proxy. That is intentionally not included in Phase L so the hosting migration can be validated without changing the backend transport contract.
