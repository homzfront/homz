import React from "react";
import Image from "next/image";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const ExtraDetails = ({ propertyData, additionalDetails }) => {
  // console.log(propertyData);
  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col gap-[8px]">
        <p className="bg-[#006AFF] text-white px-[12px] py-[8px] rounded-[4px] text-[13px]">
          Property Details
        </p>
        <div className="bg-[#EEF5FF] px-[12px] py-[8px] rounded-[4px] grid grid-cols-3 sm:grid-cols-4">
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Property Type
            </span>
            <span className="text-[#202020] text-[14px] leading-[21px] font-[400]">
              {capitalizeFirstLetter(propertyData?.propertyType) || "---"}
            </span>
          </p>
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Sub-Type
            </span>
            <span className="text-[#202020] text-[14px] leading-[21px] font-[400]">
              {capitalizeFirstLetter(propertyData?.subType) || "---"}
            </span>
          </p>
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Units
            </span>
            <span className="text-[#202020] text-[13px] leading-[21px] font-[400]">
              {capitalizeFirstLetter(propertyData?.units) || "---"}
            </span>
          </p>
          <p className="flex flex-col gap-0 mt-6 sm:mt-0 w-[250px] sm:w-fit">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Additional Details
            </span>
            {propertyData.details &&
              propertyData?.details.map((detail, index) => (
                <span className="px-2" key={index}>
                  <span className="text-[#202020] text-[13px] leading-[21px] font-[400] flex gap-2">
                    <Image
                      src="/static/images/dot.svg"
                      alt=""
                      width={5}
                      height={5}
                      className="inline-block"
                    />
                    <span> {capitalizeFirstLetter(detail) || "---"}</span>
                  </span>
                </span>
              ))}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="bg-[#006AFF] text-white px-[12px] py-[8px] rounded-[4px] text-[13px]">
          Price
        </p>
        <div className="bg-[#EEF5FF] px-[12px] py-[8px] rounded-[4px] grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0">
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Payment Type
            </span>
            <span className="text-[#202020] text-[14px] leading-[21px] font-[400]">
              {capitalizeFirstLetter(propertyData?.paymentType) || "---"}
            </span>
          </p>
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              {propertyData?.paymentType
                ? capitalizeFirstLetter(propertyData?.paymentType)
                : "---"}
            </span>
            <span className="text-[#202020] text-[14px] leading-[21px] font-[400]">
              ₦ {Number(propertyData?.price).toLocaleString() || "---"}
            </span>
          </p>
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Maintenance Fee
            </span>
            <span className="text-[#202020] text-[14px] leading-[21px] font-[400]">
              ₦ {Number(propertyData?.maintenanceFee).toLocaleString() || "---"}
            </span>
          </p>
          <p className="flex flex-col gap-0 pr-7 sm:pr-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Agency Fee
            </span>
            <span className="text-[#202020] text-[14px] leading-[21px] font-[400]">
              ₦ {Number(propertyData?.agencyFee).toLocaleString() || "---"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="bg-[#006AFF] text-white px-[12px] py-[8px] rounded-[4px] text-[13px]">
          Installment Details
        </p>
        <div className="bg-[#EEF5FF] sm:px-[12px] pl-[12px] py-[8px] rounded-[4px] grid grid-cols-3 sm:grid-cols-4 gap-6 sm:gap-0">
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Frequency
            </span>
            <span className="text-[#202020] text-[13px] leading-[21px] font-[400]">
              {capitalizeFirstLetter(propertyData?.frequency) || "---"}
            </span>
          </p>
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Duration
            </span>
            <span className="text-[#202020] text-[13px] leading-[21px] font-[400]">
              {propertyData?.duration
                ? capitalizeFirstLetter(propertyData?.duration)
                : "---"}
            </span>
          </p>
          <p className="flex flex-col gap-0">
            <span className="text-[11px] text-[#006AFF] leading-[16.5px] font-[500] mb-2">
              Initial Payment
            </span>
            <span className="text-[#202020] text-[13px] leading-[21px] font-[400]">
              {propertyData?.initialPayment
                ? "₦" + Number(propertyData?.initialPayment).toLocaleString()
                : "---"}
            </span>
          </p>
          <p className="hidden sm:block"></p>
        </div>
      </div>
    </div>
  );
};

export default ExtraDetails;
