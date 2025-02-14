"use client";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import Property from "./listedProperty";
import PromotionHooks from "@/utils/promoteProperty";
// import usePropertyStore from "@/store/propertyForMeStore";
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
// import { propertyForMe } from "@/api/propertyService";
import api from "@/utils/api";
import VideoModal from "@/components/general/videoModal";

const List_Property = () => {
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false));
  const { data: profile, fetchData: fetchProfile } = useProfileListingMe();
  const [options, setOptions] = useState(false);
  const [paymentSuccessfulModal, setPaymentSuccessfulModal] = useState(false);
  const [openPromoModal, setOpenPromoModal] = useState(false);
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [selectedProperty, setSelectedProperties] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [loadingSecondPromo, setLoaderSecondPromo] = useState(false);
  const [statusName, setTabName] = useState(null);
  const [isLoading2, setLoader2] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [promoteProperty, setPromotePropertry] = useState(false);
  const [promotePropertySuccess, setPromotePropertrySuccess] = useState(false);
  const router = useRouter();
  const [errorModal, setErrorModal] = useState(false);
  const [loader, setLoading] = useState(true);
  const videoUrl = "https://youtube.com/shorts/RDNSb6OAEko?feature=share"
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
  var id = localStorage.getItem("prp_tygf2ty");
  var plan = localStorage.getItem("prp_xry_pl#a$n");
  const initialDataStatus = sessionStorage.getItem("initialDataStatus");
  const handlePageNumber = (pageNumber, status) => {
    filterData(pageNumber, status);
  };

  // Function to refresh data based on status and page number
  const refreshData = async (stat) => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageNumber = urlParams.get("page");
    const res = await filterData(pageNumber, stat);
    if (stat === "all" && res?.data?.totalCount === 0) {
      sessionStorage.setItem("initialDataStatus", false); // Set to false if no data
    }
  };
  // console.log(typeof initialDataStatus);

  // Function to filter the property data based on the query parameters
  const filterData = async (page, params) => {
    try {
      let query = `/properties/user/me?page=${page || 1}`;

      if (params === "published") {
        query += `&is_published=true`;
      } else if (params === "promoted") {
        query += `&is_promoted=true`;
      } else if (params === "unpublished") {
        query += `&is_unpublished=true`;
      }
      const results = await api.get(query);
      setProData(results?.data);
      return results?.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setProData([]);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };
  const getParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    const propertyStatus = urlParams.get("propertystatus");
    return {
      page: page ? parseInt(page) : 1,
      propertyStatus: propertyStatus ? propertyStatus : "all",
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = getParams();
        // Fetch profile
        await fetchProfile();
        // Fetch filtered data
        const result = await filterData(params.page, params.propertyStatus);
        // If data is returned, set session storage
        if (result?.data?.totalCount > 0 && typeof window !== "undefined") {
          sessionStorage.setItem("initialDataStatus", true);
        } else {
          sessionStorage.setItem("initialDataStatus", false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
    const params = getParams();
    refreshData(params.propertyStatus);
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
  // console.log(proStatus);

  const handleSelectPlan = async () => {
    try {
      startTransition(() => {
        router.push(`/subscriptionPlans`);
      });
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
      // console.log(response)
      const { status, subscription_code } = response?.data?.data || {};
      const errorMessage = response?.message;

      if (subscription_code) {
        // console.log("Subscription is active");
        setLoader2(false);

        if (selectedProperty.length > 0) {
          setPropertyIds(selectedProperty);
          setPromotePropertry(true);
        } else {
          setOptions(true);
        }
      } else if (errorMessage === "An unexpected error occurred.") {
        setLoader2(false);
        setErrorModal(true);
      } else if (!status) {
        setLoader2(false);
        setOpenPlanModal(true);
      }
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
      setLoader2(false);
      setErrorModal(true);
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

      if (results?.status) {
        setPromotePropertrySuccess(true);
        router.prefetch("/dashboard/list_Property");
        status = true;
      } else if (
        results?.message ===
        "You have reached the limit of the listings for your current plan."
      ) {
        setLimitModal(true);
      } else if (results.message === "Network Error") {
        setErrorModal(true);
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

  // console.log(statusName);
  return (
    <div className="dashboard w-full max-w-[1440px] px-6 sm:px-0 sm:w-full mx-auto">
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
      {loader ? (
        <div className="h-screen flex justify-center items-center">
          <LoadingII />
        </div>
      ) : initialDataStatus === "false" ? (
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
              <VideoModal videoUrl={videoUrl} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={` ${property?.data?.totalCount === 0 ? "hidden" : ""
              } flex w-full sm:items-center sm:gap- mt-[-15px] md:mt-0 mb-6 pt-2 md:mb-0`}
          >
            <div className=" sm:ml- border-b-[1px] flex gap- items-center sm:mb-4 justify-between w-full py-[16px] sm:px-4">
              <p>
                <span className="sm:font-[500] text-[16px] leading-[20.16px] font-[400] sm:leading-[30px] md:text-[20px]">
                  Listed Properties
                </span>

                <span className="text-[#006AFF] md:text-[18px] bg-[#EEF5FF] px-[8px] h-[28px] md:h-[35px] py-[4px] rounded-[8px] ml-2">
                  {property?.data?.totalCount || 0}
                </span>
              </p>
              <div className="flex items-start gap-[12px] ">
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
                <div className="">
                  <div className="flex items-center md:items-start gap-2">
                    {property?.data?.totalCount > 1 && (
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
                    )}
                    {property?.data?.totalCount > 0 &&
                      (profile?.businessInfo?.isVerified === "unverified" ||
                        profile?.businessInfo?.isVerified === "pending" ||
                        profile?.businessInfo?.isVerified === "rejected") ? (
                      <div>
                        <div
                          onClick={() => setOpenModalForBusi(true)}
                          className="w-full cursor-pointer flex gap-1 sm:w-[166px] sm:h-[42px] sm:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white sm:bg-[#006AFF]"
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
                        <div className="md:block hidden mt-1">
                          <VideoModal videoUrl={videoUrl} />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Link
                          href="/dashboard/list_Property/addProperty"
                          className="md:mb-1 w-fit flex gap-1 md:w-[166px] sm:h-[37px] md:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#006AFF] flex-shrink-0 "
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
                        <div className="md:block hidden">
                          <VideoModal videoUrl={videoUrl} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                  className="md:hidden rounded-[8px] flex h-full justify-center items-center ml-0.5"
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
            <div className="md:hidden mt-2 ml-1">
              <VideoModal videoUrl={videoUrl} />
            </div>
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
            setStatusName={setTabName}
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
        title="Error Occurred"
        successText="Operation failed. Please try again later."
        error={true}
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
