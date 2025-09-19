export async function getStockPrice(symbol = "AAPL") {
  const url = `http://localhost:4000/api/stocks/${symbol}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
    return response.json();
  }
}
