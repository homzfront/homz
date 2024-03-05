import React from "react";
import Image from "next/image";
import Link from "next/link";

function PopUpMenu({ data }) {
  if (!data) {
    return null;
  }

  return (
    <div className="drop-down absolute top-10  text-GrayHomz font-[500] text-[13px] right-[35px] border   rounded-md bg-white flex flex-col items-center justify-around">
      <Link href={`/dashboard/property-owner/tenants/profile/${data._id}`}>
        <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1  rounded-sm w-[160px] text-center">
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
            }
            alt=""
            height={17}
            width={16}
            style={{ height: "auto", width: "auto" }}
          />
          View Request
        </div>
      </Link>
    </div>
  );
}

export default PopUpMenu;
