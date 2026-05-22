// ============================================================
// CORS guard — strict origin allowlist.
//
// Only requests from these origins can call /api/* routes.
// Everything else gets a 403.
// ============================================================

const PRODUCTION_ORIGINS = new Set([
  "https://pdfbro.tech",
  "https://www.pdfbro.tech",
]);

const DEV_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https?:\/\/192\.168\.\d+\.\d+(:\d+)?$/, // LAN testing
];

/**
 * Returns true if the request's Origin header is in the allowlist.
 * Same-origin requests (no Origin header) are also allowed.
 */
export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");

  // No Origin header → same-origin request (always allowed)
  if (!origin) return true;

  if (PRODUCTION_ORIGINS.has(origin)) return true;

  for (const pattern of DEV_ORIGIN_PATTERNS) {
    if (pattern.test(origin)) return true;
  }

  return false;
}

/**
 * Returns the CORS headers to apply when an origin is allowed.
 * Echoes the Origin (never wildcard) and lists allowed methods/headers.
 */
export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");

  // For same-origin requests we don't need CORS headers
  if (!origin) return {};

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}
