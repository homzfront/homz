import React, { useState } from 'react'
import PersonalInfo from './personalInfo/personalInfo';
import ChangePassword from './changePassword/changePassword';
import Payment from './payment/payment';
import BusinessLogo from './businessLogo/businessLogo';
import BusinessInfo from './businessInfo/businessInfo';

const WidgetMobile = ({ data }) => {
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
        setActiveFive(false);
        setActiveFour(true);
        setActiveThree(false);
        setActiveTwo(false);
        setActive(true);
    };

    const handlePageChangeFive = () => {
        setActiveFive(true);
        setActiveFour(false);
        setActiveThree(false);
        setActiveTwo(false);
        setActive(true);
    };

    return (
        <div>
            <div className="md:hidden flex flex-col gap-2 mt-8 w-full">
                <div className="flex flex-wrap gap-[15px] w-full">
                    <button
                        onClick={handlePageChange}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${!active
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Business Information
                    </button>
                    <button
                        onClick={handlePageChangeTwo}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeTwo
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Business Logo
                    </button>
                    <button
                        onClick={handlePageChangeThree}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Personal Information
                    </button>
                    <button
                        onClick={handlePageChangeFour}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFour
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Payment
                    </button>
                    <button
                        onClick={handlePageChangeFive}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFive
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Change Password
                    </button>
                </div>
            </div>
            <div className="my-7 rounded-[12px] w-full">
                <div className={`${!active ? "inline" : "hidden"}`}>
                    <BusinessInfo data={data} />
                </div>
                <div className={`${activeTwo ? "inline" : "hidden"}`}>
                    <BusinessLogo data={data} />
                </div>
                <div className={`${activeThree ? "inline" : "hidden"}`}>
                    <PersonalInfo data={data} />
                </div>
                <div className={`${activeFour ? "inline" : "hidden"}`}>
                    <Payment />
                </div>
                <div className={`${activeFive ? "inline" : "hidden"}`}>
                    <ChangePassword />
                </div>
            </div>
        </div>
    )
}

export default WidgetMobile;