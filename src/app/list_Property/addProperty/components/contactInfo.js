import React, { useState } from "react";
import Image from "next/image";
import Loading from "/src/components/mainmenu/loading";
import { useForm } from "react-hook-form";

const ContactInfo = ({
  BackToPropertyPhotos,
  handleSubmitData,
  // loading,
}) => {
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
    handleSubmitData(data);
  };
  return (
    <div className="">
      {/* {loading && <Loading />} */}

      <div className="md:text-[23px] font-[700] text-BlueHomz leading-[20.16px] md:leading-[28.98px]">
        Contact Information
      </div>
      <div className="leading-[16.38px] text-[13px] md:text-[14px] font-[400]">
        Kindly fill in your correct contact information
      </div>
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
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
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
                {...register("Email")}
                placeholder="Enter Email"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
              />
              {errors.Email && <p className="errorMsg">Email is required</p>}
            </div>
            <div>
              <label htmlFor="WhatsAppLink"> WhatsApp Link</label>
              <br />
              <input
                {...register("WhatsAppLink")}
                placeholder="Enter WhatsApp Link"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
              />
              {errors.WhatsAppLink && (
                <p className="errorMsg">WhatsApp Link is required</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-[8rem] px-3 flex justify-between">
          <div>
            <button
              className="text-[14px] font-[500] md:py-[8px] md:px-[12px]  rounded-[4px] md:text-BlueHomz adminBorders text-[#D5D5D5]  h-[36px] w-[36px] md:h-full md:w-full flex items-center justify-center gap-1 "
              onClick={BackToPropertyPhotos}
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
          <button
            disabled={!isValid ? true : false}
            className={`flex md:mr-14 adminBorders justify-center  w-[122px]  items-center text-[14px] font-[500] py-[8px] px-[12px] ${
              !isValid
                ? "text-GrayHomz bg-GrayHomz5 border-[#A9A9A9]"
                : "text-white border-white bg-BlueHomz"
            } rounded-[4px]`}
            type="submit"
          >
            List Property
            {!isValid ? (
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                }
                alt=""
                height={16}
                width={16}
              />
            ) : (
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                }
                alt=""
                height={16}
                width={16}
              />
            )}
          </button>
          {/* {
          <div className="">
            <button
              disabled
              className="flex w-[150px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
            >
              Add Property
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
              onClick={openYesOrNo}
              className="flex w-[150px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz"
            >
              Add Property
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
        )} */}
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
