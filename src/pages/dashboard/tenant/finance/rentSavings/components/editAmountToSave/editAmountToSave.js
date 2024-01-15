"use client";
import ConfirmModal from "@/pages/dashboard/tenant/components/confirmModal";
import Image from "next/image";
import React, { useState } from "react";
import AcAndRejModalII from "../modals/acAndRejModalII";

const EditAmountToSave = ({
  closeEditRentToSave,
  selectedSavings =  {},
  updateSaveTarget = {},
  setOpenEditModalToSave,
  data = {},
  setData,
  confirmModalIV,
  setConfirmModalIV,
}) => {
  const [newSavingTarget, setNewSavingTarget] = useState(
    selectedSavings.amountToSave || []
  );
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  if (!data) {
    return null;
  }

      // Check if the updated value is more than the wallet balance
      const walletBalance = parseInt(data[0].wallet);
      console.log(walletBalance);
  
      const updatedValue = parseInt(newSavingTarget);
      console.log(updatedValue);
  
      const amountToSave = parseInt(selectedSavings.amountToSave);
      console.log(amountToSave);
  
      const amountToSaveII =
      walletBalance +  amountToSave;
      console.log(amountToSaveII)

  const handleUpdate = () => {
    // Perform any validation if needed
    // ...

    if ((walletBalance +  amountToSave) >= updatedValue && updatedValue <= selectedSavings.rentTarget) {
      // Call the updateRentTarget function with the new rentTarget value
      updateSaveTarget(newSavingTarget);
      setOpenConfirmModal(!openConfirmModal);
    }

    // Set isInvalid to true if the updated value is more than the wallet balance
    setIsInvalid(true);
    setConfirmModalIV(false);
    return;
  };

  console.log(selectedSavings);

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const showAcandRejModal = () => {
    setConfirmModalIV(!confirmModalIV);
  };
  const closeAcandRejModal = () => {
    setConfirmModalIV(false);
  };

  const closeAcandRejModalII = () => {
    setConfirmModalIV(false);
    setOpenConfirmModal(false);
    setOpenEditModalToSave(false);
  };

  return (
    <div>
      <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
        {openConfirmModal ? (
          <div>
            <ConfirmModal
              header={"Top Up Successful"}
              body={`${selectedSavings.savingsName} has successfully been topped up`}
              button={"Close"}
              returnHome={closeAcandRejModalII}
            />
          </div>
        ) : confirmModalIV ? (
          <AcAndRejModalII
            header={"Proceed To Top Up"}
            body={`N${formatNumberWithCommas(
              newSavingTarget
            )} will be deducted from your wallet balance`}
            button={"Yes"}
            buttonTwo={"No"}
            returnHomeTwo={closeAcandRejModal}
            returnHome={handleUpdate}
          />
        ) : (
          <div className="w-[540px] h-[280px] p-8 bg-white rounded-[12px] flex flex-col justify-between">
            <div className="w-full flex justify-between items-center">
              <p className="text-[14px] font-[500] text-GrayHomz">
                Top Up <span>{selectedSavings.savingsName}</span>
              </p>
              <Image
                src={"/static/dashboard/tenant/finance/close-square.png"}
                alt=""
                height={24}
                width={24}
                onClick={closeEditRentToSave}
                className="cursor-pointer"
              />
            </div>
            <p className="text-[13px] font-[400] text-GrayHomz2">
              Increase or decrease your rent target
            </p>
            <p className="mt-8 text-[13px] font-[500] text-GrayHomz">
              Enter Amount To Save <span className=" text-GrayHomz2"> (N)</span>
            </p>
            <div className="flex flex-col gap-6">
              <input
                type="number"
                value={newSavingTarget}
                onChange={(e) => {
                  setNewSavingTarget(e.target.value);
                  setIsInvalid(false)
                }}
                className={`outline-none text-Success mt-2 w-full h-[45px] rounded-[4px] bg-successBg placeholder:text-Success4 placeholder:text-[13px] placeholder:font-[500] px-4 ${
                  isInvalid ? "ring ring-red-500" : "" // Apply ring-red-500 if isInvalid is true
                }`}
              />
              <button
                onClick={showAcandRejModal}
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

export default EditAmountToSave;
