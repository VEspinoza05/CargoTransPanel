import type { IVehicleModel } from "@/models/VehicleModel";
import axios from "../api/axios";

export const getVehicles = async (): Promise<IVehicleModel[]> => {
  const response = await axios.get<IVehicleModel[]>("/Vehicle")
  return response.data;
};

export const deleteVehicle = async (id: number): Promise<string> => {
  const response = await axios.delete(`/Vehicle/${id}`)
  return response.data;
};

export const createVehicle =  async (newShipment: any): Promise<any> => {
  const response = await axios.post("/Vehicle", {
    ...newShipment
  });
  return response.data;
};

export const updateVehicle =  async (id: number, updatedShipment: any): Promise<any> => {
  const response = await axios.put(`/Vehicle/${id}`, {
    vehicleLicensePlate: updatedShipment.vehicleLicensePlate,
    type: updatedShipment.type,
    capacity: updatedShipment.capacity,
    status: updatedShipment.status,
    driverId: updatedShipment.driverId,
    brand: updatedShipment.brand,
    model: updatedShipment.model,
    serial: updatedShipment.serial,
  });
  return response.data;
};