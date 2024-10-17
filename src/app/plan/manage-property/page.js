"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import SelectState from "@/pages/selectStateAndArea/selectState";
import SelectArea from "@/pages/selectStateAndArea/selectArea";
import useBodyScroll from "@/utils/useBodyScroll";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import { useRouter } from "next/navigation";
import ArrowLeftBlue from "@/components/icons/arrowLeftBlue";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingProlonged from "@/components/general/loadingProlonged";

const ManageProperty = () => {
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [estateDesc, setEstateDesc] = useState("");
  const [numberOfHouses, setNumberOfHouses] = useState("");
  const [estateAddress, setEstateAddress] = useState("");
  const [selectedState, setSelectedState] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);

  const router = useRouter();

  const goBack = () => {
    router.back();
  };


  const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
    useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      fullName === "" ||
      phoneNo === "" ||
      selectedState === "" ||
      selectedArea === "" ||
      estateAddress === "" ||
      numberOfHouses === ""
    ) {
      setLoading(false);
      return setFormError("Fill in all required fields");

    }

    setLoading(true);
    // Prepare data to be sent
    const requestData = {
      fullName,
      phoneNumber: phoneNo,
      propertyDescription: estateDesc,
      address: estateAddress,
      state: selectedState?.label,
      area: selectedArea?.label,
      numberOfHouses: parseInt(numberOfHouses), // Convert to integer if needed
    };

    // Send the data to your API endpoint
    try {
      const response = await api.post(
        "/manageProperty/createProfile",
        requestData
      );

      if (response.data.statuscode === 200 || 201) {
        setSubmitConfirmationVisible(true);
        setLoading(false)
      } else {
        setFormError(response.data.message);
        setLoading(false)
      }
    } catch (error) {
      setFormError(error?.response?.data?.message || error?.response?.data?.error?.errors || error?.response?.data?.error);
      setLoading(false)
    }
  }

  useEffect(() => {
    let timer;

    if (loading) {
      // Set a timer to show the long loading message after 3 seconds
      timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 20000); // 20 seconds
    } else {
      // Reset when loading is false
      setShowLongLoadingMessage(false);
    }

    // Cleanup the timer on component unmount or when loading changes
    return () => clearTimeout(timer);
  }, [loading]);

const closeModal = () => {
  setShowLongLoadingMessage(false);
};

  return (
    <div className="pt-[100px] md:pt-[64px] relative">
      <CustomizedModal isOpen={showLongLoadingMessage}>
        <LoadingProlonged closeModal={closeModal} />
      </CustomizedModal>
      <CustomizedModal isOpen={isSubmitConfirmationVisible}>
        <div className="bg-white p-8 rounded-md">
          <Image
            className="m-auto my-2"
            src={"/Featured icon.png"}
            height={48}
            width={48}
            alt="img"
          />
          <p className="text-center text-[24px] font-[700] text-BlackHomz mb-4">
            Account Created
          </p>
          <p className="text-center text-[14px] sm:text-[16px] text-BlackHomz mb-8">
            Your account has been successfully created.
          </p>
          <Link href="/dashboard/property-owner/dashboard">
            <button className="w-full h-[48px] border rounded-md text-white bg-BlueHomz hover:bg-white hover:text-BlueHomz hover:border-BlueHomz">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </CustomizedModal>
      <div className="max-w-[1156px] m-auto flex flex-col sm:gap-[70px]">
        <div className="sm:h-[29px] sm:mt-0 flex sm:flex-row gap-4 sm:gap-0 flex-col-reverse  sm:items-center px-8 justify-between">
          <div>
            <p className="text-[23px] font-[700] text-BlackHomz">
              Landlord Registration
            </p>
            <p className="mt-1 text-[16px] font-[400] text-GrayHomz">
              Register as a landlord to monitor your properties, tenants & rent payments in one place.
            </p>
          </div>
          <div onClick={goBack} className="cursor-pointer flex gap-1 items-center">
            <ArrowLeftBlue /> <p className="text-BlueHomz4 text-[16px] font-[400]">Change Profile</p>
          </div>
        </div>
        <div className="w-full h-[320px] m-auto">
          <div className="max-w-[1156px] sm:px-8 m-auto">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 sm:bg-inputBg rounded-[12px] sm:pr-6 sm:pl-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                    onChange={(e) => {
                      setFullName(e.target.value)
                      setFormError("")
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your phone number"
                    value={phoneNo}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                    onChange={(e) => {
                      setPhoneNo(e.target.value)
                      setFormError("")
                    }}
                  />
                  <span className="text-[13px] font-[400] text-GrayHomz2">
                    Note: You will receive a confirmation call & email on your
                    property management request.
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Property Description
                  </label>
                  <textarea
                    type="text"
                    placeholder="e.g 5 units of 2 bedroom flats with spacious balconies"
                    value={estateDesc}
                    className="border px-4 py-2 h-[84px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                    onChange={(e) => {
                      setEstateDesc(e.target.value)
                      setFormError("")
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    No. of Apartments in the Property <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the no. of houses in the property"
                    value={numberOfHouses}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                    onChange={(e) => {
                      setNumberOfHouses(e.target.value)
                      setFormError("")
                    }}
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[14px] font-[500] text-BlackHomz">
                      State  <span className="text-red-500">*</span>
                    </label>
                    <SelectState selectedState={selectedState} setSelectedState={setSelectedState} />
                  </div>
                  <div className={`w-full flex flex-col gap-2 ${selectedState === "" ? "pointer-events-none" : ""}`}>
                    <label className="text-[14px] font-[500] text-BlackHomz">
                      Area <span className="text-red-500">*</span>
                    </label>
                    <SelectArea state={selectedState?.value} selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-[500] text-BlackHomz">
                    Street <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the property's address"
                    value={estateAddress}
                    className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                    onChange={(e) => {
                      setEstateAddress(e.target.value)
                      setFormError("")
                    }}
                  />
                </div>

              </div>


              {formError && (
                <p className="text-[14px] font-[400] text-red-500">
                  {formError}
                </p>
              )}
            </form>
            <div className="w-[100%] px-8 sm:px-0 sm:mt-12 mb-8" >
              <Link href={""} className="max-w-[1156px] mt-[40px] m-auto">
                <button
                  onClick={handleSubmit}
                  className={`w-full ml-1 rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz ${loading ? "pointer-events-none w-full flex justify-center" : ""}`}
                >
                  {loading ? <LoadingFormII /> : "Create Account"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProperty;
