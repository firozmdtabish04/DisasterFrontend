import React from "react";
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import OtpVerification from "../pages/auth/OtpVerification";

import Dashboard from "../pages/dashboard/Dashboard";

import AuthGuard from "../guards/AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/verify-otp",
    element: <OtpVerification />,
  },



  {
    element: <AuthGuard />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);