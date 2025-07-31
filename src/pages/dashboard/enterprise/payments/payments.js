"use client";
import React, { useState, Suspense, useEffect } from "react";
import Widget from "./components/widget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import LoadingII from "@/components/mainmenu/loadingII";
import Dropdown from "../components/dropDownFilter";
import Header from "./components/header";
import useExportRentPayment from "@/store/enterpriseStore/exportRentPayment";
import usePaymentFilterStore from "@/store/enterpriseStore/usePaymentFilterStore";
import formatDateII from "@/utils/formatDateII";
import estateStore from "@/store/enterpriseStore/estates";
import Search from "@/components/icons/search";
import FilterIconBlue from "@/components/icons/filterIconBlue";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";
import Ticked from "@/components/icons/ticked";
import UnTicked from "@/components/icons/unTicked";
import Document from "@/components/icons/document";
import useClickOutside from "@/utils/clickOutside";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Reset from "@/components/icons/reset";
import IncludeAdditionalFee from "./components/includeAdditionalFee";
import ExpiredPlanModal from "../components/expiredPlanModal";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import useEnterprisePlans from "@/store/enterpriseStore/enterprisePlans";
import { checkPlanLimits } from "@/utils/checkPlanLimits";
import { isTrialExpired } from "@/utils/compareTrialTime";

const Payment = () => {
  const {
    selectedProperty,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    setSelectedProperty,
    setSelectedOption,
    search,
    setSearch,
    setPageNo
  } = usePaymentFilterStore();

  const [isOpen, setIsOpen] = React.useState(false);
  const closeFilter = useClickOutside(() => setIsOpen(false));
  const [isOpenI, setIsOpenI] = React.useState(false);
  const dropdownRef = useClickOutside(() => setIsOpenI(false));
  const [openPropertyFilter, setOpenPropertyFilter] = React.useState(false)
  const { data, fetchData } = useExportRentPayment();
  const { data: estates, loading, fetchData: fetchEnterpriseProperties } = estateStore();
  const [showPop, setShowPop] = React.useState(false);
  const [include, setInclude] = React.useState("");
  const [openPurchasePlan, setOpenPurchasePlan] = React.useState(false);
      const [reachedLimit, setReachedLimit] = useState(null);

  const { data: user, fetchData: fetchProfileData } = useProfileEnterpriseMe();
  const { data: enterprisePlans, fetchData: fetchEnterprisePlans } =
    useEnterprisePlans();

  React.useEffect(() => {
    fetchProfileData()
    fetchEnterprisePlans()
  }, []);


  useEffect(() => {
    const values = checkPlanLimits(
      enterprisePlans,
      user?.planName,
      user?.estates?.length,
      user?.propertyOwners?.length,
      user?.tenants?.length,
      user?.IsExpired
    );
    setReachedLimit(values);
  }, [enterprisePlans, user]);
  // User-selected date range
  const today = new Date();

  // Calculate the date one month later
  const prevMonth = new Date();
  prevMonth.setMonth(today.getMonth() - 1);

  useEffect(() => {
    fetchData();
    // setFromDate(formatDateII(prevMonth));
    // setToDate(formatDateII(today));
    fetchEnterpriseProperties()
  }, []);

  const clear = () => {
    setSelectedProperty(null);
    setFromDate(null);
    setToDate(null);
    setSearch('')
    setPageNo(1)
  };

  const options = [...new Set(estates?.map((item) => item?.name))];


  const optionsTwo = [".CSV", ".XLSX", ".PDF"];


  const goToplan = () => {
    router.push("/plans")
  }

  return (
    <Suspense fallback={<div><LoadingII /></div>}>
      <div className="w-full p-8">
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
        <CustomizedModal isOpen={openPurchasePlan && reachedLimit?.enterprisePlanName === "Enterprise Free" && !reachedLimit?.expiredPlan && isTrialExpired(user?.trialEndDate)}>
          <ExpiredPlanModal
            header={"Your Trial Has Ended"}
            body={"Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."}
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
        <CustomizedModal isOpen={openPurchasePlan && !reachedLimit?.expiredPlan && reachedLimit?.enterprisePlanName === "Enterprise Basic"}>
          <ExpiredPlanModal
            header={"Upgrade Your Plan"}
            body={"Kindly upgrade your plan now to unlock access to this feature."}
            button={"Upgrade Plan"}
            buttonTwo={"close"}
            returnHome={goToplan}
            returnHomeTwo={() => setOpenPurchasePlan(false)}
          />
        </CustomizedModal>
        <CustomizedModal isOpen={showPop} onRequestClose={() => setShowPop(false)}>
          <IncludeAdditionalFee include={include} setInclude={setInclude} setShowPop={setShowPop} />
        </CustomizedModal>
        <div className="w-full">
          <div className="relative md:hidden flex flex-row gap-2 items-center">
            {/* Search Input */}
            <div className='flex gap-2 items-center w-full h-[35px] border border-[#A9A9A9] rounded-[4px] p-2'>
              <Search />
              <input
                type='text'
                className='placeholder:text-[#A9A9A9] w-full outline-none'
                placeholder='email, address...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div ref={closeFilter}>
              <div
                onClick={() => {
                  setIsOpen(!isOpen)
                  setOpenPropertyFilter(false)
                }}
                className='cursor-pointer w-auto flex border border-BlueHomz px-3 py-2 rounded-[4px] items-center gap-1'>
                <FilterIconBlue />
                {isOpen ?
                  <ArrowUpII className="#006AFF" /> :
                  <ArrowDown className="#006AFF" />
                }
              </div>
              {
                isOpen &&
                <div className='absolute z-50 top-10 right-[50px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px]'>
                  {
                    openPropertyFilter ?
                      <div className='text-sm text-GrayHomz font-medium'>
                        {options.map((prop, index) => (
                          <div
                            key={index}
                            className='flex gap-2 mt-1.5 items-center cursor-pointer'
                            onClick={() => setSelectedProperty(selectedProperty === prop ? null : prop)}
                          >
                            {selectedProperty === prop ? <Ticked /> : <UnTicked />}
                            {prop}
                          </div>
                        ))}
                      </div> :
                      <div>
                        <p className='text-[13px] text-GrayHomz font-medium'>
                          Filter by:
                        </p>

                        <button
                          className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                        >
                          <input
                            type="date"
                            id="fromPayDate"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full py-2 outline-none"
                            placeholder='Start Date'
                          />
                          {/* <span className='absolute'><DateIconTwo /></span> */}
                        </button>
                        <button
                          className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                        >
                          <input
                            type="date"
                            id="toPayDate"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full py-2 outline-none"
                            placeholder='End Date'
                          />
                          {/* <span className='absolute'><DateIconTwo /></span> */}
                        </button>

                        {/* <button onClick={() => setOpenPropertyFilter(true)} className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                          {selectedProperty ? selectedProperty : "Property"}     <ArrowDown className="#4E4E4E" />
                        </button> */}
                        <button
                          onClick={() => clear()}
                          className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                          <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
                        </button>
                      </div>
                  }
                </div>
              }
            </div>
            <div ref={dropdownRef}>
              <button
                onClick={() => {
                  if (isTrialExpired(user?.trialEndDate) && ((user?.planName === "Enterprise Free") || (user?.planName === "Enterprise Trial"))) {
                    setOpenPurchasePlan(!openPurchasePlan)
                  } else if (reachedLimit?.expiredPlan) {
                    setOpenPurchasePlan(!openPurchasePlan)
                  } else if (reachedLimit?.enterprisePlanName === "Enterprise Basic") {
                    setOpenPurchasePlan(!openPurchasePlan)
                  } else {
                    setShowPop(true);
                  }
                }}
                className="text-walletBg px-4 bg-BlueHomz h-[35px] flex gap-1 items-center rounded-[4px]"
              >
                <Document className="#FFFFFF" />
              </button>
              {
                isOpenI &&
                <div className={`absolute z-20 w-[200px] right-0 top-[60px] md:top-[50px] font-[500] text-BlackHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container`}>
                  <p className='px-4 text-[13px] text-GrayHomz font-medium'>
                    Export as:
                  </p>
                  {optionsTwo.map((option, index) => (
                    <div
                      key={index}
                      className="py-2 bg-[#F6F6F6] px-4 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                      onClick={() => setSelectedOption(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
        <Header
          options={options}
          setFromDate={setFromDate}
          setToDate={setToDate}
          toDate={toDate}
          fromDate={fromDate}
          setSelectedProperty={setSelectedProperty}
          selectedProperty={selectedProperty}
          clear={clear}
        />
        <Widget include={include} setInclude={setInclude} property={options} setShowPop={setShowPop} />
      </div>
    </Suspense>
  );
};

export default Payment;
