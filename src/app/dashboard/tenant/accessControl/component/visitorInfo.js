import React, { useState } from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";
import { useEffect } from "react";

const VisitorInfo = ({ Data, modalIsOpen, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(!modalIsOpen);
  };
  return (
    // <CustomizedModal isOpen={modalIsOpen}>
    //   <div className="bg-white border flex flex-col w-[350px] h-fit p-[28px] rounded-[12px] gap-[18px]">
    //     <div className=" flex items-center justify-between">
    //       <p className="text-BlueHomz text-[14px] leading-[21px] font-[500] mb-2 pt-2">
    //         Tenant Information
    //       </p>

    //       <div>
    //         <button onClick={closeModal} className="cursor-pointer">
    //           <Image
    //             src="/static/images/close-square.svg"
    //             height={24}
    //             width={24}
    //             alt=""
    //           />
    //         </button>
    //       </div>
    //     </div>
    //     <div className="w-full h-full py-[28px]  px-[50px] grid grid-cols-2 rounded-[12px] bg-[#F6F6F6] ">
    //       <div className="bg-[#F6F6F6] h-full grid grid-rows gap-[16px] font-[500] text-BlackHomz text-[13px] px-2 rounded-t-[12px] pt-4">
    //         <div className="text-center">Visitor's Name</div>
    //         <div className="text-center">Phone Number</div>
    //         <div className="text-center">Purpose of visit</div>
    //         <div className="text-center">No of persons</div>
    //         <div className="text-center">Date of visit</div>
    //         <div className="text-center">Access Code</div>
    //         <div className="text-center">Access Status</div>
    //         <div className="text-center">Time in</div>
    //         <div className="text-center">Time out</div>
    //       </div>

    //       <div>

    //             <div

    //               className="grid grid-rows gap-[16px] items-center border-b-[1px] px-2 h-full"
    //             >
    //               <div className="sm:text-GrayHomz4 text-[#006AFF] sm:no-underline underline underline-offset-0 font-[500] text-[11px] text-center sm:cursor-default cursor-pointer">
    //                 <span className="text-[12px]">{Data?.VisitorName}</span>
    //               </div>
    //               <div className="text-GrayHomz font-[500] text-[11px] text-center ">
    //                 {Data?.Phone_Number}
    //               </div>
    //               <div className="text-GrayHomz font-[500] text-[11px] text-center ">
    //                 {Data?.PurposeOfVisit}
    //               </div>
    //               <div className="text-GrayHomz font-[500] text-[11px] text-center ">
    //                 {Data?.No_Of_Persons}
    //               </div>
    //               <div className="text-GrayHomz font-[500] text-[11px] text-center ">
    //                 {Data?.DateOfVisit}
    //               </div>
    //               <div className="text-GrayHomz font-[500] text-[11px] text-center">
    //                 {Data?.AccessCode}
    //               </div>
    //               <div
    //                 className={`font-[400] text-[11px] text-center  ${
    //                   Data?.AccessStatus === "Signed In"
    //                     ? "text-green-500"
    //                     : Data?.AccessStatus === "Pending"
    //                     ? "text-[#DC6803]"
    //                     : "text-[#D92D20]"
    //                 }`}
    //               >
    //                 <span
    //                   className={` sm:rounded-[8px] sm:py-[4px] sm:px-[8px] py-[8px] px-[12px] sm:h-[25px] h-[44px] ${
    //                     Data?.AccessStatus === "Signed In"
    //                       ? "bg-[#CDEADD]"
    //                       : Data?.AccessStatus === "Pending"
    //                       ? "bg-[#FCF3EB]"
    //                       : "bg-[#FDF2F2]"
    //                   }`}
    //                 >
    //                   {Data?.AccessStatus}
    //                 </span>
    //               </div>
    //               <div className="text-GrayHomz font-[500] text-[11px] text-center ">
    //                 {Data?.TimeIn}
    //               </div>
    //               <div className="text-GrayHomz font-[500] text-[11px] text-center ">
    //                 {Data?.Time_Out}
    //               </div>
    //             </div>

    //       </div>
    //     </div>
    //   </div>
    // </CustomizedModal>
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
            {Data?.VisitorName}
          </p>
        </div>
  
        {/* Phone Number */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Phone Number</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.Phone_Number}
          </p>
        </div>
  
        {/* Purpose */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Purpose</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.PurposeOfVisit}
          </p>
        </div>
  
        {/* No of Visitors */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">No of visitors</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.No_Of_Persons}
          </p>
        </div>
  
        {/* Date of Visit */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Date of visit</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.DateOfVisit}
          </p>
        </div>
  
        {/* Access Code */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Access Code</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data?.AccessCode}
          </p>
        </div>
  
        {/* Access Status */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Access Status</p>
          <span
            className={`font-[400] text-[11px] ${
              Data?.AccessStatus === "Signed In"
                ? "text-green-500"
                : Data?.AccessStatus === "Pending"
                ? "text-[#DC6803]"
                : "text-[#D92D20]"
            }`}
          >
            <span
              className={`sm:rounded-[8px] sm:py-[4px] sm:px-[8px] py-[8px] px-[12px] sm:h-[25px] h-[44px] ${
                Data?.AccessStatus === "Signed In"
                  ? "bg-[#CDEADD]"
                  : Data?.AccessStatus === "Pending"
                  ? "bg-[#FCF3EB]"
                  : "bg-[#FDF2F2]"
              }`}
            >
              {Data?.AccessStatus}
            </span>
          </span>
        </div>
  
        {/* Time In */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Time In</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data.TimeIn}
          </p>
        </div>
  
        {/* Time Out */}
        <div className="grid grid-cols-2 items-center">
          <p className="text-[11px] leading-[13.86px] font-[400]">Time Out</p>
          <p className="text-[11px] leading-[13.86px] font-[400] text-left">
            {Data.Time_Out}
          </p>
        </div>
      </div>
    </div>
  </CustomizedModal>
  
  );
};

export default VisitorInfo;
