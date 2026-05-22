"use client";

import { motion } from "framer-motion";
import { Zap, AlertTriangle } from "lucide-react";

interface LimitBannerProps {
  remaining: number;
  freeLimit: number;
  isLimitReached: boolean;
}

export default function LimitBanner({ remaining, freeLimit, isLimitReached }: LimitBannerProps) {
  if (isLimitReached) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,146,60,0.08))",
          border: "1px solid rgba(251,191,36,0.2)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(251,191,36,0.15)" }}>
            <AlertTriangle className="h-5 w-5" style={{ color: "var(--accent-yellow)" }} />
          </div>
          <div className="flex-1">
            <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Daily limit reached</p>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              You&apos;ve used your {freeLimit} free uses today. Upgrade to Pro for unlimited access.
            </p>
          </div>
          <button
            className="flex-shrink-0 flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #f59e0b, #fb923c)" }}
          >
            <Zap className="h-3.5 w-3.5" />
            Upgrade
          </button>
        </div>
      </motion.div>
    );
  }

  if (remaining <= 2 && remaining > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          <span className="font-semibold" style={{ color: "var(--accent-yellow)" }}>{remaining} free use{remaining !== 1 ? "s" : ""}</span> remaining today
        </p>
        <button className="text-xs font-semibold transition-colors" style={{ color: "var(--accent-yellow)" }}>
          Upgrade for unlimited →
        </button>
      </motion.div>
    );
  }

  return null;
}
