"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "../../components/button";

const Rating_Review = () => {
  const searchParams = useSearchParams();
  let id = searchParams.get("PropertyId");

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );
  const lastThreePagesStart = Math.max(totalPages - 2, 1); // Calculate the starting page number for the last three pages
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );

  return (
    <div>
      <Link
        href="/list_Property/PreviewProperty"
        className="flex gap-2 items-center"
      >
        <Image
          src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
          height={16}
          width={16}
          alt=""
          className="hidden md:block"
        />
        <p className="text-[11px] font-[400] hidden md:block">Go Back</p>
        <span className="md:hidden bg-[#EEF5FF] w-[28px] h-[28px] p-[4px] rounded-[8px]">
          <Image
            src="/static/images/blue-arrow-left.svg"
            width={20}
            height={20}
            alt=""
          />
        </span>
      </Link>
      <div className="flex gap-2 items-center my-5">
        <p className="font-[500] leading-[30px] md:text-[20px]">
          Ratings/Reviews
        </p>

        <p className="text-[#006AFF] md:text-[18px] bg-[#EEF5FF] px-[8px] h-[28px] md:h-[35px] py-[4px] rounded-[8px]">
          {reviews.length}
        </p>
      </div>
      <div className="">
        {currentReviews.map((review, index) => (
          <div
            className="flex flex-col headerAdmin gap-[16px] pb-6 pt-4"
            key={index}
          >
            <div className="flex gap-2 items-center">
              <Image
                src={review.image}
                alt=""
                height={40}
                width={40}
                layout="full" // Specify the desired height
                objectFit="cover"
                objectPosition="center"
                className="object-cover bg-center h-[40px] rounded-full"
                quality={100}
                priority
              />

              <p className="text-[18px] font-[500] text-GrayHomz">
                {review.name}
              </p>
            </div>
            <div className="flex gap-[4px] items-center rounded-[8px] py-[2px] px-[4px] bg-white">
              {[...Array(review.rating)].map((_, i) => (
                <Image
                  key={i}
                  src="/static/images/star.svg"
                  alt=""
                  width={12}
                  height={12}
                />
              ))}
              <p className="text-[12px] font-[400] leading-[16.38px]  md:text-[14px]">
                2 days ago
              </p>
            </div>
            <div className=" ">
              <p className="md:text-[14px] md:font-[500] md:leading-[21px] text-left text-[#4E4E4E] break-words">
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        lastThreePages={lastThreePages}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default Rating_Review;

const reviews = [
  {
    _id: "1",
    name: "John Doe",
    rating: 4,
    image: "/static/images/OwnerImagesTwo.png",
    review: "This product is amazing! I love the quality and price.",
  },
  {
    _id: "2",
    name: "Jane Smith",
    rating: 5,
    image: "/static/images/blueLady.png",
    review:
      "I was a bit skeptical at first, but this product exceeded my expectations!",
  },
  {
    _id: "3",
    name: "Alice Johnson",
    rating: 3,
    image: "/static/images/OwnerImagesTwo.png",
    review: "Great experience with this property! Highly recommend.",
  },
  {
    _id: "4",
    name: "Bob Brown",
    rating: 3,
    image: "/static/images/OwnerImagesTwo.png",
    review: "Good value for money. Would buy again.",
  },
  {
    _id: "5",
    name: "Emily Davis",
    rating: 5,
    image: "/static/images/OwnerImagesThree.png",
    review: "Excellent service and communication from the seller.",
  },

  {
    _id: "6",
    name: "Michael Wilson",
    rating: 4,
    image: "/static/images/OwnerImagesTwo.png",
    review: "Impressed with the professionalism of the real estate agent.",
  },
  {
    _id: "7",
    name: "Sophia Martinez",
    rating: 3,
    image: "/static/images/OwnerImagesThree.png",
    review: "Satisfied with the property condition. No complaints.",
  },
  {
    _id: "8",
    name: "William Taylor",
    rating: 1,
    image: "/static/images/OwnerImagesTwo.png",
    review: "Smooth transaction process. Happy with my purchase.",
  },
  {
    _id: "9",
    name: "Olivia Anderson",
    rating: 2,
    image: "/static/images/OwnerImagesTwo.png",
    review: "Beautiful property with stunning views. Worth every penny.",
  },
  {
    _id: "10",
    name: "James Wilson",
    rating: 4,
    image: "/static/images/blueLady.png",
    review: "Overall great experience. Would recommend to friends.",
  },
];
