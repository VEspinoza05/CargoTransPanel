import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

export default function DashboardCEOGeneralPage() {

  const financialData = [
    { month: "Ene", ingresos: 120000, gastos: 80000 },
    { month: "Feb", ingresos: 140000, gastos: 95000 },
    { month: "Mar", ingresos: 160000, gastos: 110000 },
    { month: "Abr", ingresos: 180000, gastos: 115000 },
  ];

  const kpis = [
    { title: "Ingresos Totales", value: "$180,000", change: "+12%", isPositive: true },
    { title: "Gastos Totales", value: "$115,000", change: "-5%", isPositive: true },
    { title: "Utilidad Neta", value: "$65,000", change: "+9%", isPositive: true },
    { title: "Entregas a Tiempo", value: "96%", change: "+2%", isPositive: true },
  ];

  const shipmentData = [
    { region: "Centro", envios: 420 },
    { region: "Norte", envios: 310 },
    { region: "Sur", envios: 250 },
    { region: "Occidente", envios: 280 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📊 Dashboard General</h1>
        <Button>Generar Reporte</Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className={`flex items-center text-sm mt-1 ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {kpi.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfica de Finanzas */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Evolución de Ingresos y Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={2} name="Ingresos" />
              <Line type="monotone" dataKey="gastos" stroke="#ef4444" strokeWidth={2} name="Gastos" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfica de Envíos por Región */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Distribución de Envíos por Región</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="envios" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
