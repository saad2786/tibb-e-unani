import React from "react";
import { GiThreeLeaves } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-20 flex h-16 w-full items-center justify-between bg-slate-400 bg-opacity-40 p-4 font-fedrick backdrop-blur-[1.5px]">
      <Link to="/">
        <div className="flex items-center justify-center gap-2 text-2xl font-semibold text-green-700">
          <GiThreeLeaves />
          <span>Tibb-e-Unani</span>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
