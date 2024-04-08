"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link';

const RentDetails = ({rentalInfo, handleUpdate }) => {
  const [yearlyRent, setYearly] = useState("");
  const [update, setUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
    defaultValues: rentalInfo.RentalInfo,
  });

  useEffect(() => {
    reset(rentalInfo.RentalInfo);
  }, [rentalInfo.RentalInfo, reset]);


  const onSubmit = (data) => {
    handleUpdate(data);
  };

  // const handleBlur = (e) => {

  //   setYearly("₦1234");
  //   console.log(yearlyRent)

  // };
  return (
    <div className="px-0">
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
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"}`}
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
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"}`}
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
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"}`}
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
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"}`}
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
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"}`}
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
        <div className="flex  md:justify-end justify-center mt-8 ">
            
            <button
              className="hidden md:flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
              type="submit"
            >
              Update
            </button>
            <div className="md:hidden flex flex-col ">
            <Link
              href=""
              className="text-[#006AFF] text-[14px] leading-[21px]  md:hidden mx-auto mb-3"
            >
              See public view
            </Link>
              {update ? (
                <button
                  className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                  type="submit"
                >
                  Save Update
                </button>
              ) : (
                <div
                  className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                  onClick={()=> setUpdate(true)}
                >
                  Update
                </div>
              )}
            </div>
          </div>
      </form>
    </div>
  );
};

export default RentDetails;
