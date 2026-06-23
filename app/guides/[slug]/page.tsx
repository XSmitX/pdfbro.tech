import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, ChevronLeft, CheckCircle2, Lightbulb, Info, AlertTriangle, Clock, BookOpen } from "lucide-react";
import { GUIDES, getGuideBySlug, GUIDE_CATEGORY_META } from "@/lib/guides/index";
import { getToolBySlug } from "@/lib/toolRegistry";
import PageBackground from "@/components/PageBackground";
import type { GuideData } from "@/lib/guides/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://pdfbro.tech";

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };

  const url = `${BASE_URL}/guides/${slug}`;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
      type: "article",
      siteName: "PDFBro",
      images: [{ url: "https://pdfbro.tech/favicon/web-app-manifest-512x512.png", width: 512, height: 512 }],
      publishedTime: "2025-05-01T00:00:00Z",
      modifiedTime: new Date().toISOString(),
      authors: ["https://pdfbro.tech"],
      section: guide.category,
      tags: guide.keywords.slice(0, 6),
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

function buildJsonLd(guide: GuideData, wordCount: number) {
  const url = `${BASE_URL}/guides/${guide.slug}`;
  const publishDate = "2025-05-01";
  const modifyDate = new Date().toISOString().split("T")[0];

  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.title,
      name: guide.title,
      description: guide.metaDescription,
      url,
      inLanguage: "en-US",
      datePublished: publishDate,
      dateModified: modifyDate,
      wordCount,
      image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
        width: 512,
        height: 512,
      },
      publisher: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "PDFBro",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
        },
      },
      author: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "PDFBro",
        url: BASE_URL,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
        isPartOf: { "@id": `${BASE_URL}/#website` },
      },
      isPartOf: {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        name: "PDFBro",
        url: BASE_URL,
      },
      keywords: guide.keywords.join(", "),
      articleSection: guide.category,
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: guide.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];

  // Add HowTo schema if a primary section has steps
  const stepsSection = guide.sections.find((s) => s.steps && s.steps.length > 0);
  if (stepsSection?.steps) {
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: guide.title,
      description: guide.metaDescription,
      inLanguage: "en-US",
      totalTime: "PT5M",
      tool: [{ "@type": "HowToTool", name: "PDFBro", url: BASE_URL }],
      supply: [],
      step: stepsSection.steps.map((step) => ({
        "@type": "HowToStep",
        position: step.n,
        name: step.title,
        text: step.body,
        url: `${url}#step-${step.n}`,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function Callout({ type, text }: { type: "tip" | "warning" | "info"; text: string }) {
  const styles = {
    tip: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", color: "#10b981", Icon: Lightbulb, label: "Pro Tip" },
    warning: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", color: "#f59e0b", Icon: AlertTriangle, label: "Important" },
    info: { bg: "rgba(14,165,233,0.08)", border: "rgba(14,165,233,0.2)", color: "#0ea5e9", Icon: Info, label: "Note" },
  }[type];

  return (
    <div className="rounded-xl p-4 flex gap-3 my-4" style={{ backgroundColor: styles.bg, border: `1px solid ${styles.border}` }}>
      <styles.Icon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: styles.color }} />
      <div>
        <span className="text-xs font-bold uppercase tracking-wide mr-2" style={{ color: styles.color }}>{styles.label}:</span>
        <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{text}</span>
      </div>
    </div>
  );
}

function BodyText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => {
        if (para.startsWith("| ")) {
          const rows = para.split("\n").filter((r) => !r.match(/^\|[-| ]+\|$/));
          if (rows.length < 2) return null;
          const headers = rows[0].split("|").filter(Boolean).map((h) => h.trim());
          const dataRows = rows.slice(1).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
          return (
            <div key={i} className="overflow-x-auto my-4 rounded-xl" style={{ border: "1px solid var(--border-subtle)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    {headers.map((h, j) => (
                      <th key={j} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-subtle)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-2.5 text-sm" style={{ color: ci === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (para.startsWith("```")) {
          const code = para.replace(/```\w*\n?/, "").replace(/```$/, "");
          return (
            <pre key={i} className="rounded-xl p-4 my-4 text-xs overflow-x-auto" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", color: "var(--accent-blue)", fontFamily: "monospace" }}>
              {code}
            </pre>
          );
        }

        // Parse inline **bold** markers
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, pi) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={pi} style={{ color: "var(--text-primary)" }}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("✅") || part.startsWith("✓")) {
            return <span key={pi} style={{ color: "var(--accent-green)" }}>{part}</span>;
          }
          return part;
        });

        return (
          <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
            {rendered}
          </p>
        );
      })}
    </>
  );
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const catMeta = GUIDE_CATEGORY_META[guide.category];
  const relatedTool = guide.toolSlug ? getToolBySlug(guide.toolSlug) : null;
  const relatedGuides = guide.relatedGuides
    .map((s) => getGuideBySlug(s))
    .filter((g): g is GuideData => !!g)
    .slice(0, 5);

  // Estimate reading time
  const wordCount = [guide.intro, ...guide.sections.map((s) => s.body + (s.steps?.map((st) => st.body).join(" ") ?? "")), ...guide.faq.map((f) => f.a)].join(" ").split(/\s+/).length;
  const readMins = Math.max(2, Math.ceil(wordCount / 230));

  return (
    <>
      <Script id={`jsonld-guide-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(guide, wordCount)) }} />

      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor={catMeta.color} />

        {/* Breadcrumb */}
        <div className="relative" style={{ borderBottom: "1px solid var(--border-subtle)", background: "color-mix(in srgb, var(--bg-secondary) 85%, transparent)", backdropFilter: "blur(12px)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <Link href="/" className="hover:underline underline-offset-2">Home</Link>
              <span>/</span>
              <Link href="/guides" className="flex items-center gap-1 hover:underline underline-offset-2">
                <ChevronLeft className="h-3 w-3" />Guides
              </Link>
              <span>/</span>
              <span style={{ color: "var(--text-secondary)" }}>{guide.title.slice(0, 50)}{guide.title.length > 50 ? "…" : ""}</span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* ── Main Article ── */}
            <article className="lg:col-span-2 space-y-8">

              {/* Article header */}
              <div>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: catMeta.accent, color: catMeta.color }}>
                    {guide.badge}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Clock className="h-3 w-3" />{readMins} min read
                  </span>
                </div>

                <h1 className="text-2xl font-extrabold sm:text-3xl leading-tight mb-3" style={{ color: "var(--text-primary)" }}>
                  {guide.title}
                </h1>

                {/* Keyword tags — SEO signal + UX quick-scan */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {guide.keywords.slice(0, 5).map((kw) => (
                    <span key={kw} className="rounded-full px-2.5 py-0.5 text-xs"
                      style={{ backgroundColor: catMeta.accent, color: catMeta.color, border: `1px solid ${catMeta.color}25` }}>
                      {kw}
                    </span>
                  ))}
                  <span className="rounded-full px-2.5 py-0.5 text-xs"
                    style={{ backgroundColor: "rgba(52,211,153,0.10)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>
                    Free · No Signup
                  </span>
                </div>

                <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {guide.intro}
                </p>

                {/* Tool CTA banner */}
                {relatedTool && (
                  <Link
                    href={`/tools/${relatedTool.slug}`}
                    className="group mt-6 flex items-center justify-between gap-4 rounded-2xl p-4 transition-all hover:scale-[1.01]"
                    style={{ background: `linear-gradient(135deg, ${relatedTool.color}18, ${relatedTool.color}08)`, border: `1px solid ${relatedTool.color}30` }}
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: relatedTool.color }}>Free Online Tool</p>
                      <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{relatedTool.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{relatedTool.description}</p>
                    </div>
                    <div className="flex-shrink-0 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${relatedTool.color}, ${relatedTool.color}cc)` }}>
                      Use Free →
                    </div>
                  </Link>
                )}
              </div>

              {/* Sections */}
              {guide.sections.map((section, si) => (
                <section key={si} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                    {section.heading}
                  </h2>

                  {section.body && <BodyText text={section.body} />}

                  {section.steps && section.steps.length > 0 && (
                    <ol className="space-y-4 mt-4">
                      {section.steps.map((step) => (
                        <li key={step.n} className="flex gap-4">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5"
                            style={{ backgroundColor: catMeta.accent, color: catMeta.color }}>
                            {step.n}
                          </span>
                          <div>
                            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{step.title}</p>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {section.list && section.list.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {section.list.map((item, li) => (
                        <li key={li} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: catMeta.color }} />
                          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && <Callout type={section.callout.type} text={section.callout.text} />}
                </section>
              ))}

              {/* Pro Tips */}
              {guide.proTips.length > 0 && (
                <section className="rounded-2xl p-6" style={{ backgroundColor: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="h-5 w-5" style={{ color: "#10b981" }} />
                    <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Pro Tips</h2>
                  </div>
                  <ul className="space-y-3">
                    {guide.proTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-0.5" style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#10b981" }}>{i + 1}</span>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{tip}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQ */}
              {guide.faq.length > 0 && (
                <section className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-5">
                    {guide.faq.map((item, i) => (
                      <div key={i} className="pb-5" style={{ borderBottom: i < guide.faq.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                        <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related guides */}
              {relatedGuides.length > 0 && (
                <section>
                  <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>Related Guides</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {relatedGuides.map((rg) => {
                      const rgCat = GUIDE_CATEGORY_META[rg.category];
                      return (
                        <Link
                          key={rg.slug}
                          href={`/guides/${rg.slug}`}
                          className="group rounded-xl p-4 flex items-start gap-3 transition-all hover:scale-[1.02]"
                          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                        >
                          <BookOpen className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: rgCat.color }} />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium" style={{ color: rgCat.color }}>{rg.badge}</span>
                            <p className="text-sm font-semibold leading-snug mt-0.5 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>
                              {rg.title}
                            </p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color: "var(--text-muted)" }} />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">

              {/* Primary tool CTA */}
              {relatedTool && (
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
                  <div className="p-4" style={{ background: `linear-gradient(135deg, ${relatedTool.color}20, ${relatedTool.color}08)` }}>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: relatedTool.color }}>Try It Free</p>
                    <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{relatedTool.name}</p>
                    <p className="text-xs mt-1 mb-3" style={{ color: "var(--text-secondary)" }}>{relatedTool.description}</p>
                    <Link
                      href={`/tools/${relatedTool.slug}`}
                      className="block w-full rounded-xl py-2.5 text-sm font-semibold text-white text-center transition-all hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${relatedTool.color}, ${relatedTool.color}cc)` }}
                    >
                      Open {relatedTool.name} →
                    </Link>
                  </div>
                  <div className="px-4 py-3 space-y-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    {["100% Free — no signup", "No watermarks ever", "Files stay on your device"].map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related tools */}
              {guide.relatedTools.length > 0 && (
                <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-muted)" }}>Related Tools</h3>
                  <div className="space-y-2">
                    {guide.relatedTools.map((toolSlug) => {
                      const tool = getToolBySlug(toolSlug);
                      if (!tool) return null;
                      return (
                        <Link
                          key={toolSlug}
                          href={`/tools/${toolSlug}`}
                          className="flex items-center gap-2.5 rounded-xl p-2.5 transition-all hover:scale-[1.01]"
                          style={{ backgroundColor: "var(--bg-secondary)" }}
                        >
                          <div className="h-7 w-7 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${tool.color}18` }}>
                            <ArrowRight className="h-3.5 w-3.5" style={{ color: tool.color }} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{tool.name}</p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Free · No signup</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Browse guides */}
              <Link
                href="/guides"
                className="block rounded-2xl p-4 text-center text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))", color: "#fff" }}
              >
                Browse All 50 Guides →
              </Link>

              {/* Browse tools */}
              <Link
                href="/tools"
                className="block rounded-2xl p-4 text-center text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                Browse All Tools →
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
