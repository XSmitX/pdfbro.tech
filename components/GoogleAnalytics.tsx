// ============================================================
// Google Analytics 4 — loaded via next/script for optimal perf.
//
// Strategy "afterInteractive" loads the GA library after the
// page becomes interactive — doesn't block initial paint.
// ============================================================

import Script from "next/script";

const GA_ID = "G-63GGFRVTGX";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
