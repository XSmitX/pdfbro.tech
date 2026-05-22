import { ImageResponse } from "next/og";

export const alt = "PDFBro — 100+ Free PDF & Image Tools Online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0a0a1a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "80px",
        }}
      >
        {/* Top blue accent bar */}
        <div style={{ display: "flex", width: "100%", height: "4px", background: "linear-gradient(90deg, #4f8ef7, #8b6af5)", marginBottom: "48px" }} />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #4f8ef7, #8b6af5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            fontWeight: "900",
            color: "white",
          }}>
            P
          </div>
          <div style={{ display: "flex", fontSize: "34px", fontWeight: "800", color: "white", letterSpacing: "-0.5px" }}>
            PDFBro
          </div>
        </div>

        {/* Main headline */}
        <div style={{
          display: "flex",
          fontSize: "62px",
          fontWeight: "900",
          color: "white",
          lineHeight: "1.1",
          marginBottom: "20px",
          maxWidth: "900px",
        }}>
          100+ Free PDF &amp; Image Tools Online
        </div>

        {/* Tagline */}
        <div style={{
          display: "flex",
          fontSize: "26px",
          color: "rgba(255,255,255,0.55)",
          marginBottom: "44px",
        }}>
          Merge · Compress · Convert · Remove Background
        </div>

        {/* Badges row */}
        <div style={{ display: "flex", gap: "14px" }}>
          {["No Signup", "No Watermarks", "100% Free", "Browser‑Based"].map((tag) => (
            <div key={tag} style={{
              background: "rgba(79,142,247,0.15)",
              border: "1px solid rgba(79,142,247,0.35)",
              borderRadius: "100px",
              padding: "10px 22px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#7ab0f9",
              display: "flex",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* URL bottom-right */}
        <div style={{
          display: "flex",
          position: "absolute",
          bottom: "44px",
          right: "80px",
          fontSize: "20px",
          color: "rgba(255,255,255,0.25)",
          fontWeight: "500",
        }}>
          pdfbro.tech
        </div>
      </div>
    ),
    { ...size }
  );
}
