import React from "react";

const Card = ({ record }) => {
  return (
    <div className="flex w-full items-start  justify-between rounded-2xl border-2 border-slate-800 bg-green-200 px-4 py-2">
      <div>
        <p className="text-xl font-semibold">{record?.cause}</p>
        <p className="text-sm">
          {record?.growth ? "Improved" : "Not Improved"}
        </p>
      </div>
      <p className="text-base font-normal">15 days ago</p>
    </div>
  );
};

export default Card;
