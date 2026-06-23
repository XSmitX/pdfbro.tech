import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

export const metadata: Metadata = {
  title: "Merge PDF Without Watermark — Free Online, No Signup | PDFBro",
  description: "Merge PDF files without watermark — free online tool that never adds logos or branding. Combine multiple PDFs instantly with no signup or registration required.",
  keywords: [
    "merge pdf without watermark",
    "merge pdf free no watermark",
    "combine pdf without watermark free",
    "merge pdf no logo online",
    "free pdf merger no watermark",
    "merge pdf files without branding",
    "combine pdfs online free no watermark",
    "merge pdf without signup no watermark",
  ],
  alternates: { canonical: "https://pdfbro.tech/merge-pdf-without-watermark" },
  openGraph: {
    title: "Merge PDF Without Watermark — Free Online, No Signup | PDFBro",
    description: "Merge PDF files without watermark — free online tool. Combine multiple PDFs instantly. No signup, no watermarks, no branding ever added.",
    url: "https://pdfbro.tech/merge-pdf-without-watermark",
    type: "website",
  },
};

export default function MergePdfWithoutWatermarkPage() {
  return (
    <>
      <Script id="jsonld-merge-pdf-without-watermark" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://pdfbro.tech/merge-pdf-without-watermark#webpage",
            url: "https://pdfbro.tech/merge-pdf-without-watermark",
            name: "Merge PDF Without Watermark — Free Online, No Signup",
            description: "Merge PDF files without watermark — free online tool that never adds logos or branding. Combine multiple PDFs instantly with no signup.",
            inLanguage: "en-US",
            dateModified: "2026-06-23",
            isPartOf: { "@id": `${BASE_URL}/#website` },
            breadcrumb: { "@id": "https://pdfbro.tech/merge-pdf-without-watermark#breadcrumb" },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://pdfbro.tech/merge-pdf-without-watermark#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "PDF Tools", item: `${BASE_URL}/pdf-tools` },
              { "@type": "ListItem", position: 3, name: "Merge PDF Without Watermark", item: "https://pdfbro.tech/merge-pdf-without-watermark" },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": "https://pdfbro.tech/merge-pdf-without-watermark#faq",
            mainEntity: [
              { "@type": "Question", name: "Does PDFBro add watermarks when merging PDFs?", acceptedAnswer: { "@type": "Answer", text: "No. PDFBro never adds watermarks, logos, or branding to any merged PDF. Your output file is clean — exactly what you assembled from your uploads. Unlike some competitors that stamp a logo on each page, PDFBro processes files without modifying your content." } },
              { "@type": "Question", name: "Can I merge PDFs for free without watermarks?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's Merge PDF tool combines your files completely free with no watermarks, no signup required, and no daily limits. You can merge unlimited PDFs every day at zero cost." } },
              { "@type": "Question", name: "How many PDFs can I merge without watermarks?", acceptedAnswer: { "@type": "Answer", text: "You can merge up to 20 PDF files per batch with PDFBro's free tool, all without watermarks. Need more than 20? Merge in batches — merge 20, then merge that result with additional files. There are no daily limits on how many merges you perform." } },
              { "@type": "Question", name: "Why do other PDF mergers add watermarks?", acceptedAnswer: { "@type": "Answer", text: "Some free PDF tools add watermarks to push you toward their paid plans. Others watermark files as a branding strategy. PDFBro is genuinely free — no watermark, no paid tier, no bait to upgrade. The tool is supported by non-intrusive site advertising." } },
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
            <Link href="/pdf-tools" className="hover:underline">PDF Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Merge PDF Without Watermark</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Merge PDF Without Watermark — Free Online, No Signup
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Need to combine PDF files but tired of tools that slap their logo on every page? PDFBro&apos;s free merge PDF tool combines your documents into one clean file — no watermarks, no branding, no &quot;Made with...&quot; stamps. Upload up to 20 PDFs, drag to rearrange, and download a pristine merged document in seconds. Everything processes in your browser — your files never leave your device, and there&apos;s zero signup required.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Most &quot;free&quot; PDF mergers are just free trials in disguise — you merge three files, get a watermark, and then see a paywall. PDFBro is different. Merge as many PDFs as you need, any day, with no caps and no hidden costs.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Browser-Based</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(139,106,245,0.1)", color: "var(--accent-violet)", border: "1px solid rgba(139,106,245,0.2)" }}>Zero Watermarks</span>
          </div>

          <Link
            href="/tools/merge-pdf"
            className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Merge PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Combine up to 20 PDFs into one file — drag to reorder, no watermarks, instant download</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Merge PDFs Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Merge PDF Without Watermark — 3 Steps</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload your PDF files", desc: "Click the upload area or drag and drop up to 20 PDF files. Files process locally in your browser — nothing is uploaded to a server." },
                { step: 2, title: "Arrange files in order", desc: "Drag and drop to reorder pages. The first file becomes page 1, the second becomes page 2, and so on. Preview the sequence before merging." },
                { step: 3, title: "Download your merged PDF", desc: "Click Merge and your combined PDF downloads instantly — no watermark, no branding, no modification. Just a clean, single PDF ready to use." },
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
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Merge PDF Without Watermark</h2>
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
                { q: "Does PDFBro add watermarks when merging PDFs?", a: "No. PDFBro never adds watermarks, logos, or branding to any merged PDF. Your output file is clean — exactly what you assembled from your uploads. Unlike some competitors that stamp a logo on each page, PDFBro processes files without modifying your content." },
                { q: "Can I merge PDFs for free without watermarks?", a: "Yes. PDFBro&apos;s Merge PDF tool combines your files completely free with no watermarks, no signup required, and no daily limits. You can merge unlimited PDFs every day at zero cost." },
                { q: "How many PDFs can I merge without watermarks?", a: "You can merge up to 20 PDF files per batch with PDFBro&apos;s free tool, all without watermarks. Need more than 20? Merge in batches — merge 20, then merge that result with additional files. There are no daily limits on how many merges you perform." },
                { q: "Why do other PDF mergers add watermarks?", a: "Some free PDF tools add watermarks to push you toward their paid plans. Others watermark files as a branding strategy. PDFBro is genuinely free — no watermark, no paid tier, no bait to upgrade." },
              ].map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/tools/merge-pdf" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Merge PDFs Without Watermarks — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
