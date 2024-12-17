"use client";
import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Image from "next/image";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import DropDown from "./dropDown";
import StatusDropdown from "./statusDropDown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VisitorAccessInfo from "./visitorAccessInfo";

const VisitorsTable = ({ Data, searchValue, setModalOpen, typeOfUser }) => {
  // console.log(searchValue);

  const tenantId = "6744607a7276c599d24bd0dc";
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState(Data || {});
  // const [addNewVisitor, setAddNewVisitor] = useState(false);
  const [tenant, setTenant] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("all");
  // const [modalOpen, setModalOpen] = useState(false);

  const openNewRecordModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    console.log(openDropdowns);
  }, [openDropdowns]);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  const router = useRouter();

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
    // console.log(openDropdowns);
  };
  const openMobileModal = () => {
    setMobileModalIsOpen(true);
    // setTenant(data);
  };
  // const closeMobileModal = () => {
  //   setMobileModalIsOpen(false);
  // };
  const openDetailsMobileModal = (data) => {
    // console.log("data details", data);
    setDetailsModalIsOpen(true);
    setTenant(data);
  };
  const closeDetailsMobileModal = () => {
    setDetailsModalIsOpen(false);
    // console.log(openDropdowns);
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
    // console.log(dataId)
    setOpenDropdowns((prev) => ({ ...prev, [dataId]: false }));

    const dataIndex = data.findIndex((item) => item.id === dataId);

    if (dataIndex !== -1) {
      const updatedData = [...data];
      updatedData[dataIndex].AccessStatus = status;

      setData(updatedData);
    }
  };

  // route to the tenant profile page
  const viewTenantProfile = (tenant_Id) => {
    router.push(`/dashboard/enterprise-property/tenants/profile/${tenant_Id}`);
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
            <div className="pt-[5px]">
              <DropDown />
            </div>
            <button className="border border-BlueHomz items-center text-[14px] font-[500] flex text-BlueHomz px-[10px] p-1 rounded cursor-pointer">
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
            </button>
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
      <div className="overflow-x-auto scrollbar-container">
        <div className="w-[100%] md:w-[180%]">
          <div className="border rounded-t-[12px]">
            {/* Header Section */}

            <div className="bg-whiteblue h-[60px] grid sm:grid-cols-[15px_repeat(10,1fr)] grid-cols-[5px_repeat(3,1fr)] sm:gap-x-10 gap-x-4 font-[500] text-BlackHomz text-[13px] px-2 rounded-t-[12px] pt-4">
              <div className="items-left"></div>
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
                    key={data?.id}
                    className="grid sm:grid-cols-[15px_repeat(10,1fr)]  grid-cols-[5px_repeat(3,1fr)] sm:gap-x-10 gap-x-4  items-center border-b-[1px] px-2 h-[60px]"
                  >
                    <div
                      className="font-[500] text-[11px] text-left "
                      // onClick={() => handleRowClick(data)}
                    >
                      {data.AccessStatus == "Pending" && (
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
                          {data.TenantName}
                        </button>
                      ) : (
                        <>
                          <span className="text-[11px] leading-[16.5px] text-[#006AFF]">
                            {data.TenantName}
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
                        {data.VisitorName}
                      </span>
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data.Phone_Number}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data.PurposeOfVisit}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data.No_Of_Persons}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data.DateOfVisit}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left">
                      {data.AccessCode}
                    </div>
                    <div className={`font-[400] text-[11px] text-left  `}>
                      <StatusDropdown
                        data={data}
                        handleStatusChange={(status) =>
                          handleStatusChange(status, data.id)
                        }
                        isOpen={openDropdowns[data.id] || false}
                        toggleDropdown={() => toggleDropdown(data.id)}
                      />
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data.TimeIn}
                    </div>
                    <div className="text-GrayHomz font-[500] text-[11px] text-left sm:block hidden">
                      {data.Time_Out}
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
          {typeOfUser != "security" && (
            <button
              className="bg-[#006AFF] text-[#FFFFFF] text-[14px] font-[500] leading-[17.64px] flex items-center justify-center gap-[10px] rounded-[4px] h-[42px] p-[12px]"
              onClick={() => viewTenantProfile(tenantId)}
            >
              <Image
                src="/static/images/new_user.svg"
                height={16}
                width={16}
                alt=""
              />
              <span>View tenant’s profile</span>
            </button>
          )}
        </div>
      </CustomizedModal>
      {/* Mobile view for visitos's access information */}
      <VisitorAccessInfo
        tenant={tenant}
        typeOfUser={typeOfUser}
        detailsModalIsOpen={detailsModalIsOpen}
        closeDetailsMobileModal={closeDetailsMobileModal}
        handleStatusChange={(status) => handleStatusChange(status, tenant.id)}
        isOpen={openDropdowns[tenant.id] || false}
        toggleDropdown={() => toggleDropdown(tenant.id)}
      />
    </div>
  );
};

export default VisitorsTable;
