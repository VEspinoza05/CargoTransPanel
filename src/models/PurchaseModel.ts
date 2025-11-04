export interface IPurchaseModel {
  purchaseId: string,
  supplier: string,
  requestDate: Date,
  productName: string,
  productDescription: string,
  quantity: number,
  unitPrice: number,
  total: number,
  status: string,
}