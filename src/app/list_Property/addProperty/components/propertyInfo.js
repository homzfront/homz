"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DropDown from "./dropDownTwo";
import { useForm } from "react-hook-form";

const PropertyInfo = ({ handlePropertyInfo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    reset();
    handlePropertyInfo(data);
  };

  const Area = [
    "Ajah",
    "Lekki",
    "Ikotun",
    "Adolor",
    "Challenge",
    "Ekaite",
    "Musa",
    "Jalingo",
  ];

  const State = [
    "Lagos",
    "Oyo",
    "Calabar",
    "Edo",
    "Kwara",
    "Kano",
    "Abuja",
    "Ondo",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="md:text-[23px] font-[700] text-BlueHomz leading-[20.16px] md:leading-[28.98px]">
        Property Details
      </div>
      <div className="leading-[16.38px] text-[13px] md:text-[14px] font-[400]">
        Kindly fill in the accurate property details
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col md:w-full"
        >
          <div className="flex md:gap-[50px] gap-[24px] flex-col md:flex-row">
            <div className="flex flex-col md:gap-[28px] gap-[24px]">
              <div>
                <label htmlFor="Title">
                  {" "}
                  Title <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <input
                  {...register("Title", {
                    required: true,
                  })}
                  placeholder="Property Title"
                  className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px]"
                />
                {errors.Title && (
                  <p className="errorMsg">Property's title is required</p>
                )}
              </div>
              <div className="">
                <label htmlFor="Property_Type">
                  Property Type <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <select
                  name="Property_Type"
                  id="Property_Type"
                  className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]"
                  {...register("Property_Type", {
                    required: true,
                  })}
                >
                  <option value="" disabled selected>
                    Select Property Type
                  </option>
                  <option value="Boys_Quarters">Boys Quarters</option>
                  <option value="Mini-flat">Mini-flat</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Self_contain">Self contain</option>
                  <option value="Studio_Apartment">Studio Apartment</option>
                  <option value="Block_of_flats">Block of flats</option>
                  <option value="Detached_Bungalow">Detached Bungalow</option>
                  <option value="Semi-Detached-Bungalow">
                    Semi-Detached Bungalow
                  </option>
                  <option value="Terraced-Bungalow">Terraced Bungalow</option>
                  <option value="Detached-Duplex">Detached Duplex</option>
                  <option value="Semi-Detached-Duplex">
                    Semi-Detached Duplex
                  </option>
                  <option value="Terraced-Duplex">Terraced Duplex</option>
                </select>
                {errors.Property_Type && (
                  <p className="errorMsg">Property Type is required.</p>
                )}
              </div>
              <div className="">
                <label htmlFor="Property_Location">
                  Property Location{" "}
                  <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <div className="flex gap-4">
                  <select
                    name="State"
                    id="State"
                    className="w-[158px] h-[43px] md:w-[228px] md:h-[45px] adminCellBorders rounded-[4px] p-[12px]"
                    {...register("State", {
                      required: true,
                    })}
                  >
                    <option value="" disabled selected>
                      Select State
                    </option>
                    {State.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.State && (
                    <p className="errorMsg">State is required.</p>
                  )}
                  <select
                    name="Area"
                    id="Area"
                    className="w-[158px] h-[43px] md:w-[228px] md:h-[45px] adminCellBorders rounded-[4px] p-[12px]"
                    {...register("Area", {
                      required: "Area is required.",
                    })}
                  >
                    <option value="" disabled selected>
                      Select Area
                    </option>
                    {Area.map((area, index) => (
                      <option key={index} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  {errors.Area && (
                    <p className="errorMsg">{errors.Area.message}</p>
                  )}
                </div>
              </div>
              <div className="">
                <label htmlFor="Street">
                  Street <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <input
                  {...register("Street", {
                    required: "Street name is required",
                  })}
                  className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px] pl-2"
                  placeholder="Enter street name"
                />
                {errors.Street && (
                  <span className="text-red-500 text-xs">
                    {errors.Street.message}
                  </span>
                )}
              </div>
              <div className="">
                <label htmlFor="Rooms">
                  Rooms <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <select
                  name="Rooms"
                  className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]"
                  id="Rooms"
                  {...register("Rooms", {
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
                {errors.Rooms && (
                  <p className="errorMsg">{errors.Rooms.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[24px] md:gap-[28px]">
              <div className="">
                <label htmlFor="Bathrooms">
                  Bathrooms <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <select
                  name="Bathrooms"
                  id="Bathrooms"
                  className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]"
                  {...register("Bathrooms", {
                    required: "Number of athrooms is required",
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
                {errors.Bathrooms && (
                  <p className="errorMsg">{errors.Bathrooms.message}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="Toilets">
                  Toilets <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <select
                  name="Toilets"
                  id="Toilets"
                  className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]"
                  {...register("Toilets", {
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
                {errors.Toilets && (
                  <p className="errorMsg">{errors.Toilets.message}</p>
                )}
              </div>
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
                  {...register("Description", {
                    required: "Property description is required.",
                    minLength: {
                      value: 10,
                      message: "Minimum length should be 10.",
                    },
                  })}
                  className="mt-1 md:h-[280px] rounded-md adminCellBorders w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
                  placeholder="Property Description"
                  // value={Description}
                  id="Description"
                  name="Description"
                ></textarea>
                {errors.Description && (
                  <p className="errorMsg">{errors.Description.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8 ">
            <div>
              <button
                className="text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] text-BlueHomz adminBorders border-BlueHomz md:w-full w-[158px]"
                // onClick={handleShowCancelDialogue}
              >
                Cancel
              </button>
            </div>

            <div className="">
              <button
                disabled={!isValid ? true : false}
                className={`flex md:mr-14 adminBorders justify-center  md:w-[77px] w-[158px] items-center text-[14px] font-[500] py-[8px] px-[12px] ${
                  !isValid
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
