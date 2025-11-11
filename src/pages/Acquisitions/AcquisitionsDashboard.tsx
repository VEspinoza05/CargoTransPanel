import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowUpRight, ShoppingCart, Users, FileText } from "lucide-react"

const barData = [
  { name: "Ene", gastos: 12000 },
  { name: "Feb", gastos: 9800 },
  { name: "Mar", gastos: 14000 },
  { name: "Abr", gastos: 11000 },
  { name: "May", gastos: 15000 },
  { name: "Jun", gastos: 13200 },
]

const pieData = [
  { name: "Combustible", value: 35 },
  { name: "Mantenimiento", value: 25 },
  { name: "Suministros", value: 20 },
  { name: "Equipos", value: 10 },
  { name: "Otros", value: 10 },
]

const COLORS = ["#2563eb", "#22c55e", "#eab308", "#f97316", "#94a3b8"]

export default function AcquisitionsDashboard() {
  return (
    <div className="space-y-6">
      {/* Título principal */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Panel de Compras</h1>
        <Button className="flex items-center gap-2">
          Ver reportes
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Tarjetas de indicadores */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gasto total (mes actual)</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,230</div>
            <p className="text-xs text-muted-foreground">+8.4% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes en curso</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">6 pendientes de aprobación</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">3 nuevos este mes</p>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ahorro logrado</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,140</div>
            <p className="text-xs text-muted-foreground">Por negociaciones con proveedores</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficas */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución de gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="gastos" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución del gasto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {
                      (function(arr){
                        const elements = []

                        for(let i = 0; i < arr.length; i++ ) {
                          elements.push( 
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                          )
                        }

                        return elements;
                      })(pieData)
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
