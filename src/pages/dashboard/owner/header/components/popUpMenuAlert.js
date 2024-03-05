"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Notification from "../../notification/notification";
import Link from "next/link";
import PopNotification from "../../notification/components/popNotification";

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
];

const PopUpMenuAlert = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [popNoti, setPopNoti] = useState(false); // State for pop notification visibility


  const handleNotificationClick = (notification) => {
    setSelectedData(notification);
    setPopNoti(true); // Show pop notification when a notification is clicked
  };


console.log(selectedData); 
console.log(popNoti)

  const handlePopupClose = () => {
    setSelectedData(null);
  };

  return (
    <div>
      <div className="absolute right-[70px] top-[40px] w-[400px] h-[400px] rounded-lg bg-white shadow-md p-4 z-20">
        <div className="flex justify-between items-center">
          <p className="text-[13px] font-[500] text-BlackHomz">Notifications</p>
          <Link href={"/dashboard/property-owner/notificationPage"} className="flex items-center gap-1">
            <p className="text-[13px] font-[400] text-GrayHomz cursor-pointer">
              View all
            </p>
            <Image src={"/static/dashboard/enterprisemanager/notification/arrow-right.png"} height={17} width={16} alt="" />
          </Link>
        </div>
        <div>
          {Data.map((notification) => (
            <div key={notification.Id} className="mt-2">
              <div className="border-t pt-3">
                <div className="cursor-pointer flex items-start justify-between" onClick={() => handleNotificationClick(notification)}>
                  <div className="rounded-full shadow-md">
                    <Image src={notification.Image} alt="" height={40} width={40} />
                  </div>
                  <div className="w-[80%]">
                    <p className="text-[11px] font-[500] text-BlackHomz">{notification.Noti}</p>
                    <p className="text-[11px] font-[400] text-GrayHomz">{notification.Text}</p>
                    <p className="text-[10px] font-[400] text-GrayHomz">{notification.Time}</p>
                  </div>
                  <p className={`${notification.Request === true ? "bg-error" : "bg-transparent"} h-2 w-2 rounded-full`}></p>
                </div>
              </div>
              {popNoti && selectedData && selectedData.Id === notification.Id && (
                <PopNotification selectedId={selectedData} closeMenu={handlePopupClose} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PopUpMenuAlert;
