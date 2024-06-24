"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MiniPropertyListings from "./miniPropertyListings";
import timeAgo from "@/utils/timeAgo";
import { useRouter, usePathname } from "next/navigation";
import { fetchSinglePropertyPublic } from "@/api/propertyService";
import api from "@/utils/api";
import LoadingII from "@/components/mainmenu/loadingII";
import useBodyScroll from "@/utils/useBodyScroll";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import OwnersCard from "./ownersCard";
import RequestCard from "../user_homepage/PreviewProperty/requestCard";
import MarketerImage from "./imageUpload";
import Dropdown from "./dropDownFilter";
import ThreeDots from "../../components/mainmenu/ThreeDotsLoader";


const MarketerBusinessPage = ({ PropertyID }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  const [tabName, setTabName] = useState("properties");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState("1");
  const [propertyData, setPropertyData] = useState(null);

  const id = "p7567-kristy-for-rent-rivers-bonny";
  useBodyScroll([openSelectedImage]);
  const router = useRouter();
  const pathName = usePathname();
  const goBack = () => {
    router.back();
  };
  const [loading, setLoading] = useState(true);
  const [copiedState, setCopiedState] = useState({
    phoneNumber: false,
    email: false,
    whatsAppNumber: false,
  });

 
  const handleSharePage = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this page!",
      url: window.location.href,
    };

    try {
      await navigator.share(shareData);
      // console.log("Page shared successfully!");
    } catch (err) {
      console.error("Error sharing the page:", err);
    }
  };
  const additionalDetails = ["fully furnished", "newly Built", "serviced"];

  useEffect(() => {
    const propertyData = async () => {
      const response = await fetchSinglePropertyPublic(id);
      const property = await response;
      setPropertyData(property?.data);
      setLoading(false);
    };
    propertyData();
  }, [PropertyID]);

  useEffect(() => {
    if (propertyData && propertyData.coverPhoto && propertyData.photos) {
      const newData = {
        coverPhoto: propertyData.coverPhoto,
        photos: propertyData.photos,
      };
      const combinedData = [newData.coverPhoto, ...newData.photos].map(
        (item) => ({
          url: item.url,
        })
      );
      setCombinedData(combinedData);
    } else {
      // console.error("Invalid or missing data structure.");
    }
  }, [propertyData]);

  useEffect(() => {
    // Update remainder state when combinedData length changes
    if (combinedData.length === 8) {
      setRemainder(combinedData.length - 7);
    }
  }, [combinedData]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await api.get(`/public/properties/others`);
      const propertyData = response?.data?.data || null;
      // console.log(propertyData)
      const total = propertyData.length || 0;
      setTotalPages(Math.ceil(total / 9));
      setProperties(propertyData);
      setLoading(false);
    };
    fetchData();
  }, []);
  const clear = () => {
    setSelectedProperty(null);

    setSelectedRooms(null);
    setSearchQuery("");
    setFilteredData(property);
  };
  const firstThreePages = Array.from({ length: 3 }, (_, i) => i + 1);
  const lastThreePages = Array.from(
    { length: totalPages - 1 },
    (_, i) => totalPages - i
  )
    .filter((page) => page > 1 && page < totalPages)
    .reverse();

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    // setParams(true);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    // setParams(true);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    // setParams(true);
  };
  const linkToSearch = () => {
    router.push("/user_homepage/PropertyListing");
  };
  const options3 = [...new Set(properties?.map((item) => item?.propertyType))];

  const options4 = [
    ...new Set(properties?.map((item) => item?.numberOfBathrooms)),
  ];
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const filteredData = properties?.filter((data) => {
          const matchesState = !selectedState || data?.state === selectedState;
          const matchesArea = !selectedArea || data?.area === selectedArea;
          const matchesSearchQuery =
            !searchQuery ||
            data?.location.state
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            data?.location.area
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          const bathrooms =
            !selectedRooms || data?.numberOfBathrooms === selectedRooms;
          return matchesState && matchesArea && matchesSearchQuery && bathrooms;
        });
        setFilteredData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="w-full max-w-[1440px] m-auto">
   
      {loading ? (
        <LoadingII />
      ) : (
        propertyData && (
          <div className="w-full pt-10 md:pt-8 pb-10 md:px-[70px] px-5">
            <div className="w-full flex md:justify-between items-center gap-[4rem] md:gap-0">
              <div
                onClick={goBack}
                className="flex gap-2 items-center cursor-pointer"
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
                  }
                  height={16}
                  width={16}
                  alt=""
                  className="hidden md:block"
                />
                <p className="text-[11px] font-[400] hidden md:block">
                  Go Back
                </p>
                <span className="md:hidden bg-[#EEF5FF] w-[28px] h-[28px] p-[4px] rounded-[8px]">
                  <Image
                    src="/static/images/blue-arrow-left.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </span>
              </div>
            </div>

            <div className="sm:block mt-6 relative">
              <div className="h-[347px] rounded-[12px] w-fit">
                <Image
                  src="/static/images/marketerImage.png"
                  alt=""
                  width={1024}
                  height={347}
                  className={`rounded-[12px] object-cover w-full h-full`}
                  layout="full" // Specify the desired height
                  objectFit="cover"
                  objectPosition="center"
                  quality={100}
                  priority
                />
              </div>
              <div className="absolute z-50 top-[257px] left-[32px]">
                <MarketerImage propertyData={propertyData && propertyData} />
              </div>
              {/* <div className="  w-[100%] flex items-center gap-5"> */}
              <div className="flex items-center justify-between w-full pl-[225px] py-1">
                <div className="flex items-start flex-col gap-[5px]">
                  <p className="text-[32px] text-[#4E4E4E] font-[700] leading-[45.36px]">
                    [Marketer’s Business Name]
                  </p>
                  <p className="text-[18px] text-[#4E4E4E] font-[500] leading-[30px]">
                    Marketer
                  </p>
                </div>

                <div className="flex items-center gap-[16px] pb-6">
                  <button
                    className="bg-[#006AFF] w-fit text-[14px]  text-white rounded-[4px] border  h-[37px] px-[12px] py-[8px] text-center font-[400]"
                    // onClick={() => onSubmit("promotePage")}
                  >
                    Promote page
                  </button>
                  <button
                    className="border-[#006AFF] w-fit text-[14px] text-[#006AFF] font-[400] h-[37px] px-[12px] py-[8px] rounded-[4px] border text-center flex items-center gap-2"
                    onClick={handleSharePage}
                  >
                    <span>Share page</span>
                    <Image
                      src="/static/images/send-2.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>

            <section className="flex justify-between items-center filter mt-10 border-t pt-5">
              <div className="flex items-center gap-[16px] ">
                <button
                  className={`flex text-[14px] py-2 px-4 items-center justify-center font-[500] h-[37px] rounded-[4px] ${
                    tabName === "properties"
                      ? "bg-BlueHomz text-white"
                      : "text-[#006AFF] hover:bg-blue-200 bg-[#EEF5FF]"
                  }`}
                  onClick={() => setTabName("properties")}
                >
                  Properties
                  {/* className="bg-white py-[2px] px-[10px] flex justify-center items-center rounded-[16px] ml-2" */}
                  <span
                    className={`py-[2px] px-[10px] flex justify-center items-center text-[11px] leading-[16.5px] font-[400] rounded-[16px] ml-2 ${
                      tabName != "properties"
                        ? "bg-BlueHomz text-white"
                        : "text-BlackHomz hover:bg-blue-200 bg-[#EEF5FF]"
                    }`}
                  >
                    <span className="">{properties.length || "0"}</span>
                  </span>
                </button>
                {/* className="border-[#006AFF] w-fit text-[14px] text-[#006AFF] font-[400] h-[37px] px-[12px] py-[8px] rounded-[4px] border text-center flex items-center gap-2" */}
                <button
                  onClick={() => setTabName("profile")}
                  className={`flex text-[14px] py-2 px-4 items-center justify-center rounded-[4px] h-[37px] font-[500] ${
                    tabName === "profile"
                      ? "bg-BlueHomz text-white"
                      : "text-[#006AFF] hover:bg-blue-200 bg-[#EEF5FF]"
                  }`}
                >
                  Company Profile
                </button>
              </div>
              <div className="flex gap-1 ">
                <div className="relative w-[255px] rounded-[4px]">
                  <input
                    type="text"
                    className="border h-[37px] pl-8 rounded-[4px] w-full text-[14px] font-[500]"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                  />
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/header/search-normal.png"
                    }
                    alt=""
                    className="absolute top-3 left-3"
                    height={14}
                    width={14}
                  />
                </div>
                <div className="">
                  <Dropdown
                    options={options3}
                    onSelect={(option) => setSelectedProperty(option)}
                    selectOption={
                      selectedProperty === null
                        ? "Property Type"
                        : selectedProperty
                    }
                    className={
                      "text-[14px] w-[148px] font-[500] text-GrayHomz2"
                    }
                  />
                </div>
                <div className="">
                  <Dropdown
                    options={options4}
                    onSelect={(option) => setSelectedRooms(option)}
                    selectOption={
                      selectedRooms === null ? "Bedroom" : selectedRooms
                    }
                    className={
                      "w-[148px] text-[14px] font-[500] text-GrayHomz2"
                    }
                  />
                </div>

                <button
                  className="adminBorders  border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex gap-1 text-white px-[12px] py-[8px] rounded-[4px] h-[37px] w-[75px] cursor-pointer  justify-center"
                  onClick={handleSearch}
                >
                  {!isLoading ? (
                    <span>Search</span>
                  ) : (
                    <ThreeDots color="#ffffff" />
                  )}
                </button>
              </div>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-[30px] mt-8 w-full">
              <div className=" w-[100%] flex flex-col gap-[12p] ">
                {tabName === "properties" && (
                  <div className="w-full">
                    <MiniPropertyListings
                      reset={linkToSearch}
                      setLoadingII={setLoading}
                      Properties={properties}
                      padding={"md:px-0"}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handleNext={handleNextPage}
                      handlePageClick={handlePageClick}
                      handlePrev={handlePrevPage}
                      firstThreePages={firstThreePages}
                      lastThreePages={lastThreePages}
                    />
                  </div>
                )}
                {tabName === "profile" && (
                  <div className="w-full flex flex-col gap-[24px]">
                    <p className="text-[18px] font-[500] leading-[27px]">
                      About [Marketer’s Business Name]
                    </p>
                    <p className="break-words leading-[24px] font-[400] ">
                      {word}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col  gap-[24px]">
                <OwnersCard propertyData={propertyData && propertyData} />
                <RequestCard />
                <div className=" flex flex-col gap-4 h-fit border border-[#559CFF] rounded-[12px] p-[20px] w-[100%] bg-[#EEF5FF]">
                  <p className="breakwords font-[400] text-[#006AFF] leading-[19.5px] text-[13px] ">
                    Can’t find the property you are looking for?
                  </p>
                  <button className="text-white bg-[#006AFF] py-[8px] px-[12px] rounded-[4px]  text-[14px] leading-[16.5px] font-[400]">
                    Post a property request
                  </button>
                </div>
              </div>
            </section>
          </div>
        )
      )}
    </div>
  );
};

export default MarketerBusinessPage;

let word = `Lorem ipsum dolor sit amet consectetur. Diam quis enim congue congue. Et sapien libero vitae adipiscing. Integer metus enim mi mauris donec scelerisque nisi ut. Sed felis ut tempor egestas nibh. Luctus leo aliquet mauris faucibus tristique. Faucibus bibendum massa nisl consectetur id massa ornare. Felis ultricies in sit elementum. Adipiscing sapien enim placerat mauris ultrices id. Magna vulputate aliquam eget mattis faucibus cursus mattis scelerisque. Aliquet viverra aliquam imperdiet libero dignissim a aliquet duis. Aliquet volutpat bibendum amet dignissim enim dictumst justo.
Elementum eu duis amet ullamcorper morbi. Consequat vel placerat magna scelerisque vestibulum. Pellentesque vitae enim massa porta amet vulputate sit. In lacinia diam nulla morbi pellentesque lobortis. Semper eget in maecenas consequat amet vestibulum. Pellentesque elit eu pretium cursus vestibulum dictum id. In aliquam interdum convallis at. Nullam ut ligula ipsum at commodo feugiat rhoncus. Facilisis donec aliquam pretium leo non.
Nulla euismod nunc eget in vitae in tristique mattis. Ut odio congue lorem aliquam cursus varius lectus. Vitae dolor nascetur ac quam. Laoreet diam nibh viverra pharetra proin suspendisse lobortis nulla tempus. Ultricies donec sit non pellentesque aliquet egestas mattis.
`;
