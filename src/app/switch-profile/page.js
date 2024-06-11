"use client";
import ArrowLeftBlue from "@/components/icons/arrowLeftBlue";
import LoadingII from "@/components/mainmenu/loadingII";
import api from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SelectPlan = () => {
  const router = useRouter();
  const handleBackButtonClick = () => {
    router.back();
  };
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notVerified, setNotVerified] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile using the token
        const response = await api.get("/user/profile");
        if (response?.data?.data?.isVerified === true) {
          const data = response.data?.user?.accounts;
          setUser(data);
          setLoading(false);
        } else {
          if (typeof window !== 'undefined') {
            localStorage.setItem("email", response?.data?.user?.email);
            setNotVerified(!notVerified)
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const Data = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713271947/public/images/Image13_sisfqz.png",
      title: "Landlord",
      content: "As a landlord, monitor your properties, tenants & rent payments in one place.",
      link: "/dashboard/property-owner/dashboard",
      name: "MANAGE_PROPERTY",
      url: notVerified ? `/verify-email` : "/plan/manage-property",
      active: true
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713271951/public/images/Image11_xoqxov.png",
      title: "Tenant",
      content:
        "As a tenant, pay rent, request maintenance services in one place.",
      link: "/dashboard/tenant/dashboard",
      name: "TENANT",
      url: notVerified ? `/verify-email` : "/plan/tenant-management",
      active: true
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713271952/public/images/Image12_oajsqe.png",
      title: "Property Manager",
      content:
        "As a property manager, manage properties & tenants with our dashboard.",
      link: "/dashboard/enterprise-property/dashboard",
      name: "ENTERPRISE_PLAN",
      url: notVerified ? `/verify-email` : "/plan/enterprise-plan",
      active: true
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/dniaq8eiz/image/upload/v1713271950/public/images/Image14_jbqp5o.png",
      title: "List Property",
      content: "List your property & find verified renters & buyers with ease.",
      link: "dashboard/list_Property",
      name: "LIST_PROPERTY",
      url: notVerified ? `/verify-email` : "plan/list-property",
      active: true
    },
  ];
  return (
    <div>
      <div className="max-w-[1156px] px-[16px] xl:px-[0px] h-[712px] my-8 md:my-20 flex flex-col justify-between m-auto">
        <div
          onClick={handleBackButtonClick}
          className="flex px-8 md:px-0 justify-start gap-1 items-center cursor-pointer">
          <ArrowLeftBlue />
          <p className="text-BlueHomz4 text-[16px] font-[500]">
            Go back
          </p>
        </div>
        {loading ? (
          <LoadingII />
        ) : (
          <div>
            <div>
              <h1 className="mt-4 px-8 md:mt-0 md:px-0 w-full md:w-[428px] sm:max-w-full m-auto font-[700] text-[24px] sm:text-[36px] text-start sm:text-center text-BlackHomz">
                How Would You Like To Use Homz?
              </h1>
            </div>
            <div className="m-auto">
              <div className="grid grid-cols-1  my-8 xl:mt-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full px-0 sm:px-4 gap-8 sm:gap-4 justify-between items-end">
                {Data.map((data) => (
                  <div
                    key={data.id}
                    className="h-auto flex items-center flex-col"
                  >
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
                      <p className="font-[400] mt-[-10px] text-[16px] text-GrayHomz px-6">
                        {data.content}
                      </p>

                      {user && user.some(userPlan => userPlan.name === data.name) ? (
                        <Link href={data.link}>
                          <button className="hover:border rounded-[4px] w-[214px] h-[48px] font-[700] text-[16px] bg-walletBg text-BlueHomz hover:bg-white hover:border-BlueHomz">
                            Activated
                          </button>
                        </Link>
                      ) : data.active ? (
                        <Link href={user ? data.url : "/"}>
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
        )}
      </div>
    </div>
  );
};

export default SelectPlan;
