import type { IPurchaseModel } from "@/models/PurchaseModel"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { formatInTimeZone } from "date-fns-tz";

export const ColumnsPurchases: ColumnDef<IPurchaseModel>[] = [
  {
    accessorKey: "purchaseId",
    header: "ID Compra",
  },
  {
    accessorKey: "supplier",
    header: "Proveedor",
  },
  {
    accessorKey: "requestDate",
    header: "Fecha de solicitud",
    cell: ({row}) => {
      const requestDate = String(row.getValue("requestDate"));

      const date = new Date(requestDate);

      return(
        <>
          {formatInTimeZone(date, 'America/Costa_Rica', 'dd-MM-yyyy hh:mm a')}
        </>
      )
    }
  },
  {
    accessorKey: "productName",
    header: "Nombre de producto",
  },
  {
    accessorKey: "productDescription",
    header: "Descripción de producto",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "unitPrice",
    header: "Precio unitario",
  },
  {
    accessorKey: "total",
    header: "Monto total",
    cell: ({ row }) => {
      const value = Number(row.getValue("total"))
      return <span className="font-semibold">${value.toLocaleString()}</span>
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = String(row.getValue("status"))
      const color =
        status === "Completada"
          ? "text-green-700 font-bold"
          : status === "Pendiente"
          ? "text-yellow-700 font-bold"
          : "text-red-700 font-bold"

      return <p className={color}>{status}</p>
    },
  },
  {
    id:"Actions",
    header:"Acciones",
    cell: () => {
      return(
        <>
          <Button variant="default">Cambiar estado</Button>
        </>
      )
    }
  }
]
