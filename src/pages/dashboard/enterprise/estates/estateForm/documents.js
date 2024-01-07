import React, { useState } from "react";
import Image from "next/image";
import PopUpMenuDoc from "../components/popUpMenuDoc";

const Data = [
  {
    id: 1,
    name: "Tenant Agreement",
    size: "156kb",
  },
  {
    id: 2,
    name: "New Document",
    size: "160kb",
  },
];

const Documents = ({handlePageChangeThree}) => {

  const data = Data || [];
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };
  return (
    <div className="px-8 py-4">
      <div className="flex flex-col">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Document</h1>
        <p className="text-[18px] font-[400] text-GrayHomz ">
          Upload necessary documents for your Tenants to acess.
        </p>
        {/* <p className="text-[13px] font-[400] text-GrayHomz2">
          Supported formats are .jpg and .png and file size must not exceed 5 mb
        </p> */}
      </div>
      <div className="flex gap-4 mt-4">
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
                    <PopUpMenuDoc data={data} />
                  )}
                </div>
              </div>
            </div>
          ))}
        <div>
          <div className="h-[200px] w-[160px] border rounded-md py-5 px-2 flex flex-col">
            <div className="m-auto">
              <Image
                src={"/static/dashboard/enterprisemanager/estate/add.png"}
                height={71}
                width={72}
                alt=""
                className="cursor-pointer"
              />
            </div>
            <div>
              <p className="text-[13px] font-[500] text-BlackHomz text-center">
                Click to add new document
              </p>
              <p className="mt-2 text-[10px] font-[400] text-GrayHomz2 text-center">
                PDF (max. 3mb)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[20%] flex justify-between">
        <div>
          <button
            onClick={handlePageChangeThree}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            {" "}
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        <div className="flex gap-4">
          <button

            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            Skip
          </button>
          <button
            disabled
            className="opacity-[20%] text-[14px] font-[500] p-4 rounded-md bg-BlueHomz border text-white flex w-[100px] justify-center items-center"
          >
            Next
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documents;
