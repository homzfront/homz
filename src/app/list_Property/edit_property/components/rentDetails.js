"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const RentDetails = ({ rentalInfo, handleUpdate }) => {
  const [paymentType, setPaymentType] = useState("");
  const [price, setPrice] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [total, setTotal] = useState("");
  const [agency, setAgency] = useState("");
  const Payment_Type =
    rentalInfo.RentalInfo?.Payment_Type && rentalInfo.RentalInfo.Payment_Type;
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
        <div className="flex md:gap-[45px] gap-[24px] flex-col md:flex-row sideBarHidden">
          <div className="flex flex-col md:gap-[28px] gap-[24px]">
            <div className="">
              <label htmlFor="Payment_Type">Payment Type</label>
              <br />
              <select
                name="Payment_Type"
                id="Payment_Type"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 fields duoViewPoint adminCellBorders w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
                {...register("Payment_Type", {
                  required: true,
                })}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Property Type
                </option>
                <option value="Outright-Payment">Outright Payment</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Every_6_Months">Every 6 Months</option>
                <option value="Yearly">Yearly</option>
              </select>
              {/* {errors.Payment_Type && (
                  <p className="errorMsg">Property Type is required.</p>
                )} */}
            </div>
            <div>
              <label htmlFor="Price">
                {paymentType
                  ? paymentType === "Every_6_Months"
                    ? "Half Year"
                    : paymentType
                  : Payment_Type === "Every_6_Months"
                  ? "Half Year"
                  : Payment_Type}{" "}
                Price
              </label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[335px]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center ${
                    !price && "opacity-50"
                  }`}
                >
                  N
                </span>
                <input
                  {...register("Price")}
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] sm:w-full py-[12px] pl-8 rounded-[4px]  fields duoViewPoint adminCellBorders w-[335px] ${
                    !update &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
                  type="number"
                  id="Price"
                  name="Price"
                  min="0"
                  disabled={paymentType === "" && true}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* {errors.maintenanceFee && (
                <p className="errorMsg"></p>
              )} */}
            </div>
            <div>
              <label htmlFor="totalFee">How much is the total fee?</label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[335px]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center ${
                    !total && "opacity-60"
                  }`}
                >
                  N
                </span>
                <input
                  {...register("totalFee")}
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] sm:w-full py-[12px] pl-8 rounded-[4px]  fields duoViewPoint adminCellBorders w-[335px] ${
                    !update &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
                  type="number"
                  id="totalFee"
                  name="totalFee"
                  min="0"
                  disabled={paymentType === "" && true}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </div>
              {/* {errors.totalFee && (
                <p className="errorMsg">total Fee is required</p>
              )} */}
            </div>
          </div>
          <div className="flex md:gap-[28px] gap-[24px] flex-col">
            <div>
              <label htmlFor="agencyFee">How much is the Agency fee?</label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[335px]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center ${
                    !agency && "opacity-60"
                  }`}
                >
                  N
                </span>
                <input
                  {...register("agencyFee")}
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] sm:w-full py-[12px] pl-8 rounded-[4px]  fields duoViewPoint adminCellBorders w-[335px] ${
                    !update &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
                  type="number"
                  id="agencyFee"
                  name="agencyFee"
                  min="0"
                  disabled={paymentType === "" && true}
                  onChange={(e) => setAgency(e.target.value)}
                />
              </div>
              {/* {errors.agencyFee && (
                <p className="errorMsg">total Fee is required</p>
              )} */}
            </div>
            <div>
              <label htmlFor="maintenanceFee">
                How much is the maintenance fee?
              </label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[335px]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center ${
                    !maintenance && "opacity-60"
                  }`}
                >
                  N
                </span>
                <input
                  {...register("maintenanceFee")}
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] sm:w-full py-[12px] pl-8 rounded-[4px]  fields duoViewPoint adminCellBorders w-[335px] ${
                    !update &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
                  type="number"
                  id="maintenanceFee"
                  name="maintenanceFee"
                  min="0"
                  disabled={paymentType === "" && true}
                  onChange={(e) => setMaintenance(e.target.value)}
                />
              </div>
              {/* {errors.maintenanceFee && (
                <p className="errorMsg"></p>
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
                onClick={() => setUpdate(true)}
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
