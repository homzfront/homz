import React, { useState } from "react";
import Dropdown from "./dropDown";
import Image from "next/image";
import Table from "./table";

const TableUser = ({estateData}) => {
  const [selectedRole, setSelectedRole] = useState(null); // Change initial state to null
  const options = [
    {
      id: 1,
      label: "Landlord",
    },
  ];

  
  const handleRoleSelect = (option) => {
    setSelectedRole(option);
  };

  return (
    <div className="">
      <div className="text-[14px] font-[500] flex justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <p className="text-BlackHomz">Users</p>
          <div className="h-[29px] w-[32px] bg-whiteblue flex justify-center items-center rounded-[8px]">
            <p className="text-BlueHomz">10</p>
          </div>
        </div>

        <div className="flex gap-2 items-center ">
          <p className="text-BlackHomz">Filter by:</p>
          <div className="w-[120px]">
            <Dropdown
              options={options}
              onSelect={handleRoleSelect} 
              selectOption={selectedRole === null ? "Role" : selectedRole?.label}
              className={"text-[14px] font-[500] text-GrayHomz2"}
            />
          </div>
          <button
            type="text"
            className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[42px] w-[92px]  p-1 rounded cursor-pointer"
          >
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            Reset
          </button>
        </div>
      </div>
      <div>
        <Table estateData={estateData}/>
      </div>
    </div>
  );
};

export default TableUser;
