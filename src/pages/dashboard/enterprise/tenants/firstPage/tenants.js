"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TenantsTwo from "./tenantsTwo";
import Modal from "../components/modal";
import useBodyScroll from "@/utils/useBodyScroll";
import tenantsDataForLoggedInEnterprise from "@/store/enterpriseStore/tenantData";
import LoadingII from "@/components/mainmenu/loadingII";
import Dropdown from "../../components/dropDownFilter";
import formatDateII from "@/utils/formatDateII";
import useClickOutside from "@/utils/clickOutside";
import lowerCaseData from "@/utils/lowerCaseData";
import Add from "@/components/icons/add";
import AddBigBlue from "@/components/icons/addBigBlue";
import FilterMobile from "../../components/filterMobile";
import { useReactToPrint } from "react-to-print";
import Document from "@/components/icons/document";

const Tenants = () => {
  const [inviteTenant, setInviteTenant] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const dropdownRef = useClickOutside(() => setInviteTenant(false));
  const [searchQuery, setSearchQuery] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isMasterChecked, setIsMasterChecked] = useState(false);
  const printableRef = useRef();

  const clear = () => {
    setSelectedProperty(null);
    setSelectedStatus(null);
    setSelectedDate(null)
    setSearchQuery(null)
  };

  const toggleInvite = () => {
    setInviteTenant(true);
  };
  // useEffect to handle scrolling
  useBodyScroll([inviteTenant]);

  const { data, loading, fetchData } = tenantsDataForLoggedInEnterprise();

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const tenantData = data

  const options = [...new Set(tenantData?.map((item) => item?.estateId.name))];


  const options2 = ["Pending", "Paid", "Over due"];
  const filteredData = tenantData?.filter(
    (data) => {
      const matchesSearchQuery = !searchQuery ||
        data?.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const selectedDateTimestamp = Date.parse(selectedDate);
      const dueDateTimestamp = Date.parse(formatDateII(data?.rentInfo?.dueDate));
      return (
        (!selectedProperty || data?.estateId.name === selectedProperty) &&
        (!selectedStatus || data?.rentInfo?.paymentStatus === lowerCaseData(selectedStatus)) &&
        (!selectedDate || selectedDateTimestamp <= dueDateTimestamp) && matchesSearchQuery
      );
    });

  const openMobileFilterModal = () => {
    setFilterModal(!filterModal)
  }

  const closeMobileFilterModal = () => {
    setFilterModal(false)
  }

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: `${"Tenants Data"}`,
    onAfterPrint: () => console.log("Document printed."),
  });


  return (
    <div className=" w-full p-8 mb-8">
      {filterModal &&
        <div>
          <FilterMobile
            reset={clear}
            closeMobileModal={closeMobileFilterModal}
            setSelectedDate={setSelectedDate}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            options={options2}
            defaultName={"Status"}
          />
        </div>
      }
      {inviteTenant && (
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal dropdownRef={dropdownRef} setInviteTenant={setInviteTenant} />
        </div>
      )}
      {loading ? (
        <LoadingII />
      ) : (
        <div className="">
          {tenantData === null || tenantData === undefined || !tenantData ? (
            <div className="h-screen ">
              <div className="flex gap-2 items-center">
                <p className="text-[20px] font-[500]">Tenants</p>
                <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                  <span className="text-BlueHomz text-[18px] font-[400]">
                    0
                  </span>
                </span>
              </div>
              <div className="flex flex-col h-[70%] gap-3 mt-5 justify-center items-center">
                <div className="bg-whiteblue rounded-[100%] flex justify-center items-center h-[120px] w-[120px]">
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/tenants/profile-2user.png"
                    }
                    height={88}
                    width={88}
                    alt=""
                    className="mt-1"
                  />
                </div>
                <h1 className="text-[41px] leading-tight font-[700] text-BlueHomz">
                  Get Started
                </h1>
                <p className="text-[18px] text-center font-[400] text-GrayHomz">
                  Share your unique link to invite your tenants to your
                  properties.{" "}
                </p>
                <button
                  onClick={toggleInvite}
                  className="mt-2 p-[12px] w-[143px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700]"
                >
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                    }
                    alt=""
                    width={16}
                    height={16}
                  />
                  Invite Tenant
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-[20px] font-[500]">Tenants</p>
                  <span className="bg-whiteblue h-[35px] px-[10px] flex justify-center items-center rounded-[8px]">
                    <span className="text-BlueHomz text-[18px] font-[400]">
                      {filteredData?.length}
                    </span>
                  </span>
                  <div className="md:hidden" onClick={() => setInviteTenant(true)}>
                    <Add />
                  </div>
                  <button
                    className="hidden md:block"
                    onClick={toggleInvite}
                  >
                    <AddBigBlue />
                  </button>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <p className="text-[16px] font-[400] text-BlackHomz ">
                    Filter by:
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-[110px] xl:w-[128px]">
                      <Dropdown
                        options={options}
                        onSelect={(option) => setSelectedProperty(option)}
                        selectOption={
                          selectedProperty === null
                            ? "Property"
                            : selectedProperty
                        }
                        className="mr-2"
                      />
                    </div>
                    <div className="w-[110px] xl:w-[128px]">
                      <Dropdown
                        options={options2}
                        onSelect={(option) => setSelectedStatus(option)}
                        selectOption={
                          selectedStatus === null ? "Status" : selectedStatus
                        }
                        className="mr-2"
                      />
                    </div>
                    <input
                      type="date"
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border px-4 h-[42px] w-[110px] xl:w-[128px] text-GrayHomz2 border-GrayHomz2 font-[500] text-[14px] rounded cursor-pointer"
                    />

                    <button
                      onClick={clear}
                      type="text"
                      className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[42px] rounded cursor-pointer"
                    >
                      <Image
                        src={
                          "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                        }
                        alt=""
                        height={17}
                        width={16}
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between md:hidden w-full">
                  <div className="relative w-[86%] rounded-[4px]">
                    <input
                      type="text"
                      className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full "
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name"
                    />
                    <Image
                      src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
                      alt=""
                      className="absolute top-3 left-3"
                      height={16}
                      width={16}
                    />
                  </div>
                  <div className="border rounded-[4px] flex justify-center items-center border-BlueHomz w-[12%]">
                    <button
                      onClick={openMobileFilterModal}
                    >
                      <Image
                        src="/static/images/filter.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handlePrint}
                  className="w-full md:w-auto mt-2 items-center text-[11px] md:text-[14px] font-[500] gap-1 flex px-[10px] h-[42px] hover:bg-white text-BlueHomz hover:border hover:border-BlueHomz  hover:rounded cursor-pointer"
                >
                  <Document className='#006AFF' />
                  Download Page
                </button>
              </div>
              <TenantsTwo
                Data={filteredData}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                fetchDataAgain={fetchData}
                isMasterChecked={isMasterChecked}
                setIsMasterChecked={setIsMasterChecked}
                printableRef={printableRef}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tenants;
