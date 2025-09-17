import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function StockChart({ symbol }) {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      try {
        const res = await fetch(`http://localhost:4000/api/stocks/${symbol}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();

        if (!data.results) throw new Error("No data");

        const labels = data.results.map(c => new Date(c.t).toLocaleTimeString());
        const prices = data.results.map(c => c.c);

        setChartData({
          labels,
          datasets: [
            {
              label: `${symbol} Close Price`,
              data: prices,
              borderColor: "blue",
              fill: false,
            },
          ],
        });
      } catch (e) {
        setError(e.message);
      }
    }

    fetchData();
  }, [symbol]);

  if (error) return <div>Error: {error}</div>;
  if (!chartData) return <div>Loading...</div>;

  return <Line data={chartData} />;
}
