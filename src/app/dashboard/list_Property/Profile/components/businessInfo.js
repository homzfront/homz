"use client";
import React, { useState, useEffect, useRef, useTransition } from "react";
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
// import { updateBusinessInfoLister } from "@/api/listingServices";
import api from "@/utils/api";
import TickSuccess from "@/components/icons/tickSuccess";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import ThreeDotsLoader from "@/components/mainmenu/ThreeDotsLoader";
import { useRouter } from "next/navigation";

const BusinessInfo = ({ Business_Info, handleUpdate, mainSavedButton }) => {
  const [update, setUpdate] = useState(false);
  const [ImageSrc, setImageSrc] = useState("");
  const [businessLogo, setBusinessLogo] = useState(null);
  const BusinessPhotoRef = useRef(null);
  const BusinessCertificateRef = useRef(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [businessCertificateUpload, setBusCertUploaded] = useState(false);
  const [certificateCAC, setBusinessCertificate] = useState(null);
  const [progress, setProgress] = useState(0);
  const [busCertSuccess, setBusCertSuccess] = useState(false);
  const [uploadIntervalID, setUploadIntervalID] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const [certificateRemoved, setCertificateRemoved] = useState(false);
  const [removeCertificate, setRemoveCertificate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otherLinksData, setOtherLinksData] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [openDocUpload, setOpenDocUpload] = useState(false);
  const [whatsappFormatted, setWhatsAppFormatted] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [isFocus, setFocus] = useState(false);
  const phoneFormat = /^((\+234)+|0)[7-9]{1}[0-9]{9}$/;
  const [socialLinks, setSocialLinks] = useState({
    whatsAppLink: "",
    instagramLink: "",
    twitterLink: "",
    facebookLink: "",
    othersLinks: [],
  });
  const [socialMedia, setSocialMediaLinks] = useState(socialMediaLinks);
  const [lastId, setLastId] = useState(socialMediaLinks.length);
  const [loader, setLoader] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (isPending) {
      return setLoader(true);
    }
    setLoader(false);
  }, [isPending]);

  const addLink = () => {
    const newId = lastId + 1;
    setLastId(newId);
    const newLink = {
      id: newId,
      placeholder: "Type in link",
      value: "",
      name: "otherLinks",
    };

    setSocialMediaLinks([...socialMedia, newLink]);

    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      othersLinks: [...prevLinks.othersLinks, newLink.value],
    }));
  };
  // const removeLink = (id) => {
  //   const socialId = id - 4;

  //   setSocialMediaLinks(socialMedia.filter((media, index) => index !== id+4));

  //   setSocialLinks(prevLinks => ({
  //     ...prevLinks,
  //     othersLinks: prevLinks.othersLinks.filter((_, index) => index !== socialId)
  //   }));
  // };
  const removeLink = (id) => {
    // Update the socialMediaLinks state by removing the link with the matching id
    setSocialMediaLinks(socialMedia.filter((media) => media.id !== id));

    // If the removed link is in the othersLinks, update the othersLinks array
    if (
      socialMedia.find(
        (media) => media.id === id && media.name === "otherLinks"
      )
    ) {
      setSocialLinks((prevLinks) => ({
        ...prevLinks,
        othersLinks: prevLinks.othersLinks.filter(
          (_, index) => index !== id - 5
        ),
      }));
    }
  };

  const handleInputChange = (id, name, newValue) => {
    setSocialMediaLinks(
      socialMedia.map((media) =>
        media.id === id ? { ...media, value: newValue } : media
      )
    );

    if (name === "otherLinks") {
      setSocialLinks({
        ...socialLinks,
        othersLinks: socialMedia
          .filter((media) => media.name === name)
          .map((media) => media.value),
      });
    } else {
      setSocialLinks({
        ...socialLinks,
        [name]: newValue,
      });
    }
  };

  // Ensure Business_Info and its properties are available
  useEffect(() => {
    if (Business_Info?.businessInfo) {
      // Destructure the relevant properties from Business_Info for easy access
      const {
        businessName = "",
        businessEmail = "",
        businessDescription = "",
        businessAddress = "",
        businessPhoneNo = "",
        businessLogo = {},
      } = Business_Info.businessInfo;

      const { websiteUrl = "", socialMediaLinks = {} } = Business_Info;

      // Update business-related state variables
      setBusinessName(businessName);
      setBusinessEmail(businessEmail);
      setBusinessDescription(businessDescription);
      setBusinessWebsite(websiteUrl);
      setBusinessAddress(businessAddress);
      setPhoneNumber(businessPhoneNo);

      if (businessLogo?.url) {
        setFileUploaded(true);
        setImageSrc(businessLogo.url);
      }

      // Update social media links
      const updatedSocialMediaLinks = socialMedia.map((link) => {
        const { whatsappLink, facebookLink, twitterLink, instagramLink } =
          socialMediaLinks;
        const linkMap = {
          whatsAppLink: whatsappLink,
          facebookLink: facebookLink,
          twitterLink: twitterLink,
          instagramLink: instagramLink,
        };

        return {
          ...link,
          value: linkMap[link.name] || link.value,
        };
      });

      // Update the state with the new array of social media links
      setSocialMediaLinks(updatedSocialMediaLinks);

      // Handle additional links (otherLinks)
      const { otherLinks = [] } = socialMediaLinks;
      if (otherLinks.length > 0) {
        const otherLinksArray = otherLinks.map((link, index) => ({
          id: socialMedia.length + index + 1,
          placeholder: "Type in link",
          value: link,
          name: "otherLinks",
        }));

        setSocialMediaLinks((prevSocialMedia) => {
          const filteredPrevSocialMedia = prevSocialMedia.filter(
            (link) => link.name !== "otherLinks"
          );
          return [...filteredPrevSocialMedia, ...otherLinksArray];
        });

        setSocialLinks((prevLinks) => ({
          ...prevLinks,
          othersLinks: otherLinks,
        }));
      }
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

  
  // console.log(businessCertificateUpload)

  const UploadBusCertificate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("certificateCAC", certificateCAC);
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
          const totalSize = certificateCAC.size;
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

  const onSubmit = (user_id) => {
    if (!update) {
      startTransition(() => {
        router.push(`/marketer-business-page/${user_id}`);
      });
    } else {
      handleUpdateData();
    }
  };
  const handleUpdateData = () => {
    if (error2 || error) {
      return;
    }
    setUpdate(false);

    const data = {
      businessName,
      businessEmail,
      businessPhoneNo: phoneNumber,
      websiteUrl: businessWebsite,
      businessAddress,
      businessDescription,
      whatsappLink: socialMedia[0]?.value,
      instagramLink: socialMedia[3]?.value,
      facebookLink: socialMedia[1]?.value,
      twitterLink: socialMedia[2]?.value,
      businessLogo,
      certificateCAC,
      otherLinks: socialMedia
        .filter((media) => media.name === "otherLinks")
        .map((media) => media.value),
    };

    handleUpdate(data);
  };

  const triggerFileInputClick = () => {
    setOpenDocUpload(true);
  };

  const handleWhatsAppFormat = (e, social) => {
    setFocus(false);
    if (social.id === 1) {
      const whatsApp = e.target.value;
      if (whatsApp !== "") {
        const isValidFormat = phoneFormat.test(whatsApp);
        if (!isValidFormat) {
          setError2("Invalid Phone number");
          setFocus(true);
        } else {
          setError2("");
          const phoneNumber = whatsApp
            .replace(/[^0-9]/g, "")
            .replace(/^0+/, "");
          setWhatsAppFormatted(`https://wa.me/${phoneNumber}`);
        }
      }
    }
  };

  return (
    <div className="">
      <div className=" flex flex-col w-full">
        <div className="flex sm:flex-row md:gap-[22px] gap-8 mt-5 flex-col">
          <div className="flex  sm:flex-col flex-row gap-[15px]  sm:gap-[22px] sm:w-[359px] w-fit">
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
              className={`flex sm:flex-row flex-col sm:gap-[10px] gap-2 items-center rounded-[12px] justify-center sm:border  sm:shadow-sm sm:p-[16px]
              ${!update ? "pointer-events-none" : ""} 
            `}
            >
              <p className=" w-[40px] h-[40px] rounded-[28px] bg-[#F2F4F7]  hidden sm:flex items-center justify-center cursor-pointer">
                <Image
                  onClick={uploadProfilePhoto}
                  src="/static/images/upload-cloud.svg"
                  alt="upload-cloud"
                  width={20}
                  height={20}
                />
              </p>
              <div className="space-y-2">
                <p className="text-[#006AFF] sm:font-[600] leading-[17.64px] font-[400] cursor-pointer sm:text-[14px] text-[13px] flex flex-col gap-2">
                  <span className="cursor-pointer" onClick={uploadProfilePhoto}>
                    Click to upload business logo
                  </span>
                  <span className="text-[#A9A9A9] font-[400] text-[11px] leading-[16.5px] sm:hidden">
                    (JPG or PNG (max. 5mb))
                  </span>
                </p>
                <p className="hidden sm:block text-[14px] text-[#4E4E4E] font-[600] leading-[21px]">
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
                  className={`h-[45px] sm:w-[280.5px] md:p-[12px] rounded-[4px] pl-2 border border-[#A9A9A9] w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
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
                  className={`duoViewPoint h-[45px] sm:w-[280.5px]  md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] border-[#A9A9A9]  text-GrayHomz placeholder:text-[13px] ${
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
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                id="businessDescription"
                name="businessDescription"
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
                  if (phoneNumber !== "") {
                    if (!phoneFormat.test(phoneNumber)) {
                      setError("Invalid Phone number");
                      return;
                    }
                  } else {
                    setError("");
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
                value={businessAddress}
                disabled={!update}
                onChange={(e) => setBusinessAddress(e.target.value)}
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
                value={businessWebsite}
                disabled={!update}
                onChange={(e) => setBusinessWebsite(e.target.value)}
                placeholder="e.g www.Homz.ng"
                className={` h-[45px] sm:w-[100%]  md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] border-[#A9A9A9]  text-GrayHomz placeholder:text-[13px] ${
                  !update &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                }`}
              />
            </div>
          </div>
          <div className="bg-[#FCFCFC] rounded-[8px] flex flex-col gap-[16px] sm:py-[32px] sm:px-[24px]  sm:mt-0 mt-5">
            {" "}
            <div className="flex items-center justify-between  px-[12px] sm:px-0 32px">
              <p className="text-[#202020] font-[500] leading-[24px]">
                Social media links
              </p>
              <button
                className="sm:border h-[40px] text-[14px] font-[500] gap-1 border-[#006AFF] text-[#006AFF] flex items-center justify-center rounded-[4px] py-[8px] px-[12px]"
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
            <div className="grid grid-cols-2 gap-[16px] max-h-[225px] overflow-y-auto overflow-x-hidden sm:py-6 px-[12px] sm:px-0 ">
              {socialMedia.slice(0, 4).map((social) => (
                <div key={social.id} className="space-y-2 h-fit">
                  <label
                    htmlFor={social.label}
                    className="text-[13px] font-[500] text-GrayHomz"
                  >
                    {capitalizeFirstLetter(social.label)}
                  </label>
                  <br />

                  <input
                    placeholder={capitalizeFirstLetter(
                      social.label === "WhatsApp"
                        ? "Enter whatsApp No"
                        : social.placeholder
                    )}
                    className={`h-[45px] sm:w-[213px] md:p-[8px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%] ${
                      !update &&
                      "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                    }`}
                    type="text"
                    value={
                      social.id === 1
                        ? isFocus
                          ? social.value.startsWith("https://wa.me/")
                            ? social.value.replace("https://wa.me/", "0")
                            : social.value
                          : whatsappFormatted || social.value
                        : social.value
                    }
                    disabled={!update}
                    onChange={(e) => {
                      handleInputChange(social.id, social.name, e.target.value);
                      setError2("");
                    }}
                    onBlur={(e) => handleWhatsAppFormat(e, social)}
                    onFocus={(e) => {
                      if (social.id === 1) setFocus(true);
                    }}
                  />
                  {error2 && social.id === 1 && (
                    <div className="italic text-error text-[11px] font-[400]">
                      {error2}
                    </div>
                  )}
                </div>
              ))}

              {socialMedia.length > 4 &&
                socialMedia.slice(4).map((media, index) => (
                  <div key={index} className="relative space-y-2 h-fit">
                    <input
                      type="text"
                      className="h-[45px] sm:w-[217px] md:p-[8px] rounded-[4px] pl-2 pr-10 border placeholder:text-[13px] w-[100%]"
                      placeholder={media.placeholder}
                      value={media.value}
                      disabled={!update}
                      onChange={(e) =>
                        handleInputChange(media.id, media.name, e.target.value)
                      }
                    />
                    <Image
                      src="/static/images/cancelButton.svg"
                      alt="Cancel"
                      width={16}
                      height={16}
                      disabled={!update}
                      className={`absolute top-4 transform -translate-y-1/2 right-1 ${
                        update
                          ? "hover:opacity-100 cursor-pointer"
                          : "opacity-30"
                      }`}
                      onClick={() => update && removeLink(media.id)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
        <div className="sm:border-b pb-2 flex items-center justify-center gap-[16px] sm:flex-row flex-col mt-10 sm:mt-0">
          {/* <button
            className="bg-[#006AFF] text-white w-full   rounded-[4px] border  h-[45px] text-center font-[500]"
            onClick={() => onSubmit("promotePage")}
          >
            Promote my business page
          </button> */}
          {loader ? (
            <div className="rounded-[4px] border h-[45px] flex justify-center items-center border-[#006AFF] w-full">
              <ThreeDotsLoader color="#006AFF" />
            </div>
          ) : (
            <button
              className="border-[#006AFF] w-full  text-[#006AFF] font-[500] rounded-[4px] border h-[45px] text-center text-[14px] hover:bg-[#006AFF] hover:text-white"
              onClick={() => onSubmit(Business_Info.user._id)}
            >
              View my business page
            </button>
          )}
        </div>
        <div className="md:w-full w-[100%] flex flex-col sm:gap-[14px] gap-[10px] pt-2 md:pt-5">
          <p className="text-[18px] font-[600] leading-[27px] text-left">
            Help us verify your business
          </p>
          <p className="text-[13px] sm:text-[14px] text-[#4E4E4E] font-[400] leading-[21px] text-left">
            Kindly upload any of the following documents for verification
            (format must be PDF)
          </p>
          <p className="text-[11px] text-[#4E4E4E] md:text-[14px] font-[400] text-left leading-[16.5px] md:leading-[21px]">
            1. Clear copy of your CAC <br /> 2. Clear copy of your membership
            certificate from any valid real estate body. (NIESV or AEAN)
            <br /> 3. Clear copy of a valid means of identification.(Voters
            card, National Identity card, international Passport)
          </p>

          <div className="relative gap-[16px] py-[16px] px-[14px] md:py-[16px] md:px-[24px] rounded-[8px] bg-[#E6E6E6] flex md:h-[74px] w-full">
            <Image
              src="/static/images/document-upload.svg"
              alt="upload-cloud"
              width={40}
              height={40}
            />
            <>
              {Business_Info?.businessInfo?.isVerified === "verified" ? (
                <div className="flex flex-col gap-[4px] w-full">
                  <div className="w-full flex justify-between items-center sm:mt-[10px]">
                    <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-left text-BlueHomz">
                      [{Business_Info?.businessInfo?.certificateName}]
                    </p>
                    <p
                      className="text-[#006AFF] text-[13px] font-[500] leading-[19.5px] cursor-pointer pb-5 sm:pb-0"
                      onClick={() =>
                        viewFileII(
                          Business_Info?.businessInfo?.certificateCAC?.url
                        )
                      }
                    >
                      View
                    </p>
                  </div>
                  <div className="absolute bottom-[-54px] md:bottom-[-30px] left-0 text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E] flex flex-row items-center ">
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
                    className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer pb-5 sm:pb-0"
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
                      [{certificateCAC?.name && certificateCAC.name}]
                    </span>
                    <span className="text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E]">
                      PDF (
                      {certificateCAC?.size &&
                        (certificateCAC.size / (1024 * 1024)).toFixed(2)}{" "}
                      MB)
                    </span>
                  </p>
                  <div
                    className={`flex flex-row gap-[20px] items-center ${
                      isLoading ? "pointer-events-none" : ""
                    }`}
                  >
                    <p
                      className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer pb-5 sm:pb-0"
                      onClick={() => viewFile(certificateCAC)}
                    >
                      View
                    </p>
                    <p
                      className="text-[#D92D20] text-[13px] font-[400] leading-[19.5px] cursor-pointer flex items-center gap-1 pb-5 sm:pb-0"
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
                          <ThreeDotsLoader color="#006AFF" />
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
                          [{certificateCAC?.name && certificateCAC.name}]
                        </span>{" "}
                        <span>is currently under review</span>
                      </p>
                      <p
                        className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] cursor-pointer"
                        onClick={() => viewFile(certificateCAC)}
                      >
                        View
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[8px] w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] md:text-[14px] font-[500] leading-[19.5px] md:leading-[21px] text-[#006AFF]">
                          <span className="text-[#006AFF] inline-block ">
                            [{certificateCAC?.name && certificateCAC.name}]
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

        <div className="hidden md:flex md:justify-end justify-center mt-18 md:mt-12 ">
          <div className="flex flex-col ">
            {update ? (
              <button
                onClick={handleUpdateData}
                className="flex  border justify-center  md:w-[120px] w-[100%]  items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                type="submit"
              >
                Save Update
              </button>
            ) : (
              <p
                className="flex cursor-pointer border justify-center   w-[100%]  items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                onClick={() => setUpdate(true)}
              >
                Click to update
              </p>
            )}
          </div>
        </div>

        <div className="md:hidden flex w-full justify-center mt-16 md:mt-12 ">
          <div className="flex flex-col w-full">
            {update ? (
              <button
                onClick={handleUpdateData}
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
    label: "WhatsApp",
    name: "whatsAppLink",
    placeholder: "Type in link",
    value: "",
  },
  {
    id: 2,
    label: "Facebook ",
    name: "facebookLink",
    placeholder: "Type in link",
    value: "",
  },
  {
    id: 3,
    label: "X (Twitter)",
    name: "twitterLink",
    placeholder: "Type in link",
    value: "",
  },
  {
    id: 4,
    label: "Instagram ",
    name: "instagramLink",
    placeholder: "Type in link",
    value: "",
  },
];
