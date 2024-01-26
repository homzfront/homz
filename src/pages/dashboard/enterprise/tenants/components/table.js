"use client";
import Image from "next/image";
import React, { useState } from "react";

const Value = [
  {
    id: 1,
    Date: "4th January, 2024",
    DueDate: "4th January, 2024",
    RentPaid: "N750,000",
    Status: "Confirmed",
    PropertyType: "2-bedroom Bungalow",
    Action: false,
  },
  {
    id: 2,
    Date: "4th January, 2024",
    DueDate: "4th January, 2024",
    RentPaid: "N750,000",
    Status: "Pending",
    PropertyType: "2-bedroom Bungalow",
    Action: false,
  },
  {
    id: 3,
    Date: "4th January, 2024",
    DueDate: "4th January, 2024",
    RentPaid: "N750,000",
    Status: "Confirmed",
    PropertyType: "2-bedroom Bungalow",
    Action: false,
  },
  {
    id: 4,
    Date: "4th January, 2024",
    DueDate: "4th January, 2024",
    RentPaid: "N750,000",
    Status: "Pending",
    PropertyType: "2-bedroom Bungalow",
    Action: false,
  },
  {
    id: 5,
    Date: "4th January, 2024",
    DueDate: "4th January, 2024",
    RentPaid: "N750,000",
    Status: "Pending",
    PropertyType: "2-bedroom Bungalow",
    Action: false,
  },
  {
    id: 6,
    Date: "4th January, 2024",
    DueDate: "4th January, 2024",
    RentPaid: "N750,000",
    Status: "Pending",
    PropertyType: "2-bedroom Bungalow",
    Action: false,
  },
  {
      id: 7,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Pending",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 8,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Pending",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 9,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Pending",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 10,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Pending",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 11,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Pending",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 12,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Pending",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 13,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Confirmed",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 14,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Pending",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 15,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Confirmed",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },     {
      id: 16,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Pending",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
    {
      id: 17,
      Date: "4th January, 2024",
      DueDate: "4th January, 2024",
      RentPaid: "N750,000",
      Status: "Confirmed",
      PropertyType: "2-bedroom Bungalow",
      Action: false,
    },
];

const Table = () => {
  const [data, setData] = useState(Value); 

  console.log(data.length)

  const ITEMS_PER_PAGE = 4;

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
    // Find the index of the selected data
    const dataIndex = data.findIndex((item) => item.id === id);

    // Update the Action property to true
    data[dataIndex].Action = !data[dataIndex].Action;

    // Log the updated data to the console
    console.log("Updated data:", data);

    // Update the state with the modified data
    setData([...data]);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  return (
    <div className="mt-6">
      <div className=" border w-full">
        <div className="">
          <table border="1" className="w-full ">
            <thead className="">
              <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                <th className="text-left pl-6">Date</th>
                <th className="text-left ">Due Date</th>
                <th className="text-left ">Rent Paid</th>
                <th className="text-left ">Apartment Type</th>
                <th className="text-left ">Status</th>
                <th className="text-left ">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData.map((data) => (
                <tr key={data.id} className=" w-2 border-t-[1px] items-center">
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
                    <span className="py-[15px]">{data.Date}</span>
                  </td>
                  <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                    {data.DueDate}
                  </td>
                  <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                    {data.RentPaid}
                  </td>
                  <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                    {data.PropertyType}
                  </td>
                  <td
                    className={`text-GrayHomz py-[15px] pr-2 font-[500]  text-[11px] w-24`}
                  >
                    <span
                      className={`p-[6px] rounded-md text-center  ${
                        data.Status === "Pending"
                          ? "bg-warningBg text-warning2 px-[13px]"
                          : ""
                      } ${
                        data.Status === "Confirmed"
                          ? "bg-Success text-warningBg"
                          : ""
                      }`}
                    >
                      {data.Status}
                    </span>
                  </td>
                  <td className="py-[15px] pr-4">
                    <button
                      onClick={() => handleToggleMenu(data.id)}
                      className={`flex items-center px-2 py-1 rounded-md gap-1 ${
                        data.Action
                          ? "text-white bg-BlueHomz"
                          : "text-GrayHomz5 bg-GrayHomz6"
                      }`}
                    >
                      Confirm
                      <Image
                        src="/static/dashboard/enterprisemanager/tenants/tick-circle.png"
                        alt=""
                        height={16}
                        width={16}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center mt-4">
        <div>
          <button
            onClick={handlePrev}
            className={`text-[14px] font-[500] py-2 px-6 border rounded-md hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center${
              currentPage === 1 ? "pointer-events-none opacity-20" : ""
            }`}
          >
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        <div className="w-[350px] flex items-center justify-around">
          {firstThreePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${
                currentPage === page ? "bg-GrayHomz5   text-GrayHomz" : ""
              }`}
            >
              {page}
            </button>
          ))}
          {currentPage > 3 && totalPages - 2 > currentPage ? (
            <p className="text-[14px] font-[500] w-10 h-10 rounded-md flex items-center justify-center bg-GrayHomz5 text-GrayHomz">
              {currentPage}
            </p>
          ) : (
            <span className={`${totalPages <= 6 ? "hidden" : "inline"}`}>
              ...
            </span>
          )}
          {totalPages > 6 &&
            [totalPages - 2, totalPages - 1, totalPages].map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`text-[14px] font-[500] w-10 h-10 rounded-md text-center ${
                  currentPage === page ? "bg-GrayHomz5 text-GrayHomz" : ""
                }`}
              >
                {page}
              </button>
            ))}
          {currentPage > 3 && currentPage < 7 && (
            <span
              className={`text-[14px] font-[500] w-10 h-10 border rounded-md flex items-center justify-center bg-GrayHomz5 text-GrayHomz ${
                totalPages > 6 ? "hidden" : "inline"
              }`}
            >
              {currentPage}
            </span>
          )}
        </div>
        <div>
          <button
            onClick={handleNext}
            className={`py-2 px-6 rounded-md text-[14px] font-[500] border hover:bg-whiteblue border-BlueHomz text-BlueHomz flex items-center justify-center ${
              totalPages <= 6 ? "ml-[0]" : "ml-0"
            } ${
              currentPage === totalPages ? "pointer-events-none opacity-20" : ""
            }`}
          >
            Next
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
