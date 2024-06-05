"use client";
import React, { useEffect, useState } from "react";
import DropDown from "../components/threeDropDown";
import Image from "next/image";
import TenantsTwo from "./tenantsTwo";
import Modal from "../components/modal";
import useBodyScroll from "@/utils/useBodyScroll";
import tenantsDataForLoggedInOwner from "@/store/propertyOwnerStore/tenantsDataForLoggedInOwner";
import formatDateII from "@/utils/formatDateII";
import lowerCaseData from "@/utils/lowerCaseData";
import Dropdown from "../../components/dropDownFilter";
import FilterMobile from "../../components/filterMobile";

const Tenants = () => {
  const [inviteTenant, setInviteTenant] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filterModal, setFilterModal] = useState(false);

  const clear = () => {
    setSelectedProperty(null);
    setSelectedStatus(null);
    setSelectedDate(null)
    setSearchQuery(null)
  };

  const { data, loading, fetchData } = tenantsDataForLoggedInOwner();

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

  return (
    <div className=" w-full p-8">
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
      <div className="">
        {data?.length < 1 ? (
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Tenants</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz text-[18px] font-[400]">
                  0
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-3 mt-5 h-[600px] justify-center items-center">
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

              <p className="text-[18px] font-[400] text-center text-GrayHomz">
                All registered tenants under your property will be visible here
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="md:flex justify-between  items-center">
              <div className="flex gap-1">
                <p>Tenants</p>
                <span className="bg-whiteblue w-6 h-6 flex justify-center ">
                  <span className="text-BlueHomz ">{tenantData?.length ? tenantData?.length : "0"}</span>
                </span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <p className="text-[16px] font-[400] text-BlackHomz">
                  Filter by:{" "}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-[180px]">
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
                  <div className="w-[120px]">
                    <Dropdown
                      options={options2}
                      onSelect={(option) => setSelectedStatus(option)}
                      selectOption={
                        selectedStatus === null ? "Status" : selectedStatus
                      }
                      className="mr-2"
                    />
                  </div>
                </div>

                <input
                  type="date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border px-4 h-[42px] w-[130px] text-GrayHomz2 mb-1 p-2 rounded cursor-pointer"
                />

                <button
                  onClick={clear}
                  type="text"
                  className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[42px] w-[92px] mb-1 p-1 rounded cursor-pointer"
                >  <span>
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
            </div>
            <TenantsTwo data={filteredData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tenants;
