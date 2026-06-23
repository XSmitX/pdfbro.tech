import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs PDFescape — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs PDFescape 2025 Comparison | PDFBro",
  description: "PDFBro vs PDFescape — honest comparison of features, limits, privacy, and price. Find out which free PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs pdfescape", "pdfescape alternative", "pdfescape free limits", "best free pdf tool 2025", "pdfescape no signup alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/pdfescape" },
  openGraph: { title: "PDFBro vs PDFescape — Which Free PDF Tool Wins?", description: "Honest comparison: features, daily limits, privacy, watermarks, and tool count.", url: "https://pdfbro.tech/vs/pdfescape" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", pdfescape: "Free tier + $5.99/mo", win: "pdfbro" },
  { feature: "Daily task limit", pdfbro: "None", pdfescape: "Limited free", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", pdfescape: "Required for premium", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", pdfescape: "On free tier", win: "pdfbro" },
  { feature: "File size limit", pdfbro: "100 MB", pdfescape: "10 MB free / 40 MB premium", win: "pdfbro" },
  { feature: "Browser-based", pdfbro: "Yes", pdfescape: "Yes", win: "tie" },
  { feature: "Number of tools", pdfbro: "35+", pdfescape: "15+", win: "pdfbro" },
  { feature: "OCR PDF", pdfbro: "Yes", pdfescape: "No", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes 15+", pdfescape: "No", win: "pdfbro" },
  { feature: "PDF editing", pdfbro: "Annotations", pdfescape: "Full editor", win: "pdfescape" },
  { feature: "Desktop app", pdfbro: "No", pdfescape: "Yes - Windows", win: "pdfescape" },
  { feature: "Form filling", pdfbro: "Yes", pdfescape: "Yes", win: "tie" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/pdfescape#webpage",
      url: "https://pdfbro.tech/vs/pdfescape",
      name: "PDFBro vs PDFescape — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs PDFescape — Full Comparison 2026",
      description: "Full comparison of PDFBro and PDFescape: features, limits, privacy, price. Find out which free PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs PDFescape", item: "https://pdfbro.tech/vs/pdfescape" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than PDFescape?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than PDFescape for users wanting more tools, no file size limits (100 MB vs 10 MB free), and completely free access without watermarks. PDFescape has a full PDF editor and Windows desktop app." } },
        { "@type": "Question", name: "What is the difference between PDFBro and PDFescape?", acceptedAnswer: { "@type": "Answer", text: "PDFBro offers free PDF and image tools with browser-based processing, no signup, and no watermarks. PDFescape offers a full PDF text editor and form filler but limits free users to 10 MB files and adds watermarks on the free tier." } },
        { "@type": "Question", name: "Is PDFBro free like PDFescape?", acceptedAnswer: { "@type": "Answer", text: "Both PDFBro and PDFescape offer free PDF tools, but PDFBro has no restrictions while PDFescape free tier limits file sizes to 10 MB, adds watermarks, and restricts daily usage. PDFBro is more generous for free users." } },
        { "@type": "Question", name: "Does PDFBro edit PDFs like PDFescape?", acceptedAnswer: { "@type": "Answer", text: "PDFBro offers annotation tools for PDFs (adding text, shapes, highlights). PDFescape offers a full PDF text editor that can modify existing text. For full text editing, PDFescape has an advantage, but PDFBro offers many more overall tools." } },
      ],
    },
  ],
};

export default function VsPdfescape() {
  return (
    <>
      <Script id="jsonld-vs-pdfescape" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/guides/pdfescape-alternative" className="hover:underline">PDFescape Alternative</Link> / <span>PDFBro vs PDFescape</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs PDFescape — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            PDFescape is a browser-based PDF editor with a free tier and a paid premium plan. PDFBro offers a completely free, browser-based alternative with far more tools and no restrictions. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>PDFescape</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "pdfescape" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "pdfescape" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.pdfescape}
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
              { title: "Choose PDFBro if you…", items: ["Want free tools with no limits", "Need OCR and image processing tools", "Don't want watermarks on output", "Value browser-based privacy"], color: "var(--accent-blue)" },
              { title: "Choose PDFescape if you…", items: ["Need a full PDF text editor", "Want a Windows desktop application", "Don't mind 10 MB file size limits", "Can work with the free tier restrictions"], color: "#f97316" },
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
            <Link href="/guides/pdfescape-alternative" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full PDFescape Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
