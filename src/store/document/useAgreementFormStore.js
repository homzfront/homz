import { create } from 'zustand';

const useAgreementFormStore = create((set) => ({
  formData: {
    propDesc: null,
    propAddress: null,
    landlordName: null,
    landlordAddress: null,
    tenantName: null,
    tenantAddress: null,
    tenancyStartDate: null,
    agreementDate: null,
    rentPayment: null,
    rentPaymentInWords: null,
    tenancyEndDate: null,
    selectedCurrency: null,
    _id: null,
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
      propDesc: propertyData.propertyDesc ?? state.formData.propDesc,
      propAddress: propertyData.propertyAddress ?? state.formData.propertyAddress,
      landlordName: propertyData.landlordName ?? state.formData.landlordName,
      landlordAddress: propertyData.landlordAddress ?? state.formData.landlordAddress,
      tenantName: propertyData.tenantName ?? state.formData.tenantName,
      tenantAddress: propertyData.tenantAddress ?? state.formData.tenantAddress,
      tenancyStartDate: propertyData.tenancyStartDate ?? state.formData.tenancyStartDate,
      agreementDate: propertyData.agreementDate ?? state.formData.agreementDate,
      rentPayment: propertyData.rentPayment ?? state.formData.rentPayment,
      rentPaymentInWords: propertyData.rentPaymentInWords ?? state.formData.rentPaymentInWords,
      tenancyEndDate: propertyData.tenancyEndDate ?? state.formData.tenancyEndDate,
      selectedCurrency: propertyData.selectedCurrency ?? state.formData.selectedCurrency,
      _id: propertyData?._id ?? state.formData_?.id
    },
  })),

  resetAgreementFormData: () => set(() => ({
    formData: {
      propDesc: null,
      propAddress: null,
      landlordName: null,
      landlordAddress: null,
      tenantName: null,
      tenantAddress: null,
      tenancyStartDate: null,
      agreementDate: null,
      rentPayment: null,
      rentPaymentInWords: null,
      tenancyEndDate: null,
      selectedCurrency: null,
      _id: null,
    },
  })),
}));

export default useAgreementFormStore;
