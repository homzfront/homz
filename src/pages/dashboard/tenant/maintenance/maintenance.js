"use client";
import React, { useEffect, useState } from "react";
import GetStarted from "./components/getStarted/getStarted";
import MaintenanceRequest from "./components/maintenanceRequest/maintenanceRequest";
import Request from "./components/request/request";
import LoadingII from "@/components/mainmenu/loadingII";
import useMaintenanceTenantStore from "@/store/tenantStore/useMaintenanceTenantStore";

const Maintenance = () => {
  const [maintenanceReq, setMaintenanceReq] = useState(false);
  const { data, loading, fetchData } = useMaintenanceTenantStore();

  useEffect(() => {
    fetchData();
  }, []);

  const openMaintenanceForm = () => {
    setMaintenanceReq(!maintenanceReq);
  };
  const closeMaintenanceForm = () => {
    setMaintenanceReq(false);
    try {
      fetchData();
    } catch (error) {}

  };

  console.log(data);
  return (
    <div className="w-[1147px]">
      {loading ? (
        <LoadingII />
      ) : data && data.length >= 1 ? (
        <div>
          <Request
            data={data}
            openMaintenanceForm={openMaintenanceForm}
            maintenanceReq={maintenanceReq}
            closeMaintenanceForm={closeMaintenanceForm}
            fetchData={fetchData}
          />
        </div>
      ) : maintenanceReq ? (
        <div>
          <MaintenanceRequest
            closeMaintenanceForm={closeMaintenanceForm}
            data={data}
            fetchData={fetchData}
          />
        </div>
      ) : (
        <GetStarted openMaintenanceForm={openMaintenanceForm} />
      )}
    </div>
  );
};

export default Maintenance;
