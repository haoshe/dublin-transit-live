import React, { useRef, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  Autocomplete
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px"
};

const center = {
  lat: 53.3498,  // Dublin latitude
  lng: -6.2603   // Dublin longitude
};

const App = () => {
  const startRef = useRef<google.maps.places.Autocomplete | null>(null);
  const endRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [startLocation, setStartLocation] = useState<string | null>(null);
  const [endLocation, setEndLocation] = useState<string | null>(null);

  const handlePlaceChange = (type: "start" | "end") => {
    const ref = type === "start" ? startRef.current : endRef.current;
    const place = ref?.getPlace();
    if (place && place.formatted_address) {
      const location = place.formatted_address;
      if (type === "start") {
        setStartLocation(location);
        console.log("Start:", location);
      } else {
        setEndLocation(location);
        console.log("End:", location);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <div style={{ padding: "1rem" }}>
        <h2>Dublin Transit Live</h2>
        <div style={{ marginBottom: "1rem" }}>
          <Autocomplete
            onLoad={(autocomplete) => (startRef.current = autocomplete)}
            onPlaceChanged={() => handlePlaceChange("start")}
          >
            <input
              type="text"
              placeholder="Start location"
              style={{ width: "300px", height: "40px", marginRight: "1rem" }}
            />
          </Autocomplete>

          <Autocomplete
            onLoad={(autocomplete) => (endRef.current = autocomplete)}
            onPlaceChanged={() => handlePlaceChange("end")}
          >
            <input
              type="text"
              placeholder="End location"
              style={{ width: "300px", height: "40px" }}
            />
          </Autocomplete>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
        />
      </div>
    </LoadScript>
  );
};

export default App;

