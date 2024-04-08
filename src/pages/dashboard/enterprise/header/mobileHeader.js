'use client';
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ConfirmModalI from "../components/confirmModalI";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useProfileStore from "/src/store/profile";

// import { SIDENAV_ITEMS } from '@/constants';
// import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';
import { motion, useCycle } from 'framer-motion';

// type MenuItemWithSubMenuProps = {
//   item: SideNavItem;
//   toggleOpen: () => void;
// };
const MenuItemWithSubMenuProps = {
    item: {}, // Placeholder for SideNavItem object
    toggleOpen: () => {} // Placeholder for a function
  };
  
  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(0px at 100% 0)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };
  const Data = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/dashboard.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/dashboardwhite.png",
      link: "/dashboard/enterprise-property/dashboard",
      name: "Dashboard",
      coming: null,
      active: false,
    },
    {
      id: 2,
      image: "/static/dashboard/enterprisemanager/sidebar/tenants.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/tenantswhite.png",
      link: "/dashboard/enterprise-property/tenants",
      name: "Tenants",
      coming: null,
      active: false,
    },
    {
      id: 3,
      image: "/static/dashboard/enterprisemanager/sidebar/estatedark.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/estates.png",
      link: "/dashboard/enterprise-property/estates",
      name: "Property Management",
      coming: null,
      active: false,
    },
    {
      id: 4,
      image: "/static/dashboard/enterprisemanager/sidebar/buliding.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/bulidingwhite.png",
      link: "/dashboard/enterprise-property/propertylisting",
      name: "Property Listing",
      coming: null,
      active: false,
    },
    {
      id: 5,
      image: "/static/dashboard/enterprisemanager/sidebar/card.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/cardwhite.png",
      link: "/dashboard/enterprise-property/payments",
      name: "Payments",
      coming: null,
      active: false,
    },
    {
      id: 6,
      image: "/static/dashboard/enterprisemanager/sidebar/RequestBlack.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/Request.png",
      link: "/dashboard/enterprise-property/request",
      name: "Request",
      coming: null,
      active: false,
    },
    {
      id: 7,
      image: "/static/dashboard/enterprisemanager/sidebar/maintenance.png",
      image2:
        "/static/dashboard/enterprisemanager/sidebar/maintenanceWhite.png",
      link: "/dashboard/enterprise-property/maintenance",
      name: "Maintenance",
      coming: null,
      active: false,
    },
    {
      id: 8,
      image: "/static/dashboard/enterprisemanager/sidebar/call.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/callwhite.png",
      link: "/dashboard/enterprise-property/support",
      name: "Support",
      coming: null,
      active: false,
    },
  ];

  const Data2 = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/profile.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/profilewhite.png",
      link: "/dashboard/enterprise-property/profile",
      name: "Profile",
    },
    {
      id: 2,
      image: "/static/dashboard/enterprisemanager/sidebar/setting.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/settingwhite.png",
      link: "/dashboard/enterprise-property/setting",
      name: "Setting",
    },
  ];

  const Data3 = [
    {
      id: 1,
      image: "/static/dashboard/enterprisemanager/sidebar/switch.png",
      image2: "/static/dashboard/enterprisemanager/sidebar/switch.png",
      link: "/switch-profile",
      name: "Switch",
    },
  ];

  export default function MobileHeader(){
    const { logout } = useProfileStore();

    // const [pathname, setPathname] = useState("");
    const [logoutModal, setLogoutModal] = useState(false);
  
    const logoutII = () => {
      setLogoutModal(!logoutModal);
    };
  
    const closeLogout = () => {
      setLogoutModal(false);
    };
  
    const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);

    return(

    <div>
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-white"
        variants={sidebar}
      />
     <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16"
      >
        <div className="flex py-[15px] bg-stone-100 rounded-md  justify-between items-center md:hidden">
            <div className="">
              <Link href={""} className="relative">
                <p className="inline pl-1">
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/header/Avatar.png"
                    }
                    alt=""
                    height={41}
                    width={40}
                    className="rounded-full inline-block pr-2"
                  />
                  Victoria
                </p>
                {/* {popUpMenu && <PopUpMenu />} */}
              </Link>
            </div>
            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

      </motion.ul>
     <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16"
      >
        <div className="bg-stone-100 rounded-md md:bg-white">

<div className=" bg-stone-100 grid gap-3 md:bg-white ">
  {Data.map((data) => (
    <Link
      key={data.id}
      href={data.link}
      className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${
        data.name === "Property Management" ? "h-[60px]" : ""
      } ${
        pathname === data.link
          ? "bg-BlueHomz text-white"
          : " hover:bg-blue-100"
      } ${
        data.coming === null ? "" : "opacity-50 pointer-events-none"
      } `}
    >
      {pathname === data.link ? (
        <Image src={data.image2} height={16} width={16} alt="img" />
      ) : (
        <Image src={data.image} height={16} width={16} alt="img" />
      )}
      <span>
        <span className="pr-1">{data.name}</span>
        <span className="text-Success mt-[1px] font-[300] text-[12px]">
          {data.coming}
        </span>
      </span>
    </Link>
  ))}
</div>{" "}
<div className="grid gap-3 ">
  {Data2.map((data) => (
    <Link
      key={data.id}
      href={data.link}
      className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${
        pathname === data.link
          ? "bg-BlueHomz text-white"
          : "hover:text-white hover:bg-blue-300"
      } `}
    >
      {pathname === data.link ? (
        <Image src={data.image2} height={16} width={16} alt="img" />
      ) : (
        <Image src={data.image} height={16} width={16} alt="img" />
      )}
      <span className="">{data.name}</span>
    </Link>
  ))}
</div>
<div className="grid gap-3 ">
  {Data3.map((data) => (
    <Link
      key={data.id}
      href={data.link}
      className={`h-[40px] px-2   flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500] ${
        pathname === data.link
          ? "bg-BlueHomz text-white"
          : "hover:text-white hover:bg-blue-300"
      } `}
    >
      {pathname === data.link ? (
        <Image src={data.image2} height={16} width={16} alt="img" />
      ) : (
        <Image src={data.image} height={16} width={16} alt="img" />
      )}
      <span className="">{data.name}</span>
    </Link>
  ))}
  <div
    onClick={logoutII}
    className={`h-[40px] px-2 cursor-pointer flex items-center rounded-md gap-[12px] text-GrayHomz text-[16px] font-[500]hover:text-white hover:bg-blue-300
       `}
  >
    <Image
      src="/static/dashboard/enterprisemanager/sidebar/logout.png"
      height={16}
      width={16}
      alt="img"
    />
    <span className="">Logout</span>
  </div>
</div>
{logoutModal && (
  <ConfirmModalI
    header={"Are you leaving?"}
    body={"You’re about to exit your dashboard"}
    button={"Yes, log me out"}
    buttonTwo={"No, take me back"}
    returnHome={() => logout(logout)}
    returnHomeTwo={closeLogout}
  />
)}
</div>
      </motion.ul>
       
      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
    
    </div>
)
  }
  



  const MenuToggle = ({ toggle }) => (
    <button
      onClick={toggle}
      className="pointer-events-auto absolute right-4 top-[14px] z-30"
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
  const Path = (props) => (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  );
  const variants = {
    open: {
      transition: { staggerChildren: 0.02, delayChildren: 0.15 },
    },
    closed: {
      transition: { staggerChildren: 0.01, staggerDirection: -1 },
    },
  };
  const useDimensions = (ref) => {
    const dimensions = useRef({ width: 0, height: 0 });
  
    useEffect(() => {
      if (ref.current) {
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.offsetHeight;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
  
    return dimensions.current;
  };