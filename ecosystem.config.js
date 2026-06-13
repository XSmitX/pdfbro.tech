module.exports = {
  apps: [
    {
      name: "pdfbro-api",
      script: "server.js",
      cwd: "/home/pdfbro/pdfbro.tech",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        API_PORT: "3003",
      },
      max_memory_restart: "512M",
      error_file: "/home/pdfbro/logs/pdfbro-api-error.log",
      out_file: "/home/pdfbro/logs/pdfbro-api-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      autorestart: true,
      watch: false,
    },
  ],
};
