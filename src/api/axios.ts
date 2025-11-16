import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_CARGOTRANS_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("apiToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
