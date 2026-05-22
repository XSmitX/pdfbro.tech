"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/themeContext";

const NAV_ITEMS = [
  {
    label: "PDF Tools",
    href: "/tools?category=pdf",
    wide: true,
    items: [
      { label: "Merge PDF", href: "/tools/merge-pdf", desc: "Combine multiple PDFs" },
      { label: "Split PDF", href: "/tools/split-pdf", desc: "Extract page ranges" },
      { label: "Compress PDF", href: "/tools/compress-pdf", desc: "Reduce file size" },
      { label: "Rotate PDF", href: "/tools/rotate-pdf", desc: "Fix orientation" },
      { label: "Add Watermark", href: "/tools/add-watermark", desc: "Protect your PDFs" },
      { label: "PDF Page Numbers", href: "/tools/pdf-page-numbers", desc: "Add numbering" },
      { label: "Unlock PDF", href: "/tools/unlock-pdf", desc: "Remove password" },
      { label: "Protect PDF", href: "/tools/protect-pdf", desc: "Add password" },
      { label: "Extract Pages", href: "/tools/extract-pdf-pages", desc: "Pull specific pages" },
      { label: "Reorder Pages", href: "/tools/reorder-pdf-pages", desc: "Drag to rearrange" },
      { label: "Fill PDF Form", href: "/tools/fill-pdf-form", desc: "Fill form fields" },
    ],
  },
  {
    label: "Image Tools",
    href: "/tools?category=image",
    wide: true,
    items: [
      { label: "Compress Image", href: "/tools/compress-image", desc: "Optimize images" },
      { label: "Resize Image", href: "/tools/resize-image", desc: "Change dimensions" },
      { label: "Crop Image", href: "/tools/crop-image", desc: "Trim to size" },
      { label: "Flip Image", href: "/tools/flip-image", desc: "Mirror horizontally" },
      { label: "Add Text to Image", href: "/tools/add-text-to-image", desc: "Captions & labels" },
      { label: "Remove Background", href: "/tools/remove-bg", desc: "AI-powered" },
      { label: "Passport Photo", href: "/tools/passport-photo", desc: "Standard sizes" },
      { label: "PNG to JPEG", href: "/tools/png-to-jpeg", desc: "Convert format" },
    ],
  },
  {
    label: "Convert",
    href: "/tools?category=convert",
    wide: true,
    items: [
      { label: "Image to PDF", href: "/tools/image-to-pdf", desc: "Photos to PDF" },
      { label: "PDF to Image", href: "/tools/pdf-to-image", desc: "Pages to PNG/JPEG" },
      { label: "Word to PDF", href: "/tools/word-to-pdf", desc: "DOC/DOCX to PDF" },
      { label: "PDF to Word", href: "/tools/pdf-to-word", desc: "Editable DOCX" },
      { label: "PDF to Text", href: "/tools/pdf-to-text", desc: "Extract text" },
      { label: "Text to PDF", href: "/tools/text-to-pdf", desc: "Notes to PDF" },
      { label: "Image to WebP", href: "/tools/image-to-webp", desc: "Modern format" },
      { label: "HEIC to JPG", href: "/tools/heic-to-jpg", desc: "iPhone photos" },
    ],
  },
  {
    label: "Utilities",
    href: "/tools?category=utility",
    items: [
      { label: "QR Code Generator", href: "/tools/qr-code-generator", desc: "URL, WiFi, text" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();

  // Prevent background scroll while mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: isDark ? "rgba(10, 10, 15, 0.92)" : "rgba(248,249,255,0.92)",
        borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden shadow-lg group-hover:shadow-red-400/30 transition-shadow">
              <Image src="/logo.svg" alt="PDFBro logo" width={32} height={32} className="w-full h-full" priority />
            </div>
            <span className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              PDF<span className="gradient-text">Bro</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  )}
                  style={{
                    color: activeDropdown === item.label ? "var(--text-primary)" : "var(--text-secondary)",
                    backgroundColor: activeDropdown === item.label ? "var(--bg-card)" : "transparent",
                  }}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDropdown === item.label ? "rotate-180" : ""
                    )}
                  />
                </Link>

                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className={cn("absolute left-0 top-full mt-2 rounded-2xl p-2 shadow-2xl", "wide" in item && item.wide ? "w-96" : "w-56")}
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        boxShadow: isDark ? "0 24px 48px rgba(0,0,0,0.6)" : "0 24px 48px rgba(0,0,0,0.12)",
                      }}
                    >
                      {"wide" in item && item.wide ? (
                        <>
                          <Link href={item.href} className="flex items-center justify-between px-3 py-1.5 mb-1 rounded-xl text-xs font-semibold uppercase tracking-wide transition-colors"
                            style={{ color: "var(--text-muted)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-secondary)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                            All {item.label} <span style={{ color: "var(--accent-cyan)" }}>→</span>
                          </Link>
                          <div className="grid grid-cols-2 gap-0.5">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="flex flex-col rounded-xl px-3 py-2 transition-colors"
                                style={{ color: "var(--text-primary)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-secondary)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                              >
                                <span className="text-sm font-medium">{subItem.label}</span>
                                <span className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{subItem.desc}</span>
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="flex flex-col rounded-xl px-3 py-2.5 transition-colors"
                            style={{ color: "var(--text-primary)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-secondary)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <span className="text-sm font-medium">{subItem.label}</span>
                            <span className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{subItem.desc}</span>
                          </Link>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              href="/tools"
              className="ml-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.backgroundColor = "var(--bg-card)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              All Tools
            </Link>
          </nav>

          {/* Right: Theme toggle + CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* ── Theme Toggle Button ── */}
            <motion.button
              onClick={toggleTheme}
              className="relative flex h-9 w-16 items-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: isDark ? "var(--bg-card)" : "var(--bg-input)",
                border: "1px solid var(--border)",
              }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              whileTap={{ scale: 0.95 }}
            >
              {/* Track icons */}
              <span className="absolute left-2 flex h-4 w-4 items-center justify-center" style={{ color: isDark ? "var(--text-muted)" : "var(--accent-yellow)" }}>
                <Sun className="h-3.5 w-3.5" />
              </span>
              <span className="absolute right-2 flex h-4 w-4 items-center justify-center" style={{ color: isDark ? "var(--accent-blue)" : "var(--text-muted)" }}>
                <Moon className="h-3.5 w-3.5" />
              </span>

              {/* Sliding pill */}
              <motion.span
                className="absolute flex h-7 w-7 items-center justify-center rounded-full shadow-md"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))"
                    : "linear-gradient(135deg, #fbbf24, #f59e0b)",
                }}
                animate={{ x: isDark ? 33 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDark
                  ? <Moon className="h-3.5 w-3.5 text-white" />
                  : <Sun className="h-3.5 w-3.5 text-white" />
                }
              </motion.span>
            </motion.button>

            {/* CTA button */}
            <Link
              href="/tools"
              className="hidden md:flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-blue-500/30 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #4f8ef7, #8b6af5)",
              }}
            >
              <Zap className="h-3.5 w-3.5" />
              Try Free
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden rounded-xl p-2 transition-colors"
              style={{ color: "var(--text-secondary)", backgroundColor: "transparent" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-card)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ borderTop: "1px solid var(--border-subtle)", backgroundColor: "var(--bg-secondary)" }}
            className="md:hidden"
          >
            <div
              className="mx-auto max-w-7xl px-4 py-4 space-y-4 overflow-y-auto"
              style={{
                maxHeight: "calc(100vh - 4rem)",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                touchAction: "pan-y",
              }}
            >
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    {item.label}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-card)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-2 flex gap-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                {/* Mobile theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
                <Link
                  href="/tools"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #4f8ef7, #8b6af5)" }}
                >
                  <Zap className="h-4 w-4" />
                  All Tools
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
