"use client";
import Image from "next/image";
import React, { useState } from "react";
import AvailableEstateCard from "../components/availabeEstateCard";
import Button from "../../components/button";
import Dropdown from "../../components/dropDownTwo";
import MultipleDropDown from "../components/multipleDropDown";

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
      <div className="p-8 w-[1147px] ">
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
    </div>
  );
};

export default AvailableEstate;
