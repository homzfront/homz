import Image from "next/image";
import React from "react";
import Input from "./input";

const Withdraw = () => {
  return (
    <div className="p-5 border rounded-[12px] flex flex-col gap-4">
      <div className="flex gap-1 items-center">
        <Image
          src={"/static/dashboard/enterprisemanager/payment/received.png"}
          width={20}
          height={21}
          alt=""
        />
        <p className="text-[14px] font-[500] text-BlueHomz">Withdraw</p>
      </div>
      <p className="text-[13px] font-[400] text-GrayHomz">
        Withdraw from your wallet balance to your local bank account
      </p>
      <div >
        <div className="flex gap-4 w-[199px] justify-between">
          <p className="text-[11px] font-[400] text-GrayHomz">Account Number</p>
          <p className="text-[11px] font-[500] text-BlackHomz w-[80px] text-start">0000 000 0000</p>
        </div>
        <div className="flex gap-4 w-[199px] justify-between">
          <p className="text-[11px] font-[400] text-GrayHomz">Account  Name</p>
          <p className="text-[11px] font-[500] text-BlackHomz w-[80px] text-start">Vicstates Ent</p>
        </div>
        <div className="flex gap-4 w-[199px] justify-between">
          <p className="text-[11px] font-[400] text-GrayHomz">Bank</p>
          <p className="text-[11px] font-[500] text-BlackHomz w-[80px] text-start">Bank Name</p>
        </div>
      </div>
      <Input label={"Amount (N)"} placeholder={"200,000"} />
      <span className="w-[full] h-[45px] text-GrayHomz5 bg-inputBg p-[10px] rounded-md text-center">
          Withdraw
        </span>
    </div>
  );
};

export default Withdraw;
