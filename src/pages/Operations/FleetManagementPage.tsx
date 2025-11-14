import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/DataTable"
import { columnsFleet } from "@/components/Columns/ColumnsFleet"
import type { IVehicleModel } from "@/models/VehicleModel"
import { useEffect, useState } from "react"
import { getVehicles } from "@/services/VehicleService"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function FleetManagementPage() {
  const [vehicles, setVehicles] = useState<IVehicleModel[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);

  useEffect(() => {
    const fetchLoginLogs = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error al cargar los datos de login:", error);
      } finally {
        setLoadingVehicles(false);
      }
    }

    fetchLoginLogs()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Flota</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          Agregar Vehículo
        </Button>
      </div>

    {loadingVehicles ?
      <p>Cargando datos...</p> :
      <div className="bg-white rounded-2xl shadow p-4">
        <DataTable columns={columnsFleet} data={vehicles} />
      </div>
    }
    </div>
  )
}

