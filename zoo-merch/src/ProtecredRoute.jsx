import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
