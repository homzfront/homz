"use client"
import ArrowRightSize16 from '@/components/icons/arrowRightSize16'
import ArrowRightSmall from '@/components/icons/arrowRightSmall'
import AssignGuardIcon from '@/components/icons/estateHomePage/assignGuardIcon'
import BillingHisIcon from '@/components/icons/estateHomePage/billingHisIcon'
import BillingHistoryIcon from '@/components/icons/estateHomePage/billingHistoryIcon'
import BillTypesIcon from '@/components/icons/estateHomePage/billTypesIcon'
import ControlPersonelIcon from '@/components/icons/estateHomePage/controlPersonelIcon'
import CsvFormatIcon from '@/components/icons/estateHomePage/csvFormatIcon'
import DueDateManaIcon from '@/components/icons/estateHomePage/dueDateManaIcon'
import EnableSecureIcon from '@/components/icons/estateHomePage/enableSecureIcon'
import MaintainLogsIcon from '@/components/icons/estateHomePage/maintainLogsIcon'
import ManageTenant from '@/components/icons/estateHomePage/manageTenant'
import ManageVisitorsReqIcon from '@/components/icons/estateHomePage/manageVisitorsReqIcon'
import MonitorHisIcon from '@/components/icons/estateHomePage/monitorHisIcon'
import NotificationIcon from '@/components/icons/estateHomePage/notificationIcon'
import PaymentTrackingIcon from '@/components/icons/estateHomePage/paymentTrackingIcon'
import Property from '@/components/icons/estateHomePage/property'
import RecordVisitorsIcon from '@/components/icons/estateHomePage/recordVisitorsIcon'
import RecurringBillingIcon from '@/components/icons/estateHomePage/recurringBillingIcon'
import TenantList from '@/components/icons/estateHomePage/tenantList'
import TrackVisitorIcon from '@/components/icons/estateHomePage/trackVisitorIcon'
import UpdateTenantStatus from '@/components/icons/estateHomePage/updateTenantStatus'
import VisitorAccessIcon from '@/components/icons/estateHomePage/visitorAccessIcon'
import Pricing from '@/pages/landingPageProMan/Pricing'
import useProfileStore from '@/store/profile'
import determineRoute from '@/utils/determineRoute'
import Image from 'next/image'
import React from 'react'

const EstateHomePage = () => {
    const [activeBilling, setActiveBilling] = React.useState(null);
    const { isLoggedIn, profile } = useProfileStore();
    const manager = "/dashboard/enterprise-property/dashboard"
    const page = determineRoute(profile, manager);

    const billingFeatures = [
        {
            icon: <BillTypesIcon />,
            iconTwo: <BillTypesIcon className='#FFFFFF' />,
            alter: false,
            title: "Bill Types",
            description: "Create custom bills like estate, water, or security fees."
        },
        {
            icon: <RecurringBillingIcon />,
            iconTwo: <RecurringBillingIcon className='#006AFF' />,
            alter: true,
            title: "One-time & Recurring Billing",
            description: "Set bills to repeat monthly or just once."
        },
        {
            icon: <DueDateManaIcon />,
            iconTwo: <DueDateManaIcon className='#FFFFFF' />,
            alter: false,
            title: "Due Date Management",
            description: "Define when payments are expected from tenants."
        },
        {
            icon: <PaymentTrackingIcon />,
            iconTwo: <PaymentTrackingIcon className='#006AFF' />,
            alter: true,
            title: "Real-time Payment Tracking",
            description: "See who has paid and who's still pending."
        },
        {
            icon: <NotificationIcon />,
            iconTwo: <NotificationIcon className='#FFFFFF' />,
            alter: false,
            title: "Reminders & Notifications",
            description: "Automatically alert tenants about upcoming or overdue bills."
        },
        {
            icon: <BillingHistoryIcon />,
            iconTwo: <BillingHistoryIcon className='#006AFF' />,
            alter: true,
            title: "Tenant Billing History",
            description: "View each tenant's full record of past payments and outstanding balances."
        }
    ];

    return (
        <div className='w-full'>
            <div className='w-full  px-6 mt-14 max-w-[1160px] m-auto'>
                <div className='relative w-full md:h-[820px] rounded-lg shadow-2xl bg-cover flex flex-col justify-between bg-BlueHomz bg-[url("/Background-image.png")]'>
                    {/* Content at the top */}
                    <div className='px-[100px] text-center md:text-start flex flex-col gap-5 pt-[100px]'>
                        <p className='text-[25px] lg:text-[38px] font-[700] text-white text-center leading-tight'>
                            Effortless Estate Management for Smarter Living
                        </p>
                        <p className='text-[18px] lg:text-[20px] font-[400] text-white text-center max-w-[700px] m-auto'>
                            Manage estate bills, tenants, and visitors all from one powerful dashboard built for modern property operations.
                        </p>
                        <div className='w-full flex justify-center'>
                            <div className='mt-4 flex flex-col md:flex-row gap-4 items-center'>
                                <button className='w-full md:w-auto h-[48px] flex justify-center items-center px-6 bg-white text-BlueHomz text-[16px] font-[400] rounded-[4px]'>
                                    Get Started as an Estate Manager <ArrowRightSize16 />
                                </button>
                                <button className='w-full md:w-auto h-[48px] flex justify-center items-center px-6 text-white text-[16px] font-medium border border-white rounded-[4px]'>
                                    See How It Works
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image at the bottom */}
                    <div className="w-full px-[80px] mt-[50px] pb-0">
                        <Image
                            src={"/estate-img.png"}
                            alt="img"
                            width={2880}
                            height={2048}
                            layout="responsive"
                            objectFit="cover"
                            objectPosition="center"
                            className="object-top bg-top image-clipIII border-t-4 border-l-4 border-r-4 sm:border-t-8 sm:border-l-8 sm:border-r-8 border-[#0058D4] rounded-[12px]"
                            priority
                        />
                    </div>
                </div>

                <div className='mt-[100px] bg-whiteblue px-[80px] py-[60px]'>
                    <div className='w-full flex flex-col gap-4'>
                        <p className='max-w-[900px] m-auto text-[25px] lg:text-[36px] font-[700] text-BlueHomz text-center leading-tight'>
                            Create Estates. Invite Tenants. <span className='text-BlackHomz'>Stay in Control.</span>
                        </p>
                        <p className='text-[16px] lg:text-[18px] font-[400] text-BlackHomz text-center max-w-[650px] m-auto'>
                            Set up estates in minutes and invite tenants via secure links or emails. Monitor who’s joined, and manage access.
                        </p>
                    </div>
                    <div className='mt-[40px] flex flex-row w-full items-end'>
                        <div className='w-[40%] flex flex-col gap-4'>
                            <div className='flex gap-4 items-center'>
                                <Property />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Create multiple estates
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <ManageTenant />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Invite and manage tenants
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <TenantList />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    View tenant list and activity
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <UpdateTenantStatus />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Remove or update tenant status
                                </p>
                            </div>
                            <button className='mt-2 text-white text-[16px] font-normal bg-BlueHomz w-[240px] gap-1 flex items-center justify-center h-[48px] rounded-[4px]'>
                                Create Your First Estate <ArrowRightSmall className='#FFFFFF' />
                            </button>
                        </div>
                        <Image
                            src={"/image.png"}
                            layout="responsive"
                            objectFit="cover"
                            width={1558}
                            height={862}
                            className='w-[55%] max-w-[600px] object-cover'
                        />
                    </div>
                </div>

                <div className='mt-[100px] px-[80px] py-[60px]'>
                    <div className='w-full flex flex-col gap-4'>
                        <p className='max-w-[900px] m-auto text-[25px] lg:text-[36px] font-[700] text-BlueHomz text-center leading-tight'>
                            Simplify Billing, Get Paid Faster.
                        </p>
                        <p className='text-[16px] lg:text-[18px] font-[400] text-BlackHomz text-center max-w-[740px] m-auto'>
                            Create and assign recurring or one-time bills like estate dues, water, and security fees. Tenants get automated reminders and can pay directly via their dashboard.
                        </p>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-10'>
                        {
                            billingFeatures &&
                            billingFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setActiveBilling(index)}
                                    onMouseLeave={() => setActiveBilling(null)}
                                    className={`px-6 py-8 shadow-md rounded-lg cursor-pointer
                                         ${activeBilling === index && feature?.alter === false ? "bg-whiteblue" : activeBilling === index && feature?.alter === true ? "bg-BlueHomz" : !feature?.alter ? "bg-BlueHomz" : feature?.alter ? "bg-whiteblue" : ""}`}
                                >
                                    <div className={`flex w-[44px] h-[44px] rounded-full justify-center items-center gap-2 mb-2  ${activeBilling === index && feature?.alter === false ? "bg-BlueHomz" : activeBilling === index && feature?.alter === true ? "bg-white"
                                        : !feature?.alter ? "bg-white" : feature?.alter ? "bg-BlueHomz" : ""}`}>
                                        {activeBilling === index ? feature.iconTwo : feature.icon}
                                    </div>
                                    <h3 className={`mt-4 font-bold text-[18px] ${activeBilling === index && feature?.alter === true ? "text-white" : activeBilling === index && feature?.alter === false ? "text-[#101828]" : feature?.alter ? "text-[#101828]" : !feature?.alter ? "text-white" : ""}`}
                                    >{feature.title}</h3>
                                    <p className={`mt-2 text-sm font-normal ${activeBilling === index && feature?.alter === true ? "text-white" : activeBilling === index && feature?.alter === false ? "text-[#101828]" : feature?.alter ? "text-[#101828]" : !feature?.alter ? "text-white" : ""}`}
                                    >{feature.description}</p>
                                </div>
                            ))}
                    </div>
                    <div className='w-full flex justify-center items-center mt-10'>
                        <button className='mt-2 text-white text-[16px] font-normal bg-BlueHomz w-[180px] gap-1 flex items-center justify-center h-[48px] rounded-[4px]'>
                            Get Started Now <ArrowRightSmall className='#FFFFFF' />
                        </button>
                    </div>
                </div>

                <div className='mt-[100px] bg-BlueHomz px-[80px] py-[60px] rounded-[12px]'>
                    <div className='w-full flex flex-col gap-4'>
                        <p className='max-w-[950px] m-auto text-[25px] lg:text-[36px] font-[700] text-white text-center leading-tight'>
                            Control Estate Access, Keep Your Environment Safe.
                        </p>
                        <p className='text-[16px] lg:text-[18px] font-[400] text-white text-center max-w-[700px] m-auto'>
                            Review visitor access requests made by tenants. Approve, decline, or log new entries manually. Everything you need for secure, controlled access, centralized.
                        </p>
                    </div>
                    <div className='mt-[40px] flex flex-row-reverse gap-8 w-full items-end'>
                        <div className='w-[40%] flex flex-col gap-4'>
                            <div className='flex gap-4 items-center'>
                                <ManageVisitorsReqIcon />
                                <p className='text-[18px] font-medium text-white'>
                                    View & manage visitor requests
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <RecordVisitorsIcon />
                                <p className='text-[18px] font-medium text-white'>
                                    Record walk-in visitors
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <MonitorHisIcon />
                                <p className='text-[18px] font-medium text-white'>
                                    Monitor visitor history
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <EnableSecureIcon />
                                <p className='text-[18px] font-medium text-white'>
                                    Enable secure estate entry
                                </p>
                            </div>
                            <button className='mt-2 text-BlueHomz text-[16px] font-normal bg-white w-[260px] gap-1 flex items-center justify-center h-[48px] rounded-[4px]'>
                                Manage Visitor Access Now <ArrowRightSmall className='#006AFF' />
                            </button>
                        </div>
                        <Image
                            src={"/visitor-control.png"}
                            layout="responsive"
                            objectFit="cover"
                            width={1558}
                            height={862}
                            className='w-[55%] max-w-[600px] object-cover'
                        />
                    </div>
                </div>
                <div className='mt-[100px] bg-whiteblue px-[80px] py-[60px]'>
                    <div className='w-full flex flex-col gap-4'>
                        <p className='max-w-[900px] m-auto text-[25px] lg:text-[36px] font-[700] text-BlueHomz text-center leading-tight'>
                            Empower Your Security Team with the Right Tools
                        </p>
                        <p className='text-[16px] lg:text-[18px] font-[400] text-BlackHomz text-center max-w-[700px] m-auto'>
                            Invite security personnel to manage visitor access in real-time. Grant them the right level of access to ensure smooth operations without compromising control.
                        </p>
                    </div>
                    <div className='mt-[40px] flex flex-row w-full items-center'>
                        <div className='w-[40%] flex flex-col gap-4'>
                            <div className='flex gap-4 items-center'>
                                <AssignGuardIcon />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Assign guards to estates
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <ControlPersonelIcon />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Control personnel permissions
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <TrackVisitorIcon />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Track visitor access status updates
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <MaintainLogsIcon />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Maintain logs for accountability
                                </p>
                            </div>
                            <button className='mt-2 text-white text-[16px] font-normal bg-BlueHomz w-[240px] gap-1 flex items-center justify-center h-[48px] rounded-[4px]'>
                                Add Your Security Team <ArrowRightSmall className='#FFFFFF' />
                            </button>
                        </div>
                        <Image
                            src={"/manageUsers.png"}
                            layout="responsive"
                            objectFit="cover"
                            width={1558}
                            height={862}
                            className='w-[55%] max-w-[600px] object-cover'
                        />
                    </div>
                </div>

                <div className='mt-[100px] bg-white px-[80px] py-[60px]'>
                    <div className='w-full flex flex-col gap-4'>
                        <p className='max-w-[900px] m-auto text-[25px] lg:text-[36px] font-[700] text-BlueHomz text-center leading-tight'>
                            Gain Insights with Reports and Logs
                        </p>
                        <p className='text-[16px] lg:text-[18px] font-[400] text-BlackHomz text-center max-w-[700px] m-auto'>
                            Access billing reports, visitor logs, and personnel activity, exportable anytime. Make informed decisions with accurate estate data at your fingertips.
                        </p>
                    </div>
                    <div className='mt-[40px] flex flex-row-reverse gap-8 w-full items-center'>
                        <div className='w-[40%] flex flex-col gap-4'>
                            <div className='flex gap-4 items-center'>
                                <BillingHisIcon />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Billing history and breakdown
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <VisitorAccessIcon />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    Visitor access logs
                                </p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <CsvFormatIcon />
                                <p className='text-[18px] font-medium text-GrayHomz'>
                                    CSV/PDF exports
                                </p>
                            </div>
                        </div>
                        <Image
                            src={"/gainSight.png"}
                            layout="responsive"
                            objectFit="cover"
                            width={1558}
                            height={862}
                            className='w-[55%] max-w-[600px] object-cover'
                        />
                    </div>
                </div>

            </div>
            <Pricing hidden={true} routeTo={page} profile={profile} />
            <div className="mt-[100px] max-w-[1160px] m-auto">
                <div className="flex flex-col gap-2 justify-around items-center py-[60px] px-8 bg-[url('/Background_image.png')] text-white rounded-[20px] shadow-2xl bg-cover bg-center bg-black max-w-full sm:w-[670px]  md:w-[786px] lg:w-[824px] xl:w-[1159px]">
                    <h1 className="font-[700] text-center text-[20px] md:text-[36px]">
                        Start Managing Your Estate Like a Pro
                    </h1>
                    <p className='text-[20px] font-medium text-[#E6E6E6] max-w-[720px] m-auto text-center'>
                        Join estate managers who trust our platform to run safer, smarter, and more organized communities.
                    </p>
                    <div className="mt-4 sm:mt-0 flex w-full flex-col sm:flex-row sm:w-auto gap-4">
                        <button className='mt-2 text-BlackHomz text-[16px] font-normal bg-white w-[240px] gap-1 flex items-center justify-center h-[48px] rounded-[4px]'>
                            Start Your 14-Day Free Trial <ArrowRightSmall className='#202020' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EstateHomePage