"use client";
import React, { useEffect, useState } from "react";
import Filter from "./components/filter";
import Box from "../components/box";
import MaintenanceTable from "./components/maintenanceTable";
import LoadingII from "@/components/mainmenu/loadingII";
import { maintenanceRequestForAnEnterprise } from "@/api/maintenanceService";
import { fetchSpecificTenant } from "@/api/tenantSevice";

const Maintenance = () => {
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await maintenanceRequestForAnEnterprise();
        

        const request = data?.data;
        setRequest(request);
        console.log(request);
        const tenantPromises = await request?.results.map((tenant) =>
       
          fetchSpecificTenant(tenant.tenant._id)
        );
        const tenantData = await Promise.all(tenantPromises);
        console.log(tenantData);
        setTenantData(tenantData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(request);
  const pendingRequest = request?.results?.filter((request) => {
    return request.status === "pending";
  });
  // Get the length of the filtered data
  const pendingCount = pendingRequest?.length;
  console.log(pendingCount);

  const resolvedRequest = request?.results?.filter((request) => {
    return request.status === "resolved";
  });
  // Get the length of the filtered data
  const resolvedCount = resolvedRequest?.length;
  console.log(resolvedCount);

  return (
    <div className="relative block w-[1147px] p-8">
      {loading ? (
        <LoadingII />
      ) : (
        <div className="">
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-[500] text-BlackHomz">Maintenance</p>
            <Filter />
          </div>
          <div className="absolute border-t w-full left-0 top-[105px]"></div>
          <div className="flex gap-4 mt-[70px]">
            <Box
              type={"Total Requests"}
              money={request?.results?.length}
              border={"border-BlueHomz"}
              textColor={"text-BlueHomz"}
              textColor2={"text-BlueHomz"}
              bgColor={"whiteblue"}
            />
            <Box
              type={"Pending Request"}
              money={pendingCount}
              border={"border-warning2"}
              textColor={"text-warning2"}
              textColor2={"text-BlackHomz"}
              bgColor={"warningBg"}
            />
            <Box
              type={"Resolved Requests"}
              money={resolvedCount}
              border={"border-Success"}
              textColor={"text-Success"}
              textColor2={"text-BlackHomz"}
              bgColor={"successBg"}
            />
          </div>

          <div>
            <MaintenanceTable request={request?.results} tenantData={tenantData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
