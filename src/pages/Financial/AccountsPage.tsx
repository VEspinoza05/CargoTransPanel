import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/Columns/ColumnsAccounts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AccountsPage() {
  const [data] = useState([
    {
      id: 1,
      type: "Por cobrar",
      client: "TransExpress S.A.",
      amount: 1250.75,
      dueDate: "2025-11-20",
      status: "Pendiente",
    },
    {
      id: 2,
      type: "Por pagar",
      client: "Proveedor Combustible S.R.L.",
      amount: 890.0,
      dueDate: "2025-11-15",
      status: "Pendiente",
    },
    {
      id: 3,
      type: "Por cobrar",
      client: "Cargo Global Ltd.",
      amount: 3200.0,
      dueDate: "2025-12-01",
      status: "Pagado",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Cuentas por Cobrar y por Pagar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cobrar" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="cobrar">Por Cobrar</TabsTrigger>
              <TabsTrigger value="pagar">Por Pagar</TabsTrigger>
            </TabsList>

            <TabsContent value="cobrar">
              <div className="flex justify-end mb-2">
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nuevo registro
                </Button>
              </div>
              <DataTable
                columns={columns}
                data={data.filter((row) => row.type === "Por cobrar")}
              />
            </TabsContent>

            <TabsContent value="pagar">
              <div className="flex justify-end mb-2">
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nuevo registro
                </Button>
              </div>
              <DataTable
                columns={columns}
                data={data.filter((row) => row.type === "Por pagar")}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
