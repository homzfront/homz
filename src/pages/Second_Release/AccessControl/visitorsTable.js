"use client";
import React, { useState } from "react";
import Button from "./component/button";
import Image from "next/image";

const VisitorsTable = ({ Data, openModal }) => {
  const [data, setData] = useState(Data || {});
  const [addNewVisitor, setAddNewVisitor] = useState(false);
  const [property, setProperty] = useState(false);

  //  console.log(openModal);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

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
    setData(Property);
    setProperty(!property);
    
    // router.push(`/second_release/Property/${Property.id}`);

    // console.log(Property);
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
      <div className="">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center ">
            <p className="font-[500]">Visitors</p>
            <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
              <span className="text-BlueHomz text-[18px] font-[400]">
                {data.length}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[16px] font-[400] text-BlackHomz pt-1">
              Filter by:
            </p>
            <input
              type="date"
              className="adminBorders items-center flex text-GrayHomz2 py-[1.5px] px-[10px] rounded cursor-pointer"
              pattern="\d{2}-\d{2}-\d{4}"
              id="date"
              name="date"
              placeholder="Date"
            />
            <button className="adminBorders border-BlueHomz items-center text-[14px] font-[500] flex text-BlueHomz px-[10px] p-1 rounded cursor-pointer">
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
              className="adminBord items-center text-[14px] font-[500] flex bg-[#006AFF] text-white px-[10px] p-1 rounded cursor-pointer gap-2"
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
      <table className="border w-full">
        <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz w-full text-center md:text-left h-[50px]">
          <tr>
            <th className="md:w-[123.11px] h-[48px] pr-[16px] pl-[16px] py-[14px]">
              Visitor's Name
            </th>
            <th className="hidden md:table-cell md:w-[123.11px] h-[48px] px-[16px] py-[14px]">
              Phone Number
            </th>
            <th className="hidden md:table-cell md:w-[123.11px] h-[48px] px-[16px] py-[14px]">
              Purpose of visit
            </th>
            <th className="hidden md:table-cell md:w-[112.11px] h-[48px] px-[16px] py-[14px]">
              No of persons
            </th>
            <th className="md:w-[123.11px] h-[48px] px-[8px] py-[14px]">
              Date of visit
            </th>
            <th className="hidden md:table-cell md:w-[123.11px] h-[48px] px-[16px] py-[14px]">
              Access Code
            </th>
            <th className="md:w-[104.11px] h-[48px] px-[8px] py-[14px]">
              Access Status
            </th>
            <th className="hidden md:table-cell md:w-[100.89px] h-[48px] px-[16px] py-[14px]">
              Time in
            </th>
            <th className="hidden md:table-cell md:w-[100.89px] h-[48px] px-[16px] py-[14px]">
              Time out
            </th>
          </tr>
        </thead>
        <tbody className="">
          {currentData.map((data, index) => (
            <tr key={index} className="pl-3 cursor-pointer">
              <td
                className=" text-GrayHomz4 font-[500] text-[11px]  md:w-[122.89px] py-[12px] px-[16px] h-[64px]"
                onClick={() => handleRowClick(data)}
              >
                <span className="text-[12px]">{data.Name}</span>
              </td>
              <td
                className={`text-GrayHomz font-[500] text-[12px] break-words  md:w-[122.89px] py-[12px] px-[16px] h-[64px] ${
                  "hidden md:table-cell" // Hide on mobile
                }`}
                onClick={() => handleRowClick(data)}
              >
                {data.Phone_Number}
              </td>
              <td
                className={`text-GrayHomz font-[500] text-[12px]  md:w-[122.89px] py-[12px] pl-[16px] pr-[12px] h-[64px] ${
                  "hidden md:table-cell" // Hide on mobile
                }`}
                onClick={() => handleRowClick(data)}
              >
                {data.PurposeOfVisit}
              </td>
              <td
                className={`text-GrayHomz font-[500] text-[12px]  md:w-[112.11px] py-[12px] pl-[16px] pr-[12px] h-[64px] ${
                  "hidden md:table-cell" // Hide on mobile
                }`}
                onClick={() => handleRowClick(data)}
              >
                {data.No_Of_Persons}
              </td>
              <td className=" md:w-[122.89px] py-[12px] px-[16px] h-[64px] text-GrayHomz font-[500] text-[11px]">
                {data.DateOfVisit}
              </td>
              <td className=" hidden md:table-cell md:w-[122.89px] md:py-[12px] md:px-[16px] text-GrayHomz font-[500] text-[11px]">
                {data.AccessCode}
              </td>
              <td
                className={`text-center md:text-left font-[500]  md:w-[104.11px] py-[12px] px-[16px] h-[64px] text-[11px] ${
                  data.AccessStatus == "Signed In"
                    ? "text-green-500"
                    : data.AccessStatus == "Pending"
                    ? "text-[#DC6803]"
                    : "text-[#D92D20]"
                }`}
                onClick={() => handleRowClick(data)}
              >
                <span
                  className={`py-[4px] px-[8px] rounded-[8px] text-[11px] md:block ${
                    data.AccessStatus == "Signed In"
                      ? "bg-[#CDEADD]"
                      : data.AccessStatus == "Pending"
                      ? "bg-[#FCF3EB]"
                      : "bg-[#FDF2F2]"
                  }`}
                >
                  {data.AccessStatus}
                </span>
              </td>
              <td className="hidden md:table-cell text-[11px] md:w-[100.89px] py-[12px] px-[20px] h-[64px]">
                {data.TimeIn}
              </td>
              <td className="hidden md:table-cell text-[11px]  md:w-[100.89px] py-[12px] px-[20px] h-[64px]">
                {data.Time_Out}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        lastThreePages={lastThreePages}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default VisitorsTable;
