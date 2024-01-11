"use client";
import React, { useEffect, useState } from "react";
import GetStarted from "./components/getStarted/getStarted";
import MaintenanceRequest from "./components/maintenanceRequest/maintenanceRequest";
import Request from "./components/request/request";

const Maintenance = () => {
  const [maintenanceReq, setMaintenanceReq] = useState(false);
  const [data, setData] = useState([]);
  const openMaintenanceForm = () => {
    setMaintenanceReq(!maintenanceReq);
  };
  const closeMaintenanceForm = () => {
    setMaintenanceReq(false);
  };

  //   // useEffect to load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("DataII");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  console.log(data);
  return (
    <div className="w-[1147px]">
      {data && data.length >= 1 ? (
        <div>
          <Request/>
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
