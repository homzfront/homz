import React from 'react'
import InputField from './inputField'
import Dropdown from './dropDown'
import { chooseState } from '@/api/selectStateArea';
import ArrowRightSmall from '@/components/icons/arrowRightSmall';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DateIcon from '@/components/icons/date';

const PersonalInfo = ({ setOpenSaveModal, onSubmit, setStep, register, setFormData, formData }) => {
    const [state, setState] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    const setFormValues = (value) => {
        setFormData((prev) => ({ ...prev, ["sex"]: value, }));
    };
    const setFormValuesMari = (value) => {
        setFormData((prev) => ({ ...prev, ["maritalStatus"]: value, }));
    };
    const setFormValuesState = (value) => {
        setFormData((prev) => ({ ...prev, ["stateOfOrigin"]: value, }));
    };
    const setFormValuesRentPo = (value) => {
        setFormData((prev) => ({ ...prev, ["rentPurpose"]: value, }));
    };
    const setFormValuesAccoType = (value) => {
        setFormData((prev) => ({ ...prev, ["accommodationType"]: value, }));
    };

    React.useEffect(() => {
        const showState = async () => {
            const result = await chooseState()
            setState(result?.data)
        }
        showState()
        const savedTenantEmail = localStorage.getItem("tenantEmail");
        setEmail(savedTenantEmail)
    }, []);

    const genderType = [
        { id: 1, label: "male" },
        { id: 2, label: "female" }
    ]
    const maritalStatus = [
        { id: 1, label: "single" },
        { id: 2, label: "married" },
    ]
    const rentPurpose = [
        { id: 1, label: "residential" },
        { id: 2, label: "commercial" },
    ]
    const accommodationType = [
        { id: 1, label: "room-self" },
        { id: 2, label: "mini-flat" },
        { id: 3, label: "two bedroom" },
        { id: 4, label: "three bedroom" },
        { id: 5, label: "duplex" },
        { id: 6, label: "others" },
    ]
    const changePage = () => {
        if (formData) {
            setStep(1)
        }
    }
    return (
        <div className='mt-4'>
            <div className='flex flex-col gap-4'>
                <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <InputField label={"Full Name"} register={register} placeholder={"[Adeyemo Olayemi]"} formData={formData} setFormData={setFormData} />
                        <Dropdown label={"Gender"} loadedData={formData?.sex} options={genderType} register={register} onSelect={setFormValues} emptyValue={"Select Gender"} />
                        <InputField label={"Phone Number"} type='number' register={register} placeholder={"[0000 - 000 - 0000]"} formData={formData} setFormData={setFormData} />
                        <div className={`relative inline-block w-full`}>
                            <label className="block text-GrayHomz text-sm font-medium mb-1">Email</label>
                            <input
                                value={email}
                                className={`mt-2 text-BlackHomz px-4 border pointer-events-auto flex items-center rounded-[4px] w-full p-2 focus:outline-none bg-transparent`}
                                placeholder={"[SylvesterJohn5@gmail.com]"}
                            />
                        </div>
                        <Dropdown label={"Marital Status"} loadedData={formData?.maritalStatus} options={maritalStatus} register={register} onSelect={setFormValuesMari} emptyValue={"Select status"} />
                        <InputField label={"Apartment Address"} register={register} placeholder={"[Apartment Address]"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Office Address"} register={register} placeholder={"e.g No 24, Arise District, Maryland, Lagos State"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Permanent Contact Address"} register={register} placeholder={"e.g No 17, Sungbola Street, Isale Eko, Lagos State"} formData={formData} setFormData={setFormData} />
                    </div>
                </div>
                <div className='border border-[#D5D5D5] rounded-[12px] p-4'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <InputField label={"Nationality"} register={register} placeholder={"e.g Nigerian"} formData={formData} setFormData={setFormData} />
                        <Dropdown className={`${!state && "pointer-events-none"}`} loadedData={formData?.stateOfOrigin} label={"State of Origin"} options={state} register={register} onSelect={setFormValuesState} emptyValue={"Select State"} />
                        <InputField label={"Religion"} register={register} placeholder={"e.g Christian"} formData={formData} setFormData={setFormData} />
                        <Dropdown label={"Rent Purpose"} loadedData={formData?.rentPurpose} options={rentPurpose} register={register} onSelect={setFormValuesRentPo} emptyValue={"Select purpose"} />
                        <Dropdown label={"Accommodation Type"} loadedData={formData?.accommodationType} options={accommodationType} register={register} onSelect={setFormValuesAccoType} emptyValue={"Select type"} />
                        <div className="w-full">
                            <label className="block text-GrayHomz text-sm font-medium mb-1">
                                When Do You Intend To Move In
                            </label>
                            <div className="w-full relative mt-2 rounded-md border">
                                <DatePicker
                                    selected={formData?.moveInDate}
                                    onChange={(date) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            "moveInDate": date,
                                        }));
                                    }}
                                    dateFormat="d MMMM, yyyy"
                                    placeholderText="e.g 5th October, 2024"
                                    className="outline-none h-[45px] px-4 p-2 placeholder:text-[12px] md:placeholder:text-[14px] w-[100%]"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <DateIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-0 justify-center md:justify-between md:items-center mt-6 mb-[60px]'>
                <p onClick={() => setOpenSaveModal(true)} className='cursor-pointer text-[16px] text-BlueHomz font-medium text-center md:text-start'>Save & skip to dashboard</p>
                <button onClick={changePage} className={`${formData ? "border border-BlueHomz text-BlueHomz hover:bg-whiteblue" : "pointer-events-none bg-GrayHomz6 text-GrayHomz5"} p-3 rounded-[4px] hidden md:flex items-center gap-1`}>
                    Next {formData ? <ArrowRightSmall className='#006aff' /> : <ArrowRightSmall className='#d5d5d5' />}
                </button>
                <button onClick={changePage} className={`${formData ? "bg-BlueHomz text-white hover:bg-blue-400" : "pointer-events-none bg-GrayHomz6 text-GrayHomz5"} w-full p-3 rounded-[4px] flex md:hidden justify-center items-center gap-1`}>
                    Next {formData ? <ArrowRightSmall className='#ffffff' /> : <ArrowRightSmall className='#d5d5d5' />}
                </button>
            </div>
        </div>
    )
}

export default PersonalInfo