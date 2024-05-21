import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

import EntryModal from "../../ui/EntryModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPatients } from "../../services/apiMembers";
import { useQuery } from "react-query";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import { fetchRecords } from "../../services/apiRecords";
import Spinner from "../../ui/Spinner";
import RecordCards from "../../ui/RecordCards";
import { useTransition } from "react-spring"; // Importing React Spring
import EditModal from "../../ui/EditModal";

const Records = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const recordId = useParams().recordId;
  const [member, setMember] = useState({});
  const [selectedRecords, setSelectedRecords] = useState([]);
  const navigate = useNavigate();

  const {
    data: members,
    isLoading,
    error,
    refetch: refetchMembers,
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
  const openEditModal = () => {
    setIsOpenEditModal(true);
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  const transition = useTransition(isOpenModal, {
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
  });

  if (error) return <Error />;
  if (isLoading || isRecordsLoading) return <Loader />;
  return (
    <div className=" mt-16 flex flex-col items-center justify-center px-6 py-4 font-outfit">
      <div className="relative w-full rounded-xl  bg-slate-300 p-4  shadow-lg ">
        <span
          className="absolute right-4 top-4 rounded-lg bg-yellow-400 bg-opacity-70 p-2 pl-3"
          onClick={openEditModal}
        >
          <FaEdit />
        </span>
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
              {member?.gender ? "Male" : "Female"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 px-2 py-1">
            <p className="text-sm font-light">Mizaj Tabee:</p>
            <p className="text-lg font-semibold"> {member?.mizajT || "-"}</p>
          </div>
          <div className="flex-1 px-2 py-1">
            <p className="text-sm font-light">Mizaj Gair Tabee:</p>
            <p className="text-lg font-semibold">{member?.mizajG || "-"}</p>
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
          className="btn w-[49%] bg-blue-600 text-white"
          onClick={openModal}
        >
          <IoAdd size={20} fontWeight={200} />
          Add Entry
        </button>
        {/* <button
          className="btn w-[49%] bg-green-600 text-white"
          onClick={() => openEditModal()}
        >
        <FaEdit size={18} />
        Edit
      </button> */}
        <button
          className="btn w-1/2 bg-rose-600 text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {isRefetching ? <Spinner /> : <RecordCards records={selectedRecords} />}
      {transition((style, isOpen) => (
        <>
          {isOpenModal ? (
            <EntryModal
              closeModal={closeModal}
              member={member}
              refetch={refetch}
              style={style}
            />
          ) : null}
        </>
      ))}
      {transition((style, isOpen) => (
        <>
          {isOpenEditModal ? (
            <EditModal
              closeModal={closeEditModal}
              member={member}
              refetch={refetchMembers}
              style={style}
            />
          ) : null}
        </>
      ))}
    </div>
  );
};

export default Records;
