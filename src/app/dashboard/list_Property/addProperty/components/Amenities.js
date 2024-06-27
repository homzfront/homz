import React, { useState } from "react";
import CustomizedModal from "../../components/CustomizedModal";
import Image from "next/image";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";


const Amenities = ({
  isOpen,
  onRequestClose,
  handleEvent,
  cancel,
  setOpenAmeni,
  amenitiesPicked
}) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleCheckboxChange = (amenity) => {
    setSelectedAmenities((prevSelected) =>
      prevSelected.includes(amenity)
        ? prevSelected.filter((item) => item !== amenity)
        : [...prevSelected, amenity]
    );
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // amenitiesPicked(selectedAmenities)
    // console.log("Selected Amenities:", selectedAmenities);
    setOpenAmeni(false);
  };

  return (
    <div className="">
      <CustomizedModal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className="sm:w-[820px] mt-6 max-h-[623px] overflow-y-auto sm:overflow-hidden rounded-[12px] bg-white sm:p-[32px] px-[16px] py-[32px] flex gap-[24px] flex-col">
          <section className="space-y-1">
            <div className="modal-header flex items-center justify-between">
              <p className="text-[20px] font-[700] leading-[25.2px] ">
                Amenities
              </p>
              <Image
                src="/static/images/grey-close-square.svg"
                width={24}
                height={24}
                alt=""
                className="rounded-full w-[24px] h-[24px] cursor-pointer"
                onClick={() => setOpenAmeni(false)}
              />
            </div>
            <p className="text-[#4E4E4E] leading-[24px] font-[400]">
              Select the available amenities in your property
            </p>
          </section>
          <div className=" sm:h-full  border grid sm:grid-cols-4 rounded-[4px] grid-cols-2  gap-[4px] ">
            {amenities.map((amenity, index) => (
              <div
                className="inline-flex items-center justify-between p-[12px] bg-[#FCFCFC] rounded-[4px]"
                key={index}
              >
                <label
                  className=" leading-[19.5px] text-[11px] md:text-[14px] font-[500] md:leading-[21px] "
                  htmlFor={`checkbox-${index}`}
                >
                  {capitalizeFirstLetter(amenity)}
                </label>
                <label
                  className="relative flex items-center rounded-full cursor-pointer"
                  htmlFor={`checkbox-${index}`}
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#78797a] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-[#EEF5FF] checked:before:bg-[#EEF5FF] hover:before:opacity-10"
                    id={`checkbox-${index}`}
                    onChange={() => handleCheckboxChange(amenity)}
                    checked={selectedAmenities.includes(amenity)}
                  />
                  <span className="absolute text-BlueHomz transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
            ))}
          </div>
          <button
            className="bg-[#006AFF]  text-white rounded-[4px] border h-[37px] px-[12px] py-[8px] text-[14px] font-[700] leading-[21px]"
            onClick={handleFormSubmit}
          >
            Continue
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default Amenities;
const amenities = [
  "air conditioning",
  "bathtub",
  "constant electricity",
  "kitchen shelve",
  "microwave",
  "parking space",
  "POP ceiling",
  "pre-Paid meter",
  "refrigerator",
  "tiled floor",
  "TV",
  "wardrobe",
  "washing machine",
  "water heater",
  "water supply",
  "wi-Fi",
  "gym",
  "garage",
  "air vent",
  "cable TV",
  "pool",
  "generator",
  "walk in closet",
  "pets allowed",
  "supermarket nearby",
  "airport nearby",
  "schools nearby",
  "hospitals nearby",
  "c of O",
  "building permit",
  "fence",
  "drainage",
  "sewer system",
  "road access",
  "public transit",
];
