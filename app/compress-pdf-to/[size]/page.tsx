import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2, PackageOpen } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

interface SizeConfig {
  slug: string;
  label: string;
  bytes: number;
  description: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faq: { q: string; a: string }[];
  keywords: string[];
  useCase: string;
}

const SIZES: SizeConfig[] = [
  {
    slug: "50kb",
    label: "50 KB",
    bytes: 50 * 1024,
    description: "Compress PDF to 50 KB for strict upload limits on government portals and visa applications.",
    metaTitle: "Compress PDF to 50KB Free Online — No Quality Loss | PDFBro",
    metaDescription: "Reduce PDF file size to under 50 KB online free. Perfect for government portals, visa applications, and strict upload limits. No signup, browser-based.",
    h1: "Compress PDF to 50KB — Free Online Tool",
    intro: "Need a PDF under 50KB for a government portal, visa application, or ID verification? PDFBro's compress PDF tool can reduce your file to 50 KB or less while keeping readable text. Many official portals reject PDFs larger than 50KB — compress yours instantly, no signup.",
    keywords: ["compress pdf to 50kb", "reduce pdf to 50 kb online", "compress pdf under 50kb", "pdf under 50kb free", "compress pdf 50kb online", "make pdf 50kb"],
    useCase: "Government ID portals, visa photo uploads, exam registration forms, online application systems with strict file limits.",
    faq: [
      { q: "Can I compress a PDF to exactly 50 KB?", a: "PDFBro can reduce most text-heavy PDFs to under 50 KB using aggressive compression. For image-heavy PDFs, you may need to reduce image resolution first. The tool automatically selects the best compression strategy." },
      { q: "What portals require PDFs under 50 KB?", a: "Indian government portals (passport, PAN card, Aadhaar), visa application sites, university exam registration forms, and many banking portals require PDFs between 10–50 KB for uploaded documents." },
      { q: "Will compressing to 50 KB make my PDF unreadable?", a: "Text remains sharp and readable because fonts are preserved. Images may appear slightly softer at extreme compression levels. The result is optimized for document verification, not photo-quality printing." },
      { q: "How fast can I compress a PDF to 50 KB?", a: "Compression happens entirely in your browser in under 10 seconds for most files. No uploading, no waiting for server processing." },
    ],
  },
  {
    slug: "100kb",
    label: "100 KB",
    bytes: 100 * 1024,
    description: "Compress PDF to 100 KB for job portals, application forms, and email attachments.",
    metaTitle: "Compress PDF to 100KB Free Online — Reduce File Size | PDFBro",
    metaDescription: "Compress PDF to under 100 KB online free. Perfect for job portals, online applications, and email attachments. No signup, no watermarks, browser-based.",
    h1: "Compress PDF to 100KB — Free Online Tool",
    intro: "Most job portals, university applications, and online forms require PDFs under 100 KB. PDFBro compresses your PDF to 100 KB or smaller in seconds — directly in your browser. No software, no signup, no watermarks on your output.",
    keywords: ["compress pdf to 100kb", "reduce pdf size to 100kb", "compress pdf under 100kb", "pdf 100kb compressor", "compress pdf to 100kb online free", "make pdf 100kb"],
    useCase: "Job application portals (Naukri, LinkedIn, Indeed), university admission forms, online exam registration, email attachments with size limits.",
    faq: [
      { q: "How do I compress a PDF to 100 KB?", a: "Upload your PDF to PDFBro's Compress PDF tool at pdfbro.tech/tools/compress-pdf, select 'High' compression level, and download. Most PDFs reduce to 100 KB or less in one pass." },
      { q: "What compression level should I use for 100 KB?", a: "Start with 'High' compression for the smallest file. If text becomes hard to read, switch to 'Medium' which balances file size and quality — most text PDFs reach 100 KB at Medium level." },
      { q: "Can I batch compress multiple PDFs to 100 KB?", a: "Compress each PDF individually with PDFBro's tool. For batch workflows, open the tool in multiple browser tabs — all processing is local and unlimited." },
      { q: "Will my document formatting be preserved?", a: "Yes. PDFBro preserves fonts, page dimensions, and text layout. Only image resolution is reduced to achieve the target file size." },
    ],
  },
  {
    slug: "200kb",
    label: "200 KB",
    bytes: 200 * 1024,
    description: "Compress PDF to 200 KB for online form submissions, scholarship applications, and document uploads.",
    metaTitle: "Compress PDF to 200KB Free Online — Reduce File Size | PDFBro",
    metaDescription: "Compress PDF to under 200 KB online free. Ideal for scholarship applications, online forms, and document portals. No signup, no watermarks.",
    h1: "Compress PDF to 200KB — Free Online Tool",
    intro: "Many scholarship applications, grant submissions, and online forms cap uploads at 200 KB. PDFBro reduces your PDF to 200 KB or smaller without requiring any software or signup. Process runs entirely in your browser.",
    keywords: ["compress pdf to 200kb", "reduce pdf to 200kb online", "compress pdf under 200kb", "pdf 200kb size", "compress pdf to 200kb free", "how to make pdf 200kb"],
    useCase: "Scholarship applications, grant proposals, online competition entries, document verification portals, small business form submissions.",
    faq: [
      { q: "How do I reduce a PDF to 200 KB?", a: "PDFBro's Compress PDF tool with 'Medium' compression typically reduces PDFs to 200 KB while maintaining good readability. Upload, select compression level, and download." },
      { q: "Is 200 KB good enough for document quality?", a: "At 200 KB, text-based PDFs retain excellent readability. Scanned documents remain legible. This is the sweet spot for most online form submissions — small enough to upload, clear enough to read." },
      { q: "Can I compress a scanned PDF to 200 KB?", a: "Yes. Scanned PDFs compress well to 200 KB. For best results, scan at 150–200 DPI grayscale before compressing — this dramatically reduces the original file size." },
      { q: "What if my PDF is still above 200 KB after compression?", a: "Try 'High' compression mode. If still above 200 KB, the file likely contains many high-resolution images — consider splitting it or converting images to a lower resolution first." },
    ],
  },
  {
    slug: "500kb",
    label: "500 KB",
    bytes: 500 * 1024,
    description: "Compress PDF to 500 KB for email attachments, messaging apps, and content management uploads.",
    metaTitle: "Compress PDF to 500KB Free Online — Optimized for Email | PDFBro",
    metaDescription: "Compress PDF to under 500 KB online free. Perfect for Gmail/Outlook attachments, WhatsApp sharing, and CMS uploads. No signup, browser-based.",
    h1: "Compress PDF to 500KB — Free Online Tool",
    intro: "Most email clients and messaging apps have attachment size limits around 25 MB, but smaller files send faster and download instantly. Compress your PDF to 500 KB for lightning-fast sharing via email, WhatsApp, Slack, or any content management system.",
    keywords: ["compress pdf to 500kb", "reduce pdf to 500kb online", "compress pdf under 500kb free", "pdf 500kb size", "compress pdf for gmail", "make pdf smaller 500kb"],
    useCase: "Gmail/Outlook attachments, WhatsApp/Telegram PDF sharing, WordPress/Shopify CMS uploads, Slack document sharing, quick client deliverables.",
    faq: [
      { q: "How do I make a PDF 500 KB for email?", a: "Use PDFBro's Compress PDF tool with 'Medium' compression. Most multi-page documents with images compress to 500 KB easily — perfect for email attachments under Gmail's 25 MB limit." },
      { q: "Will my PDF look professional at 500 KB?", a: "Yes. At 500 KB, most PDFs retain near-original quality in text and images. Only extremely high-resolution photos show slight quality reduction — acceptable for email and screen viewing." },
      { q: "Can I compress a PDF to exactly 500 KB?", a: "The exact output size depends on your original PDF content. PDFBro will get as close as possible. You can fine-tune by choosing Low/Medium/High compression levels." },
      { q: "Is there a daily limit on compressing PDFs?", a: "No. Unlike iLovePDF (2 tasks/hour limit) or Smallpdf (daily cap), PDFBro has zero limits. Compress as many PDFs as you need, any day." },
    ],
  },
  {
    slug: "1mb",
    label: "1 MB",
    bytes: 1024 * 1024,
    description: "Compress PDF to 1 MB for online submissions, client deliverables, and web uploads.",
    metaTitle: "Compress PDF to 1MB Free Online — Reduce to 1 MB | PDFBro",
    metaDescription: "Compress PDF to under 1 MB online free. Ideal for online submissions, client deliverables, and web uploads. Low compression preserves quality. No signup.",
    h1: "Compress PDF to 1MB — Free Online Tool",
    intro: "1 MB is the most common file size target for PDFs — small enough for any email or upload portal, large enough to preserve excellent quality. PDFBro compresses your PDF to 1 MB in seconds using browser-based processing.",
    keywords: ["compress pdf to 1mb", "reduce pdf to 1mb online", "compress pdf under 1mb free", "pdf 1mb compressor", "how to make pdf 1mb", "compress pdf to 1mb without losing quality"],
    useCase: "Client deliverables, design portfolio sharing, online marketplace uploads, freelance platform submissions, standard email attachments.",
    faq: [
      { q: "How do I compress a PDF to 1 MB?", a: "PDFBro's Compress PDF tool with 'Low' compression typically reduces PDFs to 1 MB while maintaining original quality. Upload your PDF, select compression level, and download." },
      { q: "Can I reduce a 10 MB PDF to 1 MB?", a: "Yes. With 'High' compression, PDFBro can reduce a 10 MB PDF to 1 MB. For image-heavy PDFs, expect a 60–90% reduction. Text-based PDFs compress even more dramatically." },
      { q: "What's the best compression for a 1 MB target?", a: "Start with 'Medium' compression. If the result is still above 1 MB, try 'High'. If quality suffers, 'Low' compression still reduces most PDFs significantly while keeping full visual fidelity." },
      { q: "Will 1 MB PDFs print well?", a: "PDFs compressed to 1 MB at 'Low' or 'Medium' settings print well for standard documents. 'High' compression is optimized for screen viewing. For print-quality output, use 'Low' compression." },
    ],
  },
  {
    slug: "2mb",
    label: "2 MB",
    bytes: 2 * 1024 * 1024,
    description: "Compress PDF to 2 MB for high-quality sharing while staying within common upload limits.",
    metaTitle: "Compress PDF to 2MB Free Online — High Quality | PDFBro",
    metaDescription: "Compress PDF to under 2 MB online free with minimal quality loss. Perfect for high-quality document sharing. No signup, no watermarks.",
    h1: "Compress PDF to 2MB — Free Online Tool",
    intro: "Need to reduce a large PDF to 2 MB while keeping professional quality? Many platforms accept files up to 2 MB for profile documents, portfolio submissions, and design proofs. PDFBro compresses with minimal quality loss.",
    keywords: ["compress pdf to 2mb", "reduce pdf to 2mb online", "compress pdf under 2mb free", "pdf 2mb compressor", "reduce pdf file size to 2mb", "make pdf 2mb"],
    useCase: "Design portfolio submissions, professional profile documents, print-on-demand uploads, photography portfolio sharing, high-quality client proofs.",
    faq: [
      { q: "How do I reduce a PDF to 2 MB without losing quality?", a: "Use PDFBro's 'Low' compression mode. It optimizes the PDF structure and compresses images minimally — reducing file size while preserving near-original visual quality." },
      { q: "Can a 20 MB PDF be compressed to 2 MB?", a: "Yes, with 'High' compression mode. The result depends on your file content — text documents compress more than photo-heavy PDFs. Most 20 MB documents reach 2 MB with visible but acceptable quality reduction." },
      { q: "Which platforms require PDFs under 2 MB?", a: "Upwork, Fiverr portfolio uploads, some university thesis submission systems, print-on-demand services (Redbubble, Printful), and professional networking platforms often cap at 2 MB." },
      { q: "Is 2 MB PDF compression free on PDFBro?", a: "Yes. All compression levels are completely free, with no signup, no watermarks, and no daily limits. Compress as many PDFs as you need." },
    ],
  },
  {
    slug: "5mb",
    label: "5 MB",
    bytes: 5 * 1024 * 1024,
    description: "Compress PDF to 5 MB for large document sharing within platform upload limits.",
    metaTitle: "Compress PDF to 5MB Free Online — Large File Compression | PDFBro",
    metaDescription: "Compress large PDFs to under 5 MB online free. Perfect for platform uploads with 5 MB limits. Maintains high quality at low compression. No signup.",
    h1: "Compress PDF to 5MB — Free Online Tool",
    intro: "Many document sharing platforms and government portals cap uploads at 5 MB. PDFBro reduces oversized PDFs to 5 MB with minimal quality loss using light compression. Perfect for large reports, presentations, and scanned documents.",
    keywords: ["compress pdf to 5mb", "reduce pdf to 5mb online", "compress pdf under 5mb free", "pdf 5mb compressor", "large pdf to 5mb", "reduce pdf file size to 5mb"],
    useCase: "Government tender submissions, large report sharing, academic paper submissions, legal document uploads, architecture/engineering plan sharing.",
    faq: [
      { q: "How do I compress a PDF to 5 MB?", a: "Use PDFBro's 'Low' compression — it provides enough reduction for most PDFs to reach 5 MB while keeping near-original quality. Larger files may need 'Medium' compression." },
      { q: "Can I reduce a 50 MB PDF to 5 MB?", a: "Yes, using 'Medium' or 'High' compression. A 50 MB PDF typically contains high-resolution images — reducing to 5 MB requires moderate image compression but text remains sharp." },
      { q: "What's the difference between compressing to 5 MB vs 1 MB?", a: "5 MB compression uses lighter optimization, preserving more image detail and color accuracy. 1 MB compression applies heavier optimization. Choose 5 MB when visual quality matters more than file size." },
      { q: "Does PDFBro support files larger than 100 MB for compression?", a: "PDFBro accepts files up to 100 MB. For files larger than 100 MB, you may need to split the PDF first, compress the parts individually, then merge them back." },
    ],
  },
];

export async function generateStaticParams() {
  return SIZES.map((s) => ({ size: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ size: string }> }): Promise<Metadata> {
  const { size } = await params;
  const config = SIZES.find((s) => s.slug === size);
  if (!config) return { title: "Not Found" };

  const url = `${BASE_URL}/compress-pdf-to/${size}`;
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url,
      type: "website",
      siteName: "PDFBro",
      images: [{ url: `${BASE_URL}/favicon/web-app-manifest-512x512.png`, width: 512, height: 512, alt: config.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
      images: [`${BASE_URL}/favicon/web-app-manifest-512x512.png`],
    },
    other: {
      "ai-content-declaration": "human-curated",
      "generator": "PDFBro",
    },
  };
}

function SizeJsonLd({ config }: { config: SizeConfig }) {
  const url = `${BASE_URL}/compress-pdf-to/${config.slug}`;
  const modifyDate = new Date().toISOString().split("T")[0];

  return (
    <Script
      id={`jsonld-compress-${config.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${url}#webpage`,
              url,
              name: config.metaTitle,
              description: config.metaDescription,
              inLanguage: "en-US",
              dateModified: modifyDate,
              isPartOf: { "@id": `${BASE_URL}/#website` },
              breadcrumb: { "@id": `${url}#breadcrumb` },
              about: { "@type": "Thing", name: "PDF Compression", description: config.description },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
                { "@type": "ListItem", position: 2, name: "Compress PDF", item: `${BASE_URL}/tools/compress-pdf` },
                { "@type": "ListItem", position: 3, name: `Compress PDF to ${config.label}`, item: url },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: config.faq.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
            {
              "@type": "HowTo",
              "@id": `${url}#howto`,
              name: `How to Compress PDF to ${config.label}`,
              description: config.description,
              inLanguage: "en-US",
              totalTime: "PT1M",
              tool: [{ "@type": "HowToTool", name: "PDFBro", url: BASE_URL }],
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: `Upload your PDF`,
                  text: `Click to upload or drag and drop your PDF file into the compression tool. Maximum file size: 100 MB.`,
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: `Choose compression level`,
                  text: `Select compression level based on your target size of ${config.label}. Use High for aggressive compression, Medium for balanced results.`,
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: `Download compressed PDF`,
                  text: `Click Compress and download your PDF. Most files reach ${config.label} or smaller. If not, try a higher compression level.`,
                },
              ],
            },
          ],
        }),
      }}
    />
  );
}

export default async function CompressPdfToSizePage({ params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const config = SIZES.find((s) => s.slug === size);
  if (!config) notFound();

  return (
    <>
      <SizeJsonLd config={config} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#eab308" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/tools/compress-pdf" className="hover:underline">Compress PDF</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Compress PDF to {config.label}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: "#eab30818" }}>
                <PackageOpen className="h-6 w-6" style={{ color: "#eab308" }} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                  {config.h1}
                </h1>
              </div>
            </div>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              {config.intro}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.08)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.15)" }}>Browser-Based</span>
            </div>
          </div>

          {/* CTA to Compress Tool */}
          <Link
            href="/tools/compress-pdf"
            className="group mb-10 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(234,179,8,0.12), rgba(234,179,8,0.05))", border: "1px solid rgba(234,179,8,0.3)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#eab308" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Compress PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Reduce PDF file size by up to 80% — choose Low, Medium, or High compression</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #eab308, #ca8a04)" }}>
              Compress Now →
            </div>
          </Link>

          {/* Use cases */}
          <section className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              When You Need a PDF Under {config.label}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {config.useCase}
            </p>
          </section>

          {/* How-to steps */}
          <section className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              How to Compress PDF to {config.label} — 3 Simple Steps
            </h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload your PDF", desc: "Click to upload or drag and drop your PDF into our compression tool. Works with files up to 100 MB." },
                { step: 2, title: "Choose compression level", desc: `Select compression level: Low (best quality), Medium (balanced), or High (smallest size). For ${config.label}, start with Medium compression.` },
                { step: 3, title: "Download compressed PDF", desc: `Click Compress and your PDF downloads immediately. Most files reach ${config.label} or smaller. If not, try High compression.` },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(234,179,8,0.15)", color: "#eab308" }}>
                    {s.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why PDFBro */}
          <section className="rounded-2xl p-5 mb-8 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Compress PDF to {config.label}</h2>
            {[
              "100% Free — no subscription, no paywall, no premium tier",
              "No signup required — use instantly, no email, no account",
              "Browser-based processing — your files never leave your device",
              "No watermarks on output — clean PDFs every time",
              "No daily limits — unlike iLovePDF (2/hour) or Smallpdf (2/day)",
              "Works on all devices — desktop, tablet, and mobile browsers",
            ].map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat}</span>
              </div>
            ))}
          </section>

          {/* FAQ */}
          <section className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {config.faq.map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < config.faq.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related size links */}
          <section className="mb-8">
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>Compress PDF to Other Sizes</h2>
            <div className="flex flex-wrap gap-2">
              {SIZES.filter((s) => s.slug !== config.slug).map((s) => (
                <Link
                  key={s.slug}
                  href={`/compress-pdf-to/${s.slug}`}
                  className="rounded-xl px-4 py-2 text-xs font-medium transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                >
                  Compress PDF to {s.label} →
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link
              href="/tools/compress-pdf"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}
            >
              Compress Your PDF Now — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
