import type { ColumnDef } from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";
import type { IPackageModel } from "@/models/PackageModel";

export const ColumnsPackageDelivery: ColumnDef<IPackageModel>[] = [
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
    accessorKey: "status",
    header: "Estado",
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
  }
];
