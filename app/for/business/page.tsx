import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Free PDF Tools for Business — Contracts, Invoices, Reports | PDFBro",
  description: "Free PDF tools for business teams. Sign contracts, protect invoices, compress reports, convert documents. No subscription, works in browser.",
  keywords: ["free pdf tools for business", "pdf tools for business free", "sign contracts online free business", "compress pdf business", "pdf tools for teams"],
  alternates: { canonical: "https://pdfbro.tech/for/business" },
} as Metadata;

const WORKFLOWS = [
  { dept: "Finance", items: [{ title: "PDF to Excel", desc: "Extract invoice tables to spreadsheets", slug: "pdf-to-excel" }, { title: "Compress PDF", desc: "Email-ready reports under 10 MB", slug: "compress-pdf" }, { title: "Merge PDF", desc: "Combine monthly statement batches", slug: "merge-pdf" }] },
  { dept: "HR", items: [{ title: "Fill PDF Form", desc: "Onboarding forms without Acrobat", slug: "fill-pdf-form" }, { title: "Sign PDF", desc: "Offer letters and NDAs", slug: "sign-pdf" }, { title: "Word to PDF", desc: "Clean policy document PDFs", slug: "word-to-pdf" }] },
  { dept: "Sales", items: [{ title: "Add Watermark", desc: "DRAFT stamp on proposals", slug: "add-watermark" }, { title: "Protect PDF", desc: "Encrypt confidential pricing PDFs", slug: "protect-pdf" }, { title: "PDF to PowerPoint", desc: "Convert proposal slides for editing", slug: "pdf-to-powerpoint" }] },
  { dept: "Operations", items: [{ title: "Reorder Pages", desc: "Reorganize procedure documents", slug: "reorder-pdf-pages" }, { title: "Rotate PDF", desc: "Fix scanned document orientation", slug: "rotate-pdf" }, { title: "OCR PDF", desc: "Make scanned SOPs searchable", slug: "ocr-pdf" }] },
];

export default function ForBusinessPage() {
  return (
    <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>For Business</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            Free PDF Tools for Business
          </h1>
          <p className="text-base max-w-2xl mb-6" style={{ color: "var(--text-secondary)" }}>
            PDFBro replaces expensive per-seat software for everyday PDF tasks across your team. Finance, HR, Sales, Operations — every department has PDF needs. All covered for free with no per-user licensing.
          </p>
          <div className="rounded-2xl p-4 flex items-center gap-3 max-w-lg" style={{ backgroundColor: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.2)" }}>
            <span className="text-2xl">💡</span>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>10 employees × $240/year Adobe Acrobat = <strong style={{ color: "var(--text-primary)" }}>$2,400/year</strong>. PDFBro = <strong style={{ color: "var(--accent-green)" }}>$0/year</strong>.</p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          {WORKFLOWS.map((dept) => (
            <div key={dept.dept}>
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>{dept.dept} Department</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {dept.items.map((item) => (
                  <Link key={item.slug} href={`/tools/${item.slug}`}
                    className="group rounded-xl p-4 transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                    <p className="text-sm font-semibold mb-1 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex gap-3 flex-wrap">
          <Link href="/guides/pdf-tools-for-business" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
            Business PDF Guide <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/security" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
            Security & Privacy →
          </Link>
        </div>
      </section>
    </div>
  );
}
