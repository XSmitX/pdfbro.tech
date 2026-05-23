import { ImageResponse } from "next/og";
import { getToolBySlug, TOOLS } from "@/lib/toolRegistry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  const name = tool?.name ?? "Free Online Tool";
  const desc = tool?.description ?? "Free browser-based tool — no signup required";
  const accentColor = tool?.color ?? "#4f8ef7";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f1a 0%, #0a0a0f 60%, #0d0d18 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "56px 64px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${accentColor}, #8b6af5)`,
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "48px",
          }}
        >
          {/* PDFBro Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #4f8ef7, #8b6af5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "white", fontSize: "24px", fontWeight: 800 }}>P</span>
            </div>
            <span
              style={{
                color: "white",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              PDFBro
            </span>
          </div>

          {/* Free badge */}
          <div
            style={{
              background: "rgba(52,211,153,0.12)",
              border: "1px solid rgba(52,211,153,0.3)",
              borderRadius: "28px",
              padding: "10px 22px",
              color: "#34d399",
              fontSize: "18px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#34d399",
                flexShrink: 0,
              }}
            />
            Free · No Signup
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Category badge */}
          <div
            style={{
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}40`,
              borderRadius: "10px",
              padding: "8px 18px",
              width: "fit-content",
              marginBottom: "28px",
              display: "flex",
            }}
          >
            <span
              style={{
                color: accentColor,
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Free Online Tool
            </span>
          </div>

          {/* Tool name */}
          <div
            style={{
              color: "white",
              fontSize: name.length > 20 ? "60px" : "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "24px",
              letterSpacing: "-1.5px",
            }}
          >
            {name}
          </div>

          {/* Tool description */}
          <div
            style={{
              color: "#9090a8",
              fontSize: "28px",
              lineHeight: 1.4,
              maxWidth: "820px",
              fontWeight: 400,
            }}
          >
            {desc}
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "28px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "#505060", fontSize: "18px" }}>
            pdfbro.tech
          </span>
          <div style={{ display: "flex", gap: "28px" }}>
            {["100% Free", "No Watermarks", "Browser-Based"].map((badge) => (
              <div key={badge} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: accentColor, fontSize: "16px" }}>✓</span>
                <span style={{ color: "#606070", fontSize: "16px" }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
