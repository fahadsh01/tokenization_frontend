// components/LoadingSpinner.jsx
import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-600">Checking authentication…</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
