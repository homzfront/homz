"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenuTwo from "../components/popUpMenuTwo";
import Button from "../../components/button";
import StatusDropdown from "../../components/statusDropDown";
import { updatePaymentStatusTenant } from "@/api/tenantSevice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addCommasToNumber from "@/utils/addCommasToNumber";
import lowerCaseData from "@/utils/lowerCaseData";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import useClickOutside from "@/utils/clickOutside";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import truncateText from "@/utils/truncateText";
import PrintableTenantdData from "./printableTenantdData";
import Pagination from "@/components/general/pagination";

const TenantsTwoDueDate = ({ loading, totalPages, setCurrentPage, currentPage, printableRef, Data, fetchDataAgain, setSelectedRows, selectedRows, isMasterChecked, setIsMasterChecked }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loadingRows, setLoadingRows] = useState({});
  const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));
  const dropdownRefII = useClickOutside(() => setOpenDropdowns({}));
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const firstThreePages = [1, 2, 3];
  const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];

  const handleStatusChange = async (status, dataId, id, duration) => {
    setLoadingRows((prev) => ({ ...prev, [dataId]: true }));

    try {
      const data = await updatePaymentStatusTenant({
        id,
        status: lowerCaseData(status),
        duration
      });
      toast.success("status updated successfully");
      // Close the corresponding dropdown
      setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));
      fetchDataAgain();
    } catch (error) {
      toast.error(error);
    }
    finally {
      setLoadingRows((prev) => ({ ...prev, [dataId]: false }));
    }
  };

  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  // const handleCheckboxChange = (event, id, selectedName) => {
  //   const checked = event.target.checked;
  //   if (checked) {
  //     setSelectedRows([...selectedRows, id]);
  //   } else {
  //     setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  //   }
  // };

  // const handleMasterCheckboxChange = (event) => {
  //   const checked = event.target.checked;
  //   setIsMasterChecked(checked);
  //   if (checked) {
  //     const allIds = currentData.map((data) => data._id);
  //     setSelectedRows(allIds);
  //   } else {
  //     setSelectedRows([]);
  //   }
  // };


  return (
    <div className="mt-6 w-full mx-auto">
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
      <div className="overflow-x-auto scrollbar-container">
        <div className="w-[500%] md:w-[180%]">
          <div className="w-full border rounded-t-[12px]">
            <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz  px-2 rounded-t-[12px]">
              <div className="w-[15%]">Tenant</div>
              <div className="w-[10%]">Property</div>
              <div className="w-[6%]">Apartment No</div>
              <div className="w-[15%]">Address</div>
              <div className="w-[15%]">Email</div>
              <div className="w-[5%]">Phone No</div>
              <div className="w-[8%]">Rent</div>
              <div className="w-[7%]">Status</div>
              <div className="w-[7%]">Due Date</div>
              <div className="w-[5%]"></div>
            </div>

            <div className="">
              {Data &&
                Data.map((data) => (
                  <div
                    key={data?._id}
                    className="border-b-[1px] items-center flex justify-center w-full gap-2 px-2 h-[60px]"
                  >
                    <div className="flex items-center gap-1 text-GrayHomz4 font-[500] text-[11px] w-[15%]">
                      {loading ? (
                        <div className=" max-w-[40%] h-[40px] w-[40px] rounded-full bg-gray-200 animate-pulse"></div> // Skeleton loader
                      ) : !data?.coverPhoto?.url ? (
                        <div className="max-w-[40%] h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                          <EmptyAvatar />
                        </div>
                      ) : (
                        <Image
                          src={data?.coverPhoto?.url}
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
                      <span className="w-[60%] md:w-auto">{loading ?
                        <div className="w-[50px] h-[15px] rounded bg-gray-200 animate-pulse"></div> : data?.fullName}</span>
                    </div>
                    <div className=" text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
                      {loading ?
                        <div className="w-[50px] h-[15px] rounded bg-gray-200 animate-pulse"></div> : data?.estateId?.name}
                    </div>
                    <div className=" text-GrayHomz w-[6%] font-[500] text-[11px] text-start">
                      {loading ?
                        <div className="w-[50px] h-[15px] rounded bg-gray-200 animate-pulse"></div> : `${data?.rentInfo?.apartmentNumber
                          ? `Apartment ${data?.rentInfo?.apartmentNumber}`
                          : "______"
                        }`}
                    </div>
                    <div
                      className=" text-GrayHomz w-[15%] font-[500] text-[11px] text-start">
                      <div
                        onMouseEnter={() => handleMouseEnter(data?._id)}
                        onMouseLeave={handleMouseLeave}
                        className="w-full relative">
                        {loading ?
                          <div className="w-[70px] h-[15px] rounded bg-gray-200 animate-pulse"></div> : truncateText(data?.estateId?.address, 45)}
                        {hoveredRow === data?._id && (
                          <span className="absolute bg-black text-white text-[10px] rounded p-1 z-10 top-full left-0 max-w-xs w-max">
                            {data?.estateId?.address}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className=" text-GrayHomz w-[15%] font-[500] text-[11px] text-start pl-1 pr-2">
                      <span className="break-words"> {loading ?
                        <div className="w-[70px] h-[15px] rounded bg-gray-200 animate-pulse"></div> : truncateText(data?.user?.email, 45)}</span>
                    </div>
                    <div className=" text-GrayHomz w-[5%] font-[500] text-[11px] text-start ">
                      {loading ?
                        <div className="w-[50px] h-[15px] rounded bg-gray-200 animate-pulse"></div> : data?.phoneNumber}
                    </div>
                    <div className="text-GrayHomz w-[8%] font-[500] text-[11px] text-start">
                      {loading ? (
                        <div className="w-[50px] h-[15px] rounded bg-gray-200 animate-pulse"></div>
                      ) : data?.rentInfo?.rent ? (
                        <>
                          <span style={{ fontFamily: "Arial" }}>₦</span>
                          {addCommasToNumber(data?.rentInfo?.rent)}
                        </>
                      ) : (
                        "______"
                      )}
                    </div>

                    <div
                      className={`relative text-GrayHomz w-[7%] font-[500] text-[11px] text-start`}
                    >
                      {loading ?
                        <div className="w-[40px] h-[15px] rounded bg-gray-200 animate-pulse"></div> : data?.rentInfo?.paymentStatus ? (
                          <StatusDropdown
                            setSelectedStatus={(status) =>
                              setSelectedStatus((prev) => ({
                                ...prev,
                                [data._id]: status,
                              }))
                            }
                            value={capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                            selectedStatus={selectedStatus[data._id] || null}
                            handleStatusChange={(status) =>
                              handleStatusChange(status, data._id, data?.rentInfo?._id, data?.rentInfo?.duration)
                            }
                            isOpen={openDropdowns[data?._id] || false}
                            toggleDropdown={() => toggleDropdown(data?._id)}
                            loading={loadingRows[data?._id] || false}
                            dropdownRef={dropdownRefII}
                          />
                        ) : (
                          "______"
                        )}
                    </div>
                    <div className=" text-GrayHomz w-[7%] font-[500] text-[11px] text-start">
                      {loading ?
                        <div className="w-[50px] h-[15px] rounded bg-gray-200 animate-pulse"></div> : `${data?.rentInfo?.dueDate
                          ? changeBackendDateFormat(data?.rentInfo?.dueDate)
                          : "______"
                        }`}
                    </div>
                    <div className="sticky right-[-24px] md:right-0 bg-white w-[5%] pl-8">
                      <button onClick={() => handleToggleMenu(data?._id)}>
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
                      {popUpMenuTwo && selectedDataId === data?._id && (
                        <PopUpMenuTwo dropdownRef={dropdownRef} data={data?._id} />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {Data && Data.length >= 1 && (
        <Pagination
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
          lastThreePages={lastThreePages}
        />
      )}

      <div style={{ display: 'none' }}>
        <PrintableTenantdData
          printableRef={printableRef}
          Data={Data}
          fetchDataAgain={fetchDataAgain}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          setIsMasterChecked={setIsMasterChecked}
        />
      </div>
    </div>
  );
};

export default TenantsTwoDueDate;
