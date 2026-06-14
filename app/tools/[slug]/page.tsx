import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getToolBySlug, TOOLS } from "@/lib/toolRegistry";
import { getToolSeoContent } from "@/lib/toolFaq";
import { TOOL_KEYWORDS } from "@/lib/seo/keywords";
import ToolPageClient from "./ToolPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://pdfbro.tech";

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  const kw = TOOL_KEYWORDS[slug];
  const url = `${BASE_URL}/tools/${slug}`;

  const title = kw?.metaTitle ?? `${tool.name} Online Free — ${tool.description} | PDFBro`;
  const description = kw?.metaDescription ?? `${tool.longDescription} 100% free, no signup, no watermarks. Works in your browser instantly — no software to install.`;

  const keywords = [
    ...(kw ? [kw.primary, ...kw.secondary, ...kw.longTail, ...kw.questions] : []),
    ...tool.tags,
    `${tool.name.toLowerCase()} free`,
    `${tool.name.toLowerCase()} online`,
    "no signup",
    "no watermark",
    "browser-based",
    "free tool 2026",
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} — Free Online Tool | PDFBro`,
      description,
      url,
      siteName: "PDFBro",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
          alt: `${tool.name} — Free Online Tool | PDFBro`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — Free Online Tool`,
      description,
      images: [`${BASE_URL}/favicon/web-app-manifest-512x512.png`],
    },
    other: {
      "ai-content-declaration": "human-curated",
      "generator": "PDFBro",
      "tool-category": tool.category,
    },
  };
}

const CATEGORY_PAGE_URL: Record<string, string> = {
  pdf: `${BASE_URL}/pdf-tools`,
  image: `${BASE_URL}/image-tools`,
  convert: `${BASE_URL}/convert-tools`,
  utility: `${BASE_URL}/tools`,
};

function ToolJsonLd({ tool }: { tool: NonNullable<ReturnType<typeof getToolBySlug>> }) {
  const seoContent = getToolSeoContent(tool.slug);
  const kw = TOOL_KEYWORDS[tool.slug];
  const toolUrl = `${BASE_URL}/tools/${tool.slug}`;
  const categoryUrl = CATEGORY_PAGE_URL[tool.category] ?? `${BASE_URL}/tools`;
  const modifyDate = new Date().toISOString().split("T")[0];

  const catName =
    tool.category === "pdf" ? "Free PDF Tools Online" :
    tool.category === "image" ? "Free Image Tools Online" :
    tool.category === "convert" ? "Free File Conversion Tools" : "Free Online Utility Tools";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // ── WebPage ────────────────────────────────────────
      {
        "@type": "WebPage",
        "@id": `${toolUrl}#webpage`,
        url: toolUrl,
        name: kw?.metaTitle ?? `${tool.name} Online Free | PDFBro`,
        description: kw?.metaDescription ?? tool.longDescription,
        inLanguage: "en-US",
        dateModified: modifyDate,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: { "@id": `${toolUrl}#breadcrumb` },
        about: {
          "@type": "Thing",
          name: tool.name,
          description: tool.longDescription,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".tool-description", "#how-to-use", "#faq-section"],
        },
        audience: {
          "@type": "Audience",
          audienceType: "general users, students, business professionals, developers",
        },
      },

      // ── SoftwareApplication (GEO: AI tool definition) ──
      {
        "@type": "SoftwareApplication",
        "@id": `${toolUrl}#software`,
        name: `${tool.name} — PDFBro`,
        alternateName: `${tool.name} Online Free`,
        applicationCategory: "UtilitiesApplication",
        applicationSubCategory:
          tool.category === "pdf" ? "PDF Tools" :
          tool.category === "image" ? "Image Tools" :
          tool.category === "convert" ? "File Conversion" : "Online Utilities",
        operatingSystem: "Web, Windows, macOS, Linux, Android, iOS",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2030-12-31",
          description: "Completely free — no signup, no watermarks, no daily limits",
        },
        description: tool.longDescription,
        url: toolUrl,
        image: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
        provider: { "@id": `${BASE_URL}/#organization` },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          name: "PDFBro",
          url: BASE_URL,
        },
        browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
        featureList: [...tool.tags, ...(kw?.secondary ?? [])].join(", "),
        keywords: kw ? [kw.primary, ...kw.secondary, ...kw.longTail].join(", ") : tool.tags.join(", "),
        dateModified: modifyDate,
        inLanguage: "en-US",
        about: {
          "@type": "WebPage",
          "@id": categoryUrl,
          name: catName,
          url: categoryUrl,
        },
        review: [
          {
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            author: { "@type": "Person", name: "PDFBro User" },
            reviewBody: `${tool.name} is completely free and works perfectly in my browser. No signup needed.`,
          },
        ],
      },

      // ── BreadcrumbList ──────────────────────────────────
      {
        "@type": "BreadcrumbList",
        "@id": `${toolUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "All Tools", item: `${BASE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: tool.name, item: toolUrl },
        ],
      },

      // ── FAQPage ────────────────────────────────────────
      {
        "@type": "FAQPage",
        "@id": `${toolUrl}#faq`,
        name: `${tool.name} — Frequently Asked Questions`,
        mainEntity: seoContent.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
        ...(kw?.questions && kw.questions.length > 0 ? {
          additionalProperty: kw.questions.slice(0, 8).map((q, i) => ({
            "@type": "PropertyValue",
            name: `related_question_${i + 1}`,
            value: q,
          })),
        } : {}),
      },

      // ── HowTo ──────────────────────────────────────────
      ...(seoContent.howTo && seoContent.howTo.length > 0 ? [{
        "@type": "HowTo",
        "@id": `${toolUrl}#howto`,
        name: `How to use ${tool.name} online free — Step-by-Step Guide`,
        description: tool.longDescription,
        inLanguage: "en-US",
        totalTime: "PT2M",
        estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
        tool: [{ "@type": "HowToTool", name: "PDFBro", url: BASE_URL }],
        supply: [{ "@type": "HowToSupply", name: "A modern web browser" }],
        step: seoContent.howTo.map((step) => ({
          "@type": "HowToStep",
          position: step.step,
          url: `${toolUrl}#step-${step.step}`,
          name: step.title,
          itemListElement: {
            "@type": "HowToDirection",
            text: step.desc,
          },
        })),
      }] : []),

      // ── DefinedTerm (GEO: entity disambiguation) ─────
      ...(kw?.semantic && kw.semantic.length > 0 ? kw.semantic.slice(0, 5).map((term, i) => ({
        "@type": "DefinedTerm",
        "@id": `${toolUrl}#term-${i}`,
        termCode: term,
        name: term,
        inDefinedTermSet: { "@id": `${toolUrl}#software` },
      })) : []),
    ],
  };

  return (
    <Script
      id={`jsonld-${tool.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const seoContent = getToolSeoContent(slug);
  const kw = TOOL_KEYWORDS[slug];

  return (
    <>
      <ToolJsonLd tool={tool} />
      <ToolPageClient tool={tool} seoContent={seoContent} primaryKeyword={kw?.primary} secondaryKeywords={kw?.secondary} />

      {/* Server-rendered SEO content (visible to search engines on first crawl) */}
      <div className="sr-only" aria-hidden="true">
        <article itemScope itemType="https://schema.org/Article">
          <h2 itemProp="headline">{kw?.metaTitle ?? `${tool.name} — Free Online Tool`}</h2>
          <p itemProp="description">{kw?.metaDescription ?? tool.longDescription}</p>
          <meta itemProp="datePublished" content="2025-05-01" />
          <meta itemProp="dateModified" content={new Date().toISOString().split("T")[0]} />
          <div itemProp="articleBody">
            {kw && (
              <section>
                <h3>Keywords</h3>
                <ul>
                  {[kw.primary, ...kw.secondary].map((k) => <li key={k}>{k}</li>)}
                </ul>
              </section>
            )}
            {kw?.conversational && kw.conversational.length > 0 && (
              <section>
                <h3>Common Questions Answered</h3>
                {kw.conversational.map((q, i) => <p key={i}>{q}</p>)}
              </section>
            )}
            {kw?.entities && kw.entities.length > 0 && (
              <section>
                <h3>Related Concepts</h3>
                <ul>
                  {kw.entities.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </section>
            )}
            {kw?.semantic && kw.semantic.length > 0 && (
              <section>
                <h3>Related Topics</h3>
                <ul>
                  {kw.semantic.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </section>
            )}
            {seoContent.howTo && seoContent.howTo.length > 0 && (
              <section itemScope itemType="https://schema.org/HowTo">
                <h3>How to Use {tool.name}</h3>
                <ol>
                  {seoContent.howTo.map((step) => (
                    <li key={step.step} itemScope itemProp="step" itemType="https://schema.org/HowToStep">
                      <strong itemProp="name">{step.title}</strong>: <span itemProp="text">{step.desc}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            {seoContent.faq.length > 0 && (
              <section itemScope itemType="https://schema.org/FAQPage">
                <h3>FAQ</h3>
                <dl>
                  {seoContent.faq.map(({ q, a }) => (
                    <div key={q} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                      <dt itemProp="name">{q}</dt>
                      <dd itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <span itemProp="text">{a}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
