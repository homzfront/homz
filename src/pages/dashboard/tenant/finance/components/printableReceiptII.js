import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addYearsToValues from "@/utils/addYearsToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import EmailReceipt from "@/components/icons/emailReceipt";
import PhoneReceipt from "@/components/icons/phoneReceipt";
import AddressReceipt from "@/components/icons/addressReceipt";
import changeBackendDateFormatII from "@/utils/changeBackendDateFormatII";
import DateFooter from "@/components/auth/dateFooter";

const PrintableReceiptII = React.forwardRef(({ rentData, tenantData }, ref) => (
  <div
    ref={ref}
    className="flex justify-center items-center h-screen bg-GrayHomz"
  >
    <div
      id="receipt-content"
      className="h-auto w-[530px] bg-white rounded-lg px-8 pt-6"
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center justify-center">
            {rentData?.enterPrise?.businessLogo?.url ?
              <Image
                src={
                  rentData?.enterPrise?.businessLogo?.url
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
              {rentData?.enterPrise?.businessName}
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
                Rent Amount
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(rentData?.rent)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Duration
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {addYearsToValues(rentData?.duration)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Payment Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {changeBackendDateFormat(rentData?.paymentDate ?? rentData?.createdAt)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Next Due Date
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {changeBackendDateFormat(rentData?.dueDate)}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Amount Paid
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                <span className={`${!rentData?.amountPaid && "hidden"}`} style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(rentData?.amountPaid)}
              </p>
            </div>
            <div className={`w-full flex gap-4 ${rentData?.paymentMethod !== "offline" && "hidden"}`}>
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Description
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {rentData?.description}
              </p>
            </div>
            <div className={`w-full flex gap-4 ${rentData?.paymentMethod !== "offline" && "hidden"}`}>
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Payment Method
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {`${rentData?.paymentMethod} (${rentData?.modeOfTransaction})`}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Apartment Number
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {rentData?.apartmentNumber}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Property
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {rentData?.estateId?.name}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Property Type
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {rentData?.propertyType}
              </p>
            </div>
            <div className="w-full flex gap-4">
              <p className="text-GrayHomz text-[13px] font-[400] w-[40%]">
                Property Manager
              </p>
              <p className="text-GrayHomz text-[14px] font-[400] w-[60%]">
                {tenantData?.data?.enterPrise?.fullName}
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
                {rentData?.reference}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center gap-4">
            <p className="text-BlueHomz text-[13px] font-[400] w-[40%]">
              Status
            </p>
            <p className="text-BlueHomz text-[14px] font-[400] w-[60%]">
              Successful
            </p>
          </div>
        </div>
        <div className="border-t flex flex-col gap-2 pt-2 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex items-start md:items-center gap-2 w-[45%] break-words">
              <div className="mt-[2px] md:mt-0">
                <EmailReceipt />
              </div>
              <p className="text-GrayHomz2 text-[11px] font-[500] w-[80%]">
                {rentData?.enterPrise?.user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2 w-[45%]">
              <PhoneReceipt />
              <p className="text-GrayHomz2 text-[11px] font-[500]">
                {rentData?.enterPrise?.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AddressReceipt />
            <p className="text-GrayHomz2 text-[11px] font-[500]">
              {rentData?.enterPrise?.businessAddress}
            </p>
          </div>
        </div>
      </div>
      <p className="m-4 text-[11px] font-[400] text-GrayHomz text-center">
       <DateFooter />
      </p>
    </div>
  </div>
));

PrintableReceiptII.displayName = "PrintableReceiptII";

export default PrintableReceiptII;
