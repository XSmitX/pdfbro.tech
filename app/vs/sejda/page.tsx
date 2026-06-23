import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs Sejda PDF — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs Sejda PDF 2025 Comparison | PDFBro",
  description: "PDFBro vs Sejda PDF — honest comparison of features, limits, privacy, and price. Find out which free PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs sejda", "sejda alternative", "sejda free limits", "best free pdf tool 2025", "sejda no signup alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/sejda" },
  openGraph: { title: "PDFBro vs Sejda PDF — Which Free PDF Tool Wins?", description: "Honest comparison: features, daily limits, privacy, watermarks, and tool count.", url: "https://pdfbro.tech/vs/sejda" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", sejda: "Free tier + $7.50/mo premium", win: "pdfbro" },
  { feature: "Daily task limit", pdfbro: "None", sejda: "3 tasks/hour free", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", sejda: "Optional", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", sejda: "None on most tools", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", sejda: "50 MB free", win: "pdfbro" },
  { feature: "Browser-based", pdfbro: "Yes", sejda: "Server uploads always", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", sejda: "30+", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes 15+", sejda: "No", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", sejda: "No", win: "pdfbro" },
  { feature: "Desktop app", pdfbro: "No", sejda: "Yes - paid", win: "sejda" },
  { feature: "Mobile app", pdfbro: "Web only", sejda: "No", win: "tie" },
  { feature: "API access", pdfbro: "No", sejda: "Yes", win: "sejda" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/sejda#webpage",
      url: "https://pdfbro.tech/vs/sejda",
      name: "PDFBro vs Sejda PDF — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs Sejda PDF — Full Comparison 2026",
      description: "Full comparison of PDFBro and Sejda PDF: features, limits, privacy, price. Find out which free PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs Sejda PDF", item: "https://pdfbro.tech/vs/sejda" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than Sejda?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than Sejda for free users because it has no daily task limits (Sejda limits free users to 3 tasks per hour), processes files in the browser for better privacy, offers PDF and image tools that Sejda does not offer." } },
        { "@type": "Question", name: "What is the difference between PDFBro and Sejda?", acceptedAnswer: { "@type": "Answer", text: "PDFBro processes files in your browser with no server uploads, has no daily limits, and offers both PDF and image tools. Sejda uploads files to its servers, limits free users to 3 tasks per hour, and has fewer tools but offers a paid desktop app." } },
        { "@type": "Question", name: "Is PDFBro free like Sejda?", acceptedAnswer: { "@type": "Answer", text: "Both PDFBro and Sejda offer free PDF processing, but PDFBro has no daily limits or task caps while Sejda free tier restricts users to 3 tasks per hour and smaller file sizes (50 MB vs PDFBro's 100 MB). PDFBro is more generous for free users." } },
        { "@type": "Question", name: "Does PDFBro have a desktop app like Sejda?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is web-only and works in all modern browsers on any device. Sejda offers a paid desktop application. If you need offline desktop processing, Sejda has an advantage with its paid app." } },
      ],
    },
  ],
};

export default function VsSejda() {
  return (
    <>
      <Script id="jsonld-vs-sejda" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/guides/sejda-alternative-free" className="hover:underline">Sejda Alternative</Link> / <span>PDFBro vs Sejda</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs Sejda — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Sejda is a popular online PDF editor with both free and premium tiers. PDFBro offers a completely free, browser-based alternative with more tools and no daily limits. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>Sejda</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "sejda" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "sejda" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.sejda}
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
              { title: "Choose PDFBro if you…", items: ["Don't want daily task limits", "Value browser-based privacy (no file upload)", "Need image tools too (not just PDF)", "Want zero restrictions with no account"], color: "var(--accent-blue)" },
              { title: "Choose Sejda if you…", items: ["Need a paid desktop app for offline use", "Want API access for automation", "Prefer a smaller focused toolset", "Don't mind the 3 task/hour free limit"], color: "#f97316" },
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
            <Link href="/guides/sejda-alternative-free" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full Sejda Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
