import type { IRoleModel } from "@/models/RoleModel";
import axios from "../api/axios";

export const getRoles = async (): Promise<IRoleModel[]> => {
  const response = await axios.get<IRoleModel[]>("/Role")
  return response.data;
};