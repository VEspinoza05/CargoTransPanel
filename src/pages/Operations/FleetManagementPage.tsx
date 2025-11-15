import { Button } from "@/components/ui/button"
import { columnsFleet } from "@/components/Columns/ColumnsFleet"
import type { IVehicleModel } from "@/models/VehicleModel"
import { useEffect, useState } from "react"
import { createVehicle, getVehicles, updateVehicle } from "@/services/VehicleService"
import { deleteVehicle } from "@/services/VehicleService";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/DataTable"
import { PlusCircle } from "lucide-react"

export default function FleetManagementPage() {
  const [vehicles, setVehicles] = useState<IVehicleModel[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [newVehicle, setNewVehicle] = useState<any>({
    vehicleLicensePlate: "",
    type: "",
    capacity: "",
    status: "",
    driverId: null,
    brand: "",
    model: "",
    serial: ""
  })
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewVehicleDialog, setOpenNewVehicleDialog] = useState(false);
  const [openDeleteAlertDialog, setDeleteAlertDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [vehicleToDeleteId, setVehicleToDeleteId] = useState<any>(null);

  useEffect(() => {
    const fetchLoginLogs = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error al cargar los datos de login:", error);
      } finally {
        setLoadingVehicles(false);
      }
    }

    fetchLoginLogs()
  }, [])

  const handleDelete = async () => {
    const response = await deleteVehicle(vehicleToDeleteId);
    if(response === "Vehicle deleted successfully"){
      setVehicles((prev) => 
        prev.filter((vehicle) => 
          vehicleToDeleteId !== vehicle.id)
      )
      
      toast("Resultado",
        {description: `El vehiculo ${vehicleToDeleteId} fue eliminado exitosamente.`,}
      ); 
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setVehicleToDeleteId(null)
  }

  const handleSubmit = async () => {
    try {
      const result = await createVehicle(newVehicle);
      toast("Resultado",
        {description: `El vehiculo fue creado exitosamente.`,}
      ); 

      setVehicles((prev) => 
        [...prev, result]
      )
    }
    catch (error) {
      console.error("Error:", error);
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setOpenNewVehicleDialog(false);
  }

  const handleUpdate = async () => {
    const response = await updateVehicle(selectedVehicle.id, selectedVehicle);
    if(response === "Vehicle updated successfully"){
      toast("Resultado",
        {description: `El vehiculo ${selectedVehicle.id} fue actualizado exitosamente.`,}
      ); 

      console.log(JSON.stringify(selectedVehicle))

      setVehicles((prev) => 
        prev.map((vehicle) => 
          selectedVehicle.id === vehicle.id
          ? { ...selectedVehicle }
          : vehicle
        )
      )
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setOpenEditDialog(false)
    setSelectedVehicle(null)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewVehicle((previousVehicleData : any) => ({
      ...previousVehicleData,
      [name]: value,
    }));
  }

  const handleInputUpdateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSelectedVehicle((previousVehicleData : any) => ({
      ...previousVehicleData,
      [name]: value,
    }));
  }

  
  const columns = [...columnsFleet]
  columns.push({
    id:"Actions",
    header: "Accion",
    cell: ({row}) => {
      return(
        <div className="flex gap-2">
          {/* Upadte Button*/}
          <Button
            variant={"edit"}
            onClick={() => {
              setSelectedVehicle({
                id: row.getValue("id"),
                vehicleLicensePlate: row.getValue("vehicleLicensePlate"),
                type: row.getValue("type"),
                capacity: row.getValue("capacity"),
                status: row.getValue("status"),
                driverId: row.getValue("driverId"),
                enterDate: row.getValue("enterDate"),
                brand: row.getValue("brand"),
                model: row.getValue("model"),
                serial: row.getValue("serial"),
              })
              setOpenEditDialog(true)
            }}
          >
            Editar
          </Button>
          {/* Delete Button*/}
          <Button
            variant={"destructive"}
            onClick={() => {
              setVehicleToDeleteId(row.getValue("id"))
              setDeleteAlertDialog(true)
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Flota</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setOpenNewVehicleDialog(true)
          }}
        >
          <PlusCircle size={18} />
            Agregar Vehículo
        </Button>
      </div>

      {loadingVehicles ?
        <p>Cargando datos...</p> :
        <div className="bg-white rounded-2xl shadow p-4">
          <DataTable columns={columns} data={vehicles} />
        </div>
      }

      <Dialog open={openNewVehicleDialog} onOpenChange={setOpenNewVehicleDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nuevo Envio</DialogTitle>
            <DialogDescription>
              Introduce los datos para un nuevo envio
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="vehicleLicensePlate-2">Placa</Label>
              <Input onChange={handleInputChange} id="vehicleLicensePlate-2" name="vehicleLicensePlate"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="type-2">Tipo de vehiculo</Label>
              <Input onChange={handleInputChange} id="type-2" name="type"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="capacity-2">Capacidad</Label>
              <Input onChange={handleInputChange} id="capacity-2" name="capacity"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status-2">Estado</Label>
              <Input onChange={handleInputChange} id="status-2" name="status"/>
            </div>
            <div className="grid gap-3">
              {/* TODO: Add a menu to fetch users */}
              <Label htmlFor="driverId-2">Id empleado</Label>
              <Input onChange={handleInputChange} id="driverId-2" name="driverId"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="brand-2">Marca</Label>
              <Input onChange={handleInputChange} id="brand-2" name="brand"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="model-2">Modelo</Label>
              <Input onChange={handleInputChange} id="model-2" name="model"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="serial-2">No. Serie</Label>
              <Input onChange={handleInputChange} id="serial-2" name="serial"/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSubmit} type="submit">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Envio</DialogTitle>
              <DialogDescription>
                Introduce los datos para un nuevo envio
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="vehicleLicensePlate-1">Placa</Label>
                <Input onChange={handleInputUpdateChange} id="vehicleLicensePlate-1" name="vehicleLicensePlate" value={selectedVehicle?.vehicleLicensePlate || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="type-1">Tipo de vehiculo</Label>
                <Input onChange={handleInputUpdateChange} id="type-1" name="type" value={selectedVehicle?.type || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="capacity-1">Capacidad</Label>
                <Input onChange={handleInputUpdateChange} id="capacity-1" name="capacity" value={selectedVehicle?.capacity || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status-1">Estado</Label>
                <Input onChange={handleInputUpdateChange} id="status-1" name="status" value={selectedVehicle?.status || ""}/>
              </div>
              <div className="grid gap-3">
                {/* TODO: Add a menu to fetch users */}
                <Label htmlFor="driverId-1">Id empleado</Label>
                <Input onChange={handleInputUpdateChange} id="driverId-1" name="driverId" value={selectedVehicle?.driverId || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="brand-1">Marca</Label>
                <Input onChange={handleInputUpdateChange} id="brand-1" name="brand" value={selectedVehicle?.brand || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="model-1">Modelo</Label>
                <Input onChange={handleInputUpdateChange} id="model-1" name="model" value={selectedVehicle?.model || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="serial-1">No. Serie</Label>
                <Input onChange={handleInputUpdateChange} id="serial-1" name="serial" value={selectedVehicle?.serial || ""}/>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button  variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleUpdate} type="submit">Guardar</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteAlertDialog} onOpenChange={setDeleteAlertDialog}>
        <AlertDialogPortal>
          <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
                  onClick={handleDelete}
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  )
}

