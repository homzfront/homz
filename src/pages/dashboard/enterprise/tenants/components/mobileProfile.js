import RightArrow from '@/components/icons/dashboardMobile/rightArrow';
import MobileBackButton from '@/components/icons/mobileBackButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSearchParams } from "next/navigation";
import PaymentHis from '../secondPage/paymentHis';
import RentInfo from '../secondPage/rentInfo';
import Maintenance from '../secondPage/maintenance';
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import AcAndRejModel from "../../components/acAndRejModel";
import WarningIcon from '@/components/icons/warningIcon';
import { toast } from "react-toastify";
import { tenantOnboardingAccept, tenantOnboardingReject } from "@/api/tenantSevice";
import TickSuccess from "@/components/icons/tickSuccess";
import ArrowRightSmall from '@/components/icons/arrowRightSmall';
import RentPeriodForm from '../secondPage/rentPeriodForm';

const MobileProfile = ({
    tenantId,
    rentInfo,
    tenantData,
    fetchTenantData,
    fetchRentInformation,
    setRentInfo,
    reFetchSummaryData,
    paymentData,
    openKYC,
    setOpenKYC,
}) => {
    const urlParams = useSearchParams();
    const [openCancel, setOpenCancel] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const tab = urlParams.get("tab")
    const [showWidget, setShowWidget] = useState(false);
    const [active, setActive] = useState(tab ? tab === 'rentInfo' : true);
    const [activeTwo, setActiveTwo] = useState(tab === 'paymentHis');
    const [activeThree, setActiveThree] = useState(tab === 'maintenance');
    const [isAccepting, setIsAccepting] = React.useState(false)
    const [isRejecting, setIsRejecting] = React.useState(false)
    const [reason, setReason] = React.useState("")
    const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] = React.useState(false)

    const handleReject = async () => {
        if (isRejecting) return;
        setIsRejecting(true);
        const payload = {
            rejectionReason: reason,
        }
        try {
            const { success, error } = await tenantOnboardingReject(tenantData?.data?._id, payload);

            if (success) {
                setIsRejecting(false);
                setIsOpenDeleteConfirmation(false);
                setOpenCancel(false)
                toast.success("KYC rejected!")
                fetchTenantData()
            } else {
                toast.error(error);
                setIsRejecting(false);
            }
        } catch (error) {
            setIsRejecting(false);
            toast.error("Failed");
        }
    };



    const handleAccept = async () => {
        if (isAccepting) return;
        setIsAccepting(true);
        try {
            const { success, error } = await tenantOnboardingAccept(tenantData?.data?._id);
            if (success) {
                setIsAccepting(false);
                setIsOpen(false);
                toast.success("KYC accepted!")
                fetchTenantData()
            } else {
                toast.error(error);
                setIsAccepting(false);
            }
        } catch (error) {
            setIsAccepting(false);
            toast.error("Failed");
        }
    };


    const route = useRouter()

    const goBack = () => {
        if (showWidget) {
            setShowWidget(false)
        } else {
            route.back();
        }
    };

    const handleRent = () => {
        setActiveTwo(false);
        setActiveThree(false);
        setActive(true);
    };

    const handlePaymentHis = () => {
        setActiveTwo(true);
        setActive(false);
        setActiveThree(false);
    };

    const handleMaintain = () => {
        setActiveThree(true);
        setActiveTwo(false);
        setActive(false);
    };

    return (
        <div className='p-8 flex flex-col gap-2'>
            <CustomizedModal isOpen={openCancel} onRequestClose={() => setOpenCancel(false)}>
                <div className="bg-white p-6 rounded-[12px] max-w-[600px] w-full">
                    <div className="">
                        <p className="text-sm font-medium text-BlackHomz">
                            Provide a reason for rejection
                        </p>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="mt-2 placeholder:text-GrayHomz2 placeholder:text-[11px] sm:placeholder:text-[13px] p-2 h-[65px] w-full border"
                            placeholder="E.g. The uploaded guarantor ID is unclear. Please upload a valid ID"
                        />
                    </div>
                    <div className="flex mt-2 w-full sm:justify-end text-sm">
                        <div className="flex gap-2 w-full sm:w-[50%] justify-end">
                            <button onClick={() => setOpenCancel(false)} className="w-full sm:w-auto p-2 text-GrayHomz">
                                Cancel
                            </button>
                            <button onClick={() => setIsOpenDeleteConfirmation(true)} className="w-full sm:w-auto sm:min-w-[140px] p-2 rounded-[6px] bg-[#D92D20] text-[#FDF2F2]">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </CustomizedModal>
            <CustomizedModal isOpen={isOpenDeleteConfirmation} onRequestClose={() => setIsOpenDeleteConfirmation(false)}>
                <AcAndRejModel
                    header={"Confirm Rejection"}
                    body={"Are you sure you want to reject this tenant's submission? This action is final and cannot be undone."}
                    button={"Proceed"}
                    buttonTwo={"Cancel"}
                    loading={isRejecting}
                    returnHome={() => handleReject()}
                    returnHomeTwo={() => setIsOpenDeleteConfirmation(false)}
                />
            </CustomizedModal>
            <CustomizedModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                <AcAndRejModel
                    header={"Confirm Approval"}
                    body={"Are you sure you want to approve this tenant's submission? This action is final and cannot be undone."}
                    button={"Proceed"}
                    buttonTwo={"Cancel"}
                    loading={isAccepting}
                    returnHome={() => handleAccept()}
                    returnHomeTwo={() => setIsOpen(false)}
                />
            </CustomizedModal>
            <div className='flex gap-4 items-center'>
                <div onClick={goBack} className='cursor-pointer'>
                    <div className='w-[28px] h-[28px] bg-walletBg rounded-[8px] flex justify-center items-center'>
                        <MobileBackButton />
                    </div>
                </div>
                <p className='text-[16px] font-[400] text-BlackHomz'>
                    Tenant Profile
                </p>
            </div>
            {showWidget
                ?
                <div>
                    <div className="flex flex-col gap-2 mt-8 w-full">
                        <div className="flex flex-wrap gap-[15px] w-full">
                            <button
                                onClick={handleRent}
                                className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${active
                                    ? "inline-block shadow-md bg-[#006AFF] text-white "
                                    : "bg-[#EEF5FF] text-[#006AFF]"
                                    }`}
                            >
                                Rent Information
                            </button>
                            <button
                                onClick={handlePaymentHis}
                                className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeTwo
                                    ? "inline-block shadow-md bg-[#006AFF] text-white "
                                    : "bg-[#EEF5FF] text-[#006AFF]"
                                    }`}
                            >
                                Payment History
                            </button>
                            <button
                                onClick={handleMaintain}
                                className={`py-[8px] px-[12px] rounded-[4px] text-[11px] ${activeThree
                                    ? "inline-block shadow-md bg-[#006AFF] text-white "
                                    : "bg-[#EEF5FF] text-[#006AFF]"
                                    }`}
                            >
                                Maintenance request
                                <span
                                    className={` rounded-[40%] w-auto py-1 px-2 ml-2 ${activeThree
                                        ? "bg-white text-GrayHomz"
                                        : "text-white bg-BlueHomz"
                                        }`}
                                >
                                    {tenantData?.data?.maintenanceRequests ? tenantData?.data?.maintenanceRequests?.length : "0"}
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="my-7 rounded-[12px] w-full">
                        <div className={`${active ? "inline" : "hidden"}`}>
                            <RentPeriodForm
                                fetchTenantData={fetchTenantData}
                                fetchRentInformation={fetchRentInformation}
                                setRentInfo={setRentInfo}
                                rentInfo={rentInfo}
                                tenantData={tenantData}
                            />
                        </div>
                        <div className={`${activeTwo ? "inline" : "hidden"}`}>
                            <PaymentHis
                                tenantId={tenantId}
                                tenantData={tenantData}
                                rentInfo={rentInfo}
                                fetchRentInformation={fetchRentInformation}
                                reFetchSummaryData={reFetchSummaryData}
                                paymentData={paymentData}
                            />
                        </div>
                        <div className={`${activeThree ? "inline" : "hidden"} w-full`}>
                            <Maintenance
                                tenantData={tenantData}
                            />
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div className='mt-4 bg-inputBg rounded-[12px] px-4 py-6'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className="">
                                {tenantData?.data?.coverPhoto?.url ? (
                                    <Image
                                        src={tenantData?.data?.coverPhoto?.url}
                                        height={198}
                                        width={198}
                                        alt=""
                                        layout="full"
                                        objectFit="cover"
                                        objectPosition="center"
                                        className="object-cover bg-center h-[198px] rounded-full"
                                        quality={100}
                                        priority
                                    />
                                ) : (
                                    <div className="w-[198px] h-[198px] bg-GrayHomz5 rounded-full flex items-center justify-center">
                                        <Image
                                            src="/static/dashboard/enterprisemanager/profile/user.png"
                                            height={52}
                                            width={52}
                                            alt="img"
                                        />
                                    </div>
                                )}
                            </div>
                            <h1 className="font-[700] my-2 text-[20px] text-GrayHomz">
                                {tenantData?.data?.fullName}
                            </h1>
                        </div>
                        <div className="mt-2 flex flex-col gap-2">
                            <div className="flex justify-between gap-3">
                                <p className="text-[13px] font-[400] text-GrayHomz">Phone No</p>
                                <p className="text-[13px] font-[500] text-end text-BlackHomz w-[62%]">
                                    {tenantData?.data?.phoneNumber}
                                </p>
                            </div>
                            <div className="flex justify-between gap-3">
                                <p className="text-[13px] font-[400] text-GrayHomz">Email</p>
                                <p className="text-[13px] font-[500] text-end break-words text-BlackHomz w-[62%]">
                                    {tenantData?.data?.user?.email}
                                </p>
                            </div>
                            <div className="flex justify-between gap-3">
                                <p className="text-[13px] font-[400] text-GrayHomz">Home Address</p>
                                <p className="text-[13px] font-[500] text-end text-BlackHomz break-words w-[62%]">
                                    {tenantData?.data?.houseAddress}
                                </p>
                            </div>
                        </div>
                        <div className={`bg-[#F6F6F6] rounded-[8px] mt-2 p-4 text-sm font-normal ${tenantData?.data?.verification?.status === "pending" ? "" : "hidden"}`}>
                            <p className="text-[13px] text-BlackHomz pb-2">
                                Tenant KYC
                            </p>
                            <div className="flex gap-2 bg-white rounded-[4px] p-2 w-full text-xs">
                                <button className="w-[60%] h-[45px] rounded-[4px] text-warning2 flex justify-center items-center gap-2">
                                    <WarningIcon />
                                    Pending Review
                                </button>
                                <button onClick={() => setOpenKYC(true)} className="w-[40%] h-[45px] rounded-[4px] bg-whiteblue text-BlueHomz flex justify-center items-center gap-2">
                                    View KYC
                                    <ArrowRightSmall className="#006AFF" />
                                </button>
                            </div>
                            <div className="flex gap-2 mt-2 w-full text-xs">
                                <button onClick={() => setIsOpen(true)} className="w-[50%] rounded-[4px] h-[40px] bg-Success text-successBg">
                                    Approve
                                </button>
                                <button onClick={() => setOpenCancel(true)} className="w-[50%] rounded-[4px] h-[40px] border border-error text-error">
                                    Reject with reason
                                </button>
                            </div>
                        </div>
                        <div className={`bg-[#F6F6F6] rounded-[8px] mt-2 p-4 text-xs font-normal ${tenantData?.data?.verification?.status === "approved" || tenantData?.data?.verification?.status === "rejected" ? "" : "hidden"}`}>
                            <p className="text-[13px] text-BlackHomz pb-2">
                                Tenant KYC
                            </p>
                            <div className="flex gap-2 bg-white rounded-[4px] p-2 w-full">
                                <button className={`w-[60%] h-[45px] rounded-[4px] flex justify-start items-center gap-2 ${tenantData?.data?.verification?.status === "approved" ? "text-Success" : "text-error"}`}>
                                    {tenantData?.data?.verification?.status === "approved" ? <TickSuccess /> : <WarningIcon className="#d92d20" />}
                                    {tenantData?.data?.verification?.status === "approved" ? "Approved" : "Rejected"}
                                </button>
                                <button onClick={() => setOpenKYC(true)} className="w-[40%] h-[45px] rounded-[4px] bg-whiteblue text-BlueHomz flex justify-center items-center gap-2">
                                    View KYC
                                    <ArrowRightSmall className="#006AFF" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6 w-full bg-GrayHomz6 rounded-[12px] text-[14px] font-[500] text-BlackHomz'>
                        <div className='px-4 h-[60px] flex items-center justify-between border-GrayHomz2 border-b-[1px] w-full'>
                            Rent Information
                            <div
                                onClick={() => {
                                    setShowWidget(true)
                                    handleRent()
                                }}
                                className='cursor-pointer'
                            >
                                <RightArrow />
                            </div>
                        </div>
                        <div className='px-4 h-[60px] flex items-center border-GrayHomz2 border-b-[1px] justify-between w-full'>
                            Payment History
                            <div
                                onClick={() => {
                                    setShowWidget(true)
                                    handlePaymentHis()
                                }}
                                className='cursor-pointer'
                            >
                                <RightArrow />
                            </div>
                        </div>
                        <div className='px-4 h-[60px] flex items-center justify-between w-full'>
                            Maintenance request
                            <div
                                onClick={() => {
                                    setShowWidget(true)
                                    handleMaintain()
                                }}
                                className='cursor-pointer'
                            >
                                <RightArrow />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MobileProfile;