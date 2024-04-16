"use client";
import ConfirmModal from "/src/pages/dashboard/tenant/components/confirmModal";
import Image from "next/image";
import React, { useState } from "react";

const EditRentTarget = ({
  selectedSavings = {},
  closeEditRentTarget,
  updateRentTarget = {},
  confirmModalII,
  setConfirmModalII,
  closeEditRentTargetII,
}) => {

  const [newRentTarget, setNewRentTarget] = useState(
    selectedSavings.rentTarget
  );
  const [isInvalid, setIsInvalid] = useState(false);

  console.log(selectedSavings.amountToSave);
  console.log(newRentTarget);
  const handleUpdate = () => {
    // Perform any validation if needed
    // ...
    if (newRentTarget > selectedSavings.amountToSave || newRentTarget === selectedSavings.amountToSave) {
        // Call the updateRentTarget function with the new rentTarget value
        updateRentTarget(newRentTarget);
        setConfirmModalII(!confirmModalII);
    } else {
   
      setIsInvalid(!isInvalid);
    }
  };

  return (
    <div>
      <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
        {confirmModalII ? (
          <ConfirmModal
            header={"Update Successful"}
            body={"Rent Target has successfully been updated"}
            button={"Close"}
            returnHome={closeEditRentTargetII}
          />
        ) : (
          <div className="w-[540px] h-[280px] p-8 bg-white rounded-[12px] flex flex-col justify-between">
            <div className="w-full flex justify-between items-center">
              <p className="text-[14px] font-[500] text-GrayHomz">
                Edit Rent Goal
              </p>
              <Image
                src={"/static/dashboard/tenant/finance/close-square.png"}
                alt=""
                height={24}
                width={24}
                onClick={closeEditRentTarget}
                className="cursor-pointer"
              />
            </div>
            <p className="text-[13px] font-[400] text-GrayHomz2">
              Increase or decrease your rent target
            </p>
            <p className="mt-8 text-[13px] font-[500] text-GrayHomz">
              Rent Target <span className=" text-GrayHomz2"> (N)</span>
            </p>
            <div className="flex flex-col gap-6">
              <input
                type="number"
                value={newRentTarget}
                onChange={(e) => {
                  setNewRentTarget(e.target.value);
                
                }} /* Add (e) parameter here */
                className={`${
                  isInvalid ? "ring ring-red-500" : ""
                }  text-warning px-4 outline-none mt-2 w-full h-[45px] rounded-[4px] bg-warning4`}
              />
              <button
                onClick={handleUpdate}
                className="w-full bg-BlueHomz text-white text-[16px] font-700 h-[48px] rounded-[4px]"
              >
                Update Change
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditRentTarget;
