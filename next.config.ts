import type { NextConfig } from "next";

// ============================================================
// Security headers documentation:
// With `output: 'export'`, headers() does NOT work.
// All security headers must be applied at the Nginx/CDN level.
// See nginx-static.conf for the full production configuration.
// ============================================================

const nextConfig: NextConfig = {
  // ── Static Export ──
  output: "export",
  distDir: "out",

  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: true,

  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
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
