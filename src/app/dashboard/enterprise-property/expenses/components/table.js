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
import useViewportStore from '@/store/useViewportState';

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
    singleTableData,
    tableRef,
    resetTwo
}) => {
    const [popUpMenu, setPopUpMenu] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(null);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectAll, setSelectAll] = React.useState(false);
    const dropdownRef = useClickOutside(() => setPopUpMenu(false));
    const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
    const [triggeringElementRef, setTriggeringElementRef] = React.useState(null);
    const [showMenuAfterPositioning, setShowMenuAfterPositioning] = React.useState(false);
	const { width, isAt624px } = useViewportStore();
    const {
        fromDate,
        toDate,
        selectedStatus,
        selectedCate,
        search,
    } = useExpenseStore();

    // Virtualizer instance
    const rowVirtualizer = useVirtualizer({
        count: hasMore ? allData?.data?.results?.length + 1 : allData?.data?.results?.length,
        getScrollElement: () => tableRef.current,
        estimateSize: () => 60,
        overscan: 5,
    });

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

    // Debounce function
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Calculate menu position
    const calculatePopUpMenuPosition = React.useCallback(() => {
        if (!triggeringElementRef || !tableRef.current) return;

        const buttonRect = triggeringElementRef.getBoundingClientRect();
        const tableRect = tableRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const menuWidth = 180;
        const menuHeight = 120; // Approximate height

        // Calculate initial position (below the button)
        let top = buttonRect.bottom;
        let left = buttonRect.left;

        // Adjust if menu would go off screen to the right
        if (left + menuWidth > viewportWidth) {
            left = viewportWidth - menuWidth - (isAt624px ? 110 : 10);
        }

        // Adjust if menu would go off screen to the bottom
        if (top + menuHeight > viewportHeight) {
            top = buttonRect.top - menuHeight;
        }

        setMenuPosition({ top, left });
        
        // Only show the menu after position is calculated
        if (!showMenuAfterPositioning) {
            setShowMenuAfterPositioning(true);
        }
    }, [triggeringElementRef, showMenuAfterPositioning]);

    // Handle opening the PopUpMenu
    const handleToggleMenu = React.useCallback((data, e) => {
        e.stopPropagation();
        setTriggeringElementRef(e.currentTarget);
        setSingleTableData(data);
        setSelectedId(data?._id);
        setShowMenuAfterPositioning(false); // Hide menu until position is calculated
        calculatePopUpMenuPosition(); // Calculate position first
        setPopUpMenu(!popUpMenu);
    }, [setSingleTableData, calculatePopUpMenuPosition]);

    // Effect to calculate position when menu opens or scrolls
    React.useEffect(() => {
        if (!popUpMenu || !triggeringElementRef) return;

        // Initial position calculation
        calculatePopUpMenuPosition();

        // Set up scroll and resize listeners
        const handleScrollOrResize = debounce(() => {
            // Close menu on scroll
            setPopUpMenu(false);
            setShowMenuAfterPositioning(false);
            setTriggeringElementRef(null);
        }, 50);

        window.addEventListener('scroll', handleScrollOrResize, true);
        window.addEventListener('resize', handleScrollOrResize);

        return () => {
            window.removeEventListener('scroll', handleScrollOrResize, true);
            window.removeEventListener('resize', handleScrollOrResize);
        };
    }, [popUpMenu, triggeringElementRef, calculatePopUpMenuPosition]);

    // Close PopUpMenu on outside click
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                triggeringElementRef && !triggeringElementRef.contains(event.target)) {
                setPopUpMenu(false);
                setShowMenuAfterPositioning(false);
                setSelectedId(null);
                setTriggeringElementRef(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, triggeringElementRef]);

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
                        height: rowVirtualizer.getTotalSize() > 0 ? `${rowVirtualizer.getTotalSize()}px` : 'auto',
                        minHeight: allData?.data?.results?.length === 0 ? 'calc(70vh - 50px)' : 'auto',
                        position: 'relative',
                    }}
                >
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                style={{
                                    position: 'absolute',
                                    top: `${index * 60}px`,
                                    left: 0,
                                    width: '100%',
                                    height: '60px',
                                    zIndex: '-20px'
                                }}
                            >
                                <SkeletonLoader />
                            </div>
                        ))
                    ) : allData && allData?.data?.results?.length ?
                        (
                            rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                const isLoaderRow = virtualRow.index >= allData?.data?.results?.length;
                                const data = allData?.data?.results?.[virtualRow.index];

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
                                        {isLoaderRow ? (
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
                                            <div className="w-full border-t-[1px] flex items-center min-h-[60px]">
                                                <div onClick={() => handleRowSelect(data?._id)} className="cursor-pointer text-GrayHomz pr-2 py-[15px] pl-4 font-[400] text-[13px] flex-shrink-0 w-[20%] md:w-[8%]">
                                                    {selectedRows.includes(data?._id) ? <Ticked /> : <UnTicked />}
                                                </div>
                                                <div className="flex items-center gap-1 py-[15px] text-GrayHomz4 font-[400] text-[13px] flex-shrink-0 w-[35%] md:w-[14%]">
                                                    <span>{data?.expenseName}</span>
                                                </div>
                                                <div className="pl-2 text-GrayHomz py-[15px] font-[400] text-[13px] flex-shrink-0 w-[35%] md:w-[14%]">
                                                    <span style={{ fontFamily: "Arial" }}>₦</span>
                                                    {addCommasToNumberWithoutN(data?.amount)}
                                                </div>
                                                <div className="pl-2 text-GrayHomz py-[15px] font-[400] text-[13px] flex-shrink-0 w-[14%] hidden md:block">
                                                    {data?.expenseCategoryName}
                                                </div>
                                                <div className="pl-3 text-GrayHomz py-[15px] font-[400] md:flex text-[13px] flex-shrink-0 w-[14%] hidden">
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
                                                <div className="pl-3 text-GrayHomz py-[15px] font-[400] text-[13px] flex-shrink-0 w-[14%] hidden md:block">
                                                    {changeBackendDateFormat(data?.date)}
                                                </div>
                                                <div className="pl-4 text-GrayHomz py-[15px] font-[400] text-[13px] flex-shrink-0 w-[14%] hidden md:block">
                                                    {data?.property?.propertyName ?? "------------"}
                                                </div>
                                                <div className="py-[15px] md:pl-4 z-10 w-[10%] md:w-[8%]">
                                                    <button onClick={(e) => { handleToggleMenu(data, e) }}>
                                                        <Image
                                                            src="/static/dashboard/enterprisemanager/dashboard/dots-vertical.png"
                                                            alt="Options"
                                                            height={21}
                                                            width={20}
                                                            style={{ height: "auto", width: "auto" }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className='h-[50vh] flex items-center justify-center'>
                                <div className='flex flex-col gap-2 items-center'>
                                    <EmptyDocuBig />
                                    <>
                                        <p className='text-[16px] font-medium text-[#141313]'>No Expense Record</p>

                                        {(!search && !fromDate && !toDate && !selectedStatus && !selectedCate) && !resetTwo && (
                                            <p className='text-sm font-normal text-[#141313] text-center'>
                                                You're yet to add an expense record. All expense records will be displayed here.
                                            </p>
                                        )}

                                        {(!search && !fromDate && !toDate && !selectedStatus && !selectedCate) && !resetTwo && (
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
                        )}
                </div>
            </div>

            {/* Render PopUpMenu outside the scrollable area */}
            {popUpMenu && showMenuAfterPositioning && (
                <PopUpMenu
                    setOpenCreateExpenses={setOpenCreateExpenses}
                    setOpenEdit={setOpenEdit}
                    handleDeleteSingle={handleDeleteSingle}
                    data={singleTableData}
                    setOpenDetails={setOpenDetails}
                    position={menuPosition}
                    onClose={() => {
                        setPopUpMenu(false);
                        setShowMenuAfterPositioning(false);
                        setSelectedId(null);
                        setSingleTableData(null);
                        setTriggeringElementRef(null);
                    }}
                    dropdownRef={dropdownRef}
                />
            )}
        </div>
    );
};

export default Table;