# Production current — Remove legacy transport

Production current makes the Vercel browser runtime proxy-only. The frontend no longer contains the legacy browser transports that previously caused timeout and callback issues.

## Browser transport after Production current

- Login: `POST /api/login` → GAS `doPost` → `apiLogin`
- Read/write: `POST /api/gas` → GAS `doPost` → `apiRouter(method, payload)`
- Public config: `GET /api/public-config` → GAS public config endpoint
- Static partials: loaded from Vercel `github-pages/partials`

## Removed from frontend runtime

- JSONP read API
- hidden GAS bridge iframe for authenticated read/write
- login POST iframe callback flow
- fast-login JSONP fallback

GAS backend compatibility endpoints remain in the backend file for old deployments and diagnostics, but Vercel frontend no longer calls them.

## Deploy gate

Run:

```bash
python3 tools/sync_frontend_partials.py --check
python3 tools/phaseN_legacy_transport_gate.py
```

The gate fails if legacy browser transport functions return to `github-pages/github-gas-transport.js`, if release stamps drift, if generated mirrors drift, or if the security/cache gate/single-source contract cleanup/write-schema unification safeguards are rolled back.
