"use client"
import React from "react";
import Modal from "../../tenants/components/modal";
import useTenantOfAnEstate from "@/store/enterpriseStore/useTenantOfAnEstate";
import useClickOutside from "@/utils/clickOutside";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import useEnterprisePlans from "@/store/enterpriseStore/enterprisePlans";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import ExpiredPlanModal from "../../components/expiredPlanModal";
import { checkPlanLimits } from "@/utils/checkPlanLimits";
import { isTrialExpired } from "@/utils/compareTrialTime";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import TableFilter from "@/store/enterpriseStore/tableFilter";
import MobileBackButton from "@/components/icons/mobileBackButton";
import Table from "../../tenants/firstPage/table";
import useBodyScroll from '@/utils/useBodyScroll';
import Link from "next/link";
import ArrowDownDashes from '@/components/icons/arrowDownDashes';
import ArrowUpII from '@/components/icons/arrowUpII';
import ArrowDown from '@/components/icons/arrowDown';
import FilterIconBlue from '@/components/icons/filterIconBlue';
import Ticked from '@/components/icons/ticked';
import UnTicked from '@/components/icons/unTicked';
import BlueSearch from '@/components/icons/blueSearch';
import Reset from '@/components/icons/reset';
import Image from "next/image";
import SingleInvite from "../importTenant/components/singleInvite";
import AddNormal from "@/components/icons/addNormal";
import ExportSmall from "@/components/icons/exportSmall";


const Tenants = ({ id }) => {
  const {
    data,
    setActive,
    active,
    loading: loadingTable,
    totalCount,
    estateData,
    currentPage,
    totalPages,
    fetchData,
    selectedDate,
    setSelectedDate,
    selectedStatus,
    setSelectedStatus,
    setCurrentPage
  } = useTenantOfAnEstate();
  React.useEffect(() => {
    setTenantsData(data?.[0].data ?? null)
  }, [data])
  // Extract all unique keys
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('');
  const [reachedLimit, setReachedLimit] = React.useState(null);
  const [visibleColumns, setVisibleColumns] = React.useState([]);
  const [maxPeriods, setMaxPeriods] = React.useState(0);
  const [tenantData, setTenantData] = React.useState(null);
  const [openPurchasePlan, setOpenPurchasePlan] = React.useState(false);
  const [tenantsData, setTenantsData] = React.useState(null);
  const [widthRa, setWidth] = React.useState(0);
  const {
    active: activeTab,
    setActive: setActiveTab,
    Data: KeptData,
    setData,
  } = TableFilter();

  const printableRef = React.useRef();
  const {
    data: user,
    fetchData: fetchProfileData,
    // loadingProfile,
  } = useProfileEnterpriseMe();

  const router = useRouter();

  const { data: enterprisePlans, fetchData: fetchEnterprisePlans } =
    useEnterprisePlans();

  React.useEffect(() => {
    fetchProfileData();
    fetchEnterprisePlans();
    setLoading(false)
  }, []);


  const removeActiveRentPeriods = (data) => {
    return data?.map(tenant => {
      if (tenant?.rentInfo && tenant?.rentInfo.periods) {
        return {
          ...tenant,
          rentInfo: {
            ...tenant?.rentInfo,
            periods: tenant?.rentInfo.periods.filter(period => !period?.isActive)
          }
        };
      }
      return tenant;
    });
  };

  React.useEffect(() => {
    setTenantData(removeActiveRentPeriods(tenantsData))
  }, [tenantsData])

  // Determine the maximum number of rent periods in the data
  React.useEffect(() => {
    if (tenantData?.length > 0) {
      const periodsCount = tenantData?.reduce((max, tenant) => {
        const periods = tenant?.rentInfo?.periods?.length || 0;
        return periods > max ? periods : max;
      }, 0);
      setMaxPeriods(periodsCount);
    }
  }, [tenantData]);

  // Generate all possible column headers
  const allColumns = React.useMemo(() => {
    const baseColumns = [
      "Tenant",
      "Property",
      "Apartment No",
      "Address",
      "Email",
      "Phone No",
      "Rent Periods",
      "Current Rent Period",
      "Rent Duration (CRP)",
      "Rent Amount (CRP)",
      "Status (CRP)"
    ];

    // Add dynamic rent period columns
    const periodColumns = [];
    for (let i = 1; i <= maxPeriods; i++) {
      periodColumns?.push(
        `Rent Period ${i}`,
        `Rent Duration (RP${i})`,
        `Rent Amount (RP${i})`,
        `Status (RP${i})`
      );
    }

    return [...baseColumns, ...periodColumns, "Actions"];
  }, [maxPeriods]);

  React.useEffect(() => {
    setVisibleColumns(allColumns);
  }, [allColumns]);

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => {
      // Toggle column visibility
      const newVisibleColumns = prev?.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column];

      // Reorder based on allColumns, keeping "Actions" last
      return [
        ...allColumns?.filter(col =>
          col !== "Actions" && newVisibleColumns?.includes(col)
        ),
        ...(newVisibleColumns?.includes("Actions") ? ["Actions"] : [])
      ];
    });
  };

  const resetColumnVisibility = () => {
    setVisibleColumns(allColumns); // Reset to all columns
  };

  const RefinedData = activeTab
    ? tenantData
    : KeptData;

  React.useEffect(() => {
    setData(tenantData);
  }, [tenantData]);

  const pages = [
    {
      id: 1,
      name: "All",
      component: (
        <Table
          tenantData={RefinedData}
          widthRa={widthRa}
          fetchDataAgain={fetchData}
          printableRef={printableRef}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          visibleColumns={visibleColumns}
          loading={loadingTable}
        />
      ),
    },
    {
      id: 2,
      name: "Due Date",
      component: (
        <Table
          tenantData={RefinedData}
          widthRa={widthRa}
          fetchDataAgain={fetchData}
          printableRef={printableRef}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          visibleColumns={visibleColumns}
          currentPage={currentPage}
          loading={loadingTable}
        />
      ),
    },
  ];
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenI, setIsOpenI] = React.useState(false);
  const [isOpenII, setIsOpenII] = React.useState(false);
  const [openStatusFilter, setOpenStatusFilter] = React.useState(false);
  const [openPeroid, setOpenPeriod] = React.useState(false);
  const [openColumns, setOpenColumns] = React.useState(false);
  const [inviteTenant, setInviteTenant] = React.useState(false);
  const [bulkInvite, setBulkInvite] = React.useState(false);
  const dropdownRef = useClickOutside(() => setInviteTenant(false));
  const dropdownRefI = useClickOutside(() => setIsOpen(false));
  const dropdownRefII = useClickOutside(() => setIsOpenI(false));
  const dropdownRefIII = useClickOutside(() => setIsOpenII(false));
  const [openBulkInvite, setOpenBulkInvite] = React.useState(false);
  const [openTenantInvite, setOpenTenantInvite] = React.useState(false);
  const [openSingleInvite, setOpenSingleInvite] = React.useState(false);

  const statuses = ["Pending", "Paid", "Over due"];

  // useEffect to handle scrolling
  useBodyScroll([inviteTenant]);

  const handlePageChange = (id) => {
    setActive(id);
  };

  const clear = () => {
    setSelectedStatus(null);
    setSelectedDate(null);
    setSearch(null);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  React.useEffect(() => {
    fetchData(currentPage, id);
  }, [currentPage, selectedDate, selectedStatus, active, id]);

  const filteredColumns = allColumns?.filter((column) =>
    column?.toLowerCase()?.includes(search?.toLowerCase())
  );

  React.useEffect(() => {
    let timeout;

    if (data !== null) {
      setLoading(false);
    } else {
      timeout = setTimeout(() => {
        setLoading(false);
      }, 20000);
    }
    return () => clearTimeout(timeout);
  }, [data]);

  React.useEffect(() => {
    const values = checkPlanLimits(
      enterprisePlans,
      user?.planName,
      user?.estates?.length,
      user?.propertyOwners?.length,
      user?.tenants?.length,
      user?.IsExpired
    );
    setReachedLimit(values);
  }, [enterprisePlans, user, data]);

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: `${"Tenants Data"}`,
    onAfterPrint: () => console.log("Document printed."),
  });

  const toggleInvite = () => {
    if (isTrialExpired(user?.trialEndDate) && ((user?.planName === "Enterprise Free") || (user?.planName === "Enterprise Trial"))) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.reachedMaxTenants) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.expiredPlan) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else {
      setInviteTenant(true);
    }
  };

  const goToplan = () => {
    router.push("/plans");
  };

  return (
    <div className="mt-6 w-full">
      <div className='ml-4 mb-4 flex w-full md:hidden gap-4 items-center'>
        <div
          onClick={() => {
            router.back()
          }}
          className='cursor-pointer'>
          <div className='w-[28px] h-[28px] bg-walletBg rounded-[8px] flex justify-center items-center'>
            <MobileBackButton />
          </div>
        </div>
        <div className="w-[90%] flex items-center">
          <Link
            href={"/dashboard/property-owner/estates"}
            className="text-[16px] truncate font-[400] text-GrayHomz"
          >
            {estateData?.name ? estateData?.name : "Property Name"}<> </>/
          </Link>
          <div className="text-[20px] font-[500] text-GrayHomz">
            Tenants <span className="bg-whiteblue p-1 rounded-[4px] text-BlueHomz text-[18px] font-normal">{tenantsData ? tenantsData?.length : 0}</span>
          </div>
        </div>
      </div>
      <div className="ml-4 mb-4 hidden w-[475px] md:flex gap-2 items-center">
        <Link
          href={"/dashboard/enterprise-property/estates"}
          className="text-[14px] font-[400] text-GrayHomz2 md:flex gap-2"
        >
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
            }
            alt=""
            height={16}
            width={16}
            className="w-4"
          />
          Go Back
        </Link>
        <Link
          href={"/dashboard/enterprise-property/estates"}
          className="text-[16px] truncate font-[400] text-GrayHomz"
        >
          {estateData?.name ? estateData?.name : "Property Name"}<> </>/
        </Link>
        <div className="text-[20px] font-[500] text-GrayHomz">
          Tenants <span className="bg-whiteblue p-1 rounded-[4px] text-BlueHomz text-[18px] font-normal">{tenantsData ? tenantsData?.length : 0}</span>
        </div>
      </div>
      {inviteTenant && (
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal
            dropdownRef={dropdownRef}
            property={reachedLimit?.reachedMaxEstates}
            setInviteTenant={setInviteTenant}
          />
        </div>
      )}
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
      <CustomizedModal isOpen={reachedLimit?.reachedMaxTenants && !reachedLimit?.expiredPlan && openPurchasePlan}>
        <ExpiredPlanModal
          header={reachedLimit?.enterprisePlanName === "Enterprise Basic" ? "Upgrade Your Plan" : "You’ve Hit Your Limit!"}
          body={reachedLimit?.enterprisePlanName === "Enterprise Basic" ? "Kindly upgrade your plan now to unlock access to this feature." : "Upgrade your enterprise plan to add more tenants"}
          button={"Upgrade Plan"}
          buttonTwo={"close"}
          returnHome={goToplan}
          returnHomeTwo={() => setOpenPurchasePlan(false)}
        />
      </CustomizedModal>
      <CustomizedModal isOpen={openPurchasePlan && reachedLimit?.enterprisePlanName === "Enterprise Free" && !reachedLimit?.expiredPlan && isTrialExpired(user?.trialEndDate)}>
        <ExpiredPlanModal
          header={"Your Trial Has Ended"}
          body={
            "Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."
          }
          button={"Buy Plan"}
          buttonTwo={"close"}
          returnHome={goToplan}
          returnHomeTwo={() => setOpenPurchasePlan(false)}
        />
      </CustomizedModal>
      <CustomizedModal isOpen={openPurchasePlan && reachedLimit?.expiredPlan}>
        <ExpiredPlanModal
          header={`${reachedLimit?.enterprisePlanName} Plan Expired`}
          body={`Your ${reachedLimit?.enterprisePlanName} ${reachedLimit?.interval} plan has expired. Renew now to continue enjoying all features!`}
          button={"Upgrade Plan"}
          buttonTwo={"close"}
          returnHome={goToplan}
          returnHomeTwo={() => setOpenPurchasePlan(false)}
        />
      </CustomizedModal>
      {inviteTenant && (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal dropdownRef={dropdownRef} />
        </div>
      )}
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
                  if (page.id === 2) {
                    setActiveTab(true);
                  } else {
                    setActiveTab(false);
                  }
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
                  <div onClick={toggleInvite} className='flex gap-2 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                    <span className='w-3'>
                      <AddNormal />
                    </span>
                    <span className='min-w-[80%]'>
                      Invite Tenant(s)
                    </span>
                  </div>
                  {/* <div onClick={() => setBulkInvite(true)} className='flex gap-2 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                          <span className='w-3'>
                            <BulkIcon />
                          </span>
                          <span className='min-w-[80%]'>
                            Manually add Tenant(s)
                          </span>
                        </div> */}
                  <div onClick={handlePrint} className='flex gap-1 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                    <span className='w-3 mt-0.5 mr-1'>
                      <ExportSmall />
                    </span>
                    <span className='min-w-[80%]'>
                      Download Page
                    </span>
                  </div>
                  {/* <div className='flex gap-2 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                          <span className='w-3'>
                            <ExportSmall />
                          </span>
                          <span className='min-w-[80%] flex items-center gap-1'>
                            Export as
                            <ArrowDown className="#4E4E4E" />
                          </span>
                        </div> */}
                </div>
              </div>
            }
            {
              isOpenI &&
              <div className='absolute z-50 top-10 right-[50px] md:right-[104px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px] overflow-y-auto scrollbar-container'>
                {
                  openColumns ?
                    <div className='text-sm text-GrayHomz font-medium'>
                      {/* Search Input */}
                      <div className='mb-2 flex gap-2 items-center w-full border border-[#A9A9A9] rounded-[4px] p-2'>
                        <BlueSearch />
                        <input
                          type='text'
                          className='placeholder:text-[#A9A9A9] w-full outline-none'
                          placeholder='Search'
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>

                      {/* Column Selection */}
                      {filteredColumns.map((column, index) => (
                        <div
                          key={column}
                          className={`flex gap-2 items-center cursor-pointer ${index === 0 ? 'mt-0' : 'mt-1.5'}`}
                          onClick={() => toggleColumnVisibility(column)}
                        >
                          {visibleColumns.includes(column) ? <Ticked /> : <UnTicked />} {column}
                        </div>
                      ))}
                    </div> :
                    openStatusFilter ?
                      <div className='text-sm text-GrayHomz font-medium'>
                        {statuses.map((status) => (
                          <div
                            key={status}
                            className='flex gap-2 mt-1.5 items-center cursor-pointer'
                            onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                          >
                            {selectedStatus === status ? <Ticked /> : <UnTicked />}
                            {status}
                          </div>
                        ))}
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
                            className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                          >
                            <input
                              type='date'
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="w-full py-2 outline-none"
                              placeholder='Date'
                            />
                            {/* <span className='absolute'><DateIconTwo /></span> */}
                          </button>

                          {/* <button onClick={() => setOpenPeriod(true)} className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                                  Rent Period    <ArrowDown className="#4E4E4E" />
                                </button> */}
                          <button
                            onClick={() => setOpenColumns(true)}
                            className='mt-1 text-sm font-normal text-GrayHomz md:hidden flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                            Columns    <ArrowDown className="#4E4E4E" />
                          </button>
                          <button
                            onClick={() => clear()}
                            className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue hidden md:flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                            <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
                          </button>
                          <button
                            onClick={() => {
                              clear()
                              resetColumnVisibility()
                            }}
                            className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue md:hidden flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                            <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
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
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>

                      {/* Column Selection */}
                      {filteredColumns.map((column, index) => (
                        <div
                          key={column}
                          className={`flex gap-2 items-center cursor-pointer ${index === 0 ? 'mt-0' : 'mt-1.5'}`}
                          onClick={() => toggleColumnVisibility(column)}
                        >
                          {visibleColumns.includes(column) ? <Ticked /> : <UnTicked />} {column}
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
                        onClick={() => resetColumnVisibility()}
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
  );
};

export default Tenants;
