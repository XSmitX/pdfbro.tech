"use client";

import { useState, useCallback } from "react";
import { AlertCircle, FileText, Download, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { uint8ToBlob } from "@/lib/pdfUtils";
import { downloadBlob, formatBytes } from "@/lib/utils";

export default function TextToPDFTool() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outputFile, setOutputFile] = useState<{ name: string; blob: Blob } | null>(null);

  const handleConvert = useCallback(async () => {
    if (!text.trim()) { setError("Please enter some text to convert."); return; }
    setIsProcessing(true); setProgress(20); setError(null); setOutputFile(null);

    try {
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const margin = 50;
      const pageWidth = 595; // A4
      const pageHeight = 842;
      const lineHeight = fontSize * 1.4;
      const maxWidth = pageWidth - margin * 2;

      // Split text into lines that fit the page width
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (lineWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      // Handle hard line breaks
      const finalLines: string[] = [];
      for (const line of lines) {
        const parts = line.split("\n");
        finalLines.push(...parts);
      }

      // Also split on actual newlines in the original text
      const textLines = text.split("\n");
      const wrappedLines: string[] = [];
      for (const tLine of textLines) {
        if (!tLine.trim()) { wrappedLines.push(""); continue; }
        const lineWords = tLine.split(/\s+/);
        let cur = "";
        for (const w of lineWords) {
          const test = cur ? `${cur} ${w}` : w;
          if (font.widthOfTextAtSize(test, fontSize) > maxWidth && cur) {
            wrappedLines.push(cur);
            cur = w;
          } else {
            cur = test;
          }
        }
        if (cur) wrappedLines.push(cur);
      }

      // Paginate
      let page = doc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      for (const line of wrappedLines) {
        if (y < margin + lineHeight) {
          page = doc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        if (line) {
          page.drawText(line, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
        }
        y -= lineHeight;
      }

      const bytes = await doc.save();
      const blob = uint8ToBlob(bytes, "application/pdf");
      setOutputFile({ name: "document.pdf", blob });
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [text, fontSize]);

  if (outputFile) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(52,211,153,0.15)" }}>
            <CheckCircle className="h-5 w-5" style={{ color: "var(--accent-green)" }} />
          </div>
          <div>
            <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>PDF ready!</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatBytes(outputFile.blob.size)}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => downloadBlob(outputFile.blob, outputFile.name)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#059669" }}>
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <button onClick={() => { setOutputFile(null); setProgress(0); }}
            className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-secondary)" }}>
            Convert Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: "var(--text-primary)" }}>Your Text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text here..."
            rows={10} className="w-full rounded-xl px-3 py-2.5 text-sm resize-y"
            style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)", minHeight: "200px" }} />
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{text.length} characters · {text.split(/\s+/).filter(Boolean).length} words</p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Font Size</span>
            <span className="text-xs font-bold" style={{ color: "#059669" }}>{fontSize}pt</span>
          </div>
          <input type="range" min={8} max={24} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full" style={{ accentColor: "#059669" }} />
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3"
            style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
            <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Creating PDF..." color="#059669" /></div>}

      <button onClick={handleConvert} disabled={isProcessing || !text.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
        style={{ backgroundColor: "#059669" }}>
        <FileText className="h-5 w-5" />
        {isProcessing ? "Creating PDF..." : "Convert to PDF"}
      </button>
    </div>
  );
}
