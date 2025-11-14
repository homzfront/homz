"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import PropertyInfo from "./propertyInfo";
import RentalInfo from "./rentDetails";
import PropertyPhoto from "./PropertyPhotos";
import ContactInfo from "./contactInfo";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import api from "@/utils/api";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import LoadingProlonged from "@/components/general/loadingProlonged";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import ContactInfoMedia from "./ContactInfoMedia";

const PropertyForms = () => {
  const router = useRouter();
  const [propertyInfoActive, setPropertyInfoActive] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [rentalInfo, setRentalInfo] = useState([]);
  const [coverPhoto, setUploadedCoverPhoto] = useState(null);
  const [photos, setUploadedOtherPhotos] = useState([]);
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [saveToDraft, setSaveToDraft] = useState(false);
  const [savedToDraftSuccess, setSavedToDraftSuccess] = useState(false);
  const [videoLinks, setVideoLinksData] = useState();
  const [amenities, setAmenities] = useState([]);

  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };
  const closeSaveToDraftModal = () => {
    setSavedToDraftSuccess(false);
    router.back();
  };

  const handleSaveToDraft = () => {
    setSaveToDraft(false);
    setSavedToDraftSuccess(true);
  };
  const handleSaved = async () => {
    setLoading(true);

    try {
      // Filter out empty values from propertyDetails
      const filteredDetail = propertyDetails.reduce((acc, detail) => {
        Object.entries(detail).forEach(([key, value]) => {
          if (value !== "" && value !== null) {
            acc[key] = value;
          }
        });
        return acc;
      }, {});

      const {
        title,
        installmentPayment,
        agencyFee,
        amenities,
        state,
        area,
        street,
        email,
        phoneNumber,
        whatsapp,
        description,
        duration,
        furnishStatus,
        frequency,
        initialPayment,
        listingType,
        maintenanceFee,
        newly,
        squareMeter,
        numberOfBathrooms,
        numberOfRooms,
        numberOfToilets,
        paymentType,
        price,
        propertyType,
        serviced,
        subType,
        totalFee,
        units,
        youtubeUrl,
        instagramUrl,
      } = filteredDetail;

      const formData = new FormData();

      // Append cover photo and other images
      formData.append("coverPhoto", coverPhoto);
      photos.forEach((photo) => formData.append("photos", photo));

      // Payload fields to append
      const payload = {
        title,
        squareMeter,
        propertyType,
        listingType,
        subType,
        units,
        price,
        paymentType,
        state,
        area,
        street,
        numberOfRooms,
        numberOfBathrooms,
        numberOfToilets,
        description,
        maintenanceFee,
        totalFee,
        agencyFee,
        email,
        phoneNumber,
        whatsapp,
        frequency,
        youtubeUrl,
        instagramUrl,
        duration,
        newlyBuilt: newly,
        serviced,
        initialPayment,
        installmentPayment,
      };

      // Append each field to formData
      Object.entries(payload).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // Append amenities
      amenities?.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });

      // Send API request
      const response = await api.post(
        "/properties/create/listing-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success
      if (response.data.success) {
        setSuccessModalIsOpen(true);
        setSaveModalIsOpen(false);
      }
    } catch (error) {
      // Error handling
      const errorMessage =
        error?.response?.data?.error?.errors?.[0] ||
        error?.response?.data?.message ||
        "An error occurred";

      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (contactInfo) => {
    
    setPropertyDetails((preDetails) => [
      {
        // ...preDetails,
        ...propertyInfo,
        ...rentalInfo,
        ...contactInfo,
        ...videoLinks,
        amenities,
      },
    ]);
    setSaveModalIsOpen(true);
  };

  const handlePropertyInfo = (data) => {
    setActiveTwo(true);
    setPropertyInfo(data);
    setPropertyInfoActive(false);
    setActiveThree(false);
    // setActiveFour(false);
  };

  const handlePropertyInfoActive = () => {
    setActiveTwo(false);
    setPropertyInfoActive(true);
    setActiveThree(false);
  };

  const handleRentalInfo = (data) => {
    setActiveThree(true);
    setActiveTwo(false);
    setRentalInfo(data);
    setPropertyInfoActive(false);
    // setActiveFour(false);
  };

  const BackToRentalsInfo = () => {
    setActiveThree(false);
    setActiveTwo(true);
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    let timer;

    if (loading) {
      // Set a timer to show the long loading message after 3 seconds
      timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 20000); // 20 seconds
    } else {
      // Reset when loading is false
      setShowLongLoadingMessage(false);
    }

    // Cleanup the timer on component unmount or when loading changes
    return () => clearTimeout(timer);
  }, [loading]);

  const closeModalDelay = () => {
    setShowLongLoadingMessage(false);
  };

  return (
    <div className=" dashboard md:pt-4">
      <div
        onClick={goBack}
        className="flex items-center gap-2 cursor-pointer w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-w_idth="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-gray-400 hidden md:block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span className=" text-gray-400 text-[14px] hidden md:block">
          Go Back
        </span>
        <span className="mt-[-0px] md:hidden bg-[#EEF5FF] w-[28px] h-[28px] p-[4px] rounded-[8px]">
          <Image
            src="/static/images/blue-arrow-left.svg"
            width={20}
            height={20}
            alt=""
          />
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-8 w-full">
        <div className="flex items-center md:mx-14">
          <span
            className={`${
              propertyInfoActive &&
              "flex items-center sm:py-[4px] sm:px-1 p-1 rounded-[24px] bg-white shadow-md"
            }`}
          >
            <Image
              src="/static/images/indicator.svg"
              width={18}
              height={16}
              alt=""
              className="hidden md:block rounded-full h-[12px] w-[12px] md:w-[18px] md:h-[10px]"
            />
            {!propertyInfoActive ? (
              <Image
                src="/static/images/roundBlue-circle.svg"
                width={18}
                height={16}
                alt=""
                className="md:hidden rounded-full h-[20px] w-[20px]"
              />
            ) : (
              <Image
                src="/static/images/indicator.svg"
                width={18}
                height={16}
                alt=""
                className="md:hidden rounded-full h-[10px] w-[24px]"
              />
            )}
          </span>

          <hr className="h-[1px]  px-2 md:px-0 w-full  md:w-[45%]  bottom-0 bg-gray-600" />
          <span
            className={`${
              activeTwo &&
              "flex items-center sm:p-[4px] p-1 rounded-[24px] bg-white shadow-md"
            }`}
          >
            <Image
              src="/static/images/indicator.svg"
              width={18}
              height={16}
              alt=""
              className="hidden md:block rounded-full h-[12px] w-[12px] md:w-[18px] md:h-[10px]"
            />
            {!activeTwo ? (
              <Image
                src="/static/images/roundBlue-circle.svg"
                width={18}
                height={16}
                alt=""
                className="md:hidden rounded-full h-[20px] w-[20px]"
              />
            ) : (
              <Image
                src="/static/images/indicator.svg"
                width={18}
                height={16}
                alt=""
                className="md:hidden rounded-full h-[10px] w-[24px]"
              />
            )}
          </span>

          <hr className="h-[1px]  px-2 md:px-0 w-full md:w-[45%] bottom-0 bg-gray-600" />
          <span
            className={`${
              activeThree &&
              "flex items-center  p-1 sm:p-[4px] rounded-[24px] bg-white shadow-md"
            }`}
          >
            <Image
              src="/static/images/indicator.svg"
              width={18}
              height={16}
              alt=""
              className="hidden md:block rounded-full h-[12px] w-[12px] md:w-[18px] md:h-[10px]"
            />
            {!activeThree ? (
              <Image
                src="/static/images/roundBlue-circle.svg"
                width={18}
                height={16}
                alt=""
                className="md:hidden rounded-full h-[20px] w-[20px]"
              />
            ) : (
              <Image
                src="/static/images/indicator.svg"
                width={18}
                height={16}
                alt=""
                className="md:hidden rounded-full h-[10px] w-[24px]"
              />
            )}
          </span>
          {/* <hr className="h-[1px] w-[25%] px-2 md:px-0  md:w-[30%] bottom-0 bg-gray-600" />
          <span
            className={`${
              activeFour && "inline-block p-1 rounded-full bg-white shadow-md"
            }`}
          >
            <Image
              src="/static/images/indicator.svg"
              width={18}
              height={16}
              alt=""
              className="hidden md:block rounded-full h-[12px] w-[12px] md:w-[18px] md:h-[10px]"
            /> */}
          {/* {!activeFour ? (
              <Image
                src="/static/images/roundBlue-circle.svg"
                width={18}
                height={16}
                alt=""
                className="md:hidden rounded-full h-[12px] w-[12px] md:w-[18px] md:h-[10px]"
              />
            ) : (
              <Image
                src="/static/images/indicator.svg"
                width={18}
                height={16}
                alt=""
                className="md:hidden rounded-full h-[12px] w-[12px] md:w-[18px] md:h-[10px]"
              />
            )} */}
          {/* </span> */}
        </div>
        <div className="hidden md:flex items-center justify-between text-[#4E4E4E] text-[14px]">
          <p>Property Information</p>
          <p>Payment Details</p>
          {/* <p className="pl-10">
            Media <span className="text-gray-400">(Optional)</span>
          </p> */}
          <p>Contact Information & Media</p>
        </div>
      </div>
      <div className=" my-7  rounded-[12px] ">
        <div className={`${propertyInfoActive ? "inline" : "hidden"}`}>
          <PropertyInfo
            handlePropertyInfo={handlePropertyInfo}
            setSaveToDraft={setSaveToDraft}
            setAmenities={setAmenities}
            cancel={goBack}
          />
        </div>
        <div className={`${activeTwo ? "inline" : "hidden"}`}>
          <RentalInfo
            handleRentalInfo={handleRentalInfo}
            previousBtn={handlePropertyInfoActive}
            setSaveToDraft={setSaveToDraft}
          />
        </div>

        <div className={`${activeThree ? "inline" : "hidden"}`}>
          <ContactInfoMedia
            BackToRentalsInfo={BackToRentalsInfo}
            setUploadedCoverPhoto={setUploadedCoverPhoto}
            setUploadedOtherPhotos={setUploadedOtherPhotos}
            setSaveToDraft={setSaveToDraft}
            setVideoLinksData={setVideoLinksData}
            handleSubmitData={handleSubmit}
          />
          {/* <PropertyPhoto
            BackToRentalsInfo={BackToRentalsInfo}
            handlePagePropertyPhoto={handlePropertyPhotos}
            setUploadedCoverPhoto={setUploadedCoverPhoto}
            setUploadedOtherPhotos={setUploadedOtherPhotos}
            setSaveToDraft={setSaveToDraft}
            setVideoLinksData={setVideoLinksData}
          /> */}
        </div>
        {/* <div className={`${activeFour ? "inline" : "hidden"}`}>
          <ContactInfo
            BackToPropertyPhotos={BackToPropertyPhotos}
            handleSubmitData={handleSubmit}
            setSaveToDraft={setSaveToDraft}
          />
        </div> */}
      </div>
      <CustomizedModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
        <div
          className={`bg-white border w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center
        ${loading ? "pointer-events-none" : ""}
        `}
        >
          <p className=" text-[14px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
            Proceed to list property?
          </p>

          <button
            className={`bg-BlueHomz2 w-[301px]  text-white rounded-[4px] border  md:w-[400px] h-[48px] 
            ${loading ? "pointer-events-none w-full flex justify-center" : ""} 
            `}
            onClick={handleSaved}
          >
            {loading ? <LoadingFormII /> : "Yes"}
          </button>
          <button
            className="border-BlueHomz w-[301px]  text-blue-600 rounded-[4px] border  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              setSaveModalIsOpen(false);
            }}
          >
            No, go back
          </button>
        </div>
      </CustomizedModal>
      <CustomizedModal isOpen={showLongLoadingMessage}>
        <LoadingProlonged closeModal={closeModalDelay} />
      </CustomizedModal>
      <CustomizedModal
        isOpen={successModalIsOpen}
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
              <p className="text-[14px] md:text-[20px] font-[700] leading-[17.64px] md:leading-[25.2px] text-center">
                Property Added Successfully
              </p>
              <p className="text-[14px] md:text-[16px] font-[400] leading-[17.64px] md:leading-[24px] text-center text-[#4E4E4E]">
                Click on the button to view property
              </p>
            </div>
          </div>

          <Link
            href={"/dashboard/list_Property/properties"}
            className="bg-BlueHomz2 text-white rounded-[4px] border h-[48px] p-[12px] flex justify-center items-center"
            onClick={() => {
              closeSuccessModal();
            }}
          >
            View Property
          </Link>
        </div>
      </CustomizedModal>
      <ConfirmationModal
        isOpen={saveToDraft}
        title="Save property to draft?"
        confirmatoryText={`You can always go to your draft to complete listing and publish your property at a later time. 
            `}
        handleEvent={handleSaveToDraft}
        cancel={setSaveToDraft}
        optionText="Proceed"
        optionText2="Cancel"
      />
      <SuccessModal
        isOpen={savedToDraftSuccess}
        title="Property Saved to Draft"
        handleEvent={closeSaveToDraftModal}
        successText={`Click on the button below to view your saved property`}
      />
    </div>
  );
};

export default PropertyForms;
