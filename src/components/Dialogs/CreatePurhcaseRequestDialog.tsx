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
import { useState, } from "react";

class newPurchaseRequest {
  "supplierId": number
  "productName": string
  "productDescription": string
  "quantity": number
  "unitPrice": number
  "total": number
  "status": string
  "senderEmployeeId": number
}

interface CreatePurhcaseRequestDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
  submitHandler: (dataToUpload: any) => Promise<void>
  comboBoxDataList: listComboboxElements[]
}

export function CreatePurhcaseRequestDialog({open, onOpenChange, submitHandler, comboBoxDataList}: CreatePurhcaseRequestDialogProps) {
  const [purchaseRequest, setPurchaseRequest] = useState<newPurchaseRequest>(new newPurchaseRequest());

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

  console.log(JSON.stringify(purchaseRequest))

  return(
    <Dialog open={open} onOpenChange={(state) => {
      onOpenChange(state)
      if (!state) {
        setPurchaseRequest(new newPurchaseRequest());
      }
    }}>
      <DialogContent className="sm:max-w-[425px] max-h-9/10 overflow-scroll">
        <DialogHeader>
          <DialogTitle>Nuevo Solicitud de compra</DialogTitle>
          <DialogDescription>
            Introduce los datos para un crear un nueva solicirud
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="productName-2">Nombre Producto</Label>
            <Input onChange={handleInputChange} id="productName-2" name="productName"/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="productDescription-2">Descripcion</Label>
            <Input onChange={handleInputChange} id="productDescription-2" name="productDescription"/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="quantity-2">Cantidad</Label>
            <Input onChange={handleInputChange} id="quantity-2" name="quantity"/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="unitPrice-2">Precio unitario</Label>
            <Input onChange={handleInputChange} id="unitPrice-2" name="unitPrice"/>
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
              defaultValue="ninguno"
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
            setPurchaseRequest(new newPurchaseRequest());
          }} type="submit">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}