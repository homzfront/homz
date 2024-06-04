import React from 'react'
import Image from 'next/image'
import Reset from '@/components/icons/reset'
import Dropdown from './dropDownFilter'

const FilterMobile = ({ defaultName, selectedStatus, options, reset, closeMobileModal, setSelectedDate, setSelectedStatus }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
            <div className="bg-white border flex flex-col w-[350px] h-[320px]  py-[24px] px-4 rounded-[12px] gap-[18px]">
                <div className=" flex items-center justify-between">
                    <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
                        Filter by
                    </p>
                    <div>
                        <button onClick={closeMobileModal} className="cursor-pointer">
                            <Image
                                src="/static/images/close-square.svg"
                                height={24}
                                width={24}
                                alt=""
                            />
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-[100%]">
                        <Dropdown
                            options={options}
                            onSelect={(option) => setSelectedStatus(option)}
                            selectOption={selectedStatus === null ? defaultName : selectedStatus}
                            className={"text-[14px] font-[500] text-GrayHomz2"}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <input
                        type="date"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border px-4 h-[42px] w-full text-GrayHomz2 mb-1 p-2 rounded cursor-pointer"
                    />
                </div>
                <div className="w-full flex flex-row gap-4">
                    <button
                        className="border w-[70%] h-[42px] p-[12px] border-BlueHomz text-white bg-BlueHomz items-center text-[14px] font-[500] flex justify-center gap-2 rounded-[4px] cursor-pointer mt-4"
                        onClick={closeMobileModal}
                    >
                        <Image
                            src="/static/images/white-search.svg"
                            alt=""
                            width={16}
                            height={16}
                        />
                        <span className="">
                            Filter
                        </span>
                    </button>
                    <button
                        className="border w-[30%] h-[42px] p-[12px] border-BlueHomz bg-white items-center text-[14px] font-[500] flex justify-center gap-1 rounded-[4px] cursor-pointer mt-4"
                        onClick={reset}
                    >
                        <span>
                            <Reset className="#006AFF" />
                        </span>
                        <span className="text-[14px] leading-[17.64px]  text-[500] text-BlueHomz">
                            Reset
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilterMobile