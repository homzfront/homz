import React, { useEffect, useRef, useState } from 'react'
import Input from "@/pages/dashboard/enterprise/components/input";
import DropDown from './dropDown';
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall';
import ArrowRightWhiteSmall from '@/components/icons/arrowRightWhiteSmall';
import useReceiptFormStore from '@/store/document/useReceiptFormStore';
import BluePhoto from '@/components/icons/bluePhoto';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import useProfileStore from '@/store/profile';
import useTabForDocuGen from '@/store/document/useTabForDocuGen';
import FormSelection from '@/store/document/FormSelection';
import api from '@/utils/api';
import useGetAllDocument from '@/store/document/getAllDocument';
import { toast } from "react-hot-toast";
import extractNumber from '@/utils/removeCommasFromString';

const ReceiptForm = ({ handlePageChangeTwo, setShowPreview, setDocumentCreation }) => {
    const [hover, setHover] = useState(false);
    const [hoverII, setHoverII] = useState(false);
    const { formData, setFormData, mergeFormData } = useReceiptFormStore();
    const optionsII = ["Naira (₦)", "Dollar ($)", "Pound (￡)", "Euro (€)"];
    const fileInputRef = useRef(null);
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

    useEffect(() => {
        if (profile) {
            setHasPropertyManager(hasPropertyManagerAccount(profile));
        }
    }, [profile]);

    const url = !profile ? "/register" : hasPropertyManager
        ? "/dashboard/enterprise-property/documentGeneration"
        : "/switch-profile";

    const handleGenerate = async () => {
        // Determine navigation based on the current path
        if (path !== "/dashboard/enterprise-property/documentGeneration") {
            setHomePage(true);
            router.push(url);
            return;
        } 
        else if (!formData?._id) {
            try {
                const formDatas = new FormData();

                // Append only fields with values to FormData object
                if (formData.propertyManagerCompanyName) formDatas.append('propertyManagerCompanyName', formData?.propertyManagerCompanyName);
                if (formData.propertyManagerCompanyEmail) formDatas.append('propertyManagerCompanyEmail', formData?.propertyManagerCompanyEmail);
                if (formData.propertyManagerCompanyAddress) formDatas.append('propertyManagerCompanyAddress', formData?.propertyManagerCompanyAddress);
                if (formData.propertyManagerCompanyPhoneNumber) formDatas.append('propertyManagerCompanyPhoneNumber', formData.propertyManagerCompanyPhoneNumber);
                if (formData.receiptDate) formDatas.append('receiptDate', formData?.receiptDate);
                if (formData.tenantName) formDatas.append('tenantName', formData?.tenantName);
                if (formData.tenantPhoneNumber) formDatas.append('tenantPhoneNumber', formData?.tenantPhoneNumber);
                if (formData.propertyAddress) formDatas.append('propertyAddress', formData?.propertyAddress);
                if (formData.propertyDesc) formDatas.append('propertyDesc', formData?.propertyDesc);
                if (formData.rentPayment) formDatas.append('rentPayment', extractNumber(formData?.rentPayment));
                if (formData.rentPaymentInWords) formDatas.append('rentPaymentInWords', formData?.rentPaymentInWords);
                if (formData.selectedCurrency) formDatas.append('selectedCurrency', formData?.selectedCurrency);
                if (formData.tenancy) formDatas.append('tenancy', formData?.tenancy);
                if (formData.tenancyPeriod) formDatas.append('tenancyPeriod', formData?.tenancyPeriod);
                if (formData.tenancyStartDate) formDatas.append('tenancyStartDate', formData?.tenancyStartDate);
                if (formData.tenancyEndDate) formDatas.append('tenancyEndDate', formData?.tenancyEndDate);
                if (formData.modOfPayment) formDatas.append('modOfPayment', formData?.modOfPayment);
                if (FormName) formDatas.append('FormName', FormName);
                if (DocType) formDatas.append('DocType', DocType);

                // Append image if it exists
                if (formData?.image && formData.image instanceof File) {
                    formDatas.append('image', formData.image);
                }


                const response = await api.post('/enterprise/document/create/receiptFormDocument', formDatas);
                if (response?.data?.success) {
                    toast.success(`${response?.data?.message}`)
                }
                setShowPreview(true);
            } catch (error) {
                if (error?.response?.data?.error?.errors) {
                    toast.error(error?.response?.data?.error?.errors?.[0])
                } else if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            } finally {
                fetchData();
            }
        } else {
            try {
                const formDatas = new FormData();

                // Append only fields with values to FormData object
                if (formData.propertyManagerCompanyName) formDatas.append('propertyManagerCompanyName', formData?.propertyManagerCompanyName);
                if (formData.propertyManagerCompanyEmail) formDatas.append('propertyManagerCompanyEmail', formData?.propertyManagerCompanyEmail);
                if (formData.propertyManagerCompanyAddress) formDatas.append('propertyManagerCompanyAddress', formData?.propertyManagerCompanyAddress);
                if (formData.propertyManagerCompanyPhoneNumber) formDatas.append('propertyManagerCompanyPhoneNumber', formData.propertyManagerCompanyPhoneNumber);
                if (formData.receiptDate) formDatas.append('receiptDate', formData?.receiptDate);
                if (formData.tenantName) formDatas.append('tenantName', formData?.tenantName);
                if (formData.tenantPhoneNumber) formDatas.append('tenantPhoneNumber', formData?.tenantPhoneNumber);
                if (formData.propertyAddress) formDatas.append('propertyAddress', formData?.propertyAddress);
                if (formData.propertyDesc) formDatas.append('propertyDesc', formData?.propertyDesc);
                if (formData.rentPayment) formDatas.append('rentPayment', extractNumber(formData?.rentPayment));
                if (formData.rentPaymentInWords) formDatas.append('rentPaymentInWords', formData?.rentPaymentInWords);
                if (formData.selectedCurrency) formDatas.append('selectedCurrency', formData?.selectedCurrency);
                if (formData.tenancy) formDatas.append('tenancy', formData?.tenancy);
                if (formData.tenancyPeriod) formDatas.append('tenancyPeriod', formData?.tenancyPeriod);
                if (formData.tenancyStartDate) formDatas.append('tenancyStartDate', formData?.tenancyStartDate);
                if (formData.tenancyEndDate) formDatas.append('tenancyEndDate', formData?.tenancyEndDate);
                if (formData.modOfPayment) formDatas.append('modOfPayment', formData?.modOfPayment);
                if (FormName) formDatas.append('FormName', FormName);
                if (DocType) formDatas.append('DocType', DocType);

                // Append image if it exists
                if (formData?.image && formData.image instanceof File) {
                    formDatas.append('image', formData.image);
                }


                const response = await api.post(`/enterprise/document/update/receiptFormDocument/${formData?._id}`, formDatas);
                if (response?.data?.success) {
                    toast.success(`${response?.data?.message}`)
                }
                setShowPreview(true);
            } catch (error) {
                if (error?.response?.data?.error?.errors) {
                    toast.error(error?.response?.data?.error?.errors?.[0])
                } else if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            } finally {
                fetchData();
            }
        }
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData('image', file,);
        }
    };

    const handleImageClick = () => {
        if (formData?.image) {
            setFormData('image', null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        fileInputRef.current.click();
    };

    const formatDate = (isoDate) => {
        // Use current date if isoDate is not provided or is undefined
        const date = isoDate ? new Date(isoDate) : new Date();
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    };
    
    return (
        <div className='mt-4 pr-2'>
            <div className='relative w-[80px] h-[80px] mb-2'>
                <div>
                    <Image
                        src={formData?.image && formData.image instanceof File
                            ? URL.createObjectURL(formData.image) : formData?.image?.url ? formData?.image?.url : "/Frame 1278.png"}
                        height={80}
                        width={80}
                        alt="avatar"
                        className="rounded-full object-cover bg-center h-[80px] cursor-pointer"
                        onClick={handleImageClick}
                    />
                </div>
                <div
                    onClick={handleImageClick}
                    className={`${formData?.image !== null ? "hidden" : ""} absolute top-1/3 right-1/3 cursor-pointer`}
                >
                    <BluePhoto />
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                {errors.image && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.image}
                </span>}
            </div>
            <div className=''>
                <Input
                    label={"Property Manager’s Company"}
                    placeholder={"e.g Real Estate Company Limited"}
                    type={"text"}
                    value={formData.propertyManagerCompanyName}
                    onChange={(e) => setFormData('propertyManagerCompanyName', e.target.value)}
                    autoComplete={"propertyManagerCompanyName"}
                />
                {errors.propertyManagerCompanyName && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyManagerCompanyName}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Manager’s Company Address"}
                    placeholder={"e.g No 2. Ademola Street, Surulere, Lagos"}
                    type={"text"}
                    value={formData.propertyManagerCompanyAddress}
                    onChange={(e) => setFormData('propertyManagerCompanyAddress', e.target.value)}
                    autoComplete={"propertyManagerCompanyAddress"}
                />
                {errors.propertyManagerCompanyAddress && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyManagerCompanyAddress}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Manager’s Company Email"}
                    placeholder={"e.g RealEstateCompany@gmail.com"}
                    type={"text"}
                    value={formData.propertyManagerCompanyEmail}
                    onChange={(e) => setFormData('propertyManagerCompanyEmail', e.target.value)}
                    autoComplete={"propertyManagerCompanyEmail"}
                />
                {errors.propertyManagerCompanyEmail && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyManagerCompanyEmail}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Manager’s Company Phone"}
                    placeholder={"e.g 08000000000"}
                    type={"number"}
                    value={formData.propertyManagerCompanyPhoneNumber}
                    onChange={(e) => setFormData('propertyManagerCompanyPhoneNumber', e.target.value)}
                    autoComplete={"propertyManagerCompanyPhoneNumber"}
                />
                {errors.propertyManagerCompanyPhoneNumber && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyManagerCompanyPhoneNumber}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Date"}
                    placeholder={"e.g 1 July, 2026"}
                    type={"date"}
                    value={formatDate(formData.receiptDate)}
                    onChange={(e) => setFormData('receiptDate', e.target.value)}
                    autoComplete={"receiptDate"}
                />
                {errors.receiptDate && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.receiptDate}
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
                    label={"Tenant’s Phone Number"}
                    placeholder={"e.g 08000000000"}
                    type={"number"}
                    value={formData.tenantPhoneNumber}
                    onChange={(e) => setFormData('tenantPhoneNumber', e.target.value)}
                    autoComplete={"tenantPhoneNumber"}
                />
                {errors.tenantPhoneNumber && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.tenantPhoneNumber}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Address"}
                    placeholder={"e.g Plot 1, Sun shine Estate, Lekki Phase 1, Lagos"}
                    type={"text"}
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData('propertyAddress', e.target.value)}
                    autoComplete={"propertyAddress"}
                />
                {errors.propertyAddress && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyAddress}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Description"}
                    placeholder={"e.g Five (5) bedroom, terraced apartment with one (1) boys quarter"}
                    type={"text"}
                    value={formData.propertyDesc}
                    onChange={(e) => setFormData('propertyDesc', e.target.value)}
                    autoComplete={"property-desc"}
                />
                {errors.propertyDesc && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyDesc}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Amount in words"}
                    placeholder={"e.g Eight Million Naira"}
                    type={"text"}
                    value={formData.rentPaymentInWords}
                    onChange={(e) => setFormData('rentPaymentInWords', e.target.value)}
                    autoComplete={"rentPaymentInWords"}
                />
                {errors.rentPaymentInWords && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.rentPaymentInWords}
                </span>}
            </div>
            <div className='mt-2 w-full flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between items-end'>
                <div className='w-full md:w-[48%]'>
                    <Input
                        label={"Amount in Figures"}
                        placeholder={"e.g 8,000,000"}
                        type={"text"}
                        value={formData.rentPayment}
                        onChange={(e) => setFormData('rentPayment', e.target.value)}
                        autoComplete={"rentPaymentInFigures"}
                    />
                    {errors.rentPayment && <span className={`italic text-[12px] text-error font-[400]`}>
                        {errors.rentPayment}
                    </span>}
                </div>
                <div className='w-full md:w-[48%]'>
                    <DropDown
                        label={"Currency"}
                        options={optionsII}
                        onSelect={(option) => setFormData('selectedCurrency', option)}
                        className={"text-[14px] font-[500] text-GrayHomz2"}
                        selectedCurrency={formData.selectedCurrency}
                    />
                    {errors.selectedCurrency && <span className={`italic text-[12px] text-error font-[400]`}>
                        {errors.selectedCurrency}
                    </span>}
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
                        autoComplete={"tenancyPeriod"}
                    />
                    {errors.tenancyPeriod && <span className={`italic text-[12px] text-error font-[400]`}>
                        {errors.tenancyPeriod}
                    </span>}
                </div>
                <div className='w-full mt-[-16px] md:w-[48%]'>
                    <Input
                        placeholder={"Month(s) / Year(s)"}
                        type={"text"}
                        value={formData.tenancy}
                        onChange={(e) => setFormData('tenancy', e.target.value)}
                        autoComplete={"tenancy"}
                    />
                    {errors.tenancy && <span className={`italic text-[12px] text-error font-[400]`}>
                        {errors.tenancy}
                    </span>}
                </div>
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenancy Start Date"}
                    placeholder={"e.g 1 July, 2024"}
                    type={"date"}
                    value={formatDate(formData.tenancyStartDate)}
                    onChange={(e) => setFormData('tenancyStartDate', e.target.value)}
                    autoComplete={"tenancyStartDate"}
                />
                {errors.tenancyStartDate && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.tenancyStartDate}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Tenancy End Date"}
                    placeholder={"e.g 31, 2025"}
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
                    label={"Mode of payment"}
                    placeholder={"e.g Cash/Cheque/Draft/Transfer"}
                    type={"text"}
                    value={formData.modOfPayment}
                    onChange={(e) => setFormData('modOfPayment', e.target.value)}
                    autoComplete={"modOfPayment"}
                />
                {errors.modOfPayment && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.modOfPayment}
                </span>}
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

export default ReceiptForm