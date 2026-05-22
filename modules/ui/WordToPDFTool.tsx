"use client";

import { useState, useCallback } from "react";
import { AlertCircle, FileText, Download, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import { formatBytes, downloadBlob, getEndpoint } from "@/lib/utils";

export default function WordToPDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outputFile, setOutputFile] = useState<{ name: string; blob: Blob } | null>(null);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: false,
    maxFileSize: 50 * 1024 * 1024,
    maxFiles: 1,
  });

  const handleConvert = useCallback(async () => {
    if (!files[0]) { setError("Please upload a Word document."); return; }

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setOutputFile(null);

    try {
      const formData = new FormData();
      formData.append("file", files[0].file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 8, 75));
      }, 500);

      const response = await fetch(getEndpoint("36.76.19.101.24.52.122.44.125.72.17.120.24.32.122.48.111.0.23.99.26.39.113.36"), {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(90);

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Server error" }));
        setError(data.error ?? `Server returned ${response.status}`);
        return;
      }

      const pdfBlob = await response.blob();
      setProgress(100);

      const baseName = files[0].name.replace(/\.(docx?|DOC[Xx]?)$/, "");
      setOutputFile({ name: `${baseName}.pdf`, blob: pdfBlob });
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
  };

  if (outputFile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        {/* Success */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(52,211,153,0.15)" }}>
            <CheckCircle className="h-5 w-5" style={{ color: "var(--accent-green)" }} />
          </div>
          <div>
            <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>PDF ready!</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {formatBytes(outputFile.blob.size)} — converted from Word document
            </p>
          </div>
        </div>

        {/* File row */}
        <div className="flex items-center gap-3 rounded-xl p-3 mb-5"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
            style={{ backgroundColor: "var(--bg-card)" }}>
            <FileText className="h-5 w-5" style={{ color: "var(--accent-red)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{outputFile.name}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatBytes(outputFile.blob.size)}</p>
          </div>
          <button
            onClick={() => downloadBlob(outputFile.blob, outputFile.name)}
            className="flex-shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#2563eb" }}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => downloadBlob(outputFile.blob, outputFile.name)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#2563eb" }}
          >
            <Download className="h-4 w-4" />
            Download PDF
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
          Converted using Microsoft Word on your server. Formatting is preserved perfectly.
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
          acceptedTypes=".doc,.docx"
          onRemove={removeFile}
          dropZoneProps={dropZoneProps}
          inputRef={inputRef}
          onInputChange={(e) => e.target.files && addFiles(e.target.files)}
          label="Drop a Word document here"
          hint="Supports .doc and .docx files up to 50MB. Uses Microsoft Word for perfect formatting."
        />
      </div>

      {/* Info box */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
        <p className="text-xs font-semibold mb-1" style={{ color: "#60a5fa" }}>How it works</p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Your document is sent to our local server which uses <strong>Microsoft Word</strong> to convert it to PDF.
          The original formatting, fonts, images, and tables are preserved exactly. Files are deleted immediately after conversion.
        </p>
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
          <ProgressBar progress={progress} label={progress < 80 ? "Uploading and converting..." : "Finalizing PDF..."} color="#2563eb" />
        </div>
      )}

      <button
        onClick={handleConvert}
        disabled={isProcessing || !files[0]}
        className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
        style={{ backgroundColor: "#2563eb" }}
      >
        <FileText className="h-5 w-5" />
        {isProcessing ? "Converting..." : "Convert to PDF"}
      </button>
    </div>
  );
}
