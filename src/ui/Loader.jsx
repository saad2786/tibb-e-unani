import React from "react";

const Loader = () => {
  return (
    <div className="absolute flex h-screen w-screen items-center justify-center bg-slate-200 bg-opacity-35 backdrop-blur-sm">
      <span className="loading loading-spinner loading-lg text-green-600"></span>{" "}
    </div>
  );
};

export default Loader;
