import type { IPackageModel } from "@/models/PackageModel";
import axios from "../api/axios";

export const createInvoice =  async (newInvoice: any, packages: IPackageModel[]): Promise<any> => {
  console.log("CREATE VEHICLE PAYLOAD" + JSON.stringify(newInvoice))
  console.log("CREATE PACKAGES PAYLOAD" + JSON.stringify(packages))

  const payload = {
    pricePerPound: newInvoice.pricePerPound,
    pounds: newInvoice.pounds,
    total: newInvoice.total,
    packages: [
      ...packages
    ]
  }

  const response = await axios.post("/Invoice", payload);
  return response;
};