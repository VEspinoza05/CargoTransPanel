import type { IEmployeeModel } from "@/models/EmployeeModel"
import type { ColumnDef } from "@tanstack/react-table"
import { formatInTimeZone } from "date-fns-tz";

export const ColumnsEmployees: ColumnDef<IEmployeeModel>[] = [
  {
    accessorKey: "id",
    header: "ID Empleado",
  },
  {
    accessorKey: "firstName",
    header: "Nombres",
  },
  {
    accessorKey: "lastName",
    header: "Apellidos",
  },
  {
    accessorKey: "roleId",
    header: "Id de rol",
  },
  {
    accessorKey: "roleName",
    header: "Rol",
  },
  {
    accessorKey: "startDate",
    header: "Fecha de ingreso",
    cell: ({row}) => {
      const startDate = String(row.getValue("startDate"));

      const date = new Date(startDate);

      return(
        <>
          {formatInTimeZone(date, 'America/Costa_Rica', 'dd-MM-yyyy hh:mm a')}
        </>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = String(row.getValue("status"))
      const color =
        status === "Activo"
          ? "text-green-700 font-bold"
          : status === "En reposo"
          ? "text-yellow-700 font-bold"
          : "text-red-700 font-bold"

      return <p className={color}>{status}</p>
    },
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "contractType",
    header: "Tipo de contrato",
  },
  {
    accessorKey:"shift",
    header:"Turno",
  },
  {
    accessorKey:"email",
    header:"Correo electrónico",
  }
]
