import React, { useState } from 'react'
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import CustomizeSettings from './customizeSettings';
import Print from '@/components/icons/print';

const Settings = ({ data, fetchDataAgain }) => {
    // Helper function to decode HTML entities
    const decodeHtmlEntities = (html) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
    };
    const emailContent = decodeHtmlEntities(data?.emailContent);
    const SMSContent = decodeHtmlEntities(data?.smsContent);
    const inAppContent = decodeHtmlEntities(data?.inAppContent);
    const [modalCustom, setModalCustom] = useState(false);
    const [customizeSettings, setCustomizeSettings] = useState(false);

    const handlePrint = (content, title) => {
        const printWindow = window.open('', '_Rent-Reminder');
        if (!printWindow) {
            alert('Failed to open print window. Please check your browser settings.');
            return;
        };

        printWindow.document.open();
        printWindow.document.write(`
            <html>
                <head>
                    <style>
                        body {
                            font-family: sans-serif;
                        }
                    </style>
                    <title>${title}</title>
                </head>
                <body>
                    ${content}
                </body>
            </html>
        `);
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
    };

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
                        <CustomizeSettings fetchDataAgain={fetchDataAgain} setCustomizeSettings={setCustomizeSettings} data={data} />
                    </div>
                    :
                    <div>
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
                                        {(data?.channels?.all === true || data?.channels?.email === true) && "Email,"}
                                        {(data?.channels?.all === true || data?.channels?.sms === true) && "SMS,"}
                                        {(data?.channels?.all === true || data?.channels?.inApp === true) && "In-app,"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {
                            (data && (data?.channels?.all === true || data?.channels?.email === true)) &&
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
                                    <div>
                                        <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                            <p className='text-[14px] font-[400]'>{data?.emailReminder}</p>
                                        </div>
                                        <div className='py-3 px-4 flex items-center bg-GrayHomz6 text-GrayHomz rounded-[4px]'>
                                            <div className='text-[14px] font-[400] text-justify'
                                                dangerouslySetInnerHTML={{ __html: emailContent }}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row md:justify-between w-full'>
                                        <div className='flex flex-col md:flex-row gap-0 md:gap-2'>
                                            {data?.sendCopyToEmail?.landlord === true &&
                                                <div className='text-GrayHomz font-[400] text-[13px]'>
                                                    Send copy to: Landlord
                                                </div>
                                            }
                                            {data?.sendCopyToEmail?.propertyManager === true &&
                                                <div className='text-GrayHomz font-[400] text-[13px]'>
                                                    Send copy to: Property Manager
                                                </div>
                                            }
                                        </div>
                                        <div
                                            className="flex items-center gap-1 text-BlueHomz font-[400] text-[14px] cursor-pointer"
                                            onClick={() => handlePrint(emailContent, data?.emailReminder)}
                                        >
                                            <Print />
                                            Print copy
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            (data && (data?.channels?.all === true || data?.channels?.sms === true)) &&
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
                                        <div className='text-[14px] font-[400] text-justify'
                                            dangerouslySetInnerHTML={{ __html: SMSContent }}
                                        />
                                    </div>
                                    {/* <div className='flex flex-col md:flex-row gap-0 md:gap-2'>
                                        {data?.sendCopyToSMS?.landlord === true &&
                                            <div className='text-GrayHomz font-[400] text-[13px]'>
                                                Send copy to: Landlord
                                            </div>
                                        }
                                        {data?.sendCopyToSMS?.propertyManager === true &&
                                            <div className='text-GrayHomz font-[400] text-[13px]'>
                                                Send copy to: Property Manager
                                            </div>
                                        }
                                    </div> */}
                                </div>
                            </div>
                        }
                        {
                            (data && (data?.channels?.all === true || data?.channels?.inApp === true)) &&
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
                                            <div className='text-[14px] font-[400] text-justify'
                                                dangerouslySetInnerHTML={{ __html: inAppContent }}
                                            />
                                        </div>
                                        <div className='flex flex-col md:flex-row gap-0 md:gap-2'>
                                            {data?.sendCopyToInApp?.landlord === true &&
                                                <div className='text-GrayHomz font-[400] text-[13px]'>
                                                    Send copy to: Landlord
                                                </div>
                                            }
                                            {data?.sendCopyToInApp?.propertyManager === true &&
                                                <div className='text-GrayHomz font-[400] text-[13px]'>
                                                    Send copy to: Property Manager
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setModalCustom(true)}
                                    className='mt-4 text-[14px] font-[500] w-[155px] bg-BlueHomz text-white py-2 rounded-[4px]'>
                                    Customize settings
                                </button>
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

export default Settings;