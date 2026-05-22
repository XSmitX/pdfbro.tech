# PDFBro — VPS Deployment Guide

Complete walk-through for deploying PDFBro on an Ubuntu/Debian VPS with Nginx, PM2, and proper security hardening.

---

## Server Requirements

- **OS:** Ubuntu 22.04 LTS or Debian 12 (recommended)
- **RAM:** 2 GB minimum (4 GB recommended for the Python conversion tools)
- **Disk:** 20 GB minimum
- **CPU:** 2 cores minimum
- **Network:** Public IP, ports 80 + 443 open
- **Domain:** DNS A record pointing `pdfbro.tech` and `www.pdfbro.tech` to your VPS IP

---

## 1. Initial VPS Hardening

Connect as `root` first, then create a deploy user:

```bash
# Create a non-root user
adduser pdfbro
usermod -aG sudo pdfbro

# Copy your SSH key to the new user
rsync --archive --chown=pdfbro:pdfbro ~/.ssh /home/pdfbro

# Lock down SSH (edit /etc/ssh/sshd_config):
#   PermitRootLogin no
#   PasswordAuthentication no
#   Port 22  ← change to a random high port like 2222 if desired
systemctl restart sshd

# Install firewall
apt update && apt install -y ufw fail2ban
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp     # SSH (change if you changed the port)
ufw allow 80/tcp     # HTTP
ufw allow 443/tcp    # HTTPS
ufw enable

# fail2ban — auto-bans IPs that brute-force SSH
systemctl enable --now fail2ban
```

From here on, log in as `pdfbro`, not root.

---

## 2. Install System Dependencies

```bash
# Node.js 20 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs

# Python 3 + pip + venv (for the server-side conversion tools)
sudo apt install -y python3 python3-pip python3-venv

# Python libraries used by the conversion scripts
sudo pip3 install --break-system-packages \
  PyMuPDF \
  python-docx \
  pdf2docx \
  openpyxl \
  python-pptx \
  Pillow \
  mammoth

# ffmpeg (for GIF ↔ MP4 conversion)
sudo apt install -y ffmpeg

# LibreOffice (for Word ↔ PDF conversion — convert_word.py uses this)
sudo apt install -y libreoffice-core libreoffice-writer

# Nginx + Certbot for SSL
sudo apt install -y nginx certbot python3-certbot-nginx

# PM2 process manager
sudo npm install -g pm2
```

---

## 3. Clone & Build PDFBro

```bash
# Pick a location
cd /home/pdfbro
git clone https://github.com/YOUR_ORG/pdfbro.tech.git
cd pdfbro.tech

# Install dependencies (production only)
npm ci

# Build the Next.js production output
npm run build

# Quick test
PORT=3000 npm start
# Should see: ✓ Ready on http://localhost:3000
# Ctrl+C to stop
```

---

## 4. Run with PM2

Create `/home/pdfbro/pdfbro.tech/ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "pdfbro",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/home/pdfbro/pdfbro.tech",
      instances: 1,             // or "max" for cluster mode
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "1G",
      error_file: "/home/pdfbro/logs/pdfbro-error.log",
      out_file: "/home/pdfbro/logs/pdfbro-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      autorestart: true,
      watch: false,
    },
  ],
};
```

Then:

```bash
mkdir -p /home/pdfbro/logs
pm2 start ecosystem.config.js
pm2 save
pm2 startup        # follow the printed instruction (run the sudo command it shows)
```

PM2 will now restart PDFBro on boot, crashes, and memory overflow.

---

## 5. Nginx Reverse Proxy + SSL

Create `/etc/nginx/sites-available/pdfbro.tech`:

```nginx
# ── Rate limiting zones (server-wide) ──
limit_req_zone $binary_remote_addr zone=pdfbro_api:10m rate=10r/m;
limit_req_zone $binary_remote_addr zone=pdfbro_general:10m rate=60r/s;

# ── HTTP → HTTPS redirect ──
server {
    listen 80;
    listen [::]:80;
    server_name pdfbro.tech www.pdfbro.tech;
    return 301 https://$host$request_uri;
}

# ── Main HTTPS server ──
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pdfbro.tech www.pdfbro.tech;

    # SSL — managed by certbot (lines auto-added below by certbot)
    # ssl_certificate /etc/letsencrypt/live/pdfbro.tech/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/pdfbro.tech/privkey.pem;

    # Modern TLS only
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    # Large file uploads (matches the app's max)
    client_max_body_size 150M;
    client_body_timeout 60s;
    proxy_read_timeout 120s;

    # Block exploit probes at Nginx level
    location ~ /(wp-admin|wp-login|xmlrpc\.php|\.env|\.git) {
        deny all;
        return 404;
    }

    # API routes — apply rate limit zone
    location /api/ {
        limit_req zone=pdfbro_api burst=5 nodelay;
        limit_req_status 429;

        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static assets — long cache
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Everything else
    location / {
        limit_req zone=pdfbro_general burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Don't expose Nginx version
    server_tokens off;
}
```

Enable and get SSL:

```bash
sudo ln -s /etc/nginx/sites-available/pdfbro.tech /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# Get + auto-renew Let's Encrypt SSL
sudo certbot --nginx -d pdfbro.tech -d www.pdfbro.tech
# Certbot will offer to redirect HTTP→HTTPS automatically — choose yes.
```

Verify auto-renewal:
```bash
sudo certbot renew --dry-run
```

Cert expires every 90 days. Certbot installs a systemd timer to renew automatically.

---

## 6. Deployment Updates (Future Releases)

```bash
cd /home/pdfbro/pdfbro.tech
git pull origin main
npm ci
npm run build
pm2 reload pdfbro     # zero-downtime reload
pm2 logs pdfbro --lines 50    # confirm clean startup
```

---

## 7. Cleanup Cron (Important)

The API routes clean up temp files after each request, but if a process crashes mid-conversion, stale files can accumulate in `/tmp/pdfbro/`. Add a daily cleanup:

```bash
sudo crontab -e
```

Add:
```
# Delete pdfbro temp files older than 1 hour, hourly
0 * * * * find /tmp/pdfbro/ -type f -mmin +60 -delete 2>/dev/null
```

---

## 8. Monitoring

```bash
pm2 status              # process status
pm2 logs pdfbro         # tail logs
pm2 monit               # CPU/memory dashboard

# Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System resources
htop
df -h
free -h
```

For production observability, consider:
- **Uptime monitoring:** UptimeRobot, BetterUptime
- **Error tracking:** Sentry (add to Next.js)
- **Logs:** Grafana Loki, or just rotate PM2 logs

---

## 9. Security Audit Checklist (Before Going Live)

- [ ] Non-root user created, root SSH disabled
- [ ] SSH key-only login (no passwords)
- [ ] UFW firewall enabled, only 22/80/443 open
- [ ] fail2ban installed and running
- [ ] Nginx server_tokens off
- [ ] SSL certificate installed and auto-renewing
- [ ] HSTS header active (test at hstspreload.org)
- [ ] CSP test at securityheaders.com → should score A or A+
- [ ] CORS test: try POSTing to `/api/protect/pdf` from a different origin → expect 403
- [ ] Rate limit test: hit `/api/protect/pdf` 15 times rapidly → expect 429 after #10
- [ ] Run [ssllabs.com/ssltest](https://ssllabs.com/ssltest) → expect A or A+
- [ ] `security.txt` accessible at `/.well-known/security.txt`
- [ ] Cron job for temp file cleanup
- [ ] PM2 startup script installed (`pm2 startup`)
- [ ] Backup strategy in place (database backups, git for code)

---

## 10. Common Issues

**"502 Bad Gateway" from Nginx**
PM2 process crashed or isn't running. Check `pm2 logs pdfbro`.

**API routes return 500 immediately**
Python isn't installed or a required package is missing. Test directly:
```bash
python3 /home/pdfbro/pdfbro.tech/scripts/unlock_pdf.py
# Should print the usage line, not an ImportError
```

**Word-to-PDF conversion fails**
LibreOffice headless mode may need a writable HOME. The scripts handle this but verify by running:
```bash
libreoffice --headless --convert-to pdf /tmp/test.docx --outdir /tmp/
```

**Rate limit hit too quickly during legitimate use**
Edit `lib/security/rateLimit.ts` and bump `RATE_LIMIT_PER_MINUTE.max` and `RATE_LIMIT_PER_HOUR.max`. Rebuild + reload.

---

## Quick Reference

| Task | Command |
|---|---|
| Deploy update | `git pull && npm ci && npm run build && pm2 reload pdfbro` |
| Check status | `pm2 status` |
| View logs | `pm2 logs pdfbro --lines 100` |
| Restart server | `pm2 restart pdfbro` |
| Reload Nginx | `sudo systemctl reload nginx` |
| Renew SSL | `sudo certbot renew` (auto, but manual works) |
| Disk space | `df -h` |
| Memory | `free -h` |
| Active connections | `ss -tunap` |
