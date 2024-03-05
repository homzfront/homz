"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Notification from "../../notification/notification";
import Link from "next/link";
import PopNotification from "../../notification/components/popNotification";
import useBodyScroll from "@/utils/useBodyScroll";
import timeAgo from "@/utils/timeAgo";



const PopUpMenuAlert = ({ selectedData, Data, dropdownRef }) => {

  console.log(Data)

  return (
    <div ref={dropdownRef}>
      <div className="absolute right-[120px] top-[60px] w-[400px] max-h-[400px] h-auto rounded-lg bg-white shadow-md p-4 z-20">
        <div className="flex justify-between items-center">
          <p className="text-[13px] font-[500] text-BlackHomz">Notifications</p>
          <Link href={"/dashboard/tenant/notificationPage"} className="flex items-center gap-1">
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
          {Data?.slice(0, 5)?.map((data) => (
            <div key={data._id} className="mt-2" >
              <div className="flex items-start justify-between border-t pt-3 cursor-pointer" onClick={() => selectedData(data)}>
                <div className="rounded-full shadow-md">
                  {

                    data?.sender?.businessLogo?.url || data?.sender?.coverPhoto?.url ? <Image src={data?.sender?.coverPhoto?.url || data?.sender?.businessLogo?.url} alt="" height={40} width={40} className="rounded-full"/>
                      :
                      <Image src="/static/dashboard/enterprisemanager/notification/AvatarEmpty.png" alt="" height={40} width={40} />
                  }

                </div>
                <div className="w-[80%]">
                  <p className="text-[11px] font-[500] text-BlackHomz">
                    {data?.subject}
                  </p>
                  <p className="text-[11px] font-[400] text-GrayHomz">
                    {data?.message}
                  </p>
                  <p className="text-[10px] font-[400] text-GrayHomz">
                    {timeAgo(data?.createdAt)}
                  </p>
                </div>
                <p
                  className={`${data.status === "unseen" ? "bg-error" : "bg-transparent"
                    } h-2 w-2 rounded-full`}
                ></p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PopUpMenuAlert;
