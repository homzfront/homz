"use client";
import React, { useEffect, useState } from "react";
import Header from "./header/header";
import Filter from "./filter/filter";
import Notifications from "./notifications/notifications";
import Image from "next/image";
import tenantNotiReceive from "@/store/tenantStore/tenantNotiReceive";
import formatDateII from "@/utils/formatDateII";
import lowerCaseData from "@/utils/lowerCaseData";


const Notification = () => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openAndClose, setOpenAndClose] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: noti, loading: laodingNoti, fetchData: fetchNoti } = tenantNotiReceive();

  useEffect(() => {
    fetchNoti(); // Fetch data on component mount
  }, []);


  const clear = () => {
    setSelectedStatus(null);
    setSelectedDate(null)
    setSearchQuery('')
  };

  const options = ["Seen", "Unseen"];

  const filteredData = noti?.filter(
    (data) => {
      const selectedDateTimestamp = Date.parse(selectedDate);
      const dueDateTimestamp = Date.parse(formatDateII(data?.createdAt));
      console.log(dueDateTimestamp);
      console.log(selectedDateTimestamp)
      return (
        (!selectedStatus || data?.status === lowerCaseData(selectedStatus)) &&
        (!selectedDate || selectedDateTimestamp <= dueDateTimestamp) &&
        (!searchQuery ||
          data?.message.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

  console.log(filteredData);

  return (
    <div className="h-screen">
      <Header  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="py-8 px-10 border-b flex justify-between items-center relative">
        <div className="flex gap-4">
          <p className="font-[500] text-[20px]">Notifications</p>
          <div className="bg-whiteblue w-8 h-8 flex items-center justify-center rounded-md">
            <p className="font-[400] text-[18px] text-BlueHomz">
              {filteredData?.length ? filteredData?.length : "0"}
            </p>
          </div>
        </div>
        {noti?.length >= 1 && (
          <div>
            <Filter
              options={options}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              setSelectedDate={setSelectedDate}
              clear={clear}
            />
          </div>
        )}
      </div>
      {noti?.length < 1 ? (
        <div className="flex flex-col justify-center items-center gap-2 mt-36">
          <div>
            <Image
              src={
                "/static/dashboard/enterprisemanager/notification/Vector.png"
              }
              alt=""
              height={59}
              width={54}
            />
          </div>
          <p className="text-[20px] font-[700] text-BlackHomz">
            You have no notifications at the moment
          </p>
          <p className="text-[16px] font-[400] text-GrayHomz">
            All notifications you receive will be displayed here when available
          </p>
        </div>
      ) : (
        <Notifications fetchData={fetchNoti} Data={filteredData} openAndClose={openAndClose} setOpenAndClose={setOpenAndClose} />
      )}
    </div>
  );
};

export default Notification;
