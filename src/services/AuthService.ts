import api from "@/api/axios";

interface LoginResponse {
  token: string;
  role: string;
  branchCity: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post("/Auth/login", { email, password });
  console.log(response)
  return response.data;
};