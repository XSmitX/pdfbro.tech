"use client";

import { useState, useCallback } from "react";
import { AlertCircle, FileOutput, Download, CheckCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import { formatBytes, downloadBlob, getEndpoint } from "@/lib/utils";

export default function PDFToPowerPointTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outputFile, setOutputFile] = useState<{ name: string; blob: Blob } | null>(null);
  const [statusMsg, setStatusMsg] = useState("Converting...");

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf",
    multiple: false,
    maxFileSize: 50 * 1024 * 1024,
    maxFiles: 1,
  });

  const handleConvert = useCallback(async () => {
    if (!files[0]) { setError("Please upload a PDF file."); return; }

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setOutputFile(null);
    setStatusMsg("Uploading PDF...");

    try {
      const formData = new FormData();
      formData.append("file", files[0].file);

      const progressInterval = setInterval(() => {
        setProgress((p) => {
          if (p < 30) { setStatusMsg("Uploading PDF..."); return Math.min(p + 5, 30); }
          if (p < 60) { setStatusMsg("Converting pages to images..."); return Math.min(p + 3, 60); }
          if (p < 80) { setStatusMsg("Adding slides with animations..."); return Math.min(p + 2, 80); }
          setStatusMsg("Finalizing PowerPoint...");
          return Math.min(p + 1, 90);
        });
      }, 600);

      const response = await fetch(getEndpoint("36.76.19.101.24.52.122.44.125.72.17.120.24.39.113.36.38.89.12.33.71.56.98.39.121.93.12.101.89.35"), {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(95);
      setStatusMsg("Building PPTX...");

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Server error" }));
        setError(data.error ?? `Server returned ${response.status}`);
        return;
      }

      const pptxBlob = await response.blob();
      setProgress(100);

      const baseName = files[0].name.replace(/\.pdf$/i, "");
      setOutputFile({ name: `${baseName}.pptx`, blob: pptxBlob });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [files]);

  const handleReset = () => {
    clearFiles();
    setOutputFile(null);
    setError(null);
    setProgress(0);
    setStatusMsg("Converting...");
  };

  if (outputFile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(52,211,153,0.15)" }}>
            <CheckCircle className="h-5 w-5" style={{ color: "var(--accent-green)" }} />
          </div>
          <div>
            <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>PowerPoint ready!</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {formatBytes(outputFile.blob.size)} — editable PPTX file
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl p-3 mb-5"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
            style={{ backgroundColor: "var(--bg-card)" }}>
            <FileText className="h-5 w-5" style={{ color: "#dc2626" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{outputFile.name}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatBytes(outputFile.blob.size)}</p>
          </div>
          <button
            onClick={() => downloadBlob(outputFile.blob, outputFile.name)}
            className="flex-shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#dc2626" }}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => downloadBlob(outputFile.blob, outputFile.name)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#dc2626" }}
          >
            <Download className="h-4 w-4" />
            Download PPTX
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-secondary)" }}
          >
            Convert Another
          </button>
        </div>

        <p className="mt-4 text-center text-[11px]" style={{ color: "var(--text-muted)" }}>
          The presentation includes slide transitions and animations. Fully editable in PowerPoint, Google Slides, or LibreOffice.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
        <DropZone
          isDragging={isDragging}
          files={files}
          acceptedTypes="application/pdf"
          onRemove={removeFile}
          dropZoneProps={dropZoneProps}
          inputRef={inputRef}
          onInputChange={(e) => e.target.files && addFiles(e.target.files)}
          label="Drop a PDF here"
          hint="Converts each PDF page to a PowerPoint slide with automatic formatting and slide transitions."
        />
      </div>

      {/* Info */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}>
        <p className="text-xs font-semibold mb-1" style={{ color: "#f87171" }}>Powered by pdf2image + python-pptx</p>
        <ul className="text-xs space-y-0.5" style={{ color: "var(--text-secondary)" }}>
          <li>Converts each PDF page to a PowerPoint slide</li>
          <li>Automatically adds fade slide transitions</li>
          <li>Preserves images and text formatting</li>
          <li>Output is fully editable in PowerPoint or Google Slides</li>
          <li>Files deleted immediately after conversion</li>
        </ul>
      </div>

      <AnimatePresence>
        {(error || uploadError) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-xl px-4 py-3"
            style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
            <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isProcessing && (
        <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
          <ProgressBar progress={progress} label={statusMsg} color="#dc2626" />
          <p className="mt-2 text-xs text-center" style={{ color: "var(--text-muted)" }}>
            This may take 10-60 seconds depending on PDF size
          </p>
        </div>
      )}

      <button
        onClick={handleConvert}
        disabled={isProcessing || !files[0]}
        className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
        style={{ backgroundColor: "#dc2626" }}
      >
        <FileOutput className="h-5 w-5" />
        {isProcessing ? "Converting..." : "Convert to PowerPoint"}
      </button>
    </div>
  );
}
