import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "@/components/DataTable";
import { ColumnsPackageReception } from "@/components/Columns/ColumnsPackageReception";
import { toast } from "sonner";
import type { IPackageModel } from "@/models/PackageModel";
import MapWithDraggableMarker from "@/components/MapWithDraggableMarker";
import { createInvoice } from "@/services/InvoiceService";

export default function BillingPage() {
  const [packages, setPackages] = useState<IPackageModel[]>([]);

  // Datos del paquete
  const [formData, setFormData] = useState({
    sender: "",
    recipient: "",
    destination: "",
    weight: "",
    dimensions: "",
    contentType: "",
    observations: "",
  });

  // Datos de facturación
  const [pricePerPound, setPricePerPound] = useState<number>(0);
  const [pounds, setPounds] = useState<number>(0);
  const total = pricePerPound * pounds;

  // Latitud / Longitud
  const [coords, setCoords] = useState({ latitude: 12.1364, longitude: -86.2514 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    const sumAllPounds = (list: IPackageModel[]) => {
      const poundsSeparated = list.map(p => {
        return p.weight
      })
      return poundsSeparated.reduce((total, num) => total + num)
    }

    if(packages.length >= 1) {
      const totalPounds = sumAllPounds(packages)
      setPounds(totalPounds)
    }
    else {
      setPounds(0)
    }
    
  }, [packages, pricePerPound])
  

  const handleRegister = () => {
    if (!formData.sender || !formData.recipient || !formData.destination) {
      toast("Campos incompletos");
      return;
    }
    

    const newPackage: IPackageModel = {
      ...formData,
      id: packages.length,
      weight: Number(formData.weight),
      dimensions: formData.dimensions || "N/D",
      contentType: formData.contentType || "No especificado",
      observations: formData.observations || "Sin observaciones",
      status: "Recibido en sucursal",
      receptionDate: new Date(),
      latitudeDestination: coords.latitude,
      longitudeDestination: coords.longitude,
    };

    console.log("PACKAGE:", JSON.stringify(newPackage));

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

    toast("Paquete registrado");
  };

  const handleBilling = async () => {
    if (!pricePerPound || !pounds) {
      toast("Debe ingresar precio y cantidad de libras");
      return;
    }

    const invoice = {
      pricePerPound,
      pounds,
      total,
      billingDate: new Date(),
    };

    const response = await createInvoice(invoice, packages)

    if(response.status === 200)
      toast("Factura generada correctamente");
    else
      toast("Error al generar correctamente");

    // Limpiar factura
    setPricePerPound(0);
    setPounds(0);
  };

  const columns = [...ColumnsPackageReception]
    columns.push({
      id:"Actions",
      header: "Accion",
      cell: ({row}) => {
        return(
          <div>
            {/* Delete Button*/}
            <Button
              variant={"destructive"}
              onClick={() => {
                setPackages((prev) => 
                  prev.filter((p) => 
                    row.getValue("id") !== p.id)
                )
              }}
            >
              Eliminar
            </Button>
          </div>
        )
      },
    });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Facturación</h1>

      {/* Facturación */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Datos de facturación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Precio por libra ($)</Label>
              <Input
                type="number"
                value={pricePerPound}
                onChange={(e) => setPricePerPound(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Total de libras</Label>
              <Input
                type="number"
                value={pounds}
                disabled={true}
              />
            </div>

            <div>
              <Label>Total a pagar ($)</Label>
              <p className="text-lg font-bold mt-2">{total.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleBilling}>Facturar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Formulario de registro */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Registrar nuevo paquete</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <Label>Cliente remitente *</Label>
              <Input name="sender" value={formData.sender} onChange={handleChange} />
            </div>

            <div>
              <Label>Cliente destinatario *</Label>
              <Input name="recipient" value={formData.recipient} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Dirección de destino *</Label>
              <Input name="destination" value={formData.destination} onChange={handleChange} />
            </div>

            <div>
              <Label>Peso (lb)</Label>
              <Input name="weight" value={formData.weight} onChange={handleChange} />
            </div>

            <div>
              <Label>Dimensiones</Label>
              <Input name="dimensions" value={formData.dimensions} onChange={handleChange} />
            </div>

            <div>
              <Label>Tipo de contenido</Label>
              <Input name="contentType" value={formData.contentType} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Label>Observaciones</Label>
              <Textarea name="observations" value={formData.observations} onChange={handleChange} />
            </div>

            {/* MAPA */}
            <div className="md:col-span-2">
              <Label>Ubicación en el mapa</Label>
              <MapWithDraggableMarker
                coordinatesHandler={(lat, lng) =>
                  setCoords({ latitude: lat, longitude: lng })
                }
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleRegister}>Registrar recepción</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla */}
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
