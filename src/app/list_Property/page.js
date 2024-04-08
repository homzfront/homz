import React from "react";
import { Properties } from "./components/Properties";
import Link from "next/link";
import Image from "next/image";
import Property from "./listedProperty";

const List_Property = () => {
  return (
    <div className="flex flex-col md:space-y-9 pt-8 mb-6">
      <>
        <div className="flex items-center gap-6 mb-6 pt-2 md:mb-0">
          <div className="flex gap-2 items-center ">
            <p className="font-[500] leading-[30px] md:text-[20px]">
              Listed Properties
            </p>

            <p className="text-[#006AFF] md:text-[18px] bg-[#EEF5FF] px-[8px] h-[28px] md:h-[35px] py-[4px] rounded-[8px]">
              {Properties.length}
            </p>
          </div>
          <Link href="/list_Property/addProperty">
            <Image
              src="/static/images/addButton.svg"
              alt=""
              height={28}
              width={28}
              className="md:hidden rounded-[8px]"
            />
          </Link>
        </div>
        {Properties.length === 0 && (
          <p className="md:hidden font-[400] leading-[17.64px] text-[#A9A9A9] text-[14px] mt-2">
            List your properties so Tenants can see them.
          </p>
        )}
        {Properties.length === 0 ? (
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
              {}
              <p className="hidden md:block text-[#4E4E4E] leading-[27px]  w-[338px] md:w-full text-center">
                List your properties so Tenants can see them.
              </p>
              <Link
                href="/list_Property/addProperty"
                className="w-[338px] flex gap-1 md:w-[145px] h-[48px] md:p-[12px] items-center justify-center rounded-[4px] text-white bg-[#006AFF]"
              >
                <Image
                  src="/static/images/white-add.svg"
                  alt=""
                  height={16}
                  width={16}
                  className=""
                />
                <span>List Properties</span>
              </Link>
            </div>
          </div>
        ) : (
          <Property property={Properties} />
        )}
      </>
    </div>
  );
};

export default List_Property;
{
  /* <h1>{Properties.length} Found</h1> */
}
