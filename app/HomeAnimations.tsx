"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import { TOOLS } from "@/lib/toolRegistry";

const STATS = [
  { value: `${TOOLS.length}+`, label: "Tools Available" },
  { value: "0", label: "Signup Required" },
  { value: "∞", label: "Files Processed" },
  { value: "100%", label: "Browser-Based" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24 min-h-[85vh] flex items-center">
      <PageBackground variant="hero" />

      <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
          style={{
            background: "rgba(79,142,247,0.12)",
            border: "1px solid rgba(79,142,247,0.3)",
            color: "var(--accent-blue)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Zap className="h-3.5 w-3.5" />
          100% Free · No Signup · Browser-Based
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ color: "var(--text-primary)", lineHeight: 1.1 }}
        >
          Free PDF &amp; Image Tools Online —{" "}
          <span className="gradient-text">No Signup, No Limits</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Merge PDF, compress PDF, convert PDF to Word, compress images, remove backgrounds
          and {TOOLS.length}+ more tools — all{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
            100% free, browser-based, and private
          </span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/tools"
            className="group flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
              boxShadow: "0 8px 32px rgba(79,142,247,0.35)",
            }}
          >
            Browse All Tools
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/tools/merge-pdf"
            className="hero-secondary-btn flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold transition-all hover:scale-105"
          >
            Merge PDF Free
          </Link>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.08, ease: "easeOut" }}
              className="hero-stat-card rounded-2xl px-4 py-5 relative overflow-hidden"
              style={{ border: "1px solid var(--border-subtle)", backdropFilter: "blur(12px)" }}
              whileHover={{
                borderColor: "rgba(79,142,247,0.4)",
                boxShadow: "0 0 20px rgba(79,142,247,0.1)",
                scale: 1.03,
              }}
            >
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Explore tools</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-5 w-px rounded-full"
            style={{ background: "linear-gradient(to bottom, var(--accent-blue), transparent)" }}
          />
        </motion.div>

      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <PageBackground variant="hero" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(79,142,247,0.12) 0%, rgba(139,106,245,0.08) 40%, rgba(10,10,15,0.6) 100%)" }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl font-extrabold sm:text-5xl mb-4"
            style={{ color: "var(--text-primary)", lineHeight: 1.15 }}
          >
            Ready to get started?
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>
            All tools are free. No account needed.<br />Start processing files in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools"
              className="group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
                boxShadow: "0 12px 40px rgba(79,142,247,0.4)",
              }}
            >
              Browse All Tools
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/tools/merge-pdf"
              className="hero-secondary-btn inline-flex items-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-all hover:scale-105"
            >
              Try Merge PDF →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
