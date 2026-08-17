import api from './axiosInstance';

export const authService = {
  // 1. Login
  login: async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    return response.data;
  },

  // 2. Register
  register: async (username, email, password) => {
    const response = await api.post('/api/auth/register', { username, email, password });
    return response.data;
  },

  // 3. Send OTP
  sendOtp: async (email) => {
    const response = await api.post('/api/auth/send-otp', { email });
    return response.data;
  },

  // 4. Verify OTP
  verifyOtp: async (email, otp) => {
    const response = await api.post('/api/auth/verify-otp', { email, otp });
    return response.data;
  },

  // 5. Manual Refresh Token Call (if needed)
  refreshToken: async (refreshToken) => {
    const response = await api.post('/api/auth/refresh-token', { refreshToken });
    return response.data;
  },
};