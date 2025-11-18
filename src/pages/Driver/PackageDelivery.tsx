import { useEffect, useState } from "react"
import { DataTable } from "@/components/DataTable"
import type { IPurchaseModel } from "@/models/PurchaseModel";
import { changeStatus, getPackages } from "@/services/PackageService";
import { ColumnsPackageManagement } from "@/components/Columns/ColumnsPackageManagement";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";

export default function PackageDelivery() {
  const [packages, setPackages] = useState<IPurchaseModel[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  

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

  const columns = [...ColumnsPackageManagement]
  columns.push({
    id:"Actions",
    header: "Estado",
    cell: ({row}) => 
      <div>
        <Combobox
          dataList={[
            {
              value: "En camino",
              label: "En camino",
            },
            {
              value: "Entregado",
              label: "Entregado",
            },
          ]}
          externalPlaceholder="Seleccionar estado"
          searchPlaceholder="Buscar estado"
          defaultValue={String(row.original.status ?? "")}
          onChange={async (e) => {
            await changeStatus(Number(row.getValue("id")), { id: Number(row.getValue("id")), status: e.target.value })
            toast("Vehiculo asignado")
          }}  
          name="roleId"
        />
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