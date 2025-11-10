import type { IClientModel } from "@/models/Client";
import type { ColumnDef } from "@tanstack/react-table"

export const ColumnsClients: ColumnDef<IClientModel>[] = [
  {
    accessorKey: "clientId",
    header: "ID Cliente",
  },
  {
    accessorKey: "fullName",
    header: "Nombre completo",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "identityCardId",
    header: "Cédula de identidad",
  },
]
