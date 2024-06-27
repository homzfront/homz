"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomizedModal from "../components/CustomizedModal";
import PersonalInfo from "./components/personalInfo";
import BusinessInfo from "./components/businessInfo";
import ChangePassword from "./components/changePassword";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import {
  updateBusinessInfoLister,
  updatePersonalInfoLister,
} from "@/api/listingServices";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import { useSearchParams } from "next/navigation";

const Profile = () => {
  const urlParams = useSearchParams();
  const tab = urlParams.get("tab");

  const [personalActive, setPersonalActive] = useState(
    tab ? tab === "personal" : true
  );
  const [businessActive, setActiveTwo] = useState(tab === "business");
  const [changePwdActive, setActiveFour] = useState(tab === "password");
  const [loading, setLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState([]);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [mainSavedModalIsOpen, setMainSavedModalIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [typeOfAction, setTypeOfAction] = useState("");
  const { data, fetchData } = useProfileListingMe();

  // console.log(typeOfAction)
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };
  const handleSaved = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (personalInfo?.businessName) {
      try {
        const { success, updatedImage, error } = await updateBusinessInfoLister(
          personalInfo
        );
        if (success) {
          setLoading(false);
          setSuccessModalIsOpen(true);
          setSaveModalIsOpen(false);
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setSaveModalIsOpen(false);
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
          toast.error("Update failed, Internal Server Error");
        }
      }
    } else {
      try {
        const { success, updatedImage, error } = await updatePersonalInfoLister(
          personalInfo
        );
        if (success) {
          setLoading(false);
          setSuccessModalIsOpen(true);
          setSaveModalIsOpen(false);
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setSaveModalIsOpen(false);
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
          toast.error("Update failed, Internal Server Error");
        }
      }
    }
  };

  const handleUpdateDetails = (data, typeOfAction) => {
    setPersonalInfo(data);
    setTypeOfAction(typeOfAction);
    setSaveModalIsOpen(true);
  };

  const handlePersonalActive = () => {
    setActiveTwo(false);
    setActiveFour(false);
    setPersonalActive(true);
  };
  const handleBusinessActive = () => {
    setActiveTwo(true);
    setPersonalActive(false);
    setActiveFour(false);
  };

  const handleContactInfo = () => {
    setActiveTwo(false);
    setActiveFour(true);
    setPersonalActive(false);
  };

  return (
    <div className="w-full px-6 sm:px-1">
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
      <div className="mt-[-15px] md:mt-0 md:pt-0 md:px-5 w-full">
        <h1 className="w-[50%] font-[500]">Profile</h1>
        <div className="flex flex-col gap-2 mt-8 ">
          <div className="indicators flex items-center  gap-[15px] sm:gap-[15px] flex-wrap w-fit md:w-full">
            <button
              onClick={handlePersonalActive}
              className={`py-[8px] sm:px-[12px] px-[8px] rounded-[4px]  md:text-[14px] text-[11px] ${
                personalActive
                  ? "inline-block shadow-md bg-[#006AFF] text-white "
                  : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
              }`}
            >
              Personal Information
            </button>

            <button
              onClick={handleBusinessActive}
              className={`py-[8px] sm:px-[12px] px-[8px] rounded-[4px]  md:text-[14px] text-[11px] ${
                businessActive
                  ? "inline-block shadow-md bg-[#006AFF] text-white "
                  : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
              }`}
            >
              Business Information
            </button>

            <button
              onClick={handleContactInfo}
              className={`py-[8px] sm:px-[12px] px-[8px] rounded-[4px]  md:text-[14px] text-[11px] ${
                changePwdActive
                  ? "inline-block shadow-md bg-[#006AFF] text-white "
                  : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
              }`}
            >
              Change Password
            </button>
          </div>
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
        <div className=" md:mt-7 mb-7 w-full rounded-[12px] ">
          <div className={`${personalActive ? "block" : "hidden"}`}>
            <PersonalInfo handleUpdate={handleUpdateDetails} data={data} />
          </div>
          <div className={`${businessActive ? "block" : "hidden"}`}>
            <BusinessInfo
              Business_Info={data}
              handleUpdate={handleUpdateDetails}
              mainSavedButton={setMainSavedModalIsOpen}
            />
          </div>

          <div className={`${changePwdActive ? "block" : "hidden"}`}>
            <ChangePassword />
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
            <div
              className={`flex gap-2 md:flex-wrap md:flex-col md:gap-[16px] ${
                loading ? "pointer-events-none" : ""
              }`}
            >
              <button
                className={`bg-BlueHomz2 w-[137.5px] text-white rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center
                  ${loading ? "pointer-events-none flex justify-center" : ""} 
                  `}
                onClick={handleSaved}
              >
                {loading ? <LoadingFormII /> : "Yes"}
              </button>
              <button
                className="border-BlueHomz w-[137.5px]  text-blue-600 rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center"
                onClick={() => {
                  setSaveModalIsOpen(false);
                }}
              >
                No, don't save
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
        <CustomizedModal
          isOpen={mainSavedModalIsOpen}
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
                setMainSavedModalIsOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </CustomizedModal>
      </div>
    </div>
  );
};

export default Profile;
