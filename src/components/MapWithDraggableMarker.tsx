import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapWithDraggableMarkerProps{
  coordinatesHandler: (lat:number,lng:number) => void;
}

export default function MapWithDraggableMarker({coordinatesHandler}: MapWithDraggableMarkerProps) {
  const [position, setPosition] = useState({ lat: 12.1364, lng: -86.2514 });

  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    console.log("Nueva posición:", position.lat, position.lng);
    coordinatesHandler(position.lat, position.lng)
    
  }, [position])

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;

      if (marker) {
        const newPos = marker.getLatLng();
        setPosition(newPos);
      }
    }
  };

  return (
    <MapContainer center={position} zoom={14} style={{ height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        draggable={true}
        position={position}
        ref={markerRef}
        eventHandlers={eventHandlers}
      />
    </MapContainer>
  );
}
