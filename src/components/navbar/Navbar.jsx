import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShieldAlert,
  Radio,
  PhoneCall,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Bell,
  Map,
  Users,
  ChevronDown,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="top-0 z-50 w-full bg-slate-900/90 border-b border-slate-800 text-white sticky backdrop-blur-xl">
      <div className="px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="justify-between h-16 flex items-center sm:h-20">
          
          {/* ============================================================ */}
          {/* 1. BRAND LOGO & SYSTEM HEALTH BADGE                         */}
          {/* ============================================================ */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 justify-center text-blue-400 shadow-lg shadow-blue-500/10 flex items-center group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="gap-1.5 text-lg font-bold text-white tracking-wider uppercase flex items-center">
                  RESQUE <span className="text-blue-500 font-extrabold">OS</span>
                </span>
                <p className="text-[10px] text-slate-400 tracking-tight hidden sm:block">
                  Smart Response Network
                </p>
              </div>
            </Link>

            {/* Live Operational Status Indicator */}
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono hidden lg:flex items-center space-x-2">
              <Radio className="w-3.5 h-3.5 animate-ping" />
              <span className="font-semibold">SYS NORMAL • GRID ACTIVE</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 2. NAVIGATION LINKS (DESKTOP)                                */}
          {/* ============================================================ */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${
                isActive("/dashboard")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/live-map"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${
                isActive("/live-map")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Live Map</span>
            </Link>

            <Link
              to="/alerts"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${
                isActive("/alerts")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Early Alerts</span>
            </Link>

            <Link
              to="/resources"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${
                isActive("/resources")
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Resources</span>
            </Link>
          </div>

          {/* ============================================================ */}
          {/* 3. RIGHT ACTIONS: SOS CALL & AUTH USER PROFILE               */}
          {/* ============================================================ */}
          <div className="hidden sm:flex items-center space-x-4">
            
            {/* SOS Emergency Helpline Button */}
            <a
              href="tel:112"
              className="px-3.5 py-2 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold shadow-lg shadow-red-600/10 hover:bg-red-600 hover:text-white transition duration-200 flex items-center space-x-2"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>SOS HOTLINE: 112</span>
            </a>

            {/* Authenticated User Menu or Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700 pr-3 flex items-center space-x-3 hover:border-slate-600 transition"
                >
                  {/* User Initial Avatar */}
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold justify-center text-xs shadow-md flex items-center">
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  
                  {/* Username & Role Display */}
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-slate-200 leading-tight">
                      {user.username || "Operator"}
                    </p>
                    <span className="text-[10px] font-mono text-blue-400 uppercase">
                      {user.role || "USER"}
                    </span>
                  </div>
                  
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="mt-2 p-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 absolute right-0 animate-in fade-in duration-150">
                    <div className="px-3 py-2 mb-1 border-b border-slate-800">
                      <p className="text-xs font-bold text-white truncate">
                        {user.username || "Operator"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        ROLE: <span className="text-blue-400 font-bold">{user.role || "USER"}</span>
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="px-3 py-2 rounded-xl text-xs text-slate-300 flex items-center space-x-2.5 hover:text-white hover:bg-slate-800 transition"
                    >
                      <User className="w-4 h-4 text-blue-400" />
                      <span>Account Settings</span>
                    </Link>

                    {user.role === "ADMIN" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="px-3 py-2 rounded-xl text-xs text-slate-300 flex items-center space-x-2.5 hover:text-white hover:bg-slate-800 transition"
                      >
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 mt-1 w-full rounded-xl text-xs text-red-400 flex items-center space-x-2.5 hover:bg-red-500/10 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-600/30 hover:bg-blue-500 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* 4. MOBILE HAMBURGER TOGGLE BUTTON                            */}
          {/* ============================================================ */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. MOBILE DRAWER MENU                                         */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div className="p-4 border-t border-slate-800 bg-slate-900/95 md:hidden space-y-3 backdrop-blur-2xl">
          
          {/* User Header in Mobile Menu */}
          {user && (
            <div className="p-3 mb-2 bg-slate-800/60 rounded-xl border border-slate-700 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold justify-center text-sm flex items-center">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{user.username}</p>
                <p className="text-[10px] text-blue-400 font-mono uppercase">{user.role || "USER"}</p>
              </div>
            </div>
          )}

          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 flex items-center space-x-3 hover:bg-slate-800"
          >
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/live-map"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 flex items-center space-x-3 hover:bg-slate-800"
          >
            <Map className="w-5 h-5 text-blue-400" />
            <span>Live Incident Map</span>
          </Link>

          <Link
            to="/alerts"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 flex items-center space-x-3 hover:bg-slate-800"
          >
            <Bell className="w-5 h-5 text-blue-400" />
            <span>Early Alerts</span>
          </Link>

          <a
            href="tel:112"
            className="px-4 py-3 justify-center rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 font-bold text-sm flex items-center space-x-2"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>EMERGENCY SOS: 112</span>
          </a>

          <div className="pt-3 border-t border-slate-800">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-3 w-full justify-center rounded-xl bg-red-500/10 text-red-400 font-semibold text-sm flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;