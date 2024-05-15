import Image from "next/image";
import React from "react";
import Link from "next/link";
const Property = ({ property }) => {
  return (
    <div className="flex flex-col md:space-y-9 pt-8">
      <>
        <div className="flex gap-2 items-center">
          <p className="font-[500] leading-[30px] md:text-[20px]">
            Listed Properties
          </p>

          <p className="text-[#006AFF] md:text-[18px] bg-[#EEF5FF] px-[8px] h-[28px] md:h-[35px] py-[4px] rounded-[8px]">
            {"0"}
          </p>
        </div>
        <p className="md:hidden font-[400] leading-[17.64px] text-[#A9A9A9] text-[14px] mt-2">
          List your properties so Tenants can see them.
        </p>
        {property.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-[10rem] md:pt-0">
            <div className="flex flex-col items-center justify-center md:h-[412px] gap-[20px] ">
              <Image
                src="/static/images/PropertyLister.svg"
                alt=""
                height={121}
                width={121}
                className="rounded-[8px] mx-auto"
              />
              <p className="text-[23px] md:text-[36px] text-[700] leading-[28.98px] md:leading-[45px] text-[#006AFF] ">
                Get Started
              </p>
              <p className="hidden md:block text-[#4E4E4E] leading-[27px]  w-[338px] md:w-full text-center">
                List your properties so Tenants can see them.
              </p>
              <Link
                href="/dashboard/list_Property/addProperty"
                className="w-[338px] flex gap-1 md:w-[145px] h-[48px] md:p-[12px] items-center justify-center rounded-[4px] text-white bg-[#006AFF]"
              >
                <Image
                  src="/static/images/white-add.svg"
                  alt=""
                  height={16}
                  width={16}
                  className=""
                />
                <span>List property</span>
              </Link>
            </div>
          </div>
        ) : (
          <h1>{property.length} Found</h1>
        )}
      </>
    </div>
  );
};

export default Property;
