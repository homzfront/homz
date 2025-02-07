import React from "react";

const Box = ({
  bgColor,
  textColor,
  textColor2,
  border,
  textColor3,
  payDate,
  type,
  money,
  dueDate,
  width = "md:w-[220px]"
}) => {
  return (
    <div className={`h-[80px] ${width} py-2 flex flex-col justify-around border ${border}  rounded-md px-[12px] bg-${bgColor}`}>
      <div className={`${textColor} text-[13px] font-[600] `}>{type}</div>
      <div className={`text-[11px] font-[400] ${textColor3}`}>{payDate} </div>
      <div className={`text-[14px] font-[500] ${textColor2}`}><span style={{ fontFamily: "Arial", }}>₦</span>{money}</div>
      <div className="text-[10px] font-[400] text-BlackHomz">{dueDate} </div>
    </div>
  );
};

export default Box;
