import React, { useEffect, useRef, useState } from 'react'
import Input from "@/pages/dashboard/enterprise/components/input";
import DropDown from './dropDown';
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall';
import ArrowRightWhiteSmall from '@/components/icons/arrowRightWhiteSmall';
import useQuickNoticeFormStore from '@/store/document/useQuickNoticeFormStore';
import BluePhoto from '@/components/icons/bluePhoto';
import Image from 'next/image';
import { z } from 'zod';
import quitNoticeSchema from '@/validation/quitNoticeSchema'
import useProfileStore from '@/store/profile';
import { usePathname, useRouter } from 'next/navigation';

const QuitNoticeForm = ({ handlePageChangeTwo, setShowPreview, setDocumentCreation }) => {
    const [hover, setHover] = useState(false);
    const [hoverII, setHoverII] = useState(false);
    const { formData, setFormData, mergeFormData } = useQuickNoticeFormStore();
    const options = ["Monthly", "Quarterly", "Annually"];
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const path = usePathname();
    const [hasPropertyManager, setHasPropertyManager] = useState(false);
    const { profile } = useProfileStore();

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


    const normalizeFormData = (data) => {
        return Object.keys(data).reduce((acc, key) => {
            acc[key] = data[key] === null ? '' : data[key]; // Convert null to empty string
            return acc;
        }, {});
    };
    // Function to validate form fields using Zod
    const validateForm = () => {
        const normalizedFormData = normalizeFormData(formData); // Normalize null values
        try {
            quitNoticeSchema.parse(normalizedFormData);
            setErrors({});
            return true;
        } catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors = e.errors.reduce((acc, error) => {
                    if (error.path.length) {
                        acc[error.path[0]] = error.message;
                    }
                    return acc;
                }, {});
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const generateUniqueId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    };

    const handleGenerate = () => {
        if (path !== "/dashboard/enterprise-property/documentGeneration") {
            router.push(url);
            
        } else {
        const existingId = formData.id;
        // if (validateForm()) {
            if (existingId) {
                // ID exists, update existing data
                mergeFormData(formData);
            } else {
                // ID does not exist, generate new ID and create new entry
                setFormData('id', generateUniqueId());
            }
            setShowPreview(true);
        }
        // } else if
        //     (
        //     formData?.noticePeriod !== '' &&
        //     formData?.noticeStartDate !== '' &&
        //     formData?.propertyDesc !== '' &&
        //     formData?.propertyAddress !== '' &&
        //     formData?.landlordName !== '' &&
        //     formData?.tenantName !== '' &&
        //     formData?.tenantAddress !== '' &&
        //     formData?.duration !== null &&
        //     formData?.propertyManagerName !== '' &&
        //     formData?.propertyManagerCompanyName !== '' &&
        //     formData?.propertyManagerCompanyEmail !== '' &&
        //     formData?.propertyManagerCompanyAddress !== '' &&
        //     formData?.propertyManagerCompanyWebsite !== '' &&
        //     formData?.image !== null
        // ) {
        //     if (existingId) {
        //         // ID exists, update existing data
        //         mergeFormData(formData);
        //     } else {
        //         // ID does not exist, generate new ID and create new entry
        //         setFormData('id', generateUniqueId());
        //     }
        //     setShowPreview(true);
        // }
        // else {
        //     return;

        // }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData('image', file);
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

    return (
        <div className='mt-4 pr-2'>
            <div className="relative w-[80px] h-[80px] mb-2">
                <div>
                    <Image
                        src={formData?.image && formData.image instanceof File
                            ? URL.createObjectURL(formData.image) : "/Ellipse 75.png"}
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
                    label={"Notice Period (Months)"}
                    placeholder={"e.g 6 months"}
                    type={"text"}
                    value={formData.noticePeriod}
                    onChange={(e) => setFormData('noticePeriod', e.target.value)}
                    autoComplete={"noticePeriod"}
                />
                {errors.noticePeriod && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.noticePeriod}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Notice Commencement Date"}
                    placeholder={"e.g 1 July, 2024"}
                    type={"date"}
                    value={formData.noticeStartDate}
                    onChange={(e) => setFormData('noticeStartDate', e.target.value)}
                    autoComplete={"noticeStartDate"}
                />
                {errors.noticeStartDate && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.noticeStartDate}
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
                    label={"Landlord’s Name"}
                    placeholder={"e.g Mr. Sylvester David"}
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
            <div className='mt-2 w-full'>
                <DropDown
                    label={"Tenancy Duration"}
                    options={options}
                    onSelect={(option) => setFormData('duration', option)}
                    className={"text-[14px] font-[500] text-GrayHomz2"}
                    selectedCurrency={formData.duration}
                    autoComplete={"tenancyDuration"}
                />
                {errors.duration && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.duration}
                </span>}
            </div>
            <div className='mt-2'>
                <Input
                    label={"Property Manager’s Name"}
                    placeholder={"e.g Mr. Steven John"}
                    type={"text"}
                    value={formData.propertyManagerName}
                    onChange={(e) => setFormData('propertyManagerName', e.target.value)}
                    autoComplete={"propertyManagerName"}
                />
                {errors.propertyManagerName && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyManagerName}
                </span>}
            </div>
            <div className='mt-2'>
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
                    label={"Property Manager’s Company Address"}
                    placeholder={"e.g No 18, Ambient Street, Lekki, Lagos"}
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
                    label={"Property Manager’s Company Website"}
                    placeholder={"e.g www.RealEstateCo.com"}
                    type={"text"}
                    value={formData.propertyManagerCompanyWebsite}
                    onChange={(e) => setFormData('propertyManagerCompanyWebsite', e.target.value)}
                    autoComplete={"propertyManagerCompanyWebsite"}
                />
                {errors.propertyManagerCompanyWebsite && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyManagerCompanyWebsite}
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

export default QuitNoticeForm;
