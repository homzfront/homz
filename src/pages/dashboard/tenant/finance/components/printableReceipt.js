import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addYearsToValues from "@/utils/addYearsToNumber";
import formatPaidAtDate from "@/utils/formatPaidAtDate";
import Image from "next/image";
import EmailReceipt from "@/components/icons/emailReceipt";
import PhoneReceipt from "@/components/icons/phoneReceipt";
import AddressReceipt from "@/components/icons/addressReceipt";
import changeBackendDateFormatII from "@/utils/changeBackendDateFormatII";

const PrintableReceipt = React.forwardRef(({ rentData, receiptData }, ref) => (
  <div
    ref={ref}
    className="flex justify-center items-center h-screen bg-GrayHomz"
  >
    <div className="h-auto w-[530px] bg-white rounded-lg px-8 pt-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center justify-center pl-4">
            {receiptData?.enterprise?.businessLogo?.url ? (
              <Image
                src={receiptData?.enterprise?.businessLogo?.url}
                alt=""
                height={64}
                width={64}
                className="rounded-full"
              />
            ) : (
              <Image
                src={"/static/dashboard/enterprisemanager/payment/BWFrame.png"}
                alt=""
                height={64}
                width={64}
              />
            )}
            <p className="text-GrayHomz text-[18px] font-[500]">
              {receiptData?.enterprise?.businessName}
            </p>
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
              <p className="text-BlueHomz text-[14px] font-[400]">
                {receiptData?.referenceTransaction}
              </p>
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
        <div className="border-t grid grid-cols-2 gap-2 pt-2">
          <div className="flex items-center gap-2">
            <EmailReceipt />
            <p className="text-GrayHomz2 text-[11px] font-[500]">
              {receiptData?.enterprise?.user?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PhoneReceipt />
            <p className="text-GrayHomz2 text-[11px] font-[500]">
              {receiptData?.enterprise?.businessPhoneNumber}
            </p>
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
  </div>
));

export default PrintableReceipt;
