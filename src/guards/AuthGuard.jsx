import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthGuard = () => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen justify-center bg-slate-950 flex items-center">
        <div className="text-white">
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default AuthGuard;