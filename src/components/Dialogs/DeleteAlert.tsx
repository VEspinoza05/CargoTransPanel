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

interface DeletePurchaseReqestAlertProps {
  open: boolean,
  onOpenChange: (open: boolean) => void
  submitHandler: (dataToUpload: any) => Promise<void>
}

export function DeleteAlert({open, onOpenChange, submitHandler}: DeletePurchaseReqestAlertProps) {

    return (
        <AlertDialog
          open={open}
          onOpenChange={(state) => {
            onOpenChange(state)
            
          }}
        >
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
                  onClick={submitHandler}
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    )
}