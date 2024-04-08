"use client"
import React, { useState } from "react";
import RentInfo from "./components/rentInfo";
import RentInsentive from "./components/rentInsentive";

const Data = [
  {
    id: 1,
    name: "Amount",
    value: "N1,400,000",
  },
  {
    id: 2,
    name: "Rent Duration",
    value: "1 year",
  },
  {
    id: 3,
    name: "Payment Status",
    value: "Confirmed",
  },
  {
    id: 4,
    name: "Next Due Date",
    value: "4th January, 2024",
  },
];
const RentFirst = () => {
    const [data, setData] = useState(Data || []);
  return ( 
    <div className="flex w-[375px] gap-5 justify-between flex-col md:flex-row">
      <RentInfo data={data} />
      <RentInsentive data={data}/>
    </div>
  );
};

export default RentFirst;
