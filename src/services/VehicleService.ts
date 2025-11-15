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
  console.log("CREATE VEHICLE PAYLOAD" + JSON.stringify(newShipment))
  const response = await axios.post("/Vehicle", {
    vehicleLicensePlate: newShipment.vehicleLicensePlate,
    type: newShipment.type,
    capacity: newShipment.capacity,
    status: newShipment.status,
    driverId: newShipment.driverId === "ninguno" ? null : Number(newShipment.driverId),
    brand: newShipment.brand,
    model: newShipment.model,
    serial: newShipment.serial,
  });
  return response.data;
};

export const updateVehicle =  async (id: number, updatedShipment: any): Promise<any> => {
  const response = await axios.put(`/Vehicle/${id}`, {
    vehicleLicensePlate: updatedShipment.vehicleLicensePlate,
    type: updatedShipment.type,
    capacity: updatedShipment.capacity,
    status: updatedShipment.status,
    driverId: updatedShipment.driverId === "ninguno" ? null : Number(updatedShipment.driverId),
    brand: updatedShipment.brand,
    model: updatedShipment.model,
    serial: updatedShipment.serial,
  });
  return response.data;
};