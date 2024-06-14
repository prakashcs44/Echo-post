import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function UserRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />;
}

export default UserRoutes;
