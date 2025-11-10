import { DataTable } from "../../components/DataTable"
import { ColumnsSuppliers } from "@/components/Columns/ColumnsSuppliers"
import { useEffect, useState } from "react"
import type { ISupplierModel } from "@/models/supplierModel"

async function getPurchases(): Promise<ISupplierModel[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          supplierId: "de82331",
          name: "distribuidor X",
          email: "contacto@distribuidorx.com",
          address: "Del pali 3 al sur, Esteli",
          phone: "88901122",
        },
        {
          supplierId: "de82332",
          name: "Y internacional",
          email: "contacto@yinternacional.com",
          address: "De La Colonia 4 al sur, Esteli",
          phone: "88991122",
        },
        {
          supplierId: "de82333",
          name: "Mercancias Z",
          email: "contacto@mercanciasz.com",
          address: "Del MINSA 3 al norte, Masaya",
          phone: "88941122",
        }
      ])
    }, 500)
  })
}

export default function SuppliersManagement() {
  const [suppliers, setSuppliers] = useState<ISupplierModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPurchases()
        setSuppliers(data)
      } catch (err) {
        console.error("Error al cargar las compras:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <h1 className="font-bold text-4xl mb-6">Compras</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="container py-10">
          <DataTable columns={ColumnsSuppliers} data={suppliers} />
        </div>
      )}
    </>
  )
}
