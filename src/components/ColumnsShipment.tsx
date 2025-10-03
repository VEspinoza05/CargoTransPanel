import type { ColumnDef } from "@tanstack/react-table"
import type { IShipmentModel } from "../models/shipment"
import { Button } from "./ui/button"

export const ColumnsShipment: ColumnDef<IShipmentModel>[] = [
  {
    accessorKey: "shipmentId",
    header: "shipmentId",
  },
  {
    accessorKey: "shippingDate",
    header: "shippingDate",
  },
  {
    accessorKey: "originBranch",
    header: "originBranch",
  },
  {
    accessorKey: "destinationBranch",
    header: "destinationBranch",
  },
  {
    accessorKey: "state",
    header: "state",
  },
  {
    accessorKey: "customerName",
    header: "customerName",
  },
  {
    accessorKey: "userName",
    header: "SendedBy",
  }
]