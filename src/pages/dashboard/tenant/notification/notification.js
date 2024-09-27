"use client";
import React, { useEffect, useState } from "react";
import Header from "./header/header";
import Filter from "./filter/filter";
import Notifications from "./components/notifications";
import Image from "next/image";
import tenantNotiReceive from "@/store/tenantStore/tenantNotiReceive";
import formatDateII from "@/utils/formatDateII";
import lowerCaseData from "@/utils/lowerCaseData";
import notificationsData from "./components/notificationsData";
import HeaderMobile from "./header/headerMobile";
import Widget from "./components/widget";


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

  const NotiData = notificationsData

  const options = ["Read", "Unread"];

  // const filteredData = noti?.filter(
  //   (data) => {
  //     const selectedDateTimestamp = Date.parse(selectedDate);
  //     const dueDateTimestamp = Date.parse(formatDateII(data?.createdAt));
  //     return (
  //       (!selectedStatus || data?.status === lowerCaseData(selectedStatus)) &&
  //       (!selectedDate || selectedDateTimestamp <= dueDateTimestamp) &&
  //       (!searchQuery ||
  //         data?.message.toLowerCase().includes(searchQuery.toLowerCase())
  //         || data?.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  //     );
  //   });

  const filteredData = NotiData?.filter((data) => {
    const selectedDateTimestamp = selectedDate ? Date.parse(selectedDate) : null;
    const dueDateTimestamp = data?.createdAt ? Date.parse(data.createdAt) : null;

    return (
      (!selectedStatus || data?.status === lowerCaseData(selectedStatus)) &&
      (!selectedDate || selectedDateTimestamp <= dueDateTimestamp) &&
      (!searchQuery ||
        data?.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data?.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="h-screen w-full">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <HeaderMobile
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        options={options}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        setSelectedDate={setSelectedDate}
        clear={clear}
        filteredData={filteredData}
      />
      <div className="hidden py-8 px-4 md:px-10 border-b md:flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between md:items-center relative">
        <div className="flex gap-4">
          <p className="font-[500] text-[20px]">Notifications</p>
          <div className="bg-whiteblue w-8 h-8 flex items-center justify-center rounded-md">
            <p className="font-[400] text-[18px] text-BlueHomz">
              {filteredData?.length ? filteredData?.length : "0"}
            </p>
          </div>
        </div>
        {NotiData?.length >= 1 && (
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
      {NotiData?.length < 1 ? (
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
        <Widget fetchNoti={fetchNoti} filteredData={filteredData} openAndClose={openAndClose} setOpenAndClose={setOpenAndClose}/>)}
    </div>
  );
};

export default Notification;
