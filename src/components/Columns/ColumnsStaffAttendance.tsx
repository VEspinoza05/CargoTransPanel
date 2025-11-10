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
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "Presente"
          ? "bg-green-100 text-green-700"
          : status === "Retardo"
          ? "bg-yellow-100 text-yellow-700"
          : status === "Permiso"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700";
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${color}`}>
          {status}
        </span>
      );
    },
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
