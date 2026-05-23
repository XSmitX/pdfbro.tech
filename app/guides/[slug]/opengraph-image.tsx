import { ImageResponse } from "next/og";
import { getGuideBySlug, GUIDES, GUIDE_CATEGORY_META } from "@/lib/guides/index";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  const title = guide?.title ?? "How-To Guide";
  const desc = guide?.metaDescription?.slice(0, 120) ?? "Free step-by-step tutorial — no signup required";
  const category = guide?.category ?? "pdf";
  const catMeta = GUIDE_CATEGORY_META[category as keyof typeof GUIDE_CATEGORY_META] ?? GUIDE_CATEGORY_META.pdf;
  const accentColor = catMeta.color;

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
            background: `linear-gradient(90deg, ${accentColor}, #4f8ef7)`,
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "44px",
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

          {/* Guide type badge */}
          <div
            style={{
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}40`,
              borderRadius: "28px",
              padding: "10px 22px",
              color: accentColor,
              fontSize: "18px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "20px" }}>📖</span>
            <span>{catMeta.label ?? "How-To Guide"}</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Step-by-step label */}
          <div
            style={{
              background: "rgba(52,211,153,0.10)",
              border: "1px solid rgba(52,211,153,0.25)",
              borderRadius: "10px",
              padding: "8px 18px",
              width: "fit-content",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#34d399", fontSize: "16px" }}>✓</span>
            <span style={{ color: "#34d399", fontSize: "16px", fontWeight: 600 }}>
              Free Step-by-Step Guide
            </span>
          </div>

          {/* Guide title */}
          <div
            style={{
              color: "white",
              fontSize: title.length > 50 ? "46px" : title.length > 35 ? "54px" : "62px",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-1px",
              maxWidth: "960px",
            }}
          >
            {title}
          </div>

          {/* Guide description */}
          <div
            style={{
              color: "#9090a8",
              fontSize: "24px",
              lineHeight: 1.4,
              maxWidth: "860px",
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
            pdfbro.tech/guides
          </span>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Free Forever", "No Signup", "Browser-Based"].map((badge) => (
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
