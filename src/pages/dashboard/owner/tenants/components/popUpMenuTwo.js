import React from 'react'
import Image from "next/image";
import Link from "next/link";
import SimpleAvatar from '@/components/icons/simpleAvatar';

function PopUpMenuTwo({ data, dropdownRef }) {
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  return (
    <div ref={dropdownRef} className="drop-down absolute top-5 md:top-6 z-[999999] right-2 md:right-[85px]  text-GrayHomz font-[500] text-[12px] md:text-[13px] md:right-[27px] right-[6px] border   rounded-md bg-white flex flex-col items-center justify-around">
      <Link href={`/dashboard/property-owner/tenants/profile/${data._id ? data._id : data}`}>
        <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[35px] md:h-[40px] gap-1  rounded-sm w-[115px] md:w-[160px] text-center">
          <SimpleAvatar />
          View Profile
        </div>
      </Link>
    </div>
  );
}

export default PopUpMenuTwo;