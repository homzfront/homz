"use client";
import React, { useEffect, useState } from "react";
import Bedroom from "./components/bedrooms";
import MaxPrice from "./components/maxPrice";
import MinPrice from "./components/minPrice";
import PropertyType from "./components/propertyType";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "flowbite-react";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import addCommasToNumberWithoutN from "@/utils/addCommasToNumberWithoutN";
import api from "@/utils/api";
import lowerCaseData from "@/utils/lowerCaseData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const customTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "hidden md:inline-block absolute top-[7rem] left-2 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none transition-opacity duration-300",
    rightControl:
      "hidden md:inline-block absolute top-[7rem] right-11 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none transition-opacity duration-300",
    "&:hover $leftControl, &:hover $rightControl": {
      display: "inline-block",
    },
  },
  indicators: {
    active: {
      off: "hidden bg-[#EEF5FF] hover:bg-white dark:bg-blue-600/50 dark:hover:bg-gray-800",
      on: "hidden bg-blue-600 dark:bg-gray-800",
    },
    base: "h-[10.78px] w-[10.78px] md:h-3 md:w-3 rounded-full hidden",
    wrapper:
      "absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 hidden space-x-1 md:space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "hidden md:inline-flex h-[30px] w-[30px] items-center bg-[#292D32] justify-center rounded-full bg-opacity-10 hover:bg-opacity-100  group-focus:outline-none group-focus:ring-4 group-focus:ring-white/30 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-3 w-3 text-white/60 dark:text-gray-800 group-hover:text-white sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};



const HomePage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [landlord, setLandlords] = useState(true);
  const [manager, setManagers] = useState(false);
  const [tenant, setTenants] = useState(false);
  const [rent, setRent] = useState(true);
  const [sale, setSale] = useState(false);
  const [shortlist, setShortlist] = useState(false);
  const [land, setLand] = useState(false);
  const [featuredData, setFeaturedData] = useState(null);
  const [filters, setFilters] = useState({
    search: null,
    propertyType: null,
    minPrice: null,
    maxPrice: null,
    numberOfBathrooms: null,
    listingType: rent ? "for rent" : null,
  });

  const handleOpen = (e) => {
    e.preventDefault();
    setOpenFilter(!openFilter);
  };
  const handleLandlords = (e) => {
    e.preventDefault();
    setLandlords(true);
    setManagers(false);
    setTenants(false);
  };
  const handleManager = (e) => {
    e.preventDefault();
    setLandlords(false);
    setManagers(true);
    setTenants(false);
  };
  const handleTenants = (e) => {
    e.preventDefault();
    setLandlords(false);
    setManagers(false);
    setTenants(true);
  };
  const handleRent = (e) => {
    e.preventDefault();
    setRent(true);
    setSale(false);
    setShortlist(false);
    setLand(false);
    if (lowerCaseData(e.target.innerText) === 'rent') {
      handleFilterChange("listingType", 'for rent');
    } else {
      handleFilterChange("listingType", lowerCaseData(e.target.innerText));
    }
  };
  const handleSale = (e) => {
    e.preventDefault();
    setRent(false);
    setSale(true);
    setShortlist(false);
    setLand(false);
    if (lowerCaseData(e.target.innerText) === 'buy') {
      handleFilterChange("listingType", 'for sale');
    } else {
      handleFilterChange("listingType", lowerCaseData(e.target.innerText));
    }
  };
  const handleShortlist = (e) => {
    e.preventDefault();
    setRent(false);
    setSale(false);
    setShortlist(true);
    setLand(false);
    handleFilterChange("listingType", lowerCaseData(e.target.innerText));
  };
  const handleLand = (e) => {
    e.preventDefault();
    setRent(false);
    setSale(false);
    setShortlist(false);
    setLand(true);
    handleFilterChange("listingType", lowerCaseData(e.target.innerText));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    handleFilterChange("search", value);
  };

  const handleSearch = (query, label) => {
    handleFilterChange(label, query);
  };

  const link = () => {
    let link
    const query = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        query[key] = filters[key];
      }
    });
    if (filters) {
      link = `/user_homepage/PropertyListing/?page=1&${new URLSearchParams(query).toString()}`
      return link;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        `/public/properties/featured`)
      const propertyData = response?.data?.data || null
      setFeaturedData(propertyData);
    }
    fetchData()
  }, []);

  function getWindowDimensions() {
    if (typeof window !== 'undefined') {
      const { innerWidth: width } = window;
      return width;
    }
    return null;
  }

  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowWidth(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const slidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 1320) return 3;
      if (window.innerWidth < 1000) return 1;
      if (window.innerWidth < 1321 && window.innerWidth > 999) return 2;
    }
    return 1;
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slidesToShow(), // Adjusted based on screen size
    className: "center",
    centerMode: true,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
  };

  const sliderSettingsII = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    className: "center",
    centerMode: true,
    centerPadding: "0%",
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
  };

  return (
    <div className="md:w-full mx-auto mt-10 md:mt-20 ">
      <div className="sm:hidden bg-[url('/static/images/Fine_Building.jpeg')] bg-cover h-[510px] py-8 px-6 flex flex-col justify-between">
        <div className="bg-whiteblue p-2 w-[200px] rounded-[4px]">
          <p className="text-[13px] font-[400] text-BlueHomz">One-Stop real estate solution</p>
        </div>
        <p className="text-[29px] font-[700] text-white leading-tight">
          Find & Manage Properties on Homz
        </p>
        <div className="w-full p-4 bg-HomePageBg rounded-[12px] border-[2px] border-BlueHomz flex flex-col gap-4">
          <div className="text-[13px] font-[500] w-full flex ">
            <button
              onClick={handleRent}
              className={`w-[25%] h-[38px] rounded-tl-[4px] rounded-bl-[4px] ${rent
                ? " hover:bg-[#559CFF] bg-BlueHomz text-white"
                : "bg-[#FFFFFF]"} text-BlueHomz`}
            >
              Rent
            </button>
            <button
              onClick={handleSale}
              className={`w-[25%] h-[38px] ${sale
                ? " hover:bg-[#559CFF] bg-BlueHomz text-white"
                : "bg-[#FFFFFF]"} text-BlueHomz`}
            >
              Buy
            </button>
            <button
              onClick={handleShortlist}
              className={`w-[25%] h-[38px] ${shortlist
                ? " hover:bg-[#559CFF] bg-BlueHomz text-white"
                : "bg-[#FFFFFF]"} text-BlueHomz`}
            >
              Shortlet
            </button>
            <button
              onClick={handleLand}
              className={`w-[25%] h-[38px] rounded-tr-[4px] rounded-br-[4px] ${land
                ? " hover:bg-[#559CFF] bg-BlueHomz text-white"
                : "bg-[#FFFFFF]"} text-BlueHomz`}
            >
              Land
            </button>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              id="searchState_Area"
              name="searchState_Area"
              placeholder="Search by state or area"
              className=" w-full  h-[42px]  rounded-[4px] placeholder:bold placeholder:text-slate-400 block bg-white border border-BlueHomz py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-[13px]"
              value={filters.search}
              onChange={handleSearchChange}
            />
            <Link href={link() !== null ? link() : ""} className={``}>
              <Image
                src="/static/images/search-normal.svg"
                alt=""
                width={16}
                height={16}
                className="absolute top-3 right-5"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <PropertyType
                getPropertyType={handleSearch}
                className={"w-[100%]"}
                selectOption={`${filters?.propertyType === null
                  ? "Type"
                  : capitalizeFirstLetter(filters?.propertyType)
                  }`}
                classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                classNameIII={"text-GrayHomz2"}
                classNameIV={"text-GrayHomz2"}
                arrowColor={"#A9A9A9"}
              />
            </div>
            <div>
              <Bedroom
                getBedrooms={handleSearch}
                className={"w-[100%]"}
                selectOption={`${filters?.numberOfBathrooms === null
                  ? "No of bedrooms"
                  : `${filters?.numberOfBathrooms} Bedrooms`
                  }`}
                classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                classNameIII={"text-GrayHomz2"}
                classNameIV={"text-GrayHomz2"}
                arrowColor={"#A9A9A9"}
              />
            </div>
            <div>
              <MinPrice
                getPrice={handleSearch}
                className={"w-[100%]"}
                selectOption={`${filters?.minPrice === null
                  ? "Min Price"
                  : addCommasToNumberWithoutN(filters?.minPrice)
                  }`}
                classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                classNameIII={"text-GrayHomz2"}
                classNameIV={"text-GrayHomz2"}
                arrowColor={"#A9A9A9"}
              />
            </div>
            <div>
              <MaxPrice
                getPrice={handleSearch}
                className={"w-[100%]"}
                selectOption={`${filters?.maxPrice === null
                  ? "Max Price"
                  : addCommasToNumberWithoutN(filters?.maxPrice)
                  }`}
                classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                classNameIII={"text-GrayHomz2"}
                classNameIV={"text-GrayHomz2"}
                arrowColor={"#A9A9A9"}
              />
            </div>
          </div>
          <Link href={link() !== null ? link() : ""} className="w-full">
            <button className="w-full flex items-center justify-center cursor-pointer h-[44px] p-[12px] bg-[#006AFF] gap-[8px] text-white rounded-[4px]">
              <Image
                src="/static/images/white-search.svg"
                alt=""
                width={16}
                height={16}
              />
              <span className="">Search</span>
            </button>
          </Link>
        </div>
      </div>
      <div className={`hidden sm:flex flex-col justify-center items-center relative px-8 md:px-0`}>
        <div className="flex md:items-center md:justify-between relative w-[330px] md:w-full">
          <div className="flex flex-col items-start w-[310px] md:w-[580px] gap-3 md:gap-2 md:pb-[165px] md:pl-20">
            <p className="md:h-[43px] p-[8px] text-center text-[13px] md:text-[18px] rounded-[12px] bg-[#EEF5FF] text-[#006AFF] font-[400] md:font-[500] md:leading-[27px]">
              One-Stop Real Estate Solution
            </p>

            <div className=" text-[#202020]">
              <h1 className="hidden md:block text-[37px] lg:text-[41px] font-[700] leading-tight">
                Find, Manage, Appraise Your Property With Homz
              </h1>
              <span className="md:hidden text-[29px] font-[700] leading-tight">Find & Manage Properties on Homz</span>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/static/images/imageHouseHP.png"
              alt=""
              width={694}
              height={642}
              className="rounded-t-[23.02px] rounded-s-[23.02px] md:w-[694px] md:h-[642px]"
            />
          </div>
        </div>
        <div className="md:absolute w-[330px] h-full mt-[20px] md:mt-0 px-[24px] border-[2px] border-BlueHomz flex flex-col justify-between bottom-12 md:bottom-[140px] lg:bottom-[155px] md:left-20 max-w-[882px] md:w-[655px] lg:w-full md:h-[144px] md:px-[20px] py-[24px] rounded-[12px] bg-[#EEF5FF] md:bg-opacity-75">
          <div className="flex md:gap-[8px] flex-wrap gap-[14px] ">
            <button
              className={`md:text-[14px] text-[13px] text-center font-[500] cursor-pointer h-[44px] p-[12px] ${rent
                ? " hover:bg-[#559CFF] bg-BlueHomz md:bg-[#0058D4] md:hover:bg-[#0058D4] text-white"
                : "bg-[#FFFFFF]"
                } text-[#006AFF] hover:bg-[#006AFF] gap-[8px] w-[132px] h-[37px] md:h-[44px] hover:text-white items-center rounded-[4px] md:w-[100px] lg:w-[126.25px] `}
              onClick={handleRent}
            >
              <span className="hidden md:block">For Rent</span>
              <span className="md:hidden">Rent</span>
            </button>
            <button
              className={`md:text-[14px] font-[500] text-[13px] cursor-pointer h-[44px] p-[12px] ${sale
                ? " hover:bg-[#559CFF] bg-BlueHomz md:bg-[#0058D4] md:hover:bg-[#333b46] text-white"
                : "bg-[#FFFFFF]"
                } text-[#006AFF] hover:bg-[#006AFF] gap-[8px] w-[132px] h-[37px] md:h-[44px] hover:text-white items-center rounded-[4px] md:w-[100px] lg:w-[126.25px] text-center`}
              onClick={handleSale}
            >
              <span className="hidden md:block">For Sale</span>
              <span className="md:hidden">Buy</span>

            </button>
            <button
              className={`md:text-[14px] font-[500] text-[13px] cursor-pointer h-[44px] p-[12px] ${shortlist
                ? " hover:bg-[#559CFF] bg-BlueHomz md:bg-[#0058D4] md:hover:bg-[#0058D4] text-white"
                : "bg-[#FFFFFF]"
                } text-[#006AFF] hover:bg-[#006AFF] gap-[8px] w-[132px] h-[37px] md:h-[44px] hover:text-white items-center rounded-[4px] md:w-[100px] lg:w-[126.25px] text-center`}
              onClick={handleShortlist}
            >
              Shortlet
            </button>
            <button
              className={`md:text-[14px] text-[13px] font-[500] cursor-pointer h-[44px] p-[12px] ${land
                ? " hover:bg-[#559CFF] bg-BlueHomz md:bg-[#0058D4] md:hover:bg-[#0058D4] text-white"
                : "bg-[#FFFFFF]"
                } text-[#006AFF] hover:bg-[#006AFF] gap-[8px] w-[132px] h-[37px] md:h-[44px] hover:text-white items-center rounded-[4px] md:w-[100px] lg:w-[126.25px] text-center `}
              onClick={handleLand}
            >
              Land
            </button>
            <Link href={link() !== null ? link() : ""}
              className=" md:w-[100px] lg:w-[126.25px] hidden md:flex cursor-pointer h-[44px] p-[12px] border border-[#006AFF] gap-[8px] text-BlueHomz hover:bg-BlueHomz3 items-center rounded-[4px] text-[16px] font-[600]">
              <Image
                src="/static/images/search-normal.svg"
                alt=""
                width={16}
                height={16}
              />
              <span className="">Search</span>

            </Link>
            <div className="relative w-full md:hidden">
              <input
                type="text"
                id="searchState_Area"
                name="searchState_Area"
                placeholder="Search by state or area"
                className=" w-full  h-[42px]  rounded-[4px] placeholder:bold placeholder:text-slate-400 block bg-white border border-BlueHomz py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-[13px]"
                value={filters.search}
                onChange={handleSearchChange}
              />
              <Link href={link() !== null ? link() : ""} className={`${openFilter ? "hidden" : ""}`}>
                <Image
                  src="/static/images/search-normal.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="absolute top-3 right-5"
                />
              </Link>
            </div>
          </div>
          {!openFilter ? (
            <button
              className="md:hidden flex items-center pt-3 gap-2"
              onClick={handleOpen}
            >
              <span className="">Show all filters</span>
              <Image
                src="/static/images/black-arrow-down.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          ) : (
            <div className="md:hidden flex gap-4 flex-col md:flex-row mt-4 ">
              <div>
                <PropertyType
                  getPropertyType={handleSearch}
                  className={"w-[100%]"}
                  selectOption={`${filters?.propertyType === null
                    ? "Property Type"
                    : capitalizeFirstLetter(filters?.propertyType)
                    }`}
                  classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                  classNameIII={"text-GrayHomz2"}
                  classNameIV={"text-GrayHomz2"}
                  arrowColor={"#A9A9A9"}
                />
              </div>
              <div>
                <Bedroom
                  getBedrooms={handleSearch}
                  className={"w-[100%]"}
                  selectOption={`${filters?.numberOfBathrooms === null
                    ? "No of bedrooms"
                    : `${filters?.numberOfBathrooms} Bedrooms`
                    }`}
                  classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                  classNameIII={"text-GrayHomz2"}
                  classNameIV={"text-GrayHomz2"}
                  arrowColor={"#A9A9A9"}
                />
              </div>
              <div>
                <MinPrice
                  getPrice={handleSearch}
                  className={"w-[100%]"}
                  selectOption={`${filters?.minPrice === null
                    ? "Min Price"
                    : addCommasToNumberWithoutN(filters?.minPrice)
                    }`}
                  classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                  classNameIII={"text-GrayHomz2"}
                  classNameIV={"text-GrayHomz2"}
                  arrowColor={"#A9A9A9"}
                />
              </div>
              <div>
                <MaxPrice
                  getPrice={handleSearch}
                  className={"w-[100%]"}
                  selectOption={`${filters?.maxPrice === null
                    ? "Max Price"
                    : addCommasToNumberWithoutN(filters?.maxPrice)
                    }`}
                  classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                  classNameIII={"text-GrayHomz2"}
                  classNameIV={"text-GrayHomz2"}
                  arrowColor={"#A9A9A9"}
                />
              </div>

              <button
                className="md:hidden flex items-center my-2 gap-2"
                onClick={() => setOpenFilter(!openFilter)}
              >
                <span className="">Hide filters</span>
                <Image
                  src="/static/images/arrow-right.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>

              <Link href={link() !== null ? link() : ""} className="w-full">
                <button className="md:hidden w-full flex items-center justify-center cursor-pointer h-[44px] p-[12px] bg-[#006AFF] gap-[8px] text-white rounded-[4px]">
                  <Image
                    src="/static/images/white-search.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  <span className="">Search</span>
                </button>
              </Link>
            </div>
          )}
          <div className="hidden md:flex gap-2 items-center w-full">
            <div className="relative  flex items-center w-[28%] h-[44px]} rounded-[4px] py-[12px]  mr-1">
              <input
                type="text"
                id="searchState_Area"
                name="searchState_Area"
                className=" w-full placeholder:bold placeholder:text-slate-400 block bg-white  border border-BlueHomz4 h-[45px] p-3 rounded-md  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search by state or area"
                value={filters.search}
                onChange={handleSearchChange}
              />
              <Link href={link() !== null ? link() : ""}>
                <Image
                  src="/static/images/search-normal.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="cursor-pointer top-[26px] right-[15px] absolute"
                />
              </Link>
            </div>
            <div className="flex items-center justify-between gap-2 flex-row lg:w-[72%]">
              <div>
                <PropertyType
                  getPropertyType={handleSearch}
                  className={"w-[100px] lg:w-[142px]"}
                  selectOption={`${filters?.propertyType === null
                    ? "Property Type"
                    : capitalizeFirstLetter(filters?.propertyType)
                    }`}
                  classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                  classNameIII={"text-GrayHomz2"}
                  classNameIV={"text-GrayHomz2"}
                  arrowColor={"#A9A9A9"}
                />
              </div>
              <div>
                <Bedroom
                  getBedrooms={handleSearch}
                  className={"w-[100px] lg:w-[142px]"}
                  selectOption={`${filters?.numberOfBathrooms === null
                    ? "No of bedrooms"
                    : `${filters?.numberOfBathrooms} Bedrooms`
                    }`}
                  classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                  classNameIII={"text-GrayHomz2"}
                  classNameIV={"text-GrayHomz2"}
                  arrowColor={"#A9A9A9"}
                />
              </div>
              <div className={``}>
                <MinPrice
                  getPrice={handleSearch}
                  className={"w-[100px] lg:w-[142px]"}
                  selectOption={`${filters?.minPrice === null
                    ? "Min Price"
                    : addCommasToNumberWithoutN(filters?.minPrice)
                    }`}
                  classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                  classNameIII={"text-GrayHomz2"}
                  classNameIV={"text-GrayHomz2"}
                  arrowColor={"#A9A9A9"}
                />
              </div>
              <div className={``}>
                <MaxPrice
                  getPrice={handleSearch}
                  className={"w-[100px] lg:w-[142px]"}
                  selectOption={`${filters?.maxPrice === null
                    ? "Max Price"
                    : addCommasToNumberWithoutN(filters?.maxPrice)
                    }`}
                  classNameII={"border-BlueHomz4 text-GrayHomz2 bg-white"}
                  classNameIII={"text-GrayHomz2"}
                  classNameIV={"text-GrayHomz2"}
                  arrowColor={"#A9A9A9"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-full bg-[#EEF5FF]  overflow-hidden flex flex-col gap-[15px] md:py-[64px] md:px-[87px] px-8 pt-8 mt-6 pb-12">
        <p className="w-[202px] text-[13px] md:w-[300px] font-[400] leading-[16.38px] md:h-[43px] p-[8px]  text-center md:text-[18px] rounded-[4px] bg-[#039855] text-[#CDEADD] md:font-[500] md:leading-[27px] mx-auto">
          Designed for stress-free living
        </p>

        <h2 className="hidden md:block text-[35px] font-[700] leading-[45.36px] text-[#202020] text-center">
          Effortless Solution for Landlords, Property Managers and Tenants
        </h2>
        <h3 className="w-[295px] text-[22px] text-left leading-[28.98px] font-[700] md:hidden text-[#202020] mx-auto">
          Effortless Solution for all
        </h3>
        <div className="flex md:mt-5 md:gap-[12rem] flex-col md:flex-row w-[330px] md:w-full ">
          <div className="relative md:h-[468.66px] hidden lg:block">
            <Image
              src="/static/images/HP-image.png"
              alt=""
              width={324}
              height={368.36}
              className="relative rounded-[15.6px] z-0 top-7"
            />

            <Image
              src="/static/images/homz.gif"
              alt=""
              width={520}
              height={426.13}
              className="relative rounded-[9.92px] h-[426.13px] z-10 bottom-[373px] left-[135px]"
            />
            <Image
              src="/static/images/Property-Added-Successfully-1.png"
              alt=""
              width={275}
              height={205.66}
              className="relative rounded-[15.6px] z-20 bottom-[535px] left-[44px]"
            />
          </div>

          <div className="md:pt-20 md:w-[416px] w-[330px] pt-0 md:pb-[48px] pb-0  ">
            <div className="flex gap-3 flex-wrap">
              <button
                className={` h-[36px] py-[8px] px-[16px] rounded-[4px] text-[13px] ${landlord
                  ? "bg-[#006AFF] text-white"
                  : "bg-white text-[#006AFF"
                  }`}
                onClick={handleLandlords}
              >
                For Landlords
              </button>
              <button
                className={` h-[36px] py-[8px] px-[16px] rounded-[4px] text-[13px] ${manager ? "bg-[#006AFF] text-white" : "bg-white text-[#006AFF"
                  }`}
                onClick={handleManager}
              >
                For Property Managers
              </button>
              <button
                className={` h-[36px] py-[8px] px-[16px] rounded-[4px] text-[13px] ${tenant ? "bg-[#006AFF] text-white" : "bg-white text-[#006AFF"
                  } `}
                onClick={handleTenants}
              >
                For Tenants
              </button>
            </div>
            <div className="mb-3 pt-10">
              {/* Landlords section */}
              {landlord && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/money-recive.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Receive Rent On Time
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/buildings-2.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Monitor All Properties In One Place
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/verify.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Get Verified Tenants on Your Property
                    </p>
                  </div>
                  <Link
                    href="/landlord"
                    className="text-[14px] md:text-[16px] text-[#006AFF] flex gap-1"
                  >
                    <span>learn more</span>
                    <Image
                      src="/static/images/blue-arrow-right.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </Link>
                </div>
              )}
              {/* Managers section */}
              {manager && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/wallet-check.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Collect Rent Faster
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/blue-people.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Manage Existing Tenants
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/Red-setting.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Offer Seamless Maintenance Services
                    </p>
                  </div>
                  <Link
                    href="/enterprise"
                    className="text-[14px] md:text-[16px] text-[#006AFF] flex gap-1"
                  >
                    <span>learn more</span>
                    <Image
                      src="/static/images/blue-arrow-right.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </Link>
                </div>
              )}
              {/* Tenants section */}
              {tenant && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/card.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Pay & Save rent
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/card-coin.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Pay bills
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/messages.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Interact with property management
                    </p>
                  </div>
                  <Link
                    href="/tenant"
                    className="text-[14px] md:text-[16px] text-[#006AFF] flex gap-1"
                  >
                    <span>learn more</span>
                    <Image
                      src="/static/images/blue-arrow-right.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:items-start md:justify-start bg-[#006AFF] text-white py-5 md:py-10 w-full max-w-[1440px] mx-auto h-auto">
        <div className="text-[23px] md:text-[34px] font-[700] flex justify-between w-full px-8 md:px-24">
          <h4>Featured Listed Properties</h4>
          <Link
            href="user_homepage/PropertyListing"
            className="hidden md:flex items-center gap-1 border border-white rounded px-2 py-1"
          >
            <span className="text-[16px] font-[500]">View All</span>
            <Image
              src="/static/images/white-right-arrow.svg"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </Link>
        </div>
        {/* <p className="mt-2 text-[16px] md:text-[20px] font-[400] w-full lg:w-[920px] text-start px-8 md:px-24">
          <span className="hidden md:block">
            Below are the list of the different houses that we currently have on the platform. Select any of these to view the house details and the features.
          </span>
          <span className="md:hidden">
            Browse through house listings on our platform for details and features.
          </span>
        </p> */}
        <div className="w-full max-w-[1440px] my-6 flex flex-col justify-center items-center px-8 md:px-[80px]">
          <div className="w-full">
            {
              featuredData?.length < 4 ?
                <Slider {...sliderSettingsII}>
                  {featuredData?.map((property, idx) => (
                    <div className="w-full" key={idx}>
                      <div className="w-[280px] sm:w-[373px] h-[458px] bg-white rounded-lg shadow-md mx-auto">
                        <div className="cursor-pointer w-[373px] h-[252px]">
                          <Carousel
                            slide={false}
                            theme={customTheme}
                            className="w-[280px] sm:w-[373px] h-[252px]"
                          >
                            {property?.property?.photos &&
                              property?.property?.photos.map((img, index) => (
                                <div key={index} className="w-[280px] sm:w-[373px] h-[252px]">
                                  <Image
                                    src={img?.url}
                                    alt=""
                                    width={373}
                                    height={252}
                                    className="w-[280px] sm:w-[373px] h-[252px] rounded-lg object-cover"
                                  />
                                </div>
                              ))}
                          </Carousel>
                        </div>
                        <div className="flex flex-col px-6 py-4 justify-between h-[206px]">
                          <div className="flex justify-between items-center">
                            <p className="text-BlueHomz text-[23px] w-[75%] truncate text-start font-[700]">
                              {capitalizeFirstLetter(property?.property?.name || property?.property?.title)}
                            </p>
                            {property?.property?.listingType && (
                              <div className="bg-BlueHomz rounded-[4px] flex justify-center items-center w-[68px] h-[25px]">
                                <p className="text-white text-[11px] font-[400]">
                                  {capitalizeFirstLetter(property?.property?.listingType)}
                                </p>
                              </div>
                            )}
                          </div>
                          {property?.property?.propertyType && (
                            <p className="text-blue-600 text-[14px] font-[400]">
                              {capitalizeFirstLetter(property?.property?.propertyType)}
                            </p>
                          )}
                          {property?.property?.price && (
                            <p className="text-[16px] font-[700] flex items-center">
                              <Image
                                src="/static/images/nairaIcon.svg"
                                alt=""
                                width={15}
                                height={25}
                                className="h-6 w-4"
                              />
                              <span className="pl-1 text-BlackHomz">
                                {Number(property?.property?.price).toLocaleString()}
                              </span>
                            </p>
                          )}
                          <p className="flex gap-1 items-center text-[14px] font-[500] text-BlackHomz">
                            <Image
                              src="/static/images/Location_Vector.svg"
                              alt=""
                              width={12}
                              height={16}
                              className="h-4 w-3"
                            />
                            {`${capitalizeFirstLetter(property?.property?.area)}, ${capitalizeFirstLetter(property?.property?.state)}`}
                          </p>
                          <div className="flex justify-between items-center text-[10px] font-[500] text-BlackHomz">
                            <div className="flex gap-4 items-center text-xs md:text-sm text-gray-800">
                              {property?.property?.numberOfRooms && (
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/static/images/bed_Vector.svg"
                                    alt=""
                                    width={17}
                                    height={12}
                                    className="h-4 w-4"
                                  />
                                  {property?.property?.numberOfRooms === 1 ? `${property?.property?.numberOfRooms} bedroom` : `${property?.property?.numberOfRooms} bedrooms`}
                                </div>
                              )}
                              {property?.property?.numberOfBathrooms && (
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/static/images/shower_Vector.svg"
                                    alt=""
                                    width={17}
                                    height={12}
                                    className="h-4 w-4"
                                  />
                                  {property?.property?.numberOfBathrooms === 1 ? `${property?.property?.numberOfBathrooms} bathroom` : `${property?.property?.numberOfBathrooms} bathrooms`}
                                </div>
                              )}
                              {property?.property?.squareMeter && (
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/static/images/sqrtFeet-vector.svg"
                                    alt=""
                                    width={21}
                                    height={12}
                                    className="h-4 w-5"
                                  />
                                  {property?.property?.squareMeter} Sqft
                                </div>
                              )}
                            </div>
                            <Link href={`/user_homepage/PreviewProperty/${property?.property?.slug}`}>
                              <button className="">
                                <Image
                                  src="/static/images/arrow-in-circle.svg"
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="h-10 w-10"
                                />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                :
                <Slider {...sliderSettings}>
                  {featuredData?.map((property, idx) => (
                    <div className="w-full mb-8" key={idx}>
                      <div className="w-[280px] sm:w-[373px] h-[458px] bg-white  rounded-lg shadow-md mx-auto">
                        <div className="cursor-pointer w-[373px] h-[252px]">
                          <Carousel
                            slide={false}
                            theme={customTheme}
                            className="w-[280px] sm:w-[373px] h-[252px]"
                          >
                            {property?.property?.photos &&
                              property?.property?.photos.map((img, index) => (
                                <div key={index} className="w-[280px] sm:w-[373px] h-[252px]">
                                  <Image
                                    src={img?.url}
                                    alt=""
                                    width={373}
                                    height={252}
                                    className="w-[280px] sm:w-[373px] h-[252px] rounded-lg object-cover"
                                  />
                                </div>
                              ))}
                          </Carousel>
                        </div>
                        <div className="flex flex-col px-6 py-4 justify-between h-[206px]">
                          <div className="flex justify-between items-center">
                            <p className="text-BlueHomz w-[75%] truncate text-start text-[23px] font-[700]">
                              {capitalizeFirstLetter(property?.property?.name || property?.property?.title)}
                            </p>
                            {property?.property?.listingType && (
                              <div className="bg-BlueHomz rounded-[4px] flex justify-center items-center w-[68px] h-[25px]">
                                <p className="text-white text-[11px] font-[400]">
                                  {capitalizeFirstLetter(property?.property?.listingType)}
                                </p>
                              </div>
                            )}
                          </div>
                          {property?.property?.propertyType && (
                            <p className="text-blue-600 text-[14px] font-[400]">
                              {capitalizeFirstLetter(property?.property?.propertyType)}
                            </p>
                          )}
                          {property?.property?.price && (
                            <p className="text-[16px] font-[700] flex items-center">
                              <Image
                                src="/static/images/nairaIcon.svg"
                                alt=""
                                width={15}
                                height={25}
                                className="h-6 w-4"
                              />
                              <span className="pl-1 text-BlackHomz">
                                {Number(property?.property?.price).toLocaleString()}
                              </span>
                            </p>
                          )}
                          <p className="flex gap-1 items-center text-[14px] font-[500] text-BlackHomz">
                            <Image
                              src="/static/images/Location_Vector.svg"
                              alt=""
                              width={12}
                              height={16}
                              className="h-4 w-3"
                            />
                            {`${capitalizeFirstLetter(property?.property?.area)}, ${capitalizeFirstLetter(property?.property?.state)}`}
                          </p>
                          <div className="flex justify-between items-center text-[10px] font-[500] text-BlackHomz">
                            <div className="flex gap-4 items-center text-xs md:text-sm text-gray-800">
                              {property?.property?.numberOfRooms && (
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/static/images/bed_Vector.svg"
                                    alt=""
                                    width={17}
                                    height={12}
                                    className="h-4 w-4"
                                  />
                                  {property?.property?.numberOfRooms === 1 ? `${property?.property?.numberOfRooms} bedroom` : `${property?.property?.numberOfRooms} bedrooms`}
                                </div>
                              )}
                              {property?.property?.numberOfBathrooms && (
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/static/images/shower_Vector.svg"
                                    alt=""
                                    width={17}
                                    height={12}
                                    className="h-4 w-4"
                                  />
                                  {property?.property?.numberOfBathrooms === 1 ? `${property?.property?.numberOfBathrooms} bathroom` : `${property?.property?.numberOfBathrooms} bathrooms`}
                                </div>
                              )}
                              {property?.property?.squareMeter && (
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/static/images/sqrtFeet-vector.svg"
                                    alt=""
                                    width={21}
                                    height={12}
                                    className="h-4 w-5"
                                  />
                                  {property?.property?.squareMeter} Sqft
                                </div>
                              )}
                            </div>
                            <Link href={`/user_homepage/PreviewProperty/${property?.property?.slug}`}>
                              <button className="">
                                <Image
                                  src="/static/images/arrow-in-circle.svg"
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="h-10 w-10"
                                />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>

            }
          </div>
        </div>
        <Link
          href="user_homepage/PropertyListing"
        >
          <button className="md:hidden mb-8 border border-white px-4 py-2 rounded text-[14px] font-[500] flex gap-1 items-center">
            <span>View All</span>
            <Image
              src="/static/images/white-right-arrow.svg"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </button>
        </Link>
      </div>
      <div className="h-auto md:h-[303px] py-[20px] md:py-0 w-full bg-center bg-cover bg-[url('/Background-image.png')] bg-black">
        <div className="h-[239px] md:h-[303px]  flex flex-col items-center gap-[15px] justify-center mb-2">
          <p className="hidden md:block  px-4 text-center md:text-[36px] font-[700] md:leading-[45.36px] text-white">
            Discover More Apartments Tailored to Your Lifestyle
          </p>
          <p className="md:hidden text-[20px] leading-[28.98px] w-[297px] text-center font-[700] text-white">
            Explore apartments suited to your lifestyle.
          </p>
          <p className="text-[16px] md:text-[20px] font-[500] leading-[20.16px] text-center text-white md:w-full w-[297px]">
            Join over 2,000+ happy clients who have found their ideal apartments
            on Homz
          </p>
          <div className="flex gap-2 mt-2">
            <Link
              href="user_homepage/PropertyListing"
              className=" md:h-[48px] border border-r-white text-white bg-[#006AFF] text-[14px] md:text-[16px] md:font-[500] md:leading-[24px] p-[12px] rounded-[4px]"
            >
              Explore properties
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:h-[491px] min-h-[500px] lg:py-[72px] py-8 md:px-[140px] bg-[#EEF5FF] flex flex-col gap-3 md:gap-0">
        <div className="text-left text-[20px] mx-auto md:mx-0 w-[296px] md:w-full md:text-[24px] font-[700] leading-[28.98px]  flex justify-between items-center text-[#0058D4]">
          <h5 className="">Don’t Just Take Our Word For It</h5>
          <Link
            href="/contact-page"
            className="hidden  border text-[#006AFF] border-[#006AFF] w-[110px] h-[48px]  rounded-[4px] text-[16px] md:flex items-center justify-center"
          >
            Contact Us
          </Link>
        </div>
        <p className="text-center md:text-start md:text-[20px] leading-[20.16px] text-[#006AFF] font-[400] md:font-[500] md:leading-[25px] lg:w-[754px] md:w-[550px] w-[308px] mx-auto md:mx-0">
          <span className="">Hear from our satisfied clients who found their dream apartments with Homz.</span>
        </p>
        <div>
          <div className="mt-2 md:mt-8 px-12 md:px-0 md:mb-0 mb-6">
            <Slider {...sliderSettingsII}>
              {Testimonials.map((testimonial, index) => (
                <div
                  className="flex flex-col gap-4 items-center justify-center w-[277px] h-[230px] md:h-[275px] lg:h-[220px] md:mb-4 pt-2 bg-white md:w-full py-6 md:py-[20px] px-[14px] rounded-[12px]"
                  key={index}
                >
                  <div className="flex flex-col justify-between items-center mt-2 md:mt-0 h-full">
                    <p className="text-[16px] md:text-[20px] leading-[20.16px] text-center text-BlackHomz md:text-[#4E4E4E] font-[400] md:font-[500] md:leading-[40.32px] ">
                      {testimonial.Testimony}
                    </p>
                    <div className="flex flex-col gap-1 items-center">
                      <span className="text-[13px] md:text-[14px] md:font-[400] md:leading-[24px] text-[#202020]">
                        {testimonial.Name}
                      </span>
                      <span className="text-[11px] md:text-[13px] md:font-[500] md:leading-[19.5px] text-[#A9A9A9]">
                        {testimonial.Type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <Link
          href="/contact-page"
          className="md:hidden mt-4 mx-auto flex items-center justify-center border border-[#006AFF]  text-[#006AFF] w-[110px] h-[48px] font-[500] rounded-[4px] text-[16px] "
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

const Testimonials = [
  {
    _id: 1,
    Name: "Fatima Sani",
    Type: "Client",
    Testimony:
      "Homz Company has been instrumental in streamlining our real estate management system. Their expertise and dedication have significantly improved our operations.",
  },
  {
    _id: 2,
    Name: "Okechukwu Okocha",
    Type: "Client",
    Testimony:
      "We are extremely satisfied with the services provided by Homz Company. Their innovative solutions have helped us effectively manage our real estate assets.",
  },
  {
    _id: 3,
    Name: "Alice Johnson",
    Type: "Client",
    Testimony:
      "Homz Company's commitment to excellence is commendable. Their real estate management system has transformed our processes and improved our overall efficiency.",
  },
  {
    _id: 4,
    Name: "Dotun Odubote",
    Type: "Client",
    Testimony:
      "We have been working with Homz Company for several years now, and they continue to exceed our expectations. Their professionalism and expertise in real estate management are unparalleled.",
  },
  {
    _id: 5,
    Name: "Emmanuel Sambo",
    Type: "Client",
    Testimony:
      "Homz Company has been an invaluable partner in our real estate endeavors. Their cutting-edge solutions have allowed us to stay ahead in the competitive market.",
  },
  {
    _id: 6,
    Name: "Michael Wilson",
    Type: "Client",
    Testimony:
      "We highly recommend Homz Company to anyone looking for reliable real estate management services. Their team's dedication and attention to detail are truly commendable.",
  },
];

