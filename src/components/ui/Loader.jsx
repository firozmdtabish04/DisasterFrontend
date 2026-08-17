import React from "react";
import { ShieldAlert, Radio } from "lucide-react";

const Loader = ({ text = "INITIALIZING WEFD SYSTEM GRID..." }) => {
  return (
    <div className="flex-col z-50 justify-center bg-slate-950 text-white font-sans overflow-hidden fixed inset-0 flex items-center">
      
      {/* Background Ambient Glow & Grid Lines */}
      <div className="bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] absolute inset-0 pointer-events-none" />
      <div className="w-[400px] h-[400px] bg-blue-600/10 rounded-full absolute blur-3xl pointer-events-none" />

      {/* 1. THREE-RING RADAR SPINNER */}
      <div className="mb-8 justify-center relative flex items-center">
        
        {/* Outer Pulsing Ring */}
        <div className="w-28 h-28 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" style={{ animationDuration: '3s' }} />

        {/* Middle Counter-Rotating Ring */}
        <div className="w-20 h-20 rounded-full border-2 border-cyan-400/30 border-r-cyan-400 absolute animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />

        {/* Inner Radar Pulse */}
        <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/40 justify-center absolute flex items-center animate-pulse">
          <ShieldAlert className="w-6 h-6 text-blue-400 animate-bounce" />
        </div>
      </div>

      {/* 2. WEFD BRANDING & LOADING TEXT */}
      <div className="text-center z-10 space-y-2 relative">
        <h2 className="gap-2 text-lg font-bold text-white justify-center tracking-widest uppercase flex items-center">
          WEFD <span className="text-blue-500 font-extrabold">RESQUE OS</span>
        </h2>

        <p className="text-xs font-mono text-slate-400 tracking-wider">
          {text}
        </p>

        {/* Status Pills */}
        <div className="pt-3 justify-center text-[10px] font-mono flex items-center space-x-3">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center space-x-1.5">
            <Radio className="w-3 h-3 animate-ping" />
            <span>SATELLITE SYNC</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center space-x-1.5">
            <span>256-BIT ENCRYPTED</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Loader;