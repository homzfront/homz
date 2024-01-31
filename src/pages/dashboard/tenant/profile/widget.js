"use client";
import PersonalInfo from "./personalInfo/personalInfo.js";
import ChangePassword from "./changePassword/changePassword.js";
import { useState } from "react";
import ProfilePicture from "./profilePicture/profilePicture.js";
import RentInformation from "./rentInformation/rentInformation.js";

const pages = [
  { id: 1, name: "Rent Information", component: <RentInformation /> },
  {
    id: 2,
    name: "Personal Information",
    component: (data) => <PersonalInfo data={data} />,
  },
  {
    id: 3,
    name: "Profile Picture",
    component: (data) => <ProfilePicture data={data} />,
  },
  { id: 4, name: "Change Password", component: <ChangePassword /> },
];

const Widget = ({ data }) => {
  const [active, setActive] = useState(pages[0].id);

  const handlePageChange = (e, id) => {
    e.preventDefault();
    setActive(id);
  };

  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className="flex mt-5 gap-2 justify-between w-[590px] cursor-pointer">
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
