import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs PDFfiller — Full Comparison 2025 | Which PDF Editor is Better?",
  metaTitle: "PDFBro vs PDFfiller 2025 Comparison | PDFBro",
  description: "PDFBro vs PDFfiller — honest comparison of features, limits, privacy, and price. Find out which PDF editor is right for you in 2025.",
  keywords: ["pdfbro vs pdffiller", "pdffiller alternative", "pdffiller free alternative", "best free pdf editor 2025", "pdffiller no signup alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/pdffiller" },
  openGraph: { title: "PDFBro vs PDFfiller — Which PDF Editor Wins?", description: "Honest comparison: features, pricing, e-signatures, form filling, and privacy.", url: "https://pdfbro.tech/vs/pdffiller" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", pdffiller: "$8/month minimum", win: "pdfbro" },
  { feature: "Daily task limit", pdfbro: "None", pdffiller: "Limited free", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", pdffiller: "Required", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", pdffiller: "On free tier", win: "pdfbro" },
  { feature: "File size limit", pdfbro: "100 MB", pdffiller: "100 MB", win: "tie" },
  { feature: "Browser-based", pdfbro: "Yes", pdffiller: "Server-based", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", pdffiller: "20+", win: "pdfbro" },
  { feature: "e-Signature", pdfbro: "Yes - basic", pdffiller: "Yes - advanced", win: "pdffiller" },
  { feature: "Form filling", pdfbro: "Yes", pdffiller: "Yes - specialized", win: "pdffiller" },
  { feature: "PDF editing", pdfbro: "Annotations", pdffiller: "Full editor", win: "pdffiller" },
  { feature: "Templates", pdfbro: "No", pdffiller: "Yes", win: "pdffiller" },
  { feature: "Image tools", pdfbro: "Yes 15+", pdffiller: "No", win: "pdfbro" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/pdffiller#webpage",
      url: "https://pdfbro.tech/vs/pdffiller",
      name: "PDFBro vs PDFfiller — Full Comparison 2026 | Which PDF Editor is Better?",
      headline: "PDFBro vs PDFfiller — Full Comparison 2026",
      description: "Full comparison of PDFBro and PDFfiller: features, limits, privacy, price. Find out which PDF editor is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs PDFfiller", item: "https://pdfbro.tech/vs/pdffiller" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than PDFfiller?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than PDFfiller for users wanting a completely free PDF tool with no signup required. PDFBro processes files in the browser and has no watermarks. PDFfiller is better for advanced e-signatures and specialized form filling but costs $8/month minimum." } },
        { "@type": "Question", name: "What is the difference between PDFBro and PDFfiller?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is a free, browser-based PDF toolkit with no signup required. PDFfiller is a paid service ($8/month) specializing in form filling, e-signatures, and full PDF editing with server-based processing." } },
        { "@type": "Question", name: "Does PDFBro have e-signatures like PDFfiller?", acceptedAnswer: { "@type": "Answer", text: "PDFBro offers basic e-signature functionality for free. PDFfiller offers more advanced e-signature features including document workflows, templates, and multi-party signing, but requires a paid subscription." } },
        { "@type": "Question", name: "Is PDFBro completely free unlike PDFfiller?", acceptedAnswer: { "@type": "Answer", text: "Yes, PDFBro is completely free forever with no paid tiers, no signup required, and no watermarks. PDFfiller starts at $8/month and requires signing up before you can use its tools." } },
      ],
    },
  ],
};

export default function VsPdffiller() {
  return (
    <>
      <Script id="jsonld-vs-pdffiller" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/guides/pdffiller-alternative" className="hover:underline">PDFfiller Alternative</Link> / <span>PDFBro vs PDFfiller</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs PDFfiller — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            PDFfiller is a popular paid PDF editor focused on form filling and e-signatures. PDFBro offers a completely free, browser-based alternative with more tools and no account requirements. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>PDFfiller</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "pdffiller" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "pdffiller" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.pdffiller}
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
              { title: "Choose PDFBro if you…", items: ["Want completely free PDF tools forever", "Don't want to create an account", "Value browser-based privacy", "Need PDF and image processing tools"], color: "var(--accent-blue)" },
              { title: "Choose PDFfiller if you…", items: ["Need advanced e-signature workflows", "Work heavily with PDF forms", "Need a full PDF text editor", "Budget $8+/month for premium features"], color: "#f97316" },
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
            <Link href="/guides/pdffiller-alternative" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full PDFfiller Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
