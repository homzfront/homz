"use client";
import React, { useState } from 'react';
import Delete from '@/components/icons/delete';
import EditBlue from '@/components/icons/editBlue';
import Eyes from '@/components/icons/eyes';

function PopUpMenu({ dropdownRef, index, totalLength, setOpenCreateExpenses, setOpenEdit, handleDeleteSingle, data, setOpenDetails }) {
    const [active, setActive] = useState(false);
    const [activeTwo, setActiveTwo] = useState(false);
    const [activeThree, setActiveThree] = useState(false);
    return (
        <div>


            <div
                ref={dropdownRef}
                className={`top-9 md:top-11 right-[30px] md:right-[67px] drop-down absolute z-[999999999] w-[150px] md:w-[180px] text-GrayHomz font-[500] text-[13px] border py-2 rounded-md bg-white flex flex-col items-center justify-around`}
            >

                {/* View All Details */}
                <div
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}
                    className="md:h-[30px] h-auto rounded-md flex gap-1 items-center py-1 px-2 text-GrayHomz hover:text-BlueHomz w-full ">
                    <button
                        className="w-full"
                        onClick={() => {
                            setOpenDetails(true)
                        }}
                    >
                        <div className={`px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md`}>
                            <Eyes className={active ? '#006AFF' : undefined} />
                            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                                All details
                            </p>
                        </div>
                    </button>
                </div>

                {/* Edit */}
                <div
                    onMouseEnter={() => setActiveTwo(true)}
                    onMouseLeave={() => setActiveTwo(false)}
                    className={`md:h-[30px] h-auto rounded-md flex gap-1 items-center py-1 px-2 text-GrayHomz hover:text-BlueHomz w-full`}>
                    <button
                        className="w-full"
                        onClick={() => {
                            setOpenCreateExpenses(true)
                            setOpenEdit(data)
                        }}
                    >
                        <div className={`px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md`}>
                            <EditBlue className={activeTwo ? '#006AFF' : '#4E4E4E'} />
                            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                                Edit
                            </p>
                        </div>
                    </button>
                </div>

                {/* Delete */}
                <div
                    onMouseEnter={() => setActiveThree(true)}
                    onMouseLeave={() => setActiveThree(false)}
                    className={`md:h-[30px] h-auto rounded-md flex gap-1 items-center py-1 px-2 text-GrayHomz hover:text-[#D92D20] w-full`}>
                    <button onClick={() => handleDeleteSingle(data?._id)} className="w-full">
                        <div className={`px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md`}>
                            <Delete className={activeThree ? '#D92D20' : undefined} classNameTwo={activeThree ? '#D92D20' : undefined} />
                            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                                Delete
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopUpMenu;
