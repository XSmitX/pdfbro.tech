"use client";

import { useState, useCallback } from "react";
import { AlertCircle, FileText, Copy, Download, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import { PDFDocument } from "pdf-lib";
import { readFileAsArrayBuffer, downloadBlob, stripExtension } from "@/lib/utils";
import { loadPdfjs } from "@/lib/pdfjsLoader";

export default function PDFToTextTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [copied, setCopied] = useState(false);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 50 * 1024 * 1024, maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload a PDF."); return; }
    setIsProcessing(true); setProgress(20); setError(null); setExtractedText("");
    try {
      // Use pdf-lib to access the PDF, then use the pdfjs approach for text extraction
      // Since pdf-lib doesn't extract text, we use a CDN-free approach:
      // Load pdfjs from window if available, otherwise fallback message
      setProgress(30);
      const arrayBuffer = await readFileAsArrayBuffer(files[0].file);
      setProgress(50);

      // Load pdfjs on-demand (shared singleton — no duplicate scripts)
      let pdfjs;
      try {
        pdfjs = await loadPdfjs();
      } catch {
        // Fallback: use pdf-lib for basic page info when CDN unavailable
        const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const pageCount = doc.getPageCount();
        setExtractedText(
          `PDF has ${pageCount} page(s).\n\nFull text extraction requires an internet connection to load the PDF rendering library. Please check your connection and try again.`
        );
        setProgress(100);
        return;
      }

      const pdf = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
      const pages: string[] = [];
      setProgress(60);

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(60 + Math.round((i / pdf.numPages) * 35));
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: { str: string; hasEOL?: boolean }) =>
            item.str + (item.hasEOL ? "\n" : " ")
          )
          .join("")
          .trim();
        if (pageText) pages.push(`--- Page ${i} ---\n${pageText}`);
        page.cleanup();
      }

      await pdf.destroy();
      setExtractedText(pages.length > 0 ? pages.join("\n\n") : "No extractable text found. This PDF may contain only scanned images. Use the OCR PDF tool instead.");
      setProgress(100);
    } catch (e) { setError(e instanceof Error ? e.message : "Extraction failed."); } finally { setIsProcessing(false); }
  }, [files]);

  const copyText = () => {
    navigator.clipboard.writeText(extractedText).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const name = files[0] ? stripExtension(files[0].name) + ".txt" : "extracted.txt";
    downloadBlob(blob, name);
  };

  const handleReset = () => { clearFiles(); setExtractedText(""); setError(null); setProgress(0); };

  return (
    <div className="space-y-4">
      {!extractedText ? (
        <>
          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
            <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF here" hint="Extracts all readable text from the PDF document." />
          </div>
          <AnimatePresence>
            {(error || uploadError) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Extracting text..." color="#ea580c" /></div>}
          <button onClick={handleProcess} disabled={isProcessing || !files[0]}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
            style={{ backgroundColor: "#ea580c" }}>
            <FileText className="h-5 w-5" />
            {isProcessing ? "Extracting..." : "Extract Text"}
          </button>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" style={{ color: "var(--accent-green)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Text extracted! ({extractedText.length} chars)</span>
            </div>
            <div className="flex gap-2">
              <button onClick={copyText} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                <Copy className="h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={downloadText} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all"
                style={{ backgroundColor: "#ea580c" }}>
                <Download className="h-3.5 w-3.5" /> Download .txt
              </button>
            </div>
          </div>
          <textarea readOnly value={extractedText} rows={16}
            className="w-full rounded-xl px-3 py-2.5 text-sm resize-y font-mono"
            style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
          <button onClick={handleReset} className="w-full rounded-xl border py-2.5 text-sm font-semibold transition-all"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
            Extract Another PDF
          </button>
        </motion.div>
      )}
    </div>
  );
}
