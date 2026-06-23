import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Clock, ChevronLeft, BookOpen, CheckCircle2, Lightbulb } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts, BLOG_CATEGORIES } from "@/lib/blog/data";
import { getToolBySlug } from "@/lib/toolRegistry";
import type { BlogPost } from "@/lib/blog/data";

const BASE_URL = "https://pdfbro.tech";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `${BASE_URL}/blog/${slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: "article",
      siteName: "PDFBro",
      images: [{ url: post.imageUrl, width: 512, height: 512 }],
      publishedTime: `${post.publishedDate}T00:00:00Z`,
      modifiedTime: new Date().toISOString(),
      authors: [BASE_URL],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.imageUrl],
    },
    other: {
      "ai-content-declaration": "human-curated",
      "generator": "PDFBro",
    },
  };
}

function bodyToHTML(text: string): string {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p class='text-sm leading-relaxed mb-3' style='color: var(--text-secondary)'>")
    .replace(/\n- /g, "\n<li>");

  html = `<p class='text-sm leading-relaxed mb-3' style='color: var(--text-secondary)'>${html}</p>`;
  html = html.replace(/<p[^>]*><\/p>/g, "");
  html = html.replace(/\n<li>/g, "</p><li class='text-sm leading-relaxed ml-4 mb-1' style='color: var(--text-secondary)'>");
  html = html.replace(/(<li[^>]*>.*?)(\n(?!<))/g, "$1");

  return html;
}

function BodyRenderer({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <>
      {paragraphs.map((para, i) => {
        if (para.startsWith("| ")) {
          const lines = para.split("\n");
          const rows = lines.filter(l => l.startsWith("|"));
          if (rows.length < 2) return null;
          const isHeaderSep = (r: string) => /^\|[-| ]+\|$/.test(r);
          const dataRows = rows.filter(r => !isHeaderSep(r));
          if (dataRows.length === 0) return null;
          const headers = dataRows[0].split("|").filter(Boolean).map(h => h.trim());
          const body = dataRows.slice(1).map(r => r.split("|").filter(Boolean).map(c => c.trim()));

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
                  {body.map((row, ri) => (
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

        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, pi) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={pi} style={{ color: "var(--text-primary)" }}>{part.slice(2, -2)}</strong>;
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const category = BLOG_CATEGORIES.find(c => c.slug === post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/blog/${slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
        ],
      },
      {
        "@type": "Article",
        "@id": `${BASE_URL}/blog/${slug}#article`,
        headline: post.title,
        description: post.metaDescription,
        url: `${BASE_URL}/blog/${slug}`,
        inLanguage: "en-US",
        datePublished: post.publishedDate,
        dateModified: new Date().toISOString().split("T")[0],
        wordCount: post.sections.reduce((c, s) => c + s.body.split(/\s+/).length, 0),
        author: {
          "@type": "Person",
          name: post.author,
          description: post.authorBio,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
          name: "PDFBro",
          url: BASE_URL,
        },
        articleSection: category?.name ?? post.category,
        keywords: post.keywords.join(", "),
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/blog/${slug}#faq`,
        mainEntity: post.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <>
      <Script id={`jsonld-blog-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#2563eb" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <article className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                <Link href="/" className="hover:underline">Home</Link>
                <span>/</span>
                <Link href="/blog" className="flex items-center gap-1 hover:underline"><ChevronLeft className="h-3 w-3" />Blog</Link>
                <span>/</span>
                <span style={{ color: "var(--text-secondary)" }}>{post.title.slice(0, 50)}…</span>
              </div>

              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {category && (
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(37,99,235,0.1)", color: "#2563eb" }}>
                    {category.name}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <Clock className="h-3 w-3" />{post.readTime} min read
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.publishedDate}</span>
              </div>

              <h1 className="text-2xl font-extrabold sm:text-3xl leading-tight mb-3" style={{ color: "var(--text-primary)" }}>
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full px-2.5 py-0.5 text-xs" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}>{tag}</span>
                ))}
              </div>

              <p className="text-base leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>

              <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
                <span>By <strong style={{ color: "var(--text-primary)" }}>{post.author}</strong></span>
                <span>·</span>
                <span>{post.authorBio}</span>
              </div>

              {post.sections.map((section, si) => (
                <section key={si} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>{section.heading}</h2>
                  <BodyRenderer text={section.body} />
                </section>
              ))}

              {post.faq.length > 0 && (
                <section className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
                  <div className="space-y-5">
                    {post.faq.map((item, i) => (
                      <div key={i} className="pb-5" style={{ borderBottom: i < post.faq.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                        <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {relatedPosts.length > 0 && (
                <section>
                  <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>Related Articles</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`}
                        className="group rounded-xl p-4 flex items-start gap-3 transition-all hover:scale-[1.01]"
                        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                        <BookOpen className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#2563eb" }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-snug group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{rp.title}</p>
                          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{rp.readTime} min read</p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color: "var(--text-muted)" }} />
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
              {post.relatedTools.length > 0 && (
                <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-muted)" }}>Related Tools</h3>
                  <div className="space-y-2">
                    {post.relatedTools.map((toolSlug) => {
                      const tool = getToolBySlug(toolSlug);
                      if (!tool) return null;
                      return (
                        <Link key={toolSlug} href={`/tools/${toolSlug}`}
                          className="flex items-center gap-2.5 rounded-xl p-2.5 transition-all hover:scale-[1.01]"
                          style={{ backgroundColor: "var(--bg-secondary)" }}>
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

              <Link href="/blog" className="block rounded-2xl p-4 text-center text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))", color: "#fff" }}>
                Browse All Articles →
              </Link>

              <Link href="/tools" className="block rounded-2xl p-4 text-center text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                Browse All Tools →
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
