import React, { useState } from 'react'
import EstateInfo from "./components/estateInfo.js";
import Photos from "./components/photos.js";
import ContactInfo from "./components/contactInfo.js";
import Documents from "./components/documents.js";
import { ToastContainer } from 'react-toastify';
import BankAccountDetails from './components/bankAccountDetails.js';

const WidgetMobile = ({ data, id }) => {
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
    }

    return (
        <div >
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeButton={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="flex flex-col gap-2 mt-8 w-full px-8">
                <div className="flex flex-wrap gap-[15px] w-full">
                    <button
                        onClick={handlePageChange}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${!active
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Property Information
                    </button>
                    <button
                        onClick={handlePageChangeTwo}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeTwo
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Photos(s)
                    </button>
                    <button
                        onClick={handlePageChangeThree}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Contact Information
                    </button>
                    <button
                        onClick={handlePageChangeFour}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFour
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Document
                    </button>
                    <button
                        onClick={handlePageChangeFive}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeFive
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Bank Account Details
                    </button>
                </div>
            </div>
            <div className="my-7 rounded-[12px] w-full">
                <div className={`${!active ? "inline" : "hidden"}`}>
                    <EstateInfo data={data} active={active} />
                </div>
                <div className={`${activeTwo ? "inline" : "hidden"}`}>
                    <Photos data={data} />
                </div>
                <div className={`${activeThree ? "inline" : "hidden"}`}>
                    <ContactInfo data={data} />
                </div>
                <div className={`${activeFour ? "inline" : "hidden"}`}>
                    <Documents id={id} />
                </div>
                <div className={`${activeFive ? "inline" : "hidden"}`}>
                    <BankAccountDetails id={id} />
                </div>
            </div>
        </div>
    )
}

export default WidgetMobile;