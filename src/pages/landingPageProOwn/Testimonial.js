import Link from 'next/link';
import React from 'react'

const Testimonial = ({routeTo, profile}) => {
    return (
        <div className="mt-[60px] pt-8 pb-14 max-w-[1299px] bg-[#F6F6F6] mx-auto">
            <div className="px-[8%]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="lg:text-[36px] text-[32px] text-center md:text-left font-[700] text-BlackHomz">
                            Don’t just take our word for it
                        </h1>
                        <p className="lg:text-[20px] text-[16px] text-center md:text-left max-w-[768px] font-[500] text-GrayHomz">
                      Hear from some amazing property managers who are scaling up their management game.
                        </p>
                    </div>
                    <div className="hidden md:flex p-4 gap-4">
                        <Link href={"/contact-page"}>
                            <button className="  w-[109px] h-[48px] text-[16px] hover:w-[146px]  hover:h-[54px] rounded-md font-normal  bg-BlueHomz  text-white  px-2 py-1 hover:text-[18px] ">
                                Contact us

                            </button>
                        </Link>
                        <Link
                            // href={"https://forms.gle/aCwKh8aW7goPoRGWA"}
                            href={profile ? routeTo : "/register"}
                        >
                            <button className=" w-[109px] h-[48px] text-[16px] hover:w-[146px]  hover:h-[54px] rounded-md font-normal  text-GrayHomz border bg-transparent px-2 py-1 hover:text-[18px]">
                                Get started
                                {/* Join Waitlist */}
                            </button>
                        </Link>
                    </div>
                </div>

                <div
                    className="mx-auto md:mx-0 w-full flex flex-col gap-8 md:gap-6 items-start justify-start bg-white p-4 md:p-8 rounded-[16px] mt-8"
                >
                    <div className="flex flex-col gap-4 md:gap-2">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, index) => {
                                return (
                                    <span key={index} className="text-BlueHomz text-2xl">
                                        &#9733;
                                    </span>
                                );
                            })}
                        </div>
                        <p className="text-[16px] md:text-[20px] leading-[20.16px] text-BlackHomz md:text-[#4E4E4E] font-[400] md:font-[500] md:leading-[40.32px] md:text-justify">
                            Homz.ng has completely transformed the way we manage our properties. Before now, rent payments, and maintenance requests was stressful and time-consuming. With Homz, everything is now in one place; from automated rent reminders to seamless rent collection and transparent reporting.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <span className="text-[16px] md:text-[20px] font-[600] text-[#202020]">
                            SijiDaniels Consulting Limited
                        </span>
                        <span className="text-[14px] md:text-[16px] md:font-[400] text-GrayHomz">
                            Property Management Company
                        </span>
                    </div>
                </div>
            </div>
            <div className="sm:hidden mt-[40px] flex flex-col gap-4 px-[8%]">
                <Link href={profile ? routeTo : "/register"}>
                    <button className=" w-[100%] h-[48px] text-[16px]  rounded-md font-normal hover:bg-white hover:border hover:border-BlueHomz hover:text-BlueHomz  text-white  bg-BlueHomz  px-2 py-1">
                        Get started
                    </button>
                </Link>
                <Link href={"/contact-page"}>
                    <button className=" w-[100%] h-[48px] text-[16px] rounded-md font-normal hover:bg-BlueHomz hover:text-white text-BlueHomz  border border-BlueHomz bg-transparent px-2 py-1">
                        Contact us
                    </button>
                </Link>
            </div>
        </div >
    )
}

export default Testimonial