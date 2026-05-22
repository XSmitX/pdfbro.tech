"use client";

import { useEffect } from "react";

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Block right click
    const blockDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    document.addEventListener("contextmenu", blockDefault);

    // 2. Block developer shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        ((e.ctrlKey || e.metaKey) && ["U", "S", "P"].includes(e.key.toUpperCase()))
      ) {
        blockDefault(e);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // 3. Detect DevTools via Debugger Timing
    // Note: We use setTimeout instead of setInterval to avoid memory/CPU accumulation
    // and we increase the delay to 1000ms to reduce overhead.
    let timeoutId: NodeJS.Timeout;
    
    const checkDevTools = () => {
      const start = performance.now();
      (function () {
         
        debugger;
      })();
      
      // If devtools is open, it pauses execution, so elapsed time will be > 100ms
      if (performance.now() - start > 100) {
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        window.location.replace("about:blank");
        return; // Stop checking if triggered
      }
      
      timeoutId = setTimeout(checkDevTools, 1000);
    };

    // Start the check loop
    timeoutId = setTimeout(checkDevTools, 1000);

    // 4. Overwrite console to prevent logging
    const noop = () => {};
    window.console.log = noop;
    window.console.info = noop;
    window.console.warn = noop;
    window.console.error = noop;
    window.console.debug = noop;

    return () => {
      document.removeEventListener("contextmenu", blockDefault);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, []);

  return <>{children}</>;
}
