import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const RecordCards = ({ records }) => {
  return (
    <div className="mt-4   flex h-[40vh] w-full flex-col items-center justify-start gap-2 overflow-y-scroll  shadow-inner">
      {records?.map((record) => {
        return (
          <Link
            to={`/entry/${record?.rid}`}
            className="w-full"
            key={record?.rid}
          >
            <Card record={record} />
          </Link>
        );
      })}
    </div>
  );
};

export default RecordCards;
