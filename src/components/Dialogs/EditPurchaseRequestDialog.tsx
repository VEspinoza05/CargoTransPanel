import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Combobox, type listComboboxElements } from "@/components/ui/combobox";
import { Button } from "../ui/button";
import { useEffect, useState, } from "react";

interface updatePurchaseRequest {
  "id": number
  "supplierId": number
  "productName": string
  "productDescription": string
  "quantity": number
  "unitPrice": number
  "total": number
  "status": string
}

interface EditPurchaseRequestDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
  submitHandler: (dataToUpload: any) => Promise<void>
  comboBoxDataList: listComboboxElements[]
  purchaseToUpdate: updatePurchaseRequest;
}

export function EditPurchaseRequestDialog({open, onOpenChange, submitHandler, comboBoxDataList, purchaseToUpdate}: EditPurchaseRequestDialogProps) {
  const [purchaseRequest, setPurchaseRequest] = useState<updatePurchaseRequest | null>(purchaseToUpdate);

  useEffect(() => {
    setPurchaseRequest(purchaseToUpdate);
  }, [purchaseToUpdate]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPurchaseRequest((previousPurchaseData : any) => ({
      ...previousPurchaseData,
      [name]: value,
    }));
  }

  const handleInputComboboxChange = (
    event: { target: { name?: string; value: string } }
  ) => {
    const { name, value } = event.target;
    setPurchaseRequest((previousPurchaseData: any) => ({
      ...previousPurchaseData,
      [name!]: value,
    }));
  };

  console.log("PURCHASE REQUEST UPDATE IN DIALOG: " + JSON.stringify(purchaseRequest))

  return(
    <Dialog open={open} onOpenChange={(state) => {
      onOpenChange(state)
      // if (!state) {
      //   setPurchaseRequest(new updatePurchaseRequest());
      // }
    }}>
      <DialogContent className="sm:max-w-[425px] max-h-9/10 overflow-scroll">
        <DialogHeader>
          <DialogTitle>Editar Solicitud de compra</DialogTitle>
          <DialogDescription>
            Introduce los datos para editar la solicitud
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="productName-1">Nombre Producto</Label>
            <Input onChange={handleInputChange} id="productName-1" name="productName" value={purchaseRequest?.productName || ""}/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="productDescription-1">Descripcion</Label>
            <Input onChange={handleInputChange} id="productDescription-1" name="productDescription" value={purchaseRequest?.productDescription || ""}/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="quantity-1">Cantidad</Label>
            <Input onChange={handleInputChange} id="quantity-1" name="quantity" value={purchaseRequest?.quantity || ""}/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="unitPrice-1">Precio unitario</Label>
            <Input onChange={handleInputChange} id="unitPrice-1" name="unitPrice" value={purchaseRequest?.unitPrice || ""}/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="supplierId-1">Proveedor</Label>
            <Combobox
              dataList={[
                {
                  value: "ninguno",
                  label: "Ninguno",
                },
                ...comboBoxDataList
              ]}
              externalPlaceholder="Seleccionar rol"
              searchPlaceholder="Buscar rol"
              defaultValue={String(purchaseRequest?.supplierId?.toString())}
              onChange={handleInputComboboxChange}  
              name="supplierId"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={async () => {
            await submitHandler(purchaseRequest);
          }} type="submit">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}