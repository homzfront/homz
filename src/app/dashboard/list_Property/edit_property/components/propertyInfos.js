"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import api from "@/utils/api";
import _ from "lodash";
import Amenities from "./Amenities";

const PropertyInfo = ({
  property,
  handleUpdate,
  setSaveUpdate,
  saveUpdate,
  setData,
}) => {
  // console.log(property);
  const [areas, setAreas] = useState([]);
  const [allStates, setAllStates] = useState([]);
  // const [data, setData] = useState(null);
  const [squareMeterClicked, setSquareMeterClicked] = useState(false);
  const [unitsClicked, setUnitsClicked] = useState(false);
  const [streetClicked, setStreetClicked] = useState(false);
  const [furnishStatusClicked, setFurnishStatusClicked] = useState(false);
  const [descriptionClicked, setDescriptionClicked] = useState(false);
  const [listingClicked, setListingClicked] = useState(true);
  const [stateClicked, setStateClicked] = useState(true);
  const [areaClicked, setAreaClicked] = useState(true);
  const [subClicked, setSubTypeClicked] = useState(true);
  const [titleClicked, setTitleClicked] = useState(false);
  const [propertyTypeClicked, setPropertyTypeClicked] = useState(true);
  const [bedroomClicked, setBedroomClicked] = useState(true);
  const [bathroomClicked, setBathroomClicked] = useState(true);
  const [toiletClicked, setToiletClicked] = useState(true);
  const [propertyType, setPropertyType] = useState("");
  const [ameni, setOpenAmeni] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const numberCounts = [...Array(21).keys()].slice(1);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [propertyStatus, setPropertyStatus] = useState({
    newlyBuilt: false,
    serviced: false,
  });

  const [formData, setFormData] = useState({
    newlyBuilt: false,
    serviced: false,
    amenities: [],
  });
  const originalFormData = useRef({
    ...property,
    newlyBuilt: property?.newlyBuilt || false,
    serviced: property?.serviced || false,
    amenities: property?.amenities || [],
  });

  useEffect(() => {
    if (property) {
      setFormData((prevState) => ({
        ...prevState,
        ...property,
        newlyBuilt: property?.newlyBuilt || false,
        serviced: property?.serviced || false,
        amenities: property.amenities || [],
      }));
      setPropertyStatus((prev) => ({
        ...prev,
        newlyBuilt: property.newlyBuilt || false,
        serviced: property.serviced || false,
      }));
    }
  }, [property]);

  useEffect(() => {
    // Compare formData and originalFormData
    const isFormDataChanged = !_.isEqual(formData, originalFormData.current);
    setSaveUpdate(isFormDataChanged);
    if (isFormDataChanged) setData(formData);
  }, [formData, originalFormData, setSaveUpdate]);

  const fetchStates = async () => {
    try {
      const res = await api.get("/state");
      setAllStates(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStates();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prevState) => {
      if (type === "checkbox") {
        // Handle the checkbox changes for both propertyStatus and amenities
        if (name === "newlyBuilt" || name === "serviced") {
          return {
            ...prevState,
            [name]: checked,
          };
        } else {
          const updatedArray = checked
            ? [...prevState[name], value]
            : prevState[name].filter((item) => item !== value);
          return {
            ...prevState,
            [name]: updatedArray,
          };
        }
      } else {
        // Handle other input types
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const onSubmit = (e) => {
    // if (data === null) {
    //   setEditMode(false);
    // console.log(formData);
    // } else {
    //   console.log(data)
    // }
    handleUpdate(e, formData);
  };

  const fetchAreas = async (stateSelected) => {
    try {
      const Areas = await api.post("/state/area", { state: stateSelected });
      // console.log(Areas.data.data);
      setAreas(Areas.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("formData",formData);
  // console.log("original",originalFormData);
  // console.log(saveUpdate);
  //
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between flex-col md:flex-row ">
        <div
          // onSubmit={onSubmit}
          className=" flex flex-col sm:w-full sm:gap-[20px] gap-[17px]"
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
              name="title"
              onChange={handleChange}
              onClick={(e) => setTitleClicked(true)}
              value={formData?.title || ""}
              placeholder="e.g  Luxurious  4 bedroom duplex"
              className={`h-[45px] md:w-[100%] rounded-[4px] p-[12px]  w-[100%] text-[13px] md:text-[14px] font-[500]  placeholder:text-[13px] ${
                titleClicked
                  ? "bg-inherit text-[#4E4E4E] border-[#4E4E4E] border"
                  : "bg-[#E6E6E6] text-[#A9A9A9]"
              } `}
            />
          </div>
          <div className="grid sm:grid-cols-4 gap-[20px] border-b">
            <MenuItems
              title="Listing Type"
              name="listingType"
              width="100%"
              option1={formData?.listingType}
              setSelectedClicked={setListingClicked}
              selectedClicked={listingClicked}
              items={listingTypeValues}
              onChange={handleChange}
            />
            <MenuItems
              title="Property Type"
              name="propertyType"
              width="100%"
              option1={formData?.propertyType}
              onChange={(e) => {
                handleChange(e);
                setPropertyType(e.target.value);
              }}
              setSelectedClicked={setPropertyTypeClicked}
              selectedClicked={propertyTypeClicked}
              items={propertyTypesSaleRent}
            />
            <MenuItems
              title="Sub-Type"
              name="subType"
              width="100%"
              onChange={handleChange}
              option1={formData?.subType || "Select Sub-Type"}
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
            {formData?.propertyType === "Land" ? (
              <div className="">
                <label
                  className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                  htmlFor="squareMeters"
                >
                  Square Meters <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <input
                  onChange={handleChange}
                  onClick={(e) => setSquareMeterClicked(true)}
                  className={`h-[45px] p-[8px] md:p-[12px] rounded-[4px] w-[100%] text-[13px] md:text-[14px] font-[500]  placeholder:text-[13px] pl-2 ${
                    squareMeterClicked
                      ? "bg-inherit text-[#4E4E4E] border border-[#4E4E4E]"
                      : "bg-[#E6E6E6] text-[#A9A9A9]"
                  } `}
                  name="squareMeter"
                  placeholder="e.g 500 sqm"
                  value={formData?.squareMeter || ""}
                />
              </div>
            ) : (
              <div className="">
                <label
                  className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                  htmlFor="units"
                >
                  Units
                </label>
                <br />
                <input
                  onChange={handleChange}
                  onClick={(e) => setUnitsClicked(true)}
                  className={`relative h-[45px] p-[8px] md:p-[12px] rounded-[4px]  w-[100%] text-[13px] md:text-[14px] font-[500] placeholder:text-[13px] pl-2 ${
                    unitsClicked
                      ? "bg-inherit text-[#4E4E4E] border border-[#4E4E4E]"
                      : "bg-[#E6E6E6] text-[#A9A9A9]"
                  } `}
                  placeholder="e.g 4"
                  name="units"
                  value={formData?.units || ""}
                />

                <span
                  className={`${
                    unitsClicked
                      ? "bg-inherit text-[#0e0d0d] "
                      : "bg-[#E6E6E6] text-[#A9A9A9]"
                  }  text-[14px] font-[500] leading-[21px]  relative bottom-[36px] left-[230px] sm:left-[175px]`}
                >
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
              onChange={(e) => {
                handleChange(e);
                fetchAreas(e.target.value);
              }}
              option1={formData?.state}
              setSelectedClicked={setStateClicked}
              selectedClicked={stateClicked}
              items={allStates}
            />
            <MenuItems
              title="Area"
              name="area"
              width="100%"
              onChange={handleChange}
              setSelectedClicked={setAreaClicked}
              selectedClicked={areaClicked}
              option1={formData?.area}
              items={areas}
            />
            <div className="w-full col-span-2 sm:col-span-1">
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="address"
              >
                Street / Estate / Neighborhood{" "}
                <span className="text-red-500 text-xs">*</span>
              </label>
              <br />
              <input
                onChange={handleChange}
                onClick={(e) => setStreetClicked(true)}
                className={`h-[43px] md:h-[45px] md:w-[100%] p-[4px] md:p-[12px] rounded-[4px]  w-full text-[13px] md:text-[14px] font-[500] placeholder:text-[13px] sm:pl-2 ${
                  streetClicked
                    ? "bg-inherit text-[#4E4E4E] border border-[#4E4E4E]"
                    : "bg-[#E6E6E6] text-[#A9A9A9]"
                } `}
                name="address"
                value={formData?.address || ""}
                placeholder="e.g  No 32,  Andrew  Street,  Lekki"
              />
            </div>
          </div>
          {formData?.propertyType != "Land" && (
            <div className="grid sm:grid-cols-4 gap-[20px] ">
              <MenuItems
                title="Bedrooms"
                name="numberOfRooms"
                width="100%"
                onChange={handleChange}
                option1={formData?.numberOfRooms}
                setSelectedClicked={setBedroomClicked}
                selectedClicked={bedroomClicked}
                items={numberCounts}
              />
              <MenuItems
                title="Bathrooms"
                name="numberOfBathrooms"
                width="100%"
                onChange={handleChange}
                option1={formData?.numberOfBathrooms}
                setSelectedClicked={setBathroomClicked}
                selectedClicked={bathroomClicked}
                items={numberCounts}
              />
              <MenuItems
                title="Toilets"
                name="numberOfToilets"
                width="100%"
                onChange={handleChange}
                setSelectedClicked={setToiletClicked}
                selectedClicked={toiletClicked}
                option1={formData?.numberOfToilets}
                items={numberCounts}
              />

              <div className="sm:pt-6 pt-2">
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
            <div className="w-[100%] h-[100%] inline-flex flex-col gap-2 ">
              <div>
                <label className="text-[14px] font-[500] text-BlackHomz ">
                  Property Description <span className="text-error">*</span>
                </label>
              </div>
              <textarea
                onChange={handleChange}
                onClick={(e) => setDescriptionClicked(true)}
                className={`mt-1 h-[151px] md:h-[90px] rounded-md w-full p-2 md:p-4 text-top placeholder:font-[500] placeholder:text-GrayHomz2 text-[13px] md:text-[14px] font-[500] placeholder:text-[13px]  ${
                  descriptionClicked
                    ? "bg-inherit text-[#4E4E4E] border border-[#4E4E4E] scrollbar-container"
                    : "bg-[#E6E6E6] text-[#A9A9A9]"
                } `}
                placeholder="Give short description of your property."
                // value={description}
                id="description"
                name="description"
                value={formData?.description}
              ></textarea>
            </div>
            {formData?.propertyType === "Land" && (
              <div className="sm:pt-6  sm:w-[349px] inline-block w-[100%]">
                <p
                  className="border bg-[#006AFF] rounded-[4px] text-white flex items-center justify-center px-[8px] py-[12px] font-[400] leading-[21px] text-[14px] w-[100%] h-[37px] cursor-pointer"
                  onClick={() => setOpenAmeni(true)}
                >
                  Click to Select Amenities
                </p>
              </div>
            )}
          </div>
          {formData?.propertyType != "Land" && (
            <div className="flex sm:flex-row sm:gap-[24px] flex-col">
              <select
                name="furnishStatus"
                className={`custom-select h-[43px] md:h-[45px] sm:w-[236px]  p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                onClick={(e) => setFurnishStatusClicked(true)}
                style={{
                  backgroundColor: furnishStatusClicked ? "inherit" : "#E6E6E6",
                  color: furnishStatusClicked ? "#4E4E4E" : "#A9A9A9",
                  border: furnishStatusClicked && "1px solid #4E4E4E",
                }}
                id="furnishStatus"
                onChange={handleChange}
                value={formData?.furnishStatus || ""}
              >
                <option value="" disabled>
                  Select Furnish Status
                </option>
                {furnishStatus.map((type, index) => (
                  <option key={index} value={type}>
                    {capitalizeFirstLetter(type)}
                  </option>
                ))}
              </select>
              <div>
                {Object.entries(propertyStatus).map(([key, value], index) => (
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
                        name={key}
                        id={`checkbox-${index}`}
                        value={value}
                        onChange={(e) => handleChange(e)}
                        checked={formData[key]} // Dynamically check based on formData
                      />
                      <span className="absolute text-BlueHomz transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>
                    <label
                      className="leading-[19.5px] text-[16px] font-[500] md:leading-[21px]"
                      htmlFor={`checkbox-${index}`}
                    >
                      {key === "newlyBuilt" ? "newly built" : key}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex md:justify-end justify-center mt-8">
            <button
              className={`hidden sm:flex border justify-center md:w-[127px] w-[100%] items-center text-[14px] font-[500] py-[8px] px-[12px] border-white ${
                saveUpdate
                  ? "bg-BlueHomz text-white"
                  : "bg-[#E6E6E6] text-[#D5D5D5]"
              } 
                 rounded-[4px]`}
              onClick={onSubmit}
              disabled={!saveUpdate}
            >
              Save Update
            </button>

            <div className="md:hidden flex flex-col w-full">
              <Link
                href={`/dashboard/list_Property/PreviewProperty/${formData?._id}`}
                className="text-[#006AFF] text-[14px] leading-[21px]  md:hidden mx-auto mb-3"
              >
                See public view
              </Link>

              <button
                className={`flex  border justify-center w-full md:w-[77px] items-center text-[14px] font-[500] py-[8px] px-[12px]  border-white ${
                  saveUpdate
                    ? "bg-BlueHomz text-white"
                    : "bg-[#E6E6E6] text-[#D5D5D5]"
                } 
                 rounded-[4px]`}
                onClick={onSubmit}
                disabled={!saveUpdate}
              >
                Save Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Amenities
        isOpen={ameni}
        setOpenAmeni={setOpenAmeni}
        amenitiesPicked={setAmenities}
        selectedAmenities={formData?.amenities}
        setSelectedAmenities={setSelectedAmenities}
        handleEvent={handleChange}
      />
    </div>
  );
};

export default PropertyInfo;
const MenuItems = ({
  title,
  option1,
  name,
  width,
  items,
  onChange,
  setSelectedClicked,
  selectedClicked,
}) => {
  return (
    <div className="custom-select-wrapper">
      <label
        className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
        htmlFor={name}
      >
        {title} <span className="text-red-500 text-xs">*</span>
      </label>
      <br />
      <select
        name={name}
        className={`custom-select h-[43px] md:h-[45px] sm:w-[${width}]  p-[4px] md:p-[12px] rounded-[4px]  w-[100%] text-[13px] md:text-[14px] font-[500]  placeholder:text-[13px]`}
        style={{
          backgroundColor: selectedClicked ? "#E6E6E6" : "inherit",
          color: selectedClicked ? "#A9A9A9" : "#4E4E4E",
          border: !selectedClicked && "1px solid #4E4E4E",
        }}
        id={name}
        onChange={onChange}
        onClick={(e) => setSelectedClicked(false)}
      >
        {selectedClicked && (
          <option value={option1} selected>
            {option1}
          </option>
        )}

        {items &&
          items.map((type, index) => (
            <option key={index} value={type}>
              {typeof type === "String" ? capitalizeFirstLetter(type) : type}
            </option>
          ))}
      </select>
      {/* {errors[name] ? <p className="italic text-error text-[11px] font-[400]">{errors[name].message}</p> : ""} */}
    </div>
  );
};

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
const propertyStatus = { newlyBuilt: false, serviced: false };
