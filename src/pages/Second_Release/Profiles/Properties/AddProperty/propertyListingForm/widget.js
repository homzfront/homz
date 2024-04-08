"use client";
import React, { useState } from "react";
import PropertyInfo from "./propertyInfo.js";
import ContactInfo from "./contactInfo.js";
import api from "/src/utils/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";
import PropertyPhoto from "./PropertyPhotos.js";

const Widget = ({ returnToStartRegistration }) => {
  // to push to dashboard/property-listing
  const router = useRouter();

  const [active, setActive] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [loading, setLoading] = useState(false);

  // open confirmation modal
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [yesOrNoModal, setYesOrNoModal] = useState(false);

  // Form states
  // propertyInfo
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [numberOfApartments, setNumberOfApartments] = useState(null);
  const [description, setDescription] = useState("");


  const [uploadedImageCoverPhoto, setUploadedImageCoverPhoto] = useState(null);

  // rentDetails
  const [utilityNumber, setUtilityNumber] = useState("");
  const [managerPhoneNumber, setManagerPhoneNumber] = useState("");
  const [securityPhoneNumber, setSecurityPhoneNumber] = useState("");
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState("");
 

  // contactInfo
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    const formData = new FormData();
    values.Images.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("area", selectedArea?.label);
    formData.append("state", selectedState?.label);
    formData.append("numberOfApartments", parseInt(numberOfApartments?.label));
    formData.append("address", address);
    formData.append("propertySize", propertySize);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("coverPhoto", uploadedImageCoverPhoto);
    formData.append("utilityNumber", utilityNumber);
    formData.append("emergencyPhoneNumber", emergencyPhoneNumber);
    formData.append("securityPhoneNumber", securityPhoneNumber);
    formData.append("managerPhoneNumber", managerPhoneNumber);
    console.log(uploadedImageCoverPhoto)
   
    // try {
    //   const response = await api.post("/properties/create", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       // add other headers as needed
    //     },
    //   });

    //   if (response.data.statuscode === 201 || 200) {
    //     console.log(response.data.data);
    //     console.log("form successfully updated ", response.data);
    //     toast.success("form successfully uploaded");
    //     setLoading(false);
    //     setSelectedArea(null);
    //     setSelectedState(null);
    //     setName("");
    //     setAddress("");
    //     setDescription("");
    //     setNumberOfApartments(null);
    //     setSecurityPhoneNumber("");
    //     setPropertySize('')
    //     setEmergencyPhoneNumber("");
    //     setUtilityNumber("");
    //     setManagerPhoneNumber("");
    //     setOpenConfirmationModal(!openConfirmationModal);
    //   } else {
    //     const error = response.data.message;
    //     console.log("Unexpected status code:", error);
    //     toast.error("update falied");
    //     setLoading(false);
    //     setYesOrNoModal(false);
    //   }
    // } catch (error) {
    //   console.error("Update error", error);
    //   setLoading(false);

    //   if (
    //     error?.response?.data?.error?.errors &&
    //     error.response.data.error.errors.length > 0
    //   ) {
    //     const errorMessage = error.response.data.error.errors[0];
    //     console.error("Error message:", errorMessage);
    //     toast.error(`Update failed: ${errorMessage}`);
    //   } else if (error?.response?.data?.message) {
    //     const errorMessage = error.response.data.message;
    //     console.error("Unexpected status code:", errorMessage);
    //     toast.error(`Update failed: ${errorMessage}`);
    //   } else {
    //     toast.error("Update failed");
    //   }

    //   setYesOrNoModal(false);
    // }
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(false);
    setActive(true);
    setActiveThree(false);
  };
  const handlePageChange = () => {
    setActiveTwo(true);
    setActive(false);
    setActiveThree(false);
  };

  const handlePageChangeThree = () => {
    setActiveThree(false);
    setActiveTwo(true);
    setActive(false);
  };

  const handlePageChangeFour = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setActive(false);
  };

  const openYesOrNo = () => {
    setYesOrNoModal(!yesOrNoModal);
  };

  const closeYesOrNoModal = () => {
    setYesOrNoModal(false);
  };

  const fetchProfileId = async () => {
    // Simulated asynchronous operation, replace with your actual logic
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUrl = window.location.href;
        const profileIdRegex = /\/Profiles\/(\d+)/;
        const match = profileIdRegex.exec(currentUrl);
        if (match && match.length > 1) {
          const profileId = match[1];
          resolve(profileId);
        }
      }, 3000);
    });
  };

  const closeAllModals = () => {
    setOpenConfirmationModal(false);
    setYesOrNoModal(false);
    returnToStartRegistration();
    // Add a unique query parameter
    // router.push("/dashboard/property-owner/propertylisting?refresh=true");
    const id=fetchProfileId();
    router.push(`/second_release/Profiles/${id}?refresh=true`);

    // Remove the query parameter to prevent it from staying in the URL
    const { pathname, query } = router;
    delete query.refresh;
    router.replace({ pathname, query }, undefined, { shallow: true });
  };

  return (
    <div>
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
      <div className="">
        <div className="flex flex-col gap-3">
          <div className="indicators flex items-center mx-10">
            <span
              className={`${
                active && "inline-block p-1 rounded-full bg-white shadow-md"
              }`}
            >
              <Image
                src="/static/images/indicator.svg"
                width={20}
                height={20}
                alt=""
                className="rounded-full"
              />
            </span>

            <hr
              style={{
                height: "1px",
                width: "100%",
                borderWidth: "0",
                background: "gray", // Adjust the opacity here (0.5 for 50% opacity)
              }}
            />
            <span
              className={`${
                activeTwo && "inline-block p-1 rounded-full bg-white shadow-md"
              }`}
            >
              <Image
                src="/static/images/indicator.svg"
                width={20}
                height={20}
                alt=""
                className="rounded-full"
              />
            </span>

            <hr
              style={{
                height: "1px",
                width: "100%",
                borderWidth: "0",
                background: "gray", // Adjust the opacity here (0.5 for 50% opacity)
              }}
            />
            <span
              className={`${
                activeThree &&
                "inline-block p-1 rounded-full bg-white shadow-md"
              }`}
            >
              <Image
                src="/static/images/indicator.svg"
                width={20}
                height={20}
                alt=""
                className="rounded-full"
              />
            </span>
          </div>
          <div className="flex items-center justify-between text-[#4E4E4E] text-[14px]">
            <p>Property Information</p>
            <p>Add Photo(s)</p>
            <p>Contact Information</p>
          </div>
        </div>

        <div className=" my-7  rounded-[12px] ">
          <div className={`${active ? "inline" : "hidden"}`}>
            <PropertyInfo
              returnToStartRegistration={returnToStartRegistration}
              handlePageChangeTwo={handlePageChange}
              name={name}
              address={address}
              propertySize={propertySize}
              numberOfApartments={numberOfApartments}
              description={description}
              selectedArea={selectedArea}
              selectedState={selectedState}
              setSelectedArea={setSelectedArea}
              setPropertySize={setPropertySize}
              setSelectedState={setSelectedState}
              setName={setName}
              setAddress={setAddress}
              setDescription={setDescription}
              setNumberOfApartments={setNumberOfApartments}
            />
          </div>

          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <PropertyPhoto
              handlePageChangeTwo={handlePageChangeTwo}
              handlePageChangeFour={handlePageChangeFour}
              setUploadedImageCoverPhoto={setUploadedImageCoverPhoto}
            />
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            
            <ContactInfo
              handlePageChangeThree={handlePageChangeThree}
              managerPhoneNumber={managerPhoneNumber}
              setUtilityNumber={setUtilityNumber}
              utilityNumber={utilityNumber}
              setEmergencyPhoneNumber={setEmergencyPhoneNumber}
              emergencyPhoneNumber={emergencyPhoneNumber}
              securityPhoneNumber={securityPhoneNumber}
              setSecurityPhoneNumber={setSecurityPhoneNumber}
              setManagerPhoneNumber={setManagerPhoneNumber}
              handleSubmit={handleSubmit}
              yesOrNoModal={yesOrNoModal}
              openYesOrNo={openYesOrNo}
              closeYesOrNoModal={closeYesOrNoModal}
              openConfirmationModal={openConfirmationModal}
              closeAllModals={closeAllModals}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
