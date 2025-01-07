"use client";
import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Image from "next/image";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import StatusDropdown from "./statusDropDown";
import MobileDropDown from "./mobileDropDown";
import Link from "next/link";
import DesktopMenu from "../components/desktopMenu";

import VisitorAccessInfo from "./visitorAccessInfo";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import formatTime from "@/utils/formatTime";
import truncateText from "@/utils/trucateWord";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
const VisitorsTable = ({
  Data,
  setModalOpen,
  typeOfUser,
  reSet,
  getStatus,
  currentPage,
  setPage,
  setSearchValue,
  handleInputChange,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [openDesktopFilter, setOpenDesktopFilter] = useState(false);
  const [tenant, setTenant] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("all");
  const [confirmStatusModal, setConfirmStatusModal] = useState(false);
  const [status, setStatus] = useState({
    status: "",
    Id: "",
  });

  const openNewRecordModal = () => {
    setModalOpen(true);
  };

  const ITEMS_PER_PAGE = 12;
  const currentData = Data?.results;
  const totalPages = Math.ceil(Data && Data?.totalCount / ITEMS_PER_PAGE);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const openModal = (data) => {
    setModalIsOpen(true);
    setTenant(data);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openMobileModal = () => {
    setMobileModalIsOpen(true);
  };
  const accessStatus = () => {
    setConfirmStatusModal(false);
    handleAccessStatus(status.status, status.Id);
  };
  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };
  const openDetailsMobileModal = (data) => {
    setDetailsModalIsOpen(true);
    setTenant(data);
  };
  const closeDetailsMobileModal = () => {
    setDetailsModalIsOpen(false);
  };

  const handleNext = () => {
    const nextPageNumber = parseInt(currentPage) + 1;
    setPage(nextPageNumber);
  };

  const handlePrev = () => {
    const prevPageNumber = Math.max(parseInt(currentPage) - 1, 1);
    setPage(prevPageNumber);
  };

  const handlePageClick = (page) => {
    setPage(page);
  };
  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };
  const handleAccessStatus = (status, dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));

    const dataIndex = currentData.findIndex((item) => item._id === dataId);

    if (dataIndex !== -1) {
      const updatedData = [...currentData];
      updatedData[dataIndex].accessStatus = status;
    }
  };

  const handleStatusChange = (status, dataId) => {
    if (status === "signed out") {
      setConfirmStatusModal(true);
      setStatus({
        status: status,
        Id: dataId,
      });
    } else {
      handleAccessStatus(status, dataId);
    }
  };

  const openDesktopMenu = () => {
    setOpenDesktopFilter(!openDesktopFilter);
  };
  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );
  const lastThreePagesStart = Math.max(totalPages - 2, 1); // Calculate the starting page number for the last three pages
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );

  return (
    <div className="flex flex-col gap-[1rem] md:gap-0 md:space-y-5">
      {/* <div className={`${property && "hidden"}`}> */}
      <div className="hidden md:flex gap-6 items-center pb-1">
        <Link href="/dashboard/enterprise-property/tenants">
          <button className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-w_idth="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-400 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className=" text-gray-400">Go Back</span>
          </button>
        </Link>
      </div>

      <div className="hidden md:flex justify-between  flex-col space-y-4">
        <div className="border-b-GrayHomz2 border pb-3 border-t-0 border-x-0">
          <p className="mb-2 text-[20px]">Visitor Access Request</p>
          <div className="flex items-center justify-between">
            <p className="text-[#A9A9A9] leading-[27px] mb-3">
              Visitor records of all your tenants will be displayed here
            </p>
            {typeOfUser === "security" && (
              <button
                className="bg-[#006AFF] text-[#FFFFFF] text-[14px] font-[500] leading-[17.64px] flex items-center justify-center gap-[10px] rounded-[4px] h-[37px] py-[8px] px-[12px]"
                onClick={openNewRecordModal}
              >
                <Image
                  src="/static/images/add-visitor.svg"
                  height={16}
                  width={16}
                  alt=""
                />
                <p>Register Visitor</p>
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-[12px]">
            <button
              className={`${
                selectedRecord === "all"
                  ? "bg-[#006AFF] text-[#FFFFFF]"
                  : "text-[#006AFF] bg-[#EEF5FF]"
              } text-[14px] font-[500] leading-[17.64px] flex items-center justify-center gap-[10px] rounded-[4px] h-[37px] py-[8px] px-[12px]`}
              onClick={() => setSelectedRecord("all")}
            >
              All Records
            </button>
            <button
              className={`${
                selectedRecord === "manual"
                  ? "bg-[#006AFF] text-[#FFFFFF]"
                  : "text-[#006AFF] bg-[#EEF5FF]"
              } text-[14px] font-[500] leading-[17.64px] flex items-center justify-center gap-[10px] rounded-[4px] h-[37px] py-[8px] px-[12px]`}
              onClick={() => setSelectedRecord("manual")}
            >
              Manually Added Records
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* <DropDown setStatus={getStatus} ref={dropDownMenu} /> */}
            <div className="searchPane relative w-[345px] rounded-[4px] h-[37px]">
              <input
                type="text"
                className="border h-[37px] pl-8 rounded-[4px] w-full "
                id="search"
                placeholder="Property, access code, tenant"
                onChange={handleInputChange}
              />
              <Image
                src={
                  "/static/dashboard/enterprisemanager/header/search-normal.png"
                }
                alt=""
                className="absolute top-3 left-2"
                height={16}
                width={16}
              />
            </div>
            <div className="relative">
              <button
                onClick={openDesktopMenu}
                className=" flex items-center gap-[10px] rounded-[4px] py-[8px] px-[12px] border-[2px] border-[#006AFF] h-[37px]"
              >
                <Image
                  src="/static/images/blue-filter.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <Image
                  src="/static/images/arrow-up.svg"
                  alt=""
                  width={16}
                  height={16}
                  className={`${
                    openDesktopFilter ? "rotate-0" : "-rotate-180"
                  } transform transition duration-300 ease-in-out`}
                />
                {/* DesktopMenu */}
              </button>
              {openDesktopFilter && (
                <div
                  className="absolute z-50 mt-[5px] right-0 w-auto shadow-lg bg-white rounded-lg"
                  style={{ top: "calc(100% + 1px)" }}
                >
                  <DesktopMenu
                    open={openDesktopFilter}
                    setStatus={getStatus}
                    reSet={reSet}
                  />
                </div>
              )}
            </div>

            {/*          
            <button
              className="border border-BlueHomz items-center text-[14px] font-[500] flex text-BlueHomz px-[10px] p-1 rounded cursor-pointer"
              onClick={handleResetFilter}
            >
              <span>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                  }
                  alt=""
                  height={17}
                  width={16}
                />
              </span>
              Reset
            </button> */}
          </div>
        </div>
      </div>
      <p className="md:hidden mt-0 pb-1 text-[#A9A9A9] leading-[17.64px] text-[14px] font-[400]">
        Tap on access status to change visitor’s access status
      </p>
      <div className="flex gap-3  md:hidden ">
        <div className="searchPane relative w-[80%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
            placeholder="Access Code"
            // onChange= {e=>{setSearchValue(e.target.value)}}
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={16}
            width={16}
          />
        </div>
        <div className=" rounded-[4px] p-[11px] border hover:border-blue-600">
          <button onClick={openMobileModal}>
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-container h-fit">
        <div className="w-[100%] md:w-[180%]">
          <div className="border rounded-t-[12px]">
            {/* Header Section */}

            <div className="bg-whiteblue h-[60px] grid sm:grid-cols-[15px_repeat(10,1fr)] grid-cols-[5px_repeat(3,1fr)] sm:gap-x-10 gap-x-4 font-[500] text-BlackHomz text-[13px] px-2 rounded-t-[12px] pt-4">
              <div className="items-left pl-2"></div>
              <div className="flex items-start justify-start">
                {" "}
                Tenant's Info
              </div>
              <div className="text-left sm:block hidden">Visitor's Name</div>
              <div className="text-left sm:block hidden">Phone Number</div>
              <div className="text-left sm:block hidden">Purpose of visit</div>
              <div className="text-left sm:block hidden">No of persons</div>
              <div className="text-left sm:block hidden">Date of visit</div>
              <div className="text-left">Access Code</div>
              <div className="text-left">
                {isMobile ? "Status" : " Access Status"}
              </div>
              <div className="text-left sm:block hidden">Time in</div>
              <div className="text-left sm:block hidden">Time out</div>
            </div>

            {/* Body Section */}
            <div>
              {currentData &&
                currentData.map((data) => (
                  <div
                    key={data?._id}
                    className="grid sm:grid-cols-[15px_repeat(10,1fr)]  grid-cols-[5px_repeat(3,1fr)] sm:gap-x-10 gap-x-4  items-center border-b-[1px] px-2 h-[60px]"
                  >
                    <div
                      className="font-[500] text-[11px] text-left pl-2"
                      // onClick={() => handleRowClick(data)}
                    >
                      {data?.accessStatus === "pending" && (
                        <Image
                          src="/static/images/RedEllipse.svg"
                          alt=""
                          width={8}
                          height={8}
                        />
                      )}
                    </div>
                    <div className="sm:text-GrayHomz4 flex sm:items-center sm:justify-between text-[#006AFF] blo sm:no-underline underline underline-offset-1 font-[500] text-[11px] items-start justify-start sm:cursor-default cursor-pointer">
                      {isMobile ? (
                        <button
                          className="text-[11px] leading-[16.5px]"
                          onClick={(e) => {
                            e.stopPropagation(); // Stop event bubbling
                            openDetailsMobileModal(data);
                          }}
                        >
                          {data?.tenant?.fullName}
                        </button>
                      ) : (
                        <>
                          <span className="text-[11px] leading-[16.5px] text-[#006AFF]">
                            {data?.tenant?.fullName}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Stop event bubbling
                              openModal(data);
                            }}
                          >
                            <Image
                              src="/static/images/arrow-down.svg"
                              alt=""
                              width={16}
                              height={16}
                            />
                          </button>
                        </>
                      )}
                    </div>
                    <div
                      className="sm:text-GrayHomz4 text-[#006AFF] sm:no-underline underline underline-offset-0 font-[500] text-[11px] text-left sm:cursor-default cursor-pointer sm:block hidden"
                      // onClick={() => handleRowClick(data)}
                    >
                      <span className="text-[11px] leading-[16.5px]">
                        {data?.visitorName}
                      </span>
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.visitorPhoneNumber}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.purposeOfVisit}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data?.noOfPersons}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {changeBackendDateFormat(data?.dateOfVisit) || "------"}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left break-words leading-[16.5px]">
                      {truncateText(data.accessCode, 15)}
                    </div>
                    {typeOfUser === "security" ? (
                      <div className={`font-[400] text-[11px] text-left  `}>
                        <StatusDropdown
                          data={data}
                          handleStatusChange={(status) =>
                            handleStatusChange(status, data._id)
                          }
                          isOpen={openDropdowns[data._id] || false}
                          toggleDropdown={() => toggleDropdown(data._id)}
                          typeOfUser={typeOfUser}
                        />
                      </div>
                    ) : (
                      <div
                        className={`relative text-[11px] leading-[16.5px] text-center ${
                          data?.accessStatus === "signed in"
                            ? "bg-successBg text-Success"
                            : ""
                        } ${
                          data?.accessStatus === "pending"
                            ? "bg-warningBg text-warning2"
                            : ""
                        } ${
                          data?.accessStatus === "signed out"
                            ? "bg-error text-white"
                            : ""
                        } flex items-center w-[105px]  h-[33px] rounded-[4px]  justify-between px-[12px] py-[8px]`}
                      >
                        <span
                          className={` sm:rounded-[8px] sm:py-[4px] sm:px-[8px] py-[8px] px-[12px] sm:h-[25px] h-[44px] ${
                            data?.accessStatus === "signed in"
                              ? "bg-successBg text-Success"
                              : data?.accessStatus === "pending"
                              ? "bg-warningBg text-warning2"
                              : "bg-error text-white"
                          }`}
                        >
                          {capitalizeFirstLetter(data?.accessStatus)}
                        </span>
                      </div>
                    )}

                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {formatTime(data?.timeIn) || "-----"}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {formatTime(data?.timeOut) || "-----"}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        lastThreePages={lastThreePages}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
      <CustomizedModal isOpen={modalIsOpen}>
        <div className="bg-white border flex flex-col md:w-[550px] h-fit p-[28px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-BlueHomz text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Tenant Information
            </p>

            <div>
              <button onClick={closeModal} className="cursor-pointer">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="w-[494px] h-[224px] py-[28px] px-[50px] flex flex-col rounded-[12px] bg-[#F6F6F6] space-y-6">
            <div className="flex gap-[50px]">
              <p className="text-[14px] leading-[21px] font-[500] w-[140px]">
                Tenant’s Name
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left">
                {tenant?.tenant?.fullName}
              </p>
            </div>
            <div className="flex gap-[50px]">
              <p className="text-[14px] leading-[21px] font-[500] w-[140px]">
                Property
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left">
                {tenant?.estateId?.name}
              </p>
            </div>
            <div className="flex gap-[50px]">
              <p className="text-[14px] leading-[21px] font-[500] w-[140px]">
                Apartment Number
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left">
                {tenant.ApartmentNo || "----"}
              </p>
            </div>
            <div className="flex gap-[50px]">
              <p className="text-[14px] leading-[21px] font-[500] w-[140px]">
                Address
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left">
                {tenant?.tenant?.houseAddress}
              </p>
            </div>
          </div>
          {typeOfUser != "security" && (
            <Link
              className="bg-[#006AFF] text-[#FFFFFF] text-[14px] font-[500] leading-[17.64px] flex items-center justify-center gap-[10px] rounded-[4px] h-[42px] p-[12px]"
              href={`/dashboard/enterprise-property/tenants/profile/${tenant?.tenant?._id}`}
            >
              <Image
                src="/static/images/new_user.svg"
                height={16}
                width={16}
                alt=""
              />
              <span>View tenant’s profile</span>
            </Link>
          )}
        </div>
      </CustomizedModal>
      {/* Mobile view for visitos's access information */}
      <VisitorAccessInfo
        tenant={tenant}
        typeOfUser={typeOfUser}
        detailsModalIsOpen={detailsModalIsOpen}
        closeDetailsMobileModal={closeDetailsMobileModal}
        handleStatusChange={(status) =>
          handleStatusChange(status, tenant?.tenant?._id)
        }
        isOpen={openDropdowns[tenant?.tenant?._id] || false}
        toggleDropdown={() => toggleDropdown(tenant?.tenant?._id)}
      />

      <ConfirmationModal
        isOpen={confirmStatusModal}
        title="Confirm Status Change"
        confirmatoryText="Are you sure you want to change the access status to 
        'Sign Out'? Once changed, this action cannot be undone."
        handleEvent={accessStatus}
        cancel={() => {
          setConfirmStatusModal(false);
        }}
        optionText="Yes, change status"
        optionText2="Cancel"
        image={true}
        // color="text-[#D92D20]"
      />

      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white border flex flex-col w-[350px]  py-[24px] px-[16px] rounded-[12px] gap-[18px] sm:absolute">
          <div className=" flex items-center justify-between">
            <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Filter by
            </p>

            <button onClick={closeMobileModal} className="cursor-pointer">
              <Image
                src="/static/images/close-square.svg"
                height={24}
                width={24}
                alt=""
              />
            </button>
          </div>

          <MobileDropDown />

          <button className="border w-[318px] h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer">
            <Image
              src={"/static/images/white_repeat.svg"}
              alt=""
              height={17}
              width={16}
            />

            <span className="text-[14px] leading-[17.64px] text-[700] text-white">
              Reset
            </span>
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default VisitorsTable;
