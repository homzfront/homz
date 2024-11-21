import React from 'react';
import Close from '@/components/icons/Close';
import Dropdown from './dropDown';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from "date-fns";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '@/utils/api';
import LoadingFormII from '@/components/mainmenu/loadingFormII';
import useRentSummaryTenant from '@/store/enterpriseStore/rentSummaryTenant';
import PaymentRefetchTenant from '@/store/enterpriseStore/paymentRefetchTenant';
import useExportEnterpriseSingleTenant from '@/store/enterpriseStore/exportEnterpriseSingleTenant';
import DateIcon from '@/components/icons/date';
import { getSpecificTenantRentInfo } from '@/api/tenantSevice';
import LoadingTable from '@/components/mainmenu/loadingTable';

const schema = z.object({
    dateOfTransaction: z.date({
        required_error: "Date of Transaction is required",
    }),

    modeOfTransaction: z
        .object({
            id: z.number(),
            label: z.string(),
        })
        .nullable()
        .refine((val) => val && val.label, { message: 'Mode of Transaction is required' }),

    amountPaid: z.string().min(1, { message: 'Amount Paid is required' }),
    rent: z.string().min(1, { message: 'Rent Amount is required' }),

    description: z
        .object({
            id: z.number(),
            label: z.string(),
        })
        .nullable()
        .refine((val) => val && val.label, { message: 'Description is required' }),

    startDate: z.date({
        required_error: "Start Date is required",
    }),

    dueDate: z.date({
        required_error: "End Date is required",
    }),

    duration: z
        .number()
        .nullable()
        .refine((val) => val && val > 0, { message: 'Rent Duration is required and must be greater than 0' }),
});


const SetOfflineData = ({ rentInfoId, setOfflinepay, successfullModal, id, tenant }) => {
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            dateOfTransaction: null,
            modeOfTransaction: null,
            amountPaid: '',
            rent: null,
            description: null,
            startDate: null,
            dueDate: null,
            duration: null,
        },
        mode: 'onChange',
    });

    const { fetchData } = useRentSummaryTenant();
    const { setRefetch } = PaymentRefetchTenant();
    const { fetchData: exportFetch } = useExportEnterpriseSingleTenant();

    const optionOne = [
        { id: 1, label: 'Cash' },
        { id: 2, label: 'Cheque' },
        { id: 3, label: 'Transfer' },
    ];

    const optionTwo = [
        { id: 1, label: 'Part Payment' },
        { id: 2, label: 'Full Payment' },
    ];

    const onSubmit = async (data) => {
        try {
            const response = await api.post(`/offlinePayment/enterprise/rent/tenant/${id}`, {
                description: data.description?.label.toLowerCase(),
                rent: data.rent.replace(/,/g, ''),
                amountPaid: data.amountPaid.replace(/,/g, ''),
                modeOfTransaction: data.modeOfTransaction?.label.toLowerCase(),
                dateOfTransaction: (data.dateOfTransaction).toISOString(),
                duration: data.duration,
                startDate: (data.startDate).toISOString(),
                dueDate: (data.dueDate).toISOString()
            });

            if (response?.data?.success) {
                successfullModal();
                setOfflinepay(false);
                fetchData(id);
                setRefetch(true);
                exportFetch(id);
            } else {
                throw new Error(response?.data?.message || 'Failed to submit data');
            }
        } catch (error) {
            // console.error(error.message);
        }
    };

    const rentInformationII = async () => {
        try {
            const response = await getSpecificTenantRentInfo(
                `${rentInfoId}`
            );
            const rentInfo = response?.upDateddata;
            setData(rentInfo);
            setLoading(false)
        } catch (error) {
            // console.error("Error fetching rent information", error);
            // Handle the error as needed
        }
    };

    React.useEffect(() => {
        rentInformationII()
    }, [rentInfoId])

    React.useEffect(() => {
        if (data) {
            // Set default rent value when data is available
            setValue("rent", data.rent || "");

            // Set default duration value when data is available
            setValue("duration", data.duration || "");

            // Set default startDate and dueDate to a 2-month interval from the current date
            const currentDate = new Date();
            const defaultStartDate = currentDate;
            const defaultDueDate = new Date();
            defaultDueDate.setMonth(currentDate.getMonth() + data.duration); // Add 2 months
            // Deduct one day from due date
            defaultDueDate.setDate(defaultDueDate.getDate() - 1);
            setValue("startDate", defaultStartDate);
            setValue("dueDate", defaultDueDate);
        }
    }, [data, setValue]);

    // Watch for changes to the duration and update startDate and dueDate accordingly
    React.useEffect(() => {
        const duration = watch("duration");
        if (duration) {
            const currentDate = new Date();
            const newStartDate = currentDate;
            const newDueDate = new Date();
            newDueDate.setMonth(currentDate.getMonth() + duration);
            // Deduct one day from due date
            newDueDate.setDate(newDueDate.getDate() - 1);
            setValue("startDate", newStartDate);
            setValue("dueDate", newDueDate);
        }
    }, [watch("duration"), setValue]);


    return (
        <div className='max-h-[600px]'>
            <div className="w-[350px] md:w-[500px] h-auto bg-white rounded-[12px] p-6 overflow-y-auto">
                <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col w-[85%]">
                        <p className="text-BlackHomz font-[500] text-[14px] md:text-[16px]">
                            Offline Payment Record
                        </p>
                        <p className="text-GrayHomz font-[400] text-[12px] md:text-[13px]">
                            {`Fill in the details for ${tenant} offline payment`}
                        </p>
                    </div>
                    <div
                        onClick={() => setOfflinepay(false)}
                        className="cursor-pointer border border-BlackHomz rounded-[8px] h-[30px] w-[30px] flex justify-center items-center"
                    >
                        <Close />
                    </div>
                </div>
                {
                    loading ?
                        <div className='h-[500px] flex justify-center items-center w-full'>
                            <LoadingTable />
                        </div>
                        :
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
                            {/* Date of Transaction */}
                            <div className="bg-inputBg py-4 px-6 rounded-[8px] flex items-center justify-between">
                                <label className="text-BlackHomz font-[400] w-[40%  ]">Date of Transaction <span className='text-red-600'>*</span></label>
                                <div className="relative">
                                    <div className='w-full'>
                                        <Controller
                                            name="dateOfTransaction"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    {...field}
                                                    selected={field.value} // Pass the Date object
                                                    onChange={(date) => field.onChange(date)} // Update with Date object
                                                    dateFormat="d MMMM, yyyy" // Format displayed in UI
                                                    placeholderText="Select Date"
                                                    className={`w-full h-[45px] px-4 py-2 rounded-md border ${errors.dateOfTransaction ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <DateIcon />
                                    </div>
                                </div>
                                {errors.dateOfTransaction && (
                                    <span className="text-red-500 text-xs mt-1">{errors.dateOfTransaction.message}</span>
                                )}
                            </div>
                            <div className="bg-inputBg">
                                {/* Mode of Transaction */}
                                <div className="py-4 px-6 rounded-[8px] flex items-center justify-between">
                                    <div className="text-BlackHomz font-[400] w-[42%]">Mode of Transaction <span className='text-red-600'>*</span></div>
                                    <div className="w-[52%]">
                                        <Controller
                                            name="modeOfTransaction"
                                            control={control}
                                            render={({ field }) => (
                                                <Dropdown
                                                    options={optionOne}
                                                    onSelect={(option) => setValue('modeOfTransaction', option)}
                                                    selectOption={field.value}
                                                    className={"w-full"}
                                                />
                                            )}
                                        />
                                        {errors.modeOfTransaction && (
                                            <span className="text-error text-[11px] italic">
                                                {errors.modeOfTransaction.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/*  Rent Amount */}
                                <div className=" py-4 px-6 rounded-[8px] flex items-center justify-between">
                                    <div className="text-BlackHomz font-[400] w-[40%]">Rent Amount <span className='text-red-600'>*</span></div>
                                    <div className="w-[52%]">
                                        <div className='relative'>
                                            <span className="absolute left-3 top-[1px] bottom-0 flex items-center text-[13px] md:text-[14px] font-[500]">
                                                ₦
                                            </span>
                                            <Controller
                                                name="rent"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        value={field.value}
                                                        onChange={(e) => {
                                                            const rawValue = e.target.value.replace(/,/g, '');
                                                            if (/^\d*\.?\d*$/.test(rawValue)) {
                                                                field.onChange(rawValue);
                                                            }
                                                        }}
                                                        onBlur={(e) => {
                                                            const rawValue = e.target.value.replace(/,/g, '');
                                                            field.onChange(rawValue ? new Intl.NumberFormat().format(rawValue) : '');
                                                        }}
                                                        className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                                        placeholder="0.00"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.rent && (
                                            <span className="text-error text-[11px] italic">
                                                {errors.rent.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Amount Paid */}
                                <div className=" py-4 px-6 rounded-[8px] flex items-center justify-between">
                                    <div className="text-BlackHomz font-[400] w-[40%]">Amount Paid <span className='text-red-600'>*</span></div>
                                    <div className="w-[52%]">
                                        <div className='relative'>
                                            <span className="absolute left-3 top-[1px] bottom-0 flex items-center text-[13px] md:text-[14px] font-[500]">
                                                ₦
                                            </span>
                                            <Controller
                                                name="amountPaid"
                                                control={control}
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        value={field.value}
                                                        onChange={(e) => {
                                                            const rawValue = e.target.value.replace(/,/g, '');
                                                            if (/^\d*\.?\d*$/.test(rawValue)) {
                                                                field.onChange(rawValue);
                                                            }
                                                        }}
                                                        onBlur={(e) => {
                                                            const rawValue = e.target.value.replace(/,/g, '');
                                                            field.onChange(rawValue ? new Intl.NumberFormat().format(rawValue) : '');
                                                        }}
                                                        className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                                        placeholder="0.00"
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.amountPaid && (
                                            <span className="text-error text-[11px] italic">
                                                {errors.amountPaid.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="py-4 px-6 rounded-[8px] flex items-center justify-between">
                                    <div className="text-BlackHomz font-[400] w-[40%]">Description <span className='text-red-600'>*</span></div>
                                    <div className="w-[52%]">
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field }) => (
                                                <Dropdown
                                                    options={optionTwo}
                                                    onSelect={(option) => setValue('description', option)}
                                                    selectOption={field.value}
                                                    className={"w-full"}
                                                />
                                            )}
                                        />
                                        {errors.description && (
                                            <span className="text-error text-[11px] italic">
                                                {errors.description.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className="bg-inputBg">
                                <div className='text-GrayHomz font-[400] text-[13px] p-4'>
                                    Only change these default dates if this payment record is not for your current information.
                                </div>
                                {/* Rent Duration */}
                                <div className=" py-4 px-6 rounded-[8px] flex items-center justify-between">
                                    <div className="text-BlackHomz font-[400] w-[40%]">Rent Duration<span className='text-red-600'>*</span></div>
                                    <div className="w-[52%] relative">
                                        <Controller
                                            name="duration"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    value={field.value || ''} // Ensure initial value is handled
                                                    onChange={(e) => {
                                                        const value = e.target.value ? Number(e.target.value) : null; // Convert to number or null
                                                        field.onChange(value);
                                                    }}
                                                    className="w-full h-[45px] py-3 px-6 rounded-md bg-white placeholder:text-GrayHomz2"
                                                    placeholder="1 Month"
                                                    type='number'
                                                />
                                            )}
                                        />
                                        {errors.duration && (
                                            <span className="text-error text-[11px] italic">
                                                {errors.duration.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/*  Start Date */}
                                <div className="bg-inputBg py-4 px-6 rounded-[8px] flex items-center justify-between">
                                    <label className="text-BlackHomz font-[400] w-[40%  ]">Start Date<span className='text-red-600'>*</span></label>
                                    <div className="relative">
                                        <div className='w-full'>
                                            <Controller
                                                name="startDate"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        {...field}
                                                        selected={field.value} // Pass the Date object
                                                        onChange={(date) => field.onChange(date)} // Update with Date object
                                                        dateFormat="d MMMM, yyyy" // Format displayed in UI
                                                        placeholderText="Select Start Date"
                                                        className="w-full h-[45px] px-4 py-2 rounded-md border"
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <DateIcon />
                                        </div>
                                    </div>
                                    {errors.startDate && (
                                        <span className="text-red-500 text-xs mt-1">{errors.startDate.message}</span>
                                    )}
                                </div>
                                {/* Due Date */}
                                <div className="bg-inputBg py-4 px-6 rounded-[8px] flex items-center justify-between">
                                    <label className="text-BlackHomz font-[400] w-[40%  ]">Due Date<span className='text-red-600'>*</span></label>
                                    <div className="relative">
                                        <div className='w-full'>
                                            <Controller
                                                name="dueDate"
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        {...field}
                                                        selected={field.value} // Pass the Date object
                                                        onChange={(date) => field.onChange(date)} // Update with Date object
                                                        dateFormat="d MMMM, yyyy" // Format displayed in UI
                                                        placeholderText="Select End Date"
                                                        className={`w-full h-[45px] px-4 py-2 rounded-md border`}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <DateIcon />
                                        </div>
                                    </div>
                                    {errors.dueDate && (
                                        <span className="text-red-500 text-xs mt-1">{errors.dueDate.message}</span>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`h-[48px] w-full ${isValid ? 'bg-BlueHomz' : 'bg-GrayHomz6'
                                    } rounded-[4px] text-white ${isSubmitting ? "flex justify-center items-center" : ""}`}
                            // disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? <LoadingFormII /> : 'Confirm Transaction'}
                            </button>
                        </form>
                }
                <div className="mt-4 text-[12px] md:text-[14px]">
                    <button
                        onClick={() => setOfflinepay(false)}
                        className="h-[48px] w-full hover:rounded-[4px] hover:text-BlueHomz text-GrayHomz hover:border hover:border-BlueHomz"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetOfflineData;
