import type { ColumnDef } from "@tanstack/react-table";
import type { IAccountModel } from "@/models/AccountModel";

export const columns: ColumnDef<IAccountModel>[] = [
  {
    accessorKey: "client",
    header: "Cliente / Proveedor",
  },
  {
    accessorKey: "amount",
    header: "Monto (USD)",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <span>${amount.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Fecha de vencimiento",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"));
      return date.toLocaleDateString("es-ES");
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
];