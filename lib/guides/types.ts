export type GuideCategory = "pdf" | "image" | "convert" | "usecase" | "alternative";

export interface GuideStep {
  n: number;
  title: string;
  body: string;
}

export interface GuideSection {
  heading: string;
  /** Paragraphs separated by \n\n */
  body: string;
  steps?: GuideStep[];
  list?: string[];
  callout?: { type: "tip" | "warning" | "info"; text: string };
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: GuideCategory;
  badge: string;
  intro: string;
  toolSlug?: string;
  sections: GuideSection[];
  proTips: string[];
  faq: GuideFaq[];
  relatedGuides: string[];
  relatedTools: string[];
  keywords: string[];
}
