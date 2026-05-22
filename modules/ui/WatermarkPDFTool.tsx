"use client";

import { useState, useCallback } from "react";
import { AlertCircle, Stamp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { addWatermark, type WatermarkOptions } from "@/modules/tools/watermarkPDF";
import type { ProcessingResult } from "@/lib/types";

export default function WatermarkPDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(60);
  const [opacity, setOpacity] = useState(0.25);
  const [color, setColor] = useState("#888888");
  const [rotation, setRotation] = useState(45);
  const [position, setPosition] = useState<WatermarkOptions["position"]>("center");

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload a PDF."); return; }
    if (!text.trim()) { setError("Please enter watermark text."); return; }
    setIsProcessing(true); setProgress(20); setError(null); setResult(null);
    try {
      const progressInterval = setInterval(() => setProgress(p => Math.min(p + 10, 85)), 400);
      const r = await addWatermark(files[0].file, { text, fontSize, opacity, color, rotation, position });
      clearInterval(progressInterval); setProgress(100);
      if (!r.success) setError(r.error ?? "Watermark failed.");
      else setResult(r);
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, text, fontSize, opacity, color, rotation, position]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  const POSITIONS: WatermarkOptions["position"][] = ["center", "top-left", "top-right", "bottom-left", "bottom-right"];

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#7c3aed" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF here" hint="A text watermark will be added to every page." />
            </div>

            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              {/* Watermark text */}
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>Watermark Text</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="CONFIDENTIAL"
                  className="w-full rounded-xl px-3 py-2.5 text-sm font-semibold" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
              </div>

              {/* Preview */}
              <div className="rounded-xl p-4 flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)", minHeight: "80px" }}>
                <span style={{ fontSize: `${Math.max(12, fontSize / 4)}px`, opacity, color, transform: `rotate(-${rotation}deg)`, fontWeight: "bold", whiteSpace: "nowrap", fontFamily: "Helvetica, sans-serif" }}>
                  {text || "WATERMARK"}
                </span>
              </div>

              {/* Font size */}
              <div>
                <div className="flex justify-between mb-1"><span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Font Size</span><span className="text-xs font-bold" style={{ color: "#7c3aed" }}>{fontSize}pt</span></div>
                <input type="range" min={20} max={200} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full" style={{ accentColor: "#7c3aed" }} />
              </div>

              {/* Opacity */}
              <div>
                <div className="flex justify-between mb-1"><span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Opacity</span><span className="text-xs font-bold" style={{ color: "#7c3aed" }}>{Math.round(opacity * 100)}%</span></div>
                <input type="range" min={5} max={100} value={Math.round(opacity * 100)} onChange={(e) => setOpacity(+e.target.value / 100)} className="w-full" style={{ accentColor: "#7c3aed" }} />
              </div>

              {/* Rotation */}
              <div>
                <div className="flex justify-between mb-1"><span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Rotation</span><span className="text-xs font-bold" style={{ color: "#7c3aed" }}>{rotation}°</span></div>
                <input type="range" min={0} max={360} value={rotation} onChange={(e) => setRotation(+e.target.value)} className="w-full" style={{ accentColor: "#7c3aed" }} />
              </div>

              {/* Color + Position */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-full rounded-lg border p-0.5 cursor-pointer" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-input)" }} />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>Position</label>
                  <select value={position} onChange={(e) => setPosition(e.target.value as WatermarkOptions["position"])}
                    className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                    {POSITIONS.map(p => <option key={p} value={p}>{p.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3"
                  style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                  <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Adding watermark..." color="#7c3aed" /></div>}

            <button onClick={handleProcess} disabled={isProcessing || !files[0]}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#7c3aed" }}>
              <Stamp className="h-5 w-5" />
              {isProcessing ? "Adding Watermark..." : "Add Watermark"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
