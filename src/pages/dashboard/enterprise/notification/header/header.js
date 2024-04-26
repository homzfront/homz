import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotificationHeader = () => {
  return (
    <div className="border-b">
      <div className="flex justify-between items-center py-8 px-10">
      <Link href={"/dashboard/enterprise-property/dashboard"} className="flex gap-1 text-[14px] font-[400] text-GrayHomz2">
        <Image
          src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
          alt=""
          height={16}
          width={16}
        />
        Go back to dashboard
      </Link>
        <div className="relative">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-md w-[320px]"
            placeholder="search"
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
