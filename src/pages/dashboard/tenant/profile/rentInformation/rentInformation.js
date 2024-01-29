import React from "react";

const RentInformation = () => {
  return (
    <div>
      <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-2">
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">Property</p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            New Suncity Property
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Apartment Number
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            Apartment 1
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Property Type
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            2-Bedroom Bungalow
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Rent Duration
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">1 Year</p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Start Date
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            4th January, 2023
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Due Date
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            4th January, 2024
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Total Rent
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            N750,000
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
          Payment Status
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
          Pending
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentInformation;
