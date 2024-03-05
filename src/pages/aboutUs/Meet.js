import React from "react";
import Image from "next/image";

const Meet = () => {
  const Data = [
    {
      id: 1,
      Name: "Daniel Adegbite",
      Position: "CEO/FOUNDER",
      Img: "/Ellipse 56.png",
    },
    {
      id: 2,
      Name: "Daniel Adegbite",
      Position: "CEO/FOUNDER",
      Img: "/Ellipse 56.png",
    },
    {
      id: 3,
      Name: "Daniel Adegbite",
      Position: "CEO/FOUNDER",
      Img: "/Ellipse 56.png",
    },
    {
      id: 4,
      Name: "Daniel Adegbite",
      Position: "CEO/FOUNDER",
      Img: "/Ellipse 56.png",
    },
    {
      id: 5,
      Name: "Daniel Adegbite",
      Position: "CEO/FOUNDER",
      Img: "/Ellipse 56.png",
    },
    {
      id: 6,
      Name: "Daniel Adegbite",
      Position: "CEO/FOUNDER",
      Img: "/Ellipse 56.png",
    },
  ];
  return (
    <div className="max-w-[1160px] mt-20 m-auto px-6">
      <div className="items-center flex justify-center">
        <div className="mt-14 max-w-[914px]">
          <h1 className="text-[24px] sm:text-[60px] text-center font-[700] text-BlackHomz">
            Meet the Team
          </h1>
          <p className="text-[13px] sm:text-[20px] text-center font-[400] text-BlackHomz">
            Finding a home is just the beginning of the homz.ng experience.
            Whether it’s dreaming of your next rental buying your new home or
            selling a home, we provide customers with an end-to-end home journey
            experience that can include your brand.
          </p>
        </div>
      </div>
      <div className="mt-16  grid md:grid-cols-3 grid-cols-2 gap-4">
        {Data.map((data) => (
          <div key={data.id} className="border p-8 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <div>
                <Image src={data.Img} height={235} alt="img" width={235} />
              </div>
              <div className="text-[9px] sm:text-[24px] text-center text-BlackHomz font-[800]">
                {data.Name}
              </div>
              <div className="text-[7px] sm:text-[20px] text-center text-BlackHomz font-[500]">
                {data.Position}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20">
      <div className="flex flex-col gap-2 justify-around items-center bg-[url('/Rectangle_5.png')] text-white rounded-lg shadow-2xl bg-center max-w-full xl:w-[1159px] h-[435px] ">
          <h1 className="font-[700] mt-4 max-w-2xl text-center text-[36px] sm:text-[60px]">
            Search For Your Next Home In Minutes
          </h1>
          <p className="text-center p-2 sm:p-0 mt-[-15px] sm:text-[16px] font-[400] max-w-[780px] text-[14px]">
            Finding a home is just the beginning of the homz.ng experience.
            Whether it’s dreaming of your next rental buying your new home or
            selling a home, we provide customers with an end-to-end home journey
            experience that can include your brand.
          </p>
          <div className="mb-8">
            <button className="w-[137px] sm:w-[273px] h-[57px] text-[16px] sm:text-[20px] hover:border-white hover:bg-BlueHomz  rounded-md font-[700] border border-BlueHomz  text-white  bg-transparent  px-2">
              Get Started 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meet;
