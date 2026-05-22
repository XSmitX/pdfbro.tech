"use client";

// ============================================================
// useToolLimit — Enforce free usage limits per tool per day
// Uses localStorage to track daily usage counts.
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { usageTracker } from "@/lib/utils";

interface UseToolLimitReturn {
  /** Whether the user has reached their daily free limit */
  isLimitReached: boolean;
  /** Current usage count for today */
  usageCount: number;
  /** Increment usage counter (call after successful processing) */
  incrementUsage: () => void;
  /** Remaining uses today */
  remaining: number;
}

/**
 * Hook to track and enforce free usage limits per tool.
 *
 * @param toolSlug  - The tool slug (e.g., "merge-pdf")
 * @param freeLimit - Max free uses per day from tool config
 */
export function useToolLimit(toolSlug: string, freeLimit: number): UseToolLimitReturn {
  const [usageCount, setUsageCount] = useState(0);

  // Read count from localStorage once on mount (client-only)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const count = usageTracker.getCount(toolSlug);
    setUsageCount(count);
  }, [toolSlug]);

  const incrementUsage = useCallback(() => {
    usageTracker.increment(toolSlug);
    setUsageCount((prev) => prev + 1);
  }, [toolSlug]);

  const isLimitReached = freeLimit > 0 && usageCount >= freeLimit;
  const remaining = Math.max(0, freeLimit - usageCount);

  return { isLimitReached, usageCount, incrementUsage, remaining };
}
