"use client";

import { useState, useRef, useEffect } from "react";
import {
  AlertCircle, Bold, Italic, Underline, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Heading1, Heading2,
  Download, FileText, Undo, Redo, Eraser
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { convertWordToHtml, convertHtmlToWord } from "@/modules/tools/editWord";
import type { ProcessingResult } from "@/lib/types";

const ACCENT = "#2563eb"; // Word blue

export default function EditWordTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: false,
    maxFileSize: 50 * 1024 * 1024,
    maxFiles: 1,
  });

  // Load Word Doc
  useEffect(() => {
    if (!files[0]) {
      setHtmlContent(null);
      return;
    }
    setIsProcessing(true);
    setError(null);
    convertWordToHtml(files[0].file)
      .then((html) => {
        setHtmlContent(html || "<p>Start typing...</p>");
        setIsProcessing(false);
      })
      .catch((err) => {
        setError("Failed to read Word document. Make sure it's a valid .docx file.");
        setIsProcessing(false);
      });
  }, [files]);

  // Handle command execution for rich text editor
  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = async () => {
    if (!files[0] || !editorRef.current) return;
    setIsProcessing(true);
    setProgress(20);
    setError(null);

    const editedHtml = editorRef.current.innerHTML;
    
    // Fake progress
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 15, 90));
    }, 200);

    const res = await convertHtmlToWord(editedHtml, files[0].name);
    
    clearInterval(interval);
    setProgress(100);

    if (res.success) {
      setResult(res);
    } else {
      setError(res.error || "Failed to save the document.");
    }
    setIsProcessing(false);
  };

  // Split HTML content into pages roughly based on content size
  const pages = htmlContent ? htmlContent.split(/<div style="page-break-before:always">.*?<\/div>|<hr class="page-break".*?>/g) : [];
  if (pages.length === 0 && htmlContent) pages.push(htmlContent);

  const handleReset = () => {
    clearFiles();
    setResult(null);
    setError(null);
    setProgress(0);
    setHtmlContent(null);
  };

  // ── Result View ─────────────────────────────────────────────
  if (result) return <ResultPanel result={result} onReset={handleReset} accentColor={ACCENT} />;

  // ── Upload View ─────────────────────────────────────────────
  if (!files[0] || (!htmlContent && !isProcessing)) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
          <DropZone
            isDragging={isDragging}
            files={files}
            acceptedTypes=".docx"
            onRemove={removeFile}
            dropZoneProps={dropZoneProps}
            inputRef={inputRef}
            onInputChange={(e) => e.target.files && addFiles(e.target.files)}
            label="Drop a Word Document (.docx)"
            hint="Realistic document editing. Type, format, and save directly."
          />
        </div>
        <AnimatePresence>
          {(error || uploadError) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">{error || uploadError}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Loading View ─────────────────────────────────────────────
  if (isProcessing && !htmlContent) {
    return (
      <div className="rounded-2xl p-8 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading document for editing...</p>
      </div>
    );
  }

  // ── Editor View ──────────────────────────────────────────────
  const ToolbarBtn = ({ icon, onClick, title }: { icon: React.ReactNode, onClick: () => void, title: string }) => (
    <button
      onClick={onClick}
      title={title}
      className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
    >
      {icon}
    </button>
  );

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#0f0f13] shadow-sm" style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}>
      
      {/* ── Top Header ── */}
      <div className="h-14 bg-white dark:bg-[#18181b] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-sm truncate max-w-[300px] text-gray-800 dark:text-gray-200">{files[0].name}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5"/> {isProcessing ? "Saving..." : "Export .docx"}
          </button>
        </div>
      </div>

      {/* ── Editor Toolbar ── */}
      <div className="bg-white dark:bg-[#18181b] border-b border-gray-200 dark:border-gray-800 p-2 flex flex-wrap items-center justify-center gap-1 shrink-0">
        <ToolbarBtn icon={<Undo className="w-4 h-4" />} onClick={() => execCmd("undo")} title="Undo" />
        <ToolbarBtn icon={<Redo className="w-4 h-4" />} onClick={() => execCmd("redo")} title="Redo" />
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
        
        <ToolbarBtn icon={<Heading1 className="w-4 h-4" />} onClick={() => execCmd("formatBlock", "H1")} title="Heading 1" />
        <ToolbarBtn icon={<Heading2 className="w-4 h-4" />} onClick={() => execCmd("formatBlock", "H2")} title="Heading 2" />
        <ToolbarBtn icon={<Eraser className="w-4 h-4" />} onClick={() => execCmd("formatBlock", "P")} title="Normal Text" />
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
        
        <ToolbarBtn icon={<Bold className="w-4 h-4" />} onClick={() => execCmd("bold")} title="Bold" />
        <ToolbarBtn icon={<Italic className="w-4 h-4" />} onClick={() => execCmd("italic")} title="Italic" />
        <ToolbarBtn icon={<Underline className="w-4 h-4" />} onClick={() => execCmd("underline")} title="Underline" />
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
        
        <ToolbarBtn icon={<AlignLeft className="w-4 h-4" />} onClick={() => execCmd("justifyLeft")} title="Align Left" />
        <ToolbarBtn icon={<AlignCenter className="w-4 h-4" />} onClick={() => execCmd("justifyCenter")} title="Align Center" />
        <ToolbarBtn icon={<AlignRight className="w-4 h-4" />} onClick={() => execCmd("justifyRight")} title="Align Right" />
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
        
        <ToolbarBtn icon={<List className="w-4 h-4" />} onClick={() => execCmd("insertUnorderedList")} title="Bullet List" />
        <ToolbarBtn icon={<ListOrdered className="w-4 h-4" />} onClick={() => execCmd("insertOrderedList")} title="Numbered List" />
      </div>

      {/* ── Main Workspace ── */}
      <div className="flex-1 overflow-auto bg-gray-200 dark:bg-black/60 p-4 sm:p-8 flex flex-col items-center gap-8 relative">
        {isProcessing && (
          <div className="absolute inset-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center p-8 fixed">
            <ProgressBar progress={progress} label="Generating Word Document..." color={ACCENT} />
          </div>
        )}
        
        {/* Document Pages Container */}
        <div 
          ref={editorRef} 
          className="w-full max-w-[816px] outline-none space-y-8 pb-12"
          contentEditable
          suppressContentEditableWarning
        >
          {pages.map((pageHtml, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-950 w-full min-h-[1056px] shadow-xl p-8 sm:p-12 lg:p-20 relative break-words"
              style={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="min-h-full max-w-none focus:outline-none overflow-hidden edit-word-content"
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  wordBreak: "break-word"
                }}
                dangerouslySetInnerHTML={{ __html: pageHtml || "" }}
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium select-none pointer-events-none">
                Page {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
