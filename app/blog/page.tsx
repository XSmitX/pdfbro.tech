import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import Script from "next/script";
import PageBackground from "@/components/PageBackground";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog/data";

export const metadata: Metadata = {
  title: "PDF & Image Blog — Free Guides, Tutorials, Comparisons | PDFBro",
  description: "Free guides, tutorials, and comparisons about PDF tools, image editing, file conversion, and document management. Learn how to merge, compress, edit, and convert PDFs.",
  keywords: ["PDF blog", "PDF guides", "PDF tutorials", "how to merge PDF", "compress PDF guide", "PDF editor tutorial", "file conversion guide", "document management blog"],
  alternates: { canonical: "https://pdfbro.tech/blog" },
  openGraph: {
    title: "PDF & Image Blog — Free Guides, Tutorials, Comparisons | PDFBro",
    description: "Free guides, tutorials, and comparisons about PDF tools, image editing, and file conversion.",
    url: "https://pdfbro.tech/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <Script id="jsonld-blog" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [{
            "@type": "CollectionPage",
            "@id": "https://pdfbro.tech/blog#collection",
            url: "https://pdfbro.tech/blog",
            name: "PDF & Image Blog — Free Guides, Tutorials, Comparisons | PDFBro",
            description: "Free guides, tutorials, and comparisons about PDF tools, image editing, and file conversion.",
            inLanguage: "en-US",
            isPartOf: { "@id": "https://pdfbro.tech/#website" },
          }],
        }),
      }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>Blog</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDF &amp; Image Blog
          </h1>
          <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
            Free guides, tutorials, and comparisons to help you master PDF and image tools.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {BLOG_CATEGORIES.map((cat) => (
              <span key={cat.slug} className="rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                {cat.name}
              </span>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group rounded-2xl p-6 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>
                    {BLOG_CATEGORIES.find(c => c.slug === post.category)?.name ?? post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Clock className="h-3 w-3" />{post.readTime} min read
                  </span>
                </div>
                <h2 className="text-lg font-bold mb-2 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}>{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.publishedDate}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent-blue)" }}>
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              <BookOpen className="h-4 w-4" /> Browse All 100+ Tools →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
