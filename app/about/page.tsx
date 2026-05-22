import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Shield, Zap, Globe, Code2, Heart, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "About PDFBro — Free PDF & Image Tools Built for Everyone",
  description:
    "PDFBro is a free, browser-based PDF and image tool platform built for privacy and simplicity. No signup, no watermarks, 100+ tools. Learn about our mission and technology.",
  alternates: { canonical: "https://pdfbro.tech/about" },
  openGraph: {
    title: "About PDFBro — Free PDF & Image Tools Built for Everyone",
    description: "PDFBro is a free browser-based tool platform. No signup, no watermarks, 100% private. Learn our story.",
    url: "https://pdfbro.tech/about",
  },
};

const STATS = [
  { value: "100+", label: "Free Tools", desc: "PDF, image, and conversion tools" },
  { value: "0", label: "Signup Required", desc: "Use every tool without an account" },
  { value: "100%", label: "Browser-Based", desc: "Files never leave your device" },
  { value: "0₹/$", label: "Cost Forever", desc: "No plans, no paywalls" },
];

const PRINCIPLES = [
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Your files are your business. Nearly every PDFBro tool processes files entirely in your browser using JavaScript — nothing is sent to our servers. For the handful of tools that require server processing (PDF to Word, PDF to Excel, etc.), files are deleted within 1 hour.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
  },
  {
    icon: Globe,
    title: "Truly Free — No Tricks",
    desc: "PDFBro is free. Not 'free with 2 tasks per day', not 'free with watermarks', not 'free if you sign up'. There are no hidden limits for standard use. We don't believe in bait-and-switch pricing.",
    color: "#4f8ef7",
    bg: "rgba(79,142,247,0.1)",
  },
  {
    icon: Zap,
    title: "Speed Over Features",
    desc: "Every tool should do one thing extremely well and do it instantly. No loading screens, no processing queues, no 'please wait while we email you your file'. Upload → Process → Download, done.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
  },
  {
    icon: Code2,
    title: "Open Technology",
    desc: "PDFBro uses open-source libraries: pdf-lib for PDF manipulation, pdfjs for rendering, browser-image-compression for images. We build on the work of the open-source community and aim to give back.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
  },
];

const TECH_STACK = [
  { name: "Next.js 16", role: "Framework", url: "https://nextjs.org" },
  { name: "React 19", role: "UI Library", url: "https://react.dev" },
  { name: "TypeScript", role: "Language", url: "https://typescriptlang.org" },
  { name: "pdf-lib", role: "PDF Manipulation", url: "https://pdf-lib.js.org" },
  { name: "PDF.js", role: "PDF Rendering", url: "https://mozilla.github.io/pdf.js/" },
  { name: "Tailwind CSS", role: "Styling", url: "https://tailwindcss.com" },
  { name: "Framer Motion", role: "Animations", url: "https://framer.com/motion" },
  { name: "Vercel", role: "Hosting", url: "https://vercel.com" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About PDFBro",
  description: "PDFBro is a free, browser-based PDF and image tools platform. No signup required.",
  url: "https://pdfbro.tech/about",
  mainEntity: {
    "@type": "Organization",
    name: "PDFBro",
    url: "https://pdfbro.tech",
    description: "Free online PDF and image processing tools. Browser-based, no signup, no watermarks.",
    foundingDate: "2025",
    knowsAbout: ["PDF processing", "image compression", "file conversion", "web tools"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Script id="jsonld-about" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />

      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />

        {/* Hero */}
        <section className="relative py-20" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-3">
              <Link href="/" className="text-xs" style={{ color: "var(--text-muted)" }}>Home</Link>
              <span className="mx-2 text-xs" style={{ color: "var(--border)" }}>/</span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>About</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
              Free PDF &amp; Image Tools —{" "}
              <span className="gradient-text">Built for Everyone</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              PDFBro is a free, browser-based tool platform that lets anyone merge, compress, convert, and edit PDFs and images — without signing up, installing software, or paying a cent.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-14" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl p-6 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <p className="text-3xl font-extrabold gradient-text">{stat.value}</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: "var(--text-primary)" }}>{stat.label}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Our Mission</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              Most people need to merge a PDF once a month, compress an image occasionally, or convert a document file now and then. They shouldn&apos;t need a $20/month subscription for that. Adobe Acrobat costs $240/year. iLovePDF limits free users to 2 tasks per hour. Smallpdf shows watermarks on free output.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              PDFBro was built to fix this. Every tool is completely free, unlimited, and requires no account. We believe file processing tools should be accessible to students in developing countries just as much as to enterprise employees with software budgets.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Privacy matters too. We built PDFBro so that your sensitive documents — contracts, tax returns, medical records — never have to leave your device. The browser is powerful enough to process most PDF and image operations locally. We use that capability by default.
            </p>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text-primary)" }}>Our Principles</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="rounded-2xl p-7 relative overflow-hidden" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${p.color}60, transparent)` }} />
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ backgroundColor: p.bg }}>
                    <p.icon className="h-5 w-5" style={{ color: p.color }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Built With Open Technology</h2>
            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              PDFBro is built entirely on open-source libraries and modern web standards.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {TECH_STACK.map((tech) => (
                <a key={tech.name} href={tech.url} target="_blank" rel="noopener noreferrer"
                  className="group rounded-xl p-4 transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <p className="text-sm font-semibold group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{tech.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{tech.role}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Developer credit */}
        <section className="py-16" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="h-8 w-8 mx-auto mb-4" style={{ color: "#ef4444" }} />
            <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Made with care</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              PDFBro was designed and developed by{" "}
              <a href="https://smitpanchal.in" target="_blank" rel="noopener noreferrer"
                className="font-semibold hover:underline underline-offset-2" style={{ color: "var(--accent-blue)" }}>
                Smit Panchal
              </a>
              {" "}— a developer who got tired of paying for tools that should be free.
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Have feedback, a bug report, or a tool request?{" "}
              <Link href="/contact" className="hover:underline underline-offset-2" style={{ color: "var(--accent-blue)" }}>
                Contact us
              </Link>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 justify-center">
            <Link href="/tools" className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Browse All 100+ Tools <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guides" className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Read Guides →
            </Link>
            <Link href="/contact" className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Contact →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
