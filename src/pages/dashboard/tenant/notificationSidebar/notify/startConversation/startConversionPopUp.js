import Image from "next/image";
import React from "react";
import Dropdown from "../../../components/dropDownTwo";

const StartConversionPopUp = ({dropStartConvo, onSelectData}) => {
  const options = [
    {
      id: 1,
      label: "Diamond Estate",
    },
    {
      id: 2,
      label: "Ajao Estate",
    },
    {
      id: 3,
      label: "Unity Estate",
    },
  ];

  const Data = [
    {
        Id: 1,
        Name: "Tunde Olayemi",
        Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
        Estate: "Sunrise Property"
      },
      {
        Id: 2,
        Name: "Jimoh Michael",
        Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
        Estate: "Heaven Property"
      },
      {
        Id: 3,
        Name: "Fortune Winifred",
        Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
        Estate: "Diamond Property"
      },
      {
        Id: 4,
        Name: "Haruna Ishola",
        Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
        Estate: "Ajao Property"
      },
      {
        Id: 5,
        Name: "Ibrahim Kehinde",
        Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
        Estate: "Heaven Property"
      },
      {
        Id: 6,
        Name: "Tunde Jackson",
        Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
        Estate: "Diamond Estate"
      },
      {
        Id: 7,
        Name: "Tella Bassey",
        Image: "/static/dashboard/enterprisemanager/settings/Avatar.png",
        Estate: "Ajao Estate"
      },
    ];
  
  return (
    <div className="relative h-[80%] p-10 w-full m-auto bg-white rounded-lg">
      <div onClick={dropStartConvo} className="cursor-pointer">
        <Image
          src={
            "/static/dashboard/enterprisemanager/notification/close-square.png"
          }
          alt=""
          className="absolute top-2 right-4"
          height={28}
          width={28}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[20px] text-BlackHomz font-[700]">
            Start A New Conversation
          </p>
          <p className="text-[16px] text-GrayHomz font-[400]">
            Select the tenant you want to send a message to
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              className="border h-[45px] pl-8 rounded-md w-[240px]"
              placeholder="search"
            />
            <Image
              src={
                "/static/dashboard/enterprisemanager/header/search-normal.png"
              }
              alt=""
              className="absolute top-3 left-3"
              height={17}
              width={16}
            />
          </div>
          <div className="flex items-center">
            <p className="text-[14px] text-BlackHomz font-[400] pr-2">
              Filter by:
            </p>
            <Dropdown
              selectOption={"Estate"}
              options={options}
              className={"w-[140px]"}
            />
          </div>
        </div>
      </div>
      <div className=" overflow-auto max-h-[60vh] scrollbar-container">
        {/* Set max height and overflow-auto for scrolling */}
        {Data.map((data) => (
          <div key={data.Id} className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center gap-8 ">
              <div>
                <Image src={data.Image} height={40} width={40} alt="" />
              </div>
              <div className="flex gap-4">
                <p className="text-[16px] text-GrayHomz font-[400] w-[180px]">{data.Name}</p>
                <p className="text-[16px] text-GrayHomz2 font-[400] w-[180px]">{data.Estate}</p>
              </div>
            </div>
            <button onClick={()=>onSelectData(data)}  className="text-[16px] text-BlueHomz font-[400] pr-8">Start Conversation</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartConversionPopUp;
