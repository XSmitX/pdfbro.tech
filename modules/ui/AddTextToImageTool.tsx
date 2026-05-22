"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AlertCircle, Type, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import { useFileUpload } from "@/hooks/useFileUpload";
import { loadImageFromFile, canvasToBlob, stripExtension, downloadBlob } from "@/lib/utils";

export default function AddTextToImageTool() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const [text, setText] = useState("Your Text Here");
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [posX, setPosX] = useState(50); // percentage
  const [posY, setPosY] = useState(85); // percentage
  const [bold, setBold] = useState(false);
  const [shadow, setShadow] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "image/*", multiple: false, maxFileSize: 20 * 1024 * 1024, maxFiles: 1,
  });

  // Load image when file is uploaded
  useEffect(() => {
    if (!files[0]) { setImgSrc(null); return; }
    const url = URL.createObjectURL(files[0].file);
    setImgSrc(url);
    const img = new Image();
    img.onload = () => setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [files]);

  // Render preview
  useEffect(() => {
    if (!previewRef.current || !imgSrc || !imgNatural.w) return;
    const canvas = previewRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = imgNatural.w; canvas.height = imgNatural.h;
      ctx.drawImage(img, 0, 0);
      const x = (posX / 100) * imgNatural.w;
      const y = (posY / 100) * imgNatural.h;
      const fontWeight = bold ? "bold" : "normal";
      ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (shadow) {
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = fontSize / 6;
        ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2;
      }
      ctx.fillStyle = fontColor;
      ctx.fillText(text, x, y);
      ctx.shadowColor = "transparent";
    };
    img.src = imgSrc;
  }, [imgSrc, imgNatural, text, fontSize, fontColor, posX, posY, bold, shadow]);

  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    const blob = await canvasToBlob(previewRef.current, "image/jpeg", 0.95);
    const name = files[0] ? stripExtension(files[0].name) + "_text.jpg" : "image_text.jpg";
    downloadBlob(blob, name);
  }, [files]);

  const handleReset = () => { clearFiles(); setImgSrc(null); setError(null); };

  return (
    <div className="space-y-4">
      {!imgSrc ? (
        <>
          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
            <DropZone isDragging={isDragging} files={files} acceptedTypes="image/*" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop an image here" hint="Upload an image to add custom text overlay." />
          </div>
          <AnimatePresence>
            {uploadError && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                <p className="text-sm" style={{ color: "var(--accent-red)" }}>{uploadError}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Live preview canvas */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
            <canvas ref={previewRef} className="w-full" style={{ maxHeight: "320px", objectFit: "contain" }} />
          </div>

          {/* Controls */}
          <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <div>
              <label className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>Text</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between mb-1"><span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Font Size</span><span className="text-xs font-bold" style={{ color: "#be185d" }}>{fontSize}px</span></div>
                <input type="range" min={12} max={200} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full" style={{ accentColor: "#be185d" }} />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>Color</label>
                <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="h-9 w-full rounded-lg border p-0.5 cursor-pointer" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-input)" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between mb-1"><span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Horizontal Position</span><span className="text-xs font-bold" style={{ color: "#be185d" }}>{posX}%</span></div>
                <input type="range" min={5} max={95} value={posX} onChange={(e) => setPosX(+e.target.value)} className="w-full" style={{ accentColor: "#be185d" }} />
              </div>
              <div>
                <div className="flex justify-between mb-1"><span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Vertical Position</span><span className="text-xs font-bold" style={{ color: "#be185d" }}>{posY}%</span></div>
                <input type="range" min={5} max={95} value={posY} onChange={(e) => setPosY(+e.target.value)} className="w-full" style={{ accentColor: "#be185d" }} />
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={bold} onChange={(e) => setBold(e.target.checked)} style={{ accentColor: "#be185d" }} /><span className="text-sm font-bold" style={{ color: "var(--text-secondary)" }}>Bold</span></label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={shadow} onChange={(e) => setShadow(e.target.checked)} style={{ accentColor: "#be185d" }} /><span className="text-sm" style={{ color: "var(--text-secondary)" }}>Text Shadow</span></label>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleDownload}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#be185d" }}>
              <Download className="h-4 w-4" /> Download Image
            </button>
            <button onClick={handleReset}
              className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold"
              style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-secondary)" }}>
              Reset
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
