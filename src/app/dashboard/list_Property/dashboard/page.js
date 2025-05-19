"use client";

import React, { useState, useEffect } from "react";
import UpperMetrics from "../components/metricsCards";
import MetricsCharts from "../components/MetricCharts";
import PropertyCard from "../components/propertyCard";
import Link from "next/link";
import LoadingII from "../components/loading";
import api from "@/utils/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";

const Dashboard = () => {
  const [selectedOptions, setSelectedOption] = useState(null);
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [promoteOption, setPromotePropertry] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const [tabName, setTabName] = useState("");

  const { data, fetchData } = useProfileListingMe();
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

  // const MostViewedMobile = () => {
  //   const settings = {
  //     dots: false,
  //     arrows: true,
  //     infinite: true,
  //     autoplay: true,
  //     slidesToShow: 2.5,
  //     slidesToScroll: 1,
  //     speed: 2000,
  //     autoplaySpeed: 2000,
  //     // centerMode: true,
  //     centerPadding: "20px",
  //     className: "center",
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 2,
  //           centerPadding: "20px",
  //         },
  //       },
  //       {
  //         breakpoint: 768,
  //         settings: {
  //           slidesToShow: 1,
  //           centerPadding: "10px",
  //         },
  //       },
  //     ],
  //   };

  //   return (
  //     <div className="sm:hidden block">
  //       <Slider
  //         {...settings}
  //         className="w-full rounded-[24px] space-x-3"
  //         aria-label="Featured Projects"
  //       >
  //         <PropertyCard
  //           Property={data}
  //           setTabName={setTabName}
  //           pageManagement={pageManagement}
  //           promoteOptions={promoteOption}
  //           setSelectedProperty={setSelectedOption}
  //           selectedProperty={selectedOptions}
  //           refreshData={refreshData}
  //           setOpenPlanModal={setOpenPlanModal}
  //           setPromotePropertry={setPromotePropertry}
  //           setErrorModal={setErrorModal}
  //           metric={true}
  //           partOfTheDashboard="mostViewed"
  //         />
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
        <MetricsCharts />
        <div className="sm:w-[408px] flex flex-col gap-2">
          <p className="">Most viewed properties</p>
          {mostViewedLoader ? (
            <LoadingII />
          ) : (
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
          {otherProperties && <OtherListedProperties loading={isLoading} />}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
