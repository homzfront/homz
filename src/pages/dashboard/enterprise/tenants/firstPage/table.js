import React from 'react'
import Pagination from "@/components/general/pagination";
import Image from 'next/image';
import Verified from '@/components/icons/verified';

const Table = ({ widthRa, usedKeys, tenantsData }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
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
    return (
        <div>
            <div className={`${widthRa >= 1440 ? "max-w-[1130px] " : widthRa >= 1375 ? "max-w-[1080px] " : "max-w-[1045px]"}`}>
                <div className={`overflow-x-auto scrollbar-container`}>
                    <div className="w-[500%] md:w-[450%]">
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
                                        {usedKeys.map((key) => (
                                            <div key={key} className="">
                                                {key === "Actions" ? (
                                                    <div className="sticky right-[-24px] md:right-0 bg-white w-[40%] pl-8">
                                                        <button onClick={() => console.log("Action for", row.id)}>
                                                            <Image
                                                                src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                                                                alt="Actions"
                                                                height={21}
                                                                width={20}
                                                                className='z-50'
                                                                style={{ height: "auto", width: "auto" }}
                                                            />
                                                        </button>
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