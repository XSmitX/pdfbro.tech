import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs PDF24 — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs PDF24 2025 Comparison | PDFBro",
  description: "PDFBro vs PDF24 — honest comparison of features, limits, privacy, and price. Find out which free PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs pdf24", "pdf24 alternative", "pdf24 free limits", "best free pdf tool 2025", "pdf24 desktop alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/pdf24" },
  openGraph: { title: "PDFBro vs PDF24 — Which Free PDF Tool Wins?", description: "Honest comparison: features, processing, privacy, and tool count.", url: "https://pdfbro.tech/vs/pdf24" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", pdf24: "Free forever", win: "tie" },
  { feature: "Daily task limit", pdfbro: "None", pdf24: "None", win: "tie" },
  { feature: "Signup required", pdfbro: "Never", pdf24: "Never", win: "tie" },
  { feature: "Watermarks", pdfbro: "Never", pdf24: "Never", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", pdf24: "No stated limit", win: "pdf24" },
  { feature: "Browser-based processing", pdfbro: "Yes (most tools)", pdf24: "No — server uploads", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", pdf24: "25+", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", pdf24: "No", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", pdf24: "No", win: "pdfbro" },
  { feature: "Desktop app", pdfbro: "No", pdf24: "Yes (Windows)", win: "pdf24" },
  { feature: "Mobile app", pdfbro: "Web only", pdf24: "No", win: "tie" },
  { feature: "API access", pdfbro: "No", pdf24: "No", win: "tie" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/pdf24#webpage",
      url: "https://pdfbro.tech/vs/pdf24",
      name: "PDFBro vs PDF24 — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs PDF24 — Full Comparison 2026",
      description: "Full comparison of PDFBro and PDF24: features, limits, privacy, price. Find out which free PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs PDF24", item: "https://pdfbro.tech/vs/pdf24" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than PDF24?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than PDF24 for privacy-conscious users because it processes files in the browser (no server uploads), offers more tools including 15+ image tools, and has a QR code generator. PDF24 processes files on its servers." } },
        { "@type": "Question", name: "What is the difference between PDFBro and PDF24?", acceptedAnswer: { "@type": "Answer", text: "PDFBro processes files in your browser with no server uploads and offers both PDF and image tools. PDF24 uploads files to its servers for processing but offers a free Windows desktop app for offline use." } },
        { "@type": "Question", name: "Is PDF24 completely free?", acceptedAnswer: { "@type": "Answer", text: "Yes, PDF24 is completely free with no signup, no watermarks, and no daily limits. Both PDFBro and PDF24 are free forever. The key differences are browser-based processing vs server-side, and tool variety." } },
        { "@type": "Question", name: "Does PDFBro have a desktop app like PDF24?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is web-only and works in all modern browsers on any device. PDF24 offers a dedicated Windows desktop application. If you need offline desktop processing on Windows, PDF24 has an advantage with its free desktop app." } },
      ],
    },
  ],
};

export default function VsPdf24() {
  return (
    <>
      <Script id="jsonld-vs-pdf24" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs PDF24</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs PDF24 — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            PDF24 is a well-known free PDF toolset with a Windows desktop app and online tools. PDFBro offers a completely browser-based alternative with more tools and zero server uploads. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>PDF24</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "pdf24" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "pdf24" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.pdf24}
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
              { title: "Choose PDFBro if you…", items: ["Want browser-based privacy (no file upload)", "Need image tools alongside PDF tools", "Want a QR code generator", "Prefer a modern, clean web interface"], color: "var(--accent-blue)" },
              { title: "Choose PDF24 if you…", items: ["Need a free Windows desktop app", "Prefer offline PDF processing", "Don't mind server-side processing", "Want a no-limit file size policy"], color: "#f97316" },
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
