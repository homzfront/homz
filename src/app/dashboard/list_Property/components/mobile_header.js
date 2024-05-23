import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import SidebarMobile from './sidebarHeader';
import Menu from '@/components/icons/Menu';
import useProfileListingMe from '@/store/listingStore/useProfileListingMe';

const Mobile_header = () => {
  const { data, loading, fetchData } = useProfileListingMe();

  const user = data;
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const openSidebar = () => {
    setOpen(!open);
  };
  const closeSidebar = () => {
    setOpen(false);
  };


  return (
    <div className=''>
      {open && (
        <div className="">
          <div className="absolute bg-white h-auto z-50 w-[100%]">
            <div className="flex justify-between items-center p-8">
              <Link href={"/"}>
                <Image src="/homz.svg" width={86} height={18} alt="" />
              </Link >
              <div className="cursor-pointer" onClick={closeSidebar}>
                <Image src="/close.svg" width={16} height={16} alt="" />
              </div>
            </div>
            <div>
              <SidebarMobile user={user} setOpen={setOpen} />
            </div>
          </div>
        </div>
      )}
      <div className="md:hidden w-full flex justify-between items-center p-8 z-0">
        <Link
          href={"/"}
        >
          <Image src="/homz.svg" width={86} height={18} alt="" />
        </Link>
        <div className="cursor-pointer h-full " onClick={openSidebar}>
          <Menu />
        </div>
      </div>
    </div>
  )
}

export default Mobile_header