"use client"
import React, { useEffect, useState } from "react";
import RentInfo from "./components/rentInfo";
import RentInsentive from "./components/rentInsentive";
import rentInfoTeant from "@/store/rentInfoTenant";


const RentFirst = () => {


    const {loading, data, fetchData} = rentInfoTeant();

    useEffect(()=> {
      fetchData();
    },[])

    console.log(data);
  return ( 
    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between">
      <RentInfo data={data} />
      <RentInsentive data={data}/>
    </div>
  );
};

export default RentFirst;
