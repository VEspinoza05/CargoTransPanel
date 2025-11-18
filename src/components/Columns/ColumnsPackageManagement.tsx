import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatInTimeZone } from "date-fns-tz";

export type PackageData = {
  id: number;
  sender: string;
  recipient: string;
  destination: string;
  weight: string;
  status: string;
  receptionDate: string;
};

export const ColumnsPackageManagement: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    header: "Peso (lb)",
  },
  {
    accessorKey: "receptionDate",
    header: "Fecha de recepción",
    cell: ({row}) => {
      const requestDate = String(row.getValue("receptionDate"));

      const date = new Date(requestDate);

      return(
        <>
          {formatInTimeZone(date, 'America/Costa_Rica', 'dd-MM-yyy')}
        </>
      )
    }
  },
];
