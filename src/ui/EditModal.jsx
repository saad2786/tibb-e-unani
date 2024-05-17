import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateMember } from "../services/apiMembers";
import toast from "react-hot-toast";
import { animated } from "react-spring";
import { IoCloseSharp } from "react-icons/io5";

const EditModal = ({ closeModal, member, refetch, style }) => {
  const [gender, setGender] = useState(member?.gender);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    try {
      const response = await updateMember({
        ...data,
        gender,
        mid: member?.mid,
      });
      console.log({ ...data, gender, mid: member?.mid });
      if (!response.error) {
        toast.success("Updated record");
        refetch();
        closeModal();
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      toast.error("Failed to update ");
    }
  }
  return (
    <div className="modal modal-open ">
      <animated.div
        style={style}
        className="modal-box relative  mt-6 flex flex-col items-center justify-center px-6  py-8 font-outfit"
      >
        <button
          className="absolute right-3 top-3 rounded-full bg-slate-200 p-2 hover:bg-slate-300"
          onClick={closeModal}
        >
          <IoCloseSharp size={20} />
        </button>
        <form
          className="mt-4 w-full space-y-4 py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-start justify-center gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Enter Patient Name"
              className="w-full rounded-xl border border-slate-500 p-3"
              defaultValue={member?.patientName}
              id="patientName"
              {...register("patientName")}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <label htmlFor="mobile">Mobile No.:</label>
            <input
              type="text"
              placeholder="Enter Patient mobile no."
              className="w-full rounded-xl border border-slate-500 p-3"
              defaultValue={member?.mobile}
              id="mobile"
              {...register("mobile")}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <label htmlFor="name">Age:</label>
            <input
              type="number"
              placeholder="Enter Patient Age"
              className="w-full rounded-xl border border-slate-500 p-3"
              defaultValue={member?.age}
              id="age"
              {...register("age", { min: 1, max: 110 })}
            />
          </div>
          <div className="flex items-start justify-center gap-2">
            <div className="flex flex-col items-start justify-center gap-1">
              <label htmlFor="mobile">Mizaj-e-Tabee:</label>
              <input
                type="text"
                placeholder="Mizaj-e-tabee"
                className="w-full rounded-xl border border-slate-500 p-3"
                defaultValue={member?.mizajT}
                id="mizajT"
                {...register("mizajT")}
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <label htmlFor="mobile">Mizaj-e-Gair-Tabee:</label>
              <input
                type="text"
                placeholder="Mizaj-e-gair-tabee"
                className="w-full rounded-xl border border-slate-500 p-3"
                defaultValue={member?.mizajG}
                id="mizajG"
                {...register("mizajG")}
              />
            </div>
          </div>
          <div className=" flex flex-col items-start justify-center gap-1 ">
            <div className="relative mt-4 flex w-full items-center justify-start gap-4 rounded-xl border border-slate-500 px-3 py-2">
              <span className="absolute -top-3 left-3 bg-stone-50 px-2">
                Gender
              </span>
              <div className="flex items-center justify-center gap-2 p-2">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-sm"
                  checked={gender}
                  onChange={() => setGender(true)}
                />
                <label htmlFor="">Male</label>
              </div>
              <div className="flex items-center justify-center gap-2 p-2">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-sm"
                  checked={!gender}
                  onChange={() => setGender(false)}
                />
                <label htmlFor="">Female</label>
              </div>
            </div>
          </div>
          <div className=" flex flex-col items-start justify-center gap-1 ">
            <div className="relative mt-4 flex w-full items-center justify-start gap-4 rounded-xl border border-slate-500 px-3 py-2">
              <span className="absolute -top-3 left-3 bg-stone-50 px-2">
                Health
              </span>
              <div className="flex items-center justify-center gap-2 p-2">
                <input
                  type="checkbox"
                  name="checkbox-1"
                  className="checkbox checkbox-sm border-2"
                  defaultChecked={member?.diabetes}
                  id="diabetes"
                  {...register("diabetes")}
                />
                <label htmlFor="">Diabetes</label>
              </div>
              <div className="flex items-center justify-center gap-2 p-2">
                <input
                  type="checkbox"
                  name="checkbox-1"
                  className="checkbox checkbox-sm border-2"
                  defaultChecked={member?.bp}
                  id="bp"
                  {...register("bp")}
                />
                <label htmlFor="">BP</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-1">
            <label htmlFor="name">Address:</label>
            <input
              type="textarea"
              placeholder="Address"
              className="w-full rounded-xl border border-slate-500 p-3"
              defaultValue={member?.address}
              id="address"
              {...register("address")}
              required
            />
          </div>
          <div className="flex  items-start justify-center gap-4 pt-4">
            <button type="submit" className="btn bg-green-600 text-white">
              Update
            </button>
            <button
              className="btn bg-rose-600 text-white"
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </animated.div>
    </div>
  );
};

export default EditModal;
