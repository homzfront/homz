import React from "react";
import Input from "../../../components/input";

const RentDetails = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Input
          label={"How much is the monthly rent?"}
          placeholder={"N  00.00"}
          type={"text"}
        />
        <Input
          label={"How much is the yearly rent?"}
          placeholder={"N  00.00"}
          type={"text"}
        />

        <Input
          label={"How much is the maintenance fee?"}
          placeholder={"N  00.00"}
          type={"text"}
        />
        <Input
          label={"How much is the Agency fee?"}
          placeholder={"N  00.00"}
          type={"text"}
        />
        <Input
          label={"How much is the total fee?"}
          placeholder={"N  00.00"}
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

export default RentDetails;
