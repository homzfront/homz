import React from "react";
import Image from "next/image";
import Link from "next/link";

function PopUpMenuTwo({ data, handleDelete }) {
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }

  const menuItem = (link, iconSrc, text) => (
    <Link href={
      link
     
    }>
      <div className="hover:bg-whiteblue hover:text-BlueHomz flex items-center px-4 h-[40px] gap-2 rounded-sm  text-center">
        <Image
          src={iconSrc}
          alt=""
          height={17}
          width={16}
          style={{ height: "auto", width: "auto" }}
        />
        <span>{text}</span>
      </div>
    </Link>
  );

  return (
    <div className="tenantDrop z-30 w-[244px] absolute top-[20px] py-[12px] px-0 text-GrayHomz font-[500] text-[13px] right-[27px] border rounded-[12px] bg-white flex flex-col ">
      {menuItem(
        {/* `/dashboard/property-owner/tenants/profile/${data.id}`, */},
        "/static/images/arrow-right2.svg",
        "View Profile"
      )}
      {menuItem(
        `/second_release/Reminder`,
        "/static/images/reminder.svg",
        "Set rent due reminder"
      )}
      {menuItem(
        {/* `/dashboard/property-owner/tenants/profile/${data.id}`, */},
        "/static/images/people.svg",
        "Visitor Access Record"
      )}
      <button onClick={() => handleDelete(data.id)}>
        {menuItem(
          {/* "/dashboard/property-owner/tenants/profile", */},
         "/static/images/black_trash.svg", "Remove Tenant")}
      </button>
    </div>
  );
}

export default PopUpMenuTwo;
