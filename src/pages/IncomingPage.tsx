import { useEffect, useState } from "react";
import type { IShipmentModel } from "../models/Shipment";
import { ColumnsShipment } from "../components/ColumnsShipment";
import { DataTable } from "../components/DataTable";
import { getShipments, updateShipmentState } from "../services/ShipmentService";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";

export default function IncomingPage() {
  const [shipments, setShipments] = useState<IShipmentModel[]>([]);
  const [loadingShipments, setLoadingShipments] = useState(true);

  const handleShipmentStateUpdate = async (shipmentToUpdateId: string, shipmentState: string) => {
    try {
      await updateShipmentState(shipmentToUpdateId, shipmentState);
      console.log("Envio actualizado con exito");
      setShipments((prev) => 
        prev.map((shipment) => 
          shipmentToUpdateId === shipment.shipmentId
          ? { ...shipment, state: shipmentState }
          : shipment
        )
      )
    }
    catch (error) {
      console.error("Error al actualizar el envio:", error);
      alert(error);
    }
  }

  const ColumnsShipmentIncoming: ColumnDef<IShipmentModel>[] = [...ColumnsShipment]
  ColumnsShipmentIncoming.push({
    id:"Actions",
    header:"Acciones",
    cell: ({row}) => {
      const shipmentToUpdate = row.original;

      const stateToSet = shipmentToUpdate.state === "Enviado" ? "Recibido" : "Enviado"

      return(
        <>
          <Button
            onClick={async () => {
              await handleShipmentStateUpdate(shipmentToUpdate.shipmentId, stateToSet);  
            }}
            variant="default"
          >
            {row.original.state === "Enviado" ? "Marcar como recibido" : "Desmarcar como recibido" }
          </Button>
        </>
      )
    }
  })


  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await getShipments("destination");
        //console.log(JSON.stringify(data));
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
      <h1 className="font-bold text-4xl">Entrantes</h1>
      {loadingShipments ? 
        <p>Cargando datos...</p> :
        <div className="container py-10">
          <DataTable columns={ColumnsShipmentIncoming} data={shipments} />
        </div>
      }
    </>
  )
}