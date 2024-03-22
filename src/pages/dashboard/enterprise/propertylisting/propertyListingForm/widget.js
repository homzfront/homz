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
  const [formData, setFormData] = useState({
    area: null,
    state: null,
    name: "",
    address: "",
    propertyType: null,
    numberOfRooms: null,
    numberOfBathrooms: null,
    description: "",
    numberOfToilets: null,
    uploadedImage: null,
    uploadedImage2: null,
    uploadedImage3: null,
    uploadedImage4: null,
    uploadedImage5: null,
    uploadedImageCoverPhoto: null,
    monthlyRent: "",
    maintenanceFee: "",
    totalFee: "",
    agencyFee: "",
    yearlyRent: "",
    phoneNumber: "",
    email: "",
    whatsapp: "",
  });

  console.log(formData)

  const handleChange = (name, value) => {
    if (name === "uploadedImage" || name === "uploadedImage2" || name === "uploadedImage3" || name === "uploadedImage4" || name === "uploadedImage5" || name === "uploadedImageCoverPhoto") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    const formDataToSend = new FormData();
    formDataToSend.append("area", formData?.area?.label);
    formDataToSend.append("state", formData?.state?.label);
    formDataToSend.append("propertyType", lowerCaseData(formData.propertyType?.label));
    formDataToSend.append("numberOfRooms", parseInt(formData.numberOfRooms?.label));
    formDataToSend.append("numberOfBathrooms", parseInt(formData.numberOfBathrooms?.label));
    formDataToSend.append("address", formData.address);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("coverPhoto", formData.uploadedImageCoverPhoto);
    formDataToSend.append("photos", formData.uploadedImage);
    formDataToSend.append("photos", formData.uploadedImage2);
    formDataToSend.append("photos", formData.uploadedImage3);
    formDataToSend.append("photos", formData.uploadedImage4);
    formDataToSend.append("photos", formData.uploadedImage5);
    formDataToSend.append("monthlyRent", Number(formData.monthlyRent));
    formDataToSend.append("yearlyRent", Number(formData.yearlyRent));
    formDataToSend.append("totalFee", Number(formData.totalFee));
    formDataToSend.append("maintenanceFee", Number(formData.maintenanceFee));
    formDataToSend.append("agencyFee", Number(formData.agencyFee));
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", parseInt(formData.phoneNumber));
    formDataToSend.append("whatsapp", formData.whatsapp);
    formDataToSend.append("numberOfToilets", parseInt(formData.numberOfToilets?.label));

    try {
      const response = await api.post("/properties/create/enterprise", formDataToSend, {
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
        setOpenConfirmationModal(!openConfirmationModal);
        setFormData({
          area: null,
          state: null,
          name: "",
          address: "",
          propertyType: null,
          numberOfRooms: null,
          numberOfBathrooms: null,
          description: "",
          numberOfToilets: null,
          uploadedImage: null,
          uploadedImage2: null,
          uploadedImage3: null,
          uploadedImage4: null,
          uploadedImage5: null,
          uploadedImageCoverPhoto: null,
          monthlyRent: "",
          maintenanceFee: "",
          totalFee: "",
          agencyFee: "",
          yearlyRent: "",
          phoneNumber: "",
          email: "",
          whatsapp: "",
        });
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
    fetchData();
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
          <div className="z-10 relative  flex mt-5 gap-4 justify-between px-8  w-full">
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col items-center p-2 justify-center ${!active
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
                className={`flex flex-col p-2 items-center justify-center ${activeTwo
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
                className={`flex flex-col p-2 items-center justify-center ${activeThree
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
                className={`flex flex-col p-2 items-center justify-center ${activeFour
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
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <PropertyInfo
              returnToStartRegistration={returnToStartRegistration}
              handlePageChangeTwo={handlePageChangeTwo}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <RentDetails
              handlePageChangeThree={handlePageChangeThree}
              handlePageChange={handlePageChange}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <AddPictures
              handlePageChangeTwo={handlePageChangeTwo}
              handlePageChangeFour={handlePageChangeFour}
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
            />
          </div>
          <div className={`${activeFour ? "inline" : "hidden"}`}>
            <ContactInfo
              handlePageChangeThree={handlePageChangeThree}
              formData={formData}
              handleChange={handleChange}
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
