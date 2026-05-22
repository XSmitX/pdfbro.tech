// ============================================================
// One-line security guard for API routes.
//
// Use:
//   const guard = await guardApiRequest(req);
//   if (guard.response) return guard.response;
//
// Applies in order:
//   1. CORS origin check
//   2. Per-minute rate limit (10 req/min/IP)
//   3. Per-hour rate limit (100 req/hour/IP)
//   4. Standard security response headers
// ============================================================

import { NextResponse } from "next/server";
import { isAllowedOrigin, getCorsHeaders } from "./cors";
import {
  rateLimit,
  getClientIp,
  RATE_LIMIT_PER_MINUTE,
  RATE_LIMIT_PER_HOUR,
} from "./rateLimit";

export interface ApiGuardResult {
  /** If set, return this response immediately. Otherwise proceed with handler. */
  response: NextResponse | null;
  /** Headers to apply to the eventual success response. */
  responseHeaders: Record<string, string>;
  /** Client IP, for logging / audit purposes. */
  ip: string;
}

/**
 * Run all security checks on an incoming API request.
 * Returns a NextResponse to short-circuit if any check fails,
 * otherwise returns null and lets the handler proceed.
 */
export async function guardApiRequest(req: Request): Promise<ApiGuardResult> {
  const ip = getClientIp(req);
  const corsHeaders = getCorsHeaders(req);

  // Common headers we want on every response
  const baseHeaders: Record<string, string> = {
    ...corsHeaders,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  };

  // ── 1. Method check ──
  if (req.method === "OPTIONS") {
    // Preflight
    return {
      response: new NextResponse(null, { status: 204, headers: baseHeaders }),
      responseHeaders: baseHeaders,
      ip,
    };
  }

  // ── 2. CORS origin check ──
  if (!isAllowedOrigin(req)) {
    return {
      response: NextResponse.json(
        { error: "Origin not allowed" },
        { status: 403, headers: baseHeaders },
      ),
      responseHeaders: baseHeaders,
      ip,
    };
  }

  // ── 3. Rate limit: per minute ──
  const minute = rateLimit(ip, RATE_LIMIT_PER_MINUTE);
  if (!minute.allowed) {
    return {
      response: NextResponse.json(
        {
          error: "Too many requests. Please wait a moment.",
          retryAfterSeconds: minute.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            ...baseHeaders,
            "Retry-After": String(minute.retryAfterSeconds),
            "X-RateLimit-Limit": String(RATE_LIMIT_PER_MINUTE.max),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(minute.resetAt / 1000)),
          },
        },
      ),
      responseHeaders: baseHeaders,
      ip,
    };
  }

  // ── 4. Rate limit: per hour ──
  const hour = rateLimit(ip, RATE_LIMIT_PER_HOUR);
  if (!hour.allowed) {
    return {
      response: NextResponse.json(
        {
          error: "Hourly limit reached. Please try again later.",
          retryAfterSeconds: hour.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            ...baseHeaders,
            "Retry-After": String(hour.retryAfterSeconds),
            "X-RateLimit-Limit": String(RATE_LIMIT_PER_HOUR.max),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(hour.resetAt / 1000)),
          },
        },
      ),
      responseHeaders: baseHeaders,
      ip,
    };
  }

  // All checks passed — handler can proceed.
  const successHeaders = {
    ...baseHeaders,
    "X-RateLimit-Limit-Minute": String(RATE_LIMIT_PER_MINUTE.max),
    "X-RateLimit-Remaining-Minute": String(minute.remaining),
    "X-RateLimit-Limit-Hour": String(RATE_LIMIT_PER_HOUR.max),
    "X-RateLimit-Remaining-Hour": String(hour.remaining),
  };

  return {
    response: null,
    responseHeaders: successHeaders,
    ip,
  };
}

/**
 * Build a generic error response that doesn't leak server internals.
 */
export function genericErrorResponse(
  message: string,
  status: number,
  headers: Record<string, string> = {},
): NextResponse {
  return NextResponse.json({ error: message }, { status, headers });
}
