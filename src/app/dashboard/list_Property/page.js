"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Property from "./listedProperty";
import usePropertyStore from "@/store/propertyForMeStore";
import LoadingII from "./components/loading";
import useClickOutside from "@/utils/clickOutside";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import BusinessAlert from "@/components/icons/businessAlert";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";

const List_Property = () => {
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false)); // Use the custom hook
  const { propertyListedAll, loading, fetchData } = usePropertyStore();
  const { data: profile, fetchData: fetchProfile } = useProfileListingMe();
  const [options, setOptions] = useState(false);
  const [openPromoModal, setOpenPromoModal] = useState(false);
  const [selectedProperty, setSelectedProperties] = useState([]);
  const [page, setPage] = useState(1);


  const handlePageNumber = (pageNumber) => {
    // console.log(pageNumber);
    setPage(pageNumber);
    fetchData(pageNumber);
  };
  useEffect(() => {
    fetchData(page);
    fetchProfile();
  }, [fetchData, fetchProfile,page]);


  const property = propertyListedAll;
  const data = propertyListedAll.data?.results?.[0].data;

// console.log(property)
  const handleOpenModal = () => {
    setOpenModalForBusi(true);
  };
  const handleCancel = () => {
    setSelectedProperties([]);
    setOptions(false);
  };
  const handlePromoteOptions = () => {
    if (selectedProperty.length > 0) {
      setOpenPromoModal(true);
    } else {
      setOptions(true);
    }
  };
  const toggleModal = () => {
    setOpenPromoModal(false);
  };

  // console.log(profile)
  return (
    <div className="dashboard w-full">
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
      {data && (
        <>
          <div
            className={` ${
              property?.data?.totalCount === 0 ? "hidden" : ""
            } flex w-full sm:items-center sm:gap- mt-[-15px] md:mt-0 mb-6 pt-2 md:mb-0`}
          >
            <div className=" sm:ml- border-b-[1px] flex gap- items-center sm:mb-4 justify-between w-full py-[16px] px-4 sm:px-">
              <p>
                <span className="sm:font-[500] text-[16px] leading-[20.16px] font-[400] sm:leading-[30px] md:text-[20px]">
                  Listed Properties
                </span>

                <span className="text-[#006AFF] md:text-[18px] bg-[#EEF5FF] px-[8px] h-[28px] md:h-[35px] py-[4px] rounded-[8px] ml-2">
                  {property.data.totalCount || 0}
                </span>
              </p>
              <div className="flex items-center gap-[12px] ">
                {options && (
                  <button
                    className="w-fit flex gap-1 sm:h-[37px] p-[4px] sm:px-[12px] text-[14px] items-center justify-center rounded-[4px]  border border-[#D92D20] sm:border-0 text-[#D92D20] hover:border hover:border-[#D92D20] flex-shrink-0 "
                    onClick={handleCancel}
                  >
                    <Image
                      src="/static/images/red-close-circle.svg"
                      alt=""
                      height={16}
                      width={16}
                      className="sm:w-[16px] sm:h-[16px] h-[20px] w-[20px]"
                    />
                    <span className="hidden sm:inline-block">Cancel</span>
                  </button>
                )}
                <button
                  onClick={handlePromoteOptions}
                  className="w-fit flex gap-1  sm:h-[37px] sm:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#DC6803] flex-shrink-0 "
                >
                  <Image
                    src="/static/images/orange-send.svg"
                    alt=""
                    height={16}
                    width={16}
                    className="hidden sm:inline-block"
                  />
                  <Image
                    src="/static/images/promoteOrangeBtn.svg"
                    alt=""
                    height={28}
                    width={28}
                    className="sm:hidden p-[4px]"
                  />
                  <span className="hidden sm:inline-block">
                    {options ? "Promotion options" : "Promote properties"}
                  </span>
                </button>

                <>
                  {property?.data?.totalCount > 0 &&
                  (profile?.businessInfo?.isVerified === "unverified" ||
                    profile?.businessInfo?.isVerified === "pending" ||
                    profile?.businessInfo?.isVerified === "rejected") ? (
                    <div
                      onClick={() => setOpenModalForBusi(true)}
                      className="w-full cursor-pointer flex gap-1 sm:w-[166px] sm:h-[42px] sm:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white sm:bg-[#006AFF] ml-3"
                    >
                      <Image
                        src="/static/images/white-add.svg"
                        alt=""
                        height={16}
                        width={16}
                        className="hidden sm:inline-block"
                      />
                      <Image
                        src="/static/images/addbtn2.svg"
                        alt=""
                        height={28}
                        width={28}
                        className="sm:hidden rounded-[8px]"
                      />
                      <span className="hidden sm:inline-block">
                        List New property
                      </span>
                    </div>
                  ) : (
                    <Link
                      href="/dashboard/list_Property/addProperty"
                      className=" w-fit flex gap-1 md:w-[166px] sm:h-[37px] md:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#006AFF] flex-shrink-0 "
                    >
                      <Image
                        src="/static/images/white-add.svg"
                        alt=""
                        height={16}
                        width={16}
                        className="hidden sm:inline-block"
                      />
                        <Image
                        src="/static/images/addbtn2.svg"
                        alt=""
                        height={28}
                        width={28}
                        className="sm:hidden rounded-[8px]"
                      />
                      <span className="hidden sm:inline-block">
                        List New property
                      </span>
                    </Link>
                  )}
                </>
              </div>
            </div>
            {property?.data?.totalCount > 0 &&
            (profile?.businessInfo?.isVerified === "unverified" ||
              profile?.businessInfo?.isVerified === "pending" ||
              profile?.businessInfo?.isVerified === "rejected") ? (
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
            ) : (
              <Link href="/dashboard/list_Property/addProperty">
                <Image
                  src="/static/images/addBtn2.svg"
                  alt=""
                  height={28}
                  width={28}
                  className="hidden rounded-[8px]"
                />
              </Link>
            )}
          </div>
          {loading ? (
            <div className="h-screen flex justify-center items-center">
              <LoadingII />
            </div>
          ) : property && property?.data?.totalCount < 1 ? (
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
                  {}
                  <p className="hidden md:block text-[#4E4E4E] leading-[27px]  w-full md:w-full text-center">
                    List your properties so Tenants can see them.
                  </p>
                  <Link
                    href="/dashboard/list_Property/addProperty"
                    className="w-full flex gap-1 md:w-[165px] h-[48px] md:p-[12px] items-center justify-center rounded-[4px] text-white bg-[#006AFF]"
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
            <Property
              property={property}
              promoteOption={options}
              openPromoModal={openPromoModal}
              setSelectedOption={setSelectedProperties}
              selectedOptions={selectedProperty}
              closePromoModal={toggleModal}
              cancelSelectedOption={handleCancel}
              handlePageNumber={handlePageNumber}
            />
          )}
        </>
      )}
    </div>
  );
};

export default List_Property;
