"use client"
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenu from "./popUpMenu";
import Button from "../../components/button";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import EmptyAvatar from "@/components/icons/emptyAvatar";

const MaintenanceTable = ({
  data,
}) => {


  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);

  const ITEMS_PER_PAGE = 6;

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
    <div>
      {" "}
      <div className="mt-8">
        <div className=" border w-full">
          <div className="">
            <table border="1" className="w-full ">
              <thead className="">
                <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                  <th className="text-left pl-4" style={{ width: "160px" }}>Tenant</th>
                  <th className="text-left ">Subject</th>
                  <th className="text-left w-[15%]  hidden md:table-cell" >
                    Status
                  </th>
                  <th className="text-left hidden md:table-cell">Request Date</th>
                  <th className="text-left hidden md:table-cell">Property</th>
                  <th className="text-left hidden md:table-cell">Apartment No</th>
                  <th className="text-left hidden md:table-cell" style={{ width: "110px" }}>Address</th>
                  <th className="text-left hidden md:table-cell">Phone No</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {currentData &&
                  currentData.map((data) => (
                    <tr
                      key={data._id}
                      className=" w-2 border-t-[1px] items-center"
                    >
                      <td className="flex items-center p-[10px] gap-1 pr-2  pl-4 text-GrayHomz4 font-[500] text-[11px]">
                        {data?.tenant?.coverPhoto?.url === null ||
                          data?.tenant?.coverPhoto?.url === undefined ? (
                            <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                            <EmptyAvatar />
                          </div>
                        ) : (
                          <Image
                            src={data?.tenant?.coverPhoto?.url}
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
                        <span className="py-[15px]">{data?.tenant?.fullName}</span>
                      </td>
                      <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                        {data?.subject}
                      </td>
                      <td
                        className={`w-[15%] hidden md:table-cell text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
                      >
                        <span
                          className={`p-[6px] rounded-lg text-center ${data.status === "pending"
                            ? "bg-warningBg text-warning2 px-[18px]"
                            : ""
                            } ${data.status === "resolved"
                              ? "bg-successBg text-Success px-4"
                              : ""
                            } ${data.status === "in-progress"
                              ? "bg-warning2  text-warningBg px-[10px]"
                              : ""
                            }`}
                        >
                          {capitalizeFirstLetter(data?.status)}
                        </span>
                      </td>
                      <td className="hidden md:table-cell text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {changeBackendDateFormat(data?.requestDate)}
                      </td>
                      <td className="hidden md:table-cell text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data?.tenant?.estateId?.name}
                      </td>
                      <td className="hidden md:table-cell text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data?.tenant?.rentInfo?.apartmentNumber}
                      </td>

                      <td className="hidden md:table-cell text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data?.tenant?.estateId?.address}
                      </td>
                      <td className="hidden md:table-cell text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                        {data?.tenant?.phoneNumber}
                      </td>
                      <td className="relative py-[15px] pr-4">
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
                          <PopUpMenu
                            data={data}
                          />
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
    </div>
  );
};

export default MaintenanceTable;
