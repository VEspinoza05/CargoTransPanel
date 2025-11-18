import React, { createContext, useContext, useState } from "react";
import { login as apiLogin } from "../services/AuthService";

interface AuthContextType {
  token: string | null;
  role: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("apiToken"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const data = await apiLogin(email, password);
    setToken(data.token);
    setRole(data.role);

    localStorage.setItem("apiToken", data.token);
    localStorage.setItem("role", data.role);

    setLoading(false);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("apiToken");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
