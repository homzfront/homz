import React, { useState } from 'react'
import PersonalInfo from './personalInfo/personalInfo';
import ProfilePicture from './profilePicture/profilePicture';
import ChangePassword from './changePassword/changePassword';
import RentInformation from './rentInformation/rentInformation';
import { useSearchParams } from 'next/navigation';
import AccountInfo from './accountInfo/accountInfo';
import PendingCard from './personalInfo/components/pendingCard';
import RejectedCard from './personalInfo/components/rejectedCard';
import useTenantActiveKYC from '@/store/tenantKYC/useTenantActiveKYC';
import SuccessCard from './personalInfo/components/successCard';
import useProfileStore from '@/store/profile';

const WidgetMobile = ({ data }) => {
    const urlParams = useSearchParams();
    const tab = urlParams.get("tab");
    const { profile } = useProfileStore.getState();
    const [active, setActive] = useState(tab ? tab !== 'personal' : false);
    const [activeTwo, setActiveTwo] = useState(tab === "personalInfo");
    const [activeThree, setActiveThree] = useState(false);
    const [activeFour, setActiveFour] = useState(tab === 'acctInfo');
    const [activeFive, setActiveFive] = useState(false);
    const { approve, rejected } = useTenantActiveKYC()

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
                        Rent Information
                    </button>
                    <button
                        onClick={handlePageChangeTwo}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeTwo
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Personal Information
                    </button>
                    <button
                        onClick={handlePageChangeThree}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Profile Picture
                    </button>
                    {/* <button
                        onClick={handlePageChangeFour}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFour
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Account Information
                    </button> */}
                    <button
                        onClick={handlePageChangeFive}
                        className={`${profile?.user?.google && "hidden"} py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFive
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
                    <RentInformation data={data} />
                </div>
                <div className={`h-auto ${activeTwo ? "inline" : "hidden"}`}>
                    {data?.verification?.status === 'approved' ? <SuccessCard data={data} /> : data?.verification?.status === 'pending' ? <PendingCard /> : data?.verification?.status === 'rejected' ? <RejectedCard text={data?.verification?.rejectionReason} /> : null}
                    <PersonalInfo data={data} />
                </div>
                <div className={`${activeThree ? "inline" : "hidden"}`}>
                    <ProfilePicture data={data} />
                </div>
                {/* <div className={`${activeFour ? "inline" : "hidden"}`}>
                    <AccountInfo />
                </div> */}
                <div className={`${activeFive ? "inline" : "hidden"}`}>
                    <ChangePassword />
                </div>
            </div>
        </div>
    )
}

export default WidgetMobile;