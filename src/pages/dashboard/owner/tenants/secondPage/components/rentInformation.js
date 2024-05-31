import React, { useEffect, useState } from "react";
import Input from "../../../components/input";
import { getSpecificTenantRentInfoOwner } from "@/api/tenantSevice";
import addYearsToValues from "@/utils/addYearsToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";

const RentInformation = ({ profile }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!profile?.data?.rentInfo?._id) {
      return;
    }

    const rentInformation = async () => {
      try {
        const response = await getSpecificTenantRentInfoOwner(
          `${profile.data.rentInfo._id}`
        );
        const rentInfo = response;
        setData(rentInfo);
      } catch (error) {
        // Handle the error as needed
      }
    };

    rentInformation();
  }, [profile]);


  return (
    <div className="w-full text-[14px]">
      <div className="grid grid-cols-1 gap-4 pointer-events-none">
        <Input
          label={"Property Type"}
          type={"type"}
          placeholder={"2-Bedroom Bungalow"}
          value={data?.upDateddata?.propertyType}
        />
        <Input
          label={"Duration"}
          type={"type"}
          placeholder={"1 Year"}
          value={addYearsToValues(data?.upDateddata?.duration)}
        />
        <Input
          label={"Property"}
          type={"type"}
          placeholder={"Property Name"}
          value={(data?.upDateddata?.estateId?.name)}
        />
        <Input
          label={"Start Date"}
          type={"type"}
          placeholder={"4th January, 2023"}
          value={changeBackendDateFormat(data?.upDateddata?.startDate)}
        />
        <Input
          label={"Home Address"}
          type={"type"}
          placeholder={"Home Address"}
          value={(data?.upDateddata?.tenantId?.houseAddress)}
        />
        <Input
          label={"Due Date"}
          type={"type"}
          placeholder={"4th January, 2024"}
          value={changeBackendDateFormat(data?.upDateddata?.dueDate)}
        />
        <Input 
        label={"Total Rent"}
         type={"type"} 
        placeholder={"N750,000"} 
        value={addCommasToNumber(data?.upDateddata?.totalRent)}
        />
        <div className="">
        <Input 
        label={"Payment Status"}
         type={"type"} 
        placeholder={"status"} 
        value={capitalizeFirstLetter(data?.upDateddata?.paymentStatus)}
        />
        </div>
      </div>
    </div>
  );
};

export default RentInformation;
