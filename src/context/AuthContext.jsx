import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    
    if (accessToken) {
      setUser({ role });
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (authData) => {
    const { accessToken, refreshToken, role } = authData;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('role', role);
    setUser({ role });
  };

  const login = async (username, password) => {
    const res = await authService.login(username, password);
    if (res.success) handleAuthSuccess(res.data);
    return res;
  };

  const register = async (username, email, password) => {
    const res = await authService.register(username, email, password);
    if (res.success) handleAuthSuccess(res.data);
    return res;
  };

  const verifyOtp = async (email, otp) => {
    const res = await authService.verifyOtp(email, otp);
    if (res.success) handleAuthSuccess(res.data);
    return res;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, verifyOtp, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};