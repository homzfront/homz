"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenu from "./popUpMenu";
import Button from "../../components/button";
import StatusDropDownMain from "./statusDropDownMain";
import { updateMaintenanceReqestByTenant } from "@/api/maintenanceService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/mainmenu/loading";
import useBodyScroll from "@/utils/useBodyScroll";
import LoadingII from "@/components/mainmenu/loadingII";
import LoadingTable from "../../../../../components/mainmenu/loadingTable";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import truncateText from "@/utils/truncateText";

const MaintenanceTable = ({ request, fetchData }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingRows, setLoadingRows] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredRowII, setHoveredRowII] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleMouseEnterTwo = (id) => {
    setHoveredRowII(id);
  };

  const handleMouseLeaveTwo = () => {
    setHoveredRowII(null);
  };

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

  const handleStatusChange = async (status, dataId) => {
    setLoading(true);
    setLoadingRows((prev) => ({ ...prev, [dataId]: true }));
    try {
      const data = await updateMaintenanceReqestByTenant({
        id: dataId,
        status,
      });
      setLoading(false);
      toast.success("status updated successfully");
      fetchData();
      // Close the corresponding dropdown
      setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
    finally {
      setLoadingRows((prev) => ({ ...prev, [dataId]: false }));
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };


  useBodyScroll([loading]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="mt-8">
        <div className=" w-full rounded-t-xl border">
          <div className="flex rounded-t-xl bg-whiteblue h-[50px] text-[13px] font-[500] text-BlackHomz items-center px-4 md:px-8">
            <div className="w-[33.3%] md:w-auto flex-[1.3]">Tenant</div>
            <div className="pl-1 md:pl-0 w-[33.3%] md:w-auto flex-1">Subject</div>
            <div className="w-[33.3%] md:w-auto flex-1">Status</div>
            <div className="hidden md:table-cell flex-1">Request Date</div>
            <div className="hidden md:table-cell flex-1">Property</div>
            <div className="hidden md:table-cell flex-1">Apartment No</div>
            <div className="hidden md:table-cell flex-1">Address</div>
            <div className="hidden md:table-cell flex-1">Phone No</div>
            <div className="hidden md:table-cell flex-[0.2]"></div>
          </div>
          <div className="flex flex-col">
            {currentData &&
              currentData?.map((request) => (
                <div
                  key={request?._id}
                  className="flex bg-white border-t-[1px] items-center px-4 md:px-8 h-[64px]"
                >
                  <div className="w-[33.3%] md:w-auto flex-[1.3] flex items-center gap-2 text-GrayHomz4 font-[500] text-[11px]">
                    {request.tenant?.coverPhoto?.url === null ||
                      request.tenant?.coverPhoto?.url === undefined ? (
                      <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                        <EmptyAvatar />
                      </div>
                    ) : (
                      <Image
                        src={request.tenant?.coverPhoto?.url}
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
                    <span className="py-[15px] break-words">
                      {request?.tenant?.fullName}
                    </span>
                  </div>
                  <div className="pl-1 md:pl-0 w-[33.3%] md:w-auto flex-1 text-GrayHomz  font-[500] text-[11px]">
                    <div
                      onMouseEnter={() => handleMouseEnter(request?._id)}
                      onMouseLeave={handleMouseLeave}
                      className="max-w-[100px] relative">
                      {truncateText(request?.subject, 30)}
                      {hoveredRow === request?._id && (
                        <span className="absolute bg-black text-white text-[10px] rounded p-1 z-10 top-full left-0 max-w-xs w-max">
                          {request?.subject}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 w-[33.3%] md:w-auto flex items-center ">
                    <div
                      className={` text-GrayHomz font-[500] w-[80%] py-1 h-[25px] rounded-md text-center text-[11px] `}
                    >
                      <StatusDropDownMain
                        data={request}
                        handleStatusChange={(status) =>
                          handleStatusChange(status, request._id)
                        }
                        isOpen={openDropdowns[request._id] || false}
                        toggleDropdown={() => toggleDropdown(request._id)}
                        loading={loadingRows[request._id] || false}
                      />
                    </div>
                  </div>
                  <div className="hidden md:table-cell flex-1 text-GrayHomz font-[500] text-[11px]">
                    {changeBackendDateFormat(request?.requestDate)}
                  </div>
                  <div className="hidden md:table-cell flex-1 text-GrayHomz font-[500] text-[11px]">
                    {request?.tenant?.estateId?.name}
                  </div>
                  <div className="hidden md:table-cell flex-1 text-GrayHomz font-[500] text-[11px]">
                    {request.tenant?.rentInfo?.apartmentNumber
                      ? request.tenant?.rentInfo?.apartmentNumber
                      : "-----"}
                  </div>
                  <div className="hidden md:table-cell flex-1 text-GrayHomz font-[500] text-[11px]">
                    <div
                      onMouseEnter={() => handleMouseEnterTwo(request?._id)}
                      onMouseLeave={handleMouseLeaveTwo}
                      className="max-w-[100px] relative">
                      {truncateText(request?.tenant?.estateId?.address, 30)}
                      {hoveredRowII === request?._id && (
                        <span className="absolute bg-black text-white text-[10px] rounded p-1 z-10 top-full left-0 max-w-[250px] w-max">
                          {request?.tenant?.estateId?.address}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:table-cell flex-1 text-GrayHomz font-[500] text-[11px]">
                    {request?.tenant?.phoneNumber}
                  </div>
                  <div className="hidden md:table-cell flex-[0.2] relative ">
                    <button onClick={() => handleToggleMenu(request?._id)}>
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
                    {popUpMenuTwo && selectedDataId === request?._id && (
                      <PopUpMenu data={request} />
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
    </div>
  );
};

export default MaintenanceTable;
