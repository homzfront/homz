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
import Loading from "@/components/mainmenu/loading";

const EditProperty = ({
  property,
  promoteOption,
  openPromoModal,
  setSelectedOption,
  selectedOptions,
  closePromoModal,
  cancelSelectedOption,
}) => {
  // const { data, fetchData } = useProfileListingMe();
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [filteredData, setFilteredData] = useState(property);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [tabName, setTabName] = useState("All");
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false)); // Use the custom hook
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dailyWeekModal, setDailyWeekModal] = useState(false);
  const [subModal, setSubModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [totalSubPrice, setTotalSubPrice] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  let numberOfDay;
  selectedSubType === "Promote on Email blast"
    ? (numberOfDay = [...Array(5).keys()].slice(1))
    : (numberOfDay = [...Array(31).keys()].slice(1));
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleSelectDuration = (day) => {
    setSelectedDuration(day);
    let price = 500 * day;
    setTotalSubPrice(price);
    setOpenMenu(false);
  };
  const clear = () => {
    setSelectedProperty(null);
    setSelectedState(null);
    setSelectedArea(null);
    setSelectedRooms(null);
    setSearchQuery("");
    setFilteredData(property);
  };

  // console.log(data)
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

  const onSubscriptionBtnClick = () => {
    closeModal();
    setIsLoading2(true);
    setTimeout(() => {
      router.push("/subscriptionPlans");
      // setSuccessModalIsOpen(true);
    }, 2000);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSubModal(false);
    setDailyWeekModal(false);
    setSelectedDuration("");
    setTotalSubPrice("");
    setOpenMenu(false);
    setOpenInfo(false);
    closePromoModal();
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
  const options = [...new Set(property?.map((item) => item?.state))];

  const options2 = [...new Set(property?.map((item) => item?.area))];

  const options3 = [...new Set(property?.map((item) => item?.propertyType))];

  const options4 = [
    ...new Set(property?.map((item) => item?.numberOfBathrooms)),
  ];

  const HandleFilter = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const filteredData = property?.filter((data) => {
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
  const handleSelectedSubType = (text) => {
    setSelectedSubType(text);
    setModalIsOpen(false);
    setSubModal(true);
    closePromoModal();
  };
  return (
    <div className="z-20 mb-14 px-">
      {isLoading2 && <Loading />}

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
      <div className="flex justify-between md:hidden w-full">
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
        <div className="border rounded-[4px] flex justify-center items-center border-BlueHomz w-[12%]">
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
      <div className="dashboard flex sm:justify-between w-fit mt-6 sm:mt-0 sm:px-4">
        <div className="flex sm:gap-[8px] gap-[8px] ">
          <button
            className={`py-[8px] px-[12px] rounded-[4px] h-[37px] text-[14px] leading-[21px] font-[500] ${
              tabName === "All"
                ? "bg-BlueHomz text-white"
                : "sm:bg-inherit bg-[#EEF5FF] text-BlueHomz sm:text-[#4E4E4E]"
            }`}
            onClick={() => setTabName("All")}
          >
            All
          </button>
          <button
            className={`py-[8px] px-[12px] ${
              tabName === "Publish"
                ? "bg-BlueHomz text-white"
                : "sm:bg-inherit bg-[#EEF5FF] text-BlueHomz sm:text-[#4E4E4E]"
            } rounded-[4px] h-[37px] text-[14px] leading-[21px] font-[500]`}
            onClick={() => setTabName("Publish")}
          >
            Published
          </button>
          <button
            className={`py-[8px] px-[12px] ${
              tabName === "Promoted"
                ? "bg-BlueHomz text-white"
                : "sm:bg-inherit bg-[#EEF5FF] text-BlueHomz sm:text-[#4E4E4E]"
            } rounded-[4px] h-[37px] text-[14px] leading-[21px] font-[500]`}
            onClick={() => setTabName("Promoted")}
          >
            Promoted
          </button>
          <button
            className={`py-[8px] px-[12px] ${
              tabName === "Unpublish"
                ? "bg-BlueHomz text-white"
                : "sm:bg-inherit bg-[#EEF5FF] text-BlueHomz sm:text-[#4E4E4E]"
            } rounded-[4px] h-[37px] text-[14px] leading-[21px] font-[500]`}
            onClick={() => setTabName("Unpublish")}
          >
            Unpublished
          </button>
          <button
            className={`py-[8px] px-[12px] rounded-[4px] ${
              tabName === "Drafts"
                ? "bg-BlueHomz text-white"
                : "sm:bg-inherit bg-[#EEF5FF] text-BlueHomz sm:text-[#4E4E4E]"
            } h-[37px] text-[14px] leading-[21px] font-[500]`}
            onClick={() => setTabName("Drafts")}
          >
            Drafts
          </button>
        </div>
        <div className="hidden sm:flex gap-1 filter">
          <p className="text-[#4E4E4E]  text-[14px] leading-[21px] font-[500] mb-2 pt-2 mr-2"></p>
          <div className="">
            <Dropdown
              options={options}
              onSelect={(option) => setSelectedState(option)}
              selectOption={selectedState === null ? "State" : selectedState}
              className={"text-[14px] w-[100px] font-[500] text-GrayHomz2"}
            />
          </div>
          <div className="">
            <Dropdown
              options={options2}
              onSelect={(option) => setSelectedArea(option)}
              selectOption={selectedArea === null ? "Area" : selectedArea}
              className={"text-[14px] w-[90px] font-[500] text-GrayHomz2"}
            />
          </div>
          <div className="">
            <Dropdown
              options={options3}
              onSelect={(option) => setSelectedProperty(option)}
              selectOption={
                selectedProperty === null ? "Property Type" : selectedProperty
              }
              className={"text-[14px] w-[134px] font-[500] text-GrayHomz2"}
            />
          </div>
          <div className="">
            <Dropdown
              options={options4}
              onSelect={(option) => setSelectedRooms(option)}
              selectOption={selectedRooms === null ? "Bedroom" : selectedRooms}
              className={"w-[100px] text-[14px] font-[500] text-GrayHomz2"}
            />
          </div>
          <button
            className="border cursor-pointer border-BlueHomz items-center w-[40px] text-[14px] font-[500] flex text-BlueHomz px-[12px] py-[8px] rounded-[4px] h-[37px]"
            onClick={clear}
          >
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
          </button>
          <button
            className="adminBorders  border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex gap-1 text-white px-[12px] py-[8px] rounded-[4px] h-[37px] w-[75px] cursor-pointer  justify-center"
            onClick={HandleFilter}
          >
            {!isLoading ? (
              <>
                <Image
                  src={"/static/images/filter-add.svg"}
                  alt=""
                  height={17}
                  width={16}
                />
                <span>Filter</span>
              </>
            ) : (
              <ThreeDots color="#ffffff" />
            )}
          </button>
        </div>
      </div>

      <PropertyCard
        Property={filteredData}
        setModalIsOpen={setModalIsOpen}
        promoteOptions={promoteOption}
        setSelectedProperty={setSelectedOption}
        selectedProperty={selectedOptions}
      />
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white border flex flex-col w-[320px] h-auto  py-[24px] px-5 rounded-[12px] gap-[18px]">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="w-[100%]">
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedState(option)}
                selectOption={selectedState === null ? "State" : selectedState}
                className={"text-[14px] font-[500] text-GrayHomz2"}
              />
            </div>
            <div className="w-[100%]">
              <Dropdown
                options={options2}
                onSelect={(option) => setSelectedArea(option)}
                selectOption={selectedArea === null ? "Area" : selectedArea}
                className={"text-[14px] font-[500] text-GrayHomz2"}
              />
            </div>
            <div className="w-[100%]">
              <Dropdown
                options={options3}
                onSelect={(option) => setSelectedProperty(option)}
                selectOption={
                  selectedProperty === null ? "Property Type" : selectedProperty
                }
                className={"text-[14px] font-[500] text-GrayHomz2"}
              />
            </div>
            <div className="w-[100%]">
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
                className={"w-[100%] text-[14px] font-[500] text-GrayHomz2"}
              />
            </div>
          </div>
          <button
            className="border w-full h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-4"
            onClick={() => clear()}
          >
            <span>
              <Image
                src={"/static/images/white_repeat.svg"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            <span className="text-[14px] leading-[17.64px] text-[700] text-white">
              Reset
            </span>
          </button>
        </div>
      </CustomizedModal>
      <CustomizedModal
        isOpen={modalIsOpen || openPromoModal}
        onRequestClose={closeModal}
      >
        <div className="bg-white adminCellBorders flex flex-col w-full md:w-[550px] p-[28px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="flex flex-col gap-1 mb-2 ">
              <span className="text-[#006AFF] text-[18px] leading-[27px] font-[500]">
                Choose promotion options
              </span>
              <span className="text-[#4E4E4E] text-[13px] leading-[19.5px] font-[400]">
                Select your preferred promotion type
              </span>
            </p>

            <div>
              <button onClick={closeModal} className="cursor-pointer pb-7">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {typeSubscription.map((subType, index) => (
              <button
                className="flex items-center bg-[#EEF5FF] justify-between font-[500] rounded-[4px] p-[12px]  leading-[24px] w-full  sm:w-[494px] h-[48px] border border-[#006AFF] text-[#006AFF] "
                key={index}
                onClick={() => handleSelectedSubType(subType)}
              >
                <span>{subType}</span>
                <Image
                  src="/static/images/blue-arrow-right.svg"
                  alt=""
                  height={16}
                  width={16}
                  className=""
                />
              </button>
            ))}
          </div>
        </div>
      </CustomizedModal>
      <CustomizedModal isOpen={subModal} onRequestClose={closeModal}>
        <div className="bg-white adminCellBorders flex flex-col w-full sm:w-[550px] p-[28px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <div className="w-full flex  items-center gap-3">
              <div
                onClick={() => {
                  setSubModal(false);
                  setModalIsOpen(true);
                  setOpenInfo(false);
                }}
                className="flex gap-2 items-center cursor-pointer"
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
                  }
                  height={16}
                  width={16}
                  alt=""
                  className=""
                />
                <p className="text-[11px] font-[400] text-[#A9A9A9]">back</p>
              </div>

              <p className="text-[#4E4E4E] text-[13px] leading-[19.5px] font-[400]">
                {selectedSubType}
              </p>
            </div>

            <div>
              <button onClick={closeModal} className="cursor-pointer ">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="flex items-center text-left sm:text-justify justify-between font-[500] rounded-[4px] p-[12px] bg-[#EEF5FF] leading-[24px] w-full sm:w-[494px] sm:h-[48px] border border-[#006AFF] text-[#006AFF] "
              onClick={onSubscriptionBtnClick}
            >
              <span>
                {selectedSubType === "Promote on Email blast"
                  ? selectedSubType
                  : selectedSubType.split(" ")[0]}{" "}
                with subscription
              </span>
              <Image
                src="/static/images/blue-arrow-right.svg"
                alt=""
                height={16}
                width={16}
                className=""
              />
            </button>
            <div className="flex items-center bg-[#EEF5FF] justify-between font-[500] rounded-[4px] p-[12px]  leading-[24px] w-full sm:w-[494px] sm:h-[48px] border border-[#006AFF] text-[#006AFF] ">
              <div className="flex sm:items-center sm:flex-row flex-col gap-[8px]">
                <div className="flex items-center gap-3">
                  <Image
                    src="/static/images/info-circle.svg"
                    alt=""
                    height={16}
                    width={16}
                    className="cursor-pointer"
                    onClick={() => setOpenInfo(!openInfo)}
                  />
                  <button
                    className="flex items-center gap-[8px] text-left "
                    onClick={() => setDailyWeekModal(true)}
                  >
                    {selectedSubType === "Promote on Email blast"
                      ? "Pay for weekly Email promotion"
                      : `Pay for daily ${selectedSubType
                          .split(" ")[0]
                          .toLocaleLowerCase()}`}{" "}
                  </button>
                </div>
                <button className="py-[4px] px-[8px] rounded-[8px] border-[#006AFF] border w-fit ml-7 bg-[#FFFFFF] sm:ml-0">
                  N500{" "}
                  {selectedSubType === "Promote on Email blast"
                    ? "week"
                    : "daily"}
                </button>
              </div>
              <Image
                src="/static/images/blue-arrow-right.svg"
                alt=""
                height={16}
                width={16}
                className="cursor-pointer"
                onClick={() => setDailyWeekModal(true)}
              />
            </div>
            {openInfo && (
              <div className=" flex items-center justify-between">
                <p className="break-words text-[#4E4E4E] text-[13px] leading-[19.5px] font-[400] max-w-[448px]">
                  Your selected property will be promoted on any of our
                  advertisement channels for the day.
                </p>

                <Image
                  src="/static/images/close-square.svg"
                  height={16}
                  width={16}
                  alt=""
                  onClick={() => setOpenInfo(false)}
                  className="cursor-pointer pb-5"
                />
              </div>
            )}
          </div>
        </div>
      </CustomizedModal>
      <CustomizedModal isOpen={dailyWeekModal} onRequestClose={closeModal}>
        <div className="bg-white adminCellBorders flex flex-col md:w-[550px] p-[28px] rounded-[12px] gap-[6px]">
          <div className=" flex items-center justify-between">
            <div className="w-full flex  items-center gap-3">
              <div
                onClick={() => {
                  setSubModal(true);
                  setDailyWeekModal(false);
                  setSelectedDuration("");
                  setOpenMenu(false);
                }}
                className="flex gap-2 items-center cursor-pointer"
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
                  }
                  height={16}
                  width={16}
                  alt=""
                  className=""
                />
                <p className="text-[11px] font-[400] text-[#A9A9A9]">back</p>
              </div>

              <p className="hidden sm:inline-block text-[#A9A9A9] text-[14px] leading-[21px] font-[400]">
                {selectedSubType}
              </p>
              <p className="text-[##4E4E4E] text-[13px] leading-[19.5px] font-[500]">
                {selectedSubType === "Promote on Email blast"
                  ? "Pay for weekly Email promotion "
                  : selectedSubType === "Sponsor property"
                  ? "Pay for daily sponsor"
                  : selectedSubType === "Feature property"
                  ? "Pay for daily feature"
                  : "Pay for daily subscription"}
              </p>
            </div>

            <div>
              <button onClick={closeModal} className="cursor-pointer ">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <p className="text-[#4E4E4E] text-[13px] leading-[19.5px] font-[400]">
            Specify the duration for which you want to promote your property.
          </p>
          <div className="flex flex-col mt-6">
            <div className="flex gap-[16px]">
              <button
                className="flex items-center sm:text-[16px] text-[14px] justify-between font-[500] rounded-[4px] p-[12px] leading-[24px] sm:w-[348px] h-[48px] w-[149px] border text-[#4E4E4E] border-[#A9A9A9]"
                onClick={toggleMenu}
              >
                <span>
                  {selectedDuration
                    ? `${selectedDuration} ${
                        selectedSubType === "Promote on Email blast"
                          ? selectedDuration === 1
                            ? "week"
                            : "weeks"
                          : selectedDuration === 1
                          ? "day"
                          : "days"
                      }`
                    : "Select duration"}
                </span>
                <Image
                  src="/static/images/greay-right-arrow.svg"
                  alt="Arrow Icon"
                  height={8}
                  width={8}
                  className="rotate-90"
                />
              </button>
              <p className="w-[130px] h-[48px] bg-[#E6E6E6] text-[#4E4E4E] text-[14px] leading-[21px] font-[500] p-[12px] rounded-[4px]">
                {selectedDuration
                  ? `₦ ${Number(totalSubPrice).toLocaleString()}`
                  : "₦ 0.00"}
              </p>
            </div>
            {openMenu && (
              <div className="max-h-[200px] overflow-y-auto border border-[#EEF5FF] sm:w-[348px] py-[8px] px-[12px] rounded-[4px] shadow-md flex flex-col items-start gap-[4px] mt-1">
                {numberOfDay.map((day) => (
                  <button
                    key={day}
                    value={day}
                    className="hover:bg-[#EEF5FF] cursor-pointer w-full text-left py-1"
                    onClick={() => handleSelectDuration(day)}
                  >
                    {day}{" "}
                    {selectedSubType === "Promote on Email blast"
                      ? day === 1
                        ? "week"
                        : "weeks"
                      : day === 1
                      ? "day"
                      : "days"}
                  </button>
                ))}
              </div>
            )}
            <button
              className={` font-[500] rounded-[4px] p-[12px] text-center leading-[24px] w-full h-[48px] border  ${
                totalSubPrice == ""
                  ? "bg-[#E6E6E6] text-[#D5D5D5]"
                  : "bg-[#006AFF] text-white"
              }   mt-7`}
              disabled={totalSubPrice == ""}
            >
              Make payment{" "}
              {totalSubPrice != "" &&
                `(₦ ${Number(totalSubPrice).toLocaleString()})`}
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

export default EditProperty;
const typeSubscription = [
  "Promote property",
  "Sponsor property",
  "Feature property",
  "Promote on Email blast",
];
