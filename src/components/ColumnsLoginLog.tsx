import type { ColumnDef } from "@tanstack/react-table"
import type { ILoginLogModel } from "@/models/LoginLog"
import { formatInTimeZone } from "date-fns-tz";

export const ColumnsLoginLog: ColumnDef<ILoginLogModel>[] = [
  {
    accessorKey: "loginLogId",
    header: "Id registro",
  },
  {
    accessorKey: "userId",
    header: "Id usuario",
  },
  {
    accessorKey: "username",
    header: "Nombre Usuario",
  },
  {
    accessorKey: "userEmail",
    header: "Correo",
  },
  {
    accessorKey: "timestamp",
    header: "Fecha registro",
    cell: ({row}) => {
      const shipmentDate = String(row.getValue("timestamp"));

      return(
        <>
          {formatInTimeZone(shipmentDate, 'America/Costa_Rica', 'dd-MM-yyyy hh:mm a')}
        </>
      )
    }
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
]