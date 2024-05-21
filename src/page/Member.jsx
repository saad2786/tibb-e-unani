import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addMember } from "../services/apiMembers";
import toast from "react-hot-toast";

const Member = () => {
  const [gender, setGender] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    try {
      const response = await addMember({
        ...data,
        gender,
      });
      console.log({ ...data, gender });
      if (!response.error) {
        toast.success("Added record");
        navigate("/records");
      } else {
        toast.error("Failed to add");
      }
    } catch (error) {
      toast.error("Failed to add");
    }
  }
  return (
    <div className="mt-4 flex flex-col items-center justify-center px-6 py-8 font-outfit">
      {/* <h2 className=" text-center text-2xl">Add New Patient</h2> */}
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
            id="age"
            {...register("age", { min: 1, max: 110 })}
          />
        </div>
        <div className="flex w-full items-start justify-center gap-2">
          <div className="flex w-1/2 flex-col items-start justify-center gap-1">
            <label htmlFor="mobile">Mizaj-e-Tabee:</label>
            <select
              type="text"
              placeholder="Mizaj-e-tabee"
              className="w-full rounded-xl border border-slate-500 p-3"
              id="mizajT"
              {...register("mizajT")}
            >
              <option defaultChecked hidden>
                --Select--
              </option>
              <option value="Safravi">Safravi</option>
              <option value="Savdavi">Savdavi</option>
              <option value="Balgami">Balgami</option>
              <option value="Damavi">Damavi</option>
            </select>
          </div>
          <div
            className="flex
          w-1/2 flex-col items-start justify-center gap-1"
          >
            <label htmlFor="mobile">Mizaj-e-Gair-Tabee:</label>
            <select
              type="text"
              placeholder="Mizaj-e-gair-tabee"
              className="w-full rounded-xl border border-slate-500 p-3"
              id="mizajG"
              {...register("mizajG")}
            >
              <option defaultChecked hidden>
                --Select--
              </option>
              <option value="Safravi">Safravi</option>
              <option value="Savdavi">Savdavi</option>
              <option value="Balgami">Balgami</option>
              <option value="Damavi">Damavi</option>
            </select>
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
            id="address"
            {...register("address")}
            required
          />
        </div>
        <div className="flex  items-start justify-center gap-4 pt-4">
          <button type="submit" className="btn bg-green-600 text-white">
            Add
          </button>
          <button
            className="btn bg-rose-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Member;
