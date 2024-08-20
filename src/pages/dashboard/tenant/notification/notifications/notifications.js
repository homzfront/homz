import Image from "next/image";
import React, { useEffect, useState } from "react";
import PopNotification from "../components/popNotification";
import timeAgo from "@/utils/timeAgo";
import sortDataByStatusAndDate from "@/utils/sortByStatusAndDate";
import { updateTenantNoti } from "@/api/notification";

const Notifications = ({ Data, openAndClose, setOpenAndClose, fetchData }) => {
  const [selectedId, setSelectedId] = useState([]);

  // Ensure that Data is defined and not null
  if (!Data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  // Ensure Data is defined before use
  const data = Data || []; // Assign an empty array if Data is undefined

  const selectedData = (data) => {
    updateTenantNoti(data?._id);
    fetchData();
    setSelectedId(data);
    setOpenAndClose(!openAndClose);
  };

  const closeMenu = () => {
    setOpenAndClose(false);
  };

  const sortedData = sortDataByStatusAndDate(data);

  return (
    <div className="h-full overflow-auto scrollbar-container">
      {sortedData?.map((data) => (
        <div key={data?._id} className={`${data?.status === "unseen" ? "bg-inputBg" : ""}`}>
          <div className="flex justify-between items-center border-b pt-3 pb-3">
            <div className="rounded-full md:shadow-md md:p-2 ml-2 md:ml-5">
              {

                data?.sender?.businessLogo?.url || data?.sender?.coverPhoto?.url ?
                  <Image
                    src={data?.sender?.coverPhoto?.url || data?.sender?.businessLogo?.url}
                    alt=""
                    height={40}
                    width={40}
                    layout="full" // Specify the desired height
                    objectFit="cover"
                    objectPosition="center"
                    className="object-cover bg-center h-[40px] rounded-full"
                    quality={100}
                    priority 
                    />
                  :
                  <Image src="/static/dashboard/enterprisemanager/notification/AvatarEmpty.png" alt="" height={40} width={40} />
              }
            </div>
            <div className="px-2 md:px-0 w-[75%] md:w-[85%]">
              <p className="text-[14px] md:text-[16px] font-[600] text-BlackHomz">
                {data?.subject}
              </p>
              <p className="text-[11px] md:text-[16px] text-justify font-[400] text-GrayHomz">
                {data?.message}
              </p>
              <p className="text-[11px] md:text-[13px] font-[400] text-GrayHomz">
                {timeAgo(data?.createdAt)}
              </p>
            </div>
            <p
              onClick={() => selectedData(data)}
              className={`md:pr-5 pr-2 text-[14px] md:text-[16px] font-[600] text-BlueHomz cursor-pointer`}
            >
              Open
            </p>
          </div>
        </div>
      ))}
      {openAndClose && (
        <PopNotification selectedId={selectedId} closeMenu={closeMenu} />
      )}
    </div>
  );
};

export default Notifications;
