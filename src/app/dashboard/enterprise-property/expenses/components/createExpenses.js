import BackSmall from '@/components/icons/backSmall'
import React from 'react'
import DatePicker from "react-datepicker";
import DateIcon from "@/components/icons/date";
import Dropdown from "@/pages/dashboard/enterprise/components/dropDownTwo";
import "react-datepicker/dist/react-datepicker.css";
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import api from '@/utils/api';
import ExpenseCategory from './expenseCategory';
import Attachment from './attachment';

const CreateExpenses = ({ setOpenEdit, update, fetchExpense, setOpenCreateExpenses }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState({
        expenseName: update?.expenseName || "",
        amount: update?.amount || "",
        date: update?.date ? new Date(update.date) : null,
        expenseCategory: update?.expenseCategoryName || "",
        description: update?.description || "",
        paymentStatus: update?.paymentStatus || "",
        paymentMethod: update?.vendor?.paymentMethod || "",
        businessAddress: update?.vendor?.businessAddress || "",
        vendorPhone: update?.vendor?.phone || "",
        vendorEmail: update?.vendor?.email || "",
        contactPerson: update?.vendor?.contactPerson || "",
        vendorName: update?.vendor?.name || "",
        propertyName: update?.property?.propertyName || "",
        apartmentNumber: update?.property?.apartment || "",
        tenantName: update?.property?.tenantName || "",
    });

    const [files, setFiles] = React.useState([]);
    const fileInputRef = React.useRef(null);

    React.useEffect(() => {
        if (update) {
            setFormData({
                expenseName: update.expenseName || "",
                amount: update.amount || "",
                date: update.date ? new Date(update.date) : null,
                expenseCategory: update.expenseCategoryName || "",
                description: update.description || "",
                paymentStatus: update.paymentStatus || "",
                paymentMethod: update.vendor?.paymentMethod || "",
                businessAddress: update.vendor?.businessAddress || "",
                vendorPhone: update.vendor?.phone || "",
                vendorEmail: update.vendor?.email || "",
                contactPerson: update.vendor?.contactPerson || "",
                vendorName: update.vendor?.name || "",
                propertyName: update.property?.propertyName || "",
                apartmentNumber: update.property?.apartment || "",
                tenantName: update.property?.tenantName || "",
            });
        }
    }, [update]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFile = e.target.files[0];
            if (files.length < 5) {
                setFiles([...files, newFile]);
            }
        }
    };

    const removeFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const isFormValid = React.useMemo(() => {
        return (
            formData.expenseName.trim() !== "" &&
            formData.amount !== "" &&
            formData.date !== null &&
            formData.expenseCategory.trim() !== "" &&
            formData.paymentStatus.trim() !== ""
        );
    }, [formData]);

    const handleSubmitExpense = async () => {
        setIsLoading(true)
        setError(null)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

        if (formData.vendorEmail && !emailRegex.test(formData.vendorEmail)) {
            setIsLoading(false)
            setError('Please enter a valid email address.');
            return;
        }

        if (formData.vendorPhone && !phoneRegex.test(formData.vendorPhone)) {
            setIsLoading(false)
            setError('Please enter a valid phone number.');
            return;
        }
        try {
            // Prepare the data in the required format
            const requestData = {
                expenseName: formData.expenseName,
                amount: Number(formData.amount),
                date: formData.date ? formData.date.toISOString().split('T')[0] : null,
                expenseCategory: formData.expenseCategory,
                description: formData.description,
                paymentStatus: formData.paymentStatus,
                vendor: {
                    name: formData.vendorName,
                    contactPerson: formData.contactPerson,
                    email: formData.vendorEmail,
                    phone: formData.vendorPhone,
                    businessAddress: formData.businessAddress,
                    paymentMethod: formData.paymentMethod
                },
                property: {
                    propertyName: formData.propertyName,
                    apartment: formData.apartmentNumber,
                    tenantName: formData.tenantName
                }
            };

            // Remove empty optional fields
            if (!requestData.description) delete requestData.description;

            if (!requestData.vendor.name) {
                delete requestData.vendor;
            } else {
                if (!requestData.vendor.contactPerson) delete requestData.vendor.contactPerson;
                if (!requestData.vendor.email) delete requestData.vendor.email;
                if (!requestData.vendor.phone) delete requestData.vendor.phone;
                if (!requestData.vendor.businessAddress) delete requestData.vendor.businessAddress;
                if (!requestData.vendor.paymentMethod) delete requestData.vendor.paymentMethod;
            }

            if (!requestData.property.propertyName) {
                delete requestData.property;
            } else {
                if (!requestData.property.apartment) delete requestData.property.apartment;
                if (!requestData.property.tenantName) delete requestData.property.tenantName;
            }

            let response = null;
            if (update) {
                // Use the same endpoint for update with PUT method
                response = await api.patch(`/expense/enterprise/single/update/${update._id}`, requestData);

            } else {
                response = await api.post('/expense/enterprise/create', requestData);
            }

            // Handle file uploads for both create and update
            if (response && (files.length !== 0 || update)) {
                const expense_id = update ? update._id : response?.data?.data?._id;

                if (files.length > 0) {
                    const formData = new FormData();
                    files.forEach((file, index) => {
                        formData.append(`attachments`, file);
                    });
                    formData.append('expense_id', expense_id);

                    const responseTwo = await api.post(
                        `/expense/enterprise/attachments/${expense_id}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );

                    if (responseTwo.data) {
                        setFiles([]);
                    }
                }
            }

            const resultExpense = await fetchExpense(1);
            setOpenCreateExpenses(false);
            setOpenEdit(null)
            setFormData({
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
            })
        } catch (error) {
            console.error('Error submitting expense:', error);
            if (error.response) {
                const errorData = error.response.data;
                if (errorData?.error?.errors) {
                    setError(Object.values(errorData.error.errors).join(', '));
                } else if (errorData?.message) {
                    setError(errorData.message);
                } else {
                    setError('Failed to submit expense. Please try again.');
                }
            } else {
                setError(error.message || 'An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const optionsTwo = ["Paid", "Unpaid"];
    const optionsThree = ["Bank Transfer", "Cash", "POS"];

    return (
        <div>
            <button onClick={() => {
                setOpenCreateExpenses(false)
                setOpenEdit(null)
            }} className='text-sm font-normal text-GrayHomz2 flex items-center gap-1 px-8 mt-6'>
                <BackSmall /> Back
            </button>
            <div className='pb-6 pt-4 border-b border-[#E6E6E6] px-8'>
                <div>
                    <p className='text-[20px] text-BlackHomz font-medium'>
                        {update ? 'Edit Expense' : 'Add New Expense'}
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
                                        className="no-spinner mt-0.5 w-full h-[45px] px-3 border border-[#a9a9a9] rounded-[4px] outline-none bg-transparent"
                                        placeholder="200000"
                                    />
                                    <div className={`font-sans z-[99] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none  ${formData?.amount ? "text-BlackHomz" : "text-GrayHomz2"}`}>
                                        ₦
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-[50%]">
                                <label className="text-sm font-medium">Date <span className="text-error">*</span></label>
                                <div className="relative w-full border border-[#a9a9a9] rounded-md h-[45px]">
                                    <DatePicker
                                        selected={formData.date}
                                        onChange={(date) => {
                                            setOpenEdit(null)
                                            setFormData({ ...formData, date })
                                        }}
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
                        <ExpenseCategory formData={formData} setFormData={setFormData} />
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
                                    onSelect={(selectedOption) => setFormData({ ...formData, paymentStatus: selectedOption })}
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
                                    onSelect={(selectedOption) => setFormData({ ...formData, paymentMethod: selectedOption })}
                                    value={formData.paymentMethod}
                                    border={"border-[#a9a9a9]"}
                                    className={"w-full"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Attachment
                    handleFileChange={handleFileChange}
                    removeFile={removeFile}
                    triggerFileInput={triggerFileInput}
                    files={files}
                    fileInputRef={fileInputRef}
                />
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
            {error && <span className='px-12 text-xs font-normal text-error italic'>{error}</span>}
            <div className={` ${isLoading && "pointer-events-none"} px-8 flex w-full flex-col-reverse md:flex-row justify-between gap-2 my-4 text-sm font-normal`}>
                <div className="md:w-[50%]" />
                <div className="md:w-[50%] flex flex-row gap-2 items-center justify-end">
                    <button
                        disabled={isLoading}
                        onClick={() => {
                            setOpenCreateExpenses(false)
                            setOpenEdit(null)
                        }}
                        className={`w-auto hover:text-white hover:bg-[#4bb2e5] text-BlueHomz border border-BlueHomz rounded-[4px] h-full max-h-[44px] px-4 py-2`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmitExpense}
                        className={`rounded-[4px] flex justify-center items-center w-full max-w-[140px] h-full max-h-[44px] py-2 ${!isFormValid ? "text-GrayHomz6 bg-GrayHomz5 hover:border pointer-events-none" : "text-white bg-BlueHomz hover:border hover:border-BlueHomz hover:bg-transparent hover:text-BlueHomz"} ${isLoading ? "w-full flex justify-center" : ""} `}
                    >
                        {isLoading ? <LoadingFormII /> : update ? "Save Expense" : "Add Expense"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateExpenses