"use client"
import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from './table';
import ArrowDownDashes from '@/components/icons/arrowDownDashes';
import ArrowUpII from '@/components/icons/arrowUpII';
import ArrowDown from '@/components/icons/arrowDown';
import FilterIconBlue from '@/components/icons/filterIconBlue';
import DateIconTwo from '@/components/icons/dateIconTwo';
import Ticked from '@/components/icons/ticked';
import UnTicked from '@/components/icons/unTicked';
import Reset from '@/components/icons/reset';
import Share from '@/components/icons/share';
import ExportSmall from '@/components/icons/exportSmall';
import AddNormal from '@/components/icons/addNormal';
import BulkIcon from '@/components/icons/bulkIcon';
import useClickOutside from '@/utils/clickOutside';
import BlueSearch from '@/components/icons/blueSearch';

const Tenants = () => {
  const tenantsData = [
    {
      id: 1,
      profile: "/tableImgII.png",
      name: "John Doe",
      apartment: "Apartment A1",
      address: "123 Main Street, Lagos",
      phone: "+234 801 234 5678",
      email: "john.doe@example.com",
      moveInDate: "2024-01-01",
      rentDuration: "12 months",
      dueDate: "2025-01-01",
      totalRent: 'N1,200,000',
      paymentStatus: "Paid",
      statusColor: "green",
      rentPeriods: "1",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 2,
      profile: "/tableImg.png",
      name: "Jane Smith",
      apartment: "Apartment B2",
      address: "456 Victoria Island, Lagos",
      phone: "+234 802 345 6789",
      email: "jane.smith@example.com",
      moveInDate: "2023-12-01",
      rentDuration: "6 months",
      dueDate: "2024-06-01",
      totalRent: 'N8,000,000',
      paymentStatus: "Unpaid",
      statusColor: "red",
      rentPeriods: "3",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      rentPeriod1: "14th Nov, 2023 - 13th Nov, 2025",
      rentDurationRP1: "2 Years",
      rentAmountRP1: "N14,000,000",
      statusRP1: "pending",
      rentPeriod2: "14th Nov, 2023 - 13th Nov, 2027",
      rentDurationRP2: "4 Years",
      rentAmountRP2: "N80,000,000",
      statusRP2: "pending",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 3,
      profile: "/tableImgIII.png",
      name: "Michael Johnson",
      apartment: "Apartment C3",
      address: "789 Ikeja, Lagos",
      phone: "+234 803 456 7890",
      email: "michael.johnson@example.com",
      moveInDate: "2023-11-15",
      rentDuration: "12 months",
      dueDate: "2024-11-15",
      totalRent: 'N1,000,000',
      paymentStatus: "Partial",
      statusColor: "yellow",
      rentPeriods: "2",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N,20,000,000",
      statusCRP: "paid",
      rentPeriod1: "14th Nov, 2023 - 13th Nov, 2025",
      rentDurationRP1: "2 Years",
      rentAmountRP1: "N,14,000,000",
      statusRP1: "pending",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 4,
      profile: "/tableImgII.png",
      name: "David Farm",
      apartment: "Apartment Z1",
      address: "123 Main Street, Lagos",
      phone: "+234 801 234 5678",
      email: "john.doe@example.com",
      moveInDate: "2024-01-01",
      rentDuration: "12 months",
      dueDate: "2025-01-01",
      totalRent: 'N1,200,000',
      paymentStatus: "Paid",
      statusColor: "green",
      rentPeriods: "1",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 5,
      profile: "/tableImg.png",
      name: "Lo Smith",
      apartment: "Apartment B9",
      address: "456 Victoria Island, Lagos",
      phone: "+234 802 345 6789",
      email: "jane.smith@example.com",
      moveInDate: "2023-12-01",
      rentDuration: "6 months",
      dueDate: "2024-06-01",
      totalRent: 'N8,000,000',
      paymentStatus: "Unpaid",
      statusColor: "red",
      rentPeriods: "3",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      rentPeriod1: "14th Nov, 2023 - 13th Nov, 2025",
      rentDurationRP1: "2 Years",
      rentAmountRP1: "N14,000,000",
      statusRP1: "pending",
      rentPeriod2: "14th Nov, 2023 - 13th Nov, 2027",
      rentDurationRP2: "4 Years",
      rentAmountRP2: "N80,000,000",
      statusRP2: "pending",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 6,
      profile: "/tableImgIII.png",
      name: "Eli Johnson",
      apartment: "Apartment C1",
      address: "789 Ikeja, Lagos",
      phone: "+234 803 456 7890",
      email: "michael.johnson@example.com",
      moveInDate: "2023-11-15",
      rentDuration: "12 months",
      dueDate: "2024-11-15",
      totalRent: 'N1,000,000',
      paymentStatus: "Partial",
      statusColor: "yellow",
      rentPeriods: "2",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      rentPeriod1: "14th Nov, 2023 - 13th Nov, 2025",
      rentDurationRP1: "2 Years",
      rentAmountRP1: "N14,000,000",
      statusRP1: "pending",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 7,
      profile: "/tableImgII.png",
      name: "Johnson Babel",
      apartment: "Apartment A8",
      address: "123 Main Street, Lagos",
      phone: "+234 801 234 5678",
      email: "john.doe@example.com",
      moveInDate: "2024-01-01",
      rentDuration: "12 months",
      dueDate: "2025-01-01",
      totalRent: 'N1,200,000',
      paymentStatus: "Paid",
      statusColor: "green",
      rentPeriods: "1",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 8,
      profile: "/tableImg.png",
      name: "Tanner Hone",
      apartment: "Apartment B6",
      address: "456 Victoria Island, Lagos",
      phone: "+234 802 345 6789",
      email: "jane.smith@example.com",
      moveInDate: "2023-12-01",
      rentDuration: "6 months",
      dueDate: "2024-06-01",
      totalRent: 'N800,000',
      paymentStatus: "Unpaid",
      statusColor: "red",
      rentPeriods: "3",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      rentPeriod1: "14th Nov, 2023 - 13th Nov, 2025",
      rentDurationRP1: "2 Years",
      rentAmountRP1: "N14,000,000",
      statusRP1: "pending",
      rentPeriod2: "14th Nov, 2023 - 13th Nov, 2027",
      rentDurationRP2: "4 Years",
      rentAmountRP2: "N80,000,000",
      statusRP2: "pending",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 9,
      profile: "/tableImgIII.png",
      name: "James Jude",
      apartment: "Apartment W3",
      address: "789 Ikeja, Lagos",
      phone: "+234 803 456 7890",
      email: "michael.johnson@example.com",
      moveInDate: "2023-11-15",
      rentDuration: "12 months",
      dueDate: "2024-11-15",
      totalRent: 'N1,000,000',
      paymentStatus: "Partial",
      statusColor: "yellow",
      rentPeriods: "2",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      rentPeriod1: "14th Nov, 2023 - 13th Nov, 2025",
      rentDurationRP1: "2 Years",
      rentAmountRP1: "N14,000,000",
      statusRP1: "pending",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 10,
      profile: "/tableImgII.png",
      name: "Dora Kim",
      apartment: "Apartment L15",
      address: "123 Main Street, Lagos",
      phone: "+234 801 234 5678",
      email: "john.doe@example.com",
      moveInDate: "2024-01-01",
      rentDuration: "12 months",
      dueDate: "2025-01-01",
      totalRent: 'N1,200,000',
      paymentStatus: "Paid",
      statusColor: "green",
      rentPeriods: "1",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 11,
      profile: "/tableImg.png",
      name: "David Sanchez",
      apartment: "Apartment P2",
      address: "456 Victoria Island, Lagos",
      phone: "+234 802 345 6789",
      email: "jane.smith@example.com",
      moveInDate: "2023-12-01",
      rentDuration: "6 months",
      dueDate: "2024-06-01",
      totalRent: 'N8,000,000',
      paymentStatus: "Unpaid",
      statusColor: "red",
      rentPeriods: "3",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      rentPeriod1: "14th Nov, 2023 - 13th Nov, 2025",
      rentDurationRP1: "2 Years",
      rentAmountRP1: "N14,000,000",
      statusRP1: "pending",
      rentPeriod2: "14th Nov, 2023 - 13th Nov, 2027",
      rentDurationRP2: "4 Years",
      rentAmountRP2: "N80,000,000",
      statusRP2: "pending",
      property: "Sunrise Dreamers Top Estate",
    },
    {
      id: 12,
      profile: "/tableImgIII.png",
      name: "Tolu James",
      apartment: "Apartment C8",
      address: "789 Ikeja, Lagos",
      phone: "+234 803 456 7890",
      email: "michael.johnson@example.com",
      moveInDate: "2023-11-15",
      rentDuration: "12 months",
      dueDate: "2024-11-15",
      totalRent: 'N1,000,000',
      paymentStatus: "Partial",
      statusColor: "yellow",
      rentPeriods: "2",
      currentRentPeriod: "14th Nov, 2023 - 13th Nov, 2024",
      RentDurationCRP: "1 Year",
      rentAmountCRP: "N20,000,000",
      statusCRP: "paid",
      rentPeriod1: "14th Nov, 2023 - 13th Nov, 2025",
      rentDurationRP1: "2 Years",
      rentAmountRP1: "N14,000,000",
      statusRP1: "pending",
      property: "Sunrise Dreamers Top Estate",
    }
  ];


  // Extract all unique keys
  const [widthRa, setWidth] = React.useState(window.innerWidth);
  const allKeys = [...new Set(tenantsData.flatMap(Object.keys)), "Actions"];
  const usedKeys = allKeys.filter((key) => key !== "id" && key !== "profile");

  const dateInputRef = React.useRef(null);

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // For modern browsers
    }
  };

  const pages = [
    {
      id: 1,
      name: "All",
      component: (
        <Table
          tenantsData={tenantsData}
          usedKeys={usedKeys}
          widthRa={widthRa}
        />
      ),
    },
    {
      id: 2,
      name: "Due Date",
      component: (
        <Table
          tenantsData={tenantsData}
          usedKeys={usedKeys}
          widthRa={widthRa}
        />
      ),
    },
  ];
  const [active, setActive] = React.useState(pages[0].id);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenI, setIsOpenI] = React.useState(false);
  const [isOpenII, setIsOpenII] = React.useState(false);
  const [openStatusFilter, setOpenStatusFilter] = React.useState(false);
  const [openPeroid, setOpenPeriod] = React.useState(false);
  const [openColumns, setOpenColumns] = React.useState(false);
  const [reachedLimit, setReachedLimit] = React.useState(null);
  const [inviteTenant, setInviteTenant] = React.useState(false);
  const [bulkInvite, setBulkInvite] = React.useState(false);
  const dropdownRef = useClickOutside(() => setInviteTenant(false));
  const [showNumberOfHouseModal, setShowNumberOfHouseModal] = React.useState(false);
  const [showMappingSummaryModal, setShowMappingSummaryModal] = React.useState(false);
  const [openBulkInvite, setOpenBulkInvite] = React.useState(false);
  const [importData, setImportData] = React.useState(false);
  const [successfulModal, setSuccessfulModal] = React.useState(false);
  const [openTenantInvite, setOpenTenantInvite] = React.useState(false);
  const [openSingleInvite, setOpenSingleInvite] = React.useState(false);

  const estateData = {}

  const handlePageChange = (id) => {
    setActive(id);
  };


  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="mt-6 w-full flex flex-col justify-center items-center">
      {/* {inviteTenant && (
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal
            dropdownRef={dropdownRef}
            property={reachedLimit?.reachedMaxEstates}
            setInviteTenant={setInviteTenant}
          />
        </div>
      )} */}
      {/* {bulkInvite &&
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <SingleInvite
            setSuccessfulModal={setSuccessfulModal}
            setOpenSingleInvite={setBulkInvite}
            setOpenTenantInvite={setOpenTenantInvite}
            estateName={estateData?.name}
            estateId={estateData?._id} /> :

        </div>
      } */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <input
        type='date'
        ref={dateInputRef}
        className="hidden"
      />
      <div className='w-full flex justify-start px-4 mb-2'>
        <p className='font-medium text-[20px] text-GrayHomz flex gap-1 items-center'>Tenants <span className='px-2 py-0.5 bg-whiteblue rounded-[8px] text-BlueHomz'>{tenantsData?.length}</span></p>
      </div>
      <div className="w-auto h-auto px-4">
        <div className='flex flex-col-reverse gap-2 md:gap-0 md:flex-row md:justify-between md:items-center'>
          <div className="flex mt-1 gap-2 sm:gap-4 cursor-pointer">
            {pages.map((page) => (
              <div
                key={page.id}
                className={`flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === page.id
                  ? "bg-BlueHomz text-white"
                  : "bg-whiteblue text-BlueHomz "
                  }`}
                onClick={() => {
                  handlePageChange(page.id);
                }}
              >
                <p className={`text-[14px] font-500`}>{page.name}</p>
              </div>
            ))}
          </div>
          <div className='relative flex justify-end md:justify-normal md:items-center gap-2'>
            <div
              onClick={() => {
                setIsOpen(!isOpen)
                setOpenColumns(false)
              }}
              className='cursor-pointer w-auto hidden md:flex border border-BlueHomz px-3 py-2 rounded-[4px] items-center gap-1'>
              <ArrowDownDashes className='#006AFF' />
              {isOpen ?
                <ArrowUpII className="#006AFF" /> :
                <ArrowDown className="#006AFF" />
              }
            </div>
            <div className='md:hidden flex gap-2 items-center w-full border border-[#A9A9A9] rounded-[4px] px-3 py-2'>
              <BlueSearch />
              <input
                type='text'
                className='placeholder:text-[#A9A9A9] w-full outline-none'
                placeholder='Search'
              />
            </div>
            {
              isOpenII &&
              <div className='absolute z-50 top-10 right-[0px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px] overflow-y-auto scrollbar-container'>
                <div className='text-sm text-GrayHomz font-medium flex flex-col gap-0'>

                  <div className='flex gap-1 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                    <span className='w-3 mt-0.5 mr-1'>
                      <Share />
                    </span>
                    <span className='min-w-[80%]'>
                      Share Page
                    </span>
                  </div>
                  <div className='flex gap-2 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                    <span className='w-3'>
                      <ExportSmall />
                    </span>
                    <span className='min-w-[80%] flex items-center gap-1'>
                      Export as
                      <ArrowDown className="#4E4E4E" />
                    </span>
                  </div>
                </div>
              </div>
            }
            {
              isOpenI &&
              <div className='absolute z-50 top-10 right-[50px] md:right-[104px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px] overflow-y-auto scrollbar-container'>
                {
                  openColumns ?
                    <div className='text-sm text-GrayHomz font-medium'>
                      <div className='mb-2 flex gap-2 items-center w-full border border-[#A9A9A9] rounded-[4px] p-2'>
                        <BlueSearch />
                        <input
                          type='text'
                          className='placeholder:text-[#A9A9A9] w-full outline-none'
                          placeholder='Search'
                        />
                      </div>
                      {usedKeys?.map((key, index) => (
                        <div key={index} id={key} className={`${index === 0 ? "mt-0" : "mt-1.5"} flex gap-2 items-center`}>
                          {openColumns ? <Ticked /> : <UnTicked />} {key}
                        </div>
                      ))}
                    </div> :
                    openStatusFilter ?
                      <div className='text-sm text-GrayHomz font-medium'>
                        <div className='flex gap-2 items-center'>
                          {openStatusFilter ? <Ticked /> : <UnTicked />}
                          Pending
                        </div>
                        <div className='flex gap-2 mt-1.5 items-center'>
                          {!openStatusFilter ? <Ticked /> : <UnTicked />}
                          Paid
                        </div>
                        <div className='flex gap-2 mt-1.5 items-center'>
                          {openStatusFilter ? <Ticked /> : <UnTicked />}
                          Over due
                        </div>
                      </div>
                      : openPeroid ?
                        <div className='text-sm text-GrayHomz font-medium'>
                          <div className='flex gap-2 items-center'>
                            {openPeroid ? <Ticked /> : <UnTicked />}
                            All Rent Periods
                          </div>
                          <div className='flex gap-2 mt-1.5 items-center'>
                            {!openPeroid ? <Ticked /> : <UnTicked />}
                            Rent Period 1
                          </div>
                          <div className='flex gap-2 mt-1.5 items-center'>
                            {!openPeroid ? <Ticked /> : <UnTicked />}
                            Rent Period 2
                          </div>
                          <div className='flex gap-2 mt-1.5 items-center'>
                            {!openPeroid ? <Ticked /> : <UnTicked />}
                            Rent Period 3
                          </div>
                        </div> :
                        <div>
                          <p className='text-[13px] text-GrayHomz font-medium'>
                            Filter by:
                          </p>
                          <button onClick={() => setOpenStatusFilter(true)} className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                            Status    <ArrowDown className="#4E4E4E" />
                          </button>

                          <button
                            onClick={handleDateClick}
                            className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'
                          >
                            Date    <DateIconTwo />
                          </button>
                          <button onClick={() => setOpenPeriod(true)} className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                            Rent Period    <ArrowDown className="#4E4E4E" />
                          </button>
                          <button
                            onClick={() => setOpenColumns(true)}
                            className='mt-1 text-sm font-normal text-GrayHomz md:hidden flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                            Columns    <ArrowDown className="#4E4E4E" />
                          </button>
                        </div>
                }
              </div>

            }
            {
              isOpen &&
              <div className='absolute z-50 top-10 right-[175px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px] overflow-y-auto scrollbar-container'>
                {
                  openColumns ?
                    <div className='text-sm text-GrayHomz font-medium'>
                      <div className='mb-2 flex gap-2 items-center w-full border border-[#A9A9A9] rounded-[4px] p-2'>
                        <BlueSearch />
                        <input
                          type='text'
                          className='placeholder:text-[#A9A9A9] w-full outline-none'
                          placeholder='Search'
                        />
                      </div>
                      {usedKeys?.map((key, index) => (
                        <div key={index} id={key} className={`${index === 0 ? "mt-0" : "mt-1.5"} flex gap-2 items-center`}>
                          {openColumns ? <Ticked /> : <UnTicked />} {key}
                        </div>
                      ))}
                    </div>
                    :
                    <div>
                      <p className='text-[13px] text-GrayHomz font-medium'>
                        Sort by:
                      </p>
                      <button
                        onClick={() => setOpenColumns(true)}
                        className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                        Columns    <ArrowDown className="#4E4E4E" />
                      </button>
                      <button
                        onClick={() => setOpenColumns(true)}
                        className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                        <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
                      </button>
                    </div>
                }
              </div>

            }
            <div
              onClick={() => {
                setIsOpenI(!isOpenI)
                setOpenStatusFilter(false)
                setOpenPeriod(false)
                setOpenColumns(false)
              }}
              className='cursor-pointer w-auto flex border border-BlueHomz px-3 py-2 rounded-[4px] items-center gap-1'>
              <FilterIconBlue />
              {isOpenI ?
                <ArrowUpII className="#006AFF" /> :
                <ArrowDown className="#006AFF" />
              }
            </div>
            <div
              onClick={() => {
                setIsOpenII(!isOpenII)
              }}
              className='cursor-pointer w-auto text-sm text-BlueHomz font-medium flex border border-BlueHomz px-3 py-2 rounded-[4px] items-center gap-1'>
              <span className='hidden md:block'>
                Actions
              </span>
              {isOpenII ?
                <ArrowUpII className="#006AFF" /> :
                <ArrowDown className="#006AFF" />
              }
            </div>
          </div>
        </div>
        <div className="my-5 rounded-[12px] ">
          {pages.map((page) => (
            <div
              key={page.id}
              className={active === page.id ? "inline" : "hidden"}
            >
              {page.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tenants