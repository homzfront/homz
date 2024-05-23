"use client";
import React, { useState } from "react";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const RentDetails = ({ property, handleUpdate, setEditMode, editMode }) => {
  // console.log(property)
  const [formData, setFormData] = useState(property || {});
  const [data, setData] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // console.log(data);

  const onSubmit = () => {
    if (data === null) {
      setEditMode(false);
    } else {
      handleUpdate(data);
    }
  };

  return (
    <div className="px-0">
      <div
        className=" flex flex-col md:w-full mt-6"
      >
        <div className="flex md:gap-[45px] gap-[24px] flex-col md:flex-row sideBarHidden">
          <div className="flex flex-col md:gap-[28px] gap-[24px]">
            <div className="custom-select-wrapper">
              <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Payment_Type">Payment Type</label>
              <br />
              <select
                name="paymentType"
                onChange={handleChange}
                disabled={!editMode}
                className={`custom-select h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] md:pl-0 rounded-[4px] pl-2 fields duoViewPoint border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!editMode &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit"
                  }`}
              >
                <option>
                  {capitalizeFirstLetter(formData?.paymentType) || "select option"}
                </option>
                <option value="outright payment">Outright Payment</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="6 months">Every 6 Months</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="Price">
                Price
              </label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] bottom-0 flex items-center ${!formData?.price && "opacity-50"
                    }`}
                >
                  N
                </span>
                <input
                  name="price"
                  placeholder="00.00"
                  value={formData?.price}
                  className={`h-[43px] md:h-[45px] md:w-full py-[12px] pl-8 rounded-[4px]  fields duoViewPoint border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]  ${!editMode &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit"
                    }`}
                  type="number"
                  min="0"
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
            <div>
              <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="totalFee">How much is the total fee?</label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] bottom-0 flex items-center ${!formData?.totalFee && "opacity-60"
                    }`}
                >
                  N
                </span>
                <input
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] md:w-full py-[12px] pl-8 rounded-[4px]  fields duoViewPoint border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]  ${!editMode &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit"
                    }`}
                  type="number"
                  name="totalFee"
                  min="0"
                  onChange={handleChange}
                  disabled={!editMode}
                  value={formData?.totalFee}
                />
              </div>
            </div>
          </div>
          <div className="flex md:gap-[28px] gap-[24px] flex-col">
            <div>
              <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="agencyFee">How much is the Agency fee?</label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] bottom-0 flex items-center ${!formData?.agencyFee && "opacity-60"
                    }`}
                >
                  N
                </span>
                <input
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] md:w-full py-[12px] pl-8 rounded-[4px]  fields duoViewPoint border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]  ${!editMode &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit"
                    }`}
                  type="number"
                  name="agencyFee"
                  min="0"
                  onChange={handleChange}
                  disabled={!editMode}
                  value={formData?.agencyFee}
                />
              </div>
            </div>
            <div>
              <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="maintenanceFee">
                How much is the maintenance fee?
              </label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] bottom-0 flex items-center ${!formData?.maintenanceFee && "opacity-60"
                    }`}
                >
                  N
                </span>
                <input
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] md:w-full py-[12px] pl-8 rounded-[4px]  fields duoViewPoint border w-[100%] text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]  ${!editMode &&
                    "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit"
                    }`}
                  type="number"
                  name="maintenanceFee"
                  min="0"
                  onChange={handleChange}
                  disabled={!editMode}
                  value={formData?.maintenanceFee}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:justify-end justify-center mt-8">
          <div className="hidden md:block">
            {editMode ? (
              <button className="flex border justify-center md:w-[127px] w-[100%] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz rounded-[4px]"
                onClick={onSubmit}>
                Save Update
              </button>
            ) : (
              <div className="flex cursor-pointer border justify-center md:w-[77px] w-[100%] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz rounded-[4px]"
                onClick={() => setEditMode(true)}
              >
                Update
              </div>
            )}
          </div>
          <div className="md:hidden flex flex-col w-full">
            <Link
            href={`/dashboard/list_Property/PreviewProperty/${formData?._id}`}
              className="text-[#006AFF] text-[14px] leading-[21px]  md:hidden mx-auto mb-3"
            >
              See public view
            </Link>
            {editMode ? (
              <button
                className="flex  border justify-center w-full md:w-[77px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                onClick={onSubmit}
              >
                Save Update
              </button>
            ) : (
              <div
                className="flex cursor-pointer border justify-center w-full md:w-[77px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                onClick={() => setEditMode(true)}
              >
                Update
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDetails;
