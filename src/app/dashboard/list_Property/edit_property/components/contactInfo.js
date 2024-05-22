"use client";
import React, { useState } from "react";
import Link from "next/link";

const ContactInfo = ({
  property, handleUpdate, setEditMode, editMode
}) => {
  const [formData, setFormData] = useState(property || {});
  const [data, setData] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData?.contacts,
      [name]: value
    }));
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const onSubmit = () => {
    if (data === null) {
      setEditMode(false);
    } else {
      handleUpdate(data);
    }
  };
  return (
    <div className="w-full">
      <div
        className=" flex flex-col md:w-full"
      >
        <div className="flex w-full gap-[2rem] mt-5">
          <div className="w-full flex flex-col space-y-4">
            <div>
              <label htmlFor="PhoneNumber">
                Phone Number <span className="text-red-500 text-[15px]">*</span>
              </label>
              <br />
              <input
                placeholder="Enter Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                disabled={!editMode}
                value={formData?.contacts?.phoneNumber}
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] ${!editMode &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
            </div>
            <div>
              <label htmlFor="Email">
                Email
              </label>
              <br />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                disabled={!editMode}
                value={formData?.contacts?.email}
                placeholder="Enter Email"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] ${!editMode &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
            </div>
            <div>
              <label htmlFor="WhatsAppLink"> WhatsApp Link</label>
              <br />
              <input
                type="text"
                name="whatsapp"
                onChange={handleChange}
                disabled={!editMode}
                value={formData?.contacts?.whatsapp}
                placeholder="Enter WhatsApp Link"
                className={` h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border w-[100%] ${!editMode &&
                  "bg-[#E6E6E6] text-[#A9A9A9] md:bg-inherit md:text-black"
                  }`}
              />
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
              href={`/dashboard/list_Property/PreviewProperty?Property=${formData?._id}`}
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

export default ContactInfo;
