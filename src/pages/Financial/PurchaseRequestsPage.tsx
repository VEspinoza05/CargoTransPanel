import { Button } from "@/components/ui/button"
import { ColumnsPurchasesRequests } from "@/components/Columns/ColumnsPurchasesRequests";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable"
import { PlusCircle } from "lucide-react"
import type { IPurchaseModel } from "@/models/PurchaseModel";
import { CreatePurhcaseRequestDialog } from "@/components/Dialogs/CreatePurhcaseRequestDialog";
import { getSuppliers } from "@/services/SupplierService";
import { createPurchase, getPurchases } from "@/services/PurchaseService";
import { useAuth } from "@/contexts/AuthContext";
import { decodeToken } from "@/layouts/MainLayout";
import type { listComboboxElements } from "@/components/ui/combobox";

interface newPurchaseRequest {
  supplierId: number,
  productName: string,
  productDescription: string,
  quantity: number,
  unitPrice: number,
  total: number,
  status: string,
}


export default function EmployeesManagementPage() {
  const [purchases, setPurchases] = useState<IPurchaseModel[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [suppliers, setSuppliers] = useState<listComboboxElements[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const { token } = useAuth();
  
  const tokenClaims = decodeToken(token)

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await getPurchases();
        setPurchases(data);
      } catch (error) {
        console.error("Error al cargar los datos de employee:", error);
      } finally {
        setLoadingPurchases(false);
      }
    }

    fetchPurchases()
  }, [])

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        const supplierList = data.map(supplier => {
          return {
            value: String(supplier.id),
            label: supplier.name
          }
        })

        setSuppliers(supplierList)

      } catch (error) {
        console.error("Error al cargar los datos de role:", error);
      }
    }

    fetchSuppliers()
  }, [])

  const handleCreateDialogOpen = (newOpenState: boolean) => {
    setOpenCreateDialog(newOpenState);
  };

  const handleSubmit = async (payload: any) => {
      try {
        payload.senderEmployeeId = tokenClaims["UserId"];
        const result = await createPurchase(payload);
        toast("Resultado",
          {description: `La solicitud fue creada exitosamente.`,}
        ); 
        setPurchases((prev) => 
          [...prev, result]
        )
      }
      catch (error) {
        console.error("Error:", error);
        toast("Error",
          {description: `Ha ocurrido un error`,}
        ); 
      }
  
      setOpenCreateDialog(false);
    }
  
  const columns = [...ColumnsPurchasesRequests]
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
              
            }}
          >
            Editar
          </Button>
          {/* Delete Button*/}
          <Button
            variant={"destructive"}
            onClick={() => {
              
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
        <h1 className="text-2xl font-bold">Gestión de solicitudes de compras</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => {
            setOpenCreateDialog(true)
          }}
        >
          <PlusCircle size={18} />
            Agregar Solicitud de compra
        </Button>
      </div>

      {loadingPurchases ?
        <p>Cargando datos...</p> :
        <div className="bg-white rounded-2xl shadow p-4">
          <DataTable columns={columns} data={purchases} />
        </div>
      }

      <CreatePurhcaseRequestDialog
        open={openCreateDialog}
        onOpenChange={handleCreateDialogOpen}
        submitHandler={handleSubmit}
        comboBoxDataList={suppliers}
      />
    </div>
  )
}