"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import ToolCard from "@/components/ToolCard";
import PageBackground from "@/components/PageBackground";
import { TOOLS, CATEGORY_META, searchTools } from "@/lib/toolRegistry";
import type { ToolConfig } from "@/lib/types";

const CATEGORIES: Array<{ id: ToolConfig["category"] | "all"; label: string }> = [
  { id: "all", label: "All Tools" },
  { id: "pdf", label: "PDF Tools" },
  { id: "image", label: "Image Tools" },
  { id: "convert", label: "Convert" },
  { id: "utility", label: "Utilities" },
];

export default function ToolsClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolConfig["category"] | "all">("all");

  const filteredTools = useMemo(() => {
    let tools = query ? searchTools(query) : TOOLS;
    if (activeCategory !== "all") tools = tools.filter((t) => t.category === activeCategory);
    return tools;
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />

      <div className="relative py-10 overflow-hidden" style={{ borderBottom: "1px solid var(--border-subtle)", backdropFilter: "blur(2px)" }}>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {TOOLS.length}+ Free PDF &amp; Image Tools Online
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-1 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {TOOLS.length} free tools — merge PDF, compress PDF, convert PDF, compress images, HEIC to JPG, QR code generator and more.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            No signup · No watermarks · Browser-based · 100% free
          </motion.p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools (e.g. merge PDF, compress image)..."
              className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm"
              style={{
                backgroundColor: "var(--bg-input)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                outline: "none",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent-blue)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79,142,247,0.15)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-xl px-4 py-2 text-sm font-medium transition-all"
              style={
                activeCategory === cat.id
                  ? { background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))", color: "#fff" }
                  : { backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }
              }
              onMouseEnter={(e) => { if (activeCategory !== cat.id) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; } }}
              onMouseLeave={(e) => { if (activeCategory !== cat.id) { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-secondary)"; } }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {query && (
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            {filteredTools.length} result{filteredTools.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>
        )}

        {filteredTools.length > 0 ? (
          activeCategory === "all" && !query ? (
            <div className="space-y-12">
              {(["pdf", "image", "convert"] as ToolConfig["category"][]).map((cat) => {
                const categoryTools = TOOLS.filter((t) => t.category === cat);
                if (!categoryTools.length) return null;
                const meta = CATEGORY_META[cat];
                return (
                  <div key={cat}>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{meta.label}</h2>
                      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{meta.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                      {categoryTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
            </motion.div>
          )
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>No tools found for &quot;{query}&quot;</p>
            <button onClick={() => setQuery("")} className="mt-4 text-sm" style={{ color: "var(--accent-blue)" }}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
