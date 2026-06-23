import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs Nitro PDF — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs Nitro PDF 2025 Comparison | PDFBro",
  description: "PDFBro vs Nitro PDF — honest comparison of features, limits, privacy, and price. Find out which PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs nitro", "nitro pdf alternative", "nitro pdf free alternative", "best free pdf tool 2025", "nitro pro alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/nitro-pdf" },
  openGraph: { title: "PDFBro vs Nitro PDF — Which PDF Tool Wins?", description: "Honest comparison: features, price, privacy, and tool count.", url: "https://pdfbro.tech/vs/nitro-pdf" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", nitro: "$179/license (no free tier)", win: "pdfbro" },
  { feature: "Daily task limit", pdfbro: "None", nitro: "None", win: "tie" },
  { feature: "Signup required", pdfbro: "Never", nitro: "Yes (purchase required)", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", nitro: "None", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", nitro: "No stated limit", win: "nitro" },
  { feature: "Browser-based", pdfbro: "Yes", nitro: "No — desktop app only", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", nitro: "15+ (editing focused)", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", nitro: "No", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", nitro: "No", win: "pdfbro" },
  { feature: "Desktop app", pdfbro: "No", nitro: "Yes — Windows + Mac", win: "nitro" },
  { feature: "Mobile app", pdfbro: "Web only", nitro: "iOS + Android", win: "nitro" },
  { feature: "Advanced PDF editing", pdfbro: "Basic", nitro: "Advanced (full suite)", win: "nitro" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/nitro-pdf#webpage",
      url: "https://pdfbro.tech/vs/nitro-pdf",
      name: "PDFBro vs Nitro PDF — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs Nitro PDF — Full Comparison 2026",
      description: "Full comparison of PDFBro and Nitro PDF: features, limits, privacy, price. Find out which PDF tool is right for you.",
      inLanguage: "en-US",
      datePublished: "2025-05-01",
      dateModified: "2026-05-23",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      author: { "@id": "https://pdfbro.tech/#organization" },
      publisher: { "@id": "https://pdfbro.tech/#organization" },
      image: { "@type": "ImageObject", url: "https://pdfbro.tech/favicon/web-app-manifest-512x512.png" },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "PDFBro vs Nitro PDF", item: "https://pdfbro.tech/vs/nitro-pdf" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than Nitro PDF?", acceptedAnswer: { "@type": "Answer", text: "For free, quick online PDF processing, PDFBro is better. Nitro PDF is a professional desktop PDF editor with advanced features, but costs $179 per license with no free tier. The two serve different markets." } },
        { "@type": "Question", name: "What is the difference between PDFBro and Nitro PDF?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is a free browser-based tool with 35+ PDF and image tools requiring no signup. Nitro PDF is a paid desktop application ($179/license) focused on professional PDF editing, e-signatures, and document workflows." } },
        { "@type": "Question", name: "Is there a free version of Nitro PDF?", acceptedAnswer: { "@type": "Answer", text: "Nitro PDF offers a 14-day free trial but has no ongoing free tier. After the trial, you must purchase a $179 license. PDFBro offers all its tools completely free with no time limits." } },
        { "@type": "Question", name: "Can PDFBro replace Nitro PDF for business use?", acceptedAnswer: { "@type": "Answer", text: "For basic PDF tasks like merging, splitting, compressing, and converting, PDFBro can replace Nitro PDF. However, for advanced features like OCR, Bates numbering, redaction, and e-signature workflows, Nitro PDF is the better choice for business use." } },
      ],
    },
  ],
};

export default function VsNitroPdf() {
  return (
    <>
      <Script id="jsonld-vs-nitro-pdf" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs Nitro PDF</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs Nitro PDF — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Nitro PDF is a professional desktop PDF productivity suite priced at $179 per license. PDFBro is a free, browser-based alternative for everyday PDF and image tasks. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>Nitro PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.feature} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                      <td className="px-5 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{row.feature}</td>
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "pdfbro" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "pdfbro" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.pdfbro}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "nitro" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "nitro" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.nitro}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            {[
              { title: "Choose PDFBro if you…", items: ["Want a completely free PDF tool", "Need quick online merges, splits, conversions", "Want image processing tools too", "Prefer browser-based tools (no install)"], color: "var(--accent-blue)" },
              { title: "Choose Nitro PDF if you…", items: ["Need professional desktop PDF editing", "Require advanced features (OCR, redaction)", "Need e-signature workflows", "Are willing to invest $179/license for business use"], color: "#f97316" },
            ].map((block) => (
              <div key={block.title} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>{block.title}</h3>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: block.color }} />
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/tools" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Try PDFBro Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tools" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Explore All PDFBro Tools →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
