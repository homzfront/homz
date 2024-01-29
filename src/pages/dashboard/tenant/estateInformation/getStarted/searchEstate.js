import Image from "next/image";
import React from "react";

const SearchEstate = ({ openAvailableEstate }) => {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-4">
        <p className="text-[41px] font-[700] text-BlueHomz">Get Started</p>
        <p className="text-[18px] font-[400] text-GrayHomz">
          Search and join the property where your rented apartment is located
        </p>
        <button
          onClick={openAvailableEstate}
          className="bg-BlueHomz w-[178px] h-[48px] text-white flex items-center justify-center gap-2 rounded-[4px]"
        >
          <Image
            src={"/static/dashboard/tenant/estateInfo/search-normal.png"}
            height={16}
            width={16}
            alt=""
          />
          Search for property
        </button>
      </div>
    </div>
  );
};

export default SearchEstate;
