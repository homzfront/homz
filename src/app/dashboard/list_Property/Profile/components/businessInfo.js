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


const BusinessInfo = ({ Business_Info, handleUpdate }) => {
  const [update, setUpdate] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [status, setStatus] = useState("accepted");
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

  useEffect(() => {
    // Check if data and required properties are available
    if (Business_Info?.businessInfo) {
      setBusinessName(Business_Info?.businessInfo?.businessName || "");
      setBusinessEmail(Business_Info?.businessInfo?.businessEmail || "");
      if (Business_Info?.businessInfo?.businessLogo?.url) {
        setFileUploaded(true)
        setImageSrc(Business_Info?.businessInfo?.businessLogo?.url || "")
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

  const UploadBusCertificate = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when starting upload
    const formData = new FormData();
    formData.append("certificateCAC", businessCertificate);
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const response = await api.patch(
        "/listingProperty/me/update/business-information",
        formData,
        { headers }
      );
      if (response?.data?.success) {
        setTimeout(() => {
          const totalSize = businessCertificate.size;
          let uploadedSize = 0;
          const uploadInterval = setInterval(() => {
            uploadedSize += 10000;
            const currentProgress = (uploadedSize / totalSize) * 100;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
              clearInterval(uploadInterval);
            }
          }, 40); // Update progress every 30 milliseconds

          // Set loading to false after delay
          setTimeout(() => {
            setIsLoading(false);
            setBusCertSuccess(true);
          }, 1000);
        }, 800); // Simulate 2 seconds delay before starting upload
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
    setIsVerified(false);
    if (BusinessCertificateRef.current) {
      BusinessCertificateRef.current.click();
    }
  };

  const onSubmit = () => {
    const data = {
      ...(businessName && { businessName }),
      ...(businessEmail && { businessEmail }),
      ...(businessLogo && { businessLogo }),
    };
    handleUpdate(data);
  };

  const triggerFileInputClick = () => {
    setBusCertUploaded(false)
  };


  return (
    <div className="">
      <div
        className=" flex flex-col md:w-full md:px-4 "
      >
        <div className="flex  md:gap-[28px] gap-8 mt-5 flex-col">
          <div className="flex items-center flex-row gap-[28px] ">
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
                className={`md:w-[181px] md:h-[181px] h-[65px] w-[65px] rounded-[100%] flex justify-center items-center mx-auto ${!fileUploaded && "bg-[#D5D5D5]"
                  }`}
              >
                <Image
                  src={
                    fileUploaded ? ImageSrc : "/static/images/upload_image.svg"
                  }
                  alt="Business Photo"
                  className={`${fileUploaded
                    ? "md:w-[181px] md:h-[181px] h-[65px] w-[65px] rounded-[100%] "
                    : "md:w-[39.71px] md:h-[39.71px] h-[14.26px] w-[14.26px] photos"
                    }`}
                  width={181}
                  height={181}
                />
              </p>
              {/* {errors.BusinessPhoto && (
                <p className="errorMsg text-center">
                  {errors.BusinessPhoto?.message}
                </p>
              )} */}
            </div>
            <div className={`flex flex-col md:gap-[12px] gap-2 md:items-center md:justify-center justify-start md:shadow-sm md:p-2
              ${!update ? "pointer-events-none" : ""} 
            `}>
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
              <p className="text-[11px] text-red-600">
                {errorMsg2 ? errorMsg2 : ""}
              </p>
            </div>
          </div>
          <div className="profiles flex  flex-col md:flex-row gap-[16px] md:gap-[28px] headerAdmin pb-8 sideBarHidden">
            <div>
              <label htmlFor="Business Name">
                Business Name
                <span className="text-red-500 text-[16px]">*</span>
              </label>
              <br />
              <input
                placeholder="Business Name"
                disabled={!update}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className={`h-[43px] md:h-[45px] md:w-[450px] md:p-[12px] rounded-[4px] pl-2 border w-[335px] duoViewPoint ${!update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
              {/* {errors.BusinessName && (
                <p className="errorMsg">{errors.BusinessName?.message}</p>
              )} */}
            </div>

            <div>
              <label htmlFor="businessEmail">
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
                className={`duoViewPoint h-[43px] md:h-[45px] md:w-[450px] md:p-[12px] rounded-[4px] pl-2 border w-[335px] ${!update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
              {/* {errors.businessEmail && (
                <p className="errorMsg">{errors.businessEmail.message}</p>
              )} */}
            </div>
          </div>
        </div>
        <div className="md:w-full w-[336px] flex flex-col gap-[14px] pt-5">
          <p className="md:text-[18px] font-[600] md:leading-[27px] leading-[20.16px] text-left">
            Kindly upload any of the following documents for verification (format must be PDF)
          </p>
          <p className="text-[11px] text-[#4E4E4E] md:text-[14px] font-[400] text-left leading-[16.5px] md:leading-[21px]">
            1. Clear copy of your CAC <br />  2. Clear copy of your membership certificate from any valid real estate body. (AEAEN or NIESV)
            <br />  3. Clear copy of a valid means of identification.(Voters card, National Identity card, international Passport)
          </p>

          <div className="relative gap-[16px] py-[16px] px-[24px] md:py-[16px] md:px-[24px] rounded-[8px] bg-[#E6E6E6] flex md:h-[74px] w-full">
            <Image
              src="/static/images/document-upload.svg"
              alt="upload-cloud"
              width={40}
              height={40}
            />
            <>
              {
                Business_Info?.businessInfo?.isVerified === 'rejected' ?
                  <div className="flex justify-center items-center">
                    <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left text-error">
                      [{Business_Info?.businessInfo?.certificateName}] <span> is not a valid certificate, kindly</span> <span className="text-BlueHomz cursor-pointer" onClick={triggerFileInputClick}> re-upload</span>
                      <span> a valid certificate.</span>
                    </p>
                  </div> :
                  Business_Info?.businessInfo?.isVerified === 'verified' ?
                    <div className="flex flex-col gap-[4px] w-full">
                      <div className="w-full flex justify-between items-center mt-[10px]">
                        <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left text-BlueHomz">
                          [{Business_Info?.businessInfo?.certificateName}]
                        </p>
                        <p
                          className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                          onClick={() => viewFileII(Business_Info?.businessInfo?.certificateCAC?.url)}
                        >
                          View
                        </p>
                      </div>
                      <div className=" absolute bottom-[-30px] left-0 text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E] flex flex-row items-center">
                        <TickSuccess /> <div>
                          Your business certificate has successfully been verified. You can now <> </>
                          <Link href={"/dashboard/list_Property/addProperty"}
                            className="text-BlueHomz">list more properties</Link> on your dashboard
                        </div>
                      </div>
                    </div>
                    : Business_Info?.businessInfo?.certificateName && (Business_Info?.businessInfo?.isVerified === 'pending') ?
                      <div className="flex md:items-center flex-col md:flex-row justify-between w-full gap-[12px] md:gap-0">
                        <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#DC6803]">
                          <span className=" inline-block">
                            [{Business_Info?.businessInfo?.certificateName}]
                          </span>{" "}
                          <span className="">is currently under review</span>
                        </p>
                        <p
                          className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                          onClick={() => viewFileII(Business_Info?.businessInfo?.certificateCAC?.url)}
                        >
                          View
                        </p>
                      </div>
                      :
                      !businessCertificateUpload ? (
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
                            </span>{" "}
                            <span className="text-[#4E4E4E] hidden md:inline-block">
                              or drag and drop
                            </span>
                          </p>
                          <p className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                            PDF (max. 5mb)
                          </p>
                        </div>
                      ) : busCertSuccess ? (
                        <>
                          {progress >= 100 ? (
                            <div className="flex md:items-center flex-col md:flex-row justify-between w-full gap-[12px] md:gap-0">
                              <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#DC6803]">
                                <span className=" inline-block">
                                  [
                                  {businessCertificate?.name &&
                                    businessCertificate.name}
                                  ]
                                </span>{" "}
                                <span className="">is currently under review</span>
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
                                <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left ">
                                  <span className="text-[#4E4E4E] inline-block">
                                    Uploading
                                  </span>{" "}
                                  <span className="text-[#006AFF] inline-block ">
                                    [
                                    {businessCertificate?.name &&
                                      businessCertificate.name}
                                    ]
                                  </span>
                                </p>
                                <Image
                                  src="/static/images/close-square.svg"
                                  alt="upload-cloud"
                                  width={24}
                                  height={24}
                                  className="cursor-pointer"
                                  onClick={cancelUpload}
                                />
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
                      ) : (
                        <div className="flex md:items-center flex-col md:flex-row md:justify-between w-full gap-[px] md:gap-0">
                          <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left  flex flex-col gap-[4px]">
                            <span className="text-[#006AFF] inline-block">
                              [{businessCertificate?.name && businessCertificate.name}]
                            </span>
                            <span className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                              PDF (
                              {businessCertificate?.size &&
                                (businessCertificate.size / (1024 * 1024)).toFixed(2)}
                              MB)
                            </span>
                          </p>
                          <div className="flex flex-row gap-[20px] items-center">
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
                      )}
            </>
          </div>

          <p className="text-[11px] text-red-600">{errorMsg ? errorMsg : ""}</p>
        </div>

        <div className="flex  md:justify-end justify-center mt-16 md:mt-12 ">
          {/* <button
            className="hidden md:flex  border justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
            type="submit"
          >
            Update
          </button> */}
          <div className="flex flex-col ">
            {update ? (
              <button
                className="flex  border justify-center duoViewPoint  items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                onClick={onSubmit}
              >
                Save Update
              </button>
            ) : (
              <p
                className="flex cursor-pointer border justify-center duoViewPoint items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
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
