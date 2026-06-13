/**
 * PDFBro API Backend Server
 * ==========================
 * Handles server-side conversion tools that can't run in the browser.
 * Deploy separately from the static site. Point Nginx to reverse-proxy
 * /api/ requests to this server.
 *
 * Security features:
 *   - busboy-based multipart parsing (prevents boundary injection)
 *   - CORS origin allowlist
 *   - Per-IP rate limiting (sliding window)
 *   - Magic-byte file validation
 *   - Spawn with args array (no shell injection)
 *   - Isolated temp directories (0700 permissions)
 *   - Automatic temp file cleanup in finally block
 *   - Generic error messages (no stderr leakage)
 *   - Request body size limit (prevents memory exhaustion)
 *   - Passwords passed via environment variables (not CLI args)
 *
 * Requirements:
 *   - Node.js 20+
 *   - Python 3 + PyMuPDF + pdf2docx + openpyxl + python-pptx
 *   - LibreOffice (headless) or Microsoft Word (for Word conversion)
 *   - ffmpeg (for GIF/MP4 conversion)
 *
 * Usage:
 *   node server.js
 *   API_PORT=3001 node server.js
 */

const http = require("http");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const PORT = parseInt(process.env.API_PORT || "3001", 10);
const SCRIPTS_DIR = path.join(__dirname, "scripts");
const TMP_DIR = path.join("/tmp", "pdfbro-api");
const MAX_BODY_SIZE = 160 * 1024 * 1024; // 160 MB max request body

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { mode: 0o700, recursive: true });
}

const ALLOWED_ORIGINS = new Set([
  "https://pdfbro.tech",
  "https://www.pdfbro.tech",
]);
const DEV_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
];

const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60000;
  const maxRequests = 10;
  const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > entry.resetTime) { entry.count = 1; entry.resetTime = now + windowMs; }
  else { entry.count++; }
  rateLimitMap.set(ip, entry);
  if (Math.random() < 0.01) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }
  return entry.count <= maxRequests;
}

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers["x-real-ip"] || req.headers["cf-connecting-ip"] || req.socket.remoteAddress || "unknown";
}

function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  for (const p of DEV_ORIGIN_PATTERNS) { if (p.test(origin)) return true; }
  return false;
}

function secureRandomId() {
  return crypto.randomBytes(16).toString("hex");
}

function sanitizeFilename(name) {
  const base = name.replace(/^.*[\\/]/, "");
  let cleaned = base.replace(/[^\w\-. ()]/g, "_").replace(/_+/g, "_").replace(/^\.+/, "");
  if (cleaned.length > 100) {
    const dotIdx = cleaned.lastIndexOf(".");
    const ext = dotIdx > 0 ? cleaned.slice(dotIdx) : "";
    cleaned = cleaned.slice(0, 100 - ext.length) + ext;
  }
  return cleaned || "file";
}

const MAGIC_BYTES = {
  pdf: [0x25, 0x50, 0x44, 0x46],
  png: [0x89, 0x50, 0x4e, 0x47],
  jpg: [0xff, 0xd8, 0xff],
  gif: [0x47, 0x49, 0x46, 0x38],
  webp: [0x52, 0x49, 0x46, 0x46],
  mp4: null,
  docx: [0x50, 0x4b, 0x03, 0x04],
  doc: [0xd0, 0xcf, 0x11, 0xe0],
};

function validateMagicBytes(buf, type) {
  const sig = MAGIC_BYTES[type];
  if (!sig) return true;
  if (buf.length < sig.length) return false;
  if (type === "webp") {
    if (sig.some((b, i) => buf[i] !== b)) return false;
    return buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50;
  }
  return sig.every((b, i) => buf[i] === b);
}

function runPython(scriptName, args, envVars, timeoutMs) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(SCRIPTS_DIR, scriptName);
    if (!fs.existsSync(scriptPath)) return reject(new Error("Script not found"));
    const child = spawn("python3", [scriptPath, ...args], {
      timeout: timeoutMs,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PYTHONUNBUFFERED: "1", ...envVars },
    });
    let stdout = "";
    child.stdout.on("data", (d) => { stdout += d.toString(); });
    child.stderr.on("data", () => {}); // discard stderr
    child.on("close", (code) => {
      if (code === 0 && stdout.includes("SUCCESS")) resolve(stdout);
      else reject(new Error("Conversion failed"));
    });
    child.on("error", () => reject(new Error("Conversion service unavailable")));
  });
}

const ROUTES = {
  "/api/convert/pdf-to-word": {
    script: "convert_pdf_to_word.py",
    inputType: "pdf", outputExt: ".docx",
    outputMime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    timeout: 85000,
  },
  "/api/convert/word-to-pdf": {
    script: "convert_word.py",
    inputType: "docx", outputExt: ".pdf",
    outputMime: "application/pdf",
    timeout: 55000,
    altDocType: "doc",
  },
  "/api/convert/pdf-to-excel": {
    script: "convert_pdf_to_excel.py",
    inputType: "pdf", outputExt: ".xlsx",
    outputMime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    timeout: 85000,
  },
  "/api/convert/pdf-to-powerpoint": {
    script: "pdf_to_pptx.py",
    inputType: "pdf", outputExt: ".pptx",
    outputMime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    timeout: 110000,
  },
  "/api/convert/gif-to-mp4": {
    script: "convert_gif_to_mp4.py",
    inputType: "gif", outputExt: ".mp4",
    outputMime: "video/mp4",
    timeout: 85000,
  },
  "/api/convert/mp4-to-gif": {
    script: "convert_mp4_to_gif.py",
    inputType: "mp4", outputExt: ".gif",
    outputMime: "image/gif",
    timeout: 110000,
  },
  "/api/protect/pdf": {
    script: "protect_pdf.py",
    inputType: "pdf", outputExt: ".pdf",
    outputMime: "application/pdf",
    timeout: 30000,
    needsPassword: true,
  },
  "/api/unlock/pdf": {
    script: "unlock_pdf.py",
    inputType: "pdf", outputExt: ".pdf",
    outputMime: "application/pdf",
    timeout: 30000,
    needsPassword: true,
  },
};

function sendError(res, status, message, headers) {
  res.writeHead(status, Object.assign({
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  }, headers || {}));
  res.end(JSON.stringify({ error: message }));
}

function parseMultipartFormData(req, callback) {
  let busboy;
  try {
    busboy = require("busboy");
  } catch {
    return callback(new Error("Server misconfiguration"));
  }

  const bb = busboy({
    headers: req.headers,
    limits: { fileSize: MAX_BODY_SIZE, files: 1, fields: 2 },
  });

  const result = { file: null, fileName: "", fields: {} };

  bb.on("file", (fieldname, stream, info) => {
    const { filename, mimeType } = info;
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("limit", () => {
      stream.destroy();
      callback(new Error("File too large"));
    });
    stream.on("end", () => {
      result.file = Buffer.concat(chunks);
      result.fileName = filename;
    });
    stream.on("error", () => callback(new Error("Upload interrupted")));
  });

  bb.on("field", (name, val) => {
    if (Object.keys(result.fields).length < 5) {
      result.fields[name] = val;
    }
  });

  bb.on("finish", () => callback(null, result));
  bb.on("error", (err) => callback(err));

  req.pipe(bb);
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin;
  const corsHeaders = {};
  if (origin && isAllowedOrigin(req)) {
    corsHeaders["Access-Control-Allow-Origin"] = origin;
    corsHeaders["Vary"] = "Origin";
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      ...corsHeaders,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    });
    return res.end();
  }

  if (req.method !== "POST") {
    return sendError(res, 405, "Method not allowed", corsHeaders);
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = ROUTES[url.pathname];

  if (!route) {
    return sendError(res, 404, "Endpoint not found", corsHeaders);
  }

  if (!isAllowedOrigin(req)) {
    return sendError(res, 403, "Origin not allowed", corsHeaders);
  }

  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    return sendError(res, 429, "Too many requests. Please wait a moment.", corsHeaders);
  }

  parseMultipartFormData(req, async (err, parsed) => {
    if (err) {
      return sendError(res, 400, err.message, corsHeaders);
    }

    if (!parsed || !parsed.file) {
      return sendError(res, 400, "No file uploaded", corsHeaders);
    }

    try {
      const fileBuffer = parsed.file;
      const originalName = sanitizeFilename(parsed.fileName || "file");

      if (!validateMagicBytes(fileBuffer, route.inputType)) {
        if (route.altDocType && validateMagicBytes(fileBuffer, route.altDocType)) {
          // fallback: alternate type matches
        } else {
          return sendError(res, 400, "File contents do not match the expected file type", corsHeaders);
        }
      }

      const tempId = secureRandomId();
      const tempDir = path.join(TMP_DIR, tempId);
      fs.mkdirSync(tempDir, { mode: 0o700 });

      const inputPath = path.join(tempDir, originalName);
      const outputName = originalName.replace(/\.[^.]+$/, "") + route.outputExt;
      const outputPath = path.join(tempDir, outputName);

      fs.writeFileSync(inputPath, fileBuffer, { mode: 0o600 });

      try {
        const envVars = {};
        if (route.needsPassword && parsed.fields.userPassword) {
          envVars.PDFBRO_USER_PASSWORD = String(parsed.fields.userPassword).replace(/\0/g, "");
          if (parsed.fields.ownerPassword) {
            envVars.PDFBRO_OWNER_PASSWORD = String(parsed.fields.ownerPassword).replace(/\0/g, "");
          }
        }

        await runPython(route.script, [inputPath, outputPath], envVars, route.timeout);

        if (!fs.existsSync(outputPath)) {
          throw new Error("Output file not generated");
        }

        const outputData = fs.readFileSync(outputPath);
        res.writeHead(200, {
          ...corsHeaders,
          "Content-Type": route.outputMime,
          "Content-Disposition": `attachment; filename="${outputName}"`,
          "Content-Length": String(outputData.length),
          "Cache-Control": "no-store",
        });
        res.end(outputData);
      } finally {
        try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
      }
    } catch (err2) {
      sendError(res, 500, "Unable to process this file. It may be corrupted, encrypted, or in an unsupported format.", corsHeaders);
    }
  });
});

// Check if busboy is available before starting
try {
  require.resolve("busboy");
} catch {
  console.error("ERROR: 'busboy' package is required. Install it with: npm install busboy");
  console.error("The server will start but multipart parsing will fail.");
}

server.listen(PORT, "127.0.0.1", () => {
  console.log(`PDFBro API server running on http://127.0.0.1:${PORT}`);
  console.log(`Endpoints: ${Object.keys(ROUTES).length} routes configured`);
});
