require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080;

const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// ✅ Parse JSON request bodies
app.use(express.json());


app.post("/api/coordinates", async (req, res) => {
  const { start, end } = req.body;
  console.log("Received coordinates:", start, end);

  try {
    const response = await fetch("https://api.nationaltransport.ie/gtfsr/v2/gtfsr", {
      headers: {
        "x-api-key": process.env.NTA_API_KEY
      }
    });
    if (!response.ok) {
      const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
      process.exit(1);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));


    const filteredEntities = feed.entity.filter(e => {
      return e.tripUpdate || e.vehicle;
    });

    res.json({ message: "GTFS-RT data fetched", updates: filteredEntities });
  } catch (error) {
    console.error("Error fetching GTFS-RT:", error);
    res.status(500).json({ error: "Failed to fetch GTFS-RT" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


