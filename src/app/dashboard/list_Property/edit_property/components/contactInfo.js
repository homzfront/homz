"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import _ from "lodash";

const ContactInfo = ({ property, handleUpdate, setSaveUpdate, saveUpdate,setEditMode }) => {
  const [data, setData] = useState(null);
  const [phoneClicked, setPhoneClicked] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [whatsappClicked, setWhatsAppClicked] = useState(false);
  const [formData, setFormData] = useState(property?.contacts || {});
  const originalFormData = useRef(property?.contacts || {});

  useEffect(() => {
    if (property) {
      setFormData(property?.contacts || {});
      originalFormData.current = property?.contacts || {};
    }
  }, [property]);

  useEffect(() => {
    // Compare formData and originalFormData
    const isFormDataChanged = !_.isEqual(formData, originalFormData.current);
    setSaveUpdate(isFormDataChanged);
  }, [formData, setSaveUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    handleUpdate(e,data);
  };

  return (
    <div className="w-full">
      <div className=" flex flex-col md:w-full">
        <div className="flex w-full gap-[2rem] mt-5">
          <div className="w-full flex flex-col space-y-4">
            <div>
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="PhoneNumber"
              >
                Phone Number <span className="text-red-500 text-[15px]">*</span>
              </label>
              <br />
              <input
                placeholder="000 000 00000"
                name="phoneNumber"
                onChange={handleChange}
                onClick={(e) => setPhoneClicked(true)}
                value={formData?.contacts?.phoneNumber}
                className={` h-[43px] md:h-[45px] md:w-[473px] text-[13px] md:text-[14px] font-[500] placeholder:text-[13px] md:p-[12px] rounded-[4px] pl-2 w-[100%] ${
                  phoneClicked
                    ? "bg-inherit text-[#4E4E4E] border border-[#4E4E4E]"
                    : "bg-[#E6E6E6] text-[#A9A9A9]"
                }`}
              />
            </div>
            <div>
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="Email"
              >
                Email
              </label>
              <br />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onClick={(e) => setEmailClicked(true)}
                value={formData?.contacts?.email}
                placeholder="Enter Email"
                className={` h-[43px] md:h-[45px] md:w-[473px] text-[13px] md:text-[14px] font-[500] placeholder:text-[13px] placeholder: md:p-[12px] rounded-[4px] pl-2 w-[100%] ${
                  emailClicked
                    ? "bg-inherit text-[#4E4E4E] border border-[#4E4E4E]"
                    : "bg-[#E6E6E6] text-[#A9A9A9]"
                }`}
              />
            </div>
            <div>
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="WhatsAppLink"
              >
                {" "}
                WhatsApp Link
              </label>
              <br />
              <input
                type="text"
                name="whatsapp"
                onChange={handleChange}
                onClick={(e) => setWhatsAppClicked(true)}
                value={formData?.contacts?.whatsapp}
                placeholder="Enter WhatsApp Link"
                className={` h-[43px] md:h-[45px] md:w-[473px] text-[13px] md:text-[14px] font-[500] placeholder:text-[13px] placeholder: md:p-[12px] rounded-[4px] pl-2 w-[100%] ${
                  whatsappClicked
                    ? "bg-inherit text-[#4E4E4E] border border-[#4E4E4E]"
                    : "bg-[#E6E6E6] text-[#A9A9A9]"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex md:justify-end justify-center sm:mt-14 mt-28">
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
              href={`/dashboard/list_Property/PreviewProperty/${property?._id}`}
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
  );
};

export default ContactInfo;
