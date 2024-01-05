"use client";
import React, { useState } from "react";
import Header from "./header/header";
import Filter from "./filter/filter";
import Notifications from "./notifications/notifications";
import Image from "next/image";

const Data = [
  {
    Id: 1,
    Noti: "Early Rent Incentive",
    Image: "/static/dashboard/enterprisemanager/notification/notification.png",
    Request: true,
    Time: "2 mins ago",
    Text: "Motivate your renters to pay rent on time by setting...",
  },
  {
    Id: 2,
    Noti: "Jimoh Michael",
    Image: "/static/dashboard/enterprisemanager/notification/AvatarFemale.png",
    Request: true,
    Time: "1 hour ago",
    Text: "Hello, I’m about to make payment for 2 years rent...",
  },
  {
    Id: 3,
    Noti: "Tenancy Request",
    Image: "/static/dashboard/enterprisemanager/notification/Avatar.png",
    Request: true,
    Time: "2 hour ago",
    Name: "Tunde Olayemi",
    Text: "Tunde Olayemi has sent a request to join your estate",
  },
  {
    Id: 4,
    Noti: "Tenancy Request",
    Image: "/static/dashboard/enterprisemanager/notification/AvatarEmpty.png",
    Request: false,
    Time: "4 hour ago",
    Name: "Jimoh Michael",
    Text: "Jimoh Michael has sent a request to join your estate",
  },
  {
    Id: 5,
    Noti: "Tenancy Request",
    Image: "/static/dashboard/enterprisemanager/notification/AvatarEmpty.png",
    Request: false,
    Time: "1 day ago",
    Text: "Michael David has sent a request to join your estate",
    Name: "Michael David",
  },
  {
    Id: 6,
    Noti: "Jimoh Michael",
    Image: "/static/dashboard/enterprisemanager/notification/AvatarFemale.png",
    Request: true,
    Time: "1 hour ago",
    Text: "Hello, I’m about to make payment for 2 years rent...",
  },
  {
    Id: 7,
    Noti: "Tenancy Request",
    Image: "/static/dashboard/enterprisemanager/notification/Avatar.png",
    Request: true,
    Time: "2 hour ago",
    Name: "Tunde Olayemi",
    Text: "Tunde Olayemi has sent a request to join your estate",
  },
  {
    Id: 8,
    Noti: "Tenancy Request",
    Image: "/static/dashboard/enterprisemanager/notification/AvatarEmpty.png",
    Request: false,
    Time: "4 hour ago",
    Name: "Jimoh Michael",
    Text: "Jimoh Michael has sent a request to join your estate",
  },
  {
    Id: 9,
    Noti: "Tenancy Request",
    Image: "/static/dashboard/enterprisemanager/notification/AvatarEmpty.png",
    Request: false,
    Time: "1 day ago",
    Text: "Michael David has sent a request to join your estate",
    Name: "Michael David",
  },
];

const Notification = () => {
   // Ensure that Data is defined and not null
   if (!Data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  // Ensure Data is defined before use
  const data = Data || []; // Assign an empty array if Data is undefined

  return (
    <div className="h-screen">
      <Header />
      <div className="py-8 px-10 border-b flex justify-between items-center relative">
        <div className="flex gap-4">
          <p className="font-[500] text-[20px]">Notifications</p>
          <div className="bg-whiteblue w-8 h-8 flex items-center justify-center rounded-md">
            <p className="font-[400] text-[18px] text-BlueHomz">
              {data.length}
            </p>
          </div>
        </div>
        {data?.length >= 1 && (
          <div>
            <Filter />
          </div>
        )}
      </div>
      {data?.length < 1 ? (
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
        <Notifications Data={data} />
      )}
    </div>
  );
};

export default Notification;
