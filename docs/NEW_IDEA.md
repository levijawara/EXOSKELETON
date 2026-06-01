# New idea bootstrap

Use this **before** building features in EXOSKELETON.

## The one question

**Does this product have user-owned state?**

- Saved data tied to a user
- Accounts, roles, billing
- Admin moderation of per-user content

If **no** → you are building a **utility**.  
If **yes** → pick an archetype below.

## Archetypes

| Mode | Env value | Auth | Admin | When to use |
|------|-----------|------|-------|-------------|
| Utility | `utility` | off | off | Converters, transcribers, formatters, one-shot tools |
| SaaS | `saas` | on | on | Subscriptions, dashboards, saved settings |
| Community | `community` | on | on | Posts, comments, reports, mod queue |
| Marketplace | `marketplace` | on | on | Buyers/sellers, payouts |
| Internal | `internal` | on | on | Admin-only or team tools |

Set in `.env.local`:

```bash
NEXT_PUBLIC_PRODUCT_MODE=utility
```

Restart the dev server after changing mode.

## Suggested packs (manual)

After choosing a mode, enable optional packs in `.env.local`:

| Mode | Often enable |
|------|----------------|
| `utility` | none (rate limiting only if you add an API route) |
| `saas` | `NEXT_PUBLIC_PACK_BILLING=true` when monetized |
| `community` | `NEXT_PUBLIC_PACK_UGC=true` |
| `marketplace` | `NEXT_PUBLIC_PACK_BILLING=true`, `NEXT_PUBLIC_PACK_FILES=true` |

## Copy-paste prompt for Cursor

```
Before implementing this feature in EXOSKELETON:

1. Ask me: does this product have user-owned state (accounts, saved data, billing, roles)?
2. If NO: set NEXT_PUBLIC_PRODUCT_MODE=utility. Do not add sign-in, profiles, dashboard, or account settings unless I explicitly ask.
3. If YES: ask which archetype (saas | community | marketplace | internal) and confirm .env.local is updated before writing routes or APIs.
4. Build the feature in the right place: public routes for utilities, (app) or (packs) for authenticated products.
```

## Example: audio-to-text (utility)

- `NEXT_PUBLIC_PRODUCT_MODE=utility`
- Route: `src/app/(public)/tools/transcribe/page.tsx` (name as you like)
- No Supabase auth required unless you log usage server-side
- Keep legal pages if you collect analytics; skip account flows
