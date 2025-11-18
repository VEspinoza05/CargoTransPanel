import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import type { InternalRequest } from "@/models/InternalRequest"

export const ColumnsInternalRequest: ColumnDef<InternalRequest>[] = [
  {
    accessorKey: "employeeName",
    header: "Empleado",
  },
  {
    accessorKey: "requestType",
    header: "Tipo de solicitud",
  },
  {
    accessorKey: "requestDate",
    header: "Fecha de solicitud",
    cell: ({ row }) => {
      const date = new Date(row.getValue("requestDate"))
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Ver</Button>
        <Button size="sm" variant="default">Aprobar</Button>
        <Button size="sm" variant="destructive">Rechazar</Button>
      </div>
    ),
  },
]
