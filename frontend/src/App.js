
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:4000/api/stocks/AAPL") // change symbol if you want
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched stock data:", data); // <-- print it to console
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div>
      <h1>Stock Data Test</h1>
      <p>Check the console for results</p>
    </div>
  );
}

export default App;
