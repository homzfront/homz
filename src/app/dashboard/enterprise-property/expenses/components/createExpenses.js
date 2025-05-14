import BackSmall from '@/components/icons/backSmall'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import DatePicker from "react-datepicker";
import DateIcon from "@/components/icons/date";
import Dropdown from "@/pages/dashboard/enterprise/components/dropDownTwo";
import Upload from '@/components/icons/upload';
import UploadWhite from '@/components/icons/uploadWhite';

const CreateExpenses = ({ setOpenCreateExpenses }) => {
    const [formData, setFormData] = React.useState({
        expenseName: "",
        amount: "",
        date: null,
        expenseCategory: "",
        description: "",
        paymentStatus: "",
        paymentMethod: "",
        businessAddress: "",
        vendorPhone: "",
        vendorEmail: "",
        contactPerson: "",
        vendorName: "",
        propertyName: "",
        apartmentNumber: "",
        tenantName: "",
        periods: [
            {
                id: uuidv4(),
                isActive: true,
                duration: "",
                startDate: null,
                dueDate: null,
                rent: "",
                paymentStatus: "",
            },
        ],
    });

    const handleInputChange = (index, field, value) => {
        const updatedPeriods = [...formData.periods];
        updatedPeriods[index][field] = value;
        setFormData((prevData) => ({
            ...prevData,
            periods: updatedPeriods,
        }));
    };

    const options = ["Property Maintenance & Repairs", "Utilities & Services", "Security & Safety", "Administrative & Office Expenses", "Marketing & Advertising", "Taxes & Insurance", "Staff & Payroll", "Legal & Professional Services", "Mortgage & Loan Payments", "Miscellaneous Expenses"]
    const optionsTwo = ["Paid", "Unpaid"]
    const optionsThree = ["Bank Transfer", "Cash", "POS"]

    return (
        <div>
            <button onClick={() => setOpenCreateExpenses(false)} className='text-sm font-normal text-GrayHomz2 flex items-center gap-1 px-8 mt-6'>
                <BackSmall /> Back
            </button>
            <div className='pb-6 pt-4 border-b border-[#E6E6E6] px-8'>
                <div>
                    <p className='text-[20px] text-BlackHomz font-medium'>
                        Add New Expense
                    </p>
                    <p className='mt-1 text-[18px] text-GrayHomz font-normal'>
                        Keep track of your property and business expenses effortlessly. Log every cost to stay on top of your finances.
                    </p>
                </div>
            </div>
            <div className='px-8 py-7 flex flex-col gap-6'>
                <div className="bg-[#FCFCFC] p-4 rounded-[8px] text-BlackHomz">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">
                                Expense Name <span className="text-error">*</span>
                            </label>
                            <input
                                value={formData.expenseName}
                                onChange={(e) => setFormData({ ...formData, expenseName: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="Security Cameras"
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='w-full md:w-[50%]'>
                                <label className="block text-sm font-medium">
                                    Amount<span className="text-error">*</span>
                                </label>
                                <div className="relative w-full">
                                    <input
                                        value={formData.amount}
                                        type='number'
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                        placeholder="200000"
                                    />
                                    <div className="font-sans z-[99] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        ₦
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-[50%]">
                                <label className="text-sm font-medium">Date <span className="text-error">*</span></label>
                                <div className="relative w-full border border-[#a9a9a9] rounded-md h-[45px]">
                                    <DatePicker
                                        selected={formData.date}
                                        onChange={(date) => handleInputChange(index, "date", date)}
                                        dateFormat="d MMMM, yyyy"
                                        placeholderText="Select Date"
                                        className="w-[100%] h-[41px] px-4 py-2 bg-transparent"
                                    />
                                    <div className="bg-transparent z-[99] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <DateIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Expense Category <span className="text-error">*</span>
                            </label>
                            <div className="w-full mt-0.5">
                                <Dropdown
                                    options={options}
                                    selectOption="Select an option"
                                    onSelect={(selectedOption) => handleInputChange(index, "expenseCategory", selectedOption)}
                                    value={formData.expenseCategory}
                                    border={"border-[#a9a9a9]"}
                                    className={"w-full"}
                                />
                            </div>
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Description <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <input
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g CCTV Installation & Maintenance"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Payment Status <span className="text-error">*</span>
                            </label>
                            <div className="w-full mt-0.5">
                                <Dropdown
                                    options={optionsTwo}
                                    selectOption="Select an option"
                                    onSelect={(selectedOption) => handleInputChange(index, "paymentStatus", selectedOption)}
                                    value={formData.paymentStatus}
                                    border={"border-[#a9a9a9]"}
                                    className={"w-full"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FCFCFC] p-4 rounded-[8px] text-BlackHomz">
                    <p className="block text-sm font-medium">
                        Vendor Details <span className="font-normal text-GrayHomz">(optional)</span>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Vendor Name <span className="text-error">*</span>
                            </label>
                            <input
                                value={formData.vendorName}
                                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g, Exquisite Electricals Ltd"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Contact Person <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <input
                                value={formData.contactPerson}
                                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g Samuel Davids"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Vendor Email <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <input
                                value={formData.vendorEmail}
                                onChange={(e) => setFormData({ ...formData, vendorEmail: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g Exquisiteelectricals@gmail.com"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Vendor Phone <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <input
                                value={formData.vendorPhone}
                                onChange={(e) => setFormData({ ...formData, vendorPhone: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g 07035400000"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Business Address <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <input
                                value={formData.businessAddress}
                                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g 17, Shadunke Plaza, Yaba, Lagos"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Payment Method <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <div className="w-full mt-0.5">
                                <Dropdown
                                    options={optionsThree}
                                    selectOption="Select an option"
                                    onSelect={(selectedOption) => handleInputChange(index, "paymentMethod", selectedOption)}
                                    value={formData.paymentMethod}
                                    border={"border-[#a9a9a9]"}
                                    className={"w-full"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#FCFCFC] p-4 rounded-[8px] text-BlackHomz">
                        <p className="block text-sm font-medium">
                            Attachment <span className="font-normal text-GrayHomz">(optional)</span>
                        </p>
                        <p className='text-GrayHomz text-[13px] font-normal'>
                            Upload up to 3 file attachments
                        </p>
                        <div>
                            <div className='mt-4 w-full bg-[#F6F6F6] border border-dashed border-[#D5D5D5] rounded-[12px] px-4 py-8'
                            >
                                <label htmlFor="firstGuarantorUpload" className="cursor-pointer flex flex-col justify-center items-center gap-2">
                                    <UploadWhite />
                                    <p className='text-sm font-medium text-BlackHomz text-center'>
                                        Drop your file or click to upload
                                    </p>
                                    <p className='text-[13px] font-normal text-GrayHomz'>
                                        PDF, JPG up to 2MB
                                    </p>
                                    <button
                                        className={`mt-1 text-sm font-medium w-auto hover:text-white hover:bg-[#4bb2e5] text-BlueHomz border border-BlueHomz rounded-[4px] px-4 py-2`}
                                    >
                                       Select file
                                    </button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FCFCFC] p-4 rounded-[8px] text-BlackHomz">
                    <p className="block text-sm font-medium">
                        Property Information <span className="font-normal text-GrayHomz">(optional)</span>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Property Name <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <input
                                value={formData.propertyName}
                                onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g Suncity Estates"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Apartment Number <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <input
                                value={formData.apartmentNumber}
                                onChange={(e) => setFormData({ ...formData, apartmentNumber: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g 20A"
                            />
                        </div>
                        <div className=''>
                            <label className="block text-sm font-medium">
                                Tenant Name <span className="font-normal text-GrayHomz">(optional)</span>
                            </label>
                            <input
                                value={formData.tenantName}
                                onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                                className="mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                placeholder="e.g CCTV Installation & Maintenance"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-8 flex w-full flex-col-reverse md:flex-row justify-between gap-2 my-4 text-sm font-normal">
                <div className="md:w-[50%]" />
                <div className="md:w-[50%] flex flex-row gap-2 items-center justify-end">
                    <button
                        // onClick={() => {
                        //     setShowForm(false)
                        // }}
                        className={`w-auto hover:text-white hover:bg-[#4bb2e5] text-BlueHomz border border-BlueHomz rounded-[4px] px-4 py-2`}
                    >
                        Cancel
                    </button>
                    <button
                        // onClick={() => {
                        //     setShowSuccessModal(true)
                        //     setDontHideForm(false)
                        // }}
                        className="rounded-[4px] px-4 py-2 text-white bg-BlueHomz w-auto hover:border hover:border-BlueHomz hover:bg-transparent hover:text-BlueHomz"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateExpenses