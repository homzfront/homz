"use client"
import React, { useEffect, useState } from "react";
import TenantsTwo from "../../tenants/firstPage/tenantsTwo";
import Image from "next/image";
import Link from "next/link";
import Modal from "../../tenants/components/modal";
import EstateForm from "../estateForm/estateForm";
import useTenantOfAnEstate from "@/store/enterpriseStore/useTenantOfAnEstate";
import useClickOutside from "@/utils/clickOutside";
import formatDateII from "@/utils/formatDateII";

const Tenants = ({ id }) => {
  console.log(id);
  const { data: tenantData, loading, fetchData } = useTenantOfAnEstate();

  useEffect(() => {
    fetchData(id); // Fetch data on component mount
  }, []);

  const data = tenantData?.results?.[0]?.data;
  console.log(data);
  const [inviteTenant, setInviteTenant] = useState(false);
  const [addNewProperty, setAddNewProperty] = useState(false);
  const dropdownRef = useClickOutside(() => setInviteTenant(false));
  const [selectedDate, setSelectedDate] = useState(null);

  const clear = () => {
    setSelectedDate(null)
  };


  const filteredData = data?.filter(
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


  const openInvite = () => {
    setInviteTenant(!inviteTenant);
  };

  const openAddNewProperty = () => {
    setAddNewProperty(!addNewProperty);
  };

  const closeProperty = () => {
    setAddNewProperty(false);
  };

  return (
    <div className="w-full  p-8">
      {inviteTenant && (
        <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal dropdownRef={dropdownRef} />
        </div>
      )}
      {addNewProperty ? (
        <EstateForm returnToStartRegistration={closeProperty} />
      ) : (
        <div>
          <div className="mb-4">
            <div className="w-[475px] flex gap-2 items-center">
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
                }
                alt=""
                height={16}
                width={16}
              />
              <Link
                href={"/dashboard/enterprise-property/estates"}
                className="text-[14px] font-[400] text-GrayHomz2"
              >
                Go Back
              </Link>
              <Link
                href={"/dashboard/enterprise-property/estates"}
                className="text-[16px] font-[400] text-GrayHomz"
              >
                Property Name<> </>/
              </Link>
              <div className="text-[20px] font-[500] text-GrayHomz">
                Tenants
              </div>
            </div>
          </div>
          <div className=" flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Tenants</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz text-[18px] font-[400]">{data?.length ? `${data?.length}` : "0"}</span>
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
                type="text"
                className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
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
            <div className="flex gap-2">
              <button
                onClick={openInvite}
                className={`p-[12px] h-10 w-[140px] border border-BlueHomz bg-white text-BlueHomz rounded-md flex items-center gap-1 text-[14px] font-[700]`}
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/estate/add-square.png"
                  }
                  alt=""
                  width={16}
                  height={17}
                  style={{ height: "auto", width: "auto" }}
                />
                Invite Tenant
              </button>
              <button
                onClick={openAddNewProperty}
                className={`p-[12px] h-10 w-[170px] justify-center bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[14px] font-[700]`}
              >
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                  }
                  alt=""
                  width={16}
                  height={16}
                />
                Add New Property
              </button>
            </div>
          </div>
          <div className="h-[734px] mb-4">
            <TenantsTwo Data={filteredData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;
