import React from "react";
import StockViewer from "./StockViewer";

export default function ChartBox({ symbol, index }) {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        padding: "16px",
        margin: "10px",
        flex: "1 1 400px",
        minWidth: "350px",
        maxWidth: "500px",
        color: "#ddd",
      }}
    >
      <StockViewer initialSymbol={symbol} chartIndex={index} />
    </div>
  );
}
