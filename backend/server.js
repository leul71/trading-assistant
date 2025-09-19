import express, { response } from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";



dotenv.config();
console.log("Loaded Polygon API key:", process.env.POLYGON_API_KEY);

const app = express();
app.use(cors()); // Allow frontend calls
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.POLYGON_API_KEY;



app.get("/api/test", async (req, res) => {
  const symbol = "AAPL"; // Hardcoded for testing
  const date = new Date().toISOString().slice(0, 10);
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${API_KEY}`;
    console.log("Fetching from Polygon API:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Polygon API raw response:", JSON.stringify(data, null, 2));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// this endpoint fetches the previous close price for a given stock symbol
// need to work more on querry
app.get("/api/stocks/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  // const date = new Date().toISOString().slice(0, 10); // today's date YYYY-MM-DD

  const today = new Date();
  today.setDate(today.getDate() - 1); // yesterday
  const date = today.toISOString().slice(0, 10);

  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${API_KEY}`;
  console.log("Fetching prev close:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error("Polygon error:", data);
      return res.status(response.status).json(data); // forward exact error
    }

    return res.json(data);
  } catch (err) {
    console.error("Backend fetch error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// this endpouint fetches yesterdays daily OHLC 
app.get("/api/stocks/:symbol/open-close", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const today = new Date();
  today.setDate(today.getDate() -1);
  const date = today.toISOString().slice (0, 10);

  const url = `https://api.polygon.io/v1/open-close/${symbol}/${date}?adjusted=true&apiKey=${API_KEY}`;
  console.log("Fetching open-close:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok){
      const text = await response.text();
      console.error("Polygon error text:", text);
      return res.status(response.status).json({ error: text });
    }

    return res.json(data);
  } catch (err) {
    console.error("Backend fetch error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
