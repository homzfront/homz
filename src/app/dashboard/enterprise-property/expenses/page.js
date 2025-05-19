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
    } = useExpenseStore();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpenTwo, setIsOpenTwo] = React.useState(false);
    const [openStatusFilter, setOpenStatusFilter] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);
    const [expenseCate, setExpenseCate] = React.useState(false);
    const closeFilter = useClickOutside(() => {
        setIsOpen(false);
        setExpenseCate(false);
        setOpenStatus(false);
    });
    const closeAction = useClickOutside(() => setIsOpenTwo(false));
    const [totalPages, setTotalPages] = React.useState(1);
    const [singleTableData, setSingleTableData] = React.useState(null);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [openCreateExpenses, setOpenCreateExpenses] = React.useState(false);

    const debouncedSearch = useDebounce(search, 500);
    const debounceToDate = useDebounce(toDate, 500);
    const debounceFromDate = useDebounce(fromDate, 500);

    React.useEffect(() => {
        fetchCategory()
    }, [])

    const fetchExpense = async (page) => {
        if (fromDate && !toDate) return;
        if (!fromDate && toDate) return;
        setIsLoading(true);
        try {
            let query = `/expense/enterprise/get-all?limit=10&page=${page}`;
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
            setAllData(result?.data)
            setTotalPages(result?.data?.totalPages);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching data:", error);
        }
    };

    React.useEffect(() => {
        fetchExpense(pageNo);
    }, [pageNo, selectedStatus, selectedCate, debounceFromDate, debounceToDate, debouncedSearch]);

    const clear = () => {
        setSelectedStatus(null);
        setSelectedCate(null);
        setFromDate(null);
        setToDate(null);
        setSearch('')
        setPageNo(1)
    };

    const StatusOption = ["Paid", "Unpaid"];

    return (
        <div className=''>
            <CustomizedModal isOpen={openDetails} onRequestClose={() => setOpenDetails(false)}>
                <AllDetails
                    singleTableData={singleTableData}
                    setOpenDetails={setOpenDetails}
                />
            </CustomizedModal>
            {openCreateExpenses ?
                <CreateExpenses fetchExpense={fetchExpense} setOpenCreateExpenses={setOpenCreateExpenses} />
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
                            totalPages={totalPages}
                            loading={isLoading}
                            setSingleTableData={setSingleTableData}
                            setOpenDetails={setOpenDetails}
                            setPageNo={setPageNo}
                            pageNo={pageNo}
                            fetchExpense={fetchExpense}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default Expenses