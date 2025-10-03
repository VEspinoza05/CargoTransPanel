import axios from "../api/axios";
import type { IShipmentModel } from "../models/shipment";
import type { NewShipmentDTO } from "../dtos/NewShipmentDTO";

export const getShipments = async (isOriginOrDestination = ""): Promise<IShipmentModel[]> => {
  const response = await axios.get<IShipmentModel[]>("/Shipment", {
    params: {
      isOriginOrDestination: isOriginOrDestination
    }
  })
  return response.data;
};

export const createShipment = async (newShipment: NewShipmentDTO): Promise<any> => {
  const response = await axios.post("/Shipment", {
    shippingDate: newShipment.shippingDate,
    customerName: newShipment.customerName,
    destinationBranch: newShipment.destinationBranch,
  })
  return response.data;
}