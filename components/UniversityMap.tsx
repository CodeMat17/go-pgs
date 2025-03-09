"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "450px",
};

const center = {
  lat: 6.46855,
  lng: 7.52645,
};

export default function UniversityMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="rounded-xl overflow-hidden my-12">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        <Marker
          position={center}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z",
            fillColor: "#2A4365",
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 1.5,
          }}
        />
      </GoogleMap>
    </div>
  );
}
