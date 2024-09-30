/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("login"));

  if (!user || user.length === 0 || user[0].name !== "Administrator") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRouteAdmin;
