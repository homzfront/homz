"use client";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addYearsToValues from "@/utils/addYearsToNumber";
import handleCopyClick from "@/utils/handleCopyClick";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableReceipt from "./printableReceipt";
import formatPaidAtDate from "@/utils/formatPaidAtDate";
import changeBackendDateFormatII from "@/utils/changeBackendDateFormatII";
import EmailReceipt from "@/components/icons/emailReceipt";
import PhoneReceipt from "@/components/icons/phoneReceipt";
import AddressReceipt from "@/components/icons/addressReceipt";

const Receipt = ({ closeReceipt, rentData, receiptData }) => {
  const [copiedState, setCopiedState] = useState({ copied: false });
  const printableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: "Homz Receipt",
    onAfterPrint: () => console.log("Receipt printed."),
  });

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div
        className="h-auto w-[530px] bg-white rounded-lg px-8 pt-6"
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center justify-center pl-4">
              {receiptData?.enterprise?.businessLogo?.url ?
                <Image
                  src={
                    receiptData?.enterprise?.businessLogo?.url
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
                {receiptData?.enterprise?.businessName}
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
              Rent Payment Receipt
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
                {formatPaidAtDate(receiptData?.paidAt)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Tenant
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {rentData?.data?.tenantId.fullName}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Tenancy Period
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {changeBackendDateFormatII(receiptData?.rentStartDate)} - {changeBackendDateFormatII(receiptData?.rentDueDate)}
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
                Property Address
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
              {rentData?.data?.estateId?.address}
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
          </div>
          <div className="relative rounded-lg bg-whiteblue p-4 flex flex-col gap-2">
            <div className="w-full flex gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
                Transaction Reference No
              </p>
              <div className="flex items-center gap-2 w-[50%]">
                <p className="text-BlueHomz text-[14px] break-words font-[400] w-[85%]">
                  {receiptData?.referenceTransaction}
                </p>
                <Image
                  src={"/static/dashboard/enterprisemanager/payment/copy.png"}
                  alt=""
                  height={16}
                  width={16}
                  className="cursor-pointer"
                  onClick={() =>
                    handleCopyClick(
                      `${receiptData?.referenceTransaction}`,
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
            onClick={handlePrint}
            className={`w-full h-[48px] bg-BlueHomz rounded-md text-white `}
          >
            Share Receipt
          </button>
          <div className="border-t flex flex-col gap-2 pt-2 w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-start md:items-center gap-2 w-[45%] break-words">
                <div className="mt-[2px] md:mt-0">
                  <EmailReceipt />
                </div>
                <p className="text-GrayHomz2 text-[11px] font-[500] w-[80%]">
                  {receiptData?.enterprise?.user?.email}
                </p>
              </div>
              <div className="flex items-center gap-2 w-[45%]">
                <PhoneReceipt />
                <p className="text-GrayHomz2 text-[11px] font-[500]">
                  {receiptData?.enterprise?.businessPhoneNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AddressReceipt />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {receiptData?.enterprise?.businessAddress}
              </p>
            </div>
          </div>
        </div>
        <p className="m-4 text-[11px] font-[400] text-GrayHomz text-center">
          &copy; Copyright 2024 Homz.ng. All Rights Reserved
        </p>
      </div>
      <div style={{ display: 'none' }}>
        <PrintableReceipt
          ref={printableRef}
          receiptData={receiptData}
          rentData={rentData}
        />
      </div>
    </div>
  );
};

export default Receipt;
