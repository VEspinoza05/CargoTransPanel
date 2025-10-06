import type { ColumnDef } from "@tanstack/react-table"
import type { ILoginLogModel } from "@/models/LoginLog"

export const ColumnsLoginLog: ColumnDef<ILoginLogModel>[] = [
  {
    accessorKey: "loginLogId",
    header: "loginLogId",
  },
  {
    accessorKey: "userId",
    header: "userId",
  },
  {
    accessorKey: "username",
    header: "userName",
  },
  {
    accessorKey: "userEmail",
    header: "userEmail",
  },
  {
    accessorKey: "timestamp",
    header: "timestamp",
  },
]