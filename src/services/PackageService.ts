import axios from "../api/axios";

export const getPackages = async (): Promise<any[]> => {
  const response = await axios.get<any[]>("/Package")
  console.log(JSON.stringify(response.data))
  return response.data;
};