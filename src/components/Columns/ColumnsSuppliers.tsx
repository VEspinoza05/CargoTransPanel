import type { ISupplierModel } from "@/models/supplierModel";
import type { ColumnDef } from "@tanstack/react-table"

export const ColumnsSuppliers: ColumnDef<ISupplierModel>[] = [
  {
    accessorKey: "supplierId",
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
