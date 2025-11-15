import type { IEmployeeModel } from "@/models/EmployeeModel";
import axios from "../api/axios";

export const getEmployees = async (): Promise<IEmployeeModel[]> => {
  const response = await axios.get<IEmployeeModel[]>("/Employee")
  
  return response.data;
};