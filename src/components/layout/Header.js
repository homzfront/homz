"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../icons/Menu";
import Close from "../icons/Close";
import Image from "next/image";
import useProfileStore from "@/store/profile";
import { usePathname } from "next/navigation";
import keepThree from "@/utils/keepThree";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import useClickOutside from "@/utils/clickOutside";
import BusinessAlert from "../icons/businessAlert";
import Down from "../icons/Down";
import PropertyManagement from "../icons/dashboard/propertyManagement.js";
import PropertyListing from "../icons/dashboard/propertyListing.js";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingProlonged from "@/components/general/loadingProlonged";
import EnterpriseDoc from "../icons/enterpriseDoc";
import ArrowUpII from "../icons/arrowUpII";
import ArrowRightSmall from "../icons/arrowRightSmall";

const Header = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false)); // Use the custom hook
  const [open, setOpen] = useState(false);
  const { fetchProfile, profile, loading, logout } = useProfileStore();
  const { data, fetchData } = useProfileListingMe();
  const path = usePathname();
  const pathname = keepThree(path);
  const [isLoading, setIsLoading] = useState(false); // Internal loading state
  const [hasListProperty, setHasListProperty] = useState(false);
  const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);

  const productRef = useClickOutside(() => setSubMenuOpen(false));
  const handleOpenModal = () => {
    setOpenModalForBusi(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const community_link = process.env.NEXT_PUBLIC_COMMUNITY_URL || "https://community.homz.ng/"

  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);
  
  function hasListPropertyAccount(profile) {
    return profile?.accounts?.some(
      (account) => account.name === "LIST_PROPERTY"
    );
  }

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  useEffect(() => {
    if (profile) {
      setIsLoading(true);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      setHasListProperty(hasListPropertyAccount(profile));
    }
  }, [profile]);

  useEffect(() => {
    const DataAgain = () => {
      fetchProfile();
      if (profile) {
        setHasListProperty(hasListPropertyAccount(profile));
      }
    };
    DataAgain();
  }, [hasListProperty]);

  const url = !profile
    ? "/list-a-property"
    : hasListProperty
      ? "/dashboard/list_Property/addProperty"
      : "/switch-profile";

  // Function to extract username from email address
  const extractUsername = (userOrEmail) => {
    if (userOrEmail) {
      let email;
      if (typeof userOrEmail === "string") {
        // If the input is a string, assume it's an email
        email = userOrEmail;
      } else if (userOrEmail && userOrEmail.email) {
        // If the input is an object with an 'email' property, use that email
        email = userOrEmail.email;
      } else if (userOrEmail?.user?.email) {
        email = userOrEmail?.user?.email;
      }

      // Split the email address by "@" to get an array
      const parts = email?.split("@");

      // The username is the first part of the array (index 0)
      const username = parts[0];

      return username;
    } else {
      return;
    }
  };

  function determineUserDashboard(profile) {
    let user;
    if (typeof user === "string") {
      user = profile;
    } else if (profile && profile?.isVerified) {
      user = profile;
    } else if (profile?.user && profile?.user?.isVerified) {
      user = profile?.user;
    }
    if (user?.isVerified && user?.accounts.length === 0) {
      return "/select-plan";
    } else if (user?.accounts?.[0].name === "TENANT") {
      return "/dashboard/tenant/dashboard";
    } else if (user?.accounts?.[0].name === "ENTERPRISE_PLAN") {
      return "/dashboard/enterprise-property/dashboard";
    } else if (user?.accounts?.[0].name === "MANAGE_PROPERTY") {
      return "/dashboard/property-owner/dashboard";
    } else if (user?.accounts?.[0].name === "LIST_PROPERTY") {
      return "/dashboard/list_Property";
    } else {
      return "/switch-profile";
    }
  }

  useEffect(() => {
    let timer;

    if (loading) {
      // Set a timer to show the long loading message after 3 seconds
      timer = setTimeout(() => {
        setShowLongLoadingMessage(true);
      }, 20000); // 20 seconds
    } else {
      // Reset when loading is false
      setShowLongLoadingMessage(false);
    }

    // Cleanup the timer on component unmount or when loading changes
    return () => clearTimeout(timer);
  }, [loading]);

  const closeModal = () => {
    setShowLongLoadingMessage(false);
  };

  return (
    <div className="text-BlackHomz px-6 font-normal w-[147px] md:w-full md:flex justify-between text-[16px] max-w-[1160px] items-center  md:m-auto pt-12 shadow-m">
      <CustomizedModal isOpen={showLongLoadingMessage}>
        <LoadingProlonged closeModal={closeModal} />
      </CustomizedModal>
      {openModalForBusi && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
          <div
            ref={dropdownRef}
            className="bg-white w-[320px] md:w-[464px] h-[290px] rounded-[12px] flex flex-col p-8 items-center justify-around"
          >
            <BusinessAlert />
            <p className="text-[16px] md:text-[20px] font-[700] text-BlackHomz">
              Update Business Information
            </p>
            <p className="text-[14px] md:text-[16px] font-[400] text-GrayHomz text-center">
              Kindly upload your business certification in order to list more
              properties
            </p>
            <Link
              href={"/dashboard/list_Property/Profile?tab=business"}
              className="w-full h-[48px] bg-BlueHomz rounded-[4px] flex items-center justify-center"
            >
              <span className="text-white text-[14px] md:text-[16px] font-[700]">
                Upload Certificate
              </span>
            </Link>
          </div>
        </div>
      )}
      <Link href={"/"}>
        <Image
          src={"/Homz_Logo_Blue.png"}
          alt="HOMZ"
          height={28}
          className="cursor-pointer "
          width={131}
        />
      </Link>
      <nav
        className={` sm:my-0 my-4 flex gap-14 md:items-center items-start flex-col md:flex-row ${open ? "block" : "hidden md:flex"
          }`}
      >
        <div className="mt-5 text-[12px] lg:text-[16px] md:mt-0 flex gap-4 md:gap-5 lg:gap-10  flex-col md:flex-row">
          <Link
            href={"/"}
            className={`hover:text-blue-400 ${pathname === "/" ||
              pathname === "/properties/PropertyListing" ||
              pathname === "/property" ||
              pathname === "/properties"
              ? "text-BlueHomz"
              : ""
              }`}
          >
            Home
          </Link>
          <Link
            href={"/landlord"}
            className={`hover:text-blue-400   ${pathname === "/landlord" ? "text-BlueHomz" : ""
              }`}
            onClick={() => setOpen(false)}
          >
            Landlord
          </Link>
          <div className="relative flex items-center gap-1">
            <button
              onClick={() => {
                toggleSubMenu();
                setOpen(false)
              }}
              className={`${pathname === "/document-generation" ||
                pathname === "/enterprise"
                ? "text-BlueHomz"
                : ""
                } hover:text-blue-400`}
            >
              Products
            </button>
            <button
              onClick={toggleSubMenu}
              className={`mt-0.5 cursor-pointer flex`}
            >
              {subMenuOpen ? <ArrowUpII /> : <Down />}
            </button>
            {subMenuOpen && (
              <div
                ref={productRef}
                className={`absolute px-3 top-5 left-[80%] md:left-[35%] transform -translate-x-[40%] md:top-7 py-3 flex flex-col md:flex-row gap-2 items-start justify-center rounded-[10px] text-[12px] md:text-[14px] text-BlackHomz
                 md:border z-[99999] bg-white md:shadow-lg
                `}
              >
                {/* Mobile: simplified list (icons + titles only) */}
                <div className="md:hidden relative w-full">
                  <div className="absolute left-10 top-0 bottom-2 w-px bg-BlackHomz" />
                  <Link href={"/enterprise"} className="block w-full">
                    <div
                      className={`flex items-center gap-3 py-3 pl-14 hover:bg-whiteblue rounded-[6px] ${
                        pathname === "/enterprise" ? "text-BlueHomz" : ""
                      }`}
                      onClick={() => setSubMenuOpen(false)}
                    >
                      <PropertyListing width="14" height="14" className="text-BlueHomz fill-BlueHomz" />
                      <span className="flex-1 text-[12px] min-w-[180px]">Property Management</span>
                    </div>
                  </Link>
                  <Link href={community_link} className="block w-full">
                    <div className={`flex items-center gap-3 py-3 pl-14 pr-2 hover:bg-whiteblue rounded-[6px]`}>
                      <PropertyManagement width="14" height="14" className="text-[#039855] fill-[#039855]" />
                      <span className="flex-1 text-[12px] min-w-[180px]">Estate Management</span>
                    </div>
                  </Link>
                  <Link href={"/document-generation"} className="block w-full">
                    <div
                      className={`flex items-center gap-3 py-3 pl-14 pr-2 hover:bg-whiteblue rounded-[6px] ${
                        pathname === "/document-generation" ? "text-[#DC6803]" : ""
                      }`}
                      onClick={() => setSubMenuOpen(false)}
                    >
                      <EnterpriseDoc h="14" w="14" className="#DC6803" />
                      <span className="flex-1 text-[12px] min-w-[180px]">Document Generation</span>
                    </div>
                  </Link>
                </div>

                {/* Desktop/Tablet: existing detailed cards */}
                <div className="hidden md:flex md:flex-row gap-2">
                  <Link href={"/enterprise"} className="w-full md:min-w-[400px]">
                    <div className="p-4 hover:bg-whiteblue flex gap-2 items-start md:bg-[#F8FBFF] bg-transparent rounded-[4px] h-auto md:h-[160px]">
                      <button className="flex justify-center items-center rounded-full bg-BlueHomz h-[44px] min-w-[44px]">
                        <PropertyListing className="text-BlueHomz fill-white" />
                      </button>
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-bold text-GrayHomz">
                            Property Management
                          </p>
                          <h3 className="hidden md:block text-GrayHomz text-xs md:text-sm lg:text-base font-normal mt-1">
                            Easily manage properties, tenants, and rent payments from one intuitive dashboard.
                          </h3>
                        </div>
                        <button className="hidden md:flex mt-2 text-BlueHomz text-xs md:text-sm lg:text-base font-normal items-center gap-1 self-start">
                          Explore <ArrowRightSmall className="#006AFF" />
                        </button>
                      </div>
                    </div>
                  </Link>
                  <Link href={community_link} className="w-full md:min-w-[400px]">
                    <div className="p-4 hover:bg-whiteblue flex gap-2 items-start md:bg-[#EFFFF8] bg-transparent rounded-[4px] h-auto md:h-[160px]">
                      <button className="flex justify-center items-center rounded-full bg-Success h-[44px] min-w-[44px]">
                        <PropertyManagement className="text-[#039855] fill-white" />
                      </button>
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-bold text-GrayHomz">
                            Community & Estate Management
                          </p>
                          <h3 className="hidden md:block text-GrayHomz text-xs md:text-sm lg:text-base font-normal mt-1">
                            Create and manage estates, bill tenants, and control visitor access with ease.
                          </h3>
                        </div>
                        <button className="hidden md:flex mt-2 text-Success text-xs md:text-sm lg:text-base font-normal items-center gap-1 self-start">
                          Explore <ArrowRightSmall className="#039855" />
                        </button>
                      </div>
                    </div>
                  </Link>
                  <Link href={"/document-generation"} className="w-full md:min-w-[400px]">
                    <div className="p-4 hover:bg-whiteblue flex gap-2 items-start md:bg-[#FFFBF8] bg-transparent rounded-[4px] h-auto md:h-[160px]">
                      <button className="flex justify-center items-center rounded-full bg-[#DC6803] h-[44px] min-w-[44px]">
                        <EnterpriseDoc h="20" w="20" className="#EEF5FF" />
                      </button>
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <p className="text-[14px] md:text-[16px] lg:text-[18px] font-bold text-GrayHomz">
                            Document Generation
                          </p>
                          <h3 className="hidden md:block text-GrayHomz text-xs md:text-sm lg:text-base font-normal mt-1">
                            Generate professional property documents, agreements, and legal forms instantly.
                          </h3>
                        </div>
                        <button className="hidden md:flex mt-2 text-[#DC6803] text-xs md:text-sm lg:text-base font-normal items-center gap-1 self-start">
                          Explore <ArrowRightSmall className="#DC6803" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href={"/tenant"}
            // href={""}
            className={`hover:text-blue-400 ${pathname === "/tenant" ? "text-BlueHomz" : ""
              }`}
            onClick={() => setOpen(false)}
          >
            Tenant
          </Link>
          {data?.properties?.length > 0 &&
            (data?.businessInfo?.isVerified === "unverified" ||
              data?.businessInfo?.isVerified === "pending" ||
              data?.businessInfo?.isVerified === "rejected") ? (
            <div
              className="hover:text-blue-400 cursor-pointer"
              onClick={handleOpenModal}
            >
              List A Property
            </div>
          ) : (
            <Link
              href={url}
              className="hover:text-blue-400 "
              onClick={() => setOpen(false)}
            >
              List A Property
            </Link>
          )}
        </div>
      </nav>
      <div
        className={`mt-[20px] md:mt-0 md:text-[12px] lg:text-[16px] ml-0 md:ml-[-20px] lg:ml-0  md:flex md:justify-center space-y-4 md:space-y-0 items-center md:space-x-4 space-x-0  ${open ? "block" : "hidden md:flex"
          } `}
      >
        {isLoading ? (
          <div className="w-full justify-center items-center">
            {profile ? (
              <div
                className={`flex items-center ${open ? "flex  flex-col gap-4 items-start" : "gap-2"
                  }`}
              >
                <Link href={profile ? determineUserDashboard(profile) : "/"}>
                  <p className={`w-full ${open ? "text-[12px] " : ""}`}>
                    Hi, {extractUsername(profile)}!
                  </p>
                </Link>
                <button
                  onClick={() => logout(logout)}
                  className={`w-[110px] rounded-[4px] px-2 text-white bg-BlueHomz h-[48px] py-1 hover:bg-blue-400 ${open ? "text-[12px]" : ""
                    }`}
                >
                  Logout
                </button>
                {/* Add more user information or actions as needed */}
              </div>
            ) : (
              <div className="w-full justify-center items-center">
                {/* <LoadingTable />  */}
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              // href={"https://forms.gle/aCwKh8aW7goPoRGWA"}
              // href={""}
              className={`hover:text-blue-400 ${open ? "text-[12px]" : ""}`}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              //  href={"https://forms.gle/aCwKh8aW7goPoRGWA"}
              className={`  w-[147px] rounded-[4px]  text-white bg-BlueHomz items-center flex justify-center h-[48px] py-1 hover:bg-blue-400 ${open ? "text-[12px] " : ""
                }`}
            >
              Create Account
              {/* Join Waitlist */}
            </Link>
          </>
        )}
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="md:hidden border absolute right-8 top-[48px] cursor-pointer"
      >
        {open ? <Close /> : <Menu />}
      </div>
    </div>
  );
};

export default Header;
