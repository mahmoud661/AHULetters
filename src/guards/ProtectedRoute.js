// ProtectedRoute.js
import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false, ...rest }) => {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return <Navigate to="/" />;
  }

  if (adminOnly && admin.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
