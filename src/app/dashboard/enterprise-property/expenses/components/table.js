import React from 'react'
import PopUpMenu from './popUpMenu';
import Pagination from '@/components/general/pagination';
import Image from 'next/image';
import Ticked from '@/components/icons/ticked';
import UnTicked from '@/components/icons/unTicked';
import addCommasToNumberWithoutN from '@/utils/addCommasToNumberWithoutN';
import changeBackendDateFormat from '@/utils/changeBackendDateFormat';

const Table = ({ setOpenCreateExpenses, setOpenEdit, handleDeleteSingle, pageNo, setPageNo, totalPages, allData, loading = false, setSingleTableData, setOpenDetails }) => {
    const [popUpMenu, setPopUpMenu] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(null);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectAll, setSelectAll] = React.useState(false);

    const handlePageClick = (page) => {
        setPageNo(page);
    };

    const handleNext = () => {
        if (pageNo < totalPages) {
            setPageNo(pageNo + 1);
        }
    };

    const handlePrev = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1);
        }
    };

    const firstThreePages = [1, 2, 3];
    const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];

    const handleToggleMenu = (id, data) => {
        setSingleTableData(data)
        setSelectedId(id);
        setPopUpMenu(!popUpMenu);
    };
    const handleSelectAll = () => {
        if (selectAll) {
            // Deselect all
            setSelectedRows([]);
        } else {
            // Select all
            const allIds = allData?.results?.map(item => item._id);
            setSelectedRows(allIds);
        }
        setSelectAll(!selectAll);
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
        setSelectAll(false); // When manually selecting, unset selectAll
    };

    // 🔄 Automatically update selected data list
    React.useEffect(() => {
        const updatedData = allData?.results?.filter(item => selectedRows.includes(item._id)) || [];
        setSingleTableData(updatedData);
    }, [selectedRows, allData]);




    // Skeleton Loader Component
    const SkeletonLoader = () => {
        return (
            <tr className="w-full border-t-[1px] flex items-center">
                <td className="py-[15px] pl-4 w-[20%] md:w-[8%]">
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="flex items-center gap-1 pr-2 py-[15px] w-[35%] md:w-[14%]">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse "></div>
                </td>
                <td className="py-[15px] w-[35%] md:w-[14%]">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-[15px] w-[14%] hidden md:block">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-[15px] w-[14%] hidden md:block">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-[15px] w-[14%] hidden md:block">
                    <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                </td>
                <td className="py-[15px] w-[14%] hidden md:block">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="w-[10%] md:w-[8%] py-[15px] pr-4 z-10">
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                </td>
            </tr>
        );
    };

    return (
        <div className="mt-6 w-full mx-auto">
            {/* Table Header */}
            <div className="w-full border rounded-t-[8px] overflow-hidden">
                <div className="bg-whiteblue h-[50px] text-[13px] font-[500] text-BlackHomz flex items-center">
                    <div onClick={handleSelectAll} className="cursor-pointer text-left pl-4 flex-shrink-0 w-[20%] md:w-[8%]"> {selectAll ? <Ticked /> : <UnTicked />}</div>
                    <div className="text-left flex-shrink-0 w-[35%] md:w-[14%]">Expense</div>
                    <div className="text-left flex-shrink-0 w-[35%] md:w-[14%]">Amount</div>
                    <div className="text-left flex-shrink-0 w-[14%] hidden md:block">Category</div>
                    <div className="text-left flex-shrink-0 w-[14%] hidden md:block">Status</div>
                    <div className="text-left flex-shrink-0 w-[14%] hidden md:block">Date</div>
                    <div className="text-left flex-shrink-0 w-[14%] hidden md:block">Property</div>
                    <div className="flex-shrink-0 w-[10%] md:w-[8%]"><span className='hidden md:block'>Action</span></div>
                </div>

                {/* Table Body */}
                <div className="w-full">
                    {loading ? (
                        // Show skeleton loaders when loading
                        <>
                            {[...Array(6)].map((_, index) => (
                                <SkeletonLoader key={index} />
                            ))}
                        </>
                    ) : (
                        allData?.results &&
                        allData?.results?.map((data, index) => (
                            <div
                                key={data?._id}
                                className="w-full border-t-[1px] flex items-center min-h-[60px] hover:bg-gray-50"
                            >
                                <div onClick={() => handleRowSelect(data._id, data)} className="cursor-pointer text-GrayHomz pr-2 py-[15px] pl-4 font-[500] text-[11px] flex-shrink-0 w-[20%] md:w-[8%]">{selectedRows.includes(data._id) ? <Ticked /> : <UnTicked />}</div>
                                <div className="flex items-center gap-1 py-[15px] text-GrayHomz4 font-[500] text-[11px] flex-shrink-0 w-[35%] md:w-[14%]">
                                    <span>{data?.expenseName}</span>
                                </div>
                                <div className="text-GrayHomz py-[15px] font-[500] text-[11px] flex-shrink-0 w-[35%] md:w-[14%]">
                                    <span style={{ fontFamily: "Arial" }}>₦</span>
                                    {addCommasToNumberWithoutN(data?.amount)}
                                </div>
                                <div className="text-GrayHomz py-[15px] font-[500] text-[11px] flex-shrink-0 w-[14%] hidden md:block">
                                    {data?.expenseCategoryName}
                                </div>
                                <div className="text-GrayHomz py-[15px] font-[500] md:flex text-[11px] flex-shrink-0 w-[14%] hidden">
                                    {data?.paymentStatus === "Unpaid" ? (
                                        <div className="bg-warningBg text-warning rounded-md py-1 px-3 flex items-center justify-center">
                                            Unpaid
                                        </div>
                                    ) : (
                                        <div className="bg-successBg text-Success rounded-md py-1 px-3 flex items-center justify-center">
                                            Paid
                                        </div>
                                    )}
                                </div>
                                <div className="text-GrayHomz py-[15px] font-[500] text-[11px] flex-shrink-0 w-[14%] hidden md:block">
                                    {changeBackendDateFormat(data?.date)}
                                </div>
                                <div className="text-GrayHomz py-[15px] font-[500] text-[11px] flex-shrink-0 w-[14%] hidden md:block">
                                    {data?.property?.propertyName ?? "------------"}
                                </div>
                                <div className="relative py-[15px] md:pl-4 z-10 flex-shrink-0 w-[10%] md:w-[8%]">
                                    <button onClick={() => { handleToggleMenu(data._id, data) }}>
                                        <Image
                                            src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                                            alt="Options"
                                            height={21}
                                            width={20}
                                            style={{ height: "auto", width: "auto" }}
                                        />
                                    </button>
                                    {popUpMenu && selectedId === data._id &&
                                        <PopUpMenu
                                            setOpenCreateExpenses={setOpenCreateExpenses}
                                            setOpenEdit={setOpenEdit}
                                            handleDeleteSingle={handleDeleteSingle}
                                            data={data}
                                            setOpenDetails={setOpenDetails}
                                            index={index}
                                            totalLength={allData?.results?.length}
                                        />
                                    }
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Pagination */}
            {allData?.results && allData?.results.length >= 1 && (
                <div className="mt-6">
                    <Pagination
                        firstThreePages={firstThreePages}
                        currentPage={pageNo}
                        totalPages={totalPages}
                        handleNext={handleNext}
                        handlePageClick={handlePageClick}
                        handlePrev={handlePrev}
                        lastThreePages={lastThreePages}
                    />
                </div>
            )}
        </div>
    )
}

export default Table