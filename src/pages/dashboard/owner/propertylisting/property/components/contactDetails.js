import React from "react";
import Input from "../../../components/input";

const ContactDetails = () => {
  return (
    <div>
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
      <div className="mt-[20%] flex justify-end">
        <button className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
