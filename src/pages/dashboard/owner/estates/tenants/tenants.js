"use client"
import React, { useEffect, useState } from "react";
import TenantsTwo from "../../tenants/firstPage/tenantsTwo";
import Image from "next/image";
import Link from "next/link";
import useEstateForOneStore from "@/store/useEstateForOne";
import { fetchSpecificTenantOwner } from "@/api/tenantSevice";
import tenantsDataForLoggedInOwner from "@/store/propertyOwnerStore/tenantsDataForLoggedInOwner";
import formatDateII from "@/utils/formatDateII";

const Tenants = ({ id }) => {
  const { data, fetchData: fetchEstateData } = useEstateForOneStore();

  useEffect(() => {
    fetchEstateData(id);
  }, []);

  console.log(data);

  const ids = data?.tenants
  console.log(ids)
  const [tenantData, setTenantData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const clear = () => {
    setSelectedDate(null)
  };


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

  }, [ids]); // Empty dependency array ensures this effect runs only once on component mount

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

  const filteredData = mergedArray?.filter(
    (data) => {
      const selectedDateTimestamp = Date.parse(selectedDate);
      const dueDateTimestamp = Date.parse(formatDateII(data?.rentInfo?.dueDate));
      console.log(dueDateTimestamp);
      console.log(selectedDateTimestamp)
      return (
        (!selectedDate || selectedDateTimestamp <= dueDateTimestamp)
      );
    });

  console.log(filteredData);

  return (
    <div className="w-full  p-8">
      <div className="mb-4">
        <div className="w-[475px] flex gap-2 items-center">
          <Image
            src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
            alt=""
            height={16}
            width={16}
          />
          <Link
            href={"/dashboard/property-owner/estates"}
            className="text-[14px] font-[400] text-GrayHomz2"
          >
            Go Back
          </Link>
          <Link
            href={"/dashboard/property-owner/estates"}
            className="text-[16px] font-[400] text-GrayHomz"
          >
            Property Name<> </>/
          </Link>
          <div className="text-[20px] font-[500] text-GrayHomz">Tenants</div>
        </div>
      </div>
      <div className=" flex justify-between items-center">
        <div className="flex gap-2 ">
          <p>Tenants</p>
          <span className="bg-whiteblue w-6 h-6 flex justify-center ">
            <span className="text-BlueHomz ">{Data.length}</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-[16px] font-[400] text-BlackHomz pr-2">
            Filter by:{" "}
          </p>
          <input
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-4 h-[42px] w-[130px] text-GrayHomz2 mb-1 p-2 rounded cursor-pointer"
          />
          <button
            onClick={clear}
            type="text" className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
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
      <div className="h-[734px] mb-4">
        <TenantsTwo data={filteredData} />
      </div>
    </div>
  );
};

export default Tenants;
