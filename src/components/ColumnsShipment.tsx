import type { ColumnDef } from "@tanstack/react-table"
import type { IShipmentModel } from "../models/Shipment"
import { formatInTimeZone } from 'date-fns-tz';

export const ColumnsShipment: ColumnDef<IShipmentModel>[] = [
  {
    accessorKey: "shipmentId",
    header: "Id de envío",
  },
  {
    accessorKey: "shippingDate",
    header: "Fecha de envío",
    cell: ({row}) => {
      const shipmentDate = String(row.getValue("shippingDate"));

      return(
        <>
          {formatInTimeZone(shipmentDate, 'America/Costa_Rica', 'dd-MM-yyyy hh:mm a')}
        </>
      )
    }
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