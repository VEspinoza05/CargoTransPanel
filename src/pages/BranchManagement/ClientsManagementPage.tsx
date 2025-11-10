import { DataTable } from "../../components/DataTable"
import { useEffect, useState } from "react"
import type { IClientModel } from "@/models/Client"
import { ColumnsClients } from "@/components/Columns/ColumnsClients"

async function getClients(): Promise<IClientModel[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          clientId: "fh893jr32",
          fullName: "Pablo Mendoza",
          address: "De la capilla San Luis, 20 vrs.e San Marcos",
          phone: "2938892398",
          identityCardId: "0222310949999Y",
        },
        {
          clientId: "wfi430943",
          fullName: "Manuel Quezada",
          address: "Del Torreon universitario, 20 vrs.e Jinotepe",
          phone: "243989823",
          identityCardId: "0222310939999Y",
        },
        {
          clientId: "r8y983498r",
          fullName: "Luis Silva",
          address: "Del Palia, 20 vrs. norte San Marcos",
          phone: "43982923",
          identityCardId: "0222310959999Y",
        },
      ])
    }, 800)
  })
}

export default function ClientsManagementPage() {
  const [clients, setClients] = useState<IClientModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClients()
        setClients(data)
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
          <DataTable columns={ColumnsClients} data={clients} />
        </div>
      )}
    </>
  )
}
