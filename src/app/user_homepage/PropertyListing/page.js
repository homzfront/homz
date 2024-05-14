"use client";
import React, { useEffect, useState } from "react";
import Bedroom from "../components/bedrooms";
import PropertyType from "../components/propertyType";
import MaxPrice from "../components/maxPrice";
import MinPrice from "../components/minPrice";
import Image from "next/image";
import Listing from "../components/listing";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import PropertyCard from "../components/propertyCard";
import api from "@/utils/api";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { useSearchParams } from "next/navigation";

const UserHomePage = () => {
  const urlParams = useSearchParams();
  const defaultPage = urlParams.get("page") ? parseInt(urlParams.get("page")) : 1;
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [property, setProperty] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingII, setLoadingII] = useState(true);
  const [paramss, setParams] = useState(false);
  const [filters, setFilters] = useState({
    search: urlParams.get("search") || null,
    propertyType: urlParams.get("propertyType") || null,
    listingType: urlParams.get("listingType") || null,
    minPrice: parseInt(urlParams.get("minPrice")) || null,
    maxPrice: parseInt(urlParams.get("maxPrice")) || null,
    numberOfBathrooms: parseInt(urlParams.get("numberOfBathrooms")) || null,
  });

  const [properties, setProperties] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        `/public/properties`)
      const propertyData = response?.data?.data?.results?.[0]?.data || null
      setProperties(propertyData);
    }
    fetchData()
  }, []);


  const fetchProperties = async () => {
    setLoading(true);
    const query = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        query[key] = filters[key];
      }
    });
    if (query && urlParams.get("page")) {
      const response = await api.get(
        `/public/properties?page=${urlParams.get("page")}&${new URLSearchParams(query).toString()}`
      );
      const data = response;
      if (data?.data?.data && data?.data?.message !== "No items found") {
        const propertyData = data?.data?.data?.results[0]?.data || null;
        setProperty(propertyData);
        setLoading(false);
        setParams(false);
        // setCurrentPage(urlParams.get("page"))
        const total = data.data.data.results[0]?.metadata[0]?.total || 0;
        setTotalPages(Math.ceil(total / 8));
        setTotalData(data.data.data.results[0]?.metadata[0]?.total)
      } else {
        setProperty(null);
        setTotalPages(0);
        setLoading(false);
        setLoadingII(false);
        setParams(false);
      }
    } else {
      const response = await api.get(
        `/public/properties?page=1&${new URLSearchParams(query).toString()}`
      );
      const data = response;
      if (data?.data?.data && data?.data?.message !== "No items found") {
        const propertyData = data?.data?.data?.results[0]?.data || null;
        setProperty(propertyData);
        setLoading(false);
        setParams(false);
        const total = data.data.data.results[0]?.metadata[0]?.total || 0;
        setTotalPages(Math.ceil(total / 8));
        setTotalData(data.data.data.results[0]?.metadata[0]?.total)
      } else {
        setProperty(null);
        setTotalPages(0);
        setLoading(false);
        setLoadingII(false);
        setParams(false);
      }
    }
  };

  useEffect(() => {
    if (paramss && (filters || currentPage)) {
      const query = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          query[key] = filters[key];
        }
      });
      window.history.pushState(
        null,
        "",
        `?page=${currentPage}&${new URLSearchParams(query).toString()}`
      );
      fetchProperties()
    } else {
      fetchProperties()
    }
  }, [filters, currentPage, urlParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    handleFilterChange("search", value);
    setParams(true)
  };

  const handleSearch = (query, label) => {
    handleFilterChange(label, query);
    setParams(true)
  };

  const reset = () => {
    setFilters({
      search: "",
      propertyType: null,
      listingType: null,
      minPrice: null,
      maxPrice: null,
      numberOfBathrooms: null,
      state: null,
    })
    setCurrentPage(1);
    setParams(true);
  };

  const firstThreePages = Array.from({ length: 3 }, (_, i) => i + 1);
  const lastThreePages = Array.from({ length: totalPages - 1 }, (_, i) => totalPages - i)
    .filter((page) => page > 1 && page < totalPages)
    .reverse();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setParams(true);
  };

  useEffect(() => {
    if (property) {
      setLoadingII(false);
    }
  }, [property]);

  const openMobileModal = () => {
    setMobileModalIsOpen(true);
  };

  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };

  return (
    <div className="max-w-[1440px] md:w-full mx-auto mt-10 md:mt-20 flex flex-col items-center gap-[2.8rem] mb-10">
      <div className="hidden md:flex justify-between items-center w-full px-[76px]">
        <div className="relative flex items-center w-[20%] h-[44px] py-[12px]  mr-1">
          <input
            type="text"
            id="searchState_Area"
            name="searchState_Area"
            className="w-full h-[45px] border pl-2 rounded-[6px]"
            placeholder="Search by state or area"
            value={filters.search}
            onChange={handleSearchChange}
          />
          <Image
            src="/static/images/search-normal.svg"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer right-[15px] absolute"
            onClick={() => {
              handleSearchChange
            }}
          />
        </div>
        <div className="flex gap-1 w-[80%]">
          <div>
            <Listing
              getState={handleSearch}
              className={"w-[150px]"}
              selectOption={`${filters?.listingType === null
                ? "Listing Type"
                : capitalizeFirstLetter(filters?.listingType)
                }`}
            />
          </div>
          <div>
            <PropertyType
              getPropertyType={handleSearch}
              className={"w-[180px]"}
              selectOption={`${filters?.propertyType === null
                ? "Property Type"
                : capitalizeFirstLetter(filters?.propertyType)
                }`}
            />
          </div>
          <div>
            <Bedroom
              getBedrooms={handleSearch}
              className={"w-[180px]"}
              selectOption={`${filters?.numberOfBathrooms === null
                ? "No of bedrooms"
                : `${filters?.numberOfBathrooms} Bedrooms`
                }`}
            />
          </div>
          <div>
            <MinPrice
              getPrice={handleSearch}
              className={"w-[160px]"}
              selectOption={`${filters?.minPrice === null
                ? "Min Price"
                : capitalizeFirstLetter(filters?.minPrice)
                }`}
            />
          </div>
          <div>
            <MaxPrice
              getPrice={handleSearch}
              className={"w-[160px]"}
              selectOption={`${filters?.maxPrice === null
                ? "Max Price"
                : capitalizeFirstLetter(filters?.maxPrice)
                }`}
            />
          </div>
          <button
            className="border border-BlueHomz items-center w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded cursor-pointer h-[44px]"
            onClick={reset}
          >
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            <span className="ml-1"> Reset</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between md:hidden w-full">
        <div className="searchPane relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
            placeholder="Search by state or area"
            value={filters.search}
            onChange={handleSearchChange}
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={16}
            width={16}
            onClick={() => {
              handleSearchChange
            }}
          />
        </div>
        <div className=" rounded-[4px] p-[11px] border hover:border-blue-600">
          <button onClick={openMobileModal}>
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      <div className="w-[337px] md:mt-3 md:w-full ">
        <PropertyCard
          Property={property}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNextPage}
          handlePageClick={handlePageClick}
          handlePrev={handlePrevPage}
          totalData={totalData}
          loading={loading}
          firstThreePages={firstThreePages}
          lastThreePages={lastThreePages}
          loadingII={loadingII}
          reset={reset}
          setLoadingII={setLoadingII}
          properties={properties}
        />
      </div>
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white border flex flex-col w-[350px] h-[320px]  py-[24px] px-5 rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Filter by
            </p>

            <div>
              <button onClick={closeMobileModal} className="cursor-pointer">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <PropertyType
                getPropertyType={handleSearch}
                className={"w-[150px]"}
                selectOption={`${filters?.propertyType === null
                  ? "Property Type"
                  : capitalizeFirstLetter(filters?.propertyType)
                  }`}
              />
            </div>
            <div>
              <Bedroom
                getBedrooms={handleSearch}
                className={"w-[150px]"}
                selectOption={`${filters?.numberOfBathrooms === null
                  ? "Number of bedrooms"
                  : `${filters?.numberOfBathrooms} Bedrooms`
                  }`}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <MinPrice
                getPrice={handleSearch}
                className={"w-[150px]"}
                selectOption={`${filters?.minPrice === null
                  ? "Min Price"
                  : capitalizeFirstLetter(filters?.minPrice)
                  }`}
              />
            </div>
            <div>
              <Listing
                getState={handleSearch}
                className={"w-[150px]"}
                selectOption={`${filters?.listingType === null
                  ? "Listing Type"
                  : capitalizeFirstLetter(filters?.listingType)
                  }`}
              />
            </div>
          </div>
          <button
            className="border w-[318px] h-[42px] p-[12px] border-BlueHomz bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-4"
            onClick={reset}
          >
            <span>
              <Image
                src={"/static/images/white_repeat.svg"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            <span className="text-[14px] leading-[17.64px]  text-[700] text-white">
              Reset
            </span>
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default UserHomePage;
