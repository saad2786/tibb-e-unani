import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { fetchPatients } from "../services/apiMembers";
import { useQuery } from "react-query";
import Error from "../ui/Error";
import Loader from "../ui/Loader";

const Record = () => {
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const {
    data: members,
    isLoading,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: fetchPatients,
    onSuccess: (data) => {},
  });

  useEffect(() => {
    filterMember(members);
  }, [members, query]);

  function filterMember(data) {
    setFilteredMembers(
      data?.filter((member) => {
        const name = member.patientName.toUpperCase();
        const search = query.toUpperCase();
        return name.includes(search) ? member : null;
      }),
    );
  }
  if (error) return <Error />;
  if (isLoading || isRefetching) return <Loader />;
  return (
    <div className="mt-16 flex flex-col items-center justify-start px-6 py-4 font-outfit">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search Patient Records"
          className="w-full rounded-full border border-slate-500 p-3 px-12  "
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <IoSearch size={25} className="absolute left-4 top-3 " />
      </div>
      <div className="mt-4 flex h-[72vh] w-full flex-col items-center gap-2 overflow-y-scroll">
        {filteredMembers?.map((member) => (
          <Link
            to={`/record/${member.mid}`}
            className="w-full"
            key={member.mid}
          >
            <div className="flex w-full items-start justify-between rounded-2xl bg-slate-300 px-4 py-2 shadow-sm">
              <div>
                <p className="text-xl font-semibold">{member.patientName}</p>
                <p className="text-sm">{member.address}</p>
              </div>
              <p className="text-lg font-semibold">{member.age} Year Old</p>
            </div>
          </Link>
        ))}
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

export default Record;
