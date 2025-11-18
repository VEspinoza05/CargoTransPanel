import { DataTable } from "../../components/DataTable"
import { ColumnsPurchases } from "../../components/Columns/ColumnsPurchases"
import { useEffect, useState } from "react"
import type { IPurchaseModel } from "@/models/PurchaseModel"

async function getPurchases(): Promise<IPurchaseModel[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
      ])
    }, 800)
  })
}

export default function Purchases() {
  const [purchases, setPurchases] = useState<IPurchaseModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPurchases()
        setPurchases(data)
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
          <DataTable columns={ColumnsPurchases} data={purchases} />
        </div>
      )}
    </>
  )
}
