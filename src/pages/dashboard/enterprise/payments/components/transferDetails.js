import Image from "next/image";
import React from "react";
import Input from "./input";
import Dropdown from "./dropDown";

const TransferDetails = () => {
  const handleSelect = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedValue(option);
  };

  const options = [
    { id: 1, label: "First Bank" },
    { id: 2, label: "GT Bank" },
    { id: 3, label: "Access Bank" },
  ];
  return (
    <div className="p-5 border rounded-[12px] h-[533px] w-[542px] mt-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={"/static/dashboard/enterprisemanager/payment/send-2.png"}
            width={20}
            height={21}
            alt=""
          />
          <p className="text-[14px] font-[500] text-BlueHomz">Transfer</p>
        </div>
        <span className="w-[60px] h-[37px] text-GrayHomz2 bg-GrayHomz6 p-[5px] rounded-md text-center">
          Send
        </span>
      </div>
      <div className="flex flex-col gap-4 justify-between">
        <Input label={"Account Number"} value={"012345678901"} />
        <div className="">
          <div className="pb-2 text-[13px] font-[500] text-BlackHomz">Bank</div>
          <Dropdown
            options={options}
            onSelect={handleSelect}
            selectOption={"Select recipient’s bank"}
            className="w-[500px]"
          />
        </div>
        <Input label={"Recipient’s Name"} placeholder={"Autofill Full Name"} />
        <Input label={"Amount (N)"} placeholder={"200,000"} />
        <Input label={"Description"} placeholder={"2023 Rent Payments"} />
      </div>
    </div>
  );
};

export default TransferDetails;
