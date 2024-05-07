import React from "react";
import { IoAdd, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen w-screen ">
      <div className="relative h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="font-fedrick flex h-full w-full scroll-pt-2 flex-col items-center justify-center">
          <h2 className="text-center text-5xl font-[500] leading-normal text-teal-800 ">
            Satya Ayurvedic & Unani
          </h2>
          <div className="font-outfit z-40 mt-4 flex items-center space-x-4">
            <Link to="members">
              <button className="flex  items-center justify-center gap-2 rounded-3xl bg-gradient-to-l from-green-500 to-green-700 px-4 py-3 text-white hover:bg-opacity-70">
                <IoAdd fontWeight={900} size={20} />
                Add Patient
              </button>
            </Link>
            <Link to="records">
              <button className="flex  items-center justify-center gap-2  rounded-3xl bg-gradient-to-r from-green-500 to-green-700 px-4 py-3  text-white">
                <IoSearch />
                Search Patient
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
