import Image from "next/image";
import React, { useEffect, useState } from "react";
import PopNotification from "./popNotification";
import timeAgo from "@/utils/timeAgo";
import sortDataByStatusAndDate from "@/utils/sortByStatusAndDate";
import { updateTenantNoti } from "@/api/notification";
import Link from "next/link";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";

const Notifications = ({ Data, openAndClose, setOpenAndClose, fetchData }) => {
  const [selectedId, setSelectedId] = useState([]);

  // Ensure that Data is defined and not null
  if (!Data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  // Ensure Data is defined before use
  const data = Data || []; // Assign an empty array if Data is undefined

  const selectedData = (data) => {
    // updateTenantNoti(data?._id);
    // fetchData();
    setSelectedId(data);
    setOpenAndClose(!openAndClose);
  };

  const closeMenu = () => {
    setOpenAndClose(false);
  };

  const sortedData = sortDataByStatusAndDate(data);

  return (
    <div className="w-full">
      <div className="w-full h-full overflow-auto scrollbar-container">
        {sortedData?.map((data) => (
          <div key={data?.id} onClick={() => selectedData(data)} className={`${data?.status === "unread" ? "bg-inputBg" : ""} cursor-pointer`}>
            <div className="flex justify-between items-center border-b pt-3 pb-3">
              {/* <div className="rounded-full md:shadow-md md:p-2 ml-2 md:ml-5">
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
                  
              }
            </div> */}
              <div className="md:p-2 ml-2 md:ml-5">
                {data?.image}
              </div>
              <div className="px-2 md:px-0 w-[75%] md:w-[85%]">
                <p className="text-[14px] md:text-[16px] font-[600] text-BlackHomz">
                  {data?.subject}
                </p>
                <div className="truncate text-[11px] md:text-[16px] text-justify font-[400] text-GrayHomz">
                  {data?.message} {data?.action !== null && data?.action === "Review details" ? <Link className="text-BlueHomz underline" href={"/dashboard/tenant/profile"}>Review details</Link> : <Link className="text-BlueHomz underline" href={"/dashboard/tenant/estateInformation"}>Review payment details.</Link>}
                </div>
                <p className="text-[11px] md:text-[13px] font-[400] text-GrayHomz">
                  {timeAgo(data?.createdAt)}
                </p>
              </div>
              {data?.status === "unread" ?
                <div><p
                  className={`hidden md:block md:pr-5 pr-2 text-[14px] md:text-[16px] font-[600] text-BlueHomz cursor-pointer`}
                >
                  Unread
                </p>
                  <p className="md:hidden w-1 h-1 rounded-full border border-red-500 bg-red-500 mr-4"></p>
                </div>
                :
                <div>
                  <p
                    className={`hidden md:block text-[#D5D5D5] md:pr-5 pr-2 text-[14px] md:text-[16px] font-[600] opacity-80 cursor-pointer`}
                  >
                    Read
                  </p>
                  <p className="md:hidden mr-4"></p>
                </div>
              }
            </div>
          </div>
        ))}
      <CustomizedModal isOpen={openAndClose}>
        <PopNotification selectedId={selectedId} closeMenu={closeMenu} />
      </CustomizedModal>
      </div>
    </div>
  );
};

export default Notifications;
