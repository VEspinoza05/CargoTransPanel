import { Badge } from "@/components/ui/badge"
import type { IVehicleModel } from "@/models/VehicleModel";
import type { ColumnDef } from "@tanstack/react-table"
import { formatInTimeZone } from "date-fns-tz"
import { Button } from "../ui/button";
import { deleteVehicle } from "@/services/VehicleService";

import {
      AlertDialog,
      AlertDialogPortal,
      AlertDialogOverlay,
      AlertDialogTrigger,
      AlertDialogContent,
      AlertDialogHeader,
      AlertDialogFooter,
      AlertDialogTitle,
      AlertDialogDescription,
      AlertDialogAction,
      AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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
  {
    header: "Accion",
    cell: ({row}) => {
      return(
        <div className="flex gap-2">
          <Button variant={"edit"}>Editar</Button>
          <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Eliminar</Button>
          </AlertDialogTrigger>
          <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={async () => {
                  const id: number = row.getValue("id");
                  const response = await deleteVehicle(id);
                  if(response === "Vehicle deleted successfully"){
                    toast("Resultado",
                      {description: `El vehiculo ${id} fue eliminado exitosamente.`,}
                    ); 
                  }
                  else {
                    toast("Error",
                      {description: `Ha ocurrido un error`,}
                    ); 
                  }
                    
                }}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
        </div>
      )
    },
  },
]