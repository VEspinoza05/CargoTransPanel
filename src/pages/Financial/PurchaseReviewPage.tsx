import { Button } from "@/components/ui/button"
import { ColumnsPurchasesRequests } from "@/components/Columns/ColumnsPurchasesRequests";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable"
import { PlusCircle } from "lucide-react"
import type { IPurchaseModel } from "@/models/PurchaseModel";
import { CreatePurhcaseRequestDialog } from "@/components/Dialogs/CreatePurhcaseRequestDialog";
import { getSuppliers } from "@/services/SupplierService";
import { createPurchase, deletePurchase, getPurchases, reviewPurchase, updatePurchase } from "@/services/PurchaseService";
import { useAuth } from "@/contexts/AuthContext";
import { decodeToken } from "@/layouts/MainLayout";
import type { listComboboxElements } from "@/components/ui/combobox";
import { DeleteAlert } from "@/components/Dialogs/DeleteAlert";
import { EditPurchaseRequestDialog } from "@/components/Dialogs/EditPurchaseRequestDialog";
import { RequestReviewDialog } from "@/components/Dialogs/RequestReviewDialog";
import { ReviewPurchaseDialog } from "@/components/Dialogs/ReviewPurchaseDialog";

interface newPurchaseRequest {
  supplierId: number,
  productName: string,
  productDescription: string,
  quantity: number,
  unitPrice: number,
  total: number,
  status: string,
}


export default function PurchaseReviewPage() {
  const [purchases, setPurchases] = useState<IPurchaseModel[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [suppliers, setSuppliers] = useState<listComboboxElements[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [purchaseToDeleteId, setPurchaseToDeleteId]= useState<any>(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [purchaseToUpdate, setPurchaseToUpdate]= useState<any>(null);
  const [reviewData, setReviewData] = useState<any>(null);
  const [openReviewDataAlert, setOpenReviewDataAlert] = useState(false);
  const [openCreateReviewDialog, setOpenCreateReviewDialog] = useState(false);
  const [purchaseToReviewId, setPurchaseToReviewId] = useState(null);

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

  const handleDelete = async () => {
    const response = await deletePurchase(purchaseToDeleteId);

    if(response === "Purchase deleted successfully"){
      setPurchases((prev) => 
        prev.filter((purchase) => 
          purchaseToDeleteId !== purchase.id)
      )
      
      toast("Resultado",
        {description: `El proveedor ${purchaseToDeleteId} fue eliminado exitosamente.`,}
      ); 
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setPurchaseToDeleteId(null)
  }

const handleUpdate = async (payload: any) => {
    const response = await updatePurchase(payload.id, payload);
    if(response.status === 200){
      toast("Resultado",
        {description: `La solicitud ${purchaseToUpdate.id} fue actualizada exitosamente.`,}
      ); 

      const updatedPurchase = response.data

      setPurchases((prev) => 
        prev.map((purchase) => 
          updatedPurchase.id === purchase.id
          ? { ...updatedPurchase }
          : purchase
        )
      )
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setOpenUpdateDialog(false)
    setPurchaseToUpdate(null)
  }

  const handleCreateDialogOpen = (newOpenState: boolean) => {
    setOpenCreateDialog(newOpenState);
  };

  const handleUpdateDialogOpen = (newOpenState: boolean) => {
    setOpenUpdateDialog(newOpenState);
  };

  const handleOpenDeleteAlert = (newOpenState: boolean) => {
    setOpenDeleteAlert(newOpenState);
    setPurchaseToDeleteId(null)
  };

  const handleOpenCreateReviewAlert = (newOpenState: boolean) => {
    setOpenCreateReviewDialog(newOpenState);
    setPurchaseToReviewId(null)
  };

  const handleReview = async (payload: any) => {
    const response = await reviewPurchase(purchaseToReviewId, payload);
    if(response.status === 200){
      toast("Resultado",
        {description: `La solicitud ${purchaseToReviewId} fue actualizada exitosamente.`,}
      ); 

      const updatedPurchase = response.data

      setPurchases((prev) => 
        prev.map((purchase) => 
          purchaseToReviewId === purchase.id
          ? { ...updatedPurchase }
          : purchase
        )
      )
    }
    else {
      toast("Error",
        {description: `Ha ocurrido un error`,}
      ); 
    }

    setOpenCreateReviewDialog(false)
    setPurchaseToReviewId(null)
  }

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
  
      setOpenUpdateDialog(false);
    }
  
  const columns = [...ColumnsPurchasesRequests]
  columns.push({
    id:"Actions",
    header: "Accion",
    cell: ({row}) => {
      if(row.getValue("status") === "Aprobada" || row.getValue("status") === "Rechazada") {
        return (
          <Button
            
            onClick={() => {
              setReviewData({
                purchaseRequestId: row.original.id,
                revisionDate: row.original.revisionDate,
                revisionDescription: row.original.revisionDescription,
                status: row.original.status,
              })

              setOpenReviewDataAlert(true)
            }}
          >
            Ver detalles de revisión
          </Button>
        )
      }

      return(
        <div className="flex gap-2">
          <Button
          variant={"edit"}
            onClick={() => {
              handleOpenCreateReviewAlert(true)
              setPurchaseToReviewId(row.getValue("id"))
            }}
          >
            Revisar solicitud
          </Button>
        </div>
      )
    },
  });

  console.log("PURCHASE REQUEST UPDATE IN PAGE: " + JSON.stringify(purchaseToUpdate))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de solicitudes de compras</h1>
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

      <DeleteAlert 
        open={openDeleteAlert}
        onOpenChange={handleOpenDeleteAlert}
        submitHandler={handleDelete}
      />

      <EditPurchaseRequestDialog
        open={openUpdateDialog}
        onOpenChange={handleUpdateDialogOpen}
        submitHandler={handleUpdate}
        comboBoxDataList={suppliers}
        purchaseToUpdate={purchaseToUpdate}
      />

      <RequestReviewDialog
        open={openReviewDataAlert}
        onOpenChange={setOpenReviewDataAlert}
        reviewDataParam={reviewData}
      />

      <ReviewPurchaseDialog
        open={openCreateReviewDialog}
        onOpenChange={handleOpenCreateReviewAlert}
        submitHandler={handleReview}
      />
    </div>
  )
}