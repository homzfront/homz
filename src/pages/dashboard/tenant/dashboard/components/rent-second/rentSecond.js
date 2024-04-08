import Image from "next/image";
import React from "react";

const RentSecond = () => {
  return (
    <div className="flex flex-col gap-[16px] md:flex-row">
      <div className="border flex w-full md:w-[309px] justify-between p-3 rounded-[12px] border-warning3 bg-warning4  md:h-[120px] md:p-[20px]  order-2 md:-order-none">
        <div className=" flex flex-col justify-center items-start px-2 gap-[5px]">
          <p className="text-warning2">Rent Target</p>
          {/* <p className="text-BlueHomz text-[11px] md:text[16px]">Wallet Balance</p> */}
          <p className="text-[16px] font-[500] text-BlackHomz">N1,200,000</p>
          <p className="text-[11px] font-[400] text-GrayHomz">
            4th January, 2024
          </p>
          {/* <p className="text-[16px] font-[500] text-BlackHomz">N800,000</p> */}
        </div>

        <div className="pt-[2rem] pr-[2rem] md:pr-0">
          <Image
            src={"/static/dashboard/tenant/dashboard/edit.png"}
            height={32}
            width={32}
            alt=""
          />
        </div>
        {/* </div> */}
      </div>

      <div className="border h-[108px] flex w-full md:w-[309px] flex-col md:h-[120px] justify-between p-3 rounded-[12px] border-Success2 bg-Success3 order-last md:-order-none">
        <div className=" flex justify-between">
          <div className=" flex flex-col justify-center items-start pl-3 gap-[10px] pt-3">
            <p className="text-Success text-[13px] font-[400]">
              Rent Savings 2024
            </p>

            <p className="text-[16px] font-[500] text-BlackHomz">N800,000</p>
          </div>  

          <div className="pt-[1rem] pr-[2rem] md:pr-0">
            <Image
              src={"/static/dashboard/tenant/dashboard/addGreen.png"}
              height={40}
              width={40}
              alt=""
            />
          </div>
        </div>

        <div className=" w-[298px]  rounded-sm ml-[13px] md:ml-0 md:w-full bg-Success4 h-[7px] flex justify-start items-center ">
          <span className="rounded-sm w-[67%] h-[5px] bg-Success text-Success">
            <></>
          </span>
        </div>
      </div>
      <div className="border flex justify-between p-3 h-[84px] w-full md:w-[309px] rounded-[12px] border-lightblue bg-BlueHomz3 md:h-[120px] md:p-[20px] order-1 md:order-none">
        <div className=" flex flex-col justify-center items-start pl-3 gap-[20px]">
          <p className="text-BlueHomz text-[11px] md:text[16px]">
            Wallet Balance
          </p>
          <p className="text-[16px] font-[500] text-BlackHomz">N800,000</p>
        </div>
        <div className="pt-3 pr-[2rem] md:pr-0">
          <Image
            src={"/static/dashboard/tenant/dashboard/FrameRightBlue.png"}
            height={40}
            width={40}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RentSecond;
