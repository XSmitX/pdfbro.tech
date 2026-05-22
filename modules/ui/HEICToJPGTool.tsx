"use client";

import { useState, useCallback } from "react";
import { AlertCircle, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { canvasToBlob, stripExtension } from "@/lib/utils";
import type { ProcessingResult } from "@/lib/types";

export default function HEICToJPGTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.92);

  const { files, isDragging, inputRef, addFiles, removeFile, reorderFiles, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: ".heic,.heif,image/heic,image/heif,image/*",
    multiple: true, maxFileSize: 30 * 1024 * 1024, maxFiles: 20,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) { setError("Please upload HEIC/HEIF files."); return; }
    setIsProcessing(true); setProgress(10); setError(null); setResult(null);

    try {
      // Try to use heic2any library (dynamically loaded from CDN)
      const outputFiles: ProcessingResult["files"] = [];

      for (let i = 0; i < files.length; i++) {
        setProgress(Math.round((i / files.length) * 85) + 10);
        const file = files[i].file;
        const baseName = stripExtension(file.name);

        try {
          // Attempt conversion via heic2any CDN
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let heic2any = (window as any).heic2any;

          if (!heic2any) {
            // Load heic2any from CDN
            await new Promise<void>((resolve, reject) => {
              const script = document.createElement("script");
              script.src = "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js";
              script.onload = () => resolve();
              script.onerror = () => reject(new Error("Failed to load HEIC converter"));
              document.head.appendChild(script);
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            heic2any = (window as any).heic2any;
          }

          if (heic2any) {
            const blob = await heic2any({ blob: file, toType: "image/jpeg", quality }) as Blob;
            outputFiles.push({ name: baseName + ".jpg", blob, size: blob.size, type: "image/jpeg" });
          } else {
            throw new Error("HEIC converter unavailable");
          }
        } catch {
          // Fallback: try Canvas API (works if browser natively supports HEIC)
          const url = URL.createObjectURL(file);
          const img = new Image();
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Could not read HEIC file. Browser may not support this format."));
            img.src = url;
          });
          URL.revokeObjectURL(url);

          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const blob = await canvasToBlob(canvas, "image/jpeg", quality);
            outputFiles.push({ name: baseName + ".jpg", blob, size: blob.size, type: "image/jpeg" });
          }
        }
      }

      setProgress(100);
      if (outputFiles.length === 0) setError("No files could be converted.");
      else setResult({ success: true, files: outputFiles, processingTime: Date.now() });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
    } finally { setIsProcessing(false); }
  }, [files, quality]);

  const totalSize = files.reduce((s, f) => s + f.size, 0);
  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#16a34a" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes=".heic,.heif" multiple onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} onReorder={reorderFiles} label="Drop HEIC/HEIF files here" hint="iPhone photos (.heic, .heif) converted to JPEG. Batch supported." />
            </div>

            <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }}>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                <strong style={{ color: "#16a34a" }}>Tip:</strong> Transfer HEIC photos from iPhone via USB or AirDrop. Works on Chrome, Edge, and Safari.
              </p>
            </div>

            <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <div className="flex justify-between mb-1"><span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>JPEG Quality</span><span className="text-sm font-bold" style={{ color: "#16a34a" }}>{Math.round(quality * 100)}%</span></div>
              <input type="range" min={50} max={100} value={Math.round(quality * 100)} onChange={(e) => setQuality(+e.target.value / 100)} className="w-full" style={{ accentColor: "#16a34a" }} />
            </div>

            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                  <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Converting HEIC to JPEG..." color="#16a34a" /></div>}
            <button onClick={handleProcess} disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#16a34a" }}>
              <ImageIcon className="h-5 w-5" />
              {isProcessing ? "Converting..." : `Convert ${files.length > 0 ? files.length : ""} HEIC to JPG`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
