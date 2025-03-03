import CloseSmall from '@/components/icons/closeSmall';
import React from 'react'
import PersonalKYC from './personalKYC';
import SpouseNextKYC from './spouseNextKYC';
import OccupationDetailsKYC from './occupationDetailsKYC';
import GuarantorsKYC from './guarantorsKYC';
import TenantVerificationKYC from './tenantVerificationKYC';

const WidgetKYC = ({ handlePrint, data, setOpenKYC }) => {
    const [step, setStep] = React.useState(0);

    const steps = [
        "Personal Information",
        "Spouse/Kin Information",
        "Occupant Details",
        "Guarantors",
        "Tenant Verification (KYC)",
    ];
    return (
        <div className="mt-[190px] md:mt-0 bg-white w-full min-w-[350px] max-w-[750px] p-4 rounded-[12px]">
            <div className="md:px-4">
                <div className='flex w-full items-start gap-2 md:gap-8'>
                    <div className="h-auto flex justify-center">
                        <div className="z-1 flex flex-wrap mb-0 md:mb-4 gap-4 md:gap-2 lg:gap-0 md:justify-between items-start w-full">
                            {steps.map((stepTitle, index) => (
                                <div
                                    onClick={() => {
                                        setStep(index)
                                    }}
                                    key={index} className={`cursor-pointer`}>
                                    <p className={`md:mt-2 ${step === index ? "text-BlueHomz" : "text-GrayHomz"} text-[12px] lg:text-[14px] font-normal flex flex-col gap-2`}>{stepTitle} <span>{step === index && <div className="p-0.5 bg-BlueHomz"></div>}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        onClick={() => setOpenKYC(false)}
                        className="cursor-pointer md:mt-2"
                    >
                        <CloseSmall />
                    </div>
                </div>
                <div>
                    {step === 0 && (
                        <PersonalKYC handlePrint={handlePrint} data={data} />
                    )}
                    {step === 1 && (
                        <SpouseNextKYC handlePrint={handlePrint} data={data} />
                    )}
                    {step === 2 && (
                        <OccupationDetailsKYC handlePrint={handlePrint} data={data} />
                    )}
                    {step === 3 && (
                        <GuarantorsKYC data={data} />
                    )}
                    {step === 4 && (
                        <TenantVerificationKYC />
                    )}
                </div>
            </div>

        </div>
    )
}

export default WidgetKYC