import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RentDetails = ({ handleRentalInfo, previousBtn }) => {
  const [yearlyRent, setYearly] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    reset();
    handleRentalInfo(data);
  };

  // const handleBlur = (e) => {

  //   setYearly("₦1234");
  //   console.log(yearlyRent)

  // };
  return (
    <div className="px-0">
      <div className="md:text-[23px] font-[700] text-BlueHomz leading-[20.16px] md:leading-[28.98px] pb-2">
        Rent Details
      </div>
      <div className="text-[13px] md:text-[18px] font-[400] w-[270px] md:w-full">
        Kindly fill in the accurate property details{" "}
        <span className="text-error hidden md:blcok text-[14px]">
          (Only fill the fields that are applicable to your property).
        </span>
      </div>
      <p className="text-error text-[11px] md:hidden w-[270px] mt-[2px]">
        (Only fill the fields that are applicable to your property).
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col md:w-full mt-6"
      >
        <div className="flex md:gap-[45px] gap-[24px] flex-col md:flex-row">
          <div className="flex flex-col md:gap-[28px] gap-[24px]">
            <div>
              <label htmlFor="monthlyRent">
                How much is the <b>monthly</b> rent?
              </label>
              <br />
              <input
                {...register("monthlyRent")}
                placeholder="N 00.00"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
                type="number"
                id="monthlyRent"
                name="monthlyRent"
                min="0"
              />
              {/* {errors.monthlyRent && (
                <p className="errorMsg">Property's titl is required</p>
              )} */}
            </div>
            <div>
              <label htmlFor="maintenanceFee">
                How much is the maintenance fee?
              </label>
              <br />
              <input
                {...register("maintenanceFee")}
                placeholder="N 00.00"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
                type="number"
                id="maintenanceFee"
                name="maintenanceFee"
                min="0"
              />
              {/* {errors.maintenanceFee && (
                <p className="errorMsg"></p>
              )} */}
            </div>
            <div>
              <label htmlFor="totalFee">How much is the total fee?</label>
              <br />
              <input
                {...register("totalFee")}
                placeholder="N 00.00"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
                type="number"
                id="totalFee"
                name="totalFee"
                min="0"
              />
              {/* {errors.totalFee && (
                <p className="errorMsg">total Fee is required</p>
              )} */}
            </div>
          </div>
          <div className="flex md:gap-[28px] gap-[24px] flex-col">
            <div>
              <label htmlFor="yearlyRent">
                How much is the <b>yearly</b> rent?
              </label>
              <br />
              <input
                {...register("yearlyRent")}
                placeholder="N 00.00"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
                type="number"
                id="yearlyRent"
                name="yearlyRent"
                min="0"
                // value={yearlyRent}
                // onChange={(e)=>setYearly(e.target.value)}
                // onBlur={handleBlur}
              />
              {/* {errors.yearlyRent && (
                <p className="errorMsg">total Fee is required</p>
              )} */}
            </div>
            <div>
              <label htmlFor="agencyFee">How much is the Agency fee?</label>
              <br />
              <input
                {...register("agencyFee")}
                placeholder="N 00.00"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
                type="number"
                id="agencyFee"
                name="agencyFee"
                min="0"
              />
              {/* {errors.agencyFee && (
                <p className="errorMsg">total Fee is required</p>
              )} */}
            </div>
          </div>
        </div>
        <div className="flex justify-between md:mt-24 mt-24 px-3 md:px">
          <div>
            <button
              className="text-[14px] font-[500] md:py-[8px] md:px-[12px]  rounded-[4px] md:text-BlueHomz adminBorders text-[#D5D5D5]  h-[36px] w-[36px] md:h-full md:w-full flex items-center justify-center gap-1 "
              onClick={previousBtn}
            >
              <Image
                src="/static/images/blue-arrow-left.svg"
                width={20}
                height={20}
                alt=""
                className="hidden md:block"
              />
              <Image
                src="/static/images/black-arrow-left.svg"
                width={22}
                height={22}
                alt=""
                className="md:hidden"
              />

              <span className="hidden md:block">Previous</span>
            </button>
          </div>

          <div className="">
            <button
              // disabled={!isValid ? true : false}
              className={`flex md:mr-5 adminBorders justify-center  md:w-[77px] items-center text-[14px] font-[500] md:py-[8px] md:px-[12px] ${
                // !isValid
                //   ? "text-GrayHomz bg-GrayHomz5 border-[#A9A9A9]"
                "md:text-white text-[#D5D5D5]   md:bg-BlueHomz h-[36px] w-[36px] md:h-full "
              } rounded-[4px]`}
              type="submit"
            >
              <span className="hidden md:block">Next</span>

              {/* {!isValid ? (
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                    }
                    alt=""
                    height={16}
                    width={16}
                  />
                ) : ( */}
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                }
                alt=""
                height={16}
                width={16}
                className="hidden md:block"
              />
              <Image
                src="/static/images/right-arrow-Icon.svg"
                width={16}
                height={16}
                alt=""
                className="md:hidden"
              />
              {/* )} */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RentDetails;
