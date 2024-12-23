import React from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";

const VisitorInfo = ({ Data, modalIsOpen, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(!modalIsOpen);
  };

  return (
  
    <CustomizedModal isOpen={modalIsOpen}>
    <div className="sm:hidden bg-white border grid w-[360px] py-[24px] px-[16px] rounded-[12px] gap-[18px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-BlueHomz text-[14px] leading-[21px] font-[500] mb-2 pt-2">
          Access Request Information
        </p>
        <div>
          <button onClick={closeModal} className="cursor-pointer">
            <Image
              src="/static/images/close-square.svg"
              height={24}
              width={24}
              alt=""
            />
          </button>
        </div>
      </div>
  
      {/* Content */}
      <div className="w-[320px] p-[16px] grid grid-cols-1 gap-y-6 rounded-[12px] bg-[#F6F6F6]">
        {/* Visitor's Name */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Visitor’s Name</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.visitorName}
          </p>
        </div>
  
        {/* Phone Number */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Phone Number</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.visitorPhoneNumber}
          </p>
        </div>
  
        {/* Purpose */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Purpose</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.purposeOfVisit}
          </p>
        </div>
  
        {/* No of Visitors */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">No of visitors</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.noOfPersons}
          </p>
        </div>
  
        {/* Date of Visit */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Date of visit</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.dateOfVisit || "----"}
          </p>
        </div>
  
        {/* Access Code */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Access Code</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.accessCode || "N/A"}
          </p>
        </div>
  
        {/* Access Status */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Access Status</p>
          <span
            className={`font-[400] text-[11px] ${
              Data?.accessStatus === "Signed In"
                ? "text-green-500"
                : Data?.accessStatus === "Pending"
                ? "text-[#DC6803]"
                : "text-[#D92D20]"
            }`}
          >
            <span
              className={`sm:rounded-[8px] sm:py-[4px] sm:px-[8px] py-[8px] px-[12px] sm:h-[25px] h-[44px] ${
                Data?.accessStatus === "Signed In"
                  ? "bg-[#CDEADD]"
                  : Data?.accessStatus === "Pending"
                  ? "bg-[#FCF3EB]"
                  : "bg-[#FDF2F2]"
              }`}
            >
              {Data?.accessStatus}
            </span>
          </span>
        </div>
  
        {/* Time In */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Time In</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.timeIn || "----"}
          </p>
        </div>
  
        {/* Time Out */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Time Out</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.timeOut || "----"}
          </p>
        </div>
      </div>
    </div>
  </CustomizedModal>
  
  );
};

export default VisitorInfo;
