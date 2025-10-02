import { DataTable } from "../components/DataTable";
import { ColumnsShipment } from "../components/ColumnsShipment";
import type { IShipmentModel } from "../models/shipment";

export default function ShipmentsPage() {
  const shipments: IShipmentModel[] = [
  {
    "shipmentId": "MqpLVru728FCV5vkpaH4",
    "shippingDate": new Date("2025-10-01T02:41:50.909Z"),
    "originBranch": "Juigalpa",
    "destinationBranch": "Esteli",
    "state": "Enviado",
    "customerName": "Pedro Diaz",
    "userId": "8W7HydccRJu4Yc1DwPkX",
    "userData": {
      "userId": "8W7HydccRJu4Yc1DwPkX",
      "name": "Juan HERNANDEZ",
      "email": "juan@gmail.com",
      "password": "hashed-password",
      "role": "Encargado",
      "branchId": "1"
    }
  },
  {
    "shipmentId": "MqpLVru728FCV5vkpaH4",
    "shippingDate": new Date("2025-10-01T02:41:50.909Z"),
    "originBranch": "Juigalpa",
    "destinationBranch": "Managua",
    "state": "Recibido",
    "customerName": "Gonzalo Mena",
    "userId": "8W7HydccRJu4Yc1DwPkX",
    "userData": {
      "userId": "8W7HydccRJu4Yc1DwPkX",
      "name": "Juan Gonzalez",
      "email": "juan@gmail.com",
      "password": "hashed-password",
      "role": "Encargado",
      "branchId": "1"
    }
  }
]

  return(
    <>
      <h1>Envios</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={ColumnsShipment} data={shipments} />
      </div>
    </>
  )
}