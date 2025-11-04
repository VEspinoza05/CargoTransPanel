import { DataTable } from "../../components/DataTable"
import { ColumnsEmployees } from "../../components/Columns/ColumnsEmployees"
import { useEffect, useState } from "react"
import type { IEmployeeModel } from "@/models/EmployeeModel"

async function getEmployees(): Promise<IEmployeeModel[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          employeeId: "string1",
          fullName: "string",
          title: "string",
          department: "string",
          startDate: new Date(),
          status: "Activo",
          contractType: "string",
        },
        {
          employeeId: "string2",
          fullName: "string",
          title: "string",
          department: "string",
          startDate: new Date(),
          status: "En reposo",
          contractType: "string",
        },
        {
          employeeId: "string3",
          fullName: "string",
          title: "string",
          department: "string",
          startDate: new Date(),
          status: "Despedido",
          contractType: "string",
        },
      ])
    }, 800)
  })
}

export default function EmployeesManagement() {
  const [employees, setEmployees] = useState<IEmployeeModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployees()
        setEmployees(data)
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
          <DataTable columns={ColumnsEmployees} data={employees} />
        </div>
      )}
    </>
  )
}
