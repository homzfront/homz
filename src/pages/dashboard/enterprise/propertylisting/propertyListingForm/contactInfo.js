import React from "react";
import Input from "../../components/input";
import Image from "next/image";

const ContactInfo = ({ handlePageChangeThree }) => {
  return (
    <div className="px-8">
      <div className="text-[23px] font-[700] text-BlueHomz mt-2">
        Contact Information
      </div>
      <div className="text-[18px] font-[400] text-GrayHomz">
        Kindly fill in your correct contact information
      </div>
      <div className="flex flex-col gap-4 w-[473px] mt-6">
        <Input
          label={"Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
        />
        <Input label={"Email"} placeholder={"Email@email.com"} type={"text"} />
        <Input
          label={"WhatsApp Link"}
          placeholder={"WA.com/your-link"}
          type={"text"}
        />
      </div>
      <div className="mt-[20%] flex justify-between">
        <div>
          <button
            onClick={handlePageChangeThree}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        <div>
          <button className="text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz w-[150px] ">
            List Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
