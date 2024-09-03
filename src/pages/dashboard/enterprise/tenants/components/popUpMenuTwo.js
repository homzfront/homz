import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import Delete from '@/components/icons/delete';
import Reminder from '@/components/icons/reminder';
import Access from '@/components/icons/access';
import ArrowProfile from '@/components/icons/arrowProfile';

function PopUpMenuTwo({
  data,
  handleDelete,
  dropdownRef,
}) {
    const [active, setActive] = useState(false);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const [activeFour, setActiveFour] = useState(false);

  if (!data) {
    return null;
  }


  return (
    <div ref={dropdownRef} className="drop-down absolute top-5 md:top-6 z-40  text-GrayHomz font-[500] text-[13px] p-2 right-2 md:right-[8px] border rounded-md bg-white flex flex-col items-center justify-around">
      <Link
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        href={`/dashboard/enterprise-property/tenants/profile/${data}`}>
        {active ? <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1  rounded-sm w-[190px] text-center">
          <ArrowProfile className='#006AFF' classNameTwo="#006AFF" />
          View Profile
        </div> :
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1  rounded-sm w-[190px] text-center">
            <ArrowProfile />
            View Profile
          </div>
        }
      </Link>
      {/* <Link
        href={`/dashboard/enterprise-property/tenants/reminder`}
        onMouseEnter={() => setActiveTwo(true)}
        onMouseLeave={() => setActiveTwo(false)} >
        {activeTwo ?
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[190px] text-center">
            <Reminder className='#006AFF' classNameTwo="#006AFF" />
            Set rent due reminder
          </div> :
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[190px] text-center">
            <Reminder />
            Set rent due reminder
          </div>
        }
      </Link> */}
      {/* <Link
        href={`/dashboard/enterprise-property/tenants/access-records`}
        onMouseEnter={() => setActiveThree(true)}
        onMouseLeave={() => setActiveThree(false)} >
        {activeThree ?
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[190px] text-center">
            <Access className='#006AFF' classNameTwo="#006AFF" />
            Visitor Access Record
          </div>
          :
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[190px] text-center">
            <Access />
            Visitor Access Record
          </div>
        }
      </Link> */}
      {/* <button
        onClick={() => handleDelete(data)}
        onMouseEnter={() => setActiveFour(true)}
        onMouseLeave={() => setActiveFour(false)} >
        {activeFour ?
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[190px] text-center">
            <Delete className='#006AFF' classNameTwo="#006AFF" />
            Delete Profile
          </div>
          :
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[190px] text-center">
            <Delete />
            Delete Profile
          </div>
        }
      </button> */}
    </div>
  );
}

export default PopUpMenuTwo;