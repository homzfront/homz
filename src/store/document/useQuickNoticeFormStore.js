import { create } from 'zustand';

const useQuickNoticeFormStore = create((set) => ({
  formData: {
    noticePeriod: null,
    noticeStartDate: null,
    propertyDesc: null,
    propertyAddress: null,
    landlordName: null,
    tenantName: null,
    tenantAddress: null,
    duration: null,
    propertyManagerName: null,
    propertyManagerCompanyName: null,
    propertyManagerCompanyEmail: null,
    propertyManagerCompanyAddress: null,
    propertyManagerCompanyWebsite: null,
    image: null
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
      noticePeriod: propertyData.noticePeriod ?? state.formData.noticePeriod,
      noticeStartDate: propertyData.noticeStartDate ?? state.formData.noticeStartDate,
      propertyDesc: propertyData.propertyDesc ?? state.formData.propertyDesc,
      propertyAddress: propertyData.propertyAddress ?? state.formData.propertyAddress,
      landlordName: propertyData.landlordName ?? state.formData.landlordName,
      tenantName: propertyData.tenantName ?? state.formData.tenantName,
      tenantAddress: propertyData.tenantAddress ?? state.formData.tenantAddress,
      duration: propertyData.duration ?? state.formData.duration,
      propertyManagerName: propertyData.propertyManagerName ?? state.formData.propertyManagerName,
      propertyManagerCompanyName: propertyData.propertyManagerCompanyName ?? state.formData.propertyManagerCompanyName,
      propertyManagerCompanyEmail: propertyData.propertyManagerCompanyEmail ?? state.formData.propertyManagerCompanyEmail,
      propertyManagerCompanyAddress: propertyData.propertyManagerCompanyAddress ?? state.formData.propertyManagerCompanyAddress,
      propertyManagerCompanyWebsite: propertyData.propertyManagerCompanyWebsite ?? state.formData.propertyManagerCompanyWebsite,
      image: propertyData.image ?? state.formData.image,
    },
  })),

  resetQuitNoticeFormData: () => set(() => ({
    formData: {
      noticePeriod: null,
      noticeStartDate: null,
      propertyDesc: null,
      propertyAddress: null,
      landlordName: null,
      tenantName: null,
      tenantAddress: null,
      duration: null,
      propertyManagerName: null,
      propertyManagerCompanyName: null,
      propertyManagerCompanyEmail: null,
      propertyManagerCompanyAddress: null,
      propertyManagerCompanyWebsite: null,
      image: null
    },
  })),
}));

export default useQuickNoticeFormStore;
