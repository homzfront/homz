"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const EnterprisePlan = () => {
  const options = [
    // { id: 1, label: "Property Management" },
    // { id: 2, label: "Property Listing" },
    // { id: 3, label: "Enterprise Solution" },
    // { id: 4, label: "Renter Management" },
    // Add more options as needed
  ];

  const [formData, setFormData] = useState({
    document_options: "Select your preferred estate", // Default value is the first option
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitConfirmationVisible, setSubmitConfirmationVisible] =
    useState(false);

  async function handleSubmit(e) {
    // Show the confirmation box
    setSubmitConfirmationVisible(true);
  }

  const handleDropdownChange = (value) => {
    setFormData({ ...formData, document_options: value });
    setDropdownOpen(false);
  };
  return (
    <div className="pt-[64px] relative">
      {isSubmitConfirmationVisible && (
        <div className="absolute p-8 sm:p-0 z-20 h-screen md:h-[700px] w-full inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-md">
            <Image
              className="m-auto my-2"
              src={"/Featured icon.png"}
              height={48}
              width={48}
            />
            <p className="text-center text-[24px] font-[700] text-BlackHomz mb-4">
              Account Created
            </p>
            <p className="text-center text-[14px] sm:text-[16px] text-BlackHomz mb-8">
              Your account has been successfully created.
            </p>
            <Link href="/dashboard">
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
            Enterprise Plan Registration
          </p>
          <Link href={"/select-plan"}>
            <Image src={"/Link.png"} height={24} width={132} />
          </Link>
        </div>
        <div className="w-full h-[320px] m-auto">
          <div className="max-w-[1156px] m-auto">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-8 sm:pr-6 sm:pl-8">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Business Name 
                </label>
                <input
                  type="text"
                  placeholder="Enter your business name"
                  value={name}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Estate
                </label>
                <div className="relative">
                  <div
                    className={`text-GrayHomz2 px-4 h-[45px]  border text-[14px] w-full rounded-md mb-1 p-2 cursor-pointer  ${
                      isDropdownOpen ? "border" : ""
                    }`}
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="flex justify-between  items-center">
                      <span className="mr-2">{formData.document_options}</span>
                      <svg
                        className={`w-5 h-5 ${
                          isDropdownOpen
                            ? "transform rotate-180 transition duration-300 ease-in-out"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {isDropdownOpen && (
                    <div className=" left-0 mt-2 w-full transition duration-1000  ease-in-out bg-white border rounded shadow-lg">
                      {/* Dropdown Options */}
                      {options.map((option) => (
                        <div
                          key={option.id}
                          placeholder="Select your preferred estate"
                          className="placeholder:text-[14px] cursor-pointer p-2 m-2 hover:rounded-md hover:text-white hover:bg-BlueHomz"
                          onClick={() => handleDropdownChange(option.label)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={name}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  No. of Houses in the Estate
                </label>
                <input
                  type="text"
                  placeholder="Enter the no. of houses in the estate"
                  value={name}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500] text-BlackHomz">
                  Address of Estate
                </label>
                <input
                  type="text"
                  placeholder="Enter the estate's address"
                  value={name}
                  className="border px-4 h-[45px] w-full rounded-md placeholder:text-[14px]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </form>
            <div className="w-[100%] mt-12 p-6">
              <Link href={""} className="max-w-[1156px] mt-[40px] m-auto">
                <button
                  onClick={handleSubmit}
                  className="w-full ml-1 rounded-md h-[48px] border text-white bg-BlueHomz hover:bg-white hover:border-BlueHomz hover:text-BlueHomz"
                >
                  Start 14-day Free Trial
                </button>
              </Link>
              <Link href={"/plan/pricing"} className="max-w-[1156px] m-auto">
                <button
                  
                  className="w-full ml-1 mt-4 rounded-md h-[48px] border text-BlueHomz border-BlueHomz bg-white hover:bg-BlueHomz hover:text-white "
                >
                  Choose a paid plan to enjoy more features
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
