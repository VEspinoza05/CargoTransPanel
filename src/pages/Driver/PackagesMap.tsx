import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getPackages } from "@/services/PackageService";
import type { IPackageModel } from "@/models/PackageModel";

const MultipleMarkersMap = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        console.log("Paquetes cargados:", data);

        const mappedLocations = data
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

        setLocations(mappedLocations);
      } catch (error) {
        console.error("Error al cargar los envíos:", error);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="container">
      {loadingPackages ? (
        <p>Cargando datos...</p>
      ) : (
        <div>
        <MapContainer
          center={[12.1544, -86.2738]}
          zoom={13}
          style={{ width: "100%", height: "800px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
        </div>
      )}
    </div>
  );
};

export default MultipleMarkersMap;
