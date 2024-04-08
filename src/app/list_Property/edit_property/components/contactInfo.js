"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "/src/components/mainmenu/loading";
import { useForm } from "react-hook-form";
import Link from "next/link";

const ContactInfo = ({
  Contact_Info,
  handleUpdate,
  // loading,
}) => {
  const [update, setUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
    defaultValues: Contact_Info.RentalInfo,
  });

  useEffect(() => {
    reset(Contact_Info.contactInfo);
  }, [Contact_Info.contactInfo, reset]);

  const onSubmit = (data) => {
    // reset();
    handleUpdate(data);
  };
  return (
    <div className="">
      {/* {loading && <Loading />} */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col md:w-full"
      >
        <div className="flex  gap-[2rem] mt-5">
          <div className="profiles flex  flex-col space-y-4">
            <div>
              <label htmlFor="PhoneNumber">
                {" "}
                Phone Number <span className="text-red-500 text-[15px]">*</span>
              </label>
              <br />
              <input
                {...register("PhoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^((\+234)+|0)[7-9]{1}[0-9]{9}$/,
                    message: "Invalid Phone number",
                  },
                })}
                placeholder="Enter Phone Number"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {errors.PhoneNumber && (
                <p className="errorMsg">{errors.PhoneNumber?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="Email">
                {" "}
                Email
                {/* <span className="text-red-500 text-xs">*</span> */}
              </label>
              <br />
              <input
                type="email"
                id="Email"
                name="Email"
                {...register("Email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter Email"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {errors.Email && <p className="errorMsg">{errors.Email.message}</p>}
            </div>
            <div>
              <label htmlFor="WhatsAppLink"> WhatsApp Link</label>
              <br />
              <input
                type="text"
                id="WhatsAppLink"
                name="WhatsAppLink"
                {...register("WhatsAppLink")}
                placeholder="Enter WhatsApp Link"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {errors.WhatsAppLink && (
                <p className="errorMsg">WhatsApp Link is required</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex  md:justify-end justify-center mt-16 md:mt-12 ">
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
              <p
                className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                onClick={() => setUpdate(true)}
              >
                Update
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
