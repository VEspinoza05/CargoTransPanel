import { ColumnsInternalRequest } from "@/components/Columns/ColumnsInternalRequests"
import { DataTable } from "@/components/DataTable"
import type { InternalRequest } from "@/models/InternalRequest"

export default function InternalRequestsPage() {
  const data: InternalRequest[] = [
    {
      id: "1",
      employeeName: "Carlos Mendoza",
      requestType: "Vacaciones",
      requestDate: "2025-10-20",
      status: "Pendiente",
    },
    {
      id: "2",
      employeeName: "María López",
      requestType: "Permiso",
      requestDate: "2025-10-25",
      status: "Aprobada",
    },
    {
      id: "3",
      employeeName: "Luis Ramírez",
      requestType: "Reclamación",
      requestDate: "2025-11-01",
      status: "Rechazada",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Solicitudes Internas</h2>
      </div>

      <DataTable columns={ColumnsInternalRequest} data={data} />
    </div>
  )
}
