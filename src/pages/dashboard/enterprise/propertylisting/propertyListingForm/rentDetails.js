import Image from "next/image";
import React, { useState } from "react";
import Input from "../../components/input";

const RentDetails = ({
  handlePageChangeThree,
  handlePageChange,
  formData,
  handleChange
}) => {
  const [visibleAddProperty, setVisibleAddProperty] = useState(false);

  const ableAddProperty = () => {
    setVisibleAddProperty(true);
  };

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
          type={"number"}
          value={formData?.monthlyRent}
          onChange={(e) => handleChange("monthlyRent", e.target.value)}
        />
        <Input
          label={"How much is the yearly rent?"}
          placeholder={"N  00.00"}
          type={"number"}
          value={formData?.yearlyRent}
          onChange={(e) => handleChange("yearlyRent", e.target.value)}
        />

        <Input
          label={"How much is the maintenance fee?"}
          placeholder={"N  00.00"}
          type={"number"}
          value={formData?.maintenanceFee}
          onChange={(e) => handleChange("maintenanceFee", e.target.value)}
        />
        <Input
          label={"How much is the Agency fee?"}
          placeholder={"N  00.00"}
          type={"number"}
          value={formData?.agencyFee}
          onChange={(e) => handleChange("agencyFee", e.target.value)}
        />
        <Input
          label={"How much is the total fee?"}
          placeholder={"N  00.00"}
          type={"number"}
          value={formData?.totalFee}
          onChange={(e) => handleChange("totalFee", e.target.value)}
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
        <div className="flex gap-2">
          <button
            onClick={ableAddProperty}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            Skip
          </button>
          {!formData?.maintenanceFee &&
            !formData?.yearlyRent &&
            !formData?.monthlyRent &&
            !formData?.totalFee &&
            !formData?.agencyFee && !visibleAddProperty ? (
            <div className="">
              <button
                disabled
                className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
              >
                Next
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                  }
                  alt=""
                  height={17}
                  width={16}
                />
              </button>
            </div>
          ) : (
            <div className="">
              <button
                onClick={handlePageChangeThree}
                className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz"
              >
                Next
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                  }
                  alt=""
                  height={16}
                  width={16}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentDetails;
