import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleGuard = ({ allowedRoles = [] }) => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen justify-center flex items-center">
        Loading...
      </div>
    );
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;