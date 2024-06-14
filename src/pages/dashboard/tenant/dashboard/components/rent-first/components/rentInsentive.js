import Incentive from "@/components/icons/incentive";
import IncentiveSmall from "@/components/icons/incentiveSmall";
import Link from "next/link";
import React from "react";

const RentInsentive = ({ data = null }) => {

  return (
    <div className="w-full sm:w-[40%] h-auto sm:h-[203px] border p-4  sm:p-[24px] rounded-[12px]">
      <div className="h-full w-full flex flex-col justify-between">

        {data ? (
          <div className={`gap-2 justify-between h-full flex flex-col`}>
            <div className="flex gap-2 sm:items-center">
              <div className="sm:hidden">
                <IncentiveSmall />
              </div>
              <div className="flex flex-col gap-1 sm:gap-4">
                <p className="hidden sm:block text-[16px] font-[500] text-warning2"> Early Rent Payment Cashback!</p>
                <p className="sm:hidden text-[14px] font-[500] text-warning2">Rent Incentives</p>
                <p className=" text-[11px] sm:text-[13px] font-[400] text-GrayHomz sm:w-[254px]">
                  Get 10% cashback when you pay your rent within the first 6 month
                  from your initial payment.
                </p>
                <Link href={"/dashboard/tenant/finance"} className="hidden sm:block">
                  <button

                    className="bg-BlueHomz w-full sm:w-[110px] h-[37px] py-2 text-white px-2 text-[14px] font-[500] rounded-lg"
                  >
                    Pay rent now
                  </button>
                </Link>
              </div>
              <div className="hidden sm:block ">
                <Incentive />
              </div>
            </div>
            <Link href={"/dashboard/tenant/finance"} className="sm:hidden">
              <button

                className="bg-BlueHomz w-full sm:w-[110px] h-[37px] py-2 text-white px-2 text-[14px] font-[500] rounded-lg"
              >
                Pay rent now
              </button>
            </Link>
          </div>

        ) : (
          <div className={`gap-2 justify-between h-full flex flex-col`}>
            <div className="flex gap-2 sm:items-center">
              <div className="sm:hidden">
                <IncentiveSmall />
              </div>
              <div className="flex flex-col gap-1 sm:gap-4">
                <p className=" text-[14px] sm:text-[16px] font-[500] text-warning2">Rent Incentives</p>
                <p className=" text-[11px] sm:text-[13px] font-[400] text-GrayHomz sm:w-[254px]">
                  Incentives set by your property manager are displayed here for you.
                </p>
                <button
                  disabled
                  className="hidden sm:block w-full sm:w-[110px] h-[37px] bg-GrayHomz6 text-GrayHomz5 px-2 text-[14px] font-[500] rounded-lg"
                >
                  Pay rent now
                </button>
              </div>
              <div className="hidden sm:block">
                <Incentive />
              </div>
            </div>
            <button
              disabled
              className="sm:hidden mt-1 w-full sm:w-[110px] h-[37px] bg-GrayHomz6 text-GrayHomz5 px-2 text-[14px] font-[500] rounded-lg"
            >
              Pay rent now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentInsentive;
