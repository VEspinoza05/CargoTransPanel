import type { ILoginLogModel } from "@/models/LoginLog";
import axios from "../api/axios";

export const getLoginLogs = async (): Promise<ILoginLogModel[]> => {
  const response = await axios.get<ILoginLogModel[]>("/LoginLog")
  return response.data;
};