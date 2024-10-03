import React, { useEffect, useState } from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { useForm } from "react-hook-form";
import MenuItems from "@/components/mainmenu/menuItems";
import Link from "next/link";
import api from "/src/utils/api";
import ThreeDots from "@/components/mainmenu/ThreeDotsLoader";

const PropertyRequest = ({
  isOpen,
  onRequestClose,
  setOpenPropertyReq,
  setOpenSuccessModal,
}) => {
  const [tabSelected, setSelectedTab] = useState("propInfo");
  const [listingType, setListingType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedMobileState, setSelectedMobileState] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [bedrooms, setBedrooms] = useState();
  const [moreInfo, setMoreInfo] = useState("");
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [subType, setSubType] = useState("");
  const [contactType, setContactType] = useState();
  const [listingError, setListingError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [stateClicked, setStateClicked] = useState(true);
  const [areaClicked, setAreaClicked] = useState(true);
  const [subClicked, setSubTypeClicked] = useState(true);
  const [propertyTypeClicked, setPropertyTypeClicked] = useState(true);
  const [seekerAgentClicked, setSeekerAgentClicked] = useState(true);
  const [bedroomClicked, setBedroomClicked] = useState(true);
  const [areas, setAreas] = useState([]);
  const [maximumBudget, setMaxBudget] = useState();
  const [squareMeters, setSqrMeter] = useState();
  const [isFocusMaxBudget, setFocusMaxBudget] = useState(false);
  const [formattedMaxBudget, setFormattedMaxBudget] = useState("");
  const numberCounts = [...Array(21).keys()].slice(1);
  const [allStates, setAllStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const phoneFormat = /^((\+234)+|0)[7-9]{1}[0-9]{9}$/;
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateDetails = (details, list) => {
    // Reset errors
    setPhoneError("");
    setEmailError("");
    setListingError("");

    if (details.phoneNumber === "") {
      setPhoneError("Phone Number is required");
      return true;
    } else if (!phoneFormat.test(details.phoneNumber)) {
      setPhoneError("Phone number is not valid");
      return true;
    } else if (details.email === "") {
      setEmailError("Email is required");
      return true;
    } else if (!emailFormat.test(details.email)) {
      setEmailError("Enter a valid email address");
      return true;
    } else {
      // Perform the necessary actions when all fields are valid
      // console.log("All fields are valid");
    }
  };
  const resetFields = () => {
    setDetails(() => ({
      fullName: "",
      email: "",
      phoneNumber: "",
    }));
    reset();
    setPhoneError("");
    setEmailError("");
    setFormattedMaxBudget("");
    setListingError("");
    setPropertyType("");
    setSubType("");
    setSelectedState("");
    setSelectedArea("");
    setBedrooms("");
    setSqrMeter("");
    setMoreInfo("");
    setContactType("");
    setSelectedMobileState("");
    setListingType("");
  };
  useEffect(() => {
    fetchStates();
  }, []);
  const getListingTypes = (type) => {
    setListingType(type);
    setListingError("");
  };
  const fetchStates = async () => {
    try {
      const res = await api.get("/state");
      // console.log(res);
      setAllStates(res.data);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchAreas = async (stateSelected) => {
    try {
      const Areas = await api.post("/state/area", { state: stateSelected });
      setAreas(Areas?.data?.data);
    } catch (error) {
      // console.log(error);
    }
  };
  const cancel = () => {
    setOpenPropertyReq(false);
    resetFields();
  };

  const handleNumberChange = (e, setValue, setFormat) => {
    const value = e.target.value;
    const numericValue = value.match(/^\d*\.?\d*$/);
    if (numericValue) {
      setValue(value);
      setFormat(value);
    }
  };

  const handleBlur = (value, setValue) => {
    if (value) {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        setValue(Number(numericValue).toLocaleString());
      }
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    // console.log(details);
    const vali = validateDetails(details);
    if (vali) {
      setIsLoading(false);
      setListingError("");
      return;
    }
    if (listingType === "") {
      setListingError("Please select listing type");
      setIsLoading(false);
      return;
    }
    // If everything is fine, proceed with submission

    let state = "";
    if (selectedState === "") state = selectedMobileState;
    else state = selectedState;
    setTimeout(async () => {
      try {
        const response = await api.post("/PropertyRequest", {
          listingType: listingType,
          propertyType: propertyType,
          subType: subType,
          maximumBudget,
          state,
          area: selectedArea,
          bedrooms,
          squareMeters,
          moreInformation: moreInfo,
          contactType,
          fullName: details.fullName,
          phoneNumber: details.phoneNumber,
          email: details.email,
        });
        if (response.status === 201) {
          setIsLoading(false);
          setOpenPropertyReq(false);
          setOpenSuccessModal(true);
          resetFields();
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }, 2000);
  };
  const propertyTypeItemsMap = {
    "Commercial Property": commercialProperty,
    Houses: subTypeHouses,
    "Flats & Apartments": subTypeFlatsApartments,
    Land: landTypeValues,
    "Co-Working Space": CoworkingSpace,
  };

  const items = propertyTypeItemsMap[propertyType] || [];
  return (
    <div className="">
      <CustomizedModal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className="sm:w-[813px] mt-8 rounded-[12px] bg-white sm:p-[32px] px-[28px] py-[32px] flex gap-[4px] flex-col h-fit ">
          <section className="space-y-1 pb-[24px] border-b-[1px] border-[#A9A9A9] ">
            <div className="modal-header flex items-center justify-between">
              <p className="text-[20px] font-[700] leading-[25.2px] ">
                Property Request Form
              </p>
              <Image
                src="/static/images/grey-close-square.svg"
                width={24}
                height={24}
                alt=""
                className="rounded-full w-[24px] h-[24px] cursor-pointer"
                onClick={cancel}
              />
            </div>
            <p className="text-[#4E4E4E] leading-[24px] font-[500]">
              Enter the information for the property you’re looking for
            </p>
          </section>
          <div className="flex items-center gap-[8px] py-[24px]">
            <Link
              href="#propInfo"
              onClick={() => {
                setSelectedTab("propInfo");
              }}
              className={`py-[8px] w-[160px] h-[37px] sm:w-full px-[12px] font-[500] rounded-[4px] md:text-[14px] text-[13px] ${
                tabSelected === "propInfo"
                  ? " shadow-md bg-[#006AFF] text-white "
                  : "bg-[#EEF5FF] text-[#006AFF] "
              }`}
            >
              Property Information
            </Link>

            <Link
              href="#contactInfo"
              onClick={() => {
                setSelectedTab("contactInfo");
              }}
              className={`py-[8px] px-[12px] rounded-[4px] w-[135px] h-[37px] font-[500] sm:w-full  md:text-[14px] text-[13px] ${
                tabSelected === "contactInfo"
                  ? "shadow-md bg-[#006AFF] text-white "
                  : "bg-[#EEF5FF] text-[#006AFF] "
              }`}
            >
              <span className="sm:block hidden">Your contact information</span>
              <span className="sm:hidden">Your contact info</span>
            </Link>
          </div>
          <form
            className="flex flex-col  gap-[48px] max-h-[479px] overflow-y-auto px-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div id="propInfo" className="flex flex-col gap-[18px] ">
              <div className="space-y-2">
                <label
                  className="text-[14px] font-[500] text-BlackHomz"
                  htmlFor="listingType"
                >
                  Listing Type <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <div className="text-[13px] font-[500] w-full flex gap-[12px]">
                  <p
                    onClick={() => {
                      getListingTypes("For Rent");
                    }}
                    className={`sm:w-[116.33px] w-[83.67px] h-[45px] cursor-pointer flex items-center justify-center rounded-[4px] border border-[#006AFF] ${
                      listingType === "For Rent"
                        ? "bg-[#006AFF] text-white "
                        : "bg-[#EEF5FF] text-[#006AFF] "
                    } text-BlueHomz`}
                  >
                    For Rent
                  </p>
                  <p
                    onClick={() => {
                      getListingTypes("For Sale");
                    }}
                    className={`sm:w-[116.33px] w-[83.67px] h-[45px] cursor-pointer flex items-center justify-center rounded-[4px] border border-[#006AFF] ${
                      listingType === "For Sale"
                        ? "bg-[#006AFF] text-white "
                        : "bg-[#EEF5FF] text-[#006AFF] "
                    } text-BlueHomz`}
                  >
                    For Sale
                  </p>
                  <p
                    onClick={() => {
                      getListingTypes("Shortlet");
                    }}
                    className={`sm:w-[116.33px] w-[83.67px] h-[45px] py-[8px] px-[12px] cursor-pointer flex items-center justify-center rounded-[4px] border border-[#006AFF] ${
                      listingType === "Shortlet"
                        ? "bg-[#006AFF] text-white "
                        : "bg-[#EEF5FF] text-[#006AFF] "
                    } text-BlueHomz`}
                  >
                    Shortlet
                  </p>
                </div>
                {listingError != "" && (
                  <span className="italic text-error text-[11px] font-[400]">
                    {listingError}
                  </span>
                )}
              </div>
              <div className="grid sm:grid-cols-2  gap-[28px] w-full">
                <MenuItems
                  title="Property Type"
                  name="propertyType"
                  reg={register}
                  required={true}
                  showError={true}
                  errors={errors}
                  option1="Select Property Type"
                  onChange={(e) => setPropertyType(e.target.value)}
                  setSelectedClicked={setPropertyTypeClicked}
                  selectedClicked={propertyTypeClicked}
                  items={propertyTypesSaleRent}
                  value={propertyType}
                />
                <MenuItems
                  title="Sub-Type"
                  name="subType"
                  reg={register}
                  required={true}
                  showError={true}
                  option1="Select the sub type"
                  errors={errors}
                  onChange={(e) => setSubType(e.target.value)}
                  setSelectedClicked={setSubTypeClicked}
                  selectedClicked={subClicked}
                  items={items}
                  value={subType}
                />
              </div>
              <div className="grid sm:grid-cols-2  gap-[28px] w-full">
                <div className="space-y-2">
                  <label
                    className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                    htmlFor="maxBudget"
                  >
                    Maximum Budget (₦)
                  </label>{" "}
                  <br />
                  <div className="flex relative items-center">
                    <input
                      placeholder="e.g 3,000,000"
                      className="h-[45px] py-[12px] pl-3 w-full rounded-[4px] border text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]  "
                      min="0"
                      value={
                        isFocusMaxBudget ? maximumBudget : formattedMaxBudget
                      }
                      onChange={(e) =>
                        handleNumberChange(
                          e,
                          setMaxBudget,
                          setFormattedMaxBudget
                        )
                      }
                      onBlur={(e) => {
                        setFocusMaxBudget(false);
                        handleBlur(e.target.value, setFormattedMaxBudget);
                      }}
                      onSelect={() => setFocusMaxBudget(true)}
                    />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <MenuItems
                    title="State"
                    name="stateDesktop"
                    reg={register}
                    required={true}
                    showError={true}
                    errors={errors}
                    option1="Select State"
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      fetchAreas(e.target.value);
                    }}
                    setSelectedClicked={setStateClicked}
                    selectedClicked={stateClicked}
                    items={allStates}
                    Desktop={true}
                    Mobile={false}
                    value={selectedState}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-[28px] gap-[16px]">
                <MenuItems
                  title="State"
                  name="stateMobile"
                  reg={register}
                  required={true}
                  showError={true}
                  errors={errors}
                  option1="Select State"
                  onChange={(e) => {
                    setSelectedMobileState(e.target.value);
                    fetchAreas(e.target.value);
                  }}
                  setSelectedClicked={setStateClicked}
                  selectedClicked={stateClicked}
                  items={allStates}
                  Mobile={true}
                  Desktop={false}
                  value={selectedMobileState}
                />

                <MenuItems
                  title="Area"
                  name="area"
                  // width=""
                  reg={register}
                  errors={errors}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  setSelectedClicked={setAreaClicked}
                  selectedClicked={areaClicked}
                  option1="Select Area"
                  items={areas}
                  value={selectedArea}
                />
                <MenuItems
                  title="Bedrooms"
                  name="bedrooms"
                  // width=""
                  reg={register}
                  errors={errors}
                  option1="Select option"
                  onChange={(e) => setBedrooms(e.target.value)}
                  setSelectedClicked={setBedroomClicked}
                  selectedClicked={bedroomClicked}
                  items={numberCounts}
                  value={bedrooms}
                />
                <div className="space-y-2">
                  <label
                    className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                    htmlFor="squareMeters"
                  >
                    Square Meters
                  </label>
                  <br />
                  <input
                    onChange={(e) => setSqrMeter(e.target.value)}
                    className="h-[45px] p-[8px] md:p-[12px] rounded-[4px] border w-full text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2"
                    min="0"
                    placeholder="e.g 500"
                    value={squareMeters}
                  />
                  {errors.squareMeters && (
                    <span className="italic text-error text-[11px] font-[400]">
                      {errors.squareMeters.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-[100%] h-[100%] inline-flex flex-col gap-2 space-y-2">
                <div>
                  <label className="text-[14px] font-[500] text-BlackHomz ">
                    More Information
                  </label>
                </div>
                <textarea
                  {...register("moreInfo")}
                  onChange={(e) => setMoreInfo(e.target.value)}
                  className="mt-1 h-[90px] rounded-[4px] border border-[#A9A9A9] w-full p-2 md:p-4 text-top placeholder:font-[500] placeholder:text-GrayHomz2 text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] scrollbar-container"
                  placeholder="Give further information about the property you’re looking for "
                  id="moreInfo"
                  name="moreInfo"
                ></textarea>
                {errors.moreInfo && (
                  <p className="italic text-error text-[11px] font-[400]">
                    {errors.moreInfo.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[24px]" id="contactInfo">
              <p className="text-[20px] font-[700] leading-[25.2px] pt-[4px] px-[4px] pb-[16px]  border-b-[1px] border-[#D5D5D5] ">
                Your contact information
              </p>
              <div className="grid sm:grid-cols-2  gap-[28px] w-full">
                <MenuItems
                  title="Are you an home seeker or an agent"
                  name="contactType"
                  reg={register}
                  errors={errors}
                  option1="Select option"
                  onChange={(e) => setContactType(e.target.value)}
                  setSelectedClicked={setSeekerAgentClicked}
                  selectedClicked={seekerAgentClicked}
                  items={seekerAgentData}
                  value={contactType}
                />
                <div className="space-y-2">
                  <label
                    className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                    htmlFor="fullName"
                  >
                    {" "}
                    Full Name
                  </label>
                  <br />
                  <input
                    {...register("fullName")}
                    onChange={handleChange}
                    placeholder="e.g Daniel James"
                    className="h-[45px] md:w-[100%] rounded-[4px] p-[12px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                  />
                  {errors.fullName && (
                    <p className="italic text-error text-[11px] font-[400]">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                {/* </div> */}
                {/* <div className="grid grid-cols-2  gap-[28px] w-full"> */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                  >
                    {" "}
                    Phone Number{" "}
                    <span className="text-red-500 text-[15px]">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    onChange={handleChange}
                    className="h-[45px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
                    name="phoneNumber"
                    value={details.phoneNumber}
                  />
                  {phoneError != "" && (
                    <span className="italic text-error text-[11px] font-[400]">
                      {phoneError}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                  >
                    Email <span className="text-red-500 text-[15px]">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter email"
                    className="h-[45px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
                    name="email"
                    onChange={handleChange}
                    value={details.email}
                  />
                  {emailError != "" && (
                    <span className="italic text-error text-[11px] font-[400]">
                      {emailError}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              className="bg-[#006AFF] flex items-center justify-center  text-white rounded-[4px] border h-[37px] px-[12px] py-[8px] text-[14px] font-[700] leading-[21px]"
              onClick={onSubmit}
            >
              {!isLoading ? (
                <span>Send Request</span>
              ) : (
                <ThreeDots color="#ffffff" />
              )}
            </button>
          </form>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default PropertyRequest;
const listingTypeValues = ["for rent", "for sale", "shortlet"];
const landTypeValues = [
  "Commercial Land",
  "Industrial Land",
  "Joint Venture Land",
  "Mixed-use Land",
  "Residential Land",
  "Agricultural Land",
];
const commercialProperty = [
  "Event Hall",
  "Factory",
  "Filling Station",
  "Gas Plant",
  "Hostel",
  "Hotel",
  "Mall/Complex/Plaza",
  "Office space",
  "Restaurant",
  "School",
  "Shop space",
  "Tank Farm",
  "Warehouse",
];
const subTypeHouses = [
  "Bungalow",
  "Detached Bungalow",
  "Semi-detached Bungalow",
  "Duplex",
  "Detached Duplex",
  "Semi-detached Duplex",
  "Mansion",
  "Maisonnette",
  "Penthouse",
  "Terrace",
  "Terraced Bungalow",
  "Terraced Duplex",
  "Townhouse",
];

const propertyTypesSaleRent = [
  "Co-Working Space",
  "Commercial Property",
  "Flats & Apartments",
  "Houses",
  "Land",
];

const subTypeFlatsApartments = [
  "Block of flat",
  "Mini Flat",
  "Self-Contain",
  "Shared Apartment",
  "Studio Apartment",
];

const CoworkingSpace = ["Co-working Space"];

const seekerAgentData = ["Home Seeker", "Agent"];
