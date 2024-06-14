import React from 'react'
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";


const Amenities = ({amenities}) => {
  return (
    <div className=" sm:h-full  border grid sm:grid-cols-4 rounded-[4px] grid-cols-2  gap-[4px] ">
            {amenities.map((amenity, index) => (
              <div
                className="inline-flex items-center justify-between p-[12px] bg-[#FCFCFC] rounded-[4px]"
                key={index}
              >
                <label
                  className=" leading-[19.5px] text-[11px] md:text-[13px] font-[500] md:leading-[21px] "
                  htmlFor={``}
                >
                  {capitalizeFirstLetter(amenity)}
                </label>
                
              </div>
            ))}
          </div>
  )
}

export default Amenities