import axios from "../api/axios";
import type { IShipmentModel } from "../models/shipment";

export const getShipments = async (): Promise<IShipmentModel[]> => {
  const response = await axios.get<IShipmentModel[]>("/Shipment")
  return response.data;
};