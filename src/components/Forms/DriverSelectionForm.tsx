import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { MouseEventHandler } from "react";

interface DriverSelectionFormProps {
  open: boolean | undefined,
  onOpenChange: (open: boolean) => void
  onClickHandler: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function DriverSelectionForm({open, onOpenChange, onClickHandler}:DriverSelectionFormProps) {
  return(
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Envio</DialogTitle>
          <DialogDescription>
            Selecciona un Conductor
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Input />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button  variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={onClickHandler} type="submit">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}