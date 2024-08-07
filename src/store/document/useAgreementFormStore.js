import {create} from 'zustand';

const useAgreementFormStore = create((set) => ({
  formData: {
    propDesc: '',
    propAddress: '',
    landlordName: '',
    landlordAddress: '',
    tenantName: '',
    tenantAddress: '',
    tenancyStartDate: '',
    agreementDate: '',
    rentPayment: '',
    rentPaymentInWords: '',
    tenancyEndDate: '',
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
