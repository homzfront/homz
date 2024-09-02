import React, { useState } from 'react'
import All from './all';
import TransferFrom from './transferFrom';
import TransferTo from './transferTo';
import Deposite from './deposite';
import WithDrawal from './withDrawal';
import Reset from '@/components/icons/reset';

const WidgetMobile = ({
    firstThreePages,
    currentPage,
    totalPages,
    handleNext,
    handlePageClick,
    handlePrev,
    lastThreePages,
    currentData,
    loading,
    setSelectedDate,
    clear
}) => {
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
            <div className={`mt-4 flex gap-4 w-full ${!active ? "md:hidden" : "hidden"}`}>
                <div className="relative w-[65%] rounded-[4px]">
                    <input
                        type="date"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border px-4 h-[37px] w-full text-GrayHomz2 p-2 rounded cursor-pointer"
                    />
                </div>
                <button
                    onClick={clear}
                    type="text"
                    className="bg-BlueHomz items-center text-[14px] font-[500] gap-2 flex text-white p-[8px] rounded cursor-pointer"
                >
                    <Reset />
                    Reset
                </button>
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
                    <All
                        firstThreePages={firstThreePages}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handleNext={handleNext}
                        handlePageClick={handlePageClick}
                        handlePrev={handlePrev}
                        lastThreePages={lastThreePages}
                        currentData={currentData}
                        loading={loading}
                    />
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