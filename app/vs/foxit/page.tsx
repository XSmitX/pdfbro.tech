import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs Foxit PDF — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs Foxit PDF 2025 Comparison | PDFBro",
  description: "PDFBro vs Foxit PDF — honest comparison of features, limits, privacy, and price. Find out which PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs foxit", "foxit alternative", "foxit pdf free limits", "best free pdf tool 2025", "foxit web alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/foxit" },
  openGraph: { title: "PDFBro vs Foxit PDF — Which PDF Tool Wins?", description: "Honest comparison: features, price, privacy, and tool count.", url: "https://pdfbro.tech/vs/foxit" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", foxit: "Free reader + $10.99/mo editor", win: "pdfbro" },
  { feature: "Daily task limit", pdfbro: "None", foxit: "None (paid editor)", win: "tie" },
  { feature: "Signup required", pdfbro: "Never", foxit: "Yes (for editor trial)", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", foxit: "Free reader: no editing", win: "pdfbro" },
  { feature: "File size limit", pdfbro: "100 MB", foxit: "No stated limit", win: "foxit" },
  { feature: "Browser-based", pdfbro: "Yes", foxit: "Yes (web editor limited)", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", foxit: "20+ (editor-heavy)", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", foxit: "No", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", foxit: "No", win: "pdfbro" },
  { feature: "Desktop app", pdfbro: "No", foxit: "Yes — Windows + Mac", win: "foxit" },
  { feature: "Mobile app", pdfbro: "Web only", foxit: "iOS + Android", win: "foxit" },
  { feature: "Advanced PDF editing", pdfbro: "Basic", foxit: "Advanced (paid)", win: "foxit" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/foxit#webpage",
      url: "https://pdfbro.tech/vs/foxit",
      name: "PDFBro vs Foxit PDF — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs Foxit PDF — Full Comparison 2026",
      description: "Full comparison of PDFBro and Foxit PDF: features, limits, privacy, price. Find out which PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs Foxit PDF", item: "https://pdfbro.tech/vs/foxit" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than Foxit PDF?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than Foxit for quick, free, online PDF processing with no signup and no software installation. Foxit excels as a desktop PDF editor with advanced editing features, but requires a paid subscription ($10.99/mo) for editing capabilities." } },
        { "@type": "Question", name: "What is the difference between PDFBro and Foxit?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is a free browser-based tool with 35+ PDF and image tools requiring no signup. Foxit is a professional desktop PDF editor with advanced features like OCR, redaction, and Bates numbering, but requires a $10.99/month subscription for editing." } },
        { "@type": "Question", name: "Can Foxit PDF be used for free?", acceptedAnswer: { "@type": "Answer", text: "Foxit offers a free PDF reader that can view, annotate, and comment on PDFs. However, advanced editing features require a paid subscription starting at $10.99/month. PDFBro offers all its tools completely free." } },
        { "@type": "Question", name: "Does PDFBro have OCR like Foxit?", acceptedAnswer: { "@type": "Answer", text: "PDFBro does not currently offer OCR (optical character recognition). Foxit PDF Editor includes advanced OCR capabilities as part of its paid subscription. For OCR needs, Foxit has the advantage." } },
      ],
    },
  ],
};

export default function VsFoxit() {
  return (
    <>
      <Script id="jsonld-vs-foxit" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs Foxit PDF</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs Foxit PDF — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Foxit PDF is a professional desktop PDF editor with advanced features and a paid subscription model. PDFBro is a free, browser-based alternative for quick PDF and image processing. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>Foxit PDF</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "foxit" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "foxit" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.foxit}
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
              { title: "Choose PDFBro if you…", items: ["Want a free online tool with no signup", "Need quick PDF merges, splits, and conversions", "Want image processing tools too", "Prefer browser-based processing (no install)"], color: "var(--accent-blue)" },
              { title: "Choose Foxit if you…", items: ["Need professional desktop PDF editing", "Require OCR and Bates numbering", "Want iOS/Android mobile apps", "Are willing to pay $10.99/month for editing"], color: "#f97316" },
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
