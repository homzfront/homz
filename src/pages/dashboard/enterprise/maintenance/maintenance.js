"use client";
import React, { useEffect, useState } from "react";
import Filter from "./components/filter";
import Box from "../components/box";
import MaintenanceTable from "./components/maintenanceTable";
import LoadingII from "@/components/mainmenu/loadingII";
import formatDateII from "@/utils/formatDateII";
import useMaintenanceRequestStore from "@/store/enterpriseStore/useMaintenanceStore";
import Image from "next/image";

const Maintenance = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { request, tenantData, loading, fetchData } =
    useMaintenanceRequestStore();

  useEffect(() => {
    fetchData();
  }, []);

  const clear = () => {
    setSelectedStatus(null);
    setSelectedArea(null);
    setSelectedDate(null);
  };

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
    const selectedDateTimestamp = Date.parse(selectedDate);
    const createdDateTimestamp = Date.parse(formatDateII(data?.createdAt));
    return (
      (!selectedStatus ||
        data?.status === selectedStatus) &&
      (!selectedArea ||
        data?.tenant?.estateId?.name === selectedArea) &&
      (!selectedDate || selectedDateTimestamp <= createdDateTimestamp)
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
      {loading ? (
        <LoadingII />
      ) : request?.results && request?.results?.length >= 1 ? (
        <div className="">
          <div className="flex justify-between items-center">
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
          <div className="absolute border-t w-full left-0 top-[105px]"></div>
          <div className="flex gap-4 mt-[70px]">
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

          <div>
            <MaintenanceTable fetchData={fetchData} request={filteredData} tenantData={tenantData} />
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
