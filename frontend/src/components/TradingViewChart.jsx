import { useEffect, useRef } from "react";

export default function TradingViewChart({ symbol, index }) {
  const containerId = `tv_chart_container_${index}`; // unique per instance
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (!window.TradingView) return;
      new window.TradingView.widget({
        container_id: containerId,
        symbol: `NASDAQ:${symbol}`,
        interval: "15",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        width: "700px",
        height: "500px",
      });
    };

    ref.current.innerHTML = ""; // Clear any previous script
    document.head.appendChild(script);
  }, [symbol]);

  return <div id={containerId} ref={ref} />;
}
