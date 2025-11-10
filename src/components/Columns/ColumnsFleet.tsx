import { Badge } from "@/components/ui/badge"
import type { IFleetModel } from "@/models/FleetModel"
import type { ColumnDef } from "@tanstack/react-table"
import { formatInTimeZone } from "date-fns-tz"

export const columnsFleet: ColumnDef<IFleetModel>[] = [
  {
    accessorKey: "vehicleLicensePlate",
    header: "Placa",
  },
  {
    accessorKey: "type",
    header: "Tipo de Vehículo",
  },
  {
    accessorKey: "capacity",
    header: "Capacidad",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("status") as string
      const color =
        estado === "En ruta"
          ? "bg-blue-500"
          : estado === "Disponible"
          ? "bg-green-500"
          : "bg-yellow-500"

      return (
        <Badge className={`${color} text-white`}>
          {estado}
        </Badge>
      )
    },
  },
  {
    accessorKey: "driver",
    header: "Conductor Asignado",
  },
  {
    accessorKey: "nextMaintenance",
    header: "Próximo Mantenimiento",
    cell: ({row}) => {
      const requestDate = String(row.getValue("nextMaintenance"));

      const date = new Date(requestDate);

      return(
        <>
          {formatInTimeZone(date, 'America/Costa_Rica', 'dd-MM-yyy')}
        </>
      )
    }
  },
]
