import type { IStaffAttendanceModel } from "@/models/StaffAttendanceModel";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";

export const columns: ColumnDef<IStaffAttendanceModel>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "position",
    header: "Cargo",
  },
  {
    accessorKey: "checkIn",
    header: "Entrada",
    cell: ({ row }) => row.getValue("checkIn") || "—",
  },
  {
    accessorKey: "checkOut",
    header: "Salida",
    cell: ({ row }) => row.getValue("checkOut") || "—",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    header: "Accion",
    cell: () => {
      return(
        <>
          <Button>Cambiar Estado</Button>
        </>
      )
    },
  },
];
