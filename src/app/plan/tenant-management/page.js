"use client";
import { fetchEstates } from "@/api/estateService";
import useBodyScroll from "@/utils/useBodyScroll";
import Popup from "@/pages/tenantManagementPlan/popUp";
import api from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import { useRouter } from "next/navigation";
import ArrowLeftBlue from "@/components/icons/arrowLeftBlue";

const TenantManagement = () => {
  const [formError, setFormError] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [estate, setEstate] = useState("");
  const [loading, setLoading] = useState(false);
  const [houseAddress, setHouseAddress] = useState("");
  const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
    useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [estatesData, setEstatesData] = useState([])
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const handleSelect = (value) => {
    setInputValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEstates();
        const estate = data.data?.results?.[0].data;
        setEstatesData(estate);
        setLoading(false);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();

    if (fullName === "" || phoneNo === "" || houseAddress === "") {
      return setFormError("Fill in all required fields");
    }

    if (loading) return; // Do nothing if already loading

    setLoading(true);

    // Prepare data to be sent
    const requestData = {
      fullName,
      phoneNumber: parseInt(phoneNo),
      houseAddress,
      estate,
    };

    // Send the data to your API endpoint
    try {
      const response = await api.post("/tenants/createaccount", requestData);

      if (response.data.statuscode === 200 || 201) {
        setSubmitConfirmationVisible(true);
        setLoading(false);
      } else {
        setFormError(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setFormError(error?.response?.data?.message || error?.response?.data?.error?.errors || error?.response?.data?.error);
      setLoading(false);
    }
  }

  // useEffect to handle scrolling
  useBodyScroll([isSubmitConfirmationVisible, loading]);

  return (
    <div className="pt-[64px] relative">
      {isSubmitConfirmationVisible && (
        <div className="absolute top-0 p-8 sm:p-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
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
            <Link href="/dashboard/tenant/dashboard">
              <button className="w-full h-[48px] border rounded-md text-white bg-BlueHomz hover:bg-white hover:text-BlueHomz hover:border-BlueHomz">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="max-w-[1156px] m-auto flex flex-col sm:gap-[60px]">
        <div className="h-[29px]  mt-10 sm:mt-0 flex sm:flex-row gap-4 sm:gap-0 flex-col-reverse  sm:items-center px-8 justify-between">

          <div>
            <p className="text-[23px] font-[700] text-BlackHomz">
              Tenant Registration
            </p>
            <p className="mt-1 text-[16px] font-[400] text-GrayHomz">
              Register as a tenant to  pay rent and request maintenance services in one place.
            </p>
          </div>

          <div onClick={goBack} className="cursor-pointer flex gap-1 items-center">
            <ArrowLeftBlue /> <p className="text-BlueHomz4 text-[16px] font-[400]">Change Profile</p>
          </div>
        </div>
        <div className="w-full h-[320px] m-auto">
          <div className="max-w-[1156px] sm:px-8 m-auto">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:bg-inputBg rounded-[12px] p-8 sm:pr-6 sm:pl-8">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  className="text-GrayHomz border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                  onChange={(e) => {
                    setFullName(e.target.value)
                    setFormError('')
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Home Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your house address"
                  value={houseAddress}
                  className="text-GrayHomz border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                  onChange={(e) => {
                    setHouseAddress(e.target.value)
                    setFormError('')
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Property
                </label>

                <div
                  onClick={() => setShowPopup(true)}
                  className="w-full flex justify-between items-center cursor-pointer border px-4 h-[45px] rounded-md"
                >
                  <div className="text-GrayHomz text-[13px] font-[400]">
                    {inputValue
                      ? inputValue
                      : "Select property"}
                  </div>
                  <div
                    className={`w-5 h-5 p-1 ${showPopup ? "transform rotate-180" : ""
                      }`}
                  >
                    <Image
                      src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                      height={16}
                      width={16}
                      alt=""
                    />
                  </div>
                </div>
                {showPopup && (
                  <Popup
                    onClose={() => setShowPopup(false)}
                    onSelect={handleSelect}
                    setEstate={setEstate}
                    estateData={estatesData}
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  value={phoneNo}
                  className="text-GrayHomz border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                  onChange={(e) => {
                    setPhoneNo(e.target.value)
                    setFormError('')
                  }}
                />
              </div>
              {formError && (
                <span className="text-red-500 text-[14px] mt-[-20px] font-[400]">
                  {formError}
                </span>
              )}
            </form>
            <div className="w-[100%] px-8 sm:px-0 sm:mt-16">
              <Link
                href={"/dashboard/enterprise-property/dashboard"}
                className="max-w-[1156px] mt-[40px] m-auto"
              >
                <button
                  onClick={handleSubmit}
                  type="text"
                  className={`w-full rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz ${loading ? "pointer-events-none w-full flex justify-center" : ""}`}
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

export default TenantManagement;
