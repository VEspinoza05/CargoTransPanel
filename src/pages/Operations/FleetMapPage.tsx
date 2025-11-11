import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995470.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -35],
});

interface Truck {
  id: string;
  name: string;
  status: string;
  lat: number;
  lng: number;
  route?: string;
  vehicleLicensePlate: string;
}

export default function FleetMapPage() {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    const fetchTrucks = async () => {
      const mockData: Truck[] = [
        { id: "T-001", name: "Camión 1", status: "En ruta", lat: 12.1364, lng: -86.2514, route: "Managua - León", vehicleLicensePlate: "M123987" },
        { id: "T-002", name: "Camión 2", status: "Detenido", lat: 12.1048, lng: -85.3645, route: "León - Chinandega", vehicleLicensePlate: "CZ9282"  },
        { id: "T-003", name: "Camión 3", status: "En ruta", lat: 12.4429, lng: -86.8780, route: "Chinandega - Managua", vehicleLicensePlate: "CH56222"  },
      ];
      setTrucks(mockData);
    };

    fetchTrucks();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Mapa de ubicación de camiones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] rounded-xl overflow-hidden">
            <MapContainer
              center={[12.1364, -86.2514]}
              zoom={7}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              {trucks.map((truck) => (
                <Marker key={truck.id} position={[truck.lat, truck.lng]} icon={truckIcon}>
                  <Popup>
                    <div className="text-sm">
                      <p><strong>{truck.name}</strong></p>
                      <p>Estado: {truck.status}</p>
                      <p>Ruta: {truck.route}</p>
                      <p>ID: {truck.id}</p>
                      <p>Placa: {truck.vehicleLicensePlate}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}