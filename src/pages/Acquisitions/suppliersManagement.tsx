import { Button } from "@/components/ui/button"
import { ColumnsSuppliers } from "@/components/Columns/ColumnsSuppliers"
import type { ISupplierModel } from "@/models/SupplierModel"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { getSuppliers, deleteSupplier, createSupplier, updateSupplier } from "@/services/SupplierService"

export interface newSupplier {
  name: string,
  email: string,
  address: string,
  phone: string,
}

class newSupplierClass {
  name: string = "";
  email: string = "";
  address: string = "";
  phone: string = "";
}


export default function FleetManagementPage() {
  const [suppliers, setSuppliers] = useState<ISupplierModel[]>([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [newSupplier, setNewSupplier] = useState<any>(new newSupplierClass());
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteAlertDialog, setDeleteAlertDialog] = useState(false);
  const [supplierToUpdate, setSuplierToUpdate] = useState<any>(null);
  const [supplierToDeleteId, setSupplierToDeleteId] = useState<any>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Error al cargar los datos de supplier:", error);
      } finally {
        setLoadingSuppliers(false);
      }
    }

    fetchSuppliers()
  }, [])

  const handleDelete = async () => {
    const response = await deleteSupplier(supplierToDeleteId);

    

    if(response === "Supplier deleted successfully"){
      setSuppliers((prev) => 
        prev.filter((supplier) => 
          supplierToDeleteId !== supplier.id)
      )
      
      toast("Resultado",
        {description: `El proveedor ${supplierToDeleteId} fue eliminado exitosamente.`,}
      ); 
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setSupplierToDeleteId(null)
  }

  const handleSubmit = async () => {
    try {
      const result = await createSupplier(newSupplier);
      toast("Resultado",
        {description: `El vehiculo fue creado exitosamente.`,}
      ); 

      setSuppliers((prev) => 
        [...prev, result]
      )
    }
    catch (error) {
      console.error("Error:", error);
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setNewSupplier(new newSupplierClass())
    setOpenCreateDialog(false);
  }

  const handleUpdate = async () => {
    const response = await updateSupplier(supplierToUpdate.id, supplierToUpdate);
    if(response === "Supplier updated successfully"){
      toast("Resultado",
        {description: `El vehiculo ${supplierToUpdate.id} fue actualizado exitosamente.`,}
      ); 

      setSuppliers((prev) => 
        prev.map((vehicle) => 
          supplierToUpdate.id === vehicle.id
          ? { ...supplierToUpdate }
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
    setSuplierToUpdate(null)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewSupplier((previousSupplierData : any) => ({
      ...previousSupplierData,
      [name]: value,
    }));
  }

  const handleInputUpdateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSuplierToUpdate((previousSupplierData : any) => ({
      ...previousSupplierData,
      [name]: value,
    }));
  }

  const handleCreateDialogOpen = (newOpenState: boolean) => {
    setOpenCreateDialog(newOpenState);
    if (!newOpenState) {
      setNewSupplier(new newSupplierClass())
    }
  };

  
  const columns = [...ColumnsSuppliers]
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
              setSuplierToUpdate({
                id: row.getValue("id"),
                name: row.getValue("name"),
                email: row.getValue("email"),
                address: row.getValue("address"),
                phone: row.getValue("phone"),
              })
              console.log(JSON.stringify(supplierToUpdate))
              setOpenEditDialog(true)
            }}
          >
            Editar
          </Button>
          {/* Delete Button*/}
          <Button
            variant={"destructive"}
            onClick={() => {
              setSupplierToDeleteId(row.getValue("id"))
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
        <h1 className="text-2xl font-bold">Gestión de Proveedores</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setOpenCreateDialog(true)
          }}
        >
          <PlusCircle size={18} />
            Agregar Proveedor
        </Button>
      </div>

      {loadingSuppliers ?
        <p>Cargando datos...</p> :
        <div className="bg-white rounded-2xl shadow p-4">
          <DataTable columns={columns} data={suppliers} />
        </div>
      }

      <Dialog open={openCreateDialog} onOpenChange={handleCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nuevo Envio</DialogTitle>
            <DialogDescription>
              Introduce los datos para un nuevo envio
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-2">Nombre</Label>
              <Input onChange={handleInputChange} id="name-2" name="name"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-2">Correo electrónico</Label>
              <Input onChange={handleInputChange} id="email-2" name="email"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address-2">Dirección</Label>
              <Input onChange={handleInputChange} id="address-2" name="address"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone-2">Teléfono</Label>
              <Input onChange={handleInputChange} id="phone-2" name="phone"/>
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
                <Label htmlFor="name-1">Nombre</Label>
                <Input onChange={handleInputUpdateChange} id="name-1" name="name" value={supplierToUpdate?.name || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email-1">Correo electrónico</Label>
                <Input onChange={handleInputUpdateChange} id="email-1" name="email" value={supplierToUpdate?.email || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address-1">Dirección</Label>
                <Input onChange={handleInputUpdateChange} id="address-1" name="address" value={supplierToUpdate?.address || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone-1">Teléfono</Label>
                <Input onChange={handleInputUpdateChange} id="phone-1" name="phone" value={supplierToUpdate?.phone || ""}/>
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