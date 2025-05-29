"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import BusinessInfo from "./businessInfo/businessInfo.js";
import BusinessLogo from "./businessLogo/businessLogo.js";
import PersonalInfo from "./personalInfo/personalInfo.js";
import Payment from "./payment/payment.js";
import ChangePassword from "./changePassword/changePassword.js";
import AccountInfo from "./accountInfo/accountInfo.js";
import useProfileStore from "@/store/profile.js";
import useProfileStore from "@/store/profile.js";

const allPages = [
const allPages = [
  {
    id: 1,
    name: "Business Information",
    key: "businessInfo",
    component: (data) => <BusinessInfo data={data} />,
  },
  {
    id: 2,
    name: "Business Logo",
    key: "businessLogo",
    component: (data) => <BusinessLogo data={data} />,
  },
  {
    id: 3,
    name: "Personal Information",
    key: "personalInfo",
    component: (data) => <PersonalInfo data={data} />,
  },
  {
    id: 4,
    name: "Account Information",
    key: "acctInfo",
    component: (data) => <AccountInfo data={data} />,
  },
  {
    id: 5,
    name: "Payment",
    key: "payment",
    component: (data) => <Payment data={data} />,
  },
  {
    id: 6,
    name: "Change Password",
    key: "changePassword",
    component: <ChangePassword />,
  },
];


const Widget = ({ data }) => {
  const { profile } = useProfileStore.getState();
  const urlParams = useSearchParams();
  const pages = profile?.user?.google
  ? allPages.filter((page) => page.id !== 6)
  : allPages;
  const initialTab = urlParams.get("tab");
  const initialActiveTab = initialTab ? pages.find(page => page.key === initialTab)?.id : 1;
  const [active, setActive] = useState(initialActiveTab);
  useEffect(() => {
    if (initialTab) {
      const page = pages.find(page => page.key === initialTab);
      if (page) {
        setActive(page.id);
      }
    }
  }, [initialTab]);

  const handlePageChange = (e, id) => {
    e.preventDefault();
    setActive(id);
  };

  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className="flex mt-5 gap-2 justify-between w-[950px] cursor-pointer">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 px-3 justify-center rounded-md ${active === page.id ? "bg-BlueHomz text-white" : "text-BlackHomz"}`}
              onClick={(e) => handlePageChange(e, page.id)}
            >
              <p className="text-[14px] font-500">{page.name}</p>
            </div>
          ))}
        </div>
        <div className="my-5 rounded-[12px]">
          {pages.map((page) => (
            <div key={page.id} className={active === page.id ? "inline" : "hidden"}>
              {typeof page.component === "function" ? page.component(data) : page.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
