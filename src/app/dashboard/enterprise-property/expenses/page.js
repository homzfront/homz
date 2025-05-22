"use client"
import React from 'react'
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import useClickOutside from '@/utils/clickOutside';
import HeaderAndFilter from './components/headerAndFilter';
import StatCard from './components/statCard';
import Table from './components/table';
import AllDetails from './components/allDetails';
import CreateExpenses from './components/createExpenses';
import useExpenseStore from '../../../../store/enterpriseStore/useExpenseStore';
import { useDebounce } from '@/utils/deBounce';
import api from '@/utils/api';
import addCommasToNumberWithoutN from '@/utils/addCommasToNumberWithoutN';
import PrintableAll from './components/printableAll';
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";

const Expenses = () => {
    const {
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        selectedStatus,
        setSelectedStatus,
        setSelectedCate,
        selectedCate,
        search,
        setSearch,
        setPageNo,
        categories,
        setAllData,
        allData,
        pageNo,
        loadingCate,
        fetchCategory,
        selectedOption,
        setSelectedOption,
    } = useExpenseStore();
    const printRefAll = React.useRef();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpenTwo, setIsOpenTwo] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);
    const [expenseCate, setExpenseCate] = React.useState(false);
    const [isOpenDocu, setIsOpenDocu] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [isFetchingMore, setIsFetchingMore] = React.useState(false);
    const [currentLimit, setCurrentLimit] = React.useState(10);
    const [observer, setObserver] = React.useState(null);
    const [loadingMore, setLoadingMore] = React.useState(false);

    const closeFilter = useClickOutside(() => {
        setIsOpen(false);
        setExpenseCate(false);
        setOpenStatus(false);
    });
    const closeAction = useClickOutside(() => {
        setIsOpenTwo(false)
        setIsOpenDocu(false)
    });

    const [singleTableData, setSingleTableData] = React.useState(null);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(null);
    const [openCreateExpenses, setOpenCreateExpenses] = React.useState(false);
    const [printData, setPrintData] = React.useState(null);
    const [deleteLoading, setDeleteLoading] = React.useState(false);

    const debouncedSearch = useDebounce(search, 500);
    const debounceToDate = useDebounce(toDate, 500);
    const debounceFromDate = useDebounce(fromDate, 500);
    const { data, fetchData } = useProfileEnterpriseMe();

    React.useEffect(() => {
        fetchCategory()
        fetchData();
    }, [])

    const fetchExpense = async (limit, isLoadMore = false) => {
        if (fromDate && !toDate) return;
        if (!fromDate && toDate) return;

        if (!isLoadMore) {
            setIsLoading(true);
            setCurrentLimit(10); // Reset to initial limit when not loading more
        } else {
            setIsFetchingMore(true);
            setCurrentLimit(prev => prev + 10); // Increase limit by 10 each time
        }

        try {
            let query = `/expense/enterprise/get-all?limit=${limit}&page=1`; // Always page=1
            if (selectedStatus) {
                query += `&status=${encodeURIComponent(selectedStatus)}`;
            }
            if (selectedCate) {
                query += `&category=${encodeURIComponent(selectedCate)}`;
            }
            if (fromDate && toDate) {
                query += `&startDate=${encodeURIComponent(fromDate)}&endDate=${encodeURIComponent(toDate)}`;
            }
            if (search) {
                query += `&search=${encodeURIComponent(search)}`;
            }

            const response = await api.get(query);
            const result = response?.data;

            if (isLoadMore) {
                setAllData(result?.data || []);
            } else {
                setAllData(result?.data || []);
            }


            // Check if we've reached the end based on total count
            setHasMore(allData.length < (result?.data?.totalCount || 0));

            if (!isLoadMore) {
                setIsLoading(false);
            } else {
                setIsFetchingMore(false);
            }
        } catch (error) {
            if (!isLoadMore) {
                setIsLoading(false);
            } else {
                setIsFetchingMore(false);
            }
            console.error("Error fetching data:", error);
        }
    };

    const fetchMoreData = async () => {
        if (isFetchingMore || !hasMore) return;
        await fetchExpense(currentLimit + 10, true); // Increase limit by 10
    };

    React.useEffect(() => {
        // Always fetch with current limit when filters change
        fetchExpense(currentLimit);yy
    }, [selectedStatus, selectedCate, debounceFromDate, debounceToDate, debouncedSearch]);


    // Delete single expense
    const handleDeleteSingle = async (id) => {
        console.log(id)
        if (!id) return;

        try {
            setDeleteLoading(true);
            await api.delete(`/expense/enterprise/single/remove/${id}`);
            // Refresh data after deletion
            await fetchExpense(pageNo);
            // Remove from selected rows if it was selected
            setSelectedRows(prev => prev.filter(item => item !== id));
            // Clear singleTableData if it was the deleted item
            if (singleTableData?._id === id) {
                setSingleTableData(null);
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        } finally {
            setDeleteLoading(false);
        }
    };

    // Delete multiple expenses
    const handleDeleteMultiple = async () => {
        if (singleTableData.length === 0) return;

        try {
            setDeleteLoading(true);
            await api.delete(`/expense/enterprise/delete-multiple`, {
                data: {
                    expenseIds: singleTableData.map(data => data._id)
                }
            });
            // Refresh data after deletion
            await fetchExpense(1);
            setSingleTableData(null);
            setIsOpenTwo(false)
        } catch (error) {
            console.error("Error deleting multiple expenses:", error);
        } finally {
            setDeleteLoading(false);
        }
    };


    const fetchExpensePrint = async (limit = 10, page) => {
        if (fromDate && !toDate) return;
        if (!fromDate && toDate) return;
        try {
            let query = `/expense/enterprise/get-all?limit=${limit}&page=${page}`;
            if (selectedStatus) {
                query += `&status=${encodeURIComponent(selectedStatus)}`;
            }
            if (selectedCate) {
                query += `&category=${encodeURIComponent(selectedCate)}`;
            }
            if (fromDate && toDate) {
                query += `&startDate=${encodeURIComponent(fromDate)}&endDate=${encodeURIComponent(toDate)}`;
            }
            if (search) {
                query += `&search=${encodeURIComponent(search)}`;
            }
            const response = await api.get(query);
            const result = response?.data;
            setPrintData(result?.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    React.useEffect(() => {
        fetchExpensePrint(1000, 1);
    }, [selectedStatus, selectedCate, debounceFromDate, debounceToDate, debouncedSearch]);


    const clear = () => {
        setSelectedStatus(null);
        setSelectedCate(null);
        setFromDate(null);
        setToDate(null);
        setSearch('')
        setPageNo(1)
        // fetchExpense(10);
        setHasMore(true);
    };

    const StatusOption = ["Paid", "Unpaid"];

    return (
        <div className={`${deleteLoading && "pointer-events-none animate-pulse"}`}>
            <CustomizedModal isOpen={openDetails} onRequestClose={() => setOpenDetails(false)}>
                <AllDetails
                    singleTableData={singleTableData}
                    setOpenDetails={setOpenDetails}
                />
            </CustomizedModal>
            {openCreateExpenses ?
                <CreateExpenses update={openEdit} setOpenEdit={setOpenEdit} fetchExpense={fetchExpense} setOpenCreateExpenses={setOpenCreateExpenses} />
                : <div className='px-8 py-7'>
                    <HeaderAndFilter
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        setIsOpenTwo={setIsOpenTwo}
                        isOpenTwo={isOpenTwo}
                        closeAction={closeAction}
                        closeFilter={closeFilter}
                        setOpenCreateExpenses={setOpenCreateExpenses}
                        statusData={StatusOption}
                        openStatus={openStatus}
                        setOpenStatus={setOpenStatus}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        fromDate={fromDate}
                        setFromDate={setFromDate}
                        toDate={toDate}
                        setToDate={setToDate}
                        search={search}
                        setSearch={setSearch}
                        clear={clear}
                        setExpenseCate={setExpenseCate}
                        expenseCate={expenseCate}
                        setSelectedCate={setSelectedCate}
                        selectedCate={selectedCate}
                        categories={categories}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        setIsOpenI={setIsOpenDocu}
                        isOpenI={isOpenDocu}
                        deleteLoading={deleteLoading}
                        printRefAll={printRefAll}
                        onDelete={handleDeleteMultiple}
                        printData={printData}
                        pageNo={pageNo}
                    />
                    <div className='flex gap-4 flex-col md:flex-row mt-4 w-full'>
                        <div className='flex gap-4 w-full'>
                            <StatCard
                                bgColor="bg-[#FDF2F2]"
                                title="Total Expenses"
                                amount={addCommasToNumberWithoutN(allData?.summary?.totalExpenseAmount)}
                                percentage="12%"
                                isPositive={true}
                                borderColor="border-[#D92D20]"
                                badgeBg='bg-[#F2B9B5]'
                                iconColor='#D92D20'
                                width='w-[50%] md:w-[33%]'
                            />
                            <StatCard
                                bgColor="bg-[#CDEADD]"
                                title="Total Rent Collected"
                                amount={addCommasToNumberWithoutN(allData?.summary?.totalRentCollected)}
                                percentage="40%"
                                isPositive={true}
                                borderColor="border-[#039855]"
                                badgeBg='bg-[#ABDDC6]'
                                iconColor='#039855'
                                width='w-[50%] md:w-[33%]'
                            />
                            <div className='hidden md:block w-[33%]'>
                                <StatCard
                                    bgColor="bg-[#EEF5FF]"
                                    title="Available Balance"
                                    amount={addCommasToNumberWithoutN(allData?.summary?.availableBalance)}
                                    percentage="60%"
                                    isPositive={true}
                                    borderColor="border-[#006AFF]"
                                    badgeBg='bg-[#ABDDC6]'
                                    iconColor='#039855'
                                />
                            </div>
                        </div>

                        <div className='md:hidden'>
                            <StatCard
                                bgColor="bg-[#EEF5FF]"
                                title="Available Balance"
                                amount="810,000.00"
                                percentage="60%"
                                isPositive={true}
                                borderColor="border-[#006AFF]"
                                badgeBg='bg-[#ABDDC6]'
                                iconColor='#039855'
                                width='w-full md:w-[33%]'
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <Table
                            allData={allData}
                            loading={isLoading}
                            setSingleTableData={setSingleTableData}
                            setOpenDetails={setOpenDetails}
                            handleDeleteSingle={handleDeleteSingle}
                            fetchExpense={fetchExpense}
                            setOpenCreateExpenses={setOpenCreateExpenses}
                            setOpenEdit={setOpenEdit}
                            fetchMoreData={fetchMoreData}
                            hasMore={hasMore}
                            observer={observer}
                            setObserver={setObserver}
                            loadingMore={loadingMore}
                            setLoadingMore={setLoadingMore}
                        />
                    </div>
                </div>
            }
            <div style={{ display: 'none' }}>
                <PrintableAll
                    data={printData}
                    summary={printData?.summary}
                    printRef={printRefAll}
                    enterprise={data}
                />
            </div>
        </div>
    )
}

export default Expenses