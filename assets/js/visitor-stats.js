(() => {
  "use strict";

  const loader = document.getElementById("visitor-stats-loader");
  // Count only the canonical production host, never local or Pages previews.
  if (!loader || location.protocol !== "https:" || location.hostname !== loader.dataset.host) return;

  const stats = document.getElementById("visitor-stats");
  let observer;
  let timeout;
  const stopWaiting = () => {
    if (observer) observer.disconnect();
    clearTimeout(timeout);
  };

  if (stats) {
    observer = new MutationObserver(() => {
      const values = ["site_pv", "site_uv"].map((key) =>
        document.getElementById(`busuanzi_value_${key}`).textContent.trim()
      );
      // Reveal the complete row only after both counts arrive successfully.
      if (values.every((value) => /^\d+$/.test(value))) {
        stats.hidden = false;
        stopWaiting();
      }
    });
    observer.observe(stats, { childList: true, subtree: true, characterData: true });
    timeout = setTimeout(stopWaiting, 8000);
  }

  const script = document.createElement("script");
  script.async = true;
  script.dataset.cfasync = "false";
  script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  script.onerror = stopWaiting;
  document.head.appendChild(script);
})();
