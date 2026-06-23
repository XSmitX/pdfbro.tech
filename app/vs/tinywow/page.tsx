import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs TinyWow — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs TinyWow 2025 Comparison | PDFBro",
  description: "PDFBro vs TinyWow — honest comparison of features, limits, privacy, and price. Find out which free online tool suite is right for you in 2025.",
  keywords: ["pdfbro vs tinywow", "tinywow alternative", "tinywow free tools", "best free pdf tool 2025", "tinywow vs pdfbro"],
  alternates: { canonical: "https://pdfbro.tech/vs/tinywow" },
  openGraph: { title: "PDFBro vs TinyWow — Which Free Tool Suite Wins?", description: "Honest comparison: features, privacy, tool count, and limits.", url: "https://pdfbro.tech/vs/tinywow" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", tinywow: "Free forever", win: "tie" },
  { feature: "Daily task limit", pdfbro: "None", tinywow: "None (ads supported)", win: "tie" },
  { feature: "Signup required", pdfbro: "Never", tinywow: "Never", win: "tie" },
  { feature: "Watermarks", pdfbro: "Never", tinywow: "Never", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", tinywow: "No stated limit", win: "tinywow" },
  { feature: "Browser-based processing", pdfbro: "Yes (most tools)", tinywow: "No — server uploads", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", tinywow: "100+ (many categories)", win: "tinywow" },
  { feature: "PDF-specific tools", pdfbro: "20+ PDF tools", tinywow: "10+ PDF tools", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", tinywow: "Yes (image category)", win: "tie" },
  { feature: "QR code generator", pdfbro: "Yes", tinywow: "No", win: "pdfbro" },
  { feature: "Ad-free experience", pdfbro: "Yes", tinywow: "No (ad-heavy)", win: "pdfbro" },
  { feature: "Mobile app", pdfbro: "Web only", tinywow: "No", win: "tie" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/tinywow#webpage",
      url: "https://pdfbro.tech/vs/tinywow",
      name: "PDFBro vs TinyWow — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs TinyWow — Full Comparison 2026",
      description: "Full comparison of PDFBro and TinyWow: features, limits, privacy, price. Find out which free online tool suite is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs TinyWow", item: "https://pdfbro.tech/vs/tinywow" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than TinyWow?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than TinyWow for PDF-focused work because it has more dedicated PDF tools (20+ vs 10+), processes files in the browser for privacy, and offers an ad-free experience. TinyWow has a broader range of non-PDF tools." } },
        { "@type": "Question", name: "What is the difference between PDFBro and TinyWow?", acceptedAnswer: { "@type": "Answer", text: "PDFBro focuses on PDF and image tools with browser-based processing and no ads. TinyWow offers a wider variety of tool categories (100+ tools) including video and file conversion but processes everything on servers and displays ads." } },
        { "@type": "Question", name: "Does TinyWow have limits like PDFBro?", acceptedAnswer: { "@type": "Answer", text: "Both TinyWow and PDFBro are free with no daily limits and no signup required. TinyWow is ad-supported to stay free, while PDFBro has no ads at all." } },
        { "@type": "Question", name: "Which has more tools: PDFBro or TinyWow?", acceptedAnswer: { "@type": "Answer", text: "TinyWow has more total tools (100+ across multiple categories including video and file conversion), but PDFBro has more specialized PDF tools (20+ vs TinyWow's 10+) and more image tools (15+). For PDF-specific work, PDFBro is stronger." } },
      ],
    },
  ],
};

export default function VsTinyWow() {
  return (
    <>
      <Script id="jsonld-vs-tinywow" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs TinyWow</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs TinyWow — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            TinyWow is a massive free online tool suite with 100+ tools across many categories. PDFBro is a focused PDF and image processor with browser-first privacy. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>TinyWow</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "tinywow" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "tinywow" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.tinywow}
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
              { title: "Choose PDFBro if you…", items: ["Need serious PDF tools (20+ specialized tools)", "Value browser-based privacy", "Want an ad-free experience", "Need image tools alongside PDF tools"], color: "var(--accent-blue)" },
              { title: "Choose TinyWow if you…", items: ["Need tools beyond PDF (video, file conversion)", "Want sheer tool quantity (100+)", "Don't mind ads in the interface", "Are okay with server-side processing"], color: "#f97316" },
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
