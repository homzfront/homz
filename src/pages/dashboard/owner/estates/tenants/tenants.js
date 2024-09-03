"use client"
import React, { useEffect, useState } from "react";
import TenantsTwo from "../../tenants/firstPage/tenantsTwo";
import Image from "next/image";
import Link from "next/link";
import { usePropertyLandlordTenant } from "@/store/enterpriseStore/useEstateForOne";
import formatDateII from "@/utils/formatDateII";
import MobileBackButton from "@/components/icons/mobileBackButton";
import { useRouter } from "next/navigation";
import FilterMobile from "../../components/filterMobile";

const Tenants = ({ id }) => {
  const { data: tenants, fetchData: fetchEstateData } = usePropertyLandlordTenant();
  const route = useRouter()

  const goBack = () => {
    route.back();
  };

  useEffect(() => {
    fetchEstateData(id);
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const clear = () => {
    setSelectedDate(null)
    setSearchQuery(null);
    setSelectedStatus(null);
  };
  

  const filteredData = tenants?.filter(
    (data) => {
      const matchesSearchQuery = !searchQuery ||
      data?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      const selectedDateTimestamp = Date.parse(selectedDate);
      const dueDateTimestamp = Date.parse(formatDateII(data?.rentInfo?.dueDate));
      return (
        (!selectedStatus ||
          data?.status === selectedStatus) &&
        (!selectedDate || selectedDateTimestamp <= dueDateTimestamp)
        && matchesSearchQuery
      );
    });

    const openMobileFilterModal = () => {
      setFilterModal(!filterModal)
    }
  
    const closeMobileFilterModal = () => {
      setFilterModal(false)
    }

  return (
    <div className="w-full  p-8">
            {filterModal &&
        <div>
          <FilterMobile
            reset={clear}
            closeMobileModal={closeMobileFilterModal}
            setSelectedDate={setSelectedDate}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            options={options}
            defaultName={"Status"}
          />
        </div>
      }
      <div className="mb-4">
        <div className="hidden w-[475px] md:flex gap-2 items-center">
          <Image
            src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
            alt=""
            height={16}
            width={16}
          />
          <Link
            href={"/dashboard/property-owner/estates"}
            className="text-[14px] w-[80px] font-[400] text-GrayHomz2"
          >
            Go Back
          </Link>
          <Link
            href={"/dashboard/property-owner/estates"}
            className="text-[16px] truncate font-[400] text-GrayHomz"
          >
            {tenants?.[0]?.estateId?.name ? tenants?.[0]?.estateId?.name : "Property Name"}<> </>/
          </Link>
          <div className="text-[20px] font-[500] text-GrayHomz">Tenants</div>
        </div>
        <div className='flex w-full md:hidden gap-4 items-center'>
          <div onClick={goBack} className='cursor-pointer'>
            <div className='w-[28px] h-[28px] bg-walletBg rounded-[8px] flex justify-center items-center'>
              <MobileBackButton />
            </div>
          </div>
          <div className="w-[90%] flex items-center">
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[16px] truncate font-[400] text-GrayHomz"
            >
               {tenants?.[0]?.estateId?.name ? tenants?.[0]?.estateId?.name : "Property Name"}<> </>/
           </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Tenants
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-between items-center">
        <div className="flex gap-2 ">
          <p>Tenants</p>
          <span className="bg-whiteblue w-6 h-6 flex justify-center ">
            <span className="text-BlueHomz ">{tenants.length}</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-[16px] font-[400] text-BlackHomz pr-2">
            Filter by:{" "}
          </p>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-4 h-[42px] w-[130px] text-GrayHomz2 mb-1 p-2 rounded cursor-pointer"
          />
          <button
            onClick={clear}
            type="text" className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            Reset
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between md:hidden w-full">
        <div className="relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full "
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
          <button
                 onClick={openMobileFilterModal}
          >
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      <div className="h-[734px] mb-4">
        <TenantsTwo data={filteredData} />
      </div>
    </div>
  );
};

export default Tenants;
