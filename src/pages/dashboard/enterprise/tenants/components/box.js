import React from "react";

const Box = ({
    bgColor,
    textColor,
    type,
    money,
    dueDate
}) => {
  return (
    <div className={`h-[80px] w-[192px] py-2 flex flex-col justify-around  rounded-md px-[24px] bg-${bgColor}`}>
      <div  className={`text-${textColor} text-[13px] font-[600] text-BlackHomz`}>{type}</div>
      <div className="text-[14px] font-[500] text-BlackHomz">{money}</div>
      <div className="text-[10px] font-[400] text-BlackHomz">{dueDate} </div>
    </div>
  );
};

export default Box;
