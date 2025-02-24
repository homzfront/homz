"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EstateForm from "./estateForm/estateForm";
import ListedEstates from "./listedEstates";
import useBodyScroll from "@/utils/useBodyScroll";
import LoadingII from "@/components/mainmenu/loadingII";
import estateStore from "@/store/enterpriseStore/estates";
import formatDateII from "@/utils/formatDateII";
import useTabForAddProperty from "@/store/document/useTabForAddProperty";
import { useRouter } from "next/navigation";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import ExpiredPlanModal from "../components/expiredPlanModal";
import useEnterprisePlans from "@/store/enterpriseStore/enterprisePlans";
import { checkPlanLimits } from "@/utils/checkPlanLimits";
import { isTrialExpired } from "@/utils/compareTrialTime";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import VideoModal from "@/components/general/videoModal";
import useClickOutside from "@/utils/clickOutside";

const Estate = () => {
  const { tab, setTab } = useTabForAddProperty();
  const { data, loading, fetchData } = estateStore();
  const {
    data: user,
    fetchData: fetchProfileData,
    loadingProfile,
  } = useProfileEnterpriseMe();
  const { data: enterprisePlans, fetchData: fetchEnterprisePlans } =
    useEnterprisePlans();
  const [reachedLimit, setReachedLimit] = useState(null);
  const router = useRouter();
  const estates = data;
  const [openPurchasePlan, setOpenPurchasePlan] = useState(false);
  const [openPurchasePlanTenant, setOpenPurchasePlanTenant] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationForm, setRegistrationForm] = useState(
    tab === "addProperty"
  );
  const [inviteTenant, setInviteTenant] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const dropdownRef = useClickOutside(() => setInviteTenant(false));
  const [searchQuery, setSearchQuery] = useState(null);
  const [filterModal, setFilterModal] = useState(false);

  const videoLink = "https://www.youtube.com/watch?v=fgd0aj8xrAA&ab_channel=HomzNG";

  // useEffect to handle scrolling
  useBodyScroll([inviteTenant, loading]);

  useEffect(() => {
    fetchData();
    fetchProfileData();
    fetchEnterprisePlans();
  }, []);

  useEffect(() => {
    const values = checkPlanLimits(
      enterprisePlans,
      mrAbeyData?.planName,
      data?.length,
      mrAbeyData?.propertyOwners?.length,
      mrAbeyData?.tenants?.length,
      mrAbeyData?.IsExpired
    );
    setReachedLimit(values);
  }, [enterprisePlans, user, data]);

  const clear = () => {
    setSelectedState(null);
    setSelectedArea(null);
    setSelectedDate(null);
    setSelectedProperty(null);
    setSearchQuery(null);
  };

  const options = [...new Set(data?.map((item) => item?.location.state))];
  const options2 = [...new Set(data?.map((item) => item?.location.area))];
  const option3 = [...new Set(data?.map((item) => item?.name))];

  const filteredData = data?.filter((data) => {
    const matchesSearchQuery =
      !searchQuery ||
      data?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const selectedDateTimestamp = Date.parse(selectedDate);
    const createdDateTimestamp = Date.parse(formatDateII(data?.created));

    return (
      (!selectedState || data?.location.state === selectedState) &&
      (!selectedArea || data?.location.area === selectedArea) &&
      (!selectedProperty || data?.name === selectedProperty) &&
      (!selectedDate || selectedDateTimestamp <= createdDateTimestamp) &&
      matchesSearchQuery
    );
  });

  const openRegistrationForm = () => {
    if (reachedLimit?.reachedMaxEstates) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.reachedMaxTenants) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (isTrialExpired(mrAbeyData?.trialEndDate) && ((mrAbeyData?.planName === "Enterprise Free") || (mrAbeyData?.planName === "Enterprise Trial"))) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.expiredPlan) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else {
      setRegistrationForm(true);
    }
  };

  const returnToStartRegistration = () => {
    setTab(null);
    setRegistrationForm(false);
  };


  const addNewEstate = () => {
    if (reachedLimit?.reachedMaxEstates) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.reachedMaxTenants) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (isTrialExpired(mrAbeyData?.trialEndDate) && ((mrAbeyData?.planName === "Enterprise Free") || (mrAbeyData?.planName === "Enterprise Trial"))) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.expiredPlan) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else {
      setRegistrationForm(true);
    }
  };

  const openMobileFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const closeMobileFilterModal = () => {
    setFilterModal(false);
  };

  const goToplan = () => {
    router.push("/plans");
  };

  return (
    <div className="w-full">
      {loading ? (
        <LoadingII />
      ) : data && data.length >= 1 ? (
        <ListedEstates
          setInviteTenant={setInviteTenant}
          inviteTenant={inviteTenant}
          Data={filteredData}
          selectedDataId={selectedDataId}
          setSelectedDataId={setSelectedDataId}
          popUpMenu={popUpMenu}
          setPopUpMenu={setPopUpMenu}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          addNewEstate={addNewEstate}
          registrationForm={registrationForm}
          returnToStartRegistration={returnToStartRegistration}
          selectedArea={selectedArea}
          selectedState={selectedState}
          selectedDate={selectedDate}
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          setSelectedArea={setSelectedArea}
          setSelectedState={setSelectedState}
          setSelectedDate={setSelectedDate}
          clear={clear}
          options={options}
          options2={options2}
          options3={option3}
          fetchData={fetchData}
          dropdownRef={dropdownRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          closeMobileFilterModal={closeMobileFilterModal}
          openMobileFilterModal={openMobileFilterModal}
          filterModal={filterModal}
          openPurchasePlan={openPurchasePlan}
          setOpenPurchasePlan={setOpenPurchasePlan}
          user={user}
          reachedLimit={reachedLimit}
          openRegistrationForm={openRegistrationForm}
          openPurchasePlanTenant={openPurchasePlanTenant}
          setOpenPurchasePlanTenant={setOpenPurchasePlanTenant}
        />
      ) : registrationForm ? (
        <EstateForm
          returnToStartRegistration={returnToStartRegistration}
          fetchData={fetchData}
        />
      ) : (
        <div className="w-full p-8">
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Properties</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz  text-[18px] font-[400]">0</span>
              </span>
            </div>
            <p className="text-[18px] font-[400] text-GrayHomz">
              Add your properties so you can seamlessly manage them
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-5 h-[450px] justify-center items-center">
            <div className="bg-whiteblue rounded-[100%] flex justify-center items-center h-[120px] w-[120px]">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/estate/buildings-2.png"
                }
                height={88}
                width={89}
                alt=""
                className="mt-1"
              />
            </div>
            <h1 className="text-[41px] font-[700] text-BlueHomz">
              Get Started
            </h1>
            <button
              onClick={openRegistrationForm}
              className="p-[12px] w-[200px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700]"
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
            {/* <VideoModal
              videoUrl={videoLink}
            /> */}
          </div>
        </div>
      )}
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
      <CustomizedModal isOpen={openPurchasePlanTenant && !reachedLimit?.expiredPlan && reachedLimit?.reachedMaxTenants}>
        <ExpiredPlanModal
          header={reachedLimit?.enterprisePlanName === "Enterprise Basic" ? "Upgrade Your Plan" : "You’ve Hit Your Limit!"}
          body={reachedLimit?.enterprisePlanName === "Enterprise Basic" ? "Kindly upgrade your plan now to unlock access to this feature." : "Upgrade your enterprise plan to add more tenants"}
          button={"Upgrade Plan"}
          buttonTwo={"close"}
          returnHome={goToplan}
          returnHomeTwo={() => setOpenPurchasePlanTenant(false)}
        />
      </CustomizedModal>
      <CustomizedModal isOpen={openPurchasePlan && !reachedLimit?.expiredPlan && reachedLimit?.reachedMaxEstates}>
        <ExpiredPlanModal
          header={reachedLimit?.enterprisePlanName === "Enterprise Basic" ? "Upgrade Your Plan" : "You’ve Hit Your Limit!"}
          body={reachedLimit?.enterprisePlanName === "Enterprise Basic" ? "Kindly upgrade your plan now to unlock access to this feature." : "Upgrade your enterprise plan to add up to 20 properties or more."}
          button={"Upgrade Plan"}
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
    </div>
  );
};

export default Estate;
