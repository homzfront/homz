import React from 'react'
import { chooseState } from '@/api/selectStateArea';
import ArrowRightSmall from '@/components/icons/arrowRightSmall';
import ArrowRightLine from '@/components/icons/arrowRightLine';
import ArrowRight from '@/components/icons/arrowRight';
import InputField from '@/app/know-tenant/components/inputField';
import Dropdown from '@/app/know-tenant/components/dropDown';
import UpdateButton from '../../components/updateButton';

const PersonalInfoma = ({ setStep, register, setFormData, formData }) => {
    const [state, setState] = React.useState(null);
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
        setFormData((prev) => ({ ...prev, ["AccommodationType"]: value, }));
    };
    React.useEffect(() => {
        const showState = async () => {
            const result = await chooseState()
            setState(result?.data)
        }
        showState()
    }, [])
    const genderType = [
        { id: 1, label: "Male" },
        { id: 2, label: "Female" }
    ]
    const maritalStatus = [
        { id: 1, label: "Single" },
        { id: 2, label: "Married" },
        { id: 3, label: "Divorced" },
        { id: 4, label: "Engaged" },
        { id: 5, label: "Widowed" }
    ]
    const rentPurpose = [
        { id: 1, label: "Food" },
        { id: 2, label: "Health care" },
        { id: 3, label: "Housing" },
        { id: 4, label: "Road" },
        { id: 5, label: "Cast" }
    ]
    const accommodationType = [
        { id: 1, label: "Boys Quarters" },
        { id: 2, label: "Mini-flat" },
        { id: 3, label: "Penthouse" },
        { id: 4, label: "Self contain" },
        { id: 5, label: "Studio Apartment" },
        { id: 6, label: "Block of flats" },
        { id: 7, label: "Detached Bungalow" },
        { id: 8, label: "Semi-Detached Bungalow" },
        { id: 9, label: "Terraced Bungalow" },
        { id: 10, label: "Detached Duplex" },
        { id: 11, label: "Semi-Detached Duplex" },
        { id: 12, label: "Terraced Duplex" },
    ]
    const changePage = () => {
        if (formData) {
            setStep(1)
        }
    }
    return (
        <div className=''>
            <div className='flex flex-col gap-4'>
                <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <InputField label={"Full Name"} register={register} placeholder={"[Adeyemo Olayemi]"} formData={formData} setFormData={setFormData} />
                        <Dropdown label={"Gender"} options={genderType} register={register} onSelect={setFormValues} emptyValue={"Select Gender"} />
                        <InputField label={"Phone Number"} type='number' register={register} placeholder={"[0000 - 000 - 0000]"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Email"} register={register} type='email' placeholder={"[SylvesterJohn5@gmail.com]"} formData={formData} setFormData={setFormData} />
                        <Dropdown label={"Marital Status"} options={maritalStatus} register={register} onSelect={setFormValuesMari} emptyValue={"Select status"} />
                        <InputField label={"Apartment Address"} register={register} placeholder={"[Apartment Address]"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Office Address"} register={register} placeholder={"e.g No 24, Arise District, Maryland, Lagos State"} formData={formData} setFormData={setFormData} />
                        <InputField label={"Permanent Contact Address"} register={register} placeholder={"e.g No 17, Sungbola Street, Isale Eko, Lagos State"} formData={formData} setFormData={setFormData} />
                    </div>
                </div>
                <div className='bg-[#FCFCFC] rounded-[12px] p-4'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <InputField label={"Nationality"} register={register} placeholder={"e.g Nigerian"} formData={formData} setFormData={setFormData} />
                        <Dropdown className={`${!state && "pointer-events-none"}`} label={"State of Origin"} options={state} register={register} onSelect={setFormValuesState} emptyValue={"Select State"} />
                        <InputField label={"Religion"} register={register} placeholder={"e.g Christian"} formData={formData} setFormData={setFormData} />
                        <Dropdown label={"Rent Purpose"} options={rentPurpose} register={register} onSelect={setFormValuesRentPo} emptyValue={"Select purpose"} />
                        <Dropdown label={"Accommodation Type"} options={accommodationType} register={register} onSelect={setFormValuesAccoType} emptyValue={"Select type"} />
                        <InputField label={"When Do You Intend To Move In"} register={register} placeholder={"e.g 5th October, 2024"} formData={formData} setFormData={setFormData} />

                    </div>
                </div>
            </div>

            <UpdateButton />
        </div>
    )
}

export default PersonalInfoma