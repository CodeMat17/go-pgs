"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const universityPosition: [number, number] = [6.46855, 7.52645]; // Exact coordinates

const UniversityMap = () => {
  return (
    <div className='w-full h-[450px] rounded-xl overflow-hidden my-12'>
      <MapContainer
        center={universityPosition}
        zoom={16}
        scrollWheelZoom={true}
        className='w-full h-full'>
        {/* Tile Layer from OpenStreetMap (Free Alternative to Google Maps) */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker for Godfrey Okoye University */}
        <Marker
          position={universityPosition}
          icon={L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Custom Map Pin
            iconSize: [40, 40],
          })}>
          <Popup>
            <strong>Godfrey Okoye University</strong>
            <br />
            Click{" "}
            <a
              href='https://www.google.com/maps/dir/?api=1&destination=6.46855,7.52645'
              target='_blank'
              rel='noopener noreferrer'>
              here
            </a>{" "}
            for directions.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default UniversityMap;
