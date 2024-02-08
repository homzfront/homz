"use client";
import Image from "next/image";
import React, { useState } from "react";
import Dropdown from "../../components/dropDownTwo";
import AcAndRejModalII from "../rentSavings/components/modals/acAndRejModalII";
import ReceiptModal from "./receiptModal";
import Receipt from "./receipt";
import ShareAbleReceipt from "./shareAbleReceipt";
import { payRent } from "@/api/tenantSevice";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changePresentDateFormat from "@/utils/changePresentDateFormat";
import Loading from "@/components/mainmenu/loading";
import FailedModal from "../../components/failedModal";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const RentInformation = ({ closeRentPay, rentData, fetchDataAgain }) => {
  const [proceed, setProceed] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [shareAble, setShareAble] = useState(false);
  const [selecetedYear, setselectedYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleOptionSelect = (option) => {
    console.log("Selected option:", option);
    setselectedYear(parseInt(option?.label));
    // Perform any necessary actions with the selected option
  };

  console.log(selecetedYear);
  const RentValue = selecetedYear * rentData?.data?.rent;
  console.log(RentValue);

  // Example usage
  const today = new Date();
  const duration = rentData?.data?.duration;

  const generateOptions = (duration) => {
    const options = [];
    for (let i = 1; i <= duration; i++) {
      options.push({ id: i, label: `${i} year${i > 1 ? "s" : ""}` });
    }
    return options;
  };

  // Use the generated options in your Dropdown component
  const options = generateOptions(duration);

  const proceeding = () => {
    setProceed(!proceed);
  };

  const closeProceeding = () => {
    setProceed(false);
  };

  const openConfirm = async () => {
    setLoading(true);
    try {
      const data = { amount: parseInt(rentData?.data?.totalRent) };
      const { success, upDateddata, error } = await payRent(data);

      if (success) {
        setLoading(false);
        console.log("Form successfully updated", upDateddata);
        if (typeof window !== "undefined") {
          localStorage.setItem("RentResponse", JSON.stringify(upDateddata));
        }
        setConfirm(!confirm);
      } else {
        setLoading(false);
        setFailed(true);
      }
    } catch (error) {
      // console.error("Update error", error);
      setLoading(false);
      setFailed(true);
      // toast.error("Update failed");
    }
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
    // fetchDataAgain();
    closeRentPay();
    setFailed(false);
  };

  console.log(rentData);

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      {loading && <Loading />}
      {receipt ? (
        <Receipt
          closeReceipt={closeReceipt}
          rentData={rentData}
          
        />
      ) : confirm ? (
        <ReceiptModal
          header={"Transaction Complete"}
          body={"Your rent payment was successful"}
          button={"View Reciept"}
          buttonTwo={"Close"}
          returnHomeTwo={closeConfirm}
          returnHome={showReceipt}
        />
      ) : failed ? (
        <FailedModal
          header={"Unsuccessful"}
          body={"Your wallet balance is not sufficient for this transaction"}
          button={"Close"}
          returnHome={closeReceipt}
        />
      ) : proceed ? (
        <div>
          <AcAndRejModalII
            returnHomeTwo={closeProceeding}
            returnHome={openConfirm}
            header={"Proceed To Pay Rent?"}
            body={`${addCommasToNumber(
              rentData?.data?.totalRent
            )} will be deducted from your wallet balance`}
            button={"Yes"}
            buttonTwo={"Cancel"}
          />
        </div>
      ) : (
        <div className="h-[560px] w-[530px] bg-white rounded-lg p-8">
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
                  {rentData?.data?.enterPrise?.fullName}
                </p>
              </div>
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Property Type
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  {rentData?.data?.propertyType}
                </p>
              </div>
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Property
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  {rentData?.data?.estateId?.name}
                </p>
              </div>
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Apartment Number
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  {rentData?.data?.apartmentNumber}
                </p>
              </div>
              <div className="w-full flex gap-4">
                <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                  Rent
                </p>
                <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                  {addCommasToNumber(rentData?.data?.rent)}
                </p>
              </div>
            </div>
          </div>
    

          <div className="mt-4 flex flex-col gap-4 my-6">
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                Rent Duration
              </p>
              <div className="ml-[-7px]">
                <p className="text-GrayHomz text-[11px] font-[400] ">
                  Select the duration you’re paying for
                </p>
                <Dropdown
                  options={options}
                  onSelect={handleOptionSelect}
                  selectOption={`1 - ${duration} year${
                    duration > 1 ? "s" : ""
                  }`}
                  className={"w-full mt-2"}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                Total Rent
              </p>
              <p className="text-GrayHomz text-[14px] font-[500] w-[60%]">
                {addCommasToNumber(rentData?.data?.totalRent)}
              </p>
            </div>

            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[14px] font-[400] w-[40%]">
                Payment Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[500] w-[60%]">
                {changePresentDateFormat(today)}
              </p>
            </div>
          </div>

          <button
            onClick={proceeding}
            className="w-full h-[48px] bg-BlueHomz rounded-md text-white text-[16px] font-[700]"
          >
            {/* {addCommasToNumber(RentValue)} */}
            {addCommasToNumber(rentData?.data?.totalRent)}
          </button>
        </div>
      )}
    </div>
  );
};

export default RentInformation;
