import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { addRecord } from "../services/apiRecords";

const EntryModal = ({ closeModal, member, refetch }) => {
  const [progress, setProgress] = useState(false);
  const [mediciens, setMediciens] = useState([]);
  const [medicien, setMedicien] = useState("");
  const [qty, setQty] = useState("");

  const { register, handleSubmit } = useForm();
  const mid = member.mid;
  function addMedicien() {
    setMediciens((prev) => {
      const newMedicien = {
        name: medicien,
        quantity: qty,
      };
      return [...prev, newMedicien];
    });
    setMedicien("");
    setQty("");
  }
  async function onSubmit(data) {
    try {
      const response = await addRecord({
        ...data,
        growth: progress,
        mid,
        mediciens,
      });

      if (!response.error) {
        toast.success("Added record");
        refetch();
        closeModal();
      } else {
        toast.error("Failed to add");
      }
    } catch (error) {
      toast.error("Failed to add");
    }
  }
  return (
    <div className="modal modal-open">
      <div className="modal-box relative  mt-16 flex flex-col items-center justify-center px-6  py-8 font-outfit">
        <button
          className="absolute right-3 top-3 rounded-full p-2 hover:bg-slate-200"
          onClick={closeModal}
        >
          <IoCloseSharp size={20} />
        </button>
        <h2 className=" text-center text-2xl">Add New Entry</h2>
        <form
          className="mt-4 w-full space-y-4 py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-start justify-center gap-2 ">
            <label htmlFor="name">Mediciens:</label>
            <div className="flex w-full items-center justify-center gap-2">
              <input
                type="text"
                placeholder="Mediciens"
                className="w-[60%] rounded-xl border border-slate-500 p-3 "
                value={medicien}
                onChange={(e) => setMedicien(e.target.value)}
              />
              <input
                type="text"
                placeholder="Qty"
                className="w-[25%] rounded-xl border border-slate-500 p-3"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <button
                onClick={() => addMedicien()}
                type="button"
                className="btn w-[15%] bg-gray-300 text-xl "
              >
                +
              </button>
            </div>
            <div className=" flex w-full flex-wrap items-center gap-1">
              {mediciens.map((medicien) => {
                return (
                  <span className="rounded-full bg-slate-300 px-2 py-1">
                    {medicien.name}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <label htmlFor="mobile">Causes:</label>
            <input
              type="text"
              placeholder="Causes"
              className="w-full rounded-xl border border-slate-500 p-3"
              id="cause"
              {...register("cause")}
              required
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <div className="relative mt-4 flex w-full items-center justify-start gap-4 rounded-xl border border-slate-500 px-3 py-2">
              <span className="absolute -top-3 left-3 bg-white px-2">
                Cure Growth
              </span>
              <div className="flex items-center justify-center gap-2 p-2">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-sm"
                  checked={progress}
                  onChange={() => setProgress(true)}
                />
                <label htmlFor="">Yes</label>
              </div>
              <div className="flex items-center justify-center gap-2 p-2">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-sm"
                  checked={!progress}
                  onChange={() => setProgress(false)}
                />
                <label htmlFor="">No</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <label htmlFor="mobile">Payment:</label>
            <input
              type="text"
              placeholder="Enter Amount"
              className="w-full rounded-xl border border-slate-500 p-3"
              id="payment"
              {...register("payment")}
              required
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <label htmlFor="mobile">Description (optional):</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-500 p-3"
              id="desc"
              {...register("desc")}
            />
          </div>

          <div className="flex  items-start justify-center gap-4 pt-4">
            <button type="submit" className="btn bg-green-600 text-white">
              Add
            </button>
            <button className="btn bg-rose-600 text-white" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryModal;
