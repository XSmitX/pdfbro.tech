"use client";

import { useState, useCallback } from "react";
import { AlertCircle, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { addPageNumbers, type PageNumberPosition, type PageNumberFormat } from "@/modules/tools/pageNumbers";
import type { ProcessingResult } from "@/lib/types";

export default function PageNumbersTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [position, setPosition] = useState<PageNumberPosition>("bottom-center");
  const [format, setFormat] = useState<PageNumberFormat>("1 / N");
  const [startFrom, setStartFrom] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [color, setColor] = useState("#555555");

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload a PDF."); return; }
    setIsProcessing(true); setProgress(20); setError(null); setResult(null);
    try {
      const pi = setInterval(() => setProgress(p => Math.min(p + 12, 85)), 300);
      const r = await addPageNumbers(files[0].file, { position, format, startFrom, fontSize, color, margin: 20 });
      clearInterval(pi); setProgress(100);
      if (!r.success) setError(r.error ?? "Failed.");
      else setResult(r);
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, position, format, startFrom, fontSize, color]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  const POSITIONS: { value: PageNumberPosition; label: string }[] = [
    { value: "bottom-center", label: "Bottom Center" },
    { value: "bottom-right", label: "Bottom Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "top-center", label: "Top Center" },
    { value: "top-right", label: "Top Right" },
  ];

  const FORMATS: PageNumberFormat[] = ["1", "Page 1", "1 / N"];

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#ea580c" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF here" hint="Page numbers will be added to every page." />
            </div>

            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              {/* Format */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Number Format</p>
                <div className="grid grid-cols-3 gap-2">
                  {FORMATS.map((f) => (
                    <button key={f} onClick={() => setFormat(f)} className="rounded-xl border py-2.5 text-sm font-semibold transition-all"
                      style={format === f ? { borderColor: "#ea580c", backgroundColor: "rgba(234,88,12,0.1)", color: "#ea580c" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Position */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Position</p>
                <div className="grid grid-cols-2 gap-2">
                  {POSITIONS.map((p) => (
                    <button key={p.value} onClick={() => setPosition(p.value)} className="rounded-xl border py-2 text-xs font-medium transition-all"
                      style={position === p.value ? { borderColor: "#ea580c", backgroundColor: "rgba(234,88,12,0.1)", color: "#ea580c" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>Start From</label>
                  <input type="number" min={1} value={startFrom} onChange={(e) => setStartFrom(Math.max(1, +e.target.value))}
                    className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>Font Size</label>
                  <input type="number" min={8} max={36} value={fontSize} onChange={(e) => setFontSize(+e.target.value)}
                    className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: "var(--text-secondary)" }}>Color</label>
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-full rounded-lg border p-0.5 cursor-pointer" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-input)" }} />
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

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Adding page numbers..." color="#ea580c" /></div>}

            <button onClick={handleProcess} disabled={isProcessing || !files[0]}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#ea580c" }}>
              <Hash className="h-5 w-5" />
              {isProcessing ? "Adding Numbers..." : "Add Page Numbers"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
