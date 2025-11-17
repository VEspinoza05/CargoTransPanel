import { Button } from "@/components/ui/button"
import { ColumnsEmployees } from "@/components/Columns/ColumnsEmployees"
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
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, updateEmployeePassword } from "@/services/EmployeeService"
import type { IEmployeeModel } from "@/models/EmployeeModel"
import { getRoles } from "@/services/RoleService";
import { Combobox, type listComboboxElements } from "@/components/ui/combobox";

class newEmployeeClass {
  "firstName": string
  "lastName": string
  "roleId": string
  "status": string
  "phone": string
  "contractType": string
  "shift": string
  "email": string
  "password": string
  "passwordRepeat": string
}

class passwordUpdate {
  "password": string
  "confirmPassword": string
}

export default function EmployeesManagementPage() {
  const [employees, setEmployees] = useState<IEmployeeModel[]>([]);
  const [roles, setRoles] = useState<listComboboxElements[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [newEmployee, setNewEmployee] = useState<any>(new newEmployeeClass());
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteAlertDialog, setDeleteAlertDialog] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState<any>(null);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState<any>(null);
  const [passwordToUpdate, setPasswordToUpdate] = useState<any>(new passwordUpdate());
  const [openPasswordEditDialog, setOpenPasswordEditDialog] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error al cargar los datos de employee:", error);
      } finally {
        setLoadingEmployees(false);
      }
    }

    fetchEmployees()
  }, [])

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        const roleList = data.map(role => {
          return {
            value: String(role.id),
            label: role.name
          }
        })

        setRoles(roleList)

      } catch (error) {
        console.error("Error al cargar los datos de role:", error);
      }
    }

    fetchRoles()
  }, [])

  const handleDelete = async () => {
    const response = await deleteEmployee(employeeToDeleteId);

    if(response === "Employee deleted successfully"){
      setEmployees((prev) => 
        prev.filter((employee) => 
          employeeToDeleteId !== employee.id)
      )
      
      toast("Resultado",
        {description: `El empleado ${employeeToDeleteId} fue eliminado exitosamente.`,}
      ); 
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setEmployeeToDeleteId(null)
  }

  const handleSubmit = async () => {
    if(newEmployee.password !== newEmployee.passwordRepeat)
    {
      toast("Error",
        {description: `Las contraseñas no coinciden`,}
      ); 
      return; 
    }

    try {
      const result = await createEmployee(newEmployee);
      toast("Resultado",
        {description: `El empleado fue creado exitosamente.`,}
      ); 

      setEmployees((prev) => 
        [...prev, result]
      )
    }
    catch (error) {
      console.error("Error:", error);
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setNewEmployee(new newEmployeeClass())
    setOpenCreateDialog(false);
  }

  const handleUpdate = async () => {
    const response = await updateEmployee(employeeToUpdate.id, employeeToUpdate);
    if(response === "Employee updated successfully"){
      toast("Resultado",
        {description: `El empleado ${employeeToUpdate.id} fue actualizado exitosamente.`,}
      ); 

      setEmployees((prev) => 
        prev.map((employee) => 
          employeeToUpdate.id === employee.id
          ? { ...employeeToUpdate }
          : employee
        )
      )
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setOpenEditDialog(false)
    setEmployeeToUpdate(null)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewEmployee((previousEmployeeData : any) => ({
      ...previousEmployeeData,
      [name]: value,
    }));
  }

  const handleInputComboboxChange = (
    event: { target: { name?: string; value: string } }
  ) => {
    const { name, value } = event.target;
    console.log("Handler COMBOBOX: " + name + ":" + value)
    setNewEmployee((previousEmployeeData: any) => ({
      ...previousEmployeeData,
      [name!]: value,
    }));
  };

  const handleInputUpdateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEmployeeToUpdate((previousEmployeeData : any) => ({
      ...previousEmployeeData,
      [name]: value,
    }));
  }

  const handleCreateDialogOpen = (newOpenState: boolean) => {
    setOpenCreateDialog(newOpenState);
    if (!newOpenState) {
      setNewEmployee(new newEmployeeClass())
    }
  };

  const handleUpdatePasswordDialogOpen = (newOpenState: boolean) => {
    setOpenPasswordEditDialog(newOpenState);
    if (!newOpenState) {
      setNewEmployee(new newEmployeeClass())
    }
  };

  const handlePasswordUpdateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPasswordToUpdate((passwordObj : any) => ({
      ...passwordObj,
      [name]: value,
    }));
  }

  const handlePasswordUpdate = async () => {
    const response = await updateEmployeePassword(employeeToUpdate.id, employeeToUpdate);
    if(response === "Employee updated successfully"){
      toast("Resultado",
        {description: `La contraseña del empleado ${employeeToUpdate.id} fue actualizado exitosamente.`,}
      ); 

      setPasswordToUpdate(new passwordToUpdate())
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setOpenEditDialog(false)
    setEmployeeToUpdate(null)
  }

  
  const columns = [...ColumnsEmployees]
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
              setEmployeeToUpdate({
                id: row.getValue("id"),
                firstName: row.getValue(""),
                lastName: row.getValue(""),
                roleId: row.getValue(""),
                status: row.getValue(""),
                phone: row.getValue(""),
                contractType: row.getValue(""),
                shift: row.getValue(""),
                email: row.getValue(""),
              })

              setOpenEditDialog(true)
            }}
          >
            Editar
          </Button>
          {/* Password Update Button */}
          <Button
            variant={"default"}
            onClick={() => {
              
            }}
          >
            Cambiar contraseña
          </Button>
          {/* Delete Button*/}
          <Button
            variant={"destructive"}
            onClick={() => {
              setEmployeeToDeleteId(row.getValue("id"))
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
        <h1 className="text-2xl font-bold">Gestión de Empleados</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setOpenCreateDialog(true)
          }}
        >
          <PlusCircle size={18} />
            Agregar Empleado
        </Button>
      </div>

      {loadingEmployees ?
        <p>Cargando datos...</p> :
        <div className="bg-white rounded-2xl shadow p-4">
          <DataTable columns={columns} data={employees} />
        </div>
      }

      <Dialog open={openCreateDialog} onOpenChange={handleCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-9/10 overflow-scroll">
          <DialogHeader>
            <DialogTitle>Nuevo Empleado</DialogTitle>
            <DialogDescription>
              Introduce los datos para un crear un nuevo empleado
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="fname-2">Nombres</Label>
              <Input onChange={handleInputChange} id="name-2" name="firstName"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lname-2">Apellidos</Label>
              <Input onChange={handleInputChange} id="name-2" name="lastName"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="roleId-1">Rol</Label>
              <Combobox
                dataList={[
                  {
                    value: "ninguno",
                    label: "Ninguno",
                  },
                  ...roles
                ]}
                externalPlaceholder="Seleccionar rol"
                searchPlaceholder="Buscar rol"
                defaultValue="ninguno"
                onChange={handleInputComboboxChange}  
                name="roleId"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status-2">Estado</Label>
              <Input onChange={handleInputChange} id="status-2" name="status"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone-2">Teléfono</Label>
              <Input onChange={handleInputChange} id="phone-2" name="phone"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="contractType-2">Tipo de contrato</Label>
              <Input onChange={handleInputChange} id="contractType-2" name="contractType"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="shift-2">Turno</Label>
              <Input onChange={handleInputChange} id="shift-2" name="shift"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-2">Correo electrónico</Label>
              <Input onChange={handleInputChange} id="email-2" name="email"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password-2">Contraseña</Label>
              <Input type="password" onChange={handleInputChange} id="password-2" name="password"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="passwordRepeat-2">Vuelva a introducir Contraseña</Label>
              <Input type="password" onChange={handleInputChange} id="passwordRepeat-2" name="passwordRepeat"/>
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

      <Dialog open={openPasswordEditDialog} onOpenChange={handleUpdatePasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Actualizar contraseña</DialogTitle>
              <DialogDescription>
                Introduce la nueva contraseña
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
              <Label htmlFor="password-2">Nueva contraseña</Label>
              <Input type="password" onChange={handlePasswordUpdateChange} id="password-3" name="password"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="passwordRepeat-2">Vuelva a introducir nueva contraseña</Label>
              <Input type="password" onChange={handlePasswordUpdateChange} id="passwordRepeat-3" name="passwordRepeat"/>
            </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button  variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handlePasswordUpdate} type="submit">Guardar</Button>
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
                <Input onChange={handleInputUpdateChange} id="name-1" name="name" value={employeeToUpdate?.name || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email-1">Correo electrónico</Label>
                <Input onChange={handleInputUpdateChange} id="email-1" name="email" value={employeeToUpdate?.email || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address-1">Dirección</Label>
                <Input onChange={handleInputUpdateChange} id="address-1" name="address" value={employeeToUpdate?.address || ""}/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone-1">Teléfono</Label>
                <Input onChange={handleInputUpdateChange} id="phone-1" name="phone" value={employeeToUpdate?.phone || ""}/>
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