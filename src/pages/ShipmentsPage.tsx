import { DataTable } from "../components/DataTable";
import { ColumnsShipment } from "../components/ColumnsShipment";
import type { IShipmentModel } from "../models/Shipment";
import { useEffect, useState } from "react";
import { getShipments } from "../services/ShipmentService";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<IShipmentModel[]>([]);
  const [loadingShipments, setLoadingShipments] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await getShipments();
        console.log(JSON.stringify(data))
        setShipments(data);
      } catch (error) {
        console.error("Error al cargar los envios:", error);
      } finally {
        setLoadingShipments(false);
      }
    };

    fetchShipments();
  }, []);

  return(
    <>
      <h1 className="font-bold text-4xl">Envíos</h1>
      {loadingShipments ? 
        <p>Cargando datos...</p> :
        <div className="container py-10">
          <DataTable columns={ColumnsShipment} data={shipments} />
        </div>
      }
    </>
  )
}