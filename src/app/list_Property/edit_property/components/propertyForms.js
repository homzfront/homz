"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import PropertyInfo from "./propertyInfo";
import RentalInfo from "./rentDetails";
import PropertyPhoto from "./PropertyPhotos";
import ContactInfo from "./contactInfo";
import { Properties } from "../../components/Properties";
import CustomizedModal from "../../components/CustomizedModal";

// export async function getStaticProps() {
//   // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   // const repo = await res.json()
//   const Prop = Properties.find(prop => prop._id === parseInt(window.location.href.split("/").pop()));
//   return { props: { Prop } }
// }
const PropertyForms = ({ PropertyID }) => {
  const [propertyInfoActive, setPropertyInfoActive] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);
  const [loading, setLoading] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [rentalInfo, setRentalInfo] = useState([]);
  const [coverPhoto, setUploadedCoverPhoto] = useState(null);
  const [otherPhotos, setUploadedOtherPhotos] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const property = Properties.find(({ _id }) => _id === parseInt(PropertyID));
    setPropertyData(property);
  }, [PropertyID]);
  
  
  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };
  const handleSaved = (e) => {
    e.preventDefault();
    setSuccessModalIsOpen(true);
    setSaveModalIsOpen(false);
    // console.log(propertyDetails);
  };
  const updatePropertyDetails=(data)=>{
    setSaveModalIsOpen(true);
    setPropertyInfo(data)

  }
  const handleSubmit = (data) => {
    setContactInfo(data);
    setPropertyDetails((preDetails) => [
      ...preDetails,
      propertyInfo,
      coverPhoto,
      otherPhotos,
      data,
    ]);
    setSaveModalIsOpen(true);
  };
  const handlePropertyInfo = (data) => {
    setPropertyInfo(data);
  };
  const handlePropertyInfoActive = () => {
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false);
    setPropertyInfoActive(true);
  };
  const handleRentalPage = () => {
    setActiveTwo(true);
    setPropertyInfoActive(false);
    setActiveThree(false);
    setActiveFour(false);
  };

 
  const handlePropertyPhotos = () => {
    setSaveModalIsOpen(true);

  };
  const handleContactInfo = () => {
    setActiveThree(false);
    setActiveTwo(false);
    setActiveFour(true);
    setPropertyInfoActive(false);
  };
  const HandlePhotoPage = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setPropertyInfoActive(false);
    setActiveFour(false);
  };
  const BackToPropertyPhotos = () => {
    setActiveThree(true);
    setActiveFour(false);
  };
  const handlePageChangeLast = () => {
    setActiveThree(false);
    setActiveTwo(false);
    setActiveFour(true);
    setPropertyInfoActive(false);
  };
  return (
    <div className="pt-10 md:pt-0">
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
      <div className="flex justify-between items-center">
        <Link href="/list_Property" className="flex items-center gap-2">
        <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
                }
                height={16}
                width={16}
                alt=""
                className="hidden md:block"
              />
          <p className=" text-gray-400 text-[14px] hidden md:flex gap-3 items-center">
            <span>Go Back</span>
            <div>
              <span className="text-[#4E4E4E] font-[400] md:text-[16px] md:leading-[24px]">
              {propertyData?.PropertyInfo?.Title ?? ""}/{" "}

              </span>
              <span className="md:text-[18px] md:font-[500] md:leading-[30px] text-[#4E4E4E]">
                Property Details
              </span>
            </div>
          </p>
          <span className="md:hidden   h-[28px] p-[4px] rounded-[8px] flex gap-5 items-center">
            <Image
              src="/static/images/blue-arrow-left.svg"
              width={20}
              height={20}
              alt=""
              className="bg-[#EEF5FF]"
            />
            <div>
              <span className="text-[#4E4E4E] font-[400] leading-[17.64px] text-[14px]">
              {propertyData?.PropertyInfo?.Title ?? ""}/{" "}
              </span>
              <span className="font-[400] leading-[20.16px] text-[16px]">
                Property Details
              </span>
            </div>
          </span>
        </Link>
        <Link
          href=""
          className="text-[#006AFF] text-[14px] leading-[21px] hidden md:block mr-3"
        >
          See public view
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-8 ">
        <div className="indicators flex items-center gap-[15px] flex-wrap w-[335px] md:w-full">
          <button
            onClick={handlePropertyInfoActive}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${
              propertyInfoActive
                ? "inline-block shadow-md bg-[#006AFF] text-white "
                : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
            }`}
          >
            Property Details
          </button>

          <button
            onClick={handleRentalPage}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${
              activeTwo
                ? "inline-block shadow-md bg-[#006AFF] text-white "
                : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
            }`}
          >
            Rent Details
          </button>

          <button
            onClick={HandlePhotoPage}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${
              activeThree
                ? "inline-block shadow-md bg-[#006AFF] text-white "
                : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
            }`}
          >
            Photos
          </button>

          <button
            onClick={handleContactInfo}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${
              activeFour
                ? "inline-block shadow-md bg-[#006AFF] text-white "
                : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
            }`}
          >
            Contact Details
          </button>
        </div>
        {/* <div className="hidden md:flex items-center justify-between text-[#4E4E4E] text-[14px]">
         
        </div> */}
      </div>
      <div className=" my-7  rounded-[12px] ">
        <div className={`${propertyInfoActive ? "inline" : "hidden"}`}>
           <PropertyInfo property={propertyData} handleUpdate={updatePropertyDetails} />
        </div>
        <div className={`${activeTwo ? "inline" : "hidden"}`}>
          <RentalInfo
          rentalInfo={propertyData}
            handleUpdate={updatePropertyDetails}
          
          />
        </div>

        <div className={`${activeThree ? "inline" : "hidden"}`}>
          <PropertyPhoto
            handlePagePropertyPhoto={handlePropertyPhotos}
            setUploadedCoverPhoto={setUploadedCoverPhoto}
            setUploadedOtherPhotos={setUploadedOtherPhotos}
            PhotosInfo={propertyData}
          />
        </div>
        <div className={`${activeFour ? "inline" : "hidden"}`}>
          <ContactInfo
           Contact_Info={propertyData}
            handleUpdate={updatePropertyDetails}
          />
        </div>
      </div>
      <CustomizedModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <p className=" text-[16px] leading-[19.5px] md:text-[20px] font-[700] md:leading-[24px] text-center">
          Save Updates?
          </p>
          <p className=" hidden md:block leading-[19.5px] text-[16px] font-[400] md:leading-[24px] text-center">
          Would you like to save your updates before leaving?
          </p>
          <div className="flex flex-wrap md:flex-col gap-[16px]">

          <button
            className="bg-BlueHomz2 w-[137.5px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[42px] md:h-[48px] text-center"
            onClick={handleSaved}
          >
            Yes
          </button>
          <button
            className="border-BlueHomz w-[137.5px]  text-blue-600 rounded-[4px] adminCellBorders  md:w-[400px] h-[42px] md:h-[48px] text-center"
            onClick={() => {
              setSaveModalIsOpen(false);
            }}
          >
            No, go back
          </button>
          </div>
        </div>
      </CustomizedModal>
      <CustomizedModal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
      >
        <div className="bg-white adminCellBorders flex flex-col w-[333px] md:w-[464px]  p-[32px] rounded-[12px] gap-[18px]">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <div className="flex  flex-col">
              <p className="text-[14px] md:text-[20px] font-[700] leading-[17.64px] md:leading-[25.2px] text-center mb-1">
              Update Saved
              </p>
              <p className="text-[14px] md:text-[16px] font-[400] leading-[17.64px] md:leading-[24px] text-center text-[#4E4E4E]">
              Property Information has successfully been updated
              </p>
            </div>
          </div>

          <button
            className="bg-BlueHomz2 text-white rounded-[4px] adminCellBorders h-[48px] p-[12px]"
            onClick={() => {
              closeSuccessModal();
            }}
          >
           Close
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default PropertyForms;
