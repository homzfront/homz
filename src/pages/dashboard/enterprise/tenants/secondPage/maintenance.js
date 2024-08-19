"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../../components/button.js";
import { updateMaintenanceReqestByTenant } from "@/api/maintenanceService";
import { toast } from "react-toastify";
import LoadingTable from "../../../../../components/mainmenu/loadingTable.js";
import StatusDropDownMain from "../components/statusDropDownMain.js";
import EmptyAvatar from "@/components/icons/emptyAvatar.js";
import truncateText from "@/utils/truncateText.js";
const Maintenance = ({ data }) => {
  const [loadingRows, setLoadingRows] = useState({});

  const MaintenanceRequests = data?.data?.maintenanceRequests;

  // Create a new array with each element containing maintenance request and user information
  const newDataArray = data?.data?.maintenanceRequests.map(
    (maintenanceRequest) => {
      return {
        _id: maintenanceRequest?._id,
        maintenanceRequest,
        user: {
          fullName: data?.data?.fullName,
          coverPhoto: data?.data?.coverPhoto,
        },
      };
    }
  );

  const [openDropdowns, setOpenDropdowns] = useState({});

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };


  const totalPages = Math.ceil(newDataArray?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = newDataArray?.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  const handleStatusChange = async (status, dataId) => {
    setLoadingRows((prev) => ({ ...prev, [dataId]: true }));
    try {
      // Handle status change logic here
      const data = await updateMaintenanceReqestByTenant({
        id: dataId,
        status,
      });
      toast.success("status updated successfully");
      // Close the corresponding dropdown
      setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingRows((prev) => ({ ...prev, [dataId]: false }));
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
                <th className="text-left pl-4 md:pl-6 w-[33.3%] md:w-[40%]">Tenant</th>
                <th className="text-left w-[33.3%] md:w-[35%] ">Subject</th>
                <th className="text-left w-[33.3%] md:w-[25%] md:pl-1">Status</th>
              </tr>
            </thead>
            <tbody className="">
              {currentData?.map((data) => (
                <tr key={data._id} className="border-t-[1px] items-center">
                  <td className="pt-[18px] sm:pt-2 flex items-center gap-1 pl-4 md:pl-6 w-[33.3%] md:w-[40%] text-GrayHomz4 font-[500] text-[11px]">
                    {data?.user?.coverPhoto?.url === null ||
                      data?.user?.coverPhoto?.url === undefined ? (
                      <div className="hidden py-[15px] h-[40px] w-[40px] sm:flex justify-center items-center bg-avatarBg rounded-full">
                        <EmptyAvatar />
                      </div>
                    ) : (
                      <Image
                        src={data?.user?.coverPhoto?.url}
                        alt=""
                        width={40}
                        height={40}
                        layout="full" // Specify the desired height
                        objectFit="cover"
                        objectPosition="center"
                        className="hidden sm:block object-cover bg-center h-[40px] rounded-full"
                        quality={100}
                        priority
                      />
                    )}
                    <span className="">{data?.user?.fullName}</span>
                  </td>
                  <td
                    onMouseEnter={() => handleMouseEnter(data?._id)}
                    onMouseLeave={handleMouseLeave}
                    className="relative text-GrayHomz py-[15px] w-[33.3%] md:w-[35%] font-[500] text-[11px]">
                    {truncateText(data?.maintenanceRequest?.subject, 50)}
                    {hoveredRow === data?._id && (
                      <span className="absolute bg-black text-white text-[10px] rounded p-1 z-10 top-full left-0 max-w-xs sm:w-max">
                        {data?.maintenanceRequest?.subject}
                      </span>
                    )}
                  </td>

                  <td
                    className={`text-GrayHomz py-[15px] w-[33.3%] md:w-[25%] md:pl-1 font-[500]  text-[11px]`}
                  >
                    <StatusDropDownMain
                      data={data}
                      handleStatusChange={(status) =>
                        handleStatusChange(status, data._id)
                      }
                      isOpen={openDropdowns[data._id] || false}
                      toggleDropdown={() => toggleDropdown(data._id)}
                      loading={loadingRows[data._id] || false}
                    />

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

export default Maintenance;
