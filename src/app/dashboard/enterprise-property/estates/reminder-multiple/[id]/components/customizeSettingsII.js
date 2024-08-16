import React, { useEffect, useState } from 'react';
import DropDownReminder from './dropDownReminder';
import DropDownChannel from './dropDownChannel';
import CustomizeModal from '@/components/mainmenu/CustomizedModal';
import Image from 'next/image';
import RichTextEditorEmail from './richTextEditorEmail';
import RichTextEditorSMS from './richTextEditorSMS';
import RichTextEditorInApp from './richTextEditorInApp';
import { toast } from 'react-toastify';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import api from '@/utils/api';

const CustomizeSettingsII = ({ setCustomizeSettings, data, fetchDataAgain }) => {
    const [time, setTime] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [channels, setChannels] = useState([]);
    const [modalConfirmChanges, setModalConfirmChanges] = useState(false);
    const [modalSave, setModalSave] = useState(false);
    const [openCompleted, setOpenCompleted] = useState(false);
    const [frequency, setFrequency] = useState(null);
    const [channeSettings, setChannelSettings] = useState(null);
    const [isSMSPresent, setIsSMSPresent] = useState(null);
    const [isEmailPresent, setIsEmailPresent] = useState(null);
    const [isInAppPresent, setIsInAppPresent] = useState(null);
    const [backendData, setBackendData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(null);


    const optionII = [
        { id: 1, label: "All" },
        { id: 2, label: "In-App" },
        { id: 3, label: "Email" },
        { id: 4, label: "SMS" },
    ];

    const optionIII = [
        { id: 1, label: "Every day" },
        { id: 2, label: "Every 3 days" },
        { id: 3, label: "Every week" },
        { id: 4, label: "Every 2 weeks" },
        { id: 5, label: "Every month" },
    ]

    useEffect(() => {
        if (selectedChannel?.length > 0) {
            const isAllSelected = selectedChannel.some((channel) => channel.label === 'All');
            //   setIsAllSelected(isAllSelected);
            const isSMSPresent = isAllSelected || selectedChannel.some((channel) => channel.label === 'SMS');
            setIsSMSPresent(isSMSPresent);
            const isEmailPresent = isAllSelected || selectedChannel.some((channel) => channel.label === 'Email');
            setIsEmailPresent(isEmailPresent);
            const isInAppPresent = isAllSelected || selectedChannel.some((channel) => channel.label === 'In-App');
            setIsInAppPresent(isInAppPresent);
        }
    }, [selectedChannel]);

    useEffect(() => {
        const sendIdAndChannels = (data) => {
            if (data) {
                const { _id, channels } = data;
                const newData = {
                    _id,
                    channels
                };
                setChannelSettings(newData)
            }
        }
        sendIdAndChannels(data);
    }, [])

    const handleCustomizeChanges = async () => {
        setLoading(true)
        if (backendData) {
            try {
                const response = await api.patch(
                    `/rentReminder/${channeSettings?._id}/single`,
                    backendData
                );
                setOpenCompleted(true);
                setLoading(false);
                fetchDataAgain();
                return response;
            } catch (error) {
                setLoading(false);
                throw error;
            }
        }
        else {
            toast.error("failed to update channels")
            setLoading(false);
            setModalConfirmChanges(false);
        }
    };


    return (
        <div className='w-full'>
            <CustomizeModal isOpen={modalConfirmChanges}>
                {openCompleted ? (
                    <div className="p-2 m-auto bg-white h-auto rounded-md">
                        <div className="mt-[-10px] md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
                            <Image
                                src="/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                                alt=""
                                height={48}
                                width={48}
                            />
                            <h1 className="text-BlackHomz text-center font-[700] text-[20px]">Reminder Settings Saved</h1>
                            <p className="text-[16px] font-[400] text-GrayHomz text-center">Tenants will now receive reminders to prompt swift rent payment</p>
                            <button
                                onClick={() => {
                                    setOpenCompleted(false);
                                    setModalConfirmChanges(false);
                                }}
                                className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-[464px] p-2 m-auto bg-white h-auto rounded-md">
                        <div className={`flex flex-col justify-around items-center h-full p-6 ${loading ? "pointer-events-none" : ""}`}>
                            <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
                                Change System Settings
                            </h1>
                            <p className="text-[16px] font-[500] text-GrayHomz text-center">
                                Are you sure you want to change the system’s default settings?
                            </p>
                            <button
                                onClick={handleCustomizeChanges}
                                className={`mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500] ${loading ? "pointer-events-none w-full flex justify-center" : ""} `}
                            >
                                {loading ? <LoadingFormII /> : "Proceed"}
                            </button>
                            <button
                                onClick={() => setModalConfirmChanges(false)}
                                className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </CustomizeModal>
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
                            onClick={() => setCustomizeSettings(false)}
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
            {/* <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                <div className="flex flex-col w-[100%] md:w-[50%] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Date before/after due date <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Select your preferred date for reminder(s) to be sent out
                    </p>
                </div>
                <div className="w-full md:w-[50%]">
                    <DropDownReminder
                        options={options}
                        onSelect={(option) => setDueDate(option)}
                        selectOption={
                            dueDate === null ? "Select reminder date" : dueDate.label
                        }
                        className="text-[14px] font-[500] text-GrayHomz2 md:w-[236px] w-full"
                    />
                </div>
            </div> */}
            {/* <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                <div className="flex flex-col w-[100%] md:w-[50%] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Frequency <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Set how frequent you want your tenant(s) to receive this reminder
                    </p>
                </div>
                <div className="w-full md:w-[50%]">
                    <DropDownReminder
                        options={optionIII}
                        onSelect={(option) => setFrequency(option)}
                        selectOption={
                            frequency === null ? "Select frequency" : frequency.label
                        }
                        className="text-[14px] font-[500] text-GrayHomz2 md:w-[236px] w-full"
                    />
                </div>
            </div> */}
            {/* <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                <div className="flex flex-col w-[100%] md:w-[50%] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Time <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Enter your preferred time for reminder(s) to be sent out
                    </p>
                </div>
                <div className="w-full md:w-[50%]">
                    <input
                        type="time"
                        id="remindTime"
                        name="remindTime"
                        required
                        placeholder="00:00 AM"
                        className="md:w-[236px] w-full h-[55px] rounded-[4px] text-GrayHomz border border-GrayHomz px-2"
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
            </div> */}
            <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                <div className="flex flex-col w-[100%] md:w-[50%] gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Set reminder channel(s) <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Select the channels through which your tenants would receive rent due reminders.
                    </p>
                </div>
                <div className="w-full md:w-[50%]">
                    <DropDownChannel
                        setData={setSelectedChannel}
                        setBackendData={setBackendData}
                        channelSettings={channeSettings}
                        options={optionII}
                        onSelect={(options) => setChannels(options)}
                        selectOption={
                            channels.length === 0 ? "Select Channel(s)" : channels.map((channel) => channel.label).join(", ")
                        }
                        className="text-[14px] font-[500] text-GrayHomz2 md:w-[236px] w-full"
                    />
                </div>
            </div>
            {isEmailPresent && (
                <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                    <div className="flex flex-col w-full md md:w-[50%] gap-2">
                        <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                            Email Reminder Message<span className="text-red-600">*</span>
                        </p>
                        <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                            Type in your preferred reminder message for emails
                        </p>
                    </div>
                    <div className='w-full md:w-[50%] flex flex-col gap-2'>
                        <div className='py-3 px-4 flex items-center border border-GrayHomz text-GrayHomz rounded-[4px]'>
                            <p className='text-[14px] font-[400]'>{data?.emailReminder}</p>
                        </div>
                        <RichTextEditorEmail charLimit={500} text={data?.emailContent} />
                        <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 text-[13px] font-[400] text-GrayHomz">
                            <div>
                                Send copy to :
                            </div>
                            <div className='flex gap-2'>
                                <div className="flex items-center gap-1">
                                    <input type="radio" name="sms-copy" />
                                    <p>Property Manager</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input type="radio" name="sms-copy" />
                                    <p>Property Owner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isSMSPresent && (
                <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                    <div className="flex flex-col w-full md:w-[50%] gap-2">
                        <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                            SMS Reminder Message<span className="text-red-600">*</span>
                        </p>
                        <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                            Type in your preferred reminder message for SMS
                        </p>
                    </div>
                    <div className="w-full md:w-[50%]">
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='py-3 px-4 flex items-center border border-GrayHomz text-GrayHomz rounded-[4px]'>
                                <p className='text-[14px] font-[400]'>{data?.sms_label}</p>
                            </div>
                            <RichTextEditorSMS charLimit={150} text={data?.smsContent} />
                        </div>
                        <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 text-[13px] font-[400] text-GrayHomz">
                            <div>
                                Send copy to :
                            </div>
                            <div className='flex gap-2'>
                                <div className="flex items-center gap-1">
                                    <input type="radio" name="sms-copy" />
                                    <p>Property Manager</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input type="radio" name="sms-copy" />
                                    <p>Property Owner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isInAppPresent && (
                <div className="border-b py-4 w-[100%]">
                    <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between">
                        <div className="flex flex-col w-full md:w-[50%] gap-2">
                            <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                                In-App Reminder Notification<span className="text-red-600">*</span>
                            </p>
                            <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                                Type in your preferred reminder message for In-App notifications
                            </p>
                        </div>
                        <div className='w-full md:w-[50%] flex flex-col gap-2'>
                            <div className='py-3 px-4 flex items-center border border-GrayHomz text-GrayHomz rounded-[4px]'>
                                <p className='text-[14px] font-[400]'>{data?.in_app}</p>
                            </div>
                            <RichTextEditorInApp charLimit={150} text={data?.inAppContent} />
                            <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 text-[13px] font-[400] text-GrayHomz">
                                <div>
                                    Send copy to :
                                </div>
                                <div className='flex gap-2'>
                                    <div className="flex items-center gap-1">
                                        <input type="radio" name="sms-copy" />
                                        <p>Property Manager</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <input type="radio" name="sms-copy" />
                                        <p>Property Owner</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-4 pb-4 flex flex-col md:flex-row gap-2 items-center">
                <button
                    onClick={() => setModalConfirmChanges(true)}
                    className="text-[14px] font-[500] w-full md:w-[155px] bg-BlueHomz text-white py-2 rounded-[4px]"
                >
                    Save changes
                </button>
                <button
                    onClick={() => setModalSave(true)}
                    className="text-[14px] font-[500] w-full md:w-[185px] text-BlueHomz hover:border border-BlueHomz py-2 rounded-[4px]"
                >
                    Restore default settings
                </button>
            </div>
        </div>
    );
};

export default CustomizeSettingsII;
