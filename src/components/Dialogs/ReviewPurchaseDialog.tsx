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
import { Button } from "../ui/button";
import { useState, } from "react";

class reviewPurchaseRequest {
  "status": string
  "revisionDescription": string
}

interface CreatePurhcaseRequestDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
  submitHandler: (dataToUpload: any) => Promise<void>
}

export function ReviewPurchaseDialog({open, onOpenChange, submitHandler}: CreatePurhcaseRequestDialogProps) {
  const [purchaseRequest, setPurchaseRequest] = useState<reviewPurchaseRequest>(new reviewPurchaseRequest());

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPurchaseRequest((previousPurchaseData : any) => ({
      ...previousPurchaseData,
      [name]: value,
    }));
  }

  return(
    <Dialog open={open} onOpenChange={(state) => {
      onOpenChange(state)
      if (!state) {
        setPurchaseRequest(new reviewPurchaseRequest());
      }
    }}>
      <DialogContent className="sm:max-w-[425px] max-h-9/10 overflow-scroll">
        <DialogHeader>
          <DialogTitle>Revision de solicitud</DialogTitle>
          <DialogDescription>
            Introduce la revision de solicitud
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="status-7">Estado</Label>
            <Input onChange={handleInputChange} id="status-7" name="status"/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="revisionDescription-7">Descripcion de revision</Label>
            <Input onChange={handleInputChange} id="revisionDescription-7" name="revisionDescription"/>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={async () => {
            await submitHandler(purchaseRequest);
            setPurchaseRequest(new reviewPurchaseRequest());
          }} type="submit">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}