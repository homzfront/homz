import React from 'react'
import AddNormal from '@/components/icons/addNormal';
import ArrowDown from '@/components/icons/arrowDown';
import ArrowUpII from '@/components/icons/arrowUpII';
import DateIconTwo from '@/components/icons/dateIconTwo';
import DeleteIcon from '@/components/icons/deleteIcon';
import DocDocuSmall from '@/components/icons/docDocuSmall';
import FilterIconBlue from '@/components/icons/filterIconBlue';
import Reset from '@/components/icons/reset';
import BlueSearch from '@/components/icons/blueSearch';
import DotsBlue from '@/components/icons/dotsBlue';

const HeaderAndFilter = ({
    setIsOpen,
    isOpen,
    setIsOpenTwo,
    isOpenTwo,
    closeAction,
    closeFilter,
}) => {
    return (
        <div>
            <h2 className='md:hidden mb-4 font-normal text-[16px] text-BlackHomz'>
                Expenses
            </h2>
            <div className='flex w-full gap-4 justify-between'>
                <h2 className='hidden md:block font-medium text-[20px] text-BlackHomz'>
                    Expenses
                </h2>
                <div className='mb-2 md:hidden h-[38px] w-full border border-[#A9A9A9] rounded-[4px] px-3 flex items-center justify-center gap-2'>
                    <BlueSearch />
                    <input
                        type='text'
                        className='placeholder:text-[#A9A9A9] w-full outline-none placeholder:text-[13px] text-[13px]'
                        placeholder='Email, Expense, Property...'
                    />
                </div>
                <div className='relative flex justify-end md:justify-normal md:items-center gap-2'>
                    <div ref={closeFilter}>
                        <div
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                            className='cursor-pointer w-auto border border-BlueHomz px-3 h-[38px] flex justify-center items-center rounded-[4px] gap-1'>
                            <FilterIconBlue />
                            <span className='hidden md:block'>
                                {isOpen ?
                                    <ArrowUpII className="#006AFF" /> :
                                    <ArrowDown className="#006AFF" />
                                }
                            </span>
                        </div>
                        {
                            isOpen &&
                            <div className='absolute z-50 top-10 right-[50px] md:right-[104px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px]'>
                                <div>
                                    <p className='text-[13px] text-GrayHomz font-medium'>
                                        Filter by:
                                    </p>
                                    {/* Search Input */}
                                    <div className='mb-2 hidden md:flex gap-2 items-center w-full border border-[#A9A9A9] rounded-[4px] p-2'>
                                        <BlueSearch />
                                        <input
                                            type='text'
                                            className='placeholder:text-[#A9A9A9] w-full outline-none'
                                            placeholder='Email, Expense, Property...'
                                        />
                                    </div>
                                    <button className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                                        Expense Category   <ArrowDown className="#4E4E4E" />
                                    </button>
                                    <button className='mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 py-2 w-full border border-[#4E4E4E] rounded-[4px]'>
                                        Status    <ArrowDown className="#4E4E4E" />
                                    </button>
                                    <button
                                        className='relative mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                                    >
                                        <input
                                            type='date'
                                            className="w-full py-2 outline-none"
                                            placeholder='Start Date'
                                        />
                                        <span className='absolute top-2 right-3 bg-white p-1'><DateIconTwo /></span>
                                    </button>
                                    <button
                                        className='relative mt-1 text-sm font-normal text-GrayHomz flex justify-between px-3 w-full border border-[#4E4E4E] rounded-[4px]'
                                    >
                                        <input
                                            type='date'
                                            className="w-full py-2 outline-none"
                                            placeholder='End Date'
                                        />
                                        <span className='absolute top-2 right-3 bg-white p-1'><DateIconTwo /></span>
                                    </button>
                                    <button
                                        className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue hidden md:flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                                        <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
                                    </button>
                                    <button
                                        className='mt-1 text-sm font-normal text-BlueHomz bg-whiteblue md:hidden flex justify-between px-3 py-2 w-full border border-BlueHomz rounded-[4px]'>
                                        <span className='mx-auto flex gap-2 items-center'>Reset   <Reset className='#006aff' /></span>
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                    <div ref={closeAction}>
                        <div
                            onClick={() => {
                                setIsOpenTwo(!isOpenTwo)
                            }}
                            className='cursor-pointer w-auto text-sm text-BlueHomz font-medium border border-BlueHomz px-3 h-[38px] flex justify-center items-center rounded-[4px] gap-1'>
                            <span className='hidden md:block'>
                                Actions
                            </span>
                            <span className='md:hidden'>
                                <DotsBlue />
                            </span>
                            <span className='hidden md:block'>
                                {isOpenTwo ?
                                    <ArrowUpII className="#006AFF" /> :
                                    <ArrowDown className="#006AFF" />
                                }
                            </span>
                        </div>
                        {
                            isOpenTwo &&
                            <div className='absolute z-50 top-10 right-[0px] bg-white min-w-[220px] p-2 border border-[#A9A9A9] rounded-[8px] max-h-[300px] overflow-y-auto scrollbar-container'>
                                <div className='text-sm text-GrayHomz font-medium flex flex-col gap-0'>
                                    <div className='flex gap-2 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                                        <span className='w-3'>
                                            <AddNormal />
                                        </span>
                                        <span className='min-w-[80%]'>
                                            New Expense
                                        </span>
                                    </div>
                                    <div className='flex gap-2 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                                        <span className='w-3'>
                                            <DocDocuSmall />
                                        </span>
                                        <span className='min-w-[80%]'>
                                            Generate Statement
                                        </span>
                                    </div>
                                    <div className='flex gap-2 mt-1.5 items-center hover:bg-whiteblue p-2 cursor-pointer'>
                                        <span className='w-3'>
                                            <DeleteIcon />
                                        </span>
                                        <span className='min-w-[80%] text-error'>
                                            Delete
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderAndFilter