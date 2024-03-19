import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="mx-auto m-8 max-w-[1440px] ">
      <div className="bg-[url('/Background-image.png')] mx-auto w-full bg-BlueHomz">
        <div className="max-w-[1160px] mx-auto py-24 px-8">
          <div className="flex flex-col items-center text-white">
            <h1 className="text-center text-[24px] lg:text-[41px] font-bold">
              Effortless Property Ownership Starts Here
            </h1>
            <p className="max-w-[894px] text-center mt-6 text-[16px] lg:text-xl font-medium">
              Enjoy timely rent, verified renters, and a dedicated dashboard for
              monitoring your properties with our comprehensive management
              services.
            </p>
            <Link
              href={"./register"}
            //  href={"https://forms.gle/aCwKh8aW7goPoRGWA"} 
            >
              <button className="text-BlueHomz text-[16px] font-bold  hover:bg-BlackHomz hover:text-white bg-white border mt-6 rounded-md h-[42px] lg:h-[48px] w-[116px]">
                Get Started
                {/* Join Waitlist */}
              </button>
            </Link>
          </div>
          <div className="hidden sm:flex w-full max-w-[1160px] mt-[120px] mb-8 h-[360px] justify-center items-center mx-auto">
            <Image
              src={"/ownerLanding.jpg"}
              alt="OwnerImg"
              width={4096}  // Specify the desired width
              height={2731} 
              layout="full" // Specify the desired height
              objectFit="cover"
              objectPosition="center"
              className="object-cover bg-center h-[487px] border-white border-[2px] rounded-[12px]"
              priority
            />
          </div>


          <div className="sm:hidden flex bg-center h-[360px] justify-center items-center mt-[40px]">
            <Image
              src={"/manWithPhone.jpg"}
              alt="OwnerImg"
              width={4096}  // Specify the desired width
              height={2731} 
              layout="full" // Specify the desired height
              objectFit="cover"
              objectPosition="center"
              className="object-cover bg-center h-[360px] border-white border-[2px] rounded-[12px]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
