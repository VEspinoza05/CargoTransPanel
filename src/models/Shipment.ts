import type { IUserModel } from "./User";

export interface IShipmentModel {
  shipmentId: string,
  shippingDate: Date,
  originBranch: string,
  destinationBranch: string,
  state: string,
  customerName: string,
  userId: string,
  userData: IUserModel,
}