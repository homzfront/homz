import React, { useEffect, useState } from 'react';
import DropDownChannel from './dropDownChannel';
import CustomizeModal from '@/components/mainmenu/CustomizedModal';
import Image from 'next/image';
import RichTextEditorEmail from './richTextEditorEmail';
import RichTextEditorSMS from './richTextEditorSMS';
import RichTextEditorInApp from './richTextEditorInApp';
import api from '@/utils/api';
import { toast } from 'react-toastify';
import LoadingFormII from '@/components/mainmenu/loadingFormII';

const CustomizeSettings = ({ setCustomizeSettings, data, fetchDataAgain }) => {
    const [channels, setChannels] = useState([]);
    const [modalConfirmChanges, setModalConfirmChanges] = useState(false);
    const [modalSave, setModalSave] = useState(false);
    const [openCompleted, setOpenCompleted] = useState(false);
    const [channeSettings, setChannelSettings] = useState(null);
    const [isSMSPresent, setIsSMSPresent] = useState(null);
    const [isEmailPresent, setIsEmailPresent] = useState(null);
    const [isInAppPresent, setIsInAppPresent] = useState(null);
    const [backendData, setBackendData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingII, setLoadingII] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [emailContent, setEmailContent] = useState(data?.emailContent);
    const [SMSContent, setSMSContent] = useState(data?.smsContent);
    const [inAppContent, setInAppContent] = useState(data?.inAppContent);

    // console.log(data)

    const [copyToInApp, setCopyToInApp] = useState({
        propertyManager: data?.sendCopyToInApp?.propertyManager || false,
        propertyOwner: data?.sendCopyToInApp?.landlord || false,
    });

    const [copyToEmail, setCopyToEmail] = useState({
        propertyManager: data?.sendCopyToEmail?.propertyManager || false,
        propertyOwner: data?.sendCopyToEmail?.landlord || false,
    })

    const [copyToSMS, setCopyToSMS] = useState({
        propertyManager: data?.sendCopyToSMS?.propertyManager || false,
        propertyOwner: data?.sendCopyToSMS?.landlord || false,
    });

    const handleCheckboxChangeForInAPP = (e) => {
        const { name, checked } = e.target;
        setCopyToInApp((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleCheckboxChangeEmail = (e) => {
        const { name, checked } = e.target;
        setCopyToEmail((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleCheckboxChangeSMS = (e) => {
        const { name, checked } = e.target;
        setCopyToSMS((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const optionII = [
        { id: 1, label: "All" },
        { id: 2, label: "In-App" },
        { id: 3, label: "Email" },
        { id: 4, label: "SMS" },
    ];

    const submittedData =
    {
        "channels": backendData?.channels,
        "emailMessage": {
            "sendCopyTo": {
                "propertyManager": copyToEmail?.propertyManager,
                "landlord": copyToEmail?.propertyOwner,
            },
            "content": emailContent
        },
        "smsMessage": {
            "sendCopyTo": {
                "propertyManager": copyToSMS?.propertyManager,
                "landlord": copyToSMS?.propertyOwner
            },
            "content": SMSContent
        },
        "inAppMessage": {
            "sendCopyTo": {
                "propertyManager": copyToInApp?.propertyManager,
                "landlord": copyToInApp?.propertyOwner
            },
            "content": inAppContent
        }
    };

    // console.log(emailContent)

    useEffect(() => {
        if (selectedChannel?.length > 0) {
            const isAllSelected = selectedChannel.some((channel) => channel.label === 'All');
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
        if (submittedData) {
            try {
                const response = await api.patch(
                    `/rentReminder/${channeSettings?._id}/single`,
                    submittedData
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

    const restoreDefaultReminder = async () => {
        setLoadingII(true);
        if (data) {
            try {
                const defaultSettings = {
                    "name": data?.reminderName,
                    "interval": data?.interval,
                    "duration": data?.duration ? data?.duration : 0,
                    "type": data?.type,
                    "templateType": data?.templateType

                }
                const response = await api.patch(
                    `/rentReminder/${data?._id}/default`,
                    defaultSettings
                );
                fetchDataAgain();
                setCustomizeSettings(false)
                return response;
            } catch (error) {
                setLoadingII(false);
                toast.error("Failed to restore default settings")
                throw error;
            } finally {
                setLoadingII(false);
            }
        }
    };

    return (
        <div>
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
                    <div className={`flex flex-col justify-around items-center h-full p-6 ${loadingII ? "pointer-events-none" : ""}`}>
                        <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
                            Restore Default Settings
                        </h1>
                        <p className="text-[16px] font-[500] text-GrayHomz text-center">
                            Are you sure you want to restore the system’s default settings?
                        </p>
                        <button
                            onClick={restoreDefaultReminder}
                            className={`mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500] ${loadingII ? "pointer-events-none w-full flex justify-center" : ""} `}
                            >
                            {loadingII ? <LoadingFormII /> : "Proceed"}
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
            <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                <div className="flex flex-col md:w-[50%] w-full  gap-2">
                    <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                        Set reminder channel(s) <span className="text-red-600">*</span>
                    </p>
                    <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                        Select the channels through which your tenants would receive rent due reminders.
                    </p>
                </div>
                <div className="md:w-[50%] w-full">
                    <DropDownChannel
                        setData={setSelectedChannel}
                        setBackendData={setBackendData}
                        channelSettings={channeSettings}
                        options={optionII}
                        onSelect={(options) => setChannels(options)}
                        selectOption={
                            channels.length === 0 ? "Select Channel(s)" : channels?.map((channel) => channel.label).join(", ")
                        }
                        className="text-[14px] font-[500] text-GrayHomz2 md:w-[236px] w-full"
                    />
                </div>
            </div>
            {isEmailPresent && (
                <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                    <div className="flex flex-col md:w-[50%] w-full gap-2">
                        <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                            Email Reminder Message<span className="text-red-600">*</span>
                        </p>
                        <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                            Type in your preferred reminder message for emails
                        </p>
                    </div>
                    <div className='md:w-[50%] w-full flex flex-col gap-2'>
                        <div className='py-3 px-4 flex items-center border border-GrayHomz text-GrayHomz rounded-[4px]'>
                            <p className='text-[14px] font-[400]'>{data?.emailReminder}</p>
                        </div>
                        <RichTextEditorEmail charLimit={1200} text={data?.emailContent} setEditorHtml={setEmailContent} editorHtml={emailContent} />
                        <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 text-[13px] font-[400] text-GrayHomz">
                            <div>Send copy to :</div>
                            <div className='flex gap-2'>
                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        name="propertyManager"
                                        checked={copyToEmail.propertyManager}
                                        onChange={handleCheckboxChangeEmail}
                                    />
                                    <p>Property Manager</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        name="propertyOwner"
                                        checked={copyToEmail.propertyOwner}
                                        onChange={handleCheckboxChangeEmail}
                                    />
                                    <p>Property Owner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isSMSPresent && (
                <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between border-b py-4 w-[100%]">
                    <div className="flex flex-col md:w-[50%] w-full gap-2">
                        <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                            SMS Reminder Message<span className="text-red-600">*</span>
                        </p>
                        <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                            Type in your preferred reminder message for SMS
                        </p>
                    </div>
                    <div className="md:w-[50%] w-full">
                        <div className='w-full flex flex-col gap-2'>
                            <div className='py-3 px-4 flex items-center border border-GrayHomz text-GrayHomz rounded-[4px]'>
                                <p className='text-[14px] font-[400]'>{data?.sms_label}</p>
                            </div>
                            <RichTextEditorSMS charLimit={150} text={data?.smsContent} editorHtml={SMSContent} setEditorHtml={setSMSContent} />
                        </div>
                        {/* <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 text-[13px] font-[400] text-GrayHomz">
                            <div>Send copy to :</div>
                            <div className='flex gap-2'>
                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        name="propertyManager"
                                        checked={copyToSMS.propertyManager}
                                        onChange={handleCheckboxChangeSMS}
                                    />
                                    <p>Property Manager</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        name="propertyOwner"
                                        checked={copyToSMS.propertyOwner}
                                        onChange={handleCheckboxChangeSMS}
                                    />
                                    <p>Property Owner</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            )}
            {isInAppPresent && (
                <div className="border-b py-4 w-[100%]">
                    <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between">
                        <div className="flex flex-col md:w-[50%] w-full gap-2">
                            <p className="text-[14px] text-[500] leading-[24px] text-BlueHomz">
                                In-App Reminder Notification<span className="text-red-600">*</span>
                            </p>
                            <p className="text-[13px] leading-[19.5px] text-[400] text-GrayHomz">
                                Type in your preferred reminder message for In-App notifications
                            </p>
                        </div>
                        <div className='md:w-[50%] w-full flex flex-col gap-2'>
                            <div className='py-3 px-4 flex items-center border border-GrayHomz text-GrayHomz rounded-[4px]'>
                                <p className='text-[14px] font-[400]'>{data?.in_app}</p>
                            </div>
                            <RichTextEditorInApp charLimit={150} text={data?.inAppContent} editorHtml={inAppContent} setEditorHtml={setInAppContent} />
                            <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2 text-[13px] font-[400] text-GrayHomz">
                                <div>Send copy to :</div>
                                <div className='flex gap-2'>
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="propertyManager"
                                            checked={copyToInApp.propertyManager}
                                            onChange={handleCheckboxChangeForInAPP}
                                        />
                                        <p>Property Manager</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            name="propertyOwner"
                                            checked={copyToInApp.propertyOwner}
                                            onChange={handleCheckboxChangeForInAPP}
                                        />
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

export default CustomizeSettings;
