"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MiniPropertyListings from "./miniPropertyListings";
// import timeAgo from "@/utils/timeAgo";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { fetchSinglePropertyPublic } from "@/api/propertyService";
import api from "@/utils/api";
import LoadingII from "@/components/mainmenu/loadingII";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import OwnersCard from "./ownersCard";
import RequestCard from "../search-page/PreviewProperty/requestCard";
import MarketerImage from "./imageUpload";
import Dropdown from "./dropDownFilter";
import ThreeDots from "../../components/mainmenu/ThreeDotsLoader";
import { listingMarketerProfile } from "@/api/listingServices";
import PropertyRequest from "@/components/mainmenu/propertyRequest";
import SuccessModal from "@/components/mainmenu/SuccessModal";

const MarketerBusinessPage = ({ marketerId }) => {
  // console.log(marketerId)
  const [tabName, setTabName] = useState("properties");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [OpenSuccessModal, setOpenSuccessModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState(null);
  const [openPropertyReq, setOpenPropertyReq] = useState(false);
  const [currentPage, setCurrentPage] = useState("1");
  const urlParams = useSearchParams();
  const [filters, setFilters] = useState({
    search: urlParams.get("search") || null,
    propertyType: urlParams.get("propertyType") || null,
    listingType: urlParams.get("listingType") || null,
    minPrice: parseInt(urlParams.get("minPrice")) || null,
    maxPrice: parseInt(urlParams.get("maxPrice")) || null,
    numberOfBathrooms: parseInt(urlParams.get("numberOfBathrooms")) || null,
  });

  const router = useRouter();
  let urlEndPoint = `/properties/${marketerId}/marketerproperties`;
  const fetchPropertyData = async (url) => {
    try {
      const response = await api.get(url);
      let dataResult = response.data.data.results[0].data;
      // console.log(response);
      const total = dataResult.length || 0;
      setTotalPages(Math.ceil(total / 9));
      setProperties(dataResult);
      return dataResult;
    } catch (error) {
      // console.log(error);
      setProperties([]);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const fetchMarketerProfile = () => {
    listingMarketerProfile(marketerId)
      .then((results) => {
        // console.log(results?.data);
        setData(results?.data);
      })
      .catch((error) => {
        // console.log(error);
        return error;
      });
  };
  useEffect(() => {
    fetchPropertyData(urlEndPoint);
    fetchMarketerProfile();
  }, []);

  //  console.log(data);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    handleFilterChange("search", value);
    // setParams(true);
  };

  const goBack = () => {
    router.back();
  };
  const [loading, setLoading] = useState(true);
  const reset = () => {
    setSearchQuery("");
    setSelectedProperty("");
    setSelectedRooms("");
    fetchPropertyData(urlEndPoint);
  };

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
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const options3 = [...new Set(properties?.map((item) => item?.propertyType))];

  const options4 = [
    ...new Set(properties?.map((item) => item?.numberOfBathrooms)),
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let query = `/properties/${marketerId}/marketerproperties?numberOfBathrooms=${
      selectedRooms && selectedRooms
    }&propertyType=${selectedProperty && selectedProperty}&state=${
      searchQuery && searchQuery
    }`;
    setTimeout(async () => {
      try {
        const filteredData = await fetchPropertyData(query);
        // console.log(filteredData)
        if (filteredData?.response?.data?.success === false) {
          return;
        }
        setTotalPages(Math.ceil(filteredData.length / 9));
        setProperties(filteredData);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }, 2000);
  };
  const link = () => {
    let link;
    const query = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        query[key] = filters[key];
      }
    });
    if (filters) {
      link = `/search-page/PropertyListing/?page=1&${new URLSearchParams(
        query
      ).toString()}`;
      return link;
    }
  };
  return (
    <div className="w-full max-w-[1440px] m-auto">
      {loading ? (
        <LoadingII />
      ) : (
        data && (
          <div className="w-full pt-10 md:pt-8 pb-1 md:px-[70px] px-5">
            <div className="w-full  sm:flex md:justify-between items-center gap-[4rem] md:gap-0">
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
                  className="hidden sm:block"
                />
                <p className="text-[11px] font-[400] hidden sm:block">
                  Go Back
                </p>
              </div>
            </div>
            <div className="flex gap-[7px] sm:hidden w-full ">
              <span
                className="sm:hidden bg-[#EEF5FF] w-[40px] flex items-center justify-center h-[40px] p-[4px] rounded-[8px]"
                onClick={goBack}
              >
                <Image
                  src="/static/images/blue-arrow-left.svg"
                  width={20}
                  height={20}
                  alt=""
                />
              </span>
              <div className="searchPane relative w-[86%] rounded-[4px]">
                <input
                  type="text"
                  className="border h-[40px] pl-8 rounded-[4px] w-full"
                  id="search"
                  placeholder="Search"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/header/search-normal.png"
                  }
                  alt=""
                  className="absolute top-[14.8px] left-3"
                  height={15}
                  width={15}
                  onClick={() => {
                    handleSearchChange;
                  }}
                />
              </div>

              <Link
                href={link() !== null ? link() : ""}
                className=" rounded-[4px] p-[10px] h-[40px] border border-[#006AFF] hover:border-blue-600 flex justify-center items-center"
              >
                {/* <button
                  // onClick={openMobileModal}
                  className=" rounded-[4px] p-[10px] h-[40px] border border-[#006AFF] hover:border-blue-600"
                > */}
                <Image
                  src="/static/images/filter.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                {/* </button> */}
              </Link>
            </div>
            <div className="sm:block mt-6 relative h-fit">
              <div className="sm:h-[347px] h-[173px] rounded-[12px] w-fit">
                <Image
                  src="/static/images/marketerImage.png"
                  alt=""
                  width={1024}
                  height={347}
                  className={`rounded-[12px] sm:object-cover w-full sm:h-full h-[173px]`}
                  quality={100}
                  priority
                />
              </div>
              <div className="absolute z-50 sm:top-[257px] sm:left-[32px] top-[127px] left-[15px]">
                <MarketerImage propertyData={data && data?.businessInfo} />
              </div>
              {/* <div className="  w-[100%] flex items-center gap-5"> */}
              <div className="flex items-center sm:justify-between justify-end  w-full sm:pl-[225px] py-2 h-fit">
                <div className="hidden sm:flex items-start flex-col gap-[5px]">
                  <p className="text-[32px] text-[#4E4E4E] font-[700] leading-[45.36px]">
                    {data?.businessInfo?.businessName}
                  </p>
                  <p className="text-[18px] text-[#4E4E4E] font-[500] leading-[30px]">
                    Marketer
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-[16px] pb-6">
                  {/* {currentUser != "users" && (
                    <button
                      className="sm:bg-[#006AFF] w-fit text-[14px] text-[#006AFF] sm:text-white rounded-[4px] sm:border  sm:h-[37px] sm:px-[12px] sm:py-[8px] text-center font-[500]"
                      // onClick={() => onSubmit("promotePage")}
                    >
                      Promote page
                    </button>
                  )} */}
                  <button
                    className="sm:border-[#006AFF] w-fit text-[14px] sm:text-[#006AFF] bg-[#EEF5FF] font-[400] h-[37px] sm:px-[12px] sm:py-[8px] py-[8px] px-[16px] rounded-[4px] sm:border text-center flex items-center sm:gap-2"
                    onClick={handleSharePage}
                  >
                    <span className="hidden sm:block">Share page</span>
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

            <section className="flex justify-between items-center filter sm:mt-10 sm:border-t sm:pt-5">
              <div className="flex items-center sm:gap-[16px] gap-2 ">
                <button
                  className={`flex text-[12.5px] sm:text-[14px] py-2 px-4 leading-[21px]  items-center justify-center font-[500] h-[37px] rounded-[4px] ${
                    tabName === "properties"
                      ? "bg-BlueHomz text-white"
                      : "text-[#006AFF] hover:bg-blue-200 bg-[#EEF5FF]"
                  }`}
                  onClick={() => setTabName("properties")}
                >
                  Properties
                  {/* className="bg-white py-[2px] px-[10px] flex justify-center items-center rounded-[16px] ml-2" */}
                  <span
                    className={`sm:py-[2px] sm:px-[10px] px-[7px] py-[1px] flex justify-center items-center text-[11px] leading-[16.5px] font-[400] rounded-[16px] ml-2 ${
                      tabName != "properties"
                        ? "bg-BlueHomz text-white"
                        : "text-BlackHomz hover:bg-blue-200 bg-[#EEF5FF]"
                    }`}
                  >
                    <span className="">
                      {(properties && properties.length) || "0"}
                    </span>
                  </span>
                </button>
                {/* className="border-[#006AFF] w-fit text-[14px] text-[#006AFF] font-[400] h-[37px] px-[12px] py-[8px] rounded-[4px] border text-center flex items-center gap-2" */}
                <button
                  onClick={() => setTabName("profile")}
                  className={`flex text-[12.5px] sm:text-[14px] py-2 px-4 leading-[21px] items-center justify-center rounded-[4px] h-[37px] font-[500] ${
                    tabName === "profile"
                      ? "bg-BlueHomz text-white"
                      : "text-[#006AFF] hover:bg-blue-200 bg-[#EEF5FF]"
                  }`}
                >
                  Company Profile
                </button>
              </div>

              <form onSubmit={handleSearch} className="hidden sm:flex gap-1 ">
                <div className="relative w-[255px] rounded-[4px]">
                  <input
                    type="text"
                    className="border h-[37px] pl-8 rounded-[4px] w-full text-[14px] font-[500]"
                    id="search"
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(capitalizeFirstLetter(e.target.value))
                    }
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
                      selectedProperty === ""
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
                      selectedRooms === "" ? "Bedroom" : selectedRooms
                    }
                    className={
                      "w-[148px] text-[14px] font-[500] text-GrayHomz2"
                    }
                  />
                </div>

                <button
                  className="adminBorders  border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex gap-1 text-white px-[12px] py-[8px] rounded-[4px] h-[37px] w-[75px] cursor-pointer  justify-center"
                  onClick={(e) => handleSearch(e)}
                  type="submit"
                >
                  {!isLoading ? (
                    <span>Search</span>
                  ) : (
                    <ThreeDots color="#ffffff" />
                  )}
                </button>
                <button
                  className="border w-fit px-[12px] py-[8px] h-[37px] border-[#006AFF] text-[#006AFF] gap-1 items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer "
                  onClick={reset}
                  type="reset"
                >
                  <span>
                    <Image
                      src={"/static/images/clear-Blue-repeat.svg"}
                      alt=""
                      height={17}
                      width={16}
                    />
                  </span>
                </button>
              </form>
            </section>
            <div className="sm:hidden mt-8">
              <OwnersCard data={data} />
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-[30px] mt-8 w-full">
              <div className=" w-[100%] flex flex-col gap-[12p] ">
                {tabName === "properties" && (
                  <div className="w-full">
                    <MiniPropertyListings
                      // reset={linkToSearch}
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
                    <p className="sm:text-[18px] font-[500] leading-[27px]">
                      About {data?.businessInfo?.businessName}
                    </p>
                    <p className="break-words leading-[24px] font-[400] sm:text-[16px] text-[14px]">
                      {data?.businessInfo?.businessDescription}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col  gap-[24px]">
                <div className="hidden sm:block">
                  <OwnersCard data={data} />
                </div>
                {tabName === "properties" && (
                  <>
                    <RequestCard />
                    <div className=" flex flex-col gap-4 h-fit border border-[#559CFF] rounded-[12px] p-[20px] w-[100%] bg-[#EEF5FF]">
                      <p className="breakwords font-[400] text-[#006AFF] leading-[19.5px] text-[13px] ">
                        Can’t find the property you are looking for?
                      </p>
                      <button
                        className="text-white bg-[#006AFF] py-[8px] px-[12px] rounded-[4px]  text-[14px] leading-[16.5px] font-[400]"
                        onClick={() => setOpenPropertyReq(true)}
                      >
                        Post a property request
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        )
      )}
      {/*  */}
      <PropertyRequest
        isOpen={openPropertyReq}
        setOpenPropertyReq={setOpenPropertyReq}
        setOpenSuccessModal={setOpenSuccessModal}
      />
      <SuccessModal
        isOpen={OpenSuccessModal}
        title="Property Request Sent Successfully"
        handleEvent={() => setOpenSuccessModal(false)}
      />
    </div>
  );
};

export default MarketerBusinessPage;

// let word = `Lorem ipsum dolor sit amet consectetur. Diam quis enim congue congue. Et sapien libero vitae adipiscing. Integer metus enim mi mauris donec scelerisque nisi ut. Sed felis ut tempor egestas nibh. Luctus leo aliquet mauris faucibus tristique. Faucibus bibendum massa nisl consectetur id massa ornare. Felis ultricies in sit elementum. Adipiscing sapien enim placerat mauris ultrices id. Magna vulputate aliquam eget mattis faucibus cursus mattis scelerisque. Aliquet viverra aliquam imperdiet libero dignissim a aliquet duis. Aliquet volutpat bibendum amet dignissim enim dictumst justo.
// Elementum eu duis amet ullamcorper morbi. Consequat vel placerat magna scelerisque vestibulum. Pellentesque vitae enim massa porta amet vulputate sit. In lacinia diam nulla morbi pellentesque lobortis. Semper eget in maecenas consequat amet vestibulum. Pellentesque elit eu pretium cursus vestibulum dictum id. In aliquam interdum convallis at. Nullam ut ligula ipsum at commodo feugiat rhoncus. Facilisis donec aliquam pretium leo non.
// Nulla euismod nunc eget in vitae in tristique mattis. Ut odio congue lorem aliquam cursus varius lectus. Vitae dolor nascetur ac quam. Laoreet diam nibh viverra pharetra proin suspendisse lobortis nulla tempus. Ultricies donec sit non pellentesque aliquet egestas mattis.
// `;
// const filteredData = properties?.filter((data) => {
//   const matchesState = !selectedState || data?.state === selectedState;
//   const matchesArea = !selectedArea || data?.area === selectedArea;
//   const matchesSearchQuery =
//     !searchQuery ||
//     data?.location.state
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase()) ||
//     data?.location.area
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//   const bathrooms =
//     !selectedRooms || data?.numberOfBathrooms === selectedRooms;
//   return matchesState && matchesArea && matchesSearchQuery && bathrooms;
// });
// console.log(filteredData);

// useEffect(() => {
//   const fetchData = async () => {
//     setLoading(true);
//     const response = await api.get(`/public/properties/others`);
//     const propertyData = response?.data?.data || null;
//     // console.log(propertyData)
//     const total = propertyData.length || 0;
//     setTotalPages(Math.ceil(total / 9));
//     // setProperties(propertyData);
//     setLoading(false);
//   };
//   fetchData();
// }, []);

// const clear = () => {
//   setSelectedProperty(null);
//   setSelectedRooms(null);
//   setSearchQuery("");
//   setFilteredData(property);
// };
// useEffect(() => {
//   const propertyData = async () => {
//     const response = await fetchSinglePropertyPublic(id);
//     const property = await response;
//     setPropertyData(property?.data);
//     setLoading(false);
//   };
//   propertyData();
// }, [PropertyID]);

// useEffect(() => {
//   if (propertyData && propertyData.coverPhoto && propertyData.photos) {
//     const newData = {
//       coverPhoto: propertyData.coverPhoto,
//       photos: propertyData.photos,
//     };
//     const combinedData = [newData.coverPhoto, ...newData.photos].map(
//       (item) => ({
//         url: item.url,
//       })
//     );
//     setCombinedData(combinedData);
//   } else {
//     // console.error("Invalid or missing data structure.");
//   }
// }, [propertyData]);

// useEffect(() => {
//   // Update remainder state when combinedData length changes
//   if (combinedData.length === 8) {
//     setRemainder(combinedData.length - 7);
//   }
// }, [combinedData]);

// useEffect(() => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const user = urlParams.get("user");
//   setCurrentUser(user);
// }, []);

// const openMobileModal = () => {
//   setMobileModalIsOpen(true);
// };

//   <CustomizedModal
//   isOpen={mobileModalIsOpen}
//   onRequestClose={closeMobileModal}
// >
//   <div className="bg-white border flex flex-col w-[350px] h-[320px]  py-[24px] px-4 rounded-[12px] gap-[18px]">
//     <div className=" flex items-center justify-between">
//       <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
//         Filter by
//       </p>

//       <div>
//         <button onClick={closeMobileModal} className="cursor-pointer">
//           <Image
//             src="/static/images/close-square.svg"
//             height={24}
//             width={24}
//             alt=""
//           />
//         </button>
//       </div>
//     </div>
//     <div className="flex justify-between">
//       <div>
//         <PropertyType
//           getPropertyType={handleSearch}
//           className={"w-[150px]"}
//           selectOption={`${
//             filters?.propertyType === null
//               ? "Property Type"
//               : capitalizeFirstLetter(filters?.propertyType)
//           }`}
//         />
//       </div>
//       <div>
//         <Bedroom
//           getBedrooms={handleSearch}
//           className={"w-[150px]"}
//           selectOption={`${
//             filters?.numberOfBathrooms === null
//               ? "Number of bedrooms"
//               : `${filters?.numberOfBathrooms} Bedrooms`
//           }`}
//         />
//       </div>
//     </div>
//     <div className="flex justify-between">
//       <div className="">
//         <MinPrice
//           getPrice={handleSearch}
//           className={"w-[150px]"}
//           selectOption={`${
//             filters?.minPrice === null
//               ? "Min Price"
//               : addCommasToNumberWithoutN(filters?.minPrice)
//           }`}
//         />
//       </div>
//       <div>
//         <Listing
//           getState={handleSearch}
//           className={"w-[150px]"}
//           selectOption={`${
//             filters?.listingType === null
//               ? "Listing Type"
//               : capitalizeFirstLetter(filters?.listingType)
//           }`}
//         />
//       </div>
//     </div>
//     <div className="w-full flex flex-row gap-4">
//       <button
//         className="border w-[70%] h-[42px] p-[12px] border-BlueHomz text-white bg-BlueHomz items-center text-[14px] font-[500] flex justify-center gap-2 rounded-[4px] cursor-pointer mt-4"
//         onClick={closeMobileModal}
//       >
//         <Image
//           src="/static/images/white-search.svg"
//           alt=""
//           width={16}
//           height={16}
//         />
//         <span className="">Filter</span>
//       </button>
//       <button
//         className="border w-[30%] h-[42px] p-[12px] border-BlueHomz bg-white items-center text-[14px] font-[500] flex justify-center gap-1 rounded-[4px] cursor-pointer mt-4"
//         onClick={reset}
//       >
//         <span>
//           <Reset className="#006AFF" />
//         </span>
//         <span className="text-[14px] leading-[17.64px]  text-[500] text-BlueHomz">
//           Reset
//         </span>
//       </button>
//     </div>
//   </div>
// </CustomizedModal>
// const closeMobileModal = () => {
//   setMobileModalIsOpen(false);
// };
