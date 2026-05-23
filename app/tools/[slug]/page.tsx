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

  // Use keyword-optimized title/description if available, else build generic
  const title = kw?.metaTitle ?? `${tool.name} Online Free — ${tool.description} | PDFBro`;
  const description = kw?.metaDescription ?? `${tool.longDescription} 100% free, no signup, no watermarks. Works in your browser instantly — no software to install.`;

  // Build rich keyword list from tool tags + keyword map
  const keywords = [
    ...(kw ? [kw.primary, ...kw.secondary, ...kw.longTail] : []),
    ...tool.tags,
    `${tool.name.toLowerCase()} free`,
    `${tool.name.toLowerCase()} online`,
    "no signup",
    "no watermark",
    "browser-based",
  ].filter((v, i, arr) => arr.indexOf(v) === i); // dedupe

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — Free Online Tool`,
      description,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
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
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${toolUrl}#software`,
        name: `${tool.name} — PDFBro`,
        alternateName: `${tool.name} Online Free`,
        applicationCategory: "UtilitiesApplication",
        applicationSubCategory: tool.category === "pdf" ? "PDF Tools" : tool.category === "image" ? "Image Tools" : "File Conversion",
        operatingSystem: "Web, Windows, macOS, Linux, Android, iOS",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2030-12-31",
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
          name: tool.category === "pdf" ? "Free PDF Tools Online" : tool.category === "image" ? "Free Image Tools Online" : "Free File Conversion Tools",
          url: categoryUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${toolUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "All Tools", item: `${BASE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: tool.name, item: toolUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${toolUrl}#faq`,
        mainEntity: seoContent.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      // HowTo schema for tools with steps
      ...(seoContent.howTo && seoContent.howTo.length > 0 ? [{
        "@type": "HowTo",
        "@id": `${toolUrl}#howto`,
        name: `How to use ${tool.name} online free`,
        description: tool.longDescription,
        inLanguage: "en-US",
        totalTime: "PT2M",
        tool: [{ "@type": "HowToTool", name: "PDFBro", url: BASE_URL }],
        step: seoContent.howTo.map((step) => ({
          "@type": "HowToStep",
          position: step.step,
          name: step.title,
          text: step.desc,
          url: `${toolUrl}#step-${step.step}`,
        })),
      }] : []),
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

      {/* ── Server-rendered SEO content (visible to Google on first crawl) ── */}
      <div className="sr-only" aria-hidden="true">
        <h2>{kw?.metaTitle ?? `${tool.name} — Free Online Tool`}</h2>
        <p>{kw?.metaDescription ?? tool.longDescription}</p>
        {kw && (
          <ul>
            {[kw.primary, ...kw.secondary].map((k) => <li key={k}>{k}</li>)}
          </ul>
        )}
        {seoContent.howTo && seoContent.howTo.length > 0 && (
          <ol>
            {seoContent.howTo.map((step) => (
              <li key={step.step}>
                <strong>{step.title}</strong>: {step.desc}
              </li>
            ))}
          </ol>
        )}
        {seoContent.faq.length > 0 && (
          <dl>
            {seoContent.faq.map(({ q, a }) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </>
  );
}
