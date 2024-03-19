import Image from "next/image";
import React from "react";

const SearchEstate = ({ openAvailableEstate }) => {

  return (
    <div className="p-8">
      <div className="hidden sm:flex flex-col gap-4">
        <p className="text-[41px] font-[700] text-BlueHomz">Get Started</p>
        {/* <p className="text-[18px] font-[400] text-GrayHomz">
          Search and join the property where your rented apartment is located
        </p>
        <button
          onClick={openAvailableEstate}
          className="bg-BlueHomz w-[198px] h-[48px] text-white flex items-center justify-center gap-2 rounded-[4px]"
        >
          <Image
            src={"/static/dashboard/tenant/estateInfo/search-normal.png"}
            height={16}
            width={16}
            alt=""
          />
          Search for property
        </button> */}
      </div>
      <div className="sm:hidden  flex flex-col gap-3">
        <Image
          src={
            "/static/dashboard/enterprisemanager/estate/EmptyEstate.png"
          }
          alt=""
          height={72}
          width={72}
          className="m-auto"
        />
        <p className="text-[18px] font-[700] text-BlueHomz w-full text-center">Get Started</p>
        <p className="text-[14px] font-[400] text-GrayHomz w-full text-center">
          Search and join the property where your rented apartment is located
        </p>
        {/* <button
          onClick={openAvailableEstate}
          className="bg-BlueHomz hover:bg-walletBg w-full sm:w-[198px] h-[42px] text-white text-[14px] flex items-center justify-center gap-2 rounded-[4px]"
        >
          <Image
            src={"/static/dashboard/tenant/estateInfo/search-normal.png"}
            height={16}
            width={16}
            alt=""
          />
          Search for property
        </button> */}
      </div>
    </div>
  );
};

export default SearchEstate;
