import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, GraduationCap, BookOpen } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Free PDF Tools for Teachers — Worksheets, Lesson Plans, Grading | PDFBro",
  description: "Free PDF tools for teachers and educators. Merge worksheets, compress lesson materials, create QR codes for classrooms, edit PDFs, grade digitally. No signup, no limits.",
  keywords: ["pdf tools for teachers", "teacher pdf tools free", "merge worksheets pdf", "compress pdf for classroom", "qr code for classroom free", "edit pdf for teachers free", "annotate student work pdf", "free pdf tools for educators"],
  alternates: { canonical: "https://pdfbro.tech/for/teachers" },
  openGraph: {
    title: "Free PDF Tools for Teachers — Worksheets, Lesson Plans, Grading | PDFBro",
    description: "Free PDF tools for teachers and educators. Merge, compress, annotate, sign, and create classroom resources. No signup, no limits, no cost.",
    url: "https://pdfbro.tech/for/teachers",
    type: "website",
  },
} as Metadata;

const TEACHERS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pdfbro.tech/for/teachers#webpage",
      url: "https://pdfbro.tech/for/teachers",
      name: "Free PDF Tools for Teachers — Worksheets, Lesson Plans, Grading | PDFBro",
      description: "Free PDF tools for teachers and educators. Merge worksheets, compress lesson materials, create QR codes for classrooms, edit PDFs, grade digitally.",
      inLanguage: "en-US",
      datePublished: "2025-06-01",
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      about: { "@id": "https://pdfbro.tech/#organization" },
      audience: { "@type": "Audience", audienceType: "Teachers and Educators" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "For Teachers", item: "https://pdfbro.tech/for/teachers" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Are PDFBro tools really free for teachers?", acceptedAnswer: { "@type": "Answer", text: "Yes. All PDFBro tools are 100% free for teachers with no usage limits, no signup required, and no watermarks. Unlike other PDF services that limit free users to 1–2 tasks per day, PDFBro has zero restrictions. Teachers can process unlimited worksheets, lesson plans, and classroom materials at no cost." } },
        { "@type": "Question", name: "Can I merge multiple worksheets into one PDF for my students?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use PDFBro's Merge PDF tool at pdfbro.tech/tools/merge-pdf to combine multiple worksheets into a single PDF packet. Upload worksheets, answer sheets, and instructions, arrange them in order, and download the complete student packet. Perfect for distance learning packets and homework bundles." } },
        { "@type": "Question", name: "How do I create QR codes for classroom handouts?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's QR Code Generator at pdfbro.tech/tools/qr-code-generator to create QR codes linking to online resources, video lessons, Google Forms quizzes, or interactive activities. Generate a QR code, download it as an image, and place it on your worksheet or presentation slide. Free and unlimited." } },
        { "@type": "Question", name: "Can I compress large lesson plan PDFs for email or LMS?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use PDFBro's Compress PDF tool at pdfbro.tech/tools/compress-pdf to reduce large lesson materials. Many LMS platforms (Google Classroom, Canvas, Schoology) have file size limits. Compress your PDF to under 10 MB while maintaining readability — essential for resource-heavy lesson plans with images and diagrams." } },
      ],
    },
  ],
};

const WORKFLOWS = [
  { title: "Merge Worksheets into Packets", desc: "Combine multiple worksheets, answer sheets, and reference pages into a single PDF packet for distribution. Perfect for weekly homework bundles, distance learning materials, and substitute teacher plans.", tool: "merge-pdf", toolName: "Merge PDF" },
  { title: "Compress Lesson Plans", desc: "Lesson plans with embedded images, diagrams, and scanned materials can exceed 50 MB. Compress to under 10 MB for Google Classroom, Canvas, Schoology, or email distribution without losing readability.", tool: "compress-pdf", toolName: "Compress PDF" },
  { title: "QR Codes for Classroom Resources", desc: "Generate QR codes linking to YouTube lessons, Google Forms quizzes, interactive websites, Padlet boards, or shared drives. Print on worksheets, display on slides, or post on your classroom wall for instant student access.", tool: "qr-code-generator", toolName: "QR Code Generator" },
  { title: "Annotate & Grade Student Work", desc: "Open student-submitted PDFs and annotate directly — highlight strong passages, add margin feedback, circle errors, type comments. Faster and more legible than handwritten feedback. Works entirely in your browser.", tool: "edit-pdf", toolName: "Edit PDF" },
  { title: "Fill Permission Slip Forms", desc: "Type directly into PDF permission slips, field trip forms, and medical authorization documents. No printing, no handwriting, no scanning. Fill, save, email to parents — all digital, all free.", tool: "fill-pdf-form", toolName: "Fill PDF Form" },
  { title: "Sign Recommendation Letters", desc: "Add your electronic signature to student recommendation letters, college reference forms, and administrative documents. Professional, legible, and legally valid — without printing and scanning.", tool: "sign-pdf", toolName: "Sign PDF" },
  { title: "Split Textbook Chapters", desc: "Extract individual chapters from a large textbook PDF to share with students. Instead of sending a 500-page textbook, share only the relevant chapter for this week's reading assignment.", tool: "split-pdf", toolName: "Split PDF" },
  { title: "OCR Printed Materials", desc: "Scan old printed worksheets, textbook pages, or handouts and make them text-searchable and copyable with OCR. Turn physical classroom resources into digital, editable materials.", tool: "ocr-pdf", toolName: "OCR PDF" },
];

export default function ForTeachersPage() {
  return (
    <>
      <Script id="jsonld-for-teachers" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(TEACHERS_JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />

      {/* Hero */}
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/for/students" className="hover:underline">For Students</Link> / <span>For Teachers</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="h-8 w-8" style={{ color: "var(--accent-green)" }} />
            <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Free PDF Tools for Teachers &amp; Educators
            </h1>
          </div>
          <p className="text-base max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
            Teachers spend too much personal money on classroom resources. PDFBro is built so educators never pay for PDF tools. Merge worksheets, compress lesson plans, create QR codes, annotate student work, digitize printed materials — all free, no limits, no signup.
          </p>
          <p className="text-sm max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
            The average teacher spends $500–$750 of their own money on classroom supplies each year. PDFBro eliminates one more expense — PDF software — so that budget goes further for what really matters: your students.
          </p>
          <div className="rounded-2xl p-4 flex items-start gap-3 max-w-lg mb-6" style={{ backgroundColor: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <BookOpen className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "#10b981" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Built by former teachers:</strong> Every tool on PDFBro was designed with real classroom workflows in mind — from Monday morning worksheet prep to end-of-semester grade submissions. <strong style={{ color: "var(--accent-green)" }}>100% free, always.</strong>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["No signup required", "No daily limits", "No watermarks", "Works on school Chromebooks", "All tools free forever"].map((badge) => (
              <span key={badge} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>8 Teacher Workflows — All Free</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>From lesson planning to grading, everything a teacher needs for digital classroom management.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {WORKFLOWS.map((w) => (
              <Link key={w.tool} href={`/tools/${w.tool}`}
                className="group rounded-2xl p-5 flex items-start gap-4 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{w.title}</p>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{w.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-green)" }}>Use {w.toolName} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why PDFBro for Teachers */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Why PDFBro for Classroom Use</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "💰", title: "100% Free — Teacher Budget Stays Yours", desc: "Teachers spend an average of $500–$750 of their own money annually on classroom needs. PDFBro eliminates PDF software from that budget entirely. Every tool is free with no premium tier, no upsells, no credit card required." },
              { icon: "🏫", title: "Works on School-Issued Devices", desc: "PDFBro runs in any modern browser on Windows laptops, MacBooks, Chromebooks, and iPads. No installation, no admin permissions needed. If your school blocks certain sites, PDFBro typically works because it's categorized as an educational utility." },
              { icon: "🔒", title: "Student Data Privacy (FERPA-Aligned)", desc: "Files process in the browser and never leave the device. Student work, grades, and IEP documents stay private. No uploads means no FERPA compliance risk. More private than any cloud-based PDF tool your district might use." },
              { icon: "🌐", title: "Works with Any LMS", desc: "Google Classroom, Canvas, Schoology, Blackboard, Moodle, Seesaw — PDFBro outputs standard PDF files compatible with every learning management system. Upload compressed, merged, or converted files directly to any platform." },
              { icon: "📱", title: "Use on Classroom Projector or Tablet", desc: "Pull up PDFBro on your classroom computer during a lesson, generate a QR code on the fly, and students scan it instantly with their phones. No app download — just the browser they already have." },
              { icon: "♾️", title: "No Limits During Crunch Time", desc: "End of semester? Report card week? Parent-teacher conferences? Process 50 PDFs in one day with no throttling. Unlike tools that cap free users at 2 files per hour, PDFBro never limits an educator's workflow." },
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

      {/* Teacher Workflow Examples */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Everyday Classroom PDF Workflows</h2>
          <div className="space-y-4">
            {[
              {
                title: "Monday Morning: Prepare the Week's Worksheets",
                desc: "Throughout the week you've saved individual worksheets, reading passages, and activity pages. Monday morning, use Merge PDF to combine them into one weekly packet. Compress the packet for Google Classroom. Add a QR code on the cover page linking to the week's instructional video. Upload and assign in 5 minutes.",
                tools: ["merge-pdf", "compress-pdf", "qr-code-generator"],
              },
              {
                title: "Grading Day: Annotate & Return Student Essays",
                desc: "Students submit essays as PDFs. Open each one with Edit PDF. Highlight strong thesis statements, add margin comments on argument structure, circle grammar mistakes. Save the annotated PDF and return via your LMS. Faster than handwriting on printed copies, more detailed feedback, and students can actually read it.",
                tools: ["edit-pdf"],
              },
              {
                title: "Field Trip Prep: Permission Slips & Forms",
                desc: "Download the permission slip PDF from your school's portal. Use Fill PDF Form to type student names, dates, and trip details. Use Sign PDF to add your teacher signature. Attach a QR code with the trip information packet link. Email the completed form to parents — fully digital, no paper trail.",
                tools: ["fill-pdf-form", "sign-pdf", "qr-code-generator"],
              },
              {
                title: "Resource Sharing: Split & Share Textbook Chapters",
                desc: "Instead of sharing a 400-page textbook PDF that overwhelms students and violates copyright norms, use Split PDF to extract only the chapter assigned this week. Compress it for easy mobile viewing. OCR the chapter if it was scanned to make it searchable for students.",
                tools: ["split-pdf", "compress-pdf", "ocr-pdf"],
              },
            ].map((wf) => (
              <div key={wf.title} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{wf.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{wf.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {wf.tools.map((slug) => (
                    <Link key={slug} href={`/tools/${slug}`} className="rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105"
                      style={{ backgroundColor: "var(--bg-secondary)", color: "var(--accent-green)", border: "1px solid var(--border-subtle)" }}>
                      {slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Teachers Ask</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Can I use PDFBro on a school-issued Chromebook?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Yes. PDFBro works fully in the Chrome browser on Chromebooks. No Android or Linux app needed, no Play Store access required. All processing happens in the browser using standard web APIs. Works even on managed Chromebooks with restricted app installation policies.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Is student data safe on PDFBro?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Yes. Files process locally in your browser and never upload to a server (for most tools). Student work, grades, IEP documents, and personal information stay on your device. This aligns with FERPA requirements for student data privacy. No data collection, no storage, no sharing.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>How do I share PDFs with students who don't have internet at home?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Compress your PDF packets to the smallest possible size with PDFBro's Compress tool (use High compression). Compressed files download faster on slow connections and use less mobile data. For students with no internet, save files to a USB drive distributed with printed packets.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Can I use PDFBro instead of the district's paid PDF software?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>For daily classroom tasks (merge, compress, annotate, sign, OCR), PDFBro replaces 90% of what most teachers use Adobe Acrobat or Kami for. If your district has discontinued PDF software licensing or you want a backup, PDFBro covers classroom essentials at no cost to you or your school.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>All tools free. No limits. No catch.</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Start creating classroom resources now — no signup needed.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/tools/qr-code-generator" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-green), var(--accent-teal))" }}>
              Create QR Codes <ArrowRight className="h-4 w-4" />
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
