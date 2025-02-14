"use client"
import ArrowRightBlue from '@/components/icons/arrowRightBlue';
import BriefCase from '@/components/icons/briefCase';
import Complaint from '@/components/icons/complaint';
import Convenient from '@/components/icons/convenient';
import DocAccurate from '@/components/icons/docAccurate';
import DocClock from '@/components/icons/docClock';
import DocDocu from '@/components/icons/docDocu';
import DocReceipt from '@/components/icons/docReceipt';
import DocSettings from '@/components/icons/DocSettings';
import QuickNotice from '@/components/icons/quickNotice';
import React, { useEffect, useRef, useState } from 'react'
import FAQs from './components/FAQs';
import Image from 'next/image';
import DocFlash from '@/components/icons/docFlash';
import DocFunnel from '@/components/icons/docFunnel';
import ArrowWhiteBig from '@/components/icons/arrowWhiteBig';
import FormSelection from '@/store/document/FormSelection';
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import useTabForDocuGen from '@/store/document/useTabForDocuGen';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderTwo from './components/sliderTwo';
import Close from '@/components/icons/Close';
import DocumentCreation from '@/pages/dashboard/enterprise/documentGeneration/components/documentCreation';
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import { useRouter } from "next/navigation";
import { isTrialExpired } from "@/utils/compareTrialTime";
import useEnterprisePlans from "@/store/enterpriseStore/enterprisePlans";
import { checkPlanLimits } from "@/utils/checkPlanLimits";
import ExpiredPlanModal from '@/pages/dashboard/enterprise/components/expiredPlanModal';
import VideoModal from '@/components/general/videoModal'

const videoUrl = "https://youtu.be/biBbcYaJboQ?si=KVIXlliYFGPHpdap"
const videoUrl2 = "https://youtu.be/bITV-yk-l1M?si=q2KPHzw-3GN9Kugs"
const videoUrl3 = "https://youtu.be/ZiELgNXtz4Y?si=9n5wEQpNmMxjfoxJ"

const DocSolution = [
    {
        id: 1,
        title: "Tenancy Agreement",
        body: "Generate comprehensive  and customizable tenancy agreements.",
        image: < DocDocu />,
        video: <VideoModal videoUrl={videoUrl} />
    },
    {
        id: 2,
        title: "Receipts",
        body: "Create and send professional rent invoices and receipts.",
        image: < DocReceipt />,
        video: <VideoModal videoUrl={videoUrl2} />
    },
    {
        id: 3,
        title: "Quit Notice",
        body: "Handle tenant eviction processes with legally compliant notices.",
        image: < QuickNotice />,
        video: <VideoModal videoUrl={videoUrl3} />
    }
]

const DocSolutionII = [
    {
        id: 1,
        title: "Choose Document",
        body: "Pick the type of document you need to generate.",
    },
    {
        id: 2,
        title: "Fill in Details",
        body: "Enter the necessary information to customize your document.",
    },
    {
        id: 3,
        title: "Review & Generate",
        body: "Review the pre-filled document, make any edits, and generate your document.",
    }
]

const DocumentGene = () => {
    const { data: user, fetchData: fetchProfileData, loadingProfile } = useProfileEnterpriseMe();
    const { data: enterprisePlans, fetchData: fetchEnterprisePlans } =
        useEnterprisePlans();
    const router = useRouter();
    const [openPurchasePlan, setOpenPurchasePlan] = useState(false);
    const [reachedLimit, setReachedLimit] = useState(null);

    const docSolutionRef = useRef(null);
    const [hover, setHover] = useState(null);
    const { setDocType } = FormSelection();
    const { setTab } = useTabForDocuGen();
    const [documentCreation, setDocumentCreation] = useState(false);

    const handleScroll = () => {
        if (docSolutionRef.current) {
            docSolutionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };




    const handleSelectDocument = (docType) => {
        if (isTrialExpired(user?.trialEndDate) && ((user?.planName === "Enterprise Free") || (user?.planName === "Enterprise Trial"))) {
            setOpenPurchasePlan(!openPurchasePlan)
            return;
        } else if (reachedLimit?.expiredPlan) {
            setOpenPurchasePlan(!openPurchasePlan)
            return;
        }
        else if (docType === "Receipts") {
            setDocType("Invoice and Receipt")
        } else {
            setDocType(docType);
        }
        setTab('nameDoc')
        setDocumentCreation(true);
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false,
    };

    useEffect(() => {
        fetchProfileData()
        fetchEnterprisePlans()
    }, []);

    const goToplan = () => {
        router.push("/plans")
    }

    useEffect(() => {
        const values = checkPlanLimits(
            enterprisePlans,
            user?.planName,
            user?.estates?.length,
            user?.propertyOwners?.length,
            user?.tenants?.length,
            user?.IsExpired
        );
        setReachedLimit(values);
    }, [enterprisePlans, user]);

    return (
        <div className='w-full flex flex-col items-center'>
            {
                <CustomizedModal isOpen={documentCreation}>
                    <DocumentCreation setDocumentCreation={setDocumentCreation}
                    //    setShowPreview={setShowPreview}
                    />
                </CustomizedModal>
            }

            {openPurchasePlan && reachedLimit?.enterprisePlanName === "Enterprise Free" && !reachedLimit?.expiredPlan && isTrialExpired(user?.trialEndDate) && (
                <CustomizedModal isOpen={openPurchasePlan && reachedLimit?.enterprisePlanName === "Enterprise Free" && !reachedLimit?.expiredPlan && isTrialExpired(user?.trialEndDate)}>
                    <ExpiredPlanModal
                        header={"Your Trial Has Ended"}
                        body={"Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."}
                        button={"Buy Plan"}
                        buttonTwo={"close"}
                        returnHome={goToplan}
                        returnHomeTwo={() => setOpenPurchasePlan(false)}
                    />
                </CustomizedModal>
            )}
            {openPurchasePlan && reachedLimit?.expiredPlan && (
                <CustomizedModal isOpen={openPurchasePlan && reachedLimit?.expiredPlan}>
                    <ExpiredPlanModal
                        header={`${reachedLimit?.enterprisePlanName} Plan Expired`}
                        body={`Your ${reachedLimit?.enterprisePlanName} ${reachedLimit?.interval} plan has expired. Renew now to continue enjoying all features!`}
                        button={"Upgrade Plan"}
                        buttonTwo={"close"}
                        returnHome={goToplan}
                        returnHomeTwo={() => setOpenPurchasePlan(false)}
                    />
                </CustomizedModal>
            )}
            {/* {
                <CustomizedModal isOpen={documentCreation}>
                    <div className="w-full sm:w-[42%] h-[315px] bg-white border p-[24px] rounded-[12px]">
                        <div className='w-full flex justify-between items-center'>
                            <div className="flex gap-2 items-center">
                                <p className="text-[14px] font-[500] text-GrayHomz">Document Generation</p>
                            </div>
                            <button
                                onClick={() => setDocumentCreation(false)}
                                className="border h-[20px] border-BlackHomz rounded-[4px]">
                                <Close />
                            </button>
                        </div>
                        <div className="h-full w-full flex items-center justify-center">
                            <div>
                                <Image
                                    src={"/static/dashboard/tenant/dashboard/FrameFolde.png"}
                                    height={97}
                                    width={96}
                                    alt=""
                                />
                                <p className="mt-2 text-[14px] font-[500] text-BlueHomz text-center">
                                    Coming Soon!
                                </p>
                            </div>
                        </div>
                    </div>
                </CustomizedModal>
            } */}
            <div className='max-w-[1160px] w-full px-6'>
                <div className='w-full'>
                    <div className='lg:h-[550px] relative flex flex-col md:flex-row justify-center lg:justify-between w-[100%]'>
                        <div className='md:w-[45%] mt-10 md:mt-0 flex justify-center text-center'>
                            <div className='w-full flex flex-col justify-center gap-5'>
                                <div className='ml-8'>
                                    <div className='hidden lg:flex justify-center items-center bg-whiteblue rounded-full w-[40px] h-[40px]'>
                                        <DocDocu />
                                    </div>
                                </div>
                                <div className='text-center md:text-start flex flex-col gap-2'>
                                    <p className='text-[25px] lg:text-[41px] font-[700] text-BlackHomz leading-tight'>
                                        One-Click Property documents generation
                                    </p>
                                    <p className='text-[18px] lg:text-[20px] font-[500] text-GrayHomz'>
                                        Easily create and manage all essential property-related documents in one place.
                                    </p>
                                    <div className='mt-4'>
                                        <button onClick={handleScroll} className='w-full md:w-auto h-[48px] px-4 py-2 bg-BlueHomz text-white text-[16px] font-[700] rounded-[4px]'>
                                            Start Free Trial
                                        </button>
                                    </div>
                                </div>
                                <div className='w-full absolute bottom-4 right-[180px] flex justify-center pr-14'>
                                    <div className='hidden lg:flex justify-center items-center bg-warningBg rounded-full w-[40px] h-[40px]'>
                                        <BriefCase />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='md:w-[45%] flex lg:justify-end justify-center items-center'>
                            <div className='flex flex-col lg:justify-between py-8 gap-2 items-center h-full'>
                                <div className='hidden lg:flex justify-center items-center bg-whiteblue rounded-full w-[30px] h-[30px]'>
                                    <DocSettings />
                                </div>
                                <div className='w-full'>
                                    <div className='hidden lg:block absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40'>
                                        <Image
                                            height={150}
                                            width={360}
                                            src="/Successful.png"
                                            alt='document-modal-img'
                                            className='w-[360px] h-[150px] rounded-[12px] object-cover bg-center'
                                        />
                                    </div>
                                </div>
                                <div className='relative w-[320px] lg:w-[531px] h-[260px] lg:h-[411px] rounded-[12px]'>
                                    <Image
                                        height={411}
                                        width={531}
                                        src="/DocumentGenHomepage.jpg"
                                        alt='document-hero-img'
                                        className='w-[320px] lg:w-[531px] h-[260px] lg:h-[411px] rounded-[12px] object-cover bg-center'
                                    />
                                    <div className='lg:hidden absolute bottom-[-80px] right-[-120px] md:bottom-[-150px] md:right-[-250px] transform -translate-x-1/2 -translate-y-1/2 z-40'>
                                        <Image
                                            height={150}
                                            width={360}
                                            src="/Successful.png"
                                            alt='document-modal-img'
                                            className='w-[180px] md:w-[360px] h-[70px] md:h-[150px] rounded-[12px] object-cover bg-center'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden mt-8 h-[136px] w-full bg-gradient-to-r from-BlueHomz2 to- bg-BlueHomzDark px-[20px] py-[44px]'>
                <Slider {...settings}>
                    <div>
                        <div className='flex flex-row gap-2 items-center'>
                            <div className='bg-white rounded-full flex justify-center items-center h-[40px] w-[40px]'>
                                <DocClock />
                            </div>
                            <p className='text-[20px] font-[500] text-white'>
                                Efficient
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-row gap-2 items-center'>
                            <div className='bg-white rounded-full flex justify-center items-center h-[40px] w-[40px]'>
                                <DocAccurate />
                            </div>
                            <p className='text-[20px] font-[500] text-white'>
                                Accurate
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-row gap-2 items-center'>
                            <div className='bg-white rounded-full flex justify-center items-center h-[40px] w-[40px]'>
                                <Complaint />
                            </div>
                            <p className='text-[20px] font-[500] text-white'>
                                Complaint
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-row gap-2 items-center'>
                            <div className='bg-white rounded-full flex justify-center items-center h-[40px] w-[40px]'>
                                <Convenient />
                            </div>
                            <p className='text-[20px] font-[500] text-white'>
                                Convenient
                            </p>
                        </div>
                    </div>
                </Slider>
            </div>
            <div className='hidden mt-8 h-[136px] w-full md:flex items-center justify-around bg-gradient-to-r from-BlueHomz2 to- bg-BlueHomzDark px-[120px] max-w-[1440px]'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-white rounded-full flex justify-center items-center h-[40px] w-[40px]'>
                        <DocClock />
                    </div>
                    <p className='text-[20px] font-[500] text-white'>
                        Efficient
                    </p>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='bg-white rounded-full flex justify-center items-center h-[40px] w-[40px]'>
                        <DocAccurate />
                    </div>
                    <p className='text-[20px] font-[500] text-white'>
                        Accurate
                    </p>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='bg-white rounded-full flex justify-center items-center h-[40px] w-[40px]'>
                        <Complaint />
                    </div>
                    <p className='text-[20px] font-[500] text-white'>
                        Complaint
                    </p>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='bg-white rounded-full flex justify-center items-center h-[40px] w-[40px]'>
                        <Convenient />
                    </div>
                    <p className='text-[20px] font-[500] text-white'>
                        Convenient
                    </p>
                </div>
            </div>
            <div ref={docSolutionRef} className='my-[60px] md:my-14 w-full'>
                <div className='flex justify-center w-full'>
                    <div className='flex flex-col justify-center w-full px-8'>
                        <p className='text-[23px] lg:text-[36px] font-[700] text-BlackHomz text-center'>
                            Comprehensive Document Solutions
                        </p>
                        <p className='text-[18px] lg:text-[20px] font-[500] text-GrayHomz text-center'>
                            Meticulously designed to simplify and streamline your document creation process.
                        </p>
                    </div>
                </div>
                <div className='w-full px-8'>
                    <div className="hidden md:flex flex-wrap gap-4 mt-10 justify-center">
                        {DocSolution.map((data) => (
                            <div key={data.id}>
                                <div
                                    onClick={() => handleSelectDocument(data.title)}
                                    onMouseEnter={() => { setHover(data.id) }}
                                    onMouseLeave={() => { setHover(null) }}
                                    className={`cursor-pointer bg-whiteblue hover:bg-BlueHomz group rounded-[12px] p-8 flex flex-col justify-between items-center h-[260px] w-[360px]`}
                                >
                                    <div className='flex flex-col gap-1 w-full justify-center items-center'>
                                        <div className='w-[45px] h-[45px] rounded-full bg-white flex justify-center items-center'>
                                            {data.image}
                                        </div>
                                        <p className='text-[20px] font-[600] text-BlackHomz group-hover:text-white text-center'>
                                            {data.title}
                                        </p>
                                        <p className='text-[18px] font-[400] text-GrayHomz group-hover:text-white text-center'>
                                            {data.body}
                                        </p>
                                    </div>
                                    {
                                        hover && hover === data.id ?
                                            <div>
                                                <ArrowWhiteBig />
                                            </div>
                                            :
                                            <div className='flex items-center gap-1'>
                                                <p className='text-[16px] font-[500] text-BlueHomz group-hover:text-white'>
                                                    Generate
                                                </p>
                                                <ArrowRightBlue />
                                            </div>
                                    }
                                </div>
                                <div className='mt-4 w-full flex justify-center items-center'>
                                    {data.video}
                                </div>
                            </div>
                        ))}
                    </div>
                    <SliderTwo
                        hover={hover}
                        handleSelectDocument={handleSelectDocument}
                        setHover={setHover}
                        DocSolution={DocSolution}
                    />
                </div>
            </div>
            <div className='mt-8 md:mt-14 relative w-full px-8 md:px-0'>
                <div className='flex justify-center w-full'>
                    <div className='flex flex-col justify-center items-center w-full'>
                        <div className='hidden lg:absolute left-[-80px] bottom-[50px]'>
                            <div className='flex justify-center items-center bg-whiteblue rounded-full w-[45px] h-[45px]'>
                                <DocFlash />
                            </div>
                        </div>
                        <div className='hidden lg:absolute top-0 right-0'>
                            <div className='flex justify-center items-center bg-warningBg rounded-full w-[45px] h-[45px]'>
                                <DocFunnel />
                            </div>
                        </div>
                        <p className='text-[18px] font-[500] text-BlueHomz'>How It Works</p>
                        <p className='text-[23px] md:text-[36px] font-[700] text-BlackHomz text-center lg:w-[550px] leading-tight mt-2'>
                            Seamless Document Generation in Just a Few Steps
                        </p>
                        <p className='text-[18px] md:text-[20px] font-[500] text-GrayHomz text-center lg:w-[680px] mt-2'>
                            Effortlessly create, customize, and manage essential property-related documents with our intuitive workflow.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 md:gap-2 md:mt-10 mt-6">
                    {DocSolutionII.map((data) =>
                        <div
                            className={`border border-BlueHomz4 rounded-[12px] px-8 flex flex-col justify-center items-center h-[260px] w-[360px]`}
                            key={data.id}
                        >
                            <div className='flex flex-col gap-1 w-full justify-center items-center'>
                                <div className='w-[45px] h-[45px] text-[20px] font-[700] text-white rounded-full bg-BlueHomz flex justify-center items-center'>
                                    {data.id}
                                </div>
                                <p className='text-[20px] font-[600] text-BlackHomz text-center'>{data.title}</p>
                                <p className='text-[18px] font-[400] text-GrayHomz text-center'>{data.body}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FAQs />
        </div>
    )
}

export default DocumentGene;