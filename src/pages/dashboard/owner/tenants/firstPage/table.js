import React from 'react'
import Pagination from "@/components/general/pagination";
import Image from 'next/image';
import Verified from '@/components/icons/verified';
import PopUpMenuTwo from '../components/popUpMenuTwo';
import useClickOutside from '@/utils/clickOutside';


const Table = ({ widthRa, usedKeys, tenantsData }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [popUpMenuTwo, setPopUpMenuTwo] = React.useState(false);
    const [selectedDataId, setSelectedDataId] = React.useState(null);
    const dropdownRef = useClickOutside(() => setPopUpMenuTwo(false));
    let totalPages = 4;
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const firstThreePages = [1, 2, 3];
    const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];

    const handleToggleMenu = (id) => {
        setPopUpMenuTwo(!popUpMenuTwo);
        setSelectedDataId(id);
    };

    return (
        <div className='w-full '>
            <div className={`${widthRa >= 1440 ? "md:max-w-[1130px] " : widthRa >= 1375 ? "md:max-w-[1080px] " : "md:max-w-[1045px]"} max-w-[350px] w-full md:w-auto`}>
                <div className={`w-full overflow-x-auto scrollbar-container`}>
                    <div className="w-[800%] md:w-[450%]">
                        <div className="w-full border rounded-t-[12px]">
                            <div className="bg-whiteblue h-[60px] text-[11px] grid justify-center items-center font-[500] text-BlackHomz px-2 rounded-t-[12px]"
                                style={{ gridTemplateColumns: `repeat(${usedKeys.length}, minmax(100px, 1fr))` }}
                            >
                                {/* Table Headers */}
                                {usedKeys.map((key) => (
                                    <div key={key} className="">
                                        {key === "Actions" ? "" : key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                    </div>
                                ))}
                            </div>

                            {/* Table Body */}
                            <div className='text-[11px] font-normal text-GrayHomz'>
                                {tenantsData.map((row, rowIndex) => (
                                    <div key={rowIndex} className="relative border-b-[1px] grid justify-center items-center w-full px-2 h-[60px]"
                                        style={{ gridTemplateColumns: `repeat(${usedKeys.length}, minmax(100px, 1fr))` }}
                                    >
                                        {usedKeys.map((key, index) => (
                                            <div key={key} className="">
                                                {key === "Actions" ? (
                                                    <div className="sticky right-[-24px] md:right-0 bg-white w-[40%] pl-8">
                                                        <div>
                                                            <button onClick={() => handleToggleMenu(rowIndex)}>
                                                                <Image
                                                                    src={
                                                                        "/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                                                                    }
                                                                    alt=""
                                                                    height={21}
                                                                    width={20}
                                                                    style={{ height: "auto", width: "auto" }}
                                                                />
                                                            </button>
                                                            {popUpMenuTwo && selectedDataId === rowIndex && (
                                                               <div className='z-[99]'> <PopUpMenuTwo dropdownRef={dropdownRef} data={"679253ca076f3d20c623d6b5"} /> </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : key === "name" ?
                                                    (
                                                        <div className='flex gap-2 items-center'>
                                                            <Image
                                                                src={row["profile"]}
                                                                alt="profile-img"
                                                                height={40}
                                                                width={40}
                                                            />
                                                            {row[key]}
                                                        </div>
                                                    ) :
                                                    key === "property" ? (
                                                        <div className='flex items-center gap-2'>
                                                            <Verified />
                                                            {row[key]}
                                                        </div>
                                                    )
                                                        : (
                                                            row[key] && row[key] !== "" ? row[key] : "N/A"
                                                        )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-2'>
                    {tenantsData && tenantsData.length >= 1 && (
                        <Pagination
                            firstThreePages={firstThreePages}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handleNext={handleNext}
                            handlePageClick={handlePageClick}
                            handlePrev={handlePrev}
                            lastThreePages={lastThreePages}
                            padding='px-0'
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Table