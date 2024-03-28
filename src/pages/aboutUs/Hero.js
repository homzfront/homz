import Image from "next/image";
import React from "react";

const Hero = () => {
  const box = [
    {
      id: 1,
      value: "5+",
      Content: "Years in Business",
    },
    {
      id: 2,
      value: "1000+",
      Content: "Property Sold",
    },
    {
      id: 3,
      value: "500+",
      Content: "Featured Agents",
    },
    {
      id: 4,
      value: "5+",
      Content: "Years in Business",
    },
  ];

  return (
    <div className="max-w-[1160px] m-auto px-6 mt-[100px]">
      <div className="flex flex-col md:flex-row gap-[72px] justify-between">
        <div className="flex flex-col gap-4 justify-around w-[100%]">
          <h1 className="text-[24px] sm:text-[60px] font-[700] ">About Us</h1>
          <p className="flex flex-col gap-3 text-[13px] sm:text-[20px] font-[400] text-justify">
            <span>
              Welcome to Homz, your ultimate companion in real estate! At Homz, we are all for creating seamless experiences for both landlords and tenants alike. Our innovative software revolutionizes the way you interact with your property, whether you're managing a sprawling estate or a cozy studio apartment.
            </span>
            <span>
              For landlords, agents and property managers, Homz provides a one-stop solution for listing and managing properties of all shapes and sizes. From luxurious estates, multiple-room duplexes, studios or apartments, our platform streamlines your rental process, ensuring that your properties are showcased to the right audience. With Homz, you can effortlessly keep track of rent payments, maintenance requests, and lease agreements, allowing you to focus on what truly matters – growing your real estate empire.
            </span>
          </p>
          {/* <button className="w-full sm:w-[133px] h-[49px] bg-BlueHomz font-[700]   hover:bg-white hover:border hover:border-BlueHomz hover:text-BlueHomz rounded-md text-white ">
            Contact Us
          </button> */}
        </div>
        <div className="w-[100%]">
          <Image
            src={"/Duplex.jpeg"}
            alt=""
            width={524}
            height={615}
            layout="full" // Specify the desired height
            objectFit="cover"
            objectPosition="center"
            className="object-cover bg-center h-[615px] rounded-[12px]"
            priority />
        </div>
      </div>
      <p className="mt-4 text-[13px] sm:text-[20px] font-[400] text-justify">
        As for tenants, Homz opens the door to a world of possibilities. Whether you're in search of a compact studio or you are looking in the more spacious ranges of two or three bedroom apartments, our platform offers a diverse range of listings to suit every lifestyle and budget.
        <br /> With Homz, your dream property is just a click away. Plus, our dedicated dashboard makes managing your experience a breeze, giving you full control over payments, maintenance requests and more.
        <br />
        So whether you're a landlord looking to maximize your rental income or a tenant in search of your next home sweet home, Homz has you covered. Experience the future of property management with Homz – where finding, renting and managing properties is as easy as can be.
      </p>
      <div className="mt-[100px] grid md:grid-cols-4 grid-cols-2 gap-4">
        {box.map((data) => (
          <div
            key={data.id}
            className="border flex justify-around items-center h-[135px] rounded-lg"
          >
            <div className="flex flex-col items-center ">
              <div className="text-[28px] sm:text-[52px] text-BlackHomz font-[700]">
                {data.value}
              </div>
              <div className="text-[9px] sm:text-[16px] text-BlackHomz font-[400]">
                {data.Content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[100px] flex flex-col md:flex-row-reverse gap-[72px] justify-between">
        <div className="flex flex-col gap-2 justify-around w-[100%]">
          <h1 className="text-[24px] sm:text-[60px] font-[700] ">Our Story</h1>
          <p className="text-[13px] sm:text-[20px] font-[400] max-w-">
            Finding a home is just the beginning of the homz.ng experience.
            Whether it’s dreaming of your next rental buying your new home or
            selling a home, we provide customers with an end-to-end home journey
            experience that can include your brand. Whether it’s dreaming of
            your next rental buying your new home or selling a home, we provide
            customers with an end-to-end home journey experience that can
            include your brand.
          </p>
          <button className="mb-10 hidden sm:inline w-[133px] h-[49px] bg-BlueHomz font-[700]   hover:bg-white hover:border hover:border-BlueHomz hover:text-BlueHomz rounded-md text-white ">
            Contact Us
          </button>
        </div>
        <div className="w-[100%]">
          <Image src={"/Houses.jpeg"}
            width={524}
            alt="img"
            height={460}
            layout="full" // Specify the desired height
            objectFit="cover"
            objectPosition="center"
            className="object-cover bg-center h-[460px] rounded-[12px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
