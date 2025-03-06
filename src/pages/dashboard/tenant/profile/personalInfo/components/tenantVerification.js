import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import React from 'react'
import TickSuccess from '@/components/icons/tickSuccess';
import Link from 'next/link';
import LoadingII from '@/components/mainmenu/loadingII';
import usePassportProfileStore from '@/store/tenantStore/usePassportProfile';
import useNINProfileStore from '@/store/tenantStore/useNINProfile';
import InternationalPassport from '@/pages/dashboard/tenant/profile/accountInfo/components/internationalPassport';
import NationalIdentityNumber from '@/pages/dashboard/tenant/profile/accountInfo/components/nationalIdentityNumber';
import { useRouter } from 'next/navigation';
import UpdateButton from '../../components/updateButton';
import { toast } from "react-toastify";
import SelectedValue from '@/components/icons/selectedValue';
import Image from "next/image";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import { tenantOnboardingConfirmation } from "@/api/tenantSevice";
import tenantProfile from "@/store/tenantStore/tenantProfile";
import QoreIDIntegration from "@/hooks/QoreIDIntegration";
import QoreIDButton from "@/hooks/QoreIDButton";

const TenantVerification = ({ setStep, register, setFormData, formData }) => {
    const router = useRouter()
    const [active, setActive] = React.useState(false);
    const [toggle, setToggle] = React.useState(false);
    const [toggleTwo, setToggleTwo] = React.useState(false);
    const { data, loading: loadingP, fetchData: fetchDataP } = usePassportProfileStore();
    const { data: dataTwo, loading, fetchData } = useNINProfileStore();
    const [openCompleteModal, setOpenCompleteModal] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const { fetchData: fetchTenantProfile, data: tenantData } = tenantProfile();

    React.useEffect(() => {
        // fetchDataP()
        fetchData()
    }, []);

    const closeModal = () => {
        setOpenCompleteModal(false)
    };

    const handlVerifty = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const payload = {
                confirmation: {
                    isInformationAccurate: toggleTwo,
                    isConsentGiven: toggle,
                    isConfirmationSent: true
                },
            }
            const { success, error } = await tenantOnboardingConfirmation(payload);

            if (success) {
                setIsLoading(false);
                setOpenCompleteModal(true);
                fetchTenantProfile()
            } else {
                toast.error(error);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Failed");
        }
    };

    // const customerReference = tenantData?._id ?? "";
    // const applicantData = {
    //     firstname: tenantData.fullName ?? '',
    //     lastname: tenantData?.lastname ?? '',
    //     phone: tenantData?.phoneNumber ?? '',
    //     email: tenantData?.user?.email ?? "",
    // };

    const customerReference = tenantData?._id ?? "";
    const applicantData = {
      firstname: '',
      lastname: '',
      phone: '',
      email: "",
    };

    return (
        <div className='mt-4'>
            {openCompleteModal &&
                <CustomizedModal isOpen={openCompleteModal} onRequestClose={closeModal}>
                    <div className="max-w-full w-[360px] sm:w-full md:max-w-[650px] m-auto bg-white h-auto rounded-[12px] shadow-lg">
                        <div className="mt-[-10px] flex flex-col justify-around p-8 items-center gap-2">
                            <Image
                                src={
                                    "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
                                }
                                alt=""
                                height={48}
                                width={48}
                            />
                            <h1 className="text-BlackHomz font-[700] text-[20px] text-center">
                                Submission Under Review
                            </h1>
                            <p className="text-[16px] font-[400] text-GrayHomz text-center">
                                Application submitted successfully. Awaiting property manager's review.
                            </p>
                            <button
                                onClick={closeModal}
                                className="mt-1 h-[48px] rounded-md w-full hover:border hover:border-BlueHomz text-BlueHomz flex justify-center items-center text-[16px] font-medium"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </CustomizedModal>
            }
            <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                <div className="">
                    <div className='mb-4'>
                        <p className='text-[18px] font-[500] text-BlackHomz'>
                            Verify your identity
                        </p>
                        <p className='text-[14px] font-[400] text-GrayHomz'>
                            Select either ‘National Identity Card’ or ‘International Passport’ to complete your verification
                        </p>
                    </div>
                    <div className='flex flex-col-reverse gap-4'>
                        <div>
                            <InternationalPassport passportProfile={data}  />
                            {/* <div className={`${data?.verification?.status === "VERIFIED" ? "" : "hidden"} `}> */}
                            <div className="mt-2 text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E] flex flex-row items-center">
                                {/* <TickSuccess />
                                    <div>
                                        Your international passport has successfully been verified. You can now <></>
                                        <Link href="/dashboard/tenant/finance" className="text-BlueHomz">
                                            create a wallet
                                        </Link>{' '}
                                        on your dashboard
                                    </div> */}
                                {/* <div>
                                    <h1>Verify Passport</h1>
                                    <QoreIDIntegration />
                                    <QoreIDButton
                                        customerReference={customerReference}
                                        applicantData={applicantData}
                                    />
                                </div> */}
                            </div>
                            {/* </div> */}
                        </div>
                        <div>
                            <NationalIdentityNumber nationalProfile={dataTwo} />
                            <div className={`${dataTwo?.nin_data?.firstname ? "" : "hidden"} `}>
                                <div className="mt-2 text-[11px] font-[400] leading-[16.5px] text-[#4E4E4E] flex flex-row items-center">
                                    <TickSuccess />
                                    <div>
                                        Your national identity card has successfully been verified. You can now <></>
                                        <Link href="/dashboard/tenant/finance" className="text-BlueHomz">
                                            create a wallet
                                        </Link>{' '}
                                        on your dashboard
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`bg-inputBg mt-4 p-6 rounded-[12px] text-sm font-normal text-GrayHomz flex flex-col gap-4 ${(tenantData?.verification?.status === "approved" || tenantData?.verification?.status === "pending") && "hidden"}`}>
                <div className='flex gap-4 items-center'>
                    <div onClick={() => setToggle(!toggle)} className='cursor-pointer'>
                        {toggle ?
                            <div>
                                <SelectedValue />
                            </div>
                            :
                            <div className={`h-5 w-5 rounded-[6px] bg-white border border-GrayHomz2`} />}
                    </div>
                    <p>
                        I confirm that all information provided is accurate and complete. I understand that any false or misleading information may affect my tenancy approval.
                    </p>
                </div>
                <div className='flex gap-4 items-center'>
                    <div onClick={() => setToggleTwo(!toggleTwo)} className='cursor-pointer'>
                        {toggleTwo ?
                            <div>
                                <SelectedValue />
                            </div>
                            :
                            <div className={`h-5 w-5 rounded-[6px] bg-white border border-GrayHomz2`} />}
                    </div>
                    <p>
                        I consent to the sharing of this information with the property manager for the purpose of processing my application.
                    </p>
                </div>
            </div>
            <div className={`w-full flex justify-end mt-8 ${(tenantData?.verification?.status === "approved" || tenantData?.verification?.status === "pending") && "hidden"}`}>
                <button onClick={() => handlVerifty()} className={`min-w-[150px] font-medium text-[16px] rounded-[4px] p-3 ${toggleTwo && toggle ? "bg-BlueHomz text-white hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz" : "pointer-events-none bg-GrayHomz6 text-GrayHomz5"} ${isLoading ? "pointer-events-none flex justify-center" : ""}`}>
                    {isLoading ? <LoadingFormII /> : "Submit for Approval"}
                </button>
            </div>
        </div>
    )
}

export default TenantVerification