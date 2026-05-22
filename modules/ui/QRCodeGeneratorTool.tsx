"use client";

import { useState } from "react";
import { QrCode, Download } from "lucide-react";
import { motion } from "framer-motion";
import { downloadBlob } from "@/lib/utils";

type QRType = "url" | "text" | "wifi" | "email" | "phone";

export default function QRCodeGeneratorTool() {
  const [input, setInput] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [qrType, setQrType] = useState<QRType>("url");
  const [qrUrl, setQrUrl] = useState("");
  const [generated, setGenerated] = useState(false);
  const [size, setSize] = useState(300);

  const generate = () => {
    if (!input.trim()) return;
    let data = input;
    if (qrType === "wifi") {
      // Proper WiFi QR format: WIFI:T:<security>;S:<ssid>;P:<password>;;
      data = `WIFI:T:${wifiSecurity};S:${input};P:${wifiPassword};;`;
    }
    if (qrType === "email") data = "mailto:" + input;
    if (qrType === "phone") data = "tel:" + input;
    const url = "https://api.qrserver.com/v1/create-qr-code/?size=" + size + "x" + size + "&data=" + encodeURIComponent(data);
    setQrUrl(url);
    setGenerated(true);
  };

  const downloadQR = async () => {
    if (!qrUrl) return;
    try {
      const r = await fetch(qrUrl);
      const blob = await r.blob();
      downloadBlob(blob, "qrcode.png");
    } catch { alert("Download failed. Right-click the image to save."); }
  };

  const TYPES: { id: QRType; label: string; placeholder: string }[] = [
    { id: "url", label: "URL", placeholder: "https://pdfbro.tech" },
    { id: "text", label: "Text", placeholder: "Any text content..." },
    { id: "email", label: "Email", placeholder: "user@example.com" },
    { id: "phone", label: "Phone", placeholder: "+1234567890" },
    { id: "wifi", label: "WiFi", placeholder: "Network Name (SSID)" },
  ];

  const currentType = TYPES.find(t => t.id === qrType)!;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
        {/* Type selector */}
        <div>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>QR Code Type</p>
          <div className="flex gap-2 flex-wrap">
            {TYPES.map(t => (
              <button key={t.id} onClick={() => { setQrType(t.id); setGenerated(false); }}
                className="rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all"
                style={qrType === t.id ? { borderColor: "#1d4ed8", backgroundColor: "rgba(29,78,216,0.1)", color: "#1d4ed8" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>
            {qrType === "wifi" ? "WiFi Network Name (SSID)" : qrType === "url" ? "Enter URL" : qrType === "email" ? "Email Address" : qrType === "phone" ? "Phone Number" : "Enter Text"}
          </label>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder={currentType.placeholder}
            className="w-full rounded-xl px-3 py-2.5 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
        </div>

        {/* WiFi-specific fields */}
        {qrType === "wifi" && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>WiFi Password</label>
              <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="Leave blank for open networks"
                className="w-full rounded-xl px-3 py-2.5 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>Security Type</label>
              <div className="flex gap-2">
                {(["WPA", "WEP", "nopass"] as const).map((s) => (
                  <button key={s} onClick={() => setWifiSecurity(s)}
                    className="rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all"
                    style={wifiSecurity === s ? { borderColor: "#1d4ed8", backgroundColor: "rgba(29,78,216,0.1)", color: "#1d4ed8" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                    {s === "nopass" ? "Open (No Password)" : s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Size */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Size</span>
            <span className="text-xs font-bold" style={{ color: "#1d4ed8" }}>{size}x{size}px</span>
          </div>
          <input type="range" min={150} max={600} step={50} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" style={{ accentColor: "#1d4ed8" }} />
        </div>

        <button onClick={generate} disabled={!input.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 transition-all hover:scale-105"
          style={{ backgroundColor: "#1d4ed8" }}>
          <QrCode className="h-5 w-5" /> Generate QR Code
        </button>
      </div>

      {generated && qrUrl && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-6 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt="Generated QR Code" className="mx-auto rounded-xl mb-4"
            style={{ width: Math.min(size, 280), height: Math.min(size, 280) }} />
          <p className="text-sm mb-1 font-medium" style={{ color: "var(--text-primary)" }}>QR Code generated!</p>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            {qrType === "url" ? input : qrType === "wifi" ? "WiFi: " + input : input}
          </p>
          <button onClick={downloadQR}
            className="flex mx-auto items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#1d4ed8" }}>
            <Download className="h-4 w-4" /> Download PNG
          </button>
        </motion.div>
      )}
    </div>
  );
}
