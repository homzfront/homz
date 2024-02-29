"use client";
import Image from "next/image";
import React, { useState } from "react";
import AvailableEstateCard from "../components/availabeEstateCard";
import Button from "../../components/button";
import Dropdown from "../../components/dropDownTwo";
import MultipleDropDown from "../components/multipleDropDown";
import ArrowBack from "@/components/icons/arrowBack";
import Mag from "@/components/icons/mag";
import Search from "@/components/icons/search";

const Data = [
  {
    id: 1,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 2,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 3,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 4,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 5,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 6,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 7,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 8,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 9,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
  {
    id: 10,
    estateImage: "/static/dashboard/enterprisemanager/estate/Rectangle 10.png",
    estateName: "Suncity New Property",
    estateAddress: "Alagomeji Area, Yaba, Lagos",
    noOfApartment: 22,
  },
];

const AvailableEstate = ({ closeAvailableEstate, openLink }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(Data || []);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Use optional chaining to handle cases where Data is undefined
  const firstThreePages = Array.from(
    { length: Math.min(totalPages || 0, 3) },
    (_, index) => index + 1
  );

  const handleToggleMenu = (id) => {
    setPopUpMenu(!popUpMenu);
    setSelectedDataId(id);
  };

  return (
    <div className="absolute top-0 z-20 h-full w-full inset-0">
      <div className="hidden sm:block p-8 w-full ">
        <div className="flex items-center gap-2">
          <div
            onClick={closeAvailableEstate}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Image
              src={"/static/dashboard/tenant/estateInfo/arrow-left.png"}
              alt=""
              height={16}
              width={16}
            />
            <p className="text-[14px] font-[400px] text-GrayHomz2">Go Back</p>
          </div>

          <p className="text-[20px] font-[500px] text-GrayHomz">Join Property</p>
        </div>
        <p className="mt-2 text-[14px] font-[400px] text-GrayHomz">
          Select and join the property where your rented property is located.
        </p>
        <div>
          <div>
            <div className="mt-8 flex justify-between items-center">
              <div className="flex items-center justify-center gap-2">
                <p className="text-[16px] font-[400] text-BlackHomz pr-2">
                  Filter by:{" "}
                </p>

                <div className="">
                  <MultipleDropDown />
                </div>
              </div>
            </div>

            <div className=" py-4 h-[750px] flex flex-col justify-between">
              <AvailableEstateCard
                Data={currentData}
                handleToggleMenu={handleToggleMenu}
                data={currentData}
                popUpMenu={popUpMenu}
                selectedDataId={selectedDataId}
                openLink={openLink}
              />
              <Button
                firstThreePages={firstThreePages}
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handlePageClick={handlePageClick}
                handlePrev={handlePrev}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden mt-6 px-8">
        <div className="relative flex items-center gap-2">
          <div
            onClick={closeAvailableEstate}
            className="absolute cursor-pointer"
          >
            <ArrowBack />
          </div>
          <p className="text-[14px] font-[400px] w-full text-center text-GrayHomz">Join Property</p>
        </div>

        <div className="mt-4 relative flex gap-4">
          <input
            placeholder="Search"
            className="border pl-8 w-full h-[40px] text-GrayHomz placeholder:text-[13px] placeholder:text-GrayHomz2 placeholder:font-[400] flex items-center justify-center gap-2 rounded-[4px]"
          />
          <div className="absolute top-[12px] left-[12px]">
            <Search />
          </div>
          <button className="flex items-center justify-center w-[40px] h-[40px] rounded-[4px] border border-BlueHomz">
            <Mag />
          </button>

        </div>
        <div className=" border w-full rounded-t-[12px] mt-4">
          <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz  px-4 rounded-t-[12px]">
            <div className="w-[50%] ">Property</div>
            <div className="w-[50%] ">Address</div>
          </div>

          <div className="">
            {currentData &&
              currentData?.map((data) => (
                <div
                  key={data.id}
                  className="border-b-[1px] items-center flex justify-center w-full gap-2 px-4 h-[60px]"
                >
                  <div className="text-GrayHomz w-[50%] font-[500] text-[11px] text-start">
                    {data?.estateName}
                  </div>
                  <div className="text-GrayHomz w-[50%] font-[500] text-[11px] text-start">
                    {data?.estateAddress}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Button
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default AvailableEstate;
