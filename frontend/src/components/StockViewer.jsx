import React, { useState, useEffect } from "react";
import { getStockPrice } from "../services/marketData";
import TradingViewChart from "./TradingViewChart";
import Header from "./Header";
import SearchBar from "./SearchBar";

export default function StockViewer({ initialSymbol, chartIndex }) {
  const [symbol, setSymbol] = useState(initialSymbol || "AAPL");
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStockPrice(symbol);
      setPriceData(data);
    } catch (e) {
      setError("Failed to fetch stock data");
      setPriceData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [symbol]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20, color: "#ddd" }}>
      <Header />
      <SearchBar onSearch={setSymbol} loading={loading} />

      {error && <div style={{ color: "red" }}>{error}</div>}

      {priceData?.results?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h2>
            {symbol} — Close Price: ${priceData.results[0].c.toFixed(2)}
          </h2>
          <p>Volume: {priceData.results[0].v.toLocaleString()}</p>
          <p>
            Open: ${priceData.results[0].o.toFixed(2)} | High: $
            {priceData.results[0].h.toFixed(2)} | Low: $
            {priceData.results[0].l.toFixed(2)}
          </p>
        </div>
      )}

      <TradingViewChart symbol={symbol} index={chartIndex} />
    </div>
  );
}
