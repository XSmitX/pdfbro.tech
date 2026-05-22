"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
  color?: string;
}

export default function ProgressBar({ progress, label, className, color = "var(--accent-blue)" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</span>
          <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{Math.round(clamped)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, var(--accent-violet))` }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        />
      </div>
    </div>
  );
}

export function ProcessingIndicator({ label = "Processing..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: "var(--border)" }} />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{ borderTopColor: "var(--accent-blue)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
    </div>
  );
}
