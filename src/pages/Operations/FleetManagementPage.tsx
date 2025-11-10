import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/DataTable"
import { columnsFleet } from "@/components/Columns/ColumnsFleet"
import type { IFleetModel } from "@/models/FleetModel"

export default function FleetManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Flota</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          Agregar Vehículo
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <DataTable columns={columnsFleet} data={dataFleet} />
      </div>
    </div>
  )
}

const dataFleet : Array<IFleetModel> = [
  {
    fleetId: "VH-001",
    vehicleLicensePlate: "M123456",
    type: "Camión liviano",
    capacity: "2 toneladas",
    status: "En ruta",
    driver: "Carlos López",
    nextMaintenance: new Date("2025-10-31T08:30:00Z"),
  },
  {
    fleetId: "VH-002",
    vehicleLicensePlate: "M789123",
    type: "Furgoneta",
    capacity: "1 tonelada",
    status: "Disponible",
    driver: "—",
    nextMaintenance: new Date("2025-10-31T08:30:00Z"),
  },
  {
    fleetId: "VH-003",
    vehicleLicensePlate: "M456789",
    type: "Camión pesado",
    capacity: "5 toneladas",
    status: "En Mantenimiento",
    driver: "—",
    nextMaintenance: new Date("2025-10-31T08:30:00Z"),
  },
]
