"use client";
import React, { useEffect, useState } from "react";
import GetStarted from "./components/getStarted/getStarted";
import MaintenanceRequest from "./components/maintenanceRequest/maintenanceRequest";
import Request from "./components/request/request";
import LoadingII from "@/components/mainmenu/loadingII";
import useMaintenanceTenantStore from "@/store/tenantStore/useMaintenanceTenantStore";
import { useSearchParams } from "next/navigation";

const Maintenance = () => {
  const urlParams = useSearchParams();
  const tab = urlParams.get("tab");
  const [maintenanceReq, setMaintenanceReq] = useState(tab === "maintenance");
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

  return (
    <div className="w-full">
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
