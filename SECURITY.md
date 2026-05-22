# Security Policy

PDFBro takes security seriously. This document describes our security model, the controls in place, and how to report a vulnerability.

## Reporting a Vulnerability

Email **security@pdfbro.tech** with a description of the issue. Include:

- A clear summary of the vulnerability
- Steps to reproduce
- Affected URL / endpoint / file
- The impact (what an attacker could do)

We aim to respond within **48 hours** and patch confirmed issues within **7 days** for criticals.

Please **do not** publicly disclose until we've had a chance to fix.

---

## Security Architecture

### 1. Browser-First Processing
Approximately 90% of tools (merge, split, compress, sign, rotate, watermark, crop, resize, etc.) run entirely in the user's browser using JavaScript. **Files for these tools never reach our servers.**

### 2. Server-Side Tools — Hardened
The 9 tools that require server processing (PDF-to-Word, Word-to-PDF, PDF-to-Excel, PDF-to-PowerPoint, GIF↔MP4, Protect PDF, Unlock PDF, Word-to-HTML) use these defenses **in order**:

1. **CORS origin allowlist** — only `pdfbro.tech` + `www.pdfbro.tech` + localhost can call the APIs. Other origins get `403`.
2. **Rate limiting** — 10 requests / minute, 100 / hour per IP. Excess gets `429` with `Retry-After`.
3. **File size limit** — server-side magic-byte and size validation. Anything over the per-format limit gets `400`.
4. **Magic-byte validation** — every file is verified by content signature, not just extension. Disguised malware (e.g., `.exe` renamed to `.pdf`) is rejected.
5. **Password validation** — null bytes rejected, length capped at 256, minimum-strength check for protect-pdf.
6. **Subprocess isolation** — Python is invoked via `spawn()` with an **arguments array**, NEVER `exec()` or `shell=True`. Shell metacharacters in user input cannot escape into a shell.
7. **Isolated temp directory** — files written to `/tmp/pdfbro/` with mode 0700, filenames generated with 128-bit cryptographically random IDs.
8. **Automatic cleanup** — every API route cleans up its temp files in a `finally` block, even on error.
9. **Generic error messages** — Python stderr is never returned to the client. Known errors are mapped to clean user-facing messages.

### 3. HTTP Security Headers (every response)

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `Content-Security-Policy` | Strict — `default-src 'self'` + explicit allowlist for CDNs |
| `X-Frame-Options` | `DENY` (no clickjacking) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disables camera, mic, geolocation, etc. |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-origin` |
| `X-Powered-By` | Removed (no server fingerprinting) |

### 4. Probe Blocking
Common exploit-probe paths (`/wp-admin/*`, `/.env`, `/.git/*`, `/phpmyadmin/*`, `*.php`) return 404 immediately via middleware, without leaking that this is a Next.js server.

---

## What's NOT Protected (Out of Scope)

- **Brute-force PDF password cracking** — rate limit prevents automation, but users can manually try multiple passwords on PDFs they own. This is by design.
- **Application-layer DDoS** — rate limiting helps; for sustained DDoS, configure Cloudflare / firewall at the network layer.
- **VPS hardening** — securing the underlying VPS (SSH, fail2ban, ufw) is the operator's responsibility. See `DEPLOYMENT.md`.

---

## What Counts as a Vulnerability

✅ In scope:
- Remote code execution
- SQL injection / command injection
- XSS / CSRF
- Authentication / authorization bypass
- Path traversal
- File upload bypass (uploading a non-allowed file type)
- Sensitive data exposure
- Rate limit bypass

❌ Not in scope:
- Issues that require physical access to the VPS
- Reports based only on theoretical impact without a working PoC
- Missing best-practice headers that have no exploit attached
- "X is misconfigured" without a demonstrated security impact
- Self-XSS (require the victim to paste attack code into devtools)

---

## Security Updates

We deploy security patches as fast as possible. Our process:

1. Verify the report internally
2. Patch the issue
3. Run full test suite
4. Deploy to production within 24h for criticals, 7 days for non-criticals
5. Notify the reporter
6. Add to acknowledgments (with permission)

---

Last updated: 2026-05-22
