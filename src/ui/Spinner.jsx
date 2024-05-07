import React from "react";

const Spinner = () => {
  return (
    <div className="mt-4   flex h-[40vh] w-full flex-col items-center justify-center gap-2 overflow-y-scroll  shadow-inner">
      <span className="loading loading-spinner loading-lg text-success"></span>
    </div>
  );
};

export default Spinner;
