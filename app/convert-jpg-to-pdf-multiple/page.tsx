import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

export const metadata: Metadata = {
  title: "Convert JPG to PDF Multiple Images — Free Online, Up to 30 Photos | PDFBro",
  description: "Convert JPG to PDF multiple images free online. Combine up to 30 JPG/PNG/WebP photos into one PDF. Drag to reorder. No signup, no watermark.",
  keywords: [
    "convert jpg to pdf multiple images free",
    "jpg to pdf multiple photos online",
    "convert multiple images to pdf free",
    "combine jpg into pdf online free",
    "jpg to pdf multiple files no signup",
    "convert many jpg to one pdf free",
    "image to pdf multiple pages online",
    "batch jpg to pdf converter free",
  ],
  alternates: { canonical: "https://pdfbro.tech/convert-jpg-to-pdf-multiple" },
  openGraph: {
    title: "Convert JPG to PDF Multiple Images — Free Online, Up to 30 Photos | PDFBro",
    description: "Convert JPG to PDF multiple images free. Combine up to 30 photos into one PDF. Drag to reorder. No signup.",
    url: "https://pdfbro.tech/convert-jpg-to-pdf-multiple",
    type: "website",
  },
};

export default function ConvertJpgToPdfMultiplePage() {
  return (
    <>
      <Script id="jsonld-jpg-to-pdf-multiple" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://pdfbro.tech/convert-jpg-to-pdf-multiple#webpage",
            url: "https://pdfbro.tech/convert-jpg-to-pdf-multiple",
            name: "Convert JPG to PDF Multiple Images — Free Online, Up to 30 Photos",
            description: "Convert JPG to PDF multiple images free online. Combine up to 30 JPG/PNG/WebP photos into one PDF. Drag to reorder. No signup.",
            inLanguage: "en-US",
            dateModified: "2026-06-23",
            isPartOf: { "@id": `${BASE_URL}/#website` },
            breadcrumb: { "@id": "https://pdfbro.tech/convert-jpg-to-pdf-multiple#breadcrumb" },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://pdfbro.tech/convert-jpg-to-pdf-multiple#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "Image Tools", item: `${BASE_URL}/image-tools` },
              { "@type": "ListItem", position: 3, name: "Convert JPG to PDF Multiple", item: "https://pdfbro.tech/convert-jpg-to-pdf-multiple" },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": "https://pdfbro.tech/convert-jpg-to-pdf-multiple#faq",
            mainEntity: [
              { "@type": "Question", name: "How many images can I convert to a single PDF?", acceptedAnswer: { "@type": "Answer", text: "PDFBro's JPG to PDF converter accepts up to 30 images per batch. Each image becomes a separate page in the PDF. The tool supports JPG, JPEG, PNG, WebP, AVIF, and BMP formats — you can mix different formats in the same upload batch." } },
              { "@type": "Question", name: "Can I arrange the order of images in the PDF?", acceptedAnswer: { "@type": "Answer", text: "Yes. After uploading your images, you can drag and drop them to rearrange the page order before converting to PDF. The first image becomes page 1, the second becomes page 2, and so on. You can also remove individual images from the batch." } },
              { "@type": "Question", name: "What image formats can I convert to PDF?", acceptedAnswer: { "@type": "Answer", text: "PDFBro's converter supports JPG, JPEG, PNG, WebP, AVIF, BMP, TIFF, and GIF images. You can upload a mix of different formats — all will be converted into a single unified PDF document with each image on its own page." } },
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
            <span style={{ color: "var(--text-secondary)" }}>Convert JPG to PDF Multiple</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Convert JPG to PDF Multiple Images — Free Online, Up to 30 Photos
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            You&apos;ve got a folder of photos — receipts, scanned documents, screenshots, ID cards — and you need them all in one clean PDF. PDFBro&apos;s image to PDF converter combines up to 30 images into a single PDF file in seconds. Drag your JPGs, PNGs, and WebPs into the tool, arrange them in the right order, and download a multi-page PDF — no signup, no watermarks, no software installation. Everything processes locally in your browser, so your images never leave your device.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Whether you&apos;re compiling expense receipts, assembling a photo portfolio, or combining scanned pages into one document — PDFBro handles it free with no daily limits and no file restrictions beyond the 30-image batch cap.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Browser-Based</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "var(--accent-orange)", border: "1px solid rgba(245,158,11,0.2)" }}>Up to 30 Images</span>
          </div>

          <Link
            href="/tools/image-to-pdf"
            className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Image to PDF Converter</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Combine up to 30 JPG, PNG, or WebP images into one PDF — drag to reorder, instant download</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Convert Images to PDF →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Convert Multiple JPGs to One PDF</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload your images", desc: "Drag and drop up to 30 JPG, PNG, or WebP files into the tool. You can select all files at once from your folder — the tool accepts mixed formats in a single batch." },
                { step: 2, title: "Arrange the page order", desc: "Drag thumbnails to reorder pages. The first image becomes page 1, the second page 2, and so on. Remove any images you don&apos;t want in the final PDF." },
                { step: 3, title: "Download the multi-page PDF", desc: "Click Convert and your PDF downloads immediately. Each image becomes a full-size page in the document — no cropping, no watermarks, no quality loss." },
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
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Convert JPG to PDF Multiple</h2>
            {["100% Free — no subscription, no premium tier", "No signup required — use instantly", "Browser-based processing — your files stay private", "No watermarks on output", "No daily limits"].map((feat) => (
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
                { q: "How many images can I convert to a single PDF?", a: "PDFBro&apos;s JPG to PDF converter accepts up to 30 images per batch. Each image becomes a separate page in the PDF. The tool supports JPG, JPEG, PNG, WebP, AVIF, and BMP formats — you can mix different formats in the same upload batch." },
                { q: "Can I arrange the order of images in the PDF?", a: "Yes. After uploading your images, you can drag and drop them to rearrange the page order before converting to PDF. The first image becomes page 1, the second becomes page 2, and so on. You can also remove individual images from the batch before converting." },
                { q: "What image formats can I convert to PDF?", a: "PDFBro&apos;s converter supports JPG, JPEG, PNG, WebP, AVIF, BMP, TIFF, and GIF images. You can upload a mix of different formats — all will be converted into a single unified PDF document with each image on its own page." },
                { q: "Will the images lose quality when converted to PDF?", a: "No. PDFBro embeds images at their original resolution into the PDF. There is no compression, no downscaling, and no quality reduction. Your PDF pages will look identical to the source images. File size will increase to accommodate the uncompressed image data." },
              ].map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/tools/image-to-pdf" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Convert Multiple JPGs to PDF — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
