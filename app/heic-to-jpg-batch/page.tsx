import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

export const metadata: Metadata = {
  title: "HEIC to JPG Batch Converter — Free Online, Up to 20 Photos | PDFBro",
  description: "Convert HEIC to JPG online free batch converter. Convert up to 20 iPhone HEIC photos to JPEG at once. No signup, no watermark, instant download or ZIP.",
  keywords: [
    "convert heic to jpg online free batch",
    "heic to jpg batch converter free",
    "convert multiple heic to jpg online",
    "batch heic to jpeg converter no signup",
    "iphone heic to jpg batch free",
    "heic to jpg converter multiple files",
    "convert heic photos to jpeg batch online",
    "heic to jpg no limit free",
  ],
  alternates: { canonical: "https://pdfbro.tech/heic-to-jpg-batch" },
  openGraph: {
    title: "HEIC to JPG Batch Converter — Free Online, Up to 20 Photos | PDFBro",
    description: "Convert HEIC to JPG online free batch converter. Up to 20 iPhone photos at once. No signup, no watermark.",
    url: "https://pdfbro.tech/heic-to-jpg-batch",
    type: "website",
  },
};

export default function HeicToJpgBatchPage() {
  return (
    <>
      <Script id="jsonld-heic-to-jpg-batch" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://pdfbro.tech/heic-to-jpg-batch#webpage",
            url: "https://pdfbro.tech/heic-to-jpg-batch",
            name: "HEIC to JPG Batch Converter — Free Online, Up to 20 Photos",
            description: "Convert HEIC to JPG online free batch converter. Convert up to 20 iPhone HEIC photos to JPEG at once. No signup, no watermark.",
            inLanguage: "en-US",
            dateModified: "2026-06-23",
            isPartOf: { "@id": `${BASE_URL}/#website` },
            breadcrumb: { "@id": "https://pdfbro.tech/heic-to-jpg-batch#breadcrumb" },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://pdfbro.tech/heic-to-jpg-batch#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "Image Tools", item: `${BASE_URL}/image-tools` },
              { "@type": "ListItem", position: 3, name: "HEIC to JPG Batch", item: "https://pdfbro.tech/heic-to-jpg-batch" },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": "https://pdfbro.tech/heic-to-jpg-batch#faq",
            mainEntity: [
              { "@type": "Question", name: "How many HEIC files can I convert at once on PDFBro?", acceptedAnswer: { "@type": "Answer", text: "You can convert up to 20 HEIC photos to JPG in a single batch on PDFBro. All conversions process simultaneously in your browser — no server uploads, no waiting in a queue. For more than 20 photos, simply run multiple batches with no daily limits." } },
              { "@type": "Question", name: "Does HEIC to JPG conversion work for iPhone photos?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's HEIC to JPG converter is specifically designed for iPhone photos. HEIC is Apple's default image format on iPhones running iOS 11 and later. The converter preserves full resolution, metadata, and color accuracy when converting to JPEG." } },
              { "@type": "Question", name: "Is the quality preserved when converting HEIC to JPG?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro converts HEIC to JPG at maximum quality (100%). Your photos retain full resolution, EXIF data, and color profile. The only difference is the file format — JPEG instead of HEIC — making them compatible with all platforms, websites, and older software that cannot read HEIC files." } },
              { "@type": "Question", name: "Can I download all converted JPGs as a ZIP file?", acceptedAnswer: { "@type": "Answer", text: "Yes. When converting multiple HEIC files in batch mode, PDFBro offers a single ZIP download containing all converted JPG files. You can also download each photo individually if preferred." } },
            ],
          },
        ],
      }) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/image-tools" className="hover:underline">Image Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>HEIC to JPG Batch</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            HEIC to JPG Batch Converter — Free Online, Up to 20 Photos
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Took 50 photos on your iPhone and now need them all as JPEGs for a website, portfolio, or client delivery? Converting HEIC files one by one is painful. PDFBro&apos;s HEIC to JPG batch converter transforms up to 20 iPhone photos to JPEG simultaneously — right in your browser. No uploads, no signup, no daily limits. Select your HEIC files, click convert, and download all JPGs as a single ZIP file in seconds.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Apple switched to HEIC in 2017 to save storage space, but most platforms — WordPress, Shopify, government portals, older apps — still require JPEG. PDFBro bridges the gap with a zero-friction batch converter that costs nothing and keeps your photos private.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Batch Convert</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(139,106,245,0.1)", color: "var(--accent-violet)", border: "1px solid rgba(139,106,245,0.2)" }}>ZIP Download</span>
          </div>

          <Link
            href="/tools/heic-to-jpg"
            className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>HEIC to JPG Converter</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Batch convert up to 20 HEIC iPhone photos to JPEG — all in your browser, ZIP download available</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Convert Batch Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Batch Convert HEIC to JPG</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Select multiple HEIC files", desc: "Click to upload or drag up to 20 HEIC photos at once. You can select them all from your file browser — the tool accepts bulk input from iPhones, Macs, or any device." },
                { step: 2, title: "Convert all files to JPEG", desc: "Click Convert and all HEIC files process simultaneously in your browser. Each photo converts to JPEG at maximum quality — full resolution, no compression artifacts." },
                { step: 3, title: "Download single files or ZIP", desc: "Download all converted JPGs as a single ZIP archive, or click individual files to download one at a time. No signup, no watermark, no limits on batches." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(79,142,247,0.15)", color: "var(--accent-blue)" }}>
                    {s.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-5 mb-6 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro for Batch HEIC to JPG Conversion</h2>
            {["100% Free — no subscription, no premium tier", "No signup required — use instantly", "Browser-based processing — your photos stay private", "No watermarks on output", "No daily limits — run unlimited batches"].map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat}</span>
              </div>
            ))}
          </section>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
            <div className="space-y-5">
              {[
                { q: "How many HEIC files can I convert at once?", a: "You can convert up to 20 HEIC photos to JPG in a single batch on PDFBro. All conversions process simultaneously in your browser — no server uploads, no waiting in a queue. For more than 20 photos, simply run multiple batches with no daily limits." },
                { q: "Does HEIC to JPG conversion work for iPhone photos?", a: "Yes. PDFBro&apos;s HEIC to JPG converter is specifically designed for iPhone photos. HEIC is Apple&apos;s default image format on iPhones running iOS 11 and later. The converter preserves full resolution, metadata, and color accuracy when converting to JPEG." },
                { q: "Is the quality preserved when converting HEIC to JPG?", a: "Yes. PDFBro converts HEIC to JPG at maximum quality (100%). Your photos retain full resolution, EXIF data, and color profile. The only difference is the file format — JPEG instead of HEIC — making them compatible with all platforms, websites, and older software that cannot read HEIC files." },
                { q: "Can I download all converted JPGs as a ZIP file?", a: "Yes. When converting multiple HEIC files in batch mode, PDFBro offers a single ZIP download containing all converted JPG files. You can also download each photo individually if preferred." },
              ].map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/tools/heic-to-jpg" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Batch Convert HEIC to JPG — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
