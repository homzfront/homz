"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EstateForm from "./estateForm/estateForm";
import ListedEstates from "./listedEstates";
import useBodyScroll from "@/utils/useBodyScroll";
import LoadingII from "@/components/mainmenu/loadingII";
import estateStore from "@/store/enterpriseStore/estates";
import formatDateII from "@/utils/formatDateII";
import useClickOutside from "@/utils/clickOutside";
import useTabForAddProperty from "@/store/document/useTabForAddProperty";
import { useRouter } from "next/navigation";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import ExpiredPlanModal from "../components/expiredPlanModal";
import useEnterprisePlans from "@/store/enterpriseStore/enterprisePlans";
import { checkPlanLimits } from "@/utils/checkPlanLimits";
import { isTrialExpired } from "@/utils/compareTrialTime";

const Estate = () => {
  const { tab, setTab } = useTabForAddProperty();
  const { data, loading, fetchData } = estateStore();
  const { data: user, fetchData: fetchProfileData, loadingProfile } = useProfileEnterpriseMe();
  const { data: enterprisePlans, fetchData: fetchEnterprisePlans } = useEnterprisePlans();
  const [reachedLimit, setReachedLimit] = useState(null)
  const router = useRouter();
  const estates = data;
  const [openPurchasePlan, setOpenPurchasePlan] = useState(false);
  const [openPurchasePlanTenant, setOpenPurchasePlanTenant] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationForm, setRegistrationForm] = useState(tab === 'addProperty');
  const [inviteTenant, setInviteTenant] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const dropdownRef = useClickOutside(() => setInviteTenant(false));
  const [searchQuery, setSearchQuery] = useState(null);
  const [filterModal, setFilterModal] = useState(false);

  // useEffect to handle scrolling
  useBodyScroll([inviteTenant, loading]);

  useEffect(() => {
    fetchData();
    fetchProfileData()
    fetchEnterprisePlans();
  }, []);

  useEffect(() => {
    const values = checkPlanLimits(enterprisePlans, user?.planName, data?.length, user?.propertyOwners?.length, user?.tenants?.length)
    setReachedLimit(values)
  }, [enterprisePlans, user, data])

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
    const matchesSearchQuery = !searchQuery || data?.name.toLowerCase().includes(searchQuery.toLowerCase());
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
    setRegistrationForm(true);
  };

  const returnToStartRegistration = () => {
    setTab(null)
    setRegistrationForm(false);
  };

  const addNewEstate = () => {
    if (reachedLimit?.reachedMaxEstates) {
      setOpenPurchasePlan(!openPurchasePlan)
    }
    else if (reachedLimit?.reachedMaxTenants) {
      setOpenPurchasePlan(!openPurchasePlan)
    }
    else if (isTrialExpired(user?.trialEndDate)) {
      setOpenPurchasePlan(!openPurchasePlan)
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
    router.push("/plans")
  }

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
        <EstateForm returnToStartRegistration={returnToStartRegistration} fetchData={fetchData} />
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
          </div>
        </div>
      )}
      {
        openPurchasePlan && isTrialExpired(user?.trialEndDate) &&
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <ExpiredPlanModal
            header={"Your Trial Has Ended"}
            body={"Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."}
            button={"Buy Plan"}
            buttonTwo={"close"}
            returnHome={goToplan}
            returnHomeTwo={() => setOpenPurchasePlan(false)}
          />
        </div>
      }
      {
        openPurchasePlanTenant && (reachedLimit?.reachedMaxTenants && (
          <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <ExpiredPlanModal
              header={"Tenant Limit Reached"}
              body={"Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."}
              button={"Upgrade Plan"}
              buttonTwo={"close"}
              returnHome={goToplan}
              returnHomeTwo={() => setOpenPurchasePlanTenant(false)}
            />
          </div>
        ))
      }
      {
        openPurchasePlan &&
        (
          reachedLimit?.reachedMaxEstates && (
            <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <ExpiredPlanModal
                header={"Property Limit Exceeded"}
                body={"Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."}
                button={"Upgrade Plan"}
                buttonTwo={"close"}
                returnHome={goToplan}
                returnHomeTwo={() => setOpenPurchasePlan(false)}
              />
            </div>
          )
        )
      }
    </div>
  );
};

export default Estate;
