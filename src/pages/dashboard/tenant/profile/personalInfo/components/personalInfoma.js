import React from 'react'
import { chooseState } from '@/api/selectStateArea';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import InputField from '@/app/know-tenant/components/inputField';
import Dropdown from '@/app/know-tenant/components/dropDown';
import UpdateButton from '../../components/updateButton';
import DateIcon from '@/components/icons/date';
import ArrowRightSmall from '@/components/icons/arrowRightSmall';
import LoadingII from '@/components/mainmenu/loadingII';
import LoadingFormII from '@/components/mainmenu/loadingFormII';

const PersonalInfoma = ({ setStep, loading, handleUpdate, setShowDialogue, showDialogue, success, setSuccess, updateDone, data, register, setFormData, formData }) => {
    const [state, setState] = React.useState(null);
    const setFormValues = (value) => {
        setFormData((prev) => ({ ...prev, ["gender"]: value, }));
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
    }, [])
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

    return (
        <div className=''>
            <div className='flex flex-col gap-4'>
                <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <InputField label={"Full Name"} register={register} placeholder={"[Adeyemo Olayemi]"} formData={formData} setFormData={setFormData} />
                        <Dropdown loadedData={formData?.gender} label={"Gender"} options={genderType} register={register} onSelect={setFormValues} emptyValue={"Select Gender"} />
                        <InputField label={"Phone Number"} type='number' register={register} placeholder={"[0000 - 000 - 0000]"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Email"} register={register} type='email' placeholder={"[SylvesterJohn5@gmail.com]"} formData={formData} setFormData={setFormData} />
                        <Dropdown label={"Marital Status"} loadedData={formData?.maritalStatus} options={maritalStatus} register={register} onSelect={setFormValuesMari} emptyValue={"Select status"} />
                        <InputField label={"Apartment Address"} register={register} placeholder={"[Apartment Address]"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Office Address"} register={register} placeholder={"e.g No 24, Arise District, Maryland, Lagos State"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Permanent Contact Address"} register={register} placeholder={"e.g No 17, Sungbola Street, Isale Eko, Lagos State"} formData={formData} setFormData={setFormData} />
                    </div>
                </div>
                <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <InputField label={"Nationality"} register={register} placeholder={"e.g Nigerian"} formData={formData} setFormData={setFormData} />
                        <Dropdown loadedData={formData?.stateOfOrigin} className={`${!state && "pointer-events-none"}`} label={"State of Origin"} options={state} register={register} onSelect={setFormValuesState} emptyValue={"Select State"} />
                        <InputField label={"Religion"} register={register} placeholder={"e.g Christian"} formData={formData} setFormData={setFormData} />
                        <Dropdown loadedData={formData?.rentPurpose} label={"Rent Purpose"} options={rentPurpose} register={register} onSelect={setFormValuesRentPo} emptyValue={"Select purpose"} />
                        <Dropdown loadedData={formData?.accommodationType} label={"Accommodation Type"} options={accommodationType} register={register} onSelect={setFormValuesAccoType} emptyValue={"Select type"} />
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
                                    className="h-[45px] px-4 p-2  placeholder:text-[12px] md:placeholder:text-[14px] w-[100%]"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <DateIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <UpdateButton
                loading={loading}
                updateDone={updateDone}
                showDialogue={showDialogue}
                setShowDialogue={setShowDialogue}
                doneUpdate={success}
                setDoneUpdate={setSuccess}
            /> */}
            <div className='flex w-full justify-end'>
                <button
                    onClick={async (e) => {
                        try {
                            await handleUpdate(e);
                            setStep(1);
                        } catch (error) {
                            console.error("Update failed:", error);
                        }
                    }}
                    className={`w-[140px] h-[45px] rounded-[4px] hover:bg-whiteblue border border-BlueHomz text-BlueHomz ${loading ? "pointer-events-none flex justify-center" : ""}`}
                >
                    {loading ? <LoadingFormII className='#006aff' /> :
                        <span className='flex justify-center items-center gap-2'>
                            Next   <ArrowRightSmall className="#006AFF" />
                        </span>
                    }
                </button>
            </div>
        </div>
    )
}

export default PersonalInfoma