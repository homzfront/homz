"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Property from "./listedProperty";
import usePropertyStore from "@/store/propertyForMeStore";
import LoadingII from "./components/loading";
import useClickOutside from "@/utils/clickOutside";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import BusinessAlert from "@/components/icons/businessAlert";

const List_Property = () => {
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false)); // Use the custom hook
  const { propertyListedAll, loading, fetchData } = usePropertyStore();
  const { data: profile, fetchData: fetchProfile } = useProfileListingMe();

  useEffect(() => {
    fetchData();
    fetchProfile();
  }, []);
  const data = propertyListedAll

  const handleOpenModal = () => {
    setOpenModalForBusi(true);
  };

  return (
    <div className="dashboard w-full">
      {
        openModalForBusi &&
        <div
          className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
          <div ref={dropdownRef} className="bg-white w-[320px] md:w-[464px] h-[290px] rounded-[12px] flex flex-col p-8 items-center justify-around">
            <BusinessAlert />
            <p className="text-[16px] md:text-[20px] font-[700] text-BlackHomz">
              Update Business Information
            </p>
            <p className="text-[14px] md:text-[16px] font-[400] text-GrayHomz text-center">
              Kindly upload your business certification in order to list more properties
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
      }
      {data && <>
        <div className={` ${data?.length === 0 ? "hidden" : ""} flex w-[80%] items-center gap-6 mt-[-15px] md:mt-0 mb-6 pt-2 md:mb-0`}>
          <div className="flex gap-2 items-center md:mb-4">
            <p className="font-[500] leading-[30px] md:text-[20px]">
              Listed Properties
            </p>

            <p className="text-[#006AFF] md:text-[18px] bg-[#EEF5FF] px-[8px] h-[28px] md:h-[35px] py-[4px] rounded-[8px]">
              {data?.length > 0 ? data?.length : 0}
            </p>
          </div>
          { data?.length > 0 &&
            (profile?.businessInfo?.isVerified === 'unverified' || profile?.businessInfo?.isVerified === 'pending' || profile?.businessInfo?.isVerified === 'rejected') ?
              <div>
                <Image
                  src="/static/images/addButton.svg"
                  alt=""
                  height={28}
                  width={28}
                  className="md:hidden rounded-[8px]"
                  onClick={handleOpenModal}
                />
              </div>
              :
              <Link href="/dashboard/list_Property/addProperty">
                <Image
                  src="/static/images/addButton.svg"
                  alt=""
                  height={28}
                  width={28}
                  className="md:hidden rounded-[8px]"
                />
              </Link>
          }
        </div>
        {loading ?
          <div className="h-screen flex justify-center items-center">
            <LoadingII />
          </div>
          : data && data.length < 1 ? (
            <div>
              <p className="md:hidden font-[400] leading-[17.64px] text-[#A9A9A9] text-[14px] mt-0 md:mt-2">
                List your properties so Tenants can see them.
              </p>
              <div className="flex flex-col items-center justify-center pt-[10rem] md:pt-0">
                <div className="flex flex-col items-center justify-center md:h-[412px] gap-[20px] ">
                  <Image
                    src="/static/images/PropertyLister.svg"
                    alt=""
                    height={121}
                    width={121}
                    className="rounded-[8px] mx-auto"
                  />
                  <p className="text-[23px] md:text-[36px] text-[700] leading-[28.98px] md:leading-[45px] text-[#006AFF] ">
                    Get Started
                  </p>
                  { }
                  <p className="hidden md:block text-[#4E4E4E] leading-[27px]  w-[338px] md:w-full text-center">
                    List your properties so Tenants can see them.
                  </p>
                  <Link
                    href="/dashboard/list_Property/addProperty"
                    className="w-[338px] flex gap-1 md:w-[165px] h-[48px] md:p-[12px] items-center justify-center rounded-[4px] text-white bg-[#006AFF]"
                  >
                    <Image
                      src="/static/images/white-add.svg"
                      alt=""
                      height={16}
                      width={16}
                      className=""
                    />
                    <span>List Properties</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Property property={data} />
          )}
      </>
      }
    </div>
  );
};

export default List_Property;
