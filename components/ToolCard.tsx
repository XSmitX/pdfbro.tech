"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolConfig } from "@/lib/types";
import ToolIcon from "./ToolIcon";

interface ToolCardProps {
  tool: ToolConfig;
  index?: number;
  compact?: boolean;
}

export default function ToolCard({ tool, index = 0, compact = false }: ToolCardProps) {
  const delay = Math.min(index * 0.04, 0.18);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/tools/${tool.slug}`}
        className={cn(
          "tool-card group relative flex flex-col rounded-2xl transition-all duration-200",
          compact ? "p-4" : "p-5"
        )}
      >
        {/* Top accent line — appears on hover via CSS */}
        <div
          className="tool-card-accent absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 transition-opacity duration-200"
          style={{ background: `linear-gradient(90deg, ${tool.color}70, ${tool.color}20, transparent)` }}
        />

        {/* Icon */}
        <div
          className={cn(
            "mb-4 flex items-center justify-center rounded-xl shrink-0",
            compact ? "h-10 w-10" : "h-12 w-12"
          )}
          style={{
            backgroundColor: `${tool.color}15`,
            border: `1px solid ${tool.color}22`,
          }}
        >
          <ToolIcon
            name={tool.icon}
            className={compact ? "h-5 w-5" : "h-6 w-6"}
            style={{ color: tool.color }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-semibold mb-1 leading-snug",
              compact ? "text-sm" : "text-[0.9375rem]"
            )}
            style={{ color: "var(--text-primary)" }}
          >
            {tool.name}
          </h3>
          <p
            className={cn("leading-relaxed", compact ? "text-xs" : "text-sm")}
            style={{ color: "var(--text-secondary)" }}
          >
            {tool.description}
          </p>
        </div>

        {/* Arrow */}
        <div
          className="mt-4 flex items-center gap-1 text-xs font-semibold"
          style={{ color: tool.color }}
        >
          <span>Use tool</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
