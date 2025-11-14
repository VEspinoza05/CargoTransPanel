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

// export const createLoginLog =  async (): Promise<any> => {
//   const response = await axios.post("/Vehicle");
//   return response.data;
// }