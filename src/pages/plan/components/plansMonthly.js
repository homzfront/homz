import { planEnterPriseSub, updateEnterPriseSub } from "@/api/planEnterprise";
import Loading from "@/components/mainmenu/loading";
import api from "@/utils/api";
import useBodyScroll from "@/utils/useBodyScroll";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { toast } from "react-toastify";

const Plans = ({ data, profile }) => {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState();
  const router = useRouter()
  useBodyScroll([loading])
  console.log(data)
  console.log(profile)

  const pricingPlans = [
    {
      price: "N9,500",
      title: "Enterprise Starter",
      billing: "Billed monthly",
      features: [
        "Up to 10 Properties",
        "Up to 2 users",
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
      interval: "monthly"
    },
    {
      price: "N19,000",
      title: "Enterprise Plus",
      billing: "Billed monthly",
      features: [
        "Up to 30 properties",
        "Up to 5 users",
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
      interval: "monthly"
    },
    {
      price: "N50,000",
      title: "Enterprise Premium",
      billing: "Billed monthly",
      features: [
        "Up to 100 properties",
        "Unlimited",
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
      interval: "monthly"
    },
    {
      price: "Contact Sales", // You might want to provide an actual price for the premium plan
      title: "Premium Plan",
      billing: "Billed monthly",
      features: [
        "Unlimited Properties",
        "Unlimited Users",
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
      status: true,
      interval: "monthly"
    },
  ];

  // Optional URL validation function (consider using a more robust library)
  function isValidUrl(url) {
    const regex = /^(http|https):\/\/[^\s]+/; // Basic URL format validation
    return regex.test(url);
  }

  async function handleSubmit(interval, plans) {
    console.log(interval);
    console.log(plans);

    setLoading(true);

    if (!interval || !plans) {
      setFormError('Please select an interval and plan.');
      setLoading(false);
      return; // Early exit if required fields are missing
    }

    const planDetails = {
      fullName: data.fullName,
      businessName: data.businessName,
      phoneNumber: String(data.phoneNumber), // Ensure phone number is a string
      planName: plans,
      interval,
    };

    try {
      let response;
      if (profile.PlanStatus === "free_trial") {
        response = await updateEnterPriseSub({
          planName: plans,
          interval
        })
      } else {
        response = await planEnterPriseSub(planDetails);
      }
      if (response.success) {
        console.log("Form successfully filled:", response);
        setLoading(false);
        const successMessage = response?.updatedData?.data?.message || 'Enterprise Plan account created successfully'; // Use response.data?.message if available, otherwise default message
        toast.success(successMessage);
        const authorizationUrl = response?.updatedData?.data?.data?.data?.authorization_url;
        const paystackAuthorizationUrl = response?.updatedData?.data?.data?.paystackResponse?.data?.authorization_url;
        
        if (isValidUrl(authorizationUrl)) {
          router.push(authorizationUrl);
        } else if (isValidUrl(paystackAuthorizationUrl)) {
          router.push(paystackAuthorizationUrl);
        } else {
          console.warn('Invalid or missing authorization URL in response.');
        }
      }
       else {
        if (response.error) {
          setFormError(response.error || 'An error occurred.'); // Default error message
          console.error("Error creating profile:", response.error);
          setLoading(false);
          toast.error(response.error);
        } // Use the specific error message from response.error
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error); // User-friendly error message
      console.log(error.response?.data?.error)
      setFormError(error.response?.data?.message || error.response?.data?.error); // Log the original error
      setLoading(false);
    }
  }



  return (
    <div className="mt-[60px] m-auto px-6 flex flex-col items-center gap-[60px]">
      {
        loading && <Loading />}
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
            <Link href={"/contact-page"}
              className={`h-[48px] rounded-lg text-[16px] w-full flex justify-center items-center ${plan.status === true
                ? "bg-BlueHomz hover:bg-blue-400 text-white"
                : " hidden"
                }`}
            >
              Get Started
            </Link>
            <button
              onClick={() => {
                handleSubmit(plan.interval, plan.title)
              }}
              className={`h-[48px] rounded-lg text-[16px] w-full ${plan.status === true
                ? " hidden"
                : "bg-BlueHomz hover:bg-blue-400 text-white "
                }`}
            >
              Get Started
            </button>
            {plan.features.map((feature, i) => (
              <div key={i} className="flex flex-row items-center gap-2">
                <div className={`h-[14px] w-[16px] ${(plan.title === "Enterprise Starter" && feature === "Whitelabels") ||
                  (plan.title === "Enterprise Plus" && feature === "Whitelabels") ||
                  (plan.title === "Enterprise Plus" && feature === "Training & data migration")
                  || (plan.title === "Enterprise Starter" && feature === "Training & data migration")
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
                  className={`  ${(plan.title === "Enterprise Starter" && feature === "Whitelabels") ||
                    (plan.title === "Enterprise Plus" && feature === "Whitelabels") ||
                    (plan.title === "Enterprise Plus" && feature === "Training & data migration")
                    || (plan.title === "Enterprise Starter" && feature === "Training & data migration")
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
