import React, { useState } from 'react'
import All from './all';
import InProgress from './inProgress';
import PendingRequests from './pendingRequests';
import Resolved from './resolved';

const WidgetMobile = ({ data }) => {
    const [active, setActive] = useState(false);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const [activeFour, setActiveFour] = useState(false); // State for the fourth page

    const handlePageChange = () => {
        setActive(false);
        setActiveTwo(false);
        setActiveThree(false);
        setActiveFour(false); // Reset the state for the fourth page
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(true);
        setActiveThree(false);
        setActiveFour(false); // Reset the state for the fourth page
    };

    const handlePageChangeThree = () => {
        setActiveThree(true);
        setActiveTwo(false);
        setActive(true);
        setActiveFour(false); // Reset the state for the fourth page
    };

    const handlePageChangeFour = () => {
        setActiveFour(true);
        setActiveThree(false);
        setActiveTwo(false);
        setActive(true);
    };

    return (
        <div>
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
                        In-progress
                    </button>
                    <button
                        onClick={handlePageChangeThree}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Pending Requests
                    </button>
                    <button
                        onClick={handlePageChangeFour}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFour
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Resolved
                    </button>
                </div>
            </div>
            <div className="my-7 rounded-[12px] w-full">
                <div className={`${!active ? "inline" : "hidden"}`}>
                    <All data={data} />
                </div>
                <div className={`${activeTwo ? "inline" : "hidden"}`}>
                    <InProgress data={data} />
                </div>
                <div className={`${activeThree ? "inline" : "hidden"}`}>
                    <PendingRequests data={data} />
                </div>
                <div className={`${activeFour ? "inline" : "hidden"}`}>
                    <Resolved  data={data} />
                </div>
            </div>
        </div>
    )
}

export default WidgetMobile;