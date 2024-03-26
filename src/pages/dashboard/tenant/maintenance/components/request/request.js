"use client"
import React, { useState } from "react";
import Dropdown from "../../../components/dropDownFilter";
import Image from "next/image";
import Widget from "../widget/widget";
import MaintenanceRequest from "../maintenanceRequest/maintenanceRequest";
import lowerCaseData from "@/utils/lowerCaseData";
import formatDateII from "@/utils/formatDateII";

const Request = ({ data, openMaintenanceForm, maintenanceReq, closeMaintenanceForm,
  fetchData }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const clear = () => {
    setSelectedStatus(null);
    setSelectedDate(null)
  };
  const options = ["Pending", "In-progress", "Resolved"];
  const filteredData = data?.filter(
    (data) => {
      const selectedDateTimestamp = Date.parse(selectedDate);
      const dueDateTimestamp = Date.parse(formatDateII(data?.requestDate));
      return (
        (!selectedStatus || data?.status === lowerCaseData(selectedStatus)) &&
        (!selectedDate || selectedDateTimestamp <= dueDateTimestamp)
      );
    });

  return (
    <div>
      {maintenanceReq ? (
        <div>
          <MaintenanceRequest
            closeMaintenanceForm={closeMaintenanceForm}
            data={data}
            fetchData={fetchData}
          />
        </div>
      ) : (
        <div>
          <div className="p-9 flex items-center justify-between w-full border-b">
            <p className="text-[20px] font-[500] text-BlackHomz">
              Maintenance Request
            </p>
            <div className="flex items-center justify-center gap-2 ">
              <p className="text-[16px] font-[400] text-BlackHomz">
                Filter by:
              </p>
              <div className="mb-1 w-[160px]">
                <Dropdown
                  options={options}
                  onSelect={(option) => setSelectedStatus(option)}
                  selectOption={
                    selectedStatus === null ? "Status" : selectedStatus
                  }
                />
              </div>
              <input
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-4 h-[42px] w-[130px] text-GrayHomz2 mb-1 p-2 rounded cursor-pointer"
              />
              <button
                onClick={clear}
                type="text"
                className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[45px] w-[92px] mb-1 p-1 rounded cursor-pointer">
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
              <button
                onClick={openMaintenanceForm}
                className="bg-BlueHomz w-[220px] mb-1 h-[45px] text-white rounded-[4px]"
              >
                Request for maintenance
              </button>
            </div>
          </div>
          <div>
            <Widget data={filteredData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
