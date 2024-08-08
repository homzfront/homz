import create from 'zustand';

const useStorePropertyIds = create((set) => ({
  propertyIds: [],
  singleId: "",
  propertyPlanType: "",
  errorModal: false,

  setSinglePropertyId: (id) => set({ singleId: id }),
  setPropertyPlanType: (type) => set({ propertyPlanType: type }),
  setPropertyIds: (ids) => set({ propertyIds: ids }),
  resetPropertyIds: () => set({ propertyIds: [] }),
  setErrorModal: (status) => set({ errorModal: status }),
}));

export default useStorePropertyIds;
