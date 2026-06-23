import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Briefcase, Star } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Free PDF Tools for Job Seekers — Resumes, Cover Letters, Applications | PDFBro",
  description: "Free PDF tools for job seekers. Convert resume to PDF, merge cover letter with resume, compress for portals, sign offer letters, fill application forms. No signup.",
  keywords: ["pdf tools for job seekers", "convert resume to pdf free", "merge cover letter resume pdf", "compress resume for job portal", "sign job offer pdf free", "fill job application pdf free", "free resume pdf tools", "job application pdf tools"],
  alternates: { canonical: "https://pdfbro.tech/for/job-seekers" },
  openGraph: {
    title: "Free PDF Tools for Job Seekers — Resumes, Cover Letters, Applications | PDFBro",
    description: "Free PDF tools for job seekers. Convert, merge, compress, sign, and fill job application documents. No signup, no limits.",
    url: "https://pdfbro.tech/for/job-seekers",
    type: "website",
  },
} as Metadata;

const JOBSEEKERS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pdfbro.tech/for/job-seekers#webpage",
      url: "https://pdfbro.tech/for/job-seekers",
      name: "Free PDF Tools for Job Seekers — Resumes, Cover Letters, Applications | PDFBro",
      description: "Free PDF tools for job seekers. Convert resume to PDF, merge cover letter with resume, compress for portals, sign offer letters, fill application forms.",
      inLanguage: "en-US",
      datePublished: "2025-06-01",
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      about: { "@id": "https://pdfbro.tech/#organization" },
      audience: { "@type": "Audience", audienceType: "Job Seekers" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "For Job Seekers", item: "https://pdfbro.tech/for/job-seekers" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I convert my Word resume to PDF without losing formatting?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's Word to PDF tool at pdfbro.tech/tools/word-to-pdf. Upload your .docx resume and download it as a perfectly formatted PDF. Fonts, spacing, bullet points, and layout are preserved exactly. PDF is the standard format employers and ATS systems expect — never submit a .docx unless specifically requested." } },
        { "@type": "Question", name: "How do I combine my cover letter and resume into one PDF?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's Merge PDF tool at pdfbro.tech/tools/merge-pdf. Upload your cover letter PDF and resume PDF, arrange the cover letter first, and merge into a single file. Many job portals only accept one file upload — this ensures the recruiter sees your cover letter before your resume." } },
        { "@type": "Question", name: "Why does my resume PDF exceed the job portal file size limit?", acceptedAnswer: { "@type": "Answer", text: "Many job portals (Workday, Taleo, Greenhouse) limit resume uploads to 2–5 MB. A PDF with a headshot, heavy formatting, or embedded fonts can easily exceed this. Use PDFBro's Compress PDF tool to reduce file size while maintaining professional quality — no visible loss, just smaller file size." } },
        { "@type": "Question", name: "Can I create a free passport photo for job applications?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's Passport Photo tool at pdfbro.tech/tools/passport-photo creates professional headshots sized for job applications. Many countries require a photo with job applications. Remove the background, resize to passport dimensions, and download — all free, no signup." } },
      ],
    },
  ],
};

const WORKFLOWS = [
  { title: "Word Resume to Professional PDF", desc: "Convert your .docx or .doc resume to a polished PDF. Preserves fonts, formatting, and layout exactly. PDF is the ATS-compatible standard that every employer expects. Never submit a Word doc — always send a PDF.", tool: "word-to-pdf", toolName: "Word to PDF" },
  { title: "Merge Cover Letter + Resume", desc: "Combine your cover letter and resume into a single PDF file. Many job portals only accept one upload — put your best foot forward with the cover letter first, resume second. Arrange pages in any order before merging.", tool: "merge-pdf", toolName: "Merge PDF" },
  { title: "Compress Resume for Job Portals", desc: "Portals like Workday, Greenhouse, and Lever cap uploads at 2–5 MB. If your polished resume PDF with headshot exceeds the limit, compress it without visible quality loss. Pass the auto-filter and keep your formatting pristine.", tool: "compress-pdf", toolName: "Compress PDF" },
  { title: "Sign Your Offer Letter", desc: "Got the offer? Add your electronic signature to the offer letter, employment contract, or NDA directly in your browser. No printing, no scanning, no app needed. Legally valid e-signature embedded in the PDF.", tool: "sign-pdf", toolName: "Sign PDF" },
  { title: "Fill Online Application Forms", desc: "Typing into PDF job application forms directly in your browser. No more printing, handwriting, and scanning. Complete employment applications, background check forms, and direct deposit authorizations digitally.", tool: "fill-pdf-form", toolName: "Fill PDF Form" },
  { title: "Create Passport-Size Photo", desc: "Create professional passport and visa photos for job applications that require a photo. Free headshot cropping with official sizes for every country. White or light background, correct dimensions, instant download.", tool: "passport-photo", toolName: "Passport Photo" },
  { title: "Remove Headshot Background", desc: "Replace the background of your headshot with solid white, blue, or custom color. Essential for LinkedIn profile photos, corporate directories, and job applications requiring a professional-looking portrait with a clean background.", tool: "remove-bg", toolName: "Remove Background" },
  { title: "QR Portfolio & LinkedIn Link", desc: "Generate a QR code linking to your LinkedIn profile, online portfolio, or personal website. Print it on your resume or business card — recruiters scan and instantly see your full professional profile. Stand out at career fairs.", tool: "qr-code-generator", toolName: "QR Code Generator" },
];

export default function ForJobSeekersPage() {
  return (
    <>
      <Script id="jsonld-for-job-seekers" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JOBSEEKERS_JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />

      {/* Hero */}
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/for/business" className="hover:underline">For Business</Link> / <span>For Job Seekers</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Briefcase className="h-8 w-8" style={{ color: "var(--accent-violet)" }} />
            <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Free PDF Tools for Job Seekers
            </h1>
          </div>
          <p className="text-base max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
            Job hunting is hard enough — your tools shouldn&apos;t get in the way. Convert your resume to PDF, merge it with your cover letter, compress for those annoying portal size limits, sign your offer letter, and fill application forms. All free, no signup, no limits. Focus on landing the job; let PDFBro handle the documents.
          </p>
          <p className="text-sm max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
            The #1 reason job applications get auto-rejected? Wrong file format or file too large. PDFBro ensures every document you submit is exactly what the ATS and recruiter expect — perfectly formatted PDF, optimized size, professional presentation.
          </p>
          <div className="rounded-2xl p-4 flex items-start gap-3 max-w-lg mb-6" style={{ backgroundColor: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}>
            <Star className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "#8b5cf6" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Pro tip:</strong> Recruiters spend an average of <strong style={{ color: "var(--text-primary)" }}>6–7 seconds</strong> scanning a resume. A properly formatted, compressed PDF loads instantly in their ATS and renders perfectly on any device — giving you an edge before they even read a word.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["No signup required", "ATS-friendly output", "No watermarks", "No daily limits", "All tools free"].map((badge) => (
              <span key={badge} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(139,92,246,0.12)", color: "var(--accent-violet)", border: "1px solid rgba(139,92,246,0.25)" }}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>8 Essential Tools for Your Job Search</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>From application to acceptance — every PDF task in your job search, covered for free.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {WORKFLOWS.map((w) => (
              <Link key={w.tool} href={`/tools/${w.tool}`}
                className="group rounded-2xl p-5 flex items-start gap-4 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{w.title}</p>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{w.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-violet)" }}>Use {w.toolName} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why PDFBro for Job Seekers */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Why PDFBro for Your Job Search</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "💼", title: "Look Professional from Application #1", desc: "Employers judge your professionalism from the moment they open your file. A perfectly formatted PDF with proper naming (FirstName_LastName_Resume.pdf) signals attention to detail. PDFBro ensures your documents look flawless on every device and ATS." },
              { icon: "📏", title: "Meet Every Portal's Rules", desc: "Every job portal has different file size limits: LinkedIn (5 MB), Workday (2 MB), Greenhouse (5 MB), iCIMS (3 MB). PDFBro's Compress tool reduces your file to exactly the right size without visible quality loss, so the ATS doesn't auto-reject your application." },
              { icon: "⚡", title: "Apply Faster, Apply to More Jobs", desc: "Stop wrestling with PDF converters that watermark your resume. Stop emailing yourself files between devices. PDFBro works instantly in your browser — convert, merge, compress, and submit in under 60 seconds. Apply to 3x more jobs in the same time." },
              { icon: "🔒", title: "Your Personal Info Stays Private", desc: "Your resume contains your phone number, email, address, and work history. PDFBro processes files in your browser — your personal data never uploads to a server. No risk of your resume being scraped, sold, or added to a recruitment database without consent." },
              { icon: "💰", title: "Free — Because Your Budget Is Tight", desc: "Between interview clothes, transportation, and maybe career coaching, job searching costs money. PDFBro is completely free — no trial, no credit card, no 'premium' upsell. Save the $15/month you'd spend on Adobe Acrobat for something that actually helps you get the job." },
              { icon: "🌍", title: "Ready for International Applications", desc: "Applying abroad? PDFBro includes country-specific passport photo sizes for 25+ countries, OCR for scanned documents, and translation-ready PDF tools. Everything you need to apply internationally in one free platform." },
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

      {/* Job Seeker Workflows */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Your Application Workflow from Start to Offer</h2>
          <div className="space-y-4">
            {[
              {
                title: "Step 1: Prepare Your Resume & Cover Letter",
                desc: "Write your resume in Google Docs or Microsoft Word. Convert to PDF with Word to PDF — preserves formatting exactly. Write your cover letter and convert it to PDF too. Merge both into one file with your cover letter on top using Merge PDF. Compress the final file under 2 MB with Compress PDF. Name it FirstName_LastName_Application.pdf.",
                tools: ["word-to-pdf", "merge-pdf", "compress-pdf"],
              },
              {
                title: "Step 2: Apply with a Professional Edge",
                desc: "For applications requiring a photo, use Passport Photo to create a professional headshot with a clean white background. Generate a QR code linking to your LinkedIn profile or portfolio with QR Code Generator — add it to your resume header. Use Remove Background to clean up your headshot for LinkedIn and professional profiles.",
                tools: ["passport-photo", "qr-code-generator", "remove-bg"],
              },
              {
                title: "Step 3: Fill Forms & Get Hired",
                desc: "Complete employment application PDFs with Fill PDF Form — type directly into fields, no printing or scanning. When the offer arrives, sign it electronically with Sign PDF. Convert any additional documents (transcripts, certifications) to PDF with Word to PDF. Merge all onboarding documents into one file for your records.",
                tools: ["fill-pdf-form", "sign-pdf", "merge-pdf"],
              },
            ].map((wf) => (
              <div key={wf.title} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{wf.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{wf.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {wf.tools.map((slug) => (
                    <Link key={slug} href={`/tools/${slug}`} className="rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105"
                      style={{ backgroundColor: "var(--bg-secondary)", color: "var(--accent-violet)", border: "1px solid var(--border-subtle)" }}>
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
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Job Seekers Ask</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Should I submit my resume as PDF or Word?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Always PDF unless the job posting specifically requests Word. PDF preserves your formatting exactly across all devices and operating systems. A Word document can shift fonts, break layouts, and look unprofessional on a recruiter&apos;s screen. PDF is also the preferred format for most ATS systems. Convert your .docx with PDFBro&apos;s Word to PDF tool for free.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>How do I prevent my resume from being rejected by ATS?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Three steps: (1) Use a simple, single-column layout — complex tables and graphics confuse ATS parsers. (2) Convert to PDF with PDFBro — it preserves text as selectable/copyable (not flattened as an image), which ATS can read. (3) Compress under the portal&apos;s size limit — oversized files trigger auto-rejection before the ATS even scans the content. Avoid PDFs created by scanning or image-based converters.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Is it safe to use a free online tool for my resume?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>With PDFBro, yes — because your resume never leaves your device. PDFBro processes files locally in your browser. Your personal information (phone, email, address, work history) is never uploaded to a server, stored, or analyzed. This is fundamentally different from cloud-based PDF tools that require you to upload your resume to their servers for processing.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Can I merge my resume with a portfolio or work samples?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Yes. Use Merge PDF to combine your resume, cover letter, portfolio samples, certifications, and reference letters into one comprehensive application PDF. Arrange pages in the ideal order: cover letter, resume, portfolio highlights, certifications. Keep the total file under the portal&apos;s size limit by compressing the merged file with Compress PDF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Ready to land that job? Your documents are.</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>All tools free. No signup. No limits. Start applying.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/tools/word-to-pdf" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-violet), var(--accent-blue))" }}>
              Convert Resume to PDF <ArrowRight className="h-4 w-4" />
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
