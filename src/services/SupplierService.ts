import type { ISupplierModel } from "@/models/SupplierModel";
import axios from "../api/axios";

export const getSuppliers = async (): Promise<ISupplierModel[]> => {
  const response = await axios.get<ISupplierModel[]>("/Supplier")
  return response.data;
};

export const deleteSupplier = async (id: number): Promise<string> => {
  const response = await axios.delete(`/Supplier/${id}`)
  return response.data;
};

export const createSupplier =  async (newSupplier: any): Promise<any> => {
  const response = await axios.post("/Supplier", {
    name: newSupplier.name,
    email: newSupplier.email,
    address: newSupplier.address,
    phone: newSupplier.phone,
  });
  return response.data;
};

export const updateSupplier =  async (id: number, updatedSupplier: any): Promise<any> => {
  const response = await axios.put(`/Supplier/${id}`, {
    name: updatedSupplier.name,
    email: updatedSupplier.email,
    address: updatedSupplier.address,
    phone: updatedSupplier.phone,
  });
  return response.data;
};