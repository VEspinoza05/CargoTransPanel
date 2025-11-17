import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatInTimeZone } from "date-fns-tz";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface ReviewDescription {
  purchaseRequestId: number,
  revisionDate: Date,
  revisionDescription: string,
  status: string,
}

interface DeletePurchaseReqestAlertProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
  reviewDataParam: ReviewDescription
}

export function RequestReviewDialog({open, onOpenChange, reviewDataParam}: DeletePurchaseReqestAlertProps) {
  const [reviewData, setReviewData] = useState<ReviewDescription | null>(reviewDataParam);
  
  useEffect(() => {
    setReviewData(reviewDataParam);
  }, [reviewDataParam]);

    return (
        <Dialog
          open={open}
          onOpenChange={(state) => {
            onOpenChange(state)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Revisión de la solicitud de compra {reviewData?.purchaseRequestId ||""}</DialogTitle>
            </DialogHeader>
            <div>
              <h1 className="font-bold">Fecha de revisión:</h1>
              <p>
              {formatInTimeZone(String(reviewData?.revisionDate || new Date()), 'America/Costa_Rica', 'dd-MM-yyyy hh:mm a')}
              </p>
              <h1 className="font-bold">Estado:</h1>
              <p>{reviewData?.status || ""}</p>
              <h1 className="font-bold">Descripción de la revisión:</h1>
              <p>{reviewData?.revisionDescription || ""}</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}