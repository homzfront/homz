"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import PropertyInfo from "./propertyInfo";
import RentalInfo from "./rentDetails";
import PropertyPhoto from "./PropertyPhotos";
import ContactInfo from "./contactInfo";
import CustomizedModal from "../../components/CustomizedModal";
import api from "@/utils/api";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import SuccessModal from "@/components/mainmenu/SuccessModal";

const PropertyForms = () => {
  const router = useRouter();
  const [propertyInfoActive, setPropertyInfoActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(true);
  const [activeFour, setActiveFour] = useState(false);
  const [loading, setLoading] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [rentalInfo, setRentalInfo] = useState([]);
  const [coverPhoto, setUploadedCoverPhoto] = useState(null);
  const [photos, setUploadedOtherPhotos] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loadingForm, setLoadingForm] = useState(false);
  const [saveToDraft, setSaveToDraft] = useState(false);
  const [savedToDraftSuccess, setSavedToDraftSuccess] = useState(false);

  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };
  const closeSaveToDraftModal = () => {
    setSavedToDraftSuccess(false)
    router.back()
    
  }
  const handleSaveToDraft=()=>{
    setSaveToDraft(false);
    setSavedToDraftSuccess(true)
  }
  const handleSaved = async () => {
    setLoadingForm(!loadingForm);
    setLoading(true);

    const formData = new FormData();

    propertyDetails.forEach((detail, index) => {
      const filteredDetail = {};
      Object.entries(detail).forEach(([key, value]) => {
        // Check if the value is not empty or null
        if (value !== "" && value !== null) {
          filteredDetail[key] = value;
        }
      });

      Object.entries(filteredDetail).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("coverPhoto", coverPhoto);

      photos.forEach((photo) => {
        formData.append("photos", photo);
      });
    });

    try {
      let response;
      response = await api.post(
        "/properties/create/listing-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        setSuccessModalIsOpen(true);
        setSaveModalIsOpen(false);
        setLoadingForm(false);
        setLoading(false);
      }
    } catch (error) {
      setLoadingForm(false);
      setLoading(false);
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        toast.error("Update failed", `${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        toast.error("Update failed", `${errorMessage}`);
      } else {
        toast.error("Update failed");
      }
    }
  };

  const handleSubmit = (data) => {
    setContactInfo(data);
    setPropertyDetails((preDetails) => [
      { ...propertyInfo, ...rentalInfo, ...data },
    ]);
    setSaveModalIsOpen(true);
  };

  const handlePropertyInfo = (data) => {
    setActiveTwo(true);
    setPropertyInfo(data);
    setPropertyInfoActive(false);
    setActiveThree(false);
    setActiveFour(false);
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
    setActiveFour(false);
  };

  const handlePropertyPhotos = () => {
    setActiveThree(false);
    setActiveFour(true);
  };

  const BackToRentalsInfo = () => {
    setActiveThree(false);
    setActiveTwo(true);
  };

  const BackToPropertyPhotos = () => {
    setActiveThree(true);
    setSaveModalIsOpen(false);
    setActiveFour(false);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className=" dashboard md:pt-4">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div onClick={goBack} className="flex items-center gap-2 cursor-pointer w-fit">
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
              "inline-block p-1 rounded-full bg-white shadow-md"
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
            )}
          </span>

          <hr className="h-[1px] w-[25%] px-2 md:px-0 md:w-[30%] bottom-0 bg-gray-600" />
          <span
            className={`${
              activeTwo && "inline-block p-1 rounded-full bg-white shadow-md"
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
            )}
          </span>

          <hr className="h-[1px] w-[25%] px-2 md:px-0  md:w-[30%] bottom-0 bg-gray-600" />
          <span
            className={`${
              activeThree && "inline-block p-1 rounded-full bg-white shadow-md"
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
            )}
          </span>
          <hr className="h-[1px] w-[25%] px-2 md:px-0  md:w-[30%] bottom-0 bg-gray-600" />
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
            />
            {!activeFour ? (
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
            )}
          </span>
        </div>
        <div className="hidden md:flex items-center justify-between text-[#4E4E4E] text-[14px]">
          <p>Property Information</p>
          <p>Payment Details</p>
          <p className="pr-3">Media</p>
          <p>Contact Information</p>
        </div>
        <div className="hidden items-center justify-between text-[#4E4E4E] text-[14px]">
          <p>Property Info</p>
          <p>Rental Info</p>
          <p className="pl-4">Photo(s)</p>
          <p>Contact Info</p>
        </div>
      </div>
      <div className=" my-7  rounded-[12px] ">
        <div className={`${propertyInfoActive ? "inline" : "hidden"}`}>
          <PropertyInfo
            handlePropertyInfo={handlePropertyInfo}
            setSaveToDraft={setSaveToDraft}
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
          <PropertyPhoto
            BackToRentalsInfo={BackToRentalsInfo}
            handlePagePropertyPhoto={handlePropertyPhotos}
            setUploadedCoverPhoto={setUploadedCoverPhoto}
            setUploadedOtherPhotos={setUploadedOtherPhotos}
            setSaveToDraft={setSaveToDraft}

          />
        </div>
        <div className={`${activeFour ? "inline" : "hidden"}`}>
          <ContactInfo
            BackToPropertyPhotos={BackToPropertyPhotos}
            handleSubmitData={handleSubmit}
            setSaveToDraft={setSaveToDraft}

          />
        </div>
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
            href={"/dashboard/list_Property/"}
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
