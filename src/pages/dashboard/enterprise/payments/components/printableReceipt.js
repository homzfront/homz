import Image from "next/image";
import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import formatPaidAtDate from "@/utils/formatPaidAtDate";
import PhoneReceipt from "@/components/icons/phoneReceipt";
import EmailReceipt from "@/components/icons/emailReceipt";
import AddressReceipt from "@/components/icons/addressReceipt";
import DateFooter from "@/components/auth/dateFooter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import addYearsToValues from "@/utils/addYearsToNumber";

const PrintableReceipt = React.forwardRef(({ data }, ref) => (
  <div
    id="receipt-content-transfer"
    ref={ref}
    className="flex justify-center items-center h-screen bg-GrayHomz"
  >
    <div className="w-[540px] h-auto bg-white rounded-lg p-8">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center justify-center w-[60%]">
            {data?.enterPrise?.businessLogo?.url ?
              <Image
                src={
                  data?.enterPrise?.businessLogo?.url
                }
                alt="business-img"
                height={64}
                width={64}
                className="rounded-full object-contain"
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

          <div />
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
  </div>
));

PrintableReceipt.displayName = "PrintableReceipt";

export default PrintableReceipt;
