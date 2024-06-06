"use client";
import React, { useEffect, useState } from "react";
import Filter from "./components/filter";
import Box from "../components/box";
import MaintenanceTable from "./components/maintenanceTable";
import LoadingII from "@/components/mainmenu/loadingII";
import formatDateII from "@/utils/formatDateII";
import useMaintenanceRequestStore from "@/store/enterpriseStore/useMaintenanceStore";
import Image from "next/image";
import FilterMobile from "../components/filterMobile";

const Maintenance = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null)
  const [filterModal, setFilterModal] = useState(false);

  const { request, loading, fetchData } =
    useMaintenanceRequestStore();

  useEffect(() => {
    fetchData();
  }, []);

  const clear = () => {
    setSelectedStatus(null);
    setSelectedArea(null);
    setSelectedDate(null);
    setSearchQuery(null)
  };

  const openMobileFilterModal = () => {
    setFilterModal(!filterModal)
  }

  const closeMobileFilterModal = () => {
    setFilterModal(false)
  }


  const options = [
    ...new Set(
      request?.results?.map((item) => item?.status)
    ),
  ];

  const options2 = [
    ...new Set(
      request?.results?.map((item) => item?.tenant?.estateId?.name)
    ),
  ];

  const filteredData = request?.results?.filter((data) => {
    const matchesSearchQuery = !searchQuery ||
      data?.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const selectedDateTimestamp = Date.parse(selectedDate);
    const createdDateTimestamp = Date.parse(formatDateII(data?.createdAt));
    return (
      (!selectedStatus ||
        data?.status === selectedStatus) &&
      (!selectedArea ||
        data?.tenant?.estateId?.name === selectedArea) &&
      (!selectedDate || selectedDateTimestamp <= createdDateTimestamp) && matchesSearchQuery
    );
  });

  const pendingRequest = request?.results?.filter((request) => {
    return request.status === "pending";
  });
  // Get the length of the filtered data
  const pendingCount = pendingRequest?.length;

  const resolvedRequest = request?.results?.filter((request) => {
    return request.status === "resolved";
  });
  // Get the length of the filtered data
  const resolvedCount = resolvedRequest?.length;

  return (
    <div className="relative block w-full p-8">
      {filterModal &&
        <div>
          <FilterMobile
            reset={clear}
            closeMobileModal={closeMobileFilterModal}
            setSelectedDate={setSelectedDate}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            options={options}
            defaultName={"Status"}
          />
        </div>
      }
      {loading ? (
        <LoadingII />
      ) : request?.results && request?.results?.length >= 1 ? (
        <div className="">
          <div className="hidden md:flex justify-between items-center">
            <p className="text-[20px] font-[500] text-BlackHomz">Maintenance</p>
            <Filter
              selectedArea={selectedArea}
              selectedStatus={selectedStatus}
              selectedDate={selectedDate}
              setSelectedArea={setSelectedArea}
              setSelectedStatus={setSelectedStatus}
              setSelectedDate={setSelectedDate}
              options={options}
              options2={options2}
              clear={clear}
            />
          </div>
          <div className="flex justify-between md:hidden w-full">
            <div className="relative w-[86%] rounded-[4px]">
              <input
                type="text"
                className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full "
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject"
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
          <div className="hidden md:absolute border-t w-full left-0 top-[105px]"></div>
          <div className="hidden md:flex gap-4 mt-[70px]">
            <Box
              type={"Total Requests"}
              money={request?.results?.length}
              border={"border-BlueHomz"}
              textColor={"text-BlueHomz"}
              textColor2={"text-BlueHomz"}
              bgColor={"whiteblue"}
            />
            <Box
              type={"Pending Request"}
              money={pendingCount}
              border={"border-warning2"}
              textColor={"text-warning2"}
              textColor2={"text-BlackHomz"}
              bgColor={"warningBg"}
            />
            <Box
              type={"Resolved Requests"}
              money={resolvedCount}
              border={"border-Success"}
              textColor={"text-Success"}
              textColor2={"text-BlackHomz"}
              bgColor={"successBg"}
            />
          </div>
          <div className="md:hidden w-full mt-[32px]">
            <Box
              type={"Total Requests"}
              money={request?.results?.length}
              border={"border-BlueHomz"}
              textColor={"text-BlueHomz"}
              textColor2={"text-BlueHomz"}
              bgColor={"whiteblue"}
            />
            <div className="flex mt-4 gap-4">
              <Box
                type={"Pending Request"}
                money={pendingCount}
                border={"border-warning2"}
                textColor={"text-warning2"}
                textColor2={"text-BlackHomz"}
                bgColor={"warningBg"}
              />
              <Box
                type={"Resolved Requests"}
                money={resolvedCount}
                border={"border-Success"}
                textColor={"text-Success"}
                textColor2={"text-BlackHomz"}
                bgColor={"successBg"}
              />
            </div>
          </div>
          <div>
            <MaintenanceTable fetchData={fetchData} request={filteredData} />
          </div>
        </div>
      ) : (
        <div className="">
          <div className="p-9 flex items-center justify-between w-full border-b">
            <p className="text-[20px] font-[500] text-BlackHomz">
              Maintenance Request
            </p>
          </div>
          <div className=" p-8">
            <div className="flex flex-col gap-4">
              <p className="text-[18px] font-[400] text-GrayHomz">
                No maintenance request from tenant(S).
              </p>
            </div>
            <div className="h-[450px] w-full flex items-center justify-around">
              <div className="flex flex-col justify-center items-center gap-1 h-[400px]">
                <div className="w-[120px] h-[120px] bg-whiteblue rounded-[100%] flex justify-center items-center">
                  <Image
                    src={"/static/dashboard/tenant/maintenance/setting-2.png"}
                    alt=""
                    height={89}
                    width={89}
                    className="m-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
