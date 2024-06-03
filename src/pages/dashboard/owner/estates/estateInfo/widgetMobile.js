import React, { useState } from 'react'
import EstateInfo from './components/estateInfo';
import Photos from './components/photos';
import ContactInfo from './components/contactInfo';

const WidgetMobile = ({data}) => {
    const [active, setActive] = useState(false);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    // const [activeFour, setActiveFour] = useState(false); // State for the fourth page

    const handlePageChange = () => {
        setActive(false);
        setActiveTwo(false);
        setActiveThree(false);
        // setActiveFour(false); // Reset the state for the fourth page
    };

    const handlePageChangeTwo = () => {
        setActiveTwo(true);
        setActive(true);
        setActiveThree(false);
        // setActiveFour(false); // Reset the state for the fourth page
    };

    const handlePageChangeThree = () => {
        setActiveThree(true);
        setActiveTwo(false);
        setActive(true);
        // setActiveFour(false); // Reset the state for the fourth page
    };

    // const handlePageChangeFour = () => {
    //   setActiveFour(true);
    //   setActiveThree(false);
    //   setActiveTwo(false);
    //   setActive(true);
    // };

    return (
        <div>
            <div className="flex flex-col gap-2 mt-8 w-full">
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
                        Photos
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
                    {/* <button
                        onClick={handlePageChangeFour}
                        className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                            ? "inline-block shadow-md bg-[#006AFF] text-white "
                            : "bg-[#EEF5FF] text-[#006AFF]"
                            }`}
                    >
                        Document
                    </button> */}
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
                {/* <div className={`${activeFour ? "inline" : "hidden"}`}>
            <Documents />
          </div> */}
            </div>
        </div>
    )
}

export default WidgetMobile;