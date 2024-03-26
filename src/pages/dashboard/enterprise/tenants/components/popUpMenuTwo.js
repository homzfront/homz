import React from 'react'
import Image from "next/image";
import Link from "next/link";

function PopUpMenuTwo({ data, handleDelete,dropdownRef }) {
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  
    return (
      <div ref={dropdownRef} className="drop-down absolute top-7 z-40  text-GrayHomz font-[500] text-[13px] right-[26px] border   rounded-md bg-white flex flex-col items-center justify-around">
        <Link href={`/dashboard/enterprise-property/tenants/profile/${data}`}>
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
            View Profile
          </div>
        </Link>
        <button onClick={() => handleDelete(data?.id)}>
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/trash.png"
              }
              alt=""
              height={16}
              width={16}
              className=""
            />
            Delete Profile
          </div>
        </button>
      </div>
    );
  }

  export default PopUpMenuTwo;