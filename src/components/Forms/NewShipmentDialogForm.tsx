import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NewShipmentDialogForm({
  open,
  onOpenChange,
  onAddShipment,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddShipment: (shipment: any) => void;
}) {
  const [truck, setTruck] = useState("");
  const [driver, setDriver] = useState("");
  const [packages, setPackages] = useState<
    { id: number; description: string; weight: number }[]
  >([]);

  const [desc, setDesc] = useState("");
  const [weight, setWeight] = useState("");

  const handleAddPackage = () => {
    if (!desc || !weight) return;
    setPackages([
      ...packages,
      { id: Date.now(), description: desc, weight: Number(weight) },
    ]);
    setDesc("");
    setWeight("");
  };

  const handleSave = () => {
    const totalWeight = packages.reduce((sum, p) => sum + p.weight, 0);
    const newShipment = {
      id: Date.now().toString(),
      truck,
      driver,
      packageCount: packages.length,
      totalWeight,
      status: "Pendiente",
    };
    onAddShipment(newShipment);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuevo Envío</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Camión</Label>
            <Input
              placeholder="Ej: Camión #10"
              value={truck}
              onChange={(e) => setTruck(e.target.value)}
            />
          </div>
          <div>
            <Label>Conductor</Label>
            <Input
              placeholder="Ej: Juan Pérez"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
            />
          </div>

          <div className="border-t pt-3 mt-4">
            <h4 className="text-sm font-semibold mb-2">Paquetes</h4>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Descripción"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <Input
                placeholder="Peso (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Button onClick={handleAddPackage}>Agregar</Button>
            </div>

            {packages.length === 0 ? (
              <p className="text-sm text-gray-500">No hay paquetes agregados.</p>
            ) : (
              <ul className="list-disc pl-5 text-sm space-y-1">
                {packages.map((p) => (
                  <li key={p.id}>
                    {p.description} — {p.weight} kg
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <Button onClick={handleSave} disabled={!truck || !driver || packages.length === 0}>
              Guardar envío
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
