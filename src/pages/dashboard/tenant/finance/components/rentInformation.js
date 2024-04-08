"use client";
import Image from "next/image";
import React, { useState } from "react";
import Dropdown from "../../components/dropDownTwo";
import AcAndRejModalII from "../rentSavings/components/modals/acAndRejModalII";
import ReceiptModal from "./receiptModal";
import Receipt from "./receipt";
import ShareAbleReceipt from "./shareAbleReceipt";

const RentInformation = ({ closeRentPay }) => {
  const [proceed, setProceed] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [shareAble, setShareAble] = useState(false);

  const option = [
    {
      id: 1,
      label: "1 year",
    },
    {
      id: 2,
      label: "2 years",
    },
    {
      id: 3,
      label: "3 years",
    },
    {
      id: 4,
      label: "4 years",
    },
    {
      id: 5,
      label: "5 years",
    },
  ];

  const proceeding = () => {
    setProceed(!proceed);
  };

  const closeProceeding = () => {
    setProceed(false);
  };

  const openConfirm = () => {
    setConfirm(!confirm);
  };

  const closeConfirm = () => {
    setConfirm(false);
  };

  const showReceipt = () => {
    setReceipt(!receipt);
  };

  const closeReceipt = () => {
    setReceipt(false);
    setConfirm(false);
    setProceed(false);
    closeRentPay();
  };

  const shareAbleReceipt = () => {
    setShareAble(!shareAble);
  };

  const closeShareAbleReceipt = () => {
    setReceipt(false);
    setConfirm(false);
    setProceed(false);
    closeRentPay();
    setShareAble(false);
  }

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      {shareAble ? (
        <div>
          <ShareAbleReceipt closeShareAbleReceipt={closeShareAbleReceipt}/>
        </div>
      ) : receipt ? (
        <Receipt closeReceipt={closeReceipt} shareReceipt={shareAbleReceipt} />
      ) : confirm ? (
        <ReceiptModal
          header={"Transaction Complete"}
          body={"Your rent payment was successful"}
          button={"View Reciept"}
          buttonTwo={"Close"}
          returnHomeTwo={closeConfirm}
          returnHome={showReceipt}
        />
      ) : proceed ? (
        <div>
          <AcAndRejModalII
            returnHomeTwo={closeProceeding}
            returnHome={openConfirm}
            header={"Proceed To Pay Rent?"}
            body={"N1,500,000 will be deducted from your wallet balance"}
            button={"Yes"}
            buttonTwo={"Cancel"}
          />
        </div>
      ) : (
        <div className="h-[660px] w-[530px] bg-white rounded-lg p-8">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1 w-[1600px]">
                <p className="text-BlackHomz text-[14px] font-[500]">
                  Rent Information
                </p>

                <p className="text-GrayHomz text-[13px] font-[400]">
                  Confirm your rent info is accurate before making payment
                </p>
              </div>

              <div
                onClick={closeRentPay}
                className="cursor-pointer flex w-full justify-end"
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/payment/close-square.png"
                  }
                  alt=""
                  height={24}
                  width={24}
                />
              </div>
            </div>
            <div>
              <p className="text-BlueHomz text-[14px] font-[500]">
                Transaction Receipt
              </p>
            </div>
            <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-2">
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Property Manager
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  Property Manager’s Registered Name
                </p>
              </div>
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Property Type
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  2-Bedroom Bungalow
                </p>
              </div>
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Property
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  New Suncity Property
                </p>
              </div>
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Apartment Number
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  Apartment 1
                </p>
              </div>
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Rent
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  N750,000
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 w-full flex gap-1">
            <p className="text-BlackHomz text-[11px] font-[400] w-[37%]">
              Is your rent information incorrect?
            </p>
            <p className="text-BlueHomz text-[11px] font-[400]">
              Message Property Manager
            </p>
          </div>

          <div className="flex flex-col gap-4 my-6">
          <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                Rent Duration
              </p>
              <div className="ml-[-7px]">
                <p className="text-GrayHomz text-[11px] font-[400] ">
                  Select the duration you’re paying for
                </p>
                <Dropdown
                  options={option}
                  selectOption={"1 year"}
                  className={"w-full mt-2"}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                Total Rent
              </p>
              <p className="text-GrayHomz text-[14px] font-[500] w-[60%]">
                N 1,500,000
              </p>
            </div>

            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                Payment Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[500] w-[60%]">
                4th January, 2023
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                Next Due Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[500] w-[60%]">
                4th January, 2025
              </p>
            </div>
          </div>

          <button
            onClick={proceeding}
            className="w-full h-[48px] bg-BlueHomz rounded-md text-white text-[16px] font-[700]"
          >
            Pay Rent (N1,500,000)
          </button>
        </div>
      )}
    </div>
  );
};

export default RentInformation;
