import type { NextConfig } from "next";
import path from "path";

// ============================================================
// Production-grade security headers.
// Applied to every response server-wide.
// ============================================================

// Content-Security-Policy:
//   default-src: nothing by default
//   script-src: self + Google Fonts + CDNs (pdfjs, heic2any) + inline (Next.js needs this)
//   style-src: self + Google Fonts + inline (Tailwind + Framer Motion)
//   img-src: self + data URIs (for Image components) + https
//   font-src: self + Google Fonts data
//   connect-src: self + CDNs we fetch from (QR Server API, etc.)
//   frame-ancestors: none — prevents clickjacking
//   form-action: self
//   base-uri: self
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://api.qrserver.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.analytics.google.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Permissions-Policy: explicitly deny powerful APIs we don't use
const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "camera=()",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "payment=()",
  "usb=()",
  "interest-cohort=()", // Opt out of FLoC
].join(", ");

const SECURITY_HEADERS = [
  // Prevents MIME-sniffing attacks
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevents clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Don't send referrer to cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Legacy XSS protection (modern browsers ignore but defense in depth)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // HSTS — force HTTPS for 1 year, include subdomains, eligible for browser preload list
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // CSP — biggest XSS mitigation
  { key: "Content-Security-Policy", value: CSP_DIRECTIVES },
  // Permissions policy — disable powerful browser features
  { key: "Permissions-Policy", value: PERMISSIONS_POLICY },
  // Cross-origin isolation (light)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Don't leak server identity
  { key: "X-Powered-By", value: "" },
  // Hint for prefetch
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // remove X-Powered-By: Next.js
  outputFileTracingRoot: path.resolve("."),
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "pdf-lib",
    ],
  },

  async headers() {
    return [
      // ── Global security headers on every response ──
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },

      // ── Aggressive caching for hashed static assets ──
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // ── Public logo (small file, OK to cache) ──
      {
        source: "/:file.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },

      // ── API routes: no caching, CORS handled per-route in lib/security/apiGuard.ts ──
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
          // Note: CORS Allow-Origin is NOT set here.
          // Each route validates origin in apiGuard.ts and sets it dynamically
          // (echoing the request Origin only when it matches the allowlist).
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        crypto: false,
        buffer: false,
      };
    }

    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        "canvas",
      ];
    }

    return config;
  },
};

export default nextConfig;
