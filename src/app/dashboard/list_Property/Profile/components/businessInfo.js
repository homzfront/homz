"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import CustomizedModal from "../../components/CustomizedModal";
import { updateBusinessInfoLister } from "@/api/listingServices";
import api from "@/utils/api";
import TickSuccess from "@/components/icons/tickSuccess";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const BusinessInfo = ({ Business_Info, handleUpdate, mainSavedButton }) => {
  const [update, setUpdate] = useState(false);
  const [ImageSrc, setImageSrc] = useState("");
  const [businessLogo, setBusinessLogo] = useState(null);
  const BusinessPhotoRef = useRef(null);
  const BusinessCertificateRef = useRef(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [businessCertificateUpload, setBusCertUploaded] = useState(false);
  const [businessCertificate, setBusinessCertificate] = useState(null);
  const [progress, setProgress] = useState(0);
  const [busCertSuccess, setBusCertSuccess] = useState(false);
  const [uploadIntervalID, setUploadIntervalID] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const [certificateRemoved, setCertificateRemoved] = useState(false);
  const [removeCertificate, setRemoveCertificate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [openDocUpload, setOpenDocUpload] = useState(false);
  const [whatsapp, setWhatsAppLink] = useState("");
  const [whatsappFormatted, setWhatsAppFormatted] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [isFocus, setFocus] = useState(false);
  const phoneFormat = /^((\+234)+|0)[7-9]{1}[0-9]{9}$/;

  const [socialMedia, setSocialMediaLinks] = useState(socialMediaLinks);
  const [lastId, setLastId] = useState(socialMediaLinks.length);

  const addLink = () => {
    const newId = lastId + 1;
    setLastId(newId);
    setSocialMediaLinks([
      ...socialMedia,
      { id: newId, placeholder: "Type in social link", value: "" },
    ]);
  };
  const removeLink = (id) => {
    setSocialMediaLinks(socialMedia.filter((media) => media.id !== id));
  };

  const handleInputChange = (id, newValue) => {
    setSocialMediaLinks(
      socialMedia.map((media) =>
        media.id === id ? { ...media, value: newValue } : media
      )
    );
  };
  useEffect(() => {
    // Check if data and required properties are available
    if (Business_Info?.businessInfo) {
      setBusinessName(Business_Info?.businessInfo?.businessName || "");
      setBusinessEmail(Business_Info?.businessInfo?.businessEmail || "");
      if (Business_Info?.businessInfo?.businessLogo?.url) {
        setFileUploaded(true);
        setImageSrc(Business_Info?.businessInfo?.businessLogo?.url || "");
      }
      // setLoading(false); // Set loading to false once data is available
    }
  }, [Business_Info]);

  const closeModal = () => {
    setRemoveCertificate(false);
    setRemoveCertificate(true);
  };

  const closeSuccessModal = () => {
    setCertificateRemoved(false);
  };

  const handleRemoved = (e) => {
    e.preventDefault();
    setBusinessCertificate(null);
    setCertificateRemoved(true);
    setRemoveCertificate(false);
  };

  const viewFile = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }
  };

  const viewFileII = (file) => {
    if (file) {
      window.open(file);
    }
  };

  const displayBusinessPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setErrorMsg2("Only, JPG, JPEG or PNG files are allowed.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setErrorMsg2("File size exceeds 5MB.");
        return;
      } else {
        setErrorMsg2("");
        setBusinessLogo(file);
        setFileUploaded(true);
        setImageSrc(URL.createObjectURL(file));
      }
    }
  };

  const handleBusinessCertificate = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // File size exceeds the limit
        setErrorMsg("File size exceeds 5MB.");
        return;
      } else {
        setErrorMsg("");
        setBusinessCertificate(file);
        setBusCertUploaded(true);
      }
    }
  };

  // console.log(businessCertificate);
  // console.log(businessCertificateUpload)

  const UploadBusCertificate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("certificateCAC", businessCertificate);
    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const response = await api.patch(
        "/listingProperty/me/update/business-information",
        formData,
        { headers }
      );
      if (response?.data?.success) {
        setBusCertSuccess(true);
        setProgress(0); // Reset progress before starting the upload simulation
        setTimeout(() => {
          const totalSize = businessCertificate.size;
          let uploadedSize = 0;
          const uploadInterval = setInterval(() => {
            uploadedSize += 10000;
            const currentProgress = (uploadedSize / totalSize) * 100;
            setProgress(currentProgress);
            setBusCertUploaded(false);
            if (currentProgress >= 100) {
              clearInterval(uploadInterval);
            }
          }, 40);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }, 800);
      } else {
        setBusCertUploaded(false);
        setIsLoading(false);
      }
    } catch (error) {
      setBusCertUploaded(false);
      setIsLoading(false);
    }
  };

  const cancelUpload = () => {
    setProgress(0);
    setBusCertUploaded(false);
    setBusCertSuccess(false);
    setBusinessCertificate(null);
    clearInterval(uploadIntervalID);
  };

  const uploadProfilePhoto = () => {
    if (BusinessPhotoRef.current) {
      BusinessPhotoRef.current.click();
    }
  };

  const uploadBusinessCertificate = () => {
    if (BusinessCertificateRef.current) {
      BusinessCertificateRef.current.click();
    }
  };

  const onSubmit = (typeOfAction) => {
    const data = {
      ...(businessName && { businessName }),
      ...(businessEmail && { businessEmail }),
      ...(businessLogo && { businessLogo }),
    };
    handleUpdate(data, typeOfAction);
  };

  const triggerFileInputClick = () => {
    setOpenDocUpload(true);
  };

  // console.log(socialMedia);
  // console.log(openDocUpload)
  // console.log(busCertSuccess)

  // useEffect(() => {
  //   // console.log('busCertSuccess:', busCertSuccess, 'progress:', progress);
  // }, [busCertSuccess, progress]);
  return (
    <div className="">
      <div className=" flex flex-col md:w-full md:px-4 ">
        <div className="flex sm:flex-row md:gap-[22px] gap-8 mt-5 flex-col">
          <div className="flex  flex-col gap-[22px] w-[359px]">
            <div>
              <input
                type="file"
                name="BusinessPhoto"
                ref={BusinessPhotoRef}
                id="BusinessPhoto"
                onChange={displayBusinessPhoto}
                style={{ display: "none" }}
                accept="image/png, image/jpg, image/jpeg"
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
                      : "md:w-[39.71px] md:h-[39.71px] h-[14.26px] w-[14.26px] photos"
                  }`}
                  width={181}
                  height={181}
                />
              </p>
            </div>
            <div
              className={`flex flex-row md:gap-[10px] gap-2 md:items-center rounded-[12px] md:justify-center border justify-start md:shadow-sm md:p-[16px]
              ${!update ? "pointer-events-none" : ""} 
            `}
            >
              <p className="hidden w-[40px] h-[40px] rounded-[28px] bg-[#F2F4F7] md:flex items-center justify-center cursor-pointer">
                <Image
                  onClick={uploadProfilePhoto}
                  src="/static/images/upload-cloud.svg"
                  alt="upload-cloud"
                  width={20}
                  height={20}
                />
              </p>
              <div className="space-y-2">
                <p className="text-[#006AFF] font-[600] leading-[17.64px] cursor-pointer text-[14px]">
                  <span
                    className="hidden md:block cursor-pointer"
                    onClick={uploadProfilePhoto}
                  >
                    Click to upload business logo
                  </span>
               
                </p>
                <p className="hidden md:block text-[14px] text-[#4E4E4E] font-[600] leading-[21px]">
                  or drag and drop{" "}
                  <span className="text-[#4E4E4E] font-[400] text-[11px] leading-[16.5px]">
                    (JPG or PNG (max. 5mb))
                  </span>
                </p>
                <p className="text-[11px] text-red-600">
                  {errorMsg2 ? errorMsg2 : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="profiles grid sm:grid-flow-col gap-[12px]">
              <div className="w-full space-y-2 h-fit">
                <label
                  className="text-[13px] md:text-[14px] font-[500] text-GrayHomz"
                  htmlFor="Business Name"
                >
                  Business Name
                  <span className="text-red-500 text-[16px]">*</span>
                </label>
                <br />
                <input
                  placeholder="Business Name"
                  disabled={!update}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={`h-[45px] sm:w-[300.5px] md:p-[12px] rounded-[4px] pl-2 border border-[#A9A9A9] w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
                    !update &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
                />
              </div>

              <div className="space-y-2 h-fit">
                <label
                  className="text-[13px] md:text-[14px] font-[500] text-GrayHomz "
                  htmlFor="businessEmail"
                >
                  Business Email
                </label>
                <br />
                <input
                  type="email"
                  name="businessEmail"
                  disabled={!update}
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="Enter Business Email"
                  className={`duoViewPoint h-[45px] sm:w-[300.5px]  md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] border-[#A9A9A9]  text-GrayHomz placeholder:text-[13px] ${
                    !update &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
                />
              </div>
            </div>
            <div className="w-full space-y-2 h-fit">
              <label
                className="text-[13px] md:text-[14px] font-[500] text-GrayHomz"
                htmlFor="Business Name"
              >
                About Business & Services
              </label>
              <br />

              <textarea
                placeholder="Give a brief description about your business and services"
                className={`h-[179px]  md:p-[12px] rounded-[4px] pl-2 border border-[#A9A9A9] w-full text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
                // value={description}
                id="businessService"
                name="businessService"
                disabled={!update}
              ></textarea>
            </div>
          </div>
        </div>
        <section className="grid sm:grid-cols-2 gap-[16px]">
          <div className="bg-[#FCFCFC] rounded-[8px] flex flex-col sm:py-[32px] sm:px-[24px] gap-[16px]">
            <p className="text-[#202020] font-[500] leading-[24px]">
              Contact Infomation
            </p>
            <div className="space-y-2 h-fit">
              <label
                htmlFor="phoneNumber"
                className="text-[13px] font-[500] text-GrayHomz "
              >
                {" "}
                Phone Number
              </label>
              <br />
              <input
                type="text"
                placeholder="e.g 080********"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setError("");
                }}
                disabled={!update}
                className={` h-[45px] sm:w-[100%]  md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] border-[#A9A9A9]  text-GrayHomz placeholder:text-[13px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
                onBlur={() => {
                  if (!phoneFormat.test(phoneNumber)) {
                    setError("Invalid Phone number");
                    return;
                  }
                }}
              />
            </div>
            {error && (
              <div className="italic text-error text-[11px] font-[400]">
                {error}
              </div>
            )}
            <div className="space-y-2 h-fit">
              <label
                className="text-[13px] font-[500] text-GrayHomz "
                htmlFor="businessAddress"
              >
                Business Address
              </label>
              <br />
              <input
                type="text"
                name="businessAddress"
                disabled={!update}
                // onChange={(e) => setBusinessEmail(e.target.value)}
                placeholder="e.g OB 327, Sunny Place Plaza, Agege, Lagos"
                className={` h-[45px] sm:w-[100%]  md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] border-[#A9A9A9]  text-GrayHomz placeholder:text-[13px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
            </div>
            <div className="space-y-2 h-fit">
              <label
                className="text-[13px] font-[500] text-GrayHomz "
                htmlFor="businessAddress"
              >
                Website
              </label>
              <br />
              <input
                type="text"
                name="website"
                disabled={!update}
                // onChange={(e) => setBusinessEmail(e.target.value)}
                placeholder="e.g www.Homz.ng"
                className={` h-[45px] sm:w-[100%]  md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] border-[#A9A9A9]  text-GrayHomz placeholder:text-[13px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
            </div>
          </div>
          <div className="bg-[#FCFCFC] rounded-[8px] flex flex-col gap-[16px] sm:py-[32px] sm:px-[24px] ">
            {" "}
            <div className="flex items-center justify-between">
              <p className="text-[#202020] font-[500] leading-[24px]">
                Social media links
              </p>
              <button
                className="border h-[40px] text-[14px] gap-1 border-[#006AFF] text-[#006AFF] flex items-center justify-center rounded-[4px] py-[8px] px-[12px]"
                onClick={addLink}
                disabled={!update}
              >
                <Image
                  src="/static/images/addButton2.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="h-[16px] w-[16p]"
                />
                <span>Add link</span>
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-[16px] max-h-[225px] overflow-y-auto overflow-x-hidden">
              {socialMedia.slice(0, 4).map((social) => (
                <div key={social.id} className="space-y-2 h-fit">
                  <label
                    htmlFor={social.name}
                    className="text-[13px] font-[500] text-GrayHomz "
                  >
                    {capitalizeFirstLetter(social.name)}
                  </label>
                  <br />
                  <input
                    placeholder={capitalizeFirstLetter(social.placeholder)}
                    className="h-[45px] sm:w-[217px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
                    type="text"
                    value={social.value}
                    disabled={!update}
                    onChange={(e) =>
                      handleInputChange(social.id, e.target.value)
                    }
                  />
                </div>
              ))}

              {socialMedia.length > 4 &&
                socialMedia.slice(4).map((media, index) => (
                  <div key={index} className="relative space-y-2 h-fit">
                    <input
                      type="text"
                      className="h-[45px] sm:w-[217px] md:p-[12px] rounded-[4px] pl-2 pr-10 border placeholder:text-[13px] w-[100%]"
                      placeholder={media.placeholder}
                      value={media.value}
                      onChange={(e) =>
                        handleInputChange(media.id, e.target.value)
                      }
                    />
                    <Image
                      src="/static/images/cancelButton.svg"
                      alt="Cancel"
                      width={16}
                      height={16}
                      className="absolute top-4 transform -translate-y-1/2 right-1 opacity-30 hover:opacity-100 cursor-pointer"
                      onClick={() => removeLink(media.id)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
        <div className="border-b pb-2 flex items-center gap-[16px]">
          <button
            className="bg-[#006AFF] w-full  text-white rounded-[4px] border  h-[45px] text-center font-[500]"
            onClick={() => onSubmit("promotePage")}
          >
            Promote my business page
          </button>
          <button
            className="border-[#006AFF] w-full  text-[#006AFF] font-[500] rounded-[4px] border h-[45px] text-center"
            onClick={() => onSubmit("viewPage")}
          >
            View my business page
          </button>
        </div>
        <div className="md:w-full w-[100%] flex flex-col gap-[14px] md:pt-5">
          <p className="text-[14px] md:text-[18px] font-[600] md:leading-[27px] leading-[20.16px] text-left">
            Kindly upload any of the following documents for verification
            (format must be PDF)
          </p>
          <p className="text-[11px] text-[#4E4E4E] md:text-[14px] font-[400] text-left leading-[16.5px] md:leading-[21px]">
            1. Clear copy of your CAC <br /> 2. Clear copy of your membership
            certificate from any valid real estate body. (AEAEN or NIESV)
            <br /> 3. Clear copy of a valid means of identification.(Voters
            card, National Identity card, international Passport)
          </p>

          <div className="relative gap-[16px] py-[16px] px-[24px] md:py-[16px] md:px-[24px] rounded-[8px] bg-[#E6E6E6] flex md:h-[74px] w-full">
            <Image
              src="/static/images/document-upload.svg"
              alt="upload-cloud"
              width={40}
              height={40}
            />
            <>
              {Business_Info?.businessInfo?.isVerified === "verified" ? (
                <div className="flex flex-col gap-[4px] w-full">
                  <div className="w-full flex justify-between items-center mt-[10px]">
                    <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left text-BlueHomz">
                      [{Business_Info?.businessInfo?.certificateName}]
                    </p>
                    <p
                      className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                      onClick={() =>
                        viewFileII(
                          Business_Info?.businessInfo?.certificateCAC?.url
                        )
                      }
                    >
                      View
                    </p>
                  </div>
                  <div className="absolute bottom-[-45px] md:bottom-[-30px] left-0 text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E] flex flex-row items-center">
                    <TickSuccess />
                    <div>
                      Your business certificate has successfully been verified.
                      You can now <></>
                      <Link
                        href="/dashboard/list_Property/addProperty"
                        className="text-BlueHomz"
                      >
                        list more properties
                      </Link>{" "}
                      on your dashboard
                    </div>
                  </div>
                </div>
              ) : Business_Info?.businessInfo?.isVerified === "pending" ? (
                <div className="flex md:items-center flex-col md:flex-row justify-between w-full gap-[12px] md:gap-0">
                  <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#DC6803]">
                    <span className="inline-block">
                      [{Business_Info?.businessInfo?.certificateName}]
                    </span>{" "}
                    <span>is currently under review</span>
                  </p>
                  <p
                    className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                    onClick={() =>
                      viewFileII(
                        Business_Info?.businessInfo?.certificateCAC?.url
                      )
                    }
                  >
                    View
                  </p>
                </div>
              ) : Business_Info?.businessInfo?.isVerified === "rejected" &&
                !openDocUpload ? (
                <div
                  onClick={triggerFileInputClick}
                  className="flex justify-center items-center"
                >
                  <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left text-error">
                    [{Business_Info?.businessInfo?.certificateName}]{" "}
                    <span> is not a valid certificate, kindly</span>{" "}
                    <span className="text-BlueHomz cursor-pointer">
                      re-upload
                    </span>
                    <span> a valid certificate.</span>
                  </p>
                </div>
              ) : businessCertificateUpload ? (
                <div className="flex md:items-center flex-col md:flex-row md:justify-between w-full gap-[12px] md:gap-0">
                  <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left flex flex-col gap-[4px]">
                    <span className="text-[#006AFF] inline-block">
                      [{businessCertificate?.name && businessCertificate.name}]
                    </span>
                    <span className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                      PDF (
                      {businessCertificate?.size &&
                        (businessCertificate.size / (1024 * 1024)).toFixed(
                          2
                        )}{" "}
                      MB)
                    </span>
                  </p>
                  <div
                    className={`flex flex-row gap-[20px] items-center ${
                      isLoading ? "pointer-events-none" : ""
                    }`}
                  >
                    <p
                      className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                      onClick={() => viewFile(businessCertificate)}
                    >
                      View
                    </p>
                    <p
                      className="text-[#D92D20] text-[13px] font-[400] leading-[19.5px] cursor-pointer flex items-center gap-1"
                      onClick={() => {
                        setRemoveCertificate(true);
                      }}
                    >
                      <Image
                        src="/static/images/trash.svg"
                        alt="upload-cloud"
                        width={16}
                        height={16}
                      />
                      <span className="text-[13px]">Remove</span>
                    </p>
                    <div>
                      {!isLoading ? (
                        <p
                          className="editBtn py-[8px] px-[12px] hover:bg-BlueHomz hover:text-white rounded-[4px] cursor-pointer text-[#006AFF] leading-[19.5px] md:text-[14px] font-[500] text-[13px]"
                          onClick={UploadBusCertificate}
                        >
                          <span className="hidden md:block">
                            Upload Document
                          </span>
                          <span className="md:hidden">Upload</span>
                        </p>
                      ) : (
                        <div className="editBtn px-[12px] rounded-[4px] py-[8px] h-[37px] flex items-center justify-center">
                          <ThreeDots
                            visible={true}
                            height="30"
                            width="30"
                            color="#006AFF"
                            radius="9"
                            ariaLabel="three-dots-loading"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : busCertSuccess ? (
                <>
                  {progress >= 100 ? (
                    <div className="flex md:items-center flex-col md:flex-row justify-between w-full gap-[12px] md:gap-0">
                      <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#DC6803]">
                        <span className="inline-block">
                          [
                          {businessCertificate?.name &&
                            businessCertificate.name}
                          ]
                        </span>{" "}
                        <span>is currently under review</span>
                      </p>
                      <p
                        className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                        onClick={() => viewFile(businessCertificate)}
                      >
                        View
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[8px] w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#006AFF]">
                          <span className="text-[#006AFF] inline-block ">
                            [
                            {businessCertificate?.name &&
                              businessCertificate.name}
                            ]
                          </span>
                        </p>
                        {/* <Image
                              src="/static/images/close-square.svg"
                              alt="upload-cloud"
                              width={24}
                              height={24}
                              className="cursor-pointer"
                              onClick={cancelUpload}
                            /> */}
                      </div>
                      <progress
                        id="businessCert"
                        value={progress}
                        max="100"
                        className="w-full h-[4px]"
                      />
                    </div>
                  )}
                </>
              ) : openDocUpload ? (
                <div className="flex flex-col gap-[4px]">
                  <input
                    type="file"
                    name="BusinessCertificate"
                    ref={BusinessCertificateRef}
                    id="BusinessCertificate"
                    onChange={handleBusinessCertificate}
                    style={{ display: "none" }}
                    accept="application/pdf"
                  />
                  <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left ">
                    <span
                      className="text-[#006AFF] inline-block cursor-pointer"
                      onClick={uploadBusinessCertificate}
                    >
                      Select CAC or membership certificate
                    </span>
                    <span className="text-[#4E4E4E] hidden md:inline-block">
                      {" "}
                      or drag and drop
                    </span>
                  </p>
                  <p className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                    PDF (max. 5mb)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-[4px]">
                  <input
                    type="file"
                    name="BusinessCertificate"
                    ref={BusinessCertificateRef}
                    id="BusinessCertificate"
                    onChange={handleBusinessCertificate}
                    style={{ display: "none" }}
                    accept="application/pdf"
                  />
                  <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left ">
                    <span
                      className="text-[#006AFF] inline-block cursor-pointer"
                      onClick={uploadBusinessCertificate}
                    >
                      Select CAC or membership certificate
                    </span>
                    <span className="text-[#4E4E4E] hidden md:inline-block">
                      {" "}
                      or drag and drop
                    </span>
                  </p>
                  <p className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                    PDF (max. 5mb)
                  </p>
                </div>
              )}
            </>
          </div>
          <p className="text-[11px] text-red-600">{errorMsg ? errorMsg : ""}</p>
        </div>

        <div className="hidden md:flex md:justify-end justify-center mt-16 md:mt-12 ">
          <div className="flex flex-col ">
            {update ? (
              <button
                onClick={() => {
                  mainSavedButton(true);
                  setUpdate(false);
                }}
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
                onClick={() => {
                  mainSavedButton(true);
                  setUpdate(false);
                }}
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
      <CustomizedModal isOpen={removeCertificate} onRequestClose={closeModal}>
        <div className="bg-white border w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <p className=" text-[16px] leading-[19.5px] md:text-[20px] font-[700] md:leading-[24px] text-center">
            Remove Certificate?
          </p>
          <p className=" leading-[19.5px] text-[13px] md:text-[16px] font-[400] md:leading-[24px] text-center">
            Removing your certificate will restrict you to listing only one
            property on your dashboard
          </p>
          <div className="flex flex-wrap md:flex-col gap-[16px]">
            <button
              className="bg-BlueHomz2 w-[137.5px]  text-white rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center"
              onClick={handleRemoved}
            >
              Proceed
            </button>
            <button
              className="border-BlueHomz w-[137.5px]  text-blue-600 rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center"
              onClick={() => {
                setRemoveCertificate(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomizedModal>
      <CustomizedModal
        isOpen={certificateRemoved}
        onRequestClose={closeSuccessModal}
      >
        <div className="bg-white border flex flex-col w-[333px] md:w-[464px]  p-[32px] rounded-[12px] gap-[18px]">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <div className="flex  flex-col">
              <p className="text-[14px] md:text-[20px] font-[700] leading-[17.64px] md:leading-[25.2px] text-center mb-1">
                Certificate Removed Successfully
              </p>
            </div>
          </div>

          <button
            className="bg-BlueHomz2 text-white rounded-[4px] border h-[48px] p-[12px]"
            onClick={() => {
              closeSuccessModal();
              setBusCertSuccess(false);
              setBusCertUploaded(false);
              setProgress(0);
            }}
          >
            Close
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default BusinessInfo;

const socialMediaLinks = [
  {
    id: 1,
    name: "WhatsApp",
    placeholder: "Type in social link",
    value: "",
  },
  {
    id: 2,
    name: "Facebook ",
    placeholder: "Type in social link",
    value: "",
  },
  {
    id: 3,
    name: "Twitter",
    placeholder: "Type in social link",
    value: "",
  },
  {
    id: 4,
    name: "Instagram ",
    placeholder: "Type in social link",
    value: "",
  },
];
