"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pdfbro_recent_tools";
const MAX_RECENT = 5;

interface RecentTool {
  slug: string;
  name: string;
  usedAt: number;
}

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: RecentTool[] = JSON.parse(stored);
        setRecentTools(parsed.slice(0, MAX_RECENT));
      }
    } catch {}
  }, []);

  const addRecentTool = useCallback((slug: string, name: string) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((t) => t.slug !== slug);
      const updated = [{ slug, name, usedAt: Date.now() }, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const clearRecentTools = useCallback(() => {
    setRecentTools([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return { recentTools, addRecentTool, clearRecentTools };
}
