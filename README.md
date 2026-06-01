# EXOSKELETON — Operational App Shell

Modular Next.js + Supabase starter focused on the **boring minimums**:

- Auth + role gating
- Legal pages + consent placeholders
- Admin area + audit logging hooks
- Privacy requests (export/delete) + admin queue
- Feature “packs” behind flags (billing, UGC/moderation, B2B orgs, files, AI)
- Smoke/E2E test harness (Playwright) + CI workflow

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

See `.env.example`. Minimum required for auth/API features:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (required for admin-only server operations like data exports)
- `ADMIN_EMAILS` (comma-separated emails that should be treated as admins)

## Routes

- **Public**: `/`, `/legal/*`, `/contact`, `/auth/*`
- **Authed**: `/dashboard`, `/settings` (protected by middleware)
- **Admin**: `/admin`, `/admin/privacy-requests`, `/admin/audit-logs` (protected by middleware + admin checks)
- **Packs**: `/packs/*` (feature-flagged)

## Packs (feature flags)

Packs are toggled via env vars:

- `NEXT_PUBLIC_PACK_BILLING`
- `NEXT_PUBLIC_PACK_UGC`
- `NEXT_PUBLIC_PACK_B2B`
- `NEXT_PUBLIC_PACK_FILES`
- `NEXT_PUBLIC_PACK_AI`

## Database + migrations

Core schema is in `supabase/migrations/0001_core.sql` and includes:

- `profiles`, `user_roles`, `consents`, `support_tickets`, `privacy_requests`, `audit_logs`
- Baseline RLS policies for “select/insert/update your own rows”

### Backup/restore expectations (baseline)

- **Backups**: enable daily automated backups in Supabase for production
- **Restore**: you should be able to restore to a new project/environment and re-point env vars
- **Migrations**: apply migrations to staging first; only then apply to prod

## Privacy requests (export/delete)

- Users can request deletion via `Settings → Request account deletion` (creates a row in `privacy_requests`)
- Users can export data via `Settings → Export my data` (downloads JSON + records a fulfilled export request)
- Admin queue: `/admin/privacy-requests` + “Mark fulfilled”

## Testing

```bash
npm run test
```

- Smoke tests live in `tests/`
- Optional integration test can run with:
  - `E2E_RUN_INTEGRATION=true`
  - `E2E_EMAIL=...`
  - `E2E_PASSWORD=...`

CI runs on GitHub Actions via `.github/workflows/ci.yml`.

### Continuous security hygiene (baseline)

- **CodeQL**: `.github/workflows/codeql.yml` (static analysis)
- **Secret guardrail**: `scripts/secret-scan.sh` is run in CI to catch obvious service-role key leakage
- **Reporting**: see `SECURITY.md`

## Start a new idea (auth toggle first)

**One question:** Does this product have **user-owned state** (accounts, saved data, billing, roles)?

| If… | Set `NEXT_PUBLIC_PRODUCT_MODE` | Auth | Admin | Typical packs |
|-----|----------------------------------|------|-------|----------------|
| Stateless tool (converter, transcriber) | `utility` | off | off | none |
| SaaS with accounts | `saas` | on | on | billing optional |
| Community / UGC | `community` | on | on | `NEXT_PUBLIC_PACK_UGC=true` |
| Marketplace | `marketplace` | on | on | billing + files |
| Internal admin tool | `internal` | on | on | none |

**Example — audio-to-text toy (no sign-in):** set `NEXT_PUBLIC_PRODUCT_MODE=utility` in `.env.local`, then build under `src/app/(public)/...` (no dashboard, no account flows).

See [docs/NEW_IDEA.md](docs/NEW_IDEA.md) for the full questionnaire and a copy-paste Cursor prompt.

Profile logic lives in [`src/lib/flags/product.ts`](src/lib/flags/product.ts).

## “Start a new idea” module guide

When you have a new product idea, don’t fork the whole repo. **Set product mode first**, then add a module:

1. Add a new route tree under `src/app/(public)/...` (utility) or `src/app/(packs)/packs/<yourPack>/...`
2. Add a flag in `src/lib/flags/packs.ts` if needed
3. Add migrations under `supabase/migrations/` (prefixed, e.g. `0002_<yourPack>.sql`) when you persist user data
4. Add a link card on the home page or `/packs`
5. Add 1 smoke test proving the route renders

## Deployment + rollback runbook (minimum viable)

### Deploy checklist

- Run: `npm run lint && npm run typecheck && npm run test`
- Verify env vars exist in the target environment
- Apply DB migrations in **staging**, verify key flows, then apply to prod

### If deploy “explodes”

- **If it’s a frontend deploy issue**: rollback to the previous known-good build (Vercel/host rollback)
- **If it’s a migration issue**:
  - Stop writes if needed (maintenance mode)
  - Roll forward with a new migration when possible (preferred)
  - If rollback is required, restore from backup into a fresh environment and re-point
- Capture an audit trail for admin-only changes when relevant

### If you suspect a security incident

1. **Detect**: check error tracking/logs, admin audit logs (`/admin/audit-logs`), and recent deploys.
2. **Contain**:
   - rotate exposed secrets immediately (especially `SUPABASE_SERVICE_ROLE_KEY`)
   - disable affected features (feature flags / maintenance mode)
   - revoke/rotate tokens if auth compromise is suspected
3. **Recover**:
   - ship a patch + migration (roll-forward preferred)
   - restore from backup into a clean environment only if necessary
4. **Learn**: add a regression test and a guardrail so it doesn’t happen twice.

