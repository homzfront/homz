"use client";
import React, { useEffect, useState } from "react";
import Bedroom from "../components/bedrooms";
import Price from "../components/prices";
import PropertyType from "../components/propertyType";
import SqrFeet from "../components/squareFeet";
import MaxPrice from "../components/maxPrice";
import MinPrice from "../components/minPrice";
import Image from "next/image";
import Listing from "../components/listing";
import CustomizedModal from "../components/CustomizedModal";
import PropertyCard from "../components/propertyCard";
import api from "@/utils/api";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const UserHomePage = () => {
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [property, setProperty] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingII, setLoadingII] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paramss, setParams] = useState(false);
  const [filters, setFilters] = useState({
    search: null,
    propertyType: null,
    listingType: null,
    minPrice: null,
    maxPrice: null,
    numberOfBathrooms: null,
    state: null,
  });
  const [properties, setProperties] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        `/public/properties`)
      const propertyData = response?.data?.data?.results[0]?.data || null
      setProperties(propertyData);
      console.log(response)
    }
    fetchData()
  }, []);

  let urlParams;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryString = window.location.search;
      urlParams = new URLSearchParams(queryString);
      const page = urlParams.get("page") || 1;
      const search = urlParams.get("search") || null;
      const propertyType = urlParams.get("propertyType") || null;
      const listingType = urlParams.get("listingType") || null;
      const minPrice = parseInt(urlParams.get("minPrice")) || null;
      const maxPrice = parseInt(urlParams.get("maxPrice")) || null;
      const numberOfBathrooms = parseInt(urlParams.get("numberOfBathrooms")) || null;
      const state = urlParams.get("state") || null;
      setCurrentPage(page);
      setFilters({
        search,
        propertyType,
        listingType,
        minPrice,
        maxPrice,
        numberOfBathrooms,
        state,
      });
    }
  }, []);

  console.log(paramss)
  console.log(filters);

  const fetchProperties = async () => {
    setLoading(true);
    console.log(filters)
    const query = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        query[key] = filters[key];
      }
    });
    console.log(query)
    if (query) {
      const response = await api.get(
        // console.log(query)
        `/public/properties?page=${currentPage}&${new URLSearchParams(query).toString()}`
      );
      const data = response;
      console.log(data);
      if (data?.data?.data && data?.data?.message !== "No items found") {
        const propertyData = data?.data?.data?.results[0]?.data || null;
        if (propertyData) {
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
          setParams(false);
        }
      } else {
        setProperty(null);
        setTotalPages(0);
        setLoading(false);
        setParams(false);
      }
    }
  };

  console.log(totalData);
  console.log(totalPages);
  console.log(property)
  console.log(currentPage);
  console.log(paramss);

  useEffect(() => {
    if (paramss && (filters || currentPage)) {
      const query = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          query[key] = filters[key];
        }
      });
      console.log(query)
      window.history.pushState(
        null,
        "",
        `?page=${currentPage}&${new URLSearchParams(query).toString()}`
      );
      fetchProperties()
    } else {
      fetchProperties()
    }
  }, [filters], [currentPage]); // Listen to changes in currentPage and filters

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    handleFilterChange("search", value);
    setParams(true)
  };

  const handleSearch = (query, label) => {
    console.log(query)
    console.log(label)
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
    <div className="max-w-[1440px] md:w-full mx-auto px-6 mt-10 md:mt-20 flex flex-col items-center  gap-[2.8rem] mb-10">
      <div className="hidden  md:flex justify-between">
        <div className="relative flex items-center w-[262px] h-[44px] proBorders rounded-[4px] py-[12px]  mr-1">
          <input
            type="text"
            id="searchState_Area"
            name="searchState_Area"
            className="w-full h-[42px] border pl-2 rounded-[4px]"
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
          // onClick={() => {
          //   handleSearchChange
          // }}
          />
        </div>
        <div>
          <Listing
            getState={handleSearch}
            selectOption={`${filters?.listingType === null
              ? "Listing Type"
              : capitalizeFirstLetter(filters?.listingType)
              }`}
          />
        </div>
        <div>
          <PropertyType
            getPropertyType={handleSearch}
            className={"w-[200px]"}
            selectOption={`${filters?.propertyType === null
              ? "Property Type"
              : capitalizeFirstLetter(filters?.propertyType)
              }`}
          />
        </div>
        <div>
          <Bedroom
            getBedrooms={handleSearch}
            className={"w-[142px]"}
            selectOption={`${filters?.numberOfBathrooms === null
              ? "Number of bedrooms"
              : `${filters?.numberOfBathrooms} Bedrooms`
              }`}
          />
        </div>
        <div>
          <MinPrice
            getPrice={handleSearch}
            selectOption={`${filters?.minPrice === null
              ? "Min Price"
              : capitalizeFirstLetter(filters?.minPrice)
              }`}
          />
        </div>
        <div>
          <MaxPrice
            getPrice={handleSearch}
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
      <div className="flex justify-between  md:hidden w-full">
        <div className="searchPane relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
            placeholder="Search by state or area "
          // onChange= {e=>{setSearchValue(e.target.value)}}
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={16}
            width={16}
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
