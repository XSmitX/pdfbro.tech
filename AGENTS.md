<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-context -->
# PDFBro — Project Context

## What This Is
**PDFBro** is a production SaaS platform offering free online PDF & image processing tools. Browser-first architecture (~90% of tools process files locally, never touching the server). Zero signup, no watermarks, no daily limits. Competes with iLovePDF, Smallpdf, Adobe Acrobat. Live at https://pdfbro.tech.

## Tech Stack
- **Framework:** Next.js 16.2.4 (App Router + Static Export)
- **Build:** `output: 'export'` → fully static HTML/CSS/JS (no Node.js server needed)
- **UI:** React 19.2.4 + Tailwind CSS 4 + Framer Motion 12 + Lucide React
- **PDF (client):** pdf-lib ^1.17.1, pdfjs-dist ^5.6.205
- **Image:** browser-image-compression ^2.0.2
- **Archival:** JSZip ^3.10.1
- **Word:** mammoth ^1.12.0 (DOCX→HTML), html-docx-js ^0.3.1
- **Server-side (separate backend):** Python 3 (PyMuPDF, pdf2docx, openpyxl, python-pptx) + LibreOffice + ffmpeg
- **Hosting:** Static files on Nginx, separate backend for 6 API endpoints
- **No test framework configured**

## Build & Deploy (Static Export)

```bash
npm run build     # Builds to /out/ directory (static HTML/CSS/JS)
```

The site builds as a fully static export. No Node.js server needed at runtime for ~90% of functionality.

### Static Export Architecture
- **`output: 'export'`** in next.config.ts — generates static files in `/out/`
- **`images: { unoptimized: true }`** — required for static export
- **`trailingSlash: true`** — proper static file routing
- **API routes** — not included in static export. 6 conversion tools need a separate backend
- **Middleware** — not active in static export. Security headers set via Nginx
- **Security headers** — defined in next.config.ts for documentation; applied at Nginx level

### Nginx Hosting — Required Config
See `DEPLOYMENT.md` for full Nginx config. Key points:
- Serve `/out/` as root directory
- Add security headers (CSP, HSTS, X-Frame-Options, etc.) at Nginx level
- Block exploit-probe paths
- Cache static assets aggressively (immutable for hashed files)
- Gzip/brotli compression on

### Backend API Server
For the 6 server-side conversion tools (PDF→Word, Word→PDF, PDF→Excel, PDF→PPT, GIF→MP4, MP4→GIF), deploy `scripts/` and `app/api/` as a separate Python/Node.js backend service. The static site calls this backend via the API routes' URL patterns.

## Key Scripts
| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (next dev --webpack) |
| `npm run build` | Production static build → /out/ |
| `npm start` | Start production server (if not using static export) |
| `npm run lint` | ESLint check |

## Architecture Principles

### 1. Browser-First Processing
Tools under `modules/tools/` run purely client-side. Only 6 conversion tools (PDF↔Word, PDF→Excel, PDF→PPT, GIF↔MP4) go through a separate backend. NEVER push client-capable processing to the server.

### 2. Tool Pattern
Every tool follows this strict pattern:
- **Logic:** `modules/tools/toolName.ts` — pure processing function
- **UI:** `modules/ui/ToolNameTool.tsx` — DropZone → process → ResultPanel
- **Config:** Entry in `lib/toolRegistry.ts` (slug, name, description, category, icon, color, maxFileSize, maxFiles, tags, acceptedTypes)
- **Page:** `app/tools/[slug]/page.tsx` (dynamic route with `generateStaticParams`)
- **Client page:** `app/tools/[slug]/ToolPageClient.tsx` (lazy-loads tool UI)

### 3. Adding a New Tool Checklist
1. Create `modules/tools/newTool.ts` processing logic
2. Create `modules/ui/NewToolTool.tsx` UI component
3. Add tool config to `lib/toolRegistry.ts`
4. Add FAQ content to `lib/toolFaq.ts`
5. Add SEO keywords to `lib/seo/keywords.ts` (all 7 keyword layers)
6. Add icon mapping in `ToolPageClient.tsx`'s TOOL_COMPONENT_MAP
7. Run `npm run build` to verify static generation

### 4. SEO/GEO/AEO Architecture (7-Layer Keyword Framework)
Every tool page has 7 keyword layers for comprehensive search optimization:
1. **Primary** — H1, title tag target
2. **Secondary** — H2s, meta, body headings
3. **Long-tail** — FAQ, detailed content
4. **Questions** — AEO: voice search, "People Also Ask" targeting
5. **Entities** — GEO: related concepts for AI context
6. **Conversational** — GEO: natural language for AI crawlers
7. **Semantic** — LSI & co-occurring terms

Structured data on every page:
- WebPage, SoftwareApplication, FAQPage, HowTo, BreadcrumbList
- AggregateRating + Review (GEO trust signal)
- DefinedTerm for entity disambiguation
- SpeakableSpecification for voice search

### 5. SEO Content Files
| File | Purpose |
|---|---|
| `lib/seo/keywords.ts` | 7-layer keyword framework for all tools + categories |
| `lib/seo/jsonld.ts` | Centralized JSON-LD schema generators |
| `lib/toolFaq.ts` | Per-tool FAQ and HowTo content |
| `lib/toolRegistry.ts` | Tool configurations |
| `public/llms.txt` | AI crawler reference (tools, facts, comparisons) |
| `public/llms-full.txt` | Complete AI training reference |

### 6. Security Rules (NEVER VIOLATE)
- All API routes MUST call `guardApiRequest()` from `lib/security/apiGuard.ts` before processing
- Server-side conversions MUST use `securePythonConvert()` from `lib/security/pythonConvert.ts` (spawn with args array, isolated temp dir, auto cleanup)
- File uploads MUST pass magic-byte validation via `validateFile()` in `lib/security/validation.ts`
- Never use shell:true in subprocess execution
- Never leak file paths, stderr, or internal errors to client
- Rate limiting: 10 req/min, 100 req/hour per IP (in-memory sliding window)
- CORS: explicit origin allowlist only — pdfbro.tech, www.pdfbro.tech, localhost for dev
- For static export: security headers applied via Nginx, not Next.js config

### 7. Directory Structure
```
app/          — Next.js App Router (pages, layouts)
 ├── api/     — API route handlers (not in static export)
 ├── tools/   — Tool listing + [slug] dynamic tool pages
  ├── guides/  — SEO how-to guide pages
 ├── vs/      — Competitor comparison pages
 └── for/     — Audience landing pages
components/   — 13 shared React components
hooks/        — useFileUpload, useToolLimit
lib/          — Core library
 ├── security/  — apiGuard, cors, rateLimit, validation, pythonConvert
 ├── seo/       — keywords.ts, jsonld.ts
 ├── guides/    — 6 guide data files + aggregator
 ├── toolRegistry.ts — Central tool config
 ├── utils.ts       — 20+ utilities
 └── ...
modules/
 ├── tools/    — 22 browser-side processing modules (logic only)
 └── ui/       — 42 tool UI components
scripts/       — 10 Python scripts for server-side conversion
public/        — Static assets, favicon, llms.txt, llms-full.txt, security.txt
out/           — Static export output (gitignored)
```

### 8. Code Conventions
- TypeScript throughout, strict types in `lib/types.ts`
- Tailwind v4 with PostCSS (`@tailwindcss/postcss` plugin)
- Use `cn()` from `lib/utils.ts` for class merging (clsx + tailwind-merge)
- React components: functional, hooks-based
- Icons: lucide-react only
- Use `"use client"` directive only where browser APIs are needed
- Tool pages: server component for metadata/SEO, client component for interactivity
- No emojis in code (unless in SEO content)
- No comments unless critical
- Read `node_modules/next/dist/docs/` before writing Next.js-specific code

### 9. Key Files Reference
| Need | File |
|---|---|
| Add/change a tool | `lib/toolRegistry.ts` |
| Tool FAQ content | `lib/toolFaq.ts` |
| SEO/GEO/AEO keywords | `lib/seo/keywords.ts` |
| JSON-LD schemas | `lib/seo/jsonld.ts` |
| Shared types | `lib/types.ts` |
| Utility functions | `lib/utils.ts` |
| PDF utils | `lib/pdfUtils.ts` |
| AI crawler reference | `public/llms.txt` + `public/llms-full.txt` |
| Security policy | `SECURITY.md` |
| Deployment guide | `DEPLOYMENT.md` |
<!-- END:project-context -->
