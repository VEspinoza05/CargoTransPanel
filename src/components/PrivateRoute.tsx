import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if(user)
    console.log(user.getIdToken())

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
