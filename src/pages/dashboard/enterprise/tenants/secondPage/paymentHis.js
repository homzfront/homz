"use client";
import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Widget from "./paymentWidget";
import ArrowDownDashes from "@/components/icons/arrowDownDashes";
import useRentSummaryTenant from "@/store/enterpriseStore/rentSummaryTenant";
import useClickOutside from "@/utils/clickOutside";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";

const PaymentHis = ({
  tenantData,
  tenantId,
  rentInfo,
  fetchRentInformation,
  // reFetchSummaryData,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const dropdownRef = useClickOutside(() => setIsOpen(false)); // Use the custom hook

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option, index) => {
    setSelectedOption({
      ...option,
      index
    });
    setIsOpen(false);
  };

  const {
    data: paymentData,
    loading,
    fetchData
  } = useRentSummaryTenant();
  const periods = rentInfo?.upDateddata?.periods || [];

  const sortedPeriods = periods?.sort((a, b) => b.isActive - a.isActive);

  React.useEffect(() => {
    fetchData(rentInfo?.upDateddata?.tenantId?._id, selectedOption?.startDate, selectedOption?.dueDate, selectedOption?.rent)
  }, [selectedOption]);

  React.useEffect(() => {
    if (rentInfo) {
      setSelectedOption({
        ...sortedPeriods?.[0],
        index: 0
      });
    }
  }, [rentInfo])

const reFetchSummaryData = () => fetchData(rentInfo?.upDateddata?.tenantId?._id, selectedOption?.startDate, selectedOption?.dueDate, selectedOption?.rent)

  const boxes = [
    {
      id: 1,
      bgColor: "successBg",
      textColor: "text-Success",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Total Payment",
      money: `${addCommasToNumber(paymentData?.data?.totalAmountPaid)}`,
    },
    {
      id: 2,
      bgColor: "warningBg",
      textColor: "text-warning2",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Pending Rent",
      money: `${paymentData?.data?.pendingRent === null
        ? "0"
        : addCommasToNumber(paymentData?.data?.pendingRent)
        }`,
      dueDate: `${paymentData?.data?.pendingRent === null
        ? ""
        : `Due date: ${changeBackendDateFormat(paymentData?.data?.dueDate)}`
        }`,
    },
  ];

  const options = [
    { id: 1, label: "Current Period" },
    { id: 2, label: "Period 2" },
    { id: 3, label: "Period 1" },
  ];

  return (
    <div className={`mt-4 pt-4 border-t border-[#E6E6E6] ${loading && "animate-pulse"}`}>
      <div className="mb-4 p-4 bg-[#F6F6F6] rounded-[8px] flex flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between">
        <div className="flex gap-1 items-center">
          <ArrowDownDashes />
          <span className="font-normal text-GaryHomz text-sm">Tenancy Period</span>
        </div>
        <div className={`relative inline-block bg-white`} ref={dropdownRef}>
          <div
            className={`text-BlackHomz px-4 border h-[45px] p-3 rounded-[4px] cursor-pointer`}
            onClick={handleDropdownToggle}
          >
            <div className="flex items-center justify-between">
              <span className={`mr-2 ${selectedOption || sortedPeriods?.[0] ? "text-BlackHomz" : "text-GrayHomz2"}`}>   {selectedOption ? (selectedOption?.index === 0 ? "Current Period" : `Period ${selectedOption?.index + 1}`) : (sortedPeriods?.[0] && "Current Period")}</span>
              <div className={`w-5 h-5`}>
                {isOpen ?
                  <ArrowUpII className="#4E4E4E" /> :
                  <ArrowDown className="#4E4E4E" />
                }
              </div>
            </div>
          </div>

          {isOpen && (
            <div className="min-w-[145px] absolute z-20 top-14 w-full text-GrayHomz text-[14px] bg-white rounded-md shadow-md max-h-[240px] overflow-y-auto scrollbar-container">
              {sortedPeriods.map((option, index) => (
                <div
                  key={index}
                  className=" p-2 cursor-pointer hover:text-white hover:bg-BlueHomz m-2 rounded-md"
                  onClick={() => handleOptionClick(option, index)}
                >
                  {index === 0 ? "Current Period" : `Period ${index + 1}`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-4 md:gap-2 md:justify-between">
        {boxes.map((data) => (
          <div key={data.id} className="w-full">
            <div
              className={`${data?.type === "Maintenance" ? "hidden md:block" : ""
                }  h-[85px] w-full md:max-w-[320px] py-2 flex flex-col justify-around border ${data?.border
                }  rounded-md px-[12px] bg-${data?.bgColor}`}
            >
              <div className={`${data?.textColor} text-[13px] font-[600] `}>
                {data?.type}
              </div>
              <div className={`text-[14px] font-[500] ${data?.textColor2}`}>
                <span style={{ fontFamily: "Arial", }}>₦</span>{data?.money}
              </div>
              <div className="text-[10px] font-[400] text-BlackHomz">
                {data?.dueDate}{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Widget
          tenantData={tenantData}
          tenantId={tenantId}
          periods={periods}
          rentInfo={rentInfo}
          fetchRentInformation={fetchRentInformation}
          reFetchSummaryData={reFetchSummaryData}
          selectedOption={selectedOption}
        />
      </div>
    </div>
  );
};

export default PaymentHis;
