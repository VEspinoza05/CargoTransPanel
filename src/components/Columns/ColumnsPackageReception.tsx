import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type PackageData = {
  id: string;
  sender: string;
  recipient: string;
  destination: string;
  weight: string;
  status: string;
  receptionDate: string;
};

export const columns: ColumnDef<PackageData>[] = [
  {
    accessorKey: "id",
    header: "Código de guía",
  },
  {
    accessorKey: "sender",
    header: "Remitente",
  },
  {
    accessorKey: "recipient",
    header: "Destinatario",
  },
  {
    accessorKey: "destination",
    header: "Destino",
  },
  {
    accessorKey: "weight",
    header: "Peso (kg)",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("status")}</Badge>
    ),
  },
  {
    accessorKey: "receptionDate",
    header: "Fecha de recepción",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: () => (
      <Button size="sm" variant="outline">
        Ver detalle
      </Button>
    ),
  },
];
