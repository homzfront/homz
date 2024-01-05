import Image from "next/image";
import React from "react";
import Input from "../../components/input";

const RentDetails = ({ handlePageChangeThree, handlePageChange }) => {
  return (
    <div className="px-8">
      <div className="text-[23px] font-[700] text-BlueHomz mt-2">
        Rent Details
      </div>
      <div className="text-[14px] font-[400]">
        Kindly fill in the accurate property details{" "}
        <span className="text-error">
          (Only fill the fields that are applicable to your property).
        </span>
      </div>
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
      <div className="mt-8 flex justify-between">
        <div>
          <button
            onClick={handlePageChange}
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
        <div>
          <button
            onClick={handlePageChangeThree}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
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

export default RentDetails;
