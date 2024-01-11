import Image from "next/image";
import React from "react";

const BillPayment = () => {
  return (
    <div className="w-[460px] h-[315px] border p-[24px] rounded-[12px]">
      <div className="flex gap-2 items-center">
        <Image
          src={"/static/dashboard/tenant/dashboard/card-coin.png"}
          height={21}
          width={20}
          alt=""
        />
        <p className="text-[14px] font-[500] text-GrayHomz">Bill payment</p>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <div>
          <Image
            src={"/static/dashboard/tenant/dashboard/FrameFolde.png"}
            height={97}
            width={96}
            alt=""
          />
          <p className="mt-2 text-[14px] font-[500] text-BlueHomz text-center">
            Coming Soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillPayment;
