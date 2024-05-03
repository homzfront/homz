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

const PropertyForms = () => {
  const [propertyInfoActive, setPropertyInfoActive] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);
  const [loading, setLoading] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [rentalInfo, setRentalInfo] = useState([]);
  const [coverPhoto, setUploadedCoverPhoto] = useState(null);
  const [photos, setUploadedOtherPhotos] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState([]);

  // console.log(contactInfo);

  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };
  const handleSaved = async () => {
    setSuccessModalIsOpen(true);
    setSaveModalIsOpen(false);

    // const formData = new FormData();

    // Append body data (propertyDetails) to the FormData object
    // propertyDetails.forEach((detail, index) => {
    //   // console.log(detail)
    //   formData.append(`body`, JSON.stringify(detail));
    // });
    // formData.append("coverPhoto", coverPhoto);
    // photos.forEach((photo, index) => {
    //   formData.append(`photos`, photo);
    // });

    // formData.append("description",propertyDetails.description);


    // Creating a new FormData object
    const formData = new FormData();

    propertyDetails.forEach((detail, index) => {
      const filteredDetail = {};
      Object.entries(detail).forEach(([key, value]) => {
        // Check if the value is not empty or null
        if (value !== '' && value !== null) {
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
      const response = await api.post(
        "/properties/create/listing-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response)
    } catch (error) {
      // console.log(error);
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
  const handlePageChange = () => {
    setActiveTwo(true);
    setPropertyInfoActive(false);
    setActiveThree(false);
    setActiveFour(false);
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
  const handleContactInfo = () => {
    setActiveThree(False);
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
  const handlePageChangeLast = () => {
    setActiveThree(false);
    setActiveTwo(false);
    setActiveFour(true);
    setPropertyInfoActive(false);
  };
  return (
    <div className=" dashboard pt-10 sm:pt-4">
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
      <Link href="/dashboard/list_Property" className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-w_idth="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-gray-400 hidden sm:block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span className=" text-gray-400 text-[14px] hidden sm:block">
          Go Back
        </span>
        <span className="sm:hidden bg-[#EEF5FF] w-[28px] h-[28px] p-[4px] rounded-[8px]">
          <Image
            src="/static/images/blue-arrow-left.svg"
            width={20}
            height={20}
            alt=""
          />
        </span>
      </Link>
      <div className="flex flex-col gap-2 mt-8 w-full">
        <div className="flex items-center sm:mx-14">
          <span
            className={`${propertyInfoActive &&
              "inline-block p-1 rounded-full bg-white shadow-md"
              }`}
          >
            <Image
              src="/static/images/indicator.svg"
              width={18}
              height={16}
              alt=""
              className="hidden sm:block rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
            />
            {!propertyInfoActive ? (
              <Image
                src="/static/images/roundBlue-circle.svg"
                width={18}
                height={16}
                alt=""
                className="sm:hidden rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
              />
            ) : (
              <Image
                src="/static/images/indicator.svg"
                width={18}
                height={16}
                alt=""
                className="sm:hidden rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
              />
            )}
          </span>

          <hr className="h-[1px] w-[25%] px-2 sm:px-0 sm:w-[30%] bottom-0 bg-gray-600" />
          <span
            className={`${activeTwo && "inline-block p-1 rounded-full bg-white shadow-md"
              }`}
          >
            <Image
              src="/static/images/indicator.svg"
              width={18}
              height={16}
              alt=""
              className="hidden sm:block rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
            />
            {!activeTwo ? (
              <Image
                src="/static/images/roundBlue-circle.svg"
                width={18}
                height={16}
                alt=""
                className="sm:hidden rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
              />
            ) : (
              <Image
                src="/static/images/indicator.svg"
                width={18}
                height={16}
                alt=""
                className="sm:hidden rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
              />
            )}
          </span>

          <hr className="h-[1px] w-[25%] px-2 sm:px-0  sm:w-[30%] bottom-0 bg-gray-600" />
          <span
            className={`${activeThree && "inline-block p-1 rounded-full bg-white shadow-md"
              }`}
          >
            <Image
              src="/static/images/indicator.svg"
              width={18}
              height={16}
              alt=""
              className="hidden sm:block rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
            />
            {!activeThree ? (
              <Image
                src="/static/images/roundBlue-circle.svg"
                width={18}
                height={16}
                alt=""
                className="sm:hidden rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
              />
            ) : (
              <Image
                src="/static/images/indicator.svg"
                width={18}
                height={16}
                alt=""
                className="sm:hidden rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
              />
            )}
          </span>
          <hr className="h-[1px] w-[25%] px-2 sm:px-0  sm:w-[30%] bottom-0 bg-gray-600" />
          <span
            className={`${activeFour && "inline-block p-1 rounded-full bg-white shadow-md"
              }`}
          >
            <Image
              src="/static/images/indicator.svg"
              width={18}
              height={16}
              alt=""
              className="hidden sm:block rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
            />
            {!activeFour ? (
              <Image
                src="/static/images/roundBlue-circle.svg"
                width={18}
                height={16}
                alt=""
                className="sm:hidden rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
              />
            ) : (
              <Image
                src="/static/images/indicator.svg"
                width={18}
                height={16}
                alt=""
                className="sm:hidden rounded-full h-[12px] w-[12px] sm:w-[18px] sm:h-[10px]"
              />
            )}
          </span>
        </div>
        <div className="hidden sm:flex items-center justify-between text-[#4E4E4E] text-[14px]">
          <p>Property Information</p>
          <p>Rent Details</p>
          <p className="pl-4">Add Photo(s)</p>
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
          <PropertyInfo handlePropertyInfo={handlePropertyInfo} />
        </div>
        <div className={`${activeTwo ? "inline" : "hidden"}`}>
          <RentalInfo
            handleRentalInfo={handleRentalInfo}
            previousBtn={handlePropertyInfoActive}
          />
        </div>

        <div className={`${activeThree ? "inline" : "hidden"}`}>
          <PropertyPhoto
            BackToRentalsInfo={BackToRentalsInfo}
            handlePagePropertyPhoto={handlePropertyPhotos}
            setUploadedCoverPhoto={setUploadedCoverPhoto}
            setUploadedOtherPhotos={setUploadedOtherPhotos}
          />
        </div>
        <div className={`${activeFour ? "inline" : "hidden"}`}>
          <ContactInfo
            BackToPropertyPhotos={BackToPropertyPhotos}
            handleSubmitData={handleSubmit}
          />
        </div>
      </div>
      <CustomizedModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white border w-[333px] flex flex-col sm:w-[464px] py-[24px] px-[16px] sm:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <p className=" text-[14px] leading-[19.5px] sm:text-[16px] text-[400] sm:leading-[24px] text-center">
            Proceed to list property?
          </p>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] border  sm:w-[400px] h-[48px] p-[12px]"
            onClick={handleSaved}
          >
            Yes
          </button>
          <button
            className="border-BlueHomz w-[301px]  text-blue-600 rounded-[4px] border  sm:w-[400px] h-[48px] p-[12px]"
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
        <div className="bg-white border flex flex-col w-[333px] sm:w-[464px]  p-[32px] rounded-[12px] gap-[18px]">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <div className="flex  flex-col">
              <p className="text-[14px] sm:text-[20px] font-[700] leading-[17.64px] sm:leading-[25.2px] text-center">
                Property Added Successfully
              </p>
              <p className="text-[14px] sm:text-[16px] font-[400] leading-[17.64px] sm:leading-[24px] text-center text-[#4E4E4E]">
                Click on the button to view property
              </p>
            </div>
          </div>

          <Link href={"/dashboard/list_Property/"}
            className="bg-BlueHomz2 text-white rounded-[4px] border h-[48px] p-[12px] flex justify-center items-center"
            onClick={() => {
              closeSuccessModal();
            }}
          >
            View Property
          </Link>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default PropertyForms;
