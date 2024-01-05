import React from "react";
import Image from "next/image";
import Input from "../../../components/input";

const ContactInfo = ({handlePageChangeTwo, handlePageChangeFour}) => {
  return (
    <div className="">
      <div>
        <h1 className="text-[23px] font-[700] text-BlueHomz">
          Contact Information
        </h1>
        <p className="text-[18px] font-[400] text-GrayHomz">
          Kindly fill in your contact information
        </p>
      </div>
      <div className="w-[50%] mt-4 flex flex-col gap-2">
        <Input
          label={"Manager’s Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
        />
        <Input
          label={"Emergency Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
        />
        <Input
          label={"Utility Services Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
          span2={"(Dry cleaning, Waste disposal, etc)"}
        />
        <Input
          label={"Security  Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
        />
      </div>
      <div className="mt-[10%] flex justify-end">
        <button className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;
