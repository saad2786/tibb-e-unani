import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className=" bg-stone-50">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
