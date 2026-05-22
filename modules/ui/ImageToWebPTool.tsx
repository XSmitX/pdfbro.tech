"use client";

import { useState, useCallback } from "react";
import { AlertCircle, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/utils";
import type { ProcessingResult } from "@/lib/types";

export default function ImageToWebPTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.85);

  const { files, isDragging, inputRef, addFiles, removeFile, reorderFiles, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "image/*", multiple: true, maxFileSize: 30 * 1024 * 1024, maxFiles: 20,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) { setError("Please upload at least one image."); return; }
    setIsProcessing(true); setProgress(10); setError(null); setResult(null);
    try {
      const outputFiles: ProcessingResult["files"] = [];
      for (let i = 0; i < files.length; i++) {
        setProgress(Math.round((i / files.length) * 85) + 10);
        const img = await loadImageFromFile(files[i].file);
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(img, 0, 0);
        const blob = await canvasToBlob(canvas, "image/webp", quality);
        const baseName = stripExtension(files[i].name);
        outputFiles.push({ name: baseName + ".webp", blob, size: blob.size, type: "image/webp" });
      }
      setProgress(100);
      if (outputFiles.length === 0) setError("Conversion failed.");
      else setResult({ success: true, files: outputFiles, processingTime: Date.now() });
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, quality]);

  const totalSize = files.reduce((s, f) => s + f.size, 0);
  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#7c3aed" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="image/*" multiple onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} onReorder={reorderFiles} label="Drop images here" hint="Converts PNG, JPEG, GIF to WebP. Batch supported." />
            </div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <div className="flex justify-between mb-1"><span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Quality</span><span className="text-sm font-bold" style={{ color: "#7c3aed" }}>{Math.round(quality * 100)}%</span></div>
              <input type="range" min={30} max={100} value={Math.round(quality * 100)} onChange={(e) => setQuality(+e.target.value / 100)} className="w-full" style={{ accentColor: "#7c3aed" }} />
              <div className="flex justify-between text-xs mt-0.5" style={{ color: "var(--text-muted)" }}><span>Smaller file</span><span>Better quality</span></div>
            </div>
            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                  <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Converting to WebP..." color="#7c3aed" /></div>}
            <button onClick={handleProcess} disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#7c3aed" }}>
              <ImageIcon className="h-5 w-5" />
              {isProcessing ? "Converting..." : `Convert ${files.length > 0 ? files.length : ""} to WebP`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
