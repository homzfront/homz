import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import ConfirmModal from "../../components/confirmModal";
import Dropdown from "../../components/dropDownTwo";

const RentInfo = ({ active }) => {
  const [confirm, setConfirm] = useState(false);
  const handleConfirm = () => {
    setConfirm(!confirm);
  };

  const returnHome = () => {
    setConfirm(false);
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedValue(option);
  };

  const options = [
    { id: 1, label: "Pending" },
    { id: 2, label: "Paid" },
    { id: 3, label: "Yet to pay" },
  ];

  // useEffect to handle scrolling
  useEffect(() => {
    // Scroll to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Disable scrolling when confirm is true
    const handleScroll = () => {
      if (confirm) {
        window.scrollTo({ top: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts or confirm changes
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [confirm]);

  return (
    <div>
      <div  className="grid grid-cols-2 gap-4 text-GrayHomz2">
        <Input
          label={"Property Type"}
          type={"type"}
          placeholder={"2-Bedroom Bungalow"}
        />
        <Input label={"Duration"} type={"type"} placeholder={"1 Year"} />
        <Input label={"Property"} type={"type"} placeholder={"Property Name"} />
        <Input
          label={"Start Date"}
          type={"type"}
          placeholder={"4th January, 2023"}
        />
        <Input
          label={"Home Address"}
          type={"type"}
          placeholder={"Home Address"}
        />
        <Input
          label={"Due Date"}
          type={"type"}
          placeholder={"4th January, 2024"}
        />
        <Input label={"Total Rent"} type={"type"} placeholder={"N750,000"} />
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] font-[500]">Payment Status</label>
          <Dropdown options={options} selectOption={"Select an option"} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
};

export default RentInfo;
