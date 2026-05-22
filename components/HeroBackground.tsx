"use client";

// ────────────────────────────────────────────────────────────
// HeroBackground — Animated SVG triangle pattern + glowing orbs
// Purely CSS-animated so it works without hydration issues.
// ────────────────────────────────────────────────────────────

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ── 1. Deep radial glows ── */}
      <div className="hero-glow-blue" />
      <div className="hero-glow-violet" />
      <div className="hero-glow-pink" />

      {/* ── 2. Triangle grid pattern (SVG) ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="triangleGrid" x="0" y="0" width="80" height="69.28" patternUnits="userSpaceOnUse">
            {/* Equilateral triangles tiled in rows */}
            {/* Row 1 — pointing up */}
            <polygon points="40,0 80,69.28 0,69.28" fill="none" stroke="url(#triGrad)" strokeWidth="0.8" />
            {/* Row 1 — pointing down */}
            <polygon points="0,0 80,0 40,69.28" fill="none" stroke="url(#triGrad)" strokeWidth="0.8" />
          </pattern>
          <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f8ef7" />
            <stop offset="50%" stopColor="#8b6af5" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#triangleGrid)" />
      </svg>

      {/* ── 3. Floating triangles (large, animated) ── */}
      <div className="floating-tri floating-tri-1" />
      <div className="floating-tri floating-tri-2" />
      <div className="floating-tri floating-tri-3" />
      <div className="floating-tri floating-tri-4" />
      <div className="floating-tri floating-tri-5" />
      <div className="floating-tri floating-tri-6" />

      {/* ── 4. Scanline shimmer ── */}
      <div className="hero-scanline" />

      {/* ── 5. Bottom fade to page bg ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg-primary))" }}
      />
    </div>
  );
}
