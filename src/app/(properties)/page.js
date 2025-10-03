"use client";
import React, { useEffect, useRef, useState } from "react";
import Bedroom from "./components/bedrooms";
import MaxPrice from "./components/maxPrice";
import MinPrice from "./components/minPrice";
import PropertyType from "./components/propertyType";
import Image from "next/image";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import addCommasToNumberWithoutN from "@/utils/addCommasToNumberWithoutN";
import api from "@/utils/api";
import lowerCaseData from "@/utils/lowerCaseData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFeatureStore } from "@/store/useFeatureStore";
import PropertySlider from "./components/propertySlider";

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

const metadata = {
  title: 'Explore Properties Across Nigeria',
  description: 'Browse verified homes, land, and shortlets for sale or rent in top Nigerian locations.', // ← Your custom tag
  openGraph: {
    title: 'Explore Properties Across Nigeria',
    description: 'Browse verified homes, land, and shortlets for sale or rent in top Nigerian locations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Properties Across Nigeria',
    description: 'Browse verified homes, land, and shortlets for sale or rent in top Nigerian locations.',
  }
}

const HomePage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [landlord, setLandlords] = useState(true);
  const [manager, setManagers] = useState(false);
  const [tenant, setTenants] = useState(false);
  const [rent, setRent] = useState(true);
  const [sale, setSale] = useState(false);
  const [shortlist, setShortlist] = useState(false);
  const [land, setLand] = useState(false);
  const [filters, setFilters] = useState({
    search: null,
    propertyType: null,
    minPrice: null,
    maxPrice: null,
    numberOfBathrooms: null,
    listingType: rent ? "for rent" : null,
  });
  const [listingTypeW, setListingTypeW] = React.useState("for rent")
  const rentalPropertiesRef = useRef(null);
  const propertiesForSaleRef = useRef(null);
  const landsRef = useRef(null);
  const shortletRef = useRef(null);
  const { featuredData, fetchFeaturedData } = useFeatureStore();

  // Scroll function
  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const images = [
    "/seyi.jpg", "/ateef.png", "/sijiDaniels.png", "/sam.png", "/advocate.png"
  ]

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
    setListingTypeW("for rent")
    if (lowerCaseData(e.target.innerText) === "rent") {
      handleFilterChange("listingType", "for rent");
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
    setListingTypeW("for sale")
    if (lowerCaseData(e.target.innerText) === "buy") {
      handleFilterChange("listingType", "for sale");
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
    setListingTypeW("shortlet")
    handleFilterChange("listingType", lowerCaseData(e.target.innerText));
  };
  const handleLand = (e) => {
    e.preventDefault();
    setRent(false);
    setSale(false);
    setShortlist(false);
    setLand(true);
    setListingTypeW("land")
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
    const query = {};

    // Build query object excluding empty values and listingType
    Object.keys(filters).forEach((key) => {
      if (filters[key] && key !== "listingType") {
        query[key] = filters[key];
      }
    });

    let basePath = "";

    // Determine the listing type path segment
    if (listingTypeW) {
      switch (listingTypeW) {
        case "for rent":
          basePath += "/rent";
          break;
        case "for sale":
          basePath += "/sales";
          break;
        case "land":
          basePath += "/land";
          break;
        case "shortlet":
          basePath += "/shortlet";
          break;
        default:
          break;
      }
    }

    // Only add query params if they exist (❌ no page)
    const queryString =
      Object.keys(query).length > 0
        ? `?${new URLSearchParams(query).toString()}`
        : "";

    return `${basePath}${queryString}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/public/properties/featured`);
      const propertyData = response?.data?.data || null;
    };
    fetchData();
    fetchFeaturedData();
  }, []);

  function getWindowDimensions() {
    if (typeof window !== "undefined") {
      const { innerWidth: width } = window;
      return width;
    }
    return null;
  }

  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowWidth(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const slidesToShow = () => {
    if (typeof window !== "undefined") {
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

  const logoSlidesToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1270) return 5;
      if (window.innerWidth > 1024) return 4;
      if (window.innerWidth > 768) return 3;
      return 1;
    }
    return 1;
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const logoSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: logoSlidesToShow(),
    centerMode: isMobile,
    centerPadding: isMobile ? "10%" : "0",
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
  };

  return (
      <div className="m-auto max-w-[1440px]">
        <div className="md:w-full mx-auto mt-10 md:mt-20 ">
          <div className="sm:hidden bg-[url('/static/images/Fine_Building.jpeg')] bg-cover h-[510px] py-8 px-6 flex flex-col justify-between">
            <div className="bg-whiteblue p-2 w-[200px] rounded-[4px]">
              <p className="text-[13px] font-[400] text-BlueHomz">
                One-Stop real estate solution
              </p>
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
                    : "bg-[#FFFFFF]"
                    } text-BlueHomz`}
                >
                  Rent
                </button>
                <button
                  onClick={handleSale}
                  className={`w-[25%] h-[38px] ${sale
                    ? " hover:bg-[#559CFF] bg-BlueHomz text-white"
                    : "bg-[#FFFFFF]"
                    } text-BlueHomz`}
                >
                  Buy
                </button>
                <button
                  onClick={handleShortlist}
                  className={`w-[25%] h-[38px] ${shortlist
                    ? " hover:bg-[#559CFF] bg-BlueHomz text-white"
                    : "bg-[#FFFFFF]"
                    } text-BlueHomz`}
                >
                  Shortlet
                </button>
                <button
                  onClick={handleLand}
                  className={`w-[25%] h-[38px] rounded-tr-[4px] rounded-br-[4px] ${land
                    ? " hover:bg-[#559CFF] bg-BlueHomz text-white"
                    : "bg-[#FFFFFF]"
                    } text-BlueHomz`}
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
          <div
            className={`hidden sm:flex flex-col justify-center items-center relative px-8 md:px-0`}
          >
            <div className="flex md:items-center md:justify-between relative w-[330px] md:w-full">
              <div className="flex flex-col items-start w-[310px] md:w-[680px] gap-3 md:gap-4 md:pb-[165px] md:pl-20">
                <p className="md:h-[43px] p-[8px] text-center text-[13px] md:text-[18px] rounded-[12px] bg-[#EEF5FF] text-[#006AFF] font-[400] md:font-[500] md:leading-[27px]">
                  One-Stop Real Estate Solution
                </p>

                <div className="w-full  text-[#202020]">
                  <h1 className="text-[37px] lg:text-[41px] font-[700] leading-tight">
                    Find & Manage your Property
                  </h1>
                  <span className="md:hidden text-[29px] font-[700] leading-tight">
                    Find & Manage Properties on Homz
                  </span>
                </div>
              </div>
              <div className="hidden md:block">
                <Image
                  src="/static/images/4e31498e92febf4f78998c770fbd3fc0d79c1e56.jpg"
                  alt=""
                  width={694}
                  height={440}
                  className="rounded-tl-[23.02px] md:w-[694px] md:h-[440px]"
                />
              </div>
            </div>
            <div className="md:absolute w-[330px] h-full mt-[20px] md:mt-0 px-[24px] border-[2px] border-BlueHomz flex flex-col justify-between bottom-12 md:bottom-[50px] xl:bottom-[70px] md:left-20 max-w-[882px] md:w-[655px] lg:w-full md:h-[144px] sm:mb-4 lg:mb-0 md:px-[20px] py-[24px] rounded-[12px] bg-[#EEF5FF] md:bg-opacity-75">
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
                <Link
                  href={link() !== null ? link() : ""}
                  className=" md:w-[100px] lg:w-[126.25px] hidden md:flex cursor-pointer h-[44px] p-[12px] border border-[#006AFF] gap-[8px] text-BlueHomz hover:bg-BlueHomz3 items-center rounded-[4px] text-[16px] font-[600]"
                >
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
                  <Link
                    href={link() !== null ? link() : ""}
                    className={`${openFilter ? "hidden" : ""}`}
                  >
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
          <div className="bg-[#006AFF] text-white py-5 md:py-10 w-full max-w-[1440px] mx-auto h-auto">
            <div className="text-[23px] md:text-[34px] font-[700] w-full px-8 md:px-24">
              <div>
                <h4>Featured Listed Properties</h4>
                <p className="text-[16px] sm:text-[18px] font-normal mt-2">
                  View featured listings across property categories
                </p>
              </div>
              <div className="hidden sm:flex flex-wrap gap-2 items-center mt-4">
                <button
                  onClick={() => scrollToRef(rentalPropertiesRef)}
                  className="text-[13px] font-normal text-BlueHomz bg-white px-4 py-2 rounded-[4px] hover:bg-BlueHomz2 hover:text-white"
                >
                  Rental Properties
                </button>
                <button
                  onClick={() => scrollToRef(propertiesForSaleRef)}
                  className="text-[13px] font-normal text-BlueHomz bg-white px-4 py-2 rounded-[4px] hover:bg-BlueHomz2 hover:text-white"
                >
                  Properties For Sale
                </button>
                <button
                  onClick={() => scrollToRef(landsRef)}
                  className="text-[13px] font-normal text-BlueHomz bg-white px-4 py-2 rounded-[4px] hover:bg-BlueHomz2 hover:text-white"
                >
                  Lands
                </button>
                <button
                  onClick={() => scrollToRef(shortletRef)}
                  className="text-[13px] font-normal text-BlueHomz bg-white px-4 py-2 rounded-[4px] hover:bg-BlueHomz2 hover:text-white"
                >
                  Shortlet
                </button>
              </div>
              <div className="grid sm:hidden grid-cols-2 gap-3 items-center mt-6">
                <button
                  onClick={() => scrollToRef(rentalPropertiesRef)}
                  className="text-[13px] font-normal text-BlueHomz truncate bg-white px-4 py-3 rounded-[4px] hover:bg-BlueHomz2 hover:text-white">
                  Rental Properties
                </button>
                <button
                  onClick={() => scrollToRef(propertiesForSaleRef)}
                  className="text-[13px] font-normal text-BlueHomz truncate bg-white px-4 py-3 rounded-[4px] hover:bg-BlueHomz2 hover:text-white">
                  Properties For Sale
                </button>
                <button
                  onClick={() => scrollToRef(landsRef)}
                  className="text-[13px] font-normal text-BlueHomz bg-white px-4 py-3 rounded-[4px] hover:bg-BlueHomz2 hover:text-white"
                >
                  Lands
                </button>
                <button
                  onClick={() => scrollToRef(shortletRef)}
                  className="text-[13px] font-normal text-BlueHomz bg-white px-4 py-3 rounded-[4px] hover:bg-BlueHomz2 hover:text-white"
                >
                  Shortlet
                </button>
              </div>
            </div>
            <div className="">
              {featuredData?.filter((data) => data?.property?.listingType === "for rent")?.length > 0 &&
                <div ref={rentalPropertiesRef} className="mt-8">
                  <div className={`flex justify-between items-center px-8 md:px-24 ${!featuredData && "hidden"}`}>
                    <p className="text-[20px] sm:text-[23px] font-medium text-white">Rental Properties</p>
                    <Link
                      href="/rent?page=1"
                      className="flex items-center gap-1"
                    >
                      <span className="text-sm sm:text-[16px] font-[400]">View All</span>
                      <Image
                        src="/static/images/white-right-arrow.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </Link>
                  </div>
                  <div className={`w-full my-6 px-8 md:px-[80px] ${featuredData?.filter((data) => data?.property?.listingType === "for rent")?.length < 3 ? "flex justify-start items-start" : " flex flex-col justify-center items-center"}`}>
                    {(
                      <PropertySlider
                        properties={featuredData?.filter((data) => data?.property?.listingType === "for rent")}
                        carouselTheme={customTheme}
                      />
                    )}
                  </div>
                </div>
              }
              {featuredData?.filter((data) => data?.property?.listingType === "for sale")?.length > 0 &&
                <div ref={propertiesForSaleRef} className="mt-8">
                  <div className={`flex justify-between items-center px-8 md:px-24 ${!featuredData && "hidden"}`}>
                    <p className="text-[20px] sm:text-[23px] font-medium text-white"> Properties For Sale</p>
                    <Link
                      href="/sales?page=1"
                      className="flex items-center gap-1"
                    >
                      <span className="text-sm sm:text-[16px] font-[400]">View All</span>
                      <Image
                        src="/static/images/white-right-arrow.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </Link>
                  </div>
                  <div className={`w-full my-6 px-8 md:px-[80px] ${featuredData?.filter((data) => data?.property?.listingType === "for sale")?.length < 3 ? "flex justify-start items-start" : " flex flex-col justify-center items-center"}`}>
                    {(
                      <PropertySlider
                        properties={featuredData?.filter((data) => data?.property?.listingType === "for sale")}
                        carouselTheme={customTheme}
                      />
                    )}
                  </div>
                </div>
              }
              {featuredData?.filter((data) => data?.property?.listingType === "land")?.length > 0 &&
                <div ref={landsRef} className="mt-8">
                  <div className={`flex justify-between items-center px-8 md:px-24 ${!featuredData && "hidden"}`}>
                    <p className="text-[20px] sm:text-[23px] font-medium text-white">Lands</p>
                    <Link
                      href="/land?page=1"
                      className="flex items-center gap-1"
                    >
                      <span className="text-sm sm:text-[16px] font-[400]">View All</span>
                      <Image
                        src="/static/images/white-right-arrow.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </Link>
                  </div>
                  <div className={`w-full my-6 px-8 md:px-[80px] ${featuredData?.filter((data) => data?.property?.listingType === "land")?.length < 3 ? "flex justify-start items-start" : " flex flex-col justify-center items-center"}`}>
                    {(
                      <PropertySlider
                        properties={featuredData?.filter((data) => data?.property?.listingType === "land")}
                        carouselTheme={customTheme}
                      />
                    )}
                  </div>
                </div>
              }
              {featuredData?.filter((data) => data?.property?.listingType === "shortlet")?.length > 0 &&
                <div ref={shortletRef} className="mt-8">
                  <div className={`flex justify-between items-center px-8 md:px-24 ${!featuredData && "hidden"}`}>
                    <p className="text-[20px] sm:text-[23px] font-medium text-white">Shortlet</p>
                    <Link
                      href="/shortlet?page=1"
                      className="flex items-center gap-1"
                    >
                      <span className="text-sm sm:text-[16px] font-[400]">View All</span>
                      <Image
                        src="/static/images/white-right-arrow.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </Link>
                  </div>
                  <div className={`w-full my-6 px-8 md:px-[80px] ${featuredData?.filter((data) => data?.property?.listingType === "shortlet")?.length < 3 ? "flex justify-start items-start" : " flex flex-col justify-center items-center"}`}>
                    {(
                      <PropertySlider
                        properties={featuredData?.filter((data) => data?.property?.listingType === "shortlet")}
                        carouselTheme={customTheme}
                      />
                    )}
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="md:w-full bg-[#EEF5FF]  overflow-hidden flex flex-col gap-[15px] md:py-[64px] md:px-[87px] px-8 pt-8 pb-12">
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
          <div className="px-[8%] bg-white py-[40px] md:py-[80px] flex flex-col items-center gap-6 justify-center w-full">
            <h2 className="text-[20px] md:text-[26px] text-GrayHomz font-semibold text-center">
              We’re Proudly serving forward-thinking companies
            </h2>
            <Slider {...logoSliderSettings} className="w-full mt-8">
              {
                images.map((data, index) => (
                  <div key={index} className="flex justify-center">
                    <Image
                      src={data}
                      alt="img"
                      height={95}
                      width={240}
                    />
                  </div>
                ))
              }
            </Slider>
          </div>
          <div className="h-auto md:h-[303px] py-[20px] md:py-0 w-full bg-center bg-cover bg-[url('/Background-image.png')] bg-black">
            <div className="h-[239px] md:h-[303px]  flex flex-col items-center gap-[15px] justify-center mb-2">
              <p className="hidden md:block  px-4 text-center md:text-[36px] font-[700] md:leading-[45.36px] text-white">
                Discover More Apartments Tailored to Your Lifestyle
              </p>
              <p className="text-[16px] md:text-[20px] font-[500] leading-[20.16px] text-center text-white md:w-full w-[297px]">
                Join over 2,000+ happy clients who have found their ideal apartments
                on Homz
              </p>
              <div className="flex gap-2 mt-2">
                <Link
                  href=""
                  className="w-[170px] flex justify-center items-center h-[48px] border border-r-white text-white bg-[#006AFF] text-[14px] md:text-[16px] md:font-[500] md:leading-[24px] rounded-[4px]"
                >
                  Explore properties
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full min-h-[500px] lg:py-[72px] py-8 md:px-[140px] bg-[#EEF5FF] flex flex-col gap-3 md:gap-0">
            <div className="text-left text-[20px] mx-auto md:mx-0 w-[296px] md:w-full md:text-[24px] font-[700] leading-[28.98px] flex justify-between items-center text-[#0058D4]">
              <h5 className="">Don’t Just Take Our Word For It</h5>
              <Link
                href="/contact-page"
                className="hidden  border text-[#006AFF] border-[#006AFF] w-[110px] h-[48px]  rounded-[4px] text-[16px] md:flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-center md:text-start md:text-[20px] leading-[20.16px] text-GrayHomz font-[400] md:font-[500] md:leading-[25px] lg:w-[754px] md:w-[550px] w-[308px] mx-auto md:mx-0">
              <span className="">
                Hear from amazing clients who have gotten apartments of their dreams on  Homz
              </span>
            </p>
            <div>
              <div className="px-[8%] md:px-0">
                <div
                  className="mx-auto md:mx-0 w-full flex flex-col gap-8 md:gap-6 items-start justify-start bg-white p-4 md:p-8 rounded-[16px] mt-8"
                >
                  <div className="flex flex-col gap-4 md:gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => {
                        return (
                          <span key={index} className="text-BlueHomz text-2xl">
                            &#9733;
                          </span>
                        );
                      })}
                    </div>
                    <p className="text-[16px] md:text-[20px] leading-[20.16px] text-BlackHomz md:text-[#4E4E4E] font-[400] md:font-[500] md:leading-[40.32px] md:text-justify">
                      Homz.ng has completely transformed the way we manage our properties. Before now, rent payments, and maintenance requests was stressful and time-consuming. With Homz, everything is now in one place; from automated rent reminders to seamless rent collection and transparent reporting.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-[16px] md:text-[20px] font-[600] text-[#202020]">
                      SijiDaniels Consulting Limited
                    </span>
                    <span className="text-[14px] md:text-[16px] md:font-[400] text-GrayHomz">
                      Property Management Company
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-[8%] w-full">
              <Link
                href="/contact-page"
                className="md:hidden mt-4 w-full flex items-center justify-center bg-[#006AFF]  text-white h-[48px] font-[500] rounded-[4px] text-[16px] "
              >
                Contact Us
              </Link>
              <Link
                href="/rent"
                className="md:hidden mt-4 w-full flex items-center justify-center border border-[#006AFF]  text-[#006AFF] h-[48px] font-[500] rounded-[4px] text-[16px] "
              >
                Explore properties
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomePage;