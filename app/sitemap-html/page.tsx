import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/toolRegistry";
import { GUIDES, GUIDE_CATEGORY_META } from "@/lib/guides/index";

export const metadata: Metadata = {
  title: "Sitemap — All Pages | PDFBro Free PDF & Image Tools",
  description:
    "Complete list of all pages on PDFBro — free PDF tools, image tools, file converters, how-to guides, and more. Browse every tool and resource.",
  alternates: { canonical: "https://pdfbro.tech/sitemap-html" },
  robots: { index: true, follow: true },
};

const STATIC_PAGES = [
  { label: "Home — Free PDF & Image Tools", href: "/" },
  { label: "All Tools — Free Online Tools", href: "/tools" },
  { label: "Free PDF Tools — Merge, Split, Compress, Convert", href: "/pdf-tools" },
  { label: "Free Image Tools — Compress, Resize, Convert & Edit", href: "/image-tools" },
  { label: "Free File Converters — PDF, Images, Video", href: "/convert-tools" },
  { label: "How-To Guides — 60+ Free PDF & Image Tutorials", href: "/guides" },
  { label: "Features — What PDFBro Offers", href: "/features" },
  { label: "FAQ — Frequently Asked Questions", href: "/faq" },
  { label: "About PDFBro", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Security", href: "/security" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const COMPARISON_PAGES = [
  { label: "PDFBro vs iLovePDF — Comparison", href: "/vs/ilovepdf" },
  { label: "PDFBro vs Smallpdf — Comparison", href: "/vs/smallpdf" },
  { label: "PDFBro vs Adobe Acrobat — Comparison", href: "/vs/adobe-acrobat" },
];

const AUDIENCE_PAGES = [
  { label: "PDFBro for Students — Free Tools for Academic Use", href: "/for/students" },
  { label: "PDFBro for Business — Free Tools for Professionals", href: "/for/business" },
  { label: "PDFBro for Developers — Tools for Technical Users", href: "/for/developers" },
];

export default function HTMLSitemapPage() {
  const pdfTools = TOOLS.filter((t) => t.category === "pdf");
  const imageTools = TOOLS.filter((t) => t.category === "image");
  const convertTools = TOOLS.filter((t) => t.category === "convert");
  const utilityTools = TOOLS.filter((t) => t.category === "utility");

  const pdfGuides = GUIDES.filter((g) => g.category === "pdf");
  const imageGuides = GUIDES.filter((g) => g.category === "image");
  const convertGuides = GUIDES.filter((g) => g.category === "convert");
  const usecaseGuides = GUIDES.filter((g) => g.category === "usecase");
  const alternativeGuides = GUIDES.filter((g) => g.category === "alternative");
  const longtailGuides = GUIDES.filter(
    (g) => !["pdf", "image", "convert", "usecase", "alternative"].includes(g.category)
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">

        {/* Breadcrumb */}
        <div className="text-xs mb-8" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>Sitemap</span>
        </div>

        <h1 className="text-3xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>
          PDFBro — Complete Site Map
        </h1>
        <p className="text-base mb-12" style={{ color: "var(--text-secondary)" }}>
          Every page on PDFBro — free PDF tools, image tools, file converters, and how-to guides. No signup required.
        </p>

        {/* ── Main Pages ── */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-subtle)" }}>
            Main Pages
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {STATIC_PAGES.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="text-sm hover:underline underline-offset-2"
                  style={{ color: "var(--accent-blue)" }}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Comparison Pages ── */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-subtle)" }}>
            Comparison Pages
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {COMPARISON_PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-sm hover:underline underline-offset-2" style={{ color: "var(--accent-blue)" }}>
                  {p.label}
                </Link>
              </li>
            ))}
            {AUDIENCE_PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-sm hover:underline underline-offset-2" style={{ color: "var(--accent-blue)" }}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── PDF Tools ── */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Free PDF Tools
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            {pdfTools.length} free PDF tools — no signup, no watermarks, browser-based
          </p>
          <div className="mb-3">
            <Link href="/pdf-tools" className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>
              Browse all free PDF tools →
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {pdfTools.map((tool) => (
              <li key={tool.slug} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tool.color }} />
                <div>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm font-medium hover:underline underline-offset-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {tool.name}
                  </Link>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tool.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Image Tools ── */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Free Image Tools
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            {imageTools.length} free image tools — compress, resize, convert, edit
          </p>
          <div className="mb-3">
            <Link href="/image-tools" className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>
              Browse all free image tools →
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {imageTools.map((tool) => (
              <li key={tool.slug} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tool.color }} />
                <div>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm font-medium hover:underline underline-offset-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {tool.name}
                  </Link>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tool.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Convert Tools ── */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Free File Conversion Tools
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            {convertTools.length}+ free file converters — PDF, images, documents, video
          </p>
          <div className="mb-3">
            <Link href="/convert-tools" className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>
              Browse all file converters →
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {convertTools.map((tool) => (
              <li key={tool.slug} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tool.color }} />
                <div>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm font-medium hover:underline underline-offset-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {tool.name}
                  </Link>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tool.description}</p>
                </div>
              </li>
            ))}
            {utilityTools.map((tool) => (
              <li key={tool.slug} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tool.color }} />
                <div>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm font-medium hover:underline underline-offset-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {tool.name}
                  </Link>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tool.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Guides ── */}
        <section className="mb-12">
          <h2 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Free PDF &amp; Image Guides
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            {GUIDES.length} step-by-step how-to guides for PDF and image tasks
          </p>
          <div className="mb-5">
            <Link href="/guides" className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>
              Browse all guides →
            </Link>
          </div>

          {/* PDF Guides */}
          {pdfGuides.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: GUIDE_CATEGORY_META.pdf.color }}>
                PDF Guides ({pdfGuides.length})
              </h3>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {pdfGuides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-sm hover:underline underline-offset-2" style={{ color: "var(--text-secondary)" }}>
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Image Guides */}
          {imageGuides.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: GUIDE_CATEGORY_META.image.color }}>
                Image Guides ({imageGuides.length})
              </h3>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {imageGuides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-sm hover:underline underline-offset-2" style={{ color: "var(--text-secondary)" }}>
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Convert Guides */}
          {convertGuides.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: GUIDE_CATEGORY_META.convert.color }}>
                Conversion Guides ({convertGuides.length})
              </h3>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {convertGuides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-sm hover:underline underline-offset-2" style={{ color: "var(--text-secondary)" }}>
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Use Case Guides */}
          {usecaseGuides.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: GUIDE_CATEGORY_META.usecase.color }}>
                Use Case Guides ({usecaseGuides.length})
              </h3>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {usecaseGuides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-sm hover:underline underline-offset-2" style={{ color: "var(--text-secondary)" }}>
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternative Guides */}
          {alternativeGuides.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: GUIDE_CATEGORY_META.alternative.color }}>
                Alternative &amp; Comparison Guides ({alternativeGuides.length})
              </h3>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {alternativeGuides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-sm hover:underline underline-offset-2" style={{ color: "var(--text-secondary)" }}>
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Longtail Guides */}
          {longtailGuides.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                More Guides ({longtailGuides.length})
              </h3>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {longtailGuides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-sm hover:underline underline-offset-2" style={{ color: "var(--text-secondary)" }}>
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Total count */}
        <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>
              {TOOLS.length + GUIDES.length + STATIC_PAGES.length + COMPARISON_PAGES.length + AUDIENCE_PAGES.length}+ pages
            </strong>{" "}
            on PDFBro — all free, no signup required.
          </p>
          <div className="flex gap-3 justify-center mt-3 flex-wrap">
            <Link href="/tools" className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>
              All Tools →
            </Link>
            <Link href="/guides" className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>
              All Guides →
            </Link>
            <Link href="/pdf-tools" className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>
              PDF Tools →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
