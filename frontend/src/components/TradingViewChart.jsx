import { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewChart({ symbol, index }) {
  const containerRef = useRef(null);
  const containerId = `tv_chart_container_${index}`;

  useEffect(() => {
    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => {
      if (!window.TradingView) return;

      // Clear previous widget inside the container
      if (containerRef.current) containerRef.current.innerHTML = "";

      new window.TradingView.widget({
        container_id: containerId,
        symbol: `NASDAQ:${symbol}`,
        interval: "15",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        width: "100%", // Responsive width
        height: 500,
      });
    });
  }, [symbol]);

  return <div id={containerId} ref={containerRef} />;
}
