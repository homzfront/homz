"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../../components/button";
import StatusDropdownII from "../../components/statusDropDownII";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addYearsToValues from "@/utils/addYearsToNumber";
import useClickOutside from "@/utils/clickOutside";
import PopUpMenuTwo from "./popMenuToTenantProfile";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import EmptyAvatar from "@/components/icons/emptyAvatar";

const TenantData = ({ data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));
  const dropdownRefII = useClickOutside(() => setPopUpMenuTwo(false));

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

  const handleStatusChange = (status, dataId) => {
    // Handle status change logic here
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
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

  const handleDelete = (profileId) => {
    // Perform your delete logic here...
    // For example, you can update the state to remove the profile
    const updatedData = data.filter((profile) => profile.id !== profileId);
    // Set the updated data to the state
    setData(updatedData); // Assuming you have a state variable 'setData'
  };

  return (
    <div className="mt-6">
      <div className=" border w-full">
        <div className="">
          <table border="1" className="w-full ">
            <thead className="">
              <tr className="bg-whiteblue h-[50px] text-[13px]  font-[500] text-BlackHomz">
                <th className="text-left pl-4">Tenant</th>
                <th className="text-left ">Payment Date</th>
                <th className="text-left ">Due Date</th>
                <th className="text-left ">Amount</th>
                <th className="text-left ">Purpose</th>
                <th className="text-left " style={{ width: "110px" }}>Payment Status</th>
                <th className="text-left ">Property</th>
                <th className="text-left">Apartment No</th>
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
                    <td className="flex items-center gap-1 pr-2  pl-4 text-GrayHomz4 font-[500] text-[11px]">
                      {data?.tenantId?.coverPhoto?.url === null ||
                        data?.tenantId?.coverPhoto?.url === undefined ? (
                          <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                          <EmptyAvatar />
                        </div>
                      ) : (
                        <Image
                          src={data?.tenantId?.coverPhoto?.url}
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
                      <span className="py-[15px]">{data?.tenantId?.fullName}</span>
                    </td>
                    <td className="text-GrayHomz py-[15px] font-[500] text-[11px]">
                      {changeBackendDateFormat(data?.createdAt)}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {changeBackendDateFormat(data?.dueDate)}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {addCommasToNumber(data?.rent)}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {addYearsToValues(data?.duration)}  rents
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-4 font-[500]  text-[11px] w-24">
                      <div className={`${data?.rentInfo?.paymentStatus === "pending" ? "bg-warningBg text-warning2" :
                        data?.rentInfo?.paymentStatus === "paid" ? "bg-successBg text-Success" :
                          data?.rentInfo?.paymentStatus === "over due" ? "bg-error text-white" : ""
                        }  rounded-md py-1 w-[95px] flex items-center justify-center`}>
                        {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                      </div>
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data?.estateId?.name}
                    </td>
                    <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                      {data?.apartmentNumber}
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
                        <PopUpMenuTwo data={data} dropdownRef={dropdownRef} />
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

export default TenantData;
