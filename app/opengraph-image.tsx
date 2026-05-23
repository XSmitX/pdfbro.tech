import { ImageResponse } from "next/og";

export const alt = "PDFBro — 100+ Free PDF & Image Tools Online | No Signup";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TOOL_PILLS = [
  "Merge PDF",
  "Compress PDF",
  "PDF to Word",
  "Remove Background",
  "HEIC to JPG",
  "QR Code",
  "Sign PDF",
  "Image to PDF",
];

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f0f1a 0%, #0a0a0f 60%, #0d0d18 100%)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          padding: "56px 64px",
          position: "relative",
        }}
      >
        {/* Top gradient accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4f8ef7, #8b6af5, #34d399)",
            display: "flex",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "13px",
              background: "linear-gradient(135deg, #4f8ef7, #8b6af5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "white", fontSize: "26px", fontWeight: 800 }}>P</span>
          </div>
          <span style={{ color: "white", fontSize: "32px", fontWeight: 800, letterSpacing: "-0.5px" }}>
            PDFBro
          </span>
          <div
            style={{
              background: "rgba(52,211,153,0.12)",
              border: "1px solid rgba(52,211,153,0.28)",
              borderRadius: "24px",
              padding: "8px 18px",
              color: "#34d399",
              fontSize: "16px",
              fontWeight: 600,
              marginLeft: "12px",
              display: "flex",
            }}
          >
            Free · No Signup · No Limits
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: "white",
            fontSize: "66px",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-2px",
            marginBottom: "18px",
            display: "flex",
          }}
        >
          100+ Free PDF &amp; Image Tools
        </div>

        {/* Subheadline */}
        <div
          style={{
            color: "#9090a8",
            fontSize: "26px",
            lineHeight: 1.4,
            marginBottom: "36px",
            display: "flex",
          }}
        >
          Merge, compress, convert PDFs. Compress images, HEIC to JPG, remove backgrounds.
        </div>

        {/* Tool pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "auto" }}>
          {TOOL_PILLS.map((tool) => (
            <div
              key={tool}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "20px",
                padding: "8px 16px",
                color: "#c0c0d8",
                fontSize: "17px",
                fontWeight: 500,
                display: "flex",
              }}
            >
              {tool}
            </div>
          ))}
          <div
            style={{
              background: "rgba(79,142,247,0.14)",
              border: "1px solid rgba(79,142,247,0.30)",
              borderRadius: "20px",
              padding: "8px 16px",
              color: "#4f8ef7",
              fontSize: "17px",
              fontWeight: 600,
              display: "flex",
            }}
          >
            +90 more →
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            marginTop: "28px",
          }}
        >
          <span style={{ color: "#505060", fontSize: "19px" }}>pdfbro.tech</span>
          <div style={{ display: "flex", gap: "28px" }}>
            {["No Daily Limits", "Files Never Uploaded", "100% Free Forever"].map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{ color: "#34d399", fontSize: "17px" }}>✓</span>
                <span style={{ color: "#606070", fontSize: "17px" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
