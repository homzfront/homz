"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "/src/utils/api";
import { useForm } from "react-hook-form";
import Amenities from "./Amenities";
import MenuItems from "@/components/mainmenu/menuItems";

function capitalizeFirstLetter(word) {
  if (word.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
const PropertyInfo = ({ handlePropertyInfo, setSaveToDraft }) => {
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [listingClicked, setListingClicked] = useState(true);
  const [stateClicked, setStateClicked] = useState(true);
  const [areaClicked, setAreaClicked] = useState(true);
  const [subClicked, setSubTypeClicked] = useState(true);
  const [propertyTypeClicked, setPropertyTypeClicked] = useState(true);
  const [bedroomClicked, setBedroomClicked] = useState(true);
  const [bathroomClicked, setBathroomClicked] = useState(true);
  const [toiletClicked, setToiletClicked] = useState(true);
  const [areas, setAreas] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [ameni, setOpenAmeni] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const numberCounts = [...Array(21).keys()].slice(1);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await api.get("/state");
      setAllStates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAreas = async (stateSelected) => {
    try {
      const Areas = await api.post("/state/area", { state: stateSelected });
      setAreas(Areas?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(amenities)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    // reset();
    // console.log(data)
    handlePropertyInfo(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <div className="md:text-[23px] font-[700] text-BlueHomz leading-[20.16px] md:leading-[28.98px]">
          Property Details
        </div>
        <div className="leading-[16.38px] text-[13px] md:text-[14px] font-[400]">
          Kindly fill in the accurate property details
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col md:w-full sm:gap-[20px] gap-[17px]"
        >
          <div>
            <label
              className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
              htmlFor="title"
            >
              {" "}
              Title <span className="text-red-500 text-xs">*</span>
            </label>
            <br />
            <input
              {...register("title", {
                required: "Property title is required"
              })}
              placeholder="e.g  Luxurious  4 bedroom duplex"
              className="h-[45px] md:w-[100%] rounded-[4px] p-[12px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
            />
            {errors.title && (
                <p className="italic text-error text-[11px] font-[400]">{errors.title.message}</p>
              )}
          </div>
          <div className="grid sm:grid-cols-4 gap-[20px] border-b">
            <MenuItems
              title="Listing Type"
              name="listingType"
              width="100%"
              reg={register}
              errors={errors}
              required={true}
              option1="Select option"
              setSelectedClicked={setListingClicked}
              selectedClicked={listingClicked}
              items={listingTypeValues}
            />
            <MenuItems
              title="Property Type"
              name="propertyType"
              width="100%"
              reg={register}
              errors={errors}
              required={true}
              option1="Select Property Type"
              onChange={(e) => setPropertyType(e.target.value)}
              setSelectedClicked={setPropertyTypeClicked}
              selectedClicked={propertyTypeClicked}
              items={propertyTypesSaleRent}
            />
            <MenuItems
              title="Sub-Type"
              name="subType"
              width="100%"
              reg={register}
              required={true}
              option1="Select the sub type"
              errors={errors}
              setSelectedClicked={setSubTypeClicked}
              selectedClicked={subClicked}
              items={
                propertyType === "Commercial Property"
                  ? commercialProperty
                  : propertyType === "Houses"
                  ? subTypeHouses
                  : propertyType === "Flats & Apartments"
                  ? subTypeFlatsApartments
                  : propertyType === "Land"
                  ? landTypeValues
                  : propertyType === "Co-Working Space"
                  ? CoworkingSpace
                  : []
              }
            />
            {propertyType === "Land" ? (
              <div className="">
                <label
                  className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                  htmlFor="squareMeters"
                >
                  Square Meters <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <input
                  {...register("squareMeters", {
                    required: "Square Meters is required",
                  })}
                  className="h-[45px] p-[8px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2"
                  placeholder="e.g 500 sqm"
                />
                {errors.squareMeters && (
                  <span className="italic text-error text-[11px] font-[400]">
                    {errors.squareMeters.message}
                  </span>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <label
                  className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                  htmlFor="units"
                >
                  Units
                </label>
                <br />
                <input
                  {...register("units")}
                  className="relative h-[45px] p-[8px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2"
                  placeholder="e.g 4"
                />
                {errors.units && (
                  <span className="italic text-error text-[11px] font-[400]">
                    {errors.units.message}
                  </span>
                )}
                <span className="text-[#0e0d0d] text-[14px] font-[500] leading-[21px]  relative bottom-[36px] left-[230px] sm:left-[186px]">
                  units
                </span>
              </div>
            )}
          </div>
          <div className="grid sm:grid-cols-3 gap-[20px] border-b pb-5 grid-cols-2">
            <MenuItems
              title="State"
              name="state"
              width="100%"
              reg={register}
              required={true}
              errors={errors}
              option1="Select State"
              onChange={(e) => fetchAreas(e.target.value)}
              setSelectedClicked={setStateClicked}
              selectedClicked={stateClicked}
              items={allStates}
            />
            <MenuItems
              title="Area"
              name="area"
              width="100%"
              reg={register}
              required={true}
              errors={errors}
              setSelectedClicked={setAreaClicked}
              selectedClicked={areaClicked}
              option1="Select Area"
              items={areas}
            />
            <div className="w-full col-span-2 sm:col-span-1 space-y-2">
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="address"
              >
                Street / Estate / Neighborhood{" "}
                <span className="text-red-500 text-xs">*</span>
              </label>
              <br />
              <input
                {...register("address", {
                  required: "Street name is required",
                })}
                className="h-[43px] md:h-[45px] md:w-[100%] p-[4px] md:p-[12px] rounded-[4px] border w-full text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] sm:pl-2"
                placeholder="e.g  No 32,  Andrew  Street,  Lekki"
              />
              {errors.address && (
                <span className="italic text-error text-[11px] font-[400]">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
          {propertyType != "Land" && (
            <div className="grid sm:grid-cols-4 gap-[20px] ">
              <MenuItems
                title="Bedrooms"
                name="numberOfRooms"
                width="100%"
                reg={register}
                required={true}
                errors={errors}
                option1="Select option"
                setSelectedClicked={setBedroomClicked}
                selectedClicked={bedroomClicked}
                items={numberCounts}
              />
              <MenuItems
                title="Bathrooms"
                name="numberOfBathrooms"
                width="100%"
                reg={register}
                required={true}
                errors={errors}
                option1="Select option"
                setSelectedClicked={setBathroomClicked}
                selectedClicked={bathroomClicked}
                items={numberCounts}
              />
              <MenuItems
                title="Toilets"
                name="numberOfToilets"
                width="100%"
                reg={register}
                required={true}
                errors={errors}
                setSelectedClicked={setToiletClicked}
                selectedClicked={toiletClicked}
                option1="Select option"
                items={numberCounts}
              />

              <div className="sm:pt-6 pt-2 mt-2">
                <p
                  className="border bg-[#006AFF] rounded-[4px] text-white flex items-center justify-center px-[8px] py-[12px] font-[400] leading-[21px] text-[14px] w-[100%] h-[37px] cursor-pointer"
                  onClick={() => setOpenAmeni(true)}
                >
                  Click to Select Amenities
                </p>
              </div>
            </div>
          )}
          <div className="flex sm:flex-row flex-col items-center gap-[28px]">
            <div className="w-[100%] h-[100%] inline-flex flex-col gap-2 space-y-2">
              <div>
                <label className="text-[14px] font-[500] text-BlackHomz ">
                  Property Description <span className="text-error">*</span>
                </label>
              </div>
              <textarea
                {...register("description", {
                  required: "Property description is required.",
                })}
                className="mt-1 h-[151px] md:h-[90px] rounded-md border w-full p-2 md:p-4 text-top placeholder:font-[500] placeholder:text-GrayHomz2 text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] scrollbar-container"
                placeholder="Give short description of your property."
                // value={description}
                id="description"
                name="description"
              ></textarea>
              {errors.description && (
                <p className="italic text-error text-[11px] font-[400]">{errors.description.message}</p>
              )}
            </div>
            {propertyType === "Land" && (
              <div className="sm:mt-  sm:w-[349px] inline-block w-[100%]">
                <p
                  className="border bg-[#006AFF] rounded-[4px] text-white flex items-center justify-center px-[8px] py-[12px] font-[400] leading-[21px] text-[14px] w-[100%] h-[37px] cursor-pointer"
                  onClick={() => setOpenAmeni(true)}
                >
                  Click to Select Amenities
                </p>
              </div>
            )}
          </div>
          <div className="flex sm:flex-row sm:gap-[24px] flex-col">
            <select
              name="furnishStatus"
              className={`custom-select h-[43px] md:h-[45px] sm:w-[236px]  p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
              id="furnishStatus"
              {...register("furnishStatus")}
            >
              {furnishStatus.map((type, index) => (
                <option key={index} value={type}>
                  {capitalizeFirstLetter(type)}
                </option>
              ))}
            </select>
            <div>
              {propertyStatus.map((status, index) => (
                <div
                  className="inline-flex items-center gap-[12px] sm:p-[12px] py-[14px] pr-[12px] bg-[#FCFCFC] rounded-[4px] w-fit"
                  key={index}
                >
                  <label
                    className="relative flex items-center rounded-full cursor-pointer"
                    htmlFor={`checkbox-${index}`}
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#78797a] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-[#EEF5FF] checked:before:bg-[#EEF5FF] hover:before:opacity-10"
                      id={`checkbox-${index}`}
                      {...register(status.split(" ")[0])}
                      // onChange={() => handleCheckboxChange(status)}
                      // checked={selectedAmenities.includes(status)}
                    />
                    <span className="absolute text-BlueHomz transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className=" leading-[19.5px] text-[16px] font-[500] md:leading-[21px] "
                    htmlFor={`checkbox-${index}`}
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8 ">
            <div>
              <button
                className="text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] text-BlueHomz border border-BlueHomz  sm:w-full w-[120px]"
                // onClick={handleShowCancelDialogue}
              >
                Cancel
              </button>
            </div>

            <div className="flex gap-3 items-center">
              <p
                // disabled={!isValid ? true : false}
                className={`hidden sm:flex gap-2 items-center text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] cursor-pointer ${
                  // isValid ? "text-[#D5D5D5]" : "text-BlueHomz"
                  "text-BlueHomz"
                }`}
                onClick={() => setSaveToDraft(true)}
              >
                <Image
                  src={`/static/images/${
                    "blueclock.svg"
                    // isValid ? "clock2.svg" : "blueclock.svg"
                  }`}
                  alt=""
                  height={16}
                  width={16}
                />
                <span>Save to draft</span>
              </p>
              <button
                // disabled={!isValid ? true : false}
                className={`flex md:mr-14 border gap-1 justify-center sm:w-[77px] w-[120px]  items-center text-[14px] font-[500] py-[8px] px-[12px] ${
                  "text-white border-white bg-BlueHomz"
                  // isValid
                  //   ? "text-[#D5D5D5] bg-[#E6E6E6] border-[#A9A9A9]"
                  //   : "text-white border-white bg-BlueHomz"
                } rounded-[4px] `}
                type="submit"
              >
                Next
                {isValid ? (
                  <Image
                    src={"/static/images/Vector.svg"}
                    alt=""
                    height={8}
                    width={8}
                  />
                ) : (
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                    }
                    alt=""
                    height={16}
                    width={16}
                  />
                )}
              </button>
            </div>
          </div>
          <p
            // disabled={!isValid ? true : false}
            className={`mx-auto my-2 flex md:hidden gap-2 items-center text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] ${
               "text-BlueHomz"
              // isValid ? "text-[#D5D5D5]" : "text-BlueHomz"
            }`}
            onClick={() => setSaveToDraft(true)}
          >
            <Image
              src="/static/images/blueclock.svg"
              // src={`/static/images/${isValid ? "clock2.svg" : "blueclock.svg"}`}
              alt=""
              height={16}
              width={16}
            />
            <span>Save to draft</span>
          </p>
        </form>
      </div>
      <Amenities
        isOpen={ameni}
        setOpenAmeni={setOpenAmeni}
        amenitiesPicked={setAmenities}
      />
    </div>
  );
};

export default PropertyInfo;

const propertyTypeValues = [
  "boys quarters",
  "mini-flat",
  "penthouse",
  "self contain",
  "studio apartment",
  "block of flats",
  "detached bungalow",
  "semi-detached bungalow",
  "terraced bungalow",
  "detached duplex",
  "semi-detached duplex",
  "terraced duplex",
];
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
  "block of flat",
  "mini flat",
  "self-Contain",
  "shared apartment",
  "studio apartment",
];

const CoworkingSpace = ["co-working space"];
const furnishStatus = ["partly furnished", "fully furnished"];
const propertyStatus = ["newly Built", "serviced"];
