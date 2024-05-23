"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "/src/utils/api";
import { useForm } from "react-hook-form";
import { ThreeCircles } from "react-loader-spinner";

const PropertyInfo = ({ handlePropertyInfo }) => {
  const [propertyType, setPropertyType] = useState("");
  const [areas, setAreas] = useState(null);
  const [allStates, setAllStates] = useState(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await api.get("/state");
      setAllStates(res.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchAreas = async (stateSelected) => {
    try {
      const Areas = await api.post("/state/area", { state: stateSelected });
      setAreas(Areas);
    } catch (error) {
      // console.log(error);
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

  const onSubmit = (data) => {
    // reset();
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
      <div className="flex justify-between flex-col md:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col md:w-full"
        >
          <div className="flex md:gap-[50px] gap-[24px] flex-col md:flex-row  sideBarHidden lg:gap-[24px]">
            <div className="flex flex-col gap-[24px]">
              <div className="">
                <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="listingType">
                  Listing Type <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <select
                  name="listingType"
                  className="h-[43px] md:h-[45px] md:w-[473px] fields p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                  id="listingType"
                  {...register("listingType", {
                    required: "Listing type is required",
                  })}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select option
                  </option>
                  {listingTypeValues.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.listingType && (
                  <p className="errorMsg">{errors.listingType.message}</p>
                )}
              </div>
              <>
                {propertyType === "land" ? (
                  <>
                    <div>
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="title">
                        {" "}
                        Title <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        {...register("title", {
                          required: true,
                        })}
                        placeholder="Property Title"
                        className="h-[43px] md:h-[45px] md:w-[473px] fields p-[8px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                      />
                      {errors.Title && (
                        <p className="errorMsg">Property's title is required</p>
                      )}
                    </div>
                    <div className="">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="landType">
                        Land Type{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <select
                        name="landType"
                        className={`h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!propertyType && "opacity-50"
                          } `}
                        id="landType"
                        {...register("landType", {
                          required: "Land type is required",
                        })}
                      >
                        <option value="" disabled selected>
                          Select option
                        </option>

                        {landTypeValues.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.landType && (
                        <p className="errorMsg">{errors.landType.message}</p>
                      )}
                    </div>
                    <div className="">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="squareMeter">
                        Square Metres{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        {...register("squareMeter", {
                          required: "Square Metres is required",
                        })}
                        className="h-[43px] md:h-[45px] md:w-[473px] p-[8px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2"
                        placeholder="Enter Square Metres"
                      />
                      {errors.squareMetres && (
                        <span className="text-red-500 text-xs">
                          {errors.squareMetres.message}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="name">
                        {" "}
                        Name <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        {...register("name", {
                          required: true,
                        })}
                        placeholder="Property Name"
                        className="h-[43px] md:h-[45px] md:w-[473px] p-[8px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                      />
                      {errors.name && (
                        <p className="errorMsg">Property's name is required</p>
                      )}
                    </div>
                    <div className="">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="propertyType">
                        Property Type{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <select
                        name="propertyType"
                        id="propertyType"
                        className="h-[43px] md:h-[45px] md:w-[473px] fields p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                        {...register("propertyType", {
                          required: true,
                        })}
                      >
                        <option value="" disabled selected>
                          Select Property Type
                        </option>
                        {propertyTypeValues.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.propertyType && (
                        <p className="errorMsg">Property Type is required.</p>
                      )}
                    </div>
                    <div className="">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Property_Location">
                        Property Location{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <div className="flex gap-4">
                        <select
                          name="state"
                          id="state"
                          className="w-[100%] h-[43px] md:w-[228px] px-[6px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                          {...register("state", {
                            // required: true,
                          })}
                          onChange={(e) => fetchAreas(e.target.value)}
                        >
                          <option value="" disabled selected>
                            Select State
                          </option>
                          {allStates &&
                            allStates.map((state, index) => (
                              <option key={index} value={state}>
                                {state}
                              </option>
                            ))}
                        </select>
                        {errors.state && (
                          <p className="errorMsg">State is required.</p>
                        )}
                        <select
                          name="area"
                          id="area"
                          className="w-[100%] h-[43px] md:w-[228px] px-[6px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                          {...register("area", {
                            // required: "Area is required.",
                          })}
                        >
                          <option value="" disabled selected>
                            Select Area
                          </option>
                          {areas?.data?.data &&
                            areas.data.data.map((area, index) => (
                              <option key={index} value={area}>
                                {area}
                              </option>
                            ))}
                        </select>

                        {errors.area && (
                          <p className="errorMsg">{errors.area.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="address">
                        Street <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        {...register("address", {
                          required: "Street name is required",
                        })}
                        className="h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2"
                        placeholder="Enter street name"
                      />
                      {errors.address && (
                        <span className="text-red-500 text-xs">
                          {errors.address.message}
                        </span>
                      )}
                    </div>
                    <div className="">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="numberOfRooms">
                        Rooms <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <select
                        name="numberOfRooms"
                        className="h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                        id="numberOfRooms"
                        {...register("numberOfRooms", {
                          required: "Number of rooms is required",
                        })}
                      >
                        <option value="" disabled selected>
                          0
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </select>
                      {errors.numberOfRooms && (
                        <p className="errorMsg">
                          {errors.numberOfRooms.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </>
            </div>
            <div className="flex  flex-col gap-[24px] ">
              {propertyType === "land" ? (
                <>
                  <div className="">
                    <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Property_Location">
                      Property Location{" "}
                      <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <div className="flex gap-4">
                      <select
                        name="state"
                        id="state"
                        className="w-[100%] h-[43px] md:w-[228px] px-[6px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                        {...register("state", {
                          required: true,
                        })}
                        onChange={(e) => fetchAreas(e.target.value)}
                      >
                        <option value="" disabled selected>
                          Select State
                        </option>
                        {allStates &&
                          allStates.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          ))}
                      </select>
                      {errors.state && (
                        <p className="errorMsg">State is required.</p>
                      )}
                      <select
                        name="area"
                        id="area"
                        className="w-[100%] h-[43px] md:w-[228px] px-[6px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                        {...register("area", {
                          required: "Area is required.",
                        })}
                      >
                        <option value="" disabled selected>
                          Select Area
                        </option>
                        {areas?.data?.data &&
                          areas.data.data.map((area, index) => (
                            <option key={index} value={area}>
                              {area}
                            </option>
                          ))}
                      </select>
                      {errors.area && (
                        <p className="errorMsg">{errors.area.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="address">
                      Street <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <input
                      {...register("address", {
                        required: "Street name is required",
                      })}
                      className="h-[43px] md:h-[45px] md:w-[473px] p-[8px]  md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2"
                      placeholder="Enter street name"
                    />
                    {errors.address && (
                      <span className="text-red-500 text-xs">
                        {errors.address.message}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="numberOfBathrooms">
                      Bathrooms <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <select
                      name="numberOfBathrooms"
                      id="numberOfBathrooms"
                      className="h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                      {...register("numberOfBathrooms", {
                        required: "Number of bathrooms is required",
                      })}
                    >
                      <option value="" disabled selected>
                        0
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                    {errors.numberOfBathrooms && (
                      <p className="errorMsg">
                        {errors.numberOfBathrooms.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="numberOfToilets">
                      Toilets <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <select
                      name="numberOfToilets"
                      id="numberOfToilets"
                      className="h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]"
                      {...register("numberOfToilets", {
                        required: "Number of toilets is required",
                      })}
                    >
                      <option value="" disabled selected>
                        0
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                    {errors.numberOfToilets && (
                      <p className="errorMsg">
                        {errors.numberOfToilets.message}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div className="w-[100%] h-[100%] pb-6 flex flex-col gap-2">
                <div>
                  <label className="text-[14px] font-[500] text-BlackHomz ">
                    Property Description <span className="text-error">*</span>
                  </label>
                  <p className="text-[13px] font-[400] text-GrayHomz pt-2">
                    Give short description of your property.
                  </p>
                </div>
                <textarea
                  {...register("description", {
                    required: "Property description is required.",
                    minLength: {
                      value: 10,
                      message: "Minimum length should be 10.",
                    },
                  })}
                  className="mt-1 h-[140px] md:h-[280px] rounded-md border w-full p-2 md:p-4 text-top placeholder:font-[500] placeholder:text-GrayHomz2 text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] scrollbar-container"
                  placeholder="Property description"
                  // value={description}
                  id="description"
                  name="description"
                ></textarea>
                {errors.description && (
                  <p className="errorMsg">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8 ">
            <div>
              <button
                className="text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] text-BlueHomz border border-BlueHomz md:w-full "
              // onClick={handleShowCancelDialogue}
              >
                Cancel
              </button>
            </div>

            <div className="">
              <button
                disabled={!isValid ? true : false}
                className={`flex md:mr-14 border justify-center  md:w-[77px]  items-center text-[14px] font-[500] py-[8px] px-[12px] ${!isValid
                    ? "text-GrayHomz bg-GrayHomz5 border-[#A9A9A9]"
                    : "text-white border-white bg-BlueHomz"
                  } rounded-[4px]`}
                type="submit"
              >
                Next
                {!isValid ? (
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                    }
                    alt=""
                    height={16}
                    width={16}
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
        </form>
      </div>
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
const listingTypeValues = ["for rent", "for sale", "shortlet", "land"];
const landTypeValues = [
  "commercial land",
  "residential land",
  "mixed-used land",
  "industrial land",
  "farmland",
];
