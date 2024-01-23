"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenu from "./popUpMenu";
import Button from "../../components/button";

const MaintenanceTable = ({ request, tenantData }) => {


  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(request?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = request?.slice(startIndex, endIndex);

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

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Function to add ordinal suffix to day
    function getOrdinalSuffix(day) {
      if (day > 10 && day < 20) {
        return "th";
      } else {
        const lastDigit = day % 10;
        switch (lastDigit) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }
    }

    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDate = `${day}${ordinalSuffix} ${monthNames[monthIndex]}, ${year}`;

    return formattedDate;
  }


  console.log(request);
  console.log(tenantData);

  return (
    <div>
      <div className="mt-8">
        <div className=" border w-full">
          <div className="">
            <table border="1" className="w-full ">
              <thead className="">
                <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                  <th className="text-left pl-4" style={{ width: "160px" }}>
                    Tenant
                  </th>
                  <th className="text-left ">Subject</th>
                  <th className="text-left ">Status</th>
                  <th className="text-left ">Request Date</th>
                  <th className="text-left ">Estate</th>
                  <th className="text-left">Apartment No</th>
                  <th className="text-left " style={{ width: "110px" }}>
                    Address
                  </th>
                  <th className="text-left ">Phone No</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {currentData &&
                  currentData.map((request) => (
                    <tr
                      key={request?.tenant}
                      className="w-2 border-t-[1px] items-center"
                    >
                      {tenantData && tenantData.map((data) => (
                        <React.Fragment key={data?.tenants._id}>
                          {request?.tenant === data?.tenants._id && (
                            <>
                              <td className="flex items-center p-[10px] gap-1 pr-2 pl-4 text-GrayHomz4 font-[500] text-[11px]">
                                <Image
                                  src={data.tenants?.coverPhoto?.url}
                                  alt=""
                                  width={30}
                                  height={30}
                                  className="py-[15px]"
                                />
                                <span className="py-[15px]">
                                  {data?.tenants?.fullName}
                                </span>
                              </td>
                              <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                                {request?.subject}
                              </td>
                              <td
                                className={`text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
                              >
                                <span
                                  className={`p-[6px] rounded-lg text-center ${
                                    request?.status === "Pending"
                                      ? "bg-warningBg text-warning2 px-[18px]"
                                      : ""
                                  } ${
                                    request?.status === "Resolved"
                                      ? "bg-successBg text-Success px-4"
                                      : ""
                                  } ${
                                    request?.status === "In-progress"
                                      ? "bg-warning2  text-warningBg px-[10px]"
                                      : ""
                                  }`}
                                >
                                  {data.Status}
                                </span>
                              </td>
                              <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                                {formatDate(request?.requestDate)}
                              </td>
                              <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                                {data?.tenants?.estateId?.name}
                              </td>
                              <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                                {/* {data?.tenants?.ApartmentNo} */} -----
                              </td>

                              <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                                {data?.tenants?.houseAddress}
                              </td>
                              <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                                {data?.tenants?.phoneNumber}
                              </td>
                              <td className="relative py-[15px] pr-4">
                                <button
                                  onClick={() => handleToggleMenu(data.id)}
                                >
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
                                  <PopUpMenu data={data} />
                                )}
                              </td>
                            </>
                          )}
                        </React.Fragment>
                      ))}
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
    </div>
  );
};

export default MaintenanceTable;
