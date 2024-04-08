import React from "react";
import DashboardSetting from "./components/dashSettings";

const UserRole = () => {
  return (
    <div className="pt-10 md:pt-0">
      <div className="inline-block md:hidden pl-4 mb-1">
        <p className="text-[16px] text-[700]">Profile</p>
      </div>
      <DashboardSetting />
    </div>
  );
};

export default UserRole;
