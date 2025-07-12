require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080;

const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { loadStops, stopsMap } = require("./parseStops");

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


    const matchedStops = [];

    for (const entity of feed.entity) {
      if (!entity.tripUpdate?.stopTimeUpdate) continue;

      for (const stopUpdate of entity.tripUpdate.stopTimeUpdate) {
        const stop = stopsMap.get(stopUpdate.stopId);
        if (stop) {
          matchedStops.push({
            stopId: stopUpdate.stopId,
            arrival: stopUpdate.arrival?.time || null,
            departure: stopUpdate.departure?.time || null,
            name: stop.name,
            lat: stop.lat,
            lon: stop.lon
          });
        }
      }
    }
    // Remove duplicateds by stopId.
    const uniqueStops = Array.from(
      new Map(matchedStops.map(stop => [stop.stopId, stop])).values()
    );

    res.json({ message: "GTFS-RT data fetched", stops: uniqueStops });

  } catch (error) {
    console.error("Error fetching GTFS-RT:", error);
    res.status(500).json({ error: "Failed to fetch GTFS-RT" });
  }
});

loadStops(() => {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
});




