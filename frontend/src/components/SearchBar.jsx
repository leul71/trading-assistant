import React, { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [inputSymbol, setInputSymbol] = useState("AAPL");

  const handleSearch = () => {
    if (inputSymbol.trim()) {
      onSearch(inputSymbol.trim().toUpperCase());
    }
  };

  return (
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
  );
}