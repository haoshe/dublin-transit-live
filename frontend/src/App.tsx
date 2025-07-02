// Import necessary components from React and the Google Maps API
import React, { useRef, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer
} from "@react-google-maps/api";

// Define map container dimensions
const mapContainerStyle = {
  width: "100%",
  height: "500px"
};

// Center the map on Dublin
const center = {
  lat: 53.3498,  // Dublin latitude
  lng: -6.2603   // Dublin longitude
};

const libraries: ("places")[] = ["places"];

const App = () => {

  // TODO: Migrate to @googlemaps/places-webcomponent when Autocomplete is fully deprecated
  // Refs for start and end autocomplete inputs
  const startRef = useRef<google.maps.places.Autocomplete | null>(null);
  const endRef = useRef<google.maps.places.Autocomplete | null>(null);

  // State to store selected locations and route directions
  const [startAddress, setStartAddress] = useState<string | null>(null);
  const [endAddress, setEndAddress] = useState<string | null>(null);
  const [startCoords, setStartCoords] = useState<{lat: number, lng: number} | null>(null);
  const [endCoords, setEndCoords] = useState<{lat: number, lng: number} | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  // Handle selection of start/end locations from Autocomplete
  const handlePlaceChange = (type: "start" | "end") => {
    const ref = type === "start" ? startRef.current : endRef.current;
    const place = ref?.getPlace();
    if (place && place.formatted_address && place.geometry?.location) {
      const address = place.formatted_address;
      const coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      if (type === "start") {
        setStartAddress(address);
        setStartCoords(coords);
        console.log("Start:", address, coords);
      } else {
        setEndAddress(address);
        setEndCoords(coords);
        console.log("End:", address, coords);
      }
    }
  };

  // Call Google Directions API to calculate transit route
  const calculateRoute = () => {
    if (!startCoords || !endCoords) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: startCoords,
        destination: endCoords,
        travelMode: google.maps.TravelMode.TRANSIT,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };
  

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
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

        <button onClick={calculateRoute} style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}>
          Show Transit Route
        </button>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default App;

