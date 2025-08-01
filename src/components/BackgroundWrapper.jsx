import React from "react";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-200px] left-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[300px] h-[300px] bg-blue-600 opacity-20 rounded-full filter blur-2xl animate-pulse" />
      
      {/* Futuristic Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Centered Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
