"use client"
import React from 'react'
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import useClickOutside from '@/utils/clickOutside';
import HeaderAndFilter from './components/headerAndFilter';
import StatCard from './components/statCard';
import Table from './components/table';
import AllDetails from './components/allDetails';


const Expenses = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenTwo, setIsOpenTwo] = React.useState(false);
    const [openStatusFilter, setOpenStatusFilter] = React.useState(false);
    const closeFilter = useClickOutside(() => setIsOpen(false));
    const closeAction = useClickOutside(() => setIsOpenTwo(false));
    const [singleTableData, setSingleTableData] = React.useState(null);
    const [openDetails, setOpenDetails] = React.useState(false);
    return (
        <div className='px-8 py-7'>
            <CustomizedModal isOpen={openDetails} onRequestClose={() => setOpenDetails(false)}>
                <AllDetails
                    singleTableData={singleTableData}
                    setOpenDetails={setOpenDetails}
                />
            </CustomizedModal>
            <HeaderAndFilter
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setIsOpenTwo={setIsOpenTwo}
                isOpenTwo={isOpenTwo}
                closeAction={closeAction}
                closeFilter={closeFilter}
            />
            <div className='flex gap-4 flex-col md:flex-row mt-4 w-full'>
                <div className='flex gap-4 w-full'>
                    <StatCard
                        bgColor="bg-[#FDF2F2]"
                        title="Total Expenses"
                        amount="390,000.00"
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
                        amount="1,200,000.00"
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
                            amount="810,000.00"
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
                    setSingleTableData={setSingleTableData}
                    setOpenDetails={setOpenDetails}
                />
            </div>
        </div>
    )
}

export default Expenses