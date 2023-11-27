import Image from "next/image";
import React from "react";

const SectionTwo = () => {
  // Array of card objects
  const cards = [
    {
      icon: "/wallet-check.png",
      title: "Collect rent faster",
      description:
        "Accelerate your cash flow with our service, ensuring faster and hassle-free rent collection for property managers.",
    },
    {
      icon: "/people.png",
      title: "Manage existing renters",
      description:
        "Simplify and streamline the management of existing renters with our user-friendly software.",
    },
    {
      icon: "/setting-2.png",
      title: "Offer seamless maintenance services",
      description:
        "Provide the best maintenance services to your renters, such as utility maintenance, payment of maintenance bills and more.",
    },
  ];

  return (
    <div className=" hidden md:grid gap-2 mt-16 grid-cols-1 max-w-[768px] px-[64px] md:grid-cols-2 sm:p-0 sm:max-w-full xl:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex flex-col  h-auto lg:h-[256px] w-full justify-center items-center"
        >
          <div className="rounded-full h-[52px] w-[52px] flex justify-center items-center bg-blue-100">
            <Image
              src={card.icon}
              height={32}
              width={32}
              alt={`${card.title}-img`}
            />
          </div>
          <div className="flex flex-col justify-center mt-5 gap-1 items-center h-max">
            <p className="font-[700] text-[20px] text-center">{card.title}</p>
            <p className="font-[400] text-[18px] text-center">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionTwo;
