import axios from "../api/axios";
import type { IShipmentModel } from "../models/shipment";

export const getShipments = async (isOriginOrDestination = ""): Promise<IShipmentModel[]> => {
  const response = await axios.get<IShipmentModel[]>("/Shipment", {
    params: {
      isOriginOrDestination: isOriginOrDestination
    }
  })
  return response.data;
};