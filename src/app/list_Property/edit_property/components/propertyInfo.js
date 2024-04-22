"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DropDown from "./dropDownTwo";
import { useForm } from "react-hook-form";

const PropertyInfo = ({ property, handleUpdate }) => {
  const [update, setUpdate] = useState(false);
  const [propertyType, setPropertyType] = useState("");

  const listingType =
    property.PropertyInfo?.ListingType && property.PropertyInfo.ListingType;

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
     
      <div className="flex justify-between flex-col md:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col sm:w-full"
        >
          <div className="flex sm:gap-[50px] gap-[24px] flex-col sm:flex-row  sideBarHidden lg:gap-[24px]">
            <div className="flex flex-col gap-[24px]">
              <div className="">
                <label htmlFor="ListingType">
                  Listing Type <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <select
                  name="ListingType"
                  className={`fields duoViewPoint ${
                    !update &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  } h-[43px] sm:h-[45px] sm:w-[473px] sm:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
                  id="ListingType"
                  {...register("ListingType", {
                    required: "Listing type is required",
                  })}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select option
                  </option>
                  <option value="Rent">For Rent</option>
                  <option value="Sale">Ror Sale</option>
                  <option value="Shortlet">Shortlet</option>
                  <option value="Land">Land</option>
                </select>
                {errors.ListingType && (
                  <p className="errorMsg">{errors.ListingType.message}</p>
                )}
              </div>
              <>
                {propertyType === "Land" || listingType === "Land" ? (
                  <>
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
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } h-[43px] sm:h-[45px] sm:w-[473px] sm:p-[12px] pl-2 rounded-[4px] adminCellBorders w-[335px]`}
                      />
                      {errors.Title && (
                        <p className="errorMsg">Property's title is required</p>
                      )}
                    </div>
                    <div className="">
                      <label htmlFor="LandType">
                        Land Type{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <select
                        name="LandType"
                        // className={`h-[43px] sm:h-[45px] sm:w-[473px] fields duoViewPoint  sm:p-[12px] rounded-[4px] adminCellBorders w-[335px] ${
                        //   !propertyType && "opacity-50"
                        // } `}
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } h-[43px] sm:h-[45px] sm:w-[473px] sm:p-[12px] pl-2 rounded-[4px] adminCellBorders w-[335px]`}
                        id="LandType"
                        {...register("LandType", {
                          required: "Land type is required",
                        })}
                      >
                        <option value="" disabled selected>
                          Select option
                        </option>
                        <option value="Commercial">Commercial Land</option>
                        <option value="Residential">Residential Land</option>
                        <option value="Mixed-Use">Mixed-Use Land</option>
                        <option value="Industrial">Industrial Land</option>
                        <option value="Farmland">Farmland</option>
                      </select>
                      {errors.LandType && (
                        <p className="errorMsg">{errors.LandType.message}</p>
                      )}
                    </div>
                    <div className="">
                      <label htmlFor="SquareMetres">
                        Square Metres{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        {...register("SquareMetres", {
                          required: "Square Metres is required",
                        })}
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } h-[43px] sm:h-[45px] sm:w-[473px] sm:p-[12px] pl-2 rounded-[4px] adminCellBorders w-[335px]`}
                        placeholder="Enter Square Metres"
                      />
                      {errors.SquareMetres && (
                        <span className="text-red-500 text-xs">
                          {errors.SquareMetres.message}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="Name">
                        {" "}
                        Name <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        {...register("Name", {
                          required: true,
                        })}
                        placeholder="Property Name"
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } h-[43px] sm:h-[45px] sm:w-[473px] sm:p-[12px] pl-2 rounded-[4px] adminCellBorders w-[335px]`}
                      />
                      {errors.Name && (
                        <p className="errorMsg">Property's name is required</p>
                      )}
                    </div>
                    <div className="">
                      <label htmlFor="Property_Type">
                        Property Type{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <select
                        name="Property_Type"
                        id="Property_Type"
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } h-[43px] sm:h-[45px] sm:w-[473px] sm:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
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
                        <option value="Studio_Apartment">
                          Studio Apartment
                        </option>
                        <option value="Block_of_flats">Block of flats</option>
                        <option value="Detached_Bungalow">
                          Detached Bungalow
                        </option>
                        <option value="Semi-Detached-Bungalow">
                          Semi-Detached Bungalow
                        </option>
                        <option value="Terraced-Bungalow">
                          Terraced Bungalow
                        </option>
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
                          className="w-[158px] h-[43px] sm:w-[228px] fields duoViewPoint dropdwField sm:h-[45px] adminCellBorders rounded-[4px] p-[12px]"
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
                        <select
                          name="Area"
                          id="Area"
                          className="w-[158px] h-[43px] sm:w-[228px] fields duoViewPoint dropdwField  sm:h-[45px] adminCellBorders rounded-[4px] p-[12px]"
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
                    <div className="">
                      <label htmlFor="Street">
                        Street <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        {...register("Street", {
                          required: "Street name is required",
                        })}
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } h-[43px] sm:h-[45px] sm:w-[473px] sm:p-[12px] rounded-[4px] adminCellBorders w-[335px] pl-2`}
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
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } h-[43px] sm:h-[45px] sm:w-[473px] sm:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
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
                  </>
                )}
              </>
            </div>
            <div className="flex  flex-col gap-[24px] ">
              {propertyType === "Land" || listingType === "Land" ? (
                <>
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
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } w-[158px] h-[43px] sm:w-[228px] p-[12px] rounded-[4px] adminCellBorders`}
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
                      <select
                        name="Area"
                        id="Area"
                        className={`fields duoViewPoint ${
                          !update &&
                          "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                        } w-[158px] h-[43px] sm:w-[228px] p-[12px] rounded-[4px] adminCellBorders`}
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
                  <div className="">
                    <label htmlFor="Street">
                      Street <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <input
                      {...register("Street", {
                        required: "Street name is required",
                      })}
                      className={`fields duoViewPoint ${
                        !update &&
                        "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                      } h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
                      placeholder="Enter street name"
                    />
                    {errors.Street && (
                      <span className="text-red-500 text-xs">
                        {errors.Street.message}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="">
                    <label htmlFor="Bathrooms">
                      Bathrooms <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <select
                      name="Bathrooms"
                      id="Bathrooms"
                      className={`fields duoViewPoint ${
                        !update &&
                        "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                      } h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
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
                      className={`fields duoViewPoint ${
                        !update &&
                        "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                      } h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] adminCellBorders w-[335px]`}
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
                </>
              )}
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
                  className={` ${
                    !update &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  } mt-1 md:h-[280px] rounded-md adminCellBorders w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 `}
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
                  onClick={() => setUpdate(true)}
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
