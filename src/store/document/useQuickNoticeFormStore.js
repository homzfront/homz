import {create} from 'zustand';

const useQuickNoticeFormStore = create((set) => ({
  formData: {
    noticePeriod: '',
    noticeStartDate: '',
    propertyDesc: '',
    landlordAddress: '',
    landlordName: '',
    tenantName: '',
    tenantAddress: '',
    duration: null,
    propertyManagerName: '',
    propertyManagerCompanyName: '',
    propertyManagerCompanyEmail: '',
    propertyManagerCompanyAddress: '',
    propertyManagerCompanyWebsite: '',
  },
  setFormData: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value,
    },
  })),
}));

export default useQuickNoticeFormStore;
