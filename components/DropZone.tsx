"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Image, X, GripVertical } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import type { UploadedFile } from "@/lib/types";

interface DropZoneProps {
  isDragging: boolean;
  files: UploadedFile[];
  acceptedTypes: string;
  multiple?: boolean;
  onRemove: (id: string) => void;
  dropZoneProps: {
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onClick: () => void;
  };
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  label?: string;
  hint?: string;
  className?: string;
}

export default function DropZone({
  isDragging,
  files,
  acceptedTypes,
  multiple = false,
  onRemove,
  dropZoneProps,
  inputRef,
  onInputChange,
  label = "Drop files here or click to browse",
  hint,
  className,
}: DropZoneProps) {
  const dragItemRef = useRef<number | null>(null);
  const dragOverItemRef = useRef<number | null>(null);
  const hasFiles = files.length > 0;

  const getFileIcon = (file: UploadedFile) => {
    if (file.type.startsWith("image/")) return <Image className="h-4 w-4" style={{ color: "var(--accent-blue)" }} />;
    return <FileText className="h-4 w-4" style={{ color: "var(--accent-red)" }} />;
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        multiple={multiple}
        onChange={onInputChange}
        className="hidden"
        aria-label="File upload"
      />

      <div
        {...dropZoneProps}
        className="relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer"
        style={{
          borderColor: isDragging ? "var(--accent-blue)" : "var(--border)",
          backgroundColor: isDragging ? "rgba(79,142,247,0.05)" : "var(--bg-input)",
          transform: isDragging ? "scale(1.01)" : "scale(1)",
        }}
      >
        <AnimatePresence mode="wait">
          {!hasFiles ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-14 px-8 text-center"
            >
              <motion.div
                animate={isDragging ? { scale: 1.15, y: -6 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors"
                style={{
                  backgroundColor: isDragging ? "rgba(79,142,247,0.15)" : "var(--bg-card)",
                  color: isDragging ? "var(--accent-blue)" : "var(--text-muted)",
                }}
              >
                <Upload className="h-7 w-7" />
              </motion.div>

              <p className="mb-1 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                {isDragging ? "Drop files here!" : label}
              </p>
              {hint && (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{hint}</p>
              )}

              <div className="mt-4 flex items-center gap-2 w-full max-w-xs">
                <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>or</span>
                <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
              </div>

              <button
                type="button"
                className="mt-4 rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              >
                Browse Files
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="files"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {files.length} file{files.length !== 1 ? "s" : ""} selected
                </p>
                {multiple && (
                  <button
                    type="button"
                    className="text-xs font-medium"
                    style={{ color: "var(--accent-blue)" }}
                    onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  >
                    + Add more
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                <AnimatePresence initial={false}>
                  {files.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-3 rounded-xl p-3"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)",
                      }}
                      draggable={multiple}
                      onDragStart={() => { dragItemRef.current = index; }}
                      onDragOver={(e) => { e.preventDefault(); dragOverItemRef.current = index; }}
                      onDragEnd={() => {
                        dragItemRef.current = null;
                        dragOverItemRef.current = null;
                      }}
                    >
                      {multiple && (
                        <GripVertical className="h-4 w-4 flex-shrink-0 cursor-grab" style={{ color: "var(--text-muted)" }} />
                      )}
                      {file.preview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={file.preview} alt={file.name} className="h-10 w-10 rounded-lg object-cover flex-shrink-0" style={{ border: "1px solid var(--border)" }} />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: "var(--bg-secondary)" }}>
                          {getFileIcon(file)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{file.name}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatBytes(file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onRemove(file.id); }}
                        className="flex-shrink-0 rounded-lg p-1.5 transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.1)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {multiple && (
                <div
                  className="mt-3 rounded-xl border-2 border-dashed py-3 text-center text-xs cursor-pointer transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-blue)"; e.currentTarget.style.color = "var(--accent-blue)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                >
                  Drop more files here
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
