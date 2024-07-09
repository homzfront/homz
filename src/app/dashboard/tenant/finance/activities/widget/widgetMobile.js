import React, { useState } from 'react'
import All from './all';
import TransferFrom from './transferFrom';
import TransferTo from './transferTo';
import Deposite from './deposite';
import WithDrawal from './withDrawal';
import Image from 'next/image';

const WidgetMobile = () => {
    const [active, setActive] = useState(false);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const [activeFour, setActiveFour] = useState(false);
    const [activeFive, setActiveFive] = useState(false);

    const handlePageChange = () => {
        setActive(false);
        setActiveTwo(false);
        setActiveThree(false);
        setActiveFour(false);
        setActiveFive(false);
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(true);
        setActiveThree(false);
        setActiveFour(false);
        setActiveFive(false);
    };

    const handlePageChangeThree = () => {
        setActiveThree(true);
        setActiveTwo(false);
        setActive(true);
        setActiveFour(false);
        setActiveFive(false);
    };

    const handlePageChangeFour = () => {
        setActiveFour(true);
        setActiveThree(false);
        setActiveTwo(false);
        setActive(true);
        setActiveFive(false);
    };

    const handlePageChangeFive = () => {
        setActiveFour(false);
        setActiveThree(false);
        setActiveTwo(false);
        setActive(true);
        setActiveFive(true);
    };

    return (
        <div>
            <div className="mt-4 flex justify-between md:hidden w-full">
                <div className="relative w-[86%] rounded-[4px]">
                    <input
                        type="text"
                        className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full"
                        id="search"
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                    />
                    <Image
                        src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
                        alt=""
                        className="absolute top-3 left-3"
                        height={16}
                        width={16}
                    />
                </div>
                <div className="border rounded-[4px] flex justify-center items-center border-BlueHomz w-[12%]">
                    <button
                    // onClick={openMobileFilterModal}
                    >
                        <Image
                            src="/static/images/filter.svg"
                            alt=""
                            width={16}
                            height={16}
                        />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-6 w-full">
                <div className="flex flex-wrap gap-[15px] w-full">
                    <button
                        onClick={handlePageChange}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${!active
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={handlePageChangeTwo}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeTwo
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Transfer From
                    </button>
                    <button
                        onClick={handlePageChangeThree}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Transfer To
                    </button>
                    <button
                        onClick={handlePageChangeFour}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFour
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Deposit
                    </button>
                    <button
                        onClick={handlePageChangeFive}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFive
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Withdrawal
                    </button>
                </div>
            </div>
            <div className="my-7 rounded-[12px] w-full">
                <div className={`${!active ? "inline" : "hidden"}`}>
                    <All />
                </div>
                <div className={`${activeTwo ? "inline" : "hidden"}`}>
                    <TransferFrom />
                </div>
                <div className={`${activeThree ? "inline" : "hidden"}`}>
                    <TransferTo />
                </div>
                <div className={`${activeFour ? "inline" : "hidden"}`}>
                    <Deposite />
                </div>
                <div className={`${activeFive ? "inline" : "hidden"}`}>
                    <WithDrawal />
                </div>
            </div>
        </div>
    )
}

export default WidgetMobile;