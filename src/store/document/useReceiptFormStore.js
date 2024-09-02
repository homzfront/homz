import { create } from 'zustand';

const useReceiptFormStore = create((set) => ({
    formData: {
        propertyManagerCompanyName: '',
        propertyManagerCompanyEmail: '',
        propertyManagerCompanyAddress: '',
        propertyManagerCompanyPhoneNumber: '',
        receiptDate: '',
        tenantName: '',
        tenantPhoneNumber: '',
        propertyAddress: '',
        propertyDesc: '',
        rentPayment: '',
        rentPaymentInWords: '',
        selectedCurrency: null,
        tenancy: '',
        tenancyPeriod: '',
        tenancyStartDate: '',
        tenancyEndDate: '',
        modOfPayment: '',
    },
    setFormData: (field, value) => set((state) => ({
        formData: {
            ...state.formData,
            [field]: value,
        },
    })),
}));

export default useReceiptFormStore;
