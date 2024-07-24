import React, { useState } from 'react'
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import CustomizeSettingsII from './customizeSettingsII';
import Print from '@/components/icons/print';

const SettingsII = ({ data }) => {
    const [modalCustom, setModalCustom] = useState(false);
    const [customizeSettings, setCustomizeSettings] = useState(false);

    return (
        <div>
            <CustomizeModal isOpen={modalCustom}>
                <div className="max-w-[464px] p-2 m-auto bg-white md:h-[245px] rounded-md">
                    <div className="flex flex-col justify-around items-center h-full p-6">
                        <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
                            Change System Settings
                        </h1>
                        <p className="text-[16px] font-[500] text-GrayHomz text-center">
                            Are you sure you want to change the system’s default settings?
                        </p>
                        <button
                            onClick={() => {
                                setCustomizeSettings(true)
                                setModalCustom(false)
                            }}
                            className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500]"
                        >
                            Proceed
                        </button>
                        <button
                            onClick={() => setModalCustom(false)}
                            className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </CustomizeModal>
            {
                customizeSettings ?
                    <div>
                        <CustomizeSettingsII setCustomizeSettings={setCustomizeSettings} data={data} />
                    </div>
                    :
                    <div>
                        {/* <div className='flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]'>
                            <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    Time
                                </p>
                                <p className='text-[13px] font-[400] text-BlackHomz'>
                                    Rent reminder will be sent out to tenants at this time
                                </p>
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <div className='w-full md:w-[230px] py-3 pl-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[500]'>
                                        12 : 00 PM
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        <div className='flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]'>
                            <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    Frequency
                                </p>
                                <p className='text-[13px] font-[400] md:w-[70%] text-BlackHomz'>
                                    Set how frequent you want your tenant(s) to receive this reminder
                                </p>
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <div className='w-full md:w-[230px] py-3 pl-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[500]'>
                                        Every 2 weeks
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]'>
                            <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    Reminder channel(s)
                                </p>
                                <p className='text-[13px] font-[400] md:w-[70%] text-BlackHomz'>
                                    Rent reminder(s) will be sent to your tenants through these channels
                                </p>
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <div className='w-full md:w-[230px] py-3 pl-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[500]'>
                                        In-app, Email, SMS
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]'>
                            <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    Email Reminder Message
                                </p>
                                <p className='text-[13px] font-[400] text-BlackHomz'>
                                    Tenant(s) will receive this message in their emails
                                </p>
                            </div>
                            <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[400]'>{data?.emailReminder}</p>
                                </div>
                                <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[400] text-justify'>
                                        {data?.emailText}
                                    </p>
                                </div>
                                <div className='flex justify-between w-full'>
                                    <div className='text-GrayHomz font-[400] text-[13px]'>
                                        Send copy to: Landlord
                                    </div>
                                    <div className='flex items-center gap-1 text-BlueHomz font-[400] text-[14px]'>
                                        <Print />
                                        Print copy
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]'>
                            <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                <p className='text-[14px] font-[500] text-BlueHomz'>
                                    SMS Reminder Message
                                </p>
                                <p className='text-[13px] font-[400] text-BlackHomz'>
                                    Tenant(s) will receive this message
                                </p>
                            </div>
                            <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[400]'>{data?.sms_label}</p>
                                </div>
                                <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                    <p className='text-[14px] font-[400] text-justify'>
                                        {data?.sms}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='py-4 w-[100%]'>
                            <div className='flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between'>
                                <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                    <p className='text-[14px] font-[500] text-BlueHomz'>
                                        In-App Reminder Message
                                    </p>
                                    <p className='text-[13px] font-[400] text-BlackHomz'>
                                        Tenant(s) will receive this message
                                    </p>
                                </div>
                                <div className='w-full md:w-[50%] flex flex-col gap-2'>
                                    <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                        <p className='text-[14px] font-[400]'>{data?.in_app}</p>
                                    </div>
                                    <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                        <p className='text-[14px] font-[400] text-justify'>
                                            {data?.in_app_text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setModalCustom(true)}
                                className='mt-4 text-[14px] font-[500] w-[155px] bg-BlueHomz text-white py-2 rounded-[4px]'>
                                Customize settings
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default SettingsII;