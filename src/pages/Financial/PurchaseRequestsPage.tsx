import { DataTable } from "@/components/DataTable"
import type { IPurchaseModel } from "@/models/PurchaseModel"
import { useEffect, useState } from "react"
import { ColumnsPurchasesRequests } from "@/components/Columns/ColumnsPurchasesRequests"

async function getPurchases(): Promise<IPurchaseModel[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          purchaseId: "d8983dhudw1",
          supplier: "Distribuidora El Camino",
          requestDate: new Date("2025-10-28T12:00:00Z"),
          productName: "abcd",
          productDescription: "abcd",
          quantity: 4,
          unitPrice: 32,
          total: 15230,
          status: "Completada",
        },
        {
          purchaseId: "d8983dhudw2",
          supplier: "Lubricantes Centroamérica",
          requestDate: new Date("2025-10-31T08:30:00Z"),
          productName: "abcd",
          productDescription: "abcd",
          unitPrice: 32,
          quantity: 4,
          total: 8420,
          status: "Pendiente",
        },
        {
          purchaseId: "d8983dhudw3",
          supplier: "Papelería Rápida",
          requestDate: new Date("2025-10-15T14:10:00Z"),
          productName: "abcd",
          productDescription: "abcd",
          unitPrice: 32,
          quantity: 4,
          total: 920,
          status: "Cancelada",
        },
      ])
    }, 800)
  })
}

export default function PurchaseRequestsPage() {
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
          <DataTable columns={ColumnsPurchasesRequests} data={purchases} />
        </div>
      )}
    </>
  )
}
