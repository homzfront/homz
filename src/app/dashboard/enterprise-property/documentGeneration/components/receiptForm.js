import React, { useState } from 'react'
import Input from "@/pages/dashboard/enterprise/components/input";
import DropDown from './dropDown';
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall';
import ArrowRightWhiteSmall from '@/components/icons/arrowRightWhiteSmall';
import useReceiptFormStore from '@/store/document/useReceiptFormStore';
import BluePhoto from '@/components/icons/bluePhoto';
import Image from 'next/image';

const ReceiptForm = ({ handlePageChangeTwo, setShowPreview, setDocumentCreation }) => {
    const [hover, setHover] = useState(false);
    const [hoverII, setHoverII] = useState(false);
    const { formData, setFormData } = useReceiptFormStore();
    const optionsII = ["Naira (₦)", "Dollar ($)", "Pound (￡)", "Euro (€)"];

    return (
        <div className='mt-4 pr-2'>
            <div className='relative w-[80px] h-[80px] mb-2'>
                <div>
                    <Image
                        src={"/Ellipse 75.png"}
                        height={80}
                        width={80}
                        alt='avatar'
                    />
                </div>
                <div className='absolute top-1/3 right-1/3'>
                    <BluePhoto />
                </div>
            </div>
            <div className=''>
                <Input
                    label={"Property Manager’s Company"}
                    placeholder={"e.g Real Estate Company Limited"}
                    type={"text"}
                    value={formData.propertyManagerCompanyName}
                    onChange={(e) => setFormData('propertyManagerCompanyName', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Manager’s Company Address"}
                    placeholder={"e.g No 2. Ademola Street, Surulere, Lagos"}
                    type={"text"}
                    value={formData.propertyManagerCompanyAddress}
                    onChange={(e) => setFormData('propertyManagerCompanyAddress', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Manager’s Company Email"}
                    placeholder={"e.g RealEstateCompany@gmail.com"}
                    type={"text"}
                    value={formData.propertyManagerCompanyEmail}
                    onChange={(e) => setFormData('propertyManagerCompanyEmail', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Manager’s Company Phone"}
                    placeholder={"e.g 08000000000"}
                    type={"number"}
                    value={formData.propertyManagerCompanyPhoneNumber}
                    onChange={(e) => setFormData('propertyManagerCompanyPhoneNumber', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Date"}
                    placeholder={"e.g 1 July, 2026"}
                    type={"text"}
                    value={formData.receiptDate}
                    onChange={(e) => setFormData('receiptDate', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenant’s Name"}
                    placeholder={"e.g Mr. Sylvester David"}
                    type={"text"}
                    value={formData.tenantName}
                    onChange={(e) => setFormData('tenantName', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenant’s Phone Number"}
                    placeholder={"e.g 08000000000"}
                    type={"number"}
                    value={formData.tenantPhoneNumber}
                    onChange={(e) => setFormData('tenantPhoneNumber', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Address"}
                    placeholder={"e.g Plot 1, Sun shine Estate, Lekki Phase 1, Lagos"}
                    type={"text"}
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData('propertyAddress', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Description"}
                    placeholder={"e.g Five (5) bedroom, terraced apartment with one (1) boys quarter"}
                    type={"text"}
                    value={formData.propertyDesc}
                    onChange={(e) => setFormData('propertyDesc', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Amount in words"}
                    placeholder={"e.g Eight Million Naira"}
                    type={"text"}
                    value={formData.rentPaymentInWords}
                    onChange={(e) => setFormData('rentPaymentInWords', e.target.value)}
                />
            </div>
            <div className='mt-2 w-full flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between items-end'>
                <div className='w-full md:w-[48%]'>
                    <Input
                        label={"Amount in Figures"}
                        placeholder={"e.g 8,000,000"}
                        type={"text"}
                        value={formData.rentPayment}
                        onChange={(e) => setFormData('rentPayment', e.target.value)}
                    />
                </div>
                <div className='w-full md:w-[48%]'>
                    <DropDown
                        label={"Currency"}
                        options={optionsII}
                        onSelect={(option) => setFormData('selectedCurrency', option)}
                        className={"text-[14px] font-[500] text-GrayHomz2"}
                    />
                </div>
            </div>
            <div className='mt-2 w-full flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between items-end'>
                <div className='w-full md:w-[48%]'>
                    <Input
                        label={"Tenancy Period"}
                        placeholder={"e.g 1"}
                        type={"number"}
                        value={formData.tenancyPeriod}
                        onChange={(e) => setFormData('tenancyPeriod', e.target.value)}
                    />
                </div>
                <div className='w-full mt-[-16px] md:w-[48%]'>
                    <Input
                        placeholder={"Month(s) / Year(s)"}
                        type={"text"}
                        value={formData.tenancy}
                        onChange={(e) => setFormData('tenancy', e.target.value)}
                    />
                </div>
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenancy Start Date"}
                    placeholder={"e.g 1 July, 2024"}
                    type={"text"}
                    value={formData.tenancyStartDate}
                    onChange={(e) => setFormData('tenancyStartDate', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenancy End Date"}
                    placeholder={"e.g 31, 2025"}
                    type={"text"}
                    value={formData.tenancyEndDate}
                    onChange={(e) => setFormData('tenancyEndDate', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Mode of payment"}
                    placeholder={"e.g Cash/Cheque/Draft/Transfer"}
                    type={"text"}
                    value={formData.modOfPayment}
                    onChange={(e) => setFormData('modOfPayment', e.target.value)}
                />
            </div>
            <div className='flex items-center justify-between gap-4 md:gap-0 mt-10 mb-4 text-[16px] font-[500]'>
                <div
                    onClick={() => setDocumentCreation(false)}
                    className='h-[48px] border border-BlueHomz w-full md:w-[20%] rounded-[4px] text-BlueHomz hover:text-white flex justify-center items-center cursor-pointer hover:bg-BlueHomz'>
                    <p>
                        Close
                    </p>
                </div>
                <div className='flex justify-between w-full md:w-[45%]'>
                    <div
                        onClick={handlePageChangeTwo}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className='hidden h-[48px] border border-BlueHomz w-[45%] rounded-[4px] text-BlueHomz hover:text-white md:flex gap-1 justify-center items-center cursor-pointer hover:bg-BlueHomz2'>
                        {hover ? <ArrowLeftBlueSmall className='#ffffff' /> : <ArrowLeftBlueSmall />}  Go Back
                    </div>
                    <div
                        onClick={() => setShowPreview(true)}
                        onMouseEnter={() => setHoverII(true)}
                        onMouseLeave={() => setHoverII(false)}
                        className='h-[48px] hover:border hover:border-BlueHomz w-full md:w-[45%] rounded-[4px] flex gap-1 justify-center items-center cursor-pointer text-white hover:text-BlueHomz bg-BlueHomz hover:bg-whiteblue'>
                        Generate {hoverII ? <ArrowRightWhiteSmall /> : <ArrowRightWhiteSmall className='#ffffff' />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceiptForm