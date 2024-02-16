import addCommasToNumber from "@/utils/addCommasToNumber";
import addYearsToValues from "@/utils/addYearsToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import React from "react";

const RentInfo = ({ data = null }) => {
  if (!data) {
    return null;
  }

  console.log(data);
  return (
    <div>
      <div
        className="bg-cover h-[204px] w-[621px] rounded-[12px] p-[24px] "
        style={{
          background: "#006AFF",
          backgroundImage: `url(/static/dashboard/tenant/dashboard/backgroundImage.png)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={"/static/dashboard/tenant/dashboard/FrameHome.png"}
              alt=""
              height={52}
              width={52}
            />
            <div>
              <p className="text-[16px] font-[500] text-white">
                Rent Information
              </p>
              <p className="text-[11px] font-[400] text-white">
                Here are details of your current rental period.
              </p>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-[400] text-white">
              Tenancy Start Date
            </p>
            <p className="text-[11px] font-[500] text-white">
              {changeBackendDateFormat(data?.startDate)}
            </p>
          </div>
        </div>
        {data?.length < 1 ? (
          <div className="flex gap-4 mt-8">
            <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg">
              <p className="text-[11px] font-[400] text-white">Amount</p>
              <p className="text-[18px] font-[500] text-white">-</p>
            </div>
            <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg">
              <p className="text-[11px] font-[400] text-white">Rent Duration</p>
              <p className="text-[18px] font-[500] text-white">-</p>
            </div>
            <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg">
              <p className="text-[11px] font-[400] text-white">
                Payment Status
              </p>
              <p className="text-[18px] font-[500] text-white">-</p>
            </div>
            <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg">
              <p className="text-[11px] font-[400] text-white">Next Due Date</p>
              <p className="text-[18px] font-[500] text-white">-</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 mt-8">
            <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg flex justify-between flex-col">
              <p className="text-[11px] font-[400] text-white mb-2">Amount</p>
              <p className={`text-[16px] font-[500] text-white`}>
                {addCommasToNumber(data?.totalRent)}
              </p>
            </div>
            <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg flex justify-between flex-col">
              <p className="text-[11px] font-[400] text-white mb-2">
                Rent Duration
              </p>
              <p className={`text-[11px] font-[500] text-white`}>
                {addYearsToValues(data?.duration)}
              </p>
            </div>
            <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg flex justify-between flex-col">
              <p className="text-[11px] font-[400] text-white mb-2">
                Payment Status
              </p>
              <p
                className={`text-white border border-white text-[11px] font-[400] ${
                  data?.paymentStatus === "paid" ? "bg-Success" : ""
                } ${data?.paymentStatus === "over due" ? "bg-error" : ""} ${
                  data?.paymentStatus === "pending" ? "bg-warning2" : ""
                } rounded-lg w-[70%] text-center p-1 mt-[-2px]`}
              >
                {capitalizeFirstLetter(data?.paymentStatus)}
              </p>
            </div>
            <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg flex justify-between flex-col">
              <p className="text-[11px] font-[400] text-white mb-2">
                Next Due Date
              </p>
              <p className={`text-[11px] font-[500] text-white`}>
                {changeBackendDateFormat(data?.dueDate)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentInfo;
