import React from "react";

const Loader = () => {
  return (
    <div className="z-[9999] min-h-screen justify-center bg-slate-950 fixed inset-0 flex items-center">
      <div className="flex-col flex items-center">

        {/* Spinner */}
        <div className="h-20 w-20 relative">

          <div className="rounded-full border-4 border-slate-700 absolute inset-0" />

          <div className="rounded-full border-4 border-transparent border-t-blue-500 absolute inset-0 animate-spin" />

          <div className="rounded-full bg-blue-500/20 absolute inset-3 animate-pulse" />

        </div>

        {/* Branding */}
        <h2 className="mt-6 text-lg font-bold text-white tracking-[0.3em]">
          RESCUE<span className="text-blue-500">OS</span>
        </h2>

        <p className="mt-2 font-mono text-xs text-slate-500 tracking-widest">
          INITIALIZING SYSTEM...
        </p>

      </div>
    </div>
  );
};

export default Loader;