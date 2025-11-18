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
  },
];
