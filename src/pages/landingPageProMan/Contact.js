import Link from "next/link";
import React from "react";

const Contact = ({ routeTo, profile }) => {
  return (
    <div className='flex mt-[40px] py-8 max-w-[1160px] m-auto px-6 justify-between'>
      <div>
        <h1 className="lg:text-[36px] text-[32px] text-center md:text-left font-[700] text-BlackHomz">Don’t just take our word for it</h1>
        <p className="lg:text-[20px] text-[16px] text-center md:text-left max-w-[768px] font-[500] text-GrayHomz">
          Hear from some amazing property managers who are scaling up their
          management game.
        </p>
      </div>
      <div className="hidden md:flex p-4 gap-4">
        <Link href={"https://cal.com/homzng/"} className="  w-[109px] h-[48px] text-[16px] hover:w-[146px] flex items-center justify-center hover:h-[54px] rounded-md font-normal  bg-BlueHomz  text-white  px-2 py-1 hover:text-[18px] ">
        Book Demo
        </Link>
        <Link href={profile ? routeTo : "/register"} className=" w-[109px] h-[48px] text-[16px] hover:w-[146px] flex items-center justify-center hover:h-[54px] rounded-md font-normal  text-GrayHomz border bg-transparent px-2 py-1 hover:text-[18px]">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Contact;
