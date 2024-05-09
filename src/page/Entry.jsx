import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecords } from "../services/apiRecords";
import Loader from "../ui/Loader";
import { format } from "date-fns";
const Entry = () => {
  const [entry, setEntry] = useState({});
  const [mediciens, setMediciens] = useState([]);
  const entryId = useParams().entryId;
  const navigate = useNavigate();
  const {
    data: records,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["records"],
    queryFn: fetchRecords,
    onSuccess: (data) => {
      console.log(data);
      const selectedEntry = data?.records.find(
        (record) => record.rid == entryId,
      );
      setEntry(selectedEntry);
      const selectedMediciens = data?.mediciens?.filter(
        (medicien) => medicien.rid == entryId,
      );
      setMediciens(selectedMediciens);
    },
    onSettled: () => {},
  });

  if (isLoading || isRefetching) return <Loader />;
  return (
    <div className="mt-16 flex flex-col items-center justify-center px-6 py-4 font-outfit">
      <div className="w-full rounded-xl  bg-slate-300 p-4  shadow-lg ">
        <div className="px-2 py-1">
          <p className="text-sm font-light">Medicien:</p>
          {mediciens.map((medicien) => {
            return (
              <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold">{medicien.name}</p>
                <p className="text-lg font-semibold">{medicien.qty}</p>
              </div>
            );
          })}
        </div>
        <div className="px-2 py-1">
          <p className="text-sm font-light">Cuase:</p>
          <p className="text-lg font-semibold">{entry?.cause}</p>
        </div>
        <div className="px-2 py-1">
          <p className="text-sm font-light">Growth:</p>
          <p className="text-lg font-semibold">
            {entry?.growth ? "Yes" : "No"}
          </p>
        </div>
        <div className="px-2 py-1">
          <p className="text-sm font-light">Payment:</p>
          <p className="text-lg font-semibold">{entry?.payment}</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 px-2 py-1">
            <p className="text-sm font-light">Date:</p>
            <p className="text-lg font-semibold">
              {entry.date ? format(new Date(entry.date), "dd-MMM-yyyy") : ""}
            </p>
          </div>
          <div className="flex-1 px-2 py-1">
            <p className="text-lg font-semibold">14 days ago</p>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full">
        <button
          className="btn w-full bg-rose-600 text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Entry;
