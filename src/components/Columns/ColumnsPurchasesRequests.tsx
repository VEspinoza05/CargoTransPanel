import type { ColumnDef } from "@tanstack/react-table"
import type { IPurchaseModel } from "@/models/PurchaseModel"
import { formatInTimeZone } from "date-fns-tz";

export const ColumnsPurchasesRequests: ColumnDef<IPurchaseModel>[] = [
  {
    accessorKey: "id",
    header: "ID Compra",
  },
  {
    accessorKey: "supplierId",
    header: "ID Proveedor",
  },
  {
    accessorKey: "supplier.name",
    header: "Nombre Proveedor",
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
        status === "Aceptado"
          ? "text-green-700 font-bold"
          : status === "Enviado"
          ? "text-yellow-700 font-bold"
          : "text-red-700 font-bold"

      return <p className={color}>{status}</p>
    },
  },
]
