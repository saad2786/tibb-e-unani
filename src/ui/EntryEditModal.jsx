import React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { updateRecord } from "../services/apiRecords";
import { animated } from "react-spring";

const EntryEditModal = ({
  closeModal,
  entry,
  refetch,
  style,
  mediciens: prevMediciens,
}) => {
  const [progress, setProgress] = useState(entry?.progress);
  const [mediciens, setMediciens] = useState(prevMediciens);
  const [medicien, setMedicien] = useState("");
  const [qty, setQty] = useState("");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { register, handleSubmit } = useForm();

  function addMedicien() {
    setMediciens((prev) => {
      const newMedicien = {
        name: medicien,
        qty: qty,
      };
      return [...prev, newMedicien];
    });
    setMedicien("");
    setQty("");
  }

  async function onSubmit(data) {
    try {
      const response = await updateRecord({
        ...data,
        growth: progress,
        rid: entry.id,
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

  function handleRemoveMedicien(name) {
    setMediciens((prev) => prev.filter((item) => item.name != name));
  }

  return (
    <div className="modal modal-open flex items-center justify-center overflow-y-auto">
      <animated.div
        style={{ ...style, maxHeight: `${windowHeight}px` }}
        className="modal-box relative mx-4 w-full max-w-md overflow-hidden rounded-xl bg-white p-6 shadow-lg sm:mx-6 md:mx-8 lg:mx-auto"
      >
        <button
          className="absolute right-3 top-3 rounded-full p-2 hover:bg-slate-200"
          onClick={closeModal}
        >
          <IoCloseSharp size={20} />
        </button>
        <h2 className="mb-4 text-center text-2xl">Update Entry</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium">
              Mediciens:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Mediciens"
                className="w-[60%] flex-1 rounded-xl border border-slate-500 p-3"
                value={medicien}
                onChange={(e) => setMedicien(e.target.value)}
              />
              <input
                type="text"
                placeholder="Qty"
                className="w-[20%] rounded-xl border border-slate-500 p-3"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <button
                onClick={addMedicien}
                type="button"
                className="btn w-[20%] rounded-xl bg-gray-300 p-3 text-xl"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {mediciens.map((medicien, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-slate-300 px-2 py-1"
                >
                  {medicien.name.length > 10
                    ? medicien.name.substring(0, 10) + "..."
                    : medicien.name}
                  <IoCloseSharp
                    onClick={() => handleRemoveMedicien(medicien.name)}
                  />{" "}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cause" className="font-medium">
              Causes:
            </label>
            <input
              type="text"
              placeholder="Causes"
              className="w-full rounded-xl border border-slate-500 p-3"
              id="cause"
              defaultValue={entry?.cause}
              {...register("cause")}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative mt-4 flex items-center gap-4 rounded-xl border border-slate-500 p-3">
              <span className="absolute -top-3 left-3 bg-white px-2">
                Cure Growth
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-sm"
                  checked={progress}
                  onChange={() => setProgress(true)}
                />
                <label>Yes</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio radio-sm"
                  checked={!progress}
                  onChange={() => setProgress(false)}
                />
                <label>No</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="payment" className="font-medium">
              Payment:
            </label>
            <input
              type="text"
              placeholder="Enter Amount"
              className="w-full rounded-xl border border-slate-500 p-3"
              defaultValue={entry?.payment}
              id="payment"
              {...register("payment")}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="desc" className="font-medium">
              Description (optional):
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-500 p-3"
              defaultValue={entry?.desc}
              id="desc"
              {...register("desc")}
            />
          </div>
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              type="submit"
              className="btn w-1/3 rounded-xl bg-green-600 py-2 text-white"
            >
              Update
            </button>
            <button
              className="btn w-1/3 rounded-xl bg-rose-600 py-2 text-white"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </animated.div>
    </div>
  );
};

export default EntryEditModal;
