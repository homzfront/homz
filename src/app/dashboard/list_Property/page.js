"use client";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Property from "./listedProperty";
import PromotionHooks from "@/utils/promoteProperty";
import usePropertyStore from "@/store/propertyForMeStore";
import usePropertyPromotionsData from "@/store/propertyPromotions";
import LoadingII from "./components/loading";
import useClickOutside from "@/utils/clickOutside";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import BusinessAlert from "@/components/icons/businessAlert";
import { useRouter } from "next/navigation";
import ThreeDotsLoader from "@/components/mainmenu/ThreeDotsLoader";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import Confirm from "@/components/mainmenu/actionModal";
import { propertyForMe } from "@/api/propertyService";

const List_Property = () => {
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false)); // Use the custom hook
  const { data: profile, fetchData: fetchProfile } = useProfileListingMe();
  const [options, setOptions] = useState(false);
  const [paymentSuccessfulModal, setPaymentSuccessfulModal] = useState(false);
  const [openPromoModal, setOpenPromoModal] = useState(false);
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [selectedProperty, setSelectedProperties] = useState([]);
  const [proStatus, setProStatus] = useState("");
  const [isLoading, setLoader] = useState(false);
  const [loadingSecondPromo, setLoaderSecondPromo] = useState(false);
  // const [loadingUpgradePromo, setLoaderUpgradePromo] = useState(false);
  const [isLoading2, setLoader2] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [promoteProperty, setPromotePropertry] = useState(false);
  const [promotePropertySuccess, setPromotePropertrySuccess] = useState(false);
  const router = useRouter();
  const [errorModal, setErrorModal] = useState(false);
  const setPropertyIds = usePropertyPromotionsData(
    (state) => state.setPropertyIds
  );
  const [property, setProData] = useState([]);
  const singlePropertyId = usePropertyPromotionsData((state) => state.singleId);
  const propertyPlan = usePropertyPromotionsData(
    (state) => state.propertyPlanType
  );
  const setPropertyPlanType = usePropertyPromotionsData(
    (state) => state.setPropertyPlanType
  );
  const [openLimitModal, setLimitModal] = useState(false);
  // const [subsciptionStatus, setSubsciptionStatus] = useState([]);
  // console.log(id, type);
  // console.log(singlePropertyId);
  var id = localStorage.getItem("prp_tygf2ty");
  var plan = localStorage.getItem("prp_xry_pl#a$n");
  const handlePageNumber = (pageNumber, status) => {
    filterData(pageNumber, status);
  };

  const refreshData = (stat) => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageNumber = urlParams.get("page");
    const status = urlParams.get("propertystatus");
    const filterParams = filterQueryParams(stat ? stat : status);
    filterData(pageNumber, filterParams);
  };

  // filter the property data based on the query of the params
  const filterData = async (page, params = {}) => {
    const { is_published, is_promoted, is_unpublished } = params;
    try {
      const results = await propertyForMe(page, {
        is_published,
        is_promoted,
        is_unpublished,
      });
      const properties = results?.data?.results?.[0]?.data;
      // console.log(results);
      setProData(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("propertystatus");
    setProStatus(status);
    fetchProfile();
    refreshData();
  }, [fetchProfile, proStatus]);
  // const { propertyListedAll, loading, fetchData } = usePropertyStore();
  // useEffect(() => {
  //   fetchData(page);
  //   fetchProfile();
  // }, [fetchData, fetchProfile, page]);

  // useEffect(() => {
  //   if (propertyListedAll) {
  //     setProData(propertyListedAll || []);
  //   }
  // }, [propertyListedAll]);
  const filterQueryParams = (status) => {
    const filterParams = {
      is_published: status === "published" ? true : undefined,
      is_promoted: status === "promoted" ? true : undefined,
      is_unpublished: status === "unpublished" ? true : undefined,
    };
    return filterParams;
  };

  // // check for subsciption plan Status
  // useEffect(() => {
  //   async function getSubscription() {
  //     const response = await PromotionHooks.checkCurrentSubscription();
  //     return response;
  //   }
  //   let status = getSubscription();
  //   setSubsciptionStatus([...subsciptionStatus, status]);
  // }, [subsciptionStatus]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");

    if (status === "success" && plan === "single") {
      setPaymentSuccessfulModal(true);
      router.prefetch("/dashboard/list_Property");
    }
  }, [router, plan]);

  useEffect(() => {
    if (isPending) {
      return setLoader(true);
    }
    setLoader(false);
    setOpenPlanModal(false);
    setLimitModal(false);
  }, [isPending]);

  const closePromotionModal = () => {
    refreshData();
    setPromotePropertrySuccess(false);
    handleCancel();
    setPropertyPlanType("");
    router.push("/dashboard/list_Property");
  };

  const handleOpenModal = () => {
    setOpenModalForBusi(true);
  };
  const handleCancel = () => {
    setPropertyIds([]);
    setSelectedProperties([]);
    setOptions(false);
    setPropertyPlanType("");
  };

  const handleSelectPlan = async () => {
    try {
      const response = await PromotionHooks.checkCurrentSubscription();
      if (response.data === null) {
        startTransition(() => {
          router.push(`/subscriptionPlans`);
        });
      }
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
      return (
        error.response?.data || { message: "An unexpected error occurred." }
      );
    }
  };
  const handlePromoteOptions = async () => {
    setLoader2(true);
    setPropertyPlanType("");
    try {
      const response = await PromotionHooks.checkCurrentSubscription();
      console.log(response.data);

      // ;
      if (response?.data?.status === "active") {
        setLoader2(false);
        if (selectedProperty.length > 0) {
          // setLoader(true);
          setPropertyIds(selectedProperty);
          setPromotePropertry(true);
        } else {
          setOptions(true);
        }
      } else if (response.message == "An unexpected error occurred.") {
        setLoader2(false);
        setErrorModal(true);
      } else if (response?.data?.status === "inactive") {
        setLoader2(false);
        setOpenPlanModal(true);
      }
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
      return (
        error.response?.data || { message: "An unexpected error occurred." }
      );
    }
  };

  const handlePropertyPromotion = async () => {
    setLoader(true);
    var status = false;

    const propertyId = singlePropertyId || id;
    const promotionPlan = propertyPlan || plan;
    const promotionDate = "2024-04-10";

    try {
      const results = await PromotionHooks.promoteProperty(
        promotionDate,
        propertyId,
        promotionPlan,
        selectedProperty
      );
      // console.log(results);
      setLoader(false);

      if (results.status) {
        setPromotePropertrySuccess(true);
        router.prefetch("/dashboard/list_Property");
        status = true;
      } else if (results.message) {
        setLimitModal(true);
      }
      setPromotePropertry(false);
    } catch (error) {
      console.error("Error promoting the property:", error);
      setLoader(false);
      status = false;
    }
    return status;
  };

  const toggleModal = () => {
    setOpenPromoModal(false);
  };
  const handleClick = async () => {
    // Prefetch the page right before navigation
    await router.prefetch("/dashboard/list_Property");
    setPaymentSuccessfulModal(false);
    router.push("/dashboard/list_Property");
    localStorage.removeItem("prp_tygf2ty");
    localStorage.removeItem("prp_xry_pl#a$n");
  };

  const handleSecondPromo = async () => {
    setLoaderSecondPromo(true);
    try {
      let res = await handlePropertyPromotion();
      if (res) {
        setLoaderSecondPromo(false);
        handleClick();
      }
      setLoaderSecondPromo(false);
    } catch (error) {
      console.error(error);
      setLoaderSecondPromo(false);
    }
  };
  const handleUpgradePlan = () => {
    // setLoaderUpgradePromo(true);
    startTransition(() => {
      router.push(`/subscriptionPlans?upgrade=true`);
    });
  };
  // console.log("global value", loading);

  // console.log(property?.msg);
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

      {!property ? (
        <div className="h-screen flex justify-center items-center">
          <LoadingII />
        </div>
      ) : property?.msg !== "Success" && !proStatus ? (
        <>
          <p className="md:hidden font-[400] leading-[17.64px] text-[#A9A9A9] text-[14px] mt-0 w-fit m-auto">
            List your properties so Tenants can see them.
          </p>
          <div className="flex flex-col items-center justify-center pt-[8rem] md:pt-0">
            <div className="flex flex-col items-center justify-center md:h-[412px] gap-[20px]">
              <Image
                src="/static/images/PropertyLister.svg"
                alt=""
                height={121}
                width={121}
                className="rounded-[8px] mx-auto"
              />
              <p className="text-[23px] md:text-[36px] font-[700] leading-[28.98px] md:leading-[45px] text-[#006AFF]">
                Get Started
              </p>
              <p className="hidden md:block text-[#4E4E4E] leading-[27px] w-full text-center">
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
                />
                <span>List Properties</span>
              </Link>
            </div>
          </div>
        </>
      ) : (
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
                  {property?.data?.totalCount || 0}
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
                  className="w-fit flex gap-1  sm:h-[37px] sm:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#DC6803] flex-shrink-0 sm:w-[180px]"
                >
                  {!isLoading2 ? (
                    <>
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
                    </>
                  ) : (
                    <ThreeDotsLoader color="#ffffff" />
                  )}
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

          <Property
            property={property}
            promoteOption={options}
            openPromoModal={openPromoModal}
            setSelectedOption={setSelectedProperties}
            selectedOptions={selectedProperty}
            closePromoModal={toggleModal}
            cancelSelectedOption={handleCancel}
            handlePageNumber={handlePageNumber}
            refreshData={refreshData}
            setOpenPlanModal={setOpenPlanModal}
            filterData={filterData}
            setPromotePropertry={setPromotePropertry}
            setErrorModal={setErrorModal}
          />
        </>
      )}

      <ConfirmationModal
        isOpen={openPlanModal}
        title="No Active Plan"
        confirmatoryText={`You do not have an active subscription plan yet`}
        handleEvent={handleSelectPlan}
        cancel={() => {
          setLoader(false);
          setOpenPlanModal(false);
        }}
        optionText="Proceed to subscribe?"
        optionText2="Cancel"
        isLoading={isLoading}
        // color="text-[#D92D20]"
      />
      {/* promotion property */}
      <ConfirmationModal
        isOpen={promoteProperty}
        title="Promote Property?"
        confirmatoryText="You are about to promote this property on Homz"
        handleEvent={handlePropertyPromotion}
        cancel={() => {
          setLoader(false);
          setPromotePropertry(false);
        }}
        optionText="Proceed"
        optionText2="Cancel"
        isLoading={isLoading}
        // color="text-[#D92D20]"
      />

      <SuccessModal
        isOpen={promotePropertySuccess}
        title="Promotion is Active"
        handleEvent={closePromotionModal}
        successText="Your promotion is currently running for this property"
        // optionalText="View listed properties"
      />
      <SuccessModal
        isOpen={errorModal}
        title="Oops! An error has Occurred"
        error={true}
        successText="Unable to promote right now. Please try again later!"
        handleEvent={() => setErrorModal(false)}
      />

      <Confirm
        title=" Your payment was successful!"
        description=" Would you like to activate the promotion on the selected property
            now?"
        action1={handleSecondPromo}
        action2={handleClick}
        isOpen={paymentSuccessfulModal}
        loader={loadingSecondPromo}
        action1Title="Promote"
      />
      <Confirm
        title=" Promotion Limit exceeded!"
        description="You have exceeded the promotion limit for your plan, Would you like to upgrade your plan?"
        action1={handleUpgradePlan}
        action2={() => setLimitModal(false)}
        isOpen={openLimitModal}
        loader={isLoading}
        action1Title="Proceed"
      />
      {/* <Confirm isOpen={paymentSuccessfulModal}>
        <div className="bg-white border w-[333px] flex flex-col sm:w-[464px] py-[24px] px-[16px] sm:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <p className="text-[14px] leading-[19.5px] sm:text-[20px] font-[700] sm:leading-[25.2px] text-center">
            Your payment was successful!
          </p>
          <p className=" leading-[19.5px] text-[13px] md:text-[16px] font-[400] md:leading-[24px] text-center">
            Would you like to activate the promotion on the selected property
            now?
          </p>
          <div className="flex gap-[8px] items-center w-full">
            <button
              className="bg-BlueHomz2  flex items-center justify-center  text-white rounded-[4px] w-[196px] h-[48px] p-[12px] "
              onClick={handleSecondPromo}
            >
              {!loadingSecondPromo ? (
                <span>Promote</span>
              ) : (
                <ThreeDotsLoader color="#ffffff" />
              )}
            </button>
            <button
              className="border-BlueHomz text-blue-600 rounded-[4px] border h-[48px] p-[12px] w-[196px]"
              onClick={handleClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </Confirm> */}
    </div>
  );
};

export default List_Property;
