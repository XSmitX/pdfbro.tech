import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/toolRegistry";
import { GUIDES } from "@/lib/guides/index";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdfbro.tech";
  // Static launch date for stable content pages
  const launchDate = new Date("2025-05-01");
  // Date SEO improvements were applied
  const seoUpdateDate = new Date("2026-05-23");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/guides`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.92 },
    { url: `${baseUrl}/pdf-tools`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/image-tools`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/convert-tools`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: launchDate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: launchDate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: launchDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/about`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.5 },
    // Brand + comparison + use-case pages
    { url: `${baseUrl}/features`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/security`, lastModified: launchDate, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/vs/ilovepdf`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/vs/smallpdf`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/vs/adobe-acrobat`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/for/students`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.78 },
    { url: `${baseUrl}/for/business`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.78 },
    { url: `${baseUrl}/for/developers`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.68 },
    // HTML sitemap — Google follows all links from here to discover all 150+ pages
    { url: `${baseUrl}/sitemap-html`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.6 },
    // Alternatives hub — high-traffic "X alternative" keyword
    { url: `${baseUrl}/alternatives`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
  ];

  const HIGH_PRIORITY_TOOL_SLUGS = new Set([
    "merge-pdf", "compress-pdf", "split-pdf", "pdf-to-word", "word-to-pdf",
    "pdf-to-excel", "compress-image", "heic-to-jpg", "qr-code-generator",
    "remove-bg", "image-to-pdf", "pdf-to-image", "sign-pdf", "resize-image",
    "text-to-pdf", "pdf-to-text", "image-to-webp", "add-text-to-image",
    "pdf-to-powerpoint", "edit-pdf",
  ]);

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: seoUpdateDate,
    changeFrequency: "monthly" as const,
    priority: HIGH_PRIORITY_TOOL_SLUGS.has(tool.slug) ? 0.92 : 0.82,
  }));

  // Guide pages — high-competition keywords get 0.92 priority
  const HIGH_PRIORITY_GUIDE_SLUGS = new Set([
    "how-to-merge-pdf", "how-to-compress-pdf", "how-to-convert-pdf-to-word",
    "how-to-compress-images-online", "how-to-convert-heic-to-jpg",
    "how-to-create-qr-code-free", "how-to-remove-image-background",
    "ilovepdf-alternative", "smallpdf-alternative", "adobe-acrobat-alternative-free",
    "best-free-pdf-tools-2025", "best-online-pdf-editor-free",
    "how-to-reduce-pdf-file-size", "compress-pdf-for-email",
  ]);

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: seoUpdateDate,
    changeFrequency: "monthly" as const,
    priority: HIGH_PRIORITY_GUIDE_SLUGS.has(guide.slug) ? 0.92 : 0.82,
  }));

  return [...staticRoutes, ...toolRoutes, ...guideRoutes];
}
