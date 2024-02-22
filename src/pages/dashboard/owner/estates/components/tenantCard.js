import { fetchSpecificTenantOwner } from "@/api/tenantSevice";
import tenantsDataForLoggedInOwner from "@/store/propertyOwnerStore/tenantsDataForLoggedInOwner";
import addCommasToNumber from "@/utils/addCommasToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TenantsCard = ({data}) => {
  console.log(data)
const ids = data?.tenants
console.log(ids)
const [tenantData, setTenantData] = useState({});


useEffect(() => {
  console.log(ids)
  if (ids === undefined) {
      setTenantData({})
  } else {
    const fetchDataForId = async (id) => {
      console.log(id);
      try {
        if (id !== undefined) {
          const response = await fetchSpecificTenantOwner(id);
          console.log(response);
          setTenantData(prevData => ({
            ...prevData,
            [id]: response?.data // Store the response with the id as the key
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Fetch additional data for each ID
    ids?.forEach(id => {
      fetchDataForId(id);
    });
  }

},  [ids]); // Empty dependency array ensures this effect runs only once on component mount

// Now you have maintenanceData updated with additional data for each ID
console.log(tenantData);

const Data = Object.values(tenantData).flat();
console.log(Data);



const { data: tenantData2, loading, fetchData } = tenantsDataForLoggedInOwner();

useEffect(() => {
  fetchData(); // Fetch data on component mount
}, []);

console.log(tenantData2);

// Create a new object with _id as keys
const mergedData = {};

// Iterate over data1 and add each object to mergedData
Data?.forEach(obj => {
  mergedData[obj._id] = obj;
});

// Iterate over data2 and merge each object with the corresponding object in mergedData
tenantData2?.forEach(obj => {
  // Check if the _id exists in mergedData
  if (mergedData[obj._id]) {
    // Merge the objects
    mergedData[obj._id] = { ...mergedData[obj._id], ...obj };
  }
});

// Convert mergedData to an array of objects
const mergedArray = Object.values(mergedData);

console.log(mergedArray);

  return (
    <div className="rounded-[12px] border w-[55%] h-[514px] overflow-auto scrollbar-container">
    <div className="flex justify-between  p-6">
      <div className="text-BlueHomz font-[500] text-[18px] flex gap-1">
        <p>Tenants</p>
        <p>
        {Data?.length ? `${Data?.length}` : "0"}
          /{Data?.length ? `${Data?.length}` : "0"}
        </p>
      </div>
      <Link
        href={"/dashboard/property-owner/tenants"}
        className="flex gap-1 items-center"
      >
        <p className="text-[13px] font-[400]">View All</p>
        <Image
          src={
            "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
          }
          alt=""
          height={17}
          width={16}
        />
      </Link>
    </div>
    <div className=" ">
      <table border="1" className="w-full ">
        <thead className="">
          <tr className="bg-whiteblue h-[30px] text-[13px] font-[500] text-BlackHomz">
            <th className="text-left pl-6">Tenant</th>
            <th className="text-left ">Property</th>
            <th className="text-left">Rent</th>
            <th className="text-left">Status</th>
            <th className="text-left pr-6">Due Date</th>
          </tr>
        </thead>
        <tbody className="">
          {mergedArray?.map((data) => (
            <tr key={data._id} className=" border-t-[1px] items-center">
              <td className="flex items-center gap-1 pr-2  pl-6 text-GrayHomz4 font-[500] text-[11px]">
                {!data?.coverPhoto?.url ? (
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                    }
                    alt=""
                    width={30}
                    height={30}
                    className="py-[15px]"
                  />
                ) : (
                  <Image
                    src={data?.coverPhoto?.url}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-[100%] py-[15px]"
                  />
                )}
                <span className="py-[15px]">{data?.fullName}</span>
              </td>
              <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                {data?.estateId?.name}
              </td>
              <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                {`${data?.rentInfo?.totalRent
                    ? addCommasToNumber(data?.rentInfo?.rent)
                    : "______"
                  }`}
              </td>
              <td
                className={`text-GrayHomz py-[15px] pr-2 font-[500]  text-[11px] `}
              >
                <span
                  className={`p-[6px] rounded-lg text-center ${data?.rentInfo?.paymentStatus === "pending"
                      ? "bg-warningBg text-warning2 px-[10px]"
                      : ""
                    } ${data?.rentInfo?.paymentStatus === "paid"
                      ? "bg-successBg text-Success  px-[21px]"
                      : ""
                    } ${data?.rentInfo?.paymentStatus === "over due"
                      ? "bg-error text-white px-2"
                      : ""
                    }`}
                >
                  {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                </span>
              </td>
              <td className="text-GrayHomz py-[15px] font-[500] text-[11px] pr-6">
                {`${data?.rentInfo?.dueDate
                    ? changeBackendDateFormat(data?.rentInfo?.dueDate)
                    : "______"
                  }`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  );
};

export default TenantsCard;
