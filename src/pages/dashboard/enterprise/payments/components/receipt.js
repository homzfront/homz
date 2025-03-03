import Image from "next/image";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the styles for the skeleton
import addCommasToNumber from "@/utils/addCommasToNumber";
import handleCopyClick from "@/utils/handleCopyClick";
import formatPaidAtDate from "@/utils/formatPaidAtDate";
import PrintableReceipt from "./printableReceipt";
import EmailReceipt from "@/components/icons/emailReceipt";
import PhoneReceipt from "@/components/icons/phoneReceipt";
import AddressReceipt from "@/components/icons/addressReceipt";
import DateFooter from "@/components/auth/dateFooter";
import addYearsToValues from "@/utils/addYearsToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import ExportSmall from "@/components/icons/exportSmall";

const Receipt = ({ setShowReceipt, data }) => {
  const [copiedState, setCopiedState] = useState({ copied: false });
  const printableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: "Homz Receipt",
    onAfterPrint: () => console.log("Receipt printed."),
  });
  
  return (
    <div className="">
      <div
        className="h-auto md:w-[530px] bg-white rounded-lg px-8 pt-6 overflow-y-auto max-h-[90vh] scrollbar-container"
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center justify-center w-[60%]">
              {data?.enterPrise?.businessLogo?.url ?
                <Image
                  src={
                    data?.enterPrise?.businessLogo?.url
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
              <p className="text-GrayHomz text-[18px] w-full font-[500]">
                {data?.enterPrise?.businessName}
              </p>
            </div>

            <div
              onClick={()=>setShowReceipt(false)}
              className="cursor-pointer flex w-[40%] justify-end"
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
          <div className="rounded-lg bg-inputBg p-4">
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
              Tenant Name
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
               {data?.tenantId?.fullName}
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-2">
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Rent Amount
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.rent)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Duration
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {addYearsToValues(data?.duration)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Payment Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {changeBackendDateFormat(data?.paymentDate ?? data?.createdAt)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Next Due Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {changeBackendDateFormat(data?.dueDate)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Amount Paid
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                <span className={`${!data?.amountPaid && "hidden"}`} style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.amountPaid)}
              </p>
            </div>
            <div className={`w-full flex gap-4 ${data?.paymentMethod !== "offline" && "hidden"}`}>
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Description
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {data?.description}
              </p>
            </div>
            <div className={`w-full flex gap-4 ${data?.paymentMethod !== "offline" && "hidden"}`}>
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Payment Method
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {`${data?.paymentMethod} (${data?.modeOfTransaction})`}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Apartment Number
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {data?.apartmentNumber}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Property
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {data?.estateId?.name}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Property Type
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {data?.propertyType}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Property Manager
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {data?.enterPrise?.fullName}
              </p>
            </div>
          </div>
          <div className="relative rounded-lg bg-whiteblue p-4 flex flex-col gap-2">
            <div className="w-full flex items-center gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[40%]">
                Transaction Reference No
              </p>
              <div className="flex items-center gap-2 w-[60%]">
                <p className="text-BlueHomz text-[14px] break-words font-[400] w-[85%]">
                  {data?.reference}
                </p>
                <Image
                  src={"/static/dashboard/enterprisemanager/payment/copy.png"}
                  alt=""
                  height={16}
                  width={16}
                  className="cursor-pointer"
                  onClick={() =>
                    handleCopyClick(
                      `${data?.reference}`,
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
            <div className="w-full flex items-center gap-2 md:gap-4">
              <p className="text-BlueHomz text-[13px] font-[400] w-[40%]">
                Status
              </p>
              <p className="text-BlueHomz text-[14px] font-[400] w-[60%]">
                Successful
              </p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className={`w-full h-[48px] bg-BlueHomz rounded-md text-white flex justify-center items-center gap-2`}
          >
            <ExportSmall className="#ffffff" /> Share Receipt
          </button>
          <div className="border-t flex flex-col gap-2 pt-2 w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-start md:items-center gap-2 w-[45%] break-words">
                <div className="mt-[2px] md:mt-0">
                  <EmailReceipt />
                </div>
                <p className="text-GrayHomz2 text-[11px] font-[500] w-[80%]">
                  {data?.enterPrise?.user?.email}
                </p>
              </div>
              <div className="flex items-center gap-2 w-[45%]">
                <PhoneReceipt />
                <p className="text-GrayHomz2 text-[11px] font-[500]">
                  {data?.enterPrise?.phoneNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AddressReceipt />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {data?.enterPrise?.businessAddress}
              </p>
            </div>
          </div>
        </div>
        <p className="m-4 text-[11px] font-[400] text-GrayHomz text-center">
          <DateFooter />
        </p>
      </div>
      <div style={{ display: 'none' }}>
        <PrintableReceipt
          ref={printableRef}
          data={data}
        />
      </div>
    </div>
  );
};

export default Receipt;
