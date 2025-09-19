import React from "react";
import ChartBox from "./ChartBox";

export default function DashboardGrid({ symbols }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "20px",
        gap: "20px",
      }}
    >
      {symbols.map((sym, idx) => (
        <ChartBox key={idx} symbol={sym} index={idx} />
      ))}
    </div>
  );
}