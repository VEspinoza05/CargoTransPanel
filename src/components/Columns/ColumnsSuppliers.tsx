import type { ISupplierModel } from "@/models/SupplierModel";
import type { ColumnDef } from "@tanstack/react-table"

export const ColumnsSuppliers: ColumnDef<ISupplierModel>[] = [
  {
    accessorKey: "id",
    header: "ID Proveedor",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
]
