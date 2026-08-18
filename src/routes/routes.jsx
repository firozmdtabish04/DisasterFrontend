import React from "react";
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";

import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import OtpVerification from "../pages/auth/OtpVerification";

import Dashboard from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  // =========================
  // AUTH / GUEST PAGES
  // =========================
  {
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
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
   
        ],
      },
    ],
  },

  // =========================
  // PROTECTED APP
  // =========================
  {
    // element: <AuthGuard />,  // change after done 
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },

          // Other protected pages
          // {
          //   path: "/incidents",
          //   element: <Incidents />,
          // },
        ],
      },
    ],
  },

  // =========================
  // DEFAULT
  // =========================
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);