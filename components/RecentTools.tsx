"use client";

import { useRecentTools } from "@/hooks/useRecentTools";
import Link from "next/link";
import { Clock, X } from "lucide-react";

export default function RecentTools() {
  const { recentTools, clearRecentTools } = useRecentTools();

  if (recentTools.length === 0) return null;

  return (
    <section style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Recently Used</span>
          </div>
          <button
            onClick={clearRecentTools}
            className="flex items-center gap-1 text-xs transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-red)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {recentTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-xl px-4 py-2 text-xs font-medium transition-all hover:scale-[1.02]"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--accent-blue)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
            >
              {tool.name} →
            </Link>
          ))}
          <Link
            href="/tools"
            className="rounded-xl px-4 py-2 text-xs font-semibold transition-all hover:scale-[1.02]"
            style={{ color: "var(--accent-blue)" }}
          >
            All Tools →
          </Link>
        </div>
      </div>
    </section>
  );
}
