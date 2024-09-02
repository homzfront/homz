import Image from "next/image";
import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import formatPaidAtDate from "@/utils/formatPaidAtDate";
import PhoneReceipt from "@/components/icons/phoneReceipt";
import EmailReceipt from "@/components/icons/emailReceipt";
import AddressReceipt from "@/components/icons/addressReceipt";

const PrintableReceipt = React.forwardRef(({ data }, ref) => (
  <div
    id="receipt-content-transfer"
    ref={ref}
    className="flex justify-center items-center h-screen bg-GrayHomz"
  >
    <div className="max-w-[530px] md:w-[530px] w-auto h-auto bg-white rounded-lg p-8">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          {data?.enterprise?.businessLogo?.url ? (
            <Image
              src={data.enterprise.businessLogo.url}
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
            {data?.enterprise?.businessName}
          </p>
        </div>
        <div>
          <p className="text-BlueHomz text-[14px] font-[500]">
            Transaction Receipt
          </p>
        </div>
        <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-4">
          <div className="w-full flex gap-3">
            <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
              Amount
            </p>
            <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
              {addCommasToNumber(data?.amount)}
            </p>
          </div>
          <div className="w-full flex gap-3">
            <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
              Recipient
            </p>
            <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
              {data?.metadate?.custom_fields[0]?.value}
            </p>
          </div>
          <div className="w-full flex gap-3">
            <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
              Description
            </p>
            <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
              {data?.description}
            </p>
          </div>
          <div className="w-full flex gap-3">
            <p className="text-GrayHomz text-[13px] font-[400] w-[50%]">
              Date
            </p>
            <p className="text-GrayHomz text-[14px] font-[400] w-[50%]">
              {formatPaidAtDate(data?.paidAt)}
            </p>
          </div>
        </div>
        <div className="relative rounded-lg bg-whiteblue p-4 flex flex-col gap-3">
          <div className="w-full flex gap-4">
            <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
              Transaction Reference No
            </p>
            <div className="flex items-center gap-2 w-[50%]">
              <p className="text-BlueHomz text-[14px] font-[400]">
                {data?.referenceTransaction}
              </p>
            </div>
          </div>
          <div className="w-full flex gap-3">
            <p className="text-BlueHomz text-[13px] font-[400] w-[50%]">
              Status
            </p>
            <p className="text-BlueHomz text-[14px] font-[400] w-[50%]">
              Successful
            </p>
          </div>
        </div>
        <div className="border-t grid grid-cols-2 gap-2 pt-4">
          <div className="flex items-center gap-2">
            <EmailReceipt />
            <p className="text-GrayHomz2 text-[11px] font-[500]">
              {data?.enterprise?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PhoneReceipt />
            <p className="text-GrayHomz2 text-[11px] font-[500]">
              {data?.enterprise?.businessPhoneNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AddressReceipt />
            <p className="text-GrayHomz2 text-[11px] font-[500]">
              {data?.enterprise?.businessAddress}
            </p>
          </div>
        </div>
        <p className="text-[11px] font-[400] text-GrayHomz text-center w-full">
          &copy; Copyright 2024 Homz.ng. All Rights Reserved
        </p>
      </div>
    </div>
  </div>
));

PrintableReceipt.displayName = "PrintableReceipt";

export default PrintableReceipt;
