import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShieldAlert,
  Radio,
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
  Info,
  Layers,

} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const servicesRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

 

  return (
    <header className="top-0 z-50 w-full sticky">
   

      {/* ============================================================ */}
      {/* MAIN NAVIGATION BAR                                          */}
      {/* ============================================================ */}
      <nav className="w-full bg-slate-900/95 border-b border-slate-800 text-white backdrop-blur-xl">
        <div className="px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="justify-between h-16 flex items-center sm:h-20">
            
            {/* Brand Logo & System Status */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 justify-center text-blue-400 shadow-lg shadow-blue-500/10 flex items-center group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="gap-1.5 text-lg font-bold text-white tracking-wider uppercase flex items-center">
                    WEFD <span className="text-blue-500 font-extrabold">RESQUE OS</span>
                  </span>
                  <p className="text-[10px] text-slate-400 tracking-tight hidden sm:block">
                    World Emergency & Forecasting Network
                  </p>
                </div>
              </Link>

              {/* Status Pill */}
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono hidden lg:flex items-center space-x-2">
                <Radio className="w-3.5 h-3.5 animate-ping" />
                <span className="font-semibold">SYS NORMAL • GRID ACTIVE</span>
              </div>
            </div>

            {/* Navigation Links & Services Dropdown */}
            <div className="hidden md:flex items-center space-x-2">
              
              {/* Dashboard */}
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

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${
                    servicesDropdownOpen
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {servicesDropdownOpen && (
                  <div className="mt-2 p-2 w-60 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 absolute left-0 animate-in fade-in duration-150">
                    
                    <Link
                      to="/live-map"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2.5 rounded-xl text-xs text-slate-300 flex items-center space-x-3 hover:text-white hover:bg-slate-800 transition"
                    >
                      <Map className="w-4 h-4 text-cyan-400" />
                      <div>
                        <p className="font-semibold text-slate-200">Live Incident Map</p>
                        <p className="text-[10px] text-slate-400">GIS Satellite Disaster Tracking</p>
                      </div>
                    </Link>

                    <Link
                      to="/alerts"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2.5 rounded-xl text-xs text-slate-300 flex items-center space-x-3 hover:text-white hover:bg-slate-800 transition"
                    >
                      <Bell className="w-4 h-4 text-amber-400" />
                      <div>
                        <p className="font-semibold text-slate-200">Early Alerts</p>
                        <p className="text-[10px] text-slate-400">Forecasting & Warning System</p>
                      </div>
                    </Link>

                    <Link
                      to="/resources"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2.5 rounded-xl text-xs text-slate-300 flex items-center space-x-3 hover:text-white hover:bg-slate-800 transition"
                    >
                      <Users className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="font-semibold text-slate-200">Resource Allocation</p>
                        <p className="text-[10px] text-slate-400">Relief Teams & Supplies</p>
                      </div>
                    </Link>

                    <Link
                      to="/about"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2.5 mt-1 pt-2 rounded-xl text-xs text-slate-300 border-t border-slate-800 flex items-center space-x-3 hover:text-white hover:bg-slate-800 transition"
                    >
                      <Info className="w-4 h-4 text-purple-400" />
                      <div>
                        <p className="font-semibold text-slate-200">About WEFD Network</p>
                        <p className="text-[10px] text-slate-400">Mission & Partner Agencies</p>
                      </div>
                    </Link>

                  </div>
                )}
              </div>

            </div>

            {/* Right Actions: Authenticated User Profile or Sign In */}
            <div className="hidden sm:flex items-center space-x-3">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700 pr-3 flex items-center space-x-3 hover:border-slate-600 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold justify-center text-xs shadow-md flex items-center">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    
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

                  {/* Profile Dropdown */}
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

            {/* Mobile Hamburger Toggle */}
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

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/95 md:hidden space-y-3 backdrop-blur-2xl">
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
              <Map className="w-5 h-5 text-cyan-400" />
              <span>Live Incident Map</span>
            </Link>

            <Link
              to="/alerts"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 flex items-center space-x-3 hover:bg-slate-800"
            >
              <Bell className="w-5 h-5 text-amber-400" />
              <span>Early Alerts</span>
            </Link>

            <Link
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 flex items-center space-x-3 hover:bg-slate-800"
            >
              <Users className="w-5 h-5 text-blue-400" />
              <span>Resource Management</span>
            </Link>

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
    </header>
  );
};

export default Navbar;