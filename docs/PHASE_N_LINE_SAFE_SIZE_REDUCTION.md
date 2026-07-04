# Phase N — Line-Safe Source Size Reduction

This follow-up reduces large page/domain files without adding API methods or changing write behavior.

## Scope

- Compact large page scripts while preserving line boundaries to keep JavaScript ASI behavior intact.
- Sync generated GitHub partial mirrors from `gas-backend/Scripts_*.html`.
- Remove accidental Python `__pycache__` artifacts from the package.

## Files reduced

- `gas-backend/Scripts_Page_Meeting.html`
- `gas-backend/Scripts_Page_Budget.html`
- `gas-backend/Scripts_Page_People.html`
- `gas-backend/Scripts_Page_ReportTrack.html`
- `gas-backend/Scripts_Page_Dashboard.html`
- `gas-backend/Scripts_Page_Admin.html`
- `gas-backend/Scripts_Page_Petitioner.html`
- `gas-backend/Code_33_Domain_People.gs`
- generated mirrors under `github-pages/partials/`

## Guardrails

- No API added.
- No route owner changed.
- No write schema owner changed.
- No identifier mangling.
- No business logic rewrite.
- Save/add/delete policy from previous Phase N patches retained.
