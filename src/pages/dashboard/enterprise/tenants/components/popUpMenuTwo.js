import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import Delete from '@/components/icons/delete';
import Reminder from '@/components/icons/reminder';
import Access from '@/components/icons/access';
import ArrowProfile from '@/components/icons/arrowProfile';
import SimpleAvatar from '@/components/icons/simpleAvatar';
import InviteDmall from '@/components/icons/inviteDmall';
import DeleteIcon from '@/components/icons/deleteIcon';
import useClickOutside from '@/utils/clickOutside';
import ModalTwo from './modalTwo';
import LoadingFormII from '@/components/mainmenu/loadingFormII';

function PopUpMenuTwo({
  data,
  email,
  loading,
  handleInvite,
  // handleDelete,
  dropdownRef,
  singleEstate,
  setOpenInvite
}) {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  // const [activeFour, setActiveFour] = useState(false);

  if (!data) {
    return null;
  }

  return (
    <div ref={dropdownRef} className="drop-down absolute top-5 md:top-6 z-[999999] right-2 md:right-[85px]  text-GrayHomz font-[500] text-[13px] p-2 border rounded-md bg-white flex flex-col items-center justify-around">
      <Link
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        href={`/dashboard/enterprise-property/tenants/profile/${data}`}>
        {active ? <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1  rounded-sm w-[150px] text-center">
          <SimpleAvatar className='#006AFF' classNameTwo="#006AFF" />
          View Profile
        </div> :
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1  rounded-sm w-[150px] text-center">
            <SimpleAvatar />
            View Profile
          </div>
        }
      </Link>
      {singleEstate &&
        <button
          onMouseEnter={() => setActiveTwo(true)}
          onMouseLeave={() => setActiveTwo(false)}
          onClick={() => {
            if (!email) {
              setOpenInvite(true)
            } else {
              handleInvite()
            }
          }}
        >
          {
            loading ?
              <div className="hover:bg-whiteblue  hover:text-BlueHomz px-4 h-[40px] gap-1 rounded-sm w-[150px] flex justify-center items-center">
                <LoadingFormII className='#006aff' />
              </div> :
              activeTwo ?
                <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[150px] text-center">
                  <InviteDmall />
                  Invite Tenant
                </div> :
                <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[150px] text-center">
                  <InviteDmall className='#292D32' />
                  Invite Tenant
                </div>
          }
        </button>
      }
      {singleEstate &&
        <button
          onMouseEnter={() => setActiveThree(true)}
          onMouseLeave={() => setActiveThree(false)}
        >
          {activeThree ?
            <div className="hover:bg-whiteblue  hover:text-error flex items-center px-4 h-[40px] gap-1 rounded-sm w-[150px] text-center">
              <DeleteIcon />
              Remove Tenant
            </div>
            :
            <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[150px] text-center">
              <DeleteIcon className='#292D32' />
              Remove Tenant
            </div>
          }
        </button>
      }

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