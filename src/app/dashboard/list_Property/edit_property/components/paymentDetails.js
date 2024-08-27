"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import _ from "lodash";

const PaymentDetails = ({
  property,
  handleUpdate,
  setSaveUpdate,
  setData,
  saveUpdate,
}) => {
  const [paymentType, setPaymentType] = useState("");
  const [isFocusPrice, setFocusPrice] = useState(false);
  const [isFocusMaintenance, setFocusMaintenance] = useState(false);
  const [isFocusAgency, setFocusAgency] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [paymentClicked, setPaymentClicked] = useState(false);
  const [maintenanceClicked, setMaintenanceClicked] = useState(false);
  const [initialPaymentClicked, setInitialPaymentClicked] = useState(false);
  const [agencyClicked, setAgencyClicked] = useState(false);
  const [isFocusInitialPayment, setFocusInitialPayment] = useState(false);
  const [Installment, setInstallment] = useState(false);
  const [selectedClicked, setSelectedClicked] = useState(false);
  const [durationClicked, setDurationClicked] = useState(false);

  const [formData, setFormData] = useState({});
  // console.log(property);
  const [price, setPrice] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [total, setTotal] = useState();
  const [agency, setAgency] = useState();
  const [initialPayment, setInitialPayment] = useState("");
  const originalFormData = useRef({
    ...property,
  });

  useEffect(() => {
    if (property) {
      setFormData((prevState) => ({
        ...prevState,
        ...property,
      }));
    }
  }, [property]);

  useEffect(() => {
    // Compare formData and originalFormData
    const isFormDataChanged = !_.isEqual(formData, originalFormData.current);
    setSaveUpdate(isFormDataChanged);
    if (isFormDataChanged) setData(formData);
    else {
      setAgencyClicked(false);
      setMaintenanceClicked(false);
      setPriceClicked(false);
      setInitialPaymentClicked(false);
      setDurationClicked(false);
      setSelectedClicked(false);
      setPaymentClicked(false);
    }
  }, [formData, originalFormData, setSaveUpdate, setData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      if (type === "checkbox") {
        return {
          ...prevData,
          [name]: checked,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };
 

  const calculateTotalPrice = () => {
    const safeParse = (value) => {
      const parsedValue = parseFloat(value);
      return isNaN(parsedValue) ? 0 : parsedValue;
    };
    const parsedPrice = safeParse(formData?.price);
    const parsedMaintenance = safeParse(formData?.maintenanceFee);
    const parsedAgency = safeParse(formData?.agencyFee);
    const sum = parsedPrice + parsedMaintenance + parsedAgency;
    // console.log(sum);
    setFormData((prev) => ({ ...prev, totalFee: sum }));
    // setTotal(sum);
  };
  // console.log(formData);

  const onSubmit = (e) => {
    // console.log(formData);
    handleUpdate(e, formData);
  };

  return (
    <div className="px-0">
      <div className=" flex flex-col md:w-full mt-6">
        <div className="flex md:gap-[45px] gap-[24px] flex-col  sideBarHidden">
          <div className="grid sm:grid-cols-2 md:gap-[28px] gap-[24px]">
            <div className="custom-select-wrapper">
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="paymentType"
              >
                Payment Type
              </label>{" "}
              <span className="text-error">*</span>
              <br />
              <select
                name="paymentType"
                className="custom-select h-[43px] md:h-[45px] md:w-[473px] pl-2 md:p-[12px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] w-[100%]"
                onChange={(e) => {
                  handleChange(e);
                  setPaymentType(e.target.value);
                }}
                onClick={() => {
                  setPaymentClicked(true);
                  setSelectedClicked(false);
                }}
                style={{
                  backgroundColor: paymentClicked ? "inherit" : "#E6E6E6",
                  color: paymentClicked ? "#4E4E4E" : "#A9A9A9",
                  border: paymentClicked && "1px solid #4E4E4E",
                }}
              >
                {selectedClicked && (
                  <option value={formData?.paymentType} selected>
                    {capitalizeFirstLetter(formData?.paymentType) ||
                      "select option"}
                  </option>
                )}
                {paymentTypeValues.map((type, index) => (
                  <option key={index} value={type}>
                    {capitalizeFirstLetter(type)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="price"
              >
                {capitalizeFirstLetter(paymentType || formData?.paymentType)}{" "}
                Price
              </label>{" "}
              <span className="text-error">*</span>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
                    !priceClicked && "opacity-50"
                  }`}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] w-full py-[12px] pl-8 rounded-[4px] text-[13px] md:text-[14px] font-[500] placeholder:text-[13px] ${
                    priceClicked
                      ? "bg-inherit text-[#4E4E4E] border-[#4E4E4E] border"
                      : "bg-[#E6E6E6] text-[#A9A9A9]"
                  }  `}
                  type="text"
                  name="price"
                  min="0"
                  value={
                    isFocusPrice
                      ? formData?.price
                      : Number(formData?.price).toLocaleString()
                  }
                  onChange={(e) => {
                    handleChange(e);
                    // handleNumberChange(e, setPrice);
                  }}
                  onClick={(e) => setPriceClicked(true)}
                  onBlur={(e) => {
                    setFocusPrice(false);
                    calculateTotalPrice();
                  }}
                  onSelect={() => setFocusPrice(true)}
                />
              </div>
            </div>
          </div>
          <div className="grid md:gap-[28px] gap-[24px] sm:grid-cols-3">
            <div>
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="maintenanceFee"
              >
                How much is the maintenance fee?
              </label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[300.67px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
                    !maintenanceClicked && "opacity-60"
                  }`}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] md:w-[300.67px] py-[12px] rounded-[4px] pl-8 text-[13px] md:text-[14px] font-[500] w-[100%] placeholder:text-[13px] ${
                    maintenanceClicked
                      ? "bg-inherit text-[#4E4E4E] border-[#4E4E4E] border"
                      : "bg-[#E6E6E6] text-[#A9A9A9]"
                  }  `}
                  type="text"
                  name="maintenanceFee"
                  min="0"
                  value={
                    isFocusMaintenance
                      ? formData?.maintenanceFee
                      : Number(formData?.maintenanceFee).toLocaleString()
                  }
                  onClick={(e) => setMaintenanceClicked(true)}
                  onChange={(e) => {
                    handleChange(e);
                    // handleNumberChange(e, setMaintenance);
                  }}
                  onBlur={(e) => {
                    setFocusMaintenance(false);
                    calculateTotalPrice();
                  }}
                  onSelect={() => setFocusMaintenance(true)}
                />
              </div>
            </div>
            <div>
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="agencyFee"
              >
                How much is the Agency fee?
              </label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[300.67px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
                    !agencyClicked && "opacity-60"
                  }`}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] md:w-[300.67px] py-[12px] rounded-[4px] pl-8 text-[13px] md:text-[14px] font-[500] w-[100%] placeholder:text-[13px] ${
                    agencyClicked
                      ? "bg-inherit text-[#4E4E4E] border-[#4E4E4E] border"
                      : "bg-[#E6E6E6] text-[#A9A9A9]"
                  }  `}
                  type="text"
                  name="agencyFee"
                  min="0"
                  value={
                    isFocusAgency
                      ? formData?.agencyFee
                      : Number(formData?.agencyFee).toLocaleString()
                  }
                  onClick={(e) => setAgencyClicked(true)}
                  onChange={(e) => {
                    handleChange(e);
                    // handleNumberChange(e, setAgency);
                  }}
                  onBlur={(e) => {
                    setFocusAgency(false);
                    calculateTotalPrice();
                  }}
                  onSelect={() => setFocusAgency(true)}
                />
              </div>
            </div>
            <div>
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="totalFee"
              >
                Total Price
              </label>
              <br />
              <div className="flex relative bg-[#E6E6E6] rounded-[4px] items-center h-[43px] md:h-[45px] md:w-[300.67px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 bottom-0  flex items-center text-[13px] md:text-[14px] font-[500] text-[#006AFF] placeholder:text-[13px] 
                  `}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className="h-[43px] text-[#006AFF] md:h-[45px] md:w-[300.67px] py-[12px] rounded-[4px] pl-8 border text-[13px] md:text-[14px] font-[500] w-[100%] placeholder:text-[13px] placeholder:text-[#006AFF] bg-[#EEF5FF]"
                  type="text"
                  name="totalFee"
                  min="0"
                  disabled
                  value={Number(formData?.totalFee || total).toLocaleString()}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <section className="flex flex-col w-full bg-[#FCFCFC] p-[16px] gap-[20px] rounded-[8px] mt-5">
          <div className="inline-flex items-center gap-2  bg-[#FCFCFC] rounded-[4px]">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor={`checkbox`}
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#D0D5DD] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-[#EEF5FF] checked:before:bg-[#EEF5FF] hover:before:opacity-10"
                name="installmentPayment"
                id={`checkbox`}
                onChange={(e) => {
                  handleChange(e);
                  setInstallment((prev) => !prev);
                }}
                checked={formData?.installmentPayment}
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
              className=" leading-[21px] text-[11px] md:text-[14px] font-[400] md:leading-[21px] text-[#4E4E4E]"
              htmlFor={`checkbox`}
            >
              Installment Payment
            </label>
          </div>
          <div
            className={` ${
              formData?.installmentPayment
                ? "grid sm:grid-cols-3 gap-[28px] mt-2"
                : "hidden"
            }`}
          >
            <div className="custom-select-wrapper">
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="frequency"
              >
                Frequency
              </label>{" "}
              <span className="text-error">*</span>
              <br />
              <FrequencySelect
                frequency={frequency}
                frequencyValue={formData?.frequency}
                paymentType={formData?.paymentType}
                capitalizeFirstLetter={capitalizeFirstLetter}
                onChangeMethod={handleChange}
              />
            </div>
            <div className="custom-select-wrapper">
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="duration"
              >
                Duration
              </label>{" "}
              <span className="text-error">*</span>
              <br />
              <select
                name="duration"
                onChange={handleChange}
                className="custom-select h-[43px] md:h-[45px] md:w-[300.67px] pl-2 md:p-[12px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] w-[100%]"
                onClick={() => setDurationClicked(true)}
                style={{
                  backgroundColor: durationClicked ? "inherit" : "#E6E6E6",
                  color: durationClicked ? "#4E4E4E" : "#A9A9A9",
                  border: durationClicked ? "1px solid #4E4E4E" : undefined,
                }}
              >
                {!durationClicked && (
                  <option value={formData?.duration} disabled selected>
                    {formData?.duration
                      ? `${formData?.duration} ${
                          formData?.duration > 1 ? "years" : "year"
                        }`
                      : "Select payment duration"}
                  </option>
                )}

                {[...Array(6).keys()].slice(1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num > 1 ? "years" : "year"}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="initialPayment"
              >
                Initial Payment <span className="text-error">*</span>
              </label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[300.67px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
                    !initialPayment && "opacity-60"
                  }`}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className={`h-[43px] md:h-[45px] md:w-[300.67px] py-[12px] rounded-[4px] pl-8 text-[13px] md:text-[14px] font-[500] w-[100%] placeholder:text-[13px] ${
                    initialPaymentClicked
                      ? "bg-inherit text-[#4E4E4E] border-[#4E4E4E] border"
                      : "bg-[#E6E6E6] text-[#A9A9A9]"
                  }  `}
                  type="text"
                  onClick={(e) => setInitialPaymentClicked(true)}
                  name="initialPayment"
                  min="0"
                  value={
                    isFocusInitialPayment
                      ? formData?.initialPayment
                      : Number(formData?.initialPayment).toLocaleString()
                  }
                  onChange={(e) => {
                    handleChange(e);
                    // handleNumberChange(e, setInitialPayment);
                  }}
                  onBlur={(e) => {
                    setFocusInitialPayment(false);
                  }}
                  onSelect={() => setFocusInitialPayment(true)}
                />
              </div>
            </div>
          </div>
        </section>

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
  );
};

export default PaymentDetails;

const paymentTypeValues = [
  "outright payment",
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "Bi-Annual (6 months)",
  "yearly",
  "2 years (Lease)",
];
const frequency = ["weekly", "monthly", "quarterly", "yearly"];
const FrequencySelect = ({
  frequency,
  paymentType,
  frequencyValue,
  capitalizeFirstLetter,
  onChangeMethod,
}) => {
  // Filter out the 'yearly' option if paymentType is 'yearly'
  const [selectedClicked, setSelectedClicked] = useState(true);
  const filteredFrequency =
    paymentType === "yearly"
      ? frequency.filter((type) => type !== "yearly")
      : frequency;

  return (
    <select
      name="frequency"
      className="custom-select h-[43px] md:h-[45px] md:w-[300.67px] pl-2  md:p-[12px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] w-[100%]"
      onClick={() => setSelectedClicked(false)}
      onChange={onChangeMethod}
      style={{
        backgroundColor: !selectedClicked ? "inherit" : "#E6E6E6",
        color: !selectedClicked ? "#4E4E4E" : "#A9A9A9",
        border: !selectedClicked && "1px solid #4E4E4E",
      }}
    >
      {selectedClicked && (
        <option value={frequencyValue} disabled selected>
          {capitalizeFirstLetter(frequencyValue) || "Select Frequency"}
        </option>
      )}
      {filteredFrequency.map((type, index) => (
        <option key={index} value={type}>
          {capitalizeFirstLetter(type)}
        </option>
      ))}
    </select>
  );
};
