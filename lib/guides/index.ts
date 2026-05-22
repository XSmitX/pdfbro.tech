export type { GuideData, GuideCategory, GuideSection, GuideStep, GuideFaq } from "./types";

import { PDF_GUIDES } from "./pdf-guides";
import { IMAGE_GUIDES } from "./image-guides";
import { CONVERT_GUIDES } from "./convert-guides";
import { USECASE_GUIDES } from "./usecase-guides";
import { ALTERNATIVE_GUIDES } from "./alternative-guides";
import { LONGTAIL_GUIDES } from "./longtail-guides";
import type { GuideData } from "./types";

export const GUIDES: GuideData[] = [
  ...PDF_GUIDES,
  ...IMAGE_GUIDES,
  ...CONVERT_GUIDES,
  ...USECASE_GUIDES,
  ...ALTERNATIVE_GUIDES,
  ...LONGTAIL_GUIDES,
];

export function getGuideBySlug(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: GuideData["category"]): GuideData[] {
  return GUIDES.filter((g) => g.category === category);
}

export const GUIDE_CATEGORY_META: Record<
  GuideData["category"],
  { label: string; description: string; color: string; accent: string }
> = {
  pdf: {
    label: "PDF Guides",
    description: "How-to guides for every PDF operation",
    color: "#ef4444",
    accent: "rgba(239,68,68,0.12)",
  },
  image: {
    label: "Image Guides",
    description: "Compress, convert, and edit images",
    color: "#8b5cf6",
    accent: "rgba(139,92,246,0.12)",
  },
  convert: {
    label: "Conversion Guides",
    description: "Convert between file formats",
    color: "#0ea5e9",
    accent: "rgba(14,165,233,0.12)",
  },
  usecase: {
    label: "Use Cases",
    description: "Real-world workflows and scenarios",
    color: "#10b981",
    accent: "rgba(16,185,129,0.12)",
  },
  alternative: {
    label: "Comparisons",
    description: "PDFBro vs other PDF tools",
    color: "#f59e0b",
    accent: "rgba(245,158,11,0.12)",
  },
};
