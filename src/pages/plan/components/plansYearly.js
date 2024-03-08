import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PlansYearly = ({ data }) => {

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState();
  const router = useRouter()


  const pricingPlans = [
    {
      price: "N95,000",
      title: "Enterprise Starter",
      billing: "Billed Annually",
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
      interval: "annually"
    },
    {
      price: "N190,000",
      title: "Enterprise Plus",
      billing: "Billed Annually",
      features: [
        "Up to 30 Properties",
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
      interval: "annually"
    },
    {
      price: "N500,000",
      title: "Enterprise Premium",
      billing: "Billed Annually",
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
      interval: "annually"
    },
    {
      price: "Contact Sales", // You might want to provide an actual price for the premium plan
      title: "Premium Plan",
      billing: "Billed Annually",
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
      interval: "annually"
    },
  ];

  async function handleSubmit(interval, plans) {
    console.log(interval)
    console.log(plans)

    setLoading(true);

    if (data) {
      const { fullName, phoneNumber, estate, estateAddress, numberOfHouses, businessName, } = data
      const planDetails = { fullName, estate, numberOfHouses, businessName, businessPhoneNumber: phoneNumber, estateAddress, phoneNumber, planName: plans, interval }
      // Send the data to your API endpoint
      try {
        const response = await planEnterPriseSub(
          planDetails
        );

        if (response.data.statuscode === 200 || 201) {
          setSubmitConfirmationVisible(true);
          console.log("form successfully filled ", response.data);
          setLoading(false);
          router.push(`${response.data?.paystackResponse?.data?.authorization_url}`)
        } else {
          setFormError(response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error creating profile:", error);
        setFormError(error.response?.data?.message);
        setLoading(false);
      }

    }


  }




  return (
    <div className="mt-[60px]  m-auto px-6 flex flex-col items-center gap-[60px]">
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
            <button
              onClick={() => {
                setPlans(plan.title)
                setInterval(plan.interval)
              }}
              className={`h-[48px] rounded-lg text-[16px] w-full ${plan.status === true
                ? "border border-BlueHomz text-BlueHomz bg-inputBg "
                : "bg-BlueHomz hover:bg-blue-400 text-white"
                }`}
            >
              {plan.status === true ? "Active" : "Get Started"}
            </button>
            {plan.features.map((feature, i) => (
              <div key={i} className="flex flex-row items-center gap-2">
                <div
                  className={`h-[14px] w-[16px] ${(plan.title === "Enterprise starter" && feature === "Whitelabels") ||
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
                    src={"/IconMark.png"}
                  />
                </div>
                <p
                  className={` ${(plan.title === "Enterprise starter" && feature === "Whitelabels") ||
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

export default PlansYearly;
