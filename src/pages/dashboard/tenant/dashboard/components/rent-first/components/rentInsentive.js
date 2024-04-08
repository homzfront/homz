import Image from "next/image";
import React from "react";

const RentInsentive = ({ data = null }) => {
  if (!data) {
    return null;
  }
  return (
    <div className=" md:w-[100%] md:h-[203px] border md:pt-[23px] md:pb-[21px] md:px-[10px]  rounded-[12px] p-4 pl-4">
      <div className="h-full md:w-[321px] flex flex-col gap-[1.3rem] md:gap-0 md:justify-between">
        <div className="flex gap-[15px]">
          <div className=" md:order-2 md:pt-6">
            <Image
              src={"/static/images/tenantInfo.svg"}
              alt=""
              height={110}
              width={110}
            />
          </div>
          <div className="text-left md:order-1 md:pb-5 ">
            <p className="text-[16px] font-[500] text-warning2 pb-2">
              Rent Incentives
            </p>
            {data.length >= 1 ? (
              <p className="text-[13px] font-[400] text-GrayHomz md:w-[254px] md:pb-3">
                Get 10% cashback when you pay your rent within the first 6 month
                from your initial payment.
              </p>
            ) : (
              <p className="text-[13px] font-[400] text-GrayHomz w-[254px] pb-3">
                Incentives set by your property manager are displayed here for
                you.
              </p>
            )}
          </div>
        </div>
        <div className="">
          {data.length >= 1 ? (
            <button className="w-[100%] md:w-[110px] h-[37px] bg-BlueHomz text-white px-2 text-[14px] font-[500] rounded-lg">
              Pay rent now
            </button>
          ) : (
            <button
              disabled
              className="w-[300px] md:w-[110px] h-[37px] bg-GrayHomz6 text-GrayHomz5 px-2 text-[14px] font-[500] rounded-lg"
            >
              Pay rent now
            </button>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RentInsentive;
