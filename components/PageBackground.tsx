"use client";

import { useTheme } from "@/lib/themeContext";

export type BgVariant = "hero" | "tools" | "tool-page" | "minimal" | "subtle";

interface PageBackgroundProps {
  variant?: BgVariant;
  accentColor?: string;
}

export default function PageBackground({
  variant = "subtle",
  accentColor = "#4f8ef7",
}: PageBackgroundProps) {
  const { isDark } = useTheme();

  // In light mode — only render the hero background (for the homepage).
  // All other pages get a clean solid background with zero patterns.
  if (!isDark && variant !== "hero") return null;

  if (variant === "hero") return <HeroBg isDark={isDark} />;
  if (variant === "tools") return <ToolsBg />;
  if (variant === "tool-page") return <ToolPageBg accentColor={accentColor} />;
  return null;
}

// ─────────────────────────────────────────────────────────────
// HERO — Full effect.
// Dark mode: aurora + triangle grid + particles.
// Light mode: subtle gradient only, no heavy effects.
// ─────────────────────────────────────────────────────────────
function HeroBg({ isDark }: { isDark: boolean }) {
  if (!isDark) {
    // Light mode hero — clean gradient only
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(37,99,235,0.08) 0%, rgba(109,40,217,0.04) 50%, transparent 80%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>
    );
  }

  // Dark mode hero — full cinematic effect
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />

      <svg
        className="absolute inset-0 w-full h-full tri-grid-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hTriGrid" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
            <polygon points="50,0 100,86.6 0,86.6" fill="none" stroke="url(#hTriGrad)" strokeWidth="0.6" />
            <polygon points="0,0 100,0 50,86.6"  fill="none" stroke="url(#hTriGrad)" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="hTriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#4f8ef7" stopOpacity="0.9" />
            <stop offset="40%"  stopColor="#8b6af5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hTriGrid)" />
      </svg>

      <div className="hero-glow-blue" />
      <div className="hero-glow-violet" />
      <div className="hero-glow-pink" />

      <div className="floating-tri floating-tri-1" />
      <div className="floating-tri floating-tri-2" />
      <div className="floating-tri floating-tri-3" />
      <div className="floating-tri floating-tri-4" />
      <div className="floating-tri floating-tri-5" />
      <div className="floating-tri floating-tri-6" />
      <div className="floating-tri floating-tri-7" />
      <div className="floating-tri floating-tri-8" />

      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>

      <div className="hero-scanline" />

      <div
        className="absolute inset-0 page-vignette"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,15,0.4) 100%)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg-primary))" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TOOLS — Directory listing page (dark mode only).
// Subtle aurora blobs + very faint triangle grid.
// ─────────────────────────────────────────────────────────────
function ToolsBg() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div className="aurora-blob aurora-1" style={{ opacity: 0.35 }} />
      <div className="aurora-blob aurora-3" style={{ opacity: 0.25 }} />

      <svg
        className="absolute inset-0 w-full h-full tri-grid-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="tTriGrid" x="0" y="0" width="80" height="69.28" patternUnits="userSpaceOnUse">
            <polygon points="40,0 80,69.28 0,69.28" fill="none" stroke="url(#tTriGrad)" strokeWidth="0.5" />
            <polygon points="0,0 80,0 40,69.28"  fill="none" stroke="url(#tTriGrad)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="tTriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#4f8ef7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8b6af5" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#tTriGrid)" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TOOL PAGE — User is actively using a tool (dark mode only).
// Minimal: one faint accent glow at the very top. Nothing else.
// ─────────────────────────────────────────────────────────────
function ToolPageBg({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "350px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${accentColor}16 0%, ${accentColor}05 50%, transparent 75%)`,
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
