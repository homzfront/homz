"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenuTwo from "../components/popUpMenuTwo";
import Button from "../../components/button";
import StatusDropdown from "../../components/statusDropDown";

const TenantsTwo = ({ Data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [data, setData] = useState(Data || []);
  const [openDropdowns, setOpenDropdowns] = useState({});

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
  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  const handleStatusChange = (status, dataId) => {
    // Handle status change logic here
    console.log(`Changing status to: ${status} for data with ID: ${dataId}`);
    // Close the corresponding dropdown
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
    // Correctly update DueDate for the corresponding tenant:
    // const data = Data.find((tenant) => tenant.id === dataId).Status = status;
    // console.log(data)
    // Find the index of the data item with the given dataId
    const dataIndex = data.findIndex((item) => item.id === dataId);

    if (dataIndex !== -1) {
      // Update the DueDate property of the found item
      const updatedData = [...data];
      updatedData[dataIndex].Status = status;

      // Update the state with the new data
      setData(updatedData);
      console.log;
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };
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
            currentData.map((data) => (
              <div
                key={data.id}
                className="border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
              >
                {/* Apply the same styles as the header to each column in the body */}
                <div className="flex items-center gap-1 text-GrayHomz4 font-[500] text-[11px] w-[15%]">
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                    }
                    alt=""
                    width={30}
                    height={30}
                    className=""
                  />
                  <span className="">{data.Tenant}</span>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
                  {data.Estate}
                </div>
                <div className="text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                  {data.ApartmentNo}
                </div>
                <div className="text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                  {data.Address}
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start pl-1 pr-2">
                  <span className="break-words">{data.Email}</span>
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start ">
                  {data.PhoneNo}
                </div>
                <div className="text-GrayHomz w-[7%] font-[500] text-[11px] text-start ">
                  {data.Rent}
                </div>
                <div
                  className={`text-GrayHomz w-[13%] font-[500] text-[11px] text-start`}
                >
                  <StatusDropdown
                    data={data}
                    handleStatusChange={(status) =>
                      handleStatusChange(status, data.id)
                    }
                    isOpen={openDropdowns[data.id] || false}
                    toggleDropdown={() => toggleDropdown(data.id)}
                  />
                </div>
                <div className="text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
                  {data.DueDate}
                </div>
                <div className="relative w-[3%]">
                  <button onClick={() => handleToggleMenu(data.id)}>
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
                  {popUpMenuTwo && selectedDataId === data.id && (
                    <PopUpMenuTwo data={data} />
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
