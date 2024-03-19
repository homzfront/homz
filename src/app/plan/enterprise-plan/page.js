"use client";
import useBodyScroll from "@/utils/useBodyScroll";
import api from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LoadingForm from "@/components/mainmenu/loadingForm";
import { useRouter } from "next/navigation";

const EnterprisePlan = () => {
  const [formError, setFormError] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
    useState(false);
  const [loading, setLoading] = useState(false); // Loading state;
  useBodyScroll([loading, isSubmitConfirmationVisible]);
  const router = useRouter()

  const data = {
    fullName,
    phoneNumber: parseInt(phoneNo),
    businessName,
  }


  const handleClick = () => {
    if (
      fullName === "" ||
      phoneNo === ""
    ) {
      return setFormError("Fill in all required fields");
    }
    // Save collected data to Zustand store
    if (typeof window !== 'undefined') {
      localStorage.setItem('enterData', JSON.stringify(data));
    }
    router.push("/plan/pricing")
  };


  async function handleSubmit(e) {
    e.preventDefault();

    if (
      fullName === "" ||
      phoneNo === ""
    ) {
      return setFormError("Fill in all required fields");
    }

    if (loading) return; // Do nothing if already loading

    setLoading(true);

    // Prepare data to be sent
    const requestData = {
      fullName,
      phoneNumber: phoneNo,
      businessName, // Using the email from the user context
    };

    // Send the data to your API endpoint
    try {
      const response = await api.post(
        "/enterprisePlan/createaccount/freeTrial",
        requestData
      );

      if (response.data.statuscode === 200 || 201) {
        setSubmitConfirmationVisible(true);
        console.log("form successfully filled ", response.data);
        setLoading(false);
      } else {
        setFormError(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      console.log(error.response?.data?.error)
      setFormError(error?.response?.data?.message || error?.response?.data?.error?.errors || error?.response?.data?.error);
      setLoading(false);
    }
  }



  return (
    <div className="pt-[64px] relative">
      {isSubmitConfirmationVisible && (
        <div className="absolute top-0 p-8 sm:p-0 z-20 h-screen md:h-[700px] w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
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
            <Link href="/dashboard/enterprise-property/dashboard">
              <button className="w-full h-[48px] border rounded-md text-white bg-BlueHomz hover:bg-white hover:text-BlueHomz hover:border-BlueHomz">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="max-w-[1156px] m-auto flex flex-col sm:gap-[50px]">
        <div className="sm:h-[29px]  sm:mt-0 flex sm:flex-row gap-4 sm:gap-0 flex-col-reverse  sm:items-center px-8 justify-between">
          <div>
            <p className="text-[23px] font-[700] text-BlackHomz">
              Property Manager Registration
            </p>
            <p className="mt-1 text-[16px] font-[400] text-GrayHomz">
              Register as a property manager to manage properties & tenants with our intuitive dashboard.
            </p>
          </div>
          <Link href={"/select-plan"}>
            <Image src={"/Link.png"} alt="img" height={24} width={132} />
          </Link>
        </div>
        <div className="w-full h-[320px] m-auto">
          <div className="max-w-[1156px] sm:px-8 m-auto">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8 sm:bg-inputBg rounded-[12px] sm:pr-6 sm:pl-8">
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
                  Business Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your business name"
                  value={businessName}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px] bg-transparent "
                  onChange={(e) => {
                    setBusinessName(e.target.value)
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
              </div>
              <div>

              </div>
              {formError && (
                <p className="text-[14px] font-[400] text-red-500">
                  {formError}
                </p>
              )}
            </form>
            <div className="w-[100%] px-8 sm:px-0 sm:mt-12">
              <div
                className={`max-w-[1156px] mt-[40px] m-auto`}              >
                <button onClick={handleClick} className="hidden sm:block w-full ml-1 text-[16px] font-[500] rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz">
                  Choose a paid plan to enjoy more features
                </button>
                <button onClick={handleClick} className="sm:hidden w-full ml-1 text-[16px] font-[700] rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz">
                  Choose a paid plan
                </button>

              </div>
              <Link href={""} className="max-w-[1156px]   m-auto">
                <button
                  onClick={handleSubmit}
                  className={`w-full ml-1 mt-4 text-[16px] font-[500] rounded-md h-[48px] border text-BlackHomz border-BlueHomz bg-white hover:bg-BlueHomz hover:text-white ${loading ? "pointer-events-none w-full flex justify-center" : ""} `}
                >
                  {loading ? <LoadingForm /> : "Start 14-day Free Trial"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterprisePlan;
