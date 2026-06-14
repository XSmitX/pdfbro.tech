import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines + all crawlers — full access, API blocked
      { userAgent: "*", allow: "/", disallow: ["/api/"] },

      // ── OpenAI ─────────────────────────────────────────────
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },

      // ── Anthropic / Claude ─────────────────────────────────
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },

      // ── Google (Gemini + AI Overviews + Search) ────────────
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },

      // ── Microsoft Bing / Copilot ───────────────────────────
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "msnbot", allow: "/" },
      { userAgent: "msnbot-media", allow: "/" },

      // ── Apple (Spotlight + Apple Intelligence) ─────────────
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },

      // ── Perplexity AI ──────────────────────────────────────
      { userAgent: "PerplexityBot", allow: "/" },

      // ── Meta AI / Llama ────────────────────────────────────
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },

      // ── ByteDance / TikTok AI ──────────────────────────────
      { userAgent: "Bytespider", allow: "/" },

      // ── Amazon (Alexa AI, Q) ───────────────────────────────
      { userAgent: "Amazonbot", allow: "/" },

      // ── Cohere AI ──────────────────────────────────────────
      { userAgent: "cohere-ai", allow: "/" },

      // ── Common Crawl (LLM training base) ──────────────────
      { userAgent: "CCBot", allow: "/" },

      // ── AI2 / AllenAI ──────────────────────────────────────
      { userAgent: "AI2Bot", allow: "/" },

      // ── Diffbot (AI knowledge graphs) ─────────────────────
      { userAgent: "Diffbot", allow: "/" },

      // ── You.com ───────────────────────────────────────────
      { userAgent: "YouBot", allow: "/" },

      // ── Timpi AI ──────────────────────────────────────────
      { userAgent: "Timpibot", allow: "/" },

      // ── Brave AI (Leo) ─────────────────────────────────────
      { userAgent: "BraveBot", allow: "/" },

      // ── DuckAssist / DuckDuckGo ────────────────────────────
      { userAgent: "DuckAssistBot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },

      // ── Scrapy / DataForSeo (SEO & AI data) ───────────────
      { userAgent: "DataForSeoBot", allow: "/" },

      // ── Omgili (social/content AI) ────────────────────────
      { userAgent: "omgili", allow: "/" },
    ],
    sitemap: "https://pdfbro.tech/sitemap.xml",
  };
}
