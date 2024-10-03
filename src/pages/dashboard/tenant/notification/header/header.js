import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotificationHeader = ({
  searchQuery,
  setSearchQuery
}) => {
  const route = useRouter()
  const goBack = () => {
    route.back();
  }; 
  
  return (
    <div className="border-b">
      <div className="flex justify-between items-center py-8 md:px-10 px-4">
      <div onClick={goBack} className="flex gap-1 text-[14px] font-[400] text-GrayHomz2 cursor-pointer">
          <Image
            src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
            alt=""
            height={16}
            width={16}
          />
          <div className="hidden md:block">
            Go back to dashboard
          </div>
          <div className="md:hidden">
            Back
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-md w-full md:w-[320px]"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={17}
            width={16}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationHeader;
