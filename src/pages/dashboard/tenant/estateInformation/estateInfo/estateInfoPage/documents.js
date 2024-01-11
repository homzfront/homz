"use client";
import Image from "next/image";
import React, { useState } from "react";
import PopUpMenu from "../../components/popUpMenu";


const Data = [
  {
    id: 1,
    name: "Tenant Agreement",
    size: "156kb",
  },
];

const Documents = () => {
  const data = Data || [];
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  return (
    <div className="flex gap-4">
      {data &&
        data.map((data) => (
          <div key={data.id} className="">
            <div className="h-[200px] w-[160px] border rounded-md py-5 px-2 flex flex-col justify-between">
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
                    {data.name}
                  </p>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                    }
                    height={21}
                    width={20}
                    alt=""
                    onClick={() => handleToggleMenu(data.id)}
                    className="cursor-pointer"
                  />
                </div>

                <p className="text-[11px] font-[400] text-BlueHomz">PDF</p>
                <p className="text-[11px] font-[400] text-GrayHomz">
                  {data.size}
                </p>
                {popUpMenuTwo && selectedDataId === data.id && (
                  <PopUpMenu/>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Documents;
