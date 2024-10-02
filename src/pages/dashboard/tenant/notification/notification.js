"use client";
import React, { useEffect, useState } from "react";
import Header from "./header/header";
import Filter from "./filter/filter";
import Notifications from "./components/notifications";
import Image from "next/image";
import tenantNotiReceive from "@/store/tenantStore/tenantNotiReceive";
import formatDateII from "@/utils/formatDateII";
import lowerCaseData from "@/utils/lowerCaseData";
import HeaderMobile from "./header/headerMobile";
import Widget from "./components/widget";
import NotiTenant from "@/components/icons/notiTenant"

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
        <Widget fetchNoti={fetchNoti} filteredData={filteredData} openAndClose={openAndClose} setOpenAndClose={setOpenAndClose} />)}
    </div>
  );
};

export default Notification;



const notificationsData = [
  {
    id: 1,
    subject: "Rent Information Update",
    message: "Your rent amount was updated to [New Rent Amount].",
    action: "Review details",
    date: "September 20, 2024",
    image: <NotiTenant />,
    time: "11:30 AM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 2,
    subject: "Property Information Update",
    message: "Property Address was updated to [New Property Address].",
    action: null,
    date: "September 20, 2024",
    image: <NotiTenant />,
    time: "11:30 AM",
    status: "unread",
    type: "Property Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 3,
    subject: "Rent Information Update",
    message: "Your rent payment for [Rent Start Date] to [Rent Due Date] was confirmed.",
    action: "Review payment details.",
    date: "September 21, 2024",
    image: <NotiTenant />,
    time: "10:45 AM",
    status: "read",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 4,
    subject: "Property Information Update",
    message: "Manager's contact was updated to [New Manager's Contact Name].",
    action: null,
    date: "September 21, 2024",
    image: <NotiTenant />,
    time: "10:30 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 5,
    subject: "Property Information Update",
    message: "Property Address for [Property Name] was updated to [New Property Address].",
    action: null,
    date: "September 22, 2024",
    image: <NotiTenant />,
    time: "09:15 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 6,
    subject: "Property Information Update",
    message: "Property Name for [Old Property Name] was updated to [New Property Name].",
    action: null,
    date: "September 24, 2024",
    image: <NotiTenant />,
    time: "08:20 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 7,
    subject: "Rent Cashback!",
    message: "You received a cashback on your last rent payment.",
    action: null,
    date: "September 24, 2024",
    image: <NotiTenant />,
    time: "08:00 AM",
    status: "read",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:30:00Z",
  },
  {
    id: 8,
    subject: "Rent Information Update",
    message: "Your rent was increased by 5%.",
    action: "Review details",
    date: "September 25, 2024",
    image: <NotiTenant />,
    time: "09:00 AM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 9,
    subject: "Property Information Update",
    message: "The property manager's email was updated to [New Manager Email].",
    action: null,
    date: "September 25, 2024",
    image: <NotiTenant />,
    time: "08:30 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 10,
    subject: "Rent Cashback!",
    message: "You received a cashback reward on your rent.",
    action: null,
    date: "September 24, 2024",
    image: <NotiTenant />,
    time: "03:15 PM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:30:00Z",
  },
  {
    id: 11,
    subject: "Property Information Update",
    message: "The property's contact details have been updated.",
    action: null,
    date: "September 25, 2024",
    image: <NotiTenant />,
    time: "12:45 PM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 12,
    subject: "Rent Information Update",
    message: "Your rent payment for [Rent Start Date] to [Rent Due Date] was confirmed.",
    action: "Review payment details.",
    date: "September 26, 2024",
    image: <NotiTenant />,
    time: "11:00 AM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-21T10:30:00Z",
  },
  {
    id: 13,
    subject: "Property Information Update",
    message: "A new property has been assigned to you.",
    action: null,
    date: "September 26, 2024",
    image: <NotiTenant />,
    time: "10:30 AM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-21T10:45:00Z",
  },
  {
    id: 14,
    subject: "Rent Information Update",
    message: "Your rent payment for this month is overdue.",
    action: "Review details",
    date: "September 27, 2024",
    image: <NotiTenant />,
    time: "02:15 PM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 15,
    subject: "Rent Cashback!",
    message: "You received a cashback on your rent payment.",
    action: null,
    date: "September 27, 2024",
    image: <NotiTenant />,
    time: "01:00 PM",
    status: "read",
    type: "Rent Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 16,
    subject: "Property Information Update",
    message: "Your property lease has been extended.",
    action: null,
    date: "September 27, 2024",
    image: <NotiTenant />,
    time: "03:45 PM",
    status: "unread",
    type: "Property Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 17,
    subject: "Rent Information Update",
    message: "Your rent payment for [Rent Start Date] to [Rent Due Date] was confirmed.",
    action: "Review payment details.",
    date: "September 28, 2024",
    image: <NotiTenant />,
    time: "12:00 PM",
    status: "unread",
    type: "Rent Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 18,
    subject: "Property Information Update",
    message: "The property's maintenance has been scheduled.",
    action: null,
    date: "September 28, 2024",
    image: <NotiTenant />,
    time: "02:00 PM",
    status: "read",
    type: "Property Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
  {
    id: 19,
    subject: "Rent Cashback!",
    message: "Your cashback for the rent has been applied.",
    action: null,
    date: "September 28, 2024",
    image: <NotiTenant />,
    time: "11:45 AM",
    status: "read",
    type: "Rent Updates",
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 20,
    subject: "Property Information Update",
    message: "Property location updated to [New Location].",
    action: null,
    date: "September 29, 2024",
    image: <NotiTenant />,
    time: "04:00 PM",
    status: "unread",
    type: "Property Updates",
    createdAt: "2024-09-25T09:00:00Z",
  },
];

