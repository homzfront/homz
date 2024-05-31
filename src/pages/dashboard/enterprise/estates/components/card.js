import Image from "next/image";
import React, { useState } from "react";
import PopUpMenu from "./popUpMenu";
import useClickOutside from "@/utils/clickOutside";

const Card = ({
  value1,
  value2,
  value3,
  value4,
  value5,
  Image1,
  Image2,
  Image3,
  data,
  handleToggleMenu,
}) => {
  const [popUpMenuVisible, setPopUpMenuVisible] = useState(false);
  const dropdownRef = useClickOutside(() => setPopUpMenuVisible(false)); // Use the custom hook

  const handleToggleMenuClick = () => {
    handleToggleMenu(data?.id);
    setPopUpMenuVisible(!popUpMenuVisible);
  };

  return (
    <div className="h-[285px] rounded-lg shadow-md">
      <div className="">
        <div
          style={{ position: "relative" }}
          className="h-[168px] w-full rounded-lg overflow-hidden relative"
        >
          {value1 && (
            <Image
              src={value1}
              height={168}
              width={264}
              alt=""
              layout="full" // Specify the desired height
              objectFit="cover"
              objectPosition="center"
              className="object-cover bg-center h-[168px] rounded-[8px]"
              priority
            />
          )}
        </div>

        <div className="p-4 flex gap-3 h-full flex-col">
          <div ref={dropdownRef} className="relative flex justify-between items-center">
            <p className="font-[700] truncate text-[16px] text-BlueHomz">{value2}</p>
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
              }
              alt=""
              height={21}
              width={19}
              onClick={handleToggleMenuClick}
              className="cursor-pointer"
              style={{ height: "auto", width: "auto" }}
            />

            {popUpMenuVisible && <PopUpMenu data={data} />}
          </div>
          <div className="flex gap-2">
            <Image
              src={Image1}
              height={17}
              width={16}
              alt=""
              style={{ height: "auto", width: "auto" }}
            />
            <p className="font-[500] truncate text-[11px] text-GrayHomz">{value3}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Image
                src={Image2}
                height={17}
                width={16}
                alt=""
                style={{ height: "auto", width: "auto" }}
              />
              <p className="font-[400] text-[11px] text-GrayHomz">{value4}</p>
            </div>
            {/* <div className="flex gap-2">
              <Image src={Image3} height={12} width={16} alt="" style={{ height: "auto", width: "auto" }}/>
              <p className="font-[400] text-[11px] text-GrayHomz">{value5}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
