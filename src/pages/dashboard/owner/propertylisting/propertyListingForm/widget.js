"use client";
import React, { useState } from "react";
import PropertyInfo from "./propertyInfo.js";
import RentDetails from "./rentDetails.js";
import ContactInfo from "./contactInfo.js";
import AddPictures from "./addPictures.js";
import api from "@/utils/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation.js";

const Widget = ({ returnToStartRegistration }) => {
  // to push to dashboard/property-listing
  const router = useRouter();

  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);
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
  const [propertyType, setPropertyType] = useState(null);
  const [numberOfRooms, setNumberOfRooms] = useState(null);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState(null);
  const [description, setDescription] = useState("");

  // addphotos
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [uploadedImage4, setUploadedImage4] = useState(null);
  const [uploadedImage5, setUploadedImage5] = useState(null);
  const [uploadedImage6, setUploadedImage6] = useState(null);
  const [uploadedImage7, setUploadedImage7] = useState(null);
  const [uploadedImage8, setUploadedImage8] = useState(null);
  const [uploadedImageCoverPhoto, setUploadedImageCoverPhoto] = useState(null);

  // rentDetails
  const [monthlyRent, setMonthlyRent] = useState("");
  const [maintenanceFee, setMaintenanceFee] = useState("");
  const [totalFee, setTotalFee] = useState("");
  const [agencyFee, setAgencyFee] = useState("");
  const [yearlyRent, setYearlyRent] = useState("");

  // contactInfo
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  console.log(selectedArea?.label);
  console.log(selectedState?.label);
  console.log(name);
  console.log(address);
  console.log(description);
  console.log(propertyType?.label);
  console.log(numberOfRooms?.label);
  console.log(numberOfBathrooms?.label);
  console.log(uploadedImageCoverPhoto);
  console.log(uploadedImage);
  console.log(uploadedImage2);
  console.log(uploadedImage3);
  console.log(uploadedImage4);
  console.log(uploadedImage5);
  console.log(uploadedImage6);
  console.log(uploadedImage7);
  console.log(uploadedImage8);
  console.log(monthlyRent);
  console.log(yearlyRent);
  console.log(totalFee);
  console.log(maintenanceFee);
  console.log(agencyFee);
  console.log(email);
  console.log(whatsapp);
  console.log(phoneNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    const formData = new FormData();
    formData.append("area", selectedArea?.label);
    formData.append("state", selectedState?.label);
    formData.append("propertyType", propertyType?.label);
    formData.append("numberOfRooms", parseInt(numberOfRooms?.label));
    formData.append("numberOfBathrooms", parseInt(numberOfBathrooms?.label));
    formData.append("address", address);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("coverPhoto", uploadedImageCoverPhoto);
    formData.append("photos", uploadedImage);
    formData.append("photos", uploadedImage2);
    formData.append("photos", uploadedImage3);
    formData.append("monthlyRent", parseInt(monthlyRent));
    formData.append("yearlyRent", parseInt(yearlyRent));
    formData.append("totalFee", parseInt(totalFee));
    formData.append("maintenanceFee", parseInt(maintenanceFee));
    formData.append("agencyFee", parseInt(agencyFee));
    formData.append("email", email);
    formData.append("phoneNumber", parseInt(phoneNumber));
    formData.append("whatsapp", whatsapp);
    try {
      const response = await api.post("/properties/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // add other headers as needed
        },
      });

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        toast.success("form successfully uploaded");
        setLoading(false);
        setSelectedArea(null);
        setSelectedState(null);
        setName("");
        setAddress("");
        setDescription("");
        setPropertyType(null);
        setNumberOfRooms(null);
        setNumberOfBathrooms(null);
        setUploadedImageCoverPhoto(null);
        setUploadedImage(null);
        setUploadedImage2(null);
        setUploadedImage3(null);
        setUploadedImage4(null);
        setUploadedImage5(null);
        setUploadedImage6(null);
        setUploadedImage7(null);
        setUploadedImage8(null);
        setMonthlyRent("");
        setYearlyRent("");
        setTotalFee("");
        setMaintenanceFee("");
        setAgencyFee("");
        setEmail("");
        setWhatsapp("");
        setPhoneNumber("");
        setOpenConfirmationModal(!openConfirmationModal);
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
        setYesOrNoModal(false);
      }
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);

      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        console.error("Error message:", errorMessage);
        toast.error(`Update failed: ${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        console.error("Unexpected status code:", errorMessage);
        toast.error(`Update failed: ${errorMessage}`);
      } else {
        toast.error("Update failed");
      }

      setYesOrNoModal(false);
    }
  };

  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(true);
    setActiveThree(false);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeThree = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setActive(true);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeFour = () => {
    setActiveFour(true);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(true);
  };

  const openYesOrNo = () => {
    setYesOrNoModal(!yesOrNoModal);
  };

  const closeYesOrNoModal = () => {
    setYesOrNoModal(false);
  };

  const closeAllModals = () => {
    setOpenConfirmationModal(false);
    setYesOrNoModal(false);
    returnToStartRegistration();
    // Add a unique query parameter
    router.push("/dashboard/property-owner/propertylisting?refresh=true");

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
      <div className="inline-block w-[1147px] h-auto py-4">
        <div className="z-0 absolute w-[1147px] pr-[96px] pl-[96px] py-[27px]">
          <div className="border-[1px]"></div>
        </div>
        <div className="z-1 relative flex mt-5 gap-4 justify-between px-8 cursor-pointer w-[1147px]">
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col items-center p-2 justify-center ${
                !active
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
              }`}
              onClick={handlePageChange}
              justify-center
            >
              <div
                className={`rounded-full w-[1px] h-[1px]  bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Property Information</p>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col p-2 items-center justify-center ${
                activeTwo
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
              }`}
              onClick={handlePageChangeTwo}
            >
              <div
                className={`rounded-full w-[1px] h-[1px] bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Rent Details</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col p-2 items-center justify-center ${
                activeThree
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
              }`}
              onClick={handlePageChangeThree}
            >
              <div
                className={`rounded-full w-[1px] h-[1px] bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Add Photo(s)</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
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
            <p className="text-[14px] font-400">Contact Information</p>
          </div>
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <PropertyInfo
              returnToStartRegistration={returnToStartRegistration}
              handlePageChangeTwo={handlePageChangeTwo}
              name={name}
              address={address}
              description={description}
              selectedArea={selectedArea}
              selectedState={selectedState}
              setSelectedArea={setSelectedArea}
              setSelectedState={setSelectedState}
              setName={setName}
              setAddress={setAddress}
              setDescription={setDescription}
              propertyType={propertyType}
              numberOfRooms={numberOfRooms}
              numberOfBathrooms={numberOfBathrooms}
              setPropertyType={setPropertyType}
              setNumberOfRooms={setNumberOfRooms}
              setNumberOfBathrooms={setNumberOfBathrooms}
            />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <RentDetails
              handlePageChangeThree={handlePageChangeThree}
              handlePageChange={handlePageChange}
              monthlyRent={monthlyRent}
              maintenanceFee={maintenanceFee}
              totalFee={totalFee}
              agencyFee={agencyFee}
              yearlyRent={yearlyRent}
              setMonthlyRent={setMonthlyRent}
              setMaintenanceFee={setMaintenanceFee}
              setTotalFee={setTotalFee}
              setAgencyFee={setAgencyFee}
              setYearlyRent={setYearlyRent}
            />
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <AddPictures
              handlePageChangeTwo={handlePageChangeTwo}
              handlePageChangeFour={handlePageChangeFour}
              uploadedImage={uploadedImage}
              uploadedImage2={uploadedImage2}
              uploadedImage3={uploadedImage3}
              uploadedImage4={uploadedImage4}
              uploadedImage5={uploadedImage5}
              uploadedImage6={uploadedImage6}
              uploadedImage7={uploadedImage7}
              uploadedImage8={uploadedImage8}
              uploadedImageCoverPhoto={uploadedImageCoverPhoto}
              setUploadedImage={setUploadedImage}
              setUploadedImage2={setUploadedImage2}
              setUploadedImage3={setUploadedImage3}
              setUploadedImage4={setUploadedImage4}
              setUploadedImage5={setUploadedImage5}
              setUploadedImage6={setUploadedImage6}
              setUploadedImage7={setUploadedImage7}
              setUploadedImage8={setUploadedImage8}
              setUploadedImageCoverPhoto={setUploadedImageCoverPhoto}
            />
          </div>
          <div className={`${activeFour ? "inline" : "hidden"}`}>
            <ContactInfo
              handlePageChangeThree={handlePageChangeThree}
              phoneNumber={phoneNumber}
              email={email}
              whatsapp={whatsapp}
              setEmail={setEmail}
              setWhatsapp={setWhatsapp}
              setPhoneNumber={setPhoneNumber}
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
