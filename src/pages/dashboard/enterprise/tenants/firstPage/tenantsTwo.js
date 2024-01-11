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
      console.log
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };
  return (
    <div className="mt-6">
      <div className=" border w-full">
        <div className="">
          <table border="1" className="w-full ">
            <thead className="">
              <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                <th className="text-left pl-6">Tenant</th>
                <th className="text-left ">Estate</th>
                <th className="text-left " style={{ width: "100px" }}>
                  Apartment No
                </th>
                <th className="text-left ">Address</th>
                <th className="text-left ">Email</th>
                <th className="text-left ">Phone No</th>
                <th className="text-left">Rent</th>
                <th className="text-left">Status</th>
                <th className="text-left ">Due Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {currentData &&
                currentData.map((data) => (
                  <tr
                    key={data.id}
                    className=" w-2 border-t-[1px] items-center"
                  >
                    <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                      <Image
                        src={
                          "/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                        }
                        alt=""
                        width={30}
                        height={30}
                        className="py-[15px]"
                      />
                      <span className="py-[15px]">{data.Tenant}</span>
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.Estate}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.ApartmentNo}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.Address}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.Email}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.PhoneNo}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data.Rent}
                    </td>
                    <td
                      className={`text-GrayHomz py-[15px] pr-2 font-[500]  text-[11px] w-24`}
                    >
                      <StatusDropdown
                        data={data}
                        handleStatusChange={(status) =>
                          handleStatusChange(status, data.id)
                        }
                        isOpen={openDropdowns[data.id] || false}
                        toggleDropdown={() => toggleDropdown(data.id)}
                      />
                    </td>
                    <td className="text-GrayHomz py-[15px] font-[500] text-[11px] pr-2">
                      {data.DueDate}
                    </td>
                    <td className="relative py-[15px] pr-4">
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
