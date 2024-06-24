"use client";
import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import Image from "next/image";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import DropDown from "./dropDown";
import MobileDropDown from "./mobileDropDown";
import StatusDropdown from "./statusDropDown";
import Link from "next/link";

const VisitorsTable = ({ Data, searchValue }) => {
  // console.log(searchValue);
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState(Data || {});
  const [addNewVisitor, setAddNewVisitor] = useState(false);
  const [tenant, setTenant] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

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
    // setTenant(data);
  };
  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };
  const openDetailsMobileModal = (data) => {
    // console.log("data details", data);
    setDetailsModalIsOpen(true);
    setTenant(data);
  };
  const closeDetailsMobileModal = () => {
    setDetailsModalIsOpen(false);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const toggleDropdown = (dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: !prev[dataId] }));
  };

  const handleStatusChange = (status, dataId) => {
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));

    const dataIndex = data.findIndex((item) => item.id === dataId);

    if (dataIndex !== -1) {
      const updatedData = [...data];
      updatedData[dataIndex].AccessStatus = status;

      setData(updatedData);
    }
  };
  const handleRowClick = (data) => {
    // setData(Property);
    setTenant(data);
    // router.push(`/dashboard/enterprise-property/Property/${Property.id}`);
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
    <div className="flex flex-col px-2 md:px-0 gap-[1rem] md:gap-0 md:space-y-5">
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

      <div className="hidden md:flex justify-between items-center">
        <div className="">
          <p className="mb-2 text-[20px]">Visitor Access Request</p>
          <p className="text-[#A9A9A9] leading-[27px] mb-3">
            Visitor records of all your tenants will be displayed here
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[16px] font-[400] text-BlackHomz pt-1">
            Filter by:
          </p>
          <div className="pt-[5px]">
            <DropDown />
          </div>
          <button className="border border-BlueHomz items-center text-[14px] font-[500] flex text-BlueHomz px-[10px] p-1 rounded cursor-pointer">
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            Reset
          </button>
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
      <table className="border w-full px-2 md:px-0">
        <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz md:w-full text-center md:text-left h-[50px]">
          <tr>
            <th className="md:w-[40px] h-[48px] px-[16px] py-[14px]"></th>

            <th className="hidden md:table-cell w-[145px] h-[48px] py-[14px] text-[12px] px-[16px]">
              Tenant's Info
            </th>
            <th className="md:w-[123.11px] h-[48px] pr-[24px] py-[14px] text-[12px] md:px-[16px]">
              Visitor's Name
            </th>
            <th className="hidden md:table-cell md:w-[123.11px] h-[48px] px-[8px] py-[14px] text-[12px]">
              Phone Number
            </th>
            <th className="hidden md:table-cell md:w-[80px] h-[48px] px-[16px] text-[12px]">
              Purpose
            </th>
            <th className="hidden md:table-cell md:w-[112.33px] h-[48px] px-[8px] py-[14px] text-[12px]">
              No of persons
            </th>
            <th className="hidden md:table-cell md:w-[112.33px] h-[48px] px-[8px] py-[14px] text-[12px]">
              Date of visit
            </th>
            <th className=" md:w-[112.33px] h-[48px] pr-[24px] py-[12px] md:px-[16px] md:py-[14px] text-[12px]">
              Access Code
            </th>
            <th className="md:table-cell md:w-[112.33px] h-[48px] px-[8px] py-[14px] text-[12px]">
              {isMobile ? "Status" : " Access Status"}
            </th>
            <th className="hidden md:table-cell md:w-[82px] h-[48px] px-[16px] py-[14px] text-[12px]">
              Time in
            </th>
            <th className="hidden md:table-cell md:w-[82px] h-[48px] px-[16px] py-[14px] text-[12px]">
              Time out
            </th>
          </tr>
        </thead>
        <tbody className="">
          {currentData.map((data, index) => (
            <tr key={index} className="pl-3 cursor-pointer border border-b">
              <td className=" text-GrayHomz4 font-[500] text-[12px] py-[12px] px-[16px] h-[64px]">
                {data.AccessStatus == "Pending" && (
                  <Image
                    src="/static/images/RedEllipse.svg"
                    alt=""
                    width={8}
                    height={8}
                  />
                )}
              </td>
              <td className=" hidden  text-GrayHomz4 font-[500] py-[12px] px-[16px]  h-[64px] md:flex justify-between items-center">
                <span className="text-[11px] leading-[16.5px] text-[#006AFF]">
                  {data.TenantName}
                </span>
                <button onClick={() => openModal(data)}>
                  <Image
                    src="/static/images/arrow-down.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </button>
              </td>
              <td className="text-GrayHomz4 font-[500] md:w-[112px] py-[12px] px-[16px] h-[64px]">
                {isMobile ? (
                  <button
                    className="text-[11px] leading-[16.5px]"
                    onClick={() => openDetailsMobileModal(data)}
                  >
                    {data.VisitorName}
                  </button>
                ) : (
                  <span className="text-[11px] leading-[16.5px]">
                    {data.VisitorName}
                  </span>
                )}
              </td>

              <td
                className={`text-GrayHomz font-[500] text-[11px] leading-[16.5px] break-words  md:w-[112px] py-[12px] px-[8px] h-[64px] ${
                  "hidden md:table-cell" // Hide on mobile
                }`}
              >
                {data.Phone_Number}
              </td>
              <td
                className={`text-GrayHomz font-[500] text-[11px] leading-[16.5px] w-[85px] py-[12px] px-[16px] h-[64px] ${
                  "hidden md:table-cell" // Hide on mobile
                }`}
              >
                {data.PurposeOfVisit}
              </td>
              <td
                className={`text-GrayHomz font-[500] text-[12px]  md:w-[112px] p-[12px] h-[64px] text-center hidden md:table-cell`}
              >
                {data.No_Of_Persons}
              </td>
              <td className="hidden md:table-cell md:w-[112px] py-[12px] px-[8px] h-[64px] text-[11px] leading-[16.5px] text-GrayHomz font-[500]">
                {data.DateOfVisit}
              </td>
              <td className="md:table-cell md:w-[112px] md:py-[12px] md:px-[16px] text-GrayHomz font-[500] text-[11px] leading-[16.5px]">
                {isMobile ? (
                  <button
                    className="text-[11px] leading-[16.5px]"
                    onClick={() => openDetailsMobileModal(data)}
                  >
                    {data.AccessCode}
                  </button>
                ) : (
                  <span className="text-[11px] leading-[16.5px]">
                    {data.AccessCode}
                  </span>
                )}
              </td>
              <td
                className={`text-center md:text-left font-[500]  md:w-[112px] py-[12px] px-[8px] h-[64px] text-[12px] `}
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
              <td className="hidden md:table-cell text-[11px] leading-[16.5px] md:w-[82px] p-[12px] h-[64px]">
                {data.TimeIn}
              </td>
              <td className="hidden md:table-cell text-[11px] leading-[16.5px]  md:w-[82px] p-[12px] h-[64px]">
                {data.Time_Out}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        lastThreePages={lastThreePages}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
      <CustomizedModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white adminCellBorders flex flex-col md:w-[550px] h-[324px] p-[28px] rounded-[12px] gap-[18px]">
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
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">
                Tenant’s Name
              </p>
              <p className="text-[14px] leading-[21px] font-[500]">
                {tenant.TenantName}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">Property</p>
              <p className="text-[14px] leading-[21px] font-[500]">
                {tenant.Property}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">
                Apartment Number
              </p>
              <p className="text-[14px] leading-[21px] font-[500]">
                {tenant.ApartmentNo}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">Address</p>
              <p className="text-[14px] leading-[21px] font-[500]">
                {tenant.Address}
              </p>
            </div>
          </div>
        </div>
      </CustomizedModal>
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white adminCellBorders flex flex-col w-[350px]  py-[24px] px-[16px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Filter by
            </p>

            <div>
              <button onClick={closeMobileModal} className="cursor-pointer">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>

          <MobileDropDown />

          <button className="adminBorders w-[318px] h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-3">
            <span>
              <Image
                src={"/static/images/white_repeat.svg"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            <span className="text-[14px] leading-[17.64px] text-[700] text-white">
              Reset
            </span>
          </button>
        </div>
      </CustomizedModal>
      <CustomizedModal
        isOpen={detailsModalIsOpen}
        onRequestClose={closeDetailsMobileModal}
      >
        <div className="bg-white adminCellBorders flex flex-col w-[360px]  py-[24px] px-[16px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-BlueHomz text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Access Request Information
            </p>

            <div>
              <button
                onClick={closeDetailsMobileModal}
                className="cursor-pointer"
              >
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="w-[320px] p-[16px] flex flex-col rounded-[12px] bg-[#F6F6F6] space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Tenant’s Name
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.TenantName}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Property
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.Property}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Apartment Number
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.ApartmentNo}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Address
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.Address}
              </p>
            </div>
          </div>

          <div className="w-[320px] p-[16px] flex flex-col rounded-[12px] bg-[#F6F6F6] space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Visitor’s Name
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.VisitorName}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Phone Nuumber
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.Phone_Number}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Purpose
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.PurposeOfVisit}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                No of visitors
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.No_Of_Persons}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Date of visit
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.DateOfVisit}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Access Code
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.AccessCode}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Access Status
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                <StatusDropdown
                  data={tenant}
                  handleStatusChange={(status) =>
                    handleStatusChange(status, tenant.id)
                  }
                  isOpen={openDropdowns[tenant.id] || false}
                  toggleDropdown={() => toggleDropdown(tenant.id)}
                />
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Tenant’s Name
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.TenantName}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Time In
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.TimeIn}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] leading-[13.86px] font-[400]">
                Time Out
              </p>
              <p className="text-[11px] leading-[13.86px] font-[400]">
                {tenant.Time_Out}
              </p>
            </div>
          </div>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default VisitorsTable;
