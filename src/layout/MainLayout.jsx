import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../components/header/TopBar";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex">

  

      <Sidebar />

      <div className="flex-1 flex-col min-h-screen flex">

        {/* Emergency / System Top Bar */}
        <TopBar />

        {/* Main Navigation */}
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />

      </div>
    </div>
  );

  
};

export default MainLayout;