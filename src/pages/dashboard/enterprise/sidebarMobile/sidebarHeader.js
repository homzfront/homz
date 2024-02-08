import Link from 'next/link'
import React from 'react'

const SidebarMobile = ({setOpen}) => {
  return (
    <div className="mt-8 h-[200px] flex flex-col w-[70%] m-auto justify-around text-white">
    <Link
      onClick={() => setOpen(false)}
      href={"/dashboard/property-owner/dashboard"}
      className="bg-BlueHomz w-full h-[45px] items-center flex justify-center"
    >
      Dashboard
    </Link>
    <Link
      onClick={() => setOpen(false)}
      href={"/dashboard/property-owner/tenants"}
      className="bg-BlueHomz w-full h-[45px] items-center flex justify-center"
    >
      Tenants
    </Link>
    <Link
      onClick={() => setOpen(false)}
      href={"/dashboard/property-owner/estates"}
      className="bg-BlueHomz w-full h-[45px] items-center flex justify-center"
    >
      Property Management
    </Link>
  </div>
  )
}

export default SidebarMobile