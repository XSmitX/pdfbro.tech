import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs iLovePDF — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs iLovePDF 2025 Comparison | PDFBro",
  description: "PDFBro vs iLovePDF — honest comparison of features, limits, privacy, and price. Find out which free PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs ilovepdf", "ilovepdf alternative", "ilovepdf free limits", "best free pdf tool 2025", "ilovepdf no signup alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/ilovepdf" },
  openGraph: { title: "PDFBro vs iLovePDF — Which Free PDF Tool Wins?", description: "Honest comparison: features, daily limits, privacy, watermarks, and tool count.", url: "https://pdfbro.tech/vs/ilovepdf" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", ilovepdf: "Free tier + $6.61/mo premium", win: "pdfbro" },
  { feature: "Daily task limit", pdfbro: "None", ilovepdf: "2 tasks/hour on free tier", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", ilovepdf: "Optional (limited without)", win: "pdfbro" },
  { feature: "Watermarks on output", pdfbro: "Never", ilovepdf: "None on most tools", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", ilovepdf: "100 MB", win: "tie" },
  { feature: "Browser-based processing", pdfbro: "Yes (most tools)", ilovepdf: "No — server uploads always", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "100+", ilovepdf: "25+", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", ilovepdf: "No", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", ilovepdf: "No", win: "pdfbro" },
  { feature: "Mobile app", pdfbro: "Web only", ilovepdf: "iOS + Android apps", win: "ilovepdf" },
  { feature: "Offline use", pdfbro: "Partial (after load)", ilovepdf: "App: yes", win: "ilovepdf" },
  { feature: "API access", pdfbro: "No", ilovepdf: "Yes (paid)", win: "ilovepdf" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PDFBro vs iLovePDF Comparison",
  description: "Full comparison of PDFBro and iLovePDF: features, limits, privacy, price.",
  url: "https://pdfbro.tech/vs/ilovepdf",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
      { "@type": "ListItem", position: 2, name: "PDFBro vs iLovePDF", item: "https://pdfbro.tech/vs/ilovepdf" },
    ],
  },
};

export default function VsIlovePDF() {
  return (
    <>
      <Script id="jsonld-vs-ilovepdf" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/guides/ilovepdf-alternative" className="hover:underline">iLovePDF Alternative</Link> / <span>PDFBro vs iLovePDF</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs iLovePDF — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            iLovePDF is one of the most popular online PDF platforms with 180+ million monthly visitors. PDFBro offers a completely free, browser-based alternative. Here&apos;s an honest side-by-side comparison.
          </p>

          {/* Comparison table */}
          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>iLovePDF</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "ilovepdf" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "ilovepdf" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.ilovepdf}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            {[
              { title: "Choose PDFBro if you…", items: ["Don't want daily task limits", "Value browser-based privacy (no file upload)", "Need image tools too (not just PDF)", "Want zero restrictions with no account"], color: "var(--accent-blue)" },
              { title: "Choose iLovePDF if you…", items: ["Need iOS/Android mobile apps with offline use", "Want API access for automation", "Process very large volumes (team plan)", "Prefer a polished app experience"], color: "#f97316" },
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
            <Link href="/guides/ilovepdf-alternative" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full iLovePDF Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
