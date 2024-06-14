"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import PopUpMenu from "../../components/popUpMenu";
import useClickOutside from "@/utils/clickOutside";

const Documents = ({ data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setPopUpMenuTwo(false));


  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };
  
  const Agreement = data?.estateId?.documents || [];

  return (
    <div>
      <p className="hidden sm:block text-[16px] font-[400] text-GrayHomz">
        Access and download important documents uploaded by your property
        manager
      </p>

      <div className="flex mt-8 gap-4">
        {data &&
          Agreement?.map((data) => (
            <div key={data?._id} className="">
              <div className="h-[200px] w-[160px] border rounded-lg py-5 px-2 flex flex-col justify-between">
                <div>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/estate/document-text.png"
                    }
                    height={64}
                    width={64}
                    alt=""
                    className="m-auto"
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <div className="flex justify-between items-center ">
                    <p className="text-[13px] font-[500] text-BlackHomz">
                      {data?.fileName}
                    </p>
                    <Image
                      src={
                        "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                      }
                      height={21}
                      width={20}
                      alt=""
                      onClick={() => handleToggleMenu(data?._id)}
                      className="cursor-pointer"
                    />
                  </div>

                  <p className="text-[11px] font-[400] text-BlueHomz">PDF</p>
                  <p className="text-[11px] font-[400] text-GrayHomz">
                    {`${(data?.fileDocument?.size / 1024).toFixed(2)}kb`}
                  </p>
                  {popUpMenuTwo && selectedDataId === data?._id && <PopUpMenu data={data} dropdownRef={dropdownRef}/>}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Documents;
