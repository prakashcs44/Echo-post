import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function IndexPage() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />;
}

export default IndexPage;
