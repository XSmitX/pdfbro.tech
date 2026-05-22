"use client";

import { useState, useCallback } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { rotatePDF, type RotationAngle } from "@/modules/tools/rotatePDF";
import type { ProcessingResult } from "@/lib/types";

export default function RotatePDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [angle, setAngle] = useState<RotationAngle>(90);
  const [target, setTarget] = useState<"all" | "range">("all");
  const [ranges, setRanges] = useState("1-3");

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload a PDF."); return; }
    setIsProcessing(true); setProgress(20); setError(null); setResult(null);
    try {
      const progressInterval = setInterval(() => setProgress(p => Math.min(p + 15, 85)), 300);
      const r = await rotatePDF(files[0].file, { angle, target, ranges: target === "range" ? ranges : undefined });
      clearInterval(progressInterval); setProgress(100);
      if (!r.success) setError(r.error ?? "Rotation failed.");
      else setResult(r);
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, angle, target, ranges]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  const ANGLES: RotationAngle[] = [90, 180, 270];
  const ANGLE_LABELS: Record<RotationAngle, string> = { 90: "90° CW", 180: "180°", 270: "90° CCW" };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#14b8a6" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF here" hint="Upload a PDF to rotate its pages." />
            </div>

            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Rotation Angle</p>
                <div className="grid grid-cols-3 gap-2">
                  {ANGLES.map((a) => (
                    <button key={a} onClick={() => setAngle(a)} className="rounded-xl border py-3 text-sm font-semibold transition-all"
                      style={angle === a ? { borderColor: "var(--accent-green)", backgroundColor: "rgba(20,184,166,0.1)", color: "#14b8a6" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {ANGLE_LABELS[a]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Apply To</p>
                <div className="flex gap-2">
                  {(["all", "range"] as const).map((t) => (
                    <button key={t} onClick={() => setTarget(t)} className="flex-1 rounded-xl border py-2 text-sm font-medium transition-all capitalize"
                      style={target === t ? { borderColor: "#14b8a6", backgroundColor: "rgba(20,184,166,0.1)", color: "#14b8a6" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {t === "all" ? "All Pages" : "Page Range"}
                    </button>
                  ))}
                </div>
                {target === "range" && (
                  <div className="mt-3">
                    <input type="text" value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder="e.g. 1-3,5,7"
                      className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                  </div>
                )}
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

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Rotating pages..." color="#14b8a6" /></div>}

            <button onClick={handleProcess} disabled={isProcessing || !files[0]}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#14b8a6" }}>
              <RotateCcw className="h-5 w-5" />
              {isProcessing ? "Rotating..." : "Rotate PDF"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
