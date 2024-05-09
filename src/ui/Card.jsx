import { differenceInDays } from "date-fns";
import React from "react";

const Card = ({ record }) => {
  const dayAgo = record
    ? Math.abs(differenceInDays(new Date(record.date), new Date()))
    : null;
  return (
    <div className="flex w-full items-start  justify-between rounded-2xl border-2 border-slate-800 bg-green-200 px-4 py-2">
      <div>
        <p className="text-xl font-semibold">{record?.cause}</p>
        <p className="text-sm">
          {record?.growth ? "Improved" : "Not Improved"}
        </p>
      </div>
      <p className="text-base font-normal">
        {dayAgo ? `${dayAgo} days ago` : "Today"}
      </p>
    </div>
  );
};

export default Card;
