import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Free PDF Tools for Students — Merge, Compress, Convert | PDFBro",
  description: "Free PDF tools built for students. Merge assignment PDFs, compress readings, annotate papers, fill forms, convert files. No signup, no cost, no limits.",
  keywords: ["free pdf tools for students", "student pdf tools free", "merge pdf for assignments", "compress pdf for submission", "annotate pdf for studying free"],
  alternates: { canonical: "https://pdfbro.tech/for/students" },
} as Metadata;

const STUDENT_WORKFLOWS = [
  { title: "Assignment submission", desc: "Merge your cover page, assignment body, and appendices into one PDF for submission.", tool: "merge-pdf", toolName: "Merge PDF" },
  { title: "Compress large readings", desc: "Semester lecture slides and textbook PDFs can exceed 500 MB. Compress to 10–20% of size.", tool: "compress-pdf", toolName: "Compress PDF" },
  { title: "Annotate research papers", desc: "Highlight key passages, add margin notes, and mark citations in PDF papers.", tool: "edit-pdf", toolName: "Edit PDF" },
  { title: "Fill application forms", desc: "University applications, scholarships, internship forms — fill PDF forms without printing.", tool: "fill-pdf-form", toolName: "Fill PDF Form" },
  { title: "Sign offer letters", desc: "Add your electronic signature to internship offers, rental agreements, and club forms.", tool: "sign-pdf", toolName: "Sign PDF" },
  { title: "Thesis page numbers", desc: "Add automatic page numbering to your thesis or dissertation before submission.", tool: "pdf-page-numbers", toolName: "PDF Page Numbers" },
  { title: "Extract specific chapters", desc: "Pull out a single chapter from a 300-page course reader to share with your study group.", tool: "extract-pdf-pages", toolName: "Extract PDF Pages" },
  { title: "Compress photos for forms", desc: "Government portals and university apps require photos under 100 KB.", tool: "compress-image", toolName: "Compress Image" },
  { title: "Passport photos", desc: "Create passport and visa photos for free without visiting a photo studio.", tool: "passport-photo", toolName: "Passport Photo" },
  { title: "QR codes for presentations", desc: "Add QR codes to your presentation slides linking to sources, demos, or survey forms.", tool: "qr-code-generator", toolName: "QR Code Generator" },
];

const STUDENTS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pdfbro.tech/for/students#webpage",
      url: "https://pdfbro.tech/for/students",
      name: "Free PDF Tools for Students — Merge, Compress, Convert | PDFBro",
      description: "Free PDF tools built for students. No signup, no cost, no limits.",
      inLanguage: "en-US",
      datePublished: "2025-05-01",
      dateModified: "2026-05-23",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      about: { "@id": "https://pdfbro.tech/#organization" },
      audience: { "@type": "Audience", audienceType: "Students" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "For Students", item: "https://pdfbro.tech/for/students" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Are PDFBro tools free for students?", acceptedAnswer: { "@type": "Answer", text: "Yes. All 100+ PDFBro tools are completely free for students with no usage limits, no signup required, and no watermarks on output files." } },
        { "@type": "Question", name: "Can I use PDFBro to merge assignment PDFs?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use PDFBro's Merge PDF tool to combine your cover page, assignment body, and appendices into one PDF. Free, no signup, browser-based." } },
        { "@type": "Question", name: "How do I compress a PDF for submission?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's Compress PDF tool at pdfbro.tech/tools/compress-pdf. Upload your PDF, choose compression level, and download the smaller file instantly." } },
      ],
    },
  ],
};

export default function ForStudentsPage() {
  return (
    <>
      <Script id="jsonld-for-students" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STUDENTS_JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>For Students</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            Free PDF &amp; Image Tools for Students
          </h1>
          <p className="text-base max-w-2xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Students need PDF tools constantly — assignments, applications, research, forms. PDFBro provides every tool students need, completely free, with no account and no daily limits. Not a trial. Not a limited version. Free forever.
          </p>
          <div className="flex flex-wrap gap-2">
            {["No signup required", "No daily limits", "No watermarks", "Works on any device"].map((badge) => (
              <span key={badge} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>10 Ways Students Use PDFBro</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {STUDENT_WORKFLOWS.map((w) => (
              <Link key={w.tool} href={`/tools/${w.tool}`}
                className="group rounded-2xl p-5 flex items-start gap-4 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{w.title}</p>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{w.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>Use {w.toolName} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Read the full student guide</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Thesis submission, research workflows, and more</p>
          </div>
          <div className="flex gap-3">
            <Link href="/guides/pdf-tools-for-students" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Student Guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tools" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              All 100+ Tools →
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
