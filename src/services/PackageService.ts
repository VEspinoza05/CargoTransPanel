import axios from "../api/axios";

export const getPackages = async (): Promise<any[]> => {
  const response = await axios.get<any[]>("/Package")
  console.log(JSON.stringify(response.data))
  return response.data;
};

export const changeVehicle =  async (id: number | null, packageData: any): Promise<any> => {
  if (id === null) return;

  console.log(JSON.stringify(packageData))
  console.log(id)

  const response = await axios.put(`/Package/Vehicle/${id}`, {
    id: packageData.id,
    vehicleId:packageData.vehicleId,
  });

  return response;
};

export const changeStatus =  async (id: number | null, packageData: any): Promise<any> => {
  if (id === null) return;

  const response = await axios.put(`/Package/Status/${id}`, {
    id: packageData.id,
    status:packageData.status,
  });

  return response;
};