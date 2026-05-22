"use client";

import { useState, useCallback, useEffect } from "react";
import { AlertCircle, PenLine, Download, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import { PDFDocument } from "pdf-lib";
import { readFileAsArrayBuffer, stripExtension, downloadBlob } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

interface FormField {
  name: string;
  type: string;
  value: string;
}

export default function FillPDFFormTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputName, setOutputName] = useState("filled_form.pdf");
  const [loadingFields, setLoadingFields] = useState(false);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 50 * 1024 * 1024, maxFiles: 1,
  });

  // Load form fields when file changes
  const loadFields = useCallback(async () => {
    if (!files[0]) return;
    setLoadingFields(true); setError(null); setFormFields([]); setOutputBlob(null);
    try {
      const bytes = await readFileAsArrayBuffer(files[0].file);
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const form = doc.getForm();
      const fields = form.getFields();

      if (fields.length === 0) {
        setError("No fillable form fields found in this PDF. Try a PDF with form fields.");
        setLoadingFields(false);
        return;
      }

      const fieldData: FormField[] = fields.map(field => ({
        name: field.getName(),
        type: field.constructor.name.replace("PDF", "").replace("Field", ""),
        value: "",
      }));
      setFormFields(fieldData);
      setOutputName(stripExtension(files[0].name) + "_filled.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load PDF form.");
    } finally { setLoadingFields(false); }
  }, [files]);

  // Auto-load when file is uploaded
  useEffect(() => { if (files[0]) loadFields(); }, [files, loadFields]);

  const updateField = (idx: number, value: string) => {
    setFormFields(prev => prev.map((f, i) => i === idx ? { ...f, value } : f));
  };

  const handleFill = useCallback(async () => {
    if (!files[0] || formFields.length === 0) return;
    setIsProcessing(true); setProgress(20); setError(null);
    try {
      const bytes = await readFileAsArrayBuffer(files[0].file);
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const form = doc.getForm();

      setProgress(50);

      for (const field of formFields) {
        if (!field.value) continue;
        try {
          const f = form.getField(field.name);
          // Try text field first
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (f as any).setText(field.value);
          } catch {
            // Try checkbox
            try {
              if (field.value.toLowerCase() === "true" || field.value === "1") {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (f as any).check();
              }
            } catch { /* skip */ }
          }
        } catch { /* field not found, skip */ }
      }

      form.flatten();
      setProgress(80);
      const outBytes = await doc.save();
      const blob = uint8ToBlob(outBytes, "application/pdf");
      setOutputBlob(blob);
      setProgress(100);
    } catch (e) { setError(e instanceof Error ? e.message : "Fill failed."); } finally { setIsProcessing(false); }
  }, [files, formFields]);

  const handleReset = () => { clearFiles(); setFormFields([]); setOutputBlob(null); setError(null); setProgress(0); };

  return (
    <div className="space-y-4">
      {outputBlob ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(52,211,153,0.15)" }}>
              <CheckCircle className="h-5 w-5" style={{ color: "var(--accent-green)" }} />
            </div>
            <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>Form filled successfully!</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => downloadBlob(outputBlob, outputName)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#b45309" }}>
              <Download className="h-4 w-4" /> Download Filled PDF
            </button>
            <button onClick={handleReset} className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold"
              style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-secondary)" }}>
              Fill Another
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
            <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef}
              onInputChange={(e) => { if (e.target.files) { addFiles(e.target.files); setTimeout(loadFields, 100); }}}
              label="Drop a PDF form here" hint="Upload a PDF with fillable form fields. Fields will be detected automatically." />
          </div>

          {files[0] && formFields.length === 0 && !loadingFields && (
            <button onClick={loadFields} className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: "#b45309" }}>
              Load Form Fields
            </button>
          )}

          {loadingFields && <div className="text-center text-sm py-4" style={{ color: "var(--text-muted)" }}>Loading form fields...</div>}

          {formFields.length > 0 && (
            <div className="rounded-2xl p-5 space-y-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Form Fields ({formFields.length})</p>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {formFields.map((field, i) => (
                  <div key={i}>
                    <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-muted)" }}>{field.name} <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>({field.type})</span></label>
                    <input type="text" value={field.value} onChange={(e) => updateField(i, e.target.value)}
                      placeholder={field.type === "CheckBox" ? "true or false" : "Enter value..."}
                      className="w-full rounded-xl px-3 py-2 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {(error || uploadError) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3"
                style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Filling form..." color="#b45309" /></div>}

          {formFields.length > 0 && (
            <button onClick={handleFill} disabled={isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#b45309" }}>
              <PenLine className="h-5 w-5" />
              {isProcessing ? "Filling Form..." : "Save Filled Form"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
