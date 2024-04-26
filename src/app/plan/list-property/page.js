"use client";
import useBodyScroll from "@/utils/useBodyScroll";
import Loading from "@/components/mainmenu/loading";
import api from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import CustomizedModal from "./CustomizedModal";
import { useState, useRef } from "react";
import { Progress } from "@material-tailwind/react";

const ListProperty = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [formError, setFormError] = useState(false);
  const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
    useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const BusinessCertificateRef = useRef(null);
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
  const [isVerified, setIsVerified] = useState(true);
  const [status, setStatus] = useState("accepted");
  const [isLoading, setIsLoading] = useState(false);

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
  const UploadBusCertificate = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when starting upload
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
      }, 40); 

      // Set loading to false after delay
      setTimeout(() => {
        setIsLoading(false);
        setBusCertSuccess(true);
      }, 1000);
    }, 800); // Simulate 2 seconds delay before starting upload
  };

  const cancelUpload = () => {
    setProgress(0);
    setBusCertUploaded(false);
    setBusCertSuccess(false);
    setBusinessCertificate(null);
    clearInterval(uploadIntervalID);
  };
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
      // console.log('viewing')
    }
  };

  const uploadBusinessCertificate = () => {
    setIsVerified(false);
    if (BusinessCertificateRef.current) {
      BusinessCertificateRef.current.click();
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // File size exceeds the limit
        setErrorMsg2("File size exceeds 5MB.");
        return;
      } else {
        setErrorMsg2("");
        setUploadedImage(file);
      }
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      fullName === "" ||
      phoneNumber === "" ||
      businessName === "" ||
      whatsappLink === ""
    ) {
      return setFormError("Fill in all fields");
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("businessName", businessName);
    formData.append("coverImage", uploadedImage);

    // Send the data to your API endpoint
    try {
      const response = await api.post(
        "/listingProperty/createAccount",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (
        response.data.statuscode === 200 ||
        response.data.statuscode === 201
      ) {
        setSubmitConfirmationVisible(true);
        console.log("form successfully filled ", response.data);
        setLoading(false);
      } else {
        setFormError(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setFormError(error.response?.data?.message);
      setFormError(error.response?.data?.error);
      setLoading(false);
    }
  };

  // useEffect to handle scrolling
  useBodyScroll([loading, isSubmitConfirmationVisible]);

  return (
    <div className="pt-[64px] miniPaddingTop">
      {loading && <Loading />}
      {isSubmitConfirmationVisible && (
        <div className="absolute top-0 p-8 sm:p-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-8 rounded-md">
            <Image
              className="m-auto my-2"
              src={"/Featured icon.png"}
              height={48}
              width={48}
              alt="img"
            />
            <p className="text-center text-[24px] font-[700] text-BlackHomz mb-4">
              Account Created
            </p>
            <p className="text-center text-[14px] sm:text-[16px] text-BlackHomz mb-8">
              Your account has been successfully created.
            </p>
            <Link href="/dashboard/property-owner/dashboard">
              <button className="w-full h-[48px] border rounded-md text-white bg-BlueHomz hover:bg-white hover:text-BlueHomz hover:border-BlueHomz">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-col md:gap-[35px] px-6 pt-8 md:pt-0 miniPadding">
        <div className="h-[29px] mt-0 sm:mt-0 flex sm:flex-row gap-4 sm:gap-0 flex-col-reverse sm:items-center p-5 justify-between">
          <p className="text-[23px] font-[700] text-BlackHomz">List Property</p>
          <Link href={"/select-plan"} className="flex gap-1">
            <Image
              src="/static/images/arrow-left.svg"
              height={16}
              alt="img"
              width={16}
            />
            <span className="text-[#559CFF] leading-[24px] font-[400]">
              Change Profile
            </span>
          </Link>
        </div>
        <div className="w-full ">
          <div className="flex flex-col md:flex-row justify-between md:gap-0 gap-6 sideBarHidden">
            <div className="md:w-[564px] fields miniMargin md:mx-5 md:bg-[#F6F6F6] md:rounded-[12px] p-[20px] headerAdmin md:border-0">
              <div className="flex justify-between flex-col gap-6 border-b border-GrayHomz2 pb-6">
                <div className="flex flex-col gap-2 ">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your business name"
                    value={businessName}
                    className="border md:px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col  gap-4">
                  <h1 className="font-[700] text-[14px] text-BlackHomz">
                    Business Logo
                  </h1>
                  <p className="font-[400] text-[14px] mt-[-12px] text-GrayHomz">
                    Upload your business logo
                  </p>
                  <div className="flex gap-2 ">
                    <div className="">
                      <div
                        className={
                          !uploadedImage
                            ? `h-[111px] bg-blue-100 justify-center items-center flex rounded-[8px] w-[111px]`
                            : `h-[111px] justify-center flex rounded-[12px] w-[111px] bg-none`
                        }
                      >
                        {uploadedImage ? (
                          <Image
                            src={URL.createObjectURL(uploadedImage)}
                            height={110}
                            width={110}
                            className="object-cover w-full h-full rounded-[8px]"
                            alt="img"
                          />
                        ) : (
                          <Image
                            src={"/uploadimage.png"}
                            height={40}
                            width={40}
                            className=""
                            alt="img"
                          />
                        )}
                      </div>
                      <p className="text-[11px] text-red-600 ">
                        {errorMsg2 ? errorMsg2 : ""}
                      </p>
                    </div>

                    <div>
                      <input
                        type="file"
                        className="hidden "
                        onChange={handleImageUpload}
                        ref={inputRef}
                        accept="image/png, image/jpg"
                      />
                      <Image
                        src={"/add-square.png"}
                        height={24}
                        width={24}
                        className="mb-2 cursor-pointer"
                        alt="img"
                        onClick={() => inputRef.current.click()}
                      />
                      {uploadedImage && (
                        <Image
                          src={"/trush-square.png"}
                          height={24}
                          width={24}
                          className="cursor-pointer "
                          alt="img"
                          onClick={handleImageRemove}
                        />
                      )}
                    </div>

                    <div className="flex flex-col ml-4">
                      <span className="text-[13px] font-[400] text-GrayHomz2">
                        Supported formats are .jpg and .png
                      </span>
                      <span className="text-[11px] font-[400] text-GrayHomz2">
                        Fill size must not exceed 5 mb
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-full w-[336px] flex flex-col gap-[14px] pt-5">
                <p className="md:text-[18px] font-[600] md:leading-[27px] leading-[20.16px] text-left">
                  Help us verify your business
                </p>
                <p className="text-[11px] text-[#4E4E4E] md:text-[14px] font-[400] text-left leading-[16.5px] md:leading-[21px]">
                  Upload your CAC certificate or membership certificate from any
                  accredited Real Estate body. (E.g AEAN or NIESV)
                </p>

                <div className="gap-[16px] py-[16px] px-[24px] md:py-[16px] md:px-[10px] rounded-[8px] bg-[#E6E6E6] flex md:h-[74px] h-[93px]">
                  <Image
                    src="/static/images/document-upload.svg"
                    alt="upload-cloud"
                    width={40}
                    height={40}
                  />
                  {isVerified ? (
                    <>
                      {status != "accepted" ? (
                        <div className="flex md:items-center flex-col md:flex-row justify-between w-full gap-[12px] md:gap-0">
                          <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#006AFF]">
                            [{"Document name "}]
                          </p>
                          <p
                            className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                            onClick={() => viewFile(businessCertificate)}
                          >
                            View
                          </p>
                        </div>
                      ) : (
                        <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-red-600 flex items-center">
                          <span className=" inline-block">
                            [{"businessCertificate.name"}] has been rejected,
                            kindly{" "}
                            <span
                              className="text-[#006AFF] cursor-pointer"
                              onClick={uploadBusinessCertificate}
                            >
                              re-upload
                            </span>{" "}
                            a valid certificate
                          </span>{" "}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      {!businessCertificateUpload ? (
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
                                <span className="">
                                  is currently under review
                                </span>
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
                            
                              <Progress
                                value={progress}
                                color="blue"
                                className="w-full h-[4px] text-BlueHomz2"
                               
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex md:items-center flex-col md:flex-row justify-between w-full gap-[12px] md:gap-0">
                          <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left  flex flex-col gap-[4px]">
                            <span className="text-[#006AFF] inline-block">
                              [
                              {businessCertificate?.name &&
                                businessCertificate.name}
                              ]
                            </span>
                            <span className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                              PDF (
                              {businessCertificate?.size &&
                                (
                                  businessCertificate.size /
                                  (1024 * 1024)
                                ).toFixed(2)}
                              MB)
                            </span>
                          </p>
                          <div className="flex flex-row gap-[10px] items-center">
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
                                //   onClick=
                              />
                              <span className="text-[13px]">Remove</span>
                            </p>
                          </div>
                          <div>
                            {!isLoading ? ( // Render loader if isLoading is true
                              <p
                                className="border border-BlueHomz2 py-[8px] px-[12px] hover:bg-BlueHomz hover:text-white rounded-[4px] cursor-pointer h-[37px] text-[#006AFF] md:leading-[21px] md:text-[14px] font-[500]"
                                onClick={UploadBusCertificate}
                              >
                                Upload
                              </p>
                            ) : (
                              <div className="border border-BlueHomz2 px-[12px] rounded-[4px] py-[8px] h-[37px] flex items-center justify-center ">
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
                      )}
                    </>
                  )}
                </div>

                <p className="text-[11px] text-red-600">
                  {errorMsg ? errorMsg : ""}
                </p>
              </div>
            </div>
            <form className=" md:w-[564px] miniMargin md:mx-5 flex flex-col gap-[28px]   bg-[#F6F6F6] rounded-[12px] p-[20px] fields">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] "
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </form>
            {formError && (
              <span className="px-10 mt-2 text-red-500 text-[14px] font-normal">
                {formError}
              </span>
            )}
          </div>

          <div className="md:px-5 miniPaddingLeft">
            <button
              onClick={handleSubmit}
              className="w-full my-14  rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz"
            >
              Create Account
            </button>
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

export default ListProperty;
