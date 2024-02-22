"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenuTwo from "../components/popUpMenuTwo";
import Button from "../../components/button";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import addCommasToNumber from "@/utils/addCommasToNumber";
import useClickOutside from "@/utils/clickOutside";

const TenantsTwo = ({ data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));

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
        <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz  px-4 rounded-t-[12px]">
          <div className="w-[15%] ">Tenant</div>
          <div className="w-[10%] ">Property</div>
          <div className="w-[11%] ">Apartment No</div>
          <div className="w-[11%] ">Address</div>
          <div className="w-[10%] ">Email</div>
          <div className="w-[10%] pl-1">Phone No</div>
          <div className="w-[7%] pl-1">Rent</div>
          <div className="w-[13%] pl-1">Status</div>
          <div className="w-[10%] ">Due Date</div>
          <div className="w-[3%] "></div>
        </div>

        <div className="">
          {currentData &&
            currentData?.map((data) => (
              <div
                key={data.id}
                className="border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
              >
                {/* Apply the same styles as the header to each column in the body */}
                <div className="flex items-center gap-1 text-GrayHomz4 font-[500] text-[11px] w-[15%]">
                {!data?.coverPhoto?.url ? (
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                      }
                      alt=""
                      width={30}
                      height={30}
                      className=""
                    />
                  ) : (
                    <Image
                      src={data?.coverPhoto?.url}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-[100%]"
                    />
                  )}
                  <span className="">{data?.fullName}</span>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
                  {data?.estateId?.name}
                </div>
                <div className="text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                  {data?.rentInfo?.apartmentNumber}
                </div>
                <div className="text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                  {data?.estateId?.address}
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start pl-1 pr-2">
                  <span className="break-words">{data?.user?.email}</span>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start ">
                  {data?.phoneNumber}
                </div>
                <div className="text-GrayHomz w-[7%] font-[500] text-[11px] text-start ">
                  {addCommasToNumber(data?.rentInfo?.rent)}
                </div>
                <div
                  className={`text-GrayHomz w-[13%] font-[500] text-[11px] text-start`}
                >
                  <div className={`rounded-md w-[80px] h-[25px] flex items-center justify-center ${data?.rentInfo?.paymentStatus === "paid" ? "bg-successBg text-Success" : ""
                    } ${data?.rentInfo?.paymentStatus === "pending" ? "bg-warningBg text-warning2" : ""} ${data?.rentInfo?.paymentStatus === "over due" ? "bg-error text-white" : ""
                    }`}>
                    {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                  </div>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
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
