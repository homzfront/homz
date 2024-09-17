"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropertyCard from "./components/propertyCard";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Dropdown from "./components/dropDownFilter";
// import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import BusinessAlert from "@/components/icons/businessAlert";
import useClickOutside from "@/utils/clickOutside";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import ThreeDots from "@/components/mainmenu/ThreeDotsLoader";
import { useRouter, usePathname } from "next/navigation";
import Button from "@/components/mainmenu/button";

const ListedProperties = ({
  property,
  promoteOption,
  setSelectedOption,
  selectedOptions,
  cancelSelectedOption,
  handlePageNumber,
  refreshData,
  filterData,
  setOpenPlanModal,
  setPromotePropertry,
  setErrorModal,
  setStatusName,
  // subsciptionStatus,
}) => {
  // console.log(property)
  const ITEMS_PER_PAGE = 8;
  const [filteredData, setFilteredData] = useState([]);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabName, setTabName] = useState("all");
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false)); // Use the custom hook
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(
    property.data?.results?.[0].metadata[0].page || 1
  );
  const totalPages = Math.ceil(property?.data?.totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const [firstThreePages, setFirstThreePages] = useState([]);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const clear = () => {
    setSelectedProperty(null);
    setSelectedState(null);
    setSelectedArea(null);
    setSelectedRooms(null);
    setSearchQuery("");
    refreshData();
  };

  useEffect(() => {
    if (property) {
      setFilteredData(property?.data?.results?.[0].data);
    }
  }, [property]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    const propertyStatus = urlParams.get("propertystatus");
    setTabName(propertyStatus || "all");
    setCurrentPage(page ? parseInt(page, 10) : 1); // Default to page 1 if no page param is found
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading2(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading2(false);
    };

    router?.events?.on("routeChangeStart", handleRouteChangeStart);
    router?.events?.on("routeChangeComplete", handleRouteChangeComplete);

    // Cleanup the event listeners on component unmount
    return () => {
      router?.events?.off("routeChangeStart", handleRouteChangeStart);
      router?.events?.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  function pageManagement(num, status) {
    let newUrl = pathName;
    // Handle page parameter
    if (num) {
      newUrl = newUrl.includes("?")
        ? `${newUrl}&page=${num}`
        : `${newUrl}?page=${num}`;
    }
    // Handle propertystatus parameter
    if (status) {
      newUrl = newUrl.includes("?")
        ? `${newUrl}&propertystatus=${status}`
        : `${newUrl}?propertystatus=${status}`;
    }
    router.push(newUrl, { scroll: false, swallow: true });
  }

  useEffect(() => {
    const newFirstThreePages = Array.from(
      { length: Math.min(totalPages, 3) },
      (_, index) => index + 1
    );
    setFirstThreePages(newFirstThreePages);
  }, [totalPages]);

  const handleNext = () => {
    const nextPageNumber = pageNumber + 1;
    pageManagement(nextPageNumber, tabName);
    setPageNumber(nextPageNumber);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const newFirstThreePages = Array.from(
      { length: Math.min(totalPages - nextPageNumber + 1, 3) },
      (_, index) => nextPageNumber + index
    );

    // Update the state for firstThreePages
    setFirstThreePages(newFirstThreePages);
    const filterParams = filterQueryParams(tabName);
    handlePageNumber(nextPageNumber, filterParams);
  };

  const handlePrev = () => {
    const prevPageNumber = Math.max(pageNumber - 1, 1);
    pageManagement(prevPageNumber, tabName);
    setPageNumber(prevPageNumber);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    const newFirstThreePages = Array.from(
      { length: Math.min(totalPages - prevPageNumber - 1, 3) },
      (_, index) => prevPageNumber + index
    );

    // Update the state for firstThreePages
    setFirstThreePages(newFirstThreePages);
    const filterParams = filterQueryParams(tabName);
    handlePageNumber(prevPageNumber, filterParams);
  };

  const lastThreePagesStart = Math.max(totalPages - 2, 1);
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );

  const handlePageClick = (page) => {
    pageManagement(page, tabName);
    setPageNumber(page);
    setCurrentPage(page);
    const filterParams = filterQueryParams(tabName);
    handlePageNumber(page, filterParams);
  };
  const closeSaveToDraftModal = () => {
    setSuccessModalIsOpen(false);
    cancelSelectedOption();
    // router.back()
  };

  const openMobileModal = () => {
    setMobileModalIsOpen(true);
    // setDataProperties(data);
  };
  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };
  const options = [
    ...new Set(property.data?.results?.[0].data?.map((item) => item?.state)),
  ];

  const options2 = [
    ...new Set(property.data?.results?.[0].data?.map((item) => item?.area)),
  ];

  const options3 = [
    ...new Set(
      property.data?.results?.[0].data?.map((item) => item?.propertyType)
    ),
  ];

  const options4 = [
    ...new Set(
      property.data?.results?.[0].data?.map((item) => item?.numberOfBathrooms)
    ),
  ];

  const HandleFilter = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const filteredData = property.data?.results?.[0].data?.filter(
          (data) => {
            const matchesState =
              !selectedState || data?.state === selectedState;
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
            return (
              matchesState && matchesArea && matchesSearchQuery && bathrooms
            );
          }
        );
        // console.log(filteredData);
        setFilteredData(filteredData);
        setIsLoading(false);
      } catch (error) {
        // console.error(error);
        setIsLoading(false);
      }
    }, 2000);
  };

  const filterQueryParams = (status) => {
    const filterParams = {
      is_published: status === "published" ? true : undefined,
      is_promoted: status === "promoted" ? true : undefined,
      is_unpublished: status === "unpublished" ? true : undefined,
    };
    return filterParams;
  };
  const refetchData = (propertyStatus) => {
    // console.log(propertyStatus)
    const filterParams = filterQueryParams(propertyStatus);
    refreshData(propertyStatus);
  };

  const handlePropertyStatus = (status) => {
    // console.log(status);
    setStatusName(status);
    setTabName(status);
    pageManagement("", status);
    refetchData(status);
  };

  return (
    <div className=" mb-10 md:px-4">
      {/* {isLoading2 && <Loading />} */}

      {openModalForBusi && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
          <div
            ref={dropdownRef}
            className="bg-white w-[464px] h-[290px] rounded-[12px] flex flex-col p-8 items-center justify-around"
          >
            <BusinessAlert />
            <p className="text-[20px] font-[700] text-BlackHomz">
              Update Business Information
            </p>
            <p className="text-[16px] font-[400] text-GrayHomz text-center">
              Kindly upload your business certification in order to list more
              properties
            </p>
            <Link
              href={"/dashboard/list_Property/Profile?tab=business"}
              className="w-full h-[48px] bg-BlueHomz rounded-[4px] flex items-center justify-center"
            >
              <span className="text-white text-[16px] font-[700]">
                Upload Certificate
              </span>
            </Link>
          </div>
        </div>
      )}
      <div className="flex justify-between md:hidden w-full ">
        <div className="relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by state or area "
          />
          <Image
            src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
            alt=""
            className="absolute top-3 left-3"
            height={16}
            width={16}
          />
        </div>
        <div className="border rounded-[4px] p-[10px] flex justify-center items-center border-BlueHomz ">
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
      <div className="dashboard flex md:justify-between w-fit md:w-full mt-6 md:mt-0 ">
        <div className="flex w-full flex-wrap md:gap-[8px] gap-[8px]">
          <button
            className={`py-[8px] px-[12px] rounded-[4px] h-[37px] md:text-[14px] text-[11px] leading-[13.86px] w-fit md:leading-[21px] font-[500] ${
              tabName === "all"
                ? "bg-BlueHomz text-white"
                : "md:bg-inherit bg-[#EEF5FF] text-BlueHomz md:text-[#4E4E4E]"
            }`}
            // onClick={() => {
            //   setTabName("All");
            //   refreshData();
            // }}
            onClick={() => handlePropertyStatus("all")}
          >
            All
          </button>
          <button
            className={`py-[8px] px-[12px] md:text-[14px] text-[11px] leading-[13.86px] md:leading-[21px] w-fit ${
              tabName === "published"
                ? "bg-BlueHomz text-white"
                : "md:bg-inherit bg-[#EEF5FF] text-BlueHomz md:text-[#4E4E4E]"
            } rounded-[4px] h-[37px] font-[500]`}
            onClick={() => handlePropertyStatus("published")}
          >
            Published
          </button>
          <button
            className={`py-[8px] px-[12px] md:text-[14px] text-[11px] w-fit leading-[13.86px] md:leading-[21px] ${
              tabName === "promoted"
                ? "bg-BlueHomz text-white"
                : "md:bg-inherit bg-[#EEF5FF] text-BlueHomz md:text-[#4E4E4E]"
            } rounded-[4px] h-[37px] font-[500]`}
            onClick={() => handlePropertyStatus("promoted")}
          >
            Promoted
          </button>
          <button
            className={`flex items-center justify-center py-[8px] px-[12px] w-fit ${
              tabName === "unpublished"
                ? "bg-BlueHomz text-white"
                : "md:bg-inherit bg-[#EEF5FF] text-BlueHomz md:text-[#4E4E4E]"
            } rounded-[4px] h-[37px] md:text-[14px] text-[11px] leading-[13.86px] md:leading-[21px] font-[500]`}
            onClick={() => handlePropertyStatus("unpublished")}
          >
            Unpublished
          </button>
          {/* <button
            className={`py-[8px] px-[12px] rounded-[4px] w-fit ${
              tabName === "Drafts"
                ? "bg-BlueHomz text-white"
                : "md:bg-inherit bg-[#EEF5FF] text-BlueHomz md:text-[#4E4E4E]"
            } h-[37px] md:text-[14px] text-[11px] leading-[13.86px] md:leading-[21px] font-[500]`}
            onClick={() => setTabName("Drafts")}
          >
            Drafts
          </button> */}
        </div>
        <div className="hidden md:flex gap-1 filter">
          <p className="text-[#4E4E4E]  text-[14px] leading-[21px] font-[500] mb-2 pt-2 mr-2"></p>

          <button
            className="border  border-[#006AFF] text-[#006AFF] items-center text-[14px] font-[500] flex gap-1 px-[12px] py-[8px] rounded-[4px] h-[37px] w-[104px] cursor-pointer  justify-center"
            onClick={openMobileModal}
          >
            <Image
              src={"/static/images/filter.svg"}
              alt=""
              height={17}
              width={16}
            />
            <span> All Filter</span>
          </button>
        </div>
      </div>

      <PropertyCard
        Property={filteredData}
        setTabName={setTabName}
        pageManagement={pageManagement}
        promoteOptions={promoteOption}
        setSelectedProperty={setSelectedOption}
        selectedProperty={selectedOptions}
        refreshData={refreshData}
        setOpenPlanModal={setOpenPlanModal}
        setPromotePropertry={setPromotePropertry}
        setErrorModal={setErrorModal}
      />
      <div className="mt-16">
        <Button
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          lastThreePages={lastThreePages}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
          pixel="px-0"
        />
      </div>
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white border flex flex-col w-[350px] h-auto px-[16px] py-[24px]  rounded-[12px] gap-[20px]">
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
          <div className="grid  gap-4">
            <div className="flex gap-[8px]">
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedState(option)}
                selectOption={selectedState === null ? "State" : selectedState}
                className={
                  "text-[14px] font-[500] text-GrayHomz2 w-[100%] md:w-[155px]"
                }
              />

              <Dropdown
                options={options2}
                onSelect={(option) => setSelectedArea(option)}
                selectOption={selectedArea === null ? "Area" : selectedArea}
                className={
                  "w-[100%] md:w-[155px] text-[14px] font-[500] text-GrayHomz2"
                }
              />
            </div>
            <div className="flex gap-[8px]">
              <Dropdown
                options={options3}
                onSelect={(option) => setSelectedProperty(option)}
                selectOption={
                  selectedProperty === null ? "Property Type" : selectedProperty
                }
                className={
                  "w-[100%] md:w-[155px] text-[14px] font-[500] text-GrayHomz2"
                }
              />
              {/* </div> */}
              {/* <div className="w-[100%] md:w-[155px]"> */}
              <Dropdown
                options={options4}
                onSelect={(option) => setSelectedRooms(option)}
                selectOption={
                  selectedRooms === null
                    ? "Bedroom"
                    : selectedRooms === 1
                    ? `${selectedRooms} Bedroom`
                    : `${selectedRooms} Bedrooms`
                }
                className={
                  "w-[100%] md:w-[155px]  text-[14px] font-[500] text-GrayHomz2"
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <button
              className="border w-full h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[700]  text-white flex justify-center  rounded-[4px] cursor-pointer "
              onClick={HandleFilter}
            >
              {!isLoading ? (
                <>
                  <span>Filter</span>
                </>
              ) : (
                <ThreeDots color="#ffffff" />
              )}
            </button>
            <button
              className="border w-full h-[42px] p-[12px] border-[#006AFF] text-[#006AFF] gap-1 items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer "
              onClick={() => clear()}
            >
              <span>
                <Image
                  src={"/static/images/clear-Blue-repeat.svg"}
                  alt=""
                  height={17}
                  width={16}
                />
              </span>
              <span className="text-[14px] leading-[17.64px] text-[500]">
                Reset
              </span>
            </button>
          </div>
        </div>
      </CustomizedModal>

      <SuccessModal
        isOpen={successModalIsOpen}
        title="Promotion Successful"
        handleEvent={closeSaveToDraftModal}
        successText="Promotion is currently under review and will be live within 8 hours."
        optionalText="View listed properties"
      />
    </div>
  );
};

export default ListedProperties;
