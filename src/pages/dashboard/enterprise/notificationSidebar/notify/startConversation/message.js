import Image from "next/image";
import React from "react";

const Message = ({ selectedData }) => {
  return (
    <div className="w-full text-center h-[500px] flex flex-col justify-between ">
      <div className="text-[18px] font-[500] text-GrayHomz">
        {selectedData.Name}
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Type your message here"
          className=" placeholder:text-GrayHomz5 bg-inputBg h-[83px] w-full p-4 rounded-lg"
        />
        <div className="absolute top-8 right-6">
          <Image
            src={"/static/dashboard/enterprisemanager/notification/Vector.png"}
            alt=""
            height={23}
            width={24}
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
