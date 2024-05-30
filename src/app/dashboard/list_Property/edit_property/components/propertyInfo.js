"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import api from "@/utils/api";

const PropertyInfo = ({ property, handleUpdate, setEditMode, editMode }) => {
  // console.log(property);
  const [areas, setAreas] = useState(null);
  const [allStates, setAllStates] = useState(null);
  const [formData, setFormData] = useState(property || {});
  const [data, setData] = useState(null)
  const [empty, setEmpty] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'listingType') {
      setData((prevData) => ({
        listingType: value,
        // Remove every other data collected when listingType changes
        ...(value !== prevData?.listingType && {
          [name]: value,
        }),
      }));
      // setFormData({
      //   ...formData,
      //   name: null,
      //   title: null
      // });
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
        listingType: formData?.listingType,
        [formData?.listingType === 'land' ? 'title' : 'name']: formData?.[formData?.listingType === 'land' ? 'title' : 'name'] || '',
      }));
    }
  };


  const onSubmit = () => {
    if (data === null) {
      setEditMode(false);
    } else {
      handleUpdate(data);
    }
  };


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

  // console.log(formData);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between flex-col md:flex-row">
        <div
          className=" flex flex-col md:w-full"
        >
          <div className="flex md:gap-[50px] gap-[24px] flex-col md:flex-row lg:gap-[24px]">
            <div className="flex flex-col gap-[24px]">
              <div className="custom-select-wrapper">
                <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="listingType">
                  Listing Type <span className="text-red-500 text-xs">*</span>
                </label>
                <br />
                <select
                  name="listingType"
                  className={`custom-select h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                  onChange={handleChange}

                >
                  <option>
                    {capitalizeFirstLetter(formData?.listingType) || "select option"}
                  </option>
                  <option value="for rent">For Rent</option>
                  <option value="for sale">For Sale</option>
                  <option value="shortlet">Shortlet</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <>
                {formData?.listingType == 'land' ? (
                  <>
                    <div>
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Title">
                        {" "}
                        Title <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        name="title"
                        placeholder="title"
                        onChange={handleChange}

                        value={formData?.title || ""}
                        className={`h-[43px] md:h-[45px] md:w-[473px] p-[8px] md:p-[12px]  rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                      />
                    </div>
                    <div className="custom-select-wrapper">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="LandType">
                        Land Type{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <select
                        name="landType"
                        onChange={handleChange}

                        className={`custom-select h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                      >
                        <option >
                          {capitalizeFirstLetter(formData?.landType) || "select option"}
                        </option>
                        <option value="commercial land">Commercial Land</option>
                        <option value="residential land">Residential Land</option>
                        <option value="mixed-used land">Mixed-Used Land</option>
                        <option value="industrial land">Industrial Land</option>
                        <option value="farmland land">Farmland</option>
                      </select>
                    </div>
                    <div className="">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="SquareMetres">
                        Square Metres{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        name="squareMeter"
                        onChange={handleChange}

                        className={`h-[43px] md:h-[45px] md:w-[473px] p-[8px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                        placeholder="Enter Square Metres"
                        value={formData?.squareMeter}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Name">
                        {" "}
                        Name <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        name="name"
                        onChange={handleChange}

                        placeholder="Property Name"
                        value={formData?.name || ""}
                        className={`h-[43px] md:h-[45px] md:w-[473px] p-[8px] md:p-[12px]  rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                      />
                    </div>
                    <div className="custom-select-wrapper">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Property_Type">
                        Property Type{" "}
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <select
                        name="propertyType"
                        onChange={handleChange}

                        className={`custom-select h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                      >
                        <option>
                          {capitalizeFirstLetter(formData?.propertyType) || "Select Property Type"}
                        </option>
                        <option value="boys quarters">Boys Quarters</option>
                        <option value="mini-flat">Mini-flat</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="self contain">Self contain</option>
                        <option value="studio apartment">
                          Studio Apartment
                        </option>
                        <option value="block of flats">Block of flats</option>
                        <option value="detached bungalow">
                          Detached Bungalow
                        </option>
                        <option value="semi-detached bungalow">
                          Semi-Detached Bungalow
                        </option>
                        <option value="terraced bungalow">
                          Terraced Bungalow
                        </option>
                        <option value="detached duplex">Detached Duplex</option>
                        <option value="semi-detached duplex">
                          Semi-Detached Duplex
                        </option>
                        <option value="terraced duplex">Terraced Duplex</option>
                      </select>
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

                          className="custom-select w-[100%] h-[43px] md:w-[228px] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] md:h-[45px] border px-1 rounded-[4px] flex justify-center items-center"
                          onChange={
                            (e) => {
                              handleChange
                              fetchAreas(e.target.value)
                            }
                          }
                        >
                          <option>
                            {capitalizeFirstLetter(formData?.state) || "Select State"}
                          </option>
                          {allStates &&
                            allStates.map((state, index) => (
                              <option key={index} value={state}>
                                {state}
                              </option>
                            ))}
                        </select>
                        <select
                          name="area"
                          onChange={handleChange}

                          className="custom-select w-[100%] h-[43px] md:w-[228px] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] md:h-[45px] border px-1 rounded-[4px] flex justify-center items-center"
                        >
                          <option>
                            {capitalizeFirstLetter(formData?.area) || "Select Area"}
                          </option>
                          {areas?.data?.data &&
                            areas.data.data.map((area, index) => (
                              <option key={index} value={area}>
                                {area}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Street">
                        Street <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <input
                        name="address"
                        onChange={handleChange}

                        className={`h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2`}
                        placeholder="Enter street name"
                        value={formData?.address}
                      />
                    </div>
                    <div className="custom-select-wrapper">
                      <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Rooms">
                        Rooms <span className="text-red-500 text-xs">*</span>
                      </label>
                      <br />
                      <select
                        name="numberOfRooms"
                        onChange={handleChange}

                        className={`custom-select h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                        id="Rooms"
                      >
                        <option>
                          {formData?.numberOfRooms || 0}
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
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                      </select>
                    </div>
                  </>
                )}
              </>
            </div>
            <div className="flex  flex-col gap-[24px] ">
              {formData?.listingType == 'land' ? (
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

                        className={`custom-select w-[100%] h-[43px] md:w-[228px] px-[6px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                        onChange={
                          (e) => {
                            handleChange
                            fetchAreas(e.target.value)
                          }
                        }
                      >
                        <option>
                          {capitalizeFirstLetter(formData?.state) || "Select State"}
                        </option>
                        {allStates &&
                          allStates.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          ))}
                      </select>
                      <select
                        name="area"
                        onChange={handleChange}

                        className={`custom-select w-[100%] h-[43px] md:w-[228px] px-[6px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                      >
                        <option>
                          {capitalizeFirstLetter(formData?.area) || "Select Area"}
                        </option>
                        {areas?.data?.data &&
                          areas.data.data.map((area, index) => (
                            <option key={index} value={area}>
                              {area}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Street">
                      Street <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <input
                      name="address"
                      onChange={handleChange}

                      className={`h-[43px] md:h-[45px] md:w-[473px] p-[8px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                      placeholder="Enter street name"
                      value={formData?.address}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="custom-select-wrapper">
                    <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Bathrooms">
                      Bathrooms <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <select
                      name="numberOfBathrooms"
                      onChange={handleChange}

                      className={`custom-select h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                    >
                      <option>
                        {formData?.numberOfBathrooms || 0}
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
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                  <div className="custom-select-wrapper">
                    <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Toilets">
                      Toilets <span className="text-red-500 text-xs">*</span>
                    </label>
                    <br />
                    <select
                      name="numberOfToilets"
                      onChange={handleChange}

                      className={`custom-select h-[43px] md:h-[45px] md:w-[473px] p-[4px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]`}
                    >
                      <option>
                        {formData?.numberOfToilets || 0}
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
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                    </select>
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
                  className={` mt-1 h-[140px] md:h-[280px] rounded-md border w-full p-2 md:p-4 text-top placeholder:font-[500] placeholder:text-GrayHomz2 text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] scrollbar-container`}
                  placeholder="Property Description"
                  onChange={handleChange}

                  name="description"
                  value={formData?.description}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex md:justify-end justify-center mt-8">
            <div className="hidden md:block">
              <button className="flex border justify-center md:w-[127px] w-[100%] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz rounded-[4px]"
                onClick={onSubmit}>
                Update
              </button>
            </div>
            <div className="md:hidden flex flex-col w-full">
              <Link
                href={`/dashboard/list_Property/PreviewProperty/${formData?._id}`}
                className="text-[#006AFF] text-[14px] leading-[21px]  md:hidden mx-auto mb-3"
              >
                See public view
              </Link>
              <button
                className="flex border justify-center w-full md:w-[77px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                onClick={onSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
