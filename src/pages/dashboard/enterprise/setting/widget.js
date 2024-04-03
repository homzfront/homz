"use client"
import React, { useState } from "react";
import ManageUsers from "./manageUsers/manageUsers.js";
import Estate from "./estates/estates.js";
import Tenants from "./tenants/tenants.js";
import Notifications from "./notifications/notifications.js";

const pages = [
  { id: 1, name: "Manage Landlords", component: <ManageUsers /> },
  // { id: 2, name: "Properties", component: <Estate /> },
  // { id: 3, name: "Tenants", component: <Tenants /> },
  // { id: 4, name: "Notifications", component: <Notifications /> },
];

const Widget = () => {
  const [active, setActive] = useState(pages[0].id);

  const handlePageChange = (id) => {
    setActive(id);
  };

  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className="flex mt-5 gap-2 justify-between w-[520px] px-8 cursor-pointer">
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
