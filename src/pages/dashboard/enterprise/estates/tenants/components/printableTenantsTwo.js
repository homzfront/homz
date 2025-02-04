"use client";
import Image from "next/image";
import React, { useState } from "react";
import StatusDropdown from "../../../components/statusDropDown";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import useClickOutside from "@/utils/clickOutside";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import EmptyAvatar from "@/components/icons/emptyAvatar";

const PrintableTenantsTwo = ({ Data, printableRef }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loadingRows, setLoadingRows] = useState({});
  const dropdownRefII = useClickOutside(() => setOpenDropdowns({}));

  const handleStatusChange = async (status, dataId, id) => {};
  const toggleDropdown = (dataId) => {};

  return (
    <div ref={printableRef} className="mt-6 p-4">
      <div className="flex flex-col justify-between max-h-[900px]">
        <div className="border w-full">
          <div className="bg-whiteblue h-[60px] text-[13px] font-[500] flex items-center justify-between px-4 text-BlackHomz">
            <div className="w-[24%]">Tenant</div>
            <div className="w-[19%]">Address</div>
            <div className="w-[14%]">Phone No</div>
            <div className="w-[14%]">Rent</div>
            <div className="w-[14%]">Status</div>
            <div className="w-[15%]">Due Date</div>
          </div>
          <div>
            {Data &&
              Data.map((data) => (
                <div
                  key={data?._id}
                  className="border-b flex items-center justify-between px-4 py-2"
                >
                  <div className="flex items-center gap-2 w-[24%] text-GrayHomz4 font-[500] text-[11px]">
                    <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
                      {!data?.coverPhoto?.url ? (
                        <EmptyAvatar />
                      ) : (
                        <Image
                          src={data?.coverPhoto?.url}
                          alt=""
                          width={40}
                          height={40}
                          className="object-cover rounded-full"
                          priority
                        />
                      )}
                    </div>
                    <span className="break-words">{data?.fullName}</span>
                  </div>
                  <div className="w-[19%] text-GrayHomz text-[11px] break-words">
                    {data?.estateId?.address || "______"}
                  </div>
                  <div className="w-[14%] text-GrayHomz text-[11px] break-words">
                    {data?.phoneNumber || "______"}
                  </div>
                  <div className="w-[14%] text-GrayHomz text-[11px] break-words">
                    {data?.rentInfo?.totalRent
                      ?<>
                      <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.rentInfo?.totalRent)}
                      </>
                      : "______"}
                  </div>
                  <div className="w-[14%] text-GrayHomz text-[11px]">
                    {data?.rentInfo?.paymentStatus ? (
                      <StatusDropdown
                        setSelectedStatus={(status) =>
                          setSelectedStatus((prev) => ({
                            ...prev,
                            [data._id]: status,
                          }))
                        }
                        value={capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                        selectedStatus={selectedStatus[data._id] || null}
                        handleStatusChange={(status) =>
                          handleStatusChange(status, data._id, data?.rentInfo?._id)
                        }
                        isOpen={openDropdowns[data?._id] || false}
                        toggleDropdown={() => toggleDropdown(data?._id)}
                        loading={loadingRows[data?._id] || false}
                        dropdownRef={dropdownRefII}
                      />
                    ) : (
                      "______"
                    )}
                  </div>
                  <div className="w-[15%] text-GrayHomz text-[11px]">
                    {data?.rentInfo?.dueDate
                      ? changeBackendDateFormat(data?.rentInfo?.dueDate)
                      : "______"}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableTenantsTwo;
