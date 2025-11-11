import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/Columns/ColumnsPackageReception";
import { toast } from "sonner";
import type { IPackageModel } from "@/models/PackageModel";

export default function PackageReceptionPage() {
  const [packages, setPackages] = useState<IPackageModel[]>([]);
  const [formData, setFormData] = useState({
    sender: "",
    recipient: "",
    destination: "",
    weight: "",
    dimensions: "",
    contentType: "",
    observations: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    if (!formData.sender || !formData.recipient || !formData.destination) {
      toast("Campos incompletos");
      return;
    }

    const newPackage: IPackageModel = {
      id: `PKG-${Date.now()}`,
      sender: formData.sender,
      recipient: formData.recipient,
      destination: formData.destination,
      weight: formData.weight || "N/D",
      dimensions: formData.dimensions || "N/D",
      contentType: formData.contentType || "No especificado",
      observations: formData.observations || "Sin observaciones",
      status: "Recibido en sucursal",
      receptionDate: new Date().toLocaleString("es-NI"),
    };

    setPackages(prev => [newPackage, ...prev]);
    setFormData({
      sender: "",
      recipient: "",
      destination: "",
      weight: "",
      dimensions: "",
      contentType: "",
      observations: "",
    });

    toast("Paquete registrado",
      {description: `El paquete ${newPackage.id} fue registrado exitosamente.`,}
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">📦 Recepción de Paquetes</h1>

      {/* Formulario de registro */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Registrar nuevo paquete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Cliente remitente *</Label>
              <Input
                name="sender"
                placeholder="Nombre del remitente"
                value={formData.sender}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Cliente destinatario *</Label>
              <Input
                name="recipient"
                placeholder="Nombre del destinatario"
                value={formData.recipient}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Dirección de destino *</Label>
              <Input
                name="destination"
                placeholder="Dirección del destino"
                value={formData.destination}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Peso (kg)</Label>
              <Input
                name="weight"
                type="number"
                placeholder="Ej: 3.2"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Dimensiones</Label>
              <Input
                name="dimensions"
                placeholder="Ej: 20x15x10 cm"
                value={formData.dimensions}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Tipo de contenido</Label>
              <Input
                name="contentType"
                placeholder="Ej: Documentos, electrónicos, ropa..."
                value={formData.contentType}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Observaciones</Label>
              <Textarea
                name="observations"
                placeholder="Notas adicionales..."
                value={formData.observations}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" onClick={() => setFormData({
              sender: "",
              recipient: "",
              destination: "",
              weight: "",
              dimensions: "",
              contentType: "",
              observations: "",
            })}>
              Limpiar
            </Button>
            <Button onClick={handleRegister}>Registrar recepción</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de paquetes */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Paquetes recibidos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={packages} />
        </CardContent>
      </Card>
    </div>
  );
}