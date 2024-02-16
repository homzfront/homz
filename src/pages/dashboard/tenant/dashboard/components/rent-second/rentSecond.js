import Image from "next/image";
import React from "react";

const RentSecond = () => {
  return (
    <div className="flex w-full justify-between">
      {/* <div className="border rounded-[12px] border-warning3 bg-warning4 h-[120px] w-[342px] p-[20px] flex flex-col justify-between">
        <p className="text-warning2">Rent Target</p>
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="text-[16px] font-[500] text-BlackHomz">N1,200,000</p>
            <p className="text-[11px] font-[400] text-GrayHomz">
              4th January, 2024
            </p>
          </div>
          <div>
            <Image
              src={"/static/dashboard/tenant/dashboard/edit.png"}
              height={32}
              width={32}
              alt=""
            />
          </div>
        </div>
      </div> */}
      {/* <div className="border rounded-[12px] border-Success2 bg-Success3 h-[120px] w-[342px] p-[20px] flex flex-col justify-between">
        <p className="text-Success text-[13px] font-[400]">Rent Savings 2024</p>
        <div className="w-full flex justify-between items-center">
          <p className="text-[16px] font-[500] text-BlackHomz">N800,000</p>
          <div>
            <Image
              src={"/static/dashboard/tenant/dashboard/addGreen.png"}
              height={40}
              width={40}
              alt=""
            />
          </div>
        </div>
        <div className="w-full bg-Success4 h-[7px] flex justify-start items-center">
          <span className="w-[67%] h-[5px] bg-Success text-Success">
            <></>
          </span>
        </div>
      </div> */}
      <div className="border rounded-[12px] border-lightblue bg-BlueHomz3 h-[120px] w-[342px] p-[20px]">
        <p className="text-BlueHomz">Wallet Balance</p>
        <div className="w-full flex justify-end">
          <Image
            src={"/static/dashboard/tenant/dashboard/FrameRightBlue.png"}
            height={40}
            width={40}
            alt=""
          />
        </div>
        <p className="text-[16px] font-[500] text-BlackHomz">N800,000</p>
      </div>
    </div>
  );
};

export default RentSecond;
