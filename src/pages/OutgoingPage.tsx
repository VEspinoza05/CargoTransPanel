import { useEffect, useState } from "react";
import type { IShipmentModel } from "../models/Shipment";
import { ColumnsShipment } from "../components/ColumnsShipment";
import { DataTable } from "../components/DataTable";
import { createShipment, getShipments } from "../services/ShipmentService";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import type { NewShipmentDTO } from "../dtos/NewShipmentDTO";

export default function OutgoingPage() {
  const [shipments, setShipments] = useState<IShipmentModel[]>([]);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [newShipment, setNewShipment] = useState<NewShipmentDTO>({
    shippingDate: new Date(),
    customerName: "",
    destinationBranch: "",
  })

  const fetchShipments = async () => {
    try {
      const data = await getShipments("origin");
      setShipments(data);
    } catch (error) {
      console.error("Error al cargar los envios:", error);
    } finally {
      setLoadingShipments(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleSubmit = async () => {
    try {
      await createShipment(newShipment);
      alert("Envio creado con exito");
      await fetchShipments();
    }
    catch (error) {
      console.error("Error al cargar los envios:", error);
    }
    
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewShipment((prevShipmentData) => ({
      ...prevShipmentData,
      [name]: value,
    }));
  }

  return(
    <>
      <div className="flex justify-between">
        <h1>Salientes</h1>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button>Nuevo Envio</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nuevo Envio</DialogTitle>
                  <DialogDescription>
                    Introduce los datos para un nuevo envio
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="destination-1">Lugar de destino</Label>
                    <Input onChange={handleInputChange} id="destination-1" name="destinationBranch"/>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="clientName-1">Nombre de cliente</Label>
                    <Input onChange={handleInputChange} id="clientName-1" name="customerName"/>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button onClick={handleSubmit} type="submit">Guardar</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
      </div>
      {loadingShipments ? 
        <p>Cargando datos...</p> :
        <div className="container py-10">
          <DataTable columns={ColumnsShipment} data={shipments} />
        </div>
      }
    </>
  )
}