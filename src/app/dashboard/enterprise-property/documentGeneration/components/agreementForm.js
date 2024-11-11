import React, { useEffect, useState } from 'react'
import Input from "@/pages/dashboard/enterprise/components/input";
import DropDown from './dropDown';
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall';
import ArrowRightWhiteSmall from '@/components/icons/arrowRightWhiteSmall';
import useAgreementFormStore from '@/store/document/useAgreementFormStore';
import useProfileStore from '@/store/profile';
import { usePathname, useRouter } from 'next/navigation';
import useTabForDocuGen from '@/store/document/useTabForDocuGen';
import { toast } from "react-hot-toast";
import api from '@/utils/api';
import FormSelection from '@/store/document/FormSelection';
import useGetAllDocument from '@/store/document/getAllDocument';

const AgreementForm = ({ handlePageChangeTwo, setShowPreview, setDocumentCreation }) => {
    const [hover, setHover] = useState(false);
    const [hoverII, setHoverII] = useState(false);
    const { formData, setFormData, mergeFormData } = useAgreementFormStore();
    const options = ["Naira (₦)", "Dollar ($)", "Pound (￡)", "Euro (€)"];
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const path = usePathname();
    const [hasPropertyManager, setHasPropertyManager] = useState(false);
    const { profile } = useProfileStore();
    const { setHomePage } = useTabForDocuGen();
    const { DocType, FormName } = FormSelection();
    const { fetchData } = useGetAllDocument();

    function hasPropertyManagerAccount(profile) {
        return profile?.accounts?.some(account => account.name === 'ENTERPRISE_PLAN');
    }

    // console.log(formData)

    useEffect(() => {
        if (profile) {
            setHasPropertyManager(hasPropertyManagerAccount(profile));
        }
    }, [profile]);

    const url = !profile ? "/register" : hasPropertyManager
        ? "/dashboard/enterprise-property/documentGeneration"
        : "/switch-profile";

    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    };

    const handleGenerate = async () => {
        // const existingId = formData?._id
        //  if (existingId) {
        //     // ID exists, update existing data
        //     mergeFormData(formData);
        // } else {
        //     // ID does not exist, generate new ID and create new entry
        //     const newId = generateUniqueId();
        //     setFormData('id', newId);
        //     mergeFormData({ ...formData, id: newId });
        // }
        // Determine navigation based on the current path
        if (path !== "/dashboard/enterprise-property/documentGeneration") {
            setHomePage(true);
            router.push(url);
        } else {
            setShowPreview(true);
        }
        if (!formData?._id) {
            try {
                const payload = {};
                if (formData.propDesc) payload.propertyDesc = formData.propDesc;
                if (formData.propAddress) payload.propertyAddress = formData.propAddress;
                if (formData.landlordName) payload.landlordName = formData.landlordName;
                if (formData.landlordAddress) payload.landlordAddress = formData.landlordAddress;
                if (formData.tenantName) payload.tenantName = formData.tenantName;
                if (formData.tenantAddress) payload.tenantAddress = formData.tenantAddress;
                if (formData.tenancyStartDate) payload.tenancyStartDate = formData.tenancyStartDate;
                if (formData.agreementDate) payload.agreementDate = formData.agreementDate;
                if (formData.rentPayment) payload.rentPayment = formData.rentPayment;
                if (formData.rentPaymentInWords) payload.rentPaymentInWords = formData.rentPaymentInWords;
                if (formData.tenancyEndDate) payload.tenancyEndDate = formData.tenancyEndDate;
                if (formData.selectedCurrency) payload.selectedCurrency = formData.selectedCurrency;
                if (DocType) payload.DocType = DocType;
                if (FormName) payload.FormName = FormName;
                const response = await api.post('/enterprise/document/create/AgreementFormDocument', payload);
                if (response?.data?.success) {
                    toast.success(`${response?.data?.message}`)
                }
            } catch (error) {
                if (error?.response?.data?.error?.errors) {
                    toast.error(error?.response?.data?.error?.errors?.[0])
                } else if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            } finally {
                fetchData()
            }
        } else {
            try {
                const payload = {};
                if (formData.propDesc) payload.propertyDesc = formData.propDesc;
                if (formData.propAddress) payload.propertyAddress = formData.propAddress;
                if (formData.landlordName) payload.landlordName = formData.landlordName;
                if (formData.landlordAddress) payload.landlordAddress = formData.landlordAddress;
                if (formData.tenantName) payload.tenantName = formData.tenantName;
                if (formData.tenantAddress) payload.tenantAddress = formData.tenantAddress;
                if (formData.tenancyStartDate) payload.tenancyStartDate = formData.tenancyStartDate;
                if (formData.agreementDate) payload.agreementDate = formData.agreementDate;
                if (formData.rentPayment) payload.rentPayment = formData.rentPayment;
                if (formData.rentPaymentInWords) payload.rentPaymentInWords = formData.rentPaymentInWords;
                if (formData.tenancyEndDate) payload.tenancyEndDate = formData.tenancyEndDate;
                if (formData.selectedCurrency) payload.selectedCurrency = formData.selectedCurrency;
                if (DocType) payload.DocType = DocType;
                if (FormName) payload.FormName = FormName;
                const response = await api.patch(`/enterprise/document/update/agreementFormDocument/${formData?._id}`, payload);
                if (response?.data?.success) {
                    toast.success(`${response?.data?.message}`)
                }
            } catch (error) {
                if (error?.response?.data?.error?.errors) {
                    toast.error(error?.response?.data?.error?.errors?.[0])
                } else if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            } finally {
                fetchData()
            }
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className='mt-4 pr-2'>
            <div className=''>
                <Input
                    label={"Property Description"}
                    placeholder={"e.g Five (5) bedroom, terraced apartment with one (1) boys quarter"}
                    type={"text"}
                    value={formData.propDesc}
                    onChange={(e) => setFormData('propDesc', e.target.value)}
                    autoComplete={"property-desc"}
                />
                {errors.propDesc && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propDesc}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Address"}
                    placeholder={"e.g Plot 1, Sun shine Estate, Lekki Phase 1, Lagos"}
                    type={"text"}
                    value={formData.propAddress}
                    onChange={(e) => setFormData('propAddress', e.target.value)}
                    autoComplete={"propertyAddress"}
                />
                {errors.propAddress && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propAddress}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Landlord’s Name"}
                    placeholder={"e.g Mr. Benjamin Olamide"}
                    type={"text"}
                    value={formData.landlordName}
                    onChange={(e) => setFormData('landlordName', e.target.value)}
                    autoComplete={"landlordName"}
                />
                {errors.landlordName && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.landlordName}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Landlord’s Address"}
                    placeholder={"e.g No 1, Pluto street, Lekki Phase 1, Lagos"}
                    type={"text"}
                    value={formData.landlordAddress}
                    onChange={(e) => setFormData('landlordAddress', e.target.value)}
                    autoComplete={"landlordAddress"}
                />
                {errors.landlordAddress && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.landlordAddress}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenant’s Name"}
                    placeholder={"e.g Mr. Sylvester David"}
                    type={"text"}
                    value={formData.tenantName}
                    onChange={(e) => setFormData('tenantName', e.target.value)}
                    autoComplete={"tenantName"}
                />
                {errors.tenantName && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.tenantName}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenant’s Address"}
                    placeholder={"e.g No 2, Nile street, Aja, Lagos"}
                    type={"text"}
                    value={formData.tenantAddress}
                    onChange={(e) => setFormData('tenantAddress', e.target.value)}
                    autoComplete={"tenantAddress"}
                />
                {errors.tenantAddress && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.tenantAddress}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenancy Commencement Date"}
                    placeholder={"e.g 1 July, 2024"}
                    type={"date"}
                    value={formatDate(formData.tenancyStartDate)}
                    onChange={(e) => setFormData('tenancyStartDate', e.target.value)}
                    autoComplete={"tenantCommencementDate"}
                />
                {errors.tenancyStartDate && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.tenancyStartDate}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenancy Ending Date"}
                    placeholder={"e.g 31 June, 2025"}
                    type={"date"}
                    value={formatDate(formData.tenancyEndDate)}
                    onChange={(e) => setFormData('tenancyEndDate', e.target.value)}
                    autoComplete={"tenancyEndDate"}
                />
                {errors.tenancyEndDate && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.tenancyEndDate}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Rent Paid (In Words)"}
                    placeholder={"e.g Eight Million Naira"}
                    type={"text"}
                    value={formData.rentPaymentInWords}
                    onChange={(e) => setFormData('rentPaymentInWords', e.target.value)}
                    autoComplete={"rentPaidInWords"}
                />
                {errors.rentPaymentInWords && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.rentPaymentInWords}
                </span>}
            </div>
            <div className='mt-2 w-full flex flex-col md:flex-row gap-2 md:justify-between items-end'>
                <div className='w-full md:w-[48%]'>
                    <Input
                        label={"Rent Paid (in Figures)"}
                        placeholder={"e.g 8,000,000"}
                        type={"text"}
                        value={formData.rentPayment}
                        onChange={(e) => setFormData('rentPayment', e.target.value)}
                        autoComplete={"rentPaidInFigures"}
                    />
                    {errors.rentPayment && <span className={`italic text-[12px] text-error font-[400]`}>
                        {errors.rentPayment}
                    </span>}
                </div>
                <div className='w-full md:w-[48%]'>
                    <DropDown
                        label={"Currency"}
                        options={options}
                        onSelect={(option) => setFormData('selectedCurrency', option)}
                        className={"text-[14px] font-[500] text-GrayHomz2"}
                        selectedCurrency={formData.selectedCurrency}
                    />
                    {errors.selectedCurrency && <span className={`italic text-[12px] text-error font-[400]`}>
                        {errors.selectedCurrency}
                    </span>}
                </div>
            </div>
            <div className='mt-2'>
                <Input
                    label={"Agreement Preparation Date"}
                    placeholder={"e.g 30 June, 2024"}
                    type={"date"}
                    value={formatDate(formData.agreementDate)}
                    onChange={(e) => setFormData('agreementDate', e.target.value)}
                    autoComplete={"agreementDate"}
                />
                {errors.agreementDate && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.agreementDate}
                </span>}
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
                        onClick={handleGenerate}
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
