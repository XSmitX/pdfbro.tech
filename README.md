# PDFBro

> Free online PDF and image tools. No signup, no watermarks, browser-based.

PDFBro is a privacy-first SaaS platform offering merge, split, compress, convert, sign, OCR, edit, and more PDF and image tools. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Live at [pdfbro.tech](https://pdfbro.tech).

---

## Highlights

- **Tools** — every common PDF and image operation
- **Browser-based** — nearly all tools process files locally; nothing uploaded
- **Zero signup** — no email, no account, no daily limits
- **No watermarks** — output files are clean
- **SEO-optimized** — static pages, structured data on every page, LLM crawlability
- **Production hardened** — strict CORS allowlist, rate limiting, magic-byte file validation, CSP, HSTS

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Webpack) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| PDF | pdf-lib, PDF.js |
| Images | browser-image-compression, JSZip |
| Server-side conversion | Python 3 + PyMuPDF + LibreOffice + ffmpeg |
| Hosting | VPS (Nginx + PM2) |

## Project Structure

```
app/                  # Next.js App Router pages
  api/                # Hardened API routes (Python conversion endpoints)
  guides/[slug]/      # 50+ how-to guides
  tools/[slug]/       # 40+ tool pages
  vs/                 # Competitor comparison pages
  for/                # Audience landing pages
components/           # Shared React components
lib/
  guides/             # Guide content data
  security/           # Rate limiter, CORS guard, file validation, API guard
  seo/                # Keyword maps for SEO
  toolRegistry.ts     # Central tool config (40+ tools)
modules/
  tools/              # Tool logic (browser-side processing)
  ui/                 # Tool UI components
scripts/              # Python scripts for server-side conversions
public/
  llms.txt            # LLM crawler discovery
  .well-known/        # security.txt
middleware.ts         # Global security middleware
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build

# Start production server
npm start
```

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the complete VPS deployment guide including:

- VPS hardening (UFW, fail2ban, SSH lockdown)
- Node 20 + Python 3 + LibreOffice + ffmpeg setup
- PM2 ecosystem config
- Nginx reverse proxy + rate limiting
- Let's Encrypt SSL with auto-renewal
- Production cleanup cron jobs
- Pre-launch security checklist

## Security

See **[SECURITY.md](./SECURITY.md)** for the security architecture:

- Browser-first processing (~90% of tools never touch the server)
- Strict CORS allowlist (no wildcard origins)
- Per-IP rate limiting (10/min, 100/hour)
- Magic-byte file validation (not just extension checks)
- `spawn()` with args arrays for all Python subprocess calls (no shell injection)
- Isolated temp directory with 128-bit random filenames, mode 0600
- Strict Content-Security-Policy + HSTS + Permissions-Policy
- Generic error messages (no stderr leakage)

Report vulnerabilities to **security@pdfbro.tech** (see `/.well-known/security.txt`).

## SEO Features

- Static prerendering for **141+ pages**
- `Organization`, `WebSite` (with SearchAction), `FAQPage`, `HowTo`, `SoftwareApplication`, `BreadcrumbList`, `Article`, `CollectionPage` JSON-LD across the site
- Auto-generated Open Graph images via Next.js `opengraph-image.tsx`
- Sitemap with priority-stratified URLs
- LLM crawler support (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and 14 more) via `robots.ts` + `public/llms.txt`
- Strict canonical URLs on every page

## Development Conventions

- TypeScript strict mode (zero `any` in core code)
- Server components by default; `"use client"` only when interactivity is needed
- All tool logic lives in `modules/tools/`; UI in `modules/ui/`
- Per-tool SEO content in `lib/toolFaq.ts` + `lib/seo/keywords.ts`
- API routes go through `guardApiRequest()` for CORS + rate limit + headers

## Roadmap

- [ ] Real Lighthouse benchmarking on VPS
- [ ] User-submitted tool reviews
- [ ] Optional GitHub Actions CI for typecheck + build
- [ ] Optional monitoring (Sentry, uptime checks)

## License

Proprietary. © 2026 PDFBro. All rights reserved.

## Credits

Designed and developed by **[Smit Panchal](https://smitpanchal.in)**.
