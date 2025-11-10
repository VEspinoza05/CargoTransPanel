import { columns } from "@/components/Columns/ColumnsStaffAttendance";
import { DataTable } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function BranchAttendancePage() {
  const [data] = useState([
    {
      id: "1",
      name: "Carlos Rojas",
      position: "Conductor",
      checkIn: "08:05 AM",
      checkOut: "05:00 PM",
      status: "Presente",
    },
    {
      id: "2",
      name: "María López",
      position: "Atención al Cliente",
      checkIn: "08:45 AM",
      checkOut: "04:50 PM",
      status: "Retardo",
    },
    {
      id: "3",
      name: "Luis Martínez",
      position: "Encargado de Bodega",
      checkIn: null,
      checkOut: null,
      status: "Ausente",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-600" />
            <CardTitle className="text-xl font-semibold text-gray-800">
              Control de Asistencia del Personal
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
