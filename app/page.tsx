import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Shield, Zap, Globe, CheckCircle2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { TOOLS, getToolsByCategory } from "@/lib/toolRegistry";
import { HeroSection, CTASection } from "./HomeAnimations";

export const metadata: Metadata = {
  title: "PDFBro — Free PDF Tools Online | Merge, Compress, Convert PDF No Signup",
  description:
    "PDFBro: 100+ free online PDF and image tools. Merge PDF, split PDF, compress PDF, convert PDF to Word, PDF to Excel, sign PDF, remove background, compress images, HEIC to JPG, QR code generator. No signup, no watermarks. 100% browser-based.",
  keywords: [
    "free PDF tools online",
    "merge PDF free",
    "compress PDF online",
    "PDF to Word converter free",
    "split PDF online free",
    "online PDF editor free",
    "PDF converter free no signup",
    "compress image online free",
    "image compressor no watermark",
    "remove background online free",
    "HEIC to JPG converter",
    "QR code generator free",
    "PDF to Excel free",
    "free online tools no signup no watermark",
    "ilovepdf alternative free",
    "smallpdf alternative",
    "free adobe acrobat alternative",
    "PDF tools browser based",
  ],
  alternates: { canonical: "https://pdfbro.tech" },
  openGraph: {
    title: "PDFBro — 100+ Free PDF & Image Tools | No Signup, No Watermarks",
    description: "Merge PDF, compress PDF, convert PDF to Word, Excel, PowerPoint. Compress images, HEIC to JPG, remove backgrounds. Free, no signup, browser-based.",
    url: "https://pdfbro.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFBro — 100+ Free PDF & Image Tools Online",
    description: "Merge, compress, convert PDFs and images. Free, no signup, no watermarks.",
  },
};

const HERO_TOOLS = TOOLS.slice(0, 8);

const FEATURES = [
  {
    icon: Shield,
    title: "100% Private — Files Never Uploaded",
    description: "Every tool processes files entirely in your browser. Nothing sent to servers. Your PDFs and images stay on your device.",
    color: "var(--accent-green)",
    bg: "rgba(52,211,153,0.1)",
  },
  {
    icon: Zap,
    title: "Instant Results — No Waiting",
    description: "No loading screens. No email required. Processing starts the moment you upload. Results download in seconds.",
    color: "var(--accent-blue)",
    bg: "rgba(79,142,247,0.1)",
  },
  {
    icon: Globe,
    title: "No Signup, No Watermarks, Ever",
    description: "All 100+ tools are free with zero registration required. We never add watermarks to your files.",
    color: "var(--accent-violet)",
    bg: "rgba(139,106,245,0.1)",
  },
];

const TOP_PDF_TOOLS = [
  { label: "Merge PDF", href: "/tools/merge-pdf", vol: "480K+/mo" },
  { label: "Compress PDF", href: "/tools/compress-pdf", vol: "420K+/mo" },
  { label: "PDF to Word", href: "/tools/pdf-to-word", vol: "450K+/mo" },
  { label: "Word to PDF", href: "/tools/word-to-pdf", vol: "600K+/mo" },
  { label: "Split PDF", href: "/tools/split-pdf", vol: "195K+/mo" },
  { label: "Sign PDF Online", href: "/tools/sign-pdf", vol: "48K+/mo" },
  { label: "PDF to Excel", href: "/tools/pdf-to-excel", vol: "280K+/mo" },
  { label: "Edit PDF Free", href: "/tools/edit-pdf", vol: "165K+/mo" },
  { label: "PDF to PowerPoint", href: "/tools/pdf-to-powerpoint", vol: "240K+/mo" },
  { label: "Protect PDF", href: "/tools/protect-pdf", vol: "36K+/mo" },
  { label: "Unlock PDF", href: "/tools/unlock-pdf", vol: "65K+/mo" },
  { label: "OCR PDF", href: "/tools/ocr-pdf", vol: "200K+/mo" },
];

const TOP_IMAGE_TOOLS = [
  { label: "Compress Image Online", href: "/tools/compress-image", vol: "145K+/mo" },
  { label: "Remove Background", href: "/tools/remove-bg", vol: "800K+/mo" },
  { label: "HEIC to JPG", href: "/tools/heic-to-jpg", vol: "500K+/mo" },
  { label: "Resize Image", href: "/tools/resize-image", vol: "130K+/mo" },
  { label: "Crop Image Online", href: "/tools/crop-image", vol: "68K+/mo" },
  { label: "Passport Photo Free", href: "/tools/passport-photo", vol: "400K+/mo" },
  { label: "QR Code Generator", href: "/tools/qr-code-generator", vol: "1M+/mo" },
  { label: "Image to WebP", href: "/tools/image-to-webp", vol: "35K+/mo" },
  { label: "PNG to JPG", href: "/tools/png-to-jpeg", vol: "62K+/mo" },
  { label: "WebP to JPG", href: "/tools/webp-to-jpg", vol: "35K+/mo" },
  { label: "Add Text to Image", href: "/tools/add-text-to-image", vol: "78K+/mo" },
  { label: "Flip Image Online", href: "/tools/flip-image", vol: "35K+/mo" },
];

const HOME_FAQ = [
  {
    q: "Are PDFBro tools really free with no hidden limits?",
    a: "Yes. All 100+ tools on PDFBro are completely free with no daily limits, no file quotas, and no hidden fees. Unlike iLovePDF (2 tasks/hour limit on free tier) or Smallpdf (daily limit), PDFBro has no usage caps.",
  },
  {
    q: "Do I need to create an account or sign up?",
    a: "Never. No email, no account, no credit card required for any tool. Just upload your file and get your result — that's it.",
  },
  {
    q: "Are my files safe and private?",
    a: "Yes. Almost all PDF and image tools on PDFBro process files entirely within your web browser using JavaScript. Your files never leave your device. A small number of advanced conversions (PDF to Word, PDF to Excel, Word to PDF) use secure server processing — those files are deleted within 1 hour.",
  },
  {
    q: "Will PDFBro add watermarks to my files?",
    a: "Never. PDFBro does not add any watermarks, logos, or branding to your output files. What you download is exactly what you processed.",
  },
  {
    q: "What's the best free alternative to iLovePDF?",
    a: "PDFBro is a leading iLovePDF alternative — it offers the same core tools (merge PDF, split PDF, compress PDF, convert PDF) plus 100+ additional tools, with no daily limits, no watermarks, and browser-based processing for stronger privacy.",
  },
  {
    q: "What's the best free alternative to Adobe Acrobat?",
    a: "PDFBro covers 90%+ of typical Acrobat use cases for free: editing, annotating, signing, protecting, merging, splitting, compressing, and converting PDFs — all without a $20/month subscription.",
  },
];

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pdfbro.tech/#organization",
      name: "PDFBro",
      alternateName: ["PDF Bro", "pdfbro.tech"],
      url: "https://pdfbro.tech",
      logo: {
        "@type": "ImageObject",
        "@id": "https://pdfbro.tech/#logo",
        url: "https://pdfbro.tech/favicon/web-app-manifest-512x512.png",
        contentUrl: "https://pdfbro.tech/favicon/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        caption: "PDFBro",
      },
      image: { "@id": "https://pdfbro.tech/#logo" },
      description: "PDFBro offers 100+ free online PDF and image processing tools. No signup required. Browser-based and completely free.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://pdfbro.tech/#website",
      url: "https://pdfbro.tech",
      name: "PDFBro",
      alternateName: "PDF Bro",
      description: "100+ free online PDF and image tools. Merge PDF, compress PDF, convert PDF, image compressor, and more.",
      publisher: { "@id": "https://pdfbro.tech/#organization" },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://pdfbro.tech/tools?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://pdfbro.tech/#faq",
      mainEntity: HOME_FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

function ToolsGridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl h-40 shimmer" style={{ border: "1px solid var(--border-subtle)" }} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const pdfTools = getToolsByCategory("pdf").slice(0, 4);
  const imageTools = getToolsByCategory("image").slice(0, 4);
  const convertTools = getToolsByCategory("convert").slice(0, 4);

  return (
    <>
      <Script id="jsonld-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />

      <div style={{ backgroundColor: "var(--bg-primary)" }}>

        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Popular Tools ── */}
        <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-blue)" }}>Most Used</p>
                <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                  Popular Free PDF &amp; Image Tools
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  The most-used tools — all free, no signup, no watermarks
                </p>
              </div>
              <Link href="/tools" className="flex items-center gap-1.5 text-sm font-semibold shrink-0" style={{ color: "var(--accent-blue)" }}>
                View all 100+ <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <Suspense fallback={<ToolsGridSkeleton count={8} />}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {HERO_TOOLS.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
              </div>
            </Suspense>
          </div>
        </section>

        {/* ── Top PDF Tools Quick Links ── */}
        <section className="py-16" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Free PDF Tools — Merge, Compress, Convert &amp; More
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {TOP_PDF_TOOLS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent-blue)" }} />
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/pdf-tools" className="text-sm font-semibold" style={{ color: "var(--accent-blue)" }}>
                Browse all free PDF tools →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why PDFBro ── */}
        <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent-violet)" }}>
                Why PDFBro
              </p>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                The Best Free PDF Tool Online — No Limits, No Signup
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-sm" style={{ color: "var(--text-secondary)" }}>
                Unlike iLovePDF&apos;s 2 tasks/hour free limit or Smallpdf&apos;s daily cap, PDFBro is genuinely unlimited and free.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl p-7 relative overflow-hidden"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${f.color}70, ${f.color}20, transparent)` }} />
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: f.bg, border: `1px solid ${f.color}25` }}>
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="mb-2.5 text-base font-semibold" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.description}</p>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div className="mt-10 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--bg-primary)" }}>
                      <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Feature</th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: "var(--text-muted)" }}>iLovePDF</th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: "var(--text-muted)" }}>Smallpdf</th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: "var(--text-muted)" }}>Acrobat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Free forever", "✓", "Limited", "2/hour", "$20/mo"],
                      ["No signup needed", "✓", "✓", "✓ (limited)", "✗"],
                      ["No watermarks", "✓", "✓", "Sometimes", "✓"],
                      ["Browser-based (private)", "✓", "✗", "✗", "✗"],
                      ["Number of tools", "100+", "25+", "20+", "30+"],
                      ["PDF + Image tools", "✓", "PDF only", "PDF only", "PDF only"],
                    ].map(([feature, ...vals]) => (
                      <tr key={String(feature)} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                        <td className="px-5 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{feature}</td>
                        {vals.map((v, i) => (
                          <td key={i} className="px-5 py-3 text-sm text-center" style={{ color: i === 0 ? "var(--accent-green)" : "var(--text-secondary)" }}>
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Free PDF Tools Section ── */}
        <section className="py-20" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-red)" }}>PDF</p>
                <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                  Free PDF Tools — Merge, Split, Compress &amp; Convert
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  Every PDF operation you need — free, browser-based, no signup
                </p>
              </div>
              <Link href="/pdf-tools" className="flex items-center gap-1.5 text-sm font-semibold shrink-0" style={{ color: "var(--accent-blue)" }}>
                All PDF tools <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {pdfTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Image Tools Section ── */}
        <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-cyan)" }}>Images</p>
                <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                  Free Image Tools — Compress, Convert &amp; Edit Images
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  Compress images, remove backgrounds, convert HEIC to JPG, resize — all free
                </p>
              </div>
              <Link href="/image-tools" className="flex items-center gap-1.5 text-sm font-semibold shrink-0" style={{ color: "var(--accent-blue)" }}>
                All image tools <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {imageTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Top Image Tools Quick Links ── */}
        <section className="py-16" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Free Image Tools — Compress, Convert &amp; Remove Backgrounds
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {TOP_IMAGE_TOOLS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent-violet)" }} />
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/image-tools" className="text-sm font-semibold" style={{ color: "var(--accent-blue)" }}>
                Browse all free image tools →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Convert Tools ── */}
        <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-orange)" }}>Convert</p>
                <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                  Free File Conversion Tools — PDF, Word, Excel, Images
                </h2>
                <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  PDF to Word, Word to PDF, HEIC to JPG, Image to WebP and 30+ converters
                </p>
              </div>
              <Link href="/convert-tools" className="flex items-center gap-1.5 text-sm font-semibold shrink-0" style={{ color: "var(--accent-blue)" }}>
                All converters <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {convertTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── iLovePDF / Smallpdf Alternative Section ── */}
        <section className="py-16" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-xl font-bold sm:text-2xl mb-3" style={{ color: "var(--text-primary)" }}>
                The Best Free iLovePDF Alternative &amp; Smallpdf Alternative
              </h2>
              <p className="max-w-2xl mx-auto text-sm" style={{ color: "var(--text-secondary)" }}>
                Looking for iLovePDF without limits? Or a Smallpdf alternative with no daily cap? PDFBro is 100% free, has no task limits, and processes files in your browser for maximum privacy.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "No Daily Limits", body: "Process unlimited files every day. No 2/hour cap like iLovePDF free tier.", icon: "∞" },
                { title: "No File Uploads", body: "Files processed in browser — never sent to servers. More private than iLovePDF or Smallpdf.", icon: "🔒" },
                { title: "No Watermarks", body: "Your output files are clean. No PDFBro branding added to your documents.", icon: "✓" },
                { title: "100+ Tools Free", body: "PDF tools + image tools. More than iLovePDF (25+ tools) or Smallpdf (20+ tools).", icon: "🛠" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link href="/guides/ilovepdf-alternative" className="rounded-xl px-4 py-2 text-sm font-medium hover:underline underline-offset-2" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                iLovePDF Alternative →
              </Link>
              <Link href="/guides/smallpdf-alternative" className="rounded-xl px-4 py-2 text-sm font-medium hover:underline underline-offset-2" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                Smallpdf Alternative →
              </Link>
              <Link href="/guides/adobe-acrobat-alternative-free" className="rounded-xl px-4 py-2 text-sm font-medium hover:underline underline-offset-2" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                Free Acrobat Alternative →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Guides Section ── */}
        <section className="py-16" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-green)" }}>Guides</p>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Free PDF &amp; Image Tutorials
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                  Step-by-step guides for every PDF and image task
                </p>
              </div>
              <Link href="/guides" className="flex items-center gap-1.5 text-sm font-semibold shrink-0" style={{ color: "var(--accent-blue)" }}>
                All 50 guides <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "How to Merge PDF Files Free", href: "/guides/how-to-merge-pdf" },
                { title: "How to Compress PDF Without Losing Quality", href: "/guides/how-to-compress-pdf" },
                { title: "How to Convert HEIC to JPG", href: "/guides/how-to-convert-heic-to-jpg" },
                { title: "How to Remove Background from Image Free", href: "/guides/how-to-remove-image-background" },
                { title: "Best iLovePDF Alternative Free", href: "/guides/ilovepdf-alternative" },
                { title: "How to Compress Images for Websites", href: "/guides/compress-image-for-web" },
              ].map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:scale-[1.01]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <span className="text-xs font-medium flex-shrink-0" style={{ color: "var(--accent-green)" }}>Guide</span>
                  <span className="text-sm font-medium group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{guide.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-muted)" }} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features checklist ── */}
        <section className="py-16" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-8 text-center" style={{ color: "var(--text-primary)" }}>
              Everything Included — 100% Free, Always
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Merge PDF files online free",
                "Compress PDF without quality loss",
                "PDF to Word converter free",
                "Word to PDF converter free",
                "PDF to Excel free",
                "PDF to PowerPoint free",
                "Sign PDF online free",
                "Password protect PDF free",
                "Unlock PDF online free",
                "OCR — extract text from scanned PDFs",
                "Edit PDF online free no Acrobat",
                "Fill PDF forms online free",
                "Compress images online free",
                "Remove background from image free",
                "HEIC to JPG converter free",
                "QR code generator free",
                "Image to WebP converter",
                "Resize image online free",
                "Crop image online free",
                "Passport photo maker free",
                "Add text to image free",
                "GIF to MP4 converter free",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent-green)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent-blue)" }}>FAQ</p>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {HOME_FAQ.map((item) => (
                <div key={item.q} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <CTASection />
      </div>
    </>
  );
}
