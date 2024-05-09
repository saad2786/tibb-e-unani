import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import EntryModal from "../../ui/EntryModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPatients } from "../../services/apiMembers";
import { useQuery } from "react-query";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import { fetchRecords } from "../../services/apiRecords";
import Spinner from "../../ui/Spinner";
import RecordCards from "../../ui/RecordCards";

const Records = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const recordId = useParams().recordId;
  const [member, setMember] = useState({});
  const [selectedRecords, setSelectedRecords] = useState([]);
  const navigate = useNavigate();

  const {
    data: members,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: fetchPatients,
  });

  const {
    isLoading: isRecordsLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["records"],
    queryFn: fetchRecords,
    onSuccess: (data) => {
      setSelectedRecords(() => {
        return data?.records?.filter((record) => {
          return record?.mid === Number(member?.mid);
        });
      });
    },
  });

  useEffect(() => {
    setMember(() => {
      return members?.find((member) => {
        return member?.mid === Number(recordId);
      });
    });
  }, [recordId, members]);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  if (error) return <Error />;
  if (isLoading || isRecordsLoading) return <Loader />;
  return (
    <div className="mt-16 flex flex-col items-center justify-center px-6 py-4 font-outfit">
      <div className="w-full rounded-xl  bg-slate-300 p-4  shadow-lg ">
        <div className="px-2 py-1">
          <p className="text-sm font-light">Name:</p>
          <p className="text-lg font-semibold">{member?.patientName}</p>
        </div>
        <div className="px-2 py-1">
          <p className="text-sm font-light">Address:</p>
          <p className="text-lg font-semibold">{member?.address}</p>
        </div>
        <div className="px-2 py-1">
          <p className="text-sm font-light">Mobile:</p>
          <p className="text-lg font-semibold">{member?.mobile}</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 px-2 py-1">
            <p className="text-sm font-light">Age:</p>
            <p className="text-lg font-semibold">{member?.age}</p>
          </div>
          <div className="flex-1 px-2 py-1">
            <p className="text-sm font-light">Gender:</p>
            <p className="text-lg font-semibold">
              {member?.age ? "Female" : "Male"}
            </p>
          </div>
        </div>
        <div className="px-2 py-1">
          <p className="text-sm font-light">Health:</p>
          <div className="flex items-center justify-center  ">
            <p className="flex-1 text-lg font-semibold">
              {member?.diabeties ? "Diabeties" : "No Diabeties"}
            </p>

            <p className="flex-1 text-lg font-semibold">
              {member?.bp ? "BP" : "No BP"}
            </p>
          </div>
        </div>
      </div>
      <div className=" mt-4 flex w-full items-center justify-center gap-2">
        <button
          className="btn w-1/2 bg-blue-600 text-white"
          onClick={openModal}
        >
          <IoAdd size={20} fontWeight={200} />
          Add Entry
        </button>
        <button
          className="btn w-1/2 bg-rose-600 text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      {isRefetching ? <Spinner /> : <RecordCards records={selectedRecords} />}
      {isOpenModal && (
        <EntryModal closeModal={closeModal} member={member} refetch={refetch} />
      )}
    </div>
  );
};

export default Records;
