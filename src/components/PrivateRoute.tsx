import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute: React.FC = () => {
  const { token, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  console.log('TOKEN' + token)
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
