"use client";
import React, { useState } from "react";
import BusinessInfo from "./businessInfo/businessInfo.js";
import BusinessLogo from "./businessLogo/businessLogo.js";
import PersonalInfo from "./personalInfo/personalInfo.js";
import Payment from "./payment/payment.js";
import ChangePassword from "./changePassword/changePassword.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const pages = [
  {
    id: 1,
    name: "Business Information",
    component: (data) => <BusinessInfo data={data} />,
  },
  {
    id: 2,
    name: "Business Logo",
    component: (data) => <BusinessLogo data={data} />,
  },
  {
    id: 3,
    name: "Personal Information",
    component: (data) => <PersonalInfo data={data} />, // Use a function to pass data dynamically
  },
  { id: 4, name: "Payment", component: (data) => <Payment data={data} /> },
  { id: 5, name: "Change Password", component: <ChangePassword /> },
];

const Widget = ({ data }) => {
  const [active, setActive] = useState(pages[0].id);

  const handlePageChange = (e, id) => {
    e.preventDefault();
    setActive(id);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-full h-auto py-4">
        <div className="flex mt-5 gap-2 justify-between w-[771px] cursor-pointer">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex flex-col items-center py-2 px-3 justify-center rounded-md  ${
                active === page.id ? "bg-BlueHomz text-white" : "text-BlackHomz"
              }`}
              onClick={(e) => handlePageChange(e, page.id)}
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
              {typeof page.component === "function"
                ? page.component(data)
                : page.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
