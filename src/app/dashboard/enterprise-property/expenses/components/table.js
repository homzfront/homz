import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import PopUpMenu from './popUpMenu';
import Image from 'next/image';
import Ticked from '@/components/icons/ticked';
import UnTicked from '@/components/icons/unTicked';
import addCommasToNumberWithoutN from '@/utils/addCommasToNumberWithoutN';
import changeBackendDateFormat from '@/utils/changeBackendDateFormat';
import useClickOutside from '@/utils/clickOutside';
import EmptyDocuBig from '@/components/icons/emptyDocuBig';
import useExpenseStore from '@/store/enterpriseStore/useExpenseStore';

const Table = ({
    setOpenCreateExpenses,
    setOpenEdit,
    handleDeleteSingle,
    allData,
    loading = false,
    setSingleTableData,
    setOpenDetails,
    fetchMoreData,
    hasMore,
    loadingMore,
    tableRef
}) => {
    const [popUpMenu, setPopUpMenu] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(null);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectAll, setSelectAll] = React.useState(false);
    const dropdownRef = useClickOutside(() => setPopUpMenu(false));
    const parentRef = React.useRef(null);

    const {
        fromDate,
        toDate,
        selectedStatus,
        selectedCate,
        search,
    } = useExpenseStore();

    console.log(allData)
    
    // Virtualizer instance
    const rowVirtualizer = useVirtualizer({
        count: hasMore ? allData?.data?.results?.length + 1 : allData?.data?.results?.length,
        getScrollElement: () => tableRef.current,
        estimateSize: () => 60,
        overscan: 5,
    });
    
    console.log(rowVirtualizer)
    // Load more when scrolling near bottom
    React.useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
        if (!lastItem) return;

        if (
            lastItem.index >= allData?.data?.results?.length - 1 &&
            hasMore &&
            !loadingMore
        ) {
            fetchMoreData();
        }
    }, [
        rowVirtualizer.getVirtualItems(),
        allData?.data?.results?.length,
        hasMore,
        loadingMore,
    ]);


    console.log( rowVirtualizer.getVirtualItems())

    const handleToggleMenu = (id, data) => {
        setSingleTableData(data);
        setSelectedId(id);
        setPopUpMenu(!popUpMenu);
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            const allIds = allData?.data?.results?.map(item => item._id);
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
        setSelectAll(false);
    };

    React.useEffect(() => {
        const updatedData = allData?.data?.results?.filter(item => selectedRows.includes(item._id)) || [];
        setSingleTableData(updatedData);
    }, [selectedRows, allData]);

    // Skeleton Loader Component
    const SkeletonLoader = () => (
        <div className="w-full border-t-[1px] flex items-center min-h-[60px]">
            <div className="py-[15px] pl-4 w-[20%] md:w-[8%]">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1 pr-2 py-[15px] w-[35%] md:w-[14%]">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="py-[15px] w-[35%] md:w-[14%]">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="py-[15px] w-[14%] hidden md:block">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="py-[15px] w-[14%] hidden md:block">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="py-[15px] w-[14%] hidden md:block">
                <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="py-[15px] w-[14%] hidden md:block">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-[10%] md:w-[8%] py-[15px] pr-4 z-10">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    );
    /**
    |--------------------------------------
    | Empty state
    |--------------------------------------
    */
    if (!loading && !allData && !hasMore) {
        return (
            // Empty state
            <div className='h-[50vh] flex items-center justify-center'>
                <div className='flex flex-col gap-2 items-center'>
                    <EmptyDocuBig />
                    <>
                        <p className='text-[16px] font-medium text-[#141313]'>No Expense Record</p>

                        {(!search && !fromDate && !toDate && !selectedStatus && !selectedCate) && (
                            <p className='text-sm font-normal text-[#141313]'>
                                You’re yet to add an expense record. All expense records will be displayed here.
                            </p>
                        )}

                        {(!search && !fromDate && !toDate && !selectedStatus && !selectedCate) && (
                            <button
                                onClick={() => setOpenCreateExpenses(true)}
                                className='text-BlueHomz text-[16px] font-normal flex items-center gap-1'
                            >
                                <span className='text-[20px] mt-[-7px]'>+</span>Add New Record
                            </button>
                        )}
                    </>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-6 w-full mx-auto flex flex-col" style={{ height: '70vh' }}>
            {/* Fixed Header */}
            <div className="bg-whiteblue min-h-[50px] text-[13px] font-semibold text-BlackHomz flex items-center border rounded-t-[8px]">
                <div onClick={handleSelectAll} className="cursor-pointer text-left pl-4 flex-shrink-0 w-[20%] md:w-[8%]">
                    {selectAll ? <Ticked /> : <UnTicked />}
                </div>
                <div className="text-left flex-shrink-0 w-[35%] md:w-[14%]">Expense</div>
                <div className="text-left flex-shrink-0 w-[35%] md:w-[14%]">Amount</div>
                <div className="text-left flex-shrink-0 w-[14%] hidden md:block">Category</div>
                <div className="text-left flex-shrink-0 w-[14%] hidden md:block">Status</div>
                <div className="text-left flex-shrink-0 w-[14%] hidden md:block">Date</div>
                <div className="text-left flex-shrink-0 w-[14%] hidden md:block">Property</div>
                <div className="flex-shrink-0 w-[10%] md:w-[8%]">
                    <span className='hidden md:block'>Action</span>
                </div>
            </div>

            {/* Virtualized Scrollable Body */}
            <div
                ref={tableRef}
                className="w-full border border-t-0 rounded-b-[8px] overflow-y-auto"
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const isLoaderRow = virtualRow.index >= allData?.data?.results?.length;
                        const data = allData?.data?.results?.[virtualRow.index];
                        console.log(data)
                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {loading ? (
                                    <SkeletonLoader />
                                ) : isLoaderRow ? (
                                    hasMore ? (
                                        <div className="w-full flex justify-center py-4">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                                        </div>
                                    ) : (
                                        <div className="w-full flex justify-center py-4 text-gray-500 text-sm">
                                            No more items to load
                                        </div>
                                    )
                                ) : (
                                    <div className="w-full border-t-[1px] flex items-center min-h-[60px] hover:bg-gray-50">
                                        <div onClick={() => handleRowSelect(data?._id, data)} className="cursor-pointer text-GrayHomz pr-2 py-[15px] pl-4 font-[400] text-[13px] flex-shrink-0 w-[20%] md:w-[8%]">
                                            {selectedRows.includes(data?._id) ? <Ticked /> : <UnTicked />}
                                        </div>
                                        <div className="flex items-center gap-1 py-[15px] text-GrayHomz4 font-[400] text-[13px] flex-shrink-0 w-[35%] md:w-[14%]">
                                            <span>{data?.expenseName}</span>
                                        </div>
                                        <div className="text-GrayHomz py-[15px] font-[400] text-[13px] flex-shrink-0 w-[35%] md:w-[14%]">
                                            <span style={{ fontFamily: "Arial" }}>₦</span>
                                            {addCommasToNumberWithoutN(data?.amount)}
                                        </div>
                                        <div className="text-GrayHomz py-[15px] font-[400] text-[13px] flex-shrink-0 w-[14%] hidden md:block">
                                            {data?.expenseCategoryName}
                                        </div>
                                        <div className="text-GrayHomz py-[15px] font-[400] md:flex text-[13px] flex-shrink-0 w-[14%] hidden">
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
                                        <div className="text-GrayHomz py-[15px] font-[400] text-[13px] flex-shrink-0 w-[14%] hidden md:block">
                                            {changeBackendDateFormat(data?.date)}
                                        </div>
                                        <div className="text-GrayHomz py-[15px] font-[400] text-[13px] flex-shrink-0 w-[14%] hidden md:block">
                                            {data?.property?.propertyName ?? "------------"}
                                        </div>
                                        <div className="relative py-[15px] md:pl-4 z-10 w-[10%] md:w-[8%]">
                                            <button onClick={() => { handleToggleMenu(data._id, data) }}>
                                                <Image
                                                    src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                                                    alt="Options"
                                                    height={21}
                                                    width={20}
                                                    style={{ height: "auto", width: "auto" }}
                                                />
                                            </button>
                                            {popUpMenu && selectedId === data?._id &&
                                                <PopUpMenu
                                                    setOpenCreateExpenses={setOpenCreateExpenses}
                                                    setOpenEdit={setOpenEdit}
                                                    handleDeleteSingle={handleDeleteSingle}
                                                    data={data}
                                                    setOpenDetails={setOpenDetails}
                                                    index={virtualRow.index}
                                                    dropdownRef={dropdownRef}
                                                    totalLength={allData?.results?.length}
                                                />
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Table;