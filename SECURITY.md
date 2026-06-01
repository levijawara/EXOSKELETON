## Security Policy

This repository is an **operational app shell**. It provides safer defaults, but it is **not bulletproof**.

### Reporting a vulnerability

If you discover a security issue, please **do not** open a public GitHub issue.

- Email: `security@example.com` (replace with your real address)
- Include: reproduction steps, affected routes/tables, impact, and any logs/screenshots you can share safely.

### High-risk footguns this repo tries to prevent

- **Server keys in the client**: never expose `SUPABASE_SERVICE_ROLE_KEY` anywhere outside server-only code.
- **Missing RLS**: every user-owned table should have RLS enabled and policies that restrict access to the owning user/org.
- **Public storage buckets**: keep buckets private by default; use signed URLs.
- **Admin-only actions**: require both route protection and auditable server-side enforcement.

### Environment variables and secrets

- `.env*` files are gitignored by default.
- Treat `SUPABASE_SERVICE_ROLE_KEY` as production-critical. If it leaks, rotate it immediately.
- Prefer per-environment keys and least privilege.

### Threat model note

Automated attackers (including frontier-model-assisted ones) excel at:

- enumerating endpoints and IDs
- probing RLS edge cases
- looking for misconfigurations and leaked secrets

Your best defense is **defense in depth**: correct RLS, narrow blast radius, monitoring, and a practiced rollback path.

