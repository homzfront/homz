"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropertyCard from './components/propertyCard';
import CustomizedModal from "./components/CustomizedModal";
import Dropdown from "./components/dropDownFilter";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import BusinessAlert from "@/components/icons/businessAlert";
import useClickOutside from "@/utils/clickOutside";
import addCommasToNumber from "@/utils/addCommasToNumber";

const EditProperty = ({ property }) => {
  const { data, fetchData } = useProfileListingMe();
  useEffect(() => {
    fetchData();
  }, []);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false)); // Use the custom hook

  const clear = () => {
    setSelectedProperty(null);
    setSelectedState(null);
    setSelectedArea(null);
    setSelectedRooms(null);
    setSearchQuery("");
  };

  // console.log(property);
  // console.log(data)

  const openMobileModal = () => {
    setMobileModalIsOpen(true);
    // setDataProperties(data);
  };
  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };
  const options = [...new Set(property?.map((item) => item?.state))];

  const options2 = [...new Set(property?.map((item) => item?.area))];

  const options3 = [...new Set(property?.map((item) => item?.propertyType))];

  const options4 = [...new Set(property?.map((item) => item?.numberOfBathrooms))];

  const filteredData = property?.filter(
    (data) => {
      const matchesState = !selectedState || data?.state === selectedState;
      const matchesArea = !selectedArea || data?.area === selectedArea;
      const matchesSearchQuery = !searchQuery ||
        data?.location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data?.location.area.toLowerCase().includes(searchQuery.toLowerCase());
      const bathrooms =  !selectedRooms || data?.numberOfBathrooms === selectedRooms
      return matchesState && matchesArea && matchesSearchQuery && bathrooms;
    });

  return (
    <div className="z-20 mb-14">
      {
        openModalForBusi &&
        <div
          className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
          <div ref={dropdownRef} className="bg-white w-[464px] h-[290px] rounded-[12px] flex flex-col p-8 items-center justify-around">
            <BusinessAlert />
            <p className="text-[20px] font-[700] text-BlackHomz">
              Update Business Information
            </p>
            <p className="text-[16px] font-[400] text-GrayHomz text-center">
              Kindly upload your business certification in order to list more properties
            </p>
            <Link
              href={"/dashboard/list_Property/Profile?tab=business"}
              className="w-full h-[48px] bg-BlueHomz rounded-[4px] flex items-center justify-center"
            >
              <span className="text-white text-[16px] font-[700]">
                Upload Certificate
              </span>
            </Link>
          </div>
        </div>
      }
      <div className="dashboard hidden md:flex justify-between">
        <div className="flex gap-1 filter">
          <p className="text-[#4E4E4E]  text-[14px] leading-[21px] font-[500] mb-2 pt-2 mr-2">
            Filter by:
          </p>
          <div className="w-[120px]">
            <Dropdown
              options={options}
              onSelect={(option) => setSelectedState(option)}
              selectOption={
                selectedState === null ? "State" : selectedState
              }
              className={
                "text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <div className="w-[120px]">
            <Dropdown
              options={options2}
              onSelect={(option) => setSelectedArea(option)}
              selectOption={selectedArea === null ? "Area" : selectedArea}
              className={
                "text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <div className="w-[180px]">
            <Dropdown
              options={options3}
              onSelect={(option) => setSelectedProperty(option)}
              selectOption={
                selectedProperty === null
                  ? "Property Type"
                  : selectedProperty
              }
              className={"text-[14px] font-[500] text-GrayHomz2"}
            />
          </div>
          <div className="w-[120px]">
            <Dropdown
              options={options4}
              onSelect={(option) => setSelectedRooms(option)}
              selectOption={
                selectedRooms === null ? "Bedroom" : selectedRooms
              }
              className={
                "w-[120px] text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <button
            className="border cursor-pointer border-BlueHomz items-center w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded h-[41px]"
            onClick={clear}
          >
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            <span className="ml-1"> Reset</span>
          </button>
          {
            property?.length > 0 && (data?.businessInfo?.isVerified === 'unverified' || data?.businessInfo?.isVerified === 'pending' || data?.businessInfo?.isVerified === 'rejected') ?
              <div
                onClick={() => setOpenModalForBusi(true)}
                className="w-[338px] cursor-pointer flex gap-1 md:w-[166px] h-[42px] md:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#006AFF] flex-shrink-0 ml-16"
              >
                <Image
                  src="/static/images/white-add.svg"
                  alt=""
                  height={16}
                  width={16}
                  className=""
                />
                <span>List New property</span>
              </div> :
              <Link
                href="/dashboard/list_Property/addProperty"
                className="w-[338px] flex gap-1 md:w-[166px] h-[37px] md:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#006AFF] flex-shrink-0 ml-16"
              >
                <Image
                  src="/static/images/white-add.svg"
                  alt=""
                  height={16}
                  width={16}
                  className=""
                />
                <span>List New property</span>
              </Link>
          }

        </div>
      </div>
      <div className="flex justify-between md:hidden w-full">
        <div className="relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by state or area "
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={16}
            width={16}
          />
        </div>
        <div className="border rounded-[4px] flex justify-center items-center border-BlueHomz w-[12%]">
          <button onClick={openMobileModal}>
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      <PropertyCard Property={filteredData} />
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white border flex flex-col w-[320px] h-auto  py-[24px] px-5 rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Filter by
            </p>

            <div>
              <button onClick={closeMobileModal} className="cursor-pointer">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-[100%]">
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedState(option)}
                selectOption={
                  selectedState === null ? "State" : selectedState
                }
                className={
                  "text-[14px] font-[500] text-GrayHomz2"
                }
              />
            </div>
            <div className="w-[100%]">
              <Dropdown
                options={options2}
                onSelect={(option) => setSelectedArea(option)}
                selectOption={selectedArea === null ? "Area" : selectedArea}
                className={
                  "text-[14px] font-[500] text-GrayHomz2"
                }
              />
            </div>
            <div className="w-[100%]">
              <Dropdown
                options={options3}
                onSelect={(option) => setSelectedProperty(option)}
                selectOption={
                  selectedProperty === null
                    ? "Property Type"
                    : selectedProperty
                }
                className={"text-[14px] font-[500] text-GrayHomz2"}
              />
            </div>
            <div className="w-[100%]">
              <Dropdown
                options={options4}
                onSelect={(option) => setSelectedRooms(option)}
                selectOption={
                  selectedRooms === null ? "Bedroom" : (selectedRooms === 1 ? `${selectedRooms} Bedroom` :  `${selectedRooms} Bedrooms`)
                }
                className={
                  "w-[100%] text-[14px] font-[500] text-GrayHomz2"
                }
              />
            </div>
          </div>
          <button
            className="border w-full h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-4"
            onClick={() => clear()}
          >
            <span>
              <Image
                src={"/static/images/white_repeat.svg"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            <span className="text-[14px] leading-[17.64px] text-[700] text-white">
              Reset
            </span>
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default EditProperty;
