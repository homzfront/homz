import Image from "next/image";
import Link from "next/link";
import React from "react";
import PropertyInfo from "@/components/icons/propertyInfo";
import Dashboard from "@/components/icons/dashboard";
import PeopleTenant from "@/components/icons/people-tenant";

const PopUpMenu = ({ data }) => {
  const [active, setActive] = React.useState(false);
  const [activeTwo, setActiveTwo] = React.useState(false);
  const [activeThree, setActiveThree] = React.useState(false);

  return (
    <div className="z-20 drop-down absolute text-GrayHomz font-[500] top-6 md:top-8 right-2 border py-2 w-[180px] md:w-[218px] rounded-lg bg-white flex flex-col items-center justify-around">
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center text-GrayHomz hover:text-BlueHomz px-2 w-full ">
        <Link className="w-full" href={`/dashboard/property-owner/estates/dashboard/${data}`}>
          {active ?
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <Dashboard className='#006AFF' classNameTwo="#006AFF" />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  ">
                View Dashboard
              </p>
            </div> :
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <Dashboard />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  ">
                View Dashboard
              </p>
            </div>
          }
        </Link>
      </div>
      <div
        onMouseEnter={() => setActiveTwo(true)}
        onMouseLeave={() => setActiveTwo(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center px-2 text-GrayHomz hover:text-BlueHomz w-full ">
        <Link className="w-full" href={`/dashboard/property-owner/estates/tenants/${data}`}>
          {activeTwo ?
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <PeopleTenant className='#006AFF' />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                View Tenants
              </p>
            </div> :
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <PeopleTenant />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                View Tenants
              </p>
            </div>
          }
        </Link>
      </div>
      <div
        onMouseEnter={() => setActiveThree(true)}
        onMouseLeave={() => setActiveThree(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center text-GrayHomz hover:text-BlueHomz px-2 w-full ">
        <Link className="hidden md:block w-full" href={`/dashboard/property-owner/estates/estateInfo/${data}`}>
          {activeThree ?
            <div
              className="px-2 hover:bg-whiteblue flex gap-0.5 items-center h-full w-full rounded-md">
              <PropertyInfo className="#006AFF" />
              <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 ">
                Manage Property Information
              </p>
            </div> :
            <div
              className="px-2 hover:bg-whiteblue flex gap-0.5 items-center h-full w-full rounded-md">
              <PropertyInfo />
              <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 ">
                Manage Property Information
              </p>
            </div>
          }
        </Link>
        <Link className="md:hidden w-full" href={`/dashboard/property-owner/estates/estateInfo/${data}`}>
          {activeThree ?
            <div
              className="px-2 hover:bg-whiteblue flex items-center gap-1 h-full w-full rounded-md">
              <PropertyInfo className="#006AFF" />
              <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 ">
                Manage Property Info..
              </p>
            </div> :
            <div
              className="px-2 hover:bg-whiteblue flex items-center gap-1 h-full w-full rounded-md">
              <PropertyInfo />
              <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 ">
                Manage Property Info..
              </p>
            </div>
          }
        </Link>
      </div>
    </div>
  );
};

export default PopUpMenu;
