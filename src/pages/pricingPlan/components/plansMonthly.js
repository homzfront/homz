import { planEnterPriseSub, updateEnterPriseSub } from "@/api/planEnterprise";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { toast } from "react-toastify";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";


const Plans = ({ profile }) => {
  const [loading, setLoading] = useState(false);
  const [loadingCard, setLoadingCard] = useState(null);
  const router = useRouter();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300; // Adjust scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300; // Adjust scroll distance as needed
    }
  };

  const handleCardClick = (index) => {
    setLastClickedIndex(index);
    // Perform other actions on click if needed
  };

  const pricingPlans = [
    {
      price: '5,500',
      title: 'Enterprise Basic',
      billing: "Billed Monthly",
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
      interval: "monthly"
    },
    {
      price: "9,500",
      title: "Enterprise Starter",
      billing: "Billed Monthly",
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
      price: "19,000",
      title: "Enterprise Plus",
      billing: "Billed Monthly",
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
      price: "50,000",
      title: "Enterprise Premium",
      billing: "Billed Monthly",
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
      price: "Contact Sales",
      title: "Premium Plan",
      billing: "Billed Monthly",
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

  function isValidUrl(url) {
    const regex = /^(http|https):\/\/[^\s]+/;
    return regex.test(url);
  }

  const handleSubmit = async (interval, planTitle) => {
    setLoading(true);
    setLoadingCard(planTitle);
    try {
      let response;
      if (profile?.planName === "Enterprise Basic" || profile?.planName === "Enterprise Starter" || profile.PlanStatus === "none" ||
        profile?.planName === "Enterprise Plus" || profile?.planName === "Enterprise Premium" || profile.planName === "Enterprise Trial") {
        response = await updateEnterPriseSub({
          planName: planTitle,
          interval
        });
      }
      if (response.success) {
        const successMessage = response?.updatedData?.data?.message || 'Enterprise Plan account created successfully';
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
          toast.error(response.error);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error);
    } finally {
      setLoading(false);
      setLoadingCard(null);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display 4 cards at a time
    slidesToScroll: 1, // Scroll one card at a time
    autoplay: true,
    // cssEase: "linear",
    autoplaySpeed: 3000,
    arrows: true, // Show navigation buttons
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 cards on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 cards on smaller screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show 1 card on very small screens
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="mt-[60px] m-auto px-6 flex flex-col items-center gap-[60px] w-full">
      <div className="text-GrayHomz w-full">
        {/* <Slider {...settings}> */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 3000, // Delay in milliseconds
            disableOnInteraction: false, // Keeps autoplay running even after interaction
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
                className="flex flex-col justify-around p-6 text-[16px] font-[400] sm:w-[280px]  lg:w-[290px] h-[860px] border shadow-lg rounded-2xl"
              >
                <h1 className="text-[23px] text-center font-[700] text-BlackHomz">
                <span className={`font-sans ${plan.price === "Contact Sales" ? "hidden" : ""}`}>₦</span>{plan.price}
                </h1>
                <h1 className="text-[20px] text-center font-[500]">{plan.title}</h1>
                <p className="text-[14px] mt-[-20px] text-center font-[500] text-BlueHomz">
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
                  onClick={() => handleSubmit(plan.interval, plan.title)}
                  disabled={loading}
                  className={`h-[48px] rounded-lg text-[16px] w-full ${plan.status === true
                    ? " hidden"
                    : ""
                    } 
                ${loading && loadingCard !== plan.title ? "pointer-events-none" : ""}
                ${loadingCard === plan.title ? "pointer-events-none w-full flex justify-center" : ""}
                ${profile?.planName === plan.title && profile?.interval === "monthly" && profile?.IsExpired === false ? "bg-walletBg text-BlueHomz4 border border-BlueHomz4 hover:text-white pointer-events-none" : "bg-BlueHomz hover:bg-blue-400 text-white"}
                `}
                >
                  {loadingCard === plan.title ? <LoadingFormII /> : profile?.planName === plan.title && profile?.interval === "monthly" && profile?.IsExpired === false
                    ? "Active"
                    : "Get Started"}
                </button>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex flex-row items-center gap-2">
                    <div
                      className={`h-[14px] w-[16px] ${(plan.title === "Enterprise Basic" && feature !== "Documents (receipts)") ||
                        (plan.title === "Enterprise Starter" && feature === "Whitelabels") ||
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
                      className={`  ${(plan.title === "Enterprise Starter" && feature === "Whitelabels") ||
                        (plan.title === "Enterprise Basic" && feature !== "Documents (receipts)") ||
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
            </SwiperSlide>
          ))}
          {/* </Slider> */}
        </Swiper>
      </div>
    </div>
  );
};

export default Plans;
