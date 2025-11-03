import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, initializing } = useAuth();

  if (initializing) return null; // Wait for Firebase auth to initialize

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  // ✅ Get role from localStorage (since Firebase user doesn't include roles)
  const role = localStorage.getItem("role");

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but not authorized for this page
    return <Navigate to="/" replace />;
  }

  // Authorized: render the child component
  return children;
}
