import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getPackages } from "@/services/PackageService";
import type { IPackageModel } from "@/models/PackageModel";
import truckIcon from "@/assets/icons8-camion-60.png"
import L from "leaflet";

const MultipleMarkersMap = () => {
  const [currentPos, setCurrentPos] = useState<[number, number] | null>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const myLocationIcon = L.icon({
    iconUrl: truckIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
  });

  // 1. Obtener ubicación del dispositivo
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocalización no soportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPos([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Error obteniendo ubicación:", err);
        // fallback si falla
        setCurrentPos([12.1544, -86.2738]);
      }
    );
  }, []);

  // 2. Cargar paquetes de la API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();

        const mapped = data
          .filter(
            (p: IPackageModel) =>
              p.latitudeDestination !== null &&
              p.longitudeDestination !== null
          )
          .map((p: IPackageModel) => ({
            id: p.id,
            sender: p.sender,
            recipient: p.recipient,
            weight: p.weight,
            contentType: p.contentType,
            position: [p.latitudeDestination, p.longitudeDestination] as [number, number]
          }));

        setLocations(mapped);
      } catch (error) {
        console.error("Error cargando paquetes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // 3. Esperar ubicación + paquetes
  if (!currentPos || loading) {
    return <p>Cargando mapa...</p>;
  }

  return (
    <MapContainer
      center={currentPos}
      zoom={14}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marcador de tu ubicación */}
      <Marker position={currentPos} icon={myLocationIcon}>
        <Popup>
          <p>📍 Estás aquí</p>
          <a target="_blank" href="https://icons8.com/icon/mVkN3e9mdEQJ/truck">Camión</a> icono de <a target="_blank" href="https://icons8.com">Icons8</a>
        </Popup>
      </Marker>

      {/* Marcadores de los paquetes */}
      {locations.map((loc) => (
        <Marker key={loc.id} position={loc.position}>
          <Popup>
                <p>Id: {loc.id}</p>
                <p>Enviado por: {loc.sender}</p>
                <p>Receptor: {loc.recipient}</p>
                <p>Peso: {loc.weight}</p>
                <p>Tipo de contenido:{loc.contentType}</p>
              </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MultipleMarkersMap;
