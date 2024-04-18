import React, { useEffect, useState } from "react";
import Dropdown from "./dropDown";
import DropdownII from "@/pages/dashboard/enterprise/components/dropDownFilter"
import Image from "next/image";
import Table from "./table";
import DeleteRed from "@/components/icons/deleteRed";
import landlordsUnderEnterprise from "@/store/enterpriseStore/landlordsUnderEnterprise";

const TableUser = ({ estateData }) => {

  // console.log(estateData);
  const [selectedRole, setSelectedRole] = useState(null); // Change initial state to null
  const [openRevoke, setOpenRevoke] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  // console.log(selectedUserRole);

  const options = [
    {
      id: 1,
      label: "Customer Support",
    },
    {
      id: 2,
      label: "Security",
    },
  ];

  const clear = () => {
    setSelectedUserRole(null)
  };

  const { data, loading, fetchData } = landlordsUnderEnterprise();

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const handleRoleSelect = (option) => {
    setSelectedRole(option);
  };

  const showRevoke = () => {
    if (data?.length >= 1) {
      setOpenRevoke(true);
    }
  };

  const falseData = data.filter(
    (item) => !item?.estatesDetails?.[0]?.is_deleted
  );

  // console.log(falseData);
  // console.log(data);


  return (
    <div className="">
      <div className="text-[14px] font-[500] flex justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <p className="text-BlackHomz">Users</p>
          <div className="h-[29px] w-[32px] bg-whiteblue flex justify-center items-center rounded-[8px]">
            <p className="text-BlueHomz">
              {/* {data ? falseData?.length : "0"} */}
              5
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <p className="text-[16px] font-[400] text-BlackHomz">
            Filter by:
          </p>
          <div className="flex items-center mb-1">
            <div className="w-[190px]">
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedUserRole(option)}
                selectOption={
                  selectedUserRole === null
                    ? "Property"
                    : selectedUserRole
                }
                className="mr-2"
              />
            </div>
          </div>
          <button
            onClick={clear}
            type="text"
            className="border border-BlueHomz text-[14px] font-[500] flex justify-center items-center gap-1 text-BlueHomz px-4  h-[42px] mb-1  rounded cursor-pointer"
          >
            <span>
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                }
                alt=""
                height={17}
                width={16}
              />
            </span>
            Reset
          </button>
        </div>
        {
          data?.length >= 1
            ?
            <button
              title="Delete landlord."
              onClick={showRevoke}
              className="flex gap-2 items-center ">
              <DeleteRed /> <span className="text-error text-[14px] font-[500]"> Remove User(s)</span>
            </button>
            :
            <div>
            </div>
        }
      </div>
      <div>
        <Table estateData={estateData} fetchData={fetchData} roleData={falseData} openRevoke={openRevoke} setOpenRevoke={setOpenRevoke} />
      </div>
    </div>
  );
};

export default TableUser;
