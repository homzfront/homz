"use client";

import React, { useState, useEffect, useTransition } from "react";
import UpperMetrics from "../components/metricsCards";
import MetricsCharts from "../components/MetricCharts";
import PropertyCard from "../components/propertyCard";
import Link from "next/link";
import LoadingII from "../components/loading";
import api from "@/utils/api";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [selectedOptions, setSelectedOption] = useState(null);
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [planModalMode, setPlanModalMode] = useState("inactive");
  const [promoteOption, setPromotePropertry] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoader] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [tabName, setTabName] = useState("");

  const { data, fetchData } = useProfileListingMe();
  const list = Array.isArray(data) ? data : data ? [data] : [];
  const [isBusinessInfoUpdate, setIsBusinessInfoUpdate] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      const isMissingBusinessInfo =
        !data.businessInfo?.businessPhoneNo ||
        !data.socialMediaLinks?.whatsappLink;

      setIsBusinessInfoUpdate(isMissingBusinessInfo);
    }
  }, [data]);
  const handleSelectPlan = async () => {
    try {
      startTransition(() => {
        router.push(
          planModalMode === "expired"
            ? `/subscriptionPlans?upgrade=true`
            : `/subscriptionPlans`
        );
      });
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
      return (
        error.response?.data || { message: "An unexpected error occurred." }
      );
    }
  };
  // const MostViewedMobile = ({ mostViewedProperties }) => {
  //   const slides = Array.from({ length: 2 });
  //   const settings = {
  //     dots: false,
  //     arrows: false,
  //     infinite: true,
  //     autoplay: true,
  //     speed: 500,
  //     autoplaySpeed: 2500,
  //     slidesToShow: 1.1,
  //     slidesToScroll: 1,
  //     centerMode: true,
  //     centerPadding: "0px",
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: { slidesToShow: 2.2 },
  //       },
  //       {
  //         breakpoint: 768,
  //         settings: { slidesToShow: 1.15 },
  //       },
  //     ],
  //   };

  //   return (
  //     <div className="">
  //       <Slider {...settings} className="w-full rounded-[24px] space-x-3">
  //         {slides.map((_, i) => (
  //           <div key={i}>
  //             <PropertyCard
  //               Property={mostViewedProperties}
  //               metric={true}
  //               partOfTheDashboard="mostViewed"
  //               setTabName={setTabName}
  //               pageManagement={pageManagement}
  //               promoteOptions={promoteOption}
  //               setSelectedProperty={setSelectedOption}
  //               selectedProperty={selectedOptions}
  //               refreshData={refreshData}
  //               setOpenPlanModal={setOpenPlanModal}
  //               setPromotePropertry={setPromotePropertry}
  //               setErrorModal={setErrorModal}
  //             />
  //           </div>
  //         ))}
  //       </Slider>
  //     </div>
  //   );
  // };

  const MostViewed = () => {
    return (
      <div
        className={`grid sm:grid-cols-2 sm:gap-40 gap-6 ${
          !otherProperties && "mb-10"
        }`}
      >
        <MetricsCharts dateJoined={data?.createdAt} />
        <div className="sm:w-[408px] flex flex-col gap-2">
          <p className="hidden sm:block">Most viewed properties</p>
          {mostViewedLoader ? (
            <LoadingII />
          ) : (
            <>
              <div
                className={`sm:flex hidden ${
                  mostViewedProperties &&
                  mostViewedProperties.length === 0 &&
                  "items-center justify-center bg-gray-50 rounded-xl shadow-inner"
                } h-full w-full min-h-[250px] `}
              >
                {mostViewedProperties && mostViewedProperties.length === 0 ? (
                  <div className="flex flex-col items-center text-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405M4 4l16 16M6 6l4 4m4 4l4 4M5 13l4-4m4 4l4-4"
                      />
                    </svg>
                    <p className="text-gray-600 text-xl font-semibold">
                      No views yet
                    </p>
                    <p className="text-sm text-gray-500">
                      Your property hasn't been visited yet. Promote it to gain
                      visibility!
                    </p>
                  </div>
                ) : (
                  <PropertyCard
                    Property={mostViewedProperties}
                    setTabName={setTabName}
                    pageManagement={pageManagement}
                    promoteOptions={promoteOption}
                    setSelectedProperty={setSelectedOption}
                    selectedProperty={selectedOptions}
                    refreshData={refetchMetricData}
                    setOpenPlanModal={setOpenPlanModal}
                    setPromotePropertry={setPromotePropertry}
                    setErrorModal={setErrorModal}
                    metric={true}
                    partOfTheDashboard="mostViewed"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const OtherListedProperties = () => {
    return (
      <div className="flex flex-col border-1 sm:h-[404px] rounded-[8px] border-[#E6E6E6]  bg-white ">
        <div className="flex items-center justify-between sm:pr-7">
          <p className="text-[14px] font-[400]">Listed properties</p>
          <p>
            <Link
              href="/dashboard/list_Property/properties"
              className="text-[14px] font-[400] text-[#006AFF]"
            >
              View all
            </Link>
          </p>
        </div>
        {isLoading ? (
          <LoadingII />
        ) : (
          <PropertyCard
            Property={otherProperties}
            setTabName={setTabName}
            pageManagement={pageManagement}
            promoteOptions={promoteOption}
            setSelectedProperty={setSelectedOption}
            selectedProperty={selectedOptions}
            refreshData={refreshData}
            setOpenPlanModal={setOpenPlanModal}
            setPromotePropertry={setPromotePropertry}
            setErrorModal={setErrorModal}
            metric={false}
            partOfTheDashboard="viewAll"
          />
        )}
      </div>
    );
  };

  // Fetch other properties
  const {
    data: otherProperties,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      return await api.get(`/properties/user/me?page=1`);
    },
    placeholderData: keepPreviousData,
    select: (properties) => {
      return properties.data.data.results[0]?.data;
    },
    // enabled: true,
  });

  // Fetch most visited properties
  const {
    data: mostViewedProperties,
    isLoading: mostViewedLoader,
    refetch: refetchMetricData,
  } = useQuery({
    queryKey: ["mostViewed"],
    queryFn: async () => {
      return await api.get(`/properties/property/top-visited`);
    },
    placeholderData: keepPreviousData,
    select: (mostViewed) => {
      return mostViewed.data.data;
    },
  });

  const pageManagement = (page) => refetch();
  const refreshData = () => refetch();

  // const filterData = async (page = 1) => {
  //   setLoading(true);
  //   try {
  //     const response = await api.get(`/properties/user/me?page=${page}`);
  //     setFilteredData(response?.data?.data?.results[0]?.data || []);
  //     return response?.data;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setFilteredData([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   filterData();
  // }, []);

  return (
    <div className="w-full max-w-[1440px] px-6 sm:px-0 sm:w-full flex items-center justify-center mx-auto">
      {isLoading ? (
        <LoadingII />
      ) : (
        <div className="w-full mx-auto flex flex-col gap-5 ">
          <UpperMetrics isBusinessInfoUpdate={isBusinessInfoUpdate} />
          <MostViewed loading={isLoading} />
          {/* <MostViewedMobile mostViewedProperties={mostViewedProperties || []} /> */}
          {otherProperties && <OtherListedProperties loading={isLoading} />}
        </div>
      )}

      <ConfirmationModal
        isOpen={openPlanModal}
        title={planModalMode === "expired" ? "Renew or upgrade your plan" : "No Active Plan"}
        confirmatoryText={
          planModalMode === "expired"
            ? "Your subscription has expired. Renew your current plan or upgrade to another option so your dashboard features stay active."
            : "You do not have an active subscription plan yet"
        }
        handleEvent={handleSelectPlan}
        cancel={() => {
          setLoader(false);
          setOpenPlanModal(false);
        }}
        optionText={planModalMode === "expired" ? "Renew / Upgrade Plan" : "Proceed to subscribe?"}
        optionText2="Cancel"
        isLoading={loading}
        // color="text-[#D92D20]"
      />
    </div>
  );
};
export default Dashboard;
