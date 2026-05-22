// ============================================================
// Global middleware — runs on every request.
//
// Responsibilities:
//   1. Add strict security headers to all responses
//   2. Block suspicious request paths
//
// Per-route rate limiting and CORS are enforced inside the
// individual API handlers via lib/security/apiGuard.ts.
// ============================================================

import { NextResponse, type NextRequest } from "next/server";

// Paths we never want to serve (probing / exploit attempts)
const BLOCKED_PATH_PATTERNS = [
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/xmlrpc\.php/i,
  /\/\.env/i,
  /\/\.git\//i,
  /\/phpmyadmin/i,
  /\.(php|asp|aspx|jsp)$/i,
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Block well-known exploit probes early — return 404 not 403
  // (404 reveals less about what the server is)
  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse(null, { status: 404 });
    }
  }

  // Continue with the request and attach security headers to the response
  const res = NextResponse.next();

  // Already set in next.config.ts headers, but we set them here too
  // so they apply to middleware-generated responses and edge functions.
  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set("X-Content-Type-Options", "nosniff");

  return res;
}

export const config = {
  // Run on all routes except internal assets and image optimization
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|robots.txt|sitemap.xml|llms.txt).*)",
  ],
};
