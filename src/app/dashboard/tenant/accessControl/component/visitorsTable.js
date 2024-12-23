"use client";
import React, { useState } from "react";
import Button from "../../../components/button";
import Image from "next/image";
import VisitorInfo from "./visitorInfo";


const VisitorsTable = ({ data, openModal ,date, setDate, refetch}) => {
  const [visitorData, setVisitorData] = useState(data || []);
  const [openMiniModal, setOpenModal] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;



    const currentData = data?.results && data?.results.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data && data?.totalCount / ITEMS_PER_PAGE);
  
  // function pageManagement(num) {

  //   // Create a URL object to manage query parameters
  //   const url = new URL(window.location.href);
  //   // Set or update the 'page, email and profile type if they are not empty' query parameter
  //   url.searchParams.set("page", num);
  //   if (email) {
  //     url.searchParams.set("email", email);
  //   }
  //   if (profileType) {
  //     url.searchParams.set("profileType", profileType);
  //   }

  //   // Push the new URL without reloading the page and without scrolling
  //   router.replace(url.toString(), { scroll: false, shallow: true });
  // }
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (Property) => {
    setVisitorData(Property);
    // console.log(Property);
    setOpenModal(true);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );
  const lastThreePagesStart = Math.max(totalPages - 2, 1); // Calculate the starting page number for the last three pages
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );


  return (
    <div className="flex flex-col space-y-7 pb-9">
      {/* <div className={`${property && "hidden"}`}> */}
      <div className=" hidden sm:block">
        <div className="flex sm:justify-between items-center gap-[8px]">
          <div className=" sm:flex gap-2 items-center ">
            <p className="font-[500]">Visitors</p>
            <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
              <span className="text-BlueHomz text-[18px] font-[400]">
                {data?.totalCount || 0}
              </span>
            </span>
          </div>

          {/* <button
            onClick={openMobileModal}
            className="border border-[#006AFF] rounded-[4px] py-[8px] px-[12px] h-[40px] hover:border-blue-600"
          >
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button> */}

          <div className="sm:flex hidden  items-center gap-2">
            <p className="text-[16px] font-[400] text-BlackHomz pt-1">
              Filter by:
            </p>
            <input
              type="date"
              className="border items-center flex text-GrayHomz2 py-[1.5px] px-[10px] rounded cursor-pointer"
              pattern="\d{2}-\d{2}-\d{4}"
              id="date"
              name="date"
              placeholder="Date"
              value={date} 
              onChange={(e)=> setDate(e.target.value)}
            />
            <button className="border border-BlueHomz items-center text-[14px] font-[500] flex text-BlueHomz px-[10px] p-1 rounded cursor-pointer" onClick={refetch}>
              <span>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                  }
                  alt=""
                  height={17}
                  width={16}
                />
              </span>
              Reset
            </button>
          </div>
          <div>
            <button
              className="items-center text-[14px] font-[500] flex bg-[#006AFF] text-white rounded-[4px] cursor-pointer gap-2 px-[12px] py-[8px] h-[37px]"
              onClick={openModal}
            >
              <span>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                  }
                  alt=""
                  height={12}
                  width={16}
                />
              </span>
              Get access code
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-container">
        <div className="w-[100%] md:w-[180%]">
          <div className="border rounded-t-[12px]">
            {/* Header Section */}
            <div className="bg-whiteblue h-[60px] grid sm:grid-cols-9 grid-cols-3 gap-2 font-[500] text-BlackHomz text-[13px] px-2 rounded-t-[12px] pt-4">
              <div className="text-left pl-2">Visitor's Name</div>
              <div className="text-left sm:block hidden">Phone Number</div>
              <div className="text-left sm:block hidden">Purpose of visit</div>
              <div className="text-left sm:block hidden">No of persons</div>
              <div className="text-left sm:block hidden">Date of visit</div>
              <div className="text-left">Access Code</div>
              <div className="text-left">Access Status</div>
              <div className="text-left sm:block hidden">Time in</div>
              <div className="text-left sm:block hidden">Time out</div>
            </div>

            {/* Body Section */}
            <div>
              {currentData &&
                currentData.map((data) => (
                  <div
                    key={data?._id}
                    className="grid sm:grid-cols-9  grid-cols-3 gap-2 items-center border-b-[1px] px-2 h-[60px]"
                  >
                    <div
                      className="sm:text-GrayHomz4 text-[#006AFF] sm:no-underline underline underline-offset-0 font-[500] text-[11px] text-left sm:cursor-default cursor-pointer pl-2"
                      onClick={() => handleRowClick(data)}
                    >
                      <span className="text-[12px]">{data?.visitorName}</span>
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.visitorPhoneNumber}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.purposeOfVisit}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.noOfPersons}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.dateOfVisit || "----"}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left">
                      {data?.accessCode}
                    </div>
                    <div
                      className={`font-[400] text-[11px] text-left  ${
                        data?.accessStatus === "Signed In"
                          ? "text-green-500"
                          : data?.accessStatus === "Pending"
                          ? "text-[#DC6803]"
                          : "text-[#D92D20]"
                      }`}
                    >
                      <span
                        className={` sm:rounded-[8px] sm:py-[4px] sm:px-[8px] py-[8px] px-[12px] sm:h-[25px] h-[44px] ${
                          data?.accessStatus === "Signed In"
                            ? "bg-[#CDEADD]"
                            : data?.accessStatus === "Pending"
                            ? "bg-[#FCF3EB]"
                            : "bg-[#FDF2F2]"
                        }`}
                      >
                        {data?.accessStatus}
                      </span>
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.timeIn || "----"}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.timeOut || "----"}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        lastThreePages={lastThreePages}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
      <VisitorInfo
        Data={visitorData}
        modalIsOpen={openMiniModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default VisitorsTable;
