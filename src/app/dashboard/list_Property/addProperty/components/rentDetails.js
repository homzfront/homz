import Image from "next/image";
import React, { useState } from "react";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const RentDetails = ({ handleRentalInfo, previousBtn, setSaveToDraft }) => {
  const [paymentType, setPaymentType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [formatTotalFee, setFormattedTotalFee] = useState("");
  const [totalFee, setTotalFee] = useState("");
  const [agency, setAgency] = useState("");
  const [initialPayment, setInitialPayment] = useState("");
  const [formattedInitialPayment, setFormattedInitialPayment] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedMaintenancePrice, setFormattedMaintenancePrice] =
    useState("");
  const [formattedAgencyPrice, setFormattedAgencyPrice] = useState("");
  const [isFocusPrice, setFocusPrice] = useState(false);
  const [isFocusMaintenance, setFocusMaintenance] = useState(false);
  const [isFocusAgency, setFocusAgency] = useState(false);
  const [isFocusInitialPayment, setFocusInitialPayment] = useState(false);
  const [Installment, setInstallment] = useState(false);
  const [selectedClicked, setSelectedClicked] = useState(true);
  const [durationClicked, setDurationClicked] = useState(true);

  const handleNumberChange = (e, setValue, setFormat) => {
    const value = e.target.value;
    const numericValue = value.match(/^\d*\.?\d*$/);
    if (numericValue) {
      setValue(value);
      setFormat(value);
    }
  };

  const handleBlur = (value, setValue) => {
    if (value) {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        setValue(Number(numericValue).toLocaleString());
      }
    }
  };

  const onSubmit = () => {
    const data = {};

    if (paymentType !== undefined && paymentType !== null) {
      data.paymentType = paymentType;
    }
    // if (!isNaN(parseInt(maintenance))) {
    // }
    // if (!isNaN(parseInt(formatTotalFee))) {
    // }
    // if (!isNaN(parseInt(agency))) {
    // }
    if (!isNaN(parseInt(price))) {
      data.price = parseInt(price);
    }
    data.maintenanceFee = maintenance;
    data.agencyFee = agency;
    data.initialPayment = initialPayment;
    data.frequency = frequency;
    data.totalFee = totalFee;
    data.duration = duration;
    data.installmentPayment = Installment;
    handleRentalInfo(data);
  };
  const calculateTotalPrice = () => {
    const safeParse = (value) => {
      const parsedValue = parseFloat(value);
      return isNaN(parsedValue) ? 0 : parsedValue;
    };
    const parsedPrice = safeParse(price);
    const parsedMaintenance = safeParse(maintenance);
    const parsedAgency = safeParse(agency);
    const sum = parsedPrice + parsedMaintenance + parsedAgency;
    setTotalFee(sum);
    setFormattedTotalFee(sum.toLocaleString());
  };

  return (
    <div className="px-0 w-full">
      <div className="md:text-[23px] font-[700] text-BlueHomz leading-[20.16px] md:leading-[28.98px] pb-2">
        Payment Details
      </div>
      <p className="flex sm:flex-row flex-col  items-center gap-1 text-[14px] md:text-[18px] font-[400] w-[270px] md:w-full">
        <span>Kindly fill in the accurate payment details</span>
        <span className="text-[#A9A9A9] sm:inline-block pt-2 text-[12px] hidden">
          (Only fill the fields that are applicable to your property).
        </span>
      </p>

      <div className=" flex flex-col w-full mt-6">
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
                  setPaymentType(e.target.value);
                }}
                onClick={() => setSelectedClicked(false)}
              >
                {selectedClicked && (
                  <option value="" disabled selected>
                    Select Payment Type
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
                {capitalizeFirstLetter(paymentType)} Price
              </label>{" "}
              <span className="text-error">*</span>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
                    !price && "opacity-50"
                  }`}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className="h-[43px] md:h-[45px] w-full py-[12px] pl-8 rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]  "
                  type="text"
                  name="price"
                  min="0"
                  value={isFocusPrice ? price : formattedPrice}
                  disabled={paymentType === "" && true}
                  onChange={(e) =>
                    handleNumberChange(e, setPrice, setFormattedPrice)
                  }
                  onBlur={(e) => {
                    setFocusPrice(false);
                    calculateTotalPrice();
                    handleBlur(e.target.value, setFormattedPrice);
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
                    !maintenance && "opacity-60"
                  }`}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className="h-[43px] md:h-[45px] md:w-[300.67px] py-[12px] rounded-[4px] pl-8 border text-[13px] md:text-[14px] font-[500] text-GrayHomz w-[100%] placeholder:text-[13px]"
                  type="text"
                  name="maintenanceFee"
                  min="0"
                  value={
                    isFocusMaintenance ? maintenance : formattedMaintenancePrice
                  }
                  disabled={paymentType === "" && true}
                  onChange={(e) =>
                    handleNumberChange(
                      e,
                      setMaintenance,
                      setFormattedMaintenancePrice
                    )
                  }
                  onBlur={(e) => {
                    setFocusMaintenance(false);
                    calculateTotalPrice();
                    handleBlur(e.target.value, setFormattedMaintenancePrice);
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
                    !agency && "opacity-60"
                  }`}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className="h-[43px] md:h-[45px] md:w-[300.67px] py-[12px] rounded-[4px] pl-8 border text-[13px] md:text-[14px] font-[500] text-GrayHomz w-[100%] placeholder:text-[13px]"
                  type="text"
                  name="agencyFee"
                  min="0"
                  value={isFocusAgency ? agency : formattedAgencyPrice}
                  disabled={paymentType === "" && true}
                  onChange={(e) =>
                    handleNumberChange(e, setAgency, setFormattedAgencyPrice)
                  }
                  onBlur={(e) => {
                    setFocusAgency(false);
                    calculateTotalPrice();
                    handleBlur(e.target.value, setFormattedAgencyPrice);
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
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${
                    !formatTotalFee && "opacity-60"
                  }`}
                >
                  ₦
                </span>
                <input
                  placeholder="00.00"
                  className="h-[43px] md:h-[45px] md:w-[300.67px] py-[12px] rounded-[4px] pl-8 border text-[13px] md:text-[14px] font-[500] w-[100%] text-GrayHomz placeholder:text-[13px] bg-[#E6E6E6]"
                  type="text"
                  name="totalFee"
                  min="0"
                  disabled
                  value={formatTotalFee}
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
                id={`checkbox`}
                onChange={() => setInstallment((prev) => !prev)}
                // checked={selectedAmenities.includes(amenity)}
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
              Installment ? "grid sm:grid-cols-3 gap-[28px] mt-2" : "hidden"
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
                frequency={frequencyData}
                paymentType={paymentType}
                capitalizeFirstLetter={capitalizeFirstLetter}
                setFrequency={setFrequency}
              />
            </div>
            <div className="custom-select-wrapper">
              <label
                className="text-[13px] md:text-[14px] font-[500] text-BlackHomz"
                htmlFor="paymentType"
              >
                Duration
              </label>{" "}
              <span className="text-error">*</span>
              <br />
              <select
                name="paymentType"
                className="custom-select h-[43px] md:h-[45px] md:w-[300.67px] pl-2  md:p-[12px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] w-[100%]"
                onChange={(e) => setDuration(e.target.value)}
                onClick={() => setDurationClicked(false)}
              >
                {durationClicked && (
                  <option value="" disabled selected>
                    Select payment duration
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
                  className="h-[43px] md:h-[45px] md:w-[300.67px] py-[12px] rounded-[4px] pl-8 border text-[13px] md:text-[14px] font-[500] text-GrayHomz w-[100%] placeholder:text-[13px]"
                  type="text"
                  name="initialPayment"
                  min="0"
                  value={
                    isFocusInitialPayment
                      ? initialPayment
                      : formattedInitialPayment
                  }
                  disabled={paymentType === "" && true}
                  onChange={(e) =>
                    handleNumberChange(
                      e,
                      setInitialPayment,
                      setFormattedInitialPayment
                    )
                  }
                  onBlur={(e) => {
                    setFocusInitialPayment(false);
                    handleBlur(e.target.value, setFormattedInitialPayment);
                  }}
                  onSelect={() => setFocusInitialPayment(true)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-between md:mt-24 mt-8 sm:px-3 md:px gap-[19px] ">
          <div>
            <button
              className="text-[14px] font-[500] py-[8px] px-[12px]  rounded-[4px] md:text-BlueHomz text-BlueHomz border border-BlueHomz h-full sm:w-full w-[120px] flex items-center justify-center gap-1 "
              onClick={previousBtn}
            >
              <Image
                src="/static/images/blue-arrow-left.svg"
                width={20}
                height={20}
                alt=""
                className="hidden md:block"
              />
              {/* <Image
                src="/static/images/black-arrow-left.svg"
                width={22}
                height={22}
                alt=""
                className="hidden"
              /> */}

              <span className="">Previous</span>
            </button>
          </div>

          <div className="flex gap-3 items-center">
            <button
              disabled={price === ""}
              className={`hidden sm:flex gap-2 items-center text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] ${
                price === "" ? "text-[#D5D5D5]" : "text-BlueHomz"
              }`}
              onClick={() => setSaveToDraft(true)}
            >
              <Image
                src={`/static/images/${
                  price === "" ? "clock2.svg" : "blueclock.svg"
                }`}
                alt=""
                height={16}
                width={16}
              />
              <span>Save to draft</span>
            </button>
            <button
              onClick={onSubmit}
              disabled={price === ""}
              className={`flex md:mr-14 border gap-1 justify-center  md:w-[77px]  w-[120px] items-center text-[14px] font-[500] py-[8px] px-[12px] ${
                price === ""
                  ? "text-[#D5D5D5] bg-[#E6E6E6] border-[#A9A9A9]"
                  : "text-white border-white bg-BlueHomz"
              } rounded-[4px] `}
              type="submit"
            >
              Next
              {price === "" ? (
                <Image
                  src={"/static/images/Vector.svg"}
                  alt=""
                  height={8}
                  width={8}
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
        <button
          disabled={price === ""}
          className={`mx-auto my-5 flex md:hidden gap-2 items-center text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] ${
            price === "" ? "text-[#D5D5D5]" : "text-BlueHomz"
          }`}
          onClick={() => setSaveToDraft(true)}
        >
          <Image
            src={`/static/images/${
              price === "" ? "clock2.svg" : "blueclock.svg"
            }`}
            alt=""
            height={16}
            width={16}
          />
          <span>Save to draft</span>
        </button>
      </div>
    </div>
  );
};

export default RentDetails;
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
const frequencyData = ["weekly", "monthly", "quarterly", "yearly"];
const FrequencySelect = ({
  frequency,
  paymentType,
  capitalizeFirstLetter,
  setFrequency,
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
      onChange={(e) => setFrequency(e.target.value)}
    >
      {selectedClicked && (
        <option value="" disabled selected>
          Select Frequency
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
