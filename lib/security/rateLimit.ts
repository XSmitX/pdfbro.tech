// ============================================================
// In-memory rate limiter — designed for single-instance VPS.
//
// Tracks request counts per IP across a sliding window.
// Returns 429 with Retry-After header when limits exceeded.
//
// For multi-instance / clustered deployments, replace the
// internal Map with Redis (ioredis).
// ============================================================

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

interface RateLimitConfig {
  /** Window length in milliseconds */
  windowMs: number;
  /** Maximum requests allowed per window */
  max: number;
  /** Optional bucket prefix to separate independent limits */
  key?: string;
}

// Two separate stores so per-minute and per-hour limits don't collide
const stores = new Map<string, Map<string, RateLimitBucket>>();

// Periodic cleanup of expired buckets — prevents memory leak under load
let cleanupTimer: NodeJS.Timeout | null = null;
function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const store of stores.values()) {
      for (const [ip, bucket] of store.entries()) {
        if (bucket.resetAt < now) store.delete(ip);
      }
    }
  }, 60_000); // every minute
  // Don't block Node from exiting
  if (typeof cleanupTimer.unref === "function") cleanupTimer.unref();
}

function getStore(key: string): Map<string, RateLimitBucket> {
  let store = stores.get(key);
  if (!store) {
    store = new Map();
    stores.set(key, store);
  }
  return store;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

/**
 * Check and consume one request slot for the given IP.
 * Returns whether the request is allowed plus useful headers.
 */
export function rateLimit(ip: string, config: RateLimitConfig): RateLimitResult {
  ensureCleanup();
  const storeKey = config.key ?? `${config.windowMs}:${config.max}`;
  const store = getStore(storeKey);
  const now = Date.now();

  let bucket = store.get(ip);
  if (!bucket || bucket.resetAt < now) {
    bucket = { count: 0, resetAt: now + config.windowMs };
    store.set(ip, bucket);
  }

  bucket.count += 1;
  const remaining = Math.max(0, config.max - bucket.count);
  const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  return {
    allowed: bucket.count <= config.max,
    remaining,
    resetAt: bucket.resetAt,
    retryAfterSeconds,
  };
}

// ── Preset configs ────────────────────────────────────────
export const RATE_LIMIT_PER_MINUTE: RateLimitConfig = {
  windowMs: 60_000,
  max: 10,
  key: "per-minute",
};

export const RATE_LIMIT_PER_HOUR: RateLimitConfig = {
  windowMs: 60 * 60_000,
  max: 100,
  key: "per-hour",
};

/**
 * Extract client IP from request headers in priority order.
 * Works behind Nginx reverse proxy (X-Forwarded-For) and direct connections.
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  // Nginx proxy commonly sets these
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // Take the first one — the original client IP
    const ip = forwarded.split(",")[0].trim();
    if (ip) return ip;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // Cloudflare (in case of future use)
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "unknown";
}
