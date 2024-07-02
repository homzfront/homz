import React, { useState } from 'react'
import DropDownReminder from './dropDownReminder';
import DropDownChannel from './dropDownChannel';
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import Image from 'next/image';

const CustomizeSettings = ({ setCustomizeSettings }) => {
    const [time, setTime] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [channels, setChannels] = useState(null);
    const [modalConfirmChnages, setModalConfirmChnages] = useState(false);
    const [modalSave, setModalSave] = useState(false);
    const [openCompleted, setOpenCompleted] = useState(false);

    const options = [
        { id: 1, label: "6 months before due date" },
        { id: 2, label: "3 months before due date" },
        { id: 3, label: "1 month before due date" },
        { id: 4, label: "7 days before due date" },
        { id: 5, label: "3 days before due date" },
        { id: 6, label: "1 day before due date" },
        { id: 7, label: "Due date" },
        { id: 8, label: "1 day after due date" },
        { id: 9, label: "3 days after due date" },
        { id: 10, label: "7 days after due date" },
    ]

    const optionII = [
        { id: 1, label: "All" },
        { id: 2, label: "Dashboard" },
        { id: 3, label: "Email" },
        { id: 4, label: "SMS" },
    ]
    
    return (
        <div>
            {<CustomizeModal isOpen={modalConfirmChnages}>
                {
                    openCompleted ?
                        <div className="p-2 m-auto bg-white h-auto rounded-md">
                            <div className="mt-[-10px] md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
                                <Image
                                    src={
                                        "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                                    }
                                    alt=""
                                    height={48}
                                    width={48}
                                />
                                <h1 className="text-BlackHomz text-center font-[700] text-[20px]">Reminder Settings Saved</h1>
                                <p className="text-[16px] font-[400] text-GrayHomz text-center">Tenants will now receive reminders to prompt swift rent  payment</p>
                                <button
                                    onClick={() => {
                                        setOpenCompleted(false)
                                        setModalConfirmChnages(false)
                                    }}
                                    className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        :
                        <div className="max-w-[464px] p-2 m-auto bg-white h-auto rounded-md">
                            <div className="flex flex-col justify-around items-center h-full p-6">
                                <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
                                    Change System Settings
                                </h1>
                                <p className="text-[16px] font-[500] text-GrayHomz text-center">
                                    Are you sure you want to change the system’s default settings?
                                </p>
                                <button
                                    onClick={() => {
                                        setOpenCompleted(true)
                                    }}
                                    className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500]"
                                >
                                    Proceed
                                </button>
                                <button
                                    onClick={() => setModalConfirmChnages(false)}
                                    className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                }
            </CustomizeModal>
            }
            <CustomizeModal isOpen={modalSave}>
                <div className="max-w-[464px] p-2 m-auto bg-white md:h-[245px] rounded-md">
                    <div className="flex flex-col justify-around items-center h-full p-6">
                        <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
                            Restore Default Settings
                        </h1>
                        <p className="text-[16px] font-[500] text-GrayHomz text-center">
                            Are you sure you want to restore the system’s default settings?
                        </p>
                        <button
                            onClick={() => {
                                setCustomizeSettings(false)
                            }}
                            className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500]"
                        >
                            Proceed
                        </button>
                        <button
                            onClick={() => setModalSave(false)}
                            className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]"
                        >
                            No, go back
                        </button>
                    </div>
                </div>
            </CustomizeModal>
            <div className="flex justify-between border-b py-4 w-[100%]">
                <div className="flex flex-col w-[50%] md:w-[395px] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Date before/after due date <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Select your preferred date for reminder(s) to be sent out
                    </p>
                </div>
                <div className="w-[50%]">
                    <div className="">
                        <DropDownReminder
                            options={options}
                            onSelect={(option) => setDueDate(option)}
                            selectOption={
                                dueDate === null ? "Select reminder date" : dueDate
                            }
                            className={"text-[14px] font-[500] text-GrayHomz2 w-[236px]"}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between border-b py-4 w-[100%]">
                <div className="flex flex-col w-[50%] md:w-[395px] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Time <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Enter your preferred time for reminder(s) to be sent out
                    </p>
                </div>
                <div className="w-[50%]">
                    <input
                        type="time"
                        id="remindTime"
                        name="remindTime"
                        required
                        placeholder="00:00 AM"
                        className="w-[236px] h-[55px] rounded-[4px] text-GrayHomz border border-BlueHomz px-2"
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-between border-b py-4 w-[100%]">
                <div className="flex flex-col w-[50%] md:w-[395px] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Set reminder channel(s) <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Select the channels through which your tenants would receive rent due reminders.
                    </p>
                </div>
                <div className="w-[50%]">
                    <div className="">
                        <DropDownChannel
                            options={optionII}
                            onSelect={(option) => setChannels(option)}
                            selectOption={
                                channels === null ? "Select Channel(s)" : channels.label
                            }
                            className={"text-[14px] font-[500] text-GrayHomz2 w-[236px]"}
                        />
                    </div>
                </div>
            </div>
            <div className={`flex justify-between border-b py-4 w-[100%]`}>
                <div className="flex flex-col w-[50%] md:w-[395px] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Email Reminder Message <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Type  in your preferred reminder message for emails
                    </p>
                </div>
                <div className='w-[50%]'>
                    <div className='py-3 px-4 flex items-center border  border-BlueHomz text-GrayHomz rounded-[4px]'>
                        <p className='text-[14px] font-[500] text-justify'>
                            Lorem ipsum dolor sit amet consectetur. Massa lectus nulla proin morbi id. Lectus nulla turpis vel ultricies pretium dictumst amet lectus nulla. Enim quis urna lacus in blandit arcu eget erat amet. Arcu massa ultricies tristique tellus at pretium hendrerit vivamus. Risus adipiscing dis semper senectus vitae sed turpis sed est. Nunc est diam et magna lorem nec fermentum donec risus. Viverra sed ut id eros lobortis sed eros non elit.
                            Leo mauris etiam leo fames nec pretium egestas fames volutpat. Ut aliquet tortor volutpat faucibus. Nunc etiam vulputate tincidunt tempor malesuada pharetra. Ut ullamcorper turpis arcu felis. Ut urna placerat sem sagittis. Dui eu vel sit bibendum. Velit nam diam malesuada nunc lorem mattis gravida nunc. In convallis a urna egestas justo dictumst cras. Aenean id eget sit risus posuere amet. Quam felis.
                        </p>
                    </div>
                </div>
            </div>
            <div className={`flex justify-between border-b py-4 w-[100%] `}>
                <div className="flex flex-col w-[50%] md:w-[395px] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Email Reminder Message <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Type  in your preferred reminder message for emails
                    </p>
                </div>
                <div className='w-[50%]'>
                    <div className='py-3 px-4 flex items-center border  border-BlueHomz text-GrayHomz rounded-[4px]'>
                        <p className='text-[14px] font-[500] text-justify'>
                            Lorem ipsum dolor sit amet consectetur. Massa lectus nulla proin morbi id. Lectus nulla turpis vel ultricies pretium dictumst amet lectus nulla. Enim quis urna lacus in blandit arcu eget erat amet. Arcu massa ultricies tristique tellus at pretium hendrerit vivamus. Risus adipiscing dis semper senectus vitae sed turpis sed est. Nunc est diam et magna lorem nec fermentum donec risus. Viverra sed ut id eros lobortis sed eros non elit.
                        </p>
                    </div>
                    <div className='mt-2 flex items-center gap-2 text-[13px] font-[400] text-GrayHomz'>
                        Send copy to :
                        <div className='flex items-center gap-1'>
                            <input type='radio' />
                            <p>Property Manager</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <input type='radio' />
                            <p>Property Owner</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`border-b py-4 w-[100%]`}>
                <div className="flex justify-between">
                    <div className="flex flex-col w-[50%] md:w-[395px] gap-2">
                        <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                            Email Reminder Message <span className="text-red-600">*</span>
                        </p>
                        <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                            Type  in your preferred reminder message for emails
                        </p>
                    </div>
                    <div className='w-[50%]'>
                        <div className='py-3 px-4 flex items-center border  border-BlueHomz text-GrayHomz rounded-[4px]'>
                            <p className='text-[14px] font-[500] text-justify'>
                                Lorem ipsum dolor sit amet consectetur. Massa lectus nulla proin morbi id. Lectus nulla turpis vel ultricies pretium dictumst amet lectus nulla. Enim quis urna lacus in blandit arcu eget erat amet. Arcu massa ultricies tristique tellus at pretium hendrerit vivamus. Risus adipiscing dis semper senectus vitae sed turpis sed est. Nunc est diam et magna lorem nec fermentum donec risus. Viverra sed ut id eros lobortis sed eros non elit.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='mt-4 flex gap-2 items-center'>
                    <button
                        onClick={() => setModalConfirmChnages(true)}
                        className='text-[14px] font-[500] w-[155px] bg-BlueHomz text-white py-2 rounded-[4px]'>
                        Save changes
                    </button>
                    <button
                        onClick={() => setModalSave(true)}
                        className='text-[14px] font-[500] w-[185px] text-BlueHomz hover:border border-BlueHomz py-2 rounded-[4px]'>
                        Restore default settings
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomizeSettings