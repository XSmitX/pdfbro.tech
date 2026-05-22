import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { GUIDES, GUIDE_CATEGORY_META } from "@/lib/guides/index";
import PageBackground from "@/components/PageBackground";
import type { GuideData } from "@/lib/guides/types";

export const metadata: Metadata = {
  title: "Free PDF & Image Guides — How to Merge PDF, Compress PDF & More | PDFBro",
  description:
    "50+ free step-by-step PDF and image guides. How to merge PDF, compress PDF, convert PDF to Word, compress images, HEIC to JPG, remove backgrounds, iLovePDF alternatives and more. With FAQs.",
  keywords: [
    // High-traffic informational
    "how to merge PDF",
    "how to compress PDF",
    "how to convert PDF to Word",
    "how to compress image",
    "how to convert HEIC to JPG",
    "how to remove background from image",
    "how to create QR code",
    // Medium traffic
    "PDF tutorials free",
    "PDF how-to guides",
    "image editing tutorials free",
    "ilovepdf alternative guide",
    "smallpdf alternative",
    "free acrobat alternative",
    // Long-tail
    "compress PDF without losing quality guide",
    "how to sign PDF online free",
    "how to password protect PDF free",
  ],
  alternates: { canonical: "https://pdfbro.tech/guides" },
  openGraph: {
    title: "PDF & Image Guides — Free How-To Tutorials | PDFBro",
    description: "50+ step-by-step guides for PDF and image tasks. Free, no signup.",
    url: "https://pdfbro.tech/guides",
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "PDF & Image How-To Guides — PDFBro",
  description: "50+ free guides for PDF and image tasks. Step-by-step tutorials with FAQs.",
  url: "https://pdfbro.tech/guides",
  publisher: { "@type": "Organization", name: "PDFBro", url: "https://pdfbro.tech" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://pdfbro.tech/guides" },
    ],
  },
};

const CATEGORIES: GuideData["category"][] = ["pdf", "image", "convert", "usecase", "alternative"];

function estimateReadMins(guide: GuideData) {
  const words = [guide.intro, ...guide.sections.map((s) => s.body)].join(" ").split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 230));
}

export default function GuidesIndexPage() {
  return (
    <>
      <Script id="jsonld-guides" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />

        {/* Hero */}
        <section className="relative py-14 sm:py-20" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-3">
              <Link href="/" className="text-xs" style={{ color: "var(--text-muted)" }}>Home</Link>
              <span className="mx-2 text-xs" style={{ color: "var(--border)" }}>/</span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Guides</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
              Free PDF &amp; Image How-To Guides
            </h1>
            <p className="max-w-2xl text-base mb-2" style={{ color: "var(--text-secondary)" }}>
              {GUIDES.length} step-by-step guides covering every PDF and image task — how to merge PDF, compress PDF, convert HEIC to JPG, remove image backgrounds, iLovePDF alternatives and more.
            </p>
            <p className="max-w-2xl text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Each guide includes step-by-step instructions, pro tips, FAQs with rich snippets, and direct links to the free tools.
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const meta = GUIDE_CATEGORY_META[cat];
                const count = GUIDES.filter((g) => g.category === cat).length;
                return (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    className="rounded-xl px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105"
                    style={{ backgroundColor: meta.accent, color: meta.color, border: `1px solid ${meta.color}30` }}
                  >
                    {meta.label} ({count})
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Guide sections by category */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {CATEGORIES.map((cat) => {
            const meta = GUIDE_CATEGORY_META[cat];
            const catGuides = GUIDES.filter((g) => g.category === cat);
            if (!catGuides.length) return null;
            return (
              <section key={cat} id={cat}>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest mb-1 block" style={{ color: meta.color }}>{meta.label}</span>
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{meta.label}</h2>
                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{meta.description}</p>
                  </div>
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: meta.accent, color: meta.color }}>
                    {catGuides.length} guides
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {catGuides.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/tools" className="group rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(79,142,247,0.12)" }}>
                  <ArrowRight className="h-5 w-5" style={{ color: "var(--accent-blue)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Browse All Tools</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>100+ free PDF & image tools</p>
                </div>
              </Link>
              <Link href="/pdf-tools" className="group rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(239,68,68,0.12)" }}>
                  <BookOpen className="h-5 w-5" style={{ color: "#ef4444" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>PDF Tools</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>All free PDF operations</p>
                </div>
              </Link>
              <Link href="/image-tools" className="group rounded-2xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(139,92,246,0.12)" }}>
                  <BookOpen className="h-5 w-5" style={{ color: "#8b5cf6" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Image Tools</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>All free image operations</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function GuideCard({ guide }: { guide: GuideData }) {
  const meta = GUIDE_CATEGORY_META[guide.category];
  const readMins = estimateReadMins(guide);
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group rounded-2xl p-5 flex flex-col gap-3 transition-all hover:scale-[1.02]"
      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold flex-shrink-0" style={{ backgroundColor: meta.accent, color: meta.color }}>
          {guide.badge}
        </span>
        <span className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
          <Clock className="h-3 w-3" />{readMins}m
        </span>
      </div>
      <h3 className="text-sm font-semibold leading-snug group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>
        {guide.title}
      </h3>
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
        {guide.metaDescription}
      </p>
      <div className="flex items-center gap-1 text-xs font-medium mt-auto" style={{ color: meta.color }}>
        Read guide <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
