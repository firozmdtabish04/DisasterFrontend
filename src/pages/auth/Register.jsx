import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  Bell,
  MapPin,
  Users,
  LineChart,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
  ChevronDown,
  Activity,
  UserPlus,
  ArrowRight,
  Radio,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

import LeftImg from "../../assets/LoginPage.png";
import { registerUser, sendOtp } from "../../service/authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await registerUser(form);

      if (!response.success) {
        throw new Error(response.message || "Registration failed");
      }

      toast.success("Account created! Sending OTP code...");

      // Trigger OTP creation
      await sendOtp(form.email);

      toast.success("OTP sent to your email!");

      // Redirect to OTP verification page with state
      navigate("/verify-otp", {
        state: {
          email: form.email,
          username: form.username,
        },
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // OAuth Providers Trigger Handlers
  const handleGoogleLogin = () => {
    toast.loading("Redirecting to Google Sign-Up...");
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  const handleMicrosoftLogin = () => {
    toast.loading("Redirecting to Microsoft Sign-Up...");
    window.location.href = `${API_BASE_URL}/oauth2/authorization/microsoft`;
  };

  return (
    <div className="p-4 min-h-screen w-full bg-slate-100 justify-center font-sans flex items-center sm:p-6 md:p-8">
      {/* MAIN CONTAINER CARD */}
      <div className="grid grid-cols-1 w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[700px] lg:grid-cols-12 animate-in fade-in duration-300">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: DISASTER HERO SECTION                           */}
        {/* ============================================================ */}
        <div className="flex-col p-8 bg-slate-900 text-white justify-between overflow-hidden sm:p-10 lg:col-span-6 relative flex">
          
          {/* Background Image Container */}
          <div className="z-0 overflow-hidden absolute inset-0">
            <img
              src={LeftImg}
              alt="Smart Disaster Response"
              className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 hover:scale-100"
            />
            {/* Dark Overlays for Optimal Text Readability */}
            <div className="bg-slate-950/40 absolute inset-0" />
            <div className="bg-gradient-to-t absolute inset-0 from-slate-950 via-slate-950/60 to-slate-900/30" />
          </div>

          {/* Top Brand Info */}
          <div className="z-10 relative space-y-4">
            
            {/* System Status Pill */}
            <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono inline-flex items-center space-x-2 backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-blue-400 animate-ping" />
              <span>LIVE GRID ONLINE • WEFD v4.2</span>
            </div>

            <div className="pt-1 flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 justify-center text-blue-400 shadow-xl backdrop-blur-md flex items-center">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white sm:text-3xl tracking-tight leading-none">
                  Smart Disaster
                </h1>
                <h1 className="mt-1 text-2xl font-extrabold text-blue-400 sm:text-3xl tracking-tight leading-none">
                  Response Network
                </h1>
              </div>
            </div>

            <p className="text-blue-300 font-semibold text-sm sm:text-base tracking-wide">
              Save Lives. Act Faster. Respond Smarter.
            </p>

            <p className="text-slate-300 text-xs max-w-md sm:text-sm leading-relaxed">
              Join a unified network for early warning, live satellite tracking, resource
              coordination, and emergency aid dispatch.
            </p>
          </div>

          {/* Bottom 4 Feature Cards */}
          <div className="grid grid-cols-4 gap-2 pt-12 z-10 relative sm:gap-3">
            <div className="flex-col p-3 text-center rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-center backdrop-blur-md hover:bg-slate-800/80 transition duration-200">
              <div className="mb-2 w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 justify-center shadow-inner flex items-center">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-200 leading-tight">
                Real-time Alerts
              </span>
            </div>

            <div className="flex-col p-3 text-center rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-center backdrop-blur-md hover:bg-slate-800/80 transition duration-200">
              <div className="mb-2 w-10 h-10 rounded-xl bg-cyan-600/30 text-cyan-400 justify-center shadow-inner flex items-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-200 leading-tight">
                Incident Map
              </span>
            </div>

            <div className="flex-col p-3 text-center rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-center backdrop-blur-md hover:bg-slate-800/80 transition duration-200">
              <div className="mb-2 w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 justify-center shadow-inner flex items-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-200 leading-tight">
                Resource Hub
              </span>
            </div>

            <div className="flex-col p-3 text-center rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-center backdrop-blur-md hover:bg-slate-800/80 transition duration-200">
              <div className="mb-2 w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 justify-center shadow-inner flex items-center">
                <LineChart className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-slate-200 leading-tight">
                Smart Analytics
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: REGISTRATION FORM                              */}
        {/* ============================================================ */}
        <div className="flex-col p-8 justify-between bg-white text-slate-800 sm:p-12 lg:col-span-6 flex relative">
          
          {/* Language Selector */}
          <div className="mb-2 justify-end flex">
            <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-sm flex items-center space-x-1.5 hover:bg-slate-50 transition">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-medium">English</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Form Header */}
          <div className="mb-6 text-center">
            <div className="mb-3 w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr justify-center text-white shadow-xl shadow-blue-500/25 from-blue-600 to-indigo-600 flex items-center">
              <div className="relative">
                <Shield className="w-8 h-8 fill-blue-600 stroke-white stroke-[1.5]" />
                <Activity className="m-auto w-3.5 h-3.5 text-white absolute inset-0" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Join the response network to request or coordinate aid
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center space-x-2 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div>
              <label className="mb-1 text-xs font-semibold text-slate-700 block">
                Username
              </label>
              <div className="relative group">
                <div className="text-slate-400 absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none group-focus-within:text-blue-600 transition">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="py-2.5 w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 pl-10 pr-4 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="mb-1 text-xs font-semibold text-slate-700 block">
                Email Address
              </label>
              <div className="relative group">
                <div className="text-slate-400 absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none group-focus-within:text-blue-600 transition">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="py-2.5 w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 pl-10 pr-4 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-1 text-xs font-semibold text-slate-700 block">
                Password
              </label>
              <div className="relative group">
                <div className="text-slate-400 absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none group-focus-within:text-blue-600 transition">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="py-2.5 w-full bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 pl-10 pr-10 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 absolute inset-y-0 right-0 pr-3.5 flex items-center hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-4 mt-2 w-full rounded-xl bg-gradient-to-r text-white font-semibold text-xs shadow-lg shadow-blue-500/25 justify-center from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account & Sending OTP...</span>
                </div>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register Account</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="my-5 text-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="px-3 bg-white text-[11px] text-slate-400 font-mono relative uppercase tracking-wider">
              or register with
            </span>
          </div>

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="py-2.5 px-4 justify-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 shadow-sm flex items-center space-x-2 hover:bg-slate-50 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className="py-2.5 px-4 justify-center rounded-xl border border-slate-200 text-xs font-medium text-slate-700 shadow-sm flex items-center space-x-2 hover:bg-slate-50 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              <span>Microsoft</span>
            </button>
          </div>

          {/* Footer Security Badge & Sign In Link */}
          <div className="flex-col mt-5 pt-3 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center space-y-1.5">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <div className="text-[10px] text-slate-400 font-mono flex items-center space-x-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>256-Bit SSL Encrypted Protocol</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;