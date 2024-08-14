"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenuTwo from "../components/popUpMenuTwo";
import Button from "../../components/button";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import addCommasToNumber from "@/utils/addCommasToNumber";
import useClickOutside from "@/utils/clickOutside";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import truncateText from "@/utils/truncateText";

const TenantsTwo = ({ data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = data?.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );


  return (
    <div className="mt-6">
      <div className=" border w-full rounded-t-[12px]">
        <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-between md:justify-center gap-2 font-[500] text-BlackHomz  px-4 rounded-t-[12px]">
          <div className="md:w-[15%] ">Tenant</div>
          <div className="md:w-[10%]  hidden md:table-cell">Property</div>
          <div className="md:w-[11%]  hidden md:table-cell">Apartment No</div>
          <div className="md:w-[11%]  hidden md:table-cell">Address</div>
          <div className="md:w-[10%]  hidden md:table-cell">Email</div>
          <div className="md:w-[10%] pl-1 hidden md:table-cell">Phone No</div>
          <div className="md:w-[7%] pl-1 hidden md:table-cell">Rent</div>
          <div className="md:w-[13%] pl-1">Status</div>
          <div className="md:w-[10%] hidden md:table-cell ">Due Date</div>
          <div className="w-[3%] "></div>
        </div>

        <div className="">
          {currentData &&
            currentData?.map((data) => (
              <div
                key={data._id}
                className="border-b-[1px] items-center flex justify-between md:justify-center w-full gap-2 px-4 h-[60px]"
              >
                {/* Apply the same styles as the header to each column in the body */}
                <div className="flex items-center gap-1 text-GrayHomz4 font-[500] text-[11px] w-[50%] md:w-[15%]">
                  {!data?.coverPhoto?.url ? (
                    <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                      <EmptyAvatar />
                    </div>
                  ) : (
                    <Image
                      src={data?.coverPhoto?.url}
                      alt=""
                      width={40}
                      height={40}
                      layout="full" // Specify the desired height
                      objectFit="cover"
                      objectPosition="center"
                      className="object-cover bg-center h-[40px] rounded-full"
                      priority
                    />
                  )}
                  <span className="break-words">{data?.fullName}</span>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start hidden md:table-cell">
                  {data?.estateId?.name}
                </div>
                <div className="text-GrayHomz w-[11%] font-[500] text-[11px] text-start hidden md:table-cell">
                  {data?.rentInfo?.apartmentNumber}
                </div>
                <div className="text-GrayHomz w-[11%] font-[500] text-[11px] text-start hidden md:table-cell">
                  <div
                    onMouseEnter={() => handleMouseEnter(data?._id)}
                    onMouseLeave={handleMouseLeave}
                    className="max-w-[100px] relative">
                    {truncateText(data?.estateId?.address, 30)}
                    {hoveredRow === data?._id && (
                      <span className="absolute bg-black text-white text-[10px] rounded p-1 z-10 top-full left-0 max-w-xs w-max">
                        {data?.estateId?.address}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start pl-1 pr-2 hidden md:table-cell">
                  <span className="break-words">{truncateText(data?.user?.email, 35)}</span>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start hidden md:table-cell ">
                  {data?.phoneNumber}
                </div>
                <div className="text-GrayHomz w-[7%] font-[500] text-[11px] text-start  hidden md:table-cell">
                  {addCommasToNumber(data?.rentInfo?.rent)}
                </div>
                <div
                  className={`text-GrayHomz w-[50%] md:w-[13%] font-[500] text-[11px] text-start`}
                >
                  <div className={`rounded-md w-[80px] h-[25px] flex items-center justify-center ${data?.rentInfo?.paymentStatus === "paid" ? "bg-successBg text-Success" : ""
                    } ${data?.rentInfo?.paymentStatus === "pending" ? "bg-warningBg text-warning2" : ""} ${data?.rentInfo?.paymentStatus === "over due" ? "bg-error text-white" : ""
                    }`}>
                    {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                  </div>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start hidden md:table-cell">
                  {changeBackendDateFormat(data?.rentInfo?.dueDate)}
                </div>
                <div className="relative w-[3%]">
                  <button onClick={() => handleToggleMenu(data._id)}>
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                      }
                      alt=""
                      height={21}
                      width={20}
                      style={{ height: "auto", width: "auto" }}
                    />
                  </button>
                  {popUpMenuTwo && selectedDataId === data._id && (
                    <PopUpMenuTwo dropdownRef={dropdownRef} data={data} />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default TenantsTwo;
