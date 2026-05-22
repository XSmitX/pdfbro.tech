"use client";

import Link from "next/link";
import Image from "next/image";

const YEAR = 2026;

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  "PDF Tools": [
    { label: "Merge PDF", href: "/tools/merge-pdf" },
    { label: "Split PDF", href: "/tools/split-pdf" },
    { label: "Compress PDF", href: "/tools/compress-pdf" },
    { label: "Sign PDF", href: "/tools/sign-pdf" },
    { label: "Edit PDF", href: "/tools/edit-pdf" },
    { label: "Protect PDF", href: "/tools/protect-pdf" },
    { label: "Unlock PDF", href: "/tools/unlock-pdf" },
    { label: "Rotate PDF", href: "/tools/rotate-pdf" },
    { label: "OCR PDF", href: "/tools/ocr-pdf" },
    { label: "All PDF Tools →", href: "/pdf-tools" },
  ],
  "Image Tools": [
    { label: "Compress Image", href: "/tools/compress-image" },
    { label: "Resize Image", href: "/tools/resize-image" },
    { label: "Crop Image", href: "/tools/crop-image" },
    { label: "Remove Background", href: "/tools/remove-bg" },
    { label: "Passport Photo", href: "/tools/passport-photo" },
    { label: "Add Text to Image", href: "/tools/add-text-to-image" },
    { label: "Flip Image", href: "/tools/flip-image" },
    { label: "All Image Tools →", href: "/image-tools" },
  ],
  "Convert": [
    { label: "PDF to Word", href: "/tools/pdf-to-word" },
    { label: "Word to PDF", href: "/tools/word-to-pdf" },
    { label: "PDF to Excel", href: "/tools/pdf-to-excel" },
    { label: "PDF to PowerPoint", href: "/tools/pdf-to-powerpoint" },
    { label: "HEIC to JPG", href: "/tools/heic-to-jpg" },
    { label: "Image to WebP", href: "/tools/image-to-webp" },
    { label: "JPG to PNG", href: "/tools/jpg-to-png" },
    { label: "QR Code Generator", href: "/tools/qr-code-generator" },
    { label: "Text to PDF", href: "/tools/text-to-pdf" },
    { label: "All Convert Tools →", href: "/convert-tools" },
  ],
  "Guides": [
    { label: "How to Merge PDF", href: "/guides/how-to-merge-pdf" },
    { label: "How to Compress PDF", href: "/guides/how-to-compress-pdf" },
    { label: "Compress Images", href: "/guides/how-to-compress-images-online" },
    { label: "HEIC to JPG Guide", href: "/guides/how-to-convert-heic-to-jpg" },
    { label: "PDF to Word Guide", href: "/guides/how-to-convert-pdf-to-word" },
    { label: "iLovePDF Alternative", href: "/guides/ilovepdf-alternative" },
    { label: "Free Acrobat Alternative", href: "/guides/adobe-acrobat-alternative-free" },
    { label: "All 50+ Guides →", href: "/guides" },
  ],
  "Company": [
    { label: "All Tools", href: "/tools" },
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Image Tools", href: "/image-tools" },
    { label: "Convert Tools", href: "/convert-tools" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};

const FOOTER_ENTRIES = Object.entries(FOOTER_LINKS);

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-subtle)", backgroundColor: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main grid — Brand (1 col) + 5 link columns = 6 cols on lg */}
        <div className="py-14 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-6">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden shadow-md group-hover:shadow-blue-500/20 transition-shadow">
                <Image src="/logo.svg" alt="PDFBro logo" width={32} height={32} className="w-full h-full" />
              </div>
              <span className="text-base font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                PDF<span className="gradient-text">Bro</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)", maxWidth: "18rem" }}>
              100+ free online tools for PDF and image processing. No signup, no limits, no watermarks.
            </p>

            <div
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium mb-4"
              style={{
                backgroundColor: "rgba(52,211,153,0.08)",
                border: "1px solid rgba(52,211,153,0.2)",
                color: "var(--accent-green)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              100% Browser-Based
            </div>

            <div className="flex flex-col gap-1.5">
              <Link href="/pdf-tools" className="text-xs hover:underline underline-offset-2 transition-colors" style={{ color: "var(--accent-blue)" }}>
                Free PDF Tools
              </Link>
              <Link href="/image-tools" className="text-xs hover:underline underline-offset-2 transition-colors" style={{ color: "var(--accent-blue)" }}>
                Free Image Tools
              </Link>
              <Link href="/convert-tools" className="text-xs hover:underline underline-offset-2 transition-colors" style={{ color: "var(--accent-blue)" }}>
                File Conversion Tools
              </Link>
            </div>
          </div>

          {/* 5 link columns */}
          {FOOTER_ENTRIES.map(([category, links]) => (
            <div key={category}>
              <h3
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs transition-colors duration-150 hover:underline underline-offset-2"
                      style={{ color: link.label.endsWith("→") ? "var(--accent-blue)" : "var(--text-secondary)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = link.label.endsWith("→")
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }} suppressHydrationWarning>
            © {YEAR} PDFBro. All rights reserved.{" "}
            <Link href="/privacy" className="hover:underline underline-offset-2" style={{ color: "var(--text-muted)" }}>
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="hover:underline underline-offset-2" style={{ color: "var(--text-muted)" }}>
              Terms
            </Link>
          </p>

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Developed by{" "}
            <a
              href="https://smitpanchal.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline underline-offset-2 transition-colors"
              style={{ color: "var(--accent-blue)" }}
            >
              Smit Panchal
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
