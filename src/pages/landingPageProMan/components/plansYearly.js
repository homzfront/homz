import { updateEnterPriseSub } from "@/api/planEnterprise";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import useIsUserAt1295px from "@/utils/useIsUserAt1295px";
import useOpenPaymentType from "@/store/enterpriseStore/useOpenPaymentType.js";
import { cancelEnterprisePlanSub } from "@/api/tenantSevice";

const PlansYearly = ({ routeTo, profile }) => {
  const [loading, setLoading] = useState(false);
  const [loadingCard, setLoadingCard] = useState(null);
  const router = useRouter()
  const isAt1295px = useIsUserAt1295px();
  const { setIsOpenModal, isAnnaullyData, setIsMonthlyData, openCardPayment, setOpenCardPayment, setIsBiAnnaullyData, setIsAnnaullyData, openTransferPayment, setOpenTransferPayment, error, setError, openErrorAgain, setOpenErrorAgain, setOpenAgain, openAgain } = useOpenPaymentType();


  const pricingPlans = [
    {
      price: '55,000',
      title: 'Enterprise Basic',
      billing: "Billed Annually",
      features: [
        "Documents (receipts)",
        "Up to 10 Properties",
        "Up to 2 users",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant Management",
        "Manage tenant applications",
        "Advertise vacant properties",
        "Early rent incentives for renters",
        "Training & data migration"
      ],
      status: false,
      interval: "annually"
    },
    {
      price: "95,000",
      title: "Enterprise Starter",
      billing: "Billed Annually",
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
      interval: "annually"
    },
    {
      price: "190,000",
      title: "Enterprise Plus",
      billing: "Billed Annually",
      features: [
        "Up to 30 Properties",
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
      interval: "annually"
    },
    {
      price: "500,000",
      title: "Enterprise Premium",
      billing: "Billed Annually",
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
      interval: "annually"
    },
    {
      price: "Contact Sales",
      title: "Premium Plan",
      billing: "Billed Annually",
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
      interval: "annually"
    },
  ];

  function isValidUrl(url) {
    const regex = /^(http|https):\/\/[^\s]+/;
    return regex.test(url);
  }

  async function handleSubmit(interval, planTitle) {
    if (routeTo === "/dashboard/enterprise-property/dashboard") {
      setLoading(true);
      setLoadingCard(planTitle);
      setIsOpenModal(false);
            if (error === "you need to disable you active recurring subscribetion before procedding for a one time payment" && openErrorAgain && openAgain) {
              setIsOpenModal(false);
              setError(null)
              setOpenTransferPayment(false)
              const { success, data, error } = await cancelEnterprisePlanSub(
                profile?.email_token,
                profile?.subscriptionCode,
              );
            }
      try {
        let response;
        if (profile?.planName === "Enterprise Basic" || profile?.planName === "Enterprise Starter" || profile.PlanStatus === "none" ||
          profile?.planName === "Enterprise Free" || profile?.planName === "Enterprise Plus" || profile?.planName === "Enterprise Premium" || profile.planName === "Enterprise Trial") {
          response = await updateEnterPriseSub({
            planName: planTitle,
            interval,
            subscriptionType: openTransferPayment ? "one-time" : "recurring"
          })
        }
        if (response.success) {
          const successMessage = response?.updatedData?.data?.message || 'Enterprise Plan account created successfully'; // Use response.data?.message if available, otherwise default message
          toast.success(successMessage);
          const authorizationUrl = response?.updatedData?.data?.data?.data?.authorization_url;
          const paystackAuthorizationUrl = response?.updatedData?.data?.data?.paystackResponse?.data?.authorization_url;
          if (isValidUrl(authorizationUrl)) {
            router.push(authorizationUrl);
          } else if (isValidUrl(paystackAuthorizationUrl)) {
            router.push(paystackAuthorizationUrl);
          }
        } else {
          if (response.error) {
            // console.log(response.error)
            if (response.error === "you need to disable you active recurring subscribetion before procedding for a one time payment") {
              setError(response.error)
              setIsOpenModal(true)
              setOpenErrorAgain({
                planName: planTitle,
                planInterval: interval
              })
              setOpenTransferPayment(false)
              // toast.error(response.error);
              return;
            }
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.response?.data?.error);
      } finally {
        setLoading(false);
        setLoadingCard(null);
        setIsMonthlyData(null)
        setOpenCardPayment(false);
        setOpenTransferPayment(false);
        setIsBiAnnaullyData(null)
        setIsAnnaullyData(null)
      }
    } else {
      router.push(routeTo);
    }
  }

  React.useEffect(() => {
    if (isAnnaullyData) {
      handleSubmit(isAnnaullyData.planInterval, isAnnaullyData.planName)
    }
  }, [openCardPayment, openTransferPayment])

  React.useEffect(() => {
    if (openErrorAgain) {
      handleSubmit(openErrorAgain.planInterval, openErrorAgain.planName)
    }
  }, [openAgain])

  return (
    <div className="mt-[60px]  m-auto px-6 flex flex-col items-center gap-[60px]">
      <div className={`text-GrayHomz w-full ${isAt1295px ? "hidden" : ""}`}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
        >
          {pricingPlans.map((plan, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-col justify-around p-6 text-[16px] font-[400] sm:w-[280px]  lg:w-[290px] h-[860px] border shadow-lg rounded-2xl hover:border hover:border-BlueHomz hover:bg-whiteblue"
              >
                <h1 className="text-[23px] text-center font-[700] text-BlackHomz">
                  <span className={`font-sans ${plan.price === "Contact Sales" ? "hidden" : ""}`}>₦</span>{plan.price}
                </h1>
                <h1 className="text-[20px] text-center font-[500]">{plan.title}</h1>
                <p className="text-[14px] mt-[-10px] text-center font-[500] text-BlueHomz">
                  {plan.billing}
                </p>
                <Link href={"/contact-page"}
                  className={`h-[48px] rounded-lg text-[16px] w-full flex justify-center items-center ${plan.status === true
                    ? "bg-BlueHomz hover:bg-blue-400 text-white"
                    : " hidden"
                    }
              ${loading && loadingCard !== plan.title ? "pointer-events-none" : ""}
              `}
                >
                  Contact Sales
                </Link>
                <button
                  onClick={() => {
                    setIsAnnaullyData({
                      planName: plan.title,
                      planInterval: plan.interval
                    })
                    setIsOpenModal(true)
                  }}
                  disabled={loading}
                  className={`h-[48px] rounded-lg text-[16px] w-full ${plan.status === true
                    ? " hidden"
                    : ""
                    } 
              ${loading && loadingCard !== plan.title ? "pointer-events-none" : ""}
              ${loadingCard === plan.title ? "pointer-events-none w-full flex justify-center" : ""} 
              ${profile?.planName === plan.title && profile?.interval === "annually" ? "bg-walletBg text-BlueHomz4 border border-BlueHomz4 hover:text-white pointer-events-none" : "bg-BlueHomz hover:bg-blue-400 text-white"}
              `}
                >
                  {loadingCard === plan.title ? <LoadingFormII /> : profile?.planName === plan.title && profile?.interval === "annually"
                    ? "Active"
                    : "Get Started"}
                </button>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex flex-row items-center gap-2">
                    <div
                      className={`h-[14px] w-[16px] ${(plan.title === "Enterprise Starter" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Basic" && feature !== "Documents (receipts)") ||
                        (plan.title === "Enterprise Plus" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Plus" && feature === "Training & data migration")
                        || (plan.title === "Enterprise Starter" && feature === "Training & data migration")
                        ? "opacity-[20%]"
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
                      className={` ${(plan.title === "Enterprise Starter" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Plus" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Basic" && feature !== "Documents (receipts)") ||
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={`text-GrayHomz w-full ${isAt1295px ? "" : "hidden"}`}>
        <div className="grid grid-cols-5">
          {pricingPlans.map((plan, index) => (
            <div key={index}>
              <div
                className="flex flex-col justify-around p-6 text-[16px] font-[400] sm:w-[236px] h-[860px] border shadow-lg rounded-2xl hover:border hover:border-BlueHomz hover:bg-whiteblue"
              >
                <h1 className="text-[20px] text-center font-[700] text-BlackHomz">
                  <span className={`font-sans ${plan.price === "Contact Sales" ? "hidden" : ""}`}>₦</span>{plan.price}
                </h1>
                <h1 className="text-[17px] text-center font-[500]">{plan.title}</h1>
                <p className="text-[12px] mt-[-10px] text-center font-[500] text-BlueHomz">
                  {plan.billing}
                </p>
                <Link href={"/contact-page"}
                  className={`h-[48px] rounded-lg text-[14px] w-full flex justify-center items-center ${plan.status === true
                    ? "bg-BlueHomz hover:bg-blue-400 text-white"
                    : " hidden"
                    }
              ${loading && loadingCard !== plan.title ? "pointer-events-none" : ""}
              `}
                >
                  Contact Sales
                </Link>
                <button
                  onClick={() => {
                    setIsAnnaullyData({
                      planName: plan.title,
                      planInterval: plan.interval
                    })
                    setIsOpenModal(true)
                  }}
                  disabled={loading}
                  className={`h-[48px] rounded-lg text-[14px] w-full ${plan.status === true
                    ? " hidden"
                    : ""
                    } 
              ${loading && loadingCard !== plan.title ? "pointer-events-none" : ""}
              ${loadingCard === plan.title ? "pointer-events-none w-full flex justify-center" : ""} 
              ${profile?.planName === plan.title && profile?.interval === "annually" ? "bg-walletBg text-BlueHomz4 border border-BlueHomz4 hover:text-white pointer-events-none" : "bg-BlueHomz hover:bg-blue-400 text-white"}
              `}
                >
                  {loadingCard === plan.title ? <LoadingFormII /> : profile?.planName === plan.title && profile?.interval === "annually"
                    ? "Active"
                    : "Get Started"}
                </button>
                {plan.features.map((feature, i) => (
                  <div key={i} className="text-[14px] flex flex-row items-center gap-2">
                    <div
                      className={`h-[14px] w-[16px] ${(plan.title === "Enterprise Starter" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Basic" && feature !== "Documents (receipts)") ||
                        (plan.title === "Enterprise Plus" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Plus" && feature === "Training & data migration")
                        || (plan.title === "Enterprise Starter" && feature === "Training & data migration")
                        ? "opacity-[20%]"
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
                      className={` ${(plan.title === "Enterprise Starter" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Plus" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Basic" && feature !== "Documents (receipts)") ||
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansYearly;
