import React from "react";

const RentInformation = ({ data }) => {
  function addYearsToValues(integers) {
    if (integers === "" || integers === null || integers === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      const plural = integers !== 1 ? "s" : ""; // Add 's' for values other than 1
      return `${integers} year${plural}`;
    }
  }

  function addCommasToNumber(number) {
    if (number === "" || number === null || number === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      // Convert the number to a string
      const numberString = number?.toString();
      // Use regular expression to add commas
      const formattedNumber = numberString?.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      return `N ${formattedNumber}`;
    }
  }

  function formatDate(inputDate) {
    if (inputDate === "" || inputDate === null || inputDate === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      const date = new Date(inputDate);
      const day = date.getDate();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      // Function to add ordinal suffix to day
      function getOrdinalSuffix(day) {
        if (day > 10 && day < 20) {
          return "th";
        } else {
          const lastDigit = day % 10;
          switch (lastDigit) {
            case 1:
              return "st";
            case 2:
              return "nd";
            case 3:
              return "rd";
            default:
              return "th";
          }
        }
      }
      const ordinalSuffix = getOrdinalSuffix(day);
      const formattedDate = `${day}${ordinalSuffix} ${monthNames[monthIndex]}, ${year}`;

      return formattedDate;
    }
  }

  const renderName = (data) => {
    // Check if data exists and has a name property
    if (data === "" || data === null || data === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      return data; // Render a placeholder if data or name is missing
    }
  };

  return (
    <div>
      <div className="rounded-lg bg-inputBg p-4 flex flex-col gap-2">
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Property
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            {renderName(data?.estateId?.name)}
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Apartment Number
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            {renderName(data?.rentInfo?.apartmentNumber)}
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Property Type
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            {renderName(data?.rentInfo?.propertyType)}
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Rent Duration
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            {addYearsToValues(data?.rentInfo?.duration)}
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Start Date
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            {formatDate(data?.rentInfo?.startDate)}
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Due Date
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            {formatDate(data?.rentInfo?.dueDate)}
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Total Rent
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
         {addCommasToNumber(data?.rentInfo?.totalRent)}
          </p>
        </div>
        <div className="w-full flex gap-4 mt-2">
          <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
            Payment Status
          </p>
          <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
            {renderName(data?.rentInfo?.paymentStatus)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentInformation;
