export interface IPurchaseModel {
  id: number,
  supplierId: number,
  supplier: {
    id: number,
    name: string,
    email: string,
    address: string,
    phone: string,
  },
  requestDate: Date
  productName: string,
  productDescription: string,
  quantity: number,
  unitPrice: number,
  total: number,
  status: string,
  revisionDate: Date | null,
  revisionDescription: string | null,
  senderEmployeeId: number,
}