"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DropDown from "./dropDownTwo";
import { useForm } from "react-hook-form";

const PropertyInfo = ({ property, handleUpdate }) => {
  const [update, setUpdate] = useState(false);
  // console.log(propertyInfo)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
    defaultValues: property.PropertyInfo,
  });

  useEffect(() => {
    reset(property.PropertyInfo);
  }, [property.PropertyInfo, reset]);

  const onSubmit = (data) => {
    // setData(data)
    handleUpdate(data);
  };

  const Areas = [
    "Ajah",
    "Lekki",
    "Ikotun",
    "Adolor",
    "Challenge",
    "Ekaite",
    "Musa",
    "Ikeja",
    "Oshodi",
    "Surulere",
    "Agege",
    "Yaba",
    "Victoria Island",
    "Lekki Phase One",
    "Badagry",
    "Jalingo",
  ];

  const States = [
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
      <div className="leading-[16.38px] text-[13px] md:text-[14px] font-[400] md:hidden">
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
                <label htmlFor="Name">
                  {" "}
                  Name <span className="text-red-500 text-[16px]">*</span>
                </label>
                <br />
                <input
                  {...register("Title", {
                    required: true,
                  })}
                  placeholder="Property Name"
                  className={`h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 adminCellBorders w-[335px] ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"}`}
                />
                {errors.Title && (
                  <p className="errorMsg">Property's name is required</p>
                )}
              </div>
              <div className="">
                <label htmlFor="Property_type">
                  Property Type <span className="text-red-500 text-[16px]">*</span>
                </label>
                <br />
                <select
                  name="Property_type"
                  id="Property_type"
                  className={`h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px] ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"}`}
                  {...register("Property_type", {
                    required: true,
                  })}
                >
                  <option value="" disabled selected>
                    Select Property Type
                  </option>
                  <option value="Boys Quarters">Boys Quarters</option>
                  <option value="Mini flat">Mini-flat</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Self contain">Self contain</option>
                  <option value="Studio Apartment">Studio Apartment</option>
                  <option value="Block of flats">Block of flats</option>
                  <option value="Detached Bungalow">Detached Bungalow</option>
                  <option value="Semi-Detached Bungalow">
                    Semi-Detached Bungalow
                  </option>
                  <option value="Terraced Bungalow">Terraced Bungalow</option>
                  <option value="Detached Duplex">Detached Duplex</option>
                  <option value="Semi-Detached Duplex">
                    Semi-Detached Duplex
                  </option>
                  <option value="Terraced Duplex">Terraced Duplex</option>
                </select>
                {errors.Property_type && (
                  <p className="errorMsg">Property Type is required.</p>
                )}
              </div>
              <div className="">
                <label htmlFor="Property_Location">
                  Property Location{" "}
                  <span className="text-red-500 text-[16px]">*</span>
                </label>
                <br />
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <select
                      name="State"
                      id="State"
                      className={`w-[158px] h-[43px] md:w-[228px] md:h-[45px] adminCellBorders rounded-[4px] p-[12px] ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"}`}
                      {...register("State", {
                        required: true,
                      })}
                    >
                      <option value="" disabled selected>
                        Select State
                      </option>
                      {States.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.State && (
                      <p className="errorMsg">State is required.</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <select
                      name="Area"
                      id="Area"
                      className={`${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"} w-[158px] h-[43px] md:w-[228px] md:h-[45px] adminCellBorders rounded-[4px] p-[12px]`}
                      {...register("Area", {
                        required: "Area is required.",
                      })}
                    >
                      <option value="" disabled selected>
                        Select Area
                      </option>
                      {Areas.map((area, index) => (
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
              </div>
              <div className="">
                <label htmlFor="Property Address">
                Property Address <span className="text-red-500 text-[16px]">*</span>
                </label>
                <br />
                <input
                  {...register("PropertyAddress", {
                    required: "Street name is required",
                  })}
                  className={` ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"} h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px] pl-2`}
                  placeholder="Property Address"
                />
                {errors.Street && (
                  <span className="text-red-500 text-[16px]">
                    {errors.Street.message}
                  </span>
                )}
              </div>
              <div className="">
                <label htmlFor="Bedrooms">
                Total Number of Rooms <span className="text-red-500 text-[16px]">*</span>
                </label>
                <br />
                <select
                  name="Bedrooms"
                  className={` ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"} h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
                  id="Bedrooms"
                  {...register("Bedrooms", {
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
                {errors.Bedrooms && (
                  <p className="errorMsg">{errors.Bedrooms.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[24px] md:gap-[28px]">
              <div className="">
                {/* <label htmlFor="Bathrooms" className="hidden md:block">
                  Bathrooms <span className="text-red-500 text-[16px]">*</span>
                </label> */}
                <label htmlFor="Bathrooms" className="">
                Total Number of Bathrooms <span className="text-red-500 text-[16px]">*</span>
                </label>
                <br />
                <select
                  name="Bathroom"
                  id="Bathroom"
                  className={` ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"} h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
                  {...register("Bathroom", {
                    required: "Number of Bathrooms is required",
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
                {errors.Bathroom && (
                  <p className="errorMsg">{errors.Bathroom.message}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="Toilets">
                Total Number of Toilets <span className="text-red-500 text-[16px]">*</span>
                </label>
                <br />
                <select
                  name="Toilets"
                  id="Toilets"
                  className={` ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"} h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
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
                  <p className="text-[13px] font-[400] text-GrayHomz pt-1">
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
                  className={` ${!update && "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"} mt-1 md:h-[280px] rounded-md adminCellBorders w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 `}
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
          <div className="flex  md:justify-end justify-center mt-8 ">
            
            <button
              className="hidden md:flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
              type="submit"
            >
              Update
            </button>
            <div className="md:hidden flex flex-col ">
            <Link
              href=""
              className="text-[#006AFF] text-[14px] leading-[21px]  md:hidden mx-auto mb-3"
            >
              See public view
            </Link>
              {update ? (
                <button
                  className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                  type="submit"
                >
                  Save Update
                </button>
              ) : (
                <div
                  className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                  onClick={()=> setUpdate(true)}
                >
                  Update
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyInfo;
