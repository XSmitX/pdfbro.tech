"use client";

import { useState, useCallback } from "react";
import { AlertCircle, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { resizeImages, type ResizeImageOptions } from "@/modules/tools/resizeImage";
import type { ProcessingResult } from "@/lib/types";

type Mode = "pixels" | "percentage" | "preset";
type Preset = ResizeImageOptions["preset"];

export default function ResizeImageTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState<Mode>("pixels");
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [percentage, setPercentage] = useState(50);
  const [preset, setPreset] = useState<Preset>("1920x1080");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [quality, setQuality] = useState(0.9);

  const { files, isDragging, inputRef, addFiles, removeFile, reorderFiles, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "image/*", multiple: true, maxFileSize: 30 * 1024 * 1024, maxFiles: 20,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) { setError("Please upload at least one image."); return; }
    setIsProcessing(true); setProgress(10); setError(null); setResult(null);
    try {
      const pi = setInterval(() => setProgress(p => Math.min(p + 10, 85)), 300);
      const opts: ResizeImageOptions = { mode, width, height, percentage, preset, maintainAspectRatio, outputFormat, quality };
      const r = await resizeImages(files.map(f => f.file), opts);
      clearInterval(pi); setProgress(100);
      if (!r.success) setError(r.error ?? "Failed.");
      else setResult(r);
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, mode, width, height, percentage, preset, maintainAspectRatio, outputFormat, quality]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };
  const totalSize = files.reduce((s, f) => s + f.size, 0);

  const PRESETS: Preset[] = ["640x480", "800x600", "1280x720", "1920x1080", "2048x2048"];

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#0891b2" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="image/*" multiple onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} onReorder={reorderFiles} label="Drop images here" hint="Supports JPG, PNG, WEBP. Batch resize up to 20 images." />
            </div>

            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              {/* Mode */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Resize Mode</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["pixels", "percentage", "preset"] as Mode[]).map(m => (
                    <button key={m} onClick={() => setMode(m)} className="rounded-xl border py-2 text-xs font-semibold capitalize transition-all"
                      style={mode === m ? { borderColor: "#0891b2", backgroundColor: "rgba(8,145,178,0.1)", color: "#0891b2" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {mode === "pixels" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>Width (px)</label>
                    <input type="number" value={width} onChange={e => setWidth(+e.target.value)} className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>Height (px)</label>
                    <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                  </div>
                </div>
              )}

              {mode === "percentage" && (
                <div>
                  <div className="flex justify-between mb-1"><span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Scale</span><span className="text-xs font-bold" style={{ color: "#0891b2" }}>{percentage}%</span></div>
                  <input type="range" min={1} max={400} value={percentage} onChange={e => setPercentage(+e.target.value)} className="w-full" style={{ accentColor: "#0891b2" }} />
                </div>
              )}

              {mode === "preset" && (
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map(p => (
                    <button key={p} onClick={() => setPreset(p)} className="rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all"
                      style={preset === p ? { borderColor: "#0891b2", backgroundColor: "rgba(8,145,178,0.1)", color: "#0891b2" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {/* Options */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={maintainAspectRatio} onChange={e => setMaintainAspectRatio(e.target.checked)} style={{ accentColor: "#0891b2" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Maintain aspect ratio</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>Output Format</label>
                  <select value={outputFormat} onChange={e => setOutputFormat(e.target.value as "jpeg" | "png" | "webp")} className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Quality</span><span className="text-xs font-bold" style={{ color: "#0891b2" }}>{Math.round(quality * 100)}%</span></div>
                  <input type="range" min={10} max={100} value={Math.round(quality * 100)} onChange={e => setQuality(+e.target.value / 100)} className="w-full mt-2" style={{ accentColor: "#0891b2" }} />
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

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Resizing images..." color="#0891b2" /></div>}

            <button onClick={handleProcess} disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#0891b2" }}>
              <Maximize2 className="h-5 w-5" />
              {isProcessing ? "Resizing..." : `Resize ${files.length > 0 ? files.length : ""} Image${files.length !== 1 ? "s" : ""}`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
