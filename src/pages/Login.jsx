import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(formData.username, formData.password);
      if (res.success) {
        toast.success(res.message || 'Login successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen justify-center bg-gray-900 text-white flex items-center">
      <div className="p-8 bg-gray-800 rounded-xl shadow-2xl max-w-md w-full border border-gray-700">
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-500">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 text-sm text-gray-400 block">Username</label>
            <input
              type="text"
              required
              className="px-4 py-2 w-full bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 text-sm text-gray-400 block">Password</label>
            <input
              type="password"
              required
              className="px-4 py-2 w-full bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="py-3 w-full bg-blue-600 font-semibold rounded hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-400 space-y-2">
          <p>
            Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
          </p>
          <p>
            Prefer OTP login? <Link to="/otp-verify" className="text-blue-400 hover:underline">Verify OTP</Link>
          </p>
        </div>
      </div>
    </div>
  );
}