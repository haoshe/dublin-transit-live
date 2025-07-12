const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const stopsMap = new Map();
const stopsPath = path.join(__dirname, "gtfs", "stops.txt");

function loadStops(callback){
    fs.createReadStream(stopsPath)
        .pipe(csv())
        .on("data", (row) => {
            if(row.stop_id && row.stop_name && row.stop_lat && row.stop_lon){
                stopsMap.set(row.stop_id, {
                    name: row.stop_name,
                    lat: parseFloat(row.stop_lat),
                    lon: parseFloat(row.stop_lon),
                });
            }
        })
        .on("end", () => {
            console.log("GTFS stops loaded:", stopsMap.size);
            callback?.(stopsMap);
        });
}

module.exports = {loadStops, stopsMap};