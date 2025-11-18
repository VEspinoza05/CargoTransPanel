import { useEffect, useState } from "react"
import { DataTable } from "@/components/DataTable"
import type { IPurchaseModel } from "@/models/PurchaseModel";
import { useAuth } from "@/contexts/AuthContext";
import { getVehicles } from "@/services/VehicleService";
import type { IVehicleModel } from "@/models/VehicleModel";
import { getPackages } from "@/services/PackageService";
import { ColumnsPackageManagement } from "@/components/Columns/ColumnsPackageManagement";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox, type listComboboxElements } from "@/components/ui/combobox";

export default function PackageManagement() {
  const [packages, setPackages] = useState<IPurchaseModel[]>([]);
  const [vehicles, setVehicles] = useState<listComboboxElements[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const { token } = useAuth();
  

  useEffect(() => {
      const fetchPackages = async () => {
        try {
          const data = await getPackages();
          setPackages(data);
        } catch (error) {
          console.error("Error al cargar los datos de employee:", error);
        } finally {
          setLoadingPurchases(false);
        }
      }
  
      fetchPackages()
    }, [])

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        const vehicleList = data.map(vehicle => {
          return {
            value: String(vehicle.id),
            label: vehicle.vehicleLicensePlate
          }
        })

        setVehicles(vehicleList)

      } catch (error) {
        console.error("Error al cargar los datos de role:", error);
      }
    }

    fetchVehicles()
  }, [])

  const columns = [...ColumnsPackageManagement]
  columns.push({
    id:"Actions",
    header: "Accion",
    cell: ({row}) => 
      <div>
        <Combobox
          dataList={[
            {
              value: "ninguno",
              label: "Ninguno",
            },
            ...vehicles
          ]}
          externalPlaceholder="Seleccionar vehiculo"
          searchPlaceholder="Buscar vehiculo"
          defaultValue={String(row.getValue("vehicleId") ?? "ninguno")}
          onChange={() => {}}  
          name="roleId"
        />
        <Button>
          Ok
        </Button>
      </div>
  })


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de paquetes</h1>
      </div>

      {loadingPurchases ?
        <p>Cargando datos...</p> :
        <div className="bg-white rounded-2xl shadow p-4">
          <DataTable columns={columns} data={packages} />
        </div>
      }

      
    </div>
  )
}