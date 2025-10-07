import type { ColumnDef } from "@tanstack/react-table"
import type { IShipmentModel } from "../models/Shipment"

export const ColumnsShipment: ColumnDef<IShipmentModel>[] = [
  {
    accessorKey: "shipmentId",
    header: "shipmentId",
  },
  {
    accessorKey: "shippingDate",
    header: "shippingDate",
  },
  {
    accessorKey: "originBranch",
    header: "originBranch",
  },
  {
    accessorKey: "destinationBranch",
    header: "destinationBranch",
  },
  {
    accessorKey: "state",
    header: "state",
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
    header: "customerName",
  },
  {
    accessorKey: "userName",
    header: "SendedBy",
  }
]