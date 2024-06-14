import React, { useEffect, useState } from "react";
import Dropdown from "./dropDown";
import Image from "next/image";
import Table from "./table";
import DeleteRed from "@/components/icons/deleteRed";
import landlordsUnderEnterprise from "@/store/enterpriseStore/landlordsUnderEnterprise";

const TableUser = ({ estateData, profileData }) => {

  // console.log(estateData);
  const [selectedRole, setSelectedRole] = useState(null); // Change initial state to null
  const [openRevoke, setOpenRevoke] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const options = [
    {
      id: 1,
      label: "Landlord",
    },
  ];

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

  const falseData = data.filter(item =>
    item.estatesDetails.some(detail => !detail.is_deleted)
  );

  // console.log(falseData);
  // console.log(data)
  

  return (
    <div className="">
      <div className="text-[14px] font-[500] flex justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <p className="text-BlackHomz">Landlords</p>
          <div className="h-[29px] w-[32px] bg-whiteblue flex justify-center items-center rounded-[8px]">
            <p className="text-BlueHomz">{data ? falseData?.length : "0"}</p>
          </div>
        </div>
        {/* {
          data?.length >= 1
            ?
            <button onClick={showRevoke} className="flex gap-2 items-center ">
              <DeleteRed /> <span className="text-error text-[14px] font-[500]"> Remove User(s)</span>
            </button>
            :
            <button
              title="You don't have a landlord."
              className="flex gap-2 items-center "
            >
              <DeleteRed /> <span className="text-error text-[14px] font-[500]"> Remove User(s)</span>
            </button>
        } */}
      </div>
      <div>
        <Table profileData={profileData} estateData={estateData} fetchData={fetchData} roleData={falseData} openRevoke={openRevoke} setOpenRevoke={setOpenRevoke} />
      </div>
    </div>
  );
};

export default TableUser;
