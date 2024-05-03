"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { Properties } from "../components/Properties";
import CustomizedModal from "../components/CustomizedModal";
import PersonalInfo from "./components/personalInfo";
import BusinessInfo from "./components/businessInfo";
import ChangePassword from "./components/changePassword";

// export async function getStaticProps() {
//   // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   // const repo = await res.json()
//   const Prop = Properties.find(prop => prop._id === parseInt(window.location.href.split("/").pop()));
//   return { props: { Prop } }
// }
const Profile = () => {
  const PropertyID = null;
  const [personalActive, setPersonalActive] = useState(true);
  const [businessActive, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [changePwdActive, setActiveFour] = useState(false);
  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState([]);
  const [profilePhoto, setUploadedCoverPhoto] = useState(null);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [ProfileDetails, setProfileDetails] = useState([]);
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
    // console.log(ProfileDetails);
  };
  const handleUpdateDetails = (data) => {
    setSaveModalIsOpen(true);
    setPersonalInfo(data);
  };
  const handleSubmit = (data) => {
    setBusinessInfo(data);
    setProfileDetails((preDetails) => [
      ...preDetails,
      personalInfo,
      profilePhoto,
      ,
      data,
    ]);
    setSaveModalIsOpen(true);
  };
  const handlePropertyInfo = (data) => {
    setPersonalInfo(data);
  };
  const handlePersonalActive = () => {
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false);
    setPersonalActive(true);
  };
  const handleBusinessActive = () => {
    setActiveTwo(true);
    setPersonalActive(false);
    setActiveThree(false);
    setActiveFour(false);
  };

 
  const handleContactInfo = () => {
    setActiveThree(false);
    setActiveTwo(false);
    setActiveFour(true);
    setPersonalActive(false);
  };
  const handleChangePassword = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setPersonalActive(false);
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
    setPersonalActive(false);
  };
  return (
    <div className="pt-10 md:pt-0 md:px-2 w-full">
   
      <h1>Profile</h1>
      <div className="flex flex-col gap-2 mt-8 ">
        <div className="indicators flex items-center gap-[15px] flex-wrap w-[335px] md:w-full profileVP duoViewPoint ">
          <button
            onClick={handlePersonalActive}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${
              personalActive
                ? "inline-block shadow-md bg-[#006AFF] text-white "
                : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
            }`}
          >
            Personal Information
          </button>

          <button
            onClick={handleBusinessActive}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${
              businessActive
                ? "inline-block shadow-md bg-[#006AFF] text-white "
                : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
            }`}
          >
            Business Information
          </button>

          <button
            onClick={handleContactInfo}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${
              changePwdActive
                ? "inline-block shadow-md bg-[#006AFF] text-white "
                : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
            }`}
          >
            Change Password
          </button>
        </div>
        {/* <div className="hidden md:flex items-center justify-between text-[#4E4E4E] text-[14px]">
         
        </div> */}
      </div>
      <hr
        style={{
          height: "1.5px",
          width: "100%",
          borderWidth: "0",
          background: "#E6E6E6", // Adjust the opacity here (0.5 for 50% opacity)
        }}
        className="mt-5 md:hidden"
      />
      <div className=" md:mt-7 mb-7  rounded-[12px] ">
        <div className={`${personalActive ? "inline-block" : "hidden"}`}>
          <PersonalInfo handleUpdate={handleUpdateDetails} />
        </div>
        <div className={`${businessActive ? "inline-block" : "hidden"}`}>
          <BusinessInfo
            Business_Info={propertyData}
            handleUpdate={handleUpdateDetails}
          />
        </div>

        <div className={`${changePwdActive ? "inline-block" : "hidden"}`}>
          <ChangePassword
            passwordInfo={propertyData}
            handleUpdate={handleUpdateDetails}
          />
        </div>
      </div>
      <CustomizedModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white border w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <p className=" text-[16px] leading-[19.5px] md:text-[20px] font-[700] md:leading-[24px] text-center">
            Save Updates?
          </p>
          <p className=" hidden md:block leading-[19.5px] text-[16px] font-[400] md:leading-[24px] text-center">
            Proceed with saving changes?
          </p>
          <div className="flex flex-wrap md:flex-col gap-[16px]">
            <button
              className="bg-BlueHomz2 w-[137.5px]  text-white rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center"
              onClick={handleSaved}
            >
              Yes
            </button>
            <button
              className="border-BlueHomz w-[137.5px]  text-blue-600 rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center"
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
                Update Saved
              </p>
            </div>
          </div>

          <button
            className="bg-BlueHomz2 text-white rounded-[4px] border h-[48px] p-[12px]"
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

export default Profile;
