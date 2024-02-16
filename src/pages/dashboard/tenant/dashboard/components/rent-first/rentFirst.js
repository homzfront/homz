"use client"
import React, { useEffect, useState } from "react";
import RentInfo from "./components/rentInfo";
import RentInsentive from "./components/rentInsentive";
import rentInfoTeant from "@/store/rentInfoTenant";

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
    // const [data, setData] = useState(Data || []);

    const {loading, data, fetchData} = rentInfoTeant();

    useEffect(()=> {
      fetchData();
    },[])

    console.log(data);
  return ( 
    <div className="flex justify-between w-full">
      <RentInfo data={data} />
      <RentInsentive data={data}/>
    </div>
  );
};

export default RentFirst;
