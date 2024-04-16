"use client";
import React, { useEffect, useState } from "react";
import GetStarted from "./components/getStarted/getStarted";
import MaintenanceRequest from "./components/maintenanceRequest/maintenanceRequest";
import Request from "./components/request/request";
import { maintenanceByASpecificTenant } from "/src/api/maintenanceService";
import LoadingII from "/src/components/mainmenu/loadingII";

const Maintenance = () => {
  const [maintenanceReq, setMaintenanceReq] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await maintenanceByASpecificTenant();
        const request = data
        setData(request?.data?.results);
        setLoading(false);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  const openMaintenanceForm = () => {
    setMaintenanceReq(!maintenanceReq);
  };
  const closeMaintenanceForm = () => {
    setMaintenanceReq(false);
  };


  console.log(data);
  return (
    <div className="w-[1147px]">
      {loading ? (
        <LoadingII />
      ) : data && data.length >= 1 ? (
        <div>
          <Request data={data}/>
        </div>
      ) : maintenanceReq ? (
        <div>
          <MaintenanceRequest
            closeMaintenanceForm={closeMaintenanceForm}
            setData={setData}
            data={data}
          />
        </div>
      ) : (
        <GetStarted openMaintenanceForm={openMaintenanceForm} />
      )}
    </div>
  );
};

export default Maintenance;
