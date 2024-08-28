import React, { useState } from 'react'
import Input from "@/pages/dashboard/enterprise/components/input";
import DropDown from './dropDown';
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall';
import ArrowRightWhiteSmall from '@/components/icons/arrowRightWhiteSmall';
import useAgreementFormStore from '@/store/document/useAgreementFormStore';

const AgreementForm = ({ handlePageChangeTwo, setShowPreview, setDocumentCreation }) => {
    const [hover, setHover] = useState(false);
    const [hoverII, setHoverII] = useState(false);
    const { formData, setFormData } = useAgreementFormStore();
    const options = ["Naira (₦)", "Dollar ($)", "Pound (￡)", "Euro (€)"];

    return (
        <div className='mt-4 pr-2'>
            <div className=''>
                <Input
                    label={"Property Description"}
                    placeholder={"e.g Five (5) bedroom, terraced apartment with one (1) boys quarter"}
                    type={"text"}
                    value={formData.propDesc}
                    onChange={(e) => setFormData('propDesc', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Address"}
                    placeholder={"e.g Plot 1, Sun shine Estate, Lekki Phase 1, Lagos"}
                    type={"text"}
                    value={formData.propAddress}
                    onChange={(e) => setFormData('propAddress', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Landlord’s Name"}
                    placeholder={"e.g Mr. Benjamin Olamide"}
                    type={"text"}
                    value={formData.landlordName}
                    onChange={(e) => setFormData('landlordName', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Landlord’s Address"}
                    placeholder={"e.g No 1, Pluto street, Lekki Phase 1, Lagos"}
                    type={"text"}
                    value={formData.landlordAddress}
                    onChange={(e) => setFormData('landlordAddress', e.target.value)}
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
                    label={"Tenant’s Address"}
                    placeholder={"e.g No 2, Nile street, Aja, Lagos"}
                    type={"text"}
                    value={formData.tenantAddress}
                    onChange={(e) => setFormData('tenantAddress', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenancy Commencement Date"}
                    placeholder={"e.g 1 July, 2024"}
                    type={"text"}
                    value={formData.tenancyStartDate}
                    onChange={(e) => setFormData('tenancyStartDate', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenancy Ending Date"}
                    placeholder={"e.g 31 June, 2025"}
                    type={"text"}
                    value={formData.tenancyEndDate}
                    onChange={(e) => setFormData('tenancyEndDate', e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Input
                    label={"Rent Paid (In Words)"}
                    placeholder={"e.g Eight Million Naira"}
                    type={"text"}
                    value={formData.rentPaymentInWords}
                    onChange={(e) => setFormData('rentPaymentInWords', e.target.value)}
                />
            </div>
            <div className='mt-2 w-full flex flex-col md:flex-row gap-2 md:justify-between items-end'>
                <div className='w-full md:w-[48%]'>
                    <Input
                        label={"Rent Paid (in Figures)"}
                        placeholder={"e.g 8,000,000"}
                        type={"text"}
                        value={formData.rentPayment}
                        onChange={(e) => setFormData('rentPayment', e.target.value)}
                    />
                </div>
                <div className='w-full md:w-[48%]'>
                    <DropDown
                        label={"Currency"}
                        options={options}
                        onSelect={(option) => setFormData('selectedCurrency', option)}
                        className={"text-[14px] font-[500] text-GrayHomz2"}
                        selectedCurrency={formData.selectedCurrency}
                    />
                </div>
            </div>
            <div className='mt-2'>
                <Input
                    label={"Agreement Preparation Date"}
                    placeholder={"e.g 30 June, 2024"}
                    type={"text"}
                    value={formData.agreementDate}
                    onChange={(e) => setFormData('agreementDate', e.target.value)}
                />
            </div>
            <div
                className='flex items-center justify-between gap-4 md:gap-0 mt-10 mb-4 text-[16px] font-[500]'>
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

export default AgreementForm;
