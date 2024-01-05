import React from "react";
import Input from "../../components/input";
import Image from "next/image";

const ContactInfo = ({handlePageChangeTwo, handlePageChangeFour}) => {
  return (
    <div className="p-8">
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
      <div className="mt-[20%] flex justify-between">
        <div>
          <button
            onClick={handlePageChangeTwo}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            {" "}
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlePageChangeFour}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            Skip
          </button>
          <button
            onClick={handlePageChangeFour}
            className="text-[14px] font-[500] p-4 rounded-md bg-BlueHomz border text-white flex w-[100px] justify-center items-center"
          >
            Next
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
