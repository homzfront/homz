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
  const [selectedId, setSelectedId] = useState(null);
  const [openAndClose, setOpenAndClose] = useState(false);
  const [data, setData] = useState(Data || []);
  const selectedData = (data) => {
    setSelectedId(data);
    setOpenAndClose(!openAndClose);
  };
  console.log(selectedId);

  const closeMenu = () => {
    setOpenAndClose(false);
  };

  useEffect(() => {
    document.body.style.overflow = openAndClose ? "hidden" : "auto";
    if (openAndClose) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [openAndClose]);

  return (
    <div>
      <div className="absolute right-[110px] top-[40px] w-[400px] h-[400px] rounded-lg bg-white shadow-md p-4 z-20">
        <div className="flex justify-between items-center">
          <p className="text-[13px] font-[500] text-BlackHomz">Notifications</p>
          <Link href={"/dashboard/enterprise-property/notificationPage"}  className="flex items-center gap-1">
            <p
             
              className="text-[13px] font-[400] text-GrayHomz cursor-pointer"
            >
              View all
            </p>
            <Image
              src={
                "/static/dashboard/enterprisemanager/notification/arrow-right.png"
              }
              height={17}
              width={16}
              alt=""
            />
          </Link>
        </div>
        <div>
          {data.map((data) => (
            <div key={data.Id} className="mt-2" >
              <div className="flex items-start justify-between border-t pt-3 cursor-pointer" onClick={() => selectedData(data)}>
                <div className="rounded-full shadow-md">
                  <Image src={data.Image} alt="" height={40} width={40} />
                </div>
                <div className="w-[80%]">
                  <p className="text-[11px] font-[500] text-BlackHomz">
                    {data.Noti}
                  </p>
                  <p className="text-[11px] font-[400] text-GrayHomz">
                    {data.Text}
                  </p>
                  <p className="text-[10px] font-[400] text-GrayHomz">
                    {data.Time}
                  </p>
                </div>
                <p
                  className={`${
                    data.Request === true ? "bg-error" : "bg-transparent"
                  } h-2 w-2 rounded-full`}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openAndClose && (
       <PopNotification selectedId={selectedId} closeMenu={closeMenu}/>
      )}
    </div>
  );
};

export default PopUpMenuAlert;
