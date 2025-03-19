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
    handleToggleMenu(data.id);
    setPopUpMenuVisible(!popUpMenuVisible);
  };

  return (
    <div className="w-full h-[auto] md:h-[285px] rounded-lg shadow-md">
      <div>
        <div
          style={{ position: "relative" }}
          className="h-[150px] md:h-[168px] w-full rounded-lg overflow-hidden relative"
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
              className="object-cover bg-center h-[150px] md:h-[168px] w-full rounded-[8px]"
              priority
            />
          )}
        </div>
        <div className="p-4 flex gap-2 md:gap-3 h-full flex-col">
          <div ref={dropdownRef} className="relative flex justify-between items-center">
            <p className="font-[700] text-[13px] md:text-[16px] truncate text-BlueHomz">{value2}</p>
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
              }
              alt=""
              height={21}
              width={19}
              onClick={handleToggleMenuClick}
              className="hidden md:block cursor-pointer"
              style={{ height: "auto", width: "auto" }}
            />
            <Image
              src={
                "/Dots.svg"
              }
              alt=""
              height={15}
              width={15}
              onClick={handleToggleMenuClick}
              className="md:hidden cursor-pointer"
              style={{ height: "auto", width: "auto" }}
            />
            {popUpMenuVisible && (
              <PopUpMenu data={data} />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Image src={Image1} height={12} width={12} alt="" style={{ height: "12px", width: "12px" }} className="md:hidden" />
            <Image src={Image1} height={17} width={16} alt="" style={{ height: "auto", width: "auto" }} className="hidden md:block" />
            <p className="font-[500] text-[9px] md:text-[11px] truncate text-GrayHomz">{value3}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image src={Image2} height={12} width={12} alt="" style={{ height: "12px", width: "12px" }} className="md:hidden" />
              <Image src={Image2} height={17} width={16} alt="" style={{ height: "auto", width: "auto" }} className="hidden md:block" />
              <p className="font-[400] text-[9px] md:text-[11px] text-GrayHomz">{value4}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
