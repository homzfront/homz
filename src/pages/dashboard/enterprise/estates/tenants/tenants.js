"use client"
import React, { useEffect, useRef, useState } from "react";
import TenantsTwo from "./components/tenantsTwo";
import Image from "next/image";
import Link from "next/link";
import Modal from "../../tenants/components/modal";
import EstateForm from "../estateForm/estateForm";
import useTenantOfAnEstate from "@/store/enterpriseStore/useTenantOfAnEstate";
import useClickOutside from "@/utils/clickOutside";
import formatDateII from "@/utils/formatDateII";
import MobileBackButton from "@/components/icons/mobileBackButton";
import { useRouter } from "next/navigation";
import FilterMobile from "../../components/filterMobile";
import { useEstateForOneStore } from "@/store/enterpriseStore/useEstateForOne";
import Document from "@/components/icons/document";
import { useReactToPrint } from "react-to-print";

const Tenants = ({ id }) => {
  const { data: tenantData, loading, fetchData } = useTenantOfAnEstate();
  const { data: datas, fetchData: Fetch } = useEstateForOneStore();

  const route = useRouter()

  const goBack = () => {
    route.back();
  };


  useEffect(() => {
    fetchData(id);
    Fetch(id);
  }, [id]);

  const data = tenantData?.results?.[0]?.data;
  const [inviteTenant, setInviteTenant] = useState(false);
  const [addNewProperty, setAddNewProperty] = useState(false);
  const dropdownRef = useClickOutside(() => setInviteTenant(false));
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const printableRef = useRef();

  const clear = () => {
    setSelectedDate(null);
    setSearchQuery(null);
    setSelectedStatus(null);
  };

  const options = [
    ...new Set(
      data?.map((item) => item?.rentInfo?.paymentStatus)
    ),
  ];

  const filteredData = data?.filter(
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

  const openInvite = () => {
    setInviteTenant(!inviteTenant);
  };

  const openAddNewProperty = () => {
    setAddNewProperty(!addNewProperty);
  };

  const closeProperty = () => {
    setAddNewProperty(false);
  };


  const openMobileFilterModal = () => {
    setFilterModal(!filterModal)
  }

  const closeMobileFilterModal = () => {
    setFilterModal(false)
  }

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: `${"Tenants Data"}`,
    onAfterPrint: () => console.log("Document printed."),
  });

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
      {inviteTenant && (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal dropdownRef={dropdownRef} />
        </div>
      )}
      {addNewProperty ? (
        <EstateForm returnToStartRegistration={closeProperty} />
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
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
                    {datas?.name ? datas?.name : "Property Name"}<> </>/
                  </Link>
                  <div className="text-[20px] font-[500] text-GrayHomz">
                    Tenants
                  </div>
                </div>
              </div>
              <div className="hidden w-[475px] md:flex gap-2 items-center">
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
                  }
                  alt=""
                  height={16}
                  width={16}
                />
                <Link
                  href={"/dashboard/enterprise-property/estates"}
                  className="text-[14px] w-[80px] font-[400] text-GrayHomz2"
                >
                  Go Back
                </Link>
                <Link
                  href={"/dashboard/enterprise-property/estates"}
                  className="text-[16px] truncate font-[400] text-GrayHomz"
                >
                  {datas?.name ? datas?.name : "Property Name"}<> </>/
                </Link>
                <div className="text-[20px] font-[500] text-GrayHomz">
                  Tenants
                </div>
              </div>
              <button
                onClick={handlePrint}
                className="w-full md:w-auto mt-2 items-center text-[11px] md:text-[14px] font-[500] gap-1 flex px-[10px] h-[42px] hover:bg-white text-BlueHomz hover:border hover:border-BlueHomz  hover:rounded cursor-pointer"
              >
                <Document className='#006AFF' />
                Download Page
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Tenants</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz text-[18px] font-[400]">{data?.length ? `${data?.length}` : "0"}</span>
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
                type="text"
                className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
                <span>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                    }
                    alt=""
                    height={17}
                    width={16}
                  />
                </span>
                Reset
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={openInvite}
                className={`p-[12px] h-10 w-[140px] border border-BlueHomz bg-white text-BlueHomz rounded-md flex items-center gap-1 text-[14px] font-[700]`}
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/estate/add-square.png"
                  }
                  alt=""
                  width={16}
                  height={17}
                  style={{ height: "auto", width: "auto" }}
                />
                Invite Tenant
              </button>
              <button
                onClick={openAddNewProperty}
                className={`p-[12px] h-10 w-[170px] justify-center bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[14px] font-[700]`}
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                  }
                  alt=""
                  width={16}
                  height={16}
                />
                Add New Property
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
                placeholder="Search by name"
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
            <TenantsTwo Data={filteredData} printableRef={printableRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;
