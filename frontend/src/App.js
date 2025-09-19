import React from "react";
import DashboardGrid from "./components/DashboardGrid";

function App() {
  const defaultSymbols = ["AAPL"];

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <DashboardGrid symbols={defaultSymbols} />
    </div>
  );
}

export default App;
