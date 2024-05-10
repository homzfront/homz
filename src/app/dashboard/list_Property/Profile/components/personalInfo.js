"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";




const PersonalInfo = ({
  Personal_Info,
  handleUpdate,
  data,
}) => {
  const [update, setUpdate] = useState(false);
  const [ImageSrc, setImageSrc] = useState("");
  const [profileFoto, setProfileFoto] = useState(null);
  const ProfilePhoto = useRef(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes


  // const { ProfilePhoto, } = ProfilePhoto?.Photo ?? {};


  const displayProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setErrorMsg("Only JPG, JPEG or PNG files are allowed.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        // File size exceeds the limit
        setErrorMsg("File size exceeds 5MB.");
        return;
      } else {
        setErrorMsg("");
        setProfileFoto(file);
        setFileUploaded(true);
        setImageSrc(URL.createObjectURL(file));
      }
    }
  };
  const uploadProfilePhoto = () => {
    // console.log(ProfilePhoto.current);
    if (ProfilePhoto.current) {
      ProfilePhoto.current.click();
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
    // defaultValues: Personal_Info.RentalInfo,
  });

  // useEffect(() => {
  //   reset(Personal_Info.contactInfo);
  // }, [Personal_Info.contactInfo, reset]);
  

  const onSubmit = (data) => {
    // reset();
    // console.log(data)
    handleUpdate(data);
  };
  return (
    <div className="">
      {/* {loading && <Loading />} */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col md:w-full md:px-6"
      >
        <div className="flex  md:gap-[78px] gap-8 mt-5 flex-col md:flex-row sideBarHidden">
          <div className="flex md:flex-col flex-row gap-[28px] items-center profileMini">
            <div>
              <input
                type="file"
                name="ProfilePhoto"
                id="ProfilePhoto"
              ref={ProfilePhoto}
                onChange={displayProfilePhoto}
                style={{ display: "none" }}
                accept="image/png, image/jpg, image/jpeg"
              />

              <p
                className={`md:w-[181px] md:h-[181px] h-[65px] w-[65px] rounded-[100%] flex justify-center items-center mx-auto ${
                  !fileUploaded && "bg-[#D5D5D5]"
                }`}
              >
                <Image
                  src={fileUploaded ? ImageSrc : "/static/images/user.svg"}
                  alt="Profile Photo"
                  className={`${
                    fileUploaded
                      ? "md:w-[181px] md:h-[181px] h-[65px] w-[65px] rounded-[100%] "
                      : "md:w-[39.71px] md:h-[39.71px] h-[14.26px] w-[14.26px]"
                  }`}
                  width={181}
                  height={181}
                />
              </p>
               {errors.ProfilePhoto && (
                  <p className="errorMsg text-center">{errors.ProfilePhoto?.message}</p>
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
                  Click to upload profile photo
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
              <p className="text-[11px] text-red-600">
                {errorMsg ? errorMsg : ""}
              </p>
            </div>
          </div>
          <div className="profiles flex  flex-col space-y-4">
            <div>
              <label htmlFor="Full Name"> Full Name</label>
              <br />
              <input
                {...register("FullName", {})}
                placeholder="Full Name"
                className={`h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {/* {errors.FullName && (
                <p className="errorMsg">Full Name is required</p>
              )} */}
            </div>

            <div>
              <label htmlFor="PhoneNumber"> Phone Number</label>
              <br />
              <input
                {...register("PhoneNumber", {
                  // required: "Phone Number is required",
                  pattern: {
                    value: /^((\+234)+|0)[7-9]{1}[0-9]{9}$/,
                    message: "Invalid Phone number",
                  },
                })}
                placeholder="Enter Phone Number"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {/* {errors.PhoneNumber && (
                <p className="errorMsg">{errors.PhoneNumber?.message}</p>
              )} */}
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
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {errors.Email && (
                <p className="errorMsg">{errors.Email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="House Address"> House Address</label>
              <br />
              <input
                {...register("House_Address", {})}
                placeholder="House Address"
                className={`h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[335px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
              {/* {errors.House_Address && (
                  <p className="errorMsg">House Address is required</p>
                )} */}
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
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[335px] ${
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
            className="hidden md:flex  border justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
            type="submit"
          >
            Update
          </button>
          <div className="md:hidden flex flex-col ">
            {update ? (
              <button
                className="flex  border justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                type="submit"
              >
                Save Update
              </button>
            ) : (
              <p
                className="flex  border justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
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

export default PersonalInfo;
