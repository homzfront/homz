import Image from "next/image";
import Link from "next/link";
import React from "react";

const SelectPlan = () => {
  const Data = [
    {
      id: 1,
      image: "/Image13.png",
      title: "Landlord",
      content: "As a landlord, monitor your properties, tenants & rent payments in one place.",
      link: "plan/manage-property",
    },
    {
      id: 2,
      image: "/Image11.png",
      title: "Tenant",
      content:
        "As a tenant, pay rent, request maintenance services in one place.",
      link: "plan/tenant-management",
    },
    {
      id: 3,
      image: "/Image12.png",
      title: "Property Manager",
      content:
        "As a property manager, manage properties & tenants with our dashboard.",
      link: "plan/enterprise-plan",
    },
    {
      id: 4,
      image: "/Image14.png",
      title: "List Property",
      content: "List your property & find verified Tenants & buyers with ease.",
      link: "plan/list-property",
    },
  ];
  return (
    <div>
      <div className="max-w-[1156px] h-[712px] my-20 flex flex-col justify-between m-auto">
        <div>
          <h1 className="sm:px-0 max-w-[262px] sm:max-w-full m-auto font-[700] text-[24px]  sm:text-[36px] text-left sm:text-center text-BlackHomz">
            How Would You Like To Use Homz?
          </h1>
          <p className=" hidden sm:block px-14 mt-2 sm:mt-0 font-[500] text-[20px] text-center text-GrayHomz">
            Select a profile
          </p>
        </div>
        <div className="m-auto">
          <div className="grid grid-cols-1  my-8 xl:mt-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full px-0 sm:px-4 gap-8 sm:gap-4 justify-between items-end">
            {Data.map((data) => (
              <div key={data.id} className="h-auto flex items-center flex-col">
                {data.id === 4 && (
                  <div className="w-full flex justify-center">
                    <div className="w-[88px] h-[25px] bg-Success2 flex justify-center items-center rounded-md">
                      <span className="text-[11px] font-[400] text-Success">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                )}
                <div className="h-[488px] mt-2 w-[262px] py-2 items-center hover:border-[2px] hover:border-BlueHomz rounded-[20px] shadow-lg flex justify-around flex-col">
                  <div>
                    <Image
                      src={data.image}
                      alt="img"
                      height={200}
                      width={214}
                    />
                  </div>
                  <div className="font-[500] w-full h-[10vh]  px-6 text-[20px] text-BlackHomz">
                    <h1 className="text-start">{data.title}</h1>
                  </div>
                  <p className="font-[400] mt-[-40px] text-[16px] text-GrayHomz px-6">
                    {data.content}
                  </p>

                  {data.id === 3 || data.id === 2 || data.id === 1 ? (
                    <Link href={data.link}>
                      <button className="border rounded-[4px] w-[214px] h-[48px] font-[700] text-[16px] text-white bg-BlueHomz hover:text-BlueHomz hover:bg-white hover:border-BlueHomz">
                        Get Started
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="border rounded-[4px] w-[214px] h-[48px] font-[700] text-[16px] text-white bg-gray-300 cursor-not-allowed"
                      disabled
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
