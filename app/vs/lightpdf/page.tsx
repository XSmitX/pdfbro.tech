import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs LightPDF — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs LightPDF 2025 Comparison | PDFBro",
  description: "PDFBro vs LightPDF — honest comparison of features, limits, privacy, and price. Find out which free PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs lightpdf", "lightpdf alternative", "lightpdf free limits", "best free pdf tool 2025", "lightpdf alternative free"],
  alternates: { canonical: "https://pdfbro.tech/vs/lightpdf" },
  openGraph: { title: "PDFBro vs LightPDF — Which Free PDF Tool Wins?", description: "Honest comparison: features, daily limits, privacy, and tool count.", url: "https://pdfbro.tech/vs/lightpdf" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", lightpdf: "Free tier + $5.99/mo premium", win: "pdfbro" },
  { feature: "Free task limit", pdfbro: "None", lightpdf: "1 task/day free", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", lightpdf: "Never (for free tier)", win: "tie" },
  { feature: "Watermarks", pdfbro: "Never", lightpdf: "None", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", lightpdf: "10 MB free / 50 MB premium", win: "pdfbro" },
  { feature: "Browser-based processing", pdfbro: "Yes (most tools)", lightpdf: "No — server uploads", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", lightpdf: "20+", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", lightpdf: "Limited", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", lightpdf: "No", win: "pdfbro" },
  { feature: "Desktop app", pdfbro: "No", lightpdf: "Yes — Windows + Mac", win: "lightpdf" },
  { feature: "Mobile app", pdfbro: "Web only", lightpdf: "iOS + Android", win: "lightpdf" },
  { feature: "AI features", pdfbro: "No", lightpdf: "Yes (AI chat, summarize)", win: "lightpdf" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/lightpdf#webpage",
      url: "https://pdfbro.tech/vs/lightpdf",
      name: "PDFBro vs LightPDF — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs LightPDF — Full Comparison 2026",
      description: "Full comparison of PDFBro and LightPDF: features, limits, privacy, price. Find out which free PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs LightPDF", item: "https://pdfbro.tech/vs/lightpdf" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than LightPDF?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than LightPDF for free users because it has no daily limits (LightPDF limits free users to 1 task per day), supports larger files (100 MB vs 10 MB), processes files in the browser for privacy, and offers more tools. LightPDF offers AI features and desktop/mobile apps." } },
        { "@type": "Question", name: "What is the difference between PDFBro and LightPDF?", acceptedAnswer: { "@type": "Answer", text: "PDFBro processes files in your browser with no server uploads, has no daily limits, and offers both PDF and image tools. LightPDF uploads files to its servers, limits free users to 1 task per day with a 10 MB cap, but offers AI-powered PDF features and desktop/mobile apps." } },
        { "@type": "Question", name: "Does LightPDF have limits like PDFBro?", acceptedAnswer: { "@type": "Answer", text: "LightPDF's free tier severely restricts users to 1 task per day with a 10 MB file limit. PDFBro has no daily limits and supports files up to 100 MB, all completely free." } },
        { "@type": "Question", name: "Does PDFBro have AI features like LightPDF?", acceptedAnswer: { "@type": "Answer", text: "No, PDFBro does not currently offer AI features like chat with PDF or AI summarization. LightPDF includes AI-powered tools for PDF analysis as part of its premium offering. For AI PDF features, LightPDF has the advantage." } },
      ],
    },
  ],
};

export default function VsLightPdf() {
  return (
    <>
      <Script id="jsonld-vs-lightpdf" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs LightPDF</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs LightPDF — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            LightPDF is an AI-powered PDF platform with desktop, mobile, and web versions. PDFBro offers a completely free, browser-based alternative with more tools and no daily limits. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>LightPDF</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "lightpdf" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "lightpdf" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.lightpdf}
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
              { title: "Choose PDFBro if you…", items: ["Want no daily limits at all (unlimited)", "Need larger file support (100 MB)", "Value browser-based privacy (no upload)", "Want image tools alongside PDF tools"], color: "var(--accent-blue)" },
              { title: "Choose LightPDF if you…", items: ["Want AI-powered PDF features", "Need desktop + mobile native apps", "Only process 1 file per day (free tier)", "Are willing to pay $5.99/month for premium"], color: "#f97316" },
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
