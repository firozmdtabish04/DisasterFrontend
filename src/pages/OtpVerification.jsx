import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function OtpVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
  const [loading, setLoading] = useState(false);
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.sendOtp(email);
      if (res.success) {
        toast.success(res.message || 'OTP sent to your email!');
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      if (res.success) {
        toast.success(res.message || 'OTP Verified!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen justify-center bg-gray-900 text-white flex items-center">
      <div className="p-8 bg-gray-800 rounded-xl shadow-2xl max-w-md w-full border border-gray-700">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-500">
          {step === 1 ? 'Request OTP' : 'Verify OTP'}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="mb-1 text-sm text-gray-400 block">Email Address</label>
              <input
                type="email"
                required
                className="px-4 py-2 w-full bg-gray-700 rounded border border-gray-600 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-3 w-full bg-blue-600 font-semibold rounded hover:bg-blue-700"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="mb-1 text-sm text-gray-400 block">Enter OTP Code</label>
              <input
                type="text"
                required
                maxLength={6}
                className="px-4 py-2 w-full bg-gray-700 rounded border border-gray-600 text-center text-xl tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-3 w-full bg-green-600 font-semibold rounded hover:bg-green-700"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-400 hover:underline"
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}