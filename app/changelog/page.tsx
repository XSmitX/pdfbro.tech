import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Clock } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Changelog — PDFBro Updates & New Features",
  description: "Track every update, new tool, and improvement to PDFBro. See what's new with our free PDF and image tools.",
  alternates: { canonical: "https://pdfbro.tech/changelog" },
  openGraph: {
    title: "Changelog — PDFBro Updates & New Features",
    description: "Track every update, new tool, and improvement to PDFBro.",
    url: "https://pdfbro.tech/changelog",
  },
};

const CHANGES = [
  {
    date: "2026-06-23",
    version: "v1.2.0",
    title: "10 New Utility Tools + SEO Improvements",
    changes: [
      "10 new free utility tools: Word Counter, JSON Formatter, Password Generator, URL Encoder/Decoder, Markdown to HTML Converter, Base64 Encoder, Color Contrast Checker, Hash Generator, Lorem Ipsum Generator, UUID Generator",
      "Expanded Compress PDF to 18 target sizes including 10MB, 15MB, 20MB, 25MB, for-email, for-government-portal, for-whatsapp",
      "Trust & privacy badges added to every tool page",
      "Privacy badge in upload area for all tools",
      "\"You might also need\" recommendations after tool processing",
      "Improved meta descriptions for better search visibility",
      "Updated tool count to show actual live count dynamically",
    ],
  },
  {
    date: "2025-10-15",
    version: "v1.1.0",
    title: "Guides, Comparisons & Student Tools",
    changes: [
      "60+ how-to guides added covering every PDF and image operation",
      "Competitor comparison pages: PDFBro vs iLovePDF, Smallpdf, Adobe Acrobat, Sejda, PDF2Go, PDFfiller, PDFescape, Google Docs, Canva",
      "Dedicated student page with 12 academic workflows",
      "Business page with team use cases",
      "Developer page with integration ideas",
      "Alternatives hub comparing PDFBro to 6+ competitors",
      "Blog launched with in-depth PDF and image guides",
      "llms.txt and llms-full.txt for AI crawler discoverability",
    ],
  },
  {
    date: "2025-05-01",
    version: "v1.0.0",
    title: "Initial Launch — 30+ PDF & Image Tools",
    changes: [
      "PDF tools: Merge, Split, Compress, Sign, OCR, Rotate, Watermark, Page Numbers, Extract Pages, Reorder Pages, Fill Form, Unlock, Protect, Edit PDF, Edit Word",
      "Image tools: Compress, Resize, Crop, Remove Background, Passport Photo, Add Text, Flip",
      "Convert tools: Image to PDF, PDF to Image, Word to PDF, PDF to Word, PDF to Excel, PDF to PowerPoint, Text to PDF, PDF to Text, PNG to JPEG, JPG to PNG, WebP converters, SVG converters, GIF/MP4 converters, HEIC to JPG, Image to WebP",
      "QR Code Generator — URLs, WiFi, text, email, phone",
      "100% browser-based processing for most tools",
      "Zero signup, zero watermarks, no daily limits",
    ],
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Changelog — PDFBro Updates & New Features",
  url: "https://pdfbro.tech/changelog",
  description: "Track every update, new tool, and improvement to PDFBro.",
  dateModified: "2026-06-23",
};

export default function ChangelogPage() {
  return (
    <>
      <Script id="jsonld-changelog" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="minimal" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>Changelog</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            Changelog
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Every update, improvement, and new tool added to PDFBro.
          </p>

          <div className="space-y-10">
            {CHANGES.map((entry) => (
              <div key={entry.version} className="relative pl-8" style={{ borderLeft: "2px solid var(--border-subtle)" }}>
                <div className="absolute left-0 top-1 w-4 h-4 -translate-x-[9px] rounded-full" style={{ backgroundColor: "var(--accent-blue)", border: "3px solid var(--bg-primary)" }} />
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.12)", color: "var(--accent-blue)" }}>
                    {entry.version}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Clock className="h-3 w-3" />
                    {new Date(entry.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
                <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{entry.title}</h2>
                <ul className="space-y-2">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: "var(--accent-green)" }} />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 text-center" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Try All Free Tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
