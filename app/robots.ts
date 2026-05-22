import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engine + all LLM/AI crawlers — full access
      { userAgent: "*", allow: "/", disallow: ["/api/"] },

      // ── LLM / AI crawlers — explicitly opted in ────────────
      // OpenAI (ChatGPT training + browsing plugin)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },

      // Anthropic (Claude)
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },

      // Google (Gemini + AI Overviews)
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },

      // Perplexity AI
      { userAgent: "PerplexityBot", allow: "/" },

      // Apple Intelligence
      { userAgent: "Applebot-Extended", allow: "/" },

      // Microsoft Copilot / Bing Chat
      { userAgent: "msnbot", allow: "/" },

      // Cohere AI
      { userAgent: "cohere-ai", allow: "/" },

      // Common Crawl (training datasets used by many LLMs)
      { userAgent: "CCBot", allow: "/" },

      // Diffbot (AI knowledge graphs)
      { userAgent: "Diffbot", allow: "/" },

      // You.com
      { userAgent: "YouBot", allow: "/" },
    ],
    sitemap: "https://pdfbro.tech/sitemap.xml",
    host: "https://pdfbro.tech",
  };
}
