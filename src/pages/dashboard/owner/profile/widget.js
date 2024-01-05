"use client"
import React, { useState } from "react";
import BusinessInfo from "./businessInfo/businessInfo.js";
import BusinessLogo from "./businessLogo/businessLogo.js";
import PersonalInfo from "./personalInfo/personalInfo.js";
import Payment from "./payment/payment.js";
import ChangePassword from "./changePassword/changePassword.js";

const pages = [
  { id: 1, name: "Business Information", component: <BusinessInfo /> },
  { id: 2, name: "Business Logo", component: <BusinessLogo /> },
  { id: 3, name: "Personal Information", component: <PersonalInfo /> },
  { id: 4, name: "Payment", component: <Payment /> },
  { id: 5, name: "Change Password", component: <ChangePassword /> },
];

const Widget = () => {
  const [active, setActive] = useState(pages[0].id);

  const handlePageChange = (id) => {
    setActive(id);
  };

  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className="flex mt-5 gap-2 justify-between w-[771px] cursor-pointer">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 px-3 justify-center rounded-md  ${
                active === page.id ? "bg-BlueHomz text-white" : "text-BlackHomz"
              }`}
              onClick={() => handlePageChange(page.id)}
            >
              <p className="text-[14px] font-500">{page.name}</p>
            </div>
          ))}
        </div>
        <div className="my-5 rounded-[12px]">
          {pages.map((page) => (
            <div
              key={page.id}
              className={active === page.id ? "inline" : "hidden"}
            >
              {page.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
