import type { ColumnDef } from "@tanstack/react-table"
import type { IShipmentModel } from "../models/Shipment"

export const ColumnsShipment: ColumnDef<IShipmentModel>[] = [
  {
    accessorKey: "shipmentId",
    header: "Id de envío",
  },
  {
    accessorKey: "shippingDate",
    header: "Fecha de envío",
  },
  {
    accessorKey: "originBranch",
    header: "Sucursal origen",
  },
  {
    accessorKey: "destinationBranch",
    header: "Sucursal destino",
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({row}) => {
      const shipmentState = String(row.getValue("state"));

      return(
        <p className={shipmentState === "Enviado" ? "font-bold text-yellow-700" : "font-bold text-green-700" }>
          {shipmentState}
        </p>
      )
    }
  },
  {
    accessorKey: "customerName",
    header: "Nombre cliente",
  },
  {
    accessorKey: "userName",
    header: "Registrado por",
  }
]