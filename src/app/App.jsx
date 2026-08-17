import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

import Login from '../pages/Login';
import OtpVerification from '../pages/OtpVerification';

const Dashboard = () => (
  <div className="p-8 text-white bg-gray-900 min-h-screen">
    <h1 className="text-3xl font-bold">Disaster Management Dashboard</h1>
    <p className="mt-2 text-gray-400">Authenticated successfully!</p>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verify" element={<OtpVerification />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}