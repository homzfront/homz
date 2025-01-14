"use client"
import React from "react";
import RentInfo from "./components/rentInfo";
// import RentInsentive from "./components/rentInsentive";
// import rentInfoTeant from "@/store/enterpriseStore/rentInfoTenant";

const RentFirst = ({data}) => {

  return (
    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between">
      <RentInfo  data={data} />
      {/* <RentInsentive data={data}/> */}
    </div>
  );
};

export default RentFirst;
