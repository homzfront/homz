import Image from "next/image";
import React from "react";

const RentInfo = ({ data = null }) => {
  if (!data) {
    return null;
  }
  return (
    <div className=" md:px-0">
      <div
        className="bg-cover w-[100%] p-[18px] h-[204px] md:w-[603px] rounded-[12px] md:py-[24px] md:px-[15px]"
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
          <div className="hidden md:block">
            <p className="text-[10px] font-[400] text-white">
              Tenancy Start Date
            </p>
            <p className="text-[11px] font-[500] text-white">
              4th January, 2023
            </p>
          </div>
        </div>
        {data.length < 1 ? (
          <div className="flex gap-4 mt-5 md:mt-8 flex-wrap md:flex-nowrap">
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
          <div className="flex w-[351px] h-[86px] items-center gap-[10px] md:w-[569px]  rounded-[12px]  mt-5 md:gap-4 md:mt-8 flex-wrap md:flex-nowrap">
            {data.map((data) => (
              <div key={data.id} className="w-[165px] h-[45px] pb-[5px] pl-[14px] pr-[8px] md:h-[68px] md:px-2 md:py-3 md:w-[134px] bg-lightblue rounded-lg flex justify-between flex-col">
                <p className="text-[11px] font-[400] text-white mb-2">
                  {data.name}
                </p>
                <p
                  className={`${
                    data.name === "Amount"
                      ? "text-[12px] md:text-[16px] font-[500]  text-white"
                      : ""
                  } ${
                    data.name === "Payment Status"
                      ? "text-white border mb-[7px] border-white text-[11px] font-[400] bg-Success rounded-lg w-[70%] text-center md:p-1 md:mt-[-2px]"
                      : ""
                  } ${
                    data.name === "Rent Duration"
                      ? "text-[12px] font-[500] text-white"
                      : ""
                  } ${
                    data.name === "Next Due Date"
                      ? "text-[12px] font-[500] text-white"
                      : ""
                  }  `}
                >
                  {data.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentInfo;
