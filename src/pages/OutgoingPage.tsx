import { useEffect, useState } from "react";
import type { IShipmentModel } from "../models/shipment";
import { ColumnsShipment } from "../components/ColumnsShipment";
import { DataTable } from "../components/DataTable";
import { getShipments } from "../services/ShipmentService";

export default function OutgoingPage() {
  const [shipments, setShipments] = useState<IShipmentModel[]>([]);
  const [loadingShipments, setLoadingShipments] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await getShipments("origin");
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
      <h1>Salientes</h1>
      {loadingShipments ? 
        <p>Cargando datos...</p> :
        <div className="container py-10">
          <DataTable columns={ColumnsShipment} data={shipments} />
        </div>
      }
    </>
  )
}