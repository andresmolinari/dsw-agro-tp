// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const payload = JSON.parse(atob(token.split(".")[1])); // decodificar JWT
  if (payload.rolId !== 2) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
