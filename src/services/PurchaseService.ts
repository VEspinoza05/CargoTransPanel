import type { IPurchaseModel } from "@/models/PurchaseModel";
import axios from "../api/axios";

export const getPurchases = async (): Promise<IPurchaseModel[]> => {
  const response = await axios.get<IPurchaseModel[]>("/Purchase")
  return response.data;
};

export const createPurchase =  async (newPurchase: any): Promise<any> => {
  console.log("PURCHASE PAYLOAD: " + JSON.stringify(newPurchase))

  const response = await axios.post("/Purchase", {
    "supplierId": Number(newPurchase.supplierId),
    "productName": newPurchase.productName,
    "productDescription": newPurchase.productDescription,
    "quantity": newPurchase.quantity,
    "unitPrice": newPurchase.unitPrice,
    "total": (newPurchase.quantity * newPurchase.unitPrice),
    "status": "Enviada",
    "senderEmployeeId": Number(newPurchase.senderEmployeeId)
  });
  return response.data;
};

export const deletePurchase = async (id: number): Promise<string> => {
  const response = await axios.delete(`/Purchase/${id}`)
  return response.data;
};

export const updatePurchase =  async (id: number, updatedPurchase: any): Promise<any> => {


  const response = await axios.put(`/Purchase/${id}`, {
    supplierId: Number(updatedPurchase.supplierId),
    productName: updatedPurchase.productName,
    productDescription: updatedPurchase.productDescription,
    quantity: updatedPurchase.quantity,
    unitPrice: updatedPurchase.unitPrice,
    total: (updatedPurchase.quantity * updatedPurchase.unitPrice),
    status: updatedPurchase.status
  });

  console.log("UPDATED DATA: " + response)
  return response;
};
