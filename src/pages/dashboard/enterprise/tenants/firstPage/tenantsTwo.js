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

const TenantsTwo = ({ printableRef, Data, fetchDataAgain, setSelectedRows, selectedRows, isMasterChecked, setIsMasterChecked }) => {
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

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Data?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = Data?.slice(startIndex, endIndex);

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
    <div className="mt-6">
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
      <div className="flex flex-col justify-between max-h-[900px]">
        <div className=" border w-full rounded-t-[12px]">
          <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz  px-4 rounded-t-[12px]">
            <div className="w-[50%] md:w-[18%] ">Tenant</div>
            <div className="w-[10%] hidden md:table-cell">Property</div>
            <div className="w-[11%] hidden md:table-cell">Apartment No</div>
            <div className="w-[11%] hidden md:table-cell">Address</div>
            <div className="w-[15%] hidden md:table-cell">Email</div>
            <div className="w-[10%] pl-1 hidden md:table-cell">Phone No</div>
            <div className="w-[7%] pl-1 hidden md:table-cell">Rent</div>
            <div className="w-[41%] md:w-[13%] pl-1">Status</div>
            <div className="w-[7%] hidden md:table-cell">Due Date</div>
            <div className="w-[5%] md:w-[2%] "></div>
          </div>

          <div className="">
            {currentData &&
              currentData.map((data) => (
                <div
                  key={data?._id}
                  className="border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
                >
                  <div className="flex items-center gap-1 text-GrayHomz4 font-[500] text-[11px] w-[50%] md:w-[18%]">
                    {!data?.coverPhoto?.url ? (
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
                    <span className="w-[60%] md:w-auto">{data?.fullName}</span>
                  </div>
                  <div className="hidden md:table-cell text-GrayHomz w-[10%] font-[500] text-[11px] text-start">
                    {data?.estateId?.name}
                  </div>
                  <div className="hidden md:table-cell text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                    {`${data?.rentInfo?.apartmentNumber
                      ? data?.rentInfo?.apartmentNumber
                      : "______"
                      }`}
                  </div>
                  <div
                    className="hidden md:table-cell text-GrayHomz w-[11%] font-[500] text-[11px] text-start">
                    <div
                      onMouseEnter={() => handleMouseEnter(data?._id)}
                      onMouseLeave={handleMouseLeave}
                      className="max-w-[100px] relative">
                      {truncateText(data?.estateId?.address, 30)}
                      {hoveredRow === data?._id && (
                        <span className="absolute bg-black text-white text-[10px] rounded p-1 z-10 top-full left-0 max-w-xs w-max">
                          {data?.estateId?.address}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:table-cell text-GrayHomz w-[15%] font-[500] text-[11px] text-start pl-1 pr-2">
                    <span className="break-words">{truncateText(data?.user?.email, 35)}</span>
                  </div>
                  <div className="hidden md:table-cell text-GrayHomz w-[10%] font-[500] text-[11px] text-start ">
                    {data?.phoneNumber}
                  </div>
                  <div className="hidden md:table-cell text-GrayHomz w-[7%] font-[500] text-[11px] text-start ">
                    {`${data?.rentInfo?.rent
                      ? addCommasToNumber(data?.rentInfo?.rent)
                      : "______"
                      }`}
                  </div>
                  <div
                    className={`text-GrayHomz w-[41%] md:w-[13%] font-[500] text-[11px] text-start`}
                  >
                    {data?.rentInfo?.paymentStatus ? (
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
                  <div className="hidden md:table-cell text-GrayHomz w-[7%] font-[500] text-[11px] text-start">
                    {`${data?.rentInfo?.dueDate
                      ? changeBackendDateFormat(data?.rentInfo?.dueDate)
                      : "______"
                      }`}
                  </div>
                  <div className="relative w-[5%] md:w-[2%]">
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
        <Button
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
        />
      </div>
      <div style={{ display: 'none' }}>
        <PrintableTenantdData
          printableRef={printableRef}
          Data={currentData}
          fetchDataAgain={fetchDataAgain}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          setIsMasterChecked={setIsMasterChecked}
        />
      </div>
    </div>
  );
};

export default TenantsTwo;
