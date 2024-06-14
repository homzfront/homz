"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../../../../components/confirmModal";
import AcAndRejModalII from "../modals/acAndRejModalII";
import UnsucessfullModal from "../modals/unsucessfullModal";

const CreateNewRentSavings = ({
  closeNewSavings,
  setOpenCreateNewSavings,
  setData,
  data,
}) => {
  const [yesOrNoModal, setYesOrNoModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [rentTarget, setRentTarget] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amountToSave, setAmountToSave] = useState("");
  const [savingsName, setSavingsName] = useState("");
  const [selectedData, setSelectedData] = useState(false);
  const [openUnsuccessfulModal, setOpenUnsuccessfulModal] = useState(false);

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow =
      yesOrNoModal || confirmModal ? "hidden" : "auto";
    if (yesOrNoModal || confirmModal) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [yesOrNoModal, confirmModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const randomNumber = () => {
      return Math.random();
    };
  
    // Check if the wallet balance is sufficient
    const currentWalletBalance = parseInt(data[0].wallet);
    
    const amountToSaveValue = parseInt(amountToSave);

    const rentTargetValue = parseInt(rentTarget)

  
    const newData = {
      id: randomNumber(),
      rentTarget,
      dueDate,
      amountToSave,
      savingsName,
    };


    if (amountToSaveValue <= currentWalletBalance && amountToSaveValue <= rentTargetValue) {

      // Deduct amountToSave from the wallet balance
      setData((prevData) => [
        {
          ...prevData[0],
          wallet: (currentWalletBalance - amountToSaveValue).toString(),
          Data: [...prevData[0].Data, newData],
        },
      ]);
      setConfirmModal(!confirmModal);
    } else {
      // Show an error message or handle insufficient funds here
      // console.error("Insufficient funds in the wallet");
      // You can also display an error modal or take other actions
      setOpenUnsuccessfulModal(!openUnsuccessfulModal);
    }
  };

  const openYesorNoDialogue = (data) => {
    // Validate input here if needed

    // Proceed to create savings if all fields are filled
    if (rentTarget && dueDate && amountToSave) {
      setYesOrNoModal(!yesOrNoModal);
    }

    setSelectedData(data);
  };

  const closeAcAndRejModel = () => {
    setYesOrNoModal(false);
  };

  const closeConfirmModal = () => {
    setConfirmModal(false);
    setOpenCreateNewSavings(false);
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div>
        {yesOrNoModal ? (
          <div>
            <AcAndRejModalII
              body={`${formatNumberWithCommas(
                amountToSave
              )} will be deducted from your wallet balance`}
              header={"Proceed To Create Savings"}
              button={"Yes"}
              buttonTwo={"Cancel"}
              returnHome={handleSubmit}
              returnHomeTwo={closeAcAndRejModel}
            />
          </div>
        ) : (
          <div className="h-[560px] w-[550px] bg-white rounded-[12px] p-8">
            <div className="flex w-full items-start justify-between">
              <div className="">
                <p className="text-[14px] font-[500] text-GrayHomz">
                  Create New Rent Savings
                </p>
                <p className="text-[13px] font-[400] text-GrayHomz2">
                  Set aside a portion of your income specifically for your rent
                </p>
              </div>
              <Image
                src={"/static/dashboard/tenant/finance/close-square.png"}
                alt=""
                height={24}
                width={24}
                onClick={closeNewSavings}
                className="cursor-pointer"
              />
            </div>
            <div className="mt-6">
              <div className="flex flex-col gap-[10px] ">
                <div>
                  <label className="text-[13px] font-[500] text-GrayHomz">
                    Rent Target <span className="text-GrayHomz2"> (N)</span>{" "}
                    <br />
                    <span className="text-GrayHomz2">
                      Set a goal for your savings
                    </span>
                  </label>
                  <input
                    type="number"
                    value={rentTarget}
                    onChange={(e) => setRentTarget(e.target.value)}
                    className="text-warning px-4 outline-none mt-2 w-full h-[45px] rounded-[4px] bg-warning4"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-[500] text-GrayHomz">
                    Rent Due Date
                  </label>
                  <input
                    type="Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Select Date"
                    className="text-BlueHomz outline-none mt-2 px-4 w-full h-[45px] rounded-[4px] bg-walletBg"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-[500] text-GrayHomz">
                    Enter Amount To Save
                    <span className="text-GrayHomz2"> (N)</span>
                  </label>
                  <input
                    type="number"
                    value={amountToSave}
                    onChange={(e) => setAmountToSave(e.target.value)}
                    placeholder="50,000"
                    className="outline-none text-Success mt-2 w-full h-[45px] rounded-[4px] bg-successBg placeholder:text-Success4 placeholder:text-[13px] placeholder:font-[500] px-4"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-[500] text-GrayHomz">
                    Give a name to your savings
                    <span className="text-GrayHomz2">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={savingsName}
                    onChange={(e) => setSavingsName(e.target.value)}
                    placeholder="My next rent savings"
                    className="outline-none text-GrayHomz mt-2 w-full h-[45px] rounded-[4px] bg-inputBg placeholder:text-GrayHomz5 placeholder:text-[13px] placeholder:font-[500] px-4"
                  />
                </div>
                <button
                  onClick={openYesorNoDialogue}
                  className={`mt-4 w-full h-[48px] rounded-[4px]  ${
                    rentTarget && dueDate && amountToSave
                      ? "bg-BlueHomz text-white"
                      : "bg-GrayHomz6 text-GrayHomz5"
                  } `}
                >
                  Create Savings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {confirmModal && (
        <div>
          <ConfirmModal
            body={"Your rent savings has successfully been created"}
            header={"Savings Created Successfully"}
            button={"Close"}
            returnHome={closeConfirmModal}
          />
        </div>
      )}
      {openUnsuccessfulModal && (
        <div>
          <UnsucessfullModal
            body={
              "Your wallet balance is not sufficient to create your rent savings."
            }
            header={"Unsuccessful"}
            button={"Go To Wallet"}
            buttonTwo={"Close"}
            returnHomeTwo={closeConfirmModal}
          />
        </div>
      )}
    </div>
  );
};

export default CreateNewRentSavings;
