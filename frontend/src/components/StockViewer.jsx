import React, { useState, useEffect } from "react";
import { getStockPrice } from '../services/marketData';
import TradingViewChart from './TradingViewChart';


export default function StockViewer({ initialSymbol, chartIndex }) {
  const [symbol, setSymbol] = useState(initialSymbol || "AAPL");
  const [inputSymbol, setInputSymbol] = useState(initialSymbol || "AAPL");
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

  const handleSearch = () => {
    setSymbol(inputSymbol.trim().toUpperCase());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20, color: "#ddd" }}>

      <h1>Trading Assistant Phase 1</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={inputSymbol}
          onChange={(e) => setInputSymbol(e.target.value)}
          placeholder="Enter ticker symbol (e.g. AAPL)"
          style={{
            padding: 8,
            fontSize: 16,
            width: 200,
            marginRight: 10,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            fontSize: 16,
            borderRadius: 4,
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Quote"}
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {priceData && priceData.results && priceData.results.length > 0 && (
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
