"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import PropertyInfo from "./propertyInfo";
import RentalInfo from "./rentDetails";
import PropertyPhoto from "./PropertyPhotos";
import ContactInfo from "./contactInfo";
import CustomizedModal from "../../components/CustomizedModal";
import { rentDetails, updateContactInfo, updatePropertyDetails } from "@/api/propertyService";
import Loading from "@/components/mainmenu/loading";
import useBodyScroll from "@/utils/useBodyScroll";


const PropertyForms = ({ propertyData }) => {
  const [propertyInfoActive, setPropertyInfoActive] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [form, setForm] = useState(null);
  const [formII, setFormII] = useState(null);
  const [formIV, setFormIV] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };


  const handleSaved = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading
    setLoading(true); // Set loading to true when submitting the form
    let success = false; // Initialize success variable
    let error = false;

    if (form !== null || formII !== null || formIV !== null) {
      try {
        if (form !== null) {
          const { success: successForm, upDateddata, error: formerror } = await updatePropertyDetails(
            propertyData._id,
            form
          );
          error = formerror
          success = successForm; // Update success variable
        } else if (formII !== null) {
          const { success: successFormII, upDateddata, error: formerror } = await rentDetails(
            propertyData._id,
            formII
          );
          error = formerror
          success = successFormII; // Update success variable
        } else if (formIV !== null) {
          const whatsappRegex = /^https:\/\/wa\.me\/\d{10,}$/;
          if (formIV?.whatsapp && !whatsappRegex.test(formIV?.whatsapp)) {
            toast.error("Invalid WhatsApp link format");
            setLoading(false);
            setSaveModalIsOpen(false);
            return;
          }
          const validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
          if (formIV?.email && !validEmail.test(formIV?.email)) {
            toast.error("Invalid email link format");
            setLoading(false);
            setSaveModalIsOpen(false);
            return;
          }
          if (formIV?.phoneNumber && formIV?.phoneNumber?.length !== 11) {
            toast.error("Phone number must be 11 digits");
            setLoading(false);
            setSaveModalIsOpen(false);
            return;
          }
          const { success: successFormIV, upDateddata, error: formerror } = await updateContactInfo(
            propertyData._id,
            formIV
          );
          error = formerror
          success = successFormIV; // Update success variable
        }

        if (success) {
          setLoading(false);
          // toast.success("Update successful");
          setSuccessModalIsOpen(true);
          setSaveModalIsOpen(false);
          setEditMode(false);
          setForm(null);
          setFormII(null);
          setFormIII(null);
          setFormIV(null);
        } else {
          // toast.error(error);
          setLoading(false);
          setSaveModalIsOpen(false);
        }
        if (error) {
          setLoading(false);
          setSaveModalIsOpen(false);
          if (
            error?.response?.data?.error?.errors &&
            error.response.data.error.errors.length > 0
          ) {
            const errorMessage = error.response.data.error.errors[0];
            console.log(errorMessage);
            toast.error(`Update failed: ${errorMessage}`);
          } else if (error?.response?.data?.message) {
            const errorMessage = error.response.data.message;
            toast.error(`Update failed: ${errorMessage}`);
          } else {
            toast.error("Update failed");
          }
        }
      } catch (error) {
        setLoading(false);
        setSaveModalIsOpen(false);
        if (
          error?.response?.data?.error?.errors &&
          error.response.data.error.errors.length > 0
        ) {
          const errorMessage = error.response.data.error.errors[0];
          console.log(errorMessage);
          toast.error(`Update failed: ${errorMessage}`);
        } else if (error?.response?.data?.message) {
          const errorMessage = error.response.data.message;
          toast.error(`Update failed: ${errorMessage}`);
        } else {
          // toast.error("Update failed");
        }
      }
    }
  };


  useBodyScroll([loading]);

  const updatePropertyDetail = (data) => {
    setSaveModalIsOpen(true);
    setForm(data);
  }

  const updatePropertyDetailII = (data) => {
    setSaveModalIsOpen(true);
    setFormII(data);
  }

  const updatePropertyDetailIV = (data) => {
    setSaveModalIsOpen(true);
    setFormIV(data);
  }


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

  return (
    <div className="mt-[-10px] md:mt-0 md:pt-0">
      {/* {
        loading && <LoadingII />
      } */}
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
      <div className="flex justify-between items-center w-full">
        <Link href="/dashboard/list_Property" className="flex items-center gap-2">
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
            }
            height={16}
            width={16}
            alt=""
            className="hidden md:block"
          />
          <div className=" text-gray-400 text-[14px] hidden md:flex gap-3 items-center">
            <span>Go Back</span>
            <div>
              <span className="text-[#4E4E4E] font-[400] md:text-[16px] md:leading-[24px]">
                {(propertyData?.title || propertyData?.name) ?? ""} /{" "}

              </span>
              <span className="md:text-[18px] md:font-[500] md:leading-[30px] text-[#4E4E4E]">
                Property Details
              </span>
            </div>
          </div>
          <span className="md:hidden h-[28px] p-[4px] rounded-[8px] flex gap-5 items-center">
            <Image
              src="/static/images/blue-arrow-left.svg"
              width={20}
              height={20}
              alt=""
              className="bg-[#EEF5FF]"
            />
            <div>
              <span className="text-[#4E4E4E] font-[400] leading-[17.64px] text-[14px]">
                {(propertyData?.title || propertyData?.name) ?? ""} /{" "}
              </span>
              <span className="font-[400] leading-[20.16px] text-[16px]">
                Property Details
              </span>
            </div>
          </span>
        </Link>
        <Link
          href={`/dashboard/list_Property/PreviewProperty/${propertyData?._id}`}
          className="text-[#006AFF] text-[14px] leading-[21px] hidden md:block mr-3"
        >
          See public view
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-8 w-full">
        <div className="flex flex-wrap gap-[15px] w-full md:w-[571px]">
          <button
            onClick={handlePropertyInfoActive}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${propertyInfoActive
              ? "inline-block shadow-md bg-[#006AFF] text-white "
              : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
              }`}
          >
            Property Details
          </button>

          <button
            onClick={handleRentalPage}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${activeTwo
              ? "inline-block shadow-md bg-[#006AFF] text-white "
              : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
              }`}
          >
            Payment Details
          </button>

          <button
            onClick={HandlePhotoPage}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${activeThree
              ? "inline-block shadow-md bg-[#006AFF] text-white "
              : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
              }`}
          >
            Photos
          </button>

          <button
            onClick={handleContactInfo}
            className={`py-[8px] px-[12px] rounded-[4px]  md:text-[14px] text-[11px] ${activeFour
              ? "inline-block shadow-md bg-[#006AFF] text-white "
              : "bg-[#EEF5FF] text-[#006AFF] md:text-[#4E4E4E]  md:bg-inherit"
              }`}
          >
            Contact Details
          </button>
        </div>
      </div>
      <div className=" my-7 rounded-[12px] w-full">
        <div className={`${propertyInfoActive ? "inline" : "hidden"}`}>
          <PropertyInfo
            property={propertyData}
            handleUpdate={updatePropertyDetail}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        </div>
        <div className={`${activeTwo ? "inline" : "hidden"}`}>
          <RentalInfo
            property={propertyData}
            handleUpdate={updatePropertyDetailII}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        </div>
        <div className={`${activeThree ? "inline" : "hidden"} w-full`}>
          <PropertyPhoto
            data={propertyData}
          />
        </div>
        <div className={`${activeFour ? "inline" : "hidden"} w-full`}>
          <ContactInfo
            property={propertyData}
            handleUpdate={updatePropertyDetailIV}
            setEditMode={setEditMode}
            editMode={editMode}
          />
        </div>
      </div>
      {
        loading ? <Loading /> :
          <CustomizedModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
            <div className="bg-white border w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
              <p className=" text-[16px] leading-[19.5px] md:text-[20px] font-[700] md:leading-[24px] text-center">
                Save Updates?
              </p>
              <p className=" hidden md:block leading-[19.5px] text-[16px] font-[400] md:leading-[24px] text-center">
                Would you like to save your updates before leaving?
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
      }
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
              <p className="text-[14px] md:text-[16px] font-[400] leading-[17.64px] md:leading-[24px] text-center text-[#4E4E4E]">
                Property Information has successfully been updated
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

export default PropertyForms;
