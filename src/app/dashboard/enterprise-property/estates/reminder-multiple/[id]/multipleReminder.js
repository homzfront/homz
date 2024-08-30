import ArrowLeftII from "@/components/icons/arrowLeftII";
import PinNoti from "@/components/icons/pinNoti";
import ToggleButton from "@/pages/dashboard/enterprise/components/toggle";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Settings from "./components/settings";
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";
import Data from "./components/reminderData";
import useEstateRentRemindersStore from "@/store/enterpriseStore/useEstateRentReminder";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const MultipleReminder = ({ ids }) => {
    const router = useRouter();
    const { data, fetchData, error } = useEstateRentRemindersStore();
    const [toggleStates, setToggleStates] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    const [openCompleted, setOpenCompleted] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});

    const handleSetting = (id) => {
        setSelectedId((prevId) => (prevId === id ? null : id));
    };

    const isAnyToggleActive = Object?.values(toggleStates)?.some(value => value);

    useEffect(() => {
        if (ids && ids.trim() !== "") {
            fetchData(ids);
        }
    }, [ids, fetchData]);

    const fetchDataAgain = () => { fetchData(ids); }

    const handleToggle = async (data) => {
        const id = data?.id
        setLoadingStates((prevState) => ({
            ...prevState,
            [id]: true,
        }));
        if (data?.status === 'active') {
            const status = {
                status: "inactive"
            }
            try {
                const response = await api.post(
                    `/rentReminder/${data?._id}/single/toggle`,
                    status
                );
                fetchDataAgain();
                setToggleStates((prevState) => ({
                    ...prevState,
                    [id]: !prevState[id],
                }));
                setLoadingStates((prevState) => ({
                    ...prevState,
                    [id]: false,
                }));
                toast.success(`${data?.reminderDate} Deactivated`);
            } catch (error) {
                if (
                    error?.response?.data?.error?.errors &&
                    error.response.data.error.errors.length > 0
                ) {
                    const errorMessage = error.response.data.error.errors[0];
                    toast.error(`${errorMessage}`);
                } else if (error?.response?.data?.message) {
                    const errorMessage = error.response.data.message;
                    toast.error(`${errorMessage}`);
                } else {
                    toast.error("failed to toggle reminder");
                }
            }
        } else {
            const status = {
                status: "active"
            }
            try {
                const response = await api.post(
                    `/rentReminder/${data?._id}/single/toggle`,
                    status
                );
                fetchDataAgain();
                setToggleStates((prevState) => ({
                    ...prevState,
                    [id]: !prevState[id],
                }));
                setLoadingStates((prevState) => ({
                    ...prevState,
                    [id]: false,
                }));
                toast.success(`${data?.reminderDate} Activated`)
            } catch (error) {
                if (
                    error?.response?.data?.error?.errors &&
                    error.response.data.error.errors.length > 0
                ) {
                    const errorMessage = error.response.data.error.errors[0];
                    toast.error(`${errorMessage}`);
                } else if (error?.response?.data?.message) {
                    const errorMessage = error.response.data.message;
                    toast.error(`${errorMessage}`);
                } else {
                    toast.error("failed to toggle reminder");
                }
            }
        }

    };

    const combinedData = Data.map((item) => {
        const correspondingItem = data?.data?.find((d) => d.name === item.name || d.name === item.name2);
        if (correspondingItem) {
            return {
                ...item,
                channels: correspondingItem?.channels || [],
                sendCopyToEmail: correspondingItem?.emailMessage?.sendCopyTo || [],
                sendCopyToSMS: correspondingItem?.smsMessage?.sendCopyTo || [],
                sendCopyToInApp: correspondingItem?.inAppMessage?.sendCopyTo || [],
                emailContent: correspondingItem?.emailMessage?.content || '',
                smsContent: correspondingItem?.smsMessage?.content || '',
                inAppContent: correspondingItem?.inAppMessage?.content || '',
                _id: correspondingItem?._id || '',
                status: correspondingItem?.status || '',
                interval: correspondingItem?.interval || '',
                duration: correspondingItem?.duration || '',
                type: correspondingItem?.type || '',
                templateType: correspondingItem?.templateType || '',
                reminderName: correspondingItem?.name || '',
            };
        }
        return item;
    });

    const routeToTenantPage = () => {
        router.push("/dashboard/enterprise-property/tenants")
    };

    return (
        <div className="flex flex-col gap-4">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeButton={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <CustomizeModal isOpen={openCompleted}>
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
                            }}
                            className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </CustomizeModal>
            <div className="p-8 border-b flex flex-col gap-4">
                <Link href="/dashboard/enterprise-property/estates">
                    <button className="flex items-center gap-1">
                        <ArrowLeftII />
                        <span className=" text-gray-400 text-[14px]">Go Back</span>
                    </button>
                </Link>
                <div className="w-full p-4 bg-BlueHomz rounded-[8px] flex flex-col gap-2">
                    <p className="text-[20px] font-[500] text-white">
                        Rent Due Reminder
                    </p>
                    <p className="text-[16px] font-[400] text-walletBg">
                        Set rent due reminders to ensure your tenants receive timely notifications.
                    </p>
                </div>
            </div>
            <div className="px-8 flex flex-col gap-4 ">
                <div className="w-full p-4 bg-inputBg rounded-[8px] flex justify-between gap-4 md:gap-0 items-start md:items-center">
                    <div className="flex gap-2 items-center">
                        <PinNoti />
                        <p className="text-GrayHomz text-[16px] font-[400] hidden md:block">
                            Note that this feature can only be applied when you have set a rent due date for your tenant
                        </p>
                    </div>
                    <div className="">
                        <p className={`text-GrayHomz text-[16px] font-[400] md:hidden`}>
                            Note that this feature can only be applied when you have set a rent due date for your tenant
                        </p>
                        <button onClick={routeToTenantPage} className="text-BlueHomz text-[14px] font-[500]">
                            Set your tenant rent due date
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {data?.data?.length > 0 && combinedData?.map((data) => (
                        <div key={data.id}>
                            <div className="w-full p-4 bg-walletBg border border-BlueHomz rounded-[8px]">
                                <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div className="flex gap-2 md:gap-4">
                                        <ToggleButton
                                            loading={loadingStates[data.id] || false}
                                            onToggle={() => handleToggle(data)}
                                            isOpen={data?.status === 'active' ? true : false}
                                        />
                                        <div className="flex flex-col">
                                            <div>
                                                <p className="text-[16px] font-[500] text-BlueHomz">
                                                    {data.reminderDate}
                                                </p>
                                                <p className="text-[14px] font-[500] text-BlackHomz">
                                                    {data.tenant}
                                                </p>
                                            </div>
                                            <div className="md:hidden mt-2">
                                                <button
                                                    onClick={() => handleSetting(data.id)}
                                                    className="text-BlueHomz"
                                                >
                                                    {selectedId === data.id ? "Close settings" : "View settings"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <button
                                            onClick={() => handleSetting(data.id)}
                                            className="text-BlueHomz"
                                        >
                                            {selectedId === data.id ? "Close settings" : "View settings"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {selectedId === data.id && (
                                <div className="my-2 px-4 bg-white border border-lightblue rounded-[8px]">
                                    <Settings fetchDataAgain={fetchDataAgain} data={data} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default MultipleReminder