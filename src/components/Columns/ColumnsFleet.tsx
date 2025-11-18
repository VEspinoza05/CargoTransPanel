import type { IVehicleModel } from "@/models/VehicleModel";
import type { ColumnDef } from "@tanstack/react-table"
import { formatInTimeZone } from "date-fns-tz"

export const columnsFleet: ColumnDef<IVehicleModel>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
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
  },
  {
    accessorKey: "driverId",
    header: "Conductor Asignado",
  },
  {
    accessorKey: "enterDate",
    header: "Fecha de ingreso",
    cell: ({row}) => {
      const requestDate = String(row.getValue("enterDate"));

      const date = new Date(requestDate);

      return(
        <>
          {formatInTimeZone(date, 'America/Costa_Rica', 'dd-MM-yyy')}
        </>
      )
    }
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "model",
    header: "Modelo",
  },
  {
    accessorKey: "serial",
    header: "No. Serie",
  },
]