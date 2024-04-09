"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Loading from "/src/components/mainmenu/loading";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// const schema = yup.object().shape({
//   BusinessPhoto: yup
//     .mixed()
//     .test('is-valid-extension', 'Only JPG and PNG extensions are allowed', (value) =>
//     value && /\.(jpg|png)$/i.test(value[0]?.name)
//   )
//     .test('is-valid-size', 'Max allowed size is 5MB', (value) =>
//       value && value[0]?.size <= 5242880
//     ),
// });

const BusinessInfo = ({
  Business_Info,
  handleUpdate,
  // loading,
}) => {
  const [update, setUpdate] = useState(false);
  const [ImageSrc, setImageSrc] = useState("");
  const [businessLogo, setBusinessLogo] = useState(null);
  const BusinessPhotoRef = useRef(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  // const { BusinessPhoto, } = BusinessPhoto?.Photo ?? {};

  const displayBusinessPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBusinessLogo(file);
      setFileUploaded(true);
      setImageSrc(URL.createObjectURL(file));
    }
  };
  const uploadProfilePhoto = () => {
    // console.log(BusinessPhoto.current);
    if (BusinessPhotoRef.current) {
      BusinessPhotoRef.current.click();
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
    // resolver: yupResolver(schema),
    // defaultValues: Business_Info.RentalInfo,
  });

  // useEffect(() => {
  //   reset(Business_Info.contactInfo);
  // }, [Business_Info.contactInfo, reset]);

  const onSubmit = (data) => {
    // reset();
    console.log("Data", data, "Logo", businessLogo);
    handleUpdate(data);
  };
  return (
    <div className="">
      {/* {loading && <Loading />} */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col md:w-full md:px-4"
      >
        <div className="flex  md:gap-[78px] gap-8 mt-5 flex-col">
          <div className="flex items-center flex-row gap-[28px] ">
            <div>
              <input
                type="file"
                name="BusinessPhoto"
                ref={BusinessPhotoRef}
                id="BusinessPhoto"
                onChange={displayBusinessPhoto}
                style={{ display: "none" }}
                accept="image/png, image/jpg"
              />

              <p
                className={`md:w-[181px] md:h-[181px] h-[65px] w-[65px] rounded-[100%] flex justify-center items-center mx-auto ${
                  !fileUploaded && "bg-[#D5D5D5]"
                }`}
              >
                <Image
                  src={
                    fileUploaded ? ImageSrc : "/static/images/upload_image.svg"
                  }
                  alt="Business Photo"
                  className={`${
                    fileUploaded
                      ? "md:w-[181px] md:h-[181px] h-[65px] w-[65px] rounded-[100%] "
                      : "md:w-[39.71px] md:h-[39.71px] h-[14.26px] w-[14.26px]"
                  }`}
                  width={181}
                  height={181}
                />
              </p>
              {errors.BusinessPhoto && (
                <p className="errorMsg text-center">
                  {errors.BusinessPhoto?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col md:gap-[12px] gap-2 md:items-center md:justify-center justify-start md:shadow-sm md:p-2">
              <p className="hidden w-[40px] h-[40px] rounded-[28px] bg-[#F2F4F7] md:flex items-center justify-center cursor-pointer">
                <Image
                  onClick={uploadProfilePhoto}
                  src="/static/images/upload-cloud.svg"
                  alt="upload-cloud"
                  width={20}
                  height={20}
                />
              </p>
              <p className="text-[#006AFF] font-[600] leading-[17.64px]">
                <span
                  className="hidden md:block cursor-pointer"
                  onClick={uploadProfilePhoto}
                >
                  Click to upload business logo
                </span>
                <span className="md:hidden" onClick={uploadProfilePhoto}>
                  Upload profile photo
                </span>
              </p>
              <p className="hidden md:block text-[#4E4E4E] font-[600] leading-[21px]">
                or drag and drop
              </p>
              <p className="text-[#4E4E4E] font-[400] text-[11px] leading-[16.5px]">
                JPG or PNG (max. 5mb)
              </p>
            </div>
          </div>
          <div className="profiles flex  flex-col space-y-4">
            <div>
              <label htmlFor="Business Name">
                {" "}
                Business Name{" "}
                <span className="text-red-500 text-[16px]">*</span>
              </label>
              <br />
              <input
                {...register("BusinessName", {
                  required: "Business Name is required",
                })}
                placeholder="Business Name"
                className={`h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {errors.BusinessName && (
                <p className="errorMsg">{errors.BusinessName?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="businessEmail">
                {" "}
                Business Email
                {/* <span className="text-red-500 text-xs">*</span> */}
              </label>
              <br />
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                {...register("businessEmail", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter Business Email"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {errors.businessEmail && (
                <p className="errorMsg">{errors.businessEmail.message}</p>
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

export default BusinessInfo;
