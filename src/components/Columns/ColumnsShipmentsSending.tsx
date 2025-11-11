import type { ColumnDef } from "@tanstack/react-table";

export type Shipment = {
  id: string;
  truck: string;
  driver: string;
  packageCount: number;
  totalWeight: number;
  status: "Pendiente" | "En tránsito" | "Entregado";
};

export const ColumnsShipmentsSending: ColumnDef<Shipment>[] = [
  {
    accessorKey: "truck",
    header: "Camión",
  },
  {
    accessorKey: "driver",
    header: "Conductor",
  },
  {
    accessorKey: "packageCount",
    header: "Paquetes",
  },
  {
    accessorKey: "totalWeight",
    header: "Peso Total (kg)",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "Pendiente"
          ? "bg-yellow-100 text-yellow-700"
          : status === "En tránsito"
          ? "bg-blue-100 text-blue-700"
          : "bg-green-100 text-green-700";
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${color}`}>
          {status}
        </span>
      );
    },
  },
];
