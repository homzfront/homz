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
  },
  setFormData: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value,
    },
  })),
}));

export default useAgreementFormStore;
