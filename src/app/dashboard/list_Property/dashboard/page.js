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

const Dashboard = () => {
  const [selectedOptions, setSelectedOption] = useState(null);
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [promoteOption, setPromotePropertry] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const [tabName, setTabName] = useState("");

  const MostViewedMobile = () => {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      autoplay: true,
      slidesToShow: 2.5,
      slidesToScroll: 1,
      speed: 2000,
      autoplaySpeed: 2000,
      // centerMode: true,
      centerPadding: "20px",
      className: "center",

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            centerPadding: "20px",
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: "10px",
          },
        },
      ],
    };

    return (
      <div className="sm:hidden block">
        <Slider
          {...settings}
          className="w-full rounded-[24px] space-x-3"
          aria-label="Featured Projects"
        >
          <PropertyCard
            Property={data}
            setTabName={setTabName}
            pageManagement={pageManagement}
            promoteOptions={promoteOption}
            setSelectedProperty={setSelectedOption}
            selectedProperty={selectedOptions}
            refreshData={refreshData}
            setOpenPlanModal={setOpenPlanModal}
            setPromotePropertry={setPromotePropertry}
            setErrorModal={setErrorModal}
            metric={true}
            partOfTheDashboard="mostViewed"
          />
        </Slider>
      </div>
    );
  };
  const MostViewed = () => {
    return (
      <div className="grid sm:grid-cols-2 sm:gap-48 gap-6">
        <MetricsCharts />
        <div className="sm:w-[374px] flex flex-col gap-2">
          <p className="">Most viewed properties</p>
          {mostViewedLoader ? (
            <LoadingII />
          ) : (
            <div className="sm:block hidden">
              <PropertyCard
                Property={mostViewedProperties}
                setTabName={setTabName}
                pageManagement={pageManagement}
                promoteOptions={promoteOption}
                setSelectedProperty={setSelectedOption}
                selectedProperty={selectedOptions}
                refreshData={refreshData}
                setOpenPlanModal={setOpenPlanModal}
                setPromotePropertry={setPromotePropertry}
                setErrorModal={setErrorModal}
                metric={true}
                partOfTheDashboard="mostViewed"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const OtherListedProperties = () => {
    return (
      <div className="flex flex-col border-1 sm:h-[404px] rounded-[8px] border-[#E6E6E6]  bg-white">
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
            Property={data}
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
  const { data, isLoading, refetch } = useQuery({
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
  const { data: mostViewedProperties, isLoading: mostViewedLoader } = useQuery({
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
    <div className="w-full max-w-[1440px] px-6 sm:px-0 sm:w-full mx-auto flex flex-col gap-5 ">
      <UpperMetrics />
      <MostViewed loading={isLoading} />
      <OtherListedProperties loading={isLoading} />
    </div>
  );
};
export default Dashboard;
