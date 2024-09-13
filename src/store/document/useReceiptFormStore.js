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
    image: null,
  },

  setFormData: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value,
    },
  })),

  mergeFormData: (propertyData) => set((state) => ({
    formData: {
      ...state.formData, // retain existing formData fields
      propertyManagerCompanyName: propertyData.propertyManagerCompanyName ?? state.formData.propertyManagerCompanyName,
      propertyManagerCompanyEmail: propertyData.propertyManagerCompanyEmail ?? state.formData.propertyManagerCompanyEmail,
      propertyManagerCompanyAddress: propertyData.propertyManagerCompanyAddress ?? state.formData.propertyManagerCompanyAddress,
      propertyManagerCompanyPhoneNumber: propertyData.propertyManagerCompanyPhoneNumber ?? state.formData.propertyManagerCompanyPhoneNumber,
      receiptDate: propertyData.receiptDate ?? state.formData.receiptDate,
      tenantName: propertyData.tenantName ?? state.formData.tenantName,
      tenantPhoneNumber: propertyData.tenantPhoneNumber ?? state.formData.tenantPhoneNumber,
      propertyAddress: propertyData.propertyAddress ?? state.formData.propertyAddress,
      propertyDesc: propertyData.propertyDesc ?? state.formData.propertyDesc,
      rentPayment: propertyData.rentPayment ?? state.formData.rentPayment,
      rentPaymentInWords: propertyData.rentPaymentInWords ?? state.formData.rentPaymentInWords,
      selectedCurrency: propertyData.selectedCurrency ?? state.formData.selectedCurrency,
      tenancy: propertyData.tenancy ?? state.formData.tenancy,
      tenancyPeriod: propertyData.tenancyPeriod ?? state.formData.tenancyPeriod,
      tenancyStartDate: propertyData.tenancyStartDate ?? state.formData.tenancyStartDate,
      tenancyEndDate: propertyData.tenancyEndDate ?? state.formData.tenancyEndDate,
      modOfPayment: propertyData.modOfPayment ?? state.formData.modOfPayment,
      image: propertyData.image ?? state.formData.image,
    },
  })),
}));

export default useReceiptFormStore;
