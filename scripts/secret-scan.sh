#!/usr/bin/env bash
set -euo pipefail

# Basic repo-local guardrail: fail CI if a known secret variable name
# appears in tracked source (excluding docs/examples).

PATTERN='SUPABASE_SERVICE_ROLE_KEY'

EXCLUDES=(
  ':(exclude).env.example'
  ':(exclude)README.md'
  ':(exclude)SECURITY.md'
)

if git grep -n -- "$PATTERN" -- . "${EXCLUDES[@]}" >/dev/null; then
  echo "Secret-scan failed: found '$PATTERN' in tracked files."
  echo "Never place service role keys in client/shared code. Use server-only env + server-only code."
  git grep -n -- "$PATTERN" -- . "${EXCLUDES[@]}" || true
  exit 1
fi

echo "Secret-scan OK."

