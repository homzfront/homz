"use client";
import React, { useState } from "react";
import PropertyInfo from "./propertyInfo.js";
import AddPhotos from "./addPhotos.js";
import ContactInfo from "./contactInfo.js";
// import Documents from "./documents.js"; 
// Import your fourth component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api.js";
import { useRouter } from "next/navigation.js";

const Widget = ({ returnToStartRegistration, fetchData }) => {
  // to push to dashboard/property-listing
  const router = useRouter();

  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  // const [activeFour, setActiveFour] = useState(false); // State for the fourth page
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [yesOrNoModal, setYesOrNoModal] = useState(false);
  const [visibleAddProperty, setVisibleAddProperty] = useState(false);

  // Form states
  // propertyInfo
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [size, setSize] = useState("");
  const [numberOfHouses, setNumberOfHouses] = useState("");
  const [description, setDescription] = useState("");
  
  // addphotos
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);

  // contactInfo
  const [managerPhoneNumber, setManagerPhoneNumber] = useState("");
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState("");
  const [utilityServicePhoneNumber, setUtilityServicePhoneNumber] =
    useState("");
  const [securityPhoneNumber, setSecurityPhoneNumber] = useState("");

  const trimSpaces = (input) => {
    if (typeof input === 'string') {
      return input.trim();
    }
    return input;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    const formData = new FormData();
    formData.append("coverPhoto", uploadedImage);
    formData.append("photos", uploadedImage2);
    formData.append("photos", uploadedImage3);
    formData.append("area", selectedArea?.label);
    formData.append("state", selectedState?.label);
    formData.append("address", address);
    formData.append("size", parseInt(size));
    formData.append("name", trimSpaces(name));
    formData.append("numberOfHouses", numberOfHouses);
    formData.append("description", description);
    formData.append("managerPhoneNumber", parseInt(managerPhoneNumber));
    formData.append("emergencyPhoneNumber", parseInt(emergencyPhoneNumber));
    formData.append(
      "utilityServicePhoneNumber",
      parseInt(utilityServicePhoneNumber)
    );
    formData.append("securityPhoneNumber", parseInt(securityPhoneNumber));

    try {
      const response = await api.post("/estates/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // add other headers as needed
        },
      });

      if (response.data.statuscode === 201 || 200) {
        setLoading(false);
        setUploadedImage(null);
        setSelectedArea(null);
        setSelectedState(null);
        // setName("");
        setAddress("");
        setSize("");
        setNumberOfHouses("");
        setDescription("");
        setManagerPhoneNumber("");
        setEmergencyPhoneNumber("");
        setUtilityServicePhoneNumber("");
        setSecurityPhoneNumber("");
        setShowConfirm(!showConfirm);
      } else {
        const error = response.data.message;
        toast.error("update falied");
        setLoading(false);
        setYesOrNoModal(false);
      }
    } catch (error) {
      setLoading(false);
      setYesOrNoModal(false);
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        toast.error(`Update failed: ${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        toast.error(`Update failed: ${errorMessage}`);
      } else {
        toast.error("Update failed");
      }
    }

  };

  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
    setActiveThree(false);
    // setActiveFour(false);
    // Reset the state for the fourth page
  };

  const handlePageChangeTwo = () => {
    // Proceed to the next page
    setActiveTwo(true);
    setActive(true);
    setActiveThree(false);
    // setActiveFour(false);
  };

  const handlePageChangeThree = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setActive(true);

    // setActiveFour(false); 
    // Reset the state for the fourth page
  };

  // const handlePageChangeFour = () => {
  //   setActiveFour(true);
  //   setActiveThree(false);
  //   setActiveTwo(false);
  //   setActive(true);
  // };

  const openYesOrNo = () => {
    setYesOrNoModal(!yesOrNoModal);
  };

  const closeYesOrNoModal = () => {
    setYesOrNoModal(false);
    setVisibleAddProperty(false);
  };

  const closeAllModals = () => {
    setShowConfirm(false);
    setYesOrNoModal(false);
    setVisibleAddProperty(false);
    fetchData();
    returnToStartRegistration();
  };


  return (
    <div className="hidden md:block w-full h-auto py-4">
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
      <div className="relative inline-block w-full">
        <div className="z-0 absolute w-full pr-[96px] pl-[96px] py-[27px]">
          <div className="border-[1px]"></div>
        </div>
        <div className="z-10 relative flex mt-5 gap-4 justify-between px-8  w-full">
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col items-center p-2 justify-center ${!active
                ? " bg-white rounded-full  w-1 h-1 shadow-md "
                : "h-1 w-1"
                }`}
            >
              <div
                className={`rounded-full w-[1px] h-[1px]  bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Property Information</p>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col p-2 items-center justify-center ${activeTwo
                ? " bg-white rounded-full  w-1 h-1 shadow-md "
                : "h-1 w-1"
                }`}
      
            >
              <div
                className={`rounded-full w-[1px] h-[1px] bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Add Photo(s)</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col p-2 items-center justify-center ${activeThree
                ? " bg-white rounded-full  w-1 h-1 shadow-md "
                : "h-1 w-1"
                }`}
   
            >
              <div
                className={`rounded-full w-[1px] h-[1px] bg-BlueHomz p-1 text-[14px] font-[500] text-cente`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Contact Information</p>
          </div>
          {/* <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col p-2 items-center justify-center ${
                activeFour
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
              }`}
              onClick={handlePageChangeFour}
            >
              <div
                className={`rounded-full w-[1px] h-[1px]  bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Documents</p>
          </div> */}
        </div>
      </div>
      <div className=" my-5  rounded-[12px]">
        <div className={`${!active ? "inline" : "hidden"}`}>
          <PropertyInfo
            active={active}
            handlePageChangeTwo={handlePageChangeTwo}
            returnToStartRegistration={returnToStartRegistration}
            selectedArea={selectedArea}
            selectedState={selectedState}
            name={name}
            numberOfHouses={numberOfHouses}
            description={description}
            size={size}
            address={address}
            setSelectedArea={setSelectedArea}
            setSelectedState={setSelectedState}
            setName={setName}
            setAddress={setAddress}
            setSize={setSize}
            setNumberOfHouses={setNumberOfHouses}
            setDescription={setDescription}
          />
        </div>
        <div className={`${activeTwo ? "inline" : "hidden"}`}>
          <AddPhotos
            handlePageChangeThree={handlePageChangeThree}
            handlePageChange={handlePageChange}
            uploadedImage={uploadedImage}
            uploadedImage2={uploadedImage2}
            uploadedImage3={uploadedImage3}
            setUploadedImage={setUploadedImage}
            setUploadedImage2={setUploadedImage2}
            setUploadedImage3={setUploadedImage3}
          />
        </div>
        <div className={`${activeThree ? "inline" : "hidden"}`}>
          <ContactInfo
            handlePageChangeTwo={handlePageChangeTwo}
            managerPhoneNumber={managerPhoneNumber}
            emergencyPhoneNumber={emergencyPhoneNumber}
            utilityServicePhoneNumber={utilityServicePhoneNumber}
            securityPhoneNumber={securityPhoneNumber}
            setEmergencyPhoneNumber={setEmergencyPhoneNumber}
            setManagerPhoneNumber={setManagerPhoneNumber}
            setSecurityPhoneNumber={setSecurityPhoneNumber}
            setUtilityServicePhoneNumber={setUtilityServicePhoneNumber}
            handleSubmit={handleSubmit}
            loading={loading}
            yesOrNoModal={yesOrNoModal}
            openYesOrNo={openYesOrNo}
            closeYesOrNoModal={closeYesOrNoModal}
            showConfirm={showConfirm}
            closeAllModals={closeAllModals}
            visibleAddProperty={visibleAddProperty}
            setVisibleAddProperty={setVisibleAddProperty}
            name={name}
          />
        </div>
        {/* <div className={`${activeFour ? "inline" : "hidden"}`}>
            <Documents handlePageChangeThree={handlePageChangeThree} />
          </div> */}
      </div>
    </div>
  );
};

export default Widget;
