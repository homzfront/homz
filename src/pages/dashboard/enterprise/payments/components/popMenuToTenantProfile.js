"use client"
import React, { useState } from 'react'
import Link from "next/link";
import Profile from '@/components/icons/profile';
import Details from '@/components/icons/details';
import PopUpMenu from './popUpMenu';
import CustomizedModal from "@/components/mainmenu/CustomizedModal";

function PopUpMenuTwo({ data, handleDataToggle, setPopUpMenu, popUpMenu, handleDelete, dropdownRef }) {
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }

  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);


  return (
    <div ref={dropdownRef} className="drop-down absolute top-11 z-100 w-[150px] md:w-[180px] text-GrayHomz font-[500] text-[13px] right-[67px] border py-2 rounded-md bg-white flex flex-col items-center justify-around">
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center text-GrayHomz hover:text-BlueHomz py-1 px-2 w-full ">
        <Link className="w-full" href={`/dashboard/enterprise-property/tenants/profile/${data?.tenantId?._id}`}>
          {active ?
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <Profile className='#006AFF' />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  ">
                View Profile
              </p>
            </div> :
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <Profile />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  ">
                View Profile
              </p>
            </div>
          }
        </Link>
      </div>
      <div
        onMouseEnter={() => setActiveTwo(true)}
        onMouseLeave={() => setActiveTwo(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center py-1 px-2 text-GrayHomz hover:text-BlueHomz w-full ">
        <button className="w-full">
          {activeTwo ?
            <div onClick={() => handleDataToggle(data.id)} className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <Details className='#006AFF' />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                View All Details
              </p>
            </div> :
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <Details />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                View All Details
              </p>
            </div>
          }
        </button>
      </div>
      {popUpMenu && (
        <CustomizedModal isOpen={popUpMenu}>
          <PopUpMenu data={data} setPopUpMenu={setPopUpMenu} />
        </CustomizedModal>
      )}
    </div>
  );
}

export default PopUpMenuTwo;