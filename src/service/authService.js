import api from "../config/api";

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const sendOtp = async (email) => {
  const response = await api.post("/auth/send-otp", {
    email,
  });

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await api.post("/auth/verify-otp", {
    email,
    otp,
  });

  return response.data;
};

export const refreshToken = async (refreshTokenValue) => {
  const response = await api.post("/auth/refresh-token", {
    refreshToken: refreshTokenValue,
  });

  return response.data;
};

export const logoutUser = async (refreshTokenValue) => {
  const response = await api.post("/auth/logout", {
    refreshToken: refreshTokenValue,
  });

  return response.data;
};