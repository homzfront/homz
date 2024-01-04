"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../../../components/button";

const Data = [
  {
    id: 1,
    image: "/static/dashboard/enterprisemanager/propertyList/Avatar.png",
    comment: "Awesome service, I got my beautiful home without stress",
    name: "Tunde",
    date: "2 days ago",
    rating: 5,
  },
  {
    id: 2,
    image: "/static/dashboard/enterprisemanager/propertyList/Avatar.png",
    comment: "Awesome service, I got my beautiful home without stress",
    name: "Tunde",
    date: "2 days ago",
    rating: 4,
  },
  {
    id: 3,
    image: "/static/dashboard/enterprisemanager/propertyList/Avatar.png",
    comment: "Awesome service, I got my beautiful home without stress",
    name: "Tunde",
    date: "2 days ago",
    rating: 5,
  },
  {
    id: 4,
    image: "/static/dashboard/enterprisemanager/propertyList/Avatar.png",
    comment: "Awesome service, I got my beautiful home without stress",
    name: "Tunde",
    date: "2 days ago",
    rating: 5,
  },
  {
    id: 5,
    image: "/static/dashboard/enterprisemanager/propertyList/Avatar.png",
    comment: "Awesome service, I got my beautiful home without stress",
    name: "Tunde",
    date: "2 days ago",
    rating: 4,
  },
  {
    id: 6,
    image: "/static/dashboard/enterprisemanager/propertyList/Avatar.png",
    comment: "Awesome service, I got my beautiful home without stress",
    name: "Tunde",
    date: "2 days ago",
    rating: 5,
  },
  {
    id: 7,
    image: "/static/dashboard/enterprisemanager/propertyList/Avatar.png",
    comment: "Awesome service, I got my beautiful home without stress",
    name: "Tunde",
    date: "2 days ago",
    rating: 5,
  },
];

const CommentAndRatings = () => {
  const [data, setData] = useState(Data || []);

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

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

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  return (
    <div className="">
      <div className="flex items-center gap-4">
        <p className="text-[20px] font-[500]">Ratings/Reviews</p>
        <div className="h-[32px] w-[32px] bg-whiteblue flex justify-center items-center rounded-sm">
          <p className="text-[18px] font-[400] text-BlueHomz ">{data.length}</p>
        </div>
      </div>
      {currentData.map((data) => (
        <div key={data.id}>
          <div className="w-full border-b mt-4">
            <div className="flex items-center gap-2">
              <Image src={`${data.image}`} alt="" height={40} width={40} />
              <p className="text-[20px] font-[500] text-GrayHomz ">
                {data.name}
              </p>
            </div>
            <div className="flex gap-2 items-center ">
              <div className="h-10">
                {[...Array(data.rating)].map((index) => {
                  return (
                    <span key={index} className="text-BlueHomz text-[24px]">
                      &#9733;
                    </span>
                  );
                })}
              </div>
              <p className="text-[14px] font-[400] text-GrayHomz">
                {data.date}
              </p>
            </div>
            <div className="text-[16px] font-[400] text-GrayHomz mb-4">
              {data.comment}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-16">
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

export default CommentAndRatings;
