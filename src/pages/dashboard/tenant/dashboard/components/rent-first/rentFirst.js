"use client"
import React from "react";
import RentInfo from "./components/rentInfo";
// import RentInsentive from "./components/rentInsentive";
// import rentInfoTeant from "@/store/enterpriseStore/rentInfoTenant";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

const RentFirst = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await api.get(`/rentInformation/tenant`);
    },
    placeholderData: keepPreviousData,
    select: (users) => {
      return users.data.data;
    },
    // enabled: enable,
  });
  
  return (
    <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between">
      <RentInfo  data={data} />
      {/* <RentInsentive data={data}/> */}
    </div>
  );
};

export default RentFirst;
