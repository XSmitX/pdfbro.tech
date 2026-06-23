import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2, BookOpen, Lightbulb } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Free PDF Tools for Students — Merge, Compress, Convert, Sign | PDFBro",
  description: "Free PDF tools built for students. Merge assignments, compress readings, annotate research papers, fill application forms, convert files, create QR codes. No signup, no cost, no limits.",
  keywords: ["free pdf tools for students", "student pdf tools free", "merge pdf for assignments", "compress pdf for submission", "annotate pdf for studying free", "pdf tools for college students", "free pdf editor for students", "pdf converter for students free", "ocr pdf for students", "sign pdf for students free"],
  alternates: { canonical: "https://pdfbro.tech/for/students" },
  openGraph: {
    title: "Free PDF Tools for Students — Merge, Compress, Convert | PDFBro",
    description: "Free PDF and image tools for students. No signup, no limits, no watermarks. Everything a student needs for assignments, research, and applications.",
    url: "https://pdfbro.tech/for/students",
    type: "website",
  },
} as Metadata;

const STUDENT_WORKFLOWS = [
  { title: "Assignment submission", desc: "Merge your cover page, assignment body, and appendices into one PDF for submission. Most learning management systems require a single file upload.", tool: "merge-pdf", toolName: "Merge PDF" },
  { title: "Compress large readings", desc: "Semester lecture slides and textbook PDFs can exceed 500 MB. Compress to 10-20% of size for faster downloads and easier sharing with study groups.", tool: "compress-pdf", toolName: "Compress PDF" },
  { title: "Annotate research papers", desc: "Highlight key passages, add margin notes, and mark citations in PDF papers. Essential for literature reviews and research methodology courses.", tool: "edit-pdf", toolName: "Edit PDF" },
  { title: "Fill application forms", desc: "University applications, scholarships, internship forms — fill PDF forms directly in your browser without printing, scanning, or Adobe Acrobat.", tool: "fill-pdf-form", toolName: "Fill PDF Form" },
  { title: "Sign offer letters", desc: "Add your electronic signature to internship offers, rental agreements, and club forms. Legally valid e-signatures without printing.", tool: "sign-pdf", toolName: "Sign PDF" },
  { title: "Thesis page numbers", desc: "Add automatic page numbering to your thesis or dissertation before submission. Customize position, font, and starting number.", tool: "pdf-page-numbers", toolName: "PDF Page Numbers" },
  { title: "Extract specific chapters", desc: "Pull out a single chapter from a 300-page course reader to share with your study group. No need to send the entire file.", tool: "extract-pdf-pages", toolName: "Extract PDF Pages" },
  { title: "Compress photos for forms", desc: "Government portals and university apps require photos under 100 KB. Compress images without visible quality loss.", tool: "compress-image", toolName: "Compress Image" },
  { title: "Passport photos", desc: "Create passport and visa photos for free without visiting a photo studio. US, UK, EU, and other standard sizes supported.", tool: "passport-photo", toolName: "Passport Photo" },
  { title: "QR codes for presentations", desc: "Add QR codes to your presentation slides linking to sources, demos, or survey forms. Engage your audience instantly.", tool: "qr-code-generator", toolName: "QR Code Generator" },
  { title: "Convert PDF to Word", desc: "Extract text from lecture slides and reading materials into editable Word documents for note-taking and summarization.", tool: "pdf-to-word", toolName: "PDF to Word" },
  { title: "OCR scanned textbooks", desc: "Extract text from scanned book chapters or library materials. Make scanned PDFs searchable and copyable.", tool: "ocr-pdf", toolName: "OCR PDF" },
];

const STUDENTS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pdfbro.tech/for/students#webpage",
      url: "https://pdfbro.tech/for/students",
      name: "Free PDF Tools for Students — Merge, Compress, Convert | PDFBro",
      description: "Free PDF tools built for students. No signup, no cost, no limits. Merge assignments, compress readings, annotate papers, fill forms, and more.",
      inLanguage: "en-US",
      datePublished: "2025-05-01",
      dateModified: new Date().toISOString().split("T")[0],
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
        { "@type": "Question", name: "Are PDFBro tools free for students?", acceptedAnswer: { "@type": "Answer", text: "Yes. All PDFBro tools are completely free for students with no usage limits, no signup required, and no watermarks on output files. Unlike iLovePDF (2 tasks/hour limit) or Smallpdf (daily cap), PDFBro has zero restrictions." } },
        { "@type": "Question", name: "Can I use PDFBro to merge assignment PDFs?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use PDFBro's Merge PDF tool at pdfbro.tech/tools/merge-pdf to combine your cover page, assignment body, and appendices into one PDF. Upload up to 20 files, arrange them in order, and download the merged result. Works entirely in your browser with no file upload." } },
        { "@type": "Question", name: "How do I compress a PDF for university submission?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's Compress PDF tool at pdfbro.tech/tools/compress-pdf. Most university portals require files under 5 MB. Upload your PDF, choose High compression for maximum reduction, or Medium for balanced quality. The compressed file downloads instantly with no signup required." } },
        { "@type": "Question", name: "Can I edit PDF research papers without Adobe Acrobat?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's Edit PDF tool lets you highlight text, add comments, draw shapes, and annotate any PDF directly in your browser. No Adobe Acrobat subscription ($240/year) needed. All processing is local and private." } },
        { "@type": "Question", name: "How do I convert iPhone HEIC photos for university portals?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's HEIC to JPG converter at pdfbro.tech/tools/heic-to-jpg. Upload your iPhone HEIC photos and download standard JPEG versions instantly. JPEG is accepted by all university and government portals. No software installation needed." } },
        { "@type": "Question", name: "Is PDFBro safe for confidential student documents?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro processes nearly all files entirely in your browser using JavaScript — your documents never leave your device. Server-side tools (PDF to Word, PDF to Excel) use encrypted transmission and delete files within 1 hour. This is more private than iLovePDF or Smallpdf, which upload all files to their servers." } },
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

      {/* Hero */}
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/for/business" className="hover:underline">For Business</Link> / <span>For Students</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            Free PDF &amp; Image Tools for Students
          </h1>
          <p className="text-base max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
            Students need PDF tools constantly — assignments, applications, research papers, forms, thesis submissions. PDFBro provides every tool students need, completely free, with no account and no daily limits. Not a trial. Not a limited version. Free forever.
          </p>
          <p className="text-sm max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
            Replace expensive software subscriptions (Adobe Acrobat: $19.99/month) with a free, browser-based alternative that processes files on your device — no uploads, no limits, no watermarks.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["No signup required", "No daily limits", "No watermarks", "Works on any device", "All tools free"].map((badge) => (
              <span key={badge} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>{badge}</span>
            ))}
          </div>
          <div className="rounded-2xl p-4 flex items-start gap-3 max-w-lg" style={{ backgroundColor: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <Lightbulb className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "#10b981" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Money-saving tip:</strong> A typical student spends $240/year on Adobe Acrobat just to merge, compress, and sign PDFs. PDFBro does all of this — and more — for <strong style={{ color: "var(--accent-green)" }}>$0/year</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 12 Ways Students Use PDFBro */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>12 Ways Students Use PDFBro</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>From first-year assignments to PhD thesis submissions — every academic workflow covered.</p>
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

      {/* Why PDFBro for Students */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Why PDFBro Is Built for Student Life</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "💰", title: "100% Free — Forever", desc: "No 'free trial', no credit card, no premium tier. Every tool is completely free. We know students can't afford $20/month software subscriptions, so we built PDFBro to be genuinely free." },
              { icon: "🔒", title: "Files Stay on Your Device", desc: "Most tools process PDFs and images entirely in your browser. Your assignments, personal statements, and thesis drafts never leave your computer. More private than any cloud-based PDF service." },
              { icon: "⚡", title: "No Account, No Setup", desc: "Open your browser, go to pdfbro.tech, and start working. No email verification, no password to remember, no app to install. Works on any device — laptop, tablet, or phone." },
              { icon: "📱", title: "Works on Campus WiFi", desc: "PDFBro is lightweight and works on slow campus networks. Most tools are under 500 KB to load. No huge app downloads, no updates, no admin permissions needed." },
              { icon: "♾️", title: "No Daily Limits", desc: "Unlike other 'free' tools that cap you at 2 files per hour or per day, PDFBro has no limits. Process 50 files today and 100 tomorrow. We never throttle you." },
              { icon: "🎓", title: "Covers Every Academic Need", desc: "Merge assignments, compress readings, annotate papers, extract chapters, fill forms, sign documents, OCR textbooks, create QR codes for presentations — all in one place." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Workflow Examples */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Common Student Workflows</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Step-by-step workflows for the most common student PDF tasks.</p>
          <div className="space-y-6">
            {[
              {
                title: "Submitting a Final Paper",
                steps: [
                  "Write your paper in Google Docs or Microsoft Word",
                  "Use <a href=\"/tools/word-to-pdf\">Word to PDF</a> to convert to PDF format",
                  "Use <a href=\"/tools/merge-pdf\">Merge PDF</a> to combine with your cover page and bibliography",
                  "Use <a href=\"/tools/compress-pdf\">Compress PDF</a> to reduce file size below the LMS upload limit",
                  "Submit the single, compressed, professional PDF",
                ],
              },
              {
                title: "Preparing a Thesis or Dissertation",
                steps: [
                  "Write each chapter as a separate document",
                  "Use <a href=\"/tools/merge-pdf\">Merge PDF</a> to combine all chapters into one document",
                  "Use <a href=\"/tools/pdf-page-numbers\">PDF Page Numbers</a> to add consistent page numbering",
                  "Use <a href=\"/tools/compress-pdf\">Compress PDF</a> to meet the university's file size requirements",
                  "Use <a href=\"/tools/protect-pdf\">Protect PDF</a> to password-protect your thesis before sharing with advisors",
                ],
              },
              {
                title: "Filling Out Scholarship Applications",
                steps: [
                  "Download the scholarship application PDF form",
                  "Use <a href=\"/tools/fill-pdf-form\">Fill PDF Form</a> to type directly into form fields",
                  "Use <a href=\"/tools/compress-image\">Compress Image</a> to reduce your photo to the required size (usually under 100 KB)",
                  "Use <a href=\"/tools/sign-pdf\">Sign PDF</a> to add your digital signature",
                  "Use <a href=\"/tools/compress-pdf\">Compress PDF</a> to ensure the final file is under the portal's size limit",
                ],
              },
            ].map((workflow) => (
              <div key={workflow.title} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>{workflow.title}</h3>
                <ol className="space-y-2">
                  {workflow.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(79,142,247,0.12)", color: "var(--accent-blue)" }}>{i + 1}</span>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }} dangerouslySetInnerHTML={{ __html: step }} />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-12" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Students Ask</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Is this really free for university students?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Yes, completely free. No .edu email required, no verification, no limits. PDFBro is free for everyone — students, professionals, anyone.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Can I use this instead of buying Adobe Acrobat?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>For 90% of student needs (merge, compress, convert, sign, protect, annotate) — yes. PDFBro covers the most-used Acrobat features for free.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Does it work on my university laptop?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Yes. PDFBro works on Windows, Mac, Linux, and ChromeOS through any modern browser. No installation, no admin rights needed.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>What about privacy for my assignments?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Files process in your browser and never leave your device. Your intellectual property stays private — nothing is uploaded to servers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Ready to start? All tools are free.</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>No signup. No limits. No watermarks. Start processing files now.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/guides/pdf-tools-for-students" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              <BookOpen className="h-4 w-4" /> Student Guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tools" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Browse All Tools →
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
