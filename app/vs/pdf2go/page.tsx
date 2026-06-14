import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs PDF2Go — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs PDF2Go 2025 Comparison | PDFBro",
  description: "PDFBro vs PDF2Go — honest comparison of features, limits, privacy, and price. Find out which free PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs pdf2go", "pdf2go alternative", "pdf2go free limits", "best free pdf tool 2025", "pdf2go no signup alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/pdf2go" },
  openGraph: { title: "PDFBro vs PDF2Go — Which Free PDF Tool Wins?", description: "Honest comparison: features, daily limits, privacy, watermarks, and tool count.", url: "https://pdfbro.tech/vs/pdf2go" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", pdf2go: "Free tier + premium", win: "pdfbro" },
  { feature: "Daily task limit", pdfbro: "None", pdf2go: "Limited free tier", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", pdf2go: "Optional", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", pdf2go: "None", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", pdf2go: "50 MB", win: "pdfbro" },
  { feature: "Browser-based", pdfbro: "Yes", pdf2go: "Server uploads always", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "100+", pdf2go: "25+", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes 15+", pdf2go: "No", win: "pdfbro" },
  { feature: "OCR PDF", pdfbro: "Yes", pdf2go: "Yes", win: "tie" },
  { feature: "File privacy", pdfbro: "Browser-based", pdf2go: "Server-based", win: "pdfbro" },
  { feature: "Batch processing", pdfbro: "Yes - 20 files", pdf2go: "Limited", win: "pdfbro" },
  { feature: "PDF editing depth", pdfbro: "Annotations", pdf2go: "Annotations", win: "tie" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/pdf2go#webpage",
      url: "https://pdfbro.tech/vs/pdf2go",
      name: "PDFBro vs PDF2Go — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs PDF2Go — Full Comparison 2026",
      description: "Full comparison of PDFBro and PDF2Go: features, limits, privacy, price. Find out which free PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs PDF2Go", item: "https://pdfbro.tech/vs/pdf2go" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than PDF2Go?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than PDF2Go for free users because it has no daily task limits, processes files in the browser for better privacy, offers 100+ tools vs PDF2Go's 25+, and includes image tools that PDF2Go does not offer." } },
        { "@type": "Question", name: "What is the difference between PDFBro and PDF2Go?", acceptedAnswer: { "@type": "Answer", text: "PDFBro processes files in your browser with no server uploads, has no daily limits, and offers both PDF and image tools. PDF2Go uploads files to its servers, limits free tier usage, and focuses only on PDF tools without image processing capabilities." } },
        { "@type": "Question", name: "Is PDFBro free like PDF2Go?", acceptedAnswer: { "@type": "Answer", text: "Both PDFBro and PDF2Go are free to use, but PDFBro has no daily limits or task caps while PDF2Go restricts free tier users. PDFBro also offers larger file size limits (100 MB vs 50 MB) and batch processing up to 20 files." } },
        { "@type": "Question", name: "Which is more private, PDFBro or PDF2Go?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is more private because it processes files locally in your browser. PDF2Go always uploads files to its servers for processing, which means your documents leave your device. If privacy matters, PDFBro is the better choice." } },
      ],
    },
  ],
};

export default function VsPdf2Go() {
  return (
    <>
      <Script id="jsonld-vs-pdf2go" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/guides/pdf2go-alternative" className="hover:underline">PDF2Go Alternative</Link> / <span>PDFBro vs PDF2Go</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs PDF2Go — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            PDF2Go is a popular online PDF editor offering a range of document conversion and editing tools. PDFBro offers a completely free, browser-based alternative with more tools and no daily limits. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>PDF2Go</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "pdf2go" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "pdf2go" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.pdf2go}
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
              { title: "Choose PDFBro if you…", items: ["Don't want daily task limits", "Value browser-based privacy (no file upload)", "Need image tools too (not just PDF)", "Want batch processing for up to 20 files"], color: "var(--accent-blue)" },
              { title: "Choose PDF2Go if you…", items: ["Prefer a simpler toolset", "Already use PDF2Go and are happy with it", "Don't mind server-based processing", "Need OCR with server-powered accuracy"], color: "#f97316" },
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
            <Link href="/guides/pdf2go-alternative" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full PDF2Go Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
