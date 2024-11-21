import React, { useEffect, useRef, useState } from 'react'
import Input from "@/pages/dashboard/enterprise/components/input";
import DropDown from './dropDown';
import ArrowLeftBlueSmall from '@/components/icons/arrowLeftBlueSmall';
import ArrowRightWhiteSmall from '@/components/icons/arrowRightWhiteSmall';
import useQuickNoticeFormStore from '@/store/document/useQuickNoticeFormStore';
import BluePhoto from '@/components/icons/bluePhoto';
import Image from 'next/image';
import useProfileStore from '@/store/profile';
import { usePathname, useRouter } from 'next/navigation';
import useTabForDocuGen from '@/store/document/useTabForDocuGen';
import useGetAllDocument from '@/store/document/getAllDocument';
import FormSelection from '@/store/document/FormSelection';
import formatDate from '@/utils/formatDateForDocu';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import toast from 'react-hot-toast';
import api from '@/utils/api';

const QuitNoticeForm = ({ handlePageChangeTwo, setShowPreview, setDocumentCreation }) => {
    const [hover, setHover] = useState(false);
    const [hoverII, setHoverII] = useState(false);
    const fileInputRef = useRef(null);
    const { formData, setFormData, mergeFormData } = useQuickNoticeFormStore();
    const options = ["Monthly", "Quarterly", "Annually"];
    const [errors, setErrors] = useState({
        propertyManagerCompanyEmail: "",
    });
    const router = useRouter();
    const path = usePathname();
    const [hasPropertyManager, setHasPropertyManager] = useState(false);
    const { profile } = useProfileStore();
    const { setHomePage } = useTabForDocuGen();
    const { DocType, FormName } = FormSelection();
    const { fetchData } = useGetAllDocument(state => ({ fetchData: state.fetchData }));
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            try {
                const formDatas = new FormData();

                // Append only fields with values to FormData object
                if (formData.propertyManagerName) formDatas.append('propertyManagerName', formData?.propertyManagerName);
                if (formData.propertyManagerCompanyName) formDatas.append('propertyManagerCompanyName', formData?.propertyManagerCompanyName);
                if (formData.propertyManagerCompanyEmail) formDatas.append('propertyManagerCompanyEmail', formData?.propertyManagerCompanyEmail);
                if (formData.propertyManagerCompanyAddress) formDatas.append('propertyManagerCompanyAddress', formData?.propertyManagerCompanyAddress);
                if (formData.propertyManagerCompanyWebsite) formDatas.append('propertyManagerCompanyWebsite', formData.propertyManagerCompanyWebsite);
                formDatas.append('noticeStartDate', formatDate(formData?.noticeStartDate));
                if (formData.tenantName) formDatas.append('tenantName', formData?.tenantName);
                if (formData.propertyAddress) formDatas.append('propertyAddress', formData?.propertyAddress);
                if (formData.propertyDesc) formDatas.append('propertyDesc', formData?.propertyDesc);
                if (formData.duration) formDatas.append('duration', formData?.duration);
                if (formData.noticePeriod) formDatas.append('noticePeriod', formData?.noticePeriod);
                if (formData.tenantAddress) formDatas.append('tenantAddress', formData?.tenantAddress);
                if (formData.landlordName) formDatas.append('landlordName', formData?.landlordName);
                if (FormName) formDatas.append('FormName', FormName);
                if (DocType) formDatas.append('DocType', DocType);

                // Append image if it exists
                if (formData?.image && formData.image instanceof File) {
                    formDatas.append('image', formData.image);
                }


                const response = await api.post('/enterprise/document/create/QuickNoticeFormDocument', formDatas);
                if (response?.data?.success) {
                    toast.success(`${response?.data?.message}`)
                }
                setShowPreview(true);
                mergeFormData(response?.data?.data)
                fetchData();
            } catch (error) {
                if (error?.response?.data?.error?.errors) {
                    toast.error(error?.response?.data?.error?.errors?.[0])
                } else if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const formDatas = new FormData();

                // Append only fields with values to FormData object
                if (formData.propertyManagerName !== null) formDatas.append('propertyManagerName', formData?.propertyManagerName);
                if (formData.propertyManagerCompanyName !== null) formDatas.append('propertyManagerCompanyName', formData?.propertyManagerCompanyName);
                if (formData.propertyManagerCompanyEmail !== null) formDatas.append('propertyManagerCompanyEmail', formData?.propertyManagerCompanyEmail);
                if (formData.propertyManagerCompanyAddress !== null) formDatas.append('propertyManagerCompanyAddress', formData?.propertyManagerCompanyAddress);
                if (formData.propertyManagerCompanyWebsite !== null) formDatas.append('propertyManagerCompanyWebsite', formData.propertyManagerCompanyWebsite);
                formDatas.append('noticeStartDate', formatDate(formData?.noticeStartDate));
                if (formData.tenantName !== null) formDatas.append('tenantName', formData?.tenantName);
                if (formData.propertyAddress !== null) formDatas.append('propertyAddress', formData?.propertyAddress);
                if (formData.propertyDesc !== null) formDatas.append('propertyDesc', formData?.propertyDesc);
                if (formData.duration !== null) formDatas.append('duration', formData?.duration);
                if (formData.noticePeriod !== null) formDatas.append('noticePeriod', formData?.noticePeriod);
                if (formData.tenantAddress !== null) formDatas.append('tenantAddress', formData?.tenantAddress);
                if (formData.landlordName !== null) formDatas.append('landlordName', formData?.landlordName);
                if (FormName) formDatas.append('FormName', FormName);
                if (DocType) formDatas.append('DocType', DocType);

                // Append image if it exists
                if (formData?.image && formData.image instanceof File) {
                    formDatas.append('image', formData.image);
                }

                const response = await api.patch(`/enterprise/document/update/QuickNoticeFormDocument/${formData?._id}`, formDatas);
                if (response?.data?.success) {
                    toast.success(`${response?.data?.message}`)
                }
                setShowPreview(true);
                mergeFormData(response?.data?.data)
                fetchData();
            } catch (error) {
                if (error?.response?.data?.error?.errors) {
                    toast.error(error?.response?.data?.error?.errors?.[0])
                } else if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            } finally {
                setLoading(false);
            }
        }
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

    const handleSetErrors = (field, message) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: message,
        }));
    };


    return (
        <div className='mt-4 pr-2'>
            <div className="relative w-[80px] h-[80px] mb-2">
                <div>
                    <Image
                        src={formData?.image && formData.image instanceof File
                            ? URL.createObjectURL(formData.image) : formData?.image?.url ? formData?.image?.url : "/DocumentEmptyImage.png"}
                        width={172}
                        height={60}
                        alt="avatar"
                        className="object-cover bg-center h-[60px] cursor-pointer"
                        onClick={handleImageClick}
                    />
                </div>
                <div
                    onClick={handleImageClick}
                    className={`${formData?.image !== null ? "hidden" : ""} absolute top-1/4 right-1/3 cursor-pointer`}
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
                    placeholder={"e.g 6"}
                    type={"number"}
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
                    value={formatDate(formData.noticeStartDate)}
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
                    onChange={(e) => {
                        setFormData('propertyManagerCompanyEmail', e.target.value)
                        if (errors.propertyManagerCompanyEmail) {
                            setErrors({ ...errors, propertyManagerCompanyEmail: '' });
                        }
                    }}
                    onBlur={() => {
                        // Validate email when input field loses focus
                        const email = formData.propertyManagerCompanyEmail;
                        if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                            handleSetErrors(
                                'propertyManagerCompanyEmail',
                                'Invalid email format'
                            );
                        }
                    }}
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
                    placeholder={"e.g https://www.RealEstateCo.com"}
                    type={"text"}
                    value={formData.propertyManagerCompanyWebsite}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFormData('propertyManagerCompanyWebsite', value); // Update value directly
                    }}
                    onBlur={(e) => {
                        let value = e.target.value;
                        // Add https:// only if the input is not empty and doesn't start with http or https
                        if (value && !/^https?:\/\//i.test(value)) {
                            value = `https://${value}`;
                            setFormData('propertyManagerCompanyWebsite', value);
                        }
                    }}
                    autoComplete={"propertyManagerCompanyWebsite"}
                />
                {errors.propertyManagerCompanyWebsite && <span className={`italic text-[12px] text-error font-[400]`}>
                    {errors.propertyManagerCompanyWebsite}
                </span>}
            </div>
            <div className={`${loading ? "pointer-events-none" : ""} flex items-center justify-between gap-4 md:gap-0 mt-10 mb-4 text-[16px] font-[500]`}>
                <div
                    onClick={() => setDocumentCreation(false)}
                    className='h-[48px] border border-BlueHomz w-[60%] md:w-[20%] rounded-[4px] text-BlueHomz hover:text-white flex justify-center items-center cursor-pointer hover:bg-BlueHomz'>
                    <p>
                        Close
                    </p>
                </div>
                <div className='flex gap-4 w-full md:w-[50%]'>
                    <div
                        onClick={handlePageChangeTwo}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className='hidden h-[48px] border border-BlueHomz w-[45%] rounded-[4px] text-BlueHomz hover:text-white md:flex gap-1 justify-center items-center cursor-pointer hover:bg-BlueHomz2'>
                        {hover ? <ArrowLeftBlueSmall className='#ffffff' /> : <ArrowLeftBlueSmall />}  Go Back
                    </div>
                    <div
                        onClick={() => {
                            if (formData?.propertyManagerCompanyEmail && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.propertyManagerCompanyEmail)) {
                                // If the email format is invalid, return early or handle the error
                                return toast.error("Invalid email format");
                            }
                            handleGenerate()
                        }}
                        onMouseEnter={() => setHoverII(true)}
                        onMouseLeave={() => setHoverII(false)}
                        className={`${loading ? "pointer-events-none w-full flex justify-center" : ""} h-[48px] hover:border hover:border-BlueHomz w-full md:w-[60%] rounded-[4px] flex gap-1 justify-center items-center cursor-pointer text-white hover:text-BlueHomz bg-BlueHomz hover:bg-whiteblue`}>
                        {loading ? (
                            <LoadingFormII />
                        ) : (
                            <>
                                {"Save & Generate"}
                                {hoverII ? (
                                    <ArrowRightWhiteSmall />
                                ) : (
                                    <ArrowRightWhiteSmall className="#ffffff" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuitNoticeForm;
