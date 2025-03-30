import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the token exists
  const userRole = localStorage.getItem("role"); // Get the user role
  console.log(userRole);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, check the role and redirect accordingly
  if (userRole !== "admin" && window.location.pathname === "/admin") {
    return <Navigate to="/user" replace />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;
