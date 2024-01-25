"use client";
import Loading from "@/components/mainmenu/loading";
import api from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TenantManagement = () => {
  const [formError, setFormError] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [estate, setEstate] = useState("");
  const [loading, setLoading] = useState(false);
  const [houseAddress, setHouseAddress] = useState("");
  const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
    useState(false);

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
      phoneNumber: phoneNo,
      houseAddress,
      estate,
    };

    // Send the data to your API endpoint
    try {
      const response = await api.post("/tenants/createaccount", requestData);

      if (response.data.statuscode === 200 || 201) {
        setSubmitConfirmationVisible(true);
        setLoading(false);
        console.log("form successfully filled ", response.data);
      } else {
        setFormError(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setFormError(error.response?.data?.message);
      setLoading(false);
    }
  }

  // useEffect to handle scrolling
  useEffect(
    () => {
      document.body.style.overflow = isSubmitConfirmationVisible
        ? "hidden"
        : "auto";
      if (isSubmitConfirmationVisible) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    },
    [isSubmitConfirmationVisible],
    loading
  );

  return (
    <div className="pt-[64px] relative">
      {loading && <Loading />}
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
      <div className="max-w-[1156px] m-auto flex flex-col gap-[80px]">
        <div className="h-[29px]  mt-10 sm:mt-0 flex sm:flex-row gap-4 sm:gap-0 flex-col-reverse  sm:items-center p-7 justify-between">
          <p className="text-[23px] font-[700] text-BlackHomz">
            Tenant Management Registration
          </p>
          <Link href={"/select-plan"}>
            <Image src={"/Link.png"} alt="img" height={24} width={132} />
          </Link>
        </div>
        <div className="w-full h-[320px] m-auto">
          <div className="max-w-[1156px] m-auto">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-8 sm:pr-6 sm:pl-8">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setFullName(e.target.value)}
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
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setHouseAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Property
                </label>
                <input
                  type="text"
                  placeholder="Enter the name of property"
                  value={estate}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setEstate(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Phone Number
                </label>
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  value={phoneNo}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              {formError && (
                <span className="text-red-500 text-[14px] font-[400]">
                  {formError}
                </span>
              )}
            </form>
            <div className="w-[100%] mt-16 p-6">
              <Link
                href={"/dashboard/enterprise-property/dashboard"}
                className="max-w-[1156px] mt-[40px] m-auto"
              >
                <button
                  onClick={handleSubmit}
                  className="w-full ml-1 rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz"
                >
                  Create Account
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
