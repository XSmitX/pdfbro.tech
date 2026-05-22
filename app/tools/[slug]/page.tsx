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

function ToolJsonLd({ tool }: { tool: NonNullable<ReturnType<typeof getToolBySlug>> }) {
  const seoContent = getToolSeoContent(tool.slug);
  const kw = TOOL_KEYWORDS[tool.slug];
  const toolUrl = `${BASE_URL}/tools/${tool.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${toolUrl}#software`,
        name: `${tool.name} — PDFBro`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web, Windows, macOS, Linux, Android, iOS",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: tool.longDescription,
        url: toolUrl,
        provider: { "@type": "Organization", name: "PDFBro", url: BASE_URL },
        browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
        featureList: [...tool.tags, ...(kw?.secondary ?? [])].join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "All Tools", item: `${BASE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: tool.name, item: toolUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: seoContent.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      // HowTo schema for tools with steps
      ...(seoContent.howTo && seoContent.howTo.length > 0 ? [{
        "@type": "HowTo",
        name: `How to use ${tool.name} online free`,
        description: tool.longDescription,
        step: seoContent.howTo.map((step) => ({
          "@type": "HowToStep",
          position: step.step,
          name: step.title,
          text: step.desc,
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
    </>
  );
}
