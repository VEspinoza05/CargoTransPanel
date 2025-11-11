import { ColumnsShipmentsSending, type Shipment } from "@/components/Columns/ColumnsShipmentsSending";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Plus } from "lucide-react";
import { useState } from "react";
import NewShipmentDialogForm from "@/components/Forms/NewShipmentDialogForm";

export default function ShipmentsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState<Shipment[]>([
    {
      id: "1",
      truck: "Camión #12",
      driver: "Carlos Rojas",
      packageCount: 5,
      totalWeight: 320,
      status: "En tránsito",
    },
    {
      id: "2",
      truck: "Camión #8",
      driver: "Luis Martínez",
      packageCount: 8,
      totalWeight: 570,
      status: "Pendiente",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-gray-600" />
            <CardTitle className="text-xl font-semibold text-gray-800">
              Gestión de Envíos
            </CardTitle>
          </div>
          <Button onClick={() => setOpenDialog(true)} className="flex items-center gap-2">
            <Plus size={18} />
            Nuevo envío
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable columns={ColumnsShipmentsSending} data={data} />
        </CardContent>
      </Card>

      <NewShipmentDialogForm
        open={openDialog}
        onOpenChange={setOpenDialog}
        onAddShipment={(newShipment: Shipment) => setData([...data, newShipment])}
      />
    </div>
  );
}
