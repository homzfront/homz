"use client";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addYearsToValues from "@/utils/addYearsToNumber";
import handleCopyClick from "@/utils/handleCopyClick";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; // For converting HTML to canvas

const Receipt = ({ closeReceipt, rentData }) => {
  const [receiptData, setReceiptData] = useState("");
  const [copiedState, setCopiedState] = useState({
    copied: false,
  });

  const [hide, setHide] = useState(false);
  console.log(rentData);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const Data = localStorage.getItem("RentResponse");
      if (Data) {
        const parsedData = JSON.parse(Data);
        setReceiptData(parsedData);
      }
    }
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById("receipt-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Create new PDF with portrait orientation
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
      pdf.save("Homz-Rent-Receipt.pdf"); // Download PDF with filename 'receipt.pdf'
    });
  };

  console.log(receiptData);
  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div
        id="receipt-content"
        className="h-auto w-[530px] bg-white rounded-lg px-8 pt-6"
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center justify-center pl-4">
            {rentData?.data?.enterPrise?.businessLogo?.url ?
                <Image
                  src={
                    rentData?.data?.enterPrise?.businessLogo?.url
                  }
                  alt=""
                  height={64}
                  width={64}
                  className="rounded-full"
                />
                :
                <Image
                  src={"/static/dashboard/enterprisemanager/payment/BWFrame.png"}
                  alt=""
                  height={64}
                  width={64}
                />
              }
              <p className="text-GrayHomz text-[18px] font-[500]">
              {rentData?.data?.enterPrise?.businessName}
              </p>
            </div>

            <div
              onClick={closeReceipt}
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
                Amount
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {addCommasToNumber(receiptData?.totalRent)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Description
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {addYearsToValues(receiptData?.duration)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Payment Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {changeBackendDateFormat(receiptData?.createdAt)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Next Due Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {changeBackendDateFormat(receiptData?.dueDate)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Apartment Number
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {receiptData?.apartmentNumber}
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
                Property Type
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {receiptData?.propertyType}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Property Manager
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {rentData?.data?.enterPrise?.fullName}
              </p>
            </div>
          </div>
          <div className="relative rounded-lg bg-whiteblue p-4 flex flex-col gap-2">
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
                Transaction Reference No
              </p>
              <div className="flex items-center gap-2 w-[50%]">
                <p className="text-BlueHomz text-[14px] font-[400]">
                  {receiptData?.reference}
                </p>
                <Image
                  src={"/static/dashboard/enterprisemanager/payment/copy.png"}
                  alt=""
                  height={16}
                  width={16}
                  className="cursor-pointer"
                  onClick={() =>
                    handleCopyClick(
                      `${receiptData?.reference}`,
                      "copied",
                      setCopiedState
                    )
                  }
                />
                {copiedState.copied && (
                  <span className=" absolute right-0 text-[10px] italic text-Success">
                    copied
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
                Status
              </p>
              <p className="text-BlueHomz text-[14px] font-[400] w-[50%]">
                Successful
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              downloadPDF();
            }}
            className={`w-full h-[48px] bg-BlueHomz rounded-md text-white `}
          >
            Share Receipt
          </button>
          <div className="border-t grid grid-cols-2 gap-2 pt-2">
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/sms.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                 {rentData?.data?.enterPrise?.user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/call.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                  {rentData?.data?.enterPrise?.phoneNumber}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/static/dashboard/enterprisemanager/payment/location.png"}
                alt=""
                height={12}
                width={12}
              />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {rentData?.data?.enterPrise?.estateAddress}
              </p>
            </div>
          </div>
        </div>
        <p className="m-4 text-[11px] font-[400] text-GrayHomz text-center">
          Copyright 2024 Homz.ng. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Receipt;
