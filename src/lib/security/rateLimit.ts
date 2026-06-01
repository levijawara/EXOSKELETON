type Bucket = {
  count: number;
  resetAtMs: number;
};

const memory = new Map<string, Bucket>();

export type RateLimitResult =
  | { ok: true; remaining: number; resetAtMs: number }
  | { ok: false; remaining: 0; resetAtMs: number };

/**
 * Minimal in-memory rate limiting.
 *
 * Notes:
 * - Works for local dev and single-instance deployments.
 * - For multi-instance/serverless, swap to Upstash/Redis or a provider edge KV.
 */
export function rateLimit({
  key,
  limit,
  windowMs,
  nowMs = Date.now(),
}: {
  key: string;
  limit: number;
  windowMs: number;
  nowMs?: number;
}): RateLimitResult {
  const bucket = memory.get(key);
  if (!bucket || nowMs >= bucket.resetAtMs) {
    const resetAtMs = nowMs + windowMs;
    memory.set(key, { count: 1, resetAtMs });
    return { ok: true, remaining: Math.max(0, limit - 1), resetAtMs };
  }

  if (bucket.count >= limit) {
    return { ok: false, remaining: 0, resetAtMs: bucket.resetAtMs };
  }

  bucket.count += 1;
  return {
    ok: true,
    remaining: Math.max(0, limit - bucket.count),
    resetAtMs: bucket.resetAtMs,
  };
}

