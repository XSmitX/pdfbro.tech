"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Download, RotateCcw, FileText, Image, Archive, ArrowRight } from "lucide-react";
import { cn, formatBytes, downloadBlob, sizeReduction } from "@/lib/utils";
import { getCrossSell } from "@/lib/crossSell";
import type { ProcessingResult } from "@/lib/types";

interface ResultPanelProps {
  result: ProcessingResult;
  originalSize?: number;
  onReset: () => void;
  accentColor?: string;
  toolSlug?: string;
}

export default function ResultPanel({ result, originalSize, onReset, accentColor = "var(--accent-blue)", toolSlug }: ResultPanelProps) {
  const detectedSlug = toolSlug ?? (typeof window !== "undefined" ? window.location.pathname.split("/tools/")[1]?.replace(/\/$/, "") : undefined);
  const crossSellItems = detectedSlug ? getCrossSell(detectedSlug).slice(0, 3) : [];
  if (!result.success) return null;

  const totalOutputSize = result.files.reduce((sum, f) => sum + f.size, 0);
  const reduction = originalSize ? sizeReduction(originalSize, totalOutputSize) : null;

  const getFileIcon = (type: string) => {
    if (type === "application/pdf") return <FileText className="h-5 w-5" style={{ color: "var(--accent-red)" }} />;
    if (type.startsWith("image/")) return <Image className="h-5 w-5" style={{ color: "var(--accent-blue)" }} />;
    if (type === "application/zip") return <Archive className="h-5 w-5" style={{ color: "var(--accent-violet)" }} />;
    return <FileText className="h-5 w-5" style={{ color: "var(--text-muted)" }} />;
  };

  const handleDownloadAll = () => {
    result.files.forEach((file, i) => {
      setTimeout(() => downloadBlob(file.blob, file.name), i * 300);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl p-6"
      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
    >
      {/* Success header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(52,211,153,0.15)" }}>
          <CheckCircle className="h-5 w-5" style={{ color: "var(--accent-green)" }} />
        </div>
        <div>
          <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
            {result.files.length === 1 ? "File ready!" : `${result.files.length} files ready!`}
          </h3>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {result.processingTime ? `Processed in ${(result.processingTime / 1000).toFixed(1)}s` : "Processing complete"}
          </p>
        </div>
      </div>

      {/* Stats */}
      {(originalSize || reduction !== null) && (
        <div className="mb-5 grid grid-cols-3 gap-3">
          {originalSize && (
            <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
              <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Original</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{formatBytes(originalSize)}</p>
            </div>
          )}
          <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Output</p>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{formatBytes(totalOutputSize)}</p>
          </div>
          {reduction !== null && reduction > 0 && (
            <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
              <p className="text-xs mb-0.5" style={{ color: "var(--accent-green)" }}>Saved</p>
              <p className="text-sm font-semibold" style={{ color: "var(--accent-green)" }}>{reduction}%</p>
            </div>
          )}
        </div>
      )}

      {/* File list */}
      <div className="mb-5 space-y-2">
        {result.files.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-3 rounded-xl p-3"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: "var(--bg-card)" }}>
              {getFileIcon(file.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{file.name}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatBytes(file.size)}</p>
            </div>
            <button
              onClick={() => downloadBlob(file.blob, file.name)}
              className={cn("flex-shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-white transition-all hover:scale-105")}
              style={{ backgroundColor: accentColor }}
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {result.files.length > 1 && (
          <button
            onClick={handleDownloadAll}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            <Download className="h-4 w-4" />
            Download All
          </button>
        )}
        <button
          onClick={onReset}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
            result.files.length === 1 ? "flex-1" : ""
          )}
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--accent-blue)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <RotateCcw className="h-4 w-4" />
          Process Another
        </button>
      </div>

      {/* Cross-sell */}
      {crossSellItems.length > 0 && (
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
            You might also need:
          </p>
          <div className="space-y-2">
            {crossSellItems.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}`}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.name}</p>
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{item.reason}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 ml-2 flex-shrink-0" style={{ color: "var(--accent-blue)" }} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Privacy note */}
      <p className="mt-4 text-center text-[11px]" style={{ color: "var(--text-muted)" }}>
        🔒 Files processed in your browser — never uploaded to our servers.
      </p>
    </motion.div>
  );
}
