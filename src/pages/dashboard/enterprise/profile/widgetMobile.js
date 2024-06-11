import React, { useState } from 'react'
import PersonalInfo from './personalInfo/personalInfo';
import ChangePassword from './changePassword/changePassword';
import Payment from './payment/payment';
import BusinessLogo from './businessLogo/businessLogo';
import BusinessInfo from './businessInfo/businessInfo';
import AccountInfo from './accountInfo/accountInfo';
import { useSearchParams } from 'next/navigation';

const WidgetMobile = ({ data }) => {
    const urlParams = useSearchParams();
    const tab = urlParams.get("tab")

    const [active, setActive] = useState(tab ? tab !== 'personal' : false);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    const [activeFour, setActiveFour] = useState(tab === 'acctInfo');
    const [activeFive, setActiveFive] = useState(false);
    const [activeSix, setActiveSix] = useState(false);

    const handlePageChange = () => {
        setActive(false);
        setActiveTwo(false);
        setActiveThree(false);
        setActiveFour(false);
        setActiveFive(false);
        setActiveSix(false);
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(true);
        setActiveThree(false);
        setActiveFour(false);
        setActiveFive(false);
        setActiveSix(false);
    };

    const handlePageChangeThree = () => {
        setActiveThree(true);
        setActiveTwo(false);
        setActive(true);
        setActiveFour(false);
        setActiveFive(false);
        setActiveSix(false);
    };

    const handlePageChangeFour = () => {
        setActiveFive(false);
        setActiveFour(true);
        setActiveThree(false);
        setActiveTwo(false);
        setActive(true);
        setActiveSix(false);
    };

    const handlePageChangeFive = () => {
        setActiveFive(true);
        setActiveFour(false);
        setActiveThree(false);
        setActiveTwo(false);
        setActive(true);
        setActiveSix(false);
    };

    const handlePageChangeSix = () => {
        setActiveFive(false);
        setActiveFour(false);
        setActiveThree(false);
        setActiveTwo(false);
        setActive(true);
        setActiveSix(true);
    }

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
                        Account Information
                    </button>
                    <button
                        onClick={handlePageChangeFive}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFive
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Payment
                    </button>
                    <button
                        onClick={handlePageChangeSix}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeSix
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
                    <AccountInfo />
                </div>
                <div className={`${activeFive ? "inline" : "hidden"}`}>
                    <Payment />
                </div>
                <div className={`${activeSix ? "inline" : "hidden"}`}>
                    <ChangePassword />
                </div>
            </div>
        </div>
    )
}

export default WidgetMobile;