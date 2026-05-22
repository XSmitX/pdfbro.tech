import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs Smallpdf — Honest Comparison 2025 | Free PDF Tools",
  description: "PDFBro vs Smallpdf — compare daily limits, price, privacy, and features. Find the best free PDF tool with no task caps and no watermarks.",
  keywords: ["pdfbro vs smallpdf", "smallpdf alternative free", "smallpdf 2 tasks per hour", "smallpdf no limit alternative", "best smallpdf replacement"],
  alternates: { canonical: "https://pdfbro.tech/vs/smallpdf" },
  openGraph: { title: "PDFBro vs Smallpdf — Which Free PDF Tool Is Better?", description: "PDFBro vs Smallpdf: daily limits, price, privacy. Honest 2025 comparison.", url: "https://pdfbro.tech/vs/smallpdf" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", smallpdf: "Free tier + $9/mo premium", win: "pdfbro" },
  { feature: "Free daily limit", pdfbro: "None", smallpdf: "2 tasks per hour on free", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", smallpdf: "For some features", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", smallpdf: "On some free outputs historically", win: "pdfbro" },
  { feature: "File size limit (free)", pdfbro: "100 MB", smallpdf: "15 MB free / 5 GB premium", win: "pdfbro" },
  { feature: "Browser-based processing", pdfbro: "Yes (most tools)", smallpdf: "No — server uploads", win: "pdfbro" },
  { feature: "Total tools", pdfbro: "100+", smallpdf: "20+", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes", smallpdf: "Limited", win: "pdfbro" },
  { feature: "UI polish", pdfbro: "Clean, modern", smallpdf: "Very polished", win: "tie" },
  { feature: "Mobile app", pdfbro: "Web only", smallpdf: "iOS + Android", win: "smallpdf" },
  { feature: "Team collaboration", pdfbro: "No", smallpdf: "Yes (premium)", win: "smallpdf" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PDFBro vs Smallpdf Comparison 2025",
  description: "Honest comparison of PDFBro and Smallpdf free PDF tools.",
  url: "https://pdfbro.tech/vs/smallpdf",
};

export default function VsSmallpdf() {
  return (
    <>
      <Script id="jsonld-vs-smallpdf" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs Smallpdf</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>PDFBro vs Smallpdf — 2025 Comparison</h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Smallpdf is a well-designed PDF platform but its free tier is heavily restricted (2 tasks/hour, 15 MB limit, some watermarks). PDFBro is a fully free alternative. Here&apos;s the honest comparison.
          </p>
          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                  <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                  <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>Smallpdf</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.feature} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <td className="px-5 py-3 font-medium text-sm" style={{ color: "var(--text-primary)" }}>{row.feature}</td>
                    <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "pdfbro" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                      <div className="flex items-center justify-center gap-1.5">
                        {row.win === "pdfbro" && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "var(--accent-green)" }} />}
                        {row.pdfbro}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "smallpdf" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                      <div className="flex items-center justify-center gap-1.5">
                        {row.win === "smallpdf" && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "var(--accent-green)" }} />}
                        {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5" style={{ color: "var(--accent-red)" }} />}
                        {row.smallpdf}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: "rgba(79,142,247,0.06)", border: "1px solid rgba(79,142,247,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-blue)" }}>Bottom Line</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              If you need a free PDF tool without daily task limits, PDFBro wins. If you need a polished mobile app and team collaboration features and are willing to pay $9/month, Smallpdf is excellent.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Try PDFBro Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guides/smallpdf-alternative" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full Smallpdf Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
