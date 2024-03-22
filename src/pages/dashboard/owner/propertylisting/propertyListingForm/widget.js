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
import lowerCaseData from "@/utils/lowerCaseData.js";

const Widget = ({ returnToStartRegistration, fetchData }) => {
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
  const [toilet, setToilets] = useState(null)

  // addphotos
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [uploadedImage4, setUploadedImage4] = useState(null);
  const [uploadedImage5, setUploadedImage5] = useState(null);
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
  console.log(monthlyRent);
  console.log(yearlyRent);
  console.log(totalFee);
  console.log(maintenanceFee);
  console.log(agencyFee);
  console.log(email);
  console.log(whatsapp);
  console.log(phoneNumber);
  console.log(toilet);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    const formData = new FormData();
    formData.append("area", selectedArea?.label);
    formData.append("state", selectedState?.label);
    formData.append("propertyType", lowerCaseData(propertyType?.label));
    formData.append("numberOfRooms", parseInt(numberOfRooms?.label));
    formData.append("numberOfBathrooms", parseInt(numberOfBathrooms?.label));
    formData.append("address", address);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("coverPhoto", uploadedImageCoverPhoto);
    formData.append("photos", uploadedImage);
    formData.append("photos", uploadedImage2);
    formData.append("photos", uploadedImage3);
    formData.append("photos", uploadedImage4);
    formData.append("photos", uploadedImage5);
    formData.append("monthlyRent", Number(monthlyRent));
    formData.append("yearlyRent", Number(yearlyRent));
    formData.append("totalFee", Number(totalFee));
    formData.append("maintenanceFee", Number(maintenanceFee));
    formData.append("agencyFee", Number(agencyFee));
    formData.append("email", email);
    formData.append("phoneNumber", parseInt(phoneNumber));
    formData.append("whatsapp", whatsapp);
    formData.append("numberOfToilets", parseInt(toilet?.label));
    try {
      const response = await api.post("/properties/create/property-owner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // add other headers as needed
        },
      });

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        // toast.success("form successfully uploaded");
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
        setMonthlyRent("");
        setYearlyRent("");
        setTotalFee("");
        setMaintenanceFee("");
        setAgencyFee("");
        setEmail("");
        setWhatsapp("");
        setPhoneNumber("");
        setOpenConfirmationModal(!openConfirmationModal);
        setToilets(null)
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
        console.log(error);
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
    fetchData()
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
      <div className=" w-full h-auto py-4">
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
                className={`flex flex-col p-2 items-center justify-center ${activeTwo
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
                  }`}

              >
                <div
                  className={`rounded-full w-[1px] h-[1px] bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
                ></div>
              </div>
              <p className="text-[14px] font-400">Rent Details</p>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col p-2 items-center justify-center ${activeThree
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
                className={`flex flex-col p-2 items-center justify-center ${activeFour
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
                  }`}

              >
                <div
                  className={`rounded-full w-[1px] h-[1px]  bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
                ></div>
              </div>
              <p className="text-[14px] font-400">Contact Information</p>
            </div>
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
              setToilets={setToilets}
              toilet={toilet}
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
              uploadedImageCoverPhoto={uploadedImageCoverPhoto}
              setUploadedImage={setUploadedImage}
              setUploadedImage2={setUploadedImage2}
              setUploadedImage3={setUploadedImage3}
              setUploadedImage4={setUploadedImage4}
              setUploadedImage5={setUploadedImage5}
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
