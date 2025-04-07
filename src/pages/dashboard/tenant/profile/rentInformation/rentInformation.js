import addCommasToNumber from "@/utils/addCommasToNumber";
import React from "react";
import ArrowLeftBrown from "@/components/icons/arrowLeftBrown";
import ArrowRightBlueLight from "@/components/icons/arrowRightBlueLight";
import Tower from "@/components/icons/tower";
import ArrowUpII from "@/components/icons/arrowUpII";
import ArrowDown from "@/components/icons/arrowDown";

const RentInformation = ({ data }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Only one stays open
  };

  function addYearsToValues(integers) {
    if (integers === "" || integers === null || integers === undefined) {
      return "_______"; // Render the actual name if it exists
    } else {
      const plural = integers !== 1 ? "s" : ""; // Add 's' for values other than 1
      return `${integers} year${plural}`;
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


  const rentDetails = [
    { name: "Rent Period 3 (Current)", paymentStatus: "Pending", rent: "750,000", startDate: "4th January, 2023", dueDate: "4th January, 2024", rentDuration: "1 Year", propertyType: "2-Bedroom Bungalow", apartmentNumber: "Apartment 1", property: "New Suncity Property" },
    { name: "Rent Period 2", paymentStatus: "Pending", rent: "14,500,000", startDate: "4th January, 2023", dueDate: "4th January, 2025", rentDuration: "2 Year", propertyType: "6-Bedroom Bungalow", apartmentNumber: "Apartment 8", property: "New Suncity Property" },
    { name: "Rent Period 1", paymentStatus: "Pending", rent: "17,250,000", startDate: "4th January, 2023", dueDate: "4th January, 2027", rentDuration: "4 Year", propertyType: "4-Bedroom Bungalow", apartmentNumber: "Apartment 4", property: "New Suncity Property" },
  ];


  return (
    <div>
      {!showForm ?
        <div>
          <h2 className="text-BlackHomz font-medium text-base">Rent Property Information</h2>
          <p className="mt-1 text-GrayHomz font-normal text-sm">View your rental properties, rental periods and payment history.</p>
          <div onClick={() => setShowForm(!showForm)} className="mt-4 p-4 bg-[#FCFCFC] rounded-[8px] flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex justify-center items-center h-[44px] w-[44px] rounded-full bg-BlueHomz"><Tower /></div>
              <div className="text-GrayHomz font-medium flex flex-col gap-1 ml-1">
                <p className="text-sm">[2-Bedroom Bungalow]</p>
                <p className="text-[11px]">[View Gold Property]</p>
              </div>
            </div>
            <ArrowRightBlueLight className="#4E4E4E" />
          </div>
        </div> :
        <div className="flex flex-col gap-2">
          <div onClick={() => setShowForm(false)} className="flex gap-2 items-center cursor-pointer text-GrayHomz2 text-sm font-normal">
            <ArrowLeftBrown /> Back
          </div>
          {rentDetails.map((item, index) => (
            <div key={index} className="w-full mt-1">
              <div onClick={() => toggleDropdown(index)} className={`${item.name === "Rent Period 3 (Current)" ? "text-white bg-BlueHomz" : "text-GrayHomz bg-GrayHomz6"} cursor-pointer rounded-[8px] flex justify-between items-center p-4`}>
                <p className="text-[14px] font-[500]">{item.name}</p>
                {openIndex === index ? <ArrowUpII className={`${item.name === "Rent Period 3 (Current)" ? "#FFFFFF" : "#4E4E4E"}`} /> : <ArrowDown className={`${item.name === "Rent Period 3 (Current)" ? "#FFFFFF" : "#4E4E4E"}`} />}
              </div>
              {openIndex === index && (
                <div>
                  <div className="rounded-lg bg-[#FCFCFC] p-4 hidden md:flex flex-col gap-2 mt-2">
                    <div className="w-full flex gap-4 mt-2">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Property
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.property}
                      </p>
                    </div>
                    <div className="w-full flex gap-4 mt-2">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Apartment Number
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.apartmentNumber}
                      </p>
                    </div>
                    <div className="w-full flex gap-4 mt-2">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Property Type
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.propertyType}
                      </p>
                    </div>
                    <div className="w-full flex gap-4 mt-2">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Rent Duration
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.rentDuration}
                      </p>
                    </div>
                    <div className="w-full flex gap-4 mt-2">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Start Date
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.startDate}
                      </p>
                    </div>
                    <div className="w-full flex gap-4 mt-2">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Due Date
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.dueDate}
                      </p>
                    </div>
                    <div className="w-full flex gap-4 mt-2">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Total Rent
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        <span style={{ fontFamily: "Arial", }}>₦</span>{item.rent}
                      </p>
                    </div>
                    <div className="w-full flex gap-4 mt-2">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Payment Status
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.paymentStatus}
                      </p>
                    </div>
                  </div>
                  <div className="md:hidden rounded-lg p-4 flex flex-col gap-2 mt-2">
                    <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Property
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.property}
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Apartment Number
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.apartmentNumber}
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Property Type
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.propertyType}
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Rent Duration
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.rentDuration}
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Start Date
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.startDate}
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Due Date
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.dueDate}
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Total Rent
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        <span style={{ fontFamily: "Arial", }}>₦</span>{item.rent}
                      </p>
                    </div>
                    <div className="w-full flex items-start gap-4 py-3 border-t border-[#e6e6e6]">
                      <p className="text-BlackHomz text-[14px] font-[400] w-[40%]">
                        Payment Status
                      </p>
                      <p className="text-GrayHomz text-[16px] font-[500] w-[60%]">
                        {item.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default RentInformation;
