import Image from "next/image";
import Link from "next/link";
import React from "react";

const Plans = () => {
  const pricingPlans = [
    {
      price: "N9,500",
      title: "Enterprise starter",
      billing: "Billed monthly",
      features: [
        "Up to 10 Properties",
        "Up to 2 users",
        "Free Trial",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant Management",
        "Documents (receipts)",
        "Manage tenant applications",
        "Advertise vacant properties",
        "Early rent incentives for renters",
        "Training & data migration"
      ],
      status: false,
    },
    {
      price: "N19,000",
      title: "Enterprise plus",
      billing: "Billed monthly",
      features: [
        "Up to 30 properties",
        "Up to 5 users",
        "Free Trial",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant Management",
        "Documents (receipts)",
        "Manage tenant applications",
        "Advertise vacant properties",
        "Early rent incentives for renters",
        "Training & data migration"
      ],
      status: false,
    },
    {
      price: "N50,000",
      title: "Enterprise premium",
      billing: "Billed monthly",
      features: [
        "Up to 100 properties",
        "Unlimited",
        "Free Trial",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant Management",
        "Documents (receipts)",
        "Manage tenant applications",
        "Advertise vacant properties",
        "Early rent incentives for renters",
        "Training & data migration"
      ],
      status: false,
    },
    {
      price: "Contact Sales", // You might want to provide an actual price for the premium plan
      title: "Premium plan",
      billing: "Billed monthly",
      features: [
        "Unlimited Properties",
        "Unlimited Users",
        "Free Trial",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant Management",
        "Documents (receipts)",
        "Manage tenant applications",
        "Advertise vacant properties",
        "Early rent incentives for renters",
        "Training & data migration"
      ],
      status: false,
    },
  ];

  return (
    <div className="mt-[60px] m-auto px-6 flex flex-col items-center gap-[60px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-GrayHomz">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col justify-around p-6 text-[16px] font-[400] w-[265px] h-[860px] border shadow-lg rounded-2xl"
          >
            <h1 className="text-[23px] text-center font-[700] text-BlackHomz">
              {plan.price}
            </h1>
            <h1 className="text-[20px] text-center font-[500]">{plan.title}</h1>
            <p className="text-[14px] mt-[-20px] text-center font-[500] text-BlueHomz">
              {plan.billing}
            </p>
            <Link href={"/register"}>
              <button
                className={`h-[48px] rounded-lg text-[16px] w-full ${plan.status === true
                  ? "border border-BlueHomz text-BlueHomz bg-inputBg "
                  : "bg-BlueHomz hover:bg-blue-400 text-white"
                  }`}
              >
                Get Started
              </button>
            </Link>
            {plan.features.map((feature, i) => (
              <div key={i} className="flex flex-row items-center gap-2">
                <div className={`h-[14px] w-[16px] ${(plan.title === "Enterprise starter" && feature === "Whitelabels") ||
                  (plan.title === "Enterprise plus" && feature === "Whitelabels") ||
                  (plan.title === "Enterprise plus" && feature === "Training & data migration")
                  || (plan.title === "Enterprise starter" && feature === "Training & data migration")
                  ? "opacity-[20%]" // Apply a different color class here
                  : "bg-green-200"
                  } flex justify-center border rounded-full`}
                >
                  <Image
                    height={10.5}
                    width={12}
                    alt="img"
                    src={"/static/images/IconMark.png"}
                  />
                </div>
                <p
                  className={`  ${(plan.title === "Enterprise starter" && feature === "Whitelabels") ||
                    (plan.title === "Enterprise plus" && feature === "Whitelabels") ||
                    (plan.title === "Enterprise plus" && feature === "Training & data migration")
                    || (plan.title === "Enterprise starter" && feature === "Training & data migration")
                    ? "text-GrayHomz5"
                    : ""
                    }`}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
