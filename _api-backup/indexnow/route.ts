import { NextResponse } from "next/server";
import { TOOLS } from "@/lib/toolRegistry";
import { GUIDES } from "@/lib/guides/index";

const BASE_URL = "https://pdfbro.tech";
const INDEXNOW_KEY = "pdfbrotech2026seo";

// Static routes
const STATIC_SLUGS = [
  "", "tools", "guides", "pdf-tools", "image-tools", "convert-tools",
  "about", "contact", "faq", "features", "security", "privacy", "terms",
  "sitemap-html", "alternatives",
  "vs/ilovepdf", "vs/smallpdf", "vs/adobe-acrobat",
  "for/students", "for/business", "for/developers",
];

function getAllUrls(): string[] {
  const staticUrls = STATIC_SLUGS.map((s) => s ? `${BASE_URL}/${s}` : BASE_URL);
  const toolUrls = TOOLS.map((t) => `${BASE_URL}/tools/${t.slug}`);
  const guideUrls = GUIDES.map((g) => `${BASE_URL}/guides/${g.slug}`);
  return [...staticUrls, ...toolUrls, ...guideUrls];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // Simple protection — require a secret param so random bots can't trigger submissions
  const secret = searchParams.get("secret");
  if (secret !== INDEXNOW_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const urls = getAllUrls();

  const payload = {
    host: "pdfbro.tech",
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  let results: { engine: string; status: number; ok: boolean }[] = [];

  // Submit to IndexNow aggregator (covers Bing, Yandex, Seznam, Naver, Yep, Mojeek)
  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    results.push({ engine: "IndexNow (Bing/Yandex/others)", status: res.status, ok: res.ok });
  } catch {
    results.push({ engine: "IndexNow", status: 0, ok: false });
  }

  // Submit directly to Bing as well (belt and suspenders)
  try {
    const bingRes = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    results.push({ engine: "Bing", status: bingRes.status, ok: bingRes.ok });
  } catch {
    results.push({ engine: "Bing", status: 0, ok: false });
  }

  return NextResponse.json({
    submitted: urls.length,
    results,
    urls_sample: urls.slice(0, 10),
    message: `Successfully submitted ${urls.length} URLs to search engines via IndexNow.`,
  });
}
