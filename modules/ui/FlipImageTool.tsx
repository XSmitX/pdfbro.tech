"use client";

import { useState, useCallback } from "react";
import { AlertCircle, FlipHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/utils";
import type { ProcessingResult } from "@/lib/types";

export default function FlipImageTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [flipH, setFlipH] = useState(true);
  const [flipV, setFlipV] = useState(false);

  const { files, isDragging, inputRef, addFiles, removeFile, reorderFiles, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "image/*", multiple: true, maxFileSize: 20 * 1024 * 1024, maxFiles: 20,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) { setError("Please upload at least one image."); return; }
    if (!flipH && !flipV) { setError("Please select at least one flip direction."); return; }
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
        ctx.save();
        if (flipH && flipV) { ctx.scale(-1, -1); ctx.drawImage(img, -canvas.width, -canvas.height); }
        else if (flipH) { ctx.scale(-1, 1); ctx.drawImage(img, -canvas.width, 0); }
        else { ctx.scale(1, -1); ctx.drawImage(img, 0, -canvas.height); }
        ctx.restore();
        const mimeType = files[i].file.type === "image/png" ? "image/png" : "image/jpeg";
        const blob = await canvasToBlob(canvas, mimeType, 0.95);
        const baseName = stripExtension(files[i].name);
        const suffix = flipH && flipV ? "_flipped_both" : flipH ? "_flipped_h" : "_flipped_v";
        const ext = mimeType === "image/png" ? ".png" : ".jpg";
        outputFiles.push({ name: baseName + suffix + ext, blob, size: blob.size, type: mimeType });
      }
      setProgress(100);
      if (outputFiles.length === 0) setError("Processing failed.");
      else setResult({ success: true, files: outputFiles, processingTime: Date.now() });
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, flipH, flipV]);

  const totalSize = files.reduce((s, f) => s + f.size, 0);
  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#0891b2" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="image/*" multiple onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} onReorder={reorderFiles} label="Drop images here" hint="Flip horizontally, vertically, or both. Batch supported." />
            </div>
            <div className="rounded-2xl p-5 space-y-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Flip Direction</p>
              <div className="flex gap-3">
                {[{ id: "h", label: "Horizontal (Mirror)", val: flipH, set: setFlipH }, { id: "v", label: "Vertical (Upside Down)", val: flipV, set: setFlipV }].map(opt => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={opt.val} onChange={(e) => opt.set(e.target.checked)} style={{ accentColor: "#0891b2" }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                  <FlipHorizontal className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                  <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Flipping images..." color="#0891b2" /></div>}
            <button onClick={handleProcess} disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#0891b2" }}>
              <FlipHorizontal className="h-5 w-5" />
              {isProcessing ? "Flipping..." : `Flip ${files.length > 0 ? files.length : ""} Image${files.length !== 1 ? "s" : ""}`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
