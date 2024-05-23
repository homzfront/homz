"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";




const PersonalInfo = ({
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
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  function addLeadingZero(number) {
    return number?.toString()?.startsWith('0') ? number : '0' + number;
  }

  useEffect(() => {
    if (data) {
      setFullName(data?.fullName || "");
      setHouseAddress(data?.houseAddress || "");
      setPhoneNumber(addLeadingZero(data?.phoneNumber) || "");
      setWhatsappLink(data?.whatsappLink || "")

      if (data?.coverPhoto?.url) {
        setFileUploaded(true)
        setImageSrc(data?.coverPhoto?.url || "")
      }
    }
  }, [data]);


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

  const onSubmit = () => {
    const phoneNumberRegex = /^\d{11}$/;
    const whatsappLinkRegex = /^https:\/\/wa\.me\//;
    if (phoneNumber) {
      if (!phoneNumberRegex.test(phoneNumber)) {
        setError("Phone number must be 11 digits");
        return;
      }
    }
    if (whatsappLink) {
      if (!whatsappLinkRegex.test(whatsappLink)) {
        setError("Invalid whatsApp link. Whatsapp link must start with `https://wa.me/`");
        return;
      }
    }

    const data = {
      fullName,
      phoneNumber,
      whatsappLink,
      houseAddress,
      coverPhoto: profileFoto
    }
    handleUpdate(data);
  };


  return (
    <div className="w-full">
      <div
        className="w-full flex flex-col md:w-full md:px-6"
      >
        <div className="flex w-full md:gap-[78px] gap-8 mt-5 flex-col md:flex-row">
          <div className={`flex md:flex-col flex-row gap-[28px] items-center w-full
          ${!update ? "pointer-events-none" : ""} 
          `}>
            <div>
              <input
                type="file"
                name="ProfilePhoto"
                disabled={!update}
                ref={ProfilePhoto}
                onChange={displayProfilePhoto}
                style={{ display: "none" }}
                accept="image/png, image/jpg, image/jpeg"
              />
              <p
                className={`md:w-[181px] md:h-[181px] h-[65px] w-[65px] rounded-[100%] flex justify-center items-center mx-auto ${!fileUploaded && "bg-[#D5D5D5]"
                  }`}
              >
                <Image
                  src={fileUploaded ? ImageSrc : "/static/images/user.svg"}
                  alt="Profile Photo"
                  className={`${fileUploaded
                    ? "md:w-[181px] md:h-[181px] h-[65px] w-[65px] rounded-[100%] "
                    : "md:w-[39.71px] md:h-[39.71px] h-[14.26px] w-[14.26px]"
                    }`}
                  width={181}
                  height={181}
                />
              </p>
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
          <div className="w-full flex flex-col gap-4">
            <div className="w-full">
              <label className="text-[13px] md:text-[14px] font-[500] text-GrayHomz " htmlFor="Full Name"> Full Name</label>
              <br />
              <input
                disabled={!update}
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
            </div>

            <div className="w-full">
              <label className="text-[13px] md:text-[14px] font-[500] text-GrayHomz " htmlFor="PhoneNumber"> Phone Number</label>
              <br />
              <input
                disabled={!update}
                placeholder="Enter Phone Number"
                type="number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value)
                  setError("")
                }}
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
            </div>
            <div className="w-full">
              <label className="text-[13px] md:text-[14px] font-[500] text-GrayHomz " htmlFor="Email">
                Email
              </label>
              <br />
              <input
                type="email"
                name="Email"
                readOnly
                value={data?.user?.email}
                placeholder="Enter Email"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
            </div>
            <div className="w-full">
              <label className="text-[13px] md:text-[14px] font-[500] text-GrayHomz " htmlFor="House Address"> House Address</label>
              <br />
              <input
                disabled={!update}
                placeholder="House Address"
                value={houseAddress}
                onChange={(e) => setHouseAddress(e.target.value)}
                className={`h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
            </div>
            <div className="w-full">
              <label className="text-[13px] md:text-[14px] font-[500] text-GrayHomz " htmlFor="WhatsAppLink"> WhatsApp Link</label>
              <br />
              <input
                type="text"
                name="WhatsAppLink"
                placeholder="Enter WhatsApp Link"
                disabled={!update}
                value={whatsappLink}
                onChange={(e) => {
                  setWhatsappLink(e.target.value)
                  setError("")
                }}
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
              {/* {errors.WhatsAppLink && (
                <p className="errorMsg">WhatsApp Link is required</p>
              )} */}
            </div>
            {
              error && <div className="italic text-error text-[11px] font-[400]">
                {error}
              </div>
            }
          </div>
        </div>
        <div className="hidden md:flex md:justify-end justify-center mt-16 md:mt-12 ">
          <div className="flex flex-col ">
            {update ? (
              <button
                onClick={onSubmit}
                className="flex  border justify-center  md:w-[120px] w-[100%]  items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                type="submit"
              >
                Save Update
              </button>
            ) : (
              <p
                className="flex cursor-pointer border justify-center  md:w-[77px] w-[100%]  items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                onClick={() => setUpdate(true)}
              >
                Update
              </p>
            )}
          </div>
        </div>

        <div className="md:hidden flex w-full justify-center mt-16 md:mt-12 ">
          <div className="flex flex-col w-full">
            {update ? (
              <button
                onClick={onSubmit}
                className="flex  border justify-center  md:w-[120px] w-[100%]  items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                type="submit"
              >
                Save Update
              </button>
            ) : (
              <p
                className="flex cursor-pointer border justify-center  md:w-[77px] w-[100%]  items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                onClick={() => setUpdate(true)}
              >
                Update
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
