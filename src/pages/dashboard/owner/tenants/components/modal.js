"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Modal = ({setInviteTenant}) => {
  const [dropdowns, setDropdowns] = useState({
    estateOptions: false,
  });
  const [selectedOptions, setSelectedOptions] = useState({
    estate: null,
  });
  const [showLinkBox, setShowLinkBox] = useState(false);
  const [copied, setCopied] = useState(false);

  const estateOptions = [
    { id: 1, label: "Heaven Estate Lekki", link: "https://heaven.com/estate1" },
    { id: 2, label: "Ipaja Estate", link: "https://ipaja.com/estate2" },
    { id: 3, label: "Diamond Estate", link: "https://diamond.com/estate3" },
    { id: 4, label: "Ajao Estate", link: "https://ajao.com/estate4" },
  ];

  const handleDropdownClick = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleGetLink = (dropdown) => {
    if (selectedOptions.estate === null) {
      return setDropdowns((prev) => ({
        ...prev,
        [dropdown]: !prev[dropdown],
      }));
    } else {
      setShowLinkBox(true);
    }
  };

  const handleDropdown = (option) => {
    setDropdowns((prev) => ({
      ...prev,
      estateOptions: false,
    }));
    setSelectedOptions((prev) => ({
      ...prev,
      estate: option,
    }));
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(selectedOptions.estate?.link);
      setCopied(true);
    } catch (error) {
      // console.error("Unable to copy to clipboard:", error);
    }
  };
  const returnHome = () => {
    setInviteTenant(false);
  
  }

  return (
    <div className="max-w-[591px] px-[28px] py-[36px] h-auto bg-white rounded-[12px]">
      {copied ? (
        <div className="max-w-[464px] m-auto">
          <div className="w-[464px] px-8 flex flex-col justify-center items-center gap-5">
            <Image src={"/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"} alt="" height={48} width={48}/>
            <h1 className="text-BlackHomz font-[700] text-[20px]">
              Link Copied
            </h1>
            <button onClick={returnHome} className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]">
              Close
            </button>
          </div>
        </div>
      ) : (

        <div className="">
        <div className="w-[590px]">
          <h1 className="font-[700] text-[20px] text-BlackHomz">
            Invite Tenants
          </h1>
          <p className="text-[13px] pt-2 font-[400] text-GrayHomz">
            Copy and share your unique link to invite your Tenants to your
            properties.
          </p>
          <p
            className={`font-[400] pt-6 text-[13px] text-BlackHomz  ${
              showLinkBox ? "hidden" : ""
            }`}
          >
            Select the property you’re inviting your Tenant(s) to
          </p>
        </div>
        <div className="relative inline-block w-full">
          <div
            className={`text-BlackHomz px-4 border h-[48px] mt-2 mb-1 p-3 rounded-md cursor-pointer ${
              dropdowns["estateOptions"] ? "border" : ""
            }  ${showLinkBox ? "hidden" : ""}`}
            onClick={() => handleDropdownClick("estateOptions")}
          >
            <div
              className={`flex text-[14px] font-[500] text-GrayHomz2 justify-between items-center `}
            >
              <span className="mr-2">
                {selectedOptions.estate?.label || "Select Property"}
              </span>
              <div
                className={`w-5 h-5 ${
                  dropdowns["propertyOptions"]
                    ? "transform rotate-180 transition duration-300 ease-in-out"
                    : ""
                  }`}
                  >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                  }
                  height={16}
                  width={16}
                  alt=""
                  />
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-1 mt-4  ${
              showLinkBox ? "hidden" : ""
            }`}
            >
            <p className="text-[14px] font-[400] text-GrayHomz">
              Yet to add a property?{" "}
            </p>
            <Link href={""} className="text-BlueHomz text-[14px]  font-[700]">
              Add New Property
            </Link>
          </div>
          {dropdowns["estateOptions"] && (
            <div className="absolute top-14 w-full text-GrayHomz2 text-[14px]   bg-white rounded-md shadow-md">
              {estateOptions.map((option) => (
                <div
                  key={option.id}
                  className="p-2  cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                  onClick={() => handleDropdown(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => handleGetLink("estateOptions")}
            className={`mt-4 border rounded-md w-full h-[48px] py-[8px] px-4 text-white bg-BlueHomz text-[16px] font-[700] ${
              showLinkBox ? "hidden" : ""
            }`}
          >
            Get Link
          </button>
        </div>
        {showLinkBox && (
          <div className="mt-[-15px] rounded-md">
            <div className="flex border justify-between h-[48px] bg-whiteblue rounded-md p-2 items-center mb-2">
              <span className="mr-2 text-GrayHomz2 text-[14px] font-[500]">
                {selectedOptions.estate?.link}
              </span>
              <span onClick={handleCopyClick}>
                {" "}
                <Image
                  src={"/static/dashboard/enterprisemanager/dashboard/copy.png"}
                  height={16}
                  width={16}
                  alt=""
                />
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleCopyClick}
                className="mt-4 border rounded-md w-full h-[48px] py-[8px] px-4 text-white bg-BlueHomz text-[16px] font-[700]"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    )}
    </div>
  );
};

export default Modal;
