#!/usr/bin/env bash
set -euo pipefail

# Fail CI if the service role key env name appears in client-adjacent code.
# Legitimate server-only usage (admin client, docs, this script) is excluded.

PATTERN='SUPABASE_SERVICE_ROLE_KEY'

# Paths where the service role key must never be referenced.
SCAN_PATHS=(
  "src/components"
  "src/app"
  "src/middleware.ts"
  "src/lib/auth"
  "src/lib/db"
  "src/lib/flags"
  "src/lib/observability"
  "src/lib/security"
)

# Server-only routes and modules are allowed to reference the env var name.
PATHSPEC_EXCLUDES=(
  ":(exclude)src/app/api"
  ":(exclude)src/lib/supabase/admin.ts"
)

matches="$(git grep -n -- "$PATTERN" -- "${SCAN_PATHS[@]}" "${PATHSPEC_EXCLUDES[@]}" 2>/dev/null || true)"

if [ -n "$matches" ]; then
  echo "Secret-scan failed: '$PATTERN' must not appear in client-adjacent code."
  echo "Use server-only modules under src/lib/supabase/ or src/app/api/ only."
  echo ""
  echo "$matches"
  exit 1
fi

echo "Secret-scan OK."
