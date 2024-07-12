import Image from "next/image";
import React, { useState } from "react";

const RentDetails = ({ handleRentalInfo, previousBtn }) => {
  const [paymentType, setPaymentType] = useState("");
  const [price, setPrice] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [total, setTotal] = useState("");
  const [agency, setAgency] = useState("");

  const onSubmit = () => {
    const data = {};

    if (paymentType !== undefined && paymentType !== null) {
      data.paymentType = paymentType;
    }
    if (!isNaN(parseInt(maintenance))) {
      data.maintenanceFee = parseInt(maintenance);
    }
    if (!isNaN(parseInt(total))) {
      data.totalFee = parseInt(total);
    }
    if (!isNaN(parseInt(agency))) {
      data.agencyFee = parseInt(agency);
    }
    if (!isNaN(parseInt(price))) {
      data.price = parseInt(price);
    }

    handleRentalInfo(data);

  };

  return (
    <div className="px-0 w-full">
      <div className="md:text-[23px] font-[700] text-BlueHomz leading-[20.16px] md:leading-[28.98px] pb-2">
        Payment Details
      </div>
      <div className="text-[13px] md:text-[18px] font-[400] w-[270px] md:w-full">
        Kindly fill in the accurate payment details{" "}
        <span className="text-error hidden md:blcok text-[14px]">
          (Only fill the fields that are applicable to your property).
        </span>
      </div>
      <p className="text-error text-[11px] md:hidden w-[270px] mt-[2px]">
        (Only fill the fields that are applicable to your property).
      </p>
      <div
        className=" flex flex-col w-full mt-6"
      >
        <div className="flex md:gap-[45px] gap-[24px] flex-col md:flex-row sideBarHidden">
          <div className="flex flex-col md:gap-[28px] gap-[24px]">
            <div className="custom-select-wrapper">
              <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="paymentType">Payment Type</label> <span className="text-error">*</span>
              <br />
              <select
                name="paymentType"
                className="custom-select h-[43px] md:h-[45px] md:w-[473px] pl-2  md:p-[12px] rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] w-[100%]"
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="" disabled selected>
                  Select Payment Type
                </option>
                {paymentTypeValues.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="price">Price</label> <span className="text-error">*</span>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!price && "opacity-50"
                    }`}
                >
                  N
                </span>
                <input
                  placeholder="1000000"
                  className="h-[43px] md:h-[45px] w-full py-[12px] pl-8 rounded-[4px] border text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px]  "
                  type="number"
                  name="price"
                  min="0"
                  disabled={paymentType === "" && true}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-[13px] md:text-[14px] font-[500] text-BlackHomz" htmlFor="totalFee">How much is the total fee?</label>
              <br />
              <div className="flex relative items-center h-[43px] md:h-[45px] md:w-[473px] duoViewPoint w-[100%]">
                <span
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!total && "opacity-60"
                    }`}
                >
                  N
                </span>
                <input
                  placeholder="1000000"
                  className="h-[43px] md:h-[45px] md:w-[473px] py-[12px] rounded-[4px] pl-8 border text-[13px] md:text-[14px] font-[500] w-[100%] text-GrayHomz placeholder:text-[13px]"
                  type="number"
                  name="totalFee"
                  min="0"
                  disabled={paymentType === "" && true}
                  onChange={(e) => setTotal(e.target.value)}
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
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!agency && "opacity-60"
                    }`}
                >
                  N
                </span>
                <input
                  placeholder="1000000"
                  className="h-[43px] md:h-[45px] md:w-[473px] py-[12px] rounded-[4px] pl-8 border text-[13px] md:text-[14px] font-[500] text-GrayHomz w-[100%] placeholder:text-[13px]"
                  type="number"
                  name="agencyFee"
                  min="0"
                  disabled={paymentType === "" && true}
                  onChange={(e) => setAgency(e.target.value)}
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
                  className={`absolute left-3 top-0 bottom-0 flex items-center text-[13px] md:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] ${!maintenance && "opacity-60"
                    }`}
                >
                  N
                </span>
                <input
                  placeholder="1000000"
                  className="h-[43px] md:h-[45px] md:w-[473px] py-[12px] rounded-[4px] pl-8 border text-[13px] md:text-[14px] font-[500] text-GrayHomz w-[100%] placeholder:text-[13px]"
                  type="number"
                  name="maintenanceFee"
                  min="0"
                  disabled={paymentType === "" && true}
                  onChange={(e) => setMaintenance(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:gap-0 md:justify-between md:mt-24 mt-24 px-3 md:px">
          <div>
            <button
              className="text-[14px] font-[500] md:py-[8px] md:px-[12px]  rounded-[4px] md:text-BlueHomz border text-[#D5D5D5]  h-[36px] w-[36px] md:h-full md:w-full flex items-center justify-center gap-1 "
              onClick={previousBtn}
            >
              <Image
                src="/static/images/blue-arrow-left.svg"
                width={20}
                height={20}
                alt=""
                className="hidden md:block"
              />
              <Image
                src="/static/images/black-arrow-left.svg"
                width={22}
                height={22}
                alt=""
                className="md:hidden"
              />

              <span className="hidden md:block">Previous</span>
            </button>
          </div>

          <div className="">
            {
              paymentType !== "" &&
                price !== ""
                ?
                <button
                  onClick={onSubmit}
                  className={`flex md:mr-5 border justify-center  md:w-[77px] items-center text-[14px] font-[500] md:py-[8px] md:px-[12px] ${"md:text-white text-[#D5D5D5] md:bg-BlueHomz h-[36px] w-[36px] md:h-full "
                    } rounded-[4px]`}
                >
                  <span className="hidden md:block">Next</span>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                    }
                    alt=""
                    height={16}
                    width={16}
                    className="hidden md:block"
                  />
                  <Image
                    src="/static/images/right-arrow-Icon.svg"
                    width={16}
                    height={16}
                    alt=""
                    className="md:hidden"
                  />
                </button>
                :
                <button
                  className={`flex md:mr-5 border justify-center  md:w-[77px] items-center text-[14px] font-[500] md:py-[8px] md:px-[12px] ${"text-GrayHomz bg-GrayHomz5 border-[#A9A9A9] h-[36px] w-[36px] md:h-full "
                    } rounded-[4px]`}
                >
                  <span className="hidden md:block">Next</span>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                    }
                    alt=""
                    height={16}
                    width={16}
                    className="hidden md:block"
                  />
                  <Image
                    src="/static/images/right-arrow-Icon.svg"
                    width={16}
                    height={16}
                    alt=""
                    className="md:hidden"
                  />
                </button>
            }

          </div>
        </div>
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
  "6 months",
  "yearly",
];
